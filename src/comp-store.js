class ComponentStorage {

    constructor() {

        this.components = [];
    }

    add( name, component, propDefs={} ) {

        this.components.push( {
            name,
            component,
            propDefs
        } );
    }

    get( name ) {

        for ( let i = 0; i < this.components.length; ++i ) {

            if ( name === this.components[i].name ) {

                return this.components[i];
            }
        }

        return null;
    }

    getAll() {

        return this.components;
    }
}

const compStore = new ComponentStorage();

window.compStore = compStore;

export {
    
    compStore, 
    ComponentStorage 
};