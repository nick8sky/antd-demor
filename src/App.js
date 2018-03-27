import React, {Component} from 'react';
import {HashRouter, Route} from 'react-router-dom';
import {Affix, Layout, Row, Col, Icon, BackTop, Anchor, Menu, Breadcrumb} from 'antd'


//Bundle
import Bundle from './component/Bundle';
import './App.css';
import Title from './pages/html/Title';
import Home from './pages/html/Home';


import Classification from './pages/html/Classification';



const {Link} = Anchor;

const {SubMenu} = Menu;
const {Header, Content, Sider, Footer} = Layout;


//常量放在import之后
//主列表 加载过慢 改为主页加载预加载图片

const About = (props) => (
    <Bundle load={() => import('./pages/html/About')}>
        {(Chat) => <Chat {...props}/>}
    </Bundle>
);
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
const Linux = (props) => (
    <Bundle load={() => import('./pages/html/Linux')}>
        {(Chat) => <Chat {...props}/>}
    </Bundle>
);

const SC = (props) => (
    <Bundle load={() => import('./pages/sc/SC')}>
        {(Chat) => <Chat {...props}/>}
    </Bundle>
);


//////
const ShardingList = (props) => (
    <Bundle load={() => import('./pages/sc/sharding_jdbc/ArtList')}>
        {(Chat) => <Chat {...props}/>}
    </Bundle>
);
const Sharding1 = (props) => (
    <Bundle load={() => import('./pages/sc/sharding_jdbc/Sharding_jdbc1')}>
        {(Chat) => <Chat {...props}/>}
    </Bundle>
);
const Sharding2 = (props) => (
    <Bundle load={() => import('./pages/sc/sharding_jdbc/Sharding_jdbc2')}>
        {(Chat) => <Chat {...props}/>}
    </Bundle>
);
const Sharding3 = (props) => (
    <Bundle load={() => import('./pages/sc/sharding_jdbc/Sharding_jdbc3')}>
        {(Chat) => <Chat {...props}/>}
    </Bundle>
);
const Sharding4 = (props) => (
    <Bundle load={() => import('./pages/sc/sharding_jdbc/Sharding_jdbc4')}>
        {(Chat) => <Chat {...props}/>}
    </Bundle>
);
const Sharding5 = (props) => (
    <Bundle load={() => import('./pages/sc/sharding_jdbc/Sharding_jdbc5')}>
        {(Chat) => <Chat {...props}/>}
    </Bundle>
);
const Sharding6 = (props) => (
    <Bundle load={() => import('./pages/sc/sharding_jdbc/Sharding_jdbc6')}>
        {(Chat) => <Chat {...props}/>}
    </Bundle>
);

const Sharding7 = (props) => (
    <Bundle load={() => import('./pages/sc/sharding_jdbc/Sharding_jdbc7')}>
        {(Chat) => <Chat {...props}/>}
    </Bundle>
);


const Zipkin = (props) => (
    <Bundle load={() => import('./pages/sc/zipkin/ArtList')}>
        {(Chat) => <Chat {...props}/>}
    </Bundle>
);
const Zipkin1 = (props) => (
    <Bundle load={() => import('./pages/sc/zipkin/Zipkin1')}>
        {(Chat) => <Chat {...props}/>}
    </Bundle>
);

const Dubbo = (props) => (
    <Bundle load={() => import('./pages/sc/dubbo/ArtList')}>
        {(Chat) => <Chat {...props}/>}
    </Bundle>
);
const Dubbo1 = (props) => (
    <Bundle load={() => import('./pages/sc/dubbo/Dubbo1')}>
        {(Chat) => <Chat {...props}/>}
    </Bundle>
);
const Dubbo2 = (props) => (
    <Bundle load={() => import('./pages/sc/dubbo/Dubbo2')}>
        {(Chat) => <Chat {...props}/>}
    </Bundle>
);
const Dubbo3 = (props) => (
    <Bundle load={() => import('./pages/sc/dubbo/Dubbo3')}>
        {(Chat) => <Chat {...props}/>}
    </Bundle>
);


