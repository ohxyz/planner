import React from 'react';
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

    return  <div className={ css.placeholder }>
                <b>{ id }</b>
                <button className={ css.remove }
                        onClick={ () => onRemovePlaceholderClick( rowIndex, index ) }
                >
                x
                </button>
            </div>
}

const ReduxedPlaceholder = connect( null, mapDispatchToProps )( Placeholder );

export { Placeholder, ReduxedPlaceholder };