import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Menu, Icon } from 'antd';
const SubMenu = Menu.SubMenu;


class Title extends Component {

    state = {
        current: 'class',
    }
    handleClick = (e) => {
        console.log(e);
        this.setState({
            current: e.key,
        });
    }

    handleClick2 = (e) => {
        window.location.replace("#/class")
    }


    render() {
        return (
            <div >
                <div >
                <Menu
                    onClick={this.handleClick}
                    selectedKeys={[this.state.current]}
                    mode="horizontal"
                >
                    <Menu.Item  style={{float:'right'}} key="about" >
                        <Link to="/about">关于我</Link>
                    </Menu.Item>


                    <SubMenu    style={{float:'right'}} title="分类列表"  key="class"  onTitleClick={this.handleClick2}>

                        <Menu.Item key="setting:1"><Link to="/co">系统架构</Link></Menu.Item>
                        <Menu.Item key="setting:2"><Link to="/mlearn">机器学习</Link></Menu.Item>
                        <Menu.Item key="setting:3"><Link to="/upgrade">生活</Link></Menu.Item>
                        <Menu.Item key="setting:4"><Link to="/javas">JAVA</Link></Menu.Item>
                        <Menu.Item key="setting:5"><Link to="/database">数据库</Link></Menu.Item>
                        <Menu.Item key="setting:6"><Link to="/datastructure">数据结构</Link></Menu.Item>
                        <Menu.Item key="setting:7"><Link to="/tcpip">网络</Link></Menu.Item>
                        <Menu.Item key="setting:8"><Link to="/resources">资源列表</Link></Menu.Item>
                        <Menu.Item key="setting:8"><Link to="/d">草稿</Link></Menu.Item>
                    </SubMenu>

                </Menu>
                </div>

            </div>
        );
    }
}

export default Title;