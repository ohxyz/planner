import React from 'react';
import dom from './dom-utils';

class DnrProvider {

    activeElement = null;
    resizeDirection = 'none';
    lastX;
    lastY;
    minHeight = 10;
    minWidth = 10;

    constructor( args = {} ) {

        const {
            onResizeEnd = element => {},
            onResize = element => {},
            onResizeStart = element => {}
        } = args;

        this.onResizeStart = onResizeStart;
        this.onResize = onResize;
        this.onResizeEnd = onResizeEnd;
        this.defaultCursorStyle = window.getComputedStyle( document.body ).cursor;
    }

    throwErrorIfNativeDraggable( element ) {

        if ( this.isNativeDraggable( element ) ){
            throw new Error( 'Native draggable does not work with Dnr!' );
        }
    }

    init() {

        document.addEventListener( 'mousemove', this.handleMouseMove.bind(this) );
        document.addEventListener( 'mousedown', this.handleMouseDown.bind(this) );
        document.addEventListener( 'mouseup', this.handleMouseUp.bind(this) );
    }

    setDnrState( element, state ) {

        element.setAttribute( 'dnr-state', state );
    }

    getDnrState( element ) {

        return element.getAttribute( 'dnr-state' );
    }

    isResizable( element ) {

        return element.getAttribute( 'dnr-resize' ) === 'true';
    }

    isDraggable( element ) {

        return element.getAttribute( 'dnr-drag' ) === 'true';
    }

    isNativeDraggable( element ) {

        return element.getAttribute( 'draggable' ) !== null;
    }

    getResizeFactor( element ) {

        return parseFloat( element.getAttribute( 'dnr-resize-factor' ) ) || 1;
    }

    // Styles are: absolute, margin, default
    // default only updates width and height
    getResizeStyle( element ) {

        return element.getAttribute( 'dnr-resize-style' ) || 'default';
    }

    getDragStyle( element ) {

        return element.getAttribute( 'dnr-drag-style' ) || 'absolute';
    }


    handleMouseDown( event ) {

        if ( this.isResizable(event.target) ) {

            this.throwErrorIfNativeDraggable( event.target );
            this.handleResizeStart( event );
        }

        if ( this.isDraggable(event.target) ) {

            this.throwErrorIfNativeDraggable( event.target );
            this.handleDragStart( event );
        }
    }

    handleMouseMove( event ) {

        this.isNativeDraggable( event.target );

        if ( this.isResizable( event.target ) ) {
            
            this.handleCursorStyle( event );
        }
        else {
            // Reset cusor style when curor moves off the border
            document.body.style.cursor = this.defaultCursorStyle;
        }

        if ( this.activeElement ) {

            const dnrState = this.getDnrState( this.activeElement );

            // dnrState can be `resize-top`, `resize-left`, etc
            if ( dnrState.includes('resize') ) {

                const resizeDirection = dnrState.split('-')[1];
                this.handleResize( event, resizeDirection );
            }
            else if ( dnrState === 'drag' ) {

                this.handleDrag( event );
            }
        }
    }

    handleMouseUp( event ) {

        if ( this.activeElement ) {

            const dnrState = this.getDnrState(this.activeElement);
            
            if ( dnrState.includes( 'resize' ) ) {

                this.handleResizeEnd();
            }
            else if ( dnrState === 'drag' ) {

                this.handleDragEnd();
            }
        }
    }

    handleResize( event, direction ) {

        const style = window.getComputedStyle( this.activeElement );

        if ( style.position !== 'static' && style.position !== 'absolute' ) {

            throw new Error( "Resizable's position must be `static` or `absolute`" );
        }

        const resizeStyle = this.getResizeStyle( this.activeElement );
        const width = parseFloat( style.width );
        const height = parseFloat( style.height );

        const top = parseFloat( style.top );
        const left = parseFloat( style.left );

        const marginLeft = parseFloat( style.marginLeft );
        const marginTop = parseFloat( style.marginTop );
        const marginRight = parseFloat( style.marginRight );
        const marginBottom = parseFloat( style.marginBottom );

        // Reset with all calculated value, in the case margin is set to `auto`
        if ( style.position === 'static' && resizeStyle === 'margin' ) {

            this.activeElement.style.marginLeft = marginLeft + 'px';
            this.activeElement.style.marginTop = marginTop + 'px';
            this.activeElement.style.marginBottom = marginBottom + 'px';
            this.activeElement.style.marginRight = marginRight + 'px';
        }

        const factor = this.getResizeFactor( this.activeElement );
        const distX = factor * ( event.clientX - this.lastX );
        const distY = factor * ( event.clientY - this.lastY );

        if ( direction === 'top' ) {

            const newHeight = height - distY;

            if ( newHeight >= this.minHeight ) {

                if ( style.position === 'absolute' && resizeStyle === 'absolute' ) {

                    this.activeElement.style.top = top + distY + 'px';
                }
                else if ( style.position === 'static' && resizeStyle === 'margin' ) {

                    this.activeElement.style.marginTop = marginTop + distY + 'px';
                }

                this.activeElement.style.height = newHeight + 'px';
                this.lastY = event.clientY;
                document.body.style.cursor = 'n-resize';
            }
        }
        else if ( direction === 'left' ) {

            const newWidth = width - distX;

            if ( newWidth >= this.minWidth ) {

                if ( style.position === 'absolute' && resizeStyle === 'absolute' ) {

                    this.activeElement.style.left = left + distX + 'px';
                }
                else if ( style.position === 'static' && resizeStyle === 'margin') {

                    this.activeElement.style.marginLeft = marginLeft + distX + 'px';
                }

                this.activeElement.style.width = newWidth + 'px';
                this.lastX = event.clientX;
                document.body.style.cursor = 'w-resize';
            }
        }
        else if ( direction === 'bottom' ) {

            const newHeight = height + distY;

            if ( newHeight >= this.minHeight ) {

                this.activeElement.style.height = newHeight + 'px';
                this.lastY = event.clientY;
                document.body.style.cursor = 's-resize';
            }
        }
        else if ( direction === 'right' ) {

            const newWidth = width + distX;

            if ( newWidth >= this.minWidth ) {
                
                this.activeElement.style.width = newWidth + 'px';
                this.lastX = event.clientX;
                document.body.style.cursor = 'e-resize';
            }
        }

        document.body.style.userSelect = 'none';

        this.onResize( this.activeElement );
    }

