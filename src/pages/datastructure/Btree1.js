import React, { Component } from 'react';

class Btree1 extends Component {
    render() {
        return (
            <div>
                <h2>B+树</h2>
                <p>	B+树是为磁盘或其他直接存取辅助设备而设计的一种平衡查找树，在B+树中，所有记录节点都是按键值的大小顺序存放在同一层的叶节点中，各叶节点指针进行连接。</p>
                <p>&nbsp;</p>
                <p><img src="https://thumbnail0.baidupcs.com/thumbnail/b71c1b6c36fc2b7b2981338eea9ee434?fid=940423185-250528-205119476670791&time=1520074800&rt=sh&sign=FDTAER-DCb740ccc5511e5e8fedcff06b081203-SEBxIAkqa%2Bqev6i6fUh0KTS7PyE%3D&expires=8h&chkv=0&chkbd=0&chkpc=&dp-logid=1433916069159432526&dp-callid=0&size=c710_u400&quality=100&vuk=-&ft=video" /></p>
                <p><strong>B+</strong>树是对B树的一种变形树，它与B树的差异在于：</p>
                <ul>
                    <li><p>有k个子结点的结点必然有k个关键码；</p>
                    </li>
                    <li><p>非叶结点仅具有索引作用，跟记录有关的信息均存放在叶结点中。</p>
                    </li>
                    <li><p>树的所有叶结点构成一个有序链表，可以按照关键码排序的次序遍历全部记录。</p>
                    </li>
                    <li><p>B+树的非叶子结点只包含导航信息，不包含实际的值，所有的叶子结点和相连的节点使用链表相连，便于区间查找和遍历。</p>
                        <p>&nbsp;</p>
                        <p>B+ 树的优点在于：</p>
                        <ul>
                            <li>由于B+树在内部节点上不包含数据信息，因此在内存页中能够存放更多的key。 数据存放的更加紧密，具有更好的空间局部性。因此访问叶子节点上关联的数据也具有更好的缓存命中率。</li>
                            <li>B+树的叶子结点都是相链的，因此对整棵树的便利只需要一次线性遍历叶子结点即可。而且由于数据顺序排列并且相连，所以便于区间查找和搜索。而B树则需要进行每一层的递归遍历。相邻的元素可能在内存中不相邻，所以缓存命中性没有B+树好。</li>

                        </ul>
                    </li>

                </ul>
                <p>B 树和B+树的区别图：</p>
               {/* <p><img src={require('../../img/290050088914733.png')} /></p>*/}
                <p><img src="https://thumbnail0.baidupcs.com/thumbnail/ebfd3c393cf86b1170e0be8969ab32ff?fid=940423185-250528-934485271412282&time=1520074800&rt=sh&sign=FDTAER-DCb740ccc5511e5e8fedcff06b081203-kXlf%2FB2V9zgD7OSOvUd2AIikm7E%3D&expires=8h&chkv=0&chkbd=0&chkpc=&dp-logid=1433935212581180819&dp-callid=0&size=c710_u400&quality=100&vuk=-&ft=video" /></p>
                <p>B/B+树也经常用做数据库的索引，在mysql的索引原理详细讲解。</p>


            </div>
        );
    }
}

export default Btree1;