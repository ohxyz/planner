import css from '~/css/placeholder.module.css';
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { 
    removePlaceholder, 
    addCompFromCompPanel,
    addCompFromPlaceholder
} from '~/redux/actions';
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

    const [ style, setStyle ] = useState( { backgroundColor: '#0000ff11' } );
    const Component = compStore.get( compName ) || ( () => 'n/a' );

    function handleDragEnter( event ) {

        setStyle( {backgroundColor: '#0000ff33'} );
    }

    function handleDragLeave( event ) {

        setStyle( {backgroundColor: '#0000ff11'} )
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
            throw new Error( 'DataTransfer is not a valid JSON object!' );
        }

        if ( data.src === 'comp-panel-item' ) {

            onCompPanelItemDrop( rowIndex, index, data.compName );
            return;
        }

        if ( data.src === 'comp-holder' ) {

            onCompHolderDrop( rowIndex, index, data.compName, data.phIndex );
            return;
        }
    }

    return  <div className={ css['placeholder'] }
                 style={ style }
                 onDragEnter={ handleDragEnter }
                 onDragLeave={ handleDragLeave }
                 onDragOver={ handleDragOver }
                 onDrop={ handleDrop }
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
        onRemoveClick: ( rowIndex, index ) => dispatch( removePlaceholder(rowIndex, index) ),
        onCompPanelItemDrop: ( rowIndex, index, compName ) => dispatch( addCompFromCompPanel(rowIndex, index, compName) ),
        onCompHolderDrop: ( rowIndex, index, compName, phIndex ) => dispatch( addCompFromPlaceholder(rowIndex, index, compName, phIndex) )
    }   
}

const ReduxedPlaceholder = connect( null, mapDispatchToProps )( Placeholder );

export { Placeholder, ReduxedPlaceholder };