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
import Btree from './pages/Btree';
import Oracle from './pages/Oracle';
import Tomcat from './pages/Tomcat';


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


                                    <Route component={Mysql0} path="/mysql0"/>
                                    <Route component={Mysql1} path="/mysql1"/>
                                    <Route component={Mysql2} path="/mysql2"/>
                                    <Route component={Redis} path="/redis"/>
                                    <Route component={Jdk8} path="/jdk8"/>
                                    <Route component={ClassLoader} path="/classLoader"/>
                                    <Route component={Tomcat} path="/tomcat"/>
                                    <Route component={Btree} path="/btree"/>
                                    <Route component={Oracle} path="/oracle"/>








                                </div>
                            </HashRouter>
                        </Content>
                    </Col>
                </Row>


                <Row>
                    <Col span={16} offset={4}>
                        <Footer className="text-center">
                            <a href='https://github.com/nick8sky'><IconText type="github" text=""/></a>  <a href='http://blog.csdn.net/llianlianpay/'>csdn</a><br/>
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
