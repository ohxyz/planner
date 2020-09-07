import React, { useState }  from 'react';
import css from '~/css/comp-holder.module.css';
import dom from './dom-utils';

function CompHolder( props ) {

    const { 
        top = 0, 
        left = 0,
        name = 'n/a',
        onDragEnd = () => { throw new Error( 'n/a' ) }
    } = props;

    let startX;
    let startY;

    const style = { top, left };

    function handleDragStart( event ) {

        // In Firefox, clientX/Y, pageX/Y all returns 0 in dragend
        // So, use screenX/Y
        // But, when move the browser window from one monitor to another, it may cause bugs in Firefox.
        startX = event.screenX;
        startY = event.screenY;

        event.dataTransfer.effectAllowed = "all";
    }

    function handleDragEnd( event ) {

        const shiftX = event.screenX - startX;
        const shiftY = event.screenY - startY;

        const newTop = top + shiftY;
        const newLeft = left + shiftX;

        onDragEnd( { 
            top: top + shiftY,
            left: left + shiftX
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
                { name }
            </div>

}

export { CompHolder }