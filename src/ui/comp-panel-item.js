import React from 'react';
import css from '~/css/comp-panel.module.css';

function CompPanelItem( props ) {

    const {
        name = 'n/a'
    } = props;

    return  <div className={ css[ 'comp-panel-item' ] }>{ name }</div>
}

export { CompPanelItem }