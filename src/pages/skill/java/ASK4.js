import React, {Component} from 'react';
import {Anchor, Row, Col} from 'antd';


const {Link} = Anchor;


class ASK4 extends Component {

    s = "{";
    render() {

        return (
            <div>
                <Row>
                    <Col span={19}>

                        <h3 id="jvm内存模型"><a href="javascript:void(0)" class="anchor">jvm内存模型</a></h3>
                        <p><img src='https://gitee.com/nick070809/pics/raw/master/skill/12.png' alt='' /></p>
                        <p><strong>永久代是Hotspot虚拟机(7-)特有的概念，是方法区的一中实现(可以简单理解为jvm7的方法区就是永久代)</strong>，别的JVM都没有这个东西。</p>
                        <p>&nbsp;</p>
                        <h3 id="gc roots"><a href="javascript:void(0)" class="anchor">gc roots</a></h3>
                        <p>在Java语言里，可作为GC Roots对象的包括如下几种： </p>
                        <p>a.虚拟机栈中的引用的对象 </p>
                        <p>b.本地方法栈中JNI的引用的对象</p>
                        <p>c.方法区中的类静态属性引用的对象 </p>
                        <p>d.方法区中的常量引用的对象</p>
                        <p>&nbsp;</p>
                        <h3 id="为什么main对象可以作为gc root?"><a href="javascript:void(0)" class="anchor">为什么main对象可以作为gc root?</a></h3>
                        <p>1.因为开启了虚拟机栈</p>
                        <p>	由上面的定义，虚拟机栈的中引用的对象，一般来说，在main方法中使用自己的对象或其他对象作为引用对象，所以main对象就成gc root。</p>
                        <p>&nbsp;</p>
                        <h3 id="两个对象相互引用会不会被GC？"><a href="javascript:void(0)" class="anchor">两个对象相互引用会不会被GC？</a></h3>
                        <p>两个对象相互引用，是会不会被GC没有直接关系。‘ 采用的GC Roots可达性来决定是否会被GC回收。如果其他所有对象都没有引用这两个对象，即使这两个对象相互引用，也会被GC</p>
                        <p>因为jvm是从一个根对象开始查找引用的，没有任何路径可以被根对象引用的闭环也会被GC的。</p>
                        <p>如果使用引用计数算法 是不会被gc的。</p>
                    </Col>
                    <Col span={1}>
                    </Col>
                    <Col span={4}>
                         <Anchor showInkInFixed="true">
                                  <Link href="#jvm内存模型" title="jvm内存模型"/>
                                 <Link href="#gc roots" title="gc roots"/>
                                  <Link href="#为什么main对象可以作为gc root?" title="为什么main对象可以作为gc root?"/>
                                 <Link href="#两个对象相互引用会不会被GC？" title="两个对象相互引用会不会被GC？"/>

                        </Anchor>
                    </Col>
                </Row>


            </div>

        );
    }
}

export default ASK4;
