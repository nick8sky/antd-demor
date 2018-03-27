import React, { Component } from 'react';
import Markdown  from 'react-markdown';



class React1 extends Component {
    render() {


        return (
            <div>

                <Markdown source={"```\n" +
                "npm i\n" +
                "npm start\n" +
                "npm run build\n" +
                "```"}/>



            </div>
        );
    }
}

export default React1;