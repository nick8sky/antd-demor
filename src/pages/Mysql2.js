import React, { Component } from 'react';

class Mysql2 extends Component {
    render() {
        return (
            <div>

                    <p><a href='http://blog.itpub.net/29018063/viewspace-2086098/'>http://blog.itpub.net/29018063/viewspace-2086098/</a></p>
                    <p>在innodb存储引擎中，有一个叫doublewrite技术模块，是可选的。它通过参数InnoDB_doublewrite的值来控制，如果为0表示不启用，可以通过show status like  &quot;%InnoDB_dblwr%&quot;来查看，doublewrite技术带给innodb存储引擎的是数据页的可靠性，下面对doublewrite技术进行解析，让大家充分理解doublewrite是如何做到保障数据页的可靠性。</p>
                    <p><strong>一、doublewrite应用场景：</strong>
                        我们知道，innodb的数据页一般大小是16KB，MySQL存取数据的最小单位也是页，而操作系统并不能保障一个数据页的原子性，也就是说当写入数据时，有可能在一个页中写入一半时（比如8K）数据库宕机，这种情况称为部分写失效（partial page write），从而导致数据丢失。
                        大家也许会问，难道我不可以根据redo log进行数据恢复吗？答案是肯定的也是否定的，要分为两种情况：1、数据库宕机，物理文件完好无损，是可以通过redo log进行崩溃恢复。2、数据库宕机，正在刷新到磁盘的页发生partial page write，而正好在磁盘上的这个数据页由于宕机发生损坏，这时就无法通过redo log进行数据恢复了，为什么？我们必须要清楚的认识到，redo log里记录的是对页的物理操作！比如一条redo记录&quot;page number  xx，偏移量 800  写记录  &quot;this is abc&quot;，那当页损坏时，这条redo记录还有意义吗？于是在这种特殊情况下，doublewrite就派上用场啦！</p>
                    <p>&nbsp;</p>
                    <p>doublewrite-&gt;写doublewrite buffer 和写ibdata 。</p>
                    <p><strong>二、doublewrite体系结构及工作流程:</strong>
                        doublewrite由两部分组成，一部分为内存中的doublewrite buffer，其大小为2MB，另一部分是磁盘上共享表空间（ibdata x）中连续的128个页，即2个区（extent），大小也是2M。doublewrite工作流程如下：
                        1、当一系列机制（main函数触发、checkpoint等）触发数据缓冲池中的脏页进行刷新时，并不直接写磁盘，而是会通过memcpy函数将脏页先复制到内存中的doublewrite buffer,之后通过doublewrite buffer再分两次、每次1MB顺序写入物理磁盘ibdata上。
                        2、马上调用fsync函数，同步脏页进磁盘
                        由于在这个过程中，doublewrite页的存储时连续的，因此写入磁盘为顺序写，性能很高；完成doublewrite后，再将脏页写入实际的各个表空间文件，这时写入就是离散的了。各模块协作情况如下图（第一步应为脏页产生的redo记录logbuffer，然后logbuffer写入redo log file，为简化次要步骤直接连线表示）：</p>
                    <img src='../img/29018063_1461307567XzXX.png' alt='v2-201356' width="600" height="540" />
                <p>&nbsp;</p>
                <p>查看doublewrite工作情况，可以执行命令：
                    mysql&gt; show global status like &#39;innodb_dblwr%&#39;\G
                    <strong>**</strong><strong>**</strong><strong>**</strong><strong>**</strong><strong>* 1. row **</strong><strong>**</strong><strong>**</strong><strong>**</strong><strong>*</strong>
                    Variable_name: Innodb_dblwr_pages_written
                    Value: 61932183
                    <strong>**</strong><strong>**</strong><strong>**</strong><strong>**</strong><strong>* 2. row **</strong><strong>**</strong><strong>**</strong><strong>**</strong><strong>*</strong>
                    Variable_name: Innodb_dblwr_writes
                    Value: 15237891
                    2 rows in set (0.00 sec)
                    以上数据显示，doublewrite一共写了 61932183个页，一共写了15237891次，从这组数据我们可以分析，之前讲过在开启doublewrite后，每次脏页刷新必须要先写doublewrite，而doublewrite存在于磁盘上的是两个连续的区，每个区由连续的页组成，一般情况下一个区最多有64个页，所以一次IO写入应该可以最多写64个页。而根据以上我这个系统Innodb_dblwr_pages_written与Innodb_dblwr_writes的比例来看，大概在4左右，远远还没到64，所以从这个角度也可以看出，系统写入压力并不高。</p>
                <p><strong>三、崩溃恢复  <br/></strong>
                    如果操作系统在将页写入磁盘的过程中发生崩溃，如上图，在恢复过程中，innodb存储引擎可以从共享表空间的doublewrite中找到该页的一个最近的副本，将其复制到表空间文件，再应用redo log，就完成了恢复过程。因为有副本所以也不担心表空间中数据页是否损坏。</p>
                <p><strong>四、建议</strong>
                    innodb存储引擎引入double write技术后，参数skip_innodb_doublewrite虽然可以禁止使用doublewrite功能，但还是强烈建议大家使用doublewrite。避免部分写失效问题，当然，有些文件系统本身就提供了部分写失效防范机制，如ZFS文件系统，在这种情况下，就可以不开启doublewrite了</p>




            </div>
        );
    }
}

export default Mysql2;