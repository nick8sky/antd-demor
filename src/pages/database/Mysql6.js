import React, { Component } from 'react';
import Markdown  from 'react-markdown';



class Mysql6 extends Component {
    render() {


        return (
            <div>
                <Markdown source={"##MySql主主复制\n" +
                "\n" +
                "参考 https://www.cnblogs.com/phpstudy2015-6/p/6485819.html\n" +
                "\n" +
                "**实现原理**\n" +
                "\n" +
                "​            主主复制即在两台MySQL主机内都可以变更数据，而且另外一台主机也会做出相应的变更。聪明的你也许已经想到该怎么实现了。对，就是将两个主从复制有机合并起来就好了。只不过在配置的时候我们需要注意一些问题，例如，主键重复，server-id不能重复等等。\n" +
                "\n" +
                "```\n" +
                "--192.168.95.11\n" +
                "server-id=11   #任意自然数n，只要保证两台MySQL主机不重复就可以了。\n" +
                "log-bin=mysql-bin   #开启二进制日志\n" +
                "auto_increment_increment=2   #步进值auto_imcrement。一般有n台主MySQL就填n\n" +
                "auto_increment_offset=1   #起始值。一般填第n台主MySQL。此时为第一台主MySQL\n" +
                "binlog-ignore=mysql   #忽略mysql库【我一般都不写】\n" +
                "binlog-ignore=information_schema   #忽略information_schema库\n" +
                "replicate-do-db=aa   #要同步的数据库，默认所有库\n" +
                "\n" +
                "--192.168.95.12\n" +
                "server-id=12\n" +
                "log-bin=mysql-bin\n" +
                "auto_increment_increment=2\n" +
                "auto_increment_offset=2\n" +
                "replicate-do-db=aa\n" +
                "```\n" +
                "\n" +
                "配置好后重启MySQL\n" +
                "\n" +
                "\n" +
                "\n" +
                "**开始构建主主复制**\n" +
                "\n" +
                "因为主主复制是两个主从复制组合一起，所以在对已经配置后的主从关系进行逆向主从配置：\n" +
                "\n" +
                "​           第一步：\n" +
                "\n" +
                "​           在192.168.95.12中创建一个192.168.95.11主机中可以登录的MySQL用户\n" +
                "\n" +
                "​           用户：mysql11\n" +
                "\n" +
                "​           密码：mysql11\n" +
                "\n" +
                "​           mysql>GRANT REPLICATION SLAVE ON *.* TO ‘mysql11’@’192.168.95.11’ IDENTIFIED BY ‘mysql11’;\n" +
                "\n" +
                "​           mysql>FLUSH PRIVILEGES;\n" +
                "\n" +
                "​           第二步：\n" +
                "\n" +
                "​           在192.168.95.12查看二进制日志名和位置\n" +
                "\n" +
                "​\t   mysql>show master status;\n" +
                "\n" +
                "![Markdown](https://thumbnail0.baidupcs.com/thumbnail/aab4722c7a744c7afebbd458a07737f8?fid=940423185-250528-90887130803175&time=1520078400&rt=sh&sign=FDTAER-DCb740ccc5511e5e8fedcff06b081203-x5D5Pa%2F%2FUh2aCjlnq2oi%2BdnyY8s%3D&expires=8h&chkv=0&chkbd=0&chkpc=&dp-logid=1434173726376377297&dp-callid=0&size=c710_u400&quality=100&vuk=-&ft=video)\n" +
                "\n" +
                "​\t 第三步：\n" +
                "\n" +
                "​           告知二进制文件名与位置\n" +
                "\n" +
                "​           在192.168.95.11中执行：\n" +
                "\n" +
                "​           mysql>CHANGE MASTER TO\n" +
                "\n" +
                "​           MASTER_HOST=’192.168.95.12’,\n" +
                "\n" +
                "​           MASTER_USER=’mysql11’,\n" +
                "\n" +
                "​           MASTER_PASSWORD=’mysql11’,\n" +
                "\n" +
                "​           MASTER_LOG_FILE=’mysql-bin.000084’,\n" +
                "\n" +
                "​           MASTER_LOG_POS=107;\n" +
                "\n" +
                "**测试主主复制**\n" +
                "\n" +
                "  mysql>SHOW SLAVE STATUS\\G   #查看主从复制是否配置成功\n" +
                "\n" +
                "192.168.95.11\n" +
                "\n" +
                "![Markdown](https://thumbnail0.baidupcs.com/thumbnail/b5fa6190255db509f44dad2cff2ea5c1?fid=940423185-250528-536922853784495&time=1520078400&rt=sh&sign=FDTAER-DCb740ccc5511e5e8fedcff06b081203-a2V6HjSouLGHCCZjoDd9cD%2Fy4WE%3D&expires=8h&chkv=0&chkbd=0&chkpc=&dp-logid=1434180397843625529&dp-callid=0&size=c710_u400&quality=100&vuk=-&ft=video)\n" +
                "\n" +
                "192.168.95.12\n" +
                "\n" +
                "![Markdown](https://thumbnail0.baidupcs.com/thumbnail/8cb4f8e2a46c4a71291744892165b2d1?fid=940423185-250528-880185099522173&time=1520078400&rt=sh&sign=FDTAER-DCb740ccc5511e5e8fedcff06b081203-1ZdIZeIjYlC91HqMmbEZv4tJhJg%3D&expires=8h&chkv=0&chkbd=0&chkpc=&dp-logid=1434187385225045929&dp-callid=0&size=c710_u400&quality=100&vuk=-&ft=video)\n" +
                "\n" +
                "当看到Slave_IO_Running: YES、Slave_SQL_Running: YES才表明状态正常\n" +
                "\n" +
                "​           测试：\n" +
                "\n" +
                "​           --192.168.95.11\n" +
                "\n" +
                "​           mysql>use aa;\n" +
                "\n" +
                "​           mysql>select*from tab1;\n" +
                "\n" +
                "​           tab1无数据\n" +
                "\n" +
                "​           --192.168.95.12\n" +
                "\n" +
                "​           mysql>use aa;\n" +
                "\n" +
                "​           mysql>select*from tab1;\n" +
                "\n" +
                "​           tab1无数据\n" +
                "\n" +
                "​           --192.168.95.11插入数据\n" +
                "\n" +
                "​           mysql>insert into tab1 (name) value(‘11’),(‘11’),(‘11’);\n" +
                "\n" +
                "​           --192.168.95.12插入数据\n" +
                "\n" +
                "​           mysql>insert into tab1 (name) value(‘22’),(‘22’),(‘22’);\n" +
                "\n" +
                "​           查看数据：\n" +
                "\n" +
                "​           两个主机数据结果一样！\n" +
                "\n" +
                "![Markdown](https://thumbnail0.baidupcs.com/thumbnail/e5a635b0bbf87cd5c5b5b293f785da6c?fid=940423185-250528-225674222827483&time=1520078400&rt=sh&sign=FDTAER-DCb740ccc5511e5e8fedcff06b081203-KPp5vEztJo3MHB2owtQ0T3x1UEw%3D&expires=8h&chkv=0&chkbd=0&chkpc=&dp-logid=1434193700187983721&dp-callid=0&size=c710_u400&quality=100&vuk=-&ft=video)\n" +
                "\n" +
                " 主主复制配置成功！\n" +
                "\n" +
                "**注意事项**\n" +
                "\n" +
                "​     1、主主复制配置文件中auto_increment_increment和auto_increment_offset只能保证主键不重复，却不能保证主键有序。（最好是使用其他主键生成方法）\n" +
                "\n" +
                "​     2、当配置完成Slave_IO_Running、Slave_SQL_Running不全为YES时，show slave status\\G信息中有错误提示，可根据错误提示进行更正。\n" +
                "\n" +
                "​     3、Slave_IO_Running、Slave_SQL_Running不全为YES时，大多数问题都是数据不统一导致。\n" +
                "\n" +
                "​     常见出错点：\n" +
                "\n" +
                "​     1、两台数据库都存在db数据库，而第一台MySQL db中有tab1，第二台MySQL db中没有tab1，那肯定不能成功。\n" +
                "\n" +
                "​     2、已经获取了数据的二进制日志名和位置，又进行了数据操作，导致POS发生变更。在配置CHANGE MASTER时还是用到之前的POS。\n" +
                "\n" +
                "​     3、stop slave后，数据变更，再start slave。出错。\n" +
                "\n" +
                "​     终极更正法：重新执行一遍CHANGE MASTER就好了。"}/>




            </div>
        );
    }
}

export default Mysql6;