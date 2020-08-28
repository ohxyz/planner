
const initState ={

    zoom: 1
};

export function mainPanelReducer( state=initState, action ) {

    if ( action.type === 'main-panel/zoom' ) {

        return Object.assign( {}, state, { zoom: action.size } )
    }

    return state;
}