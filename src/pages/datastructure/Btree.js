import React, { Component } from 'react';

class Btree extends Component {
    render() {
        return (
            <div>
                <h2>B树</h2>
                <p>	动态查找树主要有：二叉查找树（Binary Search Tree），平衡二叉查找树（Balanced Binary Search Tree），红黑树(Red-Black Tree )，B-tree/B+-tree/ B*-tree (B~Tree)。前三者是典型的二叉查找树结构，其查找的时间复杂度O(log2N)与树的深度相关，那么降低树的深度自然会提高查找效率。 </p>
                <p>	面对这样一个实际问题：就是大规模数据存储中，实现索引查询这样一个实际背景下， 二叉查找树结构由于树的深度过大而造成磁盘I/O探针读写过于频繁，进而导致查询效率低下，那么如何减少树的深度，一个基本的想法就是：采用多叉树结构。</p>
                <p>　　B树也是一种用于查找的平衡树，但是它不是二叉树。</p>
                <p>一棵简单的B树示意图如下： </p>
                <p><img src="https://thumbnail0.baidupcs.com/thumbnail/eef4397b403700b69ba9eabf680b4aa8?fid=940423185-250528-203431752658392&time=1520074800&rt=sh&sign=FDTAER-DCb740ccc5511e5e8fedcff06b081203-EEEy%2Fjr0etU0RnrhS0W8g2LW1DI%3D&expires=8h&chkv=0&chkbd=0&chkpc=&dp-logid=1433850096869927913&dp-callid=0&size=c710_u400&quality=100&vuk=-&ft=video" /></p>
                <p>相信，从上图你能轻易的看到，一个内结点x若含有n[x]个关键字，那么x将含有n[x]+1个子女。如含有2个关键字D H的内结点有3个子女，而含有3个关键字Q T X的内结点有4个子女。</p>
                <p>度就是分支的数目，没有分叉的二叉树节点的度就是0度。如果一个节点只有一个分叉就是1度。两个分叉就是2度的子树。</p>
                <p>内节点：非叶子节点</p>
                <p>B树的基本操作</p>
                <p>查找</p>
                <p>　　查找首先在节点x中查找，若x节点中没有，则在x节点中目标所属范围的子树中查找</p>
                <p>插入　</p>
                <p>　　由于对于度为t的B树，每个节点中关键字的数目必须为[t-1, 2t-1]中的一个值，因此当要插入的节点中已经有2t-1个节点时，就必须先对该节点进行分裂。
                    分裂时以中间第t个关键字为轴将节点分裂成两个含有t-1个关键字的子树。然后将第t个节点提升到父节点中。</p>
                <p>有初始B树如下：
                    t=2，则每个节点的关键字数量必须为[t-1,2t-1]，即为[1,3]。因此当要插入的节点已经有3个关键字时，就必须进行分裂，以第t个即第二个关键字为中间轴进行分裂。 </p>
                <p><img src="https://thumbnail0.baidupcs.com/thumbnail/739a23cd2bc4af7d47dded186c3576ea?fid=940423185-250528-507295502027884&time=1520074800&rt=sh&sign=FDTAER-DCb740ccc5511e5e8fedcff06b081203-1gUQTNpEHtpAsaRyz8I4oZiBrnQ%3D&expires=8h&chkv=0&chkbd=0&chkpc=&dp-logid=1433860945461261587&dp-callid=0&size=c710_u400&quality=100&vuk=-&ft=video" /></p>
                <p>如此时插入A, 最终会插入到y节点。而y节点已经有3个关键字，因此在插入之前必须先将y分裂成两个节点，并将H提升到父节点中 。</p>
                <p><img src="https://thumbnail0.baidupcs.com/thumbnail/a690af4deb18d149a03f7b55076e1ee8?fid=940423185-250528-871057973086441&time=1520074800&rt=sh&sign=FDTAER-DCb740ccc5511e5e8fedcff06b081203-QD%2FVkQvRXTBsHVBHekw%2FEBR%2FrxI%3D&expires=8h&chkv=0&chkbd=0&chkpc=&dp-logid=1433867820356315454&dp-callid=0&size=c710_u400&quality=100&vuk=-&ft=video" /></p>
                <p>总结：
                    1）先往叶子节点中插入
                    2）当要插入的节点已满时，必须先对其进行分裂，然后将中间关键字keyt[x]提升到父节点
                    3）当父节点已满时，必须先对父节点分裂，再提升关键字，一直向上递归
                    4）当根节点已满时，就需要创建一个新的根节点，用于保存原来根节点中的第t个关键字。此时树的高度会加1
                    ==&gt;所有叶子节点的深度都相同。</p>
                <p>&nbsp;</p>
                <p>删除　　　</p>
                <p>　　1）如果要删除的关键字在叶子节点上，且叶子节点关键字数大于t，则可以直接删除。</p>
                <p><img src="https://thumbnail0.baidupcs.com/thumbnail/7720e4f7b3581509a1c52efa94376c63?fid=940423185-250528-544336539693807&time=1520074800&rt=sh&sign=FDTAER-DCb740ccc5511e5e8fedcff06b081203-lBA09R%2B4WmbFjm6HN9KqC17rVLQ%3D&expires=8h&chkv=0&chkbd=0&chkpc=&dp-logid=1433874583804097804&dp-callid=0&size=c710_u400&quality=100&vuk=-&ft=video" /></p>
                <p>
                    2）但如果在内节点中，由于每一个key左右都有一个子树，删除后会违背B树的定义，因此必须进行调整。</p>
                <p>如要删除M，而M的前子节点为(DHK)，则用K替换M，并递归的删除K。 </p>
               {/* <p><img src={require('../../img/20160427125925949.png')} /></p>*/}
                <p><img src="https://thumbnail0.baidupcs.com/thumbnail/2c69b7fb462b644158bb3fc94937b0f0?fid=940423185-250528-765400638045352&time=1520074800&rt=sh&sign=FDTAER-DCb740ccc5511e5e8fedcff06b081203-VI8vvVdhLB%2BsnHWw%2Fw13yl%2B%2Bh4Q%3D&expires=8h&chkv=0&chkbd=0&chkpc=&dp-logid=1433894848468600112&dp-callid=0&size=c710_u400&quality=100&vuk=-&ft=video" /></p>
                <p>如要删除P，用Q替换P，并递归的删除Q。 </p>
                {/*<p><img src={require('../../img/20160427130239185.png')} /></p>*/}
                <p><img src="https://thumbnail0.baidupcs.com/thumbnail/607b59bd1a9c0037c9c9f75541aea6b1?fid=940423185-250528-202316039318917&time=1520074800&rt=sh&sign=FDTAER-DCb740ccc5511e5e8fedcff06b081203-x8XkNJjLaHe2iPdiD%2BoirHm1DlY%3D&expires=8h&chkv=0&chkbd=0&chkpc=&dp-logid=1433902282598377312&dp-callid=0&size=c710_u400&quality=100&vuk=-&ft=video"/></p>
                <p>3）若x中key前后子节点中关键字都少于t个，则将左右节点与key合并，然后再完成删除操作 </p>
                <p>例：要删除P，y中只有一个关键字N，z中也只有一个关键字Q，因此首先将N、P、Q合并，然后删除P。 </p>
                {/*<p><img src={require('../../img/20160427130504022.png')} /></p>*/}
                <p><img src="https://thumbnail0.baidupcs.com/thumbnail/7df041faa8b78ce74f60963d37da59be?fid=940423185-250528-186367001558011&time=1520074800&rt=sh&sign=FDTAER-DCb740ccc5511e5e8fedcff06b081203-QpsxMxwxYiMqE30LwvvTR48BW2U%3D&expires=8h&chkv=0&chkbd=0&chkpc=&dp-logid=1433909279564439709&dp-callid=0&size=c710_u400&quality=100&vuk=-&ft=video" /></p>


            </div>
        );
    }
}

export default Btree;