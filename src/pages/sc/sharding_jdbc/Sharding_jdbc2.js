import React, { Component } from 'react';
import Markdown  from 'react-markdown';



class Sharding_jdbc2 extends Component {
    render() {


        return (
            <div>

                <Markdown source={"参考：http://www.iocoder.cn/Sharding-JDBC/sql-parse-1/\n\n" +
                "SQL 解析分成 5 篇相对简短的文章：\n" +
                "\n" +
                "```\n" +
                "1. 词法解析\n" +
                "2. 插入 SQL 解析\n" +
                "3. 查询 SQL 解析\n" +
                "4. 更新 SQL 解析\n" +
                "5. 删除 SQL 解析\n" +
                "```\n" +
                "\n" +
                "SQL 解析引擎在 parsing 包下\n" +
                "\n" +
                "```\n" +
                "|-sharding-jdbc\n" +
                "    |-sharding-jdbc-core\n" +
                "        |-parsing\n" +
                "        \t|-lexer\n" +
                "        \t\t|-token\n" +
                "        \t\t\t|-class Token\n" +
                "        \t\t\t|-interface TokenType\n" +
                "        \t\t\t\t|-enum Literals implements TokenType\n" +
                "        \t\t\t\t|-enum Assist implements TokenType \n" +
                "        \t\t\t\t|-interface Keyword extends TokenType\n" +
                "        \t\t\t\t\t|-enum Symbol implements TokenType, Keyword\n" +
                "        \t\t\t\t\t|-enum DefaultKeyword implements Keyword\n" +
                "        \t\t|-dialect\n" +
                "        \t\t\t|-class MySQLLexer extends Lexer\n" +
                "        \t\t\t|-enum MySQLKeyword implements Keyword\n" +
                "        \t\t\t|-...\n" +
                "        \t\t|-analyzer\n" +
                "        \t\t\t|-class Tokenizer\n" +
                "        \t\t\t|-class Dictionary\n" +
                "        \t\t|-class Lexer\n" +
                "        \t\t|-class LexerEngine\n" +
                "        \t|-parser\n" +
                "        \t\t|-expression\n" +
                "        \t\t|-token\n" +
                "        \t\t|-dialect\n" +
                "        \t\t|-sql\n" +
                "        \t\t|-context\n" +
                "        \t\t|-clause\n" +
                "        \t\t|-class SQLParsingEngine\n" +
                "        \t\t|-class SQLJudgeEngine\n" +
                "```\n" +
                "\n" +
                "如上图所见包含两大组件：\n" +
                "\n" +
                "1. Lexer：词法解析器。\n" +
                "2. Parser：SQL解析器。\n" +
                "\n" +
                "两者都是解析器，区别在于 Lexer 只做词法的解析，不关注上下文，将字符串拆解成 N 个词法。而 Parser 在 Lexer 的基础上，还需要理解 SQL 。打个比方：\n" +
                "\n" +
                "```\n" +
                "SQL ：SELECT * FROM t_user  \n" +
                "Lexer ：[SELECT] [ * ] [FROM] [t_user]  \n" +
                "Parser ：这是一条 [SELECT] ,查询表[t_user] ，返回 [ 所有字段 ] 的 SQL。\n" +
                "```\n" +
                "\n" +
                "\n" +
                "\n" +
                "Lexer 原理：顺序 解析 SQL，将字符串拆解成 N 个词法。\n" +
                "\n" +
                "核心代码如下：\n" +
                "\n" +
                "```\n" +
                "// Lexer.java\n" +
                "public class Lexer {\n" +
                "    /**\n" +
                "     * 输出字符串\n" +
                "     * 比如：SQL\n" +
                "     */\n" +
                "    @Getter\n" +
                "    private final String input;\n" +
                "    /**\n" +
                "     * 词法标记字典\n" +
                "     */\n" +
                "    private final Dictionary dictionary;\n" +
                "    /**\n" +
                "     * 解析到 SQL 的 offset\n" +
                "     */\n" +
                "    private int offset;\n" +
                "    /**\n" +
                "     * 当前 词法标记\n" +
                "     */\n" +
                "    @Getter\n" +
                "    private Token currentToken;\n" +
                "    /**\n" +
                "     * 分析下一个词法标记.\n" +
                "     */\n" +
                "    public final void nextToken() {\n" +
                "        skipIgnoredToken();\n" +
                "        if (isVariableBegin()) {\n" +
                "            currentToken = new Tokenizer(input, dictionary, offset).scanVariable();\n" +
                "        }\n" +
                "    ...\n" +
                "    /**\n" +
                "     * 跳过忽略的词法标记\n" +
                "     * 1. 空格\n" +
                "     * 2. SQL Hint\n" +
                "     * 3. SQL 注释\n" +
                "     */\n" +
                "```\n" +
                "\n" +
                "如有：\n" +
                "\n" +
                "```\n" +
                "SQL ：SELECT i.* FROM t_order o JOIN t_order_item i ON o.order_id=i.order_id WHERE o.user_id=? AND o.order_id=?\n" +
                "```\n" +
                "\n" +
                "| literals     | TokenType类型    | TokenType值 | endPosition |\n" +
                "| ------------ | -------------- | ---------- | ----------- |\n" +
                "| SELECT       | DefaultKeyword | SELECT     | 6           |\n" +
                "| i            | Literals       | IDENTIFIER | 8           |\n" +
                "| .            | Symbol         | DOT        | 9           |\n" +
                "| *            | Symbol         | STAR       | 10          |\n" +
                "| FROM         | DefaultKeyword | FROM       | 15          |\n" +
                "| t_order      | Literals       | IDENTIFIER | 23          |\n" +
                "| o            | Literals       | IDENTIFIER | 25          |\n" +
                "| JOIN         | DefaultKeyword | JOIN       | 30          |\n" +
                "| t_order_item | Literals       | IDENTIFIER | 43          |\n" +
                "| i            | Literals       | IDENTIFIER | 45          |\n" +
                "| ON           | DefaultKeyword | ON         | 48          |\n" +
                "| o            | Literals       | IDENTIFIER | 50          |\n" +
                "| .            | Symbol         | DOT        | 51          |\n" +
                "| order_id     | Literals       | IDENTIFIER | 59          |\n" +
                "| =            | Symbol         | EQ         | 60          |\n" +
                "| i            | Literals       | IDENTIFIER | 61          |\n" +
                "| .            | Symbol         | DOT        | 62          |\n" +
                "| order_id     | Literals       | IDENTIFIER | 70          |\n" +
                "| WHERE        | DefaultKeyword | WHERE      | 76          |\n" +
                "| o            | Literals       | IDENTIFIER | 78          |\n" +
                "| .            | Symbol         | DOT        | 79          |\n" +
                "| user_id      | Literals       | IDENTIFIER | 86          |\n" +
                "| =            | Symbol         | EQ         | 87          |\n" +
                "| ?            | Symbol         | QUESTION   | 88          |\n" +
                "| AND          | DefaultKeyword | AND        | 92          |\n" +
                "| o            | Literals       | IDENTIFIER | 94          |\n" +
                "| .            | Symbol         | DOT        | 95          |\n" +
                "| order_id     | Literals       | IDENTIFIER | 103         |\n" +
                "| =            | Symbol         | EQ         | 104         |\n" +
                "| ?            | Symbol         | QUESTION   | 105         |\n" +
                "|              | Assist         | END        | 105         |\n" +
                "\n" +
                "在Lexer#nextToken() 方法里，使用 #skipIgnoredToken() 方法跳过忽略的 Token，通过 #isXXXX()方法判断好下一个 Token 的类型后，交给 Tokenizer 进行分词返回 Token。此处可以考虑做个优化，不需要每次都 new Tokenizer(...) 出来，一个 Lexer 搭配一个 Tokenizer。\n" +
                "\n" +
                "---\n" +
                "\n" +
                "由于不同数据库遵守 SQL 规范略有不同，所以不同的数据库对应不同的 Lexer,子 Lexer 通过重写方法实现自己独有的 SQL 语法。\n" +
                "\n" +
                "![](https://gitee.com/nick070809/pics/raw/master/shardingjdbc/02.png)\n" +
                "\n" +
                "Token\n" +
                "\n" +
                "```\n" +
                "public final class Token {\n" +
                "    private final TokenType type; //词法标记类型\n" +
                "    private final String literals; //词法字面量\n" +
                "    private final int endPosition; //literals 在 SQL 里的结束位置\n" +
                "}\n" +
                "```\n" +
                "\n" +
                "TokenType\n" +
                "\n" +
                "![](https://gitee.com/nick070809/pics/raw/master/shardingjdbc/03.png)\n" +
                "\n" +
                "```\n" +
                "public interface Keyword extends TokenType {\n" +
                "}\n" +
                "```\n" +
                "\n" +
                "不同数据库有自己独有的_词法关键词_，例如 MySQLKeyword 有熟知的分页 Limit。\n" +
                "\n" +
                "---\n" +
                "\n" +
                "以 MySQL 举个例子，当创建 MySQLLexer 时，会加载 DefaultKeyword 和 MySQLKeyword（ *OracleLexer、PostgreSQLLexer、SQLServerLexer 同 MySQLLexer* ）。核心代码如下：\n" +
                "\n" +
                "```\n" +
                "public final class MySQLLexer extends Lexer {\n" +
                "    private static Dictionary dictionary = new Dictionary(MySQLKeyword.values());   \n" +
                "    public MySQLLexer(final String input) {  super(input, dictionary);}\n" +
                "}\n" +
                "```\n" +
                "\n" +
                "\n" +
                "\n" +
                "Dictionary.java:\n" +
                "\n" +
                "```\n" +
                "public final class Dictionary {\n" +
                "    private void fill(final Keyword... dialectKeywords) {\n" +
                "        for (DefaultKeyword each : DefaultKeyword.values()) {\n" +
                "            tokens.put(each.name(), each);\n" +
                "        }\n" +
                "        for (Keyword each : dialectKeywords) {\n" +
                "            tokens.put(each.toString(), each);\n" +
                "        }\n" +
                "    }\n" +
                "```\n" +
                "\n" +
                "\n" +
                "\n" +
                "Literals 词法字面量标记，用以记录值类型\n" +
                "\n" +
                "```\n" +
                "public enum Literals implements TokenType {\n" +
                "    /**整数,浮点数,十六进制,字符串,词法关键词,变量**/\n" +
                "    INT, FLOAT, HEX, CHARS, IDENTIFIER, VARIABLE\n" +
                "}\n" +
                "```\n" +
                "\n" +
                "如：SELECT * FROM t_user WHERE id = 1.0   (Literals.FLOAT）\n" +
                "\n" +
                "\n" +
                "\n" +
                "Symbol 词法符号标记\n" +
                "\n" +
                "词法符号标记。例如：\"{\", \"}\", \">=\" 等等。\n" +
                "\n" +
                "\n" +
                "\n" +
                "Assist 词法辅助标记，一共分成 2 种：\n" +
                "\n" +
                "- END ：分析结束\n" +
                "- ERROR ：分析错误。"}/>



            </div>
        );
    }
}

export default Sharding_jdbc2;