import React from 'react';
import ReactDOM from 'react-dom';
import { ResizableProvider } from '~/ui/resizable-provider';
import { Placeholder } from '~/ui/placeholder';
import css from './style.module.css';

console.log( 'Test resizable' );

ReactDOM.render(
    <ResizableProvider>
        <div className={ css.my } data-resizable="true">Re</div>
    </ResizableProvider>,
    document.getElementById('container')
);