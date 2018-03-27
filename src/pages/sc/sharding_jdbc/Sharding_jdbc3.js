import React, { Component } from 'react';
import Markdown  from 'react-markdown';



class Sharding_jdbc3 extends Component {
    render() {


        return (
            <div>

                <Markdown source={"参考：http://www.iocoder.cn/Sharding-JDBC/sql-parse-2/\n" +
                "\n" +
                "区别于 Lexer，Parser **理解SQL**：\n" +
                "\n" +
                "- 提炼分片上下文\n" +
                "- **标记需要SQL改写的部分**\n" +
                "\n" +
                "Parser 有二个组件：\n" +
                "\n" +
                "- SQLParsingEngine ：SQL 解析引擎\n" +
                "- SQLParser ：SQL 解析器\n" +
                "\n" +
                "SQLParsingEngine 调用  SQLParser 解析 SQL 表达式；SQLParser 调用 Lexer 解析 SQL 词法。\n" +
                "\n" +
                "![](https://gitee.com/nick070809/pics/raw/master/shardingjdbc/04.png)\n" +
                "\n" +
                "```\n" +
                "public final class SQLParsingEngine {\n" +
                "    public SQLStatement parse() {\n" +
                "    ...\n" +
                "\tSQLParser sqlParser = SQLParserFactory.newInstance(dbType, lexerEngine.getCurrentToken().getType(), shardingRule, lexerEngine)\n" +
                "\treturn  sqlParser.parse();\n" +
                "    }\n" +
                "}\n" +
                "```\n" +
                "\n" +
                "![](https://gitee.com/nick070809/pics/raw/master/shardingjdbc/05.png)\n" +
                "\n" +
                "AbstractSelectParser:\n" +
                "\n" +
                "```\n" +
                " @Override\n" +
                "    public final SelectStatement parse() {\n" +
                "        SelectStatement result = parseInternal();\n" +
                "        if (result.containsSubQuery()) {\n" +
                "            result = result.mergeSubQueryStatement();\n" +
                "        }\n" +
                "        // TODO move to rewrite\n" +
                "        appendDerivedColumns(result);\n" +
                "        appendDerivedOrderBy(result);\n" +
                "        return result;\n" +
                "    }\n" +
                "    \n" +
                "    private SelectStatement parseInternal() {\n" +
                "        SelectStatement result = new SelectStatement();\n" +
                "        lexerEngine.nextToken();\n" +
                "        parseInternal(result);\n" +
                "        return result;\n" +
                "    }\n" +
                "```\n" +
                "\n" +
                "![](https://gitee.com/nick070809/pics/raw/master/shardingjdbc/06.png)\n" +
                "\n" +
                "![](https://gitee.com/nick070809/pics/raw/master/shardingjdbc/07.png)\n" +
                "\n" +
                "SQLParser 不考虑 SQL 是 SELECT / INSERT / UPDATE / DELETE ，它考虑的是，**给我的是 WHERE 处解析查询条件，或是 INSERT INTO 解析单表 等**，提供 SELECT / INSERT / UPDATE / DELETE 需要的 SQL 块公用解析。\n" +
                "\n" +
                "\n" +
                "\n" +
                "----\n" +
                "\n" +
                "SQLStatement\n" +
                "\n" +
                "不同 SQL 解析后，返回对应的 SQL 结果,即 Statement。大体结构如下：\n" +
                "\n" +
                "![](https://gitee.com/nick070809/pics/raw/master/shardingjdbc/08.png)\n" +
                "\n" +
                "```\n" +
                "public interface SQLStatement {\n" +
                "    SQLType getType();\n" +
                "    Tables getTables();\n" +
                "    Conditions getConditions();\n" +
                "    List<SQLToken> getSqlTokens();\n" +
                "    int getParametersIndex();\n" +
                "    void setParametersIndex(int parametersIndex);\n" +
                "    int increaseParametersIndex();\n" +
                "}\n" +
                "```\n" +
                "\n"}/>



            </div>
        );
    }
}

export default Sharding_jdbc3;