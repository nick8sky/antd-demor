import {List, Button, Spin,Icon,Rate,Tag,message,Modal ,Input} from 'antd';
import React from 'react';
import {Link} from 'react-router-dom';



const data = [

    {
        "title": "和女朋友聊天如何避免一问一答式的对话?",
        "description": "怎么避免一问一答式的对话呢？很简单，不要抛问句！",
        "url": "talkwithu",
        "mi": 4.0,
        "typeColor": "cyan",
        "typeName": "生活",
        "updateTime": "2018-03-01"
    },

    {
        "title": "[转]巴黎最后的探戈",
        "description": "时常能想起这部电影中急促却又充满着遥远乡愁的爵士音乐，那些仿佛自原始蛮荒的场景中传来的鼓点，夹杂着岁月流逝的沙沙声，与时而情绪激动歇斯底里，时而平滑如水行走如风的萨克斯。",
        "url": "mv1",
        "mi": 2.0,
        "typeColor": "cyan",
        "typeName": "生活",
        "updateTime": "2018-02-20"
    },

    {
        "title": "想和你说晚安",
        "description": "和你的每一句话都想有温度。",
        "url": "goodnight",
        "mi": 2.5,
        "typeColor": "cyan",
        "typeName": "生活",
        "updateTime": "2018-02-17"
    },
    {
        "title": "《人类简史》",
        "description": "简要笔记",
        "url": "peopleh",
        "mi": 1.5,
        "typeColor": "cyan",
        "typeName": "社会",
        "updateTime": "2018-02-15"
    },

    {
        "title": "有效沟通",
        "description": "每周和我们打交道最多的是周围的同事，如何和他们很好的沟通，以及延伸到家庭，生活中；",
        "url": "dyh",
        "mi": 4.5,
        "typeColor": "cyan",
        "typeName": "社会",
        "updateTime": "2018-02-12"
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

