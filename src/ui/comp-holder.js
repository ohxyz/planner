import css from '~/css/comp-holder.module.css';
import React from 'react';
import { connect } from 'react-redux';
import dom from './dom-utils';
import { compStore } from '~/comp-store';
import utils from '~/utils';
import { VendorComp } from './vendor-comp';

class _CompHolder extends React.Component {

    static defaultProps = {
        top: 0, 
        left: 0,
        compName: 'n/a',
        compPropDefs: { 'n': 'a' },
        index: -1,
        isSelected: false,
        onDragEnd: () => { throw new Error('onDragEnd n/a') },
        onClose: () => { throw new Error('onClose n/a') },
        onSelect: () => { throw new Error('onSelect n/a') }
    }

    constructor( props ) {

        super(props);

        this.startX = 0;
        this.startY = 0;
    }

    handleDragStart( event ) {

        // In Firefox, clientX/Y, pageX/Y all returns 0 in dragend
        // So, use screenX/Y
        // But, when move the browser window from one monitor to another, it may cause bugs in Firefox.
        this.startX = event.screenX;
        this.startY = event.screenY;

        event.dataTransfer.effectAllowed = "all";

        const data = { 
            src: 'comp-holder', 
            compName: this.props.compName, 
            chIndex: this.props.index,
        };
        event.dataTransfer.setData( 'text/plain', JSON.stringify(data) );

        this.props.onSelect( this.props.index, this.props.compName );
    }

    handleDragEnd( event ) {

        // Without following, the event listener gets called after comp-holder dropped to place-holder
        // In this case, new position will apply to another comp-holder
        // because the inteneded comp-holder is already removed
        if ( event.dataTransfer.dropEffect === 'copy' ) {
            return;
        }

        const shiftX = event.screenX - this.startX;
        const shiftY = event.screenY - this.startY;

        const newTop = this.props.top + shiftY;
        const newLeft = this.props.left + shiftX;

        this.props.onDragEnd( this.props.index, { 
            top: newTop,
            left: newLeft
        } );
    }

    getClassNames() {

        return this.props.isSelected ? `${ css['comp-holder'] } ${ css['comp-holder--selected'] }`
                                     : css['comp-holder'];
    }

    handleSelect( event ) {

        if ( this.props.isSelected ) {
            return;
        }

        this.props.onSelect( this.props.index, this.props.compName ); 
    }

    handleCloseClick( event ) {

        // Cancel parent's onclick event handler;
        event.stopPropagation();
        this.props.onClose(this.props.index);
    }

    render() {

        const style = { top: this.props.top, left: this.props.left };

        return  <div className={ this.getClassNames() }
                     style={ style }
                     onDragStart={ this.handleDragStart.bind(this) }
                     onDragEnd={ this.handleDragEnd.bind(this) }
                     onClick={ this.handleSelect.bind(this) }
                     draggable
                >
                    <button className={ css['comp-holder-close'] }
                            onClick={ this.handleCloseClick.bind(this) } 
                    >
                        x
                    </button>
                    <div className={ css['comp-holder-content'] }>
                        <VendorComp key={ utils.genRandomString() } 
                                    name={ this.props.compName } 
                                    propDefs={ this.props.compPropDefs } 
                        />
                    </div>
                </div>
    }
}

const CompHolder = connect( null, 

    dispatch => ( {
        onDragEnd: ( index, pos ) => dispatch( { type: 'comp-holder/drag', index, pos } ),
        onSelect: (index, compName) => dispatch( { type: 'comp-holder/select', index, compName } ),
        onClose: index => dispatch( { type: 'comp-holder/remove', index } ),
    } )

)( _CompHolder);

export { CompHolder }