const Redis = (props) => (
    <Bundle load={() => import('./pages/sc/redis/ArtList')}>
        {(Chat) => <Chat {...props}/>}
    </Bundle>
);
const Redis1 = (props) => (
    <Bundle load={() => import('./pages/sc/redis/Redis1')}>
        {(Chat) => <Chat {...props}/>}
    </Bundle>
);
const Redis2 = (props) => (
    <Bundle load={() => import('./pages/sc/redis/RedisCluster')}>
        {(Chat) => <Chat {...props}/>}
    </Bundle>
);
const Redis3 = (props) => (
    <Bundle load={() => import('./pages/sc/redis/Redis3')}>
        {(Chat) => <Chat {...props}/>}
    </Bundle>
);


const MQ = (props) => (
    <Bundle load={() => import('./pages/sc/mq/ArtList')}>
        {(Chat) => <Chat {...props}/>}
    </Bundle>
);
const RocketMQ1 = (props) => (
    <Bundle load={() => import('./pages/sc/mq/RocketMQ1')}>
        {(Chat) => <Chat {...props}/>}
    </Bundle>
);
const RocketMQ2 = (props) => (
    <Bundle load={() => import('./pages/sc/mq/RocketMQ2')}>
        {(Chat) => <Chat {...props}/>}
    </Bundle>
);
const RocketMQ3 = (props) => (
    <Bundle load={() => import('./pages/sc/mq/RocketMQ3')}>
        {(Chat) => <Chat {...props}/>}
    </Bundle>
);
const Kafka1 = (props) => (
    <Bundle load={() => import('./pages/sc/mq/Kafka1')}>
        {(Chat) => <Chat {...props}/>}
    </Bundle>
);
const Kafka2 = (props) => (
    <Bundle load={() => import('./pages/sc/mq/Kafka2')}>
        {(Chat) => <Chat {...props}/>}
    </Bundle>
);
const Kafka3 = (props) => (
    <Bundle load={() => import('./pages/sc/mq/Kafka3')}>
        {(Chat) => <Chat {...props}/>}
    </Bundle>
);


const Docker = (props) => (
    <Bundle load={() => import('./pages/sc/docker/ArtList')}>
        {(Chat) => <Chat {...props}/>}
    </Bundle>
);


const Docker1 = (props) => (
    <Bundle load={() => import('./pages/sc/docker/Docker1')}>
        {(Chat) => <Chat {...props}/>}
    </Bundle>
);



const MVC = (props) => (
    <Bundle load={() => import('./pages/sc/springmvc/ArtList')}>
        {(Chat) => <Chat {...props}/>}
    </Bundle>
);


