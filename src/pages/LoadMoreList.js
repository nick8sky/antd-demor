import {List, Button, Spin,Icon,Rate} from 'antd';
import React from 'react';
import {Link} from 'react-router-dom';


const data = [
    {
        "title": "[数据结构]链表",
        "description": "链表就是为了解决数组不能增长的需求。因为找不到一大块可以连续的存入数据，甚至也不知道程序可能使用的数据总量，所以就没办法划分一块数据来使用，划小了不够用，划大了浪费",
        "url": "lineTable",
        "mi": 1.0,
        "updateTime": "2018-02-11"
    },
    {
        "title": "[数据结构]树",
        "description": "数据结构中有很多树的结构，其中包括二叉树、二叉搜索树、2-3树、红黑树等等",
        "url": "tree",
        "mi": 3.0,
        "updateTime": "2018-02-11"
    },
    {
        "title": "[数据结构]B树",
        "description": "B-tree，即为B树。因为B树的原英文名称为B-tree，而国内很多人喜欢把B-tree译作B-树，其实，这是个非常不好的直译，很容易让人产生误解。如人们可能会以为B-树是一种树，而B树又是一种一种树。而事实上是，B-tree就是指的B树。",
        "url": "btree",
        "mi": 2.0,
        "updateTime": "2018-02-10"
    },
    {
        "title": "[数据结构]B+树",
        "description": "B+树和二叉树、平衡二叉树一样，都是经典的数据结构。B+树由B树和索引顺序访问方法演化而来，但是在实际使用过程中几乎已经没有使用B树的情况了。",
        "url": "btree1",
        "mi": 3.0,
        "updateTime": "2018-02-10"
    },
    {
        "title": "[数据结构]图",
        "description": "线性表和树两类数据结构，线性表中的元素是“一对一”的关系，树中的元素是“一对多”的关系，本章所述的图结构中的元素则是“多对多”的关系，而图是一种复杂的非线性结构。",
        "url": "graph",
        "mi": 2.5,
        "updateTime": "2018-02-11"
    },
    {
        "title": "[数据结构]复杂度分析",
        "description": "时间复杂度&空间复杂度分析",
        "url": "complexityAnalysis",
        "mi": 2.0,
        "updateTime": "2018-02-11"
    },
    {
        "title": "[数据结构]一致性哈希",
        "description": "一致性哈希算法是分布式系统中常用的算法。比如，一个分布式的存储系统，要将数据存储到具体的节点上",
        "url": "consistencyHash",
        "mi": 1.5,
        "updateTime": "2018-02-11"
    },
    {
        "title": "[数据结构]哈希表",
        "description": "哈希表是一种根据关键码去寻找值的数据映射结构，该结构通过把关键码映射的位置去寻找存放值的地方",
        "url": "hashTable",
        "mi": 1.5,
        "updateTime": "2018-02-11"
    },
    {
        "title": "[数据库]oracle",
        "description": "暂无",
        "url": "oracle",
        "mi": 2.5,
        "updateTime": "2018-02-10"
    },
    {
        "title": "[数据库]mysql",
        "description": "mysql技术内幕.innoDB存储引擎，表的载体是文件系统，数据先写缓存再2次写入到文件，重做日志，二进制文件，检查点，索引，mvvc,acid...",
        "url": "mysql0",
        "mi": 3,
        "updateTime": "2018-02-08"
    },
    {
        "title": "[数据库]mysql",
        "description": "mysql运维内参，mysql基本使用，主从热备，HA,运维sql",
        "url": "mysql1",
        "mi": 2.5,
        "updateTime": "2018-02-08"
    },
    {
        "title": "[数据库]mysql",
        "description": "mysql的double write",
        "url": "mysql2",
        "mi": 4,
        "updateTime": "2018-02-08"
    },
    {
        "title": "[数据库]redis",
        "description": "redis基本数据类型，事务，分布式锁，哨兵，集群模式",
        "url": "redis",
        "mi": 3,
        "updateTime": "2018-02-08"
    },
    {
        "title": "[JAVA]jdk8",
        "description": "jdk8的lambda表达式、stream api",
        "url": "jdk8",
        "mi": 3.5,
        "updateTime": "2018-02-07"
    },
    {
        "title": "[JAVA]类加载",
        "description": "类加载，双亲委派模型，自定义类加载器",
        "url": "classLoader",
        "mi": 1.5,
        "updateTime": "2018-02-07"
    },
    {
        "title": "[JAVA]tomcat",
        "description": "tomcat类容器隔离与热部署",
        "url": "tomcat",
        "mi": 2,
        "updateTime": "2018-02-06"
    }


];


class LoadMoreList extends React.Component {
    state = {
        loading: true,
        loadingMore: false,
        showLoadingMore: true,
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
        const pageSize = 7;
        let arr = [];
        let lastIndex = this.pigeNum * pageSize;

        if (this.pigeNum * pageSize >= data.length) {
            lastIndex = data.length;
        }

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
        const {loading, loadingMore, showLoadingMore, data} = this.state;
        const loadMore = showLoadingMore ? (
            <div style={{textAlign: 'center', marginTop: 12, height: 32, lineHeight: '32px'}}>
                {loadingMore && <Spin/>}
                {!loadingMore && <Button onClick={this.onLoadMore}>loading more</Button>}
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
                                 <Link to={item.url}> <span style={{fontSize: '20px'}}>{item.title}</span></Link>
                            }
                            description={
                                <span>{item.description }<br/><Rate allowHalf defaultValue={item.mi} />&nbsp;&nbsp;&nbsp;&nbsp;|<IconText type="calendar" text={item.updateTime} /> </span>
                                }
                        />
                    </List.Item>

                )}
            />
        );
    }
}

export default LoadMoreList;