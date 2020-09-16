
// Handles states can't be assigned to particular components
class Misc {

    constructor() {

        this._indexOfCompHolderDropped = -1
    }

    set indexOfCompHolderDropped( index ) {

        this._indexOfCompHolderDropped = index;
    }

    get indexOfCompHolderDropped() {

        const returnValue = this._indexOfCompHolderDropped;
        this._indexOfCompHolderDropped = -1;

        return returnValue;
    }
}

const misc = new Misc();
window.misc = misc;

export { misc }