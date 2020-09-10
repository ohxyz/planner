class ComponentStorage {

    constructor() {

        this.components = [];
    }

    add( name, component ) {

        this.components.push( {
            name,
            component
        } );
    }

    get( name ) {

        for ( let i = 0; i < this.components.length; ++i ) {

            if ( name === this.components[i].name ) {
                return this.components[i].component;
            }
        }

        return null;
    }

    getAll() {

        return this.components;
    }
}

const compStore = new ComponentStorage();

export {
    
    compStore, 
    ComponentStorage 
};