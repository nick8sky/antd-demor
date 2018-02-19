import {List, Button, Spin,Icon,Rate,Tag,message,Modal ,Input} from 'antd';
import React from 'react';
import {Link} from 'react-router-dom';



const data = [

    {
        "title": "Traceroute程序",
        "description": "Traceroute程序可以让我们看到IP数据报从一台主机传到另一台主机所经过的路由。 Traceroute程序还可以让我们使用IP源路由选项。",
        "url": "traceRoute",
        "mi": 1.0,
        "typeColor": "cyan",
        "typeName": "Tcp/Ip",
        "updateTime": "2018-02-19"
    },

    {
        "title": "Ping程序",
        "description": "Ping程序由Mike Muuss编写，目的是为了测试另一 台主机是否可达。",
        "url": "ping",
        "mi": 1.0,
        "typeColor": "cyan",
        "typeName": "Tcp/Ip",
        "updateTime": "2018-02-19"
    },
    {
        "title": "逆地址解析协议",
        "description": "Mac地址由设备制造商定义/分配，每一个硬件设备都有一个链路层主地址（MAC地址），保存在设备的永久内存中。设备的mac地址不会改变（现在可以进行mac地址伪装),IP地址由用户配置给网络接口， 网络接口的IP地址是可以发生变化的",
        "url": "rarp",
        "mi": 0.5,
        "typeColor": "cyan",
        "typeName": "Tcp/Ip",
        "updateTime": "2018-02-19"
    },
    {
        "title": "地址解析协议",
        "description": "Mac地址由设备制造商定义/分配，每一个硬件设备都有一个链路层主地址（MAC地址），保存在设备的永久内存中。设备的mac地址不会改变（现在可以进行mac地址伪装),IP地址由用户配置给网络接口， 网络接口的IP地址是可以发生变化的",
        "url": "arp",
        "mi": 2.5,
        "typeColor": "cyan",
        "typeName": "Tcp/Ip",
        "updateTime": "2018-02-19"
    },
    {
        "title": "三层交换机多网段设置指导",
        "description": "企业里面一般连接有多个部门，不同部门可能需要区分管理，设置不同的网络权限，三层交换机可以划分多个网段，实现不同部门设置在不同的网段，方便管理。划分多网段还可以隔离广播包，避免网络上因大量广播包而导致的网络传输效率低的问题。",
        "url": "tlex",
        "mi": 2.5,
        "typeColor": "cyan",
        "typeName": "Tcp/Ip",
        "updateTime": "2018-02-19"
    },
    {
        "title": "HTTPS 原理详解",
        "description": "HTTPS（全称：HyperText Transfer Protocol over Secure Socket Layer），其实 HTTPS 并不是一个新鲜协议，Google 很早就开始启用了，初衷是为了保证数据安全。 近两年，Google、Baidu、Facebook 等这样的互联网巨头，不谋而合地开始大力推行 HTTPS， 国内外的大型互联网公司很多也都已经启用了全站 HTTPS，这也是未来互联网发展的趋势。",
        "url": "https",
        "mi": 4.0,
        "typeColor": "cyan",
        "typeName": "Tcp/Ip",
        "updateTime": "2018-02-19"
    },

    {
        "title": "[转]架构师之路：一个架构师需要掌握的知识技能",
        "description": "没有射鸡师的思想，你就不能成为一名架构师。",
        "url": "c3",
        "mi": 4.0,
        "typeColor": "cyan",
        "typeName": "onway",
        "updateTime": "2018-02-18"
    },
    {
        "title": "做 CTO，需要注意什么？",
        "description": "善于带团队是一门高难度的艺术——要能把握开发进度；要能照顾开发团队成员，带领大家一同进步；要能对接好产品、运营、商务、当然还有自己的组员和boss。",
        "url": "c2",
        "mi": 3.0,
        "typeColor": "cyan",
        "typeName": "onway",
        "updateTime": "2018-02-18"
    },
    {
        "title": "我承认，我是被我的CTO害死的",
        "description": "一个理想的创业公司，3个合伙人，应该是百度的技术，阿里的运营和腾讯的产品。",
        "url": "c1",
        "mi": 2.5,
        "typeColor": "cyan",
        "typeName": "onway",
        "updateTime": "2018-02-18"
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
        "title": "《人类简史》",
        "description": "简要笔记",
        "url": "peopleh",
        "mi": 1.5,
        "typeColor": "cyan",
        "typeName": "社会",
        "updateTime": "2018-02-15"
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
    },
    {
        "title": "有效沟通",
        "description": "每周和我们打交道最多的是周围的同事，如何和他们很好的沟通，以及延伸到家庭，生活中；",
        "url": "dyh",
        "mi": 4.5,
        "typeColor": "cyan",
        "typeName": "社会",
        "updateTime": "2018-02-12"
    },
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
    },
    {
        "title": "oracle",
        "description": "暂无",
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
    },
    {
        "title": "redis",
        "description": "redis基本数据类型，事务，分布式锁，哨兵，集群模式",
        "url": "redis",
        "mi": 3,
        "typeColor": "cyan",
        "typeName": "数据库",
        "updateTime": "2018-02-08"
    },
    {
        "title": "jdk8",
        "description": "jdk8的lambda表达式、stream api",
        "url": "jdk8",
        "mi": 3.5,
        "typeColor": "cyan",
        "typeName": "JAVA",
        "updateTime": "2018-02-07"
    },
    {
        "title": "类加载",
        "description": "类加载，双亲委派模型，自定义类加载器",
        "url": "classLoader",
        "mi": 1.5,
        "typeColor": "cyan",
        "typeName": "JAVA",
        "updateTime": "2018-02-07"
    },
    {
        "title": "tomcat",
        "description": "tomcat类容器隔离与热部署",
        "url": "tomcat",
        "mi": 2,
        "typeColor": "cyan",
        "typeName": "JAVA",
        "updateTime": "2018-02-06"
    }, {
        "title": "日常开发工具合集",
        "description": "日常开发工具合集",
        "url": "devUtils",
        "mi": 1,
        "typeColor": "cyan",
        "typeName": "JAVA",
        "updateTime": "2018-02-12"
    }
];


let needInput = true;

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
        /*console.log(props);
        const  q = props.location.search ;
        if(q && q.length == 5 ){
            const w = q.substring(1);
            if(w =='1989' || w== '2018'){
                needInput = false ;
            }
        }*/
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

        if(needInput){
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
        if(this.state.key && (this.state.key == '1989' || this.state.key == '2018')){
            needInput = false ;
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
                title="添加微信获取验证码,请注明github"
                visible={this.state.visible}
                onOk={this.handleOk}
                onCancel={this.handleCancel}
                >
                <p>
                    <p><img src={require('../../img/WX20180220-022732@2x.png')} style={{height:"100%",width:"100%"}}/></p>
                    <Input
                    placeholder="输入验证码"
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

