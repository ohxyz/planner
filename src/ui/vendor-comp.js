import React from 'react';
import { compStore } from '~/comp-store';

function VendorComp( { name, propDefs } ) {

    const compItem = compStore.get( name );

    if ( !compItem ) {
        return null;
    }

    const Component = compItem.component || ( () => 'n/a' );
    const compProps = {};

    for ( const prop in propDefs ) {

        compProps[prop] = propDefs[prop]['value'];
    }

    return <Component {...compProps} />
}

export { VendorComp }