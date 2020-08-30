function getBorders( element ) {

    const style = window.getComputedStyle( element );
    const left = parseFloat( style.borderLeftWidth );
    const right = parseFloat( style.borderRightWidth );
    const top = parseFloat( style.borderTopWidth );
    const bottom = parseFloat( style.borderBottomWidth );

    return { left, right, top, bottom };
}

function getBorderRects( element ) {

    // dnr rect
    const dr = element.getBoundingClientRect();
    const style = window.getComputedStyle( element );

    // Top border Width, etc
    const tbw = parseFloat( style.borderTopWidth );
    const rbw = parseFloat( style.borderRightWidth );
    const bbw = parseFloat( style.borderBottomWidth );
    const lbw = parseFloat( style.borderLeftWidth );

    // IMPORTANT: Those rects do not include corners
    const topRect = {
        x: dr.x + lbw, 
        y: dr.y, 
        width: dr.width - lbw - rbw,
        height: tbw
    };

    const rightRect = {
        x: dr.x + dr.width - rbw,
        y: dr.y + tbw,
        width: rbw,
        height: dr.height - tbw - bbw
    };

    const bottomRect = {
        x: dr.x + lbw,
        y: dr.y + dr.height - bbw,
        width: dr.width - lbw - rbw,
        height: bbw
    };

    const leftRect = {
        x: dr.x,
        y: dr.y + tbw,
        width: lbw,
        height: dr.height - tbw - bbw
    };

    return {

        top: topRect, 
        right: rightRect,
        bottom: bottomRect,
        left: leftRect
    };
}

function isInRect( x, y, rect ) {

    return ( x >= rect.x && x <= rect.x + rect.width ) && ( y >= rect.y && y <= rect.y + rect.height );
}

export default {

    getBorders,
    getBorderRects,
    isInRect,
};