import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './ui/app';
import { store } from './redux/store';
import { Provider } from 'react-redux';
import { resizeMainPanel } from '~/redux/actions';
import { MainPanelZoomer } from '~/ui/tools/zoom-main-panel';
import { Hotkeys } from '~/ui/tools/hotkeys';
import { compStore } from './comp-store';
import { Button, Checkbox, TextField } from 'rui';

compStore.add( 'Button', Button );
compStore.add( 'Checkbox', Checkbox );
compStore.add( 'Text Field', TextField );

ReactDOM.render(
    <Provider store={ store }>
        <App />
    </Provider>,
    document.getElementById( 'container' )
);

const mainPanelZoomer = new MainPanelZoomer();
window.zoom = mainPanelZoomer;

const hotkeys = new Hotkeys( { mainPanelZoomer } );
hotkeys.init();
