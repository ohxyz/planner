import React from 'react';
import { ReduxedDesign } from './design';
import { store } from '~/redux/store';
import { ActionCreators } from 'redux-undo';
import { CompPanel } from './comp-panel';
import { ReduxedMainPanel } from './main-panel';
import { CompPanelItem as CompPanelItemModel } from '~/models';
import css from '~/css/app.module.css';

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

    return  <div id="app" className={ css['app'] }>
                <div className={ css['tool-bar'] }></div>
                <CompPanel items={ compPanelItems } />
                <div className={ css['prop-panel'] }></div>
                <div className={ css['main-container'] }>
                    <ReduxedMainPanel>
                        <ReduxedDesign />
                    </ReduxedMainPanel>
                </div>
                <div className={ css['status-bar'] }>
                    <button onClick={ undo } >Undo</button>
                    <button onClick={ redo } >Redo</button>
                </div>
            </div>
}

export { App }