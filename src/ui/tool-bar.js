import React from 'react';
import css from '~/css/app.module.css';
import { ReduxedResizeDesignTool } from './tools/resize-design';

function ToolBar() {

    return  <div className={ css['tool-bar'] }>
                <ReduxedResizeDesignTool />
            </div>
}

export { ToolBar };