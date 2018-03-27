import React, { Component } from 'react';
import Markdown from 'react-markdown';
class Oracle0 extends Component {
    render() {
        return (
            <div>
                <Markdown source={"##为什么oracle一定要使用三层嵌套进行分页查询？\n" +
                "\n" +
                "Oracle的分页查询语句基本上可以按照本文给出的格式来进行套用。\n" +
                "\n" +
                "分页查询格式：\n" +
                "\n" +
                "```\n" +
                "SELECT * FROM \n" +
                "(\n" +
                "SELECT A.*, ROWNUM RN \n" +
                "FROM (SELECT * FROM TABLE_NAME) A \n" +
                "WHERE ROWNUM <= 40\n" +
                ")\n" +
                "WHERE RN >= 21 ORDER BY id desc\n" +
                "```\n" +
                "\n" +
                "其中最内层的查询SELECT * FROM TABLE_NAME表示不进行翻页的原始查询语句。ROWNUM <= 40和RN >= 21控制分页查询的每页的范围。\n" +
                "\n" +
                "上面给出的这个分页查询语句，在大多数情况拥有较高的效率。分页的目的就是控制输出结果集大小，将结果尽快的返回。在上面的分页查询语句中，这种考虑主要体现在WHERE ROWNUM <= 40这句上。\n" +
                "\n" +
                "选择第21到40条记录存在两种方法，一种是上面例子中展示的在查询的第二层通过ROWNUM <= 40来控制最大值，在查询的最外层控制最小值。而另一种方式是去掉查询第二层的WHERE ROWNUM <= 40语句，在查询的最外层控制分页的最小值和最大值。这是，查询语句如下：\n" +
                "\n" +
                "```\n" +
                "SELECT * FROM \n" +
                "(\n" +
                "SELECT A.*, ROWNUM RN \n" +
                "FROM (SELECT * FROM TABLE_NAME) A \n" +
                ")\n" +
                "WHERE RN BETWEEN 21 AND 40 ORDER BY id desc\n" +
                "```\n" +
                "\n" +
                "**对比这两种写法，绝大多数的情况下，第一个查询的效率比第二个高得多。**\n" +
                "\n" +
                "**这是由于CBO优化模式下，Oracle可以将外层的查询条件推到内层查询中，以提高内层查询的执行效率。对于第一个查询语句，第二层的查询条件WHERE ROWNUM <= 40就可以被Oracle推入到内层查询中，这样Oracle查询的结果一旦超过了ROWNUM限制条件，就终止查询将结果返回了。**\n" +
                "\n" +
                "而第二个查询语句，由于查询条件BETWEEN 21 AND 40是存在于查询的第三层，而Oracle无法将第三层的查询条件推到最内层（即使推到最内层也没有意义，因为最内层查询不知道RN代表什么）。因此，对于第二个查询语句，Oracle最内层返回给中间层的是所有满足条件的数据，而中间层返回给最外层的也是所有数据。数据的过滤在最外层完成，显然这个效率要比第一个查询低得多。\n" +
                "\n" +
                "上面分析的查询不仅仅是针对单表的简单查询，对于最内层查询是复杂的多表联合查询或最内层查询包含排序的情况一样有效。\n" +
                "\n" +
                " \n" +
                "\n" +
                "```\n" +
                "select * from(select ta.*,rownum r from (select * from A) ta where rownum <10) where r>5 \n" +
                "```\n" +
                "\n" +
                "--注: 其实两层就可以，不过，**两层嵌套查询不会用到oracle的外层条件内推机制**，效率慢了点\n" +
                "\n" +
                "```\n" +
                "select ta.*,rownum r from (select * from A) ta where  rownum between 2 and 5;\n" +
                "```\n" +
                "\n" +
                " "}/>

            </div>
        );
    }
}

export default Oracle0;