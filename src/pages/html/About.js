import React, { Component } from 'react';
import {Icon,Timeline} from 'antd'
import {message} from "antd/lib/index";




class About extends Component {
    constructor(props) {
        super(props);
        if(window.erred && window.erred > 3 && window.erred  < 6){
            message.error('nick不欢迎你，请离开本网站');
            window.erred = window.erred +1 ;
        }else if(window.erred && window.erred > 5 ){
            window.location.replace("http://news.baidu.com/")
        }
    }
    render() {
        return (
            <div>
                <p>发邮件给我 <Icon type="mail" style={{ marginRight: 8 }} />nick070809@163.com</p>
                <p>坐     标 <Icon type="environment-o" style={{ marginRight: 8 }} />杭州·中国</p>
                <p>能     力 <Icon type="dashboard" style={{ marginRight: 8 }} />java /python /scala /mysql /oracle /react</p>
                <p>最     近 <Icon type="instagram" style={{ marginRight: 8 }} />在学习c++,kotlin</p>
                <p>&nbsp;</p>
                <Timeline>
                    <Timeline.Item color="green">杭州-2016</Timeline.Item>
                    <Timeline.Item color="green">重庆-2012</Timeline.Item>
                    <Timeline.Item color="green">福州-2010</Timeline.Item>
                </Timeline>
                <p>&nbsp;&nbsp;&nbsp;&nbsp;
                    pay attention to your thoughts,because it becomes rhetoric;   注意你的思想,因为它将变成言辞; <br/>&nbsp;&nbsp;&nbsp;&nbsp;
                    attention to your words,because it into action;   注意你的言辞,因为它将变成行动; <br/>&nbsp;&nbsp;&nbsp;&nbsp;
                    attention to your actions,because it will become a habit;   注意你的行动,因为它将变成习惯; <br/>&nbsp;&nbsp;&nbsp;&nbsp;
                    attention to your habits,because it becomes the character;   注意你的习惯,因为它将变成性格; <br/>&nbsp;&nbsp;&nbsp;&nbsp;
                    pay attention to you character,because it will determine your destiny.   注意你的性格,因为它将决定你的命运。</p>
                <span style={{float:"right"}}> -Margaret Thatcher 玛格丽特·撒切尔&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                <p>&nbsp;</p><p>&nbsp;</p>
            </div>
        );
    }
}

export default About;