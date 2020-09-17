import css from '~/css/placeholder.module.css';
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { compStore } from '~/comp-store';

function Placeholder( props ) {

    const { 
        id = 'n/a',
        rowIndex = -1,
        index = -1,
        compName = '',
        onRemoveClick = () => { throw new Error('onRemoveClick n/a') },
        onCompPanelItemDrop = () => { throw new Error('onCompPanelItemDrop n/a') },
        onCompHolderDrop = () => { throw new Error('onCompHolderDrop n/a') },
    } = props;
    
    const [ className, setClassName ] = useState( css['placeholder'] );
    const comp = compStore.get( compName );

    const Component = comp ? comp.component : ( () => '' );

    function handleDragStart( event ) {

        if ( !compName ) { return; }

        const data = { 
            src: 'placeholder', 
            compName, 
            rowIndex, 
            phIndex: index
        };
        event.dataTransfer.setData( 'text/plain', JSON.stringify(data) );
    }

    function handleDragEnter( event ) {

        setClassName( css['placeholder'] + ' ' + css['placeholder--active'] );
    }

    function handleDragLeave( event ) {

        setClassName( css['placeholder'] );
    }

    function handleDragOver( event ) {

        event.preventDefault();
        event.dataTransfer.dropEffect = 'copy';
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

        if ( data.src === 'comp-panel-item' ) {

            onCompPanelItemDrop( rowIndex, index, data.compName );
            setClassName( css['placeholder'] );
            return;
        }

        if ( data.src === 'comp-holder' ) {

            onCompHolderDrop( {
                rowIndex,
                index, 
                compName: data.compName, 
                chIndex: data.chIndex 
            } );

            setClassName( css['placeholder'] );
            
            return;
        }
    }

    return  <div className={ className }
                 onDragStart={ handleDragStart }
                 onDragEnter={ handleDragEnter }
                 onDragLeave={ handleDragLeave }
                 onDragOver={ handleDragOver }
                 onDrop={ handleDrop }
                 draggable={ compName ? "true" : "false" }
            >
                <button className={ css['placeholder__remove'] }
                        onClick={ () => onRemoveClick( rowIndex, index ) }
                >
                    x
                </button>
                <div className={ css['placeholder__content'] }>
                    <Component />
                </div>
            </div>
}

function mapDispatchToProps( dispatch ) {

    return {
        onRemoveClick: ( rowIndex, phIndex ) => {
            dispatch( { type: 'design/remove-placeholder', rowIndex, phIndex } )
        },
        onCompPanelItemDrop: ( rowIndex, index, compName ) => {
            dispatch( { type: 'placeholder/add-comp-from-comp-panel', rowIndex, index, compName } )
        },
        onCompHolderDrop: payload => {
            dispatch( { type: 'placeholder/add-comp-from-comp-holder', ...payload } )
        }
    }   
}

const ReduxedPlaceholder = connect( null, mapDispatchToProps )( Placeholder );

export { Placeholder, ReduxedPlaceholder };