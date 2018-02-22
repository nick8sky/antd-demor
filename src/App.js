import React, {Component} from 'react';
import {HashRouter, Route} from 'react-router-dom';
import {Layout, Row, Col,Icon,BackTop} from 'antd'



//Bundle
import Bundle from './component/Bundle';
import './App.css';
import Title from './pages/html/Title';
import Home from './pages/html/Home';
import About from './pages/html/About';
//import List from './pages/List';


import Classification from './pages/html/Classification';

const {Content, Footer} = Layout;
//常量放在import之后
//主列表 加载过慢 改为主页加载预加载图片
/*const LoadMoreList = (props) => (
    <Bundle load={() => import('./pages/LoadMoreList')}>
        {(Chat) => <Chat {...props}/>}
    </Bundle>
);*/
const Co = (props) => (
    <Bundle load={() => import('./pages/html/Co')}>
        {(Chat) => <Chat {...props}/>}
    </Bundle>
);
const MLearn = (props) => (
    <Bundle load={() => import('./pages/html/MLearn')}>
        {(Chat) => <Chat {...props}/>}
    </Bundle>
);
const UPgrade = (props) => (
    <Bundle load={() => import('./pages/html/UPgrade')}>
        {(Chat) => <Chat {...props}/>}
    </Bundle>
);
const JavaList = (props) => (
    <Bundle load={() => import('./pages/html/JavaList')}>
        {(Chat) => <Chat {...props}/>}
    </Bundle>
);
const DAtabase = (props) => (
    <Bundle load={() => import('./pages/html/DAtabase')}>
        {(Chat) => <Chat {...props}/>}
    </Bundle>
);
const DAtastructure = (props) => (
    <Bundle load={() => import('./pages/html/DAtastructure')}>
        {(Chat) => <Chat {...props}/>}
    </Bundle>
);
const TCpip = (props) => (
    <Bundle load={() => import('./pages/html/TCpip')}>
        {(Chat) => <Chat {...props}/>}
    </Bundle>
);
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
const Mysql3 = (props) => (
    <Bundle load={() => import('./pages/database/Mysql3')}>
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
const Kotlin1 = (props) => (
    <Bundle load={() => import('./pages/java/Kotlin1')}>
        {(Chat) => <Chat {...props}/>}
    </Bundle>
);
const PessimisticLock = (props) => (
    <Bundle load={() => import('./pages/java/PessimisticLock')}>
        {(Chat) => <Chat {...props}/>}
    </Bundle>
);

const IDC = (props) => (
    <Bundle load={() => import('./pages/cto/IDC')}>
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
    <Bundle load={() => import('./pages/mlearn/Fm')}>
        {(Chat) => <Chat {...props}/>}
    </Bundle>
);
const Mlearning8 = (props) => (
    <Bundle load={() => import('./pages/mlearn/Svm')}>
        {(Chat) => <Chat {...props}/>}
    </Bundle>
);
const Mlearning9 = (props) => (
    <Bundle load={() => import('./pages/mlearn/RandomF')}>
        {(Chat) => <Chat {...props}/>}
    </Bundle>
);
const Bp = (props) => (
    <Bundle load={() => import('./pages/mlearn/Bp')}>
        {(Chat) => <Chat {...props}/>}
    </Bundle>
);
const Kms = (props) => (
    <Bundle load={() => import('./pages/mlearn/Kms')}>
        {(Chat) => <Chat {...props}/>}
    </Bundle>
);
const MShift = (props) => (
    <Bundle load={() => import('./pages/mlearn/MShift')}>
        {(Chat) => <Chat {...props}/>}
    </Bundle>
);
const Dbscan = (props) => (
    <Bundle load={() => import('./pages/mlearn/Dbscan')}>
        {(Chat) => <Chat {...props}/>}
    </Bundle>
);
//cto之路
const CTO1 = (props) => (
    <Bundle load={() => import('./pages/cto/CTO1')}>
        {(Chat) => <Chat {...props}/>}
    </Bundle>
);
const CTO2 = (props) => (
    <Bundle load={() => import('./pages/cto/CTO2')}>
        {(Chat) => <Chat {...props}/>}
    </Bundle>
);
const CTO3 = (props) => (
    <Bundle load={() => import('./pages/cto/CTO3')}>
        {(Chat) => <Chat {...props}/>}
    </Bundle>
);


//tcpip
const ARP = (props) => (
    <Bundle load={() => import('./pages/tcpip/ARP')}>
        {(Chat) => <Chat {...props}/>}
    </Bundle>
);
const HTTPS = (props) => (
    <Bundle load={() => import('./pages/tcpip/Https')}>
        {(Chat) => <Chat {...props}/>}
    </Bundle>
);
const ThridLayerEx = (props) => (
    <Bundle load={() => import('./pages/tcpip/ThridLayerEx')}>
        {(Chat) => <Chat {...props}/>}
    </Bundle>
);
const RARP = (props) => (
    <Bundle load={() => import('./pages/tcpip/RARP')}>
        {(Chat) => <Chat {...props}/>}
    </Bundle>
);
const Ping = (props) => (
    <Bundle load={() => import('./pages/tcpip/Ping')}>
        {(Chat) => <Chat {...props}/>}
    </Bundle>
);
const TraceRoute = (props) => (
    <Bundle load={() => import('./pages/tcpip/TraceRoute')}>
        {(Chat) => <Chat {...props}/>}
    </Bundle>
);
const LinkLayer = (props) => (
    <Bundle load={() => import('./pages/tcpip/LinkLayer')}>
        {(Chat) => <Chat {...props}/>}
    </Bundle>
);
const IpLayer = (props) => (
    <Bundle load={() => import('./pages/tcpip/IpLayer')}>
        {(Chat) => <Chat {...props}/>}
    </Bundle>
);
const ICMP =(props) => (
    <Bundle load={() => import('./pages/tcpip/ICMP')}>
        {(Chat) => <Chat {...props}/>}
    </Bundle>
);
const IPRoute =(props) => (
    <Bundle load={() => import('./pages/tcpip/IPRoute')}>
        {(Chat) => <Chat {...props}/>}
    </Bundle>
);
const UDP =(props) => (
    <Bundle load={() => import('./pages/tcpip/UDP')}>
        {(Chat) => <Chat {...props}/>}
    </Bundle>
);
const DNS =(props) => (
    <Bundle load={() => import('./pages/tcpip/DNS')}>
        {(Chat) => <Chat {...props}/>}
    </Bundle>
);
const TCP =(props) => (
    <Bundle load={() => import('./pages/tcpip/TCP')}>
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
const GoodNight = (props) => (
    <Bundle load={() => import('./pages/upgrade/GoodNight')}>
        {(Chat) => <Chat {...props}/>}
    </Bundle>
);
const MV1 = (props) => (
    <Bundle load={() => import('./pages/upgrade/MV1')}>
        {(Chat) => <Chat {...props}/>}
    </Bundle>
);

const Test = (props) => (
    <Bundle load={() => import('./pages/test/Test')}>
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
                                    {/*<Route component={LoadMoreList} exact strict  path="/list"/>*/}
                                    <Route component={Classification} exact strict  path="/class"/>
                                    <Route component={ResourceList} exact strict path="/resources"/>
                                    <Route component={DraftList} exact strict path="/d"/>
                                    {/*<Route component={Login} exact strict path="/login"/>*/}
                                    <Route component={TCpip} exact strict  path="/tcpip"/>
                                    <Route component={DAtastructure} exact strict  path="/datastructure"/>
                                    <Route component={DAtabase} exact strict  path="/database"/>
                                    <Route component={JavaList} exact strict  path="/javas"/>
                                    <Route component={UPgrade} exact strict  path="/upgrade"/>
                                    <Route component={MLearn} exact strict  path="/mlearn"/>
                                    <Route component={Co} exact strict  path="/co"/>

                                    {/*---------------------------------------*/}

                                    <Route component={Mysql0} exact strict path="/mysql0"/>
                                    <Route component={Mysql1} exact strict path="/mysql1"/>
                                    <Route component={Mysql2} exact strict path="/mysql2"/>
                                    <Route component={Mysql3} exact strict path="/mysql3"/>
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
                                    <Route component={Bp} exact strict path="/bp"/>
                                    <Route component={Kms} exact strict path="/kms"/>
                                    <Route component={MShift} exact strict path="/mshift"/>
                                    <Route component={Dbscan} exact strict path="/dbscan"/>

                                    {/*java*/}
                                    <Route component={Jdk8} exact strict path="/jdk8"/>
                                    <Route component={ClassLoader} exact strict path="/classLoader"/>
                                    <Route component={Tomcat} exact strict path="/tomcat"/>
                                    <Route component={DevUtils} exact strict path="/devUtils"/>
                                    <Route component={Kotlin1} exact strict path="/kotlin1"/>
                                    <Route component={PessimisticLock} exact strict path="/pessimisticLock"/>


                                    {/*test*/}
                                    <Route component={Test} exact strict path="/test"/>
                                    {/*无关学习*/}
                                    <Route component={DYH} exact strict path="/dyh"/>
                                    <Route component={PeopleHistory} exact strict path="/peopleh"/>
                                    <Route component={GoodNight} exact strict path="/goodnight"/>
                                    <Route component={MV1} exact strict path="/mv1"/>

                                    {/*co*/}
                                    <Route component={CTO1} exact strict path="/c1"/>
                                    <Route component={CTO2} exact strict path="/c2"/>
                                    <Route component={CTO3} exact strict path="/c3"/>
                                    <Route component={IDC} exact strict path="/idc"/>


                                    {/*tcpip*/}
                                    <Route component={ARP} exact strict path="/arp"/>
                                    <Route component={HTTPS} exact strict path="/https"/>
                                    <Route component={ThridLayerEx} exact strict path="/tlex"/>
                                    <Route component={RARP} exact strict path="/rarp"/>
                                    <Route component={Ping} exact strict path="/ping"/>
                                    <Route component={TraceRoute} exact strict path="/traceRoute"/>
                                    <Route component={LinkLayer} exact strict path="/linklayer"/>
                                    <Route component={IpLayer} exact strict path="/iplayer"/>
                                    <Route component={ICMP} exact strict path="/icmp"/>
                                    <Route component={IPRoute} exact strict path="/iproute"/>
                                    <Route component={TCP} exact strict path="/tcp"/>
                                    <Route component={DNS} exact strict path="/dns"/>
                                    <Route component={UDP} exact strict path="/udp"/>
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
