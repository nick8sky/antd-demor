import React, { Component } from 'react';
import Markdown  from 'react-markdown';



class Mycat2 extends Component {
    render() {


        return (
            <div>
                <Markdown source={"## 数据库路由中间件MyCat -分片规则\n" +
                "\n" +
                "参考：http://blog.csdn.net/zhxdick/article/details/50619328\n" +
                "\n" +
                "### 3. 分片\n" +
                "\n" +
                "#### 3.1 分片节点（dataNode）\n" +
                "\n" +
                "表被水平切分后，每个分片表所在的数据库就是一个分片节点。一个分片节点对应一个数据库（mysql数据库）。一个分片节点只能保存每个分片表的一个分片，因为db中不允许出现同名的表。 \n" +
                "例如：\n" +
                "\n" +
                "```\n" +
                "<dataNode name=\"test1\" dataHost=\"test\" database=\"db1\" />\n" +
                "```\n" +
                "\n" +
                "这就表示，名字为test1这个分片节点，对应test节点主机（MySQL实例）主机上的db1数据库\n" +
                "\n" +
                "#### 3.2 节点主机（dataHost）\n" +
                "\n" +
                "分片节点究竟被放在那个主机上。对应mysql里的mysql实例：一台主机可以部署多个mysql实例，一个mysql实例可以有多个数据库。为了规避单节点主机并发数限制，尽量将读写均衡的放在不同的节点主机（dataHost）. \n" +
                "例如：\n" +
                "\n" +
                "```\n" +
                "<dataHost name=\"test\" maxCon=\"1000\" minCon=\"10\" balance=\"0\"\n" +
                "              writeType=\"0\" dbType=\"mysql\" dbDriver=\"native\" switchType=\"-1\"  slaveThreshold=\"100\">\n" +
                "        <heartbeat>select 1 from dual</heartbeat>\n" +
                "        <writeHost host=\"master\" url=\"10.202.4.181:3306\" user=\"root\"\n" +
                "                   password=\"sf123456\">\n" +
                "            <readHost host=\"slave\" url=\"10.202.4.181:3307\"  user=\"root\" password=\"sf123456\"/>\n" +
                "        </writeHost>\n" +
                "</dataHost>\n" +
                "```\n" +
                "\n" +
                "---\n" +
                "\n" +
                "### 分片规则\n" +
                "\n" +
                "决定分片表如何分布在不同的分片节点上。分片规则有很多种，我们根据业务需要，并考虑到开发，维护以及扩容的难度，来决定用哪种分片方案。 \n" +
                "分片规则一般还涉及到全局id生成。 \n" +
                "MyCat支持我们自己开发自己的分片规则，如何开发。\n" +
                "\n" +
                "**哈希取模：**\n" +
                "\n" +
                "这是最常见的一种分片方案，根据分片字段（一般是主键，因为按主键查找的场景偏多）的哈希值，对分片个数取模运算，根据结果决定记录到哪个分片上。 \n" +
                "一般分片个数最好为2的n次方，这样计算起来可以用取与运算（x%(2^n)=x&(2^n - 1)）. \n" +
                "好处：记录平均分布（除非id生成器故意生成取模正好只为同一个数的id），压力平均分布，数据没有倾斜 \n" +
                "**坏处：扩容（增加分片）是个大问题，分片个数改变，基本很难迁移数据** \n" +
                "配置举例： \n" +
                "**rule.xml:**\n" +
                "\n" +
                "```\n" +
                "<tableRule name=\"mod-long-rule1\">\n" +
                "    <rule>\n" +
                "        <columns>user_id</columns>\n" +
                "        <algorithm>mod-long</algorithm>\n" +
                "    </rule>\n" +
                "</tableRule>\n" +
                "<function name=\"mod-long\" class=\"org.opencloudb.route.function.PartitionByMod\">\n" +
                "    <!-- how many data nodes -->\n" +
                "    <property name=\"count\">3</property>\n" +
                "</function>\n" +
                "```\n" +
                "\n" +
                "可以看出，用java反射机制加载org.opencloudb.route.function.PartitionByMod这个类，在这个org.opencloudb.route.function的所有类都为分片算法，如何实现，将会在之后的rule.xml配置说明中提到。这个算法接收一个参数，其实就是分片个数。之后在tableRule标签中,规定是哪一列（字段）为分片字段，对应哪一算法。 \n" +
                "在这里，就是用user_id对3取模之后的值作为该记录分布在哪一个分片节点上。\n" +
                "\n" +
                "\n" +
                "\n" +
                "**路由约定：**\n" +
                "\n" +
                "```\n" +
                "<tableRule name=\"file-map-rule1\">\n" +
                "    <rule>\n" +
                "        <columns>address</columns>\n" +
                "        <algorithm>file-map</algorithm>\n" +
                "    </rule>\n" +
                "</tableRule>\n" +
                "<function name=\"file-map\" class=\"org.opencloudb.route.function.PartitionByFileMap\">\n" +
                "    <property name=\"mapFile\">partition-file-map.txt</property>\n" +
                "    <property name=\"type\">1</property>\n" +
                "    <property name=\"defaultNode\">0</property>\n" +
                "</function>\n" +
                "```\n" +
                "\n" +
                "**type为零则字段类型为整型，为1则为字符串类型。**维护一个对应表配置文件partition-file-map.txt，如下所示： \n" +
                "**partition-file-map.txt：**\n" +
                "\n" +
                "```\n" +
                "北京=0 \n" +
                "上海=1 \n" +
                "深圳=2 \n" +
                "广州=2 \n" +
                "default=3\n" +
                "```\n" +
                "\n" +
                "意思就是分片字段为北京的到分片0上，上海的到分片1上，深圳和广州的到分片2上，其他的到分片3上。 \n" +
                "如果某天发现北京的分片需要扩容，可以将北京的数据整体迁移到一个更大的分片上，之后重载配置。MyCat支持在线重载配置 \n" +
                "好处：扩容比较灵活 \n" +
                "坏处：**数据容易有倾斜，扩容不是很灵活，而且，分片字段很难是常用查询字段**（如果查询字段不是分片字段，就是全分片检索）\n" +
                "\n" +
                "\n" +
                "\n" +
                "**范围路由约定：**\n" +
                "\n" +
                "也是维护一个文件，如下所示：\n" +
                "\n" +
                "```\n" +
                "<tableRule name=\"auto-sharding-long\">\n" +
                "    <rule>\n" +
                "        <columns>user_id</columns>\n" +
                "        <algorithm>rang-long</algorithm>\n" +
                "    </rule>\n" +
                "</tableRule>\n" +
                "<function name=\"rang-long\" class=\"org.opencloudb.route.function.AutoPartitionByLong\">\n" +
                "    <property name=\"mapFile\">autopartition-long.txt</property>\n" +
                "    <property name=\"defaultNode\">0</property>\n" +
                "</function>\n" +
                "```\n" +
                "\n" +
                "autopartition-long.txt\n" +
                "\n" +
                "```\n" +
                "0~1000k=0\n" +
                "1000k~2000k=1\n" +
                "default=2\n" +
                "```\n" +
                "\n" +
                "就是指分片字段在0~1000k范围内的到分片0上\n" +
                "好处：保证每个分片数据稳定，扩容也比较方便 \n" +
                "坏处：需要配合id生成器，否则按顺序自增会有压力集中在一个分片的问题。同时，扩容时同时要改变MyCat配置以及id生成器配置。及时做数据清理，id最好能复用，这个规则才能很好的应用。\n" +
                "\n" +
                "\n" +
                "\n" +
                "**哈希范围约定：**\n" +
                "\n" +
                "将哈希取模与范围路由结合\n" +
                "\n" +
                "```\n" +
                "<tableRule name=\"sharding-by-pattern\">\n" +
                "    <rule>\n" +
                "        <columns>user_id</columns>\n" +
                "        <algorithm>sharding-by-pattern</algorithm>\n" +
                "    </rule>\n" +
                "</tableRule>\n" +
                "<function name=\"sharding-by-pattern\"\n" +
                "class=\"org.opencloudb.route.function.PartitionByPattern\">\n" +
                "    <property name=\"patternValue\">64</property>\n" +
                "    <property name=\"defaultNode\">2</property>\n" +
                "    <property name=\"mapFile\">partition-pattern.txt</property>\n" +
                "</function>\n" +
                "```\n" +
                "\n" +
                "0~15=0\n" +
                "16~31=1\n" +
                "32~47=2\n" +
                "48~63=3\n" +
                "\n" +
                "哈希取模后范围在0~15的流向分片1.。。。 \n" +
                "这样可以某种程度上减轻扩容的压力。\n" +
                "\n" +
                "有时候，我们并不想一个字段的所有内容都作为分片我们可以取某个字段的一部分作为分片依据。配合id生成器使用。\n" +
                "\n" +
                "\n" +
                "\n" +
                "**综合约定**\n" +
                "\n" +
                "其实，我们可以结合id生成器，做一种既好扩容，又维护不复杂，又能平均分摊压力的方法。 \n" +
                "参考百X的某些项目，他们是项目开始就建64个库，每个库64张表。假设每张表1000w数据，那么一共能承受409.6亿的数据。。。从现在来看估计这个项目做到死也许都用不完。 \n" +
                "不过这给我们一个思路，我们根据项目需要估计未来n年的量，在项目一开始就分配这么多库。这些库可能在项目初期位于同一个实例上。在不够用时，我们把其中某几个库迁移到其他实例上。 \n" +
                "我们可以让id生成器去做平均分布的事情。 \n" +
                "比如下面这个id： \n" +
                "01-01-XXXASD1239091234 \n" +
                "我们用第一个-之前的数字直接作为分片id，我们为了考虑到以后的业务增长，一开始就分配了64个库。id生成器先开始只会随机平均生成00~03开头的，之后业务增长到某个程度时，再按照需求多少在某个范围生成。\n" +
                "\n" +
                "\n" +
                "\n" +
                "**多重规则**\n" +
                "\n" +
                "```\n" +
                "北京（A0000000~A9999999）=0，1，2,3,4\n" +
                "北京（B0000000）=5,6,7,8,9\n" +
                "上海（00000000~10000000）=10,11\n" +
                "上海=10,11，12,13,14,15\n" +
                "```\n" +
                "\n" +
                "意思就是，开头为北京的范围在A0000000~A9999999的根据后面的哈希值对5取模平均分布在0，1，2,3,4分片节点上。开头为北京的范围在B0000000以上的根据后面的哈希值对5取模平均分布在5,6,7,8,9分片节点上。开头为上海的范围在00000000~10000000的根据后面的哈希值对2取模平均分布在10,11分片节点上，剩下的开头为上海的，对6取模平均分布在10,11，12,13,14,15上。 \n" +
                "这样，在发现某个开头的分片不够用时，可以随时改变分片规则，同时不影响以前数据的访问"}/>




            </div>
        );
    }
}

export default Mycat2;