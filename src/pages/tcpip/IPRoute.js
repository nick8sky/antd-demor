import React, { Component } from 'react';

class IPRoute extends Component {
    render() {
        return (
            <div>
                <h2>ip选路</h2>
                <p>netstat -r</p>


            </div>
        );
    }
}

export default IPRoute;