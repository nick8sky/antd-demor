import React, { Component } from 'react';

class TraceRoute extends Component {
    render() {
        return (
            <div>
                <h2>TraceRoute 程序</h2>
                <p>参看<a href='https://www.cnblogs.com/peida/archive/2013/03/07/2947326.html' target='_blank' >https://www.cnblogs.com/peida/archive/2013/03/07/2947326.html</a></p>
                <p>TTL字段的目的是防止数据报在选路时无休止地在网络中流动。例如，当路由器瘫痪或者两个路由器之间的连接丢失时，选路协议有时会去检测丢失的路由并一直进行下去。在这段时间内，数据报可能在循环回路被终止。 T T L字段就是在这些循环传递的数据报上加上一个生存上限。</p>
                <p>当路由器收到一份I P数据报，如果其T T L字段是0或1，则路由器不转发该数据报（接收到这种数据报的目的主机可以将它交给应用程序，这是因为不需要转发该数据报。但是在通常情况下，系统不应该接收 T T L字段为0的数据报）。相反，路由器将该数据报丢弃，并给信源机发一份ICMP“超时”信息。Traceroute程序的关键在于包含这份 ICMP信息的IP报文的信源地址是该路由器的IP地址。</p>
                <pre><code>traceroute www.baidu.com<br/>
                traceroute: Warning: www.baidu.com has multiple addresses; using 115.239.210.27<br/>
                traceroute to www.a.shifen.com (115.239.210.27), 64 hops max, 52 byte packets<br/>
                 1  192.168.0.1 (192.168.0.1)  3.303 ms  2.149 ms  1.855 ms  <br/>//局域网内TTL字段为1的前3份数据报的ICMP报文分别在3.303 ms 、2.149 ms 和1.855 ms收到<br/>
                 2  192.168.1.1 (192.168.1.1)  3.480 ms  2.437 ms  1.164 ms<br/>
                 3  1.232.184.220.broad.hz.zj.dynamic.163data.com.cn (220.184.232.1)  5.845 ms  13.296 ms  8.339 ms<br/>
                 4  115.233.16.160 (115.233.16.160)  11.836 ms<br/>
                    61.164.22.132 (61.164.22.132)  5.885 ms<br/>
                    61.164.22.170 (61.164.22.170)  11.423 ms<br/>
                 5  * 61.164.31.202 (61.164.31.202)  21.372 ms  8.990 ms<br/>
                 6 * * *<br/>
                </code></pre>
                <p>traceroute程序是不可缺少的工具。其操作很简单：开始时发送一个TTL字段为1的UDP数据报，然后将 TTL字段每次加 1，以确定路径中的每个路由器。每个路由器在丢弃 UDP数据报时都返回一个 I C M P超时报文 2，而最终目的主机则产生一个IC P端口不可达的报文。</p>
                <p>在6出现了3个 *** 解释：现在一般的网络中间节点出于安全的原因都不会响应TraceRoute了。</p>

            </div>
        );
    }
}

export default TraceRoute;