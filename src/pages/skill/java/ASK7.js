import React, {Component} from 'react';
import {Anchor, Row, Col} from 'antd';


const {Link} = Anchor;


class ASK7 extends Component {

    s = "{";
    render() {

        return (
            <div>
                <Row>
                    <Col span={19}>
                        <h2 id="一、分布式系统"><a href="javascript:void(0)" class="anchor">一、分布式系统</a></h2>
                        <ol>
                            <li>分布式系统（distributed system）是由多台计算机和通信的软件通过计算机网络连接组成（本地局域网或者广域网）。</li>
                            <li>分布式系统是建立在网络之上的软件系统。正式因为软件的特性，所以分布式系统具有高度的内聚性和透明性。</li>
                            <li>网络和分布式系统之间的区别更多的在于高层软件（特别是操作系统），而不是硬件。分布式系统可以应用在不通的平台上如：PC，工作站、局域网和广域网上。</li>
                        </ol>
                        <h2 id="二、分布式计算的优点"><a href="javascript:void(0)" class="anchor">二、分布式计算的优点</a></h2>
                        <ol>
                            <li>可靠性、高容错性。</li>
                        </ol>
                        <p>一台服务器的系统崩溃不会影响到其他的服务器。</p>
                        <ol start='2' >
                            <li>可扩展性</li>
                        </ol>
                        <p>在分布式计算系统可以根据需要增加更多的机器。</p>
                        <ol start='3' >
                            <li>灵活性</li>
                        </ol>
                        <p>他可以很容易的安装、实施和调试新的服务。</p>
                        <ol start='4' >
                            <li>计算速度快</li>
                        </ol>
                        <p>分布式计算机系统可以有多台计算机的计算能力，使得比其它系统有更快的处理速度。</p>
                        <ol start='5' >
                            <li>开放性</li>
                        </ol>
                        <p>由于他是开放的系统，本地和远程都可以访问到该服务。</p>
                        <ol start='6' >
                            <li>高性能</li>
                        </ol>
                        <p>相较于集中式计算机网络集群可以提供更高的性能，及更好的性价比。</p>
                        <p>&nbsp;</p>
                        <h2 id="三、分布式计算机的缺点"><a href="javascript:void(0)" class="anchor">三、分布式计算机的缺点</a></h2>
                        <ol>
                            <li>故障排除难度高</li>
                        </ol>
                        <p>由于分布在多台服务器上，故障排除和诊断问题难度较高。</p>
                        <ol start='2' >
                            <li>网络基础设施成本高</li>
                        </ol>
                        <p>网络基础设置问题，包括传输、高负载、信息丢失问题。</p>
                        <ol start='3' >
                            <li>安全性问题</li>
                        </ol>
                        <p>开放式系统的特性让分布式计算机系统存在着数据的安全性和共享的风险问题。</p>
                        <ol start='4' >
                            <li>分布式事务问题</li>
                        </ol>
                        <p>&nbsp;</p>
                        <h2 id="如何实现一个分布式RPC框架"><a href="javascript:void(0)" class="anchor">如何实现一个分布式RPC框架</a></h2>
                        <h3 id=" 序列化与反序列化"><a href="javascript:void(0)" class="anchor"> 序列化与反序列化</a></h3>
                        <p>	在网络中，所有的数据都将会被转化为字节进行传送，所以在代码层面上，一个RPC框架需要实现特定格式的数据与字节数组之间的相互转化。像Java已经提供了默认的序列化方式，但是如果是在高并发的场景下，使用Java原生的序列化方式可能会遇到性能瓶颈。于是，出现了许多开源的、高效的序列化框架：如Kryo、fastjson和Protobuf等。 </p>
                        <h3 id="TCP拆包、粘包"><a href="javascript:void(0)" class="anchor">TCP拆包、粘包</a></h3>
                        <p>由于TCP只关心字节流，并不知晓上层的数据格式。如果客户端应用层一次要发送的数据过大时，TCP会将该数据进行分解传送，因此在服务端需要进行粘包处理（由TCP来保证数据的有序性）；如果客户端一次要发送的数据量很小时，TCP并不会马上把数据发送出去，而是将其存储在缓冲区，当达到某个阈值的时候再发送出去，因此在服务端需要进行拆包的工作。</p>
                        <p>通过以上分析，我们了解了TCP粘包或者拆包的原因，解决这个问题的关键在于向数据包添加边界信息，常用的方法有如下三个。</p>
                        <ul>
                            <li>发送端给每个数据包添加包首部，首部中至少包含数据包的长度，这样在接收端接收到数据时，通过读取首部的长度信息得到该数据包有效数据的长度。</li>
                            <li>发送端将每个数据包封装为固定长度（多余用0填充），这样接收端在接收到数据后根据约定好的固定长度读取每个数据包的数据。</li>
                            <li>使用特殊符号将每个数据包区分开来，接收端也是通过该特殊符号的划分数据包的边界。</li>
                        </ul>
                        <p>&nbsp;</p>
                        <h3 id="BIO与NIO"><a href="javascript:void(0)" class="anchor">BIO与NIO</a></h3>
                        <p>BIO往往用于经典的每连接每线程模型，之所以使用多线程，是因为像accept()、read()和write()等函数都是同步阻塞的，这意味着当应用为单线程且进行IO操作时，如果线程阻塞那么该应用必然会进入挂死状态，但是实际上此时CPU是处于空闲状态的。开启多线程，就可以让CPU去为更多的线程服务，提高CPU的利用率。但是在活跃线程数较多的情况下，采用多线程模型回带来如下几个问题。</p>
                        <ul>
                            <li>线程的创建和销毁代价颇高，在Linux操作系统中，线程本质上就是一个进程，创建和销毁线程属于重量级的操作。</li>
                            <li>在JVM中，每个线程会占用固定大小的栈空间，而JVM的内存空间是有限的，因此如果线程数量过多那么线程本身就会占据过多的资源。</li>
                            <li>线程的切换成本较高，每次线程切换需要涉及上下文的保存、恢复以及用户态和内核态的切换。如果线程数过多，那么会有较大比例的<code>CPU</code>时间花费在线程切换上。</li>
                        </ul>
                        <p>使用线程池的方式解决前两个问题，但是线程切换带来的开销还是存在。所以在高并发的场景下，传统的BIO是无能为力的。而NIO的重要特点是：读、写、注册和接收函数，在等待就绪阶段都是非阻塞的，可以立即返回，这就允许我们不使用多线程充分利用CPU。如果一个连接不能读写，可以把这个事件记录下来，然后切换到别的就绪的连接进行数据读写。使用Netty来编写结构更加清晰的NIO程序。</p>
                        <p>&nbsp;</p>
                        <h3 id="服务注册与发现"><a href="javascript:void(0)" class="anchor">服务注册与发现</a></h3>
                        <p>在实际应用中，RPC服务的提供者往往需要使用集群来保证服务的稳定性与可靠性。因此需要实现一个服务注册中心，服务提供者将当前可用的服务地址信息注册至注册中心，而客户端在进行远程调用时，先通过服务注册中心获取当前可用的服务列表，然后获取具体的服务提供者的地址信息（该阶段可以进行负载均衡），根据地址信息向服务提供者发起调用。客户端可以缓存可用服务列表，当注册中心的服务列表发生变更时需要通知客户端。同时，当服务提供者变为不可用状态时也需要通知注册中心服务不可用。使用ZooKeeper实现服务注册与发现功能。</p>
                        <p>&nbsp;</p>
                        <p>参考 <a href='https://github.com/tinylcy/buddha' target='_blank' >https://github.com/tinylcy/buddha</a></p>


                    </Col>
                    <Col span={1}>
                    </Col>
                    <Col span={4}>
                         <Anchor showInkInFixed="true">
                                 <Link href="#一、分布式系统" title="一、分布式系统"/>
                                 <Link href="#二、分布式计算的优点" title="二、分布式计算的优点"/>
                                 <Link href="#三、分布式计算机的缺点" title="三、分布式计算机的缺点"/>
                                 <Link href="#如何实现一个分布式RPC框架" title="如何实现一个分布式RPC框架">
                                 <Link href="# 序列化与反序列化" title=" 序列化与反序列化"/>
                                 <Link href="#TCP拆包、粘包" title="TCP拆包、粘包"/>
                                 <Link href="#BIO与NIO" title="BIO与NIO"/>
                                     <Link href="#服务注册与发现" title="服务注册与发现"/>
                                 </Link>
                         </Anchor>
                    </Col>
                </Row>


            </div>

        );
    }
}

export default ASK7;
