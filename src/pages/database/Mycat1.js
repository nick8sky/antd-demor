import React, { Component } from 'react';
import Markdown  from 'react-markdown';



class Mycat1 extends Component {
    render() {


        return (
            <div>
                <Markdown source={" ## 分库分表\n" +
                "\n" +
                "参考 ：http://blog.csdn.net/zhxdick/article/details/50610287\n" +
                "\n" +
                "举个例子，假设我们原来的应用是为了客户完成下单，快递员接受并更新运单状态，客户可以随时查看运单状态的任务。一开始我们的数据库层架构设计（忽略其他部分，比如缓存、CDN等）可能是这样： \n" +
                "\n" +
                "![Markdown](http://img.blog.csdn.net/20160130140626050)\n" +
                "\n" +
                "但是很快地，我们发现，把所有的数据放在同一个库里面，随着业务的增长，数据量太大，响应时间变得越来越慢。业务需求已经承受不住了。我们首先做了垂直分片，按照业务模块，将数据库拆分成了快递员库，运单库和客户库来管理。 \n" +
                "\n" +
                "![Markdown](http://img.blog.csdn.net/20160130140857799)\n" +
                "\n" +
                "再之后，我们发现运单单表有效数据量量级已经超过了2000W条，为了不影响TPS与QPS。我们需要把运单表做进一步的水平拆分。但是，水平分片后，像分片表关联这种操作，比如order by,group by还有join就不能通过数据库自己本身去完成了，因为每个分片库的数据都不是完整的。而且，跨分片事务（即分布式事务，分布式XA），比较难以实现。 \n" +
                "\n" +
                "拆分规则有很多种，需要根据具体业务决定。比如如果我们整体业务TPS小于单库可承受TPS，只是我们每天要产生2000W记录，而且这些记录要保存一周。我们可以按照日期分片，比如周一的数据保存到库1，之后以此类推。 \n" +
                "\n" +
                "![Markdown](http://img.blog.csdn.net/20160130141809503)\n" +
                "\n" +
                "但是这样做的缺点很明显，同一天的写压力全都打到一个分片上，其他分片处于写空闲状态。即使整体业务TPS小于单库可承受TPS，这样的架构也不利于以后业务增长进行扩展。 \n" +
                "我们还可以按照运单号对某一数字（分片个数）取模，让这些运单平均分布到每个后台分片库上。 \n" +
                "\n" +
                "![Markdown](http://img.blog.csdn.net/20160130142421950)\n" +
                "\n" +
                "这样，我们可以保证同一时间所有的分片都是工作状态，没有资源浪费。但是，未来如果分片不够用了，扩容难还是个问题。 \n" +
                "还有很多其它分片的规则（比如wang-jeekins哈希取模范围，扩容哈希范围，id字段范围等），在之后的MyCat中间件具体使用篇我会详细介绍，并给出一些原创的可行的分片方案。\n" +
                "\n" +
                "---\n" +
                "\n" +
                "谁来分库分表实现这种分库分表可以有多种思路，看上面的架构图，我们可以：\n" +
                "\n" +
                "- 在数据库层做手脚\n" +
                "- 在应用层做手脚\n" +
                "- 在应用层与数据库层添加数据库路由中间件（相当于代理）\n" +
                "\n" +
                "首先，**在数据库层做手脚**，需要数据库产品为开源的，而且修改MySQL和MariaDB之类的数据库需要相当专业的团队以及较高的成本，所以，一般项目初期不会考虑这种方式。\n" +
                "\n" +
                "然后是在**应用层做手脚**，像Ibatis sharding, shark，spring-conf，TDDL等。他们实现分库分表的思路是很相似的：\n" +
                "\n" +
                "![Markdown](http://img.blog.csdn.net/20160130165858975)\n" +
                "\n" +
                "一般这些框架很轻量级，在应用端放一个jar。他们本身不一定都实现了动态配置，但是他们都可以和Disconf之类的动态配置中心结合，实现动态数据源与动态分片规则。首先，应用会访问附近的配置中心，配置中心会告诉这个应用应该去访问哪个数据库以及分片规则是什么。之后，应用会自己去访问数据库，并作分片和合并结果。 \n" +
                "这样做的好处是： \n" +
                "\n" +
                "- 实现分片和结果聚合的压力分摊给了每一个应用 \n" +
                "- 根据应用业务场景开发对应的功能 \n" +
                "- 轻量级，代码少 \n" +
                "- 能最大发挥后台数据库的能力 \n" +
                "  但是同时，也有它的局限性： \n" +
                "- 依赖于额外的配置中心实现动态配置 \n" +
                "- 对应用代码有侵入性 \n" +
                "- 使应用处理变重 \n" +
                "- 应用出问题难以定位是哪里出了问题 \n" +
                "- 将业务开发与后台数据库分库分表管理耦合，难于开发管理\n" +
                "\n" +
                "\n" +
                "\n" +
                "**最后，是代理的方式：** \n" +
                "\n" +
                "![Markdown](http://img.blog.csdn.net/20160130172221662)\n" +
                "\n" +
                "实现思路大概是，实现mysql协议栈，将自己伪装成一个mysql数据库，自己后台管理所有mysql实例。应用无感知，只当后台只是一个mysql实例。这个代理mysql实例，实现分库分表，结果合并等功能。 \n" +
                "这种代理实现的好处在于： \n" +
                "\n" +
                "- 对应用没有侵入性 \n" +
                "- 压力打在中间件上 \n" +
                "- 统一管理后台数据库，能及时定位问题 \n" +
                "  但是，他也有自己的缺陷，首先就是压力打在中间件上的话，可能不能发挥后台数据库最大的能力。由此，中间件需要做负载均衡集群，这要求中间件必须是无状态的。但是，这无疑增加了架构的复杂程度。目前，淘宝的高吞吐量业务还是在用TDDL类似的产品也是这个原因。 \n" +
                "  这两种实现方式还都有共同的难以解决的问题，比如分布式事务这个问题，目前也没有非常完美的方案。还有，他们对于SQL都有限制（比如有的不支持DDL，大部分都不推荐使用大事务等） \n" +
                "\n" +
                "---\n" +
                "\n" +
                "MyCat实现了MySQL的协议栈，可以理解为，Mycat就是MySQL Server，而Mycat后面连接的MySQL Server，就好象是MySQL的存储引擎,如InnoDB，MyISAM等，因此，Mycat本身并不存储数据，数据是在后端的MySQL上存储的，因此数据可靠性以及事务等都是MySQL保证的。\n" +
                "\n" +
                "MyCat功能非常全面，从动态配置，集群配置，结果聚合，读写分离、到分表分库、容灾备份等。而且可以用于多租户应用开发、云平台基础设施、让你的架构具备很强的适应性和灵活性，借助于即将发布的Mycat智能优化模块，系统的数据访问瓶颈和热点一目了然，根据这些统计分析数据，你可以自动或手工调整后端存储，将不同的表映射到不同存储引擎上，而整个应用的代码一行也不用改变。MyCat的框架思路与源代码也有很多可圈可点的地方。 \n" +
                "\n" +
                "虽然MyCat功能很全面，但是某些功能受限于开源产品以及人的思路不同，MyCat的全面并不是那么“全面”。比如，它对于某些MySQL语句的支持并不是那么理想，还有弱XA分布式事务。我们在应用MyCat的时候，需要根据自己的业务，来改造MyCat。 \n" +
                "\n" +
                "---\n" +
                "\n" +
                "业务场景：客户完成下单，快递员接受并更新运单状态，客户可以随时查看运单状态的任务。一票快递可能有多个子母件。同时，我们需要标记每个运单的状态，运单状态的解释和含义保存在运单状态字典表中。 \n" +
                "因此，我们需要建立如下表：\n" +
                "\n" +
                "![Markdown](http://img.blog.csdn.net/20160222203234117)\n" +
                "\n" +
                "我们现在按照业务将数据库垂直拆分成运单库（单表2000tps，6000W数据），快递员库（单表1500tps，100W数据），客户库（单表1500tps，1000W数据记录）；假设每个MySQL数据库单表不能超过2000W数据，单表不能超过1000tps。那么运单库则需要分成3片，客户库需要分成2片，统一由MyCat管理。如下图所示： \n" +
                "\n" +
                "![Markdown](http://img.blog.csdn.net/20160222210416815)\n" +
                "\n" +
                "### 1.逻辑库\n" +
                "\n" +
                "MyCat作为一个中间件，对应用应为无感知的。 \n" +
                "应用访问MyCat，根据之前所述，应用感知到后台只有一个数据库，里面有运单表，快递员表和客户表；这里MyCat的数据库就是逻辑库。访问MyCat，结果应该如下面所示 ：\n" +
                "\n" +
                "![Markdown](http://img.blog.csdn.net/20160201105928338)\n" +
                "\n" +
                "虽然其中的表可能存在于不同的库，但是表面上，他们属于同一个MyCat实例中的同一个逻辑库。所以，虽然上面的架构图显示他们不在同一个数据库，但是在MyCat中，他们在同一个逻辑库。\n" +
                "\n" +
                "### **2.逻辑表**\n" +
                "\n" +
                "在逻辑库下的表就是逻辑表。逻辑表可以分片，也可以不分片。 \n" +
                "orders表明显是要分片的表，但是在MyCat看来，他们虽然分布在不同的分片节点上（分布在不同的MySQL数据库上），但仍视为**是同一个逻辑表，在同一个逻辑库里**。\n" +
                "\n" +
                "#### **2.1分片表**\n" +
                "\n" +
                "分片表，是指那些原有的很大数据的表，需要切分到多个数据库的表，这样，每个分片都有一部分数据，所有分片构成了完整的数据。分片表都有自己的分片规则，根据分片规则确定分片。 \n" +
                "配置里面，如下配置：\n" +
                "\n" +
                "```\n" +
                "<table name=\"orders\" primaryKey=\"id\" dataNode=\"test$1-2\" rule=\"mod-long\"/>\n" +
                "```\n" +
                "\n" +
                "意思就是用mod-long规则根据主键id将运单表orders分割到test1，test2这两个数据库（分片节点）上。 \n" +
                "\n" +
                "\n" +
                "\n" +
                "**请求情况1：**\n" +
                "\n" +
                "```\n" +
                "select * from orders where id = 1;\n" +
                "```\n" +
                "\n" +
                "对于分片表的查询，如果按照分片列查询，则请求只会被发送到一个分片上。 \n" +
                "**请求情况2：**\n" +
                "\n" +
                "```\n" +
                "select * from orders where id < 100 and id > 0;\n" +
                "```\n" +
                "\n" +
                "对于分片表的查询，如果按照分片列范围（在字段类型支持范围的情况下）查询，则请求会根据分片规则计算两个边界值，然后将请求发送到对应结果的分片上，并合并每个分片的结果。 \n" +
                "**请求情况3：**\n" +
                "\n" +
                "```\n" +
                "select * from orders where initialpoint = 'Beijing';\n" +
                "```\n" +
                "\n" +
                "像这种根据非分片列查询的情况，请求会被发送到所有分片上，并合并每个分片的结果。 \n" +
                "**请求情况4：** \n" +
                "请求为更新类型的sql语句，与查询的三种情况相同处理。\n" +
                "\n" +
                "#### **2.2 非分片表**\n" +
                "\n" +
                "一个数据库中并不是所有的表都很大，某些表是可以不用进行切分的，非分片是相对分片表来说的，就是那些不需要进行数据切分的表。 \n" +
                "\n" +
                "如快递员的表\n" +
                "\n" +
                "```\n" +
                "<table name=\"courier\" primaryKey=\"id\" dataNode=\"test3\" />\n" +
                "```\n" +
                "\n" +
                "意思就是快递员表不用分片，保存在test3这个分片节点上。 \n" +
                "对于非分片表的操作和对普通数据库的一样，因为不涉及到分布式数据库。\n" +
                "\n" +
                "#### **2.3 ER表**\n" +
                "\n" +
                "关系型数据库是基于实体关系模型（Entity-Relationship Model)之上，通过其描述了真实世界中事物与关系，Mycat中的ER表即是来源于此。根据这一思路，提出了基于E-R关系的数据分片策略，子表的记录与所关联的父表记录存放在同一个数据分片上，即子表依赖于父表，**通过表分组（Table Group）保证数据Join不会跨库操作。** \n" +
                "**表分组（Table Group）是解决跨分片数据join的一种很好的思路，也是数据切分规划的重要一条规则。** \n" +
                "如下：\n" +
                "\n" +
                "```\n" +
                "<!-- 运单表，对主键id对2取模 -->\n" +
                "<table name=\"orders\" primaryKey=\"id\" dataNode=\"test$1-2\" rule=\"mod-long\">\n" +
                "    <!-- 运单子母件表，运单表的子表，order_id与orders的id列对应 -->\n" +
                "    <childTable name=\"orders_cargo\" joinKey=\"order_id\" parentKey=\"id\">\n" +
                "    </childTable>        \n" +
                "</table>\n" +
                "```\n" +
                "\n" +
                "运单表为分片表，运单表和运单子母件表为一对多关系，可以做成父子表。 \n" +
                "对于子表的sql请求，都是通过joinKey对应到父表对应字段后，按照之前分片表的规则进行处理。\n" +
                "\n" +
                "\n" +
                "\n" +
                "#### **2.4 全局表**\n" +
                "\n" +
                "一个真实的业务系统中，往往存在大量的类似字典表的表，这些表基本上很少变动，字典表具有以下几个特性：\n" +
                "\n" +
                "- 变动不频繁\n" +
                "- 数据量总体变化不大\n" +
                "- 数据规模不大，很少有超过数十万条记录。\n" +
                "\n" +
                "对于这类的表，在分片的情况下，当业务表因为规模而进行分片以后，业务表与这些附属的字典表之间的关联，就成了比较棘手的问题，所以Mycat中通过数据冗余来解决这类表的join，即所有的分片都有一份数据的拷贝，所有将字典表或者符合字典表特性的一些表定义为全局表。 \n" +
                "**数据冗余是解决跨分片数据join的一种很好的思路，也是数据切分规划的另外一条重要规则** \n" +
                "比如：\n" +
                "\n" +
                "```\n" +
                "<!-- 运单状态信息表，公共表，放在和运单表同样的分片上 -->\n" +
                "<table name=\"order_status_interception\" primaryKey=\"id\" type=\"global\" dataNode=\"test$1-2\">\n" +
                "</table>123\n" +
                "```\n" +
                "\n" +
                "运单状态信息字典表，只是注释每种运单状态，就是典型的字典表，与分片表orders为多对一的关系。 \n" +
                "对于全局表，所有的查询请求，只会发送到其中一个全局表分片上执行，所有的更新请求，会在每个全局表分片上执行。\n" +
                "\n" +
                "\n" +
                "\n" +
                "## 分片字段的选择非常重要\n" +
                "\n" +
                "对于分片表的修改和查询，如果是按照分片字段进行查找的话，则请求会被转发到一个分片上。如果不是按照分片字段的话，就会把请求发到每一个分片上进行查找。所以，分片字段的选择非常重要！对于全局表，相当于在每个分片上有一份相同的复制，修改请求会在每一个分片上执行，但是查询只会落到一个分片上。所以，全局表尽量是不会改变的而且是需要和分片表做Join操作的，如果经常改变或者不需要做join，最好还是做成非分片表。\n" +
                "\n" +
                "![Markdown](http://img.blog.csdn.net/20160201145754358)\n" +
                "\n" +
                "像这种简单的从属关系一对n的表，我们处理起来很简单，一般将它们按照需要做join的键设为父子表即可。\n" +
                "\n" +
                "但是下面的场景很麻烦，比如快递员与运单就是多对多的关系，客户对于运单也是多对多的关系（一个收方，一个寄方）。我们既有快递员需要查看自己的所有运单的场景和客户查看自己所有运单的场景。相对的，我们也有查看一个运单涉及到的快递员还有客户的场景。\n" +
                "\n" +
                "![Markdown](http://img.blog.csdn.net/20160222210612380)\n" +
                "\n" +
                "但是相应的，快递员查看自己所有运单的场景就比较慢，因为请求是发送到每一个分片上查找。 \n" +
                "\n" +
                "![Markdown](http://img.blog.csdn.net/20160222210626052)\n" +
                "\n" +
                "\n" +
                "\n" +
                "\n" +
                "\n" +
                "\n" +
                "\n" +
                "customer表（客户表）以及courier表（快递员表）因为与分片表orders之间不做join操作，所以不用作为公共表。 \n" +
                "首先，关系表可以作为公共表，这样的话，涉及到与分片表的join操作没有限制，因为在每个分片，公共表都是完整的。但是，关系表的更新很频繁，我们可能不能忍受每更新一次关系表就跑到每个分片上都更新一次（性能，可靠性考虑）。 \n" +
                "那么作为运单的子表呢？那么查找一个运单涉及到的快递员还有客户就比较简单。因为根据运单号（也就是分片id）查询，MyCat就会根据分片规则给他定位到具体分片，而不是去按分片搜索。 \n" +
                "\n" +
                "\n" +
                "\n" +
                "作为快递员的子表也有同样的缺陷。 \n" +
                "还有一种方法，就是这种关系表同时作为运单和快递员的子表。但是这样，目前需要应用自己去做双写。MyCat目前还没实现这种。当然，我觉得这是一个我们自己可以根据需要改进的地方。**根据关系冗余表关系进行双写**\n" +
                "\n" +
                "另外，究竟取哪种方法，都是从业务出发去考虑的。在这里，如果从快递员出发去查找以及从运单出发去查找的业务压力差不多大的话，那么最好就采用关系表同时作为运单和客户的子表这种方法。然后将快递员和运单的业务独立，每个业务应用都去维护自己的关系表，**同时通过消息队列来保持关系表之间的一致性**。这样也不失为一种方法。"}/>




            </div>
        );
    }
}

export default Mycat1;