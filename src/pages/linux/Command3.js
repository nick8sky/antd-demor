import React, {Component} from 'react';
import {Anchor, Row, Col} from 'antd';

const {Link} = Anchor;


class Command3 extends Component {
    render() {


        return (
            <div>
                <Row>
                    <Col span={19}>
                        <h2 id="网络连接"><a href="javascript:void(0)"  class="anchor">网络连接</a></h2>
                        <h3 id="curl命令"><a href="javascript:void(0)"  class="anchor">curl命令</a></h3>
                        <p>curl命令是一个利用URL规则在命令行下工作的文件传输工具。它支持文件的上传和下载，所以是综合传输工具，但按传统，习惯称curl为下载工具。作为一款强力工具，curl支持包括HTTP、HTTPS、ftp等众多协议，还支持POST、cookies、认证、从指定偏移处下载部分文件、用户代理字符串、限速、文件大小、进度条等特征。做网页处理流程和数据检索自动化，curl可以祝一臂之力。</p>
                        <pre><code>curl -I http://man.linuxde.net</code></pre>
                        <h3 id="wget命令"><a href="javascript:void(0)"  class="anchor">wget命令</a></h3>
                        <p>wget命令用来从指定的URL下载文件。wget非常稳定，它在带宽很窄的情况下和不稳定网络中有很强的适应性，如果是由于网络的原因下载失败，wget会不断的尝试，直到整个文件下载完毕。</p>
                        <pre><code>wget http://www.linuxde.net/testfile.zip</code></pre>
                        <h3 id="telnet命令"><a href="javascript:void(0)"  class="anchor">telnet命令</a></h3>
                        <p>telnet命令用于登录远程主机，对远程主机进行管理。telnet因为采用明文传送报文，安全性不好，很多Linux服务器都不开放telnet服务，而改用更安全的ssh方式了。但仍然有很多别的系统可能采用了telnet方式来提供远程登录</p>
                        <pre><code>telnet 192.168.2.10</code></pre>
                        <h3 id="mail命令"><a href="javascript:void(0)"  class="anchor">mail命令</a></h3>
                        <p>mail命令是命令行的电子邮件发送和接收工具。操作的界面不像elm或pine那么容易使用，但功能非常完整。</p>
                        <pre><code>mail -s &quot;Hello from linuxde.net by shell&quot; nick070809@163.com</code></pre>
                        <p>未能实验成功</p>
                        <h2 id="高级网络"><a href="javascript:void(0)"  class="anchor">高级网络</a></h2>
                        <h3 id="ss命令"><a href="javascript:void(0)"  class="anchor">ss命令</a></h3>
                        <p>ss命令用来显示处于活动状态的套接字信息。ss命令可以用来获取socket统计信息，它可以显示和netstat类似的内容。但ss的优势在于它能够显示更多更详细的有关TCP和连接状态的信息，而且比netstat更快速更高效。</p>
                        <p><strong>显示ICP连接</strong></p>
                        <pre><code>$ ss -t -a<br/>
                        State      Recv-Q Send-Q Local Address:Port                 Peer Address:Port  <br/>
                        ESTAB      0      0       ::ffff:172.16.245.34:tmi                   ::ffff:172.16.245.35:35686  <br/>
                        TIME-WAIT  0      0       ::ffff:172.16.245.34:amberon               ::ffff:172.16.245.35:55936 <br/>
                        ESTAB      0      0       ::ffff:172.16.245.34:tmi                   ::ffff:172.16.245.35:60634   <br/>
                        TIME-WAIT  0      0       ::ffff:172.16.245.34:8302                  ::ffff:172.16.245.35:46844
                        </code></pre>
                        <p><strong>列出所有打开的网络连接端口</strong></p>
                        <pre><code>$  ss -l<br/>
                        Netid  State      Recv-Q Send-Q          Local Address:Port                           Peer Address:Port<br/>
                        tcp    LISTEN     0      100                         *:smtp                                         <br/>                          *:*
                        tcp    LISTEN     0      128                         *:3118                                     *:*  <br/>
                        tcp    LISTEN     0      100                         *:3119                                     *:*  <br/>
                        tcp    LISTEN     0      100                         *:3120                                     *:*
                        </code></pre>
                        <p><strong>查看进程使用的socket</strong></p>
                        <pre><code>
                            $  ss -pl<br/>
                            tcp    LISTEN     0      100                         *:30009                                     *:*                     users:((&quot;java&quot;,pid=28525,fd=31))<br/>
                            tcp    LISTEN     0      100                         *:30010                                     *:*                     users:((&quot;java&quot;,pid=25153,fd=23))<br/>
                            tcp    LISTEN     0      100                         *:30014                                     *:*                     users:((&quot;java&quot;,pid=19499,fd=21))
                        </code></pre>
                        <p><strong>找出打开套接字/端口应用程序</strong></p>
                        <pre><code>$ss -pl | grep 3306<br/>
                            0      0                            *:3306                          *:*        users:((&quot;mysqld&quot;,1718,10))
                            </code></pre>
                        <p><strong>显示所有UDP Sockets</strong></p>
                        <pre><code>$ ss -u -a<br/>
                        State       Recv-Q Send-Q                                     Local Address:Port                                         Peer Address:Port<br/>
                        UNCONN      0      0                                                      *:syslog                                                  *:*
                        </code></pre>
                        <h3 id="traceroute命令"><a href="javascript:void(0)"  class="anchor">traceroute命令</a></h3>
                        <p>traceroute命令用于追踪数据包在网络上的传输时的全部路径，它默认发送的数据包大小是40字节。</p>
                        <p>通过traceroute我们可以知道信息从你的计算机到互联网另一端的主机是走的什么路径。当然每次数据包由某一同样的出发点（source）到达某一同样的目的地(destination)走的路径可能会不一样，但基本上来说大部分时候所走的路由是相同的。</p>
                        <pre><code>traceroute www.58.com</code></pre>
                        <h3 id="netstat命令"><a href="javascript:void(0)"  class="anchor">netstat命令</a></h3>
                        <p>netstat命令用来打印Linux中网络系统的状态信息，可让你得知整个Linux系统的网络情况。</p>
                        <p><strong>在netstat输出中显示 PID 和进程名称</strong></p>
                        <pre><code>netstat -pt<br/>
                            Proto Recv-Q Send-Q Local Address           Foreign Address         State       PID/Program name<br/>
                        tcp        0      0 agent:43094             saas.database:mysql     ESTABLISHED 348/java<br/>
                        tcp        0      0 agent:zabbix-agent      172.16.245.37:46164     TIME_WAIT   -<br/>
                        tcp        0      0 agent:54630             saas.database:mysql     ESTABLISHED 19673/java<br/>
                        tcp        0      0 agent:zabbix-agent      172.16.245.37:46214     TIME_WAIT   -<br/>
                        tcp        0      0 agent:37463             47.96.145.229:mysql     ESTABLISHED -<br/>
                        tcp        0      0 agent:zabbix-
                        </code></pre>
                        <p>找出运行在指定端口的进程：</p>
                        <pre><code>$ netstat -anp|grep 30015<br/>
                        tcp        0      0 0.0.0.0:30015           0.0.0.0:*               LISTEN      23393/java</code></pre>
                        <p>&nbsp;</p>
                    </Col>
                    <Col span={1}>
                    </Col>
                    <Col span={4}>
                        <Anchor showInkInFixed="true">
                            <Link href="#网络连接" title="网络连接">
                                <Link href="#curl命令" title="curl命令"/>
                                <Link href="#wget命令" title="wget命令"/>
                                <Link href="#telnet命令" title="telnet命令"/>
                                <Link href="#mail命令" title="mail命令"/>
                            </Link>
                            <Link href="#高级网络" title="高级网络">
                                <Link href="#ss命令" title="ss命令"/>
                                <Link href="#traceroute命令" title="traceroute命令"/>
                                <Link href="#netstat命令" title="netstat命令"/>
                            </Link>
                        </Anchor>
                    </Col>
                </Row>


            </div>

        );
    }
}

export default Command3;
