import React, { Component } from 'react';
import Markdown  from 'react-markdown';



class Mysql7 extends Component {
    render() {


        return (
            <div>
                <Markdown source={"## MySQL高可用负载均衡集群\n" +
                "\n" +
                "参考：https://www.cnblogs.com/phpstudy2015-6/p/6706465.html\n" +
                "\n" +
                "​\t那么如何跨过这个瓶颈，提高MySQL的并发量呢？方法有很多，分布式数据库、读写分离、高可用负载均衡、增加缓存服务器等等。之前的文章里已经介绍了读写分离的方案了，接下来我将讲解MySQL高可用负载均衡这一方法。\n" +
                "\n" +
                "　　其中实现高可用负载均衡的方法有很多，例如LVS+keepalived组合实现、haproxy+keepalived组合实现等等，这里我们采用haproxy+keepalived组合实现MySQL高可用负载均衡这一技术。\n" +
                "\n" +
                "\n" +
                "\n" +
                "**基本环境**\n" +
                "\n" +
                "四台linux虚拟主机\n" +
                "\n" +
                "Linux版本CentOS6.6\n" +
                "\n" +
                "MySQL 5.5（已安装好）\n" +
                "\n" +
                "haproxy-1.5.14\n" +
                "\n" +
                "keepalived-1.2.19\n" +
                "\n" +
                "IP：192.168.95.11（mysql1）、192.168.95.12（mysql2）、192.168.95.13（haproxy+keepalived）、192.168.95.14（haproxy+keepalived）、192.168.95.55（vip）\n" +
                "\n" +
                "vip： 虚拟主机\n" +
                "\n" +
                "\n" +
                "\n" +
                "**配置MySQL主主复制**\n" +
                "\n" +
                "何为主主复制？就是两个mysql都能读能写，数据记录通过二进制传达给对方从而保持数据的一致性。\n" +
                "\n" +
                "（192.168.95.11主从复制+192.168.95.12主从复制==192.168.95.11、192.168.95.12主主复制）\n" +
                "\n" +
                "　　因此主主复制中必须要解决的事情就是自增主键的问题。如果mysql1主键id增加到12了，此时二进制数据还没到达mysql2，那么mysql2恰好要插入数据，那么新数据主键id也是12，那不就是乱套了么！解决这一问题我们可以直接更改MySQL中的配置文件即可。\n" +
                "\n" +
                "```\n" +
                "auto_increment_increment=2   #步进值auto_imcrement。一般有n台主MySQL就填n\n" +
                "auto_increment_offset=1      #起始值。一般填第n台主MySQL。此时为第一台主MySQL\n" +
                "```\n" +
                "\n" +
                "---\n" +
                "\n" +
                "**Haproxy介绍**\n" +
                "\n" +
                "​\tHaproxy是一个开源的高性能的反向代理或者说是负载均衡服务软件之一，它支持双机热备、虚拟主机、基于TCP和HTTP应用代理等功能。其配置简单，而且拥有很好的对服务器节点的健康检查功能（相当于keepalived健康检查），当其代理的后端服务器出现故障时，Haproxy会自动的将该故障服务器摘除，当服务器的故障恢复后Haproxy还会自动将RS服务器。\n" +
                "\n" +
                "​\tHAProxy特别适用于那些负载特大的web站点，这些站点通常又需要会话保持或七层处理。HAProxy运行在当前的硬件上，完全可以支持数以万计的并发连接。并且它的运行模式使得它可以很简单安全的整合进您当前的架构中， 同时可以保护你的web服务器不被暴露到网络上。\n" +
                "\n" +
                "​\tHaproxy软件引入了frontend，backend的功能，frontend（acl规则匹配）可以根据任意HTTP请求头做规则匹配，然后把请求定向到相关的backend（server pools等待前端把请求转过来的服务器组）。通过frontend和backup，我们可以很容易的实现haproxy的7层代理功能，haproxy是一款不可多得的优秀代理服务软件。\n" +
                "\n" +
                "\n" +
                "\n" +
                "**keepalived介绍**\n" +
                "\n" +
                "​\tkeepalived是以VRRP协议为实现基础的，VRRP全称Virtual Router Redundancy Protocol，即虚拟路由冗余协议。\n" +
                "\n" +
                "​\t虚拟路由冗余协议，可以认为是实现路由器高可用的协议，即将N台提供相同功能的路由器组成一个路由器组，这个组里面有一个master和多个backup，master上面有一个对外提供服务的vip（该路由器所在局域网内其他机器的默认路由为该vip），master会发组播，当backup收不到vrrp包时就认为master宕掉了，这时就需要根据VRRP的优先级来选举一个backup当master。这样的话就可以保证路由器的高可用了。\n" +
                "\n" +
                "​\tkeepalived主要有三个模块，分别是core、check和vrrp。core模块为keepalived的核心，负责主进程的启动、维护以及全局配置文件的加载和解析。check负责健康检查，包括常见的各种检查方式。vrrp模块是来实现VRRP协议的。\n" +
                "\n" +
                "\n" +
                "\n" +
                "**Haproxy& keepalived的安装与配置**\n" +
                "\n" +
                "安装haproxy，自行百度。\n" +
                "\n" +
                "在192.168.95.13、192.168.95.14安装haproxy\n" +
                "\n" +
                "配置：\n" +
                "\n" +
                "```\n" +
                "global\n" +
                "\n" +
                "    log         127.0.0.1 local2         //日志定义级别\n" +
                "    chroot      /var/lib/haproxy         //当前工作目录\n" +
                "    pidfile     /var/run/haproxy.pid     //进程id\n" +
                "    maxconn     4000                     //最大连接数\n" +
                "    user        haproxy                  //运行改程序的用户\n" +
                "    group       haproxy\n" +
                "    daemon                               //后台形式运行\n" +
                "    stats socket /var/lib/haproxy/stats\n" +
                "\n" +
                "defaults\n" +
                "    mode                    tcp            //haproxy运行模式（http | tcp | health）\n" +
                "    log                     global\n" +
                "    option                  dontlognull\n" +
                "    option                  redispatch     //serverId对应的服务器挂掉后,强制定向到其他健康的服务器\n" +
                "    retries                 3              //三次连接失败则服务器不用\n" +
                "    timeout http-request    10s\n" +
                "    timeout queue           1m\n" +
                "    timeout connect         10s            //连接超时\n" +
                "    timeout client          1m             //客户端超时\n" +
                "    timeout server          1m             //服务器超时\n" +
                "    timeout http-keep-alive 10s\n" +
                "    timeout check           10s            //心跳检测\n" +
                "    maxconn                 600            //最大连接数\n" +
                "\n" +
                "listen stats                               //配置haproxy状态页（用来查看的页面）\n" +
                "    mode http\n" +
                "    bind :8888\n" +
                "    stats enable\n" +
                "    stats hide-version                    //隐藏haproxy版本号\n" +
                "stats uri     /haproxyadmin?stats     //一会用于打开状态页的uri\n" +
                "    stats realm   Haproxy\\ Statistics     //输入账户密码时的提示文字\n" +
                "    stats auth    admin:admin             //用户名:密码\n" +
                "\n" +
                "frontend  main \n" +
                "bind 0.0.0.0:3306                     //使用3306端口。监听前端端口【表示任何ip访问3306端口都会将数据轮番转发到mysql服务器群组中】\n" +
                "    default_backend             mysql     //后端服务器组名\n" +
                "\n" +
                "backend mysql\n" +
                "    balance     leastconn                 //使用最少连接方式调度\n" +
                "    server mysql1 192.168.95.11:3306 check port 3306 maxconn 300\n" +
                "    server mysql2 192.168.95.12:3306 check port 3306 maxconn 300\n" +
                "```\n" +
                "\n" +
                "\n" +
                "\n" +
                "#### 启动haproxy\n" +
                "\n" +
                "```\n" +
                "service haproxy start\n" +
                "```\n" +
                "\n" +
                "**测试haproxy**\n" +
                "\n" +
                "打开浏览器输入127.0.0.1:8888/haproxyadmin?stats\n" +
                "\n" +
                "登陆后如下如所示，表明安装haproxy成功\n" +
                "\n" +
                "![Markdown](https://thumbnail0.baidupcs.com/thumbnail/bee45700b38260ebbc7298a94b120e6c?fid=940423185-250528-677973943426808&time=1520078400&rt=sh&sign=FDTAER-DCb740ccc5511e5e8fedcff06b081203-llvuI1tKtVXWTqD%2BEYxc%2Bupt5BU%3D&expires=8h&chkv=0&chkbd=0&chkpc=&dp-logid=1434369417710429611&dp-callid=0&size=c710_u400&quality=100&vuk=-&ft=video)\n" +
                "\n" +
                "\n" +
                "\n" +
                "**安装keepalived**\n" +
                "\n" +
                "安装keepalived，自行百度。\n" +
                "\n" +
                "在192.168.95.13、192.168.95.14安装keepalived\n" +
                "\n" +
                "这一步骤视具体的linux版本而定，有些已经安装openssl了。具体情况可以执行./configure就能够确定缺不缺少软件库文件了\n" +
                "\n" +
                "配置文件:\n" +
                "\n" +
                "```\n" +
                "! Configuration File for keepalived\n" +
                "#简单的头部，这里主要可以做邮件通知报警等的设置，此处就暂不配置了；\n" +
                "global_defs {\n" +
                "        notificationd LVS_DEVEL\n" +
                "}\n" +
                "#预先定义一个脚本，方便后面调用，也可以定义多个，方便选择；\n" +
                "vrrp_script chk_haproxy {\n" +
                "    script \"/etc/keepalived/chk.sh\"  #具体脚本路径\n" +
                "    interval 2  #脚本循环运行间隔\n" +
                "}\n" +
                "#VRRP虚拟路由冗余协议配置\n" +
                "vrrp_instance VI_1 {   #VI_1 是自定义的名称；\n" +
                "    state BACKUP    #MASTER表示是一台主设备，BACKUP表示为备用设备【我们这里因为设置为开启不抢占，所以都设置为备用】\n" +
                "    nopreempt      #开启不抢占\n" +
                "    interface eth0   #指定VIP需要绑定的物理网卡\n" +
                "    virtual_router_id 11   #VRID虚拟路由标识，也叫做分组名称，该组内的设备需要相同\n" +
                "    priority 130   #定义这台设备的优先级 1-254；开启了不抢占，所以此处优先级必须高于另一台\n" +
                "\n" +
                "    advert_int 1   #生存检测时的组播信息发送间隔，组内一致\n" +
                "    authentication {    #设置验证信息，组内一致\n" +
                "        auth_type PASS   #有PASS 和 AH 两种，常用 PASS\n" +
                "        auth_pass asd    #密码\n" +
                "    }\n" +
                "    virtual_ipaddress {\n" +
                "        192.168.95.55    #指定VIP地址，组内一致，可以设置多个IP\n" +
                "    }\n" +
                "    track_script {    #使用在这个域中使用预先定义的脚本，上面定义的\n" +
                "        chk_haproxy   \n" +
                "    }\n" +
                "\n" +
                "    notify_backup \"/etc/init.d/haproxy restart\"   #表示当切换到backup状态时,要执行的脚本\n" +
                "    notify_fault \"/etc/init.d/haproxy stop\"     #故障时执行的脚本\n" +
                "}\n" +
                "```\n" +
                "\n" +
                "配置文件与上面的几乎一样，仅仅改变priority 120【只需要比上面的小即可】\n" +
                "\n" +
                "#### 流程简述\n" +
                "\n" +
                "大概讲述一下整体的运作流程:\n" +
                "\n" +
                "首先两个11,12的mysql以及13、14的haproxy、keepalived都启动；\n" +
                "\n" +
                "keepalived在keepalived群组中获取虚拟IP，以及检测haproxy是否被kill；\n" +
                "\n" +
                "haproxy负责将进来的数据转发到11或者12的mysql中。\n" +
                "\n" +
                "![Markdown](https://thumbnail0.baidupcs.com/thumbnail/a665630141a7cc730213f40a0bc91864?fid=940423185-250528-197252472016132&time=1520078400&rt=sh&sign=FDTAER-DCb740ccc5511e5e8fedcff06b081203-kLLT7yyxiXssIhNugKanHN%2FPhDg%3D&expires=8h&chkv=0&chkbd=0&chkpc=&dp-logid=1434388571114619682&dp-callid=0&size=c710_u400&quality=100&vuk=-&ft=video)\n" +
                "\n" +
                "\n" +
                "\n" +
                "#### 测试haproxy监听前端端口3306\n" +
                "\n" +
                "windows上登陆mysql\n" +
                "\n" +
                "![Markdown](https://thumbnail0.baidupcs.com/thumbnail/157f3deed47bbffb302eafc97c687613?fid=940423185-250528-780497560060123&time=1520078400&rt=sh&sign=FDTAER-DCb740ccc5511e5e8fedcff06b081203-fZR7WarojYWZuCH%2F3iT%2Bi7zsOmY%3D&expires=8h&chkv=0&chkbd=0&chkpc=&dp-logid=1434396034463355484&dp-callid=0&size=c710_u400&quality=100&vuk=-&ft=video)\n" +
                "\n" +
                "\n" +
                "\n" +
                "可以通过haproxy监控页面获知谁获取了vip\n" +
                "\n" +
                "依次启动13、14的keepalived、haproxy（启动keepalived后将会自动开启haproxy）\n" +
                "\n" +
                "![Markdown](https://thumbnail0.baidupcs.com/thumbnail/1cc8800bade783b5863b5dc45f31dc68?fid=940423185-250528-1004847703726552&time=1520078400&rt=sh&sign=FDTAER-DCb740ccc5511e5e8fedcff06b081203-Wq%2F2CLUhzPmtXpOHGx7HMl5eaOc%3D&expires=8h&chkv=0&chkbd=0&chkpc=&dp-logid=1434402038219263173&dp-callid=0&size=c710_u400&quality=100&vuk=-&ft=video)\n" +
                "\n" +
                "![Markdown](https://thumbnail0.baidupcs.com/thumbnail/580a877289289ff308b0f43ac701115c?fid=940423185-250528-182043490785597&time=1520078400&rt=sh&sign=FDTAER-DCb740ccc5511e5e8fedcff06b081203-y75Xfo%2FODcEzTa1D9YT7octrXXY%3D&expires=8h&chkv=0&chkbd=0&chkpc=&dp-logid=1434414907904797678&dp-callid=0&size=c710_u400&quality=100&vuk=-&ft=video)\n" +
                "\n" +
                "访问http://192.168.95.55:8888/haproxyadmin?stats\n" +
                "\n" +
                "13获取了vip\n" +
                "\n" +
                "![Markdown](https://thumbnail0.baidupcs.com/thumbnail/afe539a2938d5db39fada647237b9256?fid=940423185-250528-728646935173222&time=1520078400&rt=sh&sign=FDTAER-DCb740ccc5511e5e8fedcff06b081203-5rnZ0Oni9l%2BSXskRhPTUaJ0%2FKtM%3D&expires=8h&chkv=0&chkbd=0&chkpc=&dp-logid=1434421710862292860&dp-callid=0&size=c710_u400&quality=100&vuk=-&ft=video)\n" +
                "\n" +
                "\\# kill -9 8923\n" +
                "\n" +
                "刷新http://192.168.95.55:8888/haproxyadmin?stats\n" +
                "\n" +
                "![Markdown](https://thumbnail0.baidupcs.com/thumbnail/16dffe7971b07e654de22df0a209d16e?fid=940423185-250528-187648820697606&time=1520078400&rt=sh&sign=FDTAER-DCb740ccc5511e5e8fedcff06b081203-CeufNYDQXEF2Somln7jRyntaLws%3D&expires=8h&chkv=0&chkbd=0&chkpc=&dp-logid=1434427483762141720&dp-callid=0&size=c710_u400&quality=100&vuk=-&ft=video)\n" +
                "\n" +
                "14获取了vip，机器正常工作\n" +
                "\n" +
                "结果：证明了高可用，挂了一台另一台继续工作\n" +
                "\n" +
                "4、重新启动13的haproxy以及keepalived\n" +
                "\n" +
                "并刷新http://192.168.95.55:8888/haproxyadmin?stats\n" +
                "\n" +
                "![Markdown](https://thumbnail0.baidupcs.com/thumbnail/2a1d0b75f44d9d07630f3a21cf1f3010?fid=940423185-250528-278248687248663&time=1520078400&rt=sh&sign=FDTAER-DCb740ccc5511e5e8fedcff06b081203-J3QmzdA%2FTfbzBfvXiDeClVZUgws%3D&expires=8h&chkv=0&chkbd=0&chkpc=&dp-logid=1434434514125039691&dp-callid=0&size=c710_u400&quality=100&vuk=-&ft=video)\n" +
                "\n" +
                "结果：此时vip仍在14手中，证明了keepalived配置了不抢占vip，不必浪费资源去获取vip。\n" +
                "\n" +
                "\n" +
                "\n" +
                "#### 测试负载均衡\n" +
                "\n" +
                "1、全部正常启动，此时vip在14手中\n" +
                "\n" +
                "2、分别在11、12中开启抓包\n" +
                "\n" +
                "```\n" +
                "# tcpdump -n -i eth0 host 192.168.95.11 and 192.168.95.14\n" +
                "# tcpdump -n -i eth0 host 192.168.95.12 and 192.168.95.14\n" +
                "```\n" +
                "\n" +
                "3、使用不同客户端登陆jack用户，不断向数据库添加数据\n" +
                "\n" +
                "从客户端的console上看到，vip会向11，12都发送sql请求，此时证明负载均衡。\n" +
                "\n" +
                "【我们设置的haproxy中balance方式是最少连接方式，假若采用roundrobin方式测试结果将会更加明显】\n" +
                "\n" +
                "注意：\n" +
                "\n" +
                "当某一台mysql挂了以后，haproxy会将其踢出mysql服务器群组。\n" +
                "\n" +
                "当有命令传来时会将其转发到正常的服务器上。\n" +
                "\n" +
                "当出问题的mysql恢复后，haproxy又会自动地将它放回mysql服务器群组中，并且自动同步没有同步的数据\n" +
                "\n" +
                "\n" +
                "\n" +
                "测试：\n" +
                "\n" +
                "1、全部正常启动\n" +
                "\n" +
                "mysql1、mysql2都正常\n" +
                "\n" +
                "![Markdown](https://thumbnail0.baidupcs.com/thumbnail/f6c60df2658765a9b72c671e31583887?fid=940423185-250528-234425101750241&time=1520078400&rt=sh&sign=FDTAER-DCb740ccc5511e5e8fedcff06b081203-0gI8mo%2Fc8aRAeY%2FofWkkNR7VCeg%3D&expires=8h&chkv=0&chkbd=0&chkpc=&dp-logid=1434440746610387172&dp-callid=0&size=c710_u400&quality=100&vuk=-&ft=video)\n" +
                "\n" +
                " 2、将mysql2关掉\n" +
                "\n" +
                "![Markdown](https://thumbnail0.baidupcs.com/thumbnail/f6c60df2658765a9b72c671e31583887?fid=940423185-250528-234425101750241&time=1520078400&rt=sh&sign=FDTAER-DCb740ccc5511e5e8fedcff06b081203-0gI8mo%2Fc8aRAeY%2FofWkkNR7VCeg%3D&expires=8h&chkv=0&chkbd=0&chkpc=&dp-logid=1434440746610387172&dp-callid=0&size=c710_u400&quality=100&vuk=-&ft=video)\n" +
                "\n" +
                "mysql2出问题，将其踢出mysql群组\n" +
                "\n" +
                "3、启动mysql2\n" +
                "\n" +
                "![Markdown](https://thumbnail0.baidupcs.com/thumbnail/7810fab18862d7faddc912ff9a78dcf1?fid=940423185-250528-520315697555512&time=1520078400&rt=sh&sign=FDTAER-DCb740ccc5511e5e8fedcff06b081203-R2waUBSZxAd8gSXzhLD%2BWKXTiV8%3D&expires=8h&chkv=0&chkbd=0&chkpc=&dp-logid=1434458592509383365&dp-callid=0&size=c710_u400&quality=100&vuk=-&ft=video)\n" +
                "\n" +
                "mysql2恢复后又将其放回mysql群组里\n" +
                "\n" +
                "【当mysql2挂掉时，若有数据插入，将会转发给mysql1，当mysql恢复后，又会将这些数据同步到mysql2中】\n" +
                "\n" +
                "---\n" +
                "\n" +
                "在这篇文章中我们不仅仅只关注这一整个mysql高可用负载均衡的实现方式，我们还应该理解haproxy以及keepalived的工作方式。Haproxy和keepalived这两个工具很强大，了解他们的实现方式，那么就可以以此类推与其他服务器组合构建强大健壮的服务集群。例如它可以与apache组合，构成高可用负载均衡的web集群。\n" +
                "\n" +
                "　　这篇文章中只是简简单单的搭建了一个mysql高可用负载均衡的环境，真正应用到生产环境中，还需要根据具体项目进行相应的修改。\n" +
                "\n" +
                "　　最后我的小建议就是看完这篇博客可以去了解了解更多的haproxy和keepalived的相应配置，以及学习与haproxy功能差不多的LVS。\n" +
                "\n"}/>




            </div>
        );
    }
}

export default Mysql7;