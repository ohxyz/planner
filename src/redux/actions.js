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

/**
 * @param {number} rowIndex - Row index
 * @param {number} phIndex - The index of placeholder on each row.
 */
export function removePlaceholder( rowIndex, phIndex ) {

    return { type: 'design/remove-placeholder', rowIndex, phIndex }
}