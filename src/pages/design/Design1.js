import React, {Component} from 'react';
import {Anchor, Row, Col} from 'antd';


const {Link} = Anchor;


class Design1 extends Component {

    s = "{";
    render() {

        return (
            <div>
                <Row>
                    <Col span={19}>
                        <h3 id="正常的支付流程"><a href="javascript:void(0)" class="anchor">正常的支付流程</a></h3>
                        <p><img src={require('../../imgs/design/d1.png' )}/></p>
                        <p>问：为什么使用mq而不是rpc？</p>
                        <p>答：1、设计分布式系统时，系统间耦合是必须考虑的；我们不能把我们的支付部门和业务部门形成依赖关系，就好比淘宝不能强依赖支付宝，并且他们还是不同的主体。</p>
                        <p>	2、系统压力考虑，如果支付系统处理有限，业务系统的tps太高，导致后面的请求都会处理超时，造成流量流失，并且用户体验及其不好。</p>
                        <h3 id="长时间没有收到支付结果怎么办？"><a href="javascript:void(0)" class="anchor">长时间没有收到支付结果怎么办？</a></h3>
                        <p>发生这类情况可能有3种：</p>
                        <p>1、订单还在mq中</p>
                        <p>2、订单还在支付系统处理中</p>
                        <p>3、订单支付完成，业务系统还没有收到消息</p>
                        <p>	订单还在mq中，如果支付系统处理较快，则无需忧虑；如支付系统处理较慢，这时可能mq发生了消息堆压；</p>
                        <p>	订单支付完成，业务还没收到消息，也有可能发生消息堆压，或者业务端系统消息丢失[发生概率较小]</p>
                        <p>业务方不管怎样，都应该去支付系统确认下，是否支付成功：</p>
                        <p><img src={require('../../imgs/design/d2.png' )}/></p>
                        <p>问：mq发生了堆压怎么办？</p>
                        <p>答：简单的处理，先把这些消息pull下来入库，consummer从这些未处理的消息慢慢执行。</p>
                        <p>	优雅的处理，对mq进行监控，当消息堆压到一定的阈值，触发consummer去pull。</p>
                        <p>&nbsp;</p>
                        <p>问：重复支付怎么办？</p>
                        <p>答：幂等性校验；</p>
                        <p>&nbsp;</p>
                        <p>问：如何实现幂等性？</p>
                        <p>答：从下而上</p>
                        <p>	1、数据库唯一索引</p>
                        <p>	2、乐观锁  update table_xxx set name=#name#,version=version+1 where version=#version# ，或者更多的子条件。</p>
                        <p>	3、分布式锁</p>
                        <p>	4、select + insert即先查询 是否存在 再插入。</p>
                        <p>&nbsp;</p>
                        <p>&nbsp;</p>

                    </Col>
                    <Col span={1}>
                    </Col>
                    <Col span={4}>
                        <Anchor showInkInFixed="true">
                            <Link href="#正常的支付流程" title="正常的支付流程"/>
                            <Link href="#长时间没有收到支付结果怎么办？" title="长时间没有收到支付结果怎么办？"/>
                        </Anchor>
                    </Col>
                </Row>


            </div>

        );
    }
}

export default Design1;
