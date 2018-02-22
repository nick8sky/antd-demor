import {List, Button, Spin,Icon,Rate,Tag,message,Modal ,Input} from 'antd';
import React from 'react';
import {Link} from 'react-router-dom';



const data = [
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
        /*console.log(props);*/
        const  q = props.location.search ;
        if(q){
            if(q =='?1989' || q== '?2018'){
                window.needInput = 1 ;
            }
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
                title="添加加微信好友,请注明github"
                visible={this.state.visible}
                onOk={this.handleOk}
                onCancel={this.handleCancel}
                >
                <p>
                    <p><img src="http://i4.bvimg.com/633340/e057c3f6888bf1a5t.jpg" style={{height:"100%",width:"100%"}}/></p>
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

                                 <Link to={item.url}> <span style={{fontSize: '20px'}}>{item.title}</span></Link>
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

