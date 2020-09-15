import css from '~/css/prop-panel.module.css';
import React from 'react';
import { connect } from 'react-redux';

class _PropPanel extends React.Component {

    static defaultProps = {
        compName: 'n/a'
    };

    render() {

        return  <div className={ css['prop-panel'] }>{ this.props.compName }</div>
    }
}

const PropPanel = connect( 

    state => ( {
        compName: state.undoable.present.propPanel.compName
    } )

)( _PropPanel );

export { PropPanel }