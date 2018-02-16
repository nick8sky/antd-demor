import React, {Component} from 'react';
import {HashRouter, Route} from 'react-router-dom';
import {Layout, Row, Col,Icon,BackTop,Affix} from 'antd'



//Bundle
import Bundle from './component/Bundle';
import './App.css';
import Title from './pages/html/Title';
import Home from './pages/html/Home';
import About from './pages/html/About';
//import List from './pages/List';
import LoadMoreList from './pages/html/LoadMoreList';


//常量放在import之后
//主列表 加载过慢 改为主页加载预加载图片
/*const LoadMoreList = (props) => (
    <Bundle load={() => import('./pages/LoadMoreList')}>
        {(Chat) => <Chat {...props}/>}
    </Bundle>
);*/
const ResourceList = (props) => (
    <Bundle load={() => import('./pages/html/ResourceList')}>
        {(Chat) => <Chat {...props}/>}
    </Bundle>
);
const DraftList = (props) => (
    <Bundle load={() => import('./pages/html/DraftList')}>
        {(Chat) => <Chat {...props}/>}
    </Bundle>
);

const {Content, Footer} = Layout;

//数据库
const Mysql0 = (props) => (
    <Bundle load={() => import('./pages/database/Mysql0')}>
        {(Chat) => <Chat {...props}/>}
    </Bundle>
);
const Mysql1 = (props) => (
    <Bundle load={() => import('./pages/database/Mysql1')}>
        {(Chat) => <Chat {...props}/>}
    </Bundle>
);
const Mysql2 = (props) => (
    <Bundle load={() => import('./pages/database/Mysql2')}>
        {(Chat) => <Chat {...props}/>}
    </Bundle>
);
const Redis = (props) => (
    <Bundle load={() => import('./pages/database/Redis')}>
        {(Chat) => <Chat {...props}/>}
    </Bundle>
);
const Oracle = (props) => (
    <Bundle load={() => import('./pages/database/Oracle')}>
        {(Chat) => <Chat {...props}/>}
    </Bundle>
);


//java
const Jdk8 = (props) => (
    <Bundle load={() => import('./pages/java/Jdk8')}>
        {(Chat) => <Chat {...props}/>}
    </Bundle>
);
const Tomcat = (props) => (
    <Bundle load={() => import('./pages/java/Tomcat')}>
        {(Chat) => <Chat {...props}/>}
    </Bundle>
);
const ClassLoader = (props) => (
    <Bundle load={() => import('./pages/java/ClassLoader')}>
        {(Chat) => <Chat {...props}/>}
    </Bundle>
);
const DevUtils = (props) => (
    <Bundle load={() => import('./pages/java/DevUtils')}>
        {(Chat) => <Chat {...props}/>}
    </Bundle>
);


