import React, {Component} from 'react';
import Markdown  from 'react-markdown';

class Kafka1 extends Component {
    render() {
        return (
            <div>
                <Markdown source={"**Broker**\n" +
                "\n" +
                "Kafka集群包含一个或多个服务器，这种服务器被称为broker\n" +
                "\n" +
                "**Topic**\n" +
                "\n" +
                "每条发布到Kafka集群的消息都有一个类别，这个类别被称为Topic。\n" +
                "\n" +
                "**Partition**\n" +
                "\n" +
                "Parition是物理上的概念，每个Topic包含一个或多个Partition.\n" +
                "\n" +
                "**Producer**\n" +
                "\n" +
                "负责发布消息到Kafka broker\n" +
                "\n" +
                "**Consumer**\n" +
                "\n" +
                "消息消费者，向Kafka broker读取消息的客户端。\n" +
                "\n" +
                "**Consumer Group**\n" +
                "\n" +
                "每个Consumer属于一个特定的Consumer Group（可为每个Consumer指定group name，若不指定group name则属于默认的group）。\n" +
                "\n" +
                "![Markdown](https://gitee.com/nick070809/pics/raw/master/m4/20170520173825028.png)\n" +
                "\n" +
                "\n" +
                "![Markdown](https://gitee.com/nick070809/pics/raw/master/m4/20170520180436658.png)\n" +
                "\n" +
                "Producer使用push模式将消息发布到broker，Consumer使用pull模式从broker订阅并消费消息。\n" +
                "\n" +
                "i. 消息的发布（publish）称作producer，消息的订阅（subscribe）称作consumer，中间的存储阵列称作broker。 \n" +
                "\n" +
                "ii. 多个broker协同合作，producer、consumer和broker三者之间通过zookeeper来协调请求和转发。 \n" +
                "\n" +
                "iii. producer产生和推送(push)数据到broker，consumer从broker拉取(pull)数据并进行处理。 \n" +
                "\n" +
                "iv. **broker端不维护数据的消费状态，提升了性能。**\n" +
                "\n" +
                "v. 直接使用磁盘进行存储，线性读写，速度快：避免了数据在JVM内存和系统内存之间的复制，减少耗性能的创建对象和垃圾回收。 \n" +
                "\n" +
                "vi. Kafka使用scala编写，可以运行在JVM上。 \n" +
                "\n" +
                "Kafka集群搭建\n" +
                "\n" +
                "1、 Kafka的安装需要java环境，cent os 7自带java1.6版本，可以不用重新安装，直接使用自带的jdk 即可；如果觉得jdk版本太旧，也可以自己重新安装；\n" +
                "\n" +
                "2、 准备好kafka安装包，官网下载地址： \n" +
                "<http://kafka.apache.org/downloads.html>\n" +
                "\n" +
                "3、 下载好kafka安装包后，将其解压到/usr/local目录下，删除压缩包\n" +
                "\n" +
                "4、 目前搭建了三个节点的kafka集群，分别在10.10.67.102，10.10.67.104和10.10.67.106服务器上；\n" +
                "\n" +
                "5、 查看配置文件 \n" +
                "进入kafka的config的目录：\n" +
                "\n" +
                "![Markdown](https://gitee.com/nick070809/pics/raw/master/m4/20170518163541764.bmp)\n" +
                "\n" +
                "6、 先建立zk集群，直接使用kafka自带的zookeeper建立zk集群，修改zookeeper.properties文件：\n" +
                "\n" +
                "![Markdown](https://gitee.com/nick070809/pics/raw/master/m4/20170518163645089.bmp)\n" +
                "\n" +
                "三个机器上的zookeeper.properties文件配置相同，需要注意的是日志保存的路径，不会自动生成，需要自己手动建立相关的路径， dataLogDir是我自己加的，日志文件太多，把日志文件区分开；\n" +
                "\n" +
                "7、 创建myid文件，进入/usr/local/kafka/zookeeper，创建myid文件，将三个服务器上的myid文件分别写入1，2，3，如图：\n" +
                "\n" +
                "![Markdown](http://img.blog.csdn.net/20170518163911232?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvenh5OTg3ODcyNjc0/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast)\n" +
                "\n" +
                "—-myid是zk集群用来发现彼此的标识，必须创建，且不能相同；\n" +
                "\n" +
                "8、 进入kafka目录 执行启动zookeeper命令： \n" +
                "./bin/zookeeper-server-start.sh config/zookeeper.properties & \n" +
                "三台机器都执行启动命令，查看zookeeper的日志文件，没有报错就说明zookeeper集群启动成功了。\n" +
                "\n" +
                "9、 搭建kafka集群，修改server.properties配置文件： \n" +
                "\n" +
                "![Markdown](http://img.blog.csdn.net/20170518164309410?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvenh5OTg3ODcyNjc0/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast)\n" +
                "\n" +
                "![Markdown](https://gitee.com/nick070809/pics/raw/master/m4/20170518164322254.bmp)\n" +
                "\n" +
                "server.properties配置文件的修改主要在开头和结尾，中间保持默认配置即可；需要注意的点是broker.id的值三个节点要配置不同的值，分别配置为0，1，2；log.dirs必须保证目录存在，不会根据配置文件自动生成；\n" +
                "\n" +
                "10、 启动kafka集群，进入kafka目录，执行如下命令 ： \n" +
                "./bin/kafka-server-start.sh –daemon config/server.properties & \n" +
                "三个节点均要启动；启动无报错，即搭建成功，可以生产和消费消息，来检测是否搭建成功。\n" +
                "\n" +
                "\n" +
                "\n" +
                "\n" +
                "\n" +
                "参考：\n" +
                "\n" +
                "http://czj4451.iteye.com/blog/2041096\n" +
                "\n" +
                "http://blog.csdn.net/zxy987872674/article/details/72466504 集群搭建详细步骤"}/>

            </div>
        );
    }
}

export default Kafka1;