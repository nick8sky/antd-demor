import React, {Component} from 'react';
import Markdown  from 'react-markdown';

class Kafka3 extends Component {
    render() {
        return (
            <div>
                <Markdown source={"Kafka是一种分布式的，基于发布/订阅的消息系统。主要设计目标如下：\n" +
                "\n" +
                "- 以时间复杂度为O(1)的方式提供消息持久化能力，即使对TB级以上数据也能保证常数时间的访问性能\n" +
                "- 高吞吐率。即使在非常廉价的商用机器上也能做到单机支持每秒100K条消息的传输\n" +
                "- 支持Kafka Server间的消息分区，及分布式消费，同时保证每个partition内的消息顺序传输\n" +
                "- 同时支持离线数据处理和实时数据处理\n" +
                "\n" +
                "## 为什么要用消息系统\n" +
                "\n" +
                "### 解耦\n" +
                "\n" +
                "在项目启动之初来预测将来项目会碰到什么需求，是极其困难的。消息队列在处理过程中间插入了一个隐含的、基于数据的接口层，两边的处理过程都要实现这一接口。这允许你独立的扩展或修改两边的处理过程，只要确保它们遵守同样的接口约束\n" +
                "\n" +
                "### 冗余\n" +
                "\n" +
                "有些情况下，处理数据的过程会失败。除非数据被持久化，否则将造成丢失。消息队列把数据进行持久化直到它们已经被完全处理，通过这一方式规避了数据丢失风险。在被许多消息队列所采用的”插入-获取-删除”范式中，在把一个消息从队列中删除之前，需要你的处理过程明确的指出该消息已经被处理完毕，确保你的数据被安全的保存直到你使用完毕。\n" +
                "\n" +
                "### 扩展性\n" +
                "\n" +
                "因为消息队列解耦了你的处理过程，所以增大消息入队和处理的频率是很容易的；只要另外增加处理过程即可。不需要改变代码、不需要调节参数。扩展就像调大电力按钮一样简单。\n" +
                "\n" +
                "### 削峰\n" +
                "\n" +
                "在访问量剧增的情况下，应用仍然需要继续发挥作用，但是这样的突发流量并不常见；如果为以能处理这类峰值访问为标准来投入资源随时待命无疑是巨大的浪费。使用消息队列能够使关键组件顶住突发的访问压力，而不会因为突发的超负荷的请求而完全崩溃。\n" +
                "\n" +
                "### 可恢复性\n" +
                "\n" +
                "当体系的一部分组件失效，不会影响到整个系统。消息队列降低了进程间的耦合度，所以即使一个处理消息的进程挂掉，加入队列中的消息仍然可以在系统恢复后被处理。而这种允许重试或者延后处理请求的能力通常是造就一个略感不便的用户和一个沮丧透顶的用户之间的区别。\n" +
                "\n" +
                "### 送达保证\n" +
                "\n" +
                "消息队列提供的冗余机制保证了消息能被实际的处理，只要一个进程读取了该队列即可。在此基础上，IronMQ提供了一个”只送达一次”保证。无论有多少进程在从队列中领取数据，每一个消息只能被处理一次。这之所以成为可能，是因为获取一个消息只是”预定”了这个消息，暂时把它移出了队列。除非客户端明确的表示已经处理完了这个消息，否则这个消息会被放回队列中去，在一段可配置的时间之后可再次被处理。\n" +
                "\n" +
                "### 顺序保证\n" +
                "\n" +
                "在大多使用场景下，数据处理的顺序都很重要。消息队列本来就是排序的，并且能保证数据会按照特定的顺序来处理。IronMO保证消息通过FIFO（先进先出）的顺序来处理，因此消息在队列中的位置就是从队列中检索他们的位置。\n" +
                "\n" +
                "### 缓冲\n" +
                "\n" +
                "在任何重要的系统中，都会有需要不同的处理时间的元素。例如,加载一张图片比应用过滤器花费更少的时间。消息队列通过一个缓冲层来帮助任务最高效率的执行–写入队列的处理会尽可能的快速，而不受从队列读的预备处理的约束。该缓冲有助于控制和优化数据流经过系统的速度。\n" +
                "\n" +
                "### 理解数据流\n" +
                "\n" +
                "在一个分布式系统里，要得到一个关于用户操作会用多长时间及其原因的总体印象，是个巨大的挑战。消息队列通过消息被处理的频率，来方便的辅助确定那些表现不佳的处理过程或领域，这些地方的数据流都不够优化。\n" +
                "\n" +
                "### 异步通信\n" +
                "\n" +
                "很多时候，你不想也不需要立即处理消息。消息队列提供了异步处理机制，允许你把一个消息放入队列，但并不立即处理它。你想向队列中放入多少消息就放多少，然后在你乐意的时候再去处理它们。\n" +
                "\n" +
                "## 常用Message Queue对比\n" +
                "\n" +
                "### Redis\n" +
                "\n" +
                "Redis是一个基于Key-Value对的NoSQL数据库，开发维护很活跃。虽然它是一个Key-Value数据库存储系统，但它本身支持MQ功能，所以完全可以当做一个轻量级的队列服务来使用。对于RabbitMQ和Redis的入队和出队操作，各执行100万次，每10万次记录一次执行时间。测试数据分为128Bytes、512Bytes、1K和10K四个不同大小的数据。实验表明：入队时，当数据比较小时Redis的性能要高于RabbitMQ，而如果数据大小超过了10K，Redis则慢的无法忍受；出队时，无论数据大小，Redis都表现出非常好的性能，而RabbitMQ的出队性能则远低于Redis。\n" +
                "\n" +
                "### RocketMQ\n" +
                "\n" +
                "在早期的RocketMQ版本中，是有依赖ZK的。而现在的版本中，是去掉了对ZK的依赖，转而使用自己开发的NameSrv。\n" +
                "\n" +
                "并且这个NameSrv是无状态的，你可以随意的部署多台，其代码也非常简单，非常轻量。\n" +
                "\n" +
                " \n" +
                "\n" +
                "我们知道，在Kafka中，是1个topic有多个partition，每个partition有1个master + 多个slave。对应如下图所示： \n" +
                "\n" +
                "![Markdown](http://i2.bvimg.com/633340/93843828e65269a3.jpg)\n" +
                "\n" +
                "不同于Kafka里面，一台机器同时是Master和Slave。在RocketMQ里面，1台机器只能要么是Master，要么是Slave。这个在初始的机器配置里面，就定死了。其架构拓扑图如下：\n" +
                "\n" +
                "![Markdown](http://i2.bvimg.com/633340/0512cc719e4be656.jpg)\n" +
                "\n" +
                "(RocketMQ在阿里集团被广泛应用在订单，交易，充值，流计算，消息推送，日志流式处理，binglog分发等场景)\n" +
                "\n" +
                "\n" +
                "\n" +
                "在这里，RocketMQ里面queue这个概念，就对应Kafka里面partition。\n" +
                "\n" +
                "有3个Master, 6个Slave，那对应到物理上面，就是3+6，得9台机器！！！而不是上面像Kafka一样，3台机器。\n" +
                "\n" +
                "\n" +
                "\n" +
                "Master/Slave概念差异\n" +
                "\n" +
                "Kafka: Master/Slave是个逻辑概念，1台机器，同时具有Master角色和Slave角色。 \n" +
                "RocketMQ: Master/Slave是个物理概念，1台机器，只能是Master或者Slave。在集群初始配置的时候，指定死的。其中Master的broker id = 0，Slave的broker id > 0。\n" +
                "\n" +
                "\n" +
                "\n" +
                "Broker概念差异\n" +
                "\n" +
                "Kafka: Broker是个物理概念，1个broker就对应1台机器。 \n" +
                "RocketMQ：Broker是个逻辑概念，1个broker = 1个master + 多个slave。所以才有master broker, slave broker这样的概念。\n" +
                "\n" +
                "那这里，master和slave是如何配对的呢？ 答案是通过broker name。具有同1个broker name的master和slave进行配对。\n" +
                "\n" +
                "```\n" +
                "//机器1的配置\n" +
                "brokerClusterName=DefaultCluster\n" +
                "brokerName=broker-a\n" +
                "brokerId=0\n" +
                "deleteWhen=04\n" +
                "fileReservedTime=48\n" +
                "brokerRole=ASYNC_MASTER\n" +
                "flushDiskType=ASYNC_FLUSH\n" +
                "```\n" +
                "\n" +
                "```\n" +
                "//机器2的配置\n" +
                "brokerClusterName=DefaultCluster\n" +
                "brokerName=broker-a\n" +
                "brokerId=1\n" +
                "deleteWhen=04\n" +
                "fileReservedTime=48\n" +
                "brokerRole=SLAVE\n" +
                "flushDiskType=ASYNC_FLUSH\n" +
                "```\n" +
                "\n" +
                "```\n" +
                "//机器3的配置\n" +
                "brokerClusterName=DefaultCluster\n" +
                "brokerName=broker-a\n" +
                "brokerId=2\n" +
                "deleteWhen=04\n" +
                "fileReservedTime=48\n" +
                "brokerRole=SLAVE\n" +
                "flushDiskType=ASYNC_FLUSH\n" +
                "```\n" +
                "\n" +
                "这里机器1、2、器3具有相同的brokerName（broker-a)，一个brokerId = 0，另2个brokerId > 0。所以机器1是Master，机器2, 3是Slave。\n" +
                "\n" +
                "**所以这里可以看出：RokcetMQ和Kafka关于这2对概念的定义，刚好是反过来的！Kafka是先有Broker，然后产生出Master/Slave；RokcetMQ是先定义Master/Slave，然后组合出Broker。**\n" +
                "\n" +
                "\n" +
                "\n" +
                "为什么可以去ZK?\n" +
                "\n" +
                "从上面对比可以看出，Kafka和RocketMQ在Master/Slave/Broker这个3个概念上的差异。\n" +
                "\n" +
                "这个差异，也就影响到topic, partition这种逻辑概念和Master/Slave/Broker这些物理概念上的映射关系。具体来讲就是：\n" +
                "\n" +
                "**在Kafka里面，Maser/Slave是选举出来的！！！RocketMQ不需要选举！！！**\n" +
                "\n" +
                "具体来说，在Kafka里面，Master/Slave的选举，有2步：第1步，先通过ZK在所有机器中，选举出一个KafkaController；第2步，再由这个Controller，决定每个partition的Master是谁，Slave是谁。\n" +
                "\n" +
                "这里的Master/Slave是动态的，也就是说：当Master挂了之后，会有1个Slave切换成Master。\n" +
                "\n" +
                "**而在RocketMQ中，不需要选举，Master/Slave的角色也是固定的。当一个Master挂了之后，你可以写到其他Master上，但不会说一个Slave切换成Master。**\n" +
                "\n" +
                "这种简化，使得RocketMQ可以不依赖ZK就很好的管理Topic/queue和物理机器的映射关系了，也实现了高可用。\n" +
                "\n" +
                "在Kafka里面，一个partition必须与1个Master有严格映射关系，这个Master挂了，就要从其他Slave里面选举出一个Master；而在RocketMQ里面，这个限制放开了，一个queue对应的Master挂了，它会切到其他Master，而不是非要选举出来一个。\n" +
                "\n" +
                " \n" +
                "\n" +
                "### 数据可靠性\n" +
                "\n" +
                "- RocketMQ支持异步实时刷盘，同步刷盘，同步Replication，异步Replication\n" +
                "- Kafka使用异步刷盘方式，异步Replication\n" +
                "\n" +
                "> 总结：RocketMQ的同步刷盘在单机可靠性上比Kafka更高，不会因为操作系统Crash，导致数据丢失。 同时同步Replication也比Kafka异步Replication更可靠，数据完全无单点。另外Kafka的Replication以topic为单位，支持主机宕机，备机自动切换，但是这里有个问题，由于是异步Replication，那么切换后会有数据丢失，同时Leader如果重启后，会与已经存在的Leader产生数据冲突。开源版本的RocketMQ不支持Master宕机，Slave自动切换为Master，阿里云版本的RocketMQ支持自动切换特性。\n" +
                "\n" +
                " \n" +
                "\n" +
                "### 消费失败重试\n" +
                "\n" +
                "- Kafka消费失败不支持重试\n" +
                "- RocketMQ消费失败支持定时重试，每次重试间隔时间顺延(rocketmq详细讲解)\n" +
                "\n" +
                "> 总结：例如充值类应用，当前时刻调用运营商网关，充值失败，可能是对方压力过多，稍后在调用就会成功，如支付宝到银行扣款也是类似需求。\n" +
                ">\n" +
                "> 这里的重试需要可靠的重试，即失败重试的消息不因为Consumer宕机导致丢失。\n" +
                "\n" +
                "### 严格的消息顺序\n" +
                "\n" +
                "- Kafka支持分区消息顺序，但不保证topic的顺序，如果要顺序获取，只能设置一个分区\n" +
                "- RocketMQ支持严格的消息顺序，在顺序消息场景下，一台Broker宕机后，发送消息会失败，但是不会乱序(rocketmq详细讲解)\n" +
                "\n" +
                "> Mysql Binlog分发需要严格的消息顺序\n" +
                "\n" +
                "\n" +
                "\n" +
                "### 分布式事务消息\n" +
                "\n" +
                "- Kafka不支持分布式事务消息\n" +
                "- 阿里云ONS支持分布式定时消息，未来开源版本的RocketMQ也有计划支持分布式事务消息(rocketmq详细讲解)\n" +
                "\n" +
                "### 消息查询\n" +
                "\n" +
                "- Kafka不支持消息查询\n" +
                "- RocketMQ支持根据Message Id查询消息，也支持根据消息内容查询消息（发送消息时指定一个Message Key，任意字符串，例如指定为订单Id）\n" +
                "\n" +
                "> 总结：消息查询对于定位消息丢失问题非常有帮助，例如某个订单处理失败，是消息没收到还是收到处理出错了。\n" +
                "\n" +
                "\n" +
                "\n" +
                "### 消息回溯\n" +
                "\n" +
                "- Kafka理论上可以按照Offset来回溯消息\n" +
                "- RocketMQ支持按照时间来回溯消息，精度毫秒，例如从一天之前的某时某分某秒开始重新消费消息\n" +
                "\n" +
                "> 总结：典型业务场景如consumer做订单分析，但是由于程序逻辑或者依赖的系统发生故障等原因，导致今天消费的消息全部无效，需要重新从昨天零点开始消费，那么以时间为起点的消息重放功能对于业务非常有帮助。\n" +
                "\n" +
                "### 消费并行度\n" +
                "\n" +
                "- Kafka的消费并行度依赖Topic配置的分区数，如分区数为10，那么最多10台机器来并行消费（每台机器只能开启一个线程），或者一台机器消费（10个线程并行消费）。即消费并行度和分区数一致。\n" +
                "- RocketMQ消费并行度分两种情况\n" +
                "  - 顺序消费方式并行度同Kafka完全一致\n" +
                "  - 乱序方式并行度取决于Consumer的线程数，如Topic配置10个队列，10台机器消费，每台机器100个线程，那么并行度为1000。\n" +
                "\n" +
                "### 消息堆积能力\n" +
                "\n" +
                "Kafka要比RocketMQ的堆积能力更强"}/>

            </div>
        );
    }
}

export default Kafka3;