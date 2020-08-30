import React from 'react';
import { ReduxedDesign } from './design';
import { store } from '~/redux/store';
import { CompPanel } from './comp-panel';
import { ToolBar } from './tool-bar';
import { ReduxedMainPanel } from './main-panel';
import { ReduxedZoomMainPanelTool } from './tools/zoom-main-panel';
import { UndoTool } from './tools/undo';
import { CompPanelItem as CompPanelItemModel } from '~/models';
import css from '~/css/app.module.css';
import { ResizableContainer } from './resizable-container';


const compPanelItems = [
    new CompPanelItemModel( 'Text Field' ),
    new CompPanelItemModel( 'Radio Button List' ),
];

function App() {

    return  <div id="app" className={ css['app'] }>
                <ToolBar />
                <CompPanel items={ compPanelItems } />
                <div className={ css['prop-panel'] }></div>
                <ResizableContainer>
                    <div className={ css['main-container'] }>
                        <ReduxedMainPanel>
                            <ReduxedDesign />
                        </ReduxedMainPanel>
                    </div>
                </ResizableContainer>
                <div className={ css['status-bar'] }>
                    <ReduxedZoomMainPanelTool />
                    <UndoTool />
                </div>
            </div>
}

export { App }