import css from '~/css/placeholder.module.css';
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { compStore } from '~/comp-store';
import { VendorComp } from './vendor-comp';

class Placeholder extends React.Component {

    static defaultProps = {
        id: 'n/a',
        rowIndex: -1,
        index: -1,
        compName: '',
        compPropDefs: {},
        isSelected: false,
        onSelect: () => { throw new Error('onSelect n/a') },
        onRemoveClick: () => { throw new Error('onRemoveClick n/a') },
        onCompPanelItemDrop: () => { throw new Error('onCompPanelItemDrop n/a') },
        onCompHolderDrop: () => { throw new Error('onCompHolderDrop n/a') },
    }

    constructor( props ) {

        super(props);

        this.state = {

            className: css['placeholder']
        };
    }

    handleDragStart( event ) {

        if ( !this.props.compName ) { return; }

        const data = { 
            src: 'placeholder', 
            compName: this.props.compName,
            rowIndex: this.props.rowIndex,
            phIndex: this.props.index
        };
        event.dataTransfer.setData( 'text/plain', JSON.stringify(data) );
    }

    handleDragEnter( event ) {

        this.setState( {
            className: css['placeholder'] + ' ' + css['placeholder--hover']
        } );
    }

    handleDragLeave( event ) {

        this.setState( {
            className: css['placeholder']
        } );
    }

    handleDragOver( event ) {

        event.preventDefault();
        event.dataTransfer.dropEffect = 'copy';
    }

    handleDrop( event ) {

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

        if ( data.src === 'comp-panel-item' ) {

            this.props.onCompPanelItemDrop( this.props.rowIndex, this.props.index, data.compName );
            this.setState( {
                className: css['placeholder'] 
            } );
            return;
        }

        if ( data.src === 'comp-holder' ) {

            this.props.onCompHolderDrop( {
                rowIndex: this.props.rowIndex,
                phIndex: this.props.index, 
                chIndex: data.chIndex 
            } );

            this.setState( {
                className: css['placeholder'] 
            } );
            
            return;
        }
    }

    handleClick( event ) {

        if ( this.props.isSelected || !this.props.compName ) { 
            return; 
        }

        onSelect( this.props.rowIndex, this.props.index );
    }

    render() {

        return  <div className={ this.state.className }
                     onDragStart={ this.handleDragStart.bind(this) }
                     onDragEnter={ this.handleDragEnter.bind(this) }
                     onDragLeave={ this.handleDragLeave.bind(this) }
                     onDragOver={ this.handleDragOver.bind(this) }
                     onDrop={ this.handleDrop.bind(this) }
                     onClick={ this.handleClick.bind(this) }
                     draggable={ this.props.compName ? "true" : "false" }
                >
                    <button className={ css['placeholder__remove'] }
                            onClick={ () => this.props.onRemoveClick( rowIndex, index ) }
                    >
                        x
                    </button>
                    <div className={ css['placeholder__content'] }>
                        <VendorComp name={ this.props.compName } propDefs={ this.props.compPropDefs } />
                    </div>
                </div>
    }


}

function mapDispatchToProps( dispatch ) {

    return {
        onRemoveClick: ( rowIndex, phIndex ) => {
            dispatch( { type: 'design/remove-placeholder', rowIndex, phIndex } )
        },
        onCompPanelItemDrop: ( rowIndex, phIndex, compName ) => {
            dispatch( { type: 'placeholder/add-comp-from-comp-panel', rowIndex, phIndex, compName } )
        },
        onCompHolderDrop: payload => {
            dispatch( { type: 'placeholder/add-comp-from-comp-holder', ...payload } )
        },
        onSelect: ( rowIndex, phIndex ) => {
            dispatch( { type: 'placeholder/select', rowIndex, phIndex } )
        }
    }   
}

const ReduxedPlaceholder = connect( null, mapDispatchToProps )( Placeholder );

export { Placeholder, ReduxedPlaceholder };