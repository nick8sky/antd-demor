import {List, Button, Spin,Icon,Rate,Tag,message,Modal ,Input} from 'antd';
import React from 'react';
import {Link} from 'react-router-dom';



const data = [
    {
        "title": "如何管理时间",
        "description": "什么事最重要，什么事最紧急的事。",
        "url": "b1",
        "mi": 4.0,
        "typeColor": "cyan",
        "typeName": "架构",
        "updateTime": "2018-02-28"
    },




    {
        "title": "学习反模式(六)",
        "description": "做技术，犹如修习一门武功。",
        "url": "c9",
        "mi": 4.0,
        "typeColor": "cyan",
        "typeName": "架构",
        "updateTime": "2018-02-28"
    },
    {
        "title": "开发行为反模式(五)",
        "description": "这些反行为模式，并不针对某些特定的个人。如果你不幸中招，千万不要懊恼，因为这实在太正常不过了，很多反模式的坑我也是亲身踩过的。",
        "url": "c8",
        "mi": 4.0,
        "typeColor": "cyan",
        "typeName": "架构",
        "updateTime": "2018-02-28"
    },
    {
        "title": "开发反模式(四)",
        "description": "java开发中常见的反模式代码一览。",
        "url": "c7",
        "mi": 4.0,
        "typeColor": "cyan",
        "typeName": "架构",
        "updateTime": "2018-02-27"
    },
    {
        "title": "开发反模式(三)",
        "description": "java开发中常见的反模式代码一览。",
        "url": "c6",
        "mi": 4.0,
        "typeColor": "cyan",
        "typeName": "架构",
        "updateTime": "2018-02-27"
    },
    {
        "title": "架构反模式(二)",
        "description": "架构设计中不合理。",
        "url": "c5",
        "mi": 3.0,
        "typeColor": "cyan",
        "typeName": "架构",
        "updateTime": "2018-02-27"
    },
    {
        "title": "反模式架构(一)",
        "description": "研究表明，每6个项目就有5个被认为是不成功的，而且约1/3的项目在中途被取消，未取消的项目所消费的时间和成本是预计的两倍。",
        "url": "c5",
        "mi": 4.0,
        "typeColor": "cyan",
        "typeName": "架构",
        "updateTime": "2018-02-27"
    },
    {
        "title": "架构师学习路线",
        "description": "架构师还要根据业务发展阶段，提前预见发展到下一个阶段系统架构的解决方案，并且设计当前架构时将架构的升级扩展考虑进去，做到易于升级。",
        "url": "c4",
        "mi": 2.0,
        "typeColor": "cyan",
        "typeName": "架构",
        "updateTime": "2018-02-22"
    },
    {
        "title": "异地多活IDC机房架构",
        "description": "单机房一旦死机，断电、维护根本无法挽回整个数据，想离线读取等都不行。当一个机房不可用，所有的业务就都不可用。系统 要求业务离用户最近，南方的用户连南方的机房，北方的用户连北方的机房，国外的用户连国外的机房。大陆的网络和国外的网络有一定的隔离性，如果没有做多机房的连通性，数据的传输和实时性就会有问题。",
        "url": "idc",
        "mi": 4.0,
        "typeColor": "cyan",
        "typeName": "架构",
        "updateTime": "2018-02-21"
    },
    {
        "title": "[转]架构师之路：一个架构师需要掌握的知识技能",
        "description": "没有射鸡师的思想，你就不能成为一名架构师。",
        "url": "c3",
        "mi": 4.0,
        "typeColor": "cyan",
        "typeName": "架构",
        "updateTime": "2018-02-18"
    },
    {
        "title": "做 CTO，需要注意什么？",
        "description": "善于带团队是一门高难度的艺术——要能把握开发进度；要能照顾开发团队成员，带领大家一同进步；要能对接好产品、运营、商务、当然还有自己的组员和boss。",
        "url": "c2",
        "mi": 3.0,
        "typeColor": "cyan",
        "typeName": "架构",
        "updateTime": "2018-02-18"
    },
    {
        "title": "我承认，我是被我的CTO害死的",
        "description": "一个理想的创业公司，3个合伙人，应该是百度的技术，阿里的运营和腾讯的产品。",
        "url": "c1",
        "mi": 2.5,
        "typeColor": "cyan",
        "typeName": "架构",
        "updateTime": "2018-02-18"
    }

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

                                 <Link to={item.url}> <span className="link" >{item.title}</span></Link>
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

