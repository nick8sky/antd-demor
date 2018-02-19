import React, { Component } from 'react';

class ARP extends Component {
    render() {
        return (
            <div>
                <h2>RARP 逆地址解析协议</h2>
                <p>无盘工作站 = 无硬盘+ 内存+缓存+CPU+共享硬盘+共享缓存 + 共享数据库。</p>
                <p>具有本地磁盘的系统引导时，一般是从磁盘上的配置文件?(缓存文件还是配置文件)中读取IP地址。但是无盘机，如X终端或无盘工作站，则需要采用其他方法来获得IP地址。</p>
                <p>网络上的每个系统都具有唯一的硬件地址，它是由网络接口生产厂家配置的。无盘系统的RARP实现过程是从接口卡上读取唯一的硬件地址，然后发送一份RARP请求，请求某个主机响应该无盘系统的IP地址。</p>
                <p>&nbsp;</p>
                <p>RARP分组的格式与ARP分组基本一致。它们之间主要的差别是RARP请求或应答的帧类型代码为0x8035，且RARP请求的操作代码为3，应答操作代码为4。</p>
                <p>RARP请求以广播方式传送，应答一般是单播(unicast)传送的。</p>
                <p> Ask ...</p>

            </div>
        );
    }
}

export default ARP;