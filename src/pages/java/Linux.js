import React, { Component } from 'react';
import Markdown  from 'react-markdown';



class Linux extends Component {
    render() {


        return (
            <div>
                <Markdown source={"**SCP**\n" +
                "\n" +
                "```\n" +
                "本地到远程\n" +
                "scp -r hadoop   reducer2@sk2:/home/reducer2\n" +
                "\n" +
                "远程到本地\n" +
                "scp -r reducer2@sk2:/home/reducer2   hadoop \n" +
                "```\n" +
                "\n" +
                "**端口查看**\n" +
                "\n" +
                "```\n" +
                "以端口找进程\n" +
                "netstat -ntulp |grep 16020\n" +
                "15638/java\n" +
                "\n" +
                "以进程找端口\n" +
                "ps -ef|grep hbase \n" +
                "15638\n" +
                "netstat –apn | grep 15638\n" +
                "ps -aux | grep 15638\n" +
                "```"}/>




            </div>
        );
    }
}

export default Linux;