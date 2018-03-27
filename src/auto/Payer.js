import React, { Component } from 'react';
import {Icon } from 'antd';
import './dd.css';

import Time from './Time';
import Controls from './Controls';
import Progress from './Progress';
import TrackInfo from './TrackInfo';

/*关于网易云歌曲外链接获取方法
http://music.163.com/#/song?id=476592630
    ID就是476592630
然后将ID替换到链接  如：http://music.163.com/song/media/outer/url?id=476592630.mp3*/

const tracks = [
    {
        "name": "阿飞的小蝴蝶",
        "artists": [
            {
                "name": "萧敬腾",
            }
        ],
        "album": {
            "name": "所属专辑：王妃",
            "picUrl": "http://p4.music.126.net/FdD1xkcvQHxOIQwmj2BixA==/109951163101761660.jpg",
        },
        "duration": 255858,
        "mp3Url": "http://music.163.com/song/media/outer/url?id=167946.mp3"
    },
    {
        "name": "我看着你的时候",
        "artists": [
            {
                "name": "李荣浩",
            }
        ],
        "album": {
            "name": "所属专辑：我看着你的时候",
            "picUrl": "http://p1.music.126.net/pghq7vAXFvmuet91lhW4sg==/109951163115144091.jpg",
        },
        "duration": 290658,
        "mp3Url": "http://music.163.com/song/media/outer/url?id=506092654.mp3"
    },
    {
        "name": "Perfect Duet",
        "artists": [
            {
                "name": "Ed Sheeran/Beyoncé",
            }
        ],
        "album": {
            "name": "所属专辑：Perfect Duet (with Beyoncé)",
            "picUrl": "http://p1.music.126.net/7QK82incNi3k9Gfpot_ykg==/18636722092498224.jpg",
        },
        "duration": 257858,
        "mp3Url": "http://music.163.com/song/media/outer/url?id=521417778.mp3"
    }
    ,
    {
        "name": "Marry Me",
        "artists": [
            {
                "name": "萧敬腾",
            }
        ],
        "album": {
            "name": "所属专辑：以爱之名",
            "picUrl": "http://p1.music.126.net/L-qn8lALODFY7UpSpr7pNg==/19108412579700947.jpg",
        },
        "duration": 276658,
        "mp3Url": "http://music.163.com/song/media/outer/url?id=25703053.mp3"
    }
    ];


class Payer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            currentTrackLen: tracks.length, //歌单歌曲数
            currentTrackIndex: 0, //当前播放的歌曲索引，默认加载第一首歌
            currentTime: 0, //当前歌曲播放的时间
            currentTotalTime: 0, //当前歌曲的总时间
            playStatus: true, //true为播放状态，false为暂停状态
        }

    }





//更新播放状态
    updatePlayStatus = () =>  {
        let audio = document.getElementById('audio');
        //audio.play();
        if (this.state.playStatus) {
            audio.play();
            //console.log(audio);
        } else {
            audio.pause();
        }
        /*let audio2 = document.getElementById('audio');
        audio2.play();*/

        //更新当前歌曲总时间
        //console.log(this.state.playStatus)
        /*console.log(this.state.currentTrackIndex);
        console.log(tracks[this.state.currentTrackIndex].duration);
        console.log(tracks[this.state.currentTrackIndex].mp3Url);*/
        this.setState({currentTotalTime: tracks[this.state.currentTrackIndex].duration / 1000});
    }


//播放事件处理
    play = () =>  {
        //console.log("111111")
        //这里有setState是异步的，需要在回调中执行
        this.setState({playStatus: !this.state.playStatus}, () => {
            this.updatePlayStatus();
        });
        /*this.setState({playStatus: !this.state.playStatus});
        this.updatePlayStatus()*/
    }


//上一曲事件处理
    previous = () =>  {
        if (this.state.currentTrackIndex - 1 < 0) {
            /*alert('已经没有上一首了');*/
            this.setState({
                currentTrackIndex: tracks.length-1,
                currentTime: 0
            }, () => {
                let audio = document.getElementById('audio');
                audio.load();
                this.updatePlayStatus();
            });
        } else {
            this.setState({currentTrackIndex: --this.state.currentTrackIndex, currentTime: 0}, () => {
                let audio = document.getElementById('audio');
                audio.load();
                this.updatePlayStatus();
            });
        }
    }


//下一曲事件处理
    next = () => {
        if (this.state.currentTrackIndex + 1 >= this.state.currentTrackLen) {
            //alert('已经没有下一首了');
            this.setState({currentTrackIndex: 0, currentTime: 0}, () => {
                let audio = document.getElementById('audio');
                audio.load();
                this.updatePlayStatus();
            });
        } else {
            this.setState({currentTrackIndex: ++this.state.currentTrackIndex, currentTime: 0}, () => {
                let audio = document.getElementById('audio');
                audio.load();
               // audio.play();
                this.updatePlayStatus();
            });
        }
    }


//DOM加载完
    componentDidMount() {
        this.updatePlayStatus();
        setInterval(() => {
            let audio = document.getElementById('audio');
            if(audio){
                this.setState({currentTime: audio.currentTime}, () => {
                    if (~~this.state.currentTime >= ~~this.state.currentTotalTime) {
                        this.next();
                    }
                });
            }
        }, 300);
    }


    render() {
        return (
            <div className="player">
                {/* 播放器名称  */}
                <div className="header">唱给你听·亲爱的 <Icon type="api"  spin="true"/></div>

                {/* 音乐信息  */}
                <TrackInfo track={tracks[this.state.currentTrackIndex]}/>

                {/* 播放进度条   */}
                <Progress progress={this.state.currentTime / this.state.currentTotalTime * 100 + '%'}/>

                {/* 播放控制  */}
                <Controls isPlay={this.state.playStatus} onPlay={this.play} onPrevious={this.previous}
                          onNext={this.next}/>

                {/* 播放时间   */}
                <Time currentTime={this.state.currentTime} currentTotalTime={this.state.currentTotalTime}/>

                {/* 音频控件  */}
                {/*{tracks[this.state.currentTrackIndex].mp3Url}*/}
                {/*<source src={require('./1.mp3')} type="audio/mpeg"/>*/}
                <audio id="audio">
                    <source   src={tracks[this.state.currentTrackIndex].mp3Url} type="audio/mpeg"/>

                </audio>
            </div>
        );
    };
}

export default Payer;