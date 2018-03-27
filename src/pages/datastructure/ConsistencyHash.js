import React, { Component } from 'react';





class ConsistencyHash extends Component {
    render() {
        return (
            <div>
                <h2>一致性哈希</h2>
                <p>一致性哈希算法是分布式系统中常用的算法。比如，一个分布式的存储系统，要将数据存储到具体的节点上，
                    如果采用普通的hash方法，将数据映射到具体的节点上，如mod(key,d)，key是数据的key，d是机器节点数，
                    如果有一个机器加入或退出这个集群，则所有的数据映射都无效了。</p>
                <p>一致性哈希算法解决了普通余数Hash算法伸缩性差的问题，可以保证在上线、下线服务器的情况下尽量有多的请求命中原来路由到的服务器。</p>
                <p>&nbsp;</p>
                <p><strong>环形Hash空间</strong>
                    按照常用的hash算法来将对应的key哈希到一个具有2^32次方个桶的空间中，即0~(2^32)-1的数字空间中。</p>
                <p>现在我们可以将这些数字头尾相连，想象成一个闭合的环形。</p>
                <p><strong>把数据通过一定的hash算法处理后映射到环上</strong></p>
                <p>现在我们将object1、object2、object3、object4四个对象通过特定的Hash函数计算出对应的key值，然后散列到Hash环上。如下图：
                    Hash(object1) = key1；
                    Hash(object2) = key2；
                    Hash(object3) = key3；
                    Hash(object4) = key4；</p>
                <p><strong>将机器通过hash算法映射到环上</strong></p>
                <p>在采用一致性哈希算法的分布式集群中将新的机器加入，其原理是通过使用与对象存储一样的Hash算法将机器也映射到环中。</p>
                <p>假设现在有NODE1，NODE2，NODE3三台机器，通过Hash算法得到对应的KEY值，映射到环中，其示意图如下：
                    Hash(NODE1) = KEY1;
                    Hash(NODE2) = KEY2;
                    Hash(NODE3) = KEY3;</p>
                <p>可以看出对象与机器处于同一哈希空间中，这样按顺时针转动object1存储到了NODE1中，object3存储到了NODE2中，object2、object4存储到了NODE3中；</p>
                {/*<p><img src={require('../../img/20160322101232331.png')} /></p>*/}
                <p><img src="https://thumbnail0.baidupcs.com/thumbnail/45292594798b1a2257ee4383d986d3b5?fid=940423185-250528-505145053845828&time=1520074800&rt=sh&sign=FDTAER-DCb740ccc5511e5e8fedcff06b081203-8oKsISuYCI7clkhAbmOkTym0pC8%3D&expires=8h&chkv=0&chkbd=0&chkpc=&dp-logid=1433973247800156011&dp-callid=0&size=c710_u400&quality=100&vuk=-&ft=video" /></p>
                <p>在这样的部署环境中，hash环是不会变更的，因此，通过算出对象的hash值就能快速的定位到对应的机器中，这样就能找到对象真正的存储位置，但是还是有可能发生节点退出而不能命中的情况。</p>
                <p><strong>节点（机器）的删除</strong>
                    以上面的分布为例，如果NODE2出现故障被删除了，那么按照顺时针迁移的方法，object3将会被迁移到NODE3中，这样仅仅是object3的映射位置发生了变化，其它的对象没有任何的改动。</p>
                {/*<p><img src={require('../../img/20160322101236809.png')} /></p>*/}
                <p><img src="https://thumbnail0.baidupcs.com/thumbnail/57a85d36605981515cfc4a6f5c449a80?fid=940423185-250528-684794214266455&time=1520074800&rt=sh&sign=FDTAER-DCb740ccc5511e5e8fedcff06b081203-aGMuaHSMtfrNWjCdbgWWc1CYjtI%3D&expires=8h&chkv=0&chkbd=0&chkpc=&dp-logid=1433979595728959964&dp-callid=0&size=c710_u400&quality=100&vuk=-&ft=video" /></p>
                <p><strong>节点（机器）的添加 </strong>
                    如果往集群中添加一个新的节点NODE4，通过对应的哈希算法得到KEY4，并映射到环中</p>
                {/*<p><img src={require('../../img/20160322101240747.png')} /></p>*/}
                <p><img src="https://thumbnail0.baidupcs.com/thumbnail/616d82842f18a593301b70bc1dd21808?fid=940423185-250528-889315242412385&time=1520074800&rt=sh&sign=FDTAER-DCb740ccc5511e5e8fedcff06b081203-YjizxKwjjPQYWdJ%2BbJYqjTBQM%2F0%3D&expires=8h&chkv=0&chkbd=0&chkpc=&dp-logid=1433984555592688489&dp-callid=0&size=c710_u400&quality=100&vuk=-&ft=video"/></p>
                <p>通过按顺时针迁移的规则，那么object2被迁移到了NODE4中，其它对象还保持着原有的存储位置。
                    通过对节点的添加和删除的分析，一致性哈希算法在保持了单调性的同时，还是数据的迁移达到了最小，这样的算法对分布式集群来说是非常合适的，避免了大量数据迁移，减小了服务器的的压力。</p>
                <p><strong>平衡性--虚拟节点</strong></p>
                <p> 进行删除节点后，数据向后面一个节点滑移，造成后面节点的单点压力，如上面只部署了NODE1和NODE3的情况（NODE2被删除的图），object1存储到了NODE1中，而object2、object3、object4都存储到了NODE3中，这样就照成了非常不平衡的状态。在一致性哈希算法中，为了尽可能的满足平衡性，其引入了虚拟节点。</p>
                <p> 以上面只部署了NODE1和NODE3的情况（NODE2被删除的图）为例，之前的对象在机器上的分布很不均衡，现在我们以2个副本（复制个数）为例，这样整个hash环中就存在了4个虚拟节点，最后对象映射的关系图如下：</p>
                {/*<p><img src={require('../../img/6236798-6d94f9a40a9be1f5.png')} /></p>*/}
                <p><img src="https://thumbnail0.baidupcs.com/thumbnail/36aa0a898a30f7928044ad572accf09e?fid=940423185-250528-879048469360895&time=1520074800&rt=sh&sign=FDTAER-DCb740ccc5511e5e8fedcff06b081203-4EobO0aVSa6vY4kXpwrVT4IaTTQ%3D&expires=8h&chkv=0&chkbd=0&chkpc=&dp-logid=1433990766677949838&dp-callid=0&size=c710_u400&quality=100&vuk=-&ft=video" /></p>
                <p>引入“虚拟节点”后，计算“虚拟节”点NODE1-1和NODE1-2的hash值：
                    Hash(“192.168.1.100#1”); // NODE1-1
                    Hash(“192.168.1.100#2”); // NODE1-2</p>
                <p>然后将新的[NODE1-1，NODE1-2，NODE2-1，NODE2-2 ...]按照随机排序即可。</p>
            </div>
        );
    }
}

export default ConsistencyHash;