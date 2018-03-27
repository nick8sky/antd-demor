import React, { Component } from 'react';


class TrackInfo extends Component {
    render() {

        return (
            <div>
                <div className="albumPic"
                     style={{'backgroundImage': 'url(' + this.props.track.album.picUrl + ')'}}></div>
                <div className='trackInfo'>
                    <div className="name">{this.props.track.name}</div>
                    <div className="artist">{this.props.track.artists[0].name}</div>
                    <div className="album">{this.props.track.album.name}</div>
                </div>
            </div>
        );
    }
}

export default TrackInfo;