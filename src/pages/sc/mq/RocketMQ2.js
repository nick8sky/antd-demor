import React, {Component} from 'react';
import Markdown  from 'react-markdown';

class RocketMQ2 extends Component {
    render() {
        return (
            <div>
                <Markdown source={"#### 关键特性以及其实现原理\n" +
                "\n" +
                "##### 一、顺序消息\n" +
                "\n" +
                "消息有序指的是可以按照消息的发送顺序来消费。例如：一笔订单产生了 3 条消息，分别是订单创建、订单付款、订单完成。消费时，要按照顺序依次消费才有意义。与此同时多笔订单之间又是可以并行消费的。首先来看如下示例：\n" +
                "\n" +
                "假如生产者产生了2条消息：M1、M2，要保证这两条消息的顺序，应该怎样做？你脑中想到的可能是这样：\n" +
                "\n" +
                "![Markdown](https://gitee.com/nick070809/pics/raw/master/m4/97af659a463faf0d.png)\n" +
                "\n" +
                "你可能会采用这种方式保证消息顺序\n" +
                "\n" +
                "假定M1发送到S1，M2发送到S2，如果要保证M1先于M2被消费，那么需要M1到达消费端被消费后，通知S2，然后S2再将M2发送到消费端。\n" +
                "\n" +
                "这个模型存在的问题是，如果M1和M2分别发送到两台Server上，就不能保证M1先达到MQ集群，也不能保证M1被先消费。换个角度看，如果M2先于M1达到MQ集群，甚至M2被消费后，M1才达到消费端，这时消息也就乱序了，说明以上模型是不能保证消息的顺序的。如何才能在MQ集群保证消息的顺序？一种简单的方式就是将M1、M2发送到同一个Server上：\n" +
                "\n" +
                "![Markdown](https://gitee.com/nick070809/pics/raw/master/m4/e12d773c2b25ed6a.png)\n" +
                "\n" +
                "这样可以保证M1先于M2到达MQServer（生产者等待M1发送成功后再发送M2），根据先达到先被消费的原则，M1会先于M2被消费，这样就保证了消息的顺序。\n" +
                "\n" +
                "这个模型也仅仅是理论上可以保证消息的顺序，在实际场景中可能会遇到下面的问题：\n" +
                "\n" +
                "![Markdown](https://gitee.com/nick070809/pics/raw/master/m4/c9555158dd922345.png)\n" +
                "\n" +
                "只要将消息从一台服务器发往另一台服务器，就会存在网络延迟问题。如上图所示，如果发送M1耗时大于发送M2的耗时，那么M2就仍将被先消费，仍然不能保证消息的顺序。即使M1和M2同时到达消费端，由于不清楚消费端1和消费端2的负载情况，仍然有可能出现M2先于M1被消费的情况。\n" +
                "\n" +
                "那如何解决这个问题？将M1和M2发往同一个消费者，且发送M1后，需要消费端响应成功后才能发送M2。\n" +
                "\n" +
                "聪明的你可能已经想到另外的问题：如果M1被发送到消费端后，消费端1没有响应，那是继续发送M2呢，还是重新发送M1？一般为了保证消息一定被消费，肯定会选择重发M1到另外一个消费端2，就如下图所示。\n" +
                "\n" +
                "![Markdown](https://gitee.com/nick070809/pics/raw/master/m4/d70c5fe09e4ed483.png)\n" +
                "\n" +
                "这样的模型就严格保证消息的顺序，细心的你仍然会发现问题，消费端1没有响应Server时有两种情况，一种是M1确实没有到达(数据在网络传送中丢失)，另外一种消费端已经消费M1且已经发送响应消息，只是MQ Server端没有收到。如果是第二种情况，重发M1，就会造成M1被重复消费。也就引入了我们要说的第二个问题，消息重复问题，这个后文会详细讲解。\n" +
                "\n" +
                "回过头来看消息顺序问题，严格的顺序消息非常容易理解，也可以通过文中所描述的方式来简单处理。总结起来，要实现严格的顺序消息，简单且可行的办法就是：\n" +
                "\n" +
                ">保证生产者 - MQServer - 消费者是一对一对一的关系\n" +
                "\n" +
                "这样的设计虽然简单易行，但也会存在一些很严重的问题，比如：\n" +
                "\n" +
                "> 并行度就会成为消息系统的瓶颈（吞吐量不够）\n" +
                ">\n" +
                "> 更多的异常处理，比如：只要消费端出现问题，就会导致整个处理流程阻塞，我们不得不花费更多的精力来解决阻塞的问题。\n" +
                "\n" +
                "但我们的最终目标是要集群的高容错性和高吞吐量。这似乎是一对不可调和的矛盾，那么阿里是如何解决的？\n" +
                "\n" +
                "> 世界上解决一个计算机问题最简单的方法：“恰好”不需要解决它！\n" +
                "\n" +
                "有些问题，看起来很重要，但实际上我们可以通过**合理的设计**或者**将问题分解**来规避。如果硬要把时间花在解决问题本身，实际上不仅效率低下，而且也是一种浪费。从这个角度来看消息的顺序问题，我们可以得出两个结论：\n" +
                "\n" +
                ">1. 不关注乱序的应用实际大量存在\n" +
                ">2. 队列无序并不意味着消息无序\n" +
                "\n" +
                "所以从业务层面来保证消息的顺序而不仅仅是依赖于消息系统，是不是我们应该寻求的一种更合理的方式？\n" +
                "\n" +
                "最后我们从源码角度分析RocketMQ怎么实现发送顺序消息。\n" +
                "\n" +
                "RocketMQ通过轮询所有队列的方式来确定消息被发送到哪一个队列（负载均衡策略）。比如下面的示例中，订单号相同的消息会被先后发送到同一个队列中：\n" +
                "\n" +
                "```\n" +
                "// RocketMQ通过MessageQueueSelector中实现的算法来确定消息发送到哪一个队列上\n" +
                "// RocketMQ默认提供了两种MessageQueueSelector实现：随机/Hash\n" +
                "// 当然你可以根据业务实现自己的MessageQueueSelector来决定消息按照何种策略发送到消息队列中\n" +
                "SendResult sendResult = producer.send(msg, new MessageQueueSelector() {\n" +
                "    @Override\n" +
                "    public MessageQueue select(List<MessageQueue> mqs, Message msg, Object arg) {\n" +
                "        Integer id = (Integer) arg;\n" +
                "        int index = id % mqs.size();\n" +
                "        return mqs.get(index);\n" +
                "    }\n" +
                "}, orderId);\n" +
                "\n" +
                "```\n" +
                "\n" +
                "在获取到路由信息以后，会根据MessageQueueSelector实现的算法来选择一个队列，同一个OrderId获取到的肯定是同一个队列。\n" +
                "\n" +
                "```\n" +
                "private SendResult send()  {\n" +
                "    // 获取topic路由信息\n" +
                "    TopicPublishInfo topicPublishInfo = this.tryToFindTopicPublishInfo(msg.getTopic());\n" +
                "    if (topicPublishInfo != null && topicPublishInfo.ok()) {\n" +
                "        MessageQueue mq = null;\n" +
                "        // 根据我们的算法，选择一个发送队列\n" +
                "        // 这里的arg = orderId\n" +
                "        mq = selector.select(topicPublishInfo.getMessageQueueList(), msg, arg);\n" +
                "        if (mq != null) {\n" +
                "            return this.sendKernelImpl(msg, mq, communicationMode, sendCallback, timeout);\n" +
                "        }\n" +
                "    }\n" +
                "}\n" +
                "```\n" +
                "\n" +
                "##### 二、消息重复\n" +
                "\n" +
                "上面在解决消息顺序问题时，引入了一个新的问题，就是消息重复。那么RocketMQ是怎样解决消息重复的问题呢？还是“恰好”不解决。\n" +
                "\n" +
                "造成消息重复的根本原因是：网络不可达。只要通过网络交换数据，就无法避免这个问题。所以解决这个问题的办法就是绕过这个问题。那么问题就变成了：如果消费端收到两条一样的消息，应该怎样处理？\n" +
                "\n" +
                "> 消费端处理消息的业务逻辑保持幂等性\n" +
                ">\n" +
                "> 保证每条消息都有唯一编号且保证消息处理成功与去重表的日志同时出现\n" +
                "\n" +
                "第1条很好理解，只要保持幂等性，不管来多少条重复消息，最后处理的结果都一样。第2条原理就是利用一张日志表来记录已经处理成功的消息的ID，如果新到的消息ID已经在日志表中，那么就不再处理这条消息。\n" +
                "\n" +
                "第1条解决方案，很明显应该在消费端实现，不属于消息系统要实现的功能。第2条可以消息系统实现，也可以业务端实现。正常情况下出现重复消息的概率其实很小，如果由消息系统来实现的话，肯定会对消息系统的吞吐量和高可用有影响，所以最好还是由业务端自己处理消息重复的问题，这也是RocketMQ不解决消息重复的问题的原因。\n" +
                "\n" +
                "**RocketMQ不保证消息不重复，如果你的业务需要保证严格的不重复消息，需要你自己在业务端去重。**\n" +
                "\n" +
                "\n" +
                "\n" +
                "##### 三、事务消息\n" +
                "\n" +
                "RocketMQ除了支持普通消息，顺序消息，另外还支持事务消息。首先讨论一下什么是事务消息以及支持事务消息的必要性。我们以一个转帐的场景为例来说明这个问题：Bob向Smith转账100块。\n" +
                "\n" +
                "在单机环境下，执行事务的情况，大概是下面这个样子：\n" +
                "\n" +
                "![Markdown](https://gitee.com/nick070809/pics/raw/master/m4/0a3064b8305a519e.png)\n" +
                "\n" +
                "当用户增长到一定程度，Bob和Smith的账户及余额信息已经不在同一台服务器上了，那么上面的流程就变成了这样：\n" +

                "\n" +
                "![Markdown](https://gitee.com/nick070809/pics/raw/master/m4/a97b17b3efc98880.png)\n" +
                "\n" +
                "这时候你会发现，同样是一个转账的业务，在集群环境下，耗时居然成倍的增长，这显然是不能够接受的。那如何来规避这个问题？\n" +
                "\n" +
                "> **大事务 = 小事务 + 异步**\n" +
                "\n" +
                "将大事务拆分成多个小事务异步执行。这样基本上能够将跨机事务的执行效率优化到与单机一致。转账的事务就可以分解成如下两个小事务：\n" +
                "\n" +
                "![Markdown](https://gitee.com/nick070809/pics/raw/master/m4/7a60ffbb1db6dfcd.png)\n" +

                "\n" +
                "图中执行本地事务（Bob账户扣款）和发送异步消息应该保证同时成功或者同时失败，也就是扣款成功了，发送消息一定要成功，如果扣款失败了，就不能再发送消息。那问题是：我们是先扣款还是先发送消息呢？\n" +
                "\n" +
                "在我养成的习惯中是先处理本地，在进行异步操作，这样是因为本地是可以回滚的，而异步操作是不能回滚；如果先异步成功而本地失败，在这个例子中，就会Smith增加了100元而Bob没有扣款。\n" +
                "\n" +
                "> 如果使用Spring来管理事物的话，大可以将发送消息的逻辑放到本地事物中去，发送消息失败抛出异常，Spring捕捉到异常后就会回滚此事物，以此来保证本地事物与发送消息的原子性。\n" +
                "\n" +
                "RocketMQ支持事务消息，下面来看看RocketMQ是怎样来实现的。\n" +
                "\n" +
                "![Markdown](https://gitee.com/nick070809/pics/raw/master/m4/3bc3ab8c21b7abde.png)\n" +
                "\n" +
                "RocketMQ第一阶段发送Prepared消息时，会拿到消息的地址，第二阶段执行本地事物，第三阶段通过第一阶段拿到的地址去访问消息，并修改消息的状态。\n" +
                "\n" +
                "细心的你可能又发现问题：\n" +
                "\n" +
                "1、如果发送成功，bob扣款失败，则不会发送确认消息；RocketMQ会定期扫描消息集群中的事务消息，而发现bob扣款失败，则这条消息将被抹掉。\n" +
                "\n" +
                "2、如果bob扣款成功，而确认消息发送失败了怎么办？RocketMQ会定期扫描消息集群中的事务消息，如果发现了Prepared消息，它会向消息发送端(生产者)确认，Bob的钱到底是减了还是没减呢？如果减了是回滚还是继续发送确认消息呢？RocketMQ会根据发送端设置的策略来决定是回滚还是继续发送确认消息。这样就保证了消息发送与本地事务同时成功或同时失败。\n" +
                "\n" +
                "\n" +
                "\n" +
                "那我们来看下RocketMQ源码，是如何处理事务消息的。客户端发送事务消息的部分（完整代码请查看：rocketmq-example工程下的com.alibaba.rocketmq.example.transaction.TransactionProducer）：\n" +
                "\n" +
                "```\n" +
                "// ===================发送事务消息的一系列准备工作=================\n" +
                "// 未决事务，MQ服务器回查客户端\n" +
                "// 也就是上文所说的，当RocketMQ发现`Prepared消息`时，会根据这个Listener实现的策略来决断事务\n" +
                "TransactionCheckListener transactionCheckListener = new TransactionCheckListenerImpl();\n" +
                "// 构造事务消息的生产者\n" +
                "TransactionMQProducer producer = new TransactionMQProducer(\"groupName\");\n" +
                "// 设置事务决断处理类\n" +
                "producer.setTransactionCheckListener(transactionCheckListener);\n" +
                "// 本地事务的处理逻辑，相当于示例中检查Bob账户并扣钱的逻辑\n" +
                "TransactionExecuterImpl tranExecuter = new TransactionExecuterImpl();\n" +
                "producer.start()\n" +
                "// 构造MSG，省略构造参数\n" +
                "Message msg = new Message(......);\n" +
                "// 发送消息\n" +
                "SendResult sendResult = producer.sendMessageInTransaction(msg, tranExecuter, null);\n" +
                "producer.shutdown();\n" +
                "```\n" +
                "\n" +
                "接着查看sendMessageInTransaction方法的源码，总共分为3个阶段：发送Prepared消息、执行本地事务、发送确认消息。\n" +
                "\n" +
                "```\n" +
                "//  ==================事务消息的发送过程=====================\n" +
                "public TransactionSendResult sendMessageInTransaction(.....)  {\n" +
                "    // 逻辑代码，非实际代码\n" +
                "    // 1.发送消息\n" +
                "    sendResult = this.send(msg);\n" +
                "    // sendResult.getSendStatus() == SEND_OK\n" +
                "    // 2.如果消息发送成功，处理与消息关联的本地事务单元\n" +
                "    LocalTransactionState localTransactionState = tranExecuter.executeLocalTransactionBranch(msg, arg);\n" +
                "    // 3.结束事务\n" +
                "    this.endTransaction(sendResult, localTransactionState, localException);\n" +
                "}\n" +
                "```\n" +
                "\n" +
                "endTransaction方法会将请求发往broker(mq server)去更新事务消息的最终状态：\n" +
                "\n" +
                "1. 根据`sendResult`找到`Prepared消息` ，`sendResult`包含事务消息的ID\n" +
                "2. 根据`localTransaction`更新消息的最终状态\n" +
                "\n" +
                "如果endTransaction方法执行失败，数据没有发送到broker，导致事务消息的 状态更新失败**，broker会有回查线程定时（默认1分钟）扫描每个存储事务状态的表格文件，如果是已经提交或者回滚的消息直接跳过**，如果是prepared状态则会向Producer发起CheckTransaction请求，Producer会调用DefaultMQProducerImpl.checkTransactionState()方法来处理broker的定时回调请求，而checkTransactionState会调用我们的事务设置的决断方法来决定是回滚事务还是继续执行，最后调用endTransactionOneway让broker来更新消息的最终状态。\n" +
                "\n" +
                "再回到转账的例子，如果Bob的账户的余额已经减少，且消息已经发送成功，Smith端开始消费这条消息，这个时候就会出现消费失败和消费超时两个问题，解决超时问题的思路就是一直重试，直到消费端消费消息成功，整个过程中有可能会出现消息重复的问题，按照前面的思路解决即可。\n" +
                "\n" +
                "![Markdown](https://gitee.com/nick070809/pics/raw/master/m4/9ee1d079c463cbe3.png)\n" +
                "\n" +
                "这样基本上可以解决消费端超时问题，但是如果消费失败怎么办？阿里提供给我们的解决方法是：人工解决。大家可以考虑一下，按照事务的流程，因为某种原因Smith加款失败，那么需要回滚整个流程。如果消息系统要实现这个回滚流程的话，系统复杂度将大大提升，且很容易出现Bug，估计出现Bug的概率会比消费失败的概率大很多。这也是RocketMQ目前暂时没有解决这个问题的原因，在设计实现消息系统时，我们需要衡量是否值得花这么大的代价来解决这样一个出现概率非常小的问题，这也是大家在解决疑难问题时需要多多思考的地方。 "}/>

            </div>
        );
    }
}

export default RocketMQ2;