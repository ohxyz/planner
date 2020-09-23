import utils from '../utils';

export function Row( id ) {

    this.id = id;
    this.height = 50;
    this.placeholders = [ new Placeholder() ]
}

export function Placeholder() {

    this.id = utils.genRandomString();
    this.compName = '';
    this.compPropDefs = {};
}

export function CompPanelItem( name ) {

    this.name = name;
}

export function CompHolder( args={} ) {

    const {
        top = 0,
        left = 0,
        compName = '',
        compPropDefs = {},
        isSelected = false
    } = args;

    this.top = top;
    this.left = left;
    this.compName = compName;
    this.compPropDefs = compPropDefs;
    this.isSelected = isSelected;
}

export function PropDef( args={} ) {

    const {
        label = 'Label',
        type = 'text',
        value = ''
    } = args;

    this.label = label;
    this.type = type;
    this.value = value;
}

export function PropPanel( args={} ) {

    const {

        compName = '',
        compPropDefs = {},
        chIndex = -1,
        rowIndex = -1,
        phIndex = -1
    } = args;

    this.compName = compName;
    this.compPropDefs = compPropDefs;
    this.chIndex = chIndex;
    this.rowIndex = rowIndex;
    this.phIndex = phIndex;
}