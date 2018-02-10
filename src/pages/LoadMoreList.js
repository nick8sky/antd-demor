import {List, Button, Spin,Icon,Rate} from 'antd';
import React from 'react';
import {Link} from 'react-router-dom';


const data = [
    {
        "title": "[数据库]oracle",
        "description": "暂无",
        "url": "oracle",
        "mi": 2.5,
        "updateTime": "2018-02-10"
    },
    {
        "title": "[数据结构]B树",
        "description": "暂无",
        "url": "btree",
        "mi": 3.5,
        "updateTime": "2018-02-10"
    },
    {
        "title": "[数据库]mysql",
        "description": "mysql技术内幕.innoDB存储引擎.第二版，表的载体是文件系统，数据先写缓存再2次写入到文件，重做日志，二进制文件，检查点，索引，mvvc,acid...",
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