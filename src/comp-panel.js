import React from 'react';
import { CompPanelItem } from './comp-panel-item';
import { CompPanelItem as CompPanelItemModel } from './models';

function CompPanel( props ) {

    const {
        items = []
    } = props;

    return  <div className="comp-panel">
            {
                items.map( (item, idx) => 

                    <CompPanelItem key={idx} name={item.name} />
                )
            }
            </div>
}

export { CompPanel }