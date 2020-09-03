import React from 'react';
import ReactDOM from 'react-dom';
import { ResizableProvider } from '~/ui/resizable-provider';
import { Placeholder } from '~/ui/placeholder';
import css from './style.module.css';

console.log( 'Test resizable' );

ReactDOM.render(
    <ResizableProvider>
        <div className={ css.my } dnr="true" dnr-resize-style="absolute">absolute</div>
        <div className={ css.my2 } dnr="true" dnr-resize-style="margin">static</div>
        <div className={ css.my3 } dnr="resize" dnr-resize-style="margin" dnr-resize-factor="1">double</div>
    </ResizableProvider>,
    document.getElementById( 'container' )
);