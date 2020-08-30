import React from 'react';
import ReactDOM from 'react-dom';
import { Resizable } from '~/ui/resizable';
import { ResizableContainer } from '~/ui/resizable-container';
import { Placeholder } from '~/ui/placeholder';
import css from './style.module.css';

console.log( 'Test resizable' );


ReactDOM.render(
    <ResizableContainer>
        <Resizable />
        <div className={  css.my } resizable="true" resizable-factor="1" >Re</div>
    </ResizableContainer>,
    document.getElementById('container')
);