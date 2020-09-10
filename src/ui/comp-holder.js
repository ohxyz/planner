import React, { useState }  from 'react';
import css from '~/css/comp-holder.module.css';
import dom from './dom-utils';
import { compStore } from '~/comp-store';

function CompHolder( props ) {

    const { 
        top = 0, 
        left = 0,
        compName = 'n/a',
        index = -1,
        onDragEnd = () => { throw new Error('onDragEnd n/a') },
        onClose = () => { throw new Error('onClose n/a') }
    } = props;

    let startX = top;
    let startY = left;

    const style = { top, left };
    const Component = compStore.get( compName ) || ( () => 'n/a' );

    function handleDragStart( event ) {

        // In Firefox, clientX/Y, pageX/Y all returns 0 in dragend
        // So, use screenX/Y
        // But, when move the browser window from one monitor to another, it may cause bugs in Firefox.
        startX = event.clientX;
        startY = event.clientY;

        event.dataTransfer.effectAllowed = "all";

        const data = { src: 'comp-holder', compName, phIndex: index };
        event.dataTransfer.setData( 'text/plain', JSON.stringify(data) );
    }

    function handleDragEnd( event ) {

        const shiftX = event.clientX - startX;
        const shiftY = event.clientY - startY;

        const newTop = top + shiftY;
        const newLeft = left + shiftX;

        onDragEnd( { 
            top: newTop,
            left: newLeft
        } );
    }

    function handleDrag( event ) {

    }

    return  <div className={ css['comp-holder'] }
                 style={ style }
                 onDragStart={ handleDragStart }
                 onDragEnd={ handleDragEnd }
                 onDrag={ handleDrag }
                 draggable
            >
                <button className={ css['comp-holder-close'] }
                        onClick={ () => onClose(index) } 
                >
                    x
                </button>
                <div className={ css['comp-holder-content'] }>
                    <Component />
                </div>
            </div>

}

export { CompHolder }