import React, { useState }  from 'react';
import css from '~/css/comp-holder.module.css';

function CompHolder( props ) {

    const { 
        top = 0, 
        left = 0,
        onDragEnd = () => { throw new Error( 'n/a' ) }
    } = props;

    let startX;
    let startY;

    const style = { top, left };

    function handleDragStart( event ) {

        startX = event.clientX;
        startY = event.clientY;
    }

    function handleDragEnd( event ) {

        const shiftX = event.clientX - startX;
        const shiftY = event.clientY - startY;

        onDragEnd( { 
            top: top + shiftY,
            left: left + shiftX
        } );
    }

    return  <div className={ css['comp-holder'] }
                 style={ style }
                 onDragStart={ handleDragStart }
                 onDragEnd={ handleDragEnd }
                 draggable
            >
            </div>

}

export { CompHolder }