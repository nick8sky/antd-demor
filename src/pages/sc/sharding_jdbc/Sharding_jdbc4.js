import React, { Component } from 'react';
import Markdown  from 'react-markdown';



class Sharding_jdbc4 extends Component {
    render() {


        return (
            <div>

                <Markdown source={"参考：http://www.iocoder.cn/Sharding-JDBC/sql-parse-3/\n" +
                "\n" +
                "本文主要分享笔者最常用的 MySQL 查询。\n" +
                "\n" +
                "```\n" +
                "|-sharding-jdbc\n" +
                "    |-sharding-jdbc-core\n" +
                "        |-parsing\n" +
                "        \t|-parser\n" +
                "        \t\t|-dialect\n" +
                "        \t\t\t|-mysql\n" +
                "        \t\t\t\t|-sql\n" +
                "        \t\t\t\t\t|-class MySQLSelectParser extends AbstractSelectParser\n" +
                "```\n" +
                "\n" +
                "![](https://gitee.com/nick070809/pics/raw/master/shardingjdbc/09.png)\n" +
                "\n" +
                "查询 SQL 解析主流程如下：\n" +
                "\n" +
                "![](https://gitee.com/nick070809/pics/raw/master/shardingjdbc/10.png)\n" +
                "\n" +
                "---\n" +
                "\n" +
                "SelectStatement\n" +
                "\n" +
                "SelectStatement，查询语句解析结果对象。\n" +
                "\n" +
                "```\n" +
                "public final class SelectStatement extends DQLStatement {\n" +
                "    private boolean containStar; //是否查询所有字段，即 SELECT *\n" +
                "    private int selectListLastPosition; //最后一个查询项下一个 Token 的开始位置\n" +
                "    private int groupByLastPosition;//最后一个分组项下一个 Token 的开始位置\n" +
                "    private final Set<SelectItem> items = new HashSet<>();//查询项\n" +
                "    private final List<OrderItem> groupByItems = new LinkedList<>();//分组项\n" +
                "    private final List<OrderItem> orderByItems = new LinkedList<>();//排序项\n" +
                "    private Limit limit;//分页\n" +
                "    private SelectStatement subQueryStatement;//子查询\n" +
                "```\n" +
                "\n" +
                "![](https://gitee.com/nick070809/pics/raw/master/shardingjdbc/11.png)\n" +
                "\n" +
                "\n" +
                "\n" +
                "AbstractSQLStatement\n" +
                "\n" +
                "增删改查解析结果对象的抽象父类。\n" +
                "\n" +
                "```\n" +
                "public abstract class AbstractSQLStatement implements SQLStatement {\n" +
                "    private final SQLType type; //SQL 类型\n" +
                "    private final Tables tables = new Tables();//表\n" +
                "    private final Conditions conditions = new Conditions(); //过滤条件,只有对路由结果有影响的条件，才添加进数组\n" +
                "    private final List<SQLToken> sqlTokens = new LinkedList<>();//SQL标记对象\n" +
                "}\n" +
                "```\n" +
                "\n" +
                "\n" +
                "\n" +
                "SQLToken\n" +
                "\n" +
                "SQLToken，SQL标记对象接口，SQL 改写时使用到。下面都是它的实现类：\n" +
                "\n" +
                "![](https://gitee.com/nick070809/pics/raw/master/shardingjdbc/12.png)\n" +
                "\n" +
                "```\n" +
                "GeneratedKeyToken\t自增主键标记对象\n" +
                "TableToken\t表标记对象\n" +
                "ItemsToken\t选择项标记对象\n" +
                "OffsetToken\t分页偏移量标记对象\n" +
                "OrderByToken\t排序标记对象\n" +
                "RowCountToken\t分页长度标记对象\n" +
                "```\n" +
                "\n" +
                "\n" +
                "\n" +
                "\n" +
                "\n" +
                "```\n" +
                "@Override\n" +
                "    protected void parseInternal(final SelectStatement selectStatement) {\n" +
                "        parseDistinct(); //解析 DISTINCT、DISTINCTROW、UNION 谓语\n" +
                "        parseSelectOption();\n" +
                "        parseSelectList(selectStatement, getItems()); //将 SQL 查询字段 按照逗号( , )切割成多个选择项\n" +
                "        parseFrom(selectStatement); //解析from\n" +
                "        parseWhere(getShardingRule(), selectStatement, getItems());//解析where\n" +
                "        parseGroupBy(selectStatement);//解析group\n" +
                "        parseHaving();//解析having\n" +
                "        parseOrderBy(selectStatement);//解析order\n" +
                "        parseLimit(selectStatement);//解析limit\n" +
                "        parseSelectRest();\n" +
                "    }\n" +
                "```\n" +
                "\n"}/>



            </div>
        );
    }
}

export default Sharding_jdbc4;