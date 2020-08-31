import React, { useState } from 'react';
import { connect } from 'react-redux';
import { store } from '~/redux/store';
import { zoomMainPanel } from '~/redux/actions';

class MainPanelZoomer {

    constructor() {

        this.step = 0.1
        this.shouldOverrideDefault = true;
        this.min = 0.1;
        this.max = 10;

        this.__requireRedraw = true;

        this.init();
    }

    init() {

        // Override default browser's zoom in/out
        if ( this.shouldOverrideDefault ) {

            window.addEventListener( 'wheel', this.handleWheel.bind(this), { passive: false } );
            window.addEventListener( 'keydown', this.handleKeyDown.bind(this) );
        }
    }

    handleWheel( event ) {

        if ( event.ctrlKey === true ) {
            
            event.preventDefault();

            if ( event.deltaY > 0 ) {

                this.out();
            }
            else if ( event.deltaY < 0 ) {

                this.in();
            }
        }
    }

    handleKeyDown( event ) {

        if ( event.ctrlKey === true ) {

            // Ctrl and 0, keyboard number pad not tested
            if ( event.keyCode === 48 ) {

                // Only when both keys are pressed, otherwise e.g Ctrl+R won't work
                event.preventDefault();
                this.reset();
            }
            // Ctrl and -
            else if ( event.keyCode === 189 ) {

                event.preventDefault();
                this.out();
            }
            // Ctrl and + 
            else if ( event.keyCode === 187 ) {

                event.preventDefault();
                this.in();
            }
        }
    }

    getCurrentSize() {

        return store.getState().mainPanel.zoom;
    }

    reset() {

        this.to(1);
    }

    in() {

        let size = this.getCurrentSize();

        size += this.step;
        this.to( size );
    }

    out() {

        let size = this.getCurrentSize();

        size -= this.step;
        this.to( size );
    }

    to( size ) {

        if ( size <= this.min || size >= this.max ) {
            return;
        }

        store.dispatch( zoomMainPanel(size) );

        // Force Chrome to redraw, so the scrollbar will appear when zoom in/out
        // Firefox is fine
        if ( this.__requireRedraw ) {

            const elem = document.createElement( 'div' );
            document.body.appendChild( elem );

            setTimeout( () => elem.remove(), 20 );

            this.__requireRedraw = false;
        }
    }
}


class ZoomMainPanelTool extends React.Component {

    constructor( props ) {

        super(props);

        this.state = {
            inputValue: ZoomMainPanelTool.format( this.props.zoom )
        };
    }

    static format( number ) {

        return parseInt( number * 100 ) + '%';
    }

    handleInputChange( event ) {

        this.setState( { inputValue: event.target.value } );
    }

    handleKeyUp( event ) {

        if ( event.keyCode === 13 ) {

            const size = parseFloat(event.target.value) / 100;
            this.props.onZoomChange( size );
        }
    }

    handleInputBlur( event ) {

        this.setState( { inputValue: ZoomMainPanelTool.format( this.props.zoom ) } )
    }

    render() { 

        return (
            
        <div>
            <label>
                Zoom
                <input type="text" 
                       size="5" 
                       value={ this.state.inputValue }
                       onKeyUp={ this.handleKeyUp.bind(this) } 
                       onChange={ this.handleInputChange.bind(this) }
                       onBlur={ this.handleInputBlur.bind(this) }
                />
            </label>
        </div>

        );
    }
}

const ReduxedZoomMainPanelTool = connect(

    state => {

        return {
            zoom: state.mainPanel.zoom,
            // Use a key for React to recreate the component, rather than update
            key: state.mainPanel.zoom
        };
    },

    dispatch => {

        return {
            onZoomChange: ( size ) => dispatch( zoomMainPanel(size) )
        }
    }

)( ZoomMainPanelTool );

export { MainPanelZoomer, ReduxedZoomMainPanelTool }