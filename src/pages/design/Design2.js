import React, {Component} from 'react';
import {Anchor, Row, Col} from 'antd';


const {Link} = Anchor;


class Design2 extends Component {

    s = "{";
    render() {

        return (
            <div>
                <Row>
                    <Col span={19}>
                        <h3 id="SOA"><a href="javascript:void(0)" class="anchor">SOA</a></h3>
                        <p>如果没有使用过dubbo，没有关系，其实我们已经使用过soa:</p>
                        <p> <img src={require('../../imgs/design/d3.png' )}/></p>
                        <p>这就是最先的soa,可能你会觉得这里里面存在很多问题：</p>
                        <p>1、server-A如何知道server-B是否存在？</p>
                        <p>	当你启动server-A时你需要配置好server-B的ip/port；可能你需要一个配置服务器，便于服务提供方的管理。</p>
                        <p>2、server-B对接收的请求该怎么处理呢？</p>
                        <p>	可能你需要对每个请求加以区别，server-B通过区别标识，去分发请求到不同的hander中：</p>
                        <p><img src={require('../../imgs/design/d4.png' )}/></p>
                        <p>3、server-A在调用server-B发生了超时怎么办？</p>
                        <p>	刚开始使用套接字连接，并没有使用Nio,可能会使用futureTask来等待这个处理结果，但还是没有解决超时问题，只是让server-A的线程可以提前交出cpu时间片而已。</p>
                        <p>	为了减少超时引发的系统异常，我们引入nio,可以的选择有JDK-NIO,netty,mina;推荐使用netty。</p>
                        <p>4、server-A和server-B是否形成了强依赖？</p>
                        <p>	是的</p>
                        <p>5、序列化是否影响调用时长？</p>
                        <p>	是的，序列化压缩速度和压缩比例都是影响io的一部分。</p>
                        <p>6、server-B宕机了怎么办？</p>
                        <p>	显然上图，没有HA（high availability）的考虑;</p>
                        <p><img src={require('../../imgs/design/d5.png' )}/></p>
                        <h3 id="Dubbo"><a href="javascript:void(0)" class="anchor">Dubbo</a></h3>
                        <p>dubbo就是为了解决上述问题的：</p>
                        <p>1、使用zk做为服务注册</p>
                        <p>	不用再在server-A上使用硬编码配置server-B/C的ip和地址；如果一个service-provider启动，会自动在zk节点上创建一个临时节点：</p>
                        <p>|-dubbo</p>
                        <p>	 &nbsp;&nbsp;&nbsp;&nbsp;|-appName	</p>
                        <p>	 &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;	|-className</p>
                        <p>	 &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;		|-provider(on watch)</p>
                        <p>大楷是这样，可以自行验证下。</p>
                        <p>2、使用zk作为服务发现</p>
                        <p>	consumer事先不知道有多少服务提供者，它可以向zk订阅服务提供者：</p>
                        <p>|-dubbo</p>
                        <p>	 &nbsp;&nbsp;&nbsp;&nbsp;|-appName	</p>
                        <p>	 &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;	|-className</p>
                        <p>	 &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;		|-consumer</p>
                        <p>所以当provider发生变化时，consumer是能够动态感知的，并及时修改本地服务提供列表。</p>
                        <p>3、使用netty作为异步通信机制</p>
                        <p>NIO可以简单理解为：</p>
                        <p><img src={require('../../imgs/design/d6.png' )}/></p>
                        <p>这里需要做的是，要绑定request与response之间的关系。</p>
                        <p>&nbsp;</p>
                        <h3 id="常见面试题"><a href="javascript:void(0)" class="anchor">常见面试题</a></h3>
                        <p>1、dubbo的设计</p>
                        <p><img src={require('../../imgs/design/d7.png' )}/></p>
                        <p>2、负载均衡有几种？</p>
                        <p>	随机权重</p>
                        <p>	轮询</p>
                        <p>	最快处理</p>
                        <p>	hash</p>
                        <p>4、容错机制有几种？</p>
                        <p>Failover Cluster  自动重试</p>
                        <p>	失败自动切换，当出现失败，重试其它服务器。(缺省)</p>
                        <p>	通常用于读操作，但重试会带来更长延迟。</p>
                        <p>	可通过retries=&quot;2&quot;来设置重试次数(不含第一次)。</p>
                        <p>Failfast Cluster 快速失败</p>
                        <p>	快速失败，只发起一次调用，失败立即报错。</p>
                        <p>	<strong>通常用于非幂等性的写操作，比如新增记录,因为没有做幂等性，如果重试可能会造成重复数据。</strong></p>
                        <p>Failsafe Cluster 失败安全</p>
                        <p>	失败安全，出现异常时，直接忽略。</p>
                        <p>	通常用于记录不重要日志等。</p>
                        <p>Failback Cluster 自动恢复</p>
                        <p>	失败自动恢复，后台记录失败请求，定时重发。</p>
                        <p>	通常用于消息通知操作。</p>
                        <p>Forking Cluster 并行调用</p>
                        <p>	并行调用多个服务器，只要一个成功即返回。</p>
                        <p>	通常用于实时性要求较高的读操作，但需要浪费更多服务资源。</p>
                        <p>	可通过forks=&quot;2&quot;来设置最大并行数。</p>
                        <p>Broadcast Cluster</p>
                        <p>	广播调用所有提供者，逐个调用，任意一台报错则报错。(2.1.0开始支持)</p>
                        <p>	通常用于通知所有提供者更新缓存或日志等本地资源信息。</p>
                        <p>3、dubbo的序列化</p>
                        <p>在dubbo RPC中，同时支持多种序列化方式，例如：</p>
                        <ol>
                            <li>dubbo序列化：阿里尚未开发成熟的高效java序列化实现，阿里不建议在生产环境使用它</li>
                            <li>hessian2序列化：hessian是一种跨语言的高效二进制序列化方式。但这里实际不是原生的hessian2序列化，而是阿里修改过的hessian lite，它是dubbo RPC默认启用的序列化方式</li>
                            <li>json序列化：目前有两种实现，一种是采用的阿里的fastjson库，另一种是采用dubbo中自己实现的简单json库，但其实现都不是特别成熟，而且json这种文本序列化性能一般不如上面两种二进制序列化。</li>
                            <li>java序列化：主要是采用JDK自带的Java序列化实现，性能很不理想。</li>
                        </ol>
                        <p>在通常情况下，这四种主要序列化方式的性能从上到下依次递减。dubbo RPC默认采用hessian2序列化。</p>
                        <p>但hessian是一个比较老的序列化实现了，而且它是跨语言的，所以不是单独针对java进行优化的。而dubbo RPC实际上完全是一种Java to Java的远程调用，其实没有必要采用跨语言的序列化方式。</p>
                        <p>&nbsp;</p>
                        <p>4、如何启用Kryo和FST</p>
                        <p>使用Kryo和FST非常简单，只需要在dubbo RPC的XML配置中添加一个属性即可：</p>
                        <pre><code>&lt;dubbo:protocol name=&quot;dubbo&quot; serialization=&quot;kryo&quot;/&gt;<br/>
                            &lt;dubbo:protocol&nbsp;name=&quot;dubbo&quot;&nbsp;serialization=&quot;fst&quot;/&gt;	<br/>
</code></pre>
                        <p>要让Kryo和FST完全发挥出高性能，最好将那些需要被序列化的类注册到dubbo系统中，例如，我们可以实现如下回调接口：</p>
                        <pre><code>public class SerializationOptimizerImpl implements SerializationOptimizer {this.s}<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;public&nbsp;Collection&lt;Class&gt;&nbsp;getSerializableClasses()&nbsp;{this.s}<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;List&lt;Class&gt;&nbsp;classes&nbsp;=&nbsp;new&nbsp;LinkedList&lt;Class&gt;();<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;classes.add(BidRequest.class);<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;classes.add(BidResponse.class);<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;classes.add(Device.class);<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;classes.add(Geo.class);<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;classes.add(Impression.class);<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;classes.add(SeatBid.class);<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;return&nbsp;classes;<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;}<br/>
}<br/>
</code></pre>
                        <p>然后在XML配置中添加：</p>
                        <pre><code>&lt;dubbo:protocol name=&quot;dubbo&quot; serialization=&quot;kryo&quot; optimizer=&quot;com.alibaba.dubbo.demo.SerializationOptimizerImpl&quot;/&gt;<br/>
</code></pre>
                        <p>在注册这些类后，序列化的性能可能被大大提升，特别针对小数量的嵌套对象的时候。</p>
                        <p>当然，在对一个类做序列化的时候，可能还级联引用到很多类，比如Java集合类。针对这种情况，我们已经自动将JDK中的常用类进行了注册，所以你不需要重复注册它们（当然你重复注册了也没有任何影响），包括：</p>
                        <pre><code>GregorianCalendar、InvocationHandler、BigDecimal、BigInteger、Pattern、BitSet、URI、UUID、HashMap、ArrayList、LinkedList、HashSet、TreeSet、Hashtable、Date、Calendar、ConcurrentHashMap、SimpleDateFormat、Vector、BitSet、StringBuffer、StringBuilder、Object、Object[]、String[]、byte[]、char[]、int[]、float[]、double[]<br/>
</code></pre>
                        <p>由于<strong>注册被序列化的类仅仅是出于性能优化的目的，所以即使你忘记注册某些类也没有关系。事实上，即使不注册任何类，Kryo和FST的性能依然普遍优于hessian和dubbo序列化。</strong></p>
                        <p>&nbsp;</p>
                        <p>4、restful风格</p>
                        <p>	下面是一些例子：</p>
                        <pre><code>GET /zoos：列出所有动物园<br/>
POST&nbsp;/zoos：新建一个动物园<br/>
GET&nbsp;/zoos/ID：获取某个指定动物园的信息<br/>
PUT&nbsp;/zoos/ID：更新某个指定动物园的信息（提供该动物园的全部信息）<br/>
PATCH&nbsp;/zoos/ID：更新某个指定动物园的信息（提供该动物园的部分信息）<br/>
DELETE&nbsp;/zoos/ID：删除某个动物园<br/>
GET&nbsp;/zoos/ID/animals：列出某个指定动物园的所有动物<br/>
DELETE&nbsp;/zoos/ID/animals/ID：删除某个指定动物园的指定动物<br/>
</code></pre>
                        <p>如果是为了方便第三方调用，可以开放rest调用，如果系统内的微服务，我认为不是什么好事，因为restful是基于http架构，如果使用自定义应用协议，反而加大了传输内容。</p>
                        <p>&nbsp;</p>
                        <p>5、定位问题</p>
                        <p>	借助 elk</p>
                        <p>	配置zipkin</p>

                    </Col>
                    <Col span={1}>
                    </Col>
                    <Col span={4}>
                        <Anchor showInkInFixed="true">
                            <Link href="#SOA" title="SOA"/>
                            <Link href="#Dubbo" title="Dubbo"/>
                            <Link href="#常见面试题" title="常见面试题"/>
                        </Anchor>
                    </Col>
                </Row>


            </div>

        );
    }
}

export default Design2;
