import React, {Component} from 'react';
import {Collapse} from 'antd';
import Git from './Git';
import Maven from './Maven';
import Linux from './Linux';
import React1 from './React1';


const Panel = Collapse.Panel;
const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;



class DevUtils extends Component {
    render() {

        return (
            <div>
                <h2>开发工具合集</h2>
                <Collapse accordion>
                    <Panel header="Maven">
                        <p><Maven/></p>
                    </Panel>
                    <Panel header="Git" >
                        <p>
                           <Git/>
                        </p>
                    </Panel>
                    <Panel header="Linux">
                        <p><Linux/></p>
                    </Panel>
                    <Panel header="React">
                        <p><React1/></p>
                    </Panel>
                </Collapse>
            </div>
        );
    }
}

export default DevUtils;