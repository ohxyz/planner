import React from 'react';
import ReactDOM from 'react-dom';
import { ResizableProvider } from '~/ui/resizable-provider';
import { Placeholder } from '~/ui/placeholder';
import { CompHolder } from '~/ui/comp-holder';
import css from './style.module.css';

console.log( 'Test resizable' );


function App() {

    function handleDragStart( event ) {

        console.log( 'start' );
        event.dataTransfer.effectAllowed = 'all';

        const dataString = JSON.stringify( { type: 'comp-panel-item', name: 'my-name' } )

        event.dataTransfer.setData( 'text/plain', dataString );
    }

    function handleDragEnter( event ) {

        console.log( 'enter' )
    }

    function handleDragOver( event ) {

        console.log( 'over' )
        event.preventDefault();
        event.dataTransfer.dropEffect = 'copy';
    }

    return  <ResizableProvider>
                <div className={ css.my } dnr="true" dnr-resize-style="absolute">absolute</div>
                <div className={ css.my2 } dnr="true" dnr-resize-style="margin" dnr-drag-style="margin">static</div>
                <div className={ css.my3 } dnr="resize" dnr-resize-style="margin" dnr-resize-factor="1">double</div>
                <div className={ css.my4 } 
                     dnr-resize-style="absolute" 
                     draggable="true" 
                     onDragStart={ handleDragStart } 
                >
                    draggble
                </div>
                <div className="dropzone" 
                     onDragEnter={ handleDragEnter } 
                     onDragOver={ handleDragOver } 
                >
                    Dropzone
                </div>
                <CompHolder />

            </ResizableProvider>
}

ReactDOM.render(
    <App />,
    document.getElementById( 'container' )
);