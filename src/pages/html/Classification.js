import {List, Button, Spin,Icon,Rate,Tag,message,Modal ,Input,Row, Col} from 'antd';
import React from 'react';
import {Link} from 'react-router-dom';

class LoadMoreList extends React.Component {

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
                                        　　     <img style={{height:"150px",width:"300px"}} src="http://i1.bvimg.com/633340/c0241f76f51be51dt.jpg"/>
                                        　　     <div style={{position:"absolute", left:"26%", top:"34%"}}><span style={{fontSize:"40px"}}>系统架构</span></div>
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
                            　　     <img style={{height:"150px",width:"300px"}} src="http://i1.bvimg.com/633340/b93be9ccc5bd1d75t.jpg"/>
                            　　     <div style={{position:"absolute", left:"26%", top:"34%"}}><span style={{fontSize:"40px"}}>机器学习</span></div>
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
                            　　     <img style={{height:"150px",width:"300px"}} src="http://i1.bvimg.com/633340/9e0e11de51ae6c09t.jpg"/>
                            　　     <div style={{position:"absolute", left:"32%", top:"34%"}}><span style={{fontSize:"40px"}}>生活</span></div>
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
                            　　     <img style={{height:"150px",width:"300px"}} src="http://i1.bvimg.com/633340/54683a58203b8c76t.jpg"/>
                            　　     <div style={{position:"absolute", left:"35%", top:"34%"}}><span style={{fontSize:"40px"}}>JAVA</span></div>
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
                            　　     <img style={{height:"150px",width:"300px"}} src="http://i1.bvimg.com/633340/8ab61ef2f9dcfdf7t.jpg"/>
                            　　     <div style={{position:"absolute", left:"30%", top:"34%"}}><span style={{fontSize:"40px"}}>数据库</span></div>
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
                            　　     <img style={{height:"150px",width:"300px"}} src="http://i1.bvimg.com/633340/da4204b319d07cdct.jpg"/>
                            　　     <div style={{position:"absolute", left:"26%", top:"34%"}}><span style={{fontSize:"40px"}}>数据结构</span></div>
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
                            　　     <img style={{height:"150px",width:"300px"}} src="http://i1.bvimg.com/633340/1af6d5bff411a19ct.jpg" />
                            　　     <div style={{position:"absolute", left:"32%", top:"34%"}}><span style={{fontSize:"40px"}}>网&nbsp;&nbsp;&nbsp;&nbsp;络</span></div>
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
                            　　     <img style={{height:"150px",width:"300px"}} src="http://i1.bvimg.com/633340/b7c0e1f75248bfe2t.jpg" />
                            　　     <div style={{position:"absolute", left:"32%", top:"34%"}}><span style={{fontSize:"40px"}}>资&nbsp;&nbsp;&nbsp;&nbsp;源</span></div>
                                 </Link>
                                </div>
                            </span>
                        </div>
                    </Col>
                    <Col xs={24} sm={24} md={12} lg={8} xl={8}>
                        <div className="gutter-box" >
                             <span >
                                <div style={{position:"relative"}}>
                                <Link to= "/resources">
                            　　     <img style={{height:"150px",width:"300px"}} src="http://i1.bvimg.com/633340/d6685c68fe5eeb7ft.jpg"/>
                            　　     <div style={{position:"absolute", left:"32%", top:"34%"}}><span style={{fontSize:"40px"}}>草&nbsp;&nbsp;&nbsp;&nbsp;稿</span></div>
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

