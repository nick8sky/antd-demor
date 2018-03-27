import React, { Component } from 'react';
import Markdown  from 'react-markdown';



class PostMan extends Component {
    render() {


        return (
            <div>
                <Markdown source={"### 使用postman发送post、put请求\n" +
                "\n" +
                "在web测试中，如果前后端尚未联调，后端可通过模拟前端发送请求的方式来测试后端代码是否调通，当发送post、put请求时，如何使用postman来测试。\n" +
                "\n" +
                "1.配置参数如下\n" +
                "\n" +
                "![](http://img.blog.csdn.net/20170814211226597?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvbG9uZ2NoYW8y/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/Center)\n" +
                "\n" +
                "2.选择Body--->raw\n" +
                "\n" +
                "![](http://img.blog.csdn.net/20170814211256112?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvbG9uZ2NoYW8y/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/Center)\n" +
                "\n" +
                "3.写入json"}/>




            </div>
        );
    }
}

export default PostMan;