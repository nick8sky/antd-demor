import React, {Component} from 'react';
import {Anchor, Row, Col} from 'antd';


const {Link} = Anchor;


class ZK1 extends Component {

    s = "{";
    render() {

        return (
            <div>
                <Row>
                    <Col span={19}>
                        <p>Zookeeper 作为一个分布式的服务框架，主要用来解决分布式集群中应用系统的一致性问题，它能提供基于类似于文件系统的目录节点树方式的数据存储，但是 Zookeeper 并不是用来专门存储数据的，它的作用主要是用来维护和监控你存储的数据的状态变化。通过监控这些数据状态的变化，从而可以达到基于数据的集群管理。</p>
                        <h3 id="ZAB协议"><a href="javascript:void(0)" class="anchor">ZAB协议</a></h3>
                        <p>ZooKeeper并没有完全采用Paxos算法，而是使用了一种称为ZooKeeper Atomic Broadcast(ZAB,zookeeper原子消息广播协议)的协议作为其数据一致性的核心算法。</p>
                        <p>选择Leader需用半数通过才选举成成功，同时集群中已经有过半的机器与该Leader服务器完成状态同步（数据同步）才能开始服务。</p>
                        <p>所有事务请求必须由一个全局唯一的服务器来协调处理，这样的服务器称为Leader服务器，而余下的其他服务器则成为Follower服务器。Leader服务器负责将一个客户端事务请求转换成一个事务Proposal(提议)，并将该Proposal分发给集群中所有的Follower服务器。之后Leader服务器需要等待所有Follower服务器的反馈，一旦超过半数的Follower服务器进行了正确反馈后，那么Leader就会再次向所有的Follower服务器分发Commit消息，要求其将前一个Proposal进行提交。</p>
                        <p>&nbsp;</p>
                        <h3 id="zoo.cfg"><a href="javascript:void(0)" class="anchor">zoo.cfg</a></h3>
                        <pre><code>tickTime=2000 <br/>
dataDir=D:/devtools/zookeeper-3.2.2/build&nbsp;<br/>
clientPort=2181<br/>
</code></pre>
                        <ul>
                            <li>tickTime：这个时间是作为 Zookeeper 服务器之间或客户端与服务器之间维持心跳的时间间隔，也就是每个 tickTime 时间就会发送一个心跳。</li>
                            <li>dataDir：顾名思义就是 Zookeeper 保存数据的目录，默认情况下，Zookeeper 将写数据的日志文件也保存在这个目录里。</li>
                            <li>clientPort：这个端口就是客户端连接 Zookeeper 服务器的端口，Zookeeper 会监听这个端口，接受客户端的访问请求。</li>
                        </ul>
                        <pre><code>initLimit=5 <br/>
syncLimit=2&nbsp;<br/>
server.1=192.168.211.1:2888:3888&nbsp;<br/>
server.2=192.168.211.2:2888:3888<br/>
</code></pre>
                        <p>上面一个是单机配置，下面一个是集群配置</p>
                        <ul>
                            <li>initLimit：这个配置项是用来配置 Zookeeper 接受客户端（这里所说的客户端不是用户连接 Zookeeper 服务器的客户端，而是 Zookeeper 服务器集群中连接到 Leader 的 Follower 服务器）初始化连接时最长能忍受多少个心跳时间间隔数。当已经超过 10 个心跳的时间（也就是 tickTime）长度后 Zookeeper 服务器还没有收到客户端的返回信息，那么表明这个客户端连接失败。总的时间长度就是 5*2000=10 秒</li>
                            <li>syncLimit：这个配置项标识 Leader 与 Follower 之间发送消息，请求和应答时间长度，最长不能超过多少个 tickTime 的时间长度，总的时间长度就是 2*2000=4 秒</li>
                            <li>server.A=B：C：D：其中 A 是一个数字，表示这个是第几号服务器；B 是这个服务器的 ip 地址；<strong>C 表示的是这个服务器与集群中的 Leader 服务器交换信息的端口</strong>；D 表示的是万一集群中的 Leader 服务器挂了，需要一个端口来重新进行选举，选出一个新的 Leader，而<strong>D这个端口就是用来执行选举时服务器相互通信的端口</strong>。如果是伪集群的配置方式，由于 B 都是一样，所以不同的 Zookeeper 实例通信端口号不能一样，所以要给它们分配不同的端口号。</li>
                        </ul>
                        <p>&nbsp;</p>
                        <h4 id="myid"><a href="javascript:void(0)" class="anchor">myid</a></h4>
                        <p>除了修改 zoo.cfg 配置文件，集群模式下还要配置一个文件 myid，这个文件在 dataDir 目录下，这个文件里面就有一个数据就是 A 的值，Zookeeper 启动时会读取这个文件，拿到里面的数据与 zoo.cfg 里面的配置信息比较从而判断到底是那个 server。</p>
                        <h3 id="节点类型"><a href="javascript:void(0)" class="anchor">节点类型</a></h3>
                        <p>ZooKeeper 节点是有生命周期的，这取决于节点的类型。在 ZooKeeper 中，节点类型可以分为持久节点（PERSISTENT ）、临时节点（EPHEMERAL），以及时序节点（SEQUENTIAL ），具体在节点创建过程中，一般是组合使用，可以生成以下 4 种节点类型。</p>
                        <h4 id="持久节点（PERSISTENT）"><a href="javascript:void(0)" class="anchor">持久节点（PERSISTENT）</a></h4>
                        <p>所谓持久节点，是指在节点创建后，就一直存在，直到有删除操作来主动清除这个节点——不会因为创建该节点的客户端会话失效而消失。</p>
                        <h4 id="持久顺序节点（PERSISTENT_SEQUENTIAL）"><a href="javascript:void(0)" class="anchor">持久顺序节点（PERSISTENT_SEQUENTIAL）</a></h4>
                        <p>这类节点的基本特性和上面的节点类型是一致的。额外的特性是，在ZK中，每个父节点会为他的第一级子节点维护一份时序，会记录每个子节点创建的先后顺序。基于这个特性，在创建子节点的时候，可以设置这个属性，那么在创建节点过程中，ZK会自动为给定节点名加上一个数字后缀，作为新的节点名。这个数字后缀的范围是整型的最大值。</p>
                        <h4 id="临时节点（EPHEMERAL）"><a href="javascript:void(0)" class="anchor">临时节点（EPHEMERAL）</a></h4>
                        <p>和持久节点不同的是，临时节点的生命周期和客户端会话绑定。也就是说，如果客户端会话失效，那么这个节点就会自动被清除掉。注意，这里提到的是会话失效，而非连接断开。另外，<strong>在临时节点下面不能创建子节点</strong>。</p>
                        <h4 id="临时顺序节点（EPHEMERAL_SEQUENTIAL）"><a href="javascript:void(0)" class="anchor">临时顺序节点（EPHEMERAL_SEQUENTIAL）</a></h4>
                        <p>&nbsp;</p>
                        <p>&nbsp;</p>
                        <h3 id="数据模型"><a href="javascript:void(0)" class="anchor">数据模型</a></h3>
                        <p>Zookeeper 会维护一个具有层次关系的数据结构，它非常类似于一个标准的文件系统</p>
                        <p><img src='https://gitee.com/nick070809/pics/raw/master/zk/1.gif' alt='' /></p>
                        <p>Zookeeper 这种数据结构有如下这些特点：</p>
                        <ol>
                            <li>每个子目录项如 NameService 都被称作为 znode(一般也为项目名称)，这个 znode 是被它所在的路径唯一标识，如 Server1 这个 znode 的标识为 /NameService/Server1</li>
                            <li>znode 可以有子节点目录，并且每个 znode 可以存储数据，注意 EPHEMERAL 类型的目录节点不能有子节点目录</li>
                            <li>znode 是有版本的，每个 znode 中存储的数据可以有多个版本，也就是一个访问路径中可以存储多份数据</li>
                            <li>znode 可以是临时节点，一旦创建这个 znode 的客户端与服务器失去联系，这个 znode 也将自动删除，Zookeeper 的客户端和服务器通信采用长连接方式，每个客户端和服务器通过心跳来保持连接，这个连接状态称为 session，如果 znode 是临时节点，这个 session 失效，znode 也就删除了</li>
                            <li>znode 的目录名可以自动编号，如 App1 已经存在，再创建的话，将会自动命名为 App2</li>
                            <li>znode 可以被监控，包括这个目录节点中存储的数据的修改，子节点目录的变化等，一旦变化可以通知设置监控的客户端，这个是 Zookeeper 的核心特性，Zookeeper 的很多功能都是基于这个特性实现的。</li>
                        </ol>
                        <p>&nbsp;</p>
                        <h3 id="基本操作"><a href="javascript:void(0)" class="anchor">基本操作</a></h3>
                        <pre><code>// 创建一个与服务器的连接<br/>
ZooKeeper&nbsp;zk&nbsp;=&nbsp;new&nbsp;ZooKeeper(&quot;localhost:&quot;&nbsp;+&nbsp;CLIENT_PORT,&nbsp;<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;ClientBase.CONNECTION_TIMEOUT,&nbsp;new&nbsp;Watcher()&nbsp;{this.s}&nbsp;<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;//&nbsp;监控所有被触发的事件<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;public&nbsp;void&nbsp;process(WatchedEvent&nbsp;event)&nbsp;{this.s}&nbsp;<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;System.out.println(&quot;已经触发了&quot;&nbsp;+&nbsp;event.getType()&nbsp;+&nbsp;&quot;事件！&quot;);&nbsp;<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}&nbsp;<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;});&nbsp;<br/>
//&nbsp;创建一个目录节点<br/>
zk.create(&quot;/testRootPath&quot;,&nbsp;&quot;testRootData&quot;.getBytes(),&nbsp;Ids.OPEN_ACL_UNSAFE,<br/>
                            &nbsp;&nbsp;CreateMode.PERSISTENT);&nbsp;<br/>
//&nbsp;创建一个子目录节点<br/>
zk.create(&quot;/testRootPath/testChildPathOne&quot;,&nbsp;&quot;testChildDataOne&quot;.getBytes(),<br/>
                            &nbsp;&nbsp;Ids.OPEN_ACL_UNSAFE,CreateMode.PERSISTENT);&nbsp;<br/>
System.out.println(new&nbsp;String(zk.getData(&quot;/testRootPath&quot;,false,null)));&nbsp;<br/>
//&nbsp;取出子目录节点列表<br/>
System.out.println(zk.getChildren(&quot;/testRootPath&quot;,true));&nbsp;<br/>
//&nbsp;修改子目录节点数据<br/>
zk.setData(&quot;/testRootPath/testChildPathOne&quot;,&quot;modifyChildDataOne&quot;.getBytes(),-1);&nbsp;<br/>
System.out.println(&quot;目录节点状态：[&quot;+zk.exists(&quot;/testRootPath&quot;,true)+&quot;]&quot;);&nbsp;<br/>
//&nbsp;创建另外一个子目录节点<br/>
zk.create(&quot;/testRootPath/testChildPathTwo&quot;,&nbsp;&quot;testChildDataTwo&quot;.getBytes(),&nbsp;<br/>
                            &nbsp;&nbsp;Ids.OPEN_ACL_UNSAFE,CreateMode.PERSISTENT);&nbsp;<br/>
System.out.println(new&nbsp;String(zk.getData(&quot;/testRootPath/testChildPathTwo&quot;,true,null)));&nbsp;<br/>
//&nbsp;删除子目录节点<br/>
zk.delete(&quot;/testRootPath/testChildPathTwo&quot;,-1);&nbsp;<br/>
zk.delete(&quot;/testRootPath/testChildPathOne&quot;,-1);&nbsp;<br/>
//&nbsp;删除父目录节点<br/>
zk.delete(&quot;/testRootPath&quot;,-1);&nbsp;<br/>
//&nbsp;关闭连接<br/>
zk.close();<br/>
</code></pre>
                        <p>&nbsp;</p>
                        <h2 id="ZooKeeper 典型的应用场景"><a href="javascript:void(0)" class="anchor">ZooKeeper 典型的应用场景</a></h2>
                        <p>Zookeeper 从设计模式角度来看，是一个基于观察者模式设计的分布式服务管理框架，它负责存储和管理大家都关心的数据，然后接受观察者的注册，一旦这些数据的状态发生变化，Zookeeper 就将负责通知已经在 Zookeeper 上注册的那些观察者做出相应的反应，从而实现集群中类似 Master/Slave 管理模式。</p>
                        <p>&nbsp;</p>
                        <h3 id="统一命名服务（Name Service）"><a href="javascript:void(0)" class="anchor">统一命名服务（Name Service）</a></h3>
                        <p>分布式应用中，通常需要有一套完整的命名规则，既能够产生唯一的名称又便于人识别和记住，通常情况下用树形的名称结构是一个理想的选择，树形的名称结构是一个有层次的目录结构，既对人友好又不会重复。说到这里你可能想到了 JNDI，没错 Zookeeper 的 Name Service 与 JNDI 能够完成的功能是差不多的，它们都是将有层次的目录结构关联到一定资源上，但是 Zookeeper 的 Name Service 更加是广泛意义上的关联，也许你并不需要将名称关联到特定资源上，你可能只需要一个不会重复名称，就像数据库中产生一个唯一的数字主键一样。</p>
                        <p>Name Service 已经是 Zookeeper 内置的功能，你只要调用 Zookeeper 的 API 就能实现。如调用 create 接口就可以很容易创建一个目录节点。</p>
                        <p>&nbsp;</p>
                        <h3 id="配置管理（Configuration Management）"><a href="javascript:void(0)" class="anchor">配置管理（Configuration Management）</a></h3>
                        <p>配置的管理在分布式应用环境中很常见，例如同一个应用系统需要多台 PC Server 运行，但是它们运行的应用系统的某些配置项是相同的，如果要修改这些相同的配置项，那么就必须同时修改每台运行这个应用系统的 PC Server，这样非常麻烦而且容易出错。</p>
                        <p>像这样的配置信息完全可以交给 Zookeeper 来管理，将配置信息保存在 Zookeeper 的某个目录节点中，然后将所有需要修改的应用机器监控配置信息的状态，一旦配置信息发生变化，每台应用机器就会收到 Zookeeper 的通知，然后从 Zookeeper 获取新的配置信息应用到系统中。</p>
                        <p><img src='https://gitee.com/nick070809/pics/raw/master/zk/2.gif' alt='' /></p>
                        <h3 id="Master/Slave（Group Membership）"><a href="javascript:void(0)" class="anchor">Master/Slave（Group Membership）</a></h3>
                        <p>Zookeeper 能够很容易的实现集群管理的功能，如有多台 Server 组成一个服务集群，那么必须要一个“总管”知道当前集群中每台机器的服务状态，一旦有机器不能提供服务，集群中其它集群必须知道，从而做出调整重新分配服务策略。同样当增加集群的服务能力时，就会增加一台或多台 Server，同样也必须让“总管”知道。</p>
                        <p>Zookeeper 不仅能够帮你维护当前的集群中机器的服务状态，而且能够帮你选出一个“总管”，让这个总管来管理集群，这就是 Zookeeper 的另一个功能 Leader Election。</p>
                        <h4 id="服务注册与离开"><a href="javascript:void(0)" class="anchor">服务注册与离开</a></h4>
                        <p>1、创建一个项目名称(如appX)的目录，作为父目录，并设置watch</p>
                        <p>2、每个服务启动后向项目appX下创建临时(EPHEMERAL)节点,可以为服务所在的ip, 当服务离开时，其他的服务通过watch推送的消息，就知道有服务离开了；同理，当有服务加进来，其他服务也能知道新机器进来了。</p>
                        <h4 id="服务的选主"><a href="javascript:void(0)" class="anchor">服务的选主</a></h4>
                        <p>有的时候，我们只需要一台服务作为主来提供服务，其他的作为standby模式。</p>
                        <p>和前面的一样每台 服务启动 创建一个 EPHEMERAL 目录节点，不同的是它还是一个 SEQUENTIAL 目录节点，所以它是个 EPHEMERAL_SEQUENTIAL 目录节点。之所以它是 EPHEMERAL_SEQUENTIAL 目录节点，是因为我们可以给每台 Server 编号，我们可以选择当前是最小编号的 Server 为 Master，假如这个最小编号的 服务离去，由于是 EPHEMERAL 节点，离去的 服务 对应的节点也被删除，所以当前的节点列表中又出现一个最小编号的节点，我们就选择这个节点为当前 Master。这样就实现了动态选择 Master，避免了传统意义上单 Master 容易出现单点故障的问题。</p>
                        <h3 id="分布式锁（Locks）"><a href="javascript:void(0)" class="anchor">分布式锁（Locks）</a></h3>
                        <p>竞锁在同一个进程中很容易实现，但是在跨进程或者在不同 Server 之间就不好实现了。Zookeeper 却很容易实现这个功能，实现方式也是需要获得锁的 Server 创建一个 EPHEMERAL_SEQUENTIAL 目录节点，然后调用 getChildren方法获取当前的目录节点列表中最小的目录节点是不是就是自己创建的目录节点，如果正是自己创建的，那么它就获得了这个锁，如果不是那么它就调用 exists(String path, boolean watch) 方法并监控 Zookeeper 上目录节点列表的变化，<strong>一直到自己创建的节点是列表中最小编号的目录节点，从而获得锁，释放锁很简单，只要删除前面它自己所创建的目录节点就行了。</strong></p>
                        <p>&nbsp;</p>
                        <h2 id="部分代码"><a href="javascript:void(0)" class="anchor">部分代码</a></h2>
                        <h3 id="网络通信"><a href="javascript:void(0)" class="anchor">网络通信</a></h3>
                        <p><img src='https://images2015.cnblogs.com/blog/616953/201702/616953-20170228092333829-386950384.png' alt='' /></p>
                        <p>	Stats，表示ServerCnxn上的统计数据。</p>
                        <p>　　Watcher，表示时间处理器。</p>
                        <p>　　ServerCnxn，表示服务器连接，表示一个从客户端到服务器的连接。</p>
                        <p>　　NettyServerCnxn，基于Netty的连接的具体实现。</p>
                        <p>　　NIOServerCnxn，基于NIO的连接的具体实现。</p>
                        <h3 id="ServerCnxn"><a href="javascript:void(0)" class="anchor">ServerCnxn</a></h3>
                        <p>ServerCnxn为抽象类，其继承Stats和Watcher两个接口，表示客户端到服务端的连接。</p>
                        <pre><code>public abstract class ServerCnxn implements Stats, Watcher {this.s}}<br/>
</code></pre>
                        <p>ServerCnxn包含了两个异常类，用于表示在连接中发生的异常情况。</p>
                        <p>ServerCnxn类维护了很多属性，主要是服务器的统计信息和和命令行信息。</p>
                        <h4 id="函数分析"><a href="javascript:void(0)" class="anchor">函数分析</a></h4>
                        <pre><code>    // 获取会话超时时间<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;abstract&nbsp;int&nbsp;getSessionTimeout();<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;//&nbsp;关闭<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;abstract&nbsp;void&nbsp;close();<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;//&nbsp;发送响应<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;public&nbsp;abstract&nbsp;void&nbsp;sendResponse(ReplyHeader&nbsp;h,&nbsp;Record&nbsp;r,&nbsp;String&nbsp;tag)<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;throws&nbsp;IOException;<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;/*&nbsp;notify&nbsp;the&nbsp;client&nbsp;the&nbsp;session&nbsp;is&nbsp;closing&nbsp;and&nbsp;close/cleanup&nbsp;socket&nbsp;*/<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;//&nbsp;关闭会话<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;abstract&nbsp;void&nbsp;sendCloseSession();<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;//&nbsp;处理，Watcher接口中的方法<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;public&nbsp;abstract&nbsp;void&nbsp;process(WatchedEvent&nbsp;event);<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;//&nbsp;获取会话id<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;abstract&nbsp;long&nbsp;getSessionId();<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;//&nbsp;设置会话id<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;abstract&nbsp;void&nbsp;setSessionId(long&nbsp;sessionId);<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;//&nbsp;设置缓冲<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;abstract&nbsp;void&nbsp;sendBuffer(ByteBuffer&nbsp;closeConn);<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;//&nbsp;允许接收<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;abstract&nbsp;void&nbsp;enableRecv();<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;//&nbsp;不允许接收<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;abstract&nbsp;void&nbsp;disableRecv();<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;//&nbsp;设置会话超时时间<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;abstract&nbsp;void&nbsp;setSessionTimeout(int&nbsp;sessionTimeout);<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;//&nbsp;获取服务器的统计数据<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;protected&nbsp;abstract&nbsp;ServerStats&nbsp;serverStats();<br/>
</code></pre>
                        <h3 id="NIOServerCnxn"><a href="javascript:void(0)" class="anchor">NIOServerCnxn</a></h3>
                        <pre><code>public class NIOServerCnxn extends ServerCnxn {this.s}}<br/>
</code></pre>
                        <p>NIOServerCnxn继承了ServerCnxn抽象类，使用NIO来处理与客户端之间的通信，使用单线程处理。</p>
                        <h4 id="内部类SendBufferWriter"><a href="javascript:void(0)" class="anchor">内部类SendBufferWriter</a></h4>
                        <p>该类用来将给客户端的响应进行分块，其核心方法是checkFlush方法，当需要强制发送时，sb缓冲中只要有内容就会同步发送，或者是当sb的大小超过2048（块）时就需要发送，其会调用NIOServerCnxn的sendBufferSync方法，该之后会进行分析，然后再清空sb缓冲。</p>
                        <p>&nbsp;</p>
                        <h4 id="内部类CommandThread类"><a href="javascript:void(0)" class="anchor">内部类CommandThread类</a></h4>
                        <p>该类用于处理ServerCnxn中的定义的命令，其主要逻辑定义在commandRun方法中，在子类中各自实现，这是一种典型的工厂方法，每个子类对应着一个命令，每个命令使用单独的线程进行处理。</p>
                        <p>NIOServerCnxn维护了服务器与客户端之间的Socket通道、用于存储传输内容的缓冲区、会话ID、ZooKeeper服务器等。</p>

                    </Col>
                    <Col span={1}>
                    </Col>
                    <Col span={4}>
                        <Anchor showInkInFixed="true">
                            <Link href="#ZAB协议" title="ZAB协议"/>
                            <Link href="#zoo.cfg" title="zoo.cfg">
                            <Link href="#myid" title="myid"/>
                            </Link>
                            <Link href="#节点类型" title="节点类型">
                            <Link href="#持久节点（PERSISTENT）" title="持久节点（PERSISTENT）"/>
                            <Link href="#持久顺序节点（PERSISTENT_SEQUENTIAL）" title="持久顺序节点（PERSISTENT_SEQUENTIAL）"/>
                            <Link href="#临时节点（EPHEMERAL）" title="临时节点（EPHEMERAL）"/>
                            <Link href="#临时顺序节点（EPHEMERAL_SEQUENTIAL）" title="临时顺序节点（EPHEMERAL_SEQUENTIAL）"/>
                            </Link>
                            <Link href="#数据模型" title="数据模型"/>
                            <Link href="#基本操作" title="基本操作"/>
                            <Link href="#ZooKeeper 典型的应用场景" title="ZooKeeper 典型的应用场景">
                            <Link href="#统一命名服务（Name Service）" title="统一命名服务（Name Service）"/>
                            <Link href="#配置管理（Configuration Management）" title="配置管理（Configuration Management）"/>
                            <Link href="#Master/Slave（Group Membership）" title="Master/Slave（Group Membership）">
                            <Link href="#服务注册与离开" title="服务注册与离开"/>
                            <Link href="#服务的选主" title="服务的选主"/>
                            </Link>
                            <Link href="#分布式锁（Locks）" title="分布式锁（Locks）"/>
                            </Link>
                            <Link href="#部分代码" title="部分代码">
                            <Link href="#网络通信" title="网络通信"/>
                            <Link href="#ServerCnxn" title="ServerCnxn">
                            <Link href="#函数分析" title="函数分析"/>
                            </Link>
                            <Link href="#NIOServerCnxn" title="NIOServerCnxn">
                            <Link href="#内部类SendBufferWriter" title="内部类SendBufferWriter"/>
                            <Link href="#内部类CommandThread类" title="内部类CommandThread类"/>
                            </Link>
                            </Link>
                        </Anchor>
                    </Col>
                </Row>


            </div>

        );
    }
}

export default ZK1;
