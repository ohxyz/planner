import css from '~/css/main-panel.module.css';
import React from 'react';
import { connect } from 'react-redux';
import { CompHolder } from './comp-holder';
import { CompHolder as CompHolderModel } from '~/models';
import { compStore } from '~/comp-store';
import dom from './dom-utils';

function MainPanel( props ) {

    const {
        width = 100,
        height = 100,
        minWidth = 100,
        minHeight = 100,
        zoom = 1,
        compHolders = [],
        onCompPanelItemDrop = () => { throw new Error('onCompPanelItemDrop n/a') },
        onPlaceholderDrop = () => { throw new Error('onPlaceholderDrop n/a') }
    } = props;

    const style = {

        width: width + 'px',
        height: height + 'px',
        minWidth: minWidth + 'px',
        minHeight: minHeight + 'px',
        transform: `scale(${zoom})`,
    };

    const myRef = React.createRef();

    function handleDragOver( event ) {

        // Must call `preventDefault` to enable dropEffect
        // By default, it is a `move` effect, otherwise it is a `disable` effect
        event.preventDefault();

        // Don't use event.dataTransfer.dropEffect = 'move'
        // Otherwise, it will conflict to the dropEffect in `Placeholder` component
    }

    function handleDrop( event ) {

        let data = event.dataTransfer.getData( 'text' );

        if ( !data ) {
            return;
        }

        try {
            data = JSON.parse( data );
        }
        catch( error ) {
            return;
        }

        // Only allow drop in blank space. e.g. not allowed to drop in `design` area
        if ( event.target !== myRef.current ) {
            return;
        }

        if ( data.src !== 'comp-panel-item' && data.src !== 'placeholder' ) {
            return;
        }

        const innerRect = dom.getInnerRect( myRef.current );
        const left = event.clientX - innerRect.x;
        const top = event.clientY - innerRect.y;

        const compHolderModel = new CompHolderModel( {
            top, 
            left, 
            compName: data.compName,
            isSelected: true
        } );

        if ( data.src === 'comp-panel-item' ) {

            const comp = compStore.get( data.compName );
            compHolderModel.compPropDefs = comp.propDefs;

            onCompPanelItemDrop( compHolderModel );
            return;
        }

        if ( data.src === 'placeholder' ) {

            onPlaceholderDrop(
                compHolderModel,
                data.rowIndex,
                data.phIndex,
            );
            return;
        }
    }

    return  <div className={ css['main-panel'] } 
                 style={ style } 
                 onDragOver={ handleDragOver }
                 onDrop={ handleDrop }
                 ref={ myRef }
            >
                { props.children }
                {
                    compHolders.map( (holder, index) => 

                        <CompHolder key={ index }
                                    index={ index }
                                    top={ holder.top } 
                                    left={ holder.left }
                                    compName={ holder.compName }
                                    compPropDefs={ holder.compPropDefs }
                                    isSelected={ holder.isSelected }
                        />
                    )
                }
            </div>
}

const mapStateToProps = state => {

    return {

        width: state.undoable.present.mainPanel.width,
        height: state.undoable.present.mainPanel.height,
        compHolders: state.undoable.present.mainPanel.compHolders,
        zoom: state.main.mainPanel.zoom,
        minWidth: state.main.mainPanel.minWidth,
        minHeight: state.main.mainPanel.minHeight
    };
};

const mapDispatchToProps = dispatch => {

    return {
        // compHolder - Defined in `models`
        onCompPanelItemDrop: compHolder => {
            dispatch( { type: 'comp-holder/create', compHolder } )
        },
        onPlaceholderDrop: ( compHolder, rowIndex, phIndex ) => {
            dispatch( { type: 'comp-holder/move-out', compHolder, rowIndex, phIndex } )
        }
    }
};

export const ReduxedMainPanel = connect( mapStateToProps, mapDispatchToProps )( MainPanel );