import React, { Component } from 'react';
import Markdown  from 'react-markdown';



class Mycat6 extends Component {
    render() {


        return (
            <div>
                <Markdown source={"## 路由模块\n" +
                "\n" +
                "路由模块，我们可以先把他当做个黑盒，看下输入和输出都是神马。 \n" +
                "\n" +
                "![](http://img.blog.csdn.net/20160521093229136)\n" +
                "\n" +
                "很明显，输入是个原生的SQL语句，从客户端发过来刚刚被解码的SQL语句。 输出呢？就是个优化，**改写后的SQL语句，以及要发送到的后台分片。** \n" +
                "\n" +
                "这个RouteResultSet就是输出，长什么样子呢？ \n" +
                "\n" +
                "下图是主要涉及到的类： \n" +
                "\n" +
                "![](http://img.blog.csdn.net/20160521101512261)\n" +
                "\n" +
                "- RouteResultSet：\n" +
                "  - sqlType：SQL类型（select？insert？…）\n" +
                "  - nodes: 语句和Datanode对应关系。一条语句可以根据不同节点拆成多条不同语句\n" +
                "  - subTables：分表，1.6后功能，单node多表\n" +
                "  - sqlStatement：经过DruidParser解析后的语句\n" +
                "  - limitStart，limitSize：含有limit的SQL的起始点和长度\n" +
                "  - cacheAble：是否可以缓存（MyCat缓存中会保存SQL(key)->RouteResultSet(value)）\n" +
                "  - primaryKey：为了实现以后完整的主键缓存而预留\n" +
                "  - sqlMerge：带有合并函数的sql语句处理类\n" +
                "  - callStatement：是否为调用存储过程的语句（call）\n" +
                "  - globalTableFlag：操作表是否包含全局表\n" +
                "  - isFinishedRoute：是否路由完成\n" +
                "  - autocommit：是否为自动提交\n" +
                "  - isLoadData：是否是LoadData命令\n" +
                "  - canRunInReadDb：是否能在读节点上运行\n" +
                "  - runOnSlave：是否在从节点上运行\n" +
                "  - procedure：调用存储过程处理类\n" +
                "- RouteResultSetNode：\n" +
                "  - serialVersionUID：全局序列化类版本标识\n" +
                "  - name：数据节点名称\n" +
                "  - statement：实际执行的语句\n" +
                "  - srcStatement：源语句\n" +
                "  - sqlType：sql类型\n" +
                "  - canRunInReadDB：是否可以在读节点运行\n" +
                "  - hasBlanceFlag：是否包含balance属性\n" +
                "  - hintMap：注解类型和注解sql语句的map\n" +
                "  - 其他类似\n" +
                "\n" +
                "对于路由模块，他需要完成的操作就是MyCat的核心功能之一，将前端发送过来的SQL语句路由到后面合适的分片上。那么，我们至少需要从SQL中解析出来这个SQL对应的是那张表，对应的分片规则是什么？有没有筛选条件，根据筛选条件我们是不是能路由到某几个分片上。是不是插入语句，需不需要生成全局唯一ID？等等等等 \n" +
                "**MyCat路由模块，大致上包括SQL语句分类，SQL语义解析，SQL语句改写，全局ID生成。** \n" +
                "\n" +
                "![](http://img.blog.csdn.net/20160521102032185)\n" +
                "\n" +
                "---\n" +
                "\n" +
                "### SQL语句分类\n" +
                "\n" +
                "首先，我们先回顾下，SQL语句通过客户端发送给了MyCat，MyCat在前端连接模块完成包解码，在这之后，对SQL语句进行分类处理（其实就是构建自己一套简单的语法分支）。 \n" +
                "如何分类？其实就是通过语句第一个词先进行第一步分类：\n" +
                "\n" +
                "![](http://img.blog.csdn.net/20160521102334049)\n" +
                "\n" +
                "![](http://img.blog.csdn.net/20160520083354577)\n" +
                "\n" +
                "\n" +
                "\n" +
                "每种语句都有自己对应的Handler，我们这里将用Select语句举例。**第一个词决定语句是什么类型（CURD）的**，第二个词将更细粒度的区分语句，这里是不同的Select。首先我们思考下，不是所有的select语句都需要路由到后面数据库的。比如 select version这样的语句，可以直接回复MyCat的version。还有select LAST_INSERT_ID这样的（MyCat），上次插入的全局ID是在MyCat会缓存的。 \n" +
                "\n" +
                "\n" +
                "\n" +
                "所以，**MyCat对于select的第二个词也做解析**，可以将select语句分为可以直接回复的和必须路由到后面分片得到结果的。 \n" +
                "![](http://img.blog.csdn.net/20160521104650565)\n" +
                "\n" +
                "下一步，ServerConnection类处理SQL语句:\n" +
                "\n" +
                "![](http://img.blog.csdn.net/20160521105735408)\n" +
                "\n" +
                "**ServerConnection.java**\n" +
                "\n" +
                "```\n" +
                "public void execute(String sql, int type) {\n" +
                "    //连接状态检查\n" +
                "    if (this.isClosed()) {\n" +
                "        LOGGER.warn(\"ignore execute ,server connection is closed \" + this);\n" +
                "        return;\n" +
                "    }\n" +
                "    // 事务状态检查\n" +
                "    if (txInterrupted) {\n" +
                "        writeErrMessage(ErrorCode.ER_YES,\n" +
                "            \"Transaction error, need to rollback.\" + txInterrputMsg);\n" +
                "        return;\n" +
                "    }\n" +
                "\n" +
                "    // 检查当前使用的DB\n" +
                "    String db = this.schema;\n" +
                "    if (db == null) {\n" +
                "        db = SchemaUtil.detectDefaultDb(sql, type);\n" +
                "        if (db == null) {\n" +
                "            writeErrMessage(ErrorCode.ERR_BAD_LOGICDB, \"No MyCAT Database selected\");\n" +
                "            return;\n" +
                "        }\n" +
                "    }\n" +
                "\n" +
                "    // 兼容PhpAdmin's, 支持对MySQL元数据的模拟返回\n" +
                "    //// TODO: 2016/5/20 支持更多information_schema特性 \n" +
                "    if (ServerParse.SELECT == type\n" +
                "        && db.equalsIgnoreCase(\"information_schema\") ) {\n" +
                "        MysqlInformationSchemaHandler.handle(sql, this);\n" +
                "        return;\n" +
                "    }\n" +
                "\n" +
                "    if (ServerParse.SELECT == type\n" +
                "        && sql.contains(\"mysql\")\n" +
                "        && sql.contains(\"proc\")) {\n" +
                "        SchemaUtil.SchemaInfo schemaInfo = SchemaUtil.parseSchema(sql);\n" +
                "        if (schemaInfo != null\n" +
                "            && \"mysql\".equalsIgnoreCase(schemaInfo.schema)\n" +
                "            && \"proc\".equalsIgnoreCase(schemaInfo.table)) {\n" +
                "            // 兼容MySQLWorkbench\n" +
                "            MysqlProcHandler.handle(sql, this);\n" +
                "            return;\n" +
                "        }\n" +
                "    }\n" +
                "\n" +
                "    SchemaConfig schema = MycatServer.getInstance().getConfig().getSchemas().get(db);\n" +
                "    routeEndExecuteSQL(sql, type, schema);\n" +
                "}\n" +
                "```\n" +
                "\n" +
                "调用routeEndExecuteSQL方法，会解析出RouteResultSet。这步包含了SQL语义解析，SQL路由，SQL查询优化，SQL语句改写，全局ID生成，最后，将解析出的RouteResultSet交给这个链接对应的session进行处理。 \n" +
                "我们先分析SQL语义解析。\n" +
                "\n" +
                "```\n" +
                "public void routeEndExecuteSQL(String sql, final int type, final SchemaConfig schema) {\n" +
                "    // 路由计算\n" +
                "    RouteResultset rrs = MycatServer.getInstance().getRouterservice()\n" +
                "            .route(MycatServer.getInstance().getConfig().getSystem(),\n" +
                "                schema, type, sql, this.charset, this);\n" +
                "\n" +
                "        // session执行\n" +
                "        session.execute(rrs, rrs.isSelectForUpdate()?ServerParse.UPDATE:type);\n" +
                "}\n" +
                "```\n" +
                "\n" +
                "\n" +
                "\n" +
                "----\n" +
                "\n" +
                "**Routerservice**\n" +
                "\n" +
                "在MyCat初始化时，会新建一个Routerservice:\n" +
                "\n" +
                "```\n" +
                "\t//路由计算初始化\n" +
                "    routerService = new RouteService(cacheService);\n" +
                "```\n" +
                "\n" +
                "Routerservice结构： \n" +
                "\n" +
                "![](http://img.blog.csdn.net/20160520091506223)\n" +
                "\n" +
                "其中sqlRouteCache和tableId2DataNodeCache是通过CacheService（MyCat里面是ehcache做的缓存）传入的对于sql语句缓存和tableid与后台分片对应关系的缓存。\n" +
                "\n" +
                "调用route方法解析出RouteResultSet :\n" +
                "\n" +
                "![](http://img.blog.csdn.net/20160521170730837)\n" +
                "\n" +
                "真正取得RouteResultset如上面的代码RouteService的route方法: \n" +
                "\n" +
                "```\n" +
                "public RouteResultset route(SystemConfig sysConfig, SchemaConfig schema, int sqlType, String origSQL,\n" +
                "            String charset, ServerConnection sc, LayerCachePool cachePool) throws SQLNonTransientException {\n" +
                "\n" +
                "    /**\n" +
                "     * 处理一些路由之前的逻辑\n" +
                "     * 全局序列号，父子表插入\n" +
                "     */\n" +
                "    if ( beforeRouteProcess(schema, sqlType, origSQL, sc) )\n" +
                "        return null;\n" +
                "\n" +
                "    /**\n" +
                "     * SQL 语句拦截\n" +
                "     */\n" +
                "    String stmt = MycatServer.getInstance().getSqlInterceptor().interceptSQL(origSQL, sqlType);\n" +
                "    if (origSQL != stmt && LOGGER.isDebugEnabled()) {\n" +
                "        LOGGER.debug(\"sql intercepted to \" + stmt + \" from \" + origSQL);\n" +
                "    }\n" +
                "\n" +
                "    //对应schema标签checkSQLschema属性，把表示schema的字符去掉\n" +
                "    if (schema.isCheckSQLSchema()) {\n" +
                "        stmt = RouterUtil.removeSchema(stmt, schema.getName());\n" +
                "    }\n" +
                "\n" +
                "    RouteResultset rrs = new RouteResultset(stmt, sqlType);\n" +
                "\n" +
                "    /**\n" +
                "     * 优化debug loaddata输出cache的日志会极大降低性能\n" +
                "     */\n" +
                "    if (LOGGER.isDebugEnabled() && origSQL.startsWith(LoadData.loadDataHint)) {\n" +
                "        rrs.setCacheAble(false);\n" +
                "    }\n" +
                "\n" +
                "       /**\n" +
                "        * rrs携带ServerConnection的autocommit状态用于在sql解析的时候遇到\n" +
                "        * select ... for update的时候动态设定RouteResultsetNode的canRunInReadDB属性\n" +
                "        */\n" +
                "    if (sc != null ) {\n" +
                "        rrs.setAutocommit(sc.isAutocommit());\n" +
                "    }\n" +
                "\n" +
                "    /**\n" +
                "     * DDL 语句的路由\n" +
                "     */\n" +
                "    if (ServerParse.DDL == sqlType) {\n" +
                "        return RouterUtil.routeToDDLNode(rrs, sqlType, stmt, schema);\n" +
                "    }\n" +
                "\n" +
                "    /**\n" +
                "     * 检查是否有分片\n" +
                "     */\n" +
                "    if (schema.isNoSharding() && ServerParse.SHOW != sqlType) {\n" +
                "        rrs = RouterUtil.routeToSingleNode(rrs, schema.getDataNode(), stmt);\n" +
                "    } else {\n" +
                "        RouteResultset returnedSet = routeSystemInfo(schema, sqlType, stmt, rrs);\n" +
                "        if (returnedSet == null) {\n" +
                "            rrs = routeNormalSqlWithAST(schema, stmt, rrs, charset, cachePool);\n" +
                "        }\n" +
                "    }\n" +
                "\n" +
                "    return rrs;\n" +
                "}\n" +
                "```\n" +
                "\n" +
                "![](http://img.blog.csdn.net/20160521173045676)\n" +
                "\n" +
                "---\n" +
                "\n" +
                "DDL语句路由\n" +
                "\n" +
                "![](http://img.blog.csdn.net/20160523080501558)\n" +
                "\n" +
                "---\n" +
                "\n" +
                "查询语句路由\n" +
                "\n" +
                "![](http://img.blog.csdn.net/20160523084646941)\n" +
                "\n" +
                "---\n" +
                "\n" +
                "DML语句路由\n" +
                "\n" +
                "…<>"}/>




            </div>
        );
    }
}

export default Mycat6;









