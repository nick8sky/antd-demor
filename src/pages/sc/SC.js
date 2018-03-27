
import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import { Row, Col} from 'antd';




class SC extends React.Component {


    render() {

        return (
            <div>
                <Row gutter={16}>

                    <Col xs={24} sm={24} md={12} lg={8} xl={8}>
                        <div className="gutter-box">
                         <span>
                            <div style={{position: "relative"}}>
                                <Link to="shardinglist">
                            　　      <img style={{height:"140px",width:"270px"}} src="https://gitee.com/nick070809/pics/raw/master/home/sc1.png"/>
                            　　     <div style={{position: "absolute", left: "13%", top: "34%"}}><span style={{fontSize: "40px"}}>sharding-jdbc</span></div>
                                </Link>
                            </div>
                        </span>
                        </div>
                    </Col>
                    <Col xs={24} sm={24} md={12} lg={8} xl={8}>
                        <div className="gutter-box">
                         <span>
                            <div style={{position: "relative"}}>
                                <Link to="zipkin">
                            　　      <img style={{height:"140px",width:"270px"}} src="https://gitee.com/nick070809/pics/raw/master/home/sc2.png"/>
                            　　     <div style={{position: "absolute", left: "32%", top: "34%"}}><span style={{fontSize: "40px"}}>zipkin</span></div>
                                </Link>
                            </div>
                        </span>
                        </div>
                    </Col>
                    <Col xs={24} sm={24} md={12} lg={8} xl={8}>
                        <div className="gutter-box">
                         <span>
                            <div style={{position: "relative"}}>
                                <Link to="dubbo">
                            　　      <img style={{height:"140px",width:"270px"}} src="https://gitee.com/nick070809/pics/raw/master/home/sc3.png"/>
                            　　     <div style={{position: "absolute", left: "32%", top: "34%"}}><span style={{fontSize: "40px"}}>dubbo</span></div>
                                </Link>
                            </div>
                        </span>
                        </div>
                    </Col>
                    <Col xs={24} sm={24} md={12} lg={8} xl={8}>
                        <div className="gutter-box">
                         <span>
                            <div style={{position: "relative"}}>
                                <Link to="mycat">
                            　　      <img style={{height:"140px",width:"270px"}} src="https://gitee.com/nick070809/pics/raw/master/home/sc4.png"/>
                            　　     <div style={{position: "absolute", left: "30%", top: "34%"}}><span style={{fontSize: "40px"}}>mycat</span></div>
                                </Link>
                            </div>
                        </span>
                        </div>
                    </Col>
                    <Col xs={24} sm={24} md={12} lg={8} xl={8}>
                        <div className="gutter-box">
                         <span>
                            <div style={{position: "relative"}}>
                                <Link to="netty">
                            　　      <img style={{height:"140px",width:"270px"}} src="https://gitee.com/nick070809/pics/raw/master/home/sc5.png"/>
                            　　     <div style={{position: "absolute", left: "14%", top: "34%"}}><span style={{fontSize: "40px"}}>netty</span></div>
                                </Link>
                            </div>
                        </span>
                        </div>
                    </Col>
                    <Col xs={24} sm={24} md={12} lg={8} xl={8}>
                        <div className="gutter-box">
                         <span>
                            <div style={{position: "relative"}}>
                                <Link to="redis">
                            　　      <img style={{height:"140px",width:"270px"}} src="https://gitee.com/nick070809/pics/raw/master/home/sc6.png"/>
                                </Link>
                            </div>
                        </span>
                        </div>
                    </Col>
                    <Col xs={24} sm={24} md={12} lg={8} xl={8}>
                        <div className="gutter-box">
                         <span>
                            <div style={{position: "relative"}}>
                                <Link to="zk">
                            　　      <img style={{height:"140px",width:"270px"}} src="https://gitee.com/nick070809/pics/raw/master/home/sc7.png"/>
                                    <div style={{position: "absolute", left: "23%", top: "34%"}}><span style={{fontSize: "40px"}}>zookeeper</span></div>
                                </Link>
                            </div>
                        </span>
                        </div>
                    </Col>
                    <Col xs={24} sm={24} md={12} lg={8} xl={8}>
                        <div className="gutter-box">
                         <span>
                            <div style={{position: "relative"}}>
                                <Link to="mq">
                            　　      <img style={{height:"140px",width:"270px"}} src="https://gitee.com/nick070809/pics/raw/master/home/sc8.png"/>
                                    <div style={{position: "absolute", left: "40%", top: "34%"}}><span style={{fontSize: "40px"}}>MQ</span></div>
                                </Link>
                            </div>
                        </span>
                        </div>
                    </Col>
                    <Col xs={24} sm={24} md={12} lg={8} xl={8}>
                        <div className="gutter-box">
                         <span>
                            <div style={{position: "relative"}}>
                                <Link to="docker">
                            　　      <img style={{height:"140px",width:"270px"}} src={require("../../imgs/theme/sc9.jpg")}/>
                                </Link>
                            </div>
                        </span>
                        </div>
                    </Col>
                    <Col xs={24} sm={24} md={12} lg={8} xl={8}>
                        <div className="gutter-box">
                         <span>
                            <div style={{position: "relative"}}>
                                <Link to="mvc">
                            　　      <img style={{height:"140px",width:"270px"}} src={require("../../imgs/theme/springmvc.png")}/>
                                     <div style={{position: "absolute", left: "20%", top: "34%"}}><span style={{fontSize: "40px"}}>springmvc</span></div>
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

export default SC;




