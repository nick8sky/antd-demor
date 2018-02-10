import React, { Component } from 'react';

class Redis extends Component {
    render() {
        return (
            <div>
                <p>Redis Setnx（SET if Not eXists） 命令在指定的 key 不存在时，为 key 设置指定的值,返回1否则返回0；</p>
                <pre><code>47.97.179.224:6379&gt; Setnx mykey 11
(integer) 1
47.97.179.224:6379&gt; Setnx mykey 12
(integer) 0
47.97.179.224:6379&gt; Setnx mykey 13
(integer) 0
</code></pre>
                <p>Setnx没有过期时间的设置，故要手动设置过期时间</p>
                <img src='../img/WX20180205-111312@2x.png' alt='v2-201356' width="770" height="290" />
            <p>然而却还存在着很多问题：SETNX会存在锁竞争，如果在执行过程中客户端宕机，也会引起死锁问题，即锁资源无法释放。并且当一个资源解锁的时候，释放锁之后，其他之前等待的锁没有办法再次自动重试申请锁（除非重新申请锁）。解决死锁的问题其实可以可以向Mysql的死锁检测学习，设置一个失效时间，通过key的时间戳来判断是否需要强制解锁。但是强制解锁也存在问题，一个就是时间差问题，不同的机器的本地时间可能也存在时间差，在很小事务粒度的高并发场景下还是会存在问题，比如删除锁的时候，在判断时间戳已经超过时效，有可能删除了其他已经获取锁的客户端的锁。另外，如果设置了一个超时时间，但是确实执行时间超过了超时时间，那么锁会被自动释放，原来持锁的客户端再次解锁的时候会出现问题，而且最为严重的还是一致性没有得到保障。</p>
        <p>&nbsp;</p>
        <p>所以设计的时候需要考虑以下几点：</p>
        <ol>
            <li>锁的时效设置。避免单点故障造成死锁，影响其他客户端获取锁。但是也要保证一旦一个客户端持锁，在客户端可用时不会被其他客户端解锁。（网上很多解决方案都是其他客户端等待队列长度判断是否强制解锁，但其实在偶发情况下就不能保证一致性，也就失去了分布式锁的意义）。</li>
            <li>持锁期间的check,尽量在关键节点检查锁的状态，所以要设计成可重入锁，但在客户端使用时要做好吞吐量的权衡。</li>
        <li>减少获取锁的操作，尽量减少redis压力。所以需要让客户端的申请锁有一个等待时间，而不是所有申请锁的请求要循环申请锁。</li>
        <li>加锁的事务或者操作尽量粒度小，减少其他客户端申请锁的等待时间，提高处理效率和并发性。</li>
        <li>持锁的客户端解锁后，要能通知到其他等待锁的节点，否则其他节点只能一直等待一个预计的时间再触发申请锁。类似线程的notifyAll,要能同步锁状态给其他客户端，并且是分布式消息。</li>
        <li>考虑任何执行句柄中可能出现的异常，状态的正确流转和处理。比如，不能因为一个节点解锁失败，或者锁查询失败（redis 超时或者其他运行时异常），影响整个等待的任务队列，或者任务池。</li>

    </ol>
        <p>&nbsp;</p>
        <h3>使用Redisson示例</h3>
        <p>Redisson使用起来很方便，例子就如下，获得一个RLock锁对象，然后tryLock 和unlock。trylock方法提供了锁重入的实现，并且客户端一旦持有锁，就会在能正常运行期间一直持有锁，直到主动unlock或者节点故障，主动失效（超过默认的过期时间）释放锁。</p>
        <p>Redisson还提供了设置最长等待时间以及设置释放锁时间的含参tryLock接口 <em>boolean tryLock(long waitTime, long leaseTime, TimeUnit unit) throws InterruptedException;</em> 。Redisson的lock 扩展了<em>java.util.concurrent.locks.Lock</em>的实现，也基本按照了Lock接口的实现方案。<em>lock（）</em>方法会一直阻塞申请锁资源，直到有可用的锁释放。下面一部分会详细解析一部分关键实现的代码。</p>

        <h3>WATCH</h3>
        <p>WATCH 命令可以为 Redis 事务提供 check-and-set （CAS）行为</p>
        <p>如果有至少一个被监视的键在 EXEC 执行之前被修改了， 那么整个事务都会被取消， EXEC 返回空多条批量回复（null multi-bulk reply）来表示事务已经失败。</p>
        <pre><code>WATCH mykey
val = GET mykey
val = val + 1

MULTI
SET mykey $val
EXEC
</code></pre>
        <p>使用上面的代码， 如果在 WATCH 执行之后， EXEC 执行之前， 有其他客户端修改了 mykey 的值， 那么当前客户端的事务就会失败。 程序需要做的， 就是不断重试这个操作， 直到没有发生碰撞为止。</p>
        <p>这种形式的锁被称作乐观锁， 它是一种非常强大的锁机制。 并且因为大多数情况下， 不同的客户端会访问不同的键， 碰撞的情况一般都很少， 所以通常并不需要进行重试。</p>
        <p>WATCH 使得 EXEC 命令需要有条件地执行： 事务只能在所有被监视键都没有被修改的前提下执行， 如果这个前提不能满足的话，事务就不会被执行。</p>
        <p>&nbsp;</p>
        <p>当 EXEC 被调用时， 不管事务是否成功执行， 对所有键的监视都会被取消。</p>
        <p>另外， 当客户端断开连接时， 该客户端对键的监视也会被取消。</p>
        <p>使用无参数的 UNWATCH 命令可以手动取消对所有键的监视。 对于一些需要改动多个键的事务， 有时候程序需要同时对多个键进行加锁， 然后检查这些键的当前值是否符合程序的要求。 当值达不到要求时， 就可以使用 UNWATCH 命令来取消目前对键的监视， 中途放弃这个事务， 并等待事务的下次尝试。</p>
        <h4>利用watch创建 Redis 没有内置的原子操作</h4>
        <pre><code>WATCH zset
element = ZRANGE zset 0 0
MULTI
    ZREM zset element
EXEC
</code></pre>
        <p>&nbsp;</p>
        <h3>Sentinel</h3>
        <p>Redis 的 Sentinel 系统用于管理多个 Redis 服务器（instance）， 该系统执行以下三个任务：</p>
        <ul>
            <li><strong>监控（Monitoring）</strong>： Sentinel 会不断地检查你的主服务器和从服务器是否运作正常。</li>
            <li><strong>提醒（Notification）</strong>： 当被监控的某个 Redis 服务器出现问题时， Sentinel 可以通过 API 向管理员或者其他应用程序发送通知。</li>
            <li><strong>自动故障迁移（Automatic failover）</strong>： 当一个主服务器不能正常工作时， Sentinel 会开始一次自动故障迁移操作， 它会将失效主服务器的其中一个从服务器升级为新的主服务器， 并让失效主服务器的其他从服务器改为复制新的主服务器； 当客户端试图连接失效的主服务器时， 集群也会向客户端返回新主服务器的地址， 使得集群可以使用新主服务器代替失效服务器。</li>
        </ul>
        <p>Redis Sentinel 是一个分布式系统， 你可以在一个架构中运行多个 Sentinel 进程（progress）， 这些进程使用流言协议（gossip protocols)来接收关于主服务器是否下线的信息， 并使用投票协议（agreement protocols）来决定是否执行自动故障迁移， 以及选择哪个从服务器作为新的主服务器。</p>
        <p>&nbsp;</p>
        <h3>Redis Cluster</h3>
        <p>Redis Cluster可以说是服务端Sharding分片技术的体现，即将键值按照一定算法合理分配到各个实例分片上，同时各个实例节点协调沟通，共同对外承担一致服务。多Redis实例服务，比单Redis实例要复杂的多，这涉及到定位、协同、容错、扩容等技术难题。这里，我们介绍一种轻量级的客户端Redis Sharding技术。Redis Sharding可以说是Redis Cluster出来之前，业界普遍使用的多Redis实例集群方法。其主要思想是采用哈希算法将Redis数据的key进行散列，通过hash函数，特定的key会映射到特定的Redis节点上。这样，客户端就知道该向哪个Redis节点操作数据。</p>


    </div>
        );
    }
}

export default Redis;