const MVC1 = (props) => (
    <Bundle load={() => import('./pages/sc/springmvc/MVC1')}>
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
const CTO4 = (props) => (
    <Bundle load={() => import('./pages/cto/CTO4')}>
        {(Chat) => <Chat {...props}/>}
    </Bundle>
);
const IDC = (props) => (
    <Bundle load={() => import('./pages/cto/IDC')}>
        {(Chat) => <Chat {...props}/>}
    </Bundle>
);
const CTO5 = (props) => (
    <Bundle load={() => import('./pages/cto/CTO5')}>
        {(Chat) => <Chat {...props}/>}
    </Bundle>
);
const CTO6 = (props) => (
    <Bundle load={() => import('./pages/cto/CTO6')}>
        {(Chat) => <Chat {...props}/>}
    </Bundle>
);
const CTO7 = (props) => (
    <Bundle load={() => import('./pages/cto/CTO7')}>
        {(Chat) => <Chat {...props}/>}
    </Bundle>
);
const CTO8 = (props) => (
    <Bundle load={() => import('./pages/cto/CTO8')}>
        {(Chat) => <Chat {...props}/>}
    </Bundle>
);
const CTO9 = (props) => (
    <Bundle load={() => import('./pages/cto/CTO9')}>
        {(Chat) => <Chat {...props}/>}
    </Bundle>
);
const Base1 = (props) => (
    <Bundle load={() => import('./pages/cto/Base1')}>
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

const Oracle = (props) => (
    <Bundle load={() => import('./pages/database/Oracle0')}>
        {(Chat) => <Chat {...props}/>}
    </Bundle>
);
const Mysql4 = (props) => (
    <Bundle load={() => import('./pages/database/Mysql4')}>
        {(Chat) => <Chat {...props}/>}
    </Bundle>
);
const Mysql5 = (props) => (
    <Bundle load={() => import('./pages/database/Mysql5')}>
        {(Chat) => <Chat {...props}/>}
    </Bundle>
);
const Mysql6 = (props) => (
    <Bundle load={() => import('./pages/database/Mysql6')}>
        {(Chat) => <Chat {...props}/>}
    </Bundle>
);
const Mysql7 = (props) => (
    <Bundle load={() => import('./pages/database/Mysql7')}>
        {(Chat) => <Chat {...props}/>}
    </Bundle>
);
const Mysql8 = (props) => (
    <Bundle load={() => import('./pages/database/Mysql8')}>
        {(Chat) => <Chat {...props}/>}
    </Bundle>
);
const Mysql9 = (props) => (
    <Bundle load={() => import('./pages/database/Mysql9')}>
        {(Chat) => <Chat {...props}/>}
    </Bundle>
);
const Mycat1 = (props) => (
    <Bundle load={() => import('./pages/database/Mycat1')}>
        {(Chat) => <Chat {...props}/>}
    </Bundle>
);
const Mycat2 = (props) => (
    <Bundle load={() => import('./pages/database/Mycat2')}>
        {(Chat) => <Chat {...props}/>}
    </Bundle>
);
const Mycat3 = (props) => (
    <Bundle load={() => import('./pages/database/Mycat3')}>
        {(Chat) => <Chat {...props}/>}
    </Bundle>
);
const Mycat4 = (props) => (
    <Bundle load={() => import('./pages/database/Mycat4')}>
        {(Chat) => <Chat {...props}/>}
    </Bundle>
);
const Mycat5 = (props) => (
    <Bundle load={() => import('./pages/database/Mycat5')}>
        {(Chat) => <Chat {...props}/>}
    </Bundle>
);
const Mycat6 = (props) => (
    <Bundle load={() => import('./pages/database/Mycat6')}>
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
const Kotlin2 = (props) => (
    <Bundle load={() => import('./pages/java/Kotlin2')}>
        {(Chat) => <Chat {...props}/>}
    </Bundle>
);
const Kotlin3 = (props) => (
    <Bundle load={() => import('./pages/java/Kotlin3')}>
        {(Chat) => <Chat {...props}/>}
    </Bundle>
);
const PessimisticLock = (props) => (
    <Bundle load={() => import('./pages/java/PessimisticLock')}>
        {(Chat) => <Chat {...props}/>}
    </Bundle>
);


const JVMX = (props) => (
    <Bundle load={() => import('./pages/java/JVMX')}>
        {(Chat) => <Chat {...props}/>}
    </Bundle>
);


const JVMShutdown = (props) => (
    <Bundle load={() => import('./pages/java/JVMShutdown')}>
        {(Chat) => <Chat {...props}/>}
    </Bundle>
);
const Deathprocess = (props) => (
    <Bundle load={() => import('./pages/java/Deathprocess')}>
        {(Chat) => <Chat {...props}/>}
    </Bundle>
);
const Consul1 = (props) => (
    <Bundle load={() => import('./pages/java/Consul1')}>
        {(Chat) => <Chat {...props}/>}
    </Bundle>
);
const Consul2 = (props) => (
    <Bundle load={() => import('./pages/java/Consul2')}>
        {(Chat) => <Chat {...props}/>}
    </Bundle>
);
const JVM1 = (props) => (
    <Bundle load={() => import('./pages/java/JVM1')}>
        {(Chat) => <Chat {...props}/>}
    </Bundle>
);
const JVM2 = (props) => (
    <Bundle load={() => import('./pages/java/JVM2')}>
        {(Chat) => <Chat {...props}/>}
    </Bundle>
);
const JAVA1 = (props) => (
    <Bundle load={() => import('./pages/java/Java1')}>
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
const ICMP = (props) => (
    <Bundle load={() => import('./pages/tcpip/ICMP')}>
        {(Chat) => <Chat {...props}/>}
    </Bundle>
);
const IPRoute = (props) => (
    <Bundle load={() => import('./pages/tcpip/IPRoute')}>
        {(Chat) => <Chat {...props}/>}
    </Bundle>
);
const UDP = (props) => (
    <Bundle load={() => import('./pages/tcpip/UDP')}>
        {(Chat) => <Chat {...props}/>}
    </Bundle>
);
const DNS = (props) => (
    <Bundle load={() => import('./pages/tcpip/DNS')}>
        {(Chat) => <Chat {...props}/>}
    </Bundle>
);
const TCP = (props) => (
    <Bundle load={() => import('./pages/tcpip/TCP')}>
        {(Chat) => <Chat {...props}/>}
    </Bundle>
);
const CDN = (props) => (
    <Bundle load={() => import('./pages/tcpip/CDN')}>
        {(Chat) => <Chat {...props}/>}
    </Bundle>
);
const VPN = (props) => (
    <Bundle load={() => import('./pages/tcpip/VPN')}>
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
const TalkWY = (props) => (
    <Bundle load={() => import('./pages/upgrade/TalkWY')}>
        {(Chat) => <Chat {...props}/>}
    </Bundle>
);


//linux
const LCommand1 = (props) => (
    <Bundle load={() => import('./pages/linux/Command1')}>
        {(Chat) => <Chat {...props}/>}
    </Bundle>
);
const LCommand2 = (props) => (
    <Bundle load={() => import('./pages/linux/Command2')}>
        {(Chat) => <Chat {...props}/>}
    </Bundle>
);
const LCommand3 = (props) => (
    <Bundle load={() => import('./pages/linux/Command3')}>
        {(Chat) => <Chat {...props}/>}
    </Bundle>
);


//ask
const SKill2 = (props) => (
    <Bundle load={() => import('./pages/skill/ArtList')}>
        {(Chat) => <Chat {...props}/>}
    </Bundle>
);
const ASK1 = (props) => (
    <Bundle load={() => import('./pages/skill/java/ASK1')}>
        {(Chat) => <Chat {...props}/>}
    </Bundle>
);
const ASK2 = (props) => (
    <Bundle load={() => import('./pages/skill/java/ASK2')}>
        {(Chat) => <Chat {...props}/>}
    </Bundle>
);
const ASK3 = (props) => (
    <Bundle load={() => import('./pages/skill/java/ASK3')}>
        {(Chat) => <Chat {...props}/>}
    </Bundle>
);
const ASK4 = (props) => (
    <Bundle load={() => import('./pages/skill/java/ASK4')}>
        {(Chat) => <Chat {...props}/>}
    </Bundle>
);
const ASK5 = (props) => (
    <Bundle load={() => import('./pages/skill/java/ASK5')}>
        {(Chat) => <Chat {...props}/>}
    </Bundle>
);
const ASK6 = (props) => (
    <Bundle load={() => import('./pages/skill/java/ASK6')}>
        {(Chat) => <Chat {...props}/>}
    </Bundle>
);
const ASK7 = (props) => (
    <Bundle load={() => import('./pages/skill/java/ASK7')}>
        {(Chat) => <Chat {...props}/>}
    </Bundle>
);
const ASK8 = (props) => (
    <Bundle load={() => import('./pages/skill/java/ASK8')}>
        {(Chat) => <Chat {...props}/>}
    </Bundle>
);
const ASK9 = (props) => (
    <Bundle load={() => import('./pages/skill/java/ASK9')}>
        {(Chat) => <Chat {...props}/>}
    </Bundle>
);
const ASK10 = (props) => (
    <Bundle load={() => import('./pages/skill/java/ASK10')}>
        {(Chat) => <Chat {...props}/>}
    </Bundle>
);
const ASK11 = (props) => (
    <Bundle load={() => import('./pages/skill/java/ASK11')}>
        {(Chat) => <Chat {...props}/>}
    </Bundle>
);
const ASK12 = (props) => (
    <Bundle load={() => import('./pages/skill/java/ASK12')}>
        {(Chat) => <Chat {...props}/>}
    </Bundle>
);
const ASK13 = (props) => (
    <Bundle load={() => import('./pages/skill/java/ASK13')}>
        {(Chat) => <Chat {...props}/>}
    </Bundle>
);



const ASKDesign1 = (props) => (
    <Bundle load={() => import('./pages/skill/design/D1')}>
        {(Chat) => <Chat {...props}/>}
    </Bundle>
);

const Test = (props) => (
    <Bundle load={() => import('./pages/test/Test')}>
        {(Chat) => <Chat {...props}/>}
    </Bundle>
);

const NICK = (props) => (
    <Bundle load={() => import('./pages/mine/NICK')}>
        {(Chat) => <Chat {...props}/>}
    </Bundle>
);
const MF = (props) => (
    <Bundle load={() => import('./pages/mine/MF')}>
        {(Chat) => <Chat {...props}/>}
    </Bundle>
);
const Payer = (props) => (
    <Bundle load={() => import('./auto/Payer')}>
        {(Chat) => <Chat {...props}/>}
    </Bundle>
);



const Design = (props) => (
    <Bundle load={() => import('./pages/design/Design')}>
        {(Chat) => <Chat {...props}/>}
    </Bundle>
);


const Design1 = (props) => (
    <Bundle load={() => import('./pages/design/Design1')}>
        {(Chat) => <Chat {...props}/>}
    </Bundle>
);
const Design2 = (props) => (
    <Bundle load={() => import('./pages/design/Design2')}>
        {(Chat) => <Chat {...props}/>}
    </Bundle>
);
const Design3 = (props) => (
    <Bundle load={() => import('./pages/design/Design3')}>
        {(Chat) => <Chat {...props}/>}
    </Bundle>
);
const Design4 = (props) => (
    <Bundle load={() => import('./pages/design/Design4')}>
        {(Chat) => <Chat {...props}/>}
    </Bundle>
);
const Design5 = (props) => (
    <Bundle load={() => import('./pages/design/Design5')}>
        {(Chat) => <Chat {...props}/>}
    </Bundle>
);
const Design6 = (props) => (
    <Bundle load={() => import('./pages/design/Design6')}>
        {(Chat) => <Chat {...props}/>}
    </Bundle>
);


class App extends Component {
    render() {
        return (
            <div>
                <Row>
                    <Col span={18} offset={3}>
                        <div>
                            <br/>
                            <span style={{fontSize: '30px', marginBottom: '20px'}}> NICK 的代码设计</span><br/>
                            饮一壶天际，神清气爽。
                            <HashRouter>
                                <Route component={Title} path="/"/>
                            </HashRouter>
                            <br/>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col span={18} offset={3}>
                        <Content style={{
                            margin: '14px 16px'
                        }}>
                            <HashRouter>
                                <div>
                                    <Route component={Home} exact strict path="/"/>
                                    {/*<Route component={List} path="/list"/>*/}
                                    <Route component={About} exact strict path="/about"/>
                                    {/*<Route component={LoadMoreList} exact strict  path="/list"/>*/}
                                    <Route component={Classification} exact strict path="/class"/>
                                    <Route component={ResourceList} exact strict path="/resources"/>
                                    <Route component={DraftList} exact strict path="/d"/>
                                    <Route component={Linux} exact strict path="/linux"/>
                                    {/*<Route component={Login} exact strict path="/login"/>*/}
                                    <Route component={TCpip} exact strict path="/tcpip"/>
                                    <Route component={DAtastructure} exact strict path="/datastructure"/>
                                    <Route component={DAtabase} exact strict path="/database"/>
                                    <Route component={JavaList} exact strict path="/javas"/>
                                    <Route component={UPgrade} exact strict path="/upgrade"/>
                                    <Route component={MLearn} exact strict path="/mlearn"/>
                                    <Route component={Co} exact strict path="/co"/>


                                    {/*co*/}
                                    <Route component={CTO1} exact strict path="/c1"/>
                                    <Route component={CTO2} exact strict path="/c2"/>
                                    <Route component={CTO3} exact strict path="/c3"/>
                                    <Route component={IDC} exact strict path="/idc"/>
                                    <Route component={CTO4} exact strict path="/c4"/>
                                    <Route component={CTO5} exact strict path="/c5"/>
                                    <Route component={CTO6} exact strict path="/c6"/>
                                    <Route component={CTO7} exact strict path="/c7"/>
                                    <Route component={CTO8} exact strict path="/c8"/>
                                    <Route component={CTO9} exact strict path="/c9"/>
                                    <Route component={Base1} exact strict path="/b1"/>

                                    {/*数据库*/}
                                    <Route component={Mysql0} exact strict path="/mysql0"/>
                                    <Route component={Mysql1} exact strict path="/mysql1"/>
                                    <Route component={Mysql2} exact strict path="/mysql2"/>
                                    <Route component={Mysql3} exact strict path="/mysql3"/>
                                    <Route component={Oracle} exact strict path="/oracle"/>
                                    <Route component={Mysql4} exact strict path="/mysql4"/>
                                    <Route component={Mysql5} exact strict path="/mysql5"/>
                                    <Route component={Mysql6} exact strict path="/mysql6"/>
                                    <Route component={Mysql7} exact strict path="/mysql7"/>
                                    <Route component={Mysql8} exact strict path="/mysql8"/>
                                    <Route component={Mysql9} exact strict path="/mysql9"/>
                                    <Route component={Mycat1} exact strict path="/mycat1"/>
                                    <Route component={Mycat2} exact strict path="/mycat2"/>
                                    <Route component={Mycat3} exact strict path="/mycat3"/>
                                    <Route component={Mycat4} exact strict path="/mycat4"/>
                                    <Route component={Mycat5} exact strict path="/mycat5"/>
                                    <Route component={Mycat6} exact strict path="/mycat6"/>


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


                                    <Route component={JVMX} exact strict path="/jvmx"/>
                                    <Route component={Kotlin2} exact strict path="/kotlin2"/>
                                    <Route component={Kotlin3} exact strict path="/kotlin3"/>

                                    <Route component={JVMShutdown} exact strict path="/java1"/>
                                    <Route component={Deathprocess} exact strict path="/java2"/>
                                    <Route component={Consul1} exact strict path="/consul1"/>
                                    <Route component={Consul2} exact strict path="/consul2"/>
                                    <Route component={JVM1} exact strict path="/jvm1"/>
                                    <Route component={JVM2} exact strict path="/jvm2"/>
                                    <Route component={JAVA1} exact strict path="/java3"/>


                                    {/*sc*/}
                                    <Route component={SC} exact strict path="/sc"/>
                                    <Route component={ShardingList} exact strict path="/shardinglist"/>
                                    <Route component={Sharding1} exact strict path="/sharding1"/>
                                    <Route component={Sharding2} exact strict path="/sharding2"/>
                                    <Route component={Sharding3} exact strict path="/sharding3"/>
                                    <Route component={Sharding4} exact strict path="/sharding4"/>
                                    <Route component={Sharding5} exact strict path="/sharding5"/>
                                    <Route component={Sharding6} exact strict path="/sharding6"/>
                                    <Route component={Sharding7} exact strict path="/sharding6"/>

                                    <Route component={Zipkin} exact strict path="/zipkin"/>
                                    <Route component={Zipkin1} exact strict path="/zipkin1"/>

                                    <Route component={Dubbo} exact strict path="/dubbo"/>
                                    <Route component={Dubbo1} exact strict path="/dubbo1"/>
                                    <Route component={Dubbo2} exact strict path="/dubbo2"/>
                                    <Route component={Dubbo3} exact strict path="/dubbo3"/>

                                    <Route component={Redis} exact strict path="/redis"/>
                                    <Route component={Redis1} exact strict path="/redis1"/>
                                    <Route component={Redis2} exact strict path="/redis2"/>
                                    <Route component={Redis3} exact strict path="/redis3"/>


                                    <Route component={MQ} exact strict path="/mq"/>
                                    <Route component={RocketMQ1} exact strict path="/rk1"/>
                                    <Route component={RocketMQ2} exact strict path="/rk2"/>
                                    <Route component={RocketMQ3} exact strict path="/rk3"/>

                                    <Route component={Kafka1} exact strict path="/kf1"/>
                                    <Route component={Kafka2} exact strict path="/kf2"/>
                                    <Route component={Kafka3} exact strict path="/kf3"/>


                                    <Route component={Docker} exact strict path="/docker"/>
                                    <Route component={Docker1} exact strict path="/docker1"/>



                                    <Route component={MVC} exact strict path="/mvc"/>
                                    <Route component={MVC1} exact strict path="/mvc1"/>


                                    {/*test*/}
                                    <Route component={Test} exact strict path="/test"/>
                                    <Route component={NICK} exact strict path="/nick"/>
                                    <Route component={MF} exact strict path="/mf"/>
                                    <Route component={Payer} exact strict path="/payer"/>



                                    {/*无关学习*/}
                                    <Route component={DYH} exact strict path="/dyh"/>
                                    <Route component={PeopleHistory} exact strict path="/peopleh"/>
                                    <Route component={GoodNight} exact strict path="/goodnight"/>
                                    <Route component={MV1} exact strict path="/mv1"/>
                                    <Route component={TalkWY} exact strict path="/talkwithu"/>


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
                                    <Route component={CDN} exact strict path="/cdn"/>
                                    <Route component={VPN} exact strict path="/vpn"/>


                                    {/*linux*/}
                                    <Route component={LCommand1} exact strict path="/lcommand1"/>
                                    <Route component={LCommand2} exact strict path="/lcommand2"/>
                                    <Route component={LCommand3} exact strict path="/lcommand3"/>
                                    {/*---------------------------------------*/}

                                    {/*ask*/}
                                    <Route component={SKill2} exact strict path="/skill"/>
                                    <Route component={ASK1} exact strict path="/ask1"/>
                                    <Route component={ASK2} exact strict path="/ask2"/>
                                    <Route component={ASK3} exact strict path="/ask3"/>
                                    <Route component={ASK4} exact strict path="/ask4"/>
                                    <Route component={ASK5} exact strict path="/ask5"/>
                                    <Route component={ASK6} exact strict path="/ask6"/>
                                    <Route component={ASK7} exact strict path="/ask7"/>
                                    <Route component={ASK8} exact strict path="/ask8"/>
                                    <Route component={ASK9} exact strict path="/ask9"/>
                                    <Route component={ASK10} exact strict path="/ask10"/>
                                    <Route component={ASK11} exact strict path="/ask11"/>
                                    <Route component={ASK12} exact strict path="/ask12"/>
                                    <Route component={ASK13} exact strict path="/ask13"/>


                                    <Route component={ASKDesign1} exact strict path="/askdesign1"/>
                                    {/*---------------------------------------*/}
                                    {/*design*/}
                                    <Route component={Design} exact strict path="/design"/>
                                    <Route component={Design1} exact strict path="/design1"/>
                                    <Route component={Design2} exact strict path="/design2"/>
                                    <Route component={Design3} exact strict path="/design3"/>
                                    <Route component={Design4} exact strict path="/design4"/>
                                    <Route component={Design5} exact strict path="/design5"/>
                                    <Route component={Design6} exact strict path="/design6"/>
                                </div>
                            </HashRouter>
                        </Content>
                    </Col>


                </Row>


                <Footer style={{textAlign: 'center'}}>
                    <a href='https://github.com/nick8sky'><Icon type="github" style={{marginRight: 8}}/></a> <a
                    href='http://blog.csdn.net/llianlianpay/'>csdn</a><br/>
                    ©2018 nick8sky.github.io all rights reserved nick
                </Footer>


                <div>
                    <BackTop/>
                </div>

            </div>
        )
    }
}

export default App;
