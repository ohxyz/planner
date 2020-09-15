import utils from '~/utils';

const initState ={

    mainContainer: {

        width: -1,
        height: -1,
    },
    
    mainPanel: {

        minWidth: -1,
        minHeight: -1,
        zoom: 1
    }
};

export function mainReducer( state=initState, action ) {

    // When zoom and init, by giving min width/height, make `main-panel` to expand to `main-container`
    // Note that, when zoom out, vertical scrollbar doesn't align properly with the value of `min-height` 
    if ( action.type === 'main-panel/zoom' ) {

        const newState = utils.clone( state );

        newState.mainPanel.zoom = action.size;
        newState.mainPanel.minWidth = state.mainContainer.width / action.size;
        newState.mainPanel.minHeight = state.mainContainer.height / action.size;

        return newState;
    }

    if ( action.type === 'main-panel/init' ) {

        const newState = utils.clone( state );
        const { width, height } = action;

        newState.mainContainer.width = width;
        newState.mainContainer.height = height;
        newState.mainPanel.minWidth = width / state.mainPanel.zoom;
        newState.mainPanel.minHeight = height / state.mainPanel.zoom;
        
        return newState;
    }

    return state;
}