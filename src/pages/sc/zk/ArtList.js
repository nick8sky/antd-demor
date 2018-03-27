

import {List, Button, Spin,Icon,Rate,Tag,message,Modal ,Input} from 'antd';
import React, { Component } from 'react';
import {Link} from 'react-router-dom';


const data = [


    {
        "title": "Zookeeper",
        "description": "Zookeeper 作为一个分布式的服务框架，主要用来解决分布式集群中应用系统的一致性问题，它能提供基于类似于文件系统的目录节点树方式的数据存储，但是 Zookeeper 并不是用来专门存储数据的，它的作用主要是用来维护和监控你存储的数据的状态变化。",
        "url": "zk3",
        "mi": 3,
        "typeColor": "cyan",
        "typeName": "zookeeper",
        "updateTime": "2018-02-22"
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

                ----redis 文章列表 ----

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