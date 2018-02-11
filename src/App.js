import React, {Component} from 'react';
import {HashRouter, Route} from 'react-router-dom';
import {Layout, Row, Col,Icon,BackTop} from 'antd'

import Home from './pages/Home';
import About from './pages/About';
import LoadMoreList from './pages/LoadMoreList';
import List from './pages/List';

import Mysql0 from './pages/Mysql0';
import Mysql1 from './pages/Mysql1';
import Mysql2 from './pages/Mysql2';
import Redis from './pages/Redis';
import Jdk8 from './pages/Jdk8';
import ClassLoader from './pages/ClassLoader';
import Oracle from './pages/Oracle';
import Tomcat from './pages/Tomcat';

//数据结构
import HashTable from './pages/HashTable';
import ConsistencyHash from './pages/ConsistencyHash';
import ComplexityAnalysis from './pages/ComplexityAnalysis';
import Btree1 from './pages/Btree1';
import Btree from './pages/Btree';
import Tree from './pages/Tree';
import LineTable from './pages/LineTable';
import Graph from './pages/Graph';


import './App.css';

const {Content, Footer} = Layout

class App extends Component {
    render() {
        const IconText = ({ type, text }) => (
            <span> <Icon type={type} style={{ marginRight: 8 }} />
                {text}
            </span>
        );

        return (
            <div>

                <Row>
                    <Col span={16} offset={4}>
                        <div>
                            <span style={{fontSize: '30px', marginBottom: '20px'}}> nick 的代码设计</span><br/>
                            <HashRouter>
                                <Route component={Home} path="/"/>
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
                                    {/*<Route component={List} path="/list"/>*/}
                                    <Route component={About} path="/about"/>
                                    <Route component={LoadMoreList} path="/list"/>
                                    {/*---------------------------------------*/}

                                    <Route component={Mysql0} path="/mysql0"/>
                                    <Route component={Mysql1} path="/mysql1"/>
                                    <Route component={Mysql2} path="/mysql2"/>
                                    <Route component={Redis} path="/redis"/>
                                    <Route component={Jdk8} path="/jdk8"/>
                                    <Route component={ClassLoader} path="/classLoader"/>
                                    <Route component={Tomcat} path="/tomcat"/>
                                    <Route component={Oracle} path="/oracle"/>
                                    {/*数据结构*/}
                                    <Route component={Btree} path="/btree"/>
                                    <Route component={Btree1} path="/btree1"/>
                                    <Route component={Tree} path="/tree"/>
                                    <Route component={HashTable} path="/hashTable"/>
                                    <Route component={ConsistencyHash} path="/consistencyHash"/>
                                    <Route component={ComplexityAnalysis} path="/complexityAnalysis"/>
                                    <Route component={LineTable} path="/lineTable"/>
                                    <Route component={Graph} path="/graph"/>

                                    {/*数据结构*/}



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
