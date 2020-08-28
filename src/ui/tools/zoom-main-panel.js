import { store } from '~/redux/store';
import { zoomMainPanel } from '~/redux/actions';

class Zoom {

    constructor( size=1, step=0.1 ) {

        this.size = size;
        this.step = step;
        this.min = 0.1;
        this.max = 10;
    }

    init() {

    }

    in() {

        if ( this.size >= this.max ) {
            return;
        }

        this.size += this.step;
        store.dispatch( zoomMainPanel(this.size) );

        return this.size;
    }

    out() {

        if ( this.size <= this.min ) {
            return;
        }

        this.size -= this.step;
        store.dispatch( zoomMainPanel(this.size) );

        return this.size;
    }

    to( size ) {

        if ( size <= this.min || size >= this.max ) {
            return;
        }

        this.size = size;
        store.dispatch( zoomMainPanel(this.size) );
    }
}



export { Zoom }