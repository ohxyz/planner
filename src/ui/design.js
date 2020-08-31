import React from 'react';
import { ReduxedDesignRow } from './design-row';
import { connect } from 'react-redux';
import { addDesignRow, resizeDesignRow } from '~/redux/actions';
import css from '~/css/design.module.css';

class Design extends React.Component {

    static defaultProps = {

        rows: [],
        width: 100,
        height: 100,
        zoomFactor: 1,
        onAddRowClick: () => { throw new Error( 'n/a' ) },
        onResizeRowFinish: ( index, height ) => { throw new Error( 'n/a' ) }
    };

    constructor( props ) {

        super(props);

        this.lastY = 0;
        this.activeRowElement = null;
        this.activeRowHeight = -1;
        this.activeRowIndex = -1;
    }

    getRowIndex( element ) {

        const className = element.className;
        const rows = document.getElementsByClassName( className );

        for ( let i = 0; i < rows.length; i ++ ) {

            if ( rows[i] === element ) {

                return i;
            }
        }

        return -1;
    }

    handleMouseDown( event ) {

        if ( event.target.className.includes('resize-bar') ) {

            this.activeRowElement = event.target.parentElement;
            this.activeRowIndex = this.getRowIndex( this.activeRowElement );
            this.lastY = event.clientY;

            document.body.style.cursor = 'n-resize';
            document.body.style.userSelect = 'none';
        }
    }

    handleMouseUp( event ) {

        if ( this.activeRowElement ) {

            this.activeRowElement = null;
            document.body.style.cursor = 'auto';
            document.body.style.userSelect = 'auto';

            this.props.onResizeRowFinish( this.activeRowIndex, this.activeRowHeight );
        }
    }

    handleMouseMove( event ) {

        if ( this.activeRowElement ) {

            const minHeight = 10;
            const distY = event.clientY - this.lastY;
            const height = parseFloat( window.getComputedStyle( this.activeRowElement ).height );
            const newHeight = height + distY;

            if ( newHeight >= minHeight ) {

                this.activeRowElement.style.height = height + distY + 'px';
                this.lastY = event.clientY;
                this.activeRowHeight = newHeight;
            }
        }
    }

    render() {

        const style = { 
            width: this.props.width + 'px', 
            height: this.props.height + 'px',
        };

        return  <div className={ css['design'] }
                     style={ style }
                     onMouseDown={ this.handleMouseDown.bind(this) }
                     onMouseUp={ this.handleMouseUp.bind(this) }
                     onMouseMove={ this.handleMouseMove.bind(this) }
                     data-resizable="true"
                     data-resizable-factor={ this.props.zoomFactor }
                >
                    {
                        this.props.rows.map( (row, idx) => {

                            return  <ReduxedDesignRow 
                                        key={idx} 
                                        height={row.height} 
                                        index={idx} 
                                        id={row.id}
                                        placeholders={row.placeholders} 
                                    /> 
                        } )
                    }
                    <button className={ css['add-row'] } onClick={ this.props.onAddRowClick } >+</button>
                </div>

    }
}

const mapStateToProps = state => {

    return {
        width: state.undoable.present.design.width,
        height: state.undoable.present.design.height,
        rows: state.undoable.present.design.rows,
        zoomFactor: 2 / state.mainPanel.zoom
    };
};

const mapDispatchToProps = dispatch => {

    return {
        onAddRowClick: () => dispatch( addDesignRow() ),
        onResizeRowFinish: ( index, height ) => dispatch( resizeDesignRow( index, height ) )
    };
};

const ReduxedDesign = connect( mapStateToProps, mapDispatchToProps )( Design );

export { Design, ReduxedDesign };