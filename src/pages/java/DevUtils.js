import React, {Component} from 'react';
import {Collapse} from 'antd';
import Git from './Git';
import Maven from './Maven';
import Linux from './Linux';
import React1 from './React1';
import MarkDown from "./MarkDown";
import Mysql from "./Mysql";
import PostMan from "./PostMan";
import Docker from "./Docker";

const Panel = Collapse.Panel;




class DevUtils extends Component {
    render() {

        return (
            <div>
                <h2>开发工具合集</h2>
                <Collapse accordion>
                    <Panel header="Maven 使用命令">
                        <p><Maven/></p>
                    </Panel>
                    <Panel header="Git 使用命令" >
                        <p>
                           <Git/>
                        </p>
                    </Panel>
                    <Panel header="Linux 使用命令">
                        <p><Linux/></p>
                    </Panel>
                    <Panel header="Node 使用命令">
                        <p><React1/></p>
                    </Panel>
                    <Panel header="MarkDown 使用命令">
                        <p><MarkDown/></p>
                    </Panel>
                    <Panel header="Mysql 使用命令">
                        <p><Mysql/></p>
                    </Panel>
                    <Panel header="postman 使用命令">
                        <p><PostMan/></p>
                    </Panel>
                    <Panel header="docker 使用命令">
                        <p><Docker/></p>
                    </Panel>
                </Collapse>
            </div>
        );
    }
}

export default DevUtils;