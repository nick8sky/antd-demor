import {List, Button, Spin, Icon, Rate, Tag, message, Modal, Input} from 'antd';
import React from 'react';
import {Link} from 'react-router-dom';


const data = [
    {
        "title": "MyCat架构-路由模块",
        "description": "MyCat路由模块，大致上包括SQL语句分类，SQL语义解析，SQL语句改写，全局ID生成。",
        "url": "mycat6",
        "mi": 4.0,
        "typeColor": "cyan",
        "typeName": "数据库",
        "updateTime": "2018-03-04"
    },
    {
        "title": "MyCat架构-连接模块",
        "description": "AbstractConnection中的NIOProcessor是对AbstractConnection进行管理的方法类，NIOHandler是处理AbstractConnection读取的数据的处理方法类，NIOSocketWR是执行以上方法的线程类。",
        "url": "mycat5",
        "mi": 4.0,
        "typeColor": "cyan",
        "typeName": "数据库",
        "updateTime": "2018-03-04"
    },
    {
        "title": "MyCat架构-前端通信篇",
        "description": "从抓包内容上看到，前三次通信和tcp三次握手一致；mycat通过NIOAcceptor实现，NIOAcceptor主要完成绑定端口，注册OP_ACCEPT监听客户端连接事件，有客户连接，则放接受连接，将返回的channel封装成为FrontendConnection（AbstarctConnection的子类），从NIOReactorPool中拿出一个NIOReactor并将FrontendConnection交给它绑定。",
        "url": "mycat4",
        "mi": 4.0,
        "typeColor": "cyan",
        "typeName": "数据库",
        "updateTime": "2018-03-04"
    },
    {
        "title": "数据库路由中间件MyCat -使用篇",
        "description": "暂无。",
        "url": "mycat3",
        "mi": 1.5,
        "typeColor": "cyan",
        "typeName": "数据库",
        "updateTime": "2018-03-03"
    },
    {
        "title": "数据库路由中间件MyCat -分片规则",
        "description": "表被水平切分后，每个分片表所在的数据库就是一个分片节点, 一个分片节点对应一个数据库。一个分片节点只能保存每个分片表的一个分片，因为db中不允许出现同名的表。",
        "url": "mycat2",
        "mi": 3.0,
        "typeColor": "cyan",
        "typeName": "数据库",
        "updateTime": "2018-03-03"
    },
    {
        "title": "数据库路由中间件MyCat - 背景篇",
        "description": "目前商用的数据库以及开源的数据库一般都不支持大规模自动扩展，单库上面存在着性能瓶颈。一般的，MySQL数据库单表超过1000W~2000W条记录时，性能就会有比较明显的下降。为了提升性能以及可以存储数据的量，我们需要分库分表。",
        "url": "mycat1",
        "mi": 3.0,
        "typeColor": "cyan",
        "typeName": "数据库",
        "updateTime": "2018-03-03"
    },
    {
        "title": "Mysql分库分表(二)",
        "description": "Mysql分表和分区的区别、分库分表介绍与区别， 注意这里说的是三个概念。",
        "url": "mysql9",
        "mi": 3.0,
        "typeColor": "cyan",
        "typeName": "数据库",
        "updateTime": "2018-03-03"
    },
    {
        "title": "Mysql分库分表(一)",
        "description": "当一张表的数据达到几千万时，你查询一次所花的时间会变多，如果有联合查询的话，我想有可能会死在那儿了。分表的目的就在于此，减小数据库的负担，缩短查询时间。",
        "url": "mysql8",
        "mi": 4.0,
        "typeColor": "cyan",
        "typeName": "数据库",
        "updateTime": "2018-03-02"
    },
    {
        "title": "Mysql负载均衡",
        "description": "使用MySQL时随着时间的增长，用户量以及数据量的逐渐增加，访问量更是剧增，最终将会使MySQL达到某个瓶颈，那么MySQL的性能将会大大降低。",
        "url": "mysql7",
        "mi": 3.5,
        "typeColor": "cyan",
        "typeName": "数据库",
        "updateTime": "2018-03-02"
    },
    {
        "title": "Mysql实现主主复制",
        "description": "主主复制即在两台MySQL主机内都可以变更数据，而且另外一台主机也会做出相应的变更。",
        "url": "mysql6",
        "mi": 3.5,
        "typeColor": "cyan",
        "typeName": "数据库",
        "updateTime": "2018-03-02"
    },
    {
        "title": "使用Spring实现读写分离",
        "description": "我们一般应用对数据库而言都是“读多写少”，也就说对数据库读取数据的压力比较大，有一个思路就是说采用数据库集群的方案。",
        "url": "mysql5",
        "mi": 3.5,
        "typeColor": "cyan",
        "typeName": "数据库",
        "updateTime": "2018-03-02"
    },
    {
        "title": "Mysql实现主从复制",
        "description": "主库有数据变更时，会通知备库的io线程，io线程建立一个TCP长连接，接下来主库的binlog dump线程会推送主库的binlog。在进行完一次HTTP操作后保持该TCP连接（HTTP/1.1起默认使用长连接）。只要Server端或Client端不提出关闭请求，或存在其他异常情况，两者间的连接将持续下去。",
        "url": "mysql4",
        "mi": 2.5,
        "typeColor": "cyan",
        "typeName": "数据库",
        "updateTime": "2018-03-02"
    },
    {
        "title": "oracle一定要使用三层嵌套进行分页查询？",
        "description": "其实两层就可以，不过，两层嵌套查询不会用到oracle的外层条件内推机制，效率慢了点",
        "url": "oracle",
        "mi": 2.5,
        "typeColor": "cyan",
        "typeName": "数据库",
        "updateTime": "2018-02-10"
    },
    {
        "title": "mysql",
        "description": "mysql技术内幕.innoDB存储引擎，表的载体是文件系统，数据先写缓存再2次写入到文件，重做日志，二进制文件，检查点，索引，mvvc,acid...",
        "url": "mysql0",
        "mi": 3,
        "typeColor": "cyan",
        "typeName": "数据库",
        "updateTime": "2018-02-08"
    },
    {
        "title": "mysql",
        "description": "mysql运维内参，mysql基本使用，主从热备，HA,运维sql",
        "url": "mysql1",
        "mi": 2.5,
        "typeColor": "cyan",
        "typeName": "数据库",
        "updateTime": "2018-02-08"
    },
    {
        "title": "mysql",
        "description": "mysql的double write",
        "url": "mysql2",
        "mi": 4,
        "typeColor": "cyan",
        "typeName": "数据库",
        "updateTime": "2018-02-08"
    },
    {
        "title": "mysql",
        "description": "mysql的索引原理，及索引生效原理",
        "url": "mysql3",
        "mi": 2.5,
        "typeColor": "cyan",
        "typeName": "数据库",
        "updateTime": "2018-02-18"
    }
];


