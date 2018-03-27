import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Menu, Icon,Popover } from 'antd';
const SubMenu = Menu.SubMenu;


class Title extends Component {
    constructor(props) {
        super(props);
        this.state = {
            current: 'class',
        }
        this.statiss();
    }
    handleClick = (e) => {

        this.setState({
            current: e.key,
        });
    }

    handleClick2 = (e) => {
        window.location.replace("#/class")
    }

    handleClick3 = (e) => {
        window.history.back()
    }



    async statiss(){
        let hm = document.createElement("script");
        hm.src = "https://hm.baidu.com/hm.js?e7e4dc8d73e3a3eacc1c5d7a07eddbca";
        let s = document.getElementsByTagName("script")[0];
        s.parentNode.insertBefore(hm, s);
        /*const results = await fetch(`https://hm.baidu.com/hm.js?e7e4dc8d73e3a3eacc1c5d7a07eddbca`).then(
            console.log(results),
        )*/

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

                    <Menu.Item  style={{float:'right'}} key="back" >
                        <Popover  content="返回"  >
                            <a href="javascript:void(0)" onClick={this.handleClick3}> <span style={{fontSize: '20px'}}><Icon type="rollback" /></span></a>
                        </Popover>
                    </Menu.Item>

                    <Menu.Item  style={{float:'right'}} key="music" >
                        <Popover  content="一首歌在听你"  >
                            <Link to="/payer"><Icon type="coffee" /></Link>
                        </Popover>

                    </Menu.Item>

                    <Menu.Item  style={{float:'right'}} key="about" >
                        <Popover  content="关于我"  >
                            <Link to="/about"><Icon type="user" /></Link>
                        </Popover>

                    </Menu.Item>


                    <SubMenu    style={{float:'right'}} title={<span><Icon type="appstore-o" /></span>}  key="class"  onTitleClick={this.handleClick2}>
                        <Menu.Item key="setting:1"><Link to="/co">系统架构</Link></Menu.Item>
                        <Menu.Item key="setting:2"><Link to="/mlearn">机器学习</Link></Menu.Item>
                        <Menu.Item key="setting:3"><Link to="/upgrade">生活</Link></Menu.Item>
                        <Menu.Item key="setting:4"><Link to="/javas">JAVA</Link></Menu.Item>
                        <Menu.Item key="setting:5"><Link to="/database">数据库</Link></Menu.Item>
                        <Menu.Item key="setting:6"><Link to="/datastructure">数据结构</Link></Menu.Item>
                        <Menu.Item key="setting:7"><Link to="/tcpip">网络</Link></Menu.Item>
                        <Menu.Item key="setting:8"><Link to="/resources">资源列表</Link></Menu.Item>
                        <Menu.Item key="setting:9"><Link to="/linux">linux内核</Link></Menu.Item>
                        <Menu.Item key="setting:10"><Link to="/sc">中间件分析</Link></Menu.Item>
                        <Menu.Item key="setting:11"><Link to="/skill">面试宝典</Link></Menu.Item>
                        <Menu.Item key="setting:12"><Link to="/design">设计</Link></Menu.Item>
                    </SubMenu>

                    <Menu.Item  style={{float:'right'}} key="home" >
                        <Popover  content="首页"  >
                            <a href="#/"> <span style={{fontSize: '20px'}}><Icon type="home"  /></span></a>
                        </Popover>
                    </Menu.Item>

                </Menu>

                </div>

            </div>
        );
    }
}

export default Title;