    handleResizeStart( event ) {

        this.activeElement = event.target;
        
        const borderRects = dom.getBorderRects( this.activeElement );
        const cursorX = event.clientX;
        const cursorY = event.clientY;

        if ( dom.isInRect( cursorX, cursorY, borderRects.top ) ) {

            this.setDnrState( this.activeElement, 'resize-top' );
        }
        else if ( dom.isInRect( cursorX, cursorY, borderRects.right ) ) {
            
            this.setDnrState( this.activeElement, 'resize-right' );
        }
        else if ( dom.isInRect( cursorX, cursorY, borderRects.bottom ) ) {
            
            this.setDnrState( this.activeElement, 'resize-bottom' );
        }
        else if ( dom.isInRect( cursorX, cursorY, borderRects.left ) ) {
            
            this.setDnrState( this.activeElement, 'resize-left' );
        }
        else {

            this.setDnrState( this.activeElement, 'static' );
        }

        this.lastX = cursorX;
        this.lastY = cursorY;

        this.onResizeStart( this.activeElement );
    }

    handleResizeEnd() {

        this.onResizeEnd( this.activeElement );
        this.setDnrState( this.activeElement, 'static' );
        this.activeElement = null;
        document.body.style.userSelect = 'auto';
    }

    handleCursorStyle( event ) {

        const borderRects = dom.getBorderRects( event.target );
        const cursorX = event.clientX;
        const cursorY = event.clientY;

        if ( dom.isInRect( cursorX, cursorY, borderRects.top ) ) {
            document.body.style.cursor = 'n-resize';
        }
        else if ( dom.isInRect( cursorX, cursorY, borderRects.right ) ) {
            document.body.style.cursor = 'e-resize';
        }
        else if ( dom.isInRect( cursorX, cursorY, borderRects.bottom ) ) {
            document.body.style.cursor = 's-resize';
        }
        else if ( dom.isInRect( cursorX, cursorY, borderRects.left ) ) {
            document.body.style.cursor = 'w-resize';
        }
        else {
            document.body.style.cursor = this.defaultCursorStyle;
        }
    }

    handleDragStart( event ) {

        const innerRect = dom.getInnerRect( event.target );

        if ( dom.isInRect( event.clientX, event.clientY, innerRect ) ) {

            this.activeElement = event.target;
            this.setDnrState( this.activeElement, 'drag' );
            document.body.style.cursor = 'move';
        }
    }

    handleDrag( event ) {

        const distX = event.clientX - this.lastX;
        const distY = event.clientY - this.lastY;

        const style = window.getComputedStyle( this.activeElement );
        const dragStyle = this.getDragStyle( this.activeElement );

        if ( dragStyle === 'absolute' && style.position === 'absolute' ) {

            const x = parseFloat( style.left );
            const y = parseFloat( style.top );

            this.activeElement.style.top = y + distY + 'px' ;
            this.activeElement.style.left = x + distX + 'px';
        }
        else if ( dragStyle === 'margin' ) {

            const marginLeft = parseFloat( style.marginLeft );
            const marginTop = parseFloat( style.marginTop );

            this.activeElement.style.marginTop = marginTop + distY + 'px' ;
            this.activeElement.style.marginLeft = marginLeft + distX + 'px';
        }

        this.lastX = event.clientX;
        this.lastY = event.clientY;

        document.body.style.userSelect = 'none';
        document.body.style.cursor = 'move';
    }

    handleDragEnd() {

        this.setDnrState( this.activeElement, 'static' );
        this.activeElement = null;
        document.body.style.userSelect = 'auto';
    }
}

function ResizableProvider(props) {

    const provider = new DnrProvider( {

        onResizeStart: props.onResizeStart,
        onResize: props.onResize,
        onResizeEnd: props.onResizeEnd,
    } );

    provider.init();

    return props.children;
}

export { ResizableProvider };