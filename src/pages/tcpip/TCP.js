import React, { Component } from 'react';

class ARP extends Component {
    render() {
        return (
            <div>
                <h2>传输控制协议 TCP</h2>
                <p>网络由下往上分为</p>
                <p>　　物理层、数据链路层、网络层、传输层、会话层、表示层和应用层。</p>
                <p>　　IP协议对应于网络层，，TPC/IP协议是传输层协议，主要解决数据如何在网络中传输，而HTTP是应用层协议，主要解决如何包装数据。</p>
                <p>Socket是对TCP/IP协议的抽象，一些最基本的函数接口，比如create、listen、connect、accept、send、read和write等等。</p>
                <p>ACK (Acknowledgement）即是确认字符，在数据通信中，接收方发给发送方的一种传输类控制字符。表示发来的数据已确认接收无误。</p>
                <p><strong>TCP连接的三次握手</strong></p>
                {/*<p><img src={require('../../img/1519113030758.jpg')} style={{height:"40%",width:"40%"}}/></p>*/}

                <p><img src="http://i4.bvimg.com/633340/6fddb33865f640d9.jpg" style={{height:"40%",width:"40%"}}/></p>
                <p>&nbsp;</p>
                <p>首先Client端发送连接请求报文，Server端接受连接后回复ACK报文，并为这次连接分配资源。Client端接收到ACK报文后也向Server段发送ACK报文，并分配资源，这样TCP连接就建立了。
                    Seq+ack+ack</p>
                <p>位码即tcp标志位，有6种标示：<strong>SYN</strong>(synchronous建立联机) ACK(acknowledgement 确认) PSH(push传送) <strong>FIN</strong>(finish结束) RST(reset重置) URG(urgent紧急)Sequence number(顺序号码) Acknowledge number(确认号码)</p>
                <p>第一次握手：主机A发送位码为syn＝1，随机产生seq number=1234567的数据包到服务器，主机B由SYN=1知道，A要求建立联机；</p>
                <p>第二次握手：主机B收到请求后要确认联机信息，向A发送ack number=(主机A的seq+1)，syn=1，ack=1，随机产生seq=7654321的包；</p>
                <p>第三次握手：主机A收到后检查ack number是否正确，即第一次发送的seq number+1，以及位码ack是否为1，若正确，主机A会再发送ack number=(主机B的seq+1)，ack=1，主机B收到后确认seq值与ack=1则连接建立成功。</p>
                <p>&nbsp;</p>
                <p><strong>TCP连接的四次握手</strong></p>
               {/* <p><img src={require('../../img/1519113303153.jpg')} style={{height:"35%",width:"35%"}}/></p>*/}

                <p><img src=" http://i4.bvimg.com/633340/a13d275f3b5504ef.jpg" style={{height:"35%",width:"35%"}}/></p>
                <p>假设Client端发起中断连接请求，也就是发送FIN报文(继续发送未发送完的数据)。Server端接到FIN报文后，先发送ACK(确认)。这个时候Client端就进入FIN_WAIT状态，继续等待Server端的FIN报文。Server端确定数据已发送完成，则向Client端发送FIN报文； Client端收到FIN报文后，向服务端发送ACK后进入TIME_WAIT状态，如果Server端没有收到ACK则可以重发FIN报文。Server端收到ACK后， Client端等待了(30s,2分钟)后依然没有收到FIN报文，则证明Server端已正常关闭， Client端也可以关闭连接。</p>
                <p>Fin+ack+fin+ack</p>
                <p>&nbsp;</p>
                <h3>TCP报文格式</h3>
                {/*<p><img src={require('../../img/1519113452507.jpg')} style={{height:"70%",width:"70%"}}/></p>*/}

                <p><img src="http://i4.bvimg.com/633340/0a9a62263da701f7.jpg" style={{height:"70%",width:"70%"}}/></p>
                <p>&gt;TCP的包是没有IP地址的，那是IP层上的事，但是有源端口和目标端口。</p>
                <p>&gt;Sequence Number是包的序号，用来解决网络包乱序（reordering）问题。</p>
                <p>&gt;Acknowledgement Number就是ACK——用于确认收到，用来解决不丢包的问题。</p>
                <p>&gt;Window又叫Advertised-Window，也就是著名的滑动窗口（Sliding Window），用于解决流控的。</p>
                <p>&gt;TCP Flag ，也就是包的类型，主要是用于操控TCP的状态机的</p>
                <p>&nbsp;</p>
                <p><strong>TCP的状态机</strong></p>
                <p>其实，<strong>网络上的传输是没有实时连接的，包括TCP也是一样的。而TCP所谓的“连接”，其实只不过是在通讯的双方维护一个“连接状态”，让它看上去好像有连接一样。所以，TCP的状态变换是非常重要的。</strong></p>
                <p>为什么建立链接要3次握手，断开链接需要4次挥手？</p>
                <p>对于建立链接的3次握手，主要是要初始化Sequence Number 的初始值。通信的双方要互相通知对方自己的初始化的Sequence Number（——所以叫SYN，全称Synchronize Sequence Numbers。这个号要作为以后的数据通信的序号，以<strong>保证应用层接收到的数据不会因为网络上的传输的问题而乱序。</strong></p>
                <p>如果使用keep-alive则以后的链接都会带上这个Sequence Number。</p>
                <p>对于4次挥手，因为TCP是全双工的，所以，发送方和接收方都需要Fin和Ack。只不过，有一方是被动的，所以看上去就成了所谓的4次挥手。如果两边同时断连接，那就会就进入到CLOSING状态，然后到达TIME_WAIT状态。下图是双方同时断连接的示意图：</p>
               {/* <p><img src={require('../../img/1519113851296.jpg')} style={{height:"45%",width:"45%"}}/></p>*/}

                <p><img src="http://i4.bvimg.com/633340/5774993d6db291bc.jpg" style={{height:"70%",width:"70%"}}/></p>
                <p>另外，有几个事情需要注意一下：</p>
                <p>&gt;关于建立连接时SYN超时。试想一下，如果server端接到了clien发的SYN后回了SYN-ACK后 client掉线了，server端没有收到client回来的ACK，那么，这个连接处于一个中间状态，即没成功，也没失败。于是，server端如果在一定时间内没有收到的TCP会重发SYN-ACK。在Linux下，默认重试次数为5次，重试的间隔时间从1s开始每次都翻售，5次的重试时间间隔为 1s, 2s, 4s, 8s, 16s，总共31s，第5次发出后还要等32s都知道第5次也超时了，所以，总共需要 1s + 2s + 4s+ 8s+ 16s + 32s = 2^6 -1 = 63s，TCP才会把断开这个连接。</p>
                <p>&gt;关于SYN Flood攻击。一些恶意的人就为此制造了SYN Flood攻击——给服务器发了一个SYN后，就下线了，于是服务器需要默认等63s才会断开连接，这样，攻击者就可以把服务器的syn连接的队列耗尽，让正常的连接请求不能处理。于是，Linux下给了一个叫tcp_syncookies的参数来应对这个事——当SYN队列满了后，TCP会通过源地址端口、目标地址端口和时间戳打造出一个特别的Sequence Number发回去（又叫cookie），如果是攻击者则不会有响应;如果是正常连接，则会把这个 SYN Cookie发回来，然后服务端可以通过cookie建连接（即使你不在SYN队列中）。请注意，请先千万别用tcp_syncookies来处理正常的大负载的连接的情况。因为，synccookies是妥协版的TCP协议，并不严谨。对于正常的请求，你应该调整三个TCP参数可供你选择，第一个是：tcp_synack_retries 可以用他来减少重试次数；第二个是：tcp_max_syn_backlog，可以增大SYN连接数；第三个是：tcp_abort_on_overflow 处理不过来干脆就直接拒绝连接了。</p>
                <p>&gt;关于ISN的初始化。ISN是不能hard code的，不然会出问题的,ISN会和一个假的时钟绑在一起，这个时钟会在每4微秒对ISN做加一操作，直到超过2^32，又从0开始。这样，一个ISN的周期大约是4.55个小时。</p>
                <p>&gt;关于 MSL 和 TIME_WAIT。通过上面的ISN的描述，相信你也知道MSL是怎么来的了。我们注意到，在TCP的状态图中，从TIME_WAIT状态到CLOSED状态，有一个超时设置，这个超时设置是 2*MSL（RFC793定义了MSL为2分钟，Linux设置成了30s）为什么要这有TIME_WAIT？为什么不直接给转成CLOSED状态呢？主要有两个原因：1）TIME_WAIT确保有足够的时间让对端收到了ACK，如果被动关闭的那方没有收到Ack，就会触发被动端重发Fin，一来一去正好2个 MSL，2）有足够的时间让这个连接不会跟后面的连接混在一起。</p>
                <p><strong>当TCP执行一个主动关闭，并发回最后一个ACK，该连接必须在TIME_WAIT状态停留的时间为2倍的MSL。这样可让TCP再次发送最后的ACK以防这个ACK丢失(另一端超时并重发最后的FIN)。</strong>
                </p>
                <p>&gt;关于TIME_WAIT数量太多。从上面的描述我们可以知道，TIME_WAIT是个很重要的状态，但是如果在大并发的短链接下，TIME_WAIT 就会太多，这也会消耗很多系统资源。</p>
                <p>&gt;关于tcp_max_tw_buckets。这个是控制并发的TIME_WAIT的数量，默认值是180000，如果超限，那么，系统会把多的给destory掉，然后在日志里打一个警告（如：time wait bucket table overflow），官网文档说这个参数是用来对抗DDoS攻击的。也说的默认值180000并不小。这个还是需要根据实际情况考虑。</p>
                <p>其实，TIME_WAIT表示的是你主动断连接，如果你的服务器是于HTTP服务器，那么设置一个HTTP的KeepAlive有多重要（浏览器会重用一个TCP连接来传输多个HTTP请求），然后让客户端去断链接（你要小心，浏览器可能会非常贪婪，他们不到万不得已不会主动断连接）。</p>
                <p>&nbsp;</p>
                <p><strong>TCP重传机制</strong></p>
                <p>    TCP要保证所有的数据包都可以到达，所以，必需要有重传机制。</p>
                <p>    注意，<strong>接收端给发送端的Ack确认只会确认最后一个连续的包</strong>，比如，发送端发了1,2,3,4,5一共五份数据，接收端收到了1，2，于是回ack 3，然后收到了4（注意此时3没收到），此时的TCP会怎么办？</p>
                <p><strong>1、超时重传机制</strong></p>
                <p>    一种是不回ack，一直等待3，当发送端发现收不到3的ack超时后，会重传3。一旦接收方收到3后，ack回传5——意味着3和4都收到了。</p>
                <p>    但是，这种方式会有比较严重的问题，那就是因为要死等3，所以会导致4和5即便已经收到了，而发送方也完全不知道发生了什么事，因为没有收到Ack，所以，发送方可能会悲观地认为也丢了，所以有可能也会导致4和5的重传。</p>
                <p>    对此有两种选择：</p>
                <p>一种是仅重传timeout的包。也就是第3份数据。</p>
                <p>另一种是重传timeout后所有的数据，也就是第3，4，5这三份数据。</p>
                <p>    这两种方式有好也有不好。第一种会节省带宽，但有可能4，5都还需要重传，如果最坏情况，先传3，等ack再传4，等ack再传5；第二种会快一点，但是会浪费带宽，也可能会有无用功。但总体来说都不好。因为都在等timeout，timeout可能会很长。</p>
                <p><strong>快速重传机制</strong></p>
                <p>    于是，TCP引入了一种叫Fast Retransmit 的算法，不以时间驱动，而以数据驱动重传。也就是说，如果，包没有连续到达，就ack最后那个可能被丢了的包，如果发送方连续收到3次相同的ack，就重传。Fast Retransmit的好处是不用等timeout了再重传。</p>
                <p>    比如：如果发送方发出了1，2，3，4，5份数据，第一份先到送了，于是就ack回2，结果2因为某些原因没收到，3到达了，于是还是ack回2，后面的4和5都到了，但是还是ack回2，因为2还是没有收到，于是发送端收到了三个ack=2的确认，知道了2还没有到，于是就马上重转2。然后，接收端收到了2，此时因为3，4，5都收到了，于是ack回6。</p>
                {/*<p><img src={require('../../img/1519114946899.jpg')} style={{height:"45%",width:"45%"}}/></p>*/}

                <p><img src="http://i4.bvimg.com/633340/3910456c81a42870.jpg" style={{height:"70%",width:"70%"}}/></p>
                <p>对于上面的示例来说，还是有个问题：是重传#2呢还是重传#2，#3，#4，#5呢？因为发送端并不清楚这连续的3个ack(2)是谁传回来的？</p>
                <p><strong>SACK 方法</strong></p>
                <p>    另外一种更好的方式叫：Selective Acknowledgment (SACK)，这种方式需要在TCP头里加一个SACK的东西，ACK还是Fast Retransmit的ACK，SACK则是汇报收到的数据碎版。</p>
                {/*<p><img src={require('../../img/1519115044433.jpg')} style={{height:"45%",width:"45%"}}/></p>*/}

                <p><img src="http://i4.bvimg.com/633340/e327a3f113128d4b.jpg" style={{height:"70%",width:"70%"}}/></p>
                <p>SACK会消费发送方的资源，试想，如果一个攻击者给数据发送方发一堆SACK的选项，这会导致发送方开始要重传甚至遍历已经发出的数据，这会消耗很多发送端的资源。</p>
                <p>&nbsp;</p>
                <p><strong>TCP的RTT算法</strong></p>
                <p>从前面的TCP重传机制我们知道Timeout的设置对于重传非常重要。</p>
                <p>设长了，重发就慢，丢了老半天才重发，没有效率，性能差；</p>
                <p>设短了，会导致可能并没有丢就重发。于是重发的就快，会增加网络拥塞，导致更多的超时，更多的超时导致更多的重发。</p>
                <p>    而且，这个超时时间在不同的网络的情况下，根本没有办法设置一个死的值。只能动态地设置。为了动态地设置，TCP引入了RTT——Round Trip Time，也就是一个数据包从发出去到回来的时间。这样发送端就大约知道需要多少的时间，从而可以方便地设置Timeout—— RTO（Retransmission TimeOut），以让我们的重传机制更高效。听起来似乎很简单，好像就是在发送端发包时记下t0，然后接收端再把这个ack回来时再记一个t1，于是RTT = t1 – t0。没那么简单，这只是一个采样，不能代表普遍情况。</p>
                <p><strong>Karn / Partridge 算法</strong></p>
                <p>    但是上面的这个算法在重传的时候会出有一个终极问题——你是用第一次发数据的时间和ack回来的时间做RTT样本值，还是用重传的时间和ACK回来的时间做RTT样本值？</p>
                <p>    这个问题无论你选那头都是按下葫芦起了瓢。如下图所示：</p>
                <p>情况（a）是ack没回来，所以重传。如果你计算第一次发送和ACK的时间，那么，明显算大了。</p>
                <p>情况（b）是ack回来慢了，但是导致了重传，但刚重传不一会儿，之前ACK就回来了。如果你是算重传的时间和ACK回来的时间的差，就会算短了。</p>
                <p>1987年的时候，搞了一个叫Karn / Partridge Algorithm，这个算法的最大特点是——忽略重传，不把重传的RTT做采样</p>
                <p><strong>Jacobson / Karels 算法</strong></p>
                <p>前面两种算法用的都是“加权移动平均”，这种方法最大的毛病就是如果RTT有一个大的波动的话，很难被发现，因为被平滑掉了。所以，1988年，又有人推出来了一个新的算法，这个算法叫Jacobson / Karels Algorithm（参看RFC6289）。这个算法引入了最新的RTT的采样和平滑过的SRTT的差距做因子来计算。</p>
                <p>这个算法在被用在今天的TCP协议中。</p>
                <p>&nbsp;</p>
                <p><strong>TCP滑动窗口</strong></p>
                <p>   TCP必需要解决的可靠传输以及包乱序（reordering）的问题，所以，TCP必需要知道网络实际的数据处理带宽或是数据处理速度，这样才不会引起网络拥塞，导致丢包。</p>
                <p>    所以，TCP引入了一些技术和设计来做网络流控，Sliding Window是其中一个技术。前面我们说过，TCP头里有一个字段叫Window，又叫Advertised-Window，这个字段是接收端告诉发送端自己还有多少缓冲区可以接收数据。于是发送端就可以根据这个接收端的处理能力来发送数据，而不会导致接收端处理不过来。为了说明滑动窗口，我们需要先看一下TCP缓冲区的一些数据结构：</p>
                {/*<p><img src={require('../../img/1519115565873.jpg')} style={{height:"45%",width:"45%"}}/></p>*/}

                <p><img src="http://i4.bvimg.com/633340/889bf2d131c4e263.jpg" style={{height:"70%",width:"70%"}}/></p>
                <p>上图中，我们可以看到：</p>
                <p>接收端LastByteRead指向了TCP缓冲区中读到的位置，NextByteExpected指向的地方是收到的<strong>连续包</strong>的最后一个位置，LastByteRcved指向的是收到的包的最后一个位置，我们可以看到中间有些数据还没有到达，所以有数据空白区。</p>
                <p>发送端的LastByteAcked指向了被接收端Ack过的位置（表示成功发送确认），LastByteSent表示发出去了，但还没有收到成功确认的Ack，LastByteWritten指向的是上层应用正在写的地方。</p>
                <p>&nbsp;</p>
                <p>于是：接收端在给发送端回ACK中会汇报自己的AdvertisedWindow = MaxRcvBuffer – LastByteRcvd – 1;</p>
                <p>而发送方会根据这个窗口来控制发送数据的大小，以保证接收方可以处理。</p>
                <p>下面我们来看一下<strong>发送方</strong>的滑动窗口示意图：</p>
                {/*<p><img src={require('../../img/1519115562544.jpg')} style={{height:"65%",width:"65%"}}/></p>*/}
                <p><img src="http://i4.bvimg.com/633340/94b39b76b9cb3669.jpg" style={{height:"70%",width:"70%"}}/></p>
                <p>上图中分成了四个部分，分别是：（其中那个黑模型就是滑动窗口）</p>
                <p>#1已收到ack确认的数据。</p>
                <p>#2发还没收到ack的。</p>
                <p>#3在窗口中还没有发出的（接收方还有空间）。</p>
                <p>#4窗口以外的数据（接收方没空间）</p>
                <p>下面是个滑动后的示意图（新收到4个ack，并发出了46-51的字节）：</p>
               {/* <p><img src={require('../../img/1519115558747.jpg')} style={{height:"65%",width:"65%"}}/></p>*/}

                <p><img src="http://i4.bvimg.com/633340/fdba94312026b1f1.jpg" style={{height:"70%",width:"70%"}}/></p>
                <p>下面我们来看一个接受端控制发送端的图示：</p>
                {/*<p><img src={require('../../img/1519116246368.jpg')} style={{height:"70%",width:"70%"}}/></p>*/}
                <p><img src="http://i4.bvimg.com/633340/1117d9c6f9883fea.jpg" style={{height:"70%",width:"70%"}}/></p>

                <p>&nbsp;</p>
            </div>
        );
    }
}

export default ARP;