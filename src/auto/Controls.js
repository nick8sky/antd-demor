import React, { Component } from 'react';


class Controls extends Component {
    render() {

        let className;
        if (this.props.isPlay == true) {
            className = 'icon-pause';
        } else {
            className = 'icon-play';
        }
        return (
            <div className="controls">
                <div className="play" onClick={this.props.onPlay}>
                    <i className={className}></i>
                </div>
                <div className="previous" onClick={this.props.onPrevious}>
                    <i className="icon-previous"></i>
                </div>
                <div className="next" onClick={this.props.onNext}>
                    <i className="icon-next"></i>
                </div>
            </div>
        )
    }
}

export default Controls;