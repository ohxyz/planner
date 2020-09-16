import css from '~/css/prop-panel.module.css';
import React from 'react';
import { connect } from 'react-redux';
import { compStore } from '~/comp-store';

class _PropPanel extends React.Component {

    static defaultProps = {
        compName: 'n/a',
        compPropDefs: { 'n': 'a' }
    };

    constructor( props ) {

        super( props );
    }

    render() {

        const comp = compStore.get( this.props.compName );

        return  <div className={ css['prop-panel'] }>
                    <div>{ this.props.compName }</div>
                    <div>
                    {
                        Object.entries( this.props.compPropDefs ).map( ( [prop, def] ) => {

                            if ( def.type === 'boolean' ) {

                                return  <div key={prop}>
                                            <label >
                                                <input type="checkbox" defaultChecked={def.value} />
                                                { def.label }
                                            </label>
                                        </div>
                            }

                            if ( def.type === 'text' ) {

                                return  <div key={prop}>
                                            <label>
                                                { def.label }
                                                <input type="text" defaultValue={def.value} />
                                            </label>
                                        </div>
                            }
                        } )
                    }
                    </div>
                </div>
    }
}

const PropPanel = connect( 

    state => ( {
        compName: state.undoable.present.propPanel.compName,
        compPropDefs: state.undoable.present.propPanel.compPropDefs
    } )

)( _PropPanel );

export { PropPanel }