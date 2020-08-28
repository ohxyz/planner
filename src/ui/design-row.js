import React from 'react';
import { connect } from 'react-redux';
import { removeDesignRow, addPlaceholder } from '~/redux/actions';
import { ReduxedPlaceholder } from './placeholder';
import css from '~/css/design.module.css';

const mapDispatchToProps = dispatch => {

    return {
        onRemoveRowClick: rowIndex => dispatch( removeDesignRow(rowIndex) ),
        onAddPlaceholderClick: rowIndex => dispatch( addPlaceholder(rowIndex) ),
    };
};

const ReduxedDesignRow = connect( null, mapDispatchToProps )( DesignRow );

function DesignRow( props ) {

    const {
        id = 'n/a',
        index = -1,
        height = 30,
        placeholders = [],
        onRemoveRowClick = () => { throw new Error( 'n/a' ) },
        onAddPlaceholderClick = () => { throw new Error( 'n/a' ) }
    } = props;

    const rowIndex = index;
    const style = { height: height + 'px' };

    return  <div className={ css['design-row'] } style={style}>
                <button className={ css['design-remove-row'] }
                        onClick={ () => onRemoveRowClick(index) } 
                >
                -
                </button>
                <em>{ id }</em>
                {
                    placeholders.map( (ph, idx) => 

                        <ReduxedPlaceholder key={idx} id={ph.id} index={idx} rowIndex={rowIndex}/>
                    )
                }
                <button className={ css['design-add-placeholder'] }
                        onClick={ () => onAddPlaceholderClick(index) }
                >
                +
                </button>
                <div className={ css['design-resize-bar'] }></div>
            </div>
}

export { DesignRow, ReduxedDesignRow };