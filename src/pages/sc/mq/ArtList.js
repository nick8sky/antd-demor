

import {List, Button, Spin,Icon,Rate,Tag,message,Modal ,Input} from 'antd';
import React, { Component } from 'react';
import {Link} from 'react-router-dom';


const data = [
    {
        "title": "rocketMQ整体架构",
        "description": "RocketMQ的消息持久化是基于文件系统，而从效率来看文件系统>kv存储>关系型数据库。那么，到底是如何存储的",
        "url": "rk3",
        "mi": 2.5,
        "typeColor": "cyan",
        "typeName": "mq",
        "updateTime": "2018-03-14"
    },
    {
        "title": "rocketMQ关键特性以及其实现原理",
        "description": "分布式消息系统作为实现分布式系统可扩展、可伸缩性的关键组件，需要具有高吞吐量、高可用等特点。而谈到消息系统的设计，就回避不了三个问题：消息的顺序问题，消息的重复问题，事务消息。",
        "url": "rk2",
        "mi": 4.0,
        "typeColor": "cyan",
        "typeName": "mq",
        "updateTime": "2018-02-24"
    },
    {
        "title": "rocketMQ使用",
        "description": "Apache RocketMQ作为阿里开源的一款高性能、高吞吐量的分布式消息中间件否可以解决，规范中如何定义这些问题。",
        "url": "rk1",
        "mi": 2.0,
        "typeColor": "cyan",
        "typeName": "mq",
        "updateTime": "2018-02-24"
    },
    {
        "title": "kafka与其他MQ比较",
        "description": "2011年初，Linkin开源了Kafka这个优秀的消息中间件，淘宝中间件团队在对Kafka做过充分Review之后，Kafka无限消息堆积，高效的持久化速度吸引了我们，但是同时发现这个消息系统主要定位于日志传输，对于使用在淘宝交易、订单、充值等场景下还有诸多特性不满足，为此我们重新用Java语言编写了RocketMQ，定位于非日志的可靠消息传输。",
        "url": "kf3",
        "mi": 2.0,
        "typeColor": "cyan",
        "typeName": "mq",
        "updateTime": "2018-02-24"
    },
    {
        "title": "kafka架构分析",
        "description": "Kafka独特设计在什么地方？",
        "url": "kf2",
        "mi": 4.0,
        "typeColor": "cyan",
        "typeName": "mq",
        "updateTime": "2018-02-23"
    },
    {
        "title": "kafka集群安装",
        "description": "kafka集群包含一个或多个服务器，这种服务器被称为broker。",
        "url": "kf1",
        "mi": 2.0,
        "typeColor": "cyan",
        "typeName": "mq",
        "updateTime": "2018-02-23"
    }
]





class ArtList extends Component {
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
        const pageSize = 100;
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
                        <p><img src="https://gitee.com/nick070809/pics/raw/master/home/wx.png"  style={{height:"100%",width:"100%"}}/></p>
                        <Input
                            placeholder="请输入图中的微信号或验证码"
                            prefix={<Icon type="question-circle-o" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            suffix={suffix}
                            value={key}
                            onChange={this.onChangeUserName}
                            ref={node => this.keyInput = node}
                        /></p>

                </Modal>

                ----mq 文章列表 ----

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

export default ArtList;