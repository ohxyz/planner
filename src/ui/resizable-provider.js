import React from 'react';
import dom from './dom-utils';

class ResizableProvider extends React.Component {

    static defaultProps = {

        onResizeStart: element => {},
        onResize: element => {},
        onResizeEnd: element => {}
    }

    activeResizableElement = null;
    resizeDirection = 'none';
    lastX;
    lastY;
    minHeight = 10;
    minWidth = 10;

    constructor( props ) {

        super(props)

        document.addEventListener( 'mousemove', this.handleMouseMove.bind(this) );
        document.addEventListener( 'mousedown', this.handleMouseDown.bind(this) );
        document.addEventListener( 'mouseup', this.handleMouseUp.bind(this) );
    }

    isResizableElement( element ) {

        return element.className.includes( 'resizable' ) || element.getAttribute( 'resizable' );
    }

    getResizeFactor( element ) {

        return parseFloat( element.getAttribute( 'resizable-factor' ) ) || 1;
    }

    // Styles are: absolute, margin, default
    // default only updates width and height
    getResizeStyle( element ) {

        return element.getAttribute( 'resizable-style' ) || 'default';
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
            document.body.style.cursor = 'auto';
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

        if ( style.position !== 'static' && style.position !== 'absolute' ) {

            throw new Error( "Resizable's position must be `static` or `absolute`" );
        }

        const resizeStyle = this.getResizeStyle( this.activeResizableElement );

        console.log( resizeStyle )
       
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

            this.activeResizableElement.style.marginLeft = marginLeft + 'px';
            this.activeResizableElement.style.marginTop = marginTop + 'px';
            this.activeResizableElement.style.marginBottom = marginBottom + 'px';
            this.activeResizableElement.style.marginRight = marginRight + 'px';
        }

        const factor = this.getResizeFactor( this.activeResizableElement );
        const distX = factor * ( event.clientX - this.lastX );
        const distY = factor * ( event.clientY - this.lastY );

        if ( direction === 'top' ) {

            const newHeight = height - distY;

            if ( newHeight >= this.minHeight ) {

                if ( style.position === 'absolute' && resizeStyle === 'absolute' ) {

                    this.activeResizableElement.style.top = top + distY + 'px';
                }
                else if ( style.position === 'static' && resizeStyle === 'margin' ) {

                    this.activeResizableElement.style.marginTop = marginTop + distY + 'px';
                }

                this.activeResizableElement.style.height = newHeight + 'px';
                this.lastY = event.clientY;
                document.body.style.cursor = 'n-resize';
            }
        }
        else if ( direction === 'left' ) {

            const newWidth = width - distX;

            if ( newWidth >= this.minWidth ) {

                if ( style.position === 'absolute' && resizeStyle === 'absolute' ) {

                    this.activeResizableElement.style.left = left + distX + 'px';
                }
                else if ( style.position === 'static' && resizeStyle === 'margin') {

                    this.activeResizableElement.style.marginLeft = marginLeft + distX + 'px';
                }

                this.activeResizableElement.style.width = newWidth + 'px';
                this.lastX = event.clientX;
                document.body.style.cursor = 'w-resize';
            }
        }
        else if ( direction === 'bottom' ) {

            const newHeight = height + distY;

            if ( newHeight >= this.minHeight ) {

                this.activeResizableElement.style.height = newHeight + 'px';
                this.lastY = event.clientY;
                document.body.style.cursor = 's-resize';
            }
        }
        else if ( direction === 'right' ) {

            const newWidth = width + distX;

            if ( newWidth >= this.minWidth ) {
                
                this.activeResizableElement.style.width = newWidth + 'px';
                this.lastX = event.clientX;
                document.body.style.cursor = 'e-resize';
            }
        }

        document.body.style.userSelect = 'none';

        this.props.onResize( this.activeResizableElement );

    }

    handleResizeStart( event ) {

        const borderRects = dom.getBorderRects( this.activeResizableElement );
        const cursorX = event.clientX;
        const cursorY = event.clientY;

        if ( dom.isInRect( cursorX, cursorY, borderRects.top ) ) {

            this.resizeDirection = 'top';
            document.body.style.userSelect = 'none';
        }
        else if ( dom.isInRect( cursorX, cursorY, borderRects.right ) ) {
            
            this.resizeDirection = 'right';
            document.body.style.userSelect = 'none';
        }
        else if ( dom.isInRect( cursorX, cursorY, borderRects.bottom ) ) {
            
            this.resizeDirection = 'bottom';
            document.body.style.userSelect = 'none';
        }
        else if ( dom.isInRect( cursorX, cursorY, borderRects.left ) ) {
            
            this.resizeDirection = 'left'
            document.body.style.userSelect = 'none';
        }
        else {
            
            this.resizeDirection = 'none';
        }

        this.lastX = cursorX;
        this.lastY = cursorY;

        this.props.onResizeStart( this.activeResizableElement );

    }

    handleResizeEnd() {

        this.props.onResizeEnd( this.activeResizableElement );
        this.activeResizableElement = null;
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

    render() {

        return this.props.children;
    }
}

export { ResizableProvider };