import React from 'react';
import { connect } from 'react-redux';
import { CompHolder } from './comp-holder';
import { dragCompHolder } from '~/redux/actions';
import css from '~/css/main-panel.module.css';

function MainPanel( props ) {

    const {
        width = 100,
        height = 100,
        minWidth = 100,
        minHeight = 100,
        zoom = 1,
        compHolders = [],
        onCompHolderDragEnd = () => { throw new Error( 'onCompHolderDragEnd n/a' ) }
    } = props;

    const style = {

        width: width + 'px',
        height: height + 'px',
        minWidth: minWidth + 'px',
        minHeight: minHeight + 'px',
        transform: `scale(${zoom})`,
    };

    function handleDragOver( event ) {

        // Must call `preventDefault` to enable dropEffect
        // By default, it is a `move` effect, otherwise it is a `disable` effect
        event.preventDefault();

        // Don't use event.dataTransfer.dropEffect = 'move'
        // Otherwise, it will conflict to the dropEffect in `Placeholder` component
    }

    return  <div className={ css['main-panel'] } style={ style } onDragOver={ handleDragOver }>
                { props.children }
                {
                    compHolders.map( (holder, index) => 

                        <CompHolder key={index} 
                                    top={holder.top} 
                                    left={holder.left}
                                    onDragEnd={ pos => { onCompHolderDragEnd(index, pos) } }
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
        onCompHolderDragEnd: ( index, pos ) => { dispatch( dragCompHolder(index, pos) ) }
    }
};

export const ReduxedMainPanel = connect( mapStateToProps, mapDispatchToProps )( MainPanel );