import css from '~/css/main-container.module.css';
import utils from '~/utils';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { ReduxedMainPanel } from './main-panel';
import { ReduxedDesign } from './design';
import { initMainPanel } from '~/redux/actions';

function MainContainer( props ) {

    const {
        onLoad = ( width, height ) => { throw new Error( 'onLoad n/a' ) }
    } = props;

    const myRef = React.createRef();

    useEffect( handleLoad );

    const handleLoadDebounced = utils.debounce( handleLoad, 200 );

    window.addEventListener( 'resize', handleLoadDebounced );

    function handleLoad( event ) {

        const style = window.getComputedStyle( myRef.current );
        const width = parseFloat( style.width );
        const height = parseFloat( style.height );

        // Pass its width and height to set min width/height of `main-panel`
        onLoad( width, height );
    }

    return  <div id="main-container" className={ css['main-container'] } ref={ myRef } >
                <ReduxedMainPanel>
                    <ReduxedDesign />
                </ReduxedMainPanel>
            </div>
}

const ReduxedMainContainer = connect( null,

    dispatch => {

        return {
            onLoad: ( width, height ) => dispatch( initMainPanel( width, height ) )
        }
    }

)( MainContainer );

export { ReduxedMainContainer }