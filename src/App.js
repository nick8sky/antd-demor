import React, {Component} from 'react';
import {HashRouter, Route} from 'react-router-dom';
import {Layout, Row, Col,Icon,BackTop} from 'antd'

import Title from './html/Title';
import Home from './html/Home';
import About from './pages/About';
import LoadMoreList from './pages/LoadMoreList';
import List from './pages/List';

//数据库
import Mysql0 from './pages/Mysql0';
import Mysql1 from './pages/Mysql1';
import Mysql2 from './pages/Mysql2';
import Redis from './pages/Redis';
import Oracle from './pages/Oracle';


//java
import Jdk8 from './pages/Jdk8';
import Tomcat from './pages/Tomcat';
import ClassLoader from './pages/ClassLoader';
import DevUtils from './pages/DevUtils';


//数据结构
import HashTable from './pages/HashTable';
import ConsistencyHash from './pages/ConsistencyHash';
import ComplexityAnalysis from './pages/ComplexityAnalysis';
import Btree1 from './pages/Btree1';
import Btree from './pages/Btree';
import Tree from './pages/Tree';
import LineTable from './pages/LineTable';
import Graph from './pages/Graph';

//机器学习
import Matrix from './pages/Matrix';


import Re from './html/Git';

import './App.css';

const {Content, Footer} = Layout

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
                                    <Route component={Jdk8} path="/jdk8"/>
                                    <Route component={ClassLoader} path="/classLoader"/>
                                    <Route component={Tomcat} path="/tomcat"/>
                                    <Route component={DevUtils} path="/devUtils"/>


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
