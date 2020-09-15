/* Design *****************************************************************************************/

export function removeDesignRow( index ) {

    return { type: 'design/remove-row', index };
}

export function addDesignRow() {

    return { type: 'design/add-row' };
}

export function resizeDesignRow( index, height ) {

    return { type: 'design/resize-row', index, height };
}

export function addPlaceholder( rowIndex ) {

    return { type: 'design/add-placeholder', rowIndex };
}

export function resizeDesign( width, height ) {

    return { type: 'design/resize', width, height };
}

/* Main Panel *************************************************************************************/

export function resizeMainPanel( width, height ) {

    return { type: 'main-panel/resize', width, height };
}

export function zoomMainPanel( size ) {

    return { type: 'main-panel/zoom', size };
}

export function initMainPanel( width, height ) {

    return { type: 'main-panel/init', width, height };
}


/* Main Container *********************************************************************************/

export function resizeMainContainer( width, height ) {

    return { type: 'main-container/resize', width, height };
}