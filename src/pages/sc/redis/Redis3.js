import React, {Component} from 'react';
import {Anchor, Row, Col} from 'antd';


const {Link} = Anchor;


class Redis3 extends Component {

    s = "{";
    render() {

        return (
            <div>
                <Row>
                    <Col span={19}>
                        <h2 id="RedisHA"><a href="javascript:void(0)" class="anchor">RedisHA</a></h2>
                        <h3 id="手动切换"><a href="javascript:void(0)" class="anchor">手动切换</a></h3>
                        <pre><code>6380 master<br/>
                        6381&nbsp;slave<br/>
                        6382&nbsp;slave<br/>
                        </code></pre>
                        <p>当Master挂机时，从Slave中选举出一个Redis服务切换成Master。杀掉6380服务的进程后，只剩6381和6382两个Slave了。在6381客户端上执行slaveof no one，在6382客户端上执行slaveof 127.0.0.1 6381。这样新的主从关系就建立了。</p>
                        <p><img src='http://img.blog.csdn.net/20130914211524265?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvZGNfNzI2/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast' alt='' /></p>
                        <p>如果原master恢复服务了，可以在原master上执行slaveof 127.0.0.1 6381，这样原master就变成现在slave了。</p>
                        <h3 id="自动切换 Sentinel"><a href="javascript:void(0)" class="anchor">自动切换 Sentinel</a></h3>
                        <p>首先启动三个Sentinel实例都去监听Master的状态。</p>
                        <p>sentinel.conf配置文件为：</p>
                        <pre><code>port 26379<br/>
                            sentinel&nbsp;monitormymaster&nbsp;127.0.0.1&nbsp;6380&nbsp;2<br/>
                            sentinel&nbsp;down-after-milliseconds&nbsp;mymaster&nbsp;30000<br/>
                            sentinel&nbsp;can-failover&nbsp;mymaster&nbsp;yes<br/>
                            sentinel&nbsp;parallel-syncs&nbsp;mymaster&nbsp;1<br/>
                            sentinel&nbsp;failover-timeout&nbsp;mymaster&nbsp;900000<br/>
                            </code></pre>
                        <p>另两个sentinel.conf配置除了port为26479和26579外，其他四项配置完全相同。</p>
                        <p>选举算法如下：</p>
                        <p>“每个sentinel实例都持有其他的sentinels信息，在Leader选举过程中(当为leader的sentinel实例失效时，有可能master server并没失效，注意分开理解)，sentinel实例将从所有的sentinels集合中去除“can-failover = no”和状态为SDOWN的sentinels，在剩余的sentinels列表中按照runid按照“字典”顺序排序后，取出runid最小的sentinel实例，并将它“投票选举”为Leader，并在其他sentinel发送的“is-master-down-by-addr”指令时将推选的runid追加到响应中。每个sentinel实例都会检测“is-master-down-by-addr”的响应结果，如果“投票选举”的leader为自己，且状态正常的sentinels实例中，“赞同者”的自己的sentinel个数不小于(&gt;=) 50% + 1,且不小与&lt;quorum>，那么此sentinel就会认为选举成功且leader为自己。</p>
                        <p>在sentinel.conf文件中，我们期望有足够多的sentinel实例配置“can-failoveryes”，这样能够确保当leader失效时，能够选举某个sentinel为leader，以便进行failover。如果leader无法产生，比如较少的sentinels实例有效，那么failover过程将无法继续。</p>
                        <p>在Leader触发failover之前，首先wait数秒(随即0~5)，以便让其他sentinel实例准备和调整(有可能多个leader??),如果一切正常，那么leader就需要开始将一个salve提升为master，此slave必须为状态良好(不能处于SDOWN/ODOWN状态)且权重值最低(redis.conf中)的，当master身份被确认后，开始failover”。</p>
                        <p>可以看到三个Sentinel都监听到Master和Slave，并且三者之间也建立了通信。</p>
                        <p><img src='http://img.blog.csdn.net/20130914211701406?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvZGNfNzI2/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast' alt='' /></p>
                        <p>现在手动杀掉6380进程，可以看到三个Sentinel实例都监测到了Master挂掉，并通过投票选举出新的Master。</p>
                        <p><img src='http://img.blog.csdn.net/20130914211639359?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvZGNfNzI2/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast' alt='' /></p>
                        <p>第一个Sentinel的详细输出如下：</p>
                        <pre><code>[19247] 11 Sep 21:29:37.321 * +sentinelsentinel 127.0.0.1:26479 127.0.0.1 26479 @ mymaster 127.0.0.1 6380<br/>
                        [19247]&nbsp;11&nbsp;Sep&nbsp;21:29:56.603&nbsp;*&nbsp;+sentinelsentinel&nbsp;127.0.0.1:26579&nbsp;127.0.0.1&nbsp;26579&nbsp;@&nbsp;mymaster&nbsp;127.0.0.1&nbsp;6380<br/>
                        [19247]&nbsp;11&nbsp;Sep&nbsp;21:31:50.737&nbsp;#&nbsp;+sdown&nbsp;mastermymaster&nbsp;127.0.0.1&nbsp;6380<br/>
                        [19247]&nbsp;11&nbsp;Sep&nbsp;21:31:50.938&nbsp;#&nbsp;+odown&nbsp;mastermymaster&nbsp;127.0.0.1&nbsp;6380&nbsp;#quorum&nbsp;3/2<br/>
                        [19247]&nbsp;11&nbsp;Sep&nbsp;21:31:51.041&nbsp;#+failover-triggered&nbsp;master&nbsp;mymaster&nbsp;127.0.0.1&nbsp;6380<br/>
                        [19247]&nbsp;11&nbsp;Sep&nbsp;21:31:51.041&nbsp;#&nbsp;+failover-state-wait-startmaster&nbsp;mymaster&nbsp;127.0.0.1&nbsp;6380&nbsp;#starting&nbsp;in&nbsp;7113&nbsp;milliseconds<br/>
                        [19247]&nbsp;11&nbsp;Sep&nbsp;21:31:58.200&nbsp;#+failover-state-select-slave&nbsp;master&nbsp;mymaster&nbsp;127.0.0.1&nbsp;6380<br/>
                        [19247]&nbsp;11&nbsp;Sep&nbsp;21:31:58.301&nbsp;#+selected-slave&nbsp;slave&nbsp;127.0.0.1:6382&nbsp;127.0.0.1&nbsp;6382&nbsp;@&nbsp;mymaster&nbsp;127.0.0.1&nbsp;6380<br/>
                        [19247]&nbsp;11&nbsp;Sep&nbsp;21:31:58.301&nbsp;*+failover-state-send-slaveof-noone&nbsp;slave&nbsp;127.0.0.1:6382&nbsp;127.0.0.1&nbsp;6382&nbsp;@mymaster&nbsp;127.0.0.1&nbsp;6380<br/>
                        [19247]&nbsp;11&nbsp;Sep&nbsp;21:31:58.403&nbsp;*+failover-state-wait-promotion&nbsp;slave&nbsp;127.0.0.1:6382&nbsp;127.0.0.1&nbsp;6382&nbsp;@&nbsp;mymaster127.0.0.1&nbsp;6380<br/>
                        [19247]&nbsp;11&nbsp;Sep&nbsp;21:31:59.011&nbsp;#+promoted-slave&nbsp;slave&nbsp;127.0.0.1:6382&nbsp;127.0.0.1&nbsp;6382&nbsp;@&nbsp;mymaster&nbsp;127.0.0.1&nbsp;6380<br/>
                        [19247]&nbsp;11&nbsp;Sep&nbsp;21:31:59.011&nbsp;#+failover-state-reconf-slaves&nbsp;master&nbsp;mymaster&nbsp;127.0.0.1&nbsp;6380<br/>
                        [19247]&nbsp;11&nbsp;Sep&nbsp;21:31:59.111&nbsp;*&nbsp;+slave-reconf-sentslave&nbsp;127.0.0.1:6381&nbsp;127.0.0.1&nbsp;6381&nbsp;@&nbsp;mymaster&nbsp;127.0.0.1&nbsp;6380<br/>
                        [19247]&nbsp;11&nbsp;Sep&nbsp;21:32:00.019&nbsp;*+slave-reconf-inprog&nbsp;slave&nbsp;127.0.0.1:6381&nbsp;127.0.0.1&nbsp;6381&nbsp;@&nbsp;mymaster&nbsp;127.0.0.16380<br/>
                        [19247]&nbsp;11&nbsp;Sep&nbsp;21:32:00.019&nbsp;*+slave-reconf-done&nbsp;slave&nbsp;127.0.0.1:6381&nbsp;127.0.0.1&nbsp;6381&nbsp;@&nbsp;mymaster&nbsp;127.0.0.16380<br/>
                        [19247]&nbsp;11&nbsp;Sep&nbsp;21:32:00.117&nbsp;#&nbsp;+failover-endmaster&nbsp;mymaster&nbsp;127.0.0.1&nbsp;6380<br/>
                        [19247]&nbsp;11&nbsp;Sep&nbsp;21:32:00.117&nbsp;#+switch-master&nbsp;mymaster&nbsp;127.0.0.1&nbsp;6380&nbsp;127.0.0.1&nbsp;6382<br/>
                        [19247]&nbsp;11&nbsp;Sep&nbsp;21:32:00.219&nbsp;*&nbsp;+slave&nbsp;slave127.0.0.1:6381&nbsp;127.0.0.1&nbsp;6381&nbsp;@&nbsp;mymaster&nbsp;127.0.0.1&nbsp;6382<br/>
                        [19247]&nbsp;11&nbsp;Sep&nbsp;21:32:00.828&nbsp;*&nbsp;+sentinelsentinel&nbsp;127.0.0.1:26579&nbsp;127.0.0.1&nbsp;26579&nbsp;@&nbsp;mymaster&nbsp;127.0.0.1&nbsp;6382<br/>
                        [19247]&nbsp;11&nbsp;Sep&nbsp;21:32:01.029&nbsp;*&nbsp;+sentinelsentinel&nbsp;127.0.0.1:26479&nbsp;127.0.0.1&nbsp;26479&nbsp;@&nbsp;mymaster&nbsp;127.0.0.1&nbsp;6382<br/>
                        </code></pre>
                        <p>现在操作新Master 6382保存键值对，就可以同步到6381了。</p>
                        <p>&nbsp;</p>
                        <h3 id="通过哨兵查看集群的信息："><a href="javascript:void(0)" class="anchor">通过哨兵查看集群的信息：</a></h3>
                        <pre><code>$ redis-cli -p 26379<br/>
                        sentinel&nbsp;master&nbsp;mymaster//查看master的状态&nbsp;<br/>
                        SENTINEL&nbsp;slaves&nbsp;mymaster&nbsp;//查看salves的状态<br/>
                        SENTINEL&nbsp;sentinels&nbsp;mymaster&nbsp;//查看哨兵的状态<br/>
                        SENTINEL&nbsp;get-master-addr-by-name&nbsp;mymaster//获取当前master的地址<br/>
                        info&nbsp;sentinel//查看哨兵信息<br/>
                        </code></pre>
                        <p>&nbsp;</p>
                        <h3 id="Spring boot集成Sentinel Redis"><a href="javascript:void(0)" class="anchor">Spring boot集成Sentinel Redis</a></h3>
                        <p>properties配置文件中添加配置信息：</p>
                        <pre><code>spring.redis.database=0  <br/>
                        spring.redis.password=123456&nbsp;&nbsp;<br/>
                            &nbsp;&nbsp;<br/>
                        #&nbsp;pool&nbsp;settings&nbsp;...池配置&nbsp;&nbsp;&nbsp;&nbsp;<br/>
                        spring.redis.pool.max-idle=8&nbsp;&nbsp;&nbsp;&nbsp;<br/>
                        spring.redis.pool.min-idle=0&nbsp;&nbsp;&nbsp;&nbsp;<br/>
                        spring.redis.pool.max-active=8&nbsp;&nbsp;&nbsp;&nbsp;<br/>
                        spring.redis.pool.max-wait=-1&nbsp;&nbsp;&nbsp;<br/>
                                                    &nbsp;&nbsp;<br/>
                        #哨兵监听redis&nbsp;server名称&nbsp;&nbsp;<br/>
                        spring.redis.sentinel.master=mymaster&nbsp;&nbsp;<br/>
                        #哨兵的配置列表&nbsp;&nbsp;<br/>
                        spring.redis.sentinel.nodes=192.168.12.194:26379,192.168.12.194:36379,192.168.12.194:46379&nbsp;<br/>
                        </code></pre>
                        <h3 id="Springboot整合redisCluster集群"><a href="javascript:void(0)" class="anchor">Springboot整合redisCluster集群</a></h3>
                        <pre><code>spring:<br/>
                            &nbsp;&nbsp;redis:<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;cluster:<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;nodes:&nbsp;10.0.19.67:6379,10.0.19.68:6379,10.0.19.82:6379,10.0.19.83:6379<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;testOnReturn:&nbsp;true<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;maxIdle:&nbsp;10<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;minIdle:&nbsp;2<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;maxWaitMills:&nbsp;3000<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;testOnBorrow:&nbsp;true<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;maxTotal:&nbsp;4<br/>
                        </code></pre>
                        <p>使用RedisTemplate</p>
                        <pre><code>@Test  <br/>
                            public&nbsp;void&nbsp;redisTest()&nbsp;{this.s}&nbsp;&nbsp;<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;String&nbsp;key&nbsp;=&nbsp;&quot;redisTestKey&quot;;&nbsp;&nbsp;<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;String&nbsp;value&nbsp;=&nbsp;&quot;I&nbsp;am&nbsp;test&nbsp;value&quot;;&nbsp;&nbsp;<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;ValueOperations&lt;String,&nbsp;String&gt;&nbsp;opsForValue&nbsp;=&nbsp;redisTemplate.opsForValue();&nbsp;&nbsp;<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;//数据插入测试：&nbsp;&nbsp;<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;opsForValue.set(key,&nbsp;value);&nbsp;&nbsp;<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;String&nbsp;valueFromRedis&nbsp;=&nbsp;opsForValue.get(key);&nbsp;&nbsp;<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;logger.info(&quot;redis&nbsp;value&nbsp;after&nbsp;set:&nbsp;{this.s}}&quot;,&nbsp;valueFromRedis);&nbsp;&nbsp;<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;assertThat(valueFromRedis,&nbsp;is(value));&nbsp;&nbsp;<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;//数据删除测试：&nbsp;&nbsp;<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;redisTemplate.delete(key);&nbsp;&nbsp;<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;valueFromRedis&nbsp;=&nbsp;opsForValue.get(key);&nbsp;&nbsp;<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;logger.info(&quot;redis&nbsp;value&nbsp;after&nbsp;delete:&nbsp;{this.s}}&quot;,&nbsp;valueFromRedis);&nbsp;&nbsp;<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;assertThat(valueFromRedis,&nbsp;equalTo(null));&nbsp;&nbsp;<br/>
                            }&nbsp;&nbsp;<br/>
                            </code></pre>

                    </Col>
                    <Col span={1}>
                    </Col>
                    <Col span={4}>
                        <Anchor showInkInFixed="true">
                            <Link href="#RedisHA" title="RedisHA">
                                <Link href="#手动切换" title="手动切换"/>
                                <Link href="#自动切换 Sentinel" title="自动切换 Sentinel"/>
                                <Link href="#通过哨兵查看集群的信息：" title="通过哨兵查看集群的信息："/>
                                <Link href="#Spring boot集成Sentinel Redis" title="Spring boot集成Sentinel Redis"/>
                                <Link href="#Springboot整合redisCluster集群" title="Springboot整合redisCluster集群"/>
                            </Link>
                        </Anchor>
                    </Col>
                </Row>


            </div>

        );
    }
}

export default Redis3;
