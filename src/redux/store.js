import { createStore, combineReducers } from 'redux';
import undoable, { ActionCreators } from 'redux-undo';
import utils from '../utils';
import { Row, Placeholder } from '../models';
import { undoableReducer } from './reducers';

const roodReducer = combineReducers( { 

    undoable: undoable( undoableReducer )
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
