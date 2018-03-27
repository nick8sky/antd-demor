import React, {Component} from 'react';
import {Anchor, Row, Col} from 'antd';


const {Link} = Anchor;


class Design3 extends Component {

    s = "{";
    render() {

        return (
            <div>
                <Row>
                    <Col span={19}>
                        <h3 id="mq用来做什么"><a href="javascript:void(0)" class="anchor">mq用来做什么</a></h3>
                        <p>1、服务解耦</p>
                        <p>	虽然rpc也是为了解耦，但还不够彻底；需要引用依赖包，及依赖包的版本控制；底层服务不知道上层服务时，应该使用mq。</p>
                        <p>2、异步</p>
                        <p>	大多rpc是同步的，即使可以支持异步，可能在上层已经超时了。</p>
                        <p>3、消息广播</p>
                        <p>	消息接受方不只一个。</p>
                        <p>&nbsp;</p>
                        <p>mq的演进</p>
                        <p>从jdk中的线程池+队列说起</p>
                        <pre><code>ThreadPoolExecutor exec = new ThreadPoolExecutor(2,3,0l, TimeUnit.MILLISECONDS,new LinkedBlockingDeque&lt;&gt;(1024)); <br/>
</code></pre>
                        <p>当处理线程不够时，就往队列里put，当然若队列已满了，就要配置相应的处理策略。</p>
                        <p>&nbsp;</p>
                        <h3 id="Producer"><a href="javascript:void(0)" class="anchor">Producer</a></h3>
                        <p>mq可以理解为分布式队列，message queue。</p>
                        <p><img src={require('../../imgs/design/d8.png' )}/></p>
                        <p>这是均匀副本的情况，也有不均匀的情况：</p>
                        <p><img src={require('../../imgs/design/d9.jpg' )}/></p>
                        <p>在Kafka集群中，每一个Broker都有均等分配Partition的Leader机会。 </p>
                        <p>为了使得Kafka的吞吐率可以线性提高，物理上把Topic分成一个或多个Partition。</p>
                        <p>&nbsp;</p>
                        <p>副本分配算法</p>
                        <p>将全部N Broker和待分配的i个Partition排序.
                            将第i个Partition分配到第(i mod n)个Broker上。
                            将第i个Partition的第j个副本分配到第((i + j) mod n)个Broker上.</p>
                        <p>当然并不是严格按照这么执行的；</p>
                        <p>&nbsp;</p>
                        <p>对于传统的message queue而言，一般会删除已经被消费的消息，而Kafka集群会保留所有的消息，无论其被消费与否。当然，因为磁盘限制，不可能永久保留所有数据（实际上也没必要），</p>
                        <p>因此Kafka提供两种策略删除旧数据。一是基于时间，二是基于Partition文件大小。</p>
                        <p>例如可以通过配置$KAFKA_HOME/config/server.properties，让Kafka删除一周前的数据，也可在Partition文件超过1GB时删除旧数据，配置如下所示。</p>
                        <p><img src={require('../../imgs/design/d11.png' )}/></p>
                        <p>Kafka读取特定消息的时间复杂度为O(1)，即与文件大小无关，所以这里删除过期文件与提高Kafka性能无关。选择怎样的删除策略只与磁盘以及具体的需求有关。另外，Kafka会为每一个Consumer Group保留一些metadata信息——当前消费的消息的position，也即offset。这个offset由Consumer控制。正常情况下Consumer会在消费完一条消息后递增该offset。当然，Consumer也可将offset设成一个较小的值，重新消费一些消息。因为offet由Consumer控制，所以Kafka broker是无状态的，它不需要标记哪些消息被哪些消费过，也不需要通过broker去保证同一个Consumer Group只有一个Consumer能消费某一条消息，因此也就不需要锁机制，这也为Kafka的高吞吐率提供了有力保障。</p>
                        <p>&nbsp;</p>
                        <p>Producer发送消息到broker时，会根据Paritition机制选择将其存储到哪一个Partition。如果Partition机制设置合理，所有消息可以均匀分布到不同的Partition里，这样就实现了负载均衡。如果一个Topic对应一个文件，那这个文件所在的机器I/O将会成为这个Topic的性能瓶颈，而有了Partition后，不同的消息可以并行写入不同broker的不同Partition里，极大的提高了吞吐率。可以在$KAFKA_HOME/config/server.properties中通过配置项num.partitions来指定新建Topic的默认Partition数量，也可在创建Topic时通过参数指定，同时也可以在Topic创建之后通过Kafka提供的工具修改。</p>
                        <p> </p>
                        <p>在发送一条消息时，可以指定这条消息的key，Producer根据这个key和Partition机制来判断应该将这条消息发送到哪个Parition。Paritition机制可以通过指定Producer的paritition. class这一参数来指定，该class必须实现kafka.producer.Partitioner接口。 </p>
                        <pre><code>import kafka.producer.Partitioner;<br/>
import&nbsp;kafka.utils.VerifiableProperties;<br/>
public&nbsp;class&nbsp;JasonPartitioner&lt;T&gt;&nbsp;implements&nbsp;Partitioner&nbsp;{this.s}<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;public&nbsp;JasonPartitioner(VerifiableProperties&nbsp;verifiableProperties)&nbsp;{this.s}}<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;@Override<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;public&nbsp;int&nbsp;partition(Object&nbsp;key,&nbsp;int&nbsp;numPartitions)&nbsp;{this.s}<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;try&nbsp;{this.s}<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;int&nbsp;partitionNum&nbsp;=&nbsp;Integer.parseInt((String)&nbsp;key);<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;return&nbsp;Math.abs(Integer.parseInt((String)&nbsp;key)&nbsp;%&nbsp;numPartitions);<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}&nbsp;catch&nbsp;(Exception&nbsp;e)&nbsp;{this.s}<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;return&nbsp;Math.abs(key.hashCode()&nbsp;%&nbsp;numPartitions);<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;}<br/>
}<br/>
//本例中如果key可以被解析为整数则将对应的整数与Partition总数取余，该消息会被发送到该数对应的Partition。（每个Parition都会有个序号,序号从0开始）<br/>
</code></pre>
                        <p>使用自定义的Kafka分区器</p>
                        <p> props.put(&quot;partitioner.class&quot;,&quot;com.ngaa.spark.create.MySamplePartitioner&quot;);//我的自定义分区器 </p>
                        <p>&nbsp;</p>
                        <p>kafka修改分区数量</p>
                        <p>./kafka-topics.sh –zookeeper localhost:2181 -alter –partitions 5 –topic userService</p>
                        <p>参考：<a href='https://blog.csdn.net/u013063153/article/details/73826310' target='_blank' >https://blog.csdn.net/u013063153/article/details/73826310</a></p>
                        <h3 id="Consumer"><a href="javascript:void(0)" class="anchor">Consumer</a></h3>
                        <p><strong>每个读写操作都是leader完成，followers只负责同步。</strong></p>
                        <p><img src={require('../../imgs/design/d10.png' )}/></p>
                        <p>一个topic 可以配置几个partition，produce发送的消息分发到不同的partition中，consumer接受数据的时候是按照group来接受，kafka确保每个partition只能同一个group中的同一个consumer消费，如果想要重复消费，那么需要其他的组来消费。Zookeerper中保存这每个topic下的每个partition在每个group中消费的offset ，新版kafka把这个offsert保存到了一个__consumer_offsert的topic下 。</p>
                        <p>为什么consumer不能大于分区数量？</p>
                        <p>当consumer的数量大于分区的数量的时候，有的consumer线程会读取不到数据。 </p>
                        <p>&nbsp;</p>
                        <p>问：如何保证消息的顺序性？</p>
                        <p>	生产者只向一个分区写消息，分区可以保证消息的顺序性。</p>
                        <p>&nbsp;</p>
                        <p>问：kafka的ha是如何实现的？</p>
                        <p>	在没有Replication的情况下，一旦某机器宕机或者某个Broker停止工作则会造成整个系统的可用性降低。随着集群规模的增加，整个集群中出现该类异常的几率大大增加，因此对于生产系统而言Replication机制的引入非常重要。</p>
                        <p>	引入Replication之后，同一个Partition可能会有多个Replication，而这时需要在这些Replication之间选出一个Leader，Producer和Consumer只与这个Leader交互，其它Replica作为Follower从Leader中复制数据。</p>
                        <p>	因为需要保证同一个Partition的多个Replication之间的数据一致性（其中一个宕机后其它Replication必须要能继续服务并且即不能造成数据重复也不能造成数据丢失），引入Leader后，只有Leader负责数据读写，Follower只向Leader顺序Fetch数据（N条通路），系统更加简单且高效。</p>
                        <p>	为了更好的做负载均衡，Kafka尽量将所有的Partition均匀分配到整个集群上。一个典型的部署方式是一个Topic的Partition数量大于Broker的数量。同时为了提高Kafka的容错能力，也需要将同一个Partition的Replication尽量分散到不同的机器。实际上，如果所有的Replication都在同一个Broker上，那一旦该Broker宕机，该Partition的所有Replication都无法工作，也就达不到HA的效果。同时，如果某个Broker宕机了，需要保证它上面的负载可以被均匀的分配到其它幸存的所有Broker上。</p>
                        <p>&nbsp;</p>
                        <p>	Producer在发布消息到某个Partition时，先通过ZooKeeper找到该Partition的Leader，然后无论该Topic的Replication Factor为多少（也即该Partition有多少个Replica），Producer只将该消息发送到该Partition的Leader。Leader会将该消息写入其本地Log。每个Follower都从Leader pull数据。这种方式上，Follower存储的数据顺序与Leader保持一致。Follower在收到该消息并写入其Log后，向Leader发送ACK。一旦Leader收到了ISR中的所有Replica的ACK，该消息就被认为已经commit了，Leader将增加HW并且向Producer发送ACK。</p>
                        <p> </p>
                        <p>总的来说就是：</p>
                        <p>1、利用分区，满足高并发读写</p>
                        <p>2、利用Replication实现分区热备</p>
                        <p>&nbsp;</p>
                        <h3 id="Leader Election算法"><a href="javascript:void(0)" class="anchor">Leader Election算法</a></h3>
                        <p>最简单最直观的方案是，所有Follower都在ZooKeeper上设置一个Watch，一旦Leader宕机，其对应的ephemeral znode会自动删除，此时所有Follower都尝试创建该节点，而创建成功者（ZooKeeper保证只有一个能创建成功）即是新的Leader，其它Replica即为Follower。</p>
                        <p>参考：<a href='http://www.infoq.com/cn/articles/kafka-analysis-part-2/' target='_blank' >http://www.infoq.com/cn/articles/kafka-analysis-part-2/</a></p>
                        <p>&nbsp;</p>
                        <p>问：Kafka的Zookeeper 的关系？</p>
                        <blockquote><p>分区的leader选举;</p>
                            <p>zk集群自身的通信</p>
                            <p>0.8用于存储consumer的offset</p>
                        </blockquote>
                        <p>&nbsp;</p>
                        <p>问：kafka读写的复杂度？</p>
                        <p>答：为1，因为是顺序读写的。</p>

                    </Col>
                    <Col span={1}>
                    </Col>
                    <Col span={4}>
                        <Anchor showInkInFixed="true">
                            <Link href="#mq用来做什么" title="mq用来做什么"/>
                            <Link href="#Producer" title="Producer"/>
                            <Link href="#Consumer" title="Consumer"/>
                            <Link href="#Leader Election算法" title="Leader Election算法"/>
                        </Anchor>
                    </Col>
                </Row>


            </div>

        );
    }
}

export default Design3;
