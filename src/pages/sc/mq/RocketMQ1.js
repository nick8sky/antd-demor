import React, {Component} from 'react';
import Markdown  from 'react-markdown';

class RocketMQ1 extends Component {
    render() {
        return (
            <div>
                <Markdown source={"RocketMQ单机支持1万以上的持久化队列，前提是足够的内存、硬盘空间，过期数据数据删除（RocketMQ中的消息队列长度不是无限的，只是足够大的内存+数据定时删除）\n" +
                "\n" +
                "一主一从配置：\n" +
                "\n" +
                "![Markdown](https://gitee.com/nick070809/pics/raw/master/m4/d794ce22a85df3ad.png)\n" +
                "\n" +
                "**一、部署NameServer：**\n" +
                "\n" +
                "1，安装JDK并设置JAVA_HOME环境变量（启动脚本依赖JAVA_HOME环境变量）\n" +
                "\n" +
                "2，cd /alibaba-rocketmq/bin进入RocketMQ的bin目录\n" +
                "\n" +
                "3，调用nohup sh mqnamesrv &启动NameServer\n" +
                "\n" +
                "\n" +
                "\n" +
                "Name Server\n" +
                "\n" +
                "Name Server是RocketMQ的寻址服务。用于把Broker的路由信息做聚合。客户端依靠Name Server决定去获取对应topic的路由信息，从而决定对哪些Broker做连接。\n" +
                "\n" +
                "- Name Server是一个几乎无状态的结点，Name Server之间采取share-nothing的设计，互不通信。\n" +
                "- 对于一个Name Server集群列表，客户端连接Name Server的时候，只会选择随机连接一个结点，以做到负载均衡。\n" +
                "- Name Server所有状态都从Broker上报而来，本身不存储任何状态，所有数据均在内存。\n" +
                "- 如果中途所有Name Server全都挂了，影响到路由信息的更新，不会影响和Broker的通信。\n" +
                "\n" +
                "\n" +
                "\n" +
                "**二，部署Broker**\n" +
                "\n" +
                "Broker概念差异\n" +
                "\n" +
                "Kafka: Broker是个物理概念，1个broker就对应1台机器。 RocketMQ：Broker是个逻辑概念，1个broker = 1个master + 多个slave。所以才有master broker, slave broker这样的概念。\n" +
                "\n" +
                "Broker集群有多种配置方式：\n" +
                "\n" +
                "1，单Master\n" +
                "\n" +
                "​    优点：除了配置简单没什么优点\n" +
                "\n" +
                "​    缺点：不可靠，该机器重启或宕机，将导致整个服务不可用\n" +
                "\n" +
                "2，多Master\n" +
                "\n" +
                "​    优点：配置简单，性能最高\n" +
                "\n" +
                "​    缺点：可能会有少量消息丢失（配置相关），单台机器重启或宕机期间，该机器下未被消费的消息在机器恢复前不可订阅，影响消息实时性\n" +
                "\n" +
                "3，多Master多Slave，每个Master配一个Slave，有多对Master-Slave，**主从异步复制**，主备有短暂消息延迟，毫秒级\n" +
                "\n" +
                "​    优点：性能同多Master几乎一样，实时性高，主备间切换对应用透明，不需人工干预\n" +
                "\n" +
                "​    缺点：Master宕机或磁盘损坏时会有少量消息丢失\n" +
                "\n" +
                "4，多Master多Slave，每个Master配一个Slave，有多对Master-Slave，**主从同步双写**，主备都写成功，向应用返回成功\n" +
                "\n" +
                "​    优点：服务可用性与数据可用性非常高\n" +
                "\n" +
                "​    缺点：性能比异步集群略低，当前版本主宕备不能自动切换为主\n" +
                "\n" +
                "\n" +
                "\n" +
                "Master和Slave的配置文件参考conf目录下的配置文件\n" +
                "\n" +
                "**Master与Slave通过指定相同的brokerName参数来配对，Master的BrokerId必须是0，Slave的BrokerId必须是大于0的数。**\n" +
                "\n" +
                "一个Master下面可以挂载多个Slave，同一Master下的多个Slave通过指定不同的BrokerId来区分部署一Master一Slave，集群采用异步复制方式：\n" +
                "\n" +
                "\n" +
                "\n" +
                "Broker\n" +
                "\n" +
                "Broker是处理消息存储，转发等处理的服务器。\n" +
                "\n" +
                "- Broker以group分开，每个group只允许一个master，若干个slave。\n" +
                "- 只有master才能进行写入操作，slave不允许。\n" +
                "- slave从master中同步数据。同步策略取决于master的配置，可以采用同步双写，异步复制两种。\n" +
                "- 客户端消费可以从master和slave消费。在默认情况下，消费者都从master消费，在master挂后，客户端由于从Name Server中感知到Broker挂机，就会从slave消费。\n" +
                "- Broker向所有的NameServer结点建立长连接，注册Topic信息。\n" +
                "\n" +
                "\n" +
                "\n" +
                "Filter Server（可选）\n" +
                "\n" +
                "RocketMQ可以允许消费者上传一个Java类给Filter Server进行过滤。\n" +
                "\n" +
                "- Filter Server只能起在Broker所在的机器\n" +
                "- 可以有若干个Filter Server进程\n" +
                "- 拉取消息的时候，消息先经过Filter Server，Filter Server靠上传的Java类过滤消息后才推给Consumer消费。\n" +
                "- 客户端完全可以消费消息的时候做过滤，不需要Filter Server\n" +
                "- FilterServer存在的目的是用Broker的CPU资源换取网卡资源。因为Broker的瓶颈往往在网卡，而且CPU资源很闲。在客户端过滤会导致无需使用的消息在占用网卡资源。\n" +
                "- 使用 Java 类上传作为过滤表达式是一个双刃剑，一方面方便了应用的过滤操作且节省网卡资源，另一方面也带来了服务器端的安全风险，这需要足够谨慎，消费端上传的class要保证过滤的代码足够安全——例如在过滤程序里尽可能不做申请大内存，创建线程等操作，避免 Broker 服务器资源泄漏。\n" +
                "\n" +
                "\n" +
                "\n" +
                "## 概念术语\n" +
                "\n" +
                "**Producer**\n" +
                "\n" +
                "必须要设置Name Server地址：\n" +
                "\n" +
                "```\n" +
                "DefaultMQProducer producer = new DefaultMQProducer(\"Producer\");  \n" +
                "producer.setNamesrvAddr(\"192.168.58.163:9876\");   \n" +
                "```\n" +
                "\n" +
                "**Consumer**\n" +
                "\n" +
                "必须要设置Name Server地址:\n" +
                "\n" +
                "```\n" +
                "DefaultMQPushConsumer consumer = new DefaultMQPushConsumer(\"PushConsumer\");  \n" +
                "consumer.setNamesrvAddr(\"192.168.58.163:9876\");  \n" +
                "```\n" +
                "\n" +
                "#### PushConsumer\n" +
                "\n" +
                "推送模式（虽然RocketMQ使用的是长轮询）的消费者。消息的能及时被消费。使用非常简单，内部已处理如线程池消费、流控、负载均衡、异常处理等等的各种场景。\n" +
                "\n" +
                "#### PullConsumer\n" +
                "\n" +
                "拉取模式的消费者。应用主动控制拉取的时机，怎么拉取，怎么消费等。主动权更高。但要自己处理各种场景。\n" +
                "\n" +
                "### Producer Group\n" +
                "\n" +
                "标识发送同一类消息的Producer，通常发送逻辑一致。发送普通消息的时候，仅标识使用，并无特别用处。若事务消息，如果某条发送某条消息的producer-A宕机，使得事务消息一直处于PREPARED状态并超时，则broker会回查同一个group的其 他producer，确认这条消息应该commit还是rollback。但开源版本并不完全支持事务消息（阉割了事务回查的代码）。\n" +
                "\n" +
                "### Consumer Group\n" +
                "\n" +
                "标识一类Consumer的集合名称，这类Consumer通常消费一类消息，且消费逻辑一致。同一个Consumer Group下的各个实例将共同消费topic的消息，起到负载均衡的作用。\n" +
                "\n" +
                "消费进度以Consumer Group为粒度管理，不同Consumer Group之间消费进度彼此不受影响，即消息A被Consumer Group1消费过，也会再给Consumer Group2消费。\n" +
                "\n" +
                "注： RocketMQ要求同一个Consumer Group的消费者必须要拥有相同的注册信息，即必须要听一样的topic(并且tag也一样)。\n" +
                "\n" +
                "### Topic\n" +
                "\n" +
                "标识一类消息的逻辑名字，消息的逻辑管理单位。无论消息生产还是消费，都需要指定Topic。\n" +
                "\n" +
                "### Tag\n" +
                "\n" +
                "RocketMQ支持给在发送的时候给topic打tag，同一个topic的消息虽然逻辑管理是一样的。但是消费topic1的时候，如果你订阅的时候指定的是tagA，那么tagB的消息将不会投递。\n" +
                "\n" +
                "### Message Queue\n" +
                "\n" +
                "简称Queue或Q。消息物理管理单位。一个Topic将有若干个Q。若Topic同时创建在不同的Broker，则不同的broker上都有若干Q，消息将物理地存储落在不同Broker结点上，具有水平扩展的能力。\n" +
                "\n" +
                "无论生产者还是消费者，实际的生产和消费都是针对Q级别。例如Producer发送消息的时候，会预先选择（默认轮询）好该Topic下面的某一条Q地发送；Consumer消费的时候也会负载均衡地分配若干个Q，只拉取对应Q的消息。\n" +
                "\n" +
                "每一条message queue均对应一个文件，这个文件存储了实际消息的索引信息。并且即使文件被删除，也能通过实际纯粹的消息文件（commit log）恢复回来。\n" +
                "\n" +
                "### Offset\n" +
                "\n" +
                "RocketMQ中，有很多offset的概念。但通常我们只关心暴露到客户端的offset。一般我们不特指的话，就是指逻辑Message Queue下面的offset。\n" +
                "可以认为一条逻辑的message queue是无限长的数组。一条消息进来下标就会涨1。下标就是offset。\n" +
                "一条message queue中的max offset表示消息的最大offset。注：这里从源码上看，max_offset并不是最新的那条消息的offset，而是表示最新消息的offset+1。\n" +
                "而min offset则标识现存在的最小offset。\n" +
                "由于消息存储一段时间后，消费会被物理地从磁盘删除，message queue的min offset也就对应增长。这意味着比min offset要小的那些消息已经不在broker上了，无法被消费。\n" +
                "\n" +
                "### Consumer Offset\n" +
                "\n" +
                "用于标记Consumer Group在一条逻辑Message Queue上，消息消费到哪里了。注：从源码上看，这个数值是最新消费的那条消息的offset+1，所以实际上这个值存储的是【下次拉取的话，从哪里开始拉取的offset】。\n" +
                "消费者拉取消息的时候需要指定offset，broker不主动推送消息，而是接受到请求的时候把存储的对应offset的消息返回给客户端。这个offset在成功消费后会更新到内存，并定时持久化。在集群消费模式下，会同步持久化到broker。在广播模式下，会持久化到本地文件。\n" +
                "实例重启的时候会获取持久化的consumer offset，用以决定从哪里开始消费。\n" +
                "\n" +
                "### 集群消费\n" +
                "\n" +
                "消费者的一种消费模式。一个Consumer Group中的各个Consumer实例分摊去消费消息，即一条消息只会投递到一个Consumer Group下面的一个实例。\n" +
                "\n" +
                "实际上，每个Consumer是平均分摊Message Queue的去做拉取消费。例如某个Topic有3条Q，其中一个Consumer Group 有 3 个实例（或者 3 台机器），那么每个实例只消费其中的1条Q。\n" +
                "\n" +
                "而由Producer发送消息的时候是轮询所有的Q,所以消息会平均散落在不同的Q上，可以认为Q上的消息是平均的。那么实例也就平均地消费消息了。\n" +
                "\n" +
                "这种模式下，消费进度的存储会持久化到Broker。\n" +
                "\n" +
                "### 广播消费\n" +
                "\n" +
                "消费者的一种消费模式。消息将对一个Consumer Group下的各个Consumer实例都投递一遍。即即使这些 Consumer 属于同一个Consumer Group，消息也会被Consumer Group 中的每个Consumer都消费一次。\n" +
                "\n" +
                "实际上，是一个消费组下的每个消费者实例都获取到了topic下面的每个Message Queue去拉取消费。所以消息会投递到每个消费者实例。\n" +
                "\n" +
                "这种模式下，消费进度会存储持久化到实例本地。\n" +
                "\n" +
                "### 顺序消息\n" +
                "\n" +
                "消费消息的顺序要同发送消息的顺序一致。由于Consumer消费消息的时候是针对Message Queue顺序拉取并开始消费，且一条Message Queue只会给一个消费者（集群模式下），所以能够保证同一个消费者实例对于Q上消息的消费是顺序地开始消费（不一定顺序消费完成，因为消费可能并行）。\n" +
                "\n" +
                "在RocketMQ中，顺序消费主要指的是都是Queue级别的局部顺序。这一类消息为满足顺序性，必须Producer单线程顺序发送，且发送到同一个队列，这样Consumer就可以按照Producer发送的顺序去消费消息。\n" +
                "\n" +
                "生产者发送的时候可以用MessageQueueSelector为某一批消息（通常是有相同的唯一标示id）选择同一个Queue，则这一批消息的消费将是顺序消息（并由同一个consumer完成消息）。或者Message Queue的数量只有1，但这样消费的实例只能有一个，多出来的实例都会空跑。\n" +
                "\n" +
                "### 普通顺序消息\n" +
                "\n" +
                "顺序消息的一种，正常情况下可以保证完全的顺序消息，但是一旦发生异常，Broker宕机或重启，由于队列总数发生发化，消费者会触发负载均衡，而默认地负载均衡算法采取哈希取模平均，这样负载均衡分配到定位的队列会发化，使得队列可能分配到别的实例上，则会短暂地出现消息顺序不一致。\n" +
                "\n" +
                "如果业务能容忍在集群异常情况（如某个 Broker 宕机或者重启）下，消息短暂的乱序，使用普通顺序方式比较合适。\n" +
                "\n" +
                "### 严格顺序消息\n" +
                "\n" +
                "顺序消息的一种，无论正常异常情况都能保证顺序，但是牺牲了分布式 Failover 特性，即 Broker集群中只要有一台机器不可用，则整个集群都不可用，服务可用性大大降低。\n" +
                "\n" +
                "如果服务器部署为同步双写模式，此缺陷可通过备机自动切换为主避免，不过仍然会存在几分钟的服务不可用。（依赖同步双写，主备自动切换，自动切换功能目前并未实现）"}/>

            </div>
        );
    }
}

export default RocketMQ1;