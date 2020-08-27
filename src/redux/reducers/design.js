import utils from '~/utils';
import { Row, Placeholder } from '~/models';

const initState = {

    // {
    //     rows: [ 
    //         {   
    //             id: 'row-0',
    //             placeholders: [
    //                 { id: '1', component: 'Textbox' }, 
    //                 { id: '2', component: 'Radio Button List' }
    //             ]
    //         },
    //         {
    //             placeholders: [ ]
    //         }
    //     ]
    // }
    rows: [ 
        new Row( 'row-0' )
    ],
    foo: 'bar'
}

export function designReducer( state=initState, action ) {

    if ( action.type === 'design/add-row' ) {

        const rows = state.rows.slice();
        rows.push( new Row( 'row-' + rows.length ) );

        return Object.assign( {}, state, { rows } );
    }
    else if ( action.type === 'design/remove-row' ) {

        const rowIndex = action.index;
        const rows = state.rows.slice();
        rows.splice( rowIndex, 1 );

        return Object.assign( {}, state, { rows } );
    }
    else if ( action.type === 'design/resize-row' ) {

        const { index, height } = action;
        const rows = JSON.parse( JSON.stringify( state.rows ) );
        const row = rows[index];

        row.height = height;

        return Object.assign( {}, state, { rows } );
    }
    else if ( action.type === 'design/add-placeholder' ) {

        const { rowIndex } = action;
        const rows = utils.clone( state.rows );
        
        rows[ rowIndex ].placeholders.push( new Placeholder() );

        return Object.assign( {}, state, { rows } );
    }
    else if ( action.type === 'design/remove-placeholder' ) {

        const { rowIndex, phIndex } = action;
        const rows = utils.clone( state.rows );

        rows[rowIndex].placeholders.splice( phIndex, 1 );

        return Object.assign( {}, state, { rows } ); 
    }

    return state;
}