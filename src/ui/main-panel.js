import React from 'react';
import { connect } from 'react-redux';
import css from '~/css/main-panel.module.css';

function MainPanel( props ) {

    const {
        width = 100,
        height = 100,
        zoom = 1,
    } = props;

    const style = {

        width: width + 'px',
        height: height + 'px',
        transform: `scale(${zoom})`,
    };

    return  <div className={ css['main-panel'] } style={style}>
                { props.children }
            </div>
}

const mapStateToProps = state => {

    return {

        width: state.undoable.present.mainPanel.width,
        height: state.undoable.present.mainPanel.height,
        zoom: state.mainPanel.zoom
    };
};

export const ReduxedMainPanel = connect( mapStateToProps )( MainPanel );