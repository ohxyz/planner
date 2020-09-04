import React from 'react';
import { ActionCreators } from 'redux-undo';
import { store } from '~/redux/store';

export function UndoTool() {

    function undo() {

        store.dispatch( ActionCreators.undo() );
    }

    function redo() {

        store.dispatch( ActionCreators.redo() );
    }

    return  <div>
                <button onClick={ undo } >Undo</button>
                <button onClick={ redo } >Redo</button>
            </div>
}

