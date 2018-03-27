import React, { Component } from 'react';


class Progress extends Component {
    render() {

        return (
            <div className="progress" style={{'width': this.props.progress}}></div>
        );
    }
}

export default Progress;