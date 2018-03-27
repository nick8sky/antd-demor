import React, {Component} from 'react';
import {Anchor, Row, Col} from 'antd';

const {Link} = Anchor;


class Command2 extends Component {
    render() {


        return (
            <div>
                <Row>
                    <Col span={19}>

                    </Col>
                    <Col span={1}>
                    </Col>
                    <Col span={4}>
                        <Anchor showInkInFixed="true">
                            <Link href="#文件内容查看" title="文件内容查看">
                                <Link href="#tail命令" title="tail命令"/>
                                <Link href="#head命令" title="head命令"/>
                                <Link href="#more命令" title="more命令"/>
                                <Link href="#less命令" title="less命令"/>
                                <Link href="#cat命令" title="cat命令"/>
                            </Link>
                            <Link href="#文件编辑" title="文件编辑">
                                <Link href="#vi命令" title="vi命令"/>
                                <Link href="#sed命令" title="sed命令">
                                    <Link href="#sed的编辑命令" title="sed的编辑命令"/>
                                    <Link href="#使用正则表达式" title="使用正则表达式"/>
                                    <Link href="#对文件内容的添加" title="对文件内容的添加"/>
                                </Link>
                            </Link>
                        </Anchor>
                    </Col>
                </Row>


            </div>

        );
    }
}

export default Command2;
