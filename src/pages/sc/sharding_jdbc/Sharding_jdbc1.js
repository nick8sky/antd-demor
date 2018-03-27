import React, { Component } from 'react';
import Markdown  from 'react-markdown';



class Sharding_jdbc1 extends Component {
    render() {


        return (
            <div>

                <Markdown source={"无论使用哪种架构，核心逻辑均极为相似，除了协议实现层不同（JDBC或数据库协议），都会分为分片规则配置、SQL解析、SQL改写、SQL路由、SQL执行以及结果归并等模块。\n" +
                "\n" +
                "最新的2.0版本的Sharding-Jdbc版本，模块架构：\n" +
                "\n" +
                "```\n" +
                "|-sharding-jdbc\n" +
                "    |-sharding-jdbc-core\n" +
                "        |-api\n" +
                "        |-constant\n" +
                "        |-exception\n" +
                "        |-executor\n" +
                "        |-hint\n" +
                "        |-jdbc\n" +
                "        |-keygen\n" +
                "        |-merger\n" +
                "        |-parsing\n" +
                "        |-rewrite\n" +
                "        |-routing\n" +
                "        |-rule\n" +
                "        |-util\n" +
                "        |-yaml\n" +
                "    |-sharding-jdbc-orchestration\n" +
                "    |-sharding-jdbc-orchestration-spring\n" +
                "    |-sharding-jdbc-spring\n" +
                "    |-sharding-jdbc-transaction-parent\n" +
                "```\n" +
                "\n" +
                "其中各个模块的内容如下：\n" +
                "\n" +
                "- sharding-jdbc-core：核心模块，主要包含的是一个分库分表、读写分离的中间件的核心内容，包括规则配置、sql解析、sql改写、sql路由、sql执行、结果集合并等。\n" +
                "  - rule：规则配置\n" +
                "  - parsing：sql解析\n" +
                "  - rewrite：sql改写\n" +
                "  - routing：sql路由\n" +
                "  - executor：sql执行\n" +
                "  - merger：结果集合并\n" +
                "  - jdbc：jdbc改写，项目的核心\n" +
                "  - keygen：分布式id生成\n" +
                "- sharding-jdbc-orchestration：动态配置，配置中心的一些操作内容\n" +
                "- sharding-jdbc-orchestration-spring：配置中心的spring配置，包括一些spring和spring-boot配置文件的解析\n" +
                "- sharding-jdbc-spring：sharding-jdbc的spring和spring-boot配置内容解析器\n" +
                "- sharding-jdbc-transaction-parent：柔性事务相关内容\n" +
                "\n" +
                "\n" +
                "\n" +
                "----\n" +
                "\n" +
                "**Sharding-Jdbc中的算法**\n" +
                "\n" +
                "```\n" +
                "|-sharding-jdbc\n" +
                "    |-sharding-jdbc-core\n" +
                "        |-api\n" +
                "        \t|-algorithm\n" +
                "        \t\t|-masterslave  //主从\n" +
                "        \t\t\t|-interface MasterSlaveLoadBalanceAlgorithm\n" +
                "        \t\t\t\t|-class RandomMasterSlaveLoadBalanceAlgorithm //随机算法\n" +
                "        \t\t\t\t|-class RoundRobinMasterSlaveLoadBalanceAlgorithm //轮询算法\n" +
                "        \t\t|-sharding     //分库分表\n" +
                "        \t\t\t|-class ListShardingValue   //列表值\n" +
                "        \t\t\t|-class PreciseShardingValue  //精确值\n" +
                "        \t\t\t|-class RangeShardingValue  //范围值\n" +
                "```\n" +
                "\n" +
                "读写分离（主从配置）\n" +
                "\n" +
                "这块的代码主要在core模块中的api/algorithm/masterslave下面，这块的算法的主要目的，其实是在读的时候，如何选择从数据库。按照常规的理解，可以有以下几种（参考dubbo）：\n" +
                "\n" +
                "- 随机算法\n" +
                "- 轮询\n" +
                "- 最小活跃\n" +
                "- 一致性hash\n" +
                "\n" +
                "目前在sharding-jdbc中，实现了前两种，随机算法和轮询。\n" +
                "\n" +
                "\n" +
                "\n" +
                "二、分库分表\n" +
                "\n" +
                "分库分表的算法目前支持的内容包括：\n" +
                "\n" +
                "- 精确分库分表PreciseShardingValue\n" +
                "- 按照范围分库分表RangeShardingValue\n" +
                "- 按照列表分库分表ListShardingValue\n" +
                "\n" +
                "这块主要是定义了一些接口，具体的实现还是要看自己来实现。我们来看下example中的一些已经实现的算法：\n" +
                "\n" +
                "```\n" +
                "public final class PreciseModuloDatabaseShardingAlgorithm implements PreciseShardingAlgorithm<Integer> {\n" +
                "    @Override\n" +
                "    public String doSharding(final Collection<String> availableTargetNames, final PreciseShardingValue<Integer> shardingValue) {\n" +
                "        for (String each : availableTargetNames) {\n" +
                "            if (each.endsWith(shardingValue.getValue() % 2 + \"\")) {\n" +
                "                return each;\n" +
                "            }\n" +
                "        }\n" +
                "        throw new UnsupportedOperationException();\n" +
                "    }\n" +
                "}\n" +
                "```\n" +
                "\n" +
                "这块是实现了一个精准分片的算法，doSharding方法里面包含两个参数availableTargetNames和shardingValue。shardingValue其实就是分片项，也就是比如order_id、user_id等等字段值，而availableTargetNames就是实际数据库**表节点**。这边遍历的也是实际节点，当分片项（或分片字段）满足一定的条件时，返回实际数据库表节点，用于组装sql。\n" +
                "\n"}/>



            </div>
        );
    }
}

export default Sharding_jdbc1;