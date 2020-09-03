import React from 'react';
import { ReduxedMainPanel } from './main-panel';
import { ReduxedDesign } from './design';
import { CompHolder } from './comp-holder';
import css from '~/css/main-container.module.css';

function MainContainer( props ) {

    return  <div className={ css['main-container'] }>
                <ReduxedMainPanel>
                    <ReduxedDesign />
                </ReduxedMainPanel>
                <CompHolder />
            </div>
}

export { MainContainer }