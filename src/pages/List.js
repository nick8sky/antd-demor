import React, {Component} from 'react';
import {Link} from 'react-router-dom';

class List extends Component {
    render() {
        return (
            <div>
                <ul>
                    <li><Link to="/mysql0"><span style ={{fontSize:'20px'}}>mysql</span></Link><br/>mysql技术内幕.innoDB存储引擎.第二版，表的载体是文件系统，数据先写缓存再2次写入到文件，重做日志，二进制文件，检查点，索引，mvvc,acid...</li>
                    <li><Link to="/mysql1"> <span style ={{fontSize:'20px'}}>mysql</span></Link><br/>mysql运维内参，mysql基本使用，主从热备，HA,运维sql</li>
                    <li><Link to="/mysql2"> <span style ={{fontSize:'20px'}}>mysql</span></Link><br/>mysql的double write</li>
                    <li><Link to="/redis"> <span style ={{fontSize:'20px'}}>redis</span></Link><br/>redis基本数据类型，事务，分布式锁，哨兵，集群模式</li>
                    <li><Link to="/jdk8"> <span style ={{fontSize:'20px'}}>jdk8</span></Link><br/>jdk8的lambda表达式、stream api</li>
                    <li><Link to="/classLoader"> <span style ={{fontSize:'20px'}}>类加载</span></Link><br/>类加载，双亲委派模型，自定义类加载器</li>
                    <li><Link to="/tomcat"> <span style ={{fontSize:'20px'}}>tomcat</span></Link><br/> tomcat类容器隔离与热部署</li>
                </ul>
            </div>

        );
    }
}

export default List;