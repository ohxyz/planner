import React, { useState }  from 'react';
import css from '~/css/comp-holder.module.css';

function CompHolder( props ) {

    const { 
        top = 0, 
        left = 0, 
    } = props;

    const [ pos, setPos ] = useState( { x:left, y:top } );

    const style = {

        top: pos.y + 'px',
        left: pos.x + 'px'
    };

    function handleDragEnd( event ) {

        // console.log( event.clientX, event.clientY );

        console.log( event.nativeEvent.offsetX );
        setPos( { x: event.nativeEvent.offsetX, y: event.nativeEvent.offsetY } );
    }

    return  <div className={ css['comp-holder'] } 
                 style={ style }
                 onDragEnd={ handleDragEnd }
                 draggable="true"
            >

            </div>

}

export { CompHolder }