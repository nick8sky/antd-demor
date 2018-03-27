import React, { Component } from 'react';
import Markdown  from 'react-markdown';



class Sharding_jdbc5 extends Component {
    render() {


        return (
            <div>

                <Markdown source={"\n" +
                "\n" +
                "参考：http://www.iocoder.cn/Sharding-JDBC/sql-route-1/\n" +
                "\n" +
                "路由\n" +
                "\n" +
                "```\n" +
                "|-sharding-jdbc\n" +
                "    |-sharding-jdbc-core\n" +
                "        |-routing\n" +
                "        \t|-router\n" +
                "        \t\t|-interface SQLRouter\n" +
                "        \t\t|-class ParsingSQLRouter implements SQLRouter\n" +
                "        \t\t|-class DatabaseHintSQLRouter implements SQLRouter\n" +
                "        \t|-strategy\n" +
                "            \t|-interface ShardingAlgorithm\n" +
                "            \t|-interface ShardingStrategy\n" +
                "            |-type\n" +
                "            \t|-interface RoutingEngine\n" +
                "            \t|-standard\n" +
                "            \t\t|-class StandardRoutingEngine implements RoutingEngine\n" +
                "            |-class StatementRoutingEngine\n" +
                "            |-class SQLRouteResult\n" +
                "        |-rule\n" +
                "        \t|-class TableRule\n" +
                "        \t|-class ShardingRule\n" +
                "        \t|-class MasterSlaveRule\n" +
                "        \t|-class DataNode\n" +
                "        \t|-class BindingTableRule\n" +
                "```\n" +
                "\n" +
                "分表分库配置会涉及如下类：\n" +
                "\n" +
                "- TableRule 表规则配置对象\n" +
                "- ShardingRule 分库分表规则配置对象\n" +
                "- ShardingStrategy 分片策略\n" +
                "- ShardingAlgorithm 分片算法\n" +
                "\n" +
                "---\n" +
                "\n" +
                "TableRule\n" +
                "\n" +
                "TableRule，表规则配置对象，内嵌 TableRuleBuilder 对象进行创建。\n" +
                "\n" +
                "```\n" +
                "public final class TableRule {\n" +
                "    private final String logicTable;  //逻辑表\n" +
                "    private final List<DataNode> actualDataNodes;//数据分片的最小单元ds_1.t_order_0\n" +
                "    private final ShardingStrategy databaseShardingStrategy;\n" +
                "    private final ShardingStrategy tableShardingStrategy;\n" +
                "    private final String generateKeyColumn;\n" +
                "    private final KeyGenerator keyGenerator;\n" +
                "    private final String logicIndex;\n" +
                "```\n" +
                "\n" +
                "\n" +
                "\n" +
                "ShardingRule\n" +
                "\n" +
                "ShardingRule，分库分表规则配置对象，内嵌 ShardingRuleBuilder 对象进行创建。\n" +
                "\n" +
                "```\n" +
                "public final class ShardingRule {\n" +
                "    private final Map<String, DataSource> dataSourceMap;\n" +
                "    private final String defaultDataSourceName;\n" +
                "    private final Collection<TableRule> tableRules;\n" +
                "    private final Collection<BindingTableRule> bindingTableRules = new LinkedList<>();\n" +
                "    private final ShardingStrategy defaultDatabaseShardingStrategy;\n" +
                "    private final ShardingStrategy defaultTableShardingStrategy;\n" +
                "    private final KeyGenerator defaultKeyGenerator;\n" +
                "```\n" +
                "\n" +
                "其中 databaseShardingStrategy、tableShardingStrategy、keyGenerator、defaultGenerator 和 TableRule 属性重复，用于当 TableRule 未配置对应属性，使用 ShardingRule 提供的该属性。\n" +
                "\n" +
                "\n" +
                "\n" +
                "BindingTableRule\n" +
                "\n" +
                "指在任何场景下分片规则均一致的主表和子表。\n" +
                "例：订单表和订单项表，均按照订单ID分片，则此两张表互为BindingTable关系。\n" +
                "BindingTable关系的多表关联查询不会出现笛卡尔积关联，关联查询效率将大大提升。\n" +
                "\n" +
                "\n" +
                "\n" +
                "ShardingStrategy\n" +
                "\n" +
                "分片策略,针对分库、分表有两个子类。\n" +
                "\n" +
                "![](https://gitee.com/nick070809/pics/raw/master/shardingjdbc/13.png)\n" +
                "\n" +
                "- DatabaseShardingStrategy，使用**分库**算法进行分片\n" +
                "- TableShardingStrategy，使用**分表**算法进行分片\n" +
                "\n" +
                "\n" +
                "\n" +
                "ShardingAlgorithm\n" +
                "\n" +
                "分片算法。\n" +
                "\n" +
                "- 针对分库、分表有两个子**接口**。\n" +
                "- 针对**分片键**数量分成：无分片键算法、单片键算法、多片键算法。\n" +
                "\n" +
                "![](https://gitee.com/nick070809/pics/raw/master/shardingjdbc/14.png)\n" +
                "\n" +
                "\n" +
                "\n" +
                "---\n" +
                "\n" +
                "SQL 路由大体流程如下：\n" +
                "\n" +
                "![](https://gitee.com/nick070809/pics/raw/master/shardingjdbc/15.png)\n" +
                "\n" +
                "\n" +
                "\n" +
                "SQLRouteResult\n" +
                "\n" +
                "经过 SQL解析、SQL路由后，产生SQL路由结果，即 SQLRouteResult。根据路由结果，生成SQL，执行SQL。\n" +
                "\n" +
                "```\n" +
                "public final class SQLRouteResult {\n" +
                "    private final SQLStatement sqlStatement;\n" +
                "    private final Set<SQLExecutionUnit> executionUnits = new LinkedHashSet<>();\n" +
                "    private final List<Number> generatedKeys = new LinkedList<>();\n" +
                "```\n" +
                "\n" +
                "sqlStatement：SQL语句对象，经过SQL解析的结果对象。\n" +
                "\n" +
                "executionUnits：SQL最小执行单元集合。**SQL执行**时，执行每个单元。\n" +
                "\n" +
                "generatedKeys：插入SQL语句生成的主键编号集合。目前不支持批量插入而使用集合的原因，猜测是为了未来支持批量插入做准备。\n" +
                "\n" +
                "\n" +
                "\n" +
                "SQLRouter，SQL 路由器接口，共有两种实现：\n" +
                "\n" +
                "- DatabaseHintSQLRouter：通过提示且仅路由至数据库的SQL路由器\n" +
                "- ParsingSQLRouter：需要解析的SQL路由器\n" +
                "\n" +
                "它们实现 #parse()进行SQL解析，#route()进行SQL路由。\n" +
                "\n" +
                "\n" +
                "\n" +
                "RoutingEngine，路由引擎接口，共有四种实现：\n" +
                "\n" +
                "- DatabaseHintRoutingEngine：基于数据库提示的路由引擎\n" +
                "- SimpleRoutingEngine：简单路由引擎\n" +
                "- CartesianRoutingEngine：笛卡尔积的库表路由\n" +
                "- ComplexRoutingEngine：混合多库表路由引擎\n" +
                "\n" +
                "![](https://gitee.com/nick070809/pics/raw/master/shardingjdbc/16.png)\n" +
                "\n" +
                "路由结果有两种：\n" +
                "\n" +
                "- RoutingResult：简单路由结果\n" +
                "\n" +
                "- CartesianRoutingResult：笛卡尔积路由结果\n" +
                "\n" +
                "  ​\n" +
                "\n" +
                "SQLRouteResult 和 RoutingResult 有什么区别？\n" +
                "\n" +
                "- SQLRouteResult：**整个SQL路由**返回的路由结果\n" +
                "- RoutingResult：**RoutingEngine**返回路由结果\n" +
                "\n" +
                "![](https://gitee.com/nick070809/pics/raw/master/shardingjdbc/17.png)\n" +
                "\n" +
                "\n" +
                "\n" +
                "---\n" +
                "\n" +
                "DatabaseHintSQLRouter\n" +
                "\n" +
                "DatabaseHintSQLRouter，基于数据库提示的路由引擎。路由器工厂 SQLRouterFactory 创建路由器时，判断到使用数据库提示( Hint ) 时，创建 DatabaseHintSQLRouter。\n" +
                "\n" +
                "```\n" +
                "// DatabaseHintRoutingEngine.java\n" +
                "public static SQLRouter createSQLRouter(final ShardingContext shardingContext) {\n" +
                "   return HintManagerHolder.isDatabaseShardingOnly() ? new DatabaseHintSQLRouter(shardingContext) : new ParsingSQLRouter(shardingContext);\n" +
                "}\n" +
                "```\n" +
                "\n" +
                "DatabaseHintSQLRouter.java:\n" +
                "\n" +
                "```\n" +
                "public final class DatabaseHintSQLRouter implements SQLRouter {\n" +
                "    private final ShardingRule shardingRule;\n" +
                "    private final boolean showSQL;\n" +
                "```\n" +
                "\n" +
                "\n" +
                "\n" +
                "ParsingSQLRouter \n" +
                "\n" +
                "ParsingSQLRouter 在路由时，会根据**表情况**使用 SimpleRoutingEngine 或 CartesianRoutingEngine 进行路由。\n" +
                "\n" +
                "ParsingSQLRouter.java\n" +
                "\n" +
                "```\n" +
                "public final class ParsingSQLRouter implements SQLRouter { \n" +
                "    private final ShardingRule shardingRule;\n" +
                "    private final DatabaseType databaseType;\n" +
                "    private final boolean showSQL;\n" +
                "    private final List<Number> generatedKeys;\n" +
                "    @Override\n" +
                "    public SQLStatement parse()...\n" +
                "    @Override\n" +
                "    public SQLRouteResult route()...\n" +
                "```\n" +
                "\n "}/>



            </div>
        );
    }
}

export default Sharding_jdbc5;