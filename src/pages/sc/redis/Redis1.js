import React, {Component} from 'react';
import {Anchor, Row, Col} from 'antd';


const {Link} = Anchor;


class Redis1 extends Component {

    s = "{";
    render() {

        return (
            <div>
                <Row>
                    <Col span={19}>
                        <h2 id="Redis的特性"><a href="javascript:void(0)" class="anchor">Redis的特性</a></h2>
                        <p>redis全称REmote DIctionary Server，是一个由Salvatore Sanfilippo写的高性能key-value存储系统，其完全开源免费，遵守BSD协议。Redis与其他key-value缓存产品（如memcache）有以下几个特点。 </p>
                        <ul>
                            <li>Redis支持数据的持久化，可以将内存中的数据保存在磁盘中，重启的时候可以再次加载进行使用。 </li>
                            <li>Redis不仅仅支持简单的key-value类型的数据，同时还提供list，set，zset，hash等数据结构的存储。 </li>
                            <li>Redis支持数据的备份，即master-slave模式的数据备份。</li>
                        </ul>
                        <p>Redis的性能极高且拥有丰富的数据类型，同时，Redis所有操作都是原子性的，也支持对几个操作合并后原子性的执行。另外，Redis有丰富的扩展特性，它支持publish/subscribe, 通知,key 过期等等特性。</p>
                        <p>Redis本质上是一个Key-Value类型的内存数据库，很像memcached，整个数据库统统加载在内存当中进行操作，定期通过异步操作把数据库数据flush到硬盘上进行保存。因为是纯内存操作，Redis的性能非常出色，每秒可以处理超过 10万次读写操作，是已知性能最快的Key-Value DB。</p>
                        <p>Redis的出色之处不仅仅是性能，Redis最大的魅力是支持保存多种数据结构，此外单个value的最大限制是1GB，不像 memcached只能保存1MB的数据，因此Redis可以用来实现很多有用的功能，比方说用他的List来做FIFO双向链表，实现一个轻量级的高性 能消息队列服务，用他的Set可以做高性能的tag系统等等。另外Redis也可以对存入的Key-Value设置expire时间，因此也可以被当作一 个功能加强版的memcached来用。</p>
                        <h3 id="为什么redis需要把所有数据放到内存中？"><a href="javascript:void(0)" class="anchor">为什么redis需要把所有数据放到内存中？</a></h3>
                        <p>Redis为了达到最快的读写速度将数据都读到内存中，并通过异步的方式将数据写入磁盘。所以redis具有快速和数据持久化的特征。如果不将数据放在内存中，磁盘I/O速度为严重影响redis的性能。在内存越来越便宜的今天，redis将会越来越受欢迎。
                            如果设置了最大使用的内存，则数据已有记录数达到内存限值后不能继续插入新值。</p>
                        <h3 id="Redis支持的数据类型"><a href="javascript:void(0)" class="anchor">Redis支持的数据类型</a></h3>
                        <p>Redis通过Key-Value的单值不同类型来区分, 以下是支持的类型:
                            Strings
                            Lists
                            Sets 求交集、并集
                            Sorted Set
                            hashes</p>
                        <h3 id="Redis是单进程单线程的"><a href="javascript:void(0)" class="anchor">Redis是单进程单线程的</a></h3>
                        <p>redis利用队列技术将并发访问变为串行访问，消除了传统数据库串行控制的开销</p>
                        <h3 id="虚拟内存"><a href="javascript:void(0)" class="anchor">虚拟内存</a></h3>
                        <p>首先说明下redis的虚拟内存与os的虚拟内存不是一码事，但是思路和目的都是相同的。就是暂时把不经常访问的数据从内存交换到磁盘中，从而腾出宝贵的 内存空间用于其他需要访问的数据。尤其是对于redis这样的内存数据库，内存总是不够用的。除了可以将数据分割到多个redis server外。另外的能够提高数据库容量的办法就是使用vm把那些不经常访问的数据交换的磁盘上。如果我们的存储的数据总是有少部分数据被经常访问，大 部分数据很少被访问，对于网站来说确实总是只有少量用户经常活跃。当少量数据被经常访问时，使用vm不但能提高单台redis server数据库的容量，而且也不会对性能造成太多影响。</p>
                        <p>但是Redis没有使用Linux提供的虚拟内存机制，它是实现了自己的虚拟内存机制，主要原因有两点：</p>
                        <p>       (1)Linux虚拟内存的粒度过大，在Linux中使用4KB的页面，这对于Redis来说太大了，二Redis中的绝大多数对象都远远小于这个数值。</p>
                        <p>      (2)Redis可以在把数据交换到磁盘上的时候进行适当的操作，比如压缩，通常保存到磁盘上的对象可以去除指针和对象元数据信息，一般压缩后的对象可以比内存中的对象小10倍。这样可以节省很多IO操作。</p>
                        <p>        当然，并不是所有场景都适合虚拟内存。这里需要注意的就是Redis中的Key是不会被交换的，如果每个key所关联的value都很小，那么这种场景就不太适合于使用虚拟内存了。如果key比较小，但是对应的value比较大，那么这种场景是最适合使用虚拟内存的场景。</p>
                        <p>&nbsp;</p>
                        <h3 id="linux虚拟内存"><a href="javascript:void(0)" class="anchor">linux虚拟内存</a></h3>
                        <p>第一层理解</p>
                        <p>1.每个进程都有自己独立的4G内存空间，各个进程的内存空间具有类似的结构
                            2.一个新进程建立的时候，将会建立起自己的内存空间，此进程的数据，代码等从磁盘拷贝到自己的进程空间，哪些数据在哪里，都由进程控制表中的task_struct记录，task_struct中记录中一条链表，记录中内存空间的分配情况，哪些地址有数据，哪些地址无数据，哪些可读，哪些可写，都可以通过这个链表记录
                            3.每个进程已经分配的内存空间，都与对应的磁盘空间映射
                            问题：
                            计算机明明没有那么多内存（n个进程的话就需要n*4G）内存
                            建立一个进程，就要把磁盘上的程序文件拷贝到进程对应的内存中去，对于一个程序对应的多个进程这种情况，浪费内存！</p>
                        <p>第二层理解</p>
                        <p>1.每个进程的4G内存空间只是虚拟内存空间，每次访问内存空间的某个地址，都需要把地址翻译为实际物理内存地址
                            2.所有进程共享同一物理内存，每个进程只把自己目前需要的虚拟内存空间映射并存储到物理内存上。
                            3.进程要知道哪些内存地址上的数据在物理内存上，哪些不在，还有在物理内存上的哪里，需要用页表来记录
                            4.页表的每一个表项分两部分，第一部分记录此页是否在物理内存上，第二部分记录物理内存页的地址（如果在的话）
                            5.当进程访问某个虚拟地址，去看页表，如果发现对应的数据不在物理内存中，则缺页异常
                            6.缺页异常的处理过程，就是把进程需要的数据从磁盘上拷贝到物理内存中，如果内存已经满了，没有空地方了，那就找一个页覆盖，当然如果被覆盖的页曾经被修改过，需要将此页写回磁盘</p>
                        <h3 id="分布式"><a href="javascript:void(0)" class="anchor">分布式</a></h3>
                        <p>redis支持主从的模式。原则：Master会将数据同步到slave，而slave不会将数据同步到master。Slave启动时会连接master来同步数据。</p>
                        <p>这是一个典型的分布式读写分离模型。我们可以利用master来插入数据，slave提供检索服务。这样可以有效减少单个机器的并发访问数量。</p>
                        <p>&nbsp;</p>
                        <h3 id="读写分离模型"><a href="javascript:void(0)" class="anchor">读写分离模型</a></h3>
                        <p>通过增加Slave DB的数量，读的性能可以线性增长。为了避免Master DB的单点故障，集群一般都会采用两台Master DB做双机热备，所以整个集群的读和写的可用性都非常高。</p>
                        <p>读写分离架构的缺陷在于，不管是Master还是Slave，每个节点都必须保存完整的数据，如果在数据量很大的情况下，集群的扩展能力还是受限于单个节点的存储能力，而且对于Write-intensive (写密集型)类型的应用，读写分离架构并不适合。</p>
                        <h3 id="数据分片模型"><a href="javascript:void(0)" class="anchor">数据分片模型</a></h3>
                        <p>为了解决读写分离模型的缺陷，可以将数据分片模型应用进来。</p>
                        <p>可以将每个节点看成都是独立的master，然后通过业务实现数据分片。</p>
                        <p>结合上面两种模型，可以将每个master设计成由一个master和多个slave组成的模型。</p>
                        <p>&nbsp;</p>
                        <h3 id="Redis的回收策略"><a href="javascript:void(0)" class="anchor">Redis的回收策略</a></h3>
                        <p>MySQL里有2000w数据，redis中只存20w的数据，如何保证redis中的数据都是热点数据?</p>
                        <ul>
                            <ul>
                                <li><strong>volatile-lru</strong>：从已设置过期时间的数据集（server.db[i].expires）中挑选最近最少使用的数据淘汰</li>
                                <li>volatile-ttl：从已设置过期时间的数据集（server.db[i].expires）中挑选将要过期的数据淘汰</li>
                                <li>volatile-random：从已设置过期时间的数据集（server.db[i].expires）中任意选择数据淘汰</li>
                                <li><strong>allkeys-lru</strong>：从数据集（server.db[i].dict）中挑选最近最少使用的数据淘汰</li>
                                <li>allkeys-random：从数据集（server.db[i].dict）中任意选择数据淘汰</li>
                                <li>no-enviction（驱逐）：禁止驱逐数据</li>
                            </ul>
                        </ul>
                        <h3 id="redis常见性能问题和解决方案："><a href="javascript:void(0)" class="anchor">redis常见性能问题和解决方案：</a></h3>
                        <p>(1) Master最好不要做任何持久化工作，如RDB内存快照和AOF日志文件,当快照比较大时对性能影响是非常大的，会间断性暂停服务，所以Master最好不要写内存快照。</p>
                        <p>(2) 如果数据比较重要，某个Slave开启AOF备份数据，策略设置为每秒同步一次</p>
                        <p>(3) 为了主从复制的速度和连接的稳定性，Master和Slave最好在同一个局域网内</p>
                        <p>(4) 尽量避免在压力很大的主库上增加从库</p>
                        <p>(5) 主从复制不要用图状结构，用单向链表结构更为稳定，即：Master &lt;- Slave1 &lt;- Slave2 &lt;- Slave3...</p>
                        <p>这样的结构方便解决单点故障问题，实现Slave对Master的替换。如果Master挂了，可以立刻启用Slave1做Master，其他不变。</p>
                        <p>&nbsp;</p>
                        <h2 id="如何实现redis的高可用"><a href="javascript:void(0)" class="anchor">如何实现redis的高可用</a></h2>
                        <p>木桶原理大概是这样的：
                            一只木桶盛水的多少，并不取决于桶壁上最高的那块木块，而恰恰取决于桶壁上最短的那块。</p>
                        <h3 id="为什么要有集群 ?"><a href="javascript:void(0)" class="anchor">为什么要有集群 ?</a></h3>
                        <p>由于Redis主从复制架构每个数据库都要保存整个集群中的所有数据，使用集群，使得数据有了一定的均匀分布。所以Redis3.0之后的版本添加特性就是集群(Cluster)</p>
                        <h3 id="什么是ping-pong操作?"><a href="javascript:void(0)" class="anchor">什么是ping-pong操作?</a></h3>
                        <p> pingpong是一种数据缓存的手段，通过pingpong操作可以提高数据传输的效率。</p>
                        <p>在两个模块间交换数据时，上一级处理的结果不能马上被下一级所处理完成，这样上一级必须等待下一级处理完成才可以送新的数据，这样就会对性能产生很大的损失。</p>
                        <p>引入pingpong后我们可以不去等待下一级处理结束，而是将结果保存在pong路的缓存中，pong路的数据准备好的时刻，ping路的数据也处理完毕（下一级），然后无需等待直接处理pong路数据，上一级也无需等待，转而将结果存储在ping路。这样便提高了处理效率。</p>
                        <p>&nbsp;</p>
                        <p>所谓ping-pong buffer，也就是定义两个buffer，当有数据进来的时候，负责写入buffer的进程就寻找第一个没有被占用而且可写的buffer，进行写入，写好之后，将占用flag释放，同时设置一个flag提示此buffer已经可读，然后再接下去找另外一个可写的buffer，写入新的数据。</p>
                        <p>而读入的进程也是一直对buffer状态进行检测，一旦发现没有被占用，而且已经可以被读，就把这个buffer的数据取出来，然后标志为可写。</p>
                        <p>&nbsp;</p>
                        <h3 id="Redis集群架构"><a href="javascript:void(0)" class="anchor">Redis集群架构</a></h3>
                        <p><img src='http://img.blog.csdn.net/20170426204511981?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvUm9iZXJ0b0h1YW5n/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast' alt='' /></p>
                        <p>架构细节:
                            (1)所有的redis节点彼此互联(PING-PONG机制),内部使用二进制协议优化传输速度和带宽.
                            (2)节点的fail是通过集群中超过半数的master节点检测失效时才生效.
                            (3)客户端与redis节点直连,不需要中间proxy层.客户端不需要连接集群所有节点,连接集群中任何一个可用节点即可
                            (4)redis-cluster把所有的物理节点映射到[0-16383]slot上,cluster 负责维护node&lt;-&gt;slot&lt;-&gt;key</p>
                        <h3 id="Redis Cluster环境搭建"><a href="javascript:void(0)" class="anchor">Redis Cluster环境搭建</a></h3>
                        <p>参考：<a href='http://blog.csdn.net/robertohuang/article/details/70833231' target='_blank' >http://blog.csdn.net/robertohuang/article/details/70833231</a></p>
                        <p>关键点：</p>
                        <p>1、建立集群Redis关系</p>
                        <p>2、查看集群节点信息 </p>
                        <p><img src='http://img.blog.csdn.net/20170426222304327?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvUm9iZXJ0b0h1YW5n/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast' alt='' /></p>
                        <p>3、测试插入数据 </p>
                        <p><img src='http://img.blog.csdn.net/20170426211945748?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvUm9iZXJ0b0h1YW5n/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast' alt='' /></p>
                        <p>因为abc的hash槽信息是在6380上，现在使用redis-cli连接的6379，无法完成set操作，需要客户端跟踪重定向。使用redis-cli -c</p>
                        <p>重新测试插入数据</p>
                        <p><img src='http://img.blog.csdn.net/20170426212128531?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvUm9iZXJ0b0h1YW5n/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast' alt='' /></p>
                        <p>说明插入和查询都发生了重定向。</p>
                        <h3 id="插槽的概念及插槽分配"><a href="javascript:void(0)" class="anchor">插槽的概念及插槽分配</a></h3>
                        <p>整个Redis提供了16384个插槽，也就是说集群中的每个节点分得的插槽数总和为16384。./redis-trib.rb 脚本实现了是将16384个插槽平均分配给了N个节点。当我们执行set abc 123命令时,redis是如何将数据保存到集群中的呢?执行步骤：</p>
                        <pre><code>i.接收命令set abc 123<br/>
ii.通过key(abc)计算出插槽值,然后根据插槽值找到对应的节点。abc的插槽值为:7638<br/>
iii.重定向到该节点执行命令<br/>
</code></pre>
                        <p>注意：如果插槽数有部分是没有指定到节点的，那么这部分插槽所对应的key将不能使用。</p>
                        <h3 id="新增集群节点"><a href="javascript:void(0)" class="anchor">新增集群节点</a></h3>
                        <p>再开启一个实例的端口为6382 配置同上 </p>
                        <p><img src='http://img.blog.csdn.net/20170426212844847?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvUm9iZXJ0b0h1YW5n/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast' alt='' /></p>
                        <p>执行脚本建立6382节点与集群的关系 </p>
                        <p><img src='http://img.blog.csdn.net/20170426213033325?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvUm9iZXJ0b0h1YW5n/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast' alt='' /></p>
                        <p>查看集群状态,发现新增的节点没有插槽 :</p>
                        <p><img src='http://img.blog.csdn.net/20170426224438760?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvUm9iZXJ0b0h1YW5n/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast' alt='' /></p>
                        <h4 id="手动给6382节点分配插槽"><a href="javascript:void(0)" class="anchor">手动给6382节点分配插槽</a></h4>
                        <p><img src='http://img.blog.csdn.net/20170426224948013?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvUm9iZXJ0b0h1YW5n/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast' alt='' /></p>
                        <p>查看集群节点状态 </p>
                        <p><img src='http://img.blog.csdn.net/20170426225048216?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvUm9iZXJ0b0h1YW5n/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast' alt='' /></p>
                        <h3 id="删除集群节点"><a href="javascript:void(0)" class="anchor">删除集群节点</a></h3>
                        <p>想要删除集群节点中的某一个节点，需要严格执行2步:</p>
                        <h4 id="将这个节点上的所有插槽转移到其他节点上</strong>"><a href="javascript:void(0)" class="anchor">将这个节点上的所有插槽转移到其他节点上</a></h4>
                        <p>1执行脚本：./redis-trib.rb reshard 192.168.29.128:6382</p>
                        <p>2选择需要转移的插槽的数量，因为6382有100个，所以转移100个</p>
                        <p>3输入转移的节点的id，我们转移到6379节点</p>
                        <p>4输入插槽来源id，也就是6382的id</p>
                        <p>5输入done，开始转移 </p>
                        <p><img src='http://img.blog.csdn.net/20170426220110850?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvUm9iZXJ0b0h1YW5n/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast' alt='' /></p>
                        <p>查看集群节点信息，可以看到6380节点已经没有插槽了 </p>
                        <p><img src='http://img.blog.csdn.net/20170426220811101?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvUm9iZXJ0b0h1YW5n/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast' alt='' /></p>
                        <h4 id="删除节点"><a href="javascript:void(0)" class="anchor">删除节点</a></h4>
                        <p><img src='http://img.blog.csdn.net/20170426221215428?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvUm9iZXJ0b0h1YW5n/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast' alt='' /></p>
                        <p>&nbsp;</p>
                        <h3 id="Redis Cluster高可用</strong>"><a href="javascript:void(0)" class="anchor">Redis Cluster高可用</a></h3>
                        <p>上面的例子中，没有配置slave节点，</p>
                        <pre><code>6379(Master)     6479(Slave of 6379)     6579(Slave of 6379)<br/>
6380(Master)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;6480(Slave&nbsp;of&nbsp;6380)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;6580(Slave&nbsp;of&nbsp;6380)<br/>
6381(Master)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;6481(Slave&nbsp;of&nbsp;6381)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;6581(Slave&nbsp;of&nbsp;6381)<br/>
</code></pre>
                        <p>为每个主从复制架构添加哨兵集群,哨兵模式集群可参考:<a href='http://blog.csdn.net/robertohuang/article/details/70768922'>哨兵模式集群</a></p>
                        <p>哨兵模式:是为了主从替换</p>
                        <p>创建集群 使用如下命令</p>
                        <pre><code>./redis-trib.rb create --replicas 2 192.168.29.128:6379 192.168.29.128:6380 192.168.29.128:6381 192.168.29.128:6479 192.168.29.128:6480 192.168.29.128:6481 192.168.29.128:6579 192.168.29.128:6580 192.168.29.128:6581 <br/>
</code></pre>
                        <p>如何获取Redis源码？</p>
                        <pre><code>wget http://download.redis.io/releases/redis-3.2.5.tar.gz<br/>
tar&nbsp;zxvf&nbsp;redis-3.2.5.tar.gz<br/>
</code></pre>

                    </Col>
                    <Col span={1}>
                    </Col>
                    <Col span={4}>
                        <Anchor showInkInFixed="true">
                                <Link href="#Redis的特性" title="Redis的特性">
                                <Link href="#为什么redis需要把所有数据放到内存中？" title="为什么redis需要把所有数据放到内存中？"/>
                                <Link href="#Redis支持的数据类型" title="Redis支持的数据类型"/>
                                <Link href="#Redis是单进程单线程的" title="Redis是单进程单线程的"/>
                                <Link href="#虚拟内存" title="虚拟内存"/>
                                <Link href="#linux虚拟内存" title="linux虚拟内存"/>
                                <Link href="#分布式" title="分布式"/>
                                <Link href="#读写分离模型" title="读写分离模型"/>
                                <Link href="#数据分片模型" title="数据分片模型"/>
                                <Link href="#Redis的回收策略" title="Redis的回收策略"/>
                                <Link href="#redis常见性能问题和解决方案：" title="redis常见性能问题和解决方案："/>
                                </Link>
                                <Link href="#如何实现redis的高可用" title="如何实现redis的高可用">
                                <Link href="#为什么要有集群 ?" title="为什么要有集群 ?"/>
                                <Link href="#什么是ping-pong操作?" title="什么是ping-pong操作?"/>
                                <Link href="#Redis集群架构" title="Redis集群架构"/>
                                <Link href="#Redis Cluster环境搭建" title="Redis Cluster环境搭建"/>
                                <Link href="#插槽的概念及插槽分配" title="插槽的概念及插槽分配"/>
                                <Link href="#新增集群节点" title="新增集群节点"/>
                                <Link href="#手动给6382节点分配插槽" title="手动给6382节点分配插槽">
                                </Link>
                                <Link href="#删除集群节点" title="删除集群节点">
                                <Link href="#将这个节点上的所有插槽转移到其他节点上" title="将这个节点上的所有插槽转移到其他节点上"/>
                                <Link href="#删除节点" title="删除节点"/>
                                </Link>
                                <Link href="#Redis Cluster高可用" title="Redis Cluster高可用"/>
                                </Link>
                        </Anchor>
                    </Col>
                </Row>


            </div>

        );
    }
}

export default Redis1;