class LoadMoreList extends React.Component {
    constructor(props) {
        super(props);
        if (window.erred && window.erred > 3 && window.erred < 6) {
            message.error('nick不欢迎你，请离开本网站');
            window.erred = window.erred + 1;
        } else if (window.erred && window.erred > 5) {
            window.location.replace("http://news.baidu.com/")
        }
        /*console.log(props);*/
        this.state = {
            loading: true,
            loadingMore: false,
            showLoadingMore: true,
            remaining: 0,
            key: '',
            visible: false,
            total: 0,
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
        this.remaining = data.length - lastIndex;
        this.setState({
            remaining: data.length - lastIndex,
            total: data.length,
        });

        for (let j = (this.pigeNum - 1) * pageSize; j < lastIndex; j += 1) {
            arr.push(data[j])
        }

        callback(arr)
        this.pigeNum = this.pigeNum + 1

    }


    onLoadMore = () => {

        if (!window.needInput || window.needInput != 1) {
            this.setState({
                visible: true,
            });
            return;
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
        if (this.state.key && (this.state.key == '1989' || this.state.key == '2018' || this.state.key == 'nick070809')) {
            window.needInput = 1;
            this.onLoadMore();
        }
    }
    handleCancel = (e) => {
        this.setState({
            visible: false,
        });
    }
    emitEmpty = () => {
        this.keyInput.focus();
        this.setState({key: ''});
    }
    onChangeUserName = (e) => {
        this.setState({key: e.target.value});
    }

    render() {
        const IconText = ({type, text}) => (
            <span> <Icon type={type} style={{marginRight: 8}}/>
                {text}
            </span>
        );
        const suffix = key ? <Icon type="close-circle" onClick={this.emitEmpty}/> : null;
        const {loading, loadingMore, showLoadingMore, data, remaining, total, key} = this.state;
        const loadMore = showLoadingMore ? (
            <div style={{textAlign: 'center', marginTop: 12, height: 32, lineHeight: '32px'}}>
                {loadingMore && <Spin/>}
                {!loadingMore &&
                <Button onClick={this.onLoadMore}> loading more, total {total} remaining {remaining}  </Button>}
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
                        <p><img src="https://gitee.com/nick070809/pics/raw/master/home/wx.png"
                                style={{height: "100%", width: "100%"}}/></p>
                        <Input
                            placeholder="请输入图中的微信号或验证码"
                            prefix={<Icon type="question-circle-o" style={{color: 'rgba(0,0,0,.25)'}}/>}
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
                        <List.Item>
                            <List.Item.Meta
                                title={
                                    <span>

                                 <Link to={item.url}> <span className="link">{item.title}</span></Link>
                                </span>
                                }
                                description={
                                    <span>{item.description}<p></p><Tag>{item.typeName}</Tag><Rate allowHalf
                                                                                                   defaultValue={item.mi}/>|<IconText
                                        type="calendar" text={item.updateTime}/>
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

