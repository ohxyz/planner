import utils from '~/utils';
import { Row, Placeholder, CompHolder } from '~/models';

const defaults = {

    mainPanelWidth: 800,
    mainPanelHeight: 800,
    designWidth: 500,
    designHeight: 500,
};

function getInitState() {

    const initState = {

        design: {
            rows: [
                // debug
                new Row( 'row-0' )
            ],
            width: defaults.designWidth,
            height: defaults.designHeight,
            borderWidth: defaults.designBorderWidth,
        },
        mainPanel: {
            width: defaults.mainPanelWidth,
            height: defaults.mainPanelHeight,
            compHolders: [
                // debug
                new CompHolder( {top: 50, left: 200, compName: 'Text Field', compPropDefs: {
                    label: { label: 'Heading', type: 'text', value: 'My text' },
                    error: { label: 'has error', type: 'boolean', value: true },
                    errorMessage: { label: 'Error message', type: 'text', value: 'error!'}

                } } ),
                new CompHolder( {
                    top: 200, 
                    left: 51, 
                    compName: 'Button', 
                    compPropDefs: {
                        secondary: { label: 'Second', type: 'boolean', value: false },
                        children: { label: 'content', type: 'text', value: 'submit' }
                    }
                } ),
                new CompHolder( {top: 50, left: 50, compName: 'Checkbox', compPropDefs: {
                    defaultChecked: { label: 'Check', type: 'boolean', value: true },
                    label: { label: 'Text', type: 'text', value: 'check!' }
                } } ),
            ]
        },
        propPanel: {
            // debug
            compName: 'comp-0',
            compPropDefs: {},
            chIndex: -1
        }
    }

    return initState;
}


export function undoableReducer( state=getInitState(), action ) {

    if ( action.type === 'design/add-row' ) {

        const newState = utils.clone( state );
        const rows = newState.design.rows;
        rows.push( new Row( 'row-' + rows.length ) );

        return newState;
    }
    
    if ( action.type === 'design/remove-row' ) {

        const rowIndex = action.index;
        const newState = utils.clone( state );
        const rows = newState.design.rows;

        rows.splice( rowIndex, 1 );

        return newState;
    }
    
    if ( action.type === 'design/resize-row' ) {

        const { index, height } = action;
        const newState = utils.clone( state );
        const rows = newState.design.rows;
        const row = rows[index];

        row.height = height;

        return newState;
    }
    
    if ( action.type === 'design/add-placeholder' ) {

        const { rowIndex } = action;
        const newState = utils.clone( state );
        const rows = newState.design.rows;
        
        rows[ rowIndex ].placeholders.push( new Placeholder() );

        return newState;
    }
    
    if ( action.type === 'design/remove-placeholder' ) {

        const { rowIndex, phIndex } = action;

        const newState = utils.clone( state );
        const rows = newState.design.rows;

        rows[rowIndex].placeholders.splice( phIndex, 1 );

        return newState;
    }

    if ( action.type === 'design/resize' ) {

        const newWidth = action.width;
        const newHeight = action.height;
        const newState = utils.clone( state );

        newState.design.width = newWidth;
        newState.design.height = newHeight;
        
        // Also increase/decrease main-container's width/height
        newState.mainPanel.width += ( newWidth - state.design.width );
        newState.mainPanel.height += ( newHeight - state.design.height );

        return newState;
    }
    
    if ( action.type === 'main-panel/resize' ) {

        const newState = utils.clone( state );

        newState.mainPanel.width = action.width;
        newState.mainPanel.height = action.height;

        return newState;
    }

    if ( action.type === 'comp-holder/drag' ) {

        const newState = utils.clone( state );
        const compHolder = newState.mainPanel.compHolders[ action.index ];
        compHolder.top = action.pos.top;
        compHolder.left = action.pos.left;

        return newState;
    }

    if ( action.type === 'comp-holder/create' ) {

        const newState = utils.clone( state );
        
        newState.mainPanel.compHolders.forEach( ch => {
            ch.isSelected = false;
        } );
        newState.mainPanel.compHolders.push( action.compHolder );
        newState.propPanel = {
            compName: action.compHolder.compName,
            compPropDefs: action.compHolder.compPropDefs,
            chIndex: newState.mainPanel.compHolders.length - 1
        };

        return newState;
    }

    if ( action.type === 'comp-holder/remove' ) {

        const newState = utils.clone( state );
        newState.mainPanel.compHolders.splice( action.index, 1 );

        return newState;
    }

    if ( action.type === 'comp-holder/select' ) {

        const newState = utils.clone( state );
        newState.mainPanel.compHolders.forEach( (ch, idx) => {

            idx === action.index ? (ch.isSelected = true) : (ch.isSelected = false);
        } );

        const compPropDefs = utils.clone( newState.mainPanel.compHolders[action.index].compPropDefs );

        newState.propPanel.compName = action.compName;
        newState.propPanel.compPropDefs = compPropDefs;
        newState.propPanel.chIndex = action.index;

        return newState;
    }

    if ( action.type === 'comp-holder/move-out' ) {

        const newState = utils.clone( state );

        newState.mainPanel.compHolders.forEach( ch => {
            ch.isSelected = false;
        } )
        newState.mainPanel.compHolders.push( action.compHolder );

        const placeholder = newState.design.rows[ action.rowIndex ].placeholders[ action.phIndex ];
        placeholder.compName = '';

        return newState;
    }

    if ( action.type === 'comp-holder/update' ) {

        const newState = utils.clone( state );
        const compHolder = newState.mainPanel.compHolders[action.chIndex];
        compHolder.compPropDefs[action.prop].value = action.value;

        newState.propPanel.compPropDefs[action.prop].value = action.value;

        return newState;

    }

    if ( action.type === 'placeholder/add-comp-from-comp-panel' ) {

        const newState = utils.clone( state );
        const placeholder = newState.design.rows[ action.rowIndex ].placeholders[ action.phIndex ];
        placeholder.compName = action.compName;

        return newState;
    }

    if ( action.type === 'placeholder/add-comp-from-comp-holder' ) {

        console.log( '@@@', action );
        const newState = utils.clone( state );
        const placeholder = newState.design.rows[ action.rowIndex ].placeholders[ action.phIndex ];
        const compHolder = utils.clone( newState.mainPanel.compHolders[action.chIndex] ) ;

        placeholder.compName = compHolder.compName;
        placeholder.compPropDefs = compHolder.compPropDefs;

        newState.mainPanel.compHolders.splice( action.chIndex, 1 );

        return newState;
    }

    return state;
}