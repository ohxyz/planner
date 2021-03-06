import { ActionCreators } from 'redux-undo';
import { store } from '~/redux/store';

class Hotkeys {

    constructor( { mainPanelZoomer } ) {

        this.shouldOverrideDefault = true;
        this.mainPanelZoomer = mainPanelZoomer;
    }

    init() {

        // Override default browser's hotkeys
        if ( this.shouldOverrideDefault ) {

            // Set `passive` to false, to disable browser's default zoom in/out
            window.addEventListener( 'wheel', this.handleWheel.bind(this), { passive: false } );
            window.addEventListener( 'keydown', this.handleKeyDown.bind(this) );
        }
    }

    handleWheel( event ) {

        if ( event.ctrlKey === true ) {
            
            event.preventDefault();

            if ( event.deltaY > 0 ) {

                this.mainPanelZoomer.out();
            }
            else if ( event.deltaY < 0 ) {

                this.mainPanelZoomer.in();
            }
        }
    }

    handleKeyDown( event ) {

        if ( event.ctrlKey === true ) {

            // Ctrl and 0, keyboard number pad not tested
            if ( event.key === '0' ) {

                // Only when both keys are pressed, otherwise e.g Ctrl+R won't work
                event.preventDefault();
                this.mainPanelZoomer.reset();
            }
            // Ctrl and -
            else if ( event.key === '-' ) {

                event.preventDefault();
                this.mainPanelZoomer.out();
            }
            // Ctrl and + 
            else if ( event.key === '=' ) {

                event.preventDefault();
                this.mainPanelZoomer.in();
            }
            else if ( event.key === 'z' ) {

                store.dispatch( ActionCreators.undo() );
            }
            else if ( event.key === 'y' ) {

                store.dispatch( ActionCreators.redo() );
            }
        }
    }
}

export { Hotkeys }