import React, { Component } from 'react';

class ARP extends Component {
    render() {
        return (
            <div>
                <h2>Ping 程序</h2>
                <p>ping  www.baidu.com </p>
                <p>PING www.a.shifen.com (115.239.210.27): 56 data bytes</p>
                <p>64 bytes from 115.239.210.27: icmp_seq=0 ttl=55 time=6.627 ms</p>
                <p>64 bytes from 115.239.210.27: icmp_seq=1 ttl=55 time=6.790 ms</p>
                <p>64 bytes from 115.239.210.27: icmp_seq=2 ttl=55 time=6.668 ms</p>
                <p>64 bytes from 115.239.210.27: icmp_seq=3 ttl=55 time=9.179 ms</p>
                <p>64 bytes from 115.239.210.27: icmp_seq=4 ttl=55 time=6.968 ms</p>
                <p>当返回ICMP回显应答时，要打印出序列号和 TTL，并计算往返时间;TTL是 Time To Live的缩写，该字段指定IP包被路由器丢弃之前允许通过的最大网段数量。TTL是IPv4包头的一个8 bit字段。</p>
                <p>输出的第一行包括目的主机的 IP地址，尽管指定的是它的名字（ www.a.shifen.com ）。这说明名字已经经过解析器被转换成 IP地址了。</p>

            </div>
        );
    }
}

export default ARP;