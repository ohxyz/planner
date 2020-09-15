import css from '~/css/app.module.css';
import React from 'react';
import { store } from '~/redux/store';
import { CompPanel } from './comp-panel';
import { ToolBar } from './tool-bar';
import { ReduxedZoomMainPanelTool } from './tools/zoom-main-panel';
import { UndoTool } from './tools/undo';
import { ResizableProvider } from './resizable-provider';
import { connect } from 'react-redux';
import { resizeDesign } from '~/redux/actions';
import { ReduxedMainContainer } from './main-container';

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
                    <CompPanel />
                    <div className={ css['prop-panel'] }></div>
                    <ReduxedMainContainer />
                    <div className={ css['status-bar'] }>
                        <ReduxedZoomMainPanelTool />
                        <UndoTool />
                    </div>
                </div>
            </ReduxedResizableProvider>
}

export { App }