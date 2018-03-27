import React, { Component } from 'react';

class VPN extends Component {
    render() {
        return (
            <div>
                <h2>搭建shadowsocks+serverspeeder</h2>
                <p>[转]<a href='http://blog.csdn.net/noahsun1024/article/details/52206369' target='_blank' >http://blog.csdn.net/noahsun1024/article/details/52206369</a></p>
                <p>[转]<a href='https://www.jianshu.com/p/1713fe645b37' target='_blank' >https://www.jianshu.com/p/1713fe645b37</a></p>

                <p>操作系统：CentOS6</p>
                <p>安装shadowsocks服务端（参考<a href='https://github.com/shadowsocks/shadowsocks/wiki/Shadowsocks-%E4%BD%BF%E7%94%A8%E8%AF%B4%E6%98%8E'>官方Shadowsocks 使用说明</a>）：</p>
                <p>CentOS:</p>
                <pre><code>1. yum install python-setuptools &amp;&amp; easy_install pip<br/>
                    2. pip install shadowsocks
                    </code></pre>
                    <p>&nbsp;</p>
                    <pre><code>1. apt-get install python-pip <br/>
                    2. pip install shadowsocks
                    </code></pre>
                    <p>Configuration via Config File</p>
                    <p>vi新建配置</p>
                    <p> vi /etc/shadowsocks.json<br/></p>
                <figure><table>
                    <thead>
                    <tr><th>字段</th><th>说明</th></tr></thead>
                    <tbody><tr><td>server</td><td>ss服务监听地址</td></tr><tr><td>server_port</td><td>ss服务监听端口</td></tr><tr><td>local_address</td><td>本地的监听地址</td></tr><tr><td>local_port</td><td>本地的监听端口</td></tr><tr><td>password</td><td>密码</td></tr><tr><td>timeout</td><td>超时时间，单位秒</td></tr><tr><td>method</td><td>加密方法，默认是aes-256-cfb</td></tr><tr><td>fast_open</td><td>使用TCP_FASTOPEN, true / false</td></tr><tr><td>workers</td><td>workers数，只支持Unix/Linux系统</td></tr></tbody>
                </table></figure>
                <p>前台启动</p>
                <pre><code>ssserver -c /etc/shadowsocks.json<br/>
                ssserver -c /etc/shadowsocks.json -d start<br/>
                ssserver -c /etc/shadowsocks.json -d stop
                </code></pre>
                <p>如需开机启动</p>
                <p>打开rc.local</p>
                <p>vi /etc/rc.local</p>
                <p>ssserver -c /etc/shadowsocks.json -d start</p>
                <p>shadowsocks 的日志保存在 /var/log/shadowsocks.log</p>
                <p>安装shadowsocks客户端</p>
                <p>下载地址：</p>
                <pre><code>Windows<br/>
                    https://github.com/shadowsocks/shadowsocks-windows/releases<br/><br/>

                    Mac OS X<br/>
                    https://github.com/shadowsocks/ShadowsocksX-NG/releases<br/><br/>

                    linux<br/>
                    https://github.com/shadowsocks/shadowsocks-qt5/wiki/Installation<br/>
                    https://github.com/shadowsocks/shadowsocks-qt5/releases<br/><br/>

                    iOS<br/>
                    https://itunes.apple.com/app/apple-store/id1070901416?pt=2305194&amp;ct=shadowsocks.org&amp;mt=8<br/>
                    https://github.com/shadowsocks/shadowsocks-iOS/releases<br/><br/>

                    Android<br/>
                    https://play.google.com/store/apps/details?id=com.github.shadowsocks<br/>
                    https://github.com/shadowsocks/shadowsocks-android/releases<br/>
                    </code></pre>
                <p>&nbsp;</p>
                <p>VPN技术的本质是在本来能够正常连接的主机之间再建立一条虚拟通道，主要目的是为了交换不能直接在实际通道中传送的数据包，并且可以对数据进行加密处理。例如我们在内网有一台服务器可以访问内网，也设置了对外网的访问（当然是做好安全设置的），现在我们需要访问内网另一台服务器上面的业务。当然看到这里可能会出现这个很像代理服务器啊，那么代理服务器和VPN区别是什么呢？
                    代理服务器就是 你先通过访问代理服务器，在由代理服务器访问你需要访问的网站，服务器再返回内容给你，vpn 就是虚拟专用网，就是你访问的网站或者其他的什么服务器都要在这个虚拟专用网里，通过走一条虚拟的链路实现访问。</p>
                <p><img src='http://i2.bvimg.com/633340/3f55e522d5519c36.png' alt='Markdown' /></p>
                <p>上图是一个总部和分部在不通地方但是我们要做VPN的示意图。在两个路由器的地方我们需要设置一些映射，这样不管是在分部总部还是在其他地方都可以远程VPN登录，公司内网了。当然如果公司有钱可以做内网专线。但是相对于没有这个能力公司使用VPN是最经济的方法了。</p>
                <p><img src='http://i2.bvimg.com/633340/2ca480bbe896551d.png' alt='Markdown' /></p>
                <p>这个是远程VPN的示意图，192.168.1.1是内网的地址，210.45.160.4当然是公网的IP地址。现在我们在外地员工希望登录到公司内部办公网络。那么我们第一个要做的是什么呢？就是在公网IP地址的路由器上面设置如果VPN服务器PPTP的将端口tcp的47、1723 这两个端口做映射到192.168.1.1上，L2TP的 则需要映射udp1701端口到192.168.1.1上。那么这样我们的网络就设置好了。后面我们要在内网设置一台VPN服务器了，当然这个服务器必须要能访问到192.168.1.1上面。具体设置需要在VPN服务器配置文件中。 </p>

            </div>
        );
    }
}

export default VPN;





