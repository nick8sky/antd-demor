import {List, Button, Spin,Icon,Rate,Tag} from 'antd';
import React from 'react';
import {Link} from 'react-router-dom';



const data = [
    {
        "title": "分类算法(二)多分类回归",
        "description": "softmax回归",
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
        "title": "回归算法(一)",
        "description": "线性回归,一般来说，样本和标签有着连续的取值，目标值不在一个固定的范围，与分类问题的主要区别；常用于预测房价，产值等",
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


class LoadMoreList extends React.Component {
    state = {
        loading: true,
        loadingMore: false,
        showLoadingMore: true,
        remaining :0,
        total :0,
        data: [],
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



    render() {
        const IconText = ({ type, text }) => (
            <span> <Icon type={type} style={{ marginRight: 8 }} />
                {text}
            </span>
        );

        const {loading, loadingMore, showLoadingMore, data,remaining,total} = this.state;
        const loadMore = showLoadingMore ? (
            <div style={{textAlign: 'center', marginTop: 12, height: 32, lineHeight: '32px'}}>
                {loadingMore && <Spin/>}
                {!loadingMore && <Button onClick={this.onLoadMore}>  loading more, total {total} remaining {remaining}  </Button>}
            </div>
        ) : null;
        return (
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
        );
    }
}

export default LoadMoreList;