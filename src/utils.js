function clone( obj ) {

    return JSON.parse( JSON.stringify( obj ) );
}

function genRandomString( length=4 ) {
    
    return Math.random().toString( 36 ).slice( 2 ).slice( 0, length );
}

function foo() {

    return 'bar';
}

export default {

    clone,
    foo,
    genRandomString
};