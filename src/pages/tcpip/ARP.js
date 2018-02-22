import React, { Component } from 'react';

class ARP extends Component {
    render() {
        return (
            <div>
                <h2>ARP 地址解析协议</h2>
                <p>参考《TCP/IP详解》卷一、 卷二、卷三</p>
                <p><strong>获取目的端的MAC地址(在一个以太网中)步骤如下:</strong></p>
                <p>         1.发送ARP请求的以太网数据帧给以太网上的每个主机，即广播(以太网源地址填全1)。ARP请求帧中包含了目的主机的IP地址。  </p>
                <p>         2.目的主机收到了该ARP请求之后，会发送一个ARP应答，里面包含了目的主机的MAC地址。 </p>
                <p>&nbsp;</p>
                <p><strong>ARP协议工作原理</strong></p>
                <ol>
                <li><p>每个主机都会在自己的 ARP 缓冲区中建立一个 ARP 列表，以表示 IP 地址和 MAC 地址之间的对应关系。</p>
                </li>
                <li><p>主机新加入网络时， 会发送免费ARP报文把自己IP地址与Mac地址的映射关系给其他主机。(为啥叫免费,可能是指接收方没有代价就获取了一个映射)。</p>
                </li>
                <li><p>网络上的主机接收到广播ARP报文时，会更新自己的ARP缓冲区。将新的映射关系更新到自己的ARP表中。</p>
                </li>
                <li><p>某个主机需要发送数据时，首先检查 ARP 列表中是否有对应 IP 地址的目的主机的 MAC 地址，如果有，则直接发送数据，如果没有，就向本网段的所有主机发送 ARP 数据包，该数据包包括的内容有：源主机 IP 地址，源主机 MAC 地址，目的主机的 IP 地址等。</p>
                </li>
                <li><p>当本网络的所有主机收到 ARP 数据包时：</p>
                <p> A）首先检查数据包中的目的主机 IP 地址是否是自己的 IP 地址，如果不是，则忽略该数据包。</p>
                <p> B）如果是，则首先从数据包中取出源主机的 IP 和 MAC 地址写入到 ARP 列表中，如果已经存在，则覆盖。</p>
                <p> C）然后将自己的 MAC 地址写入 ARP 响应包中，告诉源主机自己是它想要找的 MAC 地址。</p>
                </li>

                </ol>
                <p>6.源主机收到 ARP 响应包后。将目的主机的 IP 和 MAC 地址写入 ARP 列表，并利用此信息发送数据。如果源主机一直没有收到 ARP 响应数据包，表示 ARP 查询失败。</p>
                <p><strong>报文格式</strong></p>
               {/* <p><img src={require('../../img/20170625231543967.png')} /></p>*/}

                <p><img src="http://i4.bvimg.com/633340/f387a639d12a4482.png" /></p>
                <p>OP ： 表示ARP的消息类型。
                    1：ARP Request；
                    2：ARP Reply
                    3：RARP Request
                    4：RARP Reply</p>
                <p>&nbsp;</p>
                <p><strong>ARP工作实例</strong></p>
                <ol start='' >
                <li>首先，主机A想要向主机B发送消息，但它不知道主机B的MAC地址，只知道主机B的IP地址。这时，主机A会在当前局域网下以广播的形式发送ARP请求数据报,表示主机A想知道主机B的MAC地址：</li>

                </ol>
                {/*<p><img src={require('../../img/20170304155151065.png')} /></p>*/}

                <p><img src="http://i4.bvimg.com/633340/7a252863ae1f6f2f.png" /></p>
                <ol start='2' >
                <li><p>由于是广播，所以在本局域网上的所有主机都会收到主机A发送的ARP数据报， 除了主机B外，在这个局域网内的其他主机都会把数据报丢弃</p>
                {/*<p><img src={require('../../img/20170304155218573.png')} /></p>*/}

                <p><img src="http://i4.bvimg.com/633340/f7a593cd0d2a661e.png" /></p>
                </li>

                </ol>
                <p><strong>ARP缓存</strong></p>
                <p>      ARP给IP地址和MAC地址中间做了动态映射，也就是说缓存了一个ARP表，将得到的IP地址和MAC地址对应起来，如果在表中没有查到IP地址对应的MAC地址，就会发广播去找。随着用户的使用，ARP表如果不做任何措施，就会变得越来越臃肿缓慢，就降低了网络传输数据的效率，所以ARP缓存中每一项被设置了生存时间，<strong>一般是20分钟</strong>，从被创建时开始计算，到时则清除，如果在计时期间又被使用了，计时会重置。</p>
                <p><strong>ARP命令</strong></p>
                <p>	·arp -a或arp -g
                　　用于查看高速缓存中的所有项目。-a和-g参数的结果是一样的，多年来-g一直是UNIX平台上用来显示ARP高速缓存中所有项目的选项，而Windows用的是arp -a（-a可被视为all，即全部的意思），但它也可以接受比较传统的-g选项。</p>
                <p>　　·arp -a IP
                　　如果我们有多个网卡，那么使用arp -a加上接口的IP地址，就可以只显示与该接口相关的ARP缓存项目。</p>
                <p>　　·arp -s IP 物理地址
                　　我们可以向ARP高速缓存中人工输入一个静态项目。该项目在计算机引导过程中将保持有效状态，或者在出现错误时，人工配置的物理地址将自动更新该项目。</p>
                <p>　　·arp -d IP
                　　使用本命令能够人工删除一个静态项目。</p>
                <p>arp -a</p>
                <p>? (192.168.0.1) at b8:f8:83:45:6:3c on en0 ifscope [ethernet]</p>
                <p>? (192.168.23.1) at 0:50:56:c0:0:8 on vmnet8 ifscope permanent [ethernet]</p>
                <p>? (224.0.0.251) at 1:0:5e:0:0:fb on en0 ifscope permanent [ethernet]</p>
                <p>? (239.255.255.250) at 1:0:5e:7f:ff:fa on en0 ifscope permanent [ethernet]</p>

            </div>
        );
    }
}

export default ARP;