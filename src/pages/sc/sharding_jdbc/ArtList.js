

import {List, Button, Spin,Icon,Rate,Tag,message,Modal ,Input} from 'antd';
import React, { Component } from 'react';
import {Link} from 'react-router-dom';


const data = [
    {
        "title": "Sharding-Jdbc一览",
        "description": "无论使用哪种架构，核心逻辑均极为相似，除了协议实现层不同（JDBC或数据库协议），都会分为分片规则配置、SQL解析、SQL改写、SQL路由、SQL执行以及结果归并等模块。",
        "url": "sharding1",
        "mi": 2.0,
        "typeColor": "cyan",
        "typeName": "源码分析",
        "updateTime": "2018-03-06"
    },
    {
        "title": "Sharding-Jdbc SQL解析(Lexer)",
        "description": "SQL 解析引擎，数据库中间件必备的功能和流程。新引擎仅解析分片上下文，对于 SQL 采用\"半理解\"理念，进一步提升性能和兼容性，同时降低了代码复杂度。",
        "url": "sharding2",
        "mi": 3.0,
        "typeColor": "cyan",
        "typeName": "源码分析",
        "updateTime": "2018-03-06"
    },
    {
        "title": "Sharding-Jdbc SQL解析(Parser)",
        "description": "区别于 Lexer，Parser 用于提炼分片上下文，标记需要SQL改写的部分。",
        "url": "sharding3",
        "mi": 3.0,
        "typeColor": "cyan",
        "typeName": "源码分析",
        "updateTime": "2018-03-06"
    }
    ,
    {
        "title": "Sharding-Jdbc SQL解析(Parser)",
        "description": "由于每个数据库在遵守 SQL 语法规范的同时，又有各自独特的语法。因此，在 Sharding-JDBC 里每个数据库都有自己的 SELECT 语句的解析器实现方式，当然绝大部分逻辑是相同的。",
        "url": "sharding4",
        "mi": 3.0,
        "typeColor": "cyan",
        "typeName": "源码分析",
        "updateTime": "2018-03-06"
    }
    ,
    {
        "title": "Sharding-Jdbc SQL路由(Route)",
        "description": "数据分片的逻辑表，对于水平拆分的数据库(表)，同一类表的总称。例：订单数据根据主键尾数拆分为10张表,分别是t_order_0到t_order_9，他们的逻辑表名为t_order。",
        "url": "sharding5",
        "mi": 3.0,
        "typeColor": "cyan",
        "typeName": "源码分析",
        "updateTime": "2018-03-06"
    }
    ,
    {
        "title": "Sharding-Jdbc SQL改写",
        "description": "数据分片的逻辑表，对于水平拆分的数据库(表)，同一类表的总称。例：订单数据根据主键尾数拆分为10张表,分别是t_order_0到t_order_9，他们的逻辑表名为t_order。",
        "url": "sharding6",
        "mi": 3.0,
        "typeColor": "cyan",
        "typeName": "源码分析",
        "updateTime": "2018-03-07"
    }
    ,
    {
        "title": "Sharding-Jdbc SQL改写3",
        "description": "数据分片的逻辑表，对于水平拆分的数据库(表)，同一类表的总称。例：订单数据根据主键尾数拆分为10张表,分别是t_order_0到t_order_9，他们的逻辑表名为t_order。",
        "url": "sharding6",
        "mi": 3.0,
        "typeColor": "cyan",
        "typeName": "源码分析",
        "updateTime": "2018-03-07"
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

                ----sharding-jdbc 文章列表 ----

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