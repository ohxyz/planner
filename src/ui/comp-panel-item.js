import React from 'react';
import css from '~/css/comp-panel.module.css';

function CompPanelItem( props ) {

    const {
        name = 'n/a'
    } = props;

    function handleDragStart( event ) {

        event.dataTransfer.setData( 'text/plain', name );
    }

    return  <div className={ css[ 'comp-panel-item' ] } 
                 draggable="true"
                 onDragStart={ handleDragStart }
            >
                { name }
            </div>
}

export { CompPanelItem }