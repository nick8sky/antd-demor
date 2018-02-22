import {List, Button, Spin,Icon,Rate,Tag,message,Modal ,Input} from 'antd';
import React from 'react';
import {Link} from 'react-router-dom';



const data = [
    {
        "title": "链表",
        "description": "链表就是为了解决数组不能增长的需求。因为找不到一大块可以连续的存入数据，甚至也不知道程序可能使用的数据总量，所以就没办法划分一块数据来使用，划小了不够用，划大了浪费",
        "url": "lineTable",
        "mi": 1.0,
        "typeColor": "cyan",
        "typeName": "数据结构",
        "updateTime": "2018-02-11"
    },
    {
        "title": "树",
        "description": "数据结构中有很多树的结构，其中包括二叉树、二叉搜索树、2-3树、红黑树等等",
        "url": "tree",
        "mi": 3.0,
        "typeColor": "cyan",
        "typeName": "数据结构",
        "updateTime": "2018-02-11"
    },
    {
        "title": "B树",
        "description": "B-tree，即为B树。因为B树的原英文名称为B-tree，而国内很多人喜欢把B-tree译作B-树，其实，这是个非常不好的直译，很容易让人产生误解。如人们可能会以为B-树是一种树，而B树又是一种一种树。而事实上是，B-tree就是指的B树。",
        "url": "btree",
        "mi": 2.0,
        "typeColor": "cyan",
        "typeName": "数据结构",
        "updateTime": "2018-02-10"
    },
    {
        "title": "B+树",
        "description": "B+树和二叉树、平衡二叉树一样，都是经典的数据结构。B+树由B树和索引顺序访问方法演化而来，但是在实际使用过程中几乎已经没有使用B树的情况了。",
        "url": "btree1",
        "mi": 3.0,
        "typeColor": "cyan",
        "typeName": "数据结构",
        "updateTime": "2018-02-10"
    },
    {
        "title": "图",
        "description": "线性表和树两类数据结构，线性表中的元素是“一对一”的关系，树中的元素是“一对多”的关系，本章所述的图结构中的元素则是“多对多”的关系，而图是一种复杂的非线性结构。",
        "url": "graph",
        "mi": 2.5,
        "typeColor": "cyan",
        "typeName": "数据结构",
        "updateTime": "2018-02-11"
    },
    {
        "title": "复杂度分析",
        "description": "时间复杂度&空间复杂度分析",
        "url": "complexityAnalysis",
        "mi": 2.0,
        "typeColor": "cyan",
        "typeName": "数据结构",
        "updateTime": "2018-02-11"
    },
    {
        "title": "一致性哈希",
        "description": "一致性哈希算法是分布式系统中常用的算法。比如，一个分布式的存储系统，要将数据存储到具体的节点上",
        "url": "consistencyHash",
        "mi": 1.5,
        "typeColor": "cyan",
        "typeName": "数据结构",
        "updateTime": "2018-02-11"
    },
    {
        "title": "哈希表",
        "description": "哈希表是一种根据关键码去寻找值的数据映射结构，该结构通过把关键码映射的位置去寻找存放值的地方",
        "url": "hashTable",
        "mi": 1.5,
        "typeColor": "cyan",
        "typeName": "数据结构",
        "updateTime": "2018-02-11"
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

