import React, {Component} from 'react';
import {Anchor, Row, Col} from 'antd';


const {Link} = Anchor;


class Design5 extends Component {

    s = "{";
    render() {

        return (
            <div>
                <Row>
                    <Col span={19}>
                        <h2 id="物理架构"><a href="javascript:void(0)" class="anchor">物理架构</a></h2>
                        <p><img src={require('../../imgs/design/d12.png' )}/></p>
                        <p>字母表进行双写。</p>
                        <h3 id="物理概念"><a href="javascript:void(0)" class="anchor">物理概念</a></h3>
                        <h4 id="dataNode"><a href="javascript:void(0)" class="anchor">dataNode</a></h4>
                        <p>每个分片表所在的数据库就是一个分片节点。一个分片节点对应一个数据库（mysql数据库）。一个分片节点只能保存每个分片表的一个分片，因为db中不允许出现同名的表。</p>
                        <pre><code>&lt;dataNode name=&quot;test1&quot; dataHost=&quot;test&quot; database=&quot;db1&quot; /&gt;<br/>
</code></pre>
                        <h4 id="dataHost"><a href="javascript:void(0)" class="anchor">dataHost</a></h4>
                        <p>分片节点究竟被放在那个主机上。对应mysql里的mysql实例：一台主机可以部署多个mysql实例，一个mysql实例可以有多个数据库。为了规避单节点主机并发数限制，尽量将读写压力高的分片节点（dataNode）均衡的放在不同的节点主机（dataHost）. </p>
                        <pre><code>&lt;dataHost name=&quot;test&quot; maxCon=&quot;1000&quot; minCon=&quot;10&quot; balance=&quot;0&quot;<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;writeType=&quot;0&quot;&nbsp;dbType=&quot;mysql&quot;&nbsp;dbDriver=&quot;native&quot;&nbsp;switchType=&quot;-1&quot;&nbsp;&nbsp;slaveThreshold=&quot;100&quot;&gt;<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;heartbeat&gt;select&nbsp;1&nbsp;from&nbsp;dual&lt;/heartbeat&gt;<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;writeHost&nbsp;host=&quot;master&quot;&nbsp;url=&quot;10.202.4.181:3306&quot;&nbsp;user=&quot;root&quot;<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;password=&quot;sf123456&quot;&gt;<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;readHost&nbsp;host=&quot;slave&quot;&nbsp;url=&quot;10.202.4.181:3307&quot;&nbsp;&nbsp;user=&quot;root&quot;&nbsp;password=&quot;sf123456&quot;/&gt;<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/writeHost&gt;<br/>
                            &lt;/dataHost&gt;<br/>
</code></pre>
                        <h3 id="分片规则"><a href="javascript:void(0)" class="anchor">分片规则</a></h3>
                        <p>决定分片表的记录如何分布在不同的分片节点上。</p>
                        <h3 id="哈希取模"><a href="javascript:void(0)" class="anchor">哈希取模</a></h3>
                        <p>根据分片字段（一般是主键，因为按主键查找的场景偏多）的哈希值，对分片个数取模运算，根据结果决定记录到哪个分片上。 </p>
                        <p>好处：记录平均分布（除非id生成器故意生成取模正好只为同一个数的id），压力平均分布，数据没有倾斜
                            坏处：扩容（增加分片）是个大问题，分片个数改变，基本很难迁移数据 </p>
                        <p>参考：<a href='https://blog.csdn.net/zhxdick/article/details/50619328' target='_blank' >https://blog.csdn.net/zhxdick/article/details/50619328</a></p>
                        <h3 id="路由约定"><a href="javascript:void(0)" class="anchor">路由约定</a></h3>
                        <p>维护一个对应表配置文件partition-file-map.txt，如下所示： </p>
                        <pre><code>北京=0 <br/>
上海=1&nbsp;<br/>
深圳=2&nbsp;<br/>
广州=2&nbsp;<br/>
default=312345<br/>
</code></pre>
                        <p>意思就是分片字段为北京的到分片0上，上海的到分片1上，深圳和广州的到分片2上，其他的到分片3上。

                            好处：易于管理
                            坏处：数据容易有倾斜，扩容不是很灵活，而且，分片字段很难是常用查询字段（如果查询字段不是分片字段，就是全分片检索）</p>
                        <p>rule.xml:</p>
                        <pre><code>&lt;tableRule name=&quot;file-map-rule1&quot;&gt;<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&lt;rule&gt;<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;columns&gt;address&lt;/columns&gt;&nbsp;&nbsp;//分片字段<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;algorithm&gt;file-map&lt;/algorithm&gt;<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&lt;/rule&gt;<br/>
                            &lt;/tableRule&gt;<br/>
                            &lt;function&nbsp;name=&quot;file-map&quot;&nbsp;class=&quot;org.opencloudb.route.function.PartitionByFileMap&quot;&gt;<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&lt;property&nbsp;name=&quot;mapFile&quot;&gt;partition-file-map.txt&lt;/property&gt;<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&lt;property&nbsp;name=&quot;type&quot;&gt;1&lt;/property&gt;&nbsp;//type为零则字段类型为整型，为1则为字符串类型<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&lt;property&nbsp;name=&quot;defaultNode&quot;&gt;0&lt;/property&gt;<br/>
                            &lt;/function&gt;<br/>
</code></pre>
                        <h3 id="范围路由约定"><a href="javascript:void(0)" class="anchor">范围路由约定</a></h3>
                        <p>维护一个文件，如下所示：</p>
                        <pre><code>0~1000k=0<br/>
1000k~2000k=1<br/>
default=2<br/>
</code></pre>
                        <p>好处：保证每个分片数据稳定，扩容也比较方便
                            坏处：需要配合id生成器，否则按顺序自增会有压力集中在一个分片的问题。同时，扩容时同时要改变MyCat配置以及id生成器配置。及时做数据清理，id最好能复用，这个规则才能很好的应用。</p>
                        <p>&nbsp;</p>
                        <h3 id="哈希范围约定"><a href="javascript:void(0)" class="anchor">哈希范围约定</a></h3>
                        <p>将哈希取模与范围路由结合:</p>
                        <pre><code>0~15=0<br/>
16~31=1<br/>
32~47=2<br/>
48~63=3<br/>
</code></pre>
                        <p>哈希取模后范围在0~15的流向分片1.。。。
                            这样可以某种程度上减轻扩容的压力。</p>
                        <h3 id="综合约定"><a href="javascript:void(0)" class="anchor">综合约定</a></h3>
                        <p>比如下面这个id：
                            01_01_XXXASD1239091234
                            我们用第一个_之前的数字直接作为分片id，我们为了考虑到以后的业务增长，一开始就分配了64个库。id生成器先开始只会随机平均生成00~03开头的，之后业务增长到某个程度时，再按照需求多少在某个范围生成。</p>
                        <h2 id="逻辑架构"><a href="javascript:void(0)" class="anchor">逻辑架构</a></h2>
                        <p> <img src='http://img.blog.csdn.net/20160216201657595' alt='' /></p>
                        <p><img src={require('../../imgs/design/d13.png' )}/></p>
                        <h3 id="通信"><a href="javascript:void(0)" class="anchor">通信</a></h3>
                        <p>前端与后端通信框架都为NIO/AIO，因为目前生产上用的linux发行版内核都没有真正实现网络上的AIO，如果应用用AIO的话可能比NIO还要慢一些，所以，只分析NIO相关的通信模块。 </p>
                        <pre><code>io.mycat.net<br/>
	|-NIOAcceptor<br/>
	|-NIOReactor<br/>
	|-NIOReactorPool<br/>
	|-NIOSocketWR<br/>
	|-NIOProcessor<br/>
	|-factory<br/>
		|-FrontendConnectionFactory<br/>
		|-BackendConnectionFactory<br/>
	|-handler<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;	|-FrontendAuthenticator<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;	|-FrontendCommandHandler<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;	|-BackendAsyncHandler<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;|-mysql<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;	|-...Packet<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;|-<br/>
</code></pre>
                        <p>NIOAcceptor 完成同客户端的链接，并发送握手包。</p>
                        <p>NIOReactor 处理并转发请求到RW线程，其实就是把对应AbstractConnection（就是NIO的channel的封装）注册到RW线程的selector上，只注册读标记；</p>
                        <p>NIOSocketWR：每个前端和后端连接都有一个对应的缓冲区，对连接读写操作具体如何操作的方法和缓存方式，封装到了这个类里面。</p>
                        <p><img src={require('../../imgs/design/d14.png' )}/></p>
                        <h3 id="全局序列号"><a href="javascript:void(0)" class="anchor">全局序列号</a></h3>
                        <p>1、使用 mysql自增 + 步长</p>
                        <p>2、推荐用独立的id生成器服务去实现(redis/zk/mangodb)</p>
                        <p>&nbsp;</p>
                        <h3 id="mycat监控"><a href="javascript:void(0)" class="anchor">mycat监控</a></h3>
                        <p>linux /zk /MyCat-eye</p>
                        <h3 id="连接"><a href="javascript:void(0)" class="anchor">连接</a></h3>
                        <p><img src='http://img.blog.csdn.net/20160220112351145' alt='' /></p>
                        <h3 id="路由"><a href="javascript:void(0)" class="anchor">路由</a></h3>
                        <p><img src={require('../../imgs/design/d15.png' )}/></p>
                        <p>&nbsp;</p>
                        <h1 id="Mycat HA集群"><a href="javascript:void(0)" class="anchor">Mycat HA集群</a></h1>
                        <p>HaProxy+Keepalived+Mycat</p>
                    </Col>
                    <Col span={1}>
                    </Col>
                    <Col span={4}>
                        <Anchor showInkInFixed="true">
                            <Link href="#物理架构" title="物理架构"/>
                            <Link href="#物理概念" title="物理概念">
                                <Link href="#dataNode" title="dataNode"/>
                                <Link href="#dataHost" title="dataHost"/>
                            </Link>
                            <Link href="#分片规则" title="分片规则"/>
                            <Link href="#哈希取模" title="哈希取模"/>
                            <Link href="#路由约定" title="路由约定"/>
                            <Link href="#范围路由约定" title="范围路由约定"/>
                            <Link href="#哈希范围约定" title="哈希范围约定"/>
                            <Link href="#综合约定" title="综合约定"/>

                            <Link href="#逻辑架构" title="逻辑架构">
                            <Link href="#通信" title="通信"/>
                            <Link href="#全局序列号" title="全局序列号"/>
                            <Link href="#mycat监控" title="mycat监控"/>
                            <Link href="#连接" title="连接"/>
                            <Link href="#路由" title="路由"/>
                            </Link>
                           <Link href="#Mycat HA集群" title="Mycat HA集群"/>
                        </Anchor>
                    </Col>
                </Row>


            </div>

        );
    }
}

export default Design5;
