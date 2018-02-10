import React, { Component } from 'react';

class Mysql0 extends Component {
    render() {
        return (
            <div>
                <h3>Database &amp; Instance &amp; Schema</h3>
                <p>在mysql中Database可以是frm,myd,ibd,myi结尾的文件，或者只存在内存中 ； instance由一系列管理database文件的内存结构组成。在集群环境下一个instance可以管理多个database。instance也为程序提供操作接口。</p>
                <p>在oracle中的schema等同mysql的database。instance就是访问schema的操作接口。</p>
                <p>mysql是一个单进程多线程架构的数据库，一般包括：</p>
                <p>连接池</p>
                <p>DML.DDL解析组件</p>
                <p>查询分析器</p>
                <p>优化器</p>
                <p>缓存组件</p>
                <p>引擎组件(mysql独有，mysql核心，可以通过修改源码定制)</p>
                <p>文件</p>
                <h3>InnoDB的特点</h3>
                <p>行锁设计</p>
                <p>支持外键</p>
                <p>非锁读</p>
                <p>单表分配独立的idb文件</p>
                <p>多版本并发控制MVVC来获得高并发性</p>
                <p>4种隔离级别</p>
                <p>先缓存后写文件</p>
                <p>预读</p>
                <p>HA</p>
                <p>哈希索引</p>
                <p>默认主键</p>
                <p>注意在mysql5.5.8之前使用的MyISAM引擎作为默认引擎，在开发生产环境要注意mysql的版本。</p>
                <p> </p>
                <h3>ACID</h3>
                <p>ACID，指数据库事务正确执行的四个基本要素的缩写。包含：原子性（Atomicity）、一致性（Consistency）、隔离性（Isolation）、持久性（Durability）。一个支持事务（Transaction）的数据库，必须要具有这四种特性，否则在事务过程（Transaction processing）当中无法保证数据的正确性，交易过程极可能达不到交易方的要求。</p>
                <p>数据库事务的隔离级别有4种，由低到高分别为Read uncommitted 、Read committed 、Repeatable read 、Serializable 。而且，在事务的并发操作中可能会出现脏读，不可重复读，幻读</p>
                <p>Repeatable read 重复读，就是在开始读取数据（事务开启）时，不再允许修改操作</p>
                <h4>Spring事务传播</h4>
                <p>1、Propagation.REQUIRED 方法被调用时自动开启事务，在事务范围内使用则使用同一个事务，否则开启新事务。 </p>
                <p>2、Propagation.REQUIRES_NEW 无论何时自身都会开启事务</p>
                <p>3、Propagation.SUPPORTS 自身不会开启事务，在事务范围内则使用相同事务，否则不使用事务</p>
                <p>4、Propagation.NOT_SUPPORTED 自身不会开启事务，在事务范围内使用挂起事务，运行完毕恢复事务</p>
                <p>5、Propagation.MANDATORY 自身不开启事务，必须在事务环境使用否则报错</p>
                <p>6、Propagation.NEVER 自身不会开启事务，在事务范围使用抛出异常</p>
                <p>7、Propagation.NESTED 如果一个活动的事务存在，则运行在一个嵌套的事务中. 如果没有活动事务, 则按TransactionDefinition.PROPAGATION_REQUIRED 属性执行。需要JDBC3.0以上支持。</p>
                <h3>InnoDB体系架构</h3>
                <p>从InnoDB1.1开始，支持多个缓存池实例，将每页根据hash分布到每个实例中，来提高并发能力。</p>
                <h4>LRUList/FreeList/FlushList</h4>
                <p>Lastest recent used最近最少使用，使用最频繁的页放在链表的最前端，使用最少的放在最尾部。当缓存池不够使用时，先释放尾部部分。对于新读取的页不会直接放在LRU的首部，而是放在大约5/8处，即表示不能确定该页会使用足够频繁，如果直接放在首部，以前精心整理的访问最多要遍历一遍后才能被获取到，影响查询效率。5/8之后的列表称为old列表，之前的列表称为new列表。</p>
                <h4>重做日志缓存redo log buffer</h4>
                <p>InnoDB首先将重做日志信息放在这个缓存(8M)中，然后按照一定的频率(1s)刷入重做日志文件中,满足以下条件也会进行输入重做日志：</p>
                <p>1.Master Thread将重做缓存刷入文件</p>
                <p>2.事务提交时会将重做缓存刷入文件</p>
                <p>3.重做缓存剩余空间小于1/2</p>
                <p> </p>
                <h4>undo[撤销日志]，redo[重做日志]</h4>
                <p>Undo日志记录某数据被修改前的值，可以用来在事务失败时进行rollback；Redo日志记录某数据块被修改后的值，可以用来恢复 未写入data file 但事务已经执行成功的数据。</p>
                <p>例如某一事务的事务序号为T1，其对数据X进行修改，设X的原值是5，修改后的值为15;
                    那么Undo日志为&lt;T1, X, 5&gt;，Redo日志为&lt;T1, X, 15&gt;。</p>

                <p>也有把undo和redo结合起来的做法，叫做Undo/Redo日志，在这个例子中Undo/Redo日志为。</p>
                <p>当用户生成一个数据库事务时，undo log buffer会记录被修改的数据的原始值，redo会记录被修改的数据的更新后的值。</p>
                <p>redo日志应首先持久化在磁盘上，然后写入db buffer，（此时，内存中的数据和data file对应的数据不同，我们认为内存中的数据是脏数据），db buffer再选择合适的时机将数据持久化到data file中。这种顺序可以保证在需要故障恢复时恢复最后的修改操作。先持久化日志的策略叫做Write Ahead Log，即预写日志。</p>
                <p>在很多系统中，undo日志并非存到日志文件中，而是存放在数据库内部的一个特殊段中。本文中就把这些存储行为都泛化为undo日志存储到undo log file中。</p>
                <p>对于某事务T，在log file的记录中必须开始于事务开始标记（比如“start T”），结束于事务结束标记（比如“end T”、”commit T”）。在系统恢复时，如果在log file中某个事务没有事务结束标记，那么需要对这个事务进行undo操作，如果有事务结束标记，则redo。</p>
                <p>在db buffer中的内容写入磁盘数据库文件之前，应当把log buffer的内容写入磁盘日志文件。</p>
                <p>有一个问题，redo log buffer和undo log buffer存储的事务数量是多少，是按照什么规则将日志写入log file？如果存储的事务数量都是1个，也就意味着是将日志立即刷入磁盘，那么数据的一致性很好保证。</p>
                <p>在执行事T时，突然断电，如果未对磁盘上的redo log file发生追加操作，可以把这个事务T看做未成功。如果redo log file被修改，则认为事务是成功了，重启数据库使用redo log恢复数据到db buffer和 data file即可。</p>
                <p>如果存储多个的话，其实也挺好解释的。就是db buffer写入data file之前，先把日志写入log file。这种方式可以减少磁盘IO，增加吞吐量。</p>
                <p> </p>
                <h4>Double write</h4>
                <p>数据库系统实现日志主要有三种格式，逻辑日志(logical logging)，物理日志(physical logging)，物理逻辑日志(physiological logging)，而对于redo日志，则主要采用物理日志和物理逻辑日志两类。</p>
                <p>doublewrite是为了解决页的partial write问题，即当一个页回刷回磁盘时，可能由于只回刷了一小部分，宕机恢复时可能出现的恢复失败的情况。</p>
                <p>或许有DBA会问题，不是可以通过重做日志进行恢复吗？但是，问题就是在于InnoDB存储引擎的重做日志，因为其格式是physiological logging，而不是physical logging。</p>
                <p>physical logging是指在日志中保存一个页中发生改变的字节，也有称这种方式为old value-new value logging。通常来说，其数据结构可参考下面的实现：</p>
                <p>physical logging的好处是其记录的是页中发生变化的字节。这样重复多次执行该日志不会导致数据发生不一致的问题。也就是该日志是幂等的，没有partial write的问题。物理日志看起来很优雅，但其最大的问题是产生的日志量相对较大。例如对一个16K大小的页进行重新整理（reorganize），那么这时产生的日志就需要16K。此外，B+树分裂这类涉及到多个页修改的操作，产生的日志同样也会非常大。</p>
                <p> </p>
                <p>ogical logging记录的是对于表的操作，这非常类似与MySQL数据库上层产生的二进制日志。由于是逻辑的，因此其日志的尺寸非常小。例如对于插入操作，其仅需类似如下的格式：</p>

                <p>&lt;insert op, table name, record value&gt; </p>

                <p>logical logging对于UNDO操作仅需对记录的日志操作进行逆操作。例如INSERT对应DELETE操作，DELETE对应INSERT操作。然而该日志的缺点同样非常明显，那就是在恢复时其可能无法保证数据的一致性。例如当对表进行插入操作时，表上还有其他辅助索引。当操作未全部完成时系统发生了宕机，那么要回滚上述操作可能是困难。因为，这时数据可能处在一个未知的状态。无法保证UNDO之后数据的一致性。</p>
                <p> </p>
                <p>物理逻辑日志结合上述两种日志的优点。其设计思想是：physical-to-a-page, logical-within-a-page。即根据物理页进行日志记录，根据不同的逻辑操作类型进行日志的写入。在InnoDB存储引擎中，用户可以发现多种重做日志类型的定义。到MySQL 5.6版本时，共有51种不同类型的重做日志。</p>
                <figure><table>
                    <thead>
                    <tr><th>redo_log_type</th><th>space</th><th>page_no</th><th>redo_body</th></tr></thead>
                    <tbody><tr><td> </td><td> </td><td> </td><td> </td></tr></tbody>
                </table></figure>
                <p>通用的头部格式由一下3部分组成：redo_log_type 重做日志类型，space: 表空间ID，page_no 页的偏移量，之后是redo log body ，根据重做日志类型的不对，会有不同的存储内容，例如，对于页上记录的插入和删除操作。因此，InnoDB存储引擎的所有重做日志都是physiological logging的。对于页的整理操作，只需将redo_log_type设置为MLOG_PAGE_REORGANIZE，此时产生的日志仅10个字节。</p>
                <p> </p>
                <p>另外，physiological logging页不是完全幂等的，这取决于重做日志类型。对于MLOG_PAGE_REORGANIZE类型的重做日志其是幂等的，但是对于INSERT产生的日志其不是幂等的，因为INSERT重做日志记录的不是插入的记录，而是待插入记录的前一条记录的位置，因此，physiological logging的恢复还需要进行如下的判断：</p>
                <pre><code>if page.lsn &lt; log_record.lsn
          redo(page,log);

  </code></pre>
                <p>回到文章开头的问题，为什么需要doublewrite？现在问题很简单了，假设一个页在reorginaze后刷新到磁盘时发生了partial write的问题，那么由于重做日志中记录的仅仅是一个类型，没有原页的完整信息，因此恢复会失效。对于其他类型的重做日志，同样会存在这样的问题。即使是INSERT或者UPDATE操作产生的重做日志。</p>
                <p>由于doublewrite的存在，页的刷新分为了两个步骤。虽然doublewrite的写入是顺序的，但是这对性能也产生了影响，特别是在写密集的应用环境中。</p>
                <h4>Checkpoint检查点</h4>
                <p>缓存池的目的是为了cpu和硬盘速度的鸿沟，因此页的操作首先都是在缓存池中完成的，如果一条DML语句改变了页中的数据，此时的页是脏的，数据库需要将缓存池中的新数据刷入到硬盘中。</p>
                <p>此时会遇到2个问题：长时间不刷入到硬盘中，若发生宕机，那么数据将不能被恢复了。如果实时刷入到硬盘，则和cpu直接访问硬盘没什么区别，性能变得不能容忍。为了避免宕机发生数据丢失，几乎所有数据库(及NoSql)都采用了write ahead log策略，即当事务提交时，先写重写日志文件，再写修改页文件，当机器重启后通过重做日志恢复数据。</p>
                <p>重写日志是一个文件，修改页是多个页，追加文件日志比追加多个文件日志快。考虑的问题：</p>
                <blockquote><p>缓存池缓存数据库中所有的数据</p>
                    <p>重做日志可以无限增大</p>
                </blockquote>
                <p>mysql中含有3T数据不少见，而支持3T的内存却没有；如果每次重启都要重重做日志启点重做，代价太大。为了解决上面两个问题，引入了checkpoint检查点机制：</p>
                <p>当数据库重启后，不需要重做所有日志，只需要将checkpoint之后的日志进行恢复。</p>
                <p>当缓存池不够用时，根据LRU算法将尾部5/8后的脏页刷回硬盘。</p>
                <p>实际上重做日志也不是无限增大的，要是大到比数据库硬盘文件还大，也太浪费硬件资源了，若事先设计3个重做日志，当一个文件写满后，格式化前一个文件，写入下一个文件即可。</p>
                <p>两种checkpoint算法：</p>
                <blockquote><p>Sharp checkpoint 尖锐,刷新lru中所有的脏页数据到硬盘</p>
                    <p>Fuzzy checkpoint 模糊，只刷新old 列表中的脏页数据到硬盘</p>
                </blockquote>
                <p>InnoDB采用fuzzy checkpoint；</p>
                <h4>Master Thread</h4>
                <p>InnoDB后台的主要工作都是由主线程完成的，master thread具有最高的线程优先级，内部由多个loop组成，主循环，后台循环back，刷新循环flush，暂停循环suspend，主线程的状态在这几个循环中切换。</p>
                <p>大多数操作在主循环Loop中,里面有2种操作：per/1s ,per/10s,在高并发的情况下，按照时间频率进行操作肯定是不能满足业务需求的，InnoDB还通过其他方法来触发更高频率：</p>
                <p>1.满100个脏页数据刷入硬盘</p>
                <p>2.日志刷入硬盘，即使没有提交事务；-&gt;再大的事务提交都是很快的，只需要把提交操作刷入重做日志即可。</p>
                <h3>文件</h3>
                <h3>表</h3>
                <h4>索引结构</h4>
                <p>Mysql创建表时一般会显示的指定主键列，也可以不指定主键列，InnoDB会做出主键选择，如果存在非空唯一主键，则为主键，如果没有则自动创建主键指针，当然这是不好的实践。</p>
                <p>通过：select <em>,</em>rowid from table;*rowid就是主键列的值。_rowid只能用在单列上，如果是联合主键是要出异常的。</p>
                <p> </p>
                <h4>存储结构</h4>
                <p>所有的数据都会逻辑的存放在一个空间中，tablespace;表空间有有段(segment), 区(extent), 页(page/block)组成。</p>
                <p>默认表空间ibdata1(oracle中为Users);</p>
                <p>段(segment)即B+树的节点，无需DBA管理，有引擎管理</p>
                <p>区(extent)区是由连续的页组成；在创建表(96k)及写入数据时的流程：先是用32个碎片页(16kb)进行存放，当使用完后，申请64个连续的页构成一个区。</p>
                <h4>行</h4>
                <p>InnoDB中一个页最多存放7992行数据。一个页是16kb,对于blob/clob可能不止16kb怎么办，实际上，这两种数据类型并没有直接放在该列中，而是拆成了两部分,前768byte放在列中，后部分放在blob页中，该列存放768b+ref。</p>
                <h3>索引</h3>
                <p>B+树索引</p>
                <p>全文索引</p>
                <p>哈希索引</p>
                <p>应用：联合索引</p>
                <p>创建了联合索引,有select * from table a=xxx and b=xxx这条sql是可以用到联合索引，对于select * from table a=xxx 也是可以使用联合索引，但是对于select * from table b=xxx 是不能使用到联合索引的。因为在创建联合索引的时候是按照列顺序第一个列的顺序生成的b+顺序。因此如果查询条件没有含有a条件是不能使用索引的。</p>
                <p>(1,1),(1,2),(1,3),(2,1),(2,2),(2,3),(3,1),如果a值相同，b值也是排了序的。</p>
                <h4>普通索引和唯一性索引的区别</h4>
                <p>1、普通索引 普通索引的唯一任务是加快对数据的访问速度。因此，应该只为那些最经常出现在查询条件（WHERE column = ）或排序条件（ORDER BY column）中的数据列创建索引。只要有可能，就应该选择一个数据最整齐、最紧凑的数据列（如一个整数类型的数据列）来创建索引。</p>
                <p>2、唯一索引　　普通索引允许被索引的数据列包含重复的值。比如说，因为人有可能同名，所以同一个姓名在同一个“员工个人资料”数据表里可能出现两次或更多次。如果能确定某个数据列将只包含彼此各不相同的值，在为这个数据列创建索引的时候就应该用关键字UNIQUE把它定义为一个唯一索引。这么做的好处：一是简化了MySQL对这个索引的管理工作，这个索引也因此而变得更有效率；二是MySQL会在有新记录插入数据表时，自动检查新记录的这个字段的值是否已经在某个记录的这个字段里出现过了；如果是，MySQL将拒绝插入那条新记录。也就是说，唯一索引可以保证数据记录的唯一性。事实上，在许多场合，人们创建唯一索引的目的往往不是为了提高访问速度，而只是为了避免数据出现重复。</p>


            </div>
        );
    }
}

export default Mysql0;