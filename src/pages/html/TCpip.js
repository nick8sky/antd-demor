import {List, Button, Spin,Icon,Rate,Tag,message,Modal ,Input} from 'antd';
import React from 'react';
import {Link} from 'react-router-dom';



const data = [
    {
        "title": "VPN搭建",
        "description": "VPN搭建。",
        "url": "vpn",
        "mi": 1.0,
        "typeColor": "cyan",
        "typeName": "Tcp/Ip",
        "updateTime": "2018-02-21"
    },
    {
        "title": "内容分发网络 Content Delivery Network",
        "description": "假设有一位身处陕西西安的用户想要访问某网站www.xxxcom提供的服务，这个网站的服务器部署在北京市，那么这个用户发送的请求需要跨过陕西省、山西省、河北省最终才能到达北京市。",
        "url": "cdn",
        "mi": 4.0,
        "typeColor": "cyan",
        "typeName": "Tcp/Ip",
        "updateTime": "2018-02-21"
    },
    {
        "title": "传输控制协议",
        "description": "TCP是一个面向连接的协议。无论哪一方向另一方发送数据之前，都必须先在双方之间建立一条连接。本章将详细讨论一个TCP连接是如何建立的以及通信结束后是如何终止的。",
        "url": "tcp",
        "mi": 4.0,
        "typeColor": "cyan",
        "typeName": "Tcp/Ip",
        "updateTime": "2018-02-20"
    },
    {
        "title": "域名系统",
        "description": "暂无",
        "url": "dns",
        "mi": 2.0,
        "typeColor": "cyan",
        "typeName": "Tcp/Ip",
        "updateTime": "2018-02-20"
    },
    {
        "title": "用户数据报协议",
        "description": "暂无",
        "url": "udp",
        "mi": 1.0,
        "typeColor": "cyan",
        "typeName": "Tcp/Ip",
        "updateTime": "2018-02-20"
    },
    {
        "title": "IP选路",
        "description": "选路是IP最重要的功能之一。需要进行选路的数据报可以由本地主机产生，也可以由其他主机产生。在后一种情况下，主机必须配置成一个路由器，否则通过网络接口接收到的数据报，如果目的地址不是本机就要被丢弃。",
        "url": "iproute",
        "mi": 2.0,
        "typeColor": "cyan",
        "typeName": "Tcp/Ip",
        "updateTime": "2018-02-20"
    },
    {
        "title": "Traceroute程序",
        "description": "Traceroute程序可以让我们看到IP数据报从一台主机传到另一台主机所经过的路由。 Traceroute程序还可以让我们使用IP源路由选项。",
        "url": "traceRoute",
        "mi": 1.0,
        "typeColor": "cyan",
        "typeName": "Tcp/Ip",
        "updateTime": "2018-02-19"
    },
    {
        "title": "Ping程序",
        "description": "Ping程序由Mike Muuss编写，目的是为了测试另一 台主机是否可达。",
        "url": "ping",
        "mi": 1.0,
        "typeColor": "cyan",
        "typeName": "Tcp/Ip",
        "updateTime": "2018-02-19"
    },
    {
        "title": "网络控制报文协议",
        "description": "ICMP(Internet Control Message Protocol)认为是网络层的一个组成部分,IP协议并不是一个可靠的协议，它不保证数据被送达，那么保证数据送达的工作应该由其他的模块来完成。其中一个重要的模块就是ICMP（网络控制报文）协议。",
        "url": "icmp",
        "mi": 2.0,
        "typeColor": "cyan",
        "typeName": "Tcp/Ip",
        "updateTime": "2018-02-20"
    },
    {
        "title": "网络协议",
        "description": "IP是TCP/IP协议族中最为核心的协议。所有的TCP、UDP、ICMP及IGMP数据都以IP数据报格式传输。",
        "url": "iplayer",
        "mi": 3.0,
        "typeColor": "cyan",
        "typeName": "Tcp/Ip",
        "updateTime": "2018-02-20"
    },
    {
        "title": "逆地址解析协议",
        "description": "Mac地址由设备制造商定义/分配，每一个硬件设备都有一个链路层主地址（MAC地址），保存在设备的永久内存中。设备的mac地址不会改变（现在可以进行mac地址伪装),IP地址由用户配置给网络接口， 网络接口的IP地址是可以发生变化的",
        "url": "rarp",
        "mi": 0.5,
        "typeColor": "cyan",
        "typeName": "Tcp/Ip",
        "updateTime": "2018-02-19"
    },
    {
        "title": "地址解析协议",
        "description": "Mac地址由设备制造商定义/分配，每一个硬件设备都有一个链路层主地址（MAC地址），保存在设备的永久内存中。设备的mac地址不会改变（现在可以进行mac地址伪装),IP地址由用户配置给网络接口， 网络接口的IP地址是可以发生变化的",
        "url": "arp",
        "mi": 2.5,
        "typeColor": "cyan",
        "typeName": "Tcp/Ip",
        "updateTime": "2018-02-19"
    },
    {
        "title": "链路层",
        "description": "ISO/OSI的参考模型共有7层，由低层至高层分别为：物理层、数据链路层、网络层、传输层、会话层、表示层、应用层。",
        "url": "linklayer",
        "mi": 2.5,
        "typeColor": "cyan",
        "typeName": "Tcp/Ip",
        "updateTime": "2018-02-20"
    },
    {
        "title": "三层交换机多网段设置指导",
        "description": "企业里面一般连接有多个部门，不同部门可能需要区分管理，设置不同的网络权限，三层交换机可以划分多个网段，实现不同部门设置在不同的网段，方便管理。划分多网段还可以隔离广播包，避免网络上因大量广播包而导致的网络传输效率低的问题。",
        "url": "tlex",
        "mi": 2.5,
        "typeColor": "cyan",
        "typeName": "Tcp/Ip",
        "updateTime": "2018-02-19"
    },
    {
        "title": "HTTPS 原理详解",
        "description": "HTTPS（全称：HyperText Transfer Protocol over Secure Socket Layer），其实 HTTPS 并不是一个新鲜协议，Google 很早就开始启用了，初衷是为了保证数据安全。 近两年，Google、Baidu、Facebook 等这样的互联网巨头，不谋而合地开始大力推行 HTTPS， 国内外的大型互联网公司很多也都已经启用了全站 HTTPS，这也是未来互联网发展的趋势。",
        "url": "https",
        "mi": 4.0,
        "typeColor": "cyan",
        "typeName": "Tcp/Ip",
        "updateTime": "2018-02-19"
    },


];


 

