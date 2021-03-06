import css from '~/css/placeholder.module.css';
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { compStore } from '~/comp-store';
import { VendorComp } from './vendor-comp';
import utils from '~/utils';

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
        onPlaceholderDrop: () => { throw new Error('onPlaceholderDrop n/a') }
    }

    constructor( props ) {

        super(props);

        this.state = {

            className: css['placeholder']
        };

        this.myRef = React.createRef();
    }

    handleDragStart( event ) {

        if ( !this.props.compName ) { return; }

        // Set an effect to avoid, in some cases, text is copied to a component. eg. Text Field
        // event.dataTransfer.effectAllowed = 'copy';
        
        const data = { 
            src: 'placeholder', 
            compName: this.props.compName,
            rowIndex: this.props.rowIndex,
            phIndex: this.props.index
        };

        event.dataTransfer.setData( 'text/plain', JSON.stringify(data) );
    }

    handleDragEnter( event ) {

        // Without following check, it can cause `hover` state to stay in place
        // when moving vendor component out of placeholder
        if ( event.target === this.myRef.current ) {

            this.setState( {
                className: css['placeholder'] + ' ' + css['placeholder--hover']
            } );
        }
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

        this.setState( {
            className: css['placeholder'] 
        } );

        if ( data.src === 'comp-panel-item' ) {

            this.props.onCompPanelItemDrop( this.props.rowIndex, this.props.index, data.compName );
            return;
        }

        if ( data.src === 'comp-holder' ) {

            this.props.onCompHolderDrop( {
                rowIndex: this.props.rowIndex,
                phIndex: this.props.index, 
                chIndex: data.chIndex 
            } );
            return;
        }

        if ( data.src === 'placeholder' ) {

            this.props.onPlaceholderDrop( {
                rowIndex: data.rowIndex, 
                phIndex: data.phIndex,
                newRowIndex: this.props.rowIndex,
                newPhIndex: this.props.index
            } );

            return;
        }
    }

    handleSelect( event ) {

        if ( this.props.isSelected || !this.props.compName ) { 
            return; 
        }

        this.props.onSelect( this.props.rowIndex, this.props.index );
    }

    handleCloseClick( event ) {

        event.stopPropagation();
        this.props.onRemoveClick( this.props.rowIndex, this.props.index );
    }

    render() {

        let className = this.props.isSelected 
                      ? this.state.className + ' ' + css['placeholder--selected']
                      : this.state.className;

        return  <div className={ className }
                     onDragStart={ this.handleDragStart.bind(this) }
                     onDragEnter={ this.handleDragEnter.bind(this) }
                     onDragLeave={ this.handleDragLeave.bind(this) }
                     onDragOver={ this.handleDragOver.bind(this) }
                     onDrop={ this.handleDrop.bind(this) }
                     onClick={ this.handleSelect.bind(this) }
                     draggable={ this.props.compName ? "true" : "false" }
                     ref={ this.myRef }
                >
                    <button className={ css['placeholder__remove'] }
                            onClick={ this.handleCloseClick.bind(this) }
                    >
                        x
                    </button>
                    <div className={ css['placeholder__content'] }>
                        <VendorComp key={ utils.genRandomString() } 
                                    name={ this.props.compName } 
                                    propDefs={ this.props.compPropDefs } 
                        />
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
        onPlaceholderDrop: payload => {
            dispatch( { type: 'placeholder/add-comp-from-placeholder', ...payload } )
        },
        onSelect: ( rowIndex, phIndex ) => {
            dispatch( { type: 'placeholder/select', rowIndex, phIndex } )
        },
    }   
}

const ReduxedPlaceholder = connect( null, mapDispatchToProps )( Placeholder );

export { Placeholder, ReduxedPlaceholder };