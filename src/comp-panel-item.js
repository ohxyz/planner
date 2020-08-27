import React from 'react';

function CompPanelItem( props ) {

    const {
        name = 'n/a'
    } = props;

    return  <div className="comp-panel-item">{ name }</div>
}

export { CompPanelItem }