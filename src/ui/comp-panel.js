import css from '~/css/comp-panel.module.css';
import React from 'react';
import { CompPanelItem } from './comp-panel-item';
import { CompPanelItem as CompPanelItemModel } from '~/models';
import { compStore } from '~/comp-store';

function CompPanel( props ) {

    return  <div className={ css['comp-panel'] }>
            {
                compStore.getAll().map( (item, idx) => 

                    <CompPanelItem key={idx} name={item.name} />
                )
            }
            </div>
}

export { CompPanel }