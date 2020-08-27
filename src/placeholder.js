import React from 'react';
import { connect } from 'react-redux';
import { removePlaceholder } from './redux/actions';

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

    return  <div className="placeholder">
                <b>{ id }</b>
                <button className="placeholder__remove"
                        onClick={ () => onRemovePlaceholderClick( rowIndex, index ) }
                >
                x
                </button>
            </div>
}

const ReduxedPlaceholder = connect( null, mapDispatchToProps )( Placeholder );

export { Placeholder, ReduxedPlaceholder };