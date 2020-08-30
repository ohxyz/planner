import React from 'react';
import dom from './dom-utils';


class ResizableContainer extends React.Component {

    static defaultProps = {

        onResizeEnd: (element) => { console.log( element ) }
    }

    activeResizableElement = null;
    resizeDirection = 'none';
    lastX;
    lastY;
    minHeight = 10;
    minWidth = 10;

    constructor( props ) {

        super(props)

        this.myRef = React.createRef();

        document.addEventListener( 'mousemove', this.handleMouseMove.bind(this) );
        document.addEventListener( 'mousedown', this.handleMouseDown.bind(this) );
        document.addEventListener( 'mouseup', this.handleMouseUp.bind(this) );
    }

    isResizableElement( element ) {

        return element.className.includes( 'resizable' ) || element.getAttribute('resizable') ;
    }

    getFactor( element ) {

        return parseFloat( element.getAttribute( 'resizable-factor' ) ) || 1;
    }

    handleMouseDown( event ) {

        if ( this.isResizableElement(event.target) ) {

            this.activeResizableElement = event.target;
            this.handleResizeStart( event );
        }
    }

    handleMouseMove( event ) {

        if ( this.isResizableElement( event.target ) ) {
            
            this.handleCursorStyle( event );
        }
        else {
            // Reset mouse when curor moves off border to container
            this.myRef.current.style.cursor = 'auto';
        }

        if ( this.activeResizableElement && this.resizeDirection !== 'none' ) {

            this.handleResize( event, this.resizeDirection );
        }
    }

    handleMouseUp( event ) {

        if ( this.activeResizableElement ) {
            
            this.handleResizeEnd();
        }
    }

    handleResize( event, direction ) {

        const style = window.getComputedStyle( this.activeResizableElement );
       
        const width = parseFloat( style.width );
        const height = parseFloat( style.height );
        const top = parseFloat( style.top );
        const left = parseFloat( style.left );
        
        const factor = this.getFactor( this.activeResizableElement );
        const distX = factor * ( event.clientX - this.lastX );
        const distY = factor * ( event.clientY - this.lastY );

        if ( direction === 'top' ) {

            const newHeight = height - distY;

            if ( newHeight >= this.minHeight ) {

                this.activeResizableElement.style.top = top + distY + 'px';
                this.activeResizableElement.style.height = newHeight + 'px';
                this.lastY = event.clientY;
                this.myRef.current.style.cursor = 'n-resize';
            }
        }
        else if ( direction === 'bottom' ) {

            const newHeight = height + distY;

            if ( newHeight >= this.minHeight ) {

                this.activeResizableElement.style.height = newHeight + 'px';
                this.lastY = event.clientY;
                this.myRef.current.style.cursor = 's-resize';
            }
        }
        else if ( direction === 'left' ) {

            const newWidth = width - distX;

            if ( newWidth >= this.minWidth ) {
                
                this.activeResizableElement.style.left = left + distX + 'px';
                this.activeResizableElement.style.width = newWidth + 'px';
                this.lastX = event.clientX;
                this.myRef.current.style.cursor = 'w-resize';
            }
        }
        else if ( direction === 'right' ) {

            const newWidth = width + distX;

            if ( newWidth >= this.minWidth ) {
                
                this.activeResizableElement.style.width = newWidth + 'px';
                this.lastX = event.clientX;
                this.myRef.current.style.cursor = 'e-resize';
            }
        }

        this.myRef.current.style.userSelect = 'none';
    }

    handleResizeStart( event ) {

        const borderRects = dom.getBorderRects( this.activeResizableElement );
        const cursorX = event.clientX;
        const cursorY = event.clientY;

        if ( dom.isInRect( cursorX, cursorY, borderRects.top ) ) {

            this.resizeDirection = 'top';
            this.myRef.current.style.userSelect = 'none';
        }
        else if ( dom.isInRect( cursorX, cursorY, borderRects.right ) ) {
            
            this.resizeDirection = 'right';
            this.myRef.current.style.userSelect = 'none';
        }
        else if ( dom.isInRect( cursorX, cursorY, borderRects.bottom ) ) {
            
            this.resizeDirection = 'bottom';
            this.myRef.current.style.userSelect = 'none';
        }
        else if ( dom.isInRect( cursorX, cursorY, borderRects.left ) ) {
            
            this.resizeDirection = 'left'
            this.myRef.current.style.userSelect = 'none';
        }
        else {
            
            this.resizeDirection = 'none';
        }

        this.lastX = cursorX;
        this.lastY = cursorY;

    }

    handleResizeEnd() {

        this.props.onResizeEnd( this.activeResizableElement );
        this.activeResizableElement = null;
        this.myRef.current.style.userSelect = 'auto';
    }

    handleCursorStyle( event ) {

        const borderRects = dom.getBorderRects( event.target );
        const cursorX = event.clientX;
        const cursorY = event.clientY;

        if ( dom.isInRect( cursorX, cursorY, borderRects.top ) ) {
            this.myRef.current.style.cursor = 'n-resize';
        }
        else if ( dom.isInRect( cursorX, cursorY, borderRects.right ) ) {
            this.myRef.current.style.cursor = 'e-resize';
        }
        else if ( dom.isInRect( cursorX, cursorY, borderRects.bottom ) ) {
            this.myRef.current.style.cursor = 's-resize';
        }
        else if ( dom.isInRect( cursorX, cursorY, borderRects.left ) ) {
            this.myRef.current.style.cursor = 'w-resize';
        }
        else {
            this.myRef.current.style.cursor = 'auto';
        }
    }

    render() {

        // debug
        const style = {
            
            width: '100px',
            height: '100px',
            backgroundColor: '#00ff0030',
        };

        return (

        <div style={ style } 
             ref={ this.myRef }
        >
            { this.props.children }
        </div>
        
        )
    }
}

export { ResizableContainer };