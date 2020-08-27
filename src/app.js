import React from 'react';
import { ReduxedDesign } from './design';
import { store } from './redux/store';
import { ActionCreators } from 'redux-undo';
import { CompPanel } from './comp-panel';
import { ReduxedMainPanel } from './main-panel';
import { CompPanelItem as CompPanelItemModel } from './models';

const compPanelItems = [
    new CompPanelItemModel( 'Text Field' ),
    new CompPanelItemModel( 'Radio Button List' ),
];

function App() {

    function undo() {

        store.dispatch( ActionCreators.undo() );
    }

    function redo() {

        store.dispatch( ActionCreators.redo() );
    }

    return  <div id="app" className="app">
                <div className="tool-bar"></div>
                <CompPanel items={compPanelItems} />
                <div className="prop-panel"></div>
                <div className="main-container">
                    <ReduxedMainPanel>
                        <ReduxedDesign />
                    </ReduxedMainPanel>
                </div>
                <div className="status-bar">
                    <button onClick={ undo } >Undo</button>
                    <button onClick={ redo } >Redo</button>
                </div>
            </div>
}

export { App }