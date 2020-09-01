import React from 'react';
import ReactDOM from 'react-dom';
import { ResizableProvider } from '~/ui/resizable-provider';
import { Placeholder } from '~/ui/placeholder';
import css from './style.module.css';

console.log( 'Test resizable' );

ReactDOM.render(
    <ResizableProvider>
        <div className={ css.my } resizable="true" resizable-style="absolute">absolute</div>
        <div className={ css.my2 } resizable="true" resizable-style="margin">static</div>

    </ResizableProvider>,
    document.getElementById('container')
);