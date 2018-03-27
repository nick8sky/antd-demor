

import {List, Button, Spin,Icon,Rate,Tag,message,Modal ,Input} from 'antd';
import React, { Component } from 'react';
import {Link} from 'react-router-dom';


const data = [
    {
        "title": "hashcode方法的作用?",
        "description": "不能根据hashcode值判断两个对象是否相等，但是可以直接根据hashcode值判断两个对象不等，如果两个对象的hashcode值不等，则必定是两个不同的对象。如果要判断两个对象是否真正相等，必须通过equals方法。",
        "url": "ask1",
        "mi": 3.0,
        "typeColor": "cyan",
        "typeName": "面试宝典",
        "updateTime": "2018-03-11"
    },
    {
        "title": "如何理解http无状态?",
        "description": "知道tcp有状态，不知http无状态是什么意思",
        "url": "ask2",
        "mi": 3.0,
        "typeColor": "cyan",
        "typeName": "面试宝典",
        "updateTime": "2018-03-11"
    }
    ,
    {
        "title": "什么是中间人攻击?如何防范中间人攻击?",
        "description": "中间人（MITM）攻击是一种攻击类型，其中攻击者将它自己放到两方之间，通常是客户端和服务端通信线路的中间。",
        "url": "ask3",
        "mi": 3.0,
        "typeColor": "cyan",
        "typeName": "面试宝典",
        "updateTime": "2018-03-11"
    }
    ,
    {
        "title": "Java中什么样的对象才能作为gc root?",
        "description": "老生常谈的jvm内存模型，还是有一些需要记住的。",
        "url": "ask4",
        "mi": 3.0,
        "typeColor": "cyan",
        "typeName": "面试宝典",
        "updateTime": "2018-03-14"
    }
    ,
    {
        "title": "tcp有些什么状态？",
        "description": "在tcp的四次挥手时，常常发现一些状态转换，当问到tcp有些什么状态时，往往回答不全。",
        "url": "ask5",
        "mi": 3.0,
        "typeColor": "cyan",
        "typeName": "面试宝典",
        "updateTime": "2018-03-14"
    }
    ,
    {
        "title": "java.util.ConcurrentModificationException 如何发生的？",
        "description": "并发操作异常其实不是并发造成的，而是集合的长度发生了变化，内部类和外部不一致造成的。",
        "url": "ask6",
        "mi": 3.0,
        "typeColor": "cyan",
        "typeName": "面试宝典",
        "updateTime": "2018-03-14"
    }
    ,
    {
        "title": "分布式系统是什么，分布式计算的优缺点有哪些？",
        "description": "rpc的缺点,如何实现一个分布式RPC框架",
        "url": "ask7",
        "mi": 3.0,
        "typeColor": "cyan",
        "typeName": "面试宝典",
        "updateTime": "2018-03-14"
    }
    ,
    {
        "title": "如何拆分一个系统？",
        "description": "为什么要拆分系统？需要注意什么?系统与业务的关系？",
        "url": "askdesign1",
        "mi": 3.0,
        "typeColor": "cyan",
        "typeName": "面试宝典",
        "updateTime": "2018-03-14"
    }
    ,
    {
        "title": "解释一下mysql 的锁、事务与并发机制？",
        "description": "看了很多表锁，行锁，死锁，死锁的解决方法，mvcc，事务的隔离性，共享锁，排它锁，这些都弄清楚了吗？",
        "url": "ask10",
        "mi": 3.0,
        "typeColor": "cyan",
        "typeName": "面试宝典",
        "updateTime": "2018-03-19"
    }
    ,
    {
        "title": "解释一下mysql insert加锁过程？",
        "description": "有人说insert是表锁，update是行锁到底正确吗？",
        "url": "ask8",
        "mi": 3.0,
        "typeColor": "cyan",
        "typeName": "面试宝典",
        "updateTime": "2018-03-14"
    },
    {
        "title": "索引的使用跟查询的and的前后顺序有关吗？",
        "description": "比如建了一个索引idx(A, B, C),他说的是要使用A, AB, ABC这样的顺序查询,而使用B, BC, 这样是使用不到索引的.",
        "url": "ask9",
        "mi": 2.0,
        "typeColor": "cyan",
        "typeName": "面试宝典",
        "updateTime": "2018-03-16"
    },
    {
        "title": "mysql中的那些锁？",
        "description": "锁合集.",
        "url": "ask11",
        "mi": 2.0,
        "typeColor": "cyan",
        "typeName": "面试宝典",
        "updateTime": "2018-03-19"
    }


    ,
    {
        "title": "聊聊gc中的CMS回收器？",
        "description": "新时代垃圾回收算法，老年代回收算法.",
        "url": "ask12",
        "mi": 3.0,
        "typeColor": "cyan",
        "typeName": "面试宝典",
        "updateTime": "2018-03-27"
    }
    ,
    {
        "title": "hashmap再深入理解？",
        "description": "以为理解的可以了，还有一些我不知道的",
        "url": "ask13",
        "mi": 3.0,
        "typeColor": "cyan",
        "typeName": "面试宝典",
        "updateTime": "2018-03-27"
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

                ----面试宝典 文章列表 ----

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