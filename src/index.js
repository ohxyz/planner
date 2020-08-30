import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './ui/app';
import { store } from './redux/store';
import { Provider } from 'react-redux';
import { resizeMainPanel } from '~/redux/actions';
import { MainPanelZoomer } from '~/ui/tools/zoom-main-panel';

ReactDOM.render(
    <Provider store={ store }>
        <App />
    </Provider>,
    document.getElementById( 'container' )
);

const zoom = new MainPanelZoomer();
window.zoom = zoom;