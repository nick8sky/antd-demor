
import React, { Component } from 'react';
import Markdown  from 'react-markdown';


const path = require('path')
const MFs = require('fs')

const  DD = MFs.readFileSync("./ee/hello.txt", 'utf8');







class React1 extends Component {
    render() {



        console.log({DD});
       /* MFs.readFile(path.join(__dirname, 'ee', 'hello.txt'), 'utf8', (err, fixture) => {
            console.log('Discovered new dependency:', {fixture});
        });*/


            return (
                <div>
                    <Markdown source={"22"}/>
                </div>
            );
    }
}

export default React1;