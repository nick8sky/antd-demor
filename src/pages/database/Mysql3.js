import React, { Component } from 'react';

class Mysql3 extends Component {
    render() {
        return (
            <div>
                <h3>索引的本质</h3>
                <p>MySQL官方对索引的定义为：索引（Index）是帮助MySQL高效获取数据的数据结构。提取句子主干，就可以得到索引的本质：索引是数据结构。</p>
                <p>我们知道，数据库查询是数据库的最主要功能之一。我们都希望查询数据的速度能尽可能的快，因此数据库系统的设计者会从查询算法的角度进行优化。最基本的查询算法当然是顺序查找（linear search），这种复杂度为O(n)的算法在数据量很大时显然是糟糕的，好在计算机科学的发展提供了很多更优秀的查找算法，例如二分查找（binary search）、二叉树查找（binary tree search）等。如果稍微分析一下会发现，每种查找算法都只能应用于特定的数据结构之上，例如二分查找要求被检索数据有序，而二叉树查找只能应用于二叉查找树上，但是数据本身的组织结构不可能完全满足各种数据结构（例如，理论上不可能同时将两列都按顺序进行组织），所以，在数据之外，数据库系统还维护着满足特定查找算法的数据结构，这些数据结构以某种方式引用（指向）数据，这样就可以在这些数据结构上实现高级查找算法。这种数据结构，就是索引。</p>
               {/* <p><img src={require('../../img/133412324.png')} /></p>*/}
                <p><img src="https://thumbnail0.baidupcs.com/thumbnail/3b354ee82b50906fd473251c165db32d?fid=940423185-250528-990259470854076&time=1520078400&rt=sh&sign=FDTAER-DCb740ccc5511e5e8fedcff06b081203-iKCBpKAwH%2FaTYCdCU7nnSuNjgOE%3D&expires=8h&chkv=0&chkbd=0&chkpc=&dp-logid=1434281652455535260&dp-callid=0&size=c710_u400&quality=100&vuk=-&ft=video" /></p>
                <p>图1展示了一种可能的索引方式。左边是数据表，一共有两列七条记录，最左边的是数据记录的物理地址（注意逻辑上相邻的记录在磁盘上也并不是一定物理相邻的）。为了加快Col2的查找，可以维护一个右边所示的二叉查找树，每个节点分别包含索引键值和一个指向对应数据记录物理地址的指针，这样就可以运用二叉查找在O(log2n)的复杂度内获取到相应数据。</p>
                <p>虽然真实的索引，但是实际的数据库系统几乎没有使用二叉查找树或红黑树（red-black tree）实现。</p>
                <p>&nbsp;</p>
                <h3>为什么使用B-Tree（B+Tree）</h3>
                <p>一般来说，索引本身也很大，不可能全部存储在内存中，因此索引往往以索引文件的形式存储的磁盘上。这样的话，索引查找过程中就要产生磁盘I/O消耗，相对于内存存取，I/O存取的消耗要高几个数量级，所以评价一个数据结构作为索引的优劣最重要的指标就是在查找过程中磁盘I/O操作次数的渐进复杂度。换句话说，索引的结构组织要尽量减少查找过程中磁盘I/O的存取次数。 </p>
                <p>&nbsp;</p>
                <h4>MyISAM索引实现</h4>
                <p>MyISAM引擎使用B+Tree作为索引结构，叶节点的data域存放的是数据记录的地址。下图是MyISAM索引的原理图：</p>
                <p><img src="https://thumbnail0.baidupcs.com/thumbnail/608d969973771163596365dab2dfd79a?fid=940423185-250528-298527031556501&time=1520078400&rt=sh&sign=FDTAER-DCb740ccc5511e5e8fedcff06b081203-t%2Fu45GhAc8BW2ObJn9CoJFMn1bI%3D&expires=8h&chkv=0&chkbd=0&chkpc=&dp-logid=1434288158811702625&dp-callid=0&size=c710_u400&quality=100&vuk=-&ft=video" /></p>
               {/* <p><img src={require('../../img/28439056433.png')} /></p>*/}
                <p>这里设表一共有三列，假设我们以Col1为主键，是一个MyISAM表的主索引（Primary key）示意。可以看出MyISAM的索引文件仅仅保存数据记录的地址。在MyISAM中，主索引和辅助索引（Secondary key）在结构上没有任何区别，只是主索引要求key是唯一的，而辅助索引的key可以重复。如果我们在Col2上建立一个辅助索引，则此索引的结构如下图所示：</p>
                {/*<p><img src={require('../../img/345346546778.png')} /></p>*/}
                <p><img src="https://thumbnail0.baidupcs.com/thumbnail/34fa5719e8f8e340646dc4cb0ac04bb1?fid=940423185-250528-214905489702096&time=1520078400&rt=sh&sign=FDTAER-DCb740ccc5511e5e8fedcff06b081203-X1pURpBHDBzOmJUeKKmA6VLnK0A%3D&expires=8h&chkv=0&chkbd=0&chkpc=&dp-logid=1434294830783575193&dp-callid=0&size=c710_u400&quality=100&vuk=-&ft=video" /></p>
                <p>同样也是一颗B+Tree，data域保存数据记录的地址。因此，MyISAM中索引检索的算法为首先按照B+Tree搜索算法搜索索引，如果指定的Key存在，则取出其data域的值，然后以data域的值为地址，读取相应数据记录。</p>
                <p>MyISAM的索引方式也叫做“非聚集”的，之所以这么称呼是为了与InnoDB的聚集索引区分。</p>
                <p>&nbsp;</p>
                <h3>InnoDB索引实现</h3>
                <p>虽然InnoDB也使用B+Tree作为索引结构，但具体实现方式却与MyISAM截然不同。</p>
                <p>第一个重大区别是InnoDB的数据文件本身就是索引文件。从上文知道，MyISAM索引文件和数据文件是分离的，索引文件仅保存数据记录的地址。而在InnoDB中，表数据文件本身就是按B+Tree组织的一个索引结构，这棵树的叶节点data域保存了完整的数据记录。这个索引的key是数据表的主键，因此InnoDB表数据文件本身就是主索引。</p>
                {/*<p><img src={require('../../img/46553425677.png')} /></p>*/}
                <p><img src="https://thumbnail0.baidupcs.com/thumbnail/c68d433ff5d6292c542bd9e6495ae8af?fid=940423185-250528-244852030870539&time=1520078400&rt=sh&sign=FDTAER-DCb740ccc5511e5e8fedcff06b081203-D2tVsLOnqqX4s2nwfWf9qmnhWEU%3D&expires=8h&chkv=0&chkbd=0&chkpc=&dp-logid=1434300719518554060&dp-callid=0&size=c710_u400&quality=100&vuk=-&ft=video" /></p>
                <p>上图是InnoDB主索引（同时也是数据文件）的示意图，可以看到叶节点包含了完整的数据记录。这种索引叫做聚集索引。因为InnoDB的数据文件本身要按主键聚集，所以InnoDB要求表必须有主键（MyISAM可以没有），如果没有显式指定，则MySQL系统会自动选择一个可以唯一标识数据记录的列作为主键，如果不存在这种列，则MySQL自动为InnoDB表生成一个隐含字段作为主键，这个字段长度为6个字节，类型为长整形。</p>
                <p>第二个与MyISAM索引的不同是InnoDB的辅助索引data域存储相应记录主键的值而不是地址。换句话说，InnoDB的所有辅助索引都引用主键作为data域。例如，图11为定义在Col3上的一个辅助索引</p>
                {/*<p><img src={require('../../img/86754335467.png')} /></p>*/}
                <p><img src="https://thumbnail0.baidupcs.com/thumbnail/ee2e610e5b45ef9629e00cc8a85ac9bb?fid=940423185-250528-571677116341374&time=1520078400&rt=sh&sign=FDTAER-DCb740ccc5511e5e8fedcff06b081203-IP3liWBxeMkXWk98LpGD3byZ%2B2E%3D&expires=8h&chkv=0&chkbd=0&chkpc=&dp-logid=1434320728835369716&dp-callid=0&size=c710_u400&quality=100&vuk=-&ft=video" /></p>
                <p>聚集索引这种实现方式使得按主键的搜索十分高效，但是辅助索引搜索需要检索两遍索引：首先检索辅助索引获得主键，然后用主键到主索引中检索获得记录。</p>
                <p>了解不同存储引擎的索引实现方式对于正确使用和优化索引都非常有帮助，例如知道了InnoDB的索引实现后，就很容易明白为什么不建议使用过长的字段作为主键，因为所有辅助索引都引用主索引，过长的主索引会令辅助索引变得过大。再例如，用非单调的字段作为主键在InnoDB中不是个好主意，因为InnoDB数据文件本身是一颗B+Tree，非单调的主键会造成在插入新记录时数据文件为了维持B+Tree的特性而频繁的分裂调整，十分低效，而使用自增字段作为主键则是一个很好的选择。</p>
                <p>&nbsp;</p>
                <p>因此，只要可以，请尽量在InnoDB上采用自增字段做主键。</p>


            </div>
        );
    }
}

export default Mysql3;