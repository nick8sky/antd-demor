import React, { Component } from 'react';
import Markdown  from 'react-markdown';

class MarkDown extends Component {
    render() {


        return (
            <div>

                <Markdown source={"参考：https://www.zybuluo.com/mdeditor"}/>
            </div>
        );
    }
}

export default MarkDown;