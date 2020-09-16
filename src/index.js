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
import { connect } from 'react-redux';

import 'rui/src/scss/coles/rocket.scss';
import 'rui/src/scss/coles/font-face.scss';

let comp = '';

function boolean( name='Boolean', result=true ) {

    comp = <div>{ name }</div>
    return result;
}

function ButtonDef() {

    // return <Button secondary={ boolean() }>Click</Button>
    return React.createElement( Button, { secondary: boolean( 'Secondary', false ) }, 'Click' )
}

// const HCButtonDef = connect( state => ( { secondary: true } ) )( ButtonDef )

compStore.add( 'Button', Button, {
    secondary: { type: 'boolean', label: 'Secondary style', value: true },
    children: { type: 'text', label: 'Button content', value: 'hi' }
} );

compStore.add( 'Checkbox', Checkbox );
compStore.add( 'Text Field', TextField );

const result = ButtonDef();

// console.log( comp, result );

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
