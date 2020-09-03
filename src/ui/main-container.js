import React from 'react';
import { connect } from 'react-redux';
import { ReduxedMainPanel } from './main-panel';
import { ReduxedDesign } from './design';
import { CompHolder } from './comp-holder';
import { dragCompHolder } from '~/redux/actions';
import css from '~/css/main-container.module.css';

function MainContainer( props ) {

    const { 
        compHolders = [],
        onCompHolderDragEnd = () => { throw new Error( 'onCompHolderDragEnd n/a') }
    } = props;

    return  <div className={ css['main-container'] }>
                <ReduxedMainPanel>
                    <ReduxedDesign />
                </ReduxedMainPanel>
                {
                    compHolders.map( (holder, index) => 

                        <CompHolder key={index} 
                                    top={holder.top} 
                                    left={holder.left}
                                    onDragEnd={ pos => { onCompHolderDragEnd(index, pos) } }
                        />
                    )
                }
            </div>
}

const ReduxedMainContainer = connect( 

    state => {

        return {
            compHolders: state.undoable.present.mainContainer.compHolders
        }
    },

    dispatch => {

        return {
            onCompHolderDragEnd: ( index, pos ) => { dispatch( dragCompHolder(index, pos) ) }
        }
    }

)( MainContainer)

export { ReduxedMainContainer }