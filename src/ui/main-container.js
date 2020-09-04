import React from 'react';
import { connect } from 'react-redux';
import { ReduxedMainPanel } from './main-panel';
import { ReduxedDesign } from './design';

import css from '~/css/main-container.module.css';

function MainContainer( props ) {

    const { 
        compHolders = [],
        onCompHolderDragEnd = () => { throw new Error( 'onCompHolderDragEnd n/a') }
    } = props;


    return  <div className={ css['main-container'] }>
                <ReduxedMainPanel>
                    <ReduxedDesign />
                </ReduxedMainPanel>
            </div>
}


export { MainContainer }