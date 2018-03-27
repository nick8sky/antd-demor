import React, { Component } from 'react';


class Time extends Component {
    timeConvert(timestamp) {
        var minutes = Math.floor(timestamp / 60);
        var seconds = Math.floor(timestamp - (minutes * 60));

        if (seconds < 10) {
            seconds = '0' + seconds;
        }

        timestamp = minutes + ':' + seconds;
        return timestamp;
    }

    render() {

        return (
            <div className="time">
                <div className="current">{this.timeConvert(this.props.currentTime)}</div>
                <div className="total">{this.timeConvert(this.props.currentTotalTime)}</div>
            </div>
        );
    }
}

export default Time;