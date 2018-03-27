import React, {Component} from 'react';
import {Anchor, Row, Col} from 'antd';


const {Link} = Anchor;


class ASK3 extends Component {

    s = "{";
    render() {

        return (
            <div>
                <Row>
                    <Col span={19}>
                        <p>Man-in-the-MiddleAttack 中间人攻击</p>
                        <p>让我们观察下面这个例子：</p>
                        <p><img src='https://gitee.com/nick070809/pics/raw/master/skill/03.jpg' alt='' /></p>
                        <p>Alice 连接到了 Web 服务器上，Bob打算了解 Alice 正在发送什么信息。于是 Bob 建立 MITM 攻击，通过告诉服务器他是 Alice，并且告诉 Alice 他是服务器。现在，所有 Alice 的请求都会发给 Bob，Bob 会将它们转发给服务器，并对服务器的响应做相同操作。这样，Bob 就能够拦截、读取或修改所有 Alice 和服务器之间的流量。 </p>
                        <p>地址解析协议（ARP）欺骗可能是最常见的 MITM 攻击。它基于一个事实，就是 ARP 并不验证系统所收到的响应。这就意味着，当 Alice 的电脑询问网络上的所有设备，“IP 为 xxx.xxx.xxx.xxx 的机器的 MAC 地址是什么”时，它会信任从任何设备得到的答复。该设备可能是预期的服务器，也可能是不是。ARP 欺骗或毒化的工作方式是，发送大量 ARP 响应给通信的两端，告诉每一端攻击者的 MAC 地址对应它们另一端的 IP 地址。</p>
                        <h3 id="https工作原理"><a href="javascript:void(0)" class="anchor">https工作原理</a></h3>
                        <p><img src='https://gitee.com/nick070809/pics/raw/master/skill/04.jpg' alt='' /></p>
                        <p><strong>1.客户端发起HTTPS请求</strong></p>
                        <p>用户在浏览器里输入一个https网址，然后连接到server的443端口。</p>
                        <p><strong>2. 服务端的配置</strong></p>
                        <p>采用HTTPS协议的服务器必须要有一套数字证书，可以自己制作，也可以向组织申请。区别就是自己颁发的证书需要客户端验证通过，才可以继续访问，而使用受信任的公司申请的证书则不会弹出提示页面。</p>
                        <p>web通信中的SSL加密的公钥证书(受信任的第三方证书颁发机构签名颁发)常见的如</p>
                        <ul>
                            <li>VeriSign</li>
                            <li>Thawte</li>
                            <li>GlobalSign</li>
                            <li>Symantec</li>
                        </ul>
                        <p><strong>3. 传送证书</strong></p>
                        <p>这个证书其实就是公钥，只是包含了很多信息，如证书的颁发机构，过期时间等等。</p>
                        <p><strong>4. 客户端解析证书</strong></p>
                        <p>这部分工作是有客户端的TLS来完成的，首先会验证公钥是否有效，比如颁发机构，过期时间等等，如果发现异常，则会弹出一个警告框，提示证书存在问题。如果证书没有问题，那么就生成一个随即值。然后用证书对该随机值进行加密。</p>
                        <p><strong>5. 传送加密信息</strong></p>
                        <p>这部分传送的是用证书加密后的随机值，目的就是让服务端得到这个随机值，以后客户端和服务端的通信就可以通过这个随机值来进行加密解密了。</p>
                        <p><strong>6. 服务段解密信息</strong></p>
                        <p>服务端用私钥解密后，得到了客户端传过来的随机值(私钥)，然后把内容通过该值进行对称加密。所谓对称加密就是，将信息和私钥通过某种算法混合在一起，这样除非知道私钥，不然无法获取内容，而正好客户端和服务端都知道这个私钥，所以只要加密算法够彪悍，私钥够复杂，数据就够安全。</p>
                        <p><strong>7. 传输加密后的信息</strong></p>
                        <p>这部分信息是服务段用私钥加密后的信息，可以在客户端被还原</p>
                        <p><strong>8. 客户端解密信息</strong></p>
                        <p>客户端用之前生成的私钥(随即值)解密服务段传过来的信息，于是获取了解密后的内容。整个过程第三方即使监听到了数据，也束手无策。</p>
                        <p>&nbsp;</p>
                        <h3 id="HTTPS证书查看"><a href="javascript:void(0)" class="anchor">HTTPS证书查看</a></h3>
                        <p>在进行中间人攻击之前，先查看下证书，可以使用以下软件(以百度为例)</p>
                        <p><strong>1. OpenSSL</strong></p>
                        <p>OpenSSL是一个安全套接字层密码库，囊括主要的密码算法、常用的密钥和证书封装管理功能及SSL协议，并提供丰富的应用程序供测试或其它目的使用。</p>
                        <p>直接调用openssl库识别目标服务器支持的SSL/TLS cipher suite</p>
                        <p>$openssl s_client -connect <a href='www.baidu.com' target='_blank' >www.baidu.com</a>:443</p>
                        <p><img src='https://gitee.com/nick070809/pics/raw/master/skill/05.jpg' alt='' /></p>
                        <p>&nbsp;</p>
                        <p><strong>2. sslcan</strong></p>
                        <p>SSLscan主要探测基于ssl的服务，如https。SSLscan是一款探测目标服务器所支持的SSL加密算法工具。</p>
                        <p>sslcan能自动识别ssl配置错误，过期协议，过时cipher suite和hash算法</p>
                        <p>默认会检查CRIME、heartbled漏洞，绿色表示安全、红色黄色需要引起注意</p>
                        <p>$ sslscan -tlsall <a href='www.baidu.com' target='_blank' >www.baidu.com</a>:443</p>
                        <p><img src='https://gitee.com/nick070809/pics/raw/master/skill/06.jpg' alt='' /></p>
                        <p><strong>3. nmap</strong></p>
                        <p>还可以使用nmap的脚本。</p>
                        <p>nmap --script=ssl-enm-ciphers.nse <a href='www.baidu.com' target='_blank' >www.baidu.com</a></p>
                        <p><img src='https://gitee.com/nick070809/pics/raw/master/skill/07.jpg' alt='' /></p>
                        <h3 id="https中间人攻击"><a href="javascript:void(0)" class="anchor">https中间人攻击</a></h3>
                        <p>参考：<a href='http://netsecurity.51cto.com/art/201702/531356.htm' target='_blank' >http://netsecurity.51cto.com/art/201702/531356.htm</a></p>
                        <p>https也不是绝对安全的，如下图所示为中间人劫持攻击，中间人可以获取到客户端与服务器之间所有的通信内容</p>
                        <p><img src='https://gitee.com/nick070809/pics/raw/master/skill/11.jpeg' alt='' /></p>
                        <p>中间人截取客户端发送给服务器的请求，然后伪装成客户端与服务器进行通信；将服务器返回给客户端的内容发送给客户端，伪装成服务器与客户端进行通信。 </p>
                        <p>通过这样的手段，便可以获取客户端和服务器之间通信的所有内容。 </p>
                        <p>使用中间人攻击手段，必须要让客户端信任中间人的证书，如果客户端不信任，则这种攻击手段也无法发挥作用。</p>
                        <p>&nbsp;</p>
                        <h4 id="先生成一个证书"><a href="javascript:void(0)" class="anchor">先生成一个证书</a></h4>
                        <p>openssl req -new -x509 -days 1096 -key ca.key -out ca.crt，进行一个新的请求，格式为-x509，现在的证书基本是x509的国际标准的证书格式，有效期为1096天，并使用ca.key私钥，生成ca.crt标准的证书文件。</p>
                        <p><img src='https://gitee.com/nick070809/pics/raw/master/skill/08.jpg' alt='' /></p>
                        <p>sslsplit会自动的调用根证书，根据你要访问哪些网站，根据网站的名称，由根证书签发一个专门针对网站的证书。</p>
                        <h4 id="开启路由功能"><a href="javascript:void(0)" class="anchor">开启路由功能</a></h4>
                        <p>中间人也是个终端设备，不具有路由功能，转发过程不是由软件实现的，是由操作系统的路由功能实现的。</p>
                        <p>$ sysctl -w net.ipv4.ip_forward=1</p>
                        <p>将net.ipv4.ip_forward=1的值设为1，当然用输出重定向或者vim编辑proc/sys/net/ipv4/ip_forward也可。</p>
                        <p><img src='https://gitee.com/nick070809/pics/raw/master/skill/09.png' alt='' /></p>
                        <h4 id="写转发规则"><a href="javascript:void(0)" class="anchor">写转发规则</a></h4>
                        <p>当客户端把请求发给中间人终端设备的时候，发到终端的443端口之后，需要用iptables做NAT地址转换，其实是端口转换，把本地443端口收到的包转发到另外一个端口，而另外一个端口由sslsplit所侦听的端口，这样的话，凡是发给443端口的请求流量就会发给slsplit所侦听的端口，而sslsplit就会调用证书伪造一个看起来是目标网站的伪造网站，sslsplit会利用伪造的证书对发过来的流量进行解密</p>
                        <p>iptables -t nat -L 查看net的配置，为避免干扰，可以使用iptables -F清空配置，并使用netstat -pantu | grep :80 ，netstat -pantu | grep :443检查80和443是否被使用，使用则停止进程</p>
                        <p><img src='https://gitee.com/nick070809/pics/raw/master/skill/10.png' alt='' /></p>
                        <p>将80、443端口进行转发给8080和8443端口。</p>
                        <pre><code>iptables -t nat -A PREROUTING -p tcp --dport 80 -j REDIRECT --to-ports 8080 <br/>
iptables&nbsp;-t&nbsp;nat&nbsp;-A&nbsp;PREROUTING&nbsp;-p&nbsp;tcp&nbsp;--dport&nbsp;443&nbsp;-j&nbsp;REDIRECT&nbsp;--to-ports&nbsp;8443&nbsp;<br/>
</code></pre>
                        <p>当然还可以对其他的协议的加密流量进行中间人攻击。</p>
                        <pre><code>iptables -t nat -A PREROUTING -p tcp --dport 587 -j REDIRECT --to-ports 8443 //MSA <br/>
iptables&nbsp;-t&nbsp;nat&nbsp;-A&nbsp;PREROUTING&nbsp;-p&nbsp;tcp&nbsp;--dport&nbsp;465&nbsp;-j&nbsp;REDIRECT&nbsp;--to-ports&nbsp;8443&nbsp;//SMTPS&nbsp;<br/>
iptables&nbsp;-t&nbsp;nat&nbsp;-A&nbsp;PREROUTING&nbsp;-p&nbsp;tcp&nbsp;--dport&nbsp;993&nbsp;-j&nbsp;REDIRECT&nbsp;--to-ports&nbsp;8443&nbsp;//IMAPS&nbsp;<br/>
iptables&nbsp;-t&nbsp;nat&nbsp;-A&nbsp;PREROUTING&nbsp;-p&nbsp;tcp&nbsp;--dport&nbsp;995&nbsp;-j&nbsp;REDIRECT&nbsp;--to-ports&nbsp;8443&nbsp;//POP3S&nbsp;<br/>
</code></pre>
                        <h4 id="进行arp欺骗"><a href="javascript:void(0)" class="anchor">进行arp欺骗</a></h4>
                        <p>使用arpspoof进行arp欺骗，不管是进行DNS欺骗还是HTTP或HTTPS的中间人攻击，arp欺骗都是前提，所以，在进行防御的时候，将ip和MAC绑定，就可以防止中间人攻击了。</p>



                    </Col>
                    <Col span={1}>
                    </Col>
                    <Col span={4}>
                         <Anchor showInkInFixed="true">
                                <Link href="#https工作原理" title="https工作原理"/>
                                 <Link href="#HTTPS证书查看" title="HTTPS证书查看"/>
                                 <Link href="#https中间人攻击" title="https中间人攻击">
                                 <Link href="#先生成一个证书" title="先生成一个证书"/>
                                 <Link href="#开启路由功能" title="开启路由功能"/>
                                 <Link href="#写转发规则" title="写转发规则"/>
                                 <Link href="#进行arp欺骗" title="进行arp欺骗"/>
                         </Link>

                        </Anchor>
                    </Col>
                </Row>


            </div>

        );
    }
}

export default ASK3;
