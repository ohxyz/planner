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
                // new CompHolder( {top: 50, left: 50 } ),
                // new CompHolder( {top: 150, left: 100 } ),
            ]
        },
        foo: 'bar'
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
        newState.mainPanel.compHolders.push( action.compHolder );

        return newState;
    }

    return state;
}