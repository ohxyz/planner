import { createStore, combineReducers } from 'redux';
import undoable, { ActionCreators } from 'redux-undo';
import utils from '../utils';
import { Row, Placeholder } from '../models';

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
        ]
    },
    foo: 'bar'
}

function designReducer( state=initState, action ) {

    if ( action.type === 'design/add-row' ) {

        const rows = state.design.rows.slice();

        rows.push( new Row( 'row-' + rows.length ) );

        return Object.assign( {}, state, { design: { rows: rows } } );
    }
    else if ( action.type === 'design/remove-row' ) {

        const rowIndex = action.index;
        const rows = state.design.rows.slice();
        rows.splice( rowIndex, 1 );

        return Object.assign( {}, state, { design: { rows: rows } } );
    }
    else if ( action.type === 'design/resize-row' ) {

        const { index, height } = action;

        // Option 1:
        // const rows = state.design.rows.slice();
        // const row = Object.assign( {}, rows[index] );
        // rows[index] = row;

        // Option 2:
        const rows = JSON.parse( JSON.stringify( state.design.rows ) );
        const row = rows[index];

        row.height = height;

        return Object.assign( {}, state, { design: { rows } } );
    }
    else if ( action.type === 'design/add-placeholder' ) {

        const { rowIndex } = action;
        const rows = utils.clone( state.design.rows );
        
        rows[ rowIndex ].placeholders.push( new Placeholder() );

        return Object.assign( {}, state, { design: { rows } } );
    }
    else if ( action.type === 'design/remove-placeholder' ) {

        const { rowIndex, phIndex } = action;
        const rows = utils.clone( state.design.rows );
        rows[rowIndex].placeholders.splice( phIndex, 1 );

        return Object.assign( {}, state, { design: { rows } } ); 
    }

    return state;
}

const roodReducer = combineReducers( { 

    design: undoable(designReducer) 

} );

const store = createStore( 
    roodReducer,
    // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

store.subscribe( () => {

    // console.log( '[State]', store.getState() );
} );

function undo() {

    store.dispatch( ActionCreators.undo() );
}

function redo() {

    store.dispatch( ActionCreators.redo() );
}

window.store = store;
window.undo = undo;
window.redo = redo;

export { store };
