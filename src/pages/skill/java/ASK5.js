import React, {Component} from 'react';
import {Anchor, Row, Col} from 'antd';


const {Link} = Anchor;


class ASK5 extends Component {

    s = "{";
    render() {

        return (
            <div>
                <Row>
                    <Col span={19}>
                        <h3 id="11种状态"><a href="javascript:void(0)" class="anchor">11种状态</a></h3>
                        <p>客户端独有的：（1）SYN_SENT （2）FIN_WAIT1 （3）FIN_WAIT2 （4）CLOSING （5）TIME_WAIT 。</p>
                        <p>服务器独有的：（1）LISTEN （2）SYN_RCVD （3）CLOSE_WAIT （4）LAST_ACK 。</p>
                        <p>共有的：（1）CLOSED （2）ESTABLISHED 。</p>
                        <p>&nbsp;</p>
                        <h3 id="TCP状态迁移"><a href="javascript:void(0)" class="anchor">TCP状态迁移</a></h3>
                        <p>大家对netstat -a命令很熟悉，但是，你有没有注意到STATE一栏呢，基本上显示着established,time_wait,close_wait等，这些到底是 什么意思呢，在这篇文章，我将会详细的阐述。</p>
                        <p>大家很明白TCP初始化连接三次握手吧：发SYN包，然后返回SYN/ACK包，再发ACK包，连接正式建立。但是这里有点出入，当请求者收到SYS /ACK包后，就开始建立连接了，而被请求者第三次握手结束后才建立连接。关闭连接要四次握手：发FIN包，ACK 包，FIN包，ACK包，四次握手！！为什么呢，因为TCP连接是全双工，我关了你的连接，并不等于你关了我的连接。</p>
                        <p>客户端TCP状态迁移：</p>
                        <pre><code>CLOSED-&gt;SYN_SENT-&gt;ESTABLISHED-&gt;FIN_WAIT_1-&gt;FIN_WAIT_2-&gt;TIME_WAIT-&gt;CLOSED<br/>
</code></pre>
                        <p><img src='http://blog.chinaunix.net/attachment/201304/8/22312037_1365405910EROI.png' alt='' /></p>
                        <p>服务器TCP状态迁移：</p>
                        <pre><code>LISTEN-&gt;SYN_RCVD -&gt;ESTABLISHED-&gt;CLOSE_WAIT-&gt;LAST_ACK-&gt;CLOSED<br/>
</code></pre>
                        <p><img src='http://blog.chinaunix.net/attachment/201304/9/22312037_1365503104wDR0.png' alt='' /></p>
                        <p>&nbsp;</p>
                        <p>当客户端发一个SYN包后，客户端就处于SYN_SENT状态，服务器就处于SYN_RCVD (SYS收到) 状态,然后互相确认进入连接状态ESTABLISHED。</p>
                        <p>当客户端请求关闭连接时，客户端发送一个FIN包后，客户端就进入FIN_WAIT_1状态,等待对方的确认包；</p>
                        <p>服务器发送一个ACK包给客户，客户端收到ACK包后结束FIN_WAIT_1状态，进入FIN_WAIT_2状态；等待服务器发过来的关闭请求,</p>
                        <p>服务器发一个FIN包后,进入CLOSE_WAIT状态，当客户端收到服务器的FIN包,FIN_WAIT_2状态就结束，然后给服务器端的FIN包给以一个确认包，客户端这时进入TIME_WAIT,</p>
                        <p>当服务器收到确认包后,CLOSE_WAIT状态结束了。</p>
                        <p><strong>这时候服务器端真正的关闭了连接.但是客户端还在TIME_WAIT状态下</strong></p>
                        <h3 id="2MSL是什么？"><a href="javascript:void(0)" class="anchor">2MSL是什么？</a></h3>
                        <p>什么时候结束呢.我在这里再讲到一个新名词:2MSL等待状态,其实TIME_WAIT就是2MSL等待状态,</p>
                        <p>MSL是Maximum Segment Lifetime英文的缩写，中文可以译为“报文最大生存时间”，他是任何报文在网络上存在的最长时间，超过这个时间报文将被丢弃。因为tcp报文（segment）是ip数据报（datagram）的数据部分，而ip头中有一个TTL域，TTL是time to live的缩写，中文可以译为“生存时间”，这个生存时间是由源主机设置初始值但不是存的具体时间，而是存储了一个ip数据报可以经过的最大路由数，每经过一个处理他的路由器此值就减1，当此值为0则数据报将被丢弃，同时发送ICMP报文通知源主机。RFC 793中规定MSL为2分钟，实际应用中常用的是30秒，1分钟和2分钟等。</p>
                        <p>    2MSL即两倍的MSL，TCP的TIME_WAIT状态也称为2MSL等待状态，当TCP的一端发起主动关闭，在发出最后一个ACK包后，即第3次握手完成后发送了第四次握手的ACK包后就进入了TIME_WAIT状态，必须在此状态上停留两倍的MSL时间，等待2MSL时间主要目的是怕最后一个ACK包对方没收到，那么对方在超时后将重发第三次握手的FIN包，主动关闭端接到重发的FIN包后可以再发一个ACK应答包。在TIME_WAIT状态时两端的端口不能使用，要等到2MSL时间结束才可继续使用。当连接处于2MSL等待阶段时任何迟到的报文段都将被丢弃。不过在实际应用中可以通过设置SO_REUSEADDR选项达到不必等待2MSL时间结束再使用此端口。</p>
                        <p>    TTL与MSL是有关系的但不是简单的相等的关系，MSL要大于等于TTL。</p>

                    </Col>
                    <Col span={1}>
                    </Col>
                    <Col span={4}>
                         <Anchor showInkInFixed="true">
                                 <Link href="#11种状态" title="11种状态"/>
                                 <Link href="#TCP状态迁移" title="TCP状态迁移"/>
                                 <Link href="#2MSL是什么？" title="2MSL是什么？"/>
                        </Anchor>
                    </Col>
                </Row>


            </div>

        );
    }
}

export default ASK5;
