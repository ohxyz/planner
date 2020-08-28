import React from 'react';
import { connect } from 'react-redux';
import css from '~/css/main-panel.module.css';

function MainPanel( props ) {

    const {
        width = 800,
        height = 800
    } = props;

    const style = {

        width: width + 'px',
        height: height + 'px'
    };

    return  <div className={ css['main-panel'] } style={style}>
                { props.children }
            </div>
}

const mapStateToProps = state => {

    return {

        width: state.undoable.present.mainPanel.width,
        height: state.undoable.present.mainPanel.height
    };
};

const ReduxedMainPanel = connect( mapStateToProps )( MainPanel );


export { MainPanel, ReduxedMainPanel };