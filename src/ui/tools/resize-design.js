import React, { useState } from 'react';
import { connect } from 'react-redux';
import css from '~/css/tools/resize-design.module.css';
import { resizeDesign } from '~/redux/actions';

function ResizeDesignTool( props ) {

    const { 
        width = -1,
        height = -1,
        onSubmit = () => { throw new Error( 'n/a' ) }
    } = props;

    const [ inputWidth, setInputWidth ] = useState( width );
    const [ inputHeight, setInputHeight ] = useState( height );

    function handleSubmit( event ) {

        event.preventDefault();
        onSubmit( inputWidth, inputHeight );
    }

    return  <div className={ css['resize-design'] }>
                <form onSubmit={ event => handleSubmit(event) } >
                    <input type="text" 
                           placeholder="width" 
                           defaultValue={ inputWidth }
                           onChange={ event => setInputWidth( parseFloat(event.target.value) ) }
                    />
                    <input type="text" 
                           placeholder="height" 
                           defaultValue={ inputHeight }
                           onChange={ event => setInputHeight( parseFloat(event.target.value) ) }
                    />
                    <input type="submit" value="Update design" />
                </form>
            </div>
}

const ReduxedResizeDesignTool = connect(

    state => {

        return {
            width: state.undoable.present.design.width,
            height: state.undoable.present.design.height,
        };
    },

    dispatch => {

        return {
            onSubmit: ( width, height ) => dispatch( resizeDesign(width, height) )
        }
    }

)( ResizeDesignTool );

export { ReduxedResizeDesignTool }
