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
import { ResizableProvider } from './resizable-provider';
import { connect } from 'react-redux';
import { resizeDesign } from '~/redux/actions';

const compPanelItems = [
    new CompPanelItemModel( 'Text Field' ),
    new CompPanelItemModel( 'Radio Button List' ),
];

const ReduxedResizableProvider = connect(

    null,

    dispatch => {

        return {

            onResizeEnd: element => {

                if ( element.className.includes( 'design' ) ) {

                    const style = window.getComputedStyle( element );
                    const width = parseFloat( style.width );
                    const height = parseFloat( style.height );

                    dispatch( resizeDesign(width, height) );
                }
            }
        }
    }

)( ResizableProvider );


function App() {

    return  <ReduxedResizableProvider>
                <div id="app" className={ css['app'] }>
                    <ToolBar />
                    <CompPanel items={ compPanelItems } />
                    <div className={ css['prop-panel'] }></div>
                    <div className={ css['main-container'] }>
                        <ReduxedMainPanel>
                            <ReduxedDesign />
                        </ReduxedMainPanel>
                    </div>
                    <div className={ css['status-bar'] }>
                        <ReduxedZoomMainPanelTool />
                        <UndoTool />
                    </div>
                </div>
            </ReduxedResizableProvider>
}

export { App }