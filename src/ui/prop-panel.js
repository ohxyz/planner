import css from '~/css/prop-panel.module.css';
import React from 'react';
import { connect } from 'react-redux';
import { compStore } from '~/comp-store';
import utils from '~/utils';

class _PropPanel extends React.Component {

    static defaultProps = {
        compName: 'n/a',
        compPropDefs: { 'n': 'a' },
        chIndex: -1,
        rowIndex: -1,
        phIndex: -1,
        onUpdate: ( {chIndex, prop, value} ) => { throw new Error('onUpdate n/a') }
    };

    constructor( props ) {

        super( props );

        this.hasFocusedElement = false;
        this.formFieldRef = React.createRef();
    }

    handleCheckboxChange( event, propName ) {

        this.props.onUpdate( { 
            chIndex: this.props.chIndex,
            rowIndex: this.props.rowIndex,
            phIndex: this.props.phIndex,
            prop: propName,
            value: event.target.checked
        } );
    }

    handleTextFieldChange( event, propName ) {

        this.props.onUpdate( { 
            chIndex: this.props.chIndex,
            rowIndex: this.props.rowIndex,
            phIndex: this.props.phIndex,
            prop: propName,
            value: event.target.value
        } );
    }

    handleFormFieldFocus( event ) {

        this.hasFocusedElement = true;
    }

    handleFormFieldBlur( event ) {

        this.hasFocusedElement = false;
    }

    componentDidUpdate() {

        // Focus the element after re-render, so user can keep typing
        // So at same time, the text field value is synced with `undoable` states
        if ( this.formFieldRef.current && this.hasFocusedElement ) {
            this.formFieldRef.current.focus();
        }
    }

    render() {

        const comp = compStore.get( this.props.compName );

        return  <div className={ css['prop-panel'] }>
                    <div>{ this.props.compName }</div>
                    <div>
                    {
                        Object.entries( this.props.compPropDefs ).map( ( [prop, def] ) => {

                            if ( def.type === 'boolean' ) {

                                // Use key to re-render
                                return  <div key={prop}>
                                            <label>
                                                <input type="checkbox" 
                                                       defaultChecked={ def.value }
                                                       onChange={ event => this.handleCheckboxChange( event, prop ) }
                                                       onFocus={ this.handleFormFieldFocus.bind(this) }
                                                       onBlur={ this.handleFormFieldBlur.bind(this) }
                                                       key={ def.value }
                                                       ref={ this.formFieldRef }
                                                />
                                                { def.label }

                                            </label>
                                        </div>
                            }

                            if ( def.type === 'text' ) {

                                return  <div key={prop}>
                                            <label>
                                                { def.label }
                                                <input type="text" 
                                                       defaultValue={ def.value }
                                                       onChange={ event => this.handleTextFieldChange( event, prop ) }
                                                       onFocus={ this.handleFormFieldFocus.bind(this) }
                                                       onBlur={ this.handleFormFieldBlur.bind(this) }
                                                       size={ 10 }
                                                       key={ def.value }
                                                       ref={ this.formFieldRef }
                                                />
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
        compPropDefs: state.undoable.present.propPanel.compPropDefs,
        chIndex: state.undoable.present.propPanel.chIndex,
        rowIndex: state.undoable.present.propPanel.rowIndex,
        phIndex: state.undoable.present.propPanel.phIndex
    } ),

    dispatch => ( {
        onUpdate: args => dispatch( { type: 'vendor-comp/update', ...args } )
    } )

)( _PropPanel );

export { PropPanel }