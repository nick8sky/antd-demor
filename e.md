

```
|-sharding-jdbc
    |-sharding-jdbc-core
        |-rewrite
        	|-class SQLBuilder
        	|-class SQLRewriteEngine
        	|-placeholder
```

SQLRewriteEngine 基于 SQLToken 实现 SQL改写。SQL解析器在 SQL解析过程中，很重要的一个目的是标记需要SQL改写的部分，也就是 SQLToken。

```
public final class SQLRewriteEngine {
    private final ShardingRule shardingRule;
    private final String originalSQL;
    private final DatabaseType databaseType;
    private final List<SQLToken> sqlTokens = new LinkedList<>();
    private final SQLStatement sqlStatement;
```

![](https://gitee.com/nick070809/pics/raw/master/shardingjdbc/18.png)

**各 SQLToken 生成条件如下** 

1. GeneratedKeyToken 自增主键标记对象

   - 插入SQL自增列不存在：`INSERT INTO t_order(nickname) VALUES ...` 中没有自增列 `order_id`

2. TableToken 表标记对象

   - 查询列的表别名：`SELECT o.order_id` 的 `o`
   - 查询的表名：`SELECT * FROM t_order` 的 `t_order`

3. ItemsToken 选择项标记对象

   - AVG查询列：SELECT AVG(price) FROM t_order 的 AVG(price)
   - ORDER BY 字段不在查询列：SELECT order_id FROM t_order ORDER BY create_time 的 create_time
   - GROUP BY 字段不在查询列：SELECT COUNT(order_id) FROM t_order GROUP BY user_id 的 user_id
   - 自增主键未在插入列中：INSERT INTO t_order(nickname) VALUES ... 中没有自增列 order_id

4. OffsetToken 分页偏移量标记对象

   - 分页有偏移量，但不是占位符 ?

5. RowCountToken 分页长度标记对象

   - 分页有长度，但不是占位符 ?

6. OrderByToken 排序标记对象

   - 有 GROUP BY 条件，无 ORDER BY 条件：SELECT COUNT(*) FROM t_order GROUP BY order_id 的 order_id

     ​

---

SQL 改写

SQLRewriteEngine#rewrite() 实现了 SQL改写 功能。

```
/*
* SQL改写.
*/
public SQLBuilder rewrite(final boolean isRewriteLimit) {
   SQLBuilder result = new SQLBuilder();
   // 排序SQLToken，按照 beginPosition 递增
   sortByBeginPosition();
   for (SQLToken each : sqlTokens) {
       // 拼接每个SQLToken
       if (each instanceof TableToken) {
           appendTableToken(result, (TableToken) each, count, sqlTokens);
       } else if (each instanceof ItemsToken) {
           appendItemsToken(result, (ItemsToken) each, count, sqlTokens);
       } else if (each instanceof RowCountToken) {
           appendLimitRowCount(result, (RowCountToken) each, count, sqlTokens, isRewriteLimit);
       } else if (each instanceof OffsetToken) {
           appendLimitOffsetToken(result, (OffsetToken) each, count, sqlTokens, isRewriteLimit);
       } else if (each instanceof OrderByToken) {
           appendOrderByToken(result);
       }
       count++;
   }
   return result;
}
```

例如：

![](https://gitee.com/nick070809/pics/raw/master/shardingjdbc/19.png) 

SQLBuilder，SQL构建器:

```
public final class SQLBuilder {
     //段集合
    private final List<Object> segments;
     //当前段
    private StringBuilder currentSegment;
    public SQLBuilder() {
        segments = new LinkedList<>();
        currentSegment = new StringBuilder();
        segments.add(currentSegment);
    }
     //追加字面量.
    public void appendLiterals(final String literals) {
        currentSegment.append(literals);
    }
    
     //追加表占位符.
    public void appendTable(final String tableName) {
        // 添加 TableToken
        segments.add(new TableToken(tableName));
        // 新建当前段
        currentSegment = new StringBuilder();
        segments.add(currentSegment);
    }
    
    public String toSQL(final Map<String, String> tableTokens) {
        // ... 省略代码，【SQL生成】处分享
    }
    
    @RequiredArgsConstructor
    private class TableToken {
        private final String tableName; //表名
    }
}
```

