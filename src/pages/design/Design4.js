import React, {Component} from 'react';
import {Anchor, Row, Col} from 'antd';


const {Link} = Anchor;


class Design4 extends Component {

    s = "{";
    render() {

        return (
            <div>
                <Row>
                    <Col span={19}>
                        <h2 id="NameServer是什么？"><a href="javascript:void(0)" class="anchor">NameServer是什么？</a></h2>
                        <p><img src='https://gitee.com/nick070809/pics/raw/master/mq/1.png' alt='' /></p>
                        <p>&nbsp;</p>
                        <p>RocketMQ是MetaQ的3.0版本，而MetaQ最初的设计又参考了Kafka。最初的MetaQ 1.x版本由阿里的原作者庄晓丹开发，后面的MetaQ 2.x版本才进行了开源，这里需要注意一点的事，MetaQ 1.x和MetaQ 2.x是依赖ZooKeeper的，但RocketMQ（即MetaQ 3.x）却去掉了ZooKeeper依赖，转而采用自己的NameServer。</p>
                        <p>ZooKeeper是著名的分布式协作框架，提供了Master选举、分布式锁、数据的发布和订阅等诸多功能，为什么RocketMQ没有选择ZooKeeper，而是自己开发了NameServer，我们来具体看看NameServer在RocketMQ集群中的作用就明了了。</p>
                        <p> </p>
                        <p>RocketMQ的Broker有三种集群部署方式：1.单台Master部署；2.多台Master部署；3.多Master多Slave部署；采用第3种部署方式时，Master和Slave可以采用同步复制和异步复制两种方式。上图是第3种部署方式的简单图；</p>
                        <p>&nbsp;</p>
                        <p>当采用多Master方式时，Master与Master之间是不需要知道彼此的，这样的设计直接降低了Broker实现的复查性，你可以试想，如果Master与Master之间需要知道彼此的存在，这会需要在Master之中维护一个网络的Master列表，而且必然设计到Master发现和活跃Master数量变更等诸多状态更新问题，所以最简单也最可靠的做法就是Master只做好自己的事情（比如和Slave进行数据同步）即可，这样，在分布式环境中，某台Master宕机或上线，不会对其他Master造成任何影响。</p>
                        <p> </p>
                        <p>那么怎么才能知道网络中有多少台Master和Slave呢？你会很自然想到用ZooKeeper，每个活跃的Master或Slave都去约定的ZooKeeper节点下注册一个状态节点，但RocketMQ没有使用ZooKeeper，所以这件事就交给了NameServer来做了。</p>
                        <p>&nbsp;</p>
                        <p><strong>NameServer用来保存活跃的broker列表，包括Master和Slave。</strong></p>
                        <p>我们移步到rocketmq-namesrv模块中最重要的一个类：RouteInfoManager，它的主要属性如下：</p>
                        <pre><code>private final ReadWriteLock lock = new ReentrantReadWriteLock();<br/>
private&nbsp;final&nbsp;HashMap&lt;String/*&nbsp;topic&nbsp;*/,&nbsp;List&lt;QueueData&gt;&gt;&nbsp;topicQueueTable;<br/>
private&nbsp;final&nbsp;HashMap&lt;String/*&nbsp;brokerName&nbsp;*/,&nbsp;BrokerData&gt;&nbsp;brokerAddrTable;<br/>
private&nbsp;final&nbsp;HashMap&lt;String/*&nbsp;clusterName&nbsp;*/,&nbsp;Set&lt;String/*&nbsp;brokerName&nbsp;*/&gt;&gt;&nbsp;clusterAddrTable;<br/>
private&nbsp;final&nbsp;HashMap&lt;String/*&nbsp;brokerAddr&nbsp;*/,&nbsp;BrokerLiveInfo&gt;&nbsp;brokerLiveTable;<br/>
private&nbsp;final&nbsp;HashMap&lt;String/*&nbsp;brokerAddr&nbsp;*/,&nbsp;List&lt;String&gt;/*&nbsp;Filter&nbsp;Server&nbsp;*/&gt;&nbsp;filterServerTable;<br/>
</code></pre>
                        <p>每个属性通过名字就能清楚的知道是什么意思，之所以能用非线程安全的HashMap，是因为有读写锁lock来对HashMap的修改做保护。我们注意到保存broker的Map有两个，即brokerAddrTable用来保存所有的broker列表和brokerLiveTable用来保存当前活跃的broker列表，而BrokerData用来保存broker的主要新增，而BrokerLiveInfo只用来保存上次更新（心跳）时间，我们可以直接看看RouteInfoManager中扫描非活跃broker的方法：</p>
                        <p>如果两分钟内都没收到一个broker的心跳数据，则直接将其从brokerLiveTable中移除，注意，这还会导致该broker从brokerAddrTable被删除，当然，如果该broker是Master，则它的所有Slave的broker都将被删除。具体细节可以参看RouteInfoManager的onChannelDestroy方法。</p>
                        <p>&nbsp;</p>
                        <p><strong>NameServer 用来保存所有topic和该topic所有队列的列表。</strong></p>
                        <p>我们注意到，<strong>topicQueueTable</strong>的value是QueueData的List，我们看看QueueData中的属性：</p>
                        <pre><code>private String brokerName;  // broker的名称<br/>
private&nbsp;int&nbsp;readQueueNums;&nbsp;&nbsp;//&nbsp;读队列数量<br/>
private&nbsp;int&nbsp;writeQueueNums;&nbsp;//&nbsp;写队列数量<br/>
private&nbsp;int&nbsp;perm;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;//&nbsp;读写权限<br/>
private&nbsp;int&nbsp;topicSynFlag;&nbsp;&nbsp;&nbsp;//&nbsp;同步复制还是异步复制标记<br/>
</code></pre>
                        <p>可以在NameServer这里知道topic相关的所有信息，包括topic有哪些队列，这些队列在那些broker上等。</p>
                        <p><strong>NameServer用来保存所有broker的Filter列表。</strong></p>
                        <p>&nbsp;</p>
                        <p>问：RocketMQ为什么不使用ZooKeeper？</p>
                        <p>ZooKeeper可以提供Master选举功能，比如Kafka用来给每个分区选一个broker作为leader，但对于RocketMQ来说，topic的数据在每个Master上是对等的，没有哪个Master上有topic上的全部数据，所以这里选举leader没有意义；RockeqMQ集群中，需要有构件来处理一些通用数据，比如broker列表，broker刷新时间，虽然ZooKeeper也能存放数据，并有一致性保证，但处理数据之间的一些逻辑关系却比较麻烦，而且数据的逻辑解析操作得交给ZooKeeper客户端来做，如果有多种角色的客户端存在，自己解析多级数据确实是个麻烦事情；既然RocketMQ集群中没有用到ZooKeeper的一些重量级的功能，只是使用ZooKeeper的数据一致性和发布订阅的话，与其依赖重量级的ZooKeeper，还不如写个轻量级的NameServer，NameServer也可以集群部署，NameServer与NameServer之间无任何信息同步，只有一千多行代码的NameServer稳定性肯定高于ZooKeeper，占用的系统资源也可以忽略不计，何乐而不为？当然，这些只是本人的一点理解，具体原因当然得RocketMQ设计和开发者来说。</p>
                        <p>&nbsp;</p>
                        <p>问：为什么broker master没有全部数据？</p>
                        <p>在rocket mq中，broker实际上就是kafka中的一个分区，如果producer没有设定只往一个broker上write的话，所以即使是一个broker master也没有完整的数据。</p>

                    </Col>
                    <Col span={1}>
                    </Col>
                    <Col span={4}>
                        <Anchor showInkInFixed="true">
                            <Link href="#NameServer是什么？" title="NameServer是什么？"/>
                        </Anchor>
                    </Col>
                </Row>


            </div>

        );
    }
}

export default Design4;
