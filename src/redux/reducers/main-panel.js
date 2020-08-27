import utils from '~/utils';
import { Row, Placeholder } from '~/models';

const initState = {
  
    width: 800,
    height: 800
};

export function mainPanelReducer( state=initState, action ) {

    switch ( action.type ) {

    case 'main-panel/resize':

        const newState = utils.clone( state )

        newState.width = action.width;
        newState.height = action.height;

        return newState;

    default:

        return state;

    }
}