import React from 'react';
import css from '~/css/comp-panel.module.css';

function CompPanelItem( props ) {

    const {
        name = 'n/a'
    } = props;

    function handleDragStart( event ) {

        const data = { src: 'comp-panel-item', compName: name }

        event.dataTransfer.setData( 'text/plain', JSON.stringify(data) );
    }

    return  <div className={ css[ 'comp-panel-item' ] } 
                 draggable="true"
                 onDragStart={ handleDragStart }
            >
                { name }
            </div>
}

export { CompPanelItem }