class LoadMoreList extends React.Component {
    constructor(props) {
        super(props);
        if(window.erred && window.erred > 3 && window.erred  < 6){
            message.error('nick不欢迎你，请离开本网站');
            window.erred = window.erred +1 ;
        }else if(window.erred && window.erred > 5 ){
            window.location.replace("http://news.baidu.com/")
        }
        /*console.log(props);*/
        this.state = {
            loading: true,
            loadingMore: false,
            showLoadingMore: true,
            remaining :0,
            key:'',
            visible: false,
            total :0,
            data: [],
        }

    }

    pigeNum = 1;

    componentDidMount() {

        this.getData((results) => {
            this.setState({
                loading: false,
                data: results,
            });
        });
    }

    async getData(callback) {
        /*const {results} = await fetch(`https://randomuser.me/api/?results=5&inc=name,gender,email,nat&noinfo`).then(response => response.json())*/
        const pageSize = 10;
        let arr = [];
        let lastIndex = this.pigeNum * pageSize;

        if (this.pigeNum * pageSize >= data.length) {
            lastIndex = data.length;
        }
        this.remaining = data.length - lastIndex ;
        this.setState({
            remaining: data.length - lastIndex ,
            total:data.length,
        });

        for (let j = (this.pigeNum - 1) * pageSize; j < lastIndex; j += 1) {
            arr.push(data[j])
        }

        callback(arr)
        this.pigeNum = this.pigeNum + 1

    }


    onLoadMore = () => {
        if(!window.needInput || window.needInput != 1){
            this.setState({
                visible: true,
            });
            return ;
        }
        /*if(!canLoad){
            let answer=prompt("添加微信获取验证码,请注明github");
            if(answer && answer =='1989'){
                canLoad = true ;
            }else {
                message.error('输入有误');

                return ;
            }
        }*/
        this.setState({
            loadingMore: true,
        });
        this.getData((results) => {
            const data = this.state.data.concat(results);
            this.setState({
                data,
                loadingMore: false,
            }, () => {
                window.dispatchEvent(new Event('resize'));
            });
        });

    }

    handleOk = (e) => {
        /*console.log(this.state.key);*/
        this.setState({
            visible: false,
        });
        if(this.state.key && (this.state.key == '1989' || this.state.key == '2018' || this.state.key == 'nick070809')){
            window.needInput = 1 ;
            this.onLoadMore() ;
        }
    }
    handleCancel = (e) => {
        this.setState({
            visible: false,
        });
    }
    emitEmpty = () => {
        this.keyInput.focus();
        this.setState({ key: '' });
    }
    onChangeUserName = (e) => {
        this.setState({ key: e.target.value });
    }

    render() {
        const IconText = ({ type, text }) => (
            <span> <Icon type={type} style={{ marginRight: 8 }} />
                {text}
            </span>
        );
        const suffix = key ? <Icon type="close-circle" onClick={this.emitEmpty} /> : null;
        const {loading, loadingMore, showLoadingMore, data,remaining,total,key} = this.state;
        const loadMore = showLoadingMore ? (
            <div style={{textAlign: 'center', marginTop: 12, height: 32, lineHeight: '32px'}}>
                {loadingMore && <Spin/>}
                {!loadingMore && <Button onClick={this.onLoadMore}>  loading more, total {total} remaining {remaining}  </Button>}
            </div>
        ) : null;
        return (
            <div>
            <Modal
                title="添加微信好友,请注明github"
                visible={this.state.visible}
                onOk={this.handleOk}
                onCancel={this.handleCancel}
                >
                <p>
                    <p><img src="https://gitee.com/nick070809/pics/raw/master/home/wx.png" style={{height:"100%",width:"100%"}}/></p>
                    <Input
                    placeholder="请输入图中的微信号或验证码"
                    prefix={<Icon type="question-circle-o" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    suffix={suffix}
                    value={key}
                    onChange={this.onChangeUserName}
                    ref={node => this.keyInput = node}
                /></p>

            </Modal>
            <List
                className="demo-loadmore-list"
                loading={loading}
                itemLayout="horizontal"
                loadMore={loadMore}
                dataSource={data}
                renderItem={item => (
                    <List.Item >
                        <List.Item.Meta
                            title={
                                <span>

                                 <Link to={item.url}> <span className="link">{item.title}</span></Link>
                                </span>
                            }
                            description={
                                <span>{item.description }<p></p><Tag>{item.typeName}</Tag><Rate allowHalf defaultValue={item.mi} />|<IconText type="calendar" text={item.updateTime} />
                                <br/></span>
                                }
                        />
                    </List.Item>

                )}
            />
            </div>
        );
    }
}

export default LoadMoreList;

