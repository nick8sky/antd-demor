import React, { Component } from 'react';
import Markdown  from 'react-markdown';



class Mysql4 extends Component {
    render() {


        return (
            <div>
                <Markdown source={"## Mysql实现主从复制\n" +
                "\n" +
                "主从复制架构图如下：\n" +
                "\n" +
                "![Markdown](https://thumbnail0.baidupcs.com/thumbnail/122679245050b42c67ad361cc6017b93?fid=940423185-250528-265857205592130&time=1520078400&rt=sh&sign=FDTAER-DCb740ccc5511e5e8fedcff06b081203-wWURuNNFATK%2FxuGSNW94%2Fl8AA20%3D&expires=8h&chkv=0&chkbd=0&chkpc=&dp-logid=1434257503505923323&dp-callid=0&size=c710_u400&quality=100&vuk=-&ft=video)\n" +
                "\n" +
                "​\tMySQL之间数据复制的基础是二进制日志文件（binary log file）。一台MySQL数据库一旦启用二进制日志后，其作为master，它的数据库中所有操作都会以“事件”的方式记录在二进制日志中，其他数据库作为slave通过一个I/O线程与主服务器保持通信，并监控master的二进制日志文件的变化，如果发现master二进制日志文件发生变化，则会把变化复制到自己的中继日志中，然后slave的一个SQL线程会把相关的“事件”执行到自己的数据库中，以此实现从数据库和主数据库的一致性，也就实现了主从复制。\n" +
                "\n" +
                "\n" +
                "\n" +
                "​\t主库有数据变更时，会通知备库的io线程，io线程建立一个TCP长连接，接下来主库的binlog dump线程会推送主库的binlog。在进行完一次HTTP操作后保持该TCP连接（HTTP/1.1起默认使用长连接）。只要Server端或Client端不提出关闭请求，或存在其他异常情况，两者间的连接将持续下去。\n" +
                "\n" +
                "\n" +
                "\n" +
                "可能出现的问题：\n" +
                "\n" +
                "1、主库的worker线程在写binlog的时候是并发工作的，而主库的dump线程和从库的IO线程在读和收binlog的过程中是单线程工作的（5.7版本之后支持多线程）。因此高并发的情况下，从库很有可能跟不上主库的进度（异步复制）。\n" +
                "\n" +
                "2、保证从库纯净，不然会出现从库无法执行某个binlog event。\n" +
                "\n" +
                "3、主库的max_allowed_packet需要小于等于备库的max_allowed_packet。\n" +
                "\n" +
                "否则当binlog为ROW格式，本来数据量就大，此时又有大事务在主库执行完之后，容易出现无法传输到备库执行的情况。\n" +
                "\n" +
                "----\n" +
                "\n" +
                "实践：\n" +
                "\n" +
                "安装MySQL(启动MySQL)\n" +
                "\n" +
                "**Linux** 主\n" +
                "\n" +
                "Win从\n" +
                "\n" +
                "vi /etc/my.cnf\n" +
                "\n" +
                "```\n" +
                "[mysqld]\n" +
                "datadir=/var/lib/mysql\n" +
                "socket=/var/lib/mysql/mysql.sock\n" +
                "symbolic-links=0\n" +
                "server-id=1\n" +
                "log-bin=/var/lib/mysql/master-bin\n" +
                "innodb_file_per_table=0\n" +
                "binlog_format=mixed\n" +
                "```\n" +
                "\n" +
                "启动systemctl start mariadb\n" +
                "\n" +
                "登录mysql -u root -p111122\n" +
                "\n" +
                "创建复制账户\n" +
                "\n" +
                "```\n" +
                "GRANT REPLICATION SLAVE,RELOAD,SUPER ON . TO 'backup'@'%' IDENTIFIED BY '123456';\n" +
                "```\n" +
                "\n" +
                "加锁,备份的时候是不让往库中写数据的，所以数据库要加锁，只能读\n" +
                "\n" +
                "```\n" +
                "FLUSH TABLES WITHREADLOCK;\n" +
                "UNLOCK TABLES;\n" +
                "```\n" +
                "\n" +
                "主库log文件及其当前位置\n" +
                "\n" +
                "```\n" +
                "MariaDB [(none)]> SHOW MASTER STATUS;\n" +
                "+-------------------+----------+--------------+------------------+\n" +
                "| File              | Position | Binlog_Do_DB | Binlog_Ignore_DB |\n" +
                "+-------------------+----------+--------------+------------------+\n" +
                "| master-bin.000001 |      416 |              |                  |\n" +
                "+-------------------+----------+--------------+------------------+\n" +
                "```\n" +
                "\n" +
                "**Win**\n" +
                "\n" +
                "D:\\insatlled\\maridb\\data\\my.ini\n" +
                "\n" +
                "```\n" +
                "[mysqld]\n" +
                "datadir=D:/insatlled/maridb/data\n" +
                "server-id=2\n" +
                "relay-log=D:/insatlled/maridb/log_bin/relay\n" +
                "port=3308\n" +
                "innodb_buffer_pool_size=4079M\n" +
                "character-set-server=utf8\n" +
                "[client]\n" +
                "port=3308\n" +
                "plugin-dir=D:/insatlled/maridb/lib/plugin\n" +
                "```\n" +
                "\n" +
                "如果目录不存在，需要创建\n" +
                "\n" +
                "登录客户端，或命令行(root/123456)，执行：\n" +
                "\n" +
                "```\n" +
                "CHANGE MASTER TO MASTER_HOST='192.168.1.101',MASTER_USER='backup', MASTER_PASSWORD='123456', MASTER_LOG_FILE='master-bin.000001', MASTER_LOG_POS= 0 ;\n" +
                "```\n" +
                "\n" +
                "这个命令完成以下几个任务：\n" +
                "\n" +
                "a.设置当前服务器为主服务器(192.168.1.101)的从库\n" +
                "\n" +
                "b.提供当前数据库(从库)从主库复制数据时所需的用户名和密码\n" +
                "\n" +
                "c.指定从库开始复制主库时需要使用的日志文件和文件位置，即上面主库执行SHOW MASTER STATUS;显示结果中的File和Position\n" +
                "\n" +
                "开启主从复制>START SLAVE;\n" +
                "\n" +
                "查看从库状态>show slave status\\G;\n" +
                "\n" +
                "    MariaDB [(none)]> show slave status\\G;\n" +
                "              Slave_IO_State: Connecting to master\n" +
                "                  Master_Host: 192.168.1.101\n" +
                "                  Master_User: backup\n" +
                "                  Master_Port: 3306\n" +
                "                Connect_Retry: 60\n" +
                "              Master_Log_File: master-bin.000001\n" +
                "          Read_Master_Log_Pos: 416\n" +
                "               Relay_Log_File: relay.000001\n" +
                "                Relay_Log_Pos: 4\n" +
                "        Relay_Master_Log_File: master-bin.000001\n" +
                "             Slave_IO_Running: Connecting\n" +
                "            Slave_SQL_Running: Yes\n" +
                "            …\n" +
                "注意：**结果中Slave_IO_Running和Slave_SQL_Running必须为Yes，如果不是，需要根据提示的错误修改。**\n" +
                "\n" +
                "​          如果在同步之前建立好同步机制，从库不需要再建表。否则从库要单独建库表，因为以前的操作事件，bin_log是不知道的。\n" +
                "\n" +
                "\n" +
                "验证\n" +
                "\n" +
                "主库db1:\n" +
                "\n" +
                "insert into travelrecord(id,user_id,traveldate,fee,days)  values(5,@@hostname,20160101,100,10);\n" +
                "\n" +
                "查看从库db1:\n" +
                "\n" +
                "数据已经同步；\n" +
                "\n" +
                "\n" +
                "**bin_log建立之前的数据需要手动复制。**\n" +
                "\n" +
                "\n" +
                "\n" +
                "还可以用到的其他相关参数：\n" +
                "\n" +
                "master开启二进制日志后默认记录所有库所有表的操作，可以通过配置来指定只记录指定的数据库甚至指定的表的操作，具体在mysql配置文件的[mysqld]可添加修改如下选项：\n" +
                "\n" +
                "```\n" +
                "# 不同步哪些数据库  \n" +
                "binlog-ignore-db = mysql  \n" +
                "binlog-ignore-db = test  \n" +
                "binlog-ignore-db = information_schema  \n" +
                "  \n" +
                "# 只同步哪些数据库，除此之外，其他不同步  \n" +
                "binlog-do-db = game \n" +
                "```\n" +
                "\n" +

                "\n"}/>




            </div>
        );
    }
}

export default Mysql4;