import React, {Component} from 'react';
import {HashRouter, Route} from 'react-router-dom';
import {Layout, Row, Col,Icon,BackTop} from 'antd'
//import {Layout, Row, Col,Icon,BackTop} from 'bundle-loader'


import Title from './html/Title';
import Home from './html/Home';
import About from './pages/About';
import LoadMoreList from './pages/LoadMoreList';
import List from './pages/List';
//Bundle
import Bundle from './component/Bundle';

import './App.css';

const {Content, Footer} = Layout

//数据库
const Mysql0 = (props) => (
    <Bundle load={() => import('./pages/Mysql0')}>
        {(Chat) => <Chat {...props}/>}
    </Bundle>
);
const Mysql1 = (props) => (
    <Bundle load={() => import('./pages/Mysql1')}>
        {(Chat) => <Chat {...props}/>}
    </Bundle>
);
const Mysql2 = (props) => (
    <Bundle load={() => import('./pages/Mysql2')}>
        {(Chat) => <Chat {...props}/>}
    </Bundle>
);
const Redis = (props) => (
    <Bundle load={() => import('./pages/Redis')}>
        {(Chat) => <Chat {...props}/>}
    </Bundle>
);
const Oracle = (props) => (
    <Bundle load={() => import('./pages/Oracle')}>
        {(Chat) => <Chat {...props}/>}
    </Bundle>
);


//java
const Jdk8 = (props) => (
    <Bundle load={() => import('./pages/Jdk8')}>
        {(Chat) => <Chat {...props}/>}
    </Bundle>
);
const Tomcat = (props) => (
    <Bundle load={() => import('./pages/Tomcat')}>
        {(Chat) => <Chat {...props}/>}
    </Bundle>
);
const ClassLoader = (props) => (
    <Bundle load={() => import('./pages/ClassLoader')}>
        {(Chat) => <Chat {...props}/>}
    </Bundle>
);
const DevUtils = (props) => (
    <Bundle load={() => import('./pages/DevUtils')}>
        {(Chat) => <Chat {...props}/>}
    </Bundle>
);


//数据结构
const HashTable = (props) => (
    <Bundle load={() => import('./pages/HashTable')}>
        {(Chat) => <Chat {...props}/>}
    </Bundle>
);
const ConsistencyHash = (props) => (
    <Bundle load={() => import('./pages/ConsistencyHash')}>
        {(Chat) => <Chat {...props}/>}
    </Bundle>
);
const ComplexityAnalysis = (props) => (
    <Bundle load={() => import('./pages/ComplexityAnalysis')}>
        {(Chat) => <Chat {...props}/>}
    </Bundle>
);
const Btree1 = (props) => (
    <Bundle load={() => import('./pages/Btree1')}>
        {(Chat) => <Chat {...props}/>}
    </Bundle>
);
const Btree = (props) => (
    <Bundle load={() => import('./pages/Btree')}>
        {(Chat) => <Chat {...props}/>}
    </Bundle>
);
const Tree = (props) => (
    <Bundle load={() => import('./pages/Tree')}>
        {(Chat) => <Chat {...props}/>}
    </Bundle>
);
const LineTable = (props) => (
    <Bundle load={() => import('./pages/LineTable')}>
        {(Chat) => <Chat {...props}/>}
    </Bundle>
);
const Graph = (props) => (
    <Bundle load={() => import('./pages/Graph')}>
        {(Chat) => <Chat {...props}/>}
    </Bundle>
);
//机器学习
const Matrix = (props) => (
    <Bundle load={() => import('./pages/Matrix')}>
        {(Chat) => <Chat {...props}/>}
    </Bundle>
);






class App extends Component {
    render() {
        return (
            <div>

                <Row>
                    <Col span={16} offset={4}>
                        <div>
                            <p></p>
                            <span style={{fontSize: '30px', marginBottom: '20px'}}> nick 的代码设计</span><br/>
                            <HashRouter>
                                <Route component={Title} path="/"/>
                            </HashRouter>
                            <br/>
                            <hr/>
                        </div>
                    </Col>
                </Row>

                <Row>
                    <Col span={16} offset={4}>
                        <Content style={{
                            margin: '24px 16px'
                        }}>
                            <HashRouter>
                                <div>
                                    <Route component={Home}  exact strict path="/"/>
                                    {/*<Route component={List} path="/list"/>*/}
                                    <Route component={About} exact strict path="/about"/>
                                    <Route component={LoadMoreList} exact strict  path="/list"/>
                                    {/*---------------------------------------*/}

                                    <Route component={Mysql0} exact strict path="/mysql0"/>
                                    <Route component={Mysql1} exact strict path="/mysql1"/>
                                    <Route component={Mysql2} exact strict path="/mysql2"/>
                                    <Route component={Redis} exact strict path="/redis"/>
                                    <Route component={Oracle} exact strict path="/oracle"/>
                                    {/*数据结构*/}
                                    <Route component={Btree} exact strict path="/btree"/>
                                    <Route component={Btree1} exact strict path="/btree1"/>
                                    <Route component={Tree} exact strict path="/tree"/>
                                    <Route component={HashTable} exact strict path="/hashTable"/>
                                    <Route component={ConsistencyHash} exact strict path="/consistencyHash"/>
                                    <Route component={ComplexityAnalysis} exact strict path="/complexityAnalysis"/>
                                    <Route component={LineTable} exact strict path="/lineTable"/>
                                    <Route component={Graph} exact strict path="/graph"/>

                                    {/*机器学习*/}
                                    <Route component={Matrix} exact strict path="/matrix"/>



                                    {/*java*/}
                                    <Route component={Jdk8} exact strict path="/jdk8"/>
                                    <Route component={ClassLoader} exact strict path="/classLoader"/>
                                    <Route component={Tomcat} exact strict path="/tomcat"/>
                                    <Route component={DevUtils} exact strict path="/devUtils"/>

                                    {/*test*/}

                                    {/*---------------------------------------*/}
                                </div>
                            </HashRouter>
                        </Content>
                    </Col>
                </Row>


                <Row>
                    <Col span={16} offset={4}>
                        <Footer className="text-center">
                            <a href='https://github.com/nick8sky'><Icon type="github" style={{ marginRight: 8 }} /></a>  <a href='http://blog.csdn.net/llianlianpay/'>csdn</a><br/>
                            ©2018 copyright by nick
                        </Footer>
                    </Col>
                </Row>

                <div>
                    <BackTop/>
                </div>

            </div>
        )
    }
}

export default App;
