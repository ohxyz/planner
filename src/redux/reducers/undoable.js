import utils from '~/utils';
import { Row, Placeholder } from '~/models';

const initState = {

    // {
    //     rows: [ 
    //         {   
    //             id: 'row-0',
    //             placeholders: [
    //                 { id: '1', component: 'Textbox' }, 
    //                 { id: '2', component: 'Radio Button List' }
    //             ]
    //         },
    //         {
    //             placeholders: [ ]
    //         }
    //     ]
    // }
    design: {
        rows: [ 
            new Row( 'row-0' )
        ],
        width: 500,
        height: 500,
    },
    mainPanel: {
        width: 800,
        height: 800
    },
    foo: 'bar'
}

export function undoableReducer( state=initState, action ) {

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

        const newState = utils.clone( state )

        newState.mainPanel.width = action.width;
        newState.mainPanel.height = action.height;

        return newState;
    }


    return state;
}