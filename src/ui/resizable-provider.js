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

    isResizableElement( element ) {

        const attr = element.getAttribute( 'dnr' );
        return [ 'resize', 'true' ].indexOf( attr ) >= 0;
    }

    getResizeFactor( element ) {

        return parseFloat( element.getAttribute( 'dnr-resize-factor' ) ) || 1;
    }

    // Styles are: absolute, margin, default
    // default only updates width and height
    getResizeStyle( element ) {

        return element.getAttribute( 'dnr-resize-style' ) || 'default';
    }

    handleMouseDown( event ) {

        if ( this.isResizableElement(event.target) ) {

            this.activeElement = event.target;
            this.handleResizeStart( event );
        }
    }

    handleMouseMove( event ) {

        if ( this.isResizableElement( event.target ) ) {
            
            this.handleCursorStyle( event );
        }
        else {
            // Reset mouse when curor moves off border to container
            document.body.style.cursor = 'auto';
        }

        if ( this.activeElement ) {

            const dnrState = this.getDnrState( this.activeElement );

            if ( dnrState.includes('resize') ) {

                const resizeDirection = dnrState.split('-')[1];
                this.handleResize( event, resizeDirection );
            }
        }
    }

    handleMouseUp( event ) {

        if ( this.activeElement ) {
            
            this.handleResizeEnd();
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

        const borderRects = dom.getBorderRects( this.activeElement );
        const cursorX = event.clientX;
        const cursorY = event.clientY;

        if ( dom.isInRect( cursorX, cursorY, borderRects.top ) ) {

            this.setDnrState( this.activeElement, 'resize-top' );
            document.body.style.userSelect = 'none';
        }
        else if ( dom.isInRect( cursorX, cursorY, borderRects.right ) ) {
            
            this.setDnrState( this.activeElement, 'resize-right' );
            document.body.style.userSelect = 'none';
        }
        else if ( dom.isInRect( cursorX, cursorY, borderRects.bottom ) ) {
            
            this.setDnrState( this.activeElement, 'resize-bottom' );
            document.body.style.userSelect = 'none';
        }
        else if ( dom.isInRect( cursorX, cursorY, borderRects.left ) ) {
            
            this.setDnrState( this.activeElement, 'resize-left' );
            document.body.style.userSelect = 'none';
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
            document.body.style.cursor = 'auto';
        }
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