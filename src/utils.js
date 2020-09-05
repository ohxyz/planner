function clone( obj ) {

    return JSON.parse( JSON.stringify( obj ) );
}

function genRandomString( length=5 ) {
    
    return Math.random().toString( 36 ).slice( 2 ).slice( 0, length );
}

// https://davidwalsh.name/javascript-debounce-function
function debounce(func, wait, immediate) {
    var timeout;
    return function() {
        var context = this, args = arguments;
        var later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        var callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
};

function foo() {

    return 'bar';
}

export default {

    clone,
    foo,
    genRandomString,
    debounce
};