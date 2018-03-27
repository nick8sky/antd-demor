import React, {Component} from 'react';
import Markdown from 'react-markdown';

class RedisCluster extends Component {
    render() {
        return (
            <div>
                <Markdown source={"参考http://blog.csdn.net/sinat_38259539/article/details/73381979\n" +
                "\n" +
                "​\thttps://www.cnblogs.com/wuxl360/p/5920330.html\n" +
                "\n" +
                "redis-cluster（集群）架构图\n" +
                "\n" +
                "![Markdown](http://i4.bvimg.com/633340/415478f2c4830ae6.png)\n" +
                "\n" +
                "架构细节:\n" +
                "\n" +
                "(1)所有的redis节点彼此互联(PING-PONG机制),内部使用二进制协议优化传输速度和带宽.\n" +
                "\n" +
                "(2)节点的fail(失败）是通过集群中超过半数的节点检测失效时才生效.（那么要求集群最少三台服务器，每台在带一个备份，则最少6台服务器）\n" +
                "\n" +
                "(3)客户端与redis节点直连,不需要中间proxy层.客户端不需要连接集群所有节点,连接集群中任何一个可用节点即可\n" +
                "\n" +
                "(4)redis-cluster把所有的物理节点映射到[0-16383]slot（槽）上,cluster负责维护node<->slot<->value\n" +
                "\n" +
                "Redis集群中内置了 16384 个哈希槽，当需要在 Redis集群中放置一个 key-value时，redis先对 key使用 crc16算法算出一个结果，然后把结果对 16384求余数，这样每个 key都会对应一个编号在 0-16383之间的哈希槽，redis会根据节点数量大致均等的将哈希槽映射到不同的节点\n" +
                "\n" +
                "redis-cluster投票:容错\n" +
                "\n" +
                "![Markdown](http://i4.bvimg.com/633340/1195b711aaacd886.png)\n" +
                "\n" +
                "(1)集群中所有master参与投票,如果半数以上master节点与该master节点通信超过(cluster-node-timeout),认为当前master节点挂掉.\n" +
                "\n" +
                "(2):什么时候整个集群不可用(cluster_state:fail)? \n" +
                "\n" +
                "​    a:如果集群任意master挂掉,且当前master没有slave.集群进入fail状态,也可以理解成集群的slot映射[0-16383]不完成时进入fail状态. ps : redis-3.0.0.rc1加入cluster-require-full-coverage参数,默认关闭,打开集群兼容部分失败.\n" +
                "\n" +
                "​    b:如果集群超过半数以上master挂掉，无论是否有slave集群进入fail状态.\n" +
                "\n" +
                "  ps:当集群不可用时,所有对集群的操作做都不可用，收到((error) CLUSTERDOWN The cluster is down)错误。\n" +
                "\n" +
                "## **查看集群状态**\n" +
                "\n" +
                "连接之后输入命令：\n" +
                "\n" +
                "cluster info\n" +
                "\n" +
                "```\n" +
                "192.168.204.134:7006> cluster info  \n" +
                "cluster_state:ok  \n" +
                "cluster_slots_assigned:16384  \n" +
                "cluster_slots_ok:16384  \n" +
                "cluster_slots_pfail:0  \n" +
                "cluster_slots_fail:0  \n" +
                "cluster_known_nodes:6  \n" +
                "cluster_size:3  \n" +
                "cluster_current_epoch:10  \n" +
                "cluster_my_epoch:8  \n" +
                "cluster_stats_messages_sent:778  \n" +
                "cluster_stats_messages_received:772\n" +
                "```\n" +
                "\n" +
                "[root@localhost redis-cluster]# redis01/redis-cli -p 7002 -c\n" +
                "\n" +
                "-c：代表连接的是redis集群\n" +
                "\n" +
                "或者指定ip和端口的连接\n" +
                "\n" +
                "[root@localhost redis-cluster]# redis01/redis-cli -h 192.168.25.174 -p 7006 **-c**\n" +
                "\n" +
                " 连接集群需要添加-c 参数。否则节点之间跳转失败。\n" +
                "\n" +
                "查看集群节点\n" +
                "\n" +
                "```\n" +
                "192.168.204.134:7006> cluster nodes  \n" +
                "f82a8527c278572b6d7957e0be0bb9360a85d957 192.168.204.134:7002 slave 7d63094e086a0488ecbf0904092ca901fdfb3f16 0 1497743623527 10 connected  \n" +
                "6c011939ded42f173718917ed44d1da7476b9d5b 192.168.204.134:7001 slave d8092f56af3206899cb54ff4acb14bc8b13fd640 0 1497743622518 7 connected  \n" +
                "46f016bde6a8eef81697f6c75e1a8a74f7f415fc 192.168.204.134:7006 myself,master - 0 0 8 connected 10923-16383  \n" +
                "7d63094e086a0488ecbf0904092ca901fdfb3f16 192.168.204.134:7005 master - 0 1497743618478 10 connected 5461-10922  \n" +
                "d8092f56af3206899cb54ff4acb14bc8b13fd640 192.168.204.134:7004 master - 0 1497743617468 7 connected 0-5460  \n" +
                "422b498bc52837b0125d74721466a207b8e9ce4d 192.168.204.134:7003 slave 46f016bde6a8eef81697f6c75e1a8a74f7f415fc 0 1497743619488 8 connected  \n" +
                "```\n" +
                "\n" +
                "\n" +
                "\n" +
                "## jedis连接集群\n" +
                "\n" +
                "```\n" +
                "<!-- 连接池配置 -->  \n" +
                "    <bean id=\"jedisPoolConfig\" class=\"redis.clients.jedis.JedisPoolConfig\">  \n" +
                "        <!-- 最大连接数 -->  \n" +
                "        <property name=\"maxTotal\" value=\"30\" />  \n" +
                "        <!-- 最大空闲连接数 -->  \n" +
                "        <property name=\"maxIdle\" value=\"10\" />  \n" +
                "        <!-- 每次释放连接的最大数目 -->  \n" +
                "        <property name=\"numTestsPerEvictionRun\" value=\"1024\" />  \n" +
                "        <!-- 释放连接的扫描间隔（毫秒） -->  \n" +
                "        <property name=\"timeBetweenEvictionRunsMillis\" value=\"30000\" />  \n" +
                "        <!-- 连接最小空闲时间 -->  \n" +
                "        <property name=\"minEvictableIdleTimeMillis\" value=\"1800000\" />  \n" +
                "        <!-- 连接空闲多久后释放, 当空闲时间>该值 且 空闲连接>最大空闲连接数 时直接释放 -->  \n" +
                "        <property name=\"softMinEvictableIdleTimeMillis\" value=\"10000\" />  \n" +
                "        <!-- 获取连接时的最大等待毫秒数,小于零:阻塞不确定的时间,默认-1 -->  \n" +
                "        <property name=\"maxWaitMillis\" value=\"1500\" />  \n" +
                "        <!-- 在获取连接的时候检查有效性, 默认false -->  \n" +
                "        <property name=\"testOnBorrow\" value=\"true\" />  \n" +
                "        <!-- 在空闲时检查有效性, 默认false -->  \n" +
                "        <property name=\"testWhileIdle\" value=\"true\" />  \n" +
                "        <!-- 连接耗尽时是否阻塞, false报异常,ture阻塞直到超时, 默认true -->  \n" +
                "        <property name=\"blockWhenExhausted\" value=\"false\" />  \n" +
                "    </bean>     \n" +
                "    <!-- redis集群 -->  \n" +
                "    <bean id=\"jedisCluster\" class=\"redis.clients.jedis.JedisCluster\">  \n" +
                "        <constructor-arg index=\"0\">  \n" +
                "            <set>  \n" +
                "                <bean class=\"redis.clients.jedis.HostAndPort\">  \n" +
                "                    <constructor-arg index=\"0\" value=\"192.168.204.134\"></constructor-arg>  \n" +
                "                    <constructor-arg index=\"1\" value=\"7001\"></constructor-arg>  \n" +
                "                </bean>  \n" +
                "                <bean class=\"redis.clients.jedis.HostAndPort\">  \n" +
                "                    <constructor-arg index=\"0\" value=\"192.168.204.134<span style=\"font-family:Arial, Helvetica, sans-serif;font-size:12px;\">\"></constructor-arg></span>  \n" +
                "                    <constructor-arg index=\"1\" value=\"7002\"></constructor-arg>  \n" +
                "                </bean>  \n" +
                "                <bean class=\"redis.clients.jedis.HostAndPort\">  \n" +
                "                    <constructor-arg index=\"0\" value=\"192.168.204.134\"></constructor-arg>  \n" +
                "                    <constructor-arg index=\"1\" value=\"7003\"></constructor-arg>  \n" +
                "                </bean>  \n" +
                "                <bean class=\"redis.clients.jedis.HostAndPort\">  \n" +
                "                    <constructor-arg index=\"0\" value=\"192.168.204.134\"></constructor-arg>  \n" +
                "                    <constructor-arg index=\"1\" value=\"7004\"></constructor-arg>  \n" +
                "                </bean>  \n" +
                "                <bean class=\"redis.clients.jedis.HostAndPort\">  \n" +
                "                    <constructor-arg index=\"0\" value=\"192.168.204.134\"></constructor-arg>  \n" +
                "                    <constructor-arg index=\"1\" value=\"7005\"></constructor-arg>  \n" +
                "                </bean>  \n" +
                "                <bean class=\"redis.clients.jedis.HostAndPort\">  \n" +
                "                    <constructor-arg index=\"0\" value=\"192.168.204.134\"></constructor-arg>  \n" +
                "                    <constructor-arg index=\"1\" value=\"7006\"></constructor-arg>  \n" +
                "                </bean>  \n" +
                "            </set>  \n" +
                "        </constructor-arg>  \n" +
                "        <constructor-arg index=\"1\" ref=\"jedisPoolConfig\"></constructor-arg>  \n" +
                "    </bean> \n" +
                "```\n" +
                "\n" +
                "\n" +
                "\n" +
                "用两台虚拟机模拟6个节点，一台机器3个节点，创建出3 master、3 salve 环境。\n" +
                "\n" +
                "redis 采用 redis-3.2.4 版本。\n" +
                "\n" +
                "两台虚拟机都是 CentOS ，一台 CentOS6.5 （IP:192.168.31.245），一台 CentOS7（IP:192.168.31.210） 。\n" +
                "\n" +
                "安装过程\n" +
                "\n" +
                "1. 下载并解压\n" +
                "\n" +
                "```\n" +
                "cd /root/software\n" +
                "wget http:``//download``.redis.io``/releases/redis-3``.2.4.``tar``.gz\n" +
                "tar -zxvf redis-3.2.4.``tar``.gz\n" +
                "```\n" +
                "\n" +
                "2. 编译安装\n" +
                "\n" +
                "```\n" +
                "cd redis-3.2.4\n" +
                "make && make install\n" +
                "```\n" +
                "\n" +
                "3. 将 redis-trib.rb 复制到 /usr/local/bin 目录下\n" +
                "\n" +
                "```\n" +
                "cd src\n" +
                "cp redis-trib.rb /usr/local/bin/　　\n" +
                "```\n" +
                "\n" +
                "4. 创建 Redis 节点\n" +
                "\n" +
                "首先在 192.168.31.245 机器上 /root/software/redis-3.2.4 目录下创建 redis_cluster 目录；\n" +
                "\n" +
                "```\n" +
                "mkdir redis_cluster　　\n" +
                "```\n" +
                "\n" +
                "在 redis_cluster 目录下，创建名为7000、7001、7002的目录，并将 redis.conf 拷贝到这三个目录中\n" +
                "\n" +
                "```\n" +
                "mkdir 7000 7001 7002\n" +
                "cp redis.conf redis_cluster/7000\n" +
                "cp redis.conf redis_cluster/7001\n" +
                "cp redis.conf redis_cluster/7002　　\n" +
                "```\n" +
                "\n" +
                "分别修改这三个配置文件，修改如下内容\n" +
                "\n" +
                "```\n" +
                "port  7000                //端口7000,7001,7002        \n" +
                "bind  192.168.31.245      //默认ip为127.0.0.1 需要改为其他节点机器可访问的ip 否则创建集群时无法访问对应的端口，无法创建集群\n" +
                "daemonize    yes                           //redis后台运行\n" +
                "pidfile  /var/run/redis_7000.pid           //pidfile文件对应7000,7001,7002\n" +
                "cluster-enabled  yes                       //开启集群  把注释#去掉\n" +
                "cluster-config-file  nodes_7000.conf       //集群的配置  配置文件首次启动自动生成 7000,7001,7002\n" +
                "cluster-node-timeout  15000                //请求超时  默认15秒，可自行设置\n" +
                "appendonly  yes                            //aof日志开启  有需要就开启，它会每次写操作都记录一条日志　\n" +
                "```\n" +
                "\n" +
                "- 接着在另外一台机器上（192.168.31.210），的操作重复以上三步，只是把目录改为7003、7004、7005，对应的配置文件也按照这个规则修改即可\n" +
                "\n" +
                "5. 启动各个节点\n" +
                "\n" +
                "```\n" +
                "第一台机器上执行\n" +
                "redis-server redis_cluster/7000/redis.conf\n" +
                "redis-server redis_cluster/7001/redis.conf\n" +
                "redis-server redis_cluster/7002/redis.conf\n" +
                " \n" +
                "另外一台机器上执行\n" +
                "redis-server redis_cluster/7003/redis.conf\n" +
                "redis-server redis_cluster/7004/redis.conf\n" +
                "redis-server redis_cluster/7005/redis.conf \n" +
                "```\n" +
                "\n" +
                "6. 检查 redis 启动情况\n" +
                "\n" +
                "```\n" +
                "##ps -ef | grep redis\n" +
                "root      61020      1  0 02:14 ?        00:00:01 redis-server 127.0.0.1:7000 [cluster]    \n" +
                "root      61024      1  0 02:14 ?        00:00:01 redis-server 127.0.0.1:7001 [cluster]    \n" +
                "root      61029      1  0 02:14 ?        00:00:01 redis-server 127.0.0.1:7002 [cluster]    \n" +
                " \n" +
                "netstat -tnlp | grep redis\n" +
                "...\n" +
                "```\n" +
                "\n" +
                "7.创建集群\n" +
                "\n" +
                "Redis 官方提供了 redis-trib.rb 这个工具，就在解压目录的 src 目录中，第三步中已将它复制到 /usr/local/bin 目录中，可以直接在命令行中使用了。使用下面这个命令即可完成安装。\n" +
                "\n" +
                "```\n" +
                "redis-trib.rb  create  --replicas  1  192.168.31.245:7000 192.168.31.245:7001  192.168.31.245:7002 192.168.31.210:7003  192.168.31.210:7004  192.168.31.210:7005\n" +
                "```\n +replicas参数，--replicas 2 意思为为每个 master 分配 2 各 slave，replicas表示需要有几个slave。不填写这个参数是可以创建成功的，这样是三个master 。--replicas 1   1其实代表的是一个比例，就是主节点数/从节点数的比例。那么想一想，在创建集群的时候，哪些节点是主节点呢？哪些节点是从节点呢？答案是将按照命令中IP:PORT的顺序，先是3个主节点，然后是3个从节点。\n"+
                "\n" +
                "其中，前三个 ip:port 为第一台机器的节点，剩下三个为第二台机器。\n" +
                "8. 集群验证\n" +
                "\n" +
                "在第一台机器上连接集群的7002端口的节点，在另外一台连接7005节点，连接方式为 redis-cli -h 192.168.31.245 -c -p 7002  ,加参数 -C 可连接到集群，因为上面 redis.conf 将 bind 改为了ip地址，所以 -h 参数不可以省略。\n" +
                "\n" +
                "简单说一下原理\n" +
                "\n" +
                "redis cluster在设计的时候，就考虑到了去中心化，去中间件，也就是说，集群中的每个节点都是平等的关系，都是对等的，每个节点都保存各自的数据和整个集群的状态。每个节点都和其他所有节点连接，而且这些连接保持活跃，这样就保证了我们只需要连接集群中的任意一个节点，就可以获取到其他节点的数据。\n" +
                "\n" +
                "Redis 集群没有并使用传统的一致性哈希来分配数据，而是采用另外一种叫做`哈希槽 (hash slot)`的方式来分配的。redis cluster 默认分配了 16384 个slot，当我们set一个key 时，会用`CRC16`算法来取模得到所属的`slot`，然后将这个key 分到哈希槽区间的节点上，具体算法就是：`CRC16(key) % 16384。所以我们在测试的时候看到set 和 get 的时候，直接跳转到了7000端口的节点。`\n" +
                "\n" +
                "Redis 集群会把数据存在一个 master 节点，然后在这个 master 和其对应的salve 之间进行数据同步。当读取数据时，也根据一致性哈希算法到对应的 master 节点获取数据。只有当一个master 挂掉之后，才会启动一个对应的 salve 节点，充当 master 。\n" +
                "\n" +
                "需要注意的是：必须要`3个或以上`的主节点，否则在创建集群时会失败，并且当存活的主节点数小于总节点数的一半时，整个集群就无法提供服务了。"}/>

            </div>
        );
    }
}

export default RedisCluster;