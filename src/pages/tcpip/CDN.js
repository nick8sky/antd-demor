import React, { Component } from 'react';

class CDN extends Component {
    render() {
        return (
            <div>
                <p>[转]<a href='http://blog.csdn.net/github_35384800/article/details/51818450' target='_blank' >http://blog.csdn.net/github_35384800/article/details/51818450</a></p>
                <h2>什么是CDN？</h2>
                <p>CDN的英文全写是“Content Delivery Network”，中文译名为“内容分发网络”。下面是援引维基百科关于CDN的定义：</p>
                <blockquote><p>A content delivery network or content distribution network is a globally distributed network of proxy servers deployed in multiple data centers. The goal of a CDN is to end-users with high availability and high performance. —— [<a href='https://en.wikipedia.org/wiki/Content_delivery_network'> 维基百科 ]</a></p>
                </blockquote>
                <p>从这段“非正式”定义能够看出CDN的一些关键字：“proxy servers”，“HA and HP”等等。也就是说，CDN是依赖于一组代理服务器来提供高可用和高性能服务的网络架构。</p>
                <p>CDN到底能干什么呢？举个例子即一目了然：</p>
                <p>假设有一位身处陕西西安的用户想要访问某网站www.xxxcom提供的服务，这个网站的服务器部署在北京市，那么这个用户发送的请求需要跨过陕西省、山西省、河北省最终才能到达北京市。如此远的地理距离，会在一定程度上增加的请求响应时间，用户的感受可能会是网页加载速度变慢等。如下图： </p>
                <p> <img src='http://i1.bvimg.com/633340/965efcf3fbe72a1b.png' alt='Markdown' /></p>
                <p>为了缓解这个问题，该网站决定在陕西部署一组代理服务器，它们用来接收来自陕西的用户发送的请求，并将相应的内容返回。如下图： </p>
                <p><img src='http://i1.bvimg.com/633340/fb9b2b7f0396aca4.png' alt='Markdown' /></p>
                <p>这样做最直接的好处是缩短了地理空间，加速了用户请求的响应。当然陕西的服务器不会是重新搭建的，而是类似于镜像服务器，将位于北京的主服务器上的内容缓存下来，从而提供快速的访问。如下图： </p>
                <p><img src='http://i1.bvimg.com/633340/82c7306aa40bf043.png' alt='Markdown' /></p>
                <p>一般情况下，当用户第一次访问该网站的某资源时，请求会被发送到位于西安的服务器上进行查找，如果查找失败，该服务器将去位于北京的主服务器上进行查找，并将返回的结果缓存下来，最终返回给用户。当用户再次访问该资源时，请求仍会被发送到位于西安的服务器上进行查找，并直接返回结果。</p>
                <p>从图中可以看到，位于北京和位于西安的服务器的域名都是www.xxxcom，那么该如何区分？这就依赖于强大的DNS了。</p>
                <p>&nbsp;</p>
                <h2>CDN和DNS？</h2>
                <p>DNS的英文全写是“Domain Name System”，中文译名为“域名系统”。同样，下面援引维基百科的定义：</p>
                <blockquote><p>The Domain Name System is a hierarchical decentralized naming system for computers, services, or any resource connected to the Internet or a private network. —— [<a href='https://en.wikipedia.org/wiki/Domain_Name_System'> 维基百科 ]</a></p>
                </blockquote>
                <p>同样，DNS能够干什么呢？举个例子：</p>
                <p>如果想要给某人打电话，必须翻阅电话本，按照他的名字找到相应的号码才能进行拨号。这样做的好处是解决了这么多类似、难记的电话号码的问题，人们只需要知道待呼的人的姓名即可。同样的，在网络世界，服务器间通信也要依赖于网络间的电话号码——IP地址，这些由数字构成的IP地址记忆起来非常困难，为了便于记忆，引入了域名的概念，它表示网络中一组服务器的名字，对应着一个IP地址。DNS就是为了完成这个任务而建立的系统。</p>
                <p>在Unix/Linux系的系统，甚至在Windows系统中，可以找到/etc/hosts这样的文件，它记录了主机名和IP地址的简单映射，它的内容为：</p>
                <pre><code>    127.0.0.1        localhost<br/>
                    255.255.255.255  broadcasthost<br/>
                    ::1              localhost<br/>
                </code></pre>
                <p>当访问某网站时，首先会来该文件中查找相应的IP地址，如果有，则按照该地址进行访问，如果没有，则去请求DNS服务器以获得IP地址。</p>
                <p>在上节的问题中，如何在网络中区分具有不同IP地址的同一个域名www.xxxcom，需要借助于DNS，使请求能够传递到正确的IP地址，即相应的服务器。如下图: </p>
                <p><img src='http://i1.bvimg.com/633340/f0bb1d5449a95cd6.png' alt='Markdown' /></p>
                <p> 网络层和应用层之间的“磨合”存在一些可能造成“拥堵”的地方：</p>
                <ol>
                    <li>“第一公里”。它指的是某网站服务器接入互联网后的带宽，直接影响了用户的访问速度和并发访问量。当用户请求量大于带宽时，就会造成拥堵。</li>
                    <li>“最后一公里”。它指的是用户接入互联网的带宽。类似于“第一公里”，假设服务器返回的数据量大于带宽，用户同样会感觉网络拥堵。目前由于光纤等技术的普及，这一问题已得到很大程度上的解决了。</li>
                    <li>对等互联关口。它指的是不同运营商（ISP）间的互联互通点。一般两个运营商间仅有2~3个互联互通点，可想而知这些点上负载了巨大的流量，容易造成拥堵。</li>
                    <li>长途骨干传输。用户发送请求到远方的网站服务器，会经过用户所在接入网、用户所在城域网、骨干网直到网站所在IDC等。存在长距离传输时延和骨干网拥塞问题。</li>

                </ol>
                <p>&nbsp;</p>
                <p>CDN的出现对于缓解上述问题具有重大意义。在上篇文章里，曾举了www.xxxcom的例子来简介CDN的工作原理，具体来说，在CDN出现以前用户访问网站服务器的过程为：</p>
                <p><img src='http://i4.bvimg.com/633340/0adf66f71b5f5440.png' alt='Markdown' /></p>
                <p>CDN网络在用户和服务器间添加了Cache层，将用户的访问请求引导到最接近用户的网络“边缘”Cache站点而不是服务器源站点，通过接管DNS来实现，下图是使用CDN缓存网站内容后的访问过程：</p>
                <p><img src='http://i4.bvimg.com/633340/4260bbdc3c25ec7c.png' alt='Markdown' /></p>
                <p>使用了CDN之后，用户端和服务器端无需做任何改变，<strong>仅需要修改访问过程中的域名解析部分即可</strong>。</p>
                <p>CDN代表了一种基于质量和秩序的网络服务模式，它包括分布式存储、负载均衡、网络请求重定向和内容管理4个要件，其中网络请求重定向和内容管理是CDN的核心。位于网络边缘的缓存服务器，它与用户仅有“一跳”之隔。</p>
                <p>实现CDN的技术手段有：高速缓存、镜像服务器。可工作于DNS解析（准确率大于95%）和HTTP请求重定向（准确率大于99%）两种方式。一般情况下，各Cache服务器流入用户流量与Cache服务器向源服务器取数据量之比在2:1到3:1之间，即分担50%到70%的到原始网站重复访问数据数据量（主要是图片、流媒体文件等）；而对于镜像服务器，除数据同步的流量，其余均在本地完成。</p>
                <p>CDN的优点是：</p>
                <ul>
                    <li>多域名加载资源。一般情况下浏览器对单个域名下的并发请求数（文件加载）进行限制，通常最多有4个，第5个只有前面的加载完毕了才能加载，而CDN文件是存放在不同IP的，对于浏览器可同时加载多个所需的所有文件，从而提高页面加载速度。</li>
                    <li>缓存加速。</li>
                    <li>高效。CDN提供更高的效率、更低的网络延时和更小的丢包率。</li>
                    <li>分布式数据中心。</li>
                    <li>版本控制。可以通过特定版本号从CDN加载响应的文件。</li>
                    <li>数据统计。一般CDN提供商都会提供访问统计等数据统计服务。</li>
                    <li><strong>防止攻击。可有效防止DDoS攻击。</strong></li>

                </ul>
                <p>&nbsp;</p>
                <h2>Squid缓存服务器？</h2>
                <p>采用高速缓存的CDN需要缓存服务器，常用的缓存服务器有Squid等。Squid是一个Web缓存代理，它支持HTTP、HTTPS、FTP和其他。它可以通过缓存和重用频繁请求的web页面来达到减少带宽和提高响应时间的效果。使用Squid对于IPs、网站和内容分发提供者非常有益，其中Squid使得内容发布者和流媒体开发者在世界各地发布内容变得更加容易。CDN提供商可以购买廉价的运行Squid的PC硬件，并依照特定策略围绕internet部署来提供更加节约和高效的大数据量服务。</p>
                <p>Squid功能强大，它的配置也是较为复杂的。以Squid 3.3为例，它的配置说明可以参照squid configure的内容说明。这里将以一个较为简单的配置文件简单进行介绍，更多配置项将在后续探索。</p>
                <pre><code>    http_port 80 accel ignore-cc defaultsite=www.me.com vhost # 设定监听端口80（默认是3128），并指定工作方式
                    acl all src all # 访问控制，这里允许全部<br/>
                    cache_peer orig-www.me.com parent 9999 0 no-query originserver name=wwwip # 设定源服务器域名及端口号<br/>
                    cache_peer_access all allow all # 源服务器访问控制<br/>
                    http_access allow all # http访问控制<br/>
                    visible_hostname cdn.me.com # 对外主机名<br/>
                    cache_mem 1 GB # 缓存大小<br/>
                </code></pre>
                <p>上面的配置是最简单的配置。具体来说其中：</p>
                <ul>
                    <li>http_port，表示Squid用来监听HTTP客户端请求的socket地址。默认是3128，可以自定义。accel 属于工作模式，它表示Squid工作在加速器(accelerator) / 反向代理模式下。ignore-cc表示忽略请求缓存控制头。它是accelerator模式下的选项。defaultsite表示默认主机名，即当头部没有展现主机名时需要加速的默认主机。vhost表示开启使用HTTP 1.1 头部支持虚拟域名支持。</li>
                    <li>acl，用来定义访问列表。可以灵活设定多种规则进行访问控制。</li>
                    <li>cache_peer 它表示指定缓存对端，格式为：cache_peer hostname type http-port icp-port [options]。其中type可以为parent、sibling或者multicast。后面的http-port表示对端接受HTTP请求的端口，icp-port表示查询邻居缓存的端口，为0表示不支持ICP和HTCP，所以在后面还会加上no-query表示不支持邻近ICP查询。originserver表示该服务器为源服务器。</li>

                </ul>
                <h2>简单的CDN实验</h2>
                <p>实验所需环境如下：</p>
                <figure><table>
                    <thead>
                    <tr><th>项目</th><th>软件</th><th>IP地址</th></tr></thead>
                    <tbody><tr><td>http服务器</td><td>Nginx</td><td>123.206.5<em>.2</em></td></tr><tr><td>缓存服务器</td><td>Squid</td><td>172.16.219.159</td></tr><tr><td>用户客户端</td><td>PC</td><td>192.168.1.104</td></tr></tbody>
                </table></figure>
                <p>首先，http服务器上启动Docker容器Nginx，对外开放9999端口，并承载内容为“Hello Origin Server”的index.html文件。</p>
                <p>经测试，通过缓存服务器和用户客户端均可以curl访问到结果“Hello Origin Server”。</p>
                <p>然后在缓存服务器上启动Docker容器Squid，配置文件如上节示例，并在容器的/etc/hosts文件中添加”123.206.5<em>.2</em>   orig-www.mecom”。</p>
                <p>接着在用户客户端上修改/etc/hosts文件，添加记录”172.16.219.159 www.mecom”，以进行简单的DNS。</p>
                <p>最后在用户客户端上访问www.mecom:3128可以得到结果”Hello Origin Server”。</p>
                <p>使用curl -I查看返回的头，第一次缓存没有命中，返回如下： </p>
                <p><img src='http://i4.bvimg.com/633340/2d8f3240d01ec53e.jpg' alt='Markdown' /></p>
                <p>第二次缓存命中，返回如下：</p>
                <p><img src='http://i4.bvimg.com/633340/6ca186194d0f67ba.jpg' alt='Markdown' /></p>
                <p>&nbsp;</p>
                <h2>DNS</h2>
                <p>曾将DNS看做是一个“电话本”。通过手动修改/etc/hosts的方式来改变域名和IP地址间的映射非常“简单粗暴”。随着互联网的发展，全世界每天都有成千上万个网站域名出现和消失，全靠手动是不现实的。于是出现了更为“智能”和“自动化”的DNS体系。</p>
                <p>最初HOSTS.txt文件由SRI的网络信息中心（NIC）进行更新和分发，但是存在HOSTS.txt的限制（同一文件里名称冲突、分布式一致性），和分发带来的流量和负载等问题。现行的DNS规范为RFC1034和RFC1035。</p>
                <p>DNS数据库的结构类似于Unix/Linux系统的文件系统结构——倒置的树状结构。树中每个节点都拥有一个最长为63字节的标签，域名是从该域的root节点开始，一直回溯到整棵树的root节点的标签序列，并以.号分隔。一个绝对域名，类似于Unix系统中的绝对路径，用来表示该节点在层次结构中的位置，通常也被称为完全限定域名（FQDN，Fully Qualified Domain Name)。如下图：</p>
                <p><img src='http://i1.bvimg.com/633340/4b89210f7d7e63f2.png' alt='Markdown' /></p>
                <p>这棵树的每个子树都代表了整个数据库的一部分，称作“域domain”，也即“域命名空间”。每个域目录又可以被进一步划分为额外的部分，称作“子域subdomain”。DNS的每个域都可以被分解成若干个子域，并均可被授权给不同的组织分散管理。域和子域都有相应的管理者，它们不必一样。例如edu域由EDUCAUSE管理，而它的子域xupt.edu会委托XUPT进行管理。要将子域授权给某个机构进行管理，需要创建一个“区域zone”，它是域命名空间中一段可以自治的区域，xupt.edu区域包含了所有以xupt.edu结尾的域名，而edu区域包含所有以edu结尾的域名，但不包含xupt.edu结尾的域名。xupt.edu这个区域可以进一步划分为lib.xupt.edu等子域，如果将其委托出去又可以构成新的独立区域。</p>
                <p>原始的顶级域将Internet域分为了7个域，com、edu、cn等。</p>
                <p>域中包含的主机和子域的域名，位于该域所属的命名空间的子树中，叶子节点往往表示的是某台主机。网络上的每台主机都有一个域名，它指向该主机的相关信息。同时还可能拥有多个别名（Alias)。</p>
                <p>DNS域名系统是一个分布式数据库，允许对各个部分采用客户端/服务器模式进行本地控制，辅以复制和缓存等机制，使它拥有了健壮性和充足的性能。DNS的客户端和服务器分别叫做“解析器resolver”和”名称服务器nameserver“。</p>
                <p>名称服务器nameserver通常只拥有域命名空间的一部分的完整信息，即区域。它的内容是从文件或另外的名称服务器加载而来。加载过后，这个名称服务器宣称对该区域具有“权威authority”。这样做的好处是：一个域的信息可能超出了一个名称服务器所需要的量，区域通过授权与原域划分了界限。</p>
                <p>DNS定义了两种类型的名称服务器：primary master和secondary master。primary master从主机上读取数据，而secondary master从该区域的权威名称服务器(master，通常是该区域的primary master)上读取区域数据，也可以从另一个secondary上去读。获取区域数据的过程称作“区域传输zone transfer”，secondary master目前更多地被称为slave服务器。master服务器和slave服务器都是该区域的权威，但并不唯一，意思是区域A的master服务器可能是区域B的slave服务器。master服务器从本地加载的区域数据文件被称为“区域数据文件zone datafile”，slave常被配置为从master同步该文件，并更新数据。</p>
                <p>解析器resolver处理的任务有：查询名称服务器、解释响应信息、将信息返回给查询它的程序。</p>
                <p>而名称服务器在域命名空间中查找不以自己为权威的区域的数据的过程被称为名称解析（name resolution）。解析的方法有两种：递归和迭代。它们的区别如下表：</p>
                <figure><table>
                    <thead>
                    <tr><th>解析方法</th><th>特点</th></tr></thead>
                    <tbody><tr><td>递归</td><td>大部分解析负担在一个名称服务器上，由它负责查询结果，它发出的查询跟它收到来自解析器的完全一样</td></tr><tr><td>迭代</td><td>在本地数据中找出与所查询的名称服务器最接近的名称服务器的名称和地址，并返回给查询者以供继续查询，工作量较小</td></tr></tbody>
                </table></figure>
                <p>递归方法图示：</p>
                <p><img src='http://i1.bvimg.com/633340/2b44d65db98ed0a7.png' alt='Markdown' /></p>
                <p>迭代方法图示： </p>
                <p><img src='http://i1.bvimg.com/633340/f9f2291f6d68d0ab.png' alt='Markdown' /></p>
                <h2>BIND</h2>
                <p>BIND的英文全写是“Berkeley Internet Name Domain”，它是目前普及最广的DNS实现。要想使用BIND可以获取其二进制包、源码包，也可以通过Docker容器来完成。这里使用Docker化的BIND 9进行实验。</p>
                <p>首先，在本地计算机上运行以下命令：</p>
                <pre><code>$ host www.baidu.com<br/>
                www.baidu.com has address 115.239.210.27<br/>
                www.baidu.com has address 115.239.211.112<br/>
                www.baidu.com is an alias for www.a.shifen.com.<br/>
                www.baidu.com is an alias for www.a.shifen.com.<br/>
                </code></pre>
                <p>可以看到返回结果为下图，它表示默认的DNS服务器对www.baiducom进行了解析，发现它是www.ashifencom的别名，并得到了它的IP地址。</p>
                <p>接着，运行BIND容器，运行以下命令：</p>
                <pre><code>host www.baidu.com 172.17.0.4</code></pre>
                <p>返回结果如下图，这使用了自己搭建的BIND作为DNS服务器进行的解析。发现这次的IP跟上次的不同，输入浏览器发现它仍然是百度主页。</p>
                <p><img src='http://i1.bvimg.com/633340/93785ef1da6e0ba5.jpg' alt='Markdown' /></p>
                <p>BIND的Docker镜像预置了webmin（一款图形化的Linux管理工具，非常便于远程管理计算机），通过它可以尝试配置BIND。图形化的配置过程比较清晰，基本过程是：</p>
                <p>首先，通过浏览器访问webmin，登录并选择BIND DNS Server：</p>
                <p>然后，在下方的区域信息处点击创建主区域Creating master zone，并选择正向Forward类型，配置Domain Name/Network为example.com，Master server为：ns.example.com，最后应用Apply，如下图：</p>
                <p><img src='http://i1.bvimg.com/633340/537cfd19e229c0d4.jpg' alt='Markdown' /></p>
                <p><img src='http://i1.bvimg.com/633340/fcbd80e069e7bd26.jpg' alt='Markdown' /></p>
                <p>接着，在前面的zone列表里选择example.com，并创建两个Address，一个Name为webserver.example.com，Address为192.168.1.1。另一个为ns.example.com，Address为172.17.0.4，修改好后Apply Configuration，如下图：</p>
                <p><img src='http://i1.bvimg.com/633340/7946d38f427e1690.jpg' alt='Markdown' /></p>
                <p><img src='http://i1.bvimg.com/633340/d4c127f8c15d8bbd.jpg' alt='Markdown' /></p>
                <p>最后，同样选择example.com，并创建一个Name Alias，Name为www.examplecom，Real Name为：webserver.example.com，如下图：</p>
                <p><img src='http://i4.bvimg.com/633340/6067e2627a1b0465.jpg' alt='Markdown' /></p>
                <p>执行下面的命令：</p>
                <pre><code>host www.example.com 172.17.0.4 </code></pre>
                <p>结果为：</p>
                <p><img src='http://i4.bvimg.com/633340/e153989f9fdacf62.jpg' alt='Markdown' /></p>
                <h2>加入BIND？</h2>
                <p>在上一次的试验中，使用了最土的办法——修改/etc/hosts来进行DNS解析，那么在上篇文章中对BIND有了初步了解后，将尝试采用BIND完成DNS解析。其中共修改了两次hosts文件，一次是修改用户客户端，使用户访问www.mecom的时候不是访问源服务器（123.206.5<em>.2</em>），而是访问作为缓存的Squid服务器（172.16.219.166）。另一次是修改了Squid容器，使它知道orig-www.mecom的IP地址。</p>
                <p>由此可知，对于Squid缓存服务器来说，www.mecom可看做是orig-www.mecom的别名Alias（即源服务器），它们的解析地址可以在BIND里配置。另一方面，对于客户端来说，www.mecom可以看做是cdn.me.com的别名Alias（即Squid缓存服务器）。这样就产生了歧义——同样的www.mecom拥有两个不同IP的别名。扩展一下思路，位于不同地域的客户端访问同一个www.mecom时，同样会产生这样的歧义。这就是“智能DNS”要解决的问题——它会根据需求设定一些访问规则，例如对于不同的IP段给予不同的域名解析地址返回，这都可以通过BIND的视图view完成。个人理解，view就像namespace，不同namespace的同名区域可以有不一样的属性（例如IP地址）。BIND要求使用view时，所有的区域必须都放在view里。在修改完BIND之后，还需要将这两台服务器的DNS服务器名称改为BIND容器，这步将通过修改/etc/resolv.conf来完成。下面是实验的过程：</p>
                <p>首先，创建view_172.17.0.5，它表示仅允许IP地址为172.17.0.5的客户端访问该view里的区域：</p>
                <p><img src='http://i1.bvimg.com/633340/5c511d900cbb0d01.jpg' alt='Markdown' /></p>
                <p><img src='http://i1.bvimg.com/633340/c7aedeb9126f0aed.jpg' alt='Markdown' /></p>
                <p>并将默认的5个区域（root、0、127、255、localhost）都迁移至该view里。其中后面四个均可以通过WebMin来完成：</p>
                <p><img src='http://i1.bvimg.com/633340/9a7e4801c2d7dafe.jpg' alt='Markdown' /></p>
                <p>而root区域在WebMin里并没有提供相应的迁移，所以只能通过文件的方式修改：原本这5个区域的记录都位于/etc/bind/named.conf.default-zones里，而迁移到区域后它们就被”剪切“到了/etc/bind/named.conf.local里的view视图里。</p>
                <p>参考：<a href='http://blog.csdn.net/github_35384800/article/details/51840594' target='_blank' >http://blog.csdn.net/github_35384800/article/details/51840594</a></p>
                <h2>集群化的Squid</h2>
                <p>“集群化？为什么要集群化？难道一台服务器不够用么？”，“对，是不够用，并且。。。。额，它挂了怎么办？”</p>
                <p>集群化带来的好处显而易见，集群化除了可以提供一个“可被看做高性能服务器整体”的特征外，还可以解决单点问题，提供高可用，并且具备良好的扩展性。这里不想讨论如何对源服务器进行集群化，那是一项非常耗时且复杂的工作（除了技术层面，还有业务的关系），思考一下如何完成Squid缓存服务器的集群化：假如部署三台Squid，它们同时工作，并且对外仅暴露一个地址。那么这样的架构可以为下图</p>
                <p><img src='http://i1.bvimg.com/633340/c9c72c43a04cd954.png' alt='Markdown' /></p>
                <p>其中LB为Load Balancer，可以使用F5、LVS和轻量的Nginx实现。为了简便，本文中采用Nginx实现。</p>
                <p>Nginx作为反向代理和负载均衡器。</p>
                <p>&nbsp;</p>
                <h2>参考资料</h2>
                <ul>
                    <li><a href='https://en.wikipedia.org/wiki/Tim_Berners-Lee'>Tim Berners Lee</a></li>
                    <li><a href='http://item.jd.com/11600174.html'>《CDN技术详解》</a></li>
                    <li><a href='http://blog.csdn.net/liuhongxiangm/article/details/8785312'>CDN技术原理</a></li>
                    <li><a href='http://www.squid-cache.org/'>Squid</a></li>

                </ul>
                <ul>
                    <li><a href='http://item.jd.com/11600174.html'>《DNS与BIND》</a></li>
                    <li><a href='https://www.damagehead.com/blog/2015/04/28/deploying-a-dns-server-using-docker/'>Deploying a DNS Server using Docker</a></li>

                </ul>



            </div>
        );
    }
}

export default CDN;