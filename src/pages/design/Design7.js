import React, {Component} from 'react';
import {Anchor, Row, Col} from 'antd';





class Design7 extends Component {


    render() {

        return (
            <div>
                <Row>
                    <Col span={19}>
                        <p>实时报表</p>
                        <p><img src={require('../../imgs/design/d17.png' )}/></p>
                        <p>可以发现，定时任务是延时的，并不是实时数据，如何做到实时数据报表呢？</p>
                        <p>方案一：</p>
                        <p>实时数据+统计数据 merge 后返回：</p>
                        <p>如每小时有统计任务，如果此时有个查询进来，则：</p>
                        <pre><code>//1、获取当前时间，Date now<br/>
//2、获取上次统计时间终点&nbsp;deadTime<br/>
//3、查询已经统计数据&nbsp;select&nbsp;*&nbsp;from&nbsp;order_job&nbsp;where&nbsp;dead_time&nbsp;&lt;=&nbsp;deadTime&nbsp;;&nbsp;&nbsp;<br/>
//4、查询未统计数据&nbsp;&nbsp;select&nbsp;*&nbsp;form&nbsp;order&nbsp;where&nbsp;create_time&nbsp;&nbsp;&gt;=deadTime;<br/>
//5、合并计算<br/>
</code></pre>
                        <p>&nbsp;</p>
                        <p>方案二：</p>
                        <p>利用异步线程计算：</p>
                        <p><img src={require('../../imgs/design/d18.png' )}/></p>
                        <p>每处理完一个订单，修改统计数据</p>
                        <p>缺点：代码侵入，需要定时检查统计正确性。</p>
                        <p>&nbsp;</p>
                        <p>方案三：</p>
                        <p>利用队列，系统间解耦</p>
                        <p><img src={require('../../imgs/design/d19.png' )}/></p>
                    </Col>
                    <Col span={1}>
                    </Col>
                    <Col span={4}>
                        <Anchor showInkInFixed="true">

                        </Anchor>
                    </Col>
                </Row>


            </div>

        );
    }
}

export default Design7;
