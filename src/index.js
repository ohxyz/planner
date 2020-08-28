import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './ui/app';
import { store } from './redux/store';
import { Provider } from 'react-redux';
import { resizeMainPanel } from '~/redux/actions';

ReactDOM.render(
    <Provider store={ store }>
        <App />
    </Provider>,
    document.getElementById('container')
);

window.act = () => {

    store.dispatch( resizeMainPanel( 888, 888 ) )
}
