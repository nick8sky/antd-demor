import React, {Component} from 'react';
import {Anchor, Row, Col} from 'antd';
const {Link} = Anchor;


class ASK13 extends Component {

    s = "{";
    render() {

        return (
            <div>
                <Row>
                    <Col span={19}>
                        <h2 id="WATCH key [key ...]"><a href="javascript:void(0)" class="anchor">WATCH key [key ...]</a></h2>
                        <p>监视一个(或多个) key ，如果在事务执行之前这个(或这些) key 被其他命令所改动，那么事务将被打断。</p>
                        <pre><code>	WATCH mykey<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;val&nbsp;=&nbsp;GET&nbsp;mykey<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;val&nbsp;=&nbsp;val&nbsp;+&nbsp;1<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;MULTI<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;SET&nbsp;mykey&nbsp;$val<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;EXEC<br/>
</code></pre>
                        <p>代码在获取mykey的值之前先通过WATCH命令监控了该键，此后又将set命令包围在事务中，这样就可以有效的保证每个连接在执行EXEC之前，如果当前连接获取的mykey的值被其它连接的客户端修改，那么当前连接的EXEC命令将执行失败。这样调用者在判断返回值后就可以获悉val是否被重新设置成功。</p>
                        <p>&nbsp;</p>
                        <p>由于WATCH命令的作用只是当被监控的键值被修改后阻止之后一个事务的执行，而不能保证其他客户端不修改这一键值，所以在一般的情况下我们需要在EXEC执行失败后重新执行整个函数,类似CAS。</p>
                        <p>执行EXEC命令后会取消对键的监控，如果不想执行事务中的命令也可以使用UNWATCH命令来取消监控。</p>
                        <p>&nbsp;</p>
                        <h2 id="EXEC"><a href="javascript:void(0)" class="anchor">EXEC</a></h2>
                        <p>执行所有事务块内的命令。</p>
                        <p>假如某个(或某些) key 正处于 WATCH 命令的监视之下，且事务块中有和这个(或这些) key 相关的命令，那么 EXEC 命令只在这个(或这些) key 没有被其他命令所改动的情况下执行并生效，否则该事务被打断(abort)。</p>
                        <p>&nbsp;</p>
                        <h3 id="特别注意"><a href="javascript:void(0)" class="anchor">特别注意</a></h3>
                        <p>Redis的事务没有关系数据库事务提供的<strong>回滚（rollback）</strong>功能。为此开发者必须在事务执行出错后自己收拾剩下的摊子（将数据库复原回事务执行前的状态等,这里我们一般采取日志记录然后业务补偿的方式来处理，但是一般情况下，在redis做的操作不应该有这种强一致性要求的需求，我们认为这种需求为不合理的设计）。</p>
                        <p>&nbsp;</p>
                        <p>Redis 2.6.5之前的版本会忽略有语法错误的命令，然后执行事务中其他语法正确的命令。</p>
                        <p>如  1 0 1 1 (1表示正确执行，0表示异常)，EXEC命令会返回正确个结果：3) OK </p>
                        <p>之后的版本在遇到错误时，会抛出异常，但不会回滚，会返回异常信息，实际上已经执行了一条。</p>
                        <p>&nbsp;</p>
                        <p>使用散列类型的命令操作集合类型的键，这种错误在实际执行之前Redis是无法发现的，所以在事务里这样的命令是会被Redis接受并执行的。如果事务里的一条命令出现了运行错误，事务里其他的命令依然会继续执行（包括出错命令之后的命令）</p>
                        <pre><code>redis＞MULTI<br/>
OK<br/>
redis＞SET&nbsp;key&nbsp;1<br/>
QUEUED<br/>
redis＞SADD&nbsp;key&nbsp;2<br/>
QUEUED<br/>
redis＞SET&nbsp;key&nbsp;3<br/>
QUEUED<br/>
redis＞EXEC<br/>
1)&nbsp;OK<br/>
2)&nbsp;(error)&nbsp;ERR&nbsp;Operation&nbsp;against&nbsp;a&nbsp;key&nbsp;holding&nbsp;the&nbsp;wrong&nbsp;kind&nbsp;of&nbsp;value<br/>
3)&nbsp;OK<br/>
redis＞GET&nbsp;key<br/>
                            &quot;3&quot;<br/>
</code></pre>
                        <p>虽然SADD key 2出现了错误，但是SET key 3依然执行了。</p>
                        <p>&nbsp;</p>
                        <h2 id="实现一个hsetNX函数"><a href="javascript:void(0)" class="anchor">实现一个hsetNX函数</a></h2>
                        <p>我们实现的hsetNX这个功能是：仅当字段存在时才赋值。</p>
                        <p>为了避免竞态条件我们使用watch和事务来完成这一功能（伪代码）：</p>
                        <pre><code>    WATCH key  <br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;isFieldExists&nbsp;=&nbsp;HEXISTS&nbsp;key,&nbsp;field&nbsp;&nbsp;<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;if&nbsp;isFieldExists&nbsp;is&nbsp;1&nbsp;&nbsp;<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;MULTI&nbsp;&nbsp;<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;HSET&nbsp;key,&nbsp;field,&nbsp;value&nbsp;&nbsp;<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;EXEC&nbsp;&nbsp;<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;else&nbsp;&nbsp;<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;UNWATCH&nbsp;&nbsp;<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;return&nbsp;isFieldExists<br/>
</code></pre>
                        <p>在代码中会判断要赋值的字段是否存在，如果字段不存在的话就不执行事务中的命令，但需要使用UNWATCH命令来保证下一个事务的执行不会受到影响。</p>
                        <h2 id="SETNX"><a href="javascript:void(0)" class="anchor">SETNX</a></h2>
                        <p>将 key 的值设为 value ，当且仅当 key 不存在。</p>
                        <p>若给定的 <code>key</code> 已经存在，则 <a href='http://doc.redisfans.com/string/setnx.html#setnx'>SETNX</a> 不做任何动作。</p>
                        <p>SETNX 是『SET if Not eXists』(如果不存在，则 SET)的简写。</p>

                    </Col>
                    <Col span={1}>
                    </Col>
                    <Col span={4}>
                         <Anchor showInkInFixed="true">
                             <Link href="#WATCH key [key ...]" title="WATCH key [key ...]"/>
                             <Link href="#EXEC" title="EXEC">
                             <Link href="#特别注意" title="特别注意"/>
                         </Link>
                             <Link href="#实现一个hsetNX函数" title="实现一个hsetNX函数"/>
                             <Link href="#SETNX" title="SETNX"/>

                         </Anchor>
                    </Col>
                </Row>


            </div>

        );
    }
}

export default ASK13;
