import {List, Button, Spin,Icon,Rate,Tag,message,Modal ,Input} from 'antd';
import React from 'react';
import {Link} from 'react-router-dom';



const data = [

    {
        "title": "推荐算法(一)协同过滤算法",
        "description": "...",
        "url": "dbscan",
        "mi": 2.0,
        "typeColor": "cyan",
        "typeName": "机器学习",
        "updateTime": "2018-02-17"
    },
    {
        "title": "聚类算法(四)社区划分算法",
        "description": "...",
        "url": "dbscan",
        "mi": 1.0,
        "typeColor": "cyan",
        "typeName": "机器学习",
        "updateTime": "2018-02-17"
    },
    {
        "title": "聚类算法(三)基于密度聚类算法",
        "description": "...",
        "url": "dbscan",
        "mi": 2.0,
        "typeColor": "cyan",
        "typeName": "机器学习",
        "updateTime": "2018-02-17"
    },
    {
        "title": "聚类算法(二)均值漂移算法",
        "description": "Mean Shift又称为均值漂移算法，与K-means算法一样，都是基于聚类中心的聚类算法，不同的是，mean shift算法不需要事先指定聚类中心个数k。",
        "url": "mshift",
        "mi": 1.0,
        "typeColor": "cyan",
        "typeName": "机器学习",
        "updateTime": "2018-02-17"
    },
    {
        "title": "聚类算法(一)K-平均算法",
        "description": "K-Means,也被称为k-平均算法，是一种广泛使用的聚类算法，通过比较样本的相似性，将相似的样本划分到同一个类别中。",
        "url": "kms",
        "mi": 2.5,
        "typeColor": "cyan",
        "typeName": "机器学习",
        "updateTime": "2018-02-17"
    },
    {
        "title": "分类算法(六)BP神经网络",
        "description": "神经网络由很多神经网络层构成，而每一层又由许多单元组成，第一层叫输入层，最后一层叫输出层，中间的各层叫隐藏层，在BP神经网络中，只有相邻的神经层的各个单元之间有联系，除了输出层外，每一层都有一个偏置结点",
        "url": "bp",
        "mi": 2.0,
        "typeColor": "cyan",
        "typeName": "机器学习",
        "updateTime": "2018-02-17"
    },
    {
        "title": "分类算法(五)随机深林",
        "description": " 随机森林(Random Forest)是一个非常灵活的机器学习方法，从市场营销到医疗保险有着众多的应用。它可以用于市场营销对客户获取和存留建模或预测病人的疾病风险和易感性。",
        "url": "mlearning9",
        "mi": 2.5,
        "typeColor": "cyan",
        "typeName": "机器学习",
        "updateTime": "2018-02-17"
    },
    {
        "title": "分类算法(四)支持向量机",
        "description": " SVM(Support Vector Machine 最大间隔分类器）是一种二分类模型，它是定义在特征空间上的间隔最大的线性分类器，间隔最大是SVM和感知机不同的地方，间隔最大化对应于泛化误差最小。",
        "url": "mlearning8",
        "mi": 2.0,
        "typeColor": "cyan",
        "typeName": "机器学习",
        "updateTime": "2018-02-17"
    },
    {
        "title": "分类算法(三)因子分解机",
        "description": " 因子分解机(Factorization Machine, FM)是由Steffen Rendle提出的一种基于矩阵分解的机器学习算法。因式分解机是一种基于LR模型的高效的学习特征间相互关系， \n" +
        "对于因子分解机FM来说，最大的特点是对于稀疏的数据具有很好的学习能力。",
        "url": "mlearning7",
        "mi": 2.0,
        "typeColor": "cyan",
        "typeName": "机器学习",
        "updateTime": "2018-02-17"
    },
    {
        "title": "分类算法(二)多分类回归",
        "description": "softmax回归是Logistic回归在多分类上的推广，即类标签y的取值大于等于2。Softmax回归模型对于手写数字分类，器官识别，动物分类等问题是很有用的。",
        "url": "mlearning6",
        "mi": 2.0,
        "typeColor": "cyan",
        "typeName": "机器学习",
        "updateTime": "2018-02-15"
    },
    {
        "title": "分类算法(一)逻辑回归",
        "description": "线性回归能对连续值结果进行预测，而现实生活中常见的另外一类问题是，分类问题。最简单的情况是是与否的二分类问题。比如说医生需要判断病人是否生病，银行要判断一个人的信用程度是否达到可以给他发信用卡的程度，邮件收件箱要自动对邮件分类为正常邮件和垃圾邮件等等。",
        "url": "mlearning5",
        "mi": 2.0,
        "typeColor": "cyan",
        "typeName": "机器学习",
        "updateTime": "2018-02-14"
    },

    {
        "title": "回归算法(一)线性回归",
        "description": "线性回归(Liner Regression),一般来说，样本和标签有着连续的取值，目标值不在一个固定的范围，与分类问题的主要区别；常用于预测房价，产值等",
        "url": "mlearning3",
        "mi": 2.0,
        "typeColor": "cyan",
        "typeName": "机器学习",
        "updateTime": "2018-02-14"
    },
    {
        "title": "机器学习理论基础(三)",
        "description": "感知机（PLA）算法",
        "url": "mlearning2",
        "mi": 1.5,
        "typeColor": "cyan",
        "typeName": "机器学习",
        "updateTime": "2018-02-13"
    },
    {
        "title": "机器学习理论基础(二)",
        "description": "什么是vc维",
        "url": "mlearning1",
        "mi": 2.0,
        "typeColor": "cyan",
        "typeName": "机器学习",
        "updateTime": "2018-02-13"
    },
    {
        "title": "机器学习理论基础(一)",
        "description": "机器学习有什么理论去支撑它是可行的？",
        "url": "mlearning0",
        "mi": 3.0,
        "typeColor": "cyan",
        "typeName": "机器学习",
        "updateTime": "2018-02-13"
    },
    {
        "title": "矩阵",
        "description": "线性代数不仅仅是一门数学学科，更是一门哲学，是一门描述世界的通用语言，我们应该很好的运用它;计算的目的不在于数字本身，而在于洞察其背后的意义。",
        "url": "matrix",
        "mi": 3.5,
        "typeColor": "cyan",
        "typeName": "机器学习",
        "updateTime": "2018-02-11"
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

