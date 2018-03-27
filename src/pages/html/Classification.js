import {List, Button, Spin,Icon,Rate,Tag,message,Modal ,Input,Row, Col} from 'antd';
import React from 'react';
import {Link} from 'react-router-dom';

class LoadMoreList extends React.Component {
    constructor(props) {
        super(props);
        if(window.erred && window.erred > 3 && window.erred  < 6){
            message.error('nick不欢迎你，请离开本网站');
            window.erred = window.erred +1 ;
        }else if(window.erred && window.erred > 5 ){
            window.location.replace("http://news.baidu.com/")
        }
    }
    /*col-lg一般用于大屏设备（min-width：1200px），col-md一般用于中屏设备（min-width：992px），col-sm一般用于小屏设备（min-width：768px），col-xs用于超小型设备（max-width：768px）；
    */
    render() {
        return (
            <div className="gutter-example">
                <Row gutter={16}>

                    <Col xs={24} sm={24} md={12} lg={8} xl={8}>
                        <div className="gutter-box" >
                                         <span >
                                            <div style={{position:"relative"}}>
                                           <Link to= "co">
                                        　　     <img style={{height:"140px",width:"270px"}} src="https://gitee.com/nick070809/pics/raw/master/home/kk1.png"/>
                                        　　     <div style={{position:"absolute", left:"26%", top:"42%"}}><span style={{fontSize:"40px"}}>系统架构</span></div>
                                            </Link>
                                            </div>
                                        </span>
                        </div>
                    </Col>
                    <Col xs={24} sm={24} md={12} lg={8} xl={8}>
                        <div className="gutter-box" >
                             <span >
                                <div style={{position:"relative"}}>
                               <Link to= "mlearn">
                            　　     <img style={{height:"140px",width:"270px"}} src={require("../../imgs/theme/sk2.png")}/>
                            　　     <div style={{position:"absolute", left:"26%", top:"42%"}}><span style={{fontSize:"40px"}}>机器学习</span></div>
                                </Link>
                                </div>
                            </span>
                        </div>
                    </Col>
                    <Col xs={24} sm={24} md={12} lg={8} xl={8}>
                        <div className="gutter-box" >
                             <span >
                                <div style={{position:"relative"}}>
                                <Link to= "upgrade">
                            　　     <img style={{height:"140px",width:"270px"}} src="https://gitee.com/nick070809/pics/raw/master/home/kk3.png"/>
                            　　     <div style={{position:"absolute", left:"30%", top:"42%"}}><span style={{fontSize:"40px"}}>生&nbsp;&nbsp;&nbsp;&nbsp;活</span></div>
                                </Link>
                                </div>
                            </span>
                        </div>
                    </Col>
                    <Col xs={24} sm={24} md={12} lg={8} xl={8}>
                        <div className="gutter-box" >
                             <span >
                                <div style={{position:"relative"}}>
                                <Link to= "javas">
                            　　     <img style={{height:"140px",width:"270px"}} src="https://gitee.com/nick070809/pics/raw/master/home/kk4.png"/>
                            　　     <div style={{position:"absolute", left:"31%", top:"42%"}}><span style={{fontSize:"40px"}}>JAVA</span></div>
                                </Link>
                                </div>
                            </span>
                        </div>
                    </Col>
                    <Col xs={24} sm={24} md={12} lg={8} xl={8}>
                        <div className="gutter-box" >
                             <span >
                                <div style={{position:"relative"}}>
                                <Link to= "database">
                            　　     <img style={{height:"140px",width:"270px"}} src="https://gitee.com/nick070809/pics/raw/master/home/kk5.png"/>
                            　　     <div style={{position:"absolute", left:"26%", top:"42%"}}><span style={{fontSize:"40px"}}>数据库</span></div>
                                </Link>
                                </div>
                            </span>
                        </div>
                    </Col>
                    <Col xs={24} sm={24} md={12} lg={8} xl={8}>
                        <div className="gutter-box" >
                             <span >
                                <div style={{position:"relative"}}>
                                <Link to= "datastructure">
                            　　     <img style={{height:"140px",width:"270px"}} src="https://gitee.com/nick070809/pics/raw/master/home/kk6.png"/>
                            　　     <div style={{position:"absolute", left:"26%", top:"42%"}}><span style={{fontSize:"40px"}}>数据结构</span></div>
                                </Link>
                                </div>
                            </span>
                        </div>
                    </Col>
                    <Col xs={24} sm={24} md={12} lg={8} xl={8}>
                        <div className="gutter-box" >
                             <span >
                                <div style={{position:"relative"}}>
                               <Link to= "tcpip">
                            　　     <img style={{height:"140px",width:"270px"}} src="https://gitee.com/nick070809/pics/raw/master/home/kk7.png" />
                            　　     <div style={{position:"absolute", left:"30%", top:"42%"}}><span style={{fontSize:"40px"}}>网&nbsp;&nbsp;&nbsp;&nbsp;络</span></div>
                                 </Link>
                                </div>
                            </span>
                        </div>
                    </Col>
                    <Col xs={24} sm={24} md={12} lg={8} xl={8}>
                        <div className="gutter-box" >
                             <span >
                                <div style={{position:"relative"}}>
                               <Link to= "resources">
                            　　     <img style={{height:"140px",width:"270px"}} src="https://gitee.com/nick070809/pics/raw/master/home/kk8.png" />
                            　　     <div style={{position:"absolute", left:"30%", top:"42%"}}><span style={{fontSize:"40px"}}>资&nbsp;&nbsp;&nbsp;&nbsp;源</span></div>
                                 </Link>
                                </div>
                            </span>
                        </div>
                    </Col>
                    <Col xs={24} sm={24} md={12} lg={8} xl={8}>
                        <div className="gutter-box" >
                             <span >
                                <div style={{position:"relative"}}>
                                <Link to= "/linux">
                            　　     <img style={{height:"140px",width:"270px"}} src="https://gitee.com/nick070809/pics/raw/master/home/kk9.png"/>
                            　　     <div style={{position:"absolute", left:"25%", top:"42%"}}><span style={{fontSize:"40px"}}>Linux内核</span></div>
                                 </Link>
                                </div>
                            </span>
                        </div>
                    </Col>
                    <Col xs={24} sm={24} md={12} lg={8} xl={8}>
                        <div className="gutter-box" >
                             <span >
                                <div style={{position:"relative"}}>
                                <Link to= "/sc">
                            　　     <img style={{height:"140px",width:"270px"}} src={require("../../imgs/theme/sk10.png")}/>
                                 </Link>
                                </div>
                            </span>
                        </div>
                    </Col>
                    <Col xs={24} sm={24} md={12} lg={8} xl={8}>
                        <div className="gutter-box" >
                             <span >
                                <div style={{position:"relative"}}>
                                <Link to= "/skill">
                            　　     <img style={{height:"140px",width:"270px"}} src={require("../../imgs/theme/sk11.png")}/>
                                 </Link>
                                </div>
                            </span>
                        </div>
                    </Col>
                    <Col xs={24} sm={24} md={12} lg={8} xl={8}>
                        <div className="gutter-box" >
                             <span >
                                <div style={{position:"relative"}}>
                                <Link to= "/design">
                            　　     <img style={{height:"140px",width:"270px"}} src={require("../../imgs/theme/sk12.jpeg")}/>
                                 </Link>
                                </div>
                            </span>
                        </div>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default LoadMoreList;




