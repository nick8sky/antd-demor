import React, {Component} from 'react';
import {Anchor, Row, Col} from 'antd';


const {Link} = Anchor;


class ASK9 extends Component {

    s = "{";
    render() {

        return (
            <div>
                <Row>
                    <Col span={19}>
                        <h3>索引的使用跟查询的and的前后顺序有关吗？</h3>
                        <p>--创建一个表
                            create table testindex (
                            id int(10) unsigned NOT NULL AUTO_INCREMENT,
                            detail varchar(200) NOT NULL,
                            contact varchar(50) NOT NULL,
                            primary key (id)
                            ) engine=innodb
                            ;
                            --创建索引
                            alter table testindex add index idx(detail, contact);
                            --插入一条数据
                            insert into testindex(detail, contact) values(&#39;aa&#39;, &#39;bb&#39;);</p>
                        <p>&nbsp;</p>
                        <p>按照跟创建idx的顺序一致的顺序查询 ；</p>
                        <p>发现key:idx,说明使用了索引.
                            而and语句前后顺序对调：</p>
                        <p><img src='http://img.blog.csdn.net/20160726150042371' alt='' /></p>
                        <p>key也是idx,说明也使用了索引.</p>
                        <p>比如建了一个索引idx(A, B, C),他说的是要使用A, AB, ABC这样的顺序查询,而使用B, BC, 这样是使用不到索引的.</p>

                    </Col>
                    <Col span={1}>
                    </Col>
                    <Col span={4}>
                         <Anchor showInkInFixed="true">

                         </Anchor>
                    </Col>
                </Row>


            </div>

        );
    }
}

export default ASK9;
