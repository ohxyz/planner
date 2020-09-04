import React, { useState } from 'react';
import { connect } from 'react-redux';
import { removePlaceholder } from '~/redux/actions';
import css from '~/css/placeholder.module.css';

function mapDispatchToProps( dispatch ) {

    return {
        onRemovePlaceholderClick: (rowIndex, index) => dispatch( removePlaceholder(rowIndex, index) )
    }   
}

function Placeholder( props ) {

    const { 
        id = 'n/a',
        rowIndex = -1,
        index = -1,
        onRemovePlaceholderClick = () => { throw new Error('n/a') }
    } = props;

    const [ style, setStyle ] = useState( { backgroundColor: '#0000ff11' } );

    function handleDragEnter( event ) {

        setStyle( { backgroundColor: '#0000ff33'} );
    }

    function handleDragLeave( event ) {

        setStyle( { backgroundColor: '#0000ff11'} )
    }

    function handleDragOver( event ) {

        event.preventDefault();
        event.dataTransfer.dropEffect = 'copy';
    }

    return  <div className={ css['placeholder'] }
                 style={ style }
                 onDragEnter={ handleDragEnter }
                 onDragLeave={ handleDragLeave }
                 onDragOver={ handleDragOver }
            >
                <b>{ id }</b>
                <button className={ css['remove-placeholder'] }
                        onClick={ () => onRemovePlaceholderClick( rowIndex, index ) }
                >
                    x
                </button>
            </div>
}

const ReduxedPlaceholder = connect( null, mapDispatchToProps )( Placeholder );

export { Placeholder, ReduxedPlaceholder };