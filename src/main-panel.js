import React from 'react';
import { connect } from 'react-redux';

const mapStateToProps = state => {

    return {

        width: state.undoable.present.mainPanel.width,
        height: state.undoable.present.mainPanel.height
    };
};

const ReduxedMainPanel = connect( mapStateToProps )( MainPanel );

function MainPanel( props ) {

    const {
        width = 800,
        height = 800
    } = props;

    const style = {

        width: width + 'px',
        height: height + 'px'
    };

    return  <div className="main-panel" style={style}>
                { props.children }
            </div>
}

export { MainPanel, ReduxedMainPanel };