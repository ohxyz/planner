import utils from '../utils';

export function Row( id ) {

    this.id = id;
    this.height = 50;
    this.placeholders = [ new Placeholder() ]
}

export function Placeholder( id ) {

    this.id = utils.genRandomString();
}

export function CompPanelItem( name ) {

    this.name = name;
}

export function CompHolder( { top, left } ) {

    this.top = top;
    this.left = left;
}