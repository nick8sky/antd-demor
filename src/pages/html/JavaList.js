import {List, Button, Spin,Icon,Rate,Tag,message,Modal ,Input} from 'antd';
import React from 'react';



import {Link} from 'react-router-dom';

const data = [
    {
        "title": "Java 重入锁是怎么解决死锁的",
        "description": "ReentrantLock 和synchronized 都是 可重入锁。",
        "url": "java3",
        "mi": 4.0,
        "typeColor": "cyan",
        "typeName": "JAVA",
        "updateTime": "2018-03-05"
    },
    {
        "title": "Java GC日志分析及永久代的移除",
        "description": "随着Java8的到来，我们再也见不到永久代了。但是这并不意味着类的元数据信息也消失了。这些数据被移到了一个与堆不相连的本地内存区域，这个区域就是我们要提到的元空间。",
        "url": "jvm2",
        "mi": 4.0,
        "typeColor": "cyan",
        "typeName": "JAVA",
        "updateTime": "2018-03-01"
    },
    {
        "title": "Java常见的几种内存溢出及解决方法",
        "description": "堆内存，栈内存，栈深度，老年代溢出及处理。",
        "url": "jvm1",
        "mi": 2.0,
        "typeColor": "cyan",
        "typeName": "JAVA",
        "updateTime": "2018-03-01"
    },

    {
        "title": "Consul的ACL/DC配置使用",
        "description": "暂无。",
        "url": "consul2",
        "mi": 2.0,
        "typeColor": "cyan",
        "typeName": "JAVA",
        "updateTime": "2018-02-28"
    },

    {
        "title": "Consul简单使用集群配置，kv",
        "description": "use Consul to discover providers of a given service. Using either DNS or HTTP, applications can easily find the services they depend upon。\n",
        "url": "consul1",
        "mi": 3.0,
        "typeColor": "cyan",
        "typeName": "JAVA",
        "updateTime": "2018-02-28"
    },
    {
        "title": "僵尸进程的产生、发现及关闭",
        "description": "ShutdownHook(钩子线程),在线上Java程序中经常遇到进程程挂掉，一些状态没有正确的保存下来，这时候就需要在JVM关掉的时候执行一些清理现场的代码。Java中得ShutdownHook提供了比较好的方案。\n",
        "url": "java2",
        "mi": 2.0,
        "typeColor": "cyan",
        "typeName": "JAVA",
        "updateTime": "2018-02-26"
    },
    {
        "title": "如何优雅的关闭java进程",
        "description": "ShutdownHook(钩子线程),在线上Java程序中经常遇到进程程挂掉，一些状态没有正确的保存下来，这时候就需要在JVM关掉的时候执行一些清理现场的代码。Java中得ShutdownHook提供了比较好的方案。\n",
        "url": "java1",
        "mi": 2.0,
        "typeColor": "cyan",
        "typeName": "JAVA",
        "updateTime": "2018-02-26"
    },

    {
        "title": "协程",
        "description": "起初人们喜欢同步编程，然后发现有一堆线程因为I/O卡在那里,并发上不去，资源严重浪费；然后出了异步（select,epoll,kqueue,etc）,将I/O操作交给内核线程,自己注册一个回调函数处理最终结果。\n",
        "url": "jvmx",
        "mi": 4.0,
        "typeColor": "cyan",
        "typeName": "JAVA",
        "updateTime": "2018-02-24"
    },


    {
        "title": "乐观锁和悲观锁的区别",
        "description": "悲观锁每次去拿数据的时候都认为别人会修改，乐观锁每次去拿数据的时候都认为别人不会修改。",
        "url": "pessimisticLock",
        "mi": 1.0,
        "typeColor": "cyan",
        "typeName": "JAVA",
        "updateTime": "2018-02-21"
    },
    {
        "title": "Kotlin入门介绍和基础语法",
        "description": "或许该尝试用Kotlin写新的应用了。",
        "url": "kotlin1",
        "mi": 2.0,
        "typeColor": "cyan",
        "typeName": "JAVA",
        "updateTime": "2018-02-20"
    },
    {
        "title": "Kotlin使用",
        "description": "如何使用Kotlin。",
        "url": "kotlin2",
        "mi": 2.0,
        "typeColor": "cyan",
        "typeName": "JAVA",
        "updateTime": "2018-02-24"
    },
    {
        "title": "Kotlin中的协程",
        "description": "一些耗时操作(网络IO、文件IO、CPU/GPU密集型任务)会阻塞线程直到操作完成,Kotlin的协程提供一种避免阻塞且更廉价可控的操作。",
        "url": "kotlin3",
        "mi": 2.0,
        "typeColor": "cyan",
        "typeName": "JAVA",
        "updateTime": "2018-02-24"
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