//数据结构
const HashTable = (props) => (
    <Bundle load={() => import('./pages/datastructure/HashTable')}>
        {(Chat) => <Chat {...props}/>}
    </Bundle>
);
const ConsistencyHash = (props) => (
    <Bundle load={() => import('./pages/datastructure/ConsistencyHash')}>
        {(Chat) => <Chat {...props}/>}
    </Bundle>
);
const ComplexityAnalysis = (props) => (
    <Bundle load={() => import('./pages/datastructure/ComplexityAnalysis')}>
        {(Chat) => <Chat {...props}/>}
    </Bundle>
);
const Btree1 = (props) => (
    <Bundle load={() => import('./pages/datastructure/Btree1')}>
        {(Chat) => <Chat {...props}/>}
    </Bundle>
);
const Btree = (props) => (
    <Bundle load={() => import('./pages/datastructure/Btree')}>
        {(Chat) => <Chat {...props}/>}
    </Bundle>
);
const Tree = (props) => (
    <Bundle load={() => import('./pages/datastructure/Tree')}>
        {(Chat) => <Chat {...props}/>}
    </Bundle>
);
const LineTable = (props) => (
    <Bundle load={() => import('./pages/datastructure/LineTable')}>
        {(Chat) => <Chat {...props}/>}
    </Bundle>
);
const Graph = (props) => (
    <Bundle load={() => import('./pages/datastructure/Graph')}>
        {(Chat) => <Chat {...props}/>}
    </Bundle>
);
//机器学习
const Matrix = (props) => (
    <Bundle load={() => import('./pages/mlearn/Matrix')}>
        {(Chat) => <Chat {...props}/>}
    </Bundle>
);
const Mlearning0 = (props) => (
    <Bundle load={() => import('./pages/mlearn/Mlearning0')}>
        {(Chat) => <Chat {...props}/>}
    </Bundle>
);
const Mlearning1 = (props) => (
    <Bundle load={() => import('./pages/mlearn/Mlearning1')}>
        {(Chat) => <Chat {...props}/>}
    </Bundle>
);
const Mlearning2 = (props) => (
    <Bundle load={() => import('./pages/mlearn/Mlearning2')}>
        {(Chat) => <Chat {...props}/>}
    </Bundle>
);
const Mlearning3 = (props) => (
    <Bundle load={() => import('./pages/mlearn/Mlearning3')}>
        {(Chat) => <Chat {...props}/>}
    </Bundle>
);
const Mlearning4 = (props) => (
    <Bundle load={() => import('./pages/mlearn/Mlearning4')}>
        {(Chat) => <Chat {...props}/>}
    </Bundle>
);
const Mlearning5 = (props) => (
    <Bundle load={() => import('./pages/mlearn/LogisticRegression')}>
        {(Chat) => <Chat {...props}/>}
    </Bundle>
);
const Mlearning6 = (props) => (
    <Bundle load={() => import('./pages/mlearn/SoftmaxRegression')}>
        {(Chat) => <Chat {...props}/>}
    </Bundle>
);
const Mlearning7 = (props) => (
    <Bundle load={() => import('./pages/mlearn/Mlearning7')}>
        {(Chat) => <Chat {...props}/>}
    </Bundle>
);
const Mlearning8 = (props) => (
    <Bundle load={() => import('./pages/mlearn/Mlearning8')}>
        {(Chat) => <Chat {...props}/>}
    </Bundle>
);
const Mlearning9 = (props) => (
    <Bundle load={() => import('./pages/mlearn/Mlearning9')}>
        {(Chat) => <Chat {...props}/>}
    </Bundle>
);
//无关学习
const DYH = (props) => (
    <Bundle load={() => import('./pages/upgrade/DYH')}>
        {(Chat) => <Chat {...props}/>}
    </Bundle>
);
const PeopleHistory = (props) => (
    <Bundle load={() => import('./pages/upgrade/PeopleHistory')}>
        {(Chat) => <Chat {...props}/>}
    </Bundle>
);


class App extends Component {
    render() {
        return (
            <div>
                {/*<Affix>*/}
                    <Row>
                        <Col span={16} offset={4}>
                            <div>
                                {/*<p>&nbsp;</p>*/}
                                <br/>
                                <span style={{fontSize: '30px', marginBottom: '20px'}}> nick 的代码设计</span><br/>
                                <HashRouter>
                                    <Route component={Title} path="/"/>
                                </HashRouter>
                                <br/>
                                <hr/>
                            </div>
                        </Col>
                    </Row>
                {/*</Affix>*/}



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
                                    <Route component={ResourceList} exact strict path="/resources"/>
                                    <Route component={DraftList} exact strict path="/d"/>
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
                                    <Route component={Mlearning0} exact strict path="/mlearning0"/>
                                    <Route component={Mlearning1} exact strict path="/mlearning1"/>
                                    <Route component={Mlearning2} exact strict path="/mlearning2"/>
                                    <Route component={Mlearning3} exact strict path="/mlearning3"/>
                                    <Route component={Mlearning4} exact strict path="/mlearning4"/>
                                    <Route component={Mlearning5} exact strict path="/mlearning5"/>
                                    <Route component={Mlearning6} exact strict path="/mlearning6"/>
                                    <Route component={Mlearning7} exact strict path="/mlearning7"/>
                                    <Route component={Mlearning8} exact strict path="/mlearning8"/>
                                    <Route component={Mlearning9} exact strict path="/mlearning9"/>


                                    {/*java*/}
                                    <Route component={Jdk8} exact strict path="/jdk8"/>
                                    <Route component={ClassLoader} exact strict path="/classLoader"/>
                                    <Route component={Tomcat} exact strict path="/tomcat"/>
                                    <Route component={DevUtils} exact strict path="/devUtils"/>

                                    {/*test*/}

                                    {/*无关学习*/}
                                    <Route component={DYH} exact strict path="/dyh"/>
                                    <Route component={PeopleHistory} exact strict path="/peopleh"/>

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
                            ©2018 nick8sky.github.io  all rights reserved nick
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
