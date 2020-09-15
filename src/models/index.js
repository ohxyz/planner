import utils from '../utils';

export function Row( id ) {

    this.id = id;
    this.height = 50;
    this.placeholders = [ new Placeholder() ]
}

export function Placeholder() {

    this.id = utils.genRandomString();
    this.compName = '';
}

export function CompPanelItem( name ) {

    this.name = name;
}

export function CompHolder( args={} ) {

    const {
        top = 0,
        left = 0,
        compName = '',
        isSelected = false
    } = args;

    this.top = top;
    this.left = left;
    this.compName = compName;
    this.isSelected = isSelected;
}