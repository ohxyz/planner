import React from 'react';
import { ReduxedDesignRow } from './design-row';
import { connect } from 'react-redux';
import { addDesignRow, resizeDesignRow } from './redux/actions';

const mapStateToProps = state => {

    return {
        design: state.design.present.design
    };
};

const mapDispatchToProps = dispatch => {

    return {
        onAddRowClick: () => dispatch( addDesignRow() ),
        onResizeRowFinish: ( index, height ) => dispatch( resizeDesignRow( index, height ) )
    };
};

const ReduxedDesign = connect( mapStateToProps, mapDispatchToProps )( Design );

function Design( props ) {

    const {

        design = { rows: [] },
        onAddRowClick = () => { throw new Error( 'n/a' ) },
        onResizeRowFinish = ( index, height ) => { throw new Error( 'n/a' ) }

    } = props;

    let lastY = 0;
    let activeRowElement = null;
    let activeRowHeight = -1;
    let activeRowIndex = -1;

    function getRowIndex( element ) {

        const className = element.className;
        const rows = document.getElementsByClassName( className );

        for ( let i = 0; i < rows.length; i ++ ) {

            if ( rows[i] === element ) {

                return i;
            }
        }

        return -1;
    }

    function handleMouseDown( event ) {

        if ( event.target.classList.contains( 'design__resize-bar' ) ) {

            activeRowElement = event.target.parentElement;
            activeRowIndex = getRowIndex( activeRowElement );
            lastY = event.clientY;

            document.body.style.cursor = 'n-resize';
            document.body.style.userSelect = 'none';
        }
    }

    function handleMouseUp( event ) {

        if ( activeRowElement ) {

            activeRowElement = null;
            document.body.style.cursor = 'auto';
            document.body.style.userSelect = 'auto';

            onResizeRowFinish( activeRowIndex, activeRowHeight );
        }
    }

    function handleMouseMove( event ) {

        if ( activeRowElement ) {

            const minHeight = 10;
            const distY = event.clientY - lastY;
            const height = parseFloat( window.getComputedStyle( activeRowElement ).height );
            const newHeight = height + distY;

            if ( newHeight >= minHeight ) {

                activeRowElement.style.height = height + distY + 'px';
                lastY = event.clientY;
                activeRowHeight = newHeight;
            }
        }
    }

    return  <div className="design" 
                 onMouseDown={ handleMouseDown }
                 onMouseUp={ handleMouseUp }
                 onMouseMove={ handleMouseMove }
            >
                {
                    design.rows.map( (row, idx) => {

                        return  <ReduxedDesignRow 
                                    key={idx} 
                                    height={row.height} 
                                    index={idx} 
                                    id={row.id}
                                    placeholders={row.placeholders} 
                                /> 
                    } )
                }
                <button className="design__add-row" onClick={ onAddRowClick } >+</button>
            </div>
}

export { Design, ReduxedDesign };