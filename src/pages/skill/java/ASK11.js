import React, {Component} from 'react';
import {Anchor, Row, Col} from 'antd';
const {Link} = Anchor;


class ASK10 extends Component {

    s = "{";
    render() {

        return (
            <div>
                <Row>
                    <Col span={19}>
                        <h2>mysql中的那些锁</h2>
                        <p>1、表锁</p>
                        <p>2、行锁（<strong>Record lock</strong>）</p>
                        <p>3、page锁</p>
                        <p>4、共享锁[read(MyISAM),in share mode(innodb)]</p>
                        <p>5、排他锁[write(MyISAM),for update(innodb)]</p>
                        <p>6、意向锁</p>
                        <p>7、区间锁（<strong>Gap lock</strong>：对索引项之间的‘间隙’、对第一条记录前的间隙或最后一条记录后的间隙加锁，即锁定一个范围的记录，不包含记录本身）</p>
                        <p>8、Next-key Lock：锁定一个范围的记录并包含记录本身(2+7)</p>
                        <p>9、悲观锁</p>
                        <p>10、乐观锁</p>
                        <h3>使用共享-读锁</h3>
                        <p><img src={require('../../../imgs/skill/mysql11.png')} alt='' /></p>
                        <p>打开读锁后，更新数据被阻塞了，释放读锁：</p>
                        <p><img src={require('../../../imgs/skill/mysql12.png')} alt='' /></p>
                        <p>释放读锁后，更新操作执行。</p>
                        <h3>使用排他-写锁</h3>
                        <p><img src={require('../../../imgs/skill/mysql13.png')} alt='' /></p>
                        <p>查询被阻塞，释放锁：</p>
                        <p><img src={require('../../../imgs/skill/mysql14.png')} alt='' /></p>
                        <p>释放锁之后，能够查询。</p>
                        <p>&nbsp;</p>
                        <h3>使用共享-共享查询模式</h3>
                        <p>注意，两个线程都要先关闭自动提交</p>
                        <pre><code>SHOW VARIABLES LIKE &#39;%AUTOCOMMIT%&#39;; 
set autocommit =0;
</code></pre>
                        <p><img src={require('../../../imgs/skill/mysql16.png')} alt='' /></p>
                        <p>发现线程1被阻塞了。</p>
                        <p>而使用查询：</p>
                        <p><img src={require('../../../imgs/skill/mysql17.png')} alt='' /></p>
                        <p>表明没有被阻塞。</p>
                        <p>取消共享查询，提交下事务就可以了</p>
                        <p>mysql&gt; commit ;</p>
                        <p>说明一个查询也是事务。</p>
                        <h3>使用排他-for update</h3>
                        <p><img src={require('../../../imgs/skill/mysql18.png')} alt='' /></p>
                        <p>发现修改被阻塞了，但不会阻塞查询。</p>
                        <p>因为只能查到锁之前的数据。</p>
                        <p>&nbsp;</p>
                        <h3>使用Next-Key Lock</h3>
                        <p>Next-Key Lock是行锁与间隙锁的组合，这样，当InnoDB扫描索引记录的时候，会首先对选中的索引记录加上行锁（Record Lock），再对索引记录两边的间隙加上间隙锁（Gap Lock）。如果一个间隙被事务T1加了锁，其它事务是不能在这个间隙插入记录的。</p>
                        <p><img src={require('../../../imgs/skill/mysql19.png')} alt='' /></p>
                        <pre><code>mysql&gt; select * from USER where PASSWORD=&#39;24&#39; for update ;
+----+----------+----------+
| id | USERNAME | PASSWORD |
+----+----------+----------+
|  1 | nick     | 24       |
+----+----------+----------+
1 row in set (0.01 sec)
</code></pre>
                        <p>..。</p>
                    </Col>
                    <Col span={1}>
                    </Col>
                    <Col span={4}>
                         <Anchor showInkInFixed="true">
                             <Link href="#mysql中的那些锁" title="mysql中的那些锁">
                                 <Link href="#使用共享-读锁" title="使用共享-读锁"/>
                                 <Link href="#使用排他-写锁" title="使用排他-写锁"/>
                                 <Link href="#使用共享-共享查询模式" title="使用共享-共享查询模式"/>
                                 <Link href="#使用排他-for update" title="使用排他-for update"/>
                                 <Link href="#使用Next-Key Lock" title="使用Next-Key Lock"/>
                             </Link>
                         </Anchor>
                    </Col>
                </Row>


            </div>

        );
    }
}

export default ASK10;
