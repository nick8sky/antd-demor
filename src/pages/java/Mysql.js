import React, { Component } from 'react';
import Markdown  from 'react-markdown';



class Mysql extends Component {
    render() {


        return (
            <div>
                <Markdown source={" linux下查看mysql服务\n" +
                "\n" +
                "```\n" +
                "ps -ef|grep mysql\n" +
                "```\n" +
                "\n" +
                "登陆\n" +
                "\n" +
                "```\n" +
                "mysql -hlocalhost -uroot -p  \n" +
                "123456\n" +
                "show databases ;\n" +
                "```\n" +
                "\n"}/>




            </div>
        );
    }
}

export default Mysql;