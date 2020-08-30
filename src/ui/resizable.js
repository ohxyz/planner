import React from 'react';
import dom from './dom-utils';

class Resizable extends React.Component {

    static defaultProps = {

        width: 100,
        height: 100,
        borderWidth: 10,
        borderColor: '#00000030'
    };

    constructor( props ) {

        super(props);
        this.myRef = React.createRef();
    }

    render() {

        const style = { 
            width: this.props.width + 'px',
            height: this.props.height + 'px',
            // debug
            backgroundColor: '#0000ff50',
            border: `${this.props.borderWidth}px ${this.props.borderColor} solid`,
            marginLeft: '100px',
            marginTop: '100px'
        };

        return (

            <div className="resizable--xxxx" 
                 style={style} 
                 ref={this.myRef}
            >
                Resizable
            </div>

        );
    }
}

export { Resizable }