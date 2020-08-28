import React from 'react';
import { CompPanelItem } from './comp-panel-item';
import { CompPanelItem as CompPanelItemModel } from '~/models';
import css from '~/css/comp-panel.module.css';

function CompPanel( props ) {

    const {
        items = []
    } = props;

    return  <div className={ css['comp-panel'] }>
            {
                items.map( (item, idx) => 

                    <CompPanelItem key={idx} name={item.name} />
                )
            }
            </div>
}

export { CompPanel }