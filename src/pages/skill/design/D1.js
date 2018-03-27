import React, {Component} from 'react';
import {Anchor, Row, Col} from 'antd';


const {Link} = Anchor;


class ASK1 extends Component {

    s = "{";
    render() {

        return (
            <div>
                <Row>
                    <Col span={19}>
                        <h2 id="系统的拆分改造实践"><a href="javascript:void(0)" class="anchor">系统的拆分改造实践</a></h2>
                        <p>参考：<a href='http://www.cnblogs.com/LBSer/p/6195309.html' target='_blank' >http://www.cnblogs.com/LBSer/p/6195309.html</a></p>
                        <h3 id="为什么要拆分？"><a href="javascript:void(0)" class="anchor">为什么要拆分？</a></h3>
                        <p>先看一段对话：</p>
                        <p><img src='https://gitee.com/nick070809/pics/raw/master/skill/13.png' alt='' /></p>
                        <p>从上面对话可以看出拆分的理由：</p>
                        <p>1、耦合太严重，一个系统通常由多人共同开发，a开发人员为了实现某个功能，在公共方法上添加了一段if else;b开发人员看见不能适应他的应用，又添加了一段代码，直到有一天a调到了b，a很郁闷，结果发现本来我的代码走完了，接着跑了b的代码，找b大大的理论一番。最后面红耳赤，不欢而散。</p>
                        <p>2、扩展(业务/系统)太难，不知道本次添加的一段代码，对以后会产生什么样的坏影响。</p>
                        <h3 id="多维度把握业务复杂度"><a href="javascript:void(0)" class="anchor">多维度把握业务复杂度</a></h3>
                        <p>我们最期望的理想情况是第一种关系（车辆与人），业务觉得不合适，可以马上换一辆新的。但现实的情况是更像心脏起搏器与人之间的关系，不是说换就能换。一个系统接的业务越多，耦合越紧密。如果在没有真正把握住业务复杂度之前贸然行动，最终的结局就是把心脏带飞。</p>
                        <p>如何把握住业务复杂度？需要多维度的思考、实践。</p>
                        <p>一个是技术层面，通过与pd以及开发的讨论，熟悉现有各个应用的领域模型，以及优缺点，这种讨论只能让人有个大概，更多的细节如代码、架构等需要通过做需求、改造、优化这些实践来掌握。</p>
                        <p>各个应用熟悉之后，需要从系统层面来构思，我们想打造平台型的产品，那么最重要也是最难的一点就是功能集中管控，打破各个应用的业务小闭环，统一收拢，这个决心更多的是开发、产品、业务方、各个团队之间达成的共识，“按照业务或者客户需求组织资源”。</p>
                        <p>此外也要与业务方保持功能沟通、计划沟通，确保应用拆分出来后符合使用需求、扩展需求，获取他们的支持。</p>
                        <p>&nbsp;</p>
                        <h3 id="定义边界，原则：高内聚，低耦合，单一职责"><a href="javascript:void(0)" class="anchor">定义边界，原则：高内聚，低耦合，单一职责</a></h3>
                        <p>业务复杂度把握后，需要开始定义各个应用的服务边界。怎么才算是好的边界？像葫芦娃兄弟一样的应用就是好的！</p>
                        <p>举个例子，葫芦娃兄弟（应用）间的技能是相互独立的，遵循单一职责原则，比如水娃只能喷水，火娃只会喷火，隐形娃不会喷水喷火但能隐身。更为关键的是，葫芦娃兄弟最终可以合体为金刚葫芦娃，即这些应用虽然功能彼此独立，但又相互打通，最后合体在一起就成了我们的平台。</p>
                        <p>这里很多人会有疑惑，拆分粒度怎么控制？很难有一个明确的结论，只能说是结合业务场景、目标、进度的一个折中。但总体的原则是先从一个大的服务边界开始，不要太细，因为随着架构、业务的演进，应用自然而然会再次拆分，让正确的事情自然发生才最合理。</p>
                        <h3 id="确定拆分后的应用目标"><a href="javascript:void(0)" class="anchor">确定拆分后的应用目标</a></h3>
                        <p>一旦系统的宏观应用拆分图出来后，就要落实到某一具体的应用拆分上了。</p>
                        <p>首先要确定的就是某一应用拆分后的目标。拆分优化是没有底的，可能越做越深，越做越没结果，继而又影响自己和团队的士气。比如说可以定这期的目标就是将db、应用分拆出去，数据模型的重新设计可以在第二期。</p>
                        <h3 id="当前架构状态、代码情况、依赖状况，可能异常。"><a href="javascript:void(0)" class="anchor">当前架构状态、代码情况、依赖状况，可能异常。</a></h3>
                        <p>动手前的思考成本远远低于动手后遇到问题的解决成本。应用拆分最怕的是中途说“他*的，这块不能动，原来当时这样设计是有原因的，得想别的路子！”这时的压力可想而知，整个节奏不符合预期后，很可能会接二连三遇到同样的问题，这时不仅同事们士气下降，自己也会丧失信心，继而可能导致拆分失败。</p>
                        <h3 id="给自己留个锦囊，“有备无患”。"><a href="javascript:void(0)" class="anchor">给自己留个锦囊，“有备无患”。</a></h3>
                        <p>锦囊就四个字“有备无患”，可以贴在桌面或者手机上。在以后具体实施过程中，多思考下“方案是否有多种可以选择？复杂问题能否拆解？实际操作时是否有预案？”，应用拆分在具体实践过程中比拼得就是细致二字，多一份方案，多一份预案，不仅能提升成功概率，更给自己信心。</p>
                        <p>&nbsp;</p>
                        <p>如：</p>
                        <h2 id="DB拆分"><a href="javascript:void(0)" class="anchor">DB拆分</a></h2>
                        <p>DB拆分在整个应用拆分环节里最复杂，分为垂直拆分和水平拆分两种场景，我们都遇到了。垂直拆分是将库里的各个表拆分到合适的数据库中。比如一个库中既有消息表，又有人员组织结构表，那么将这两个表拆分到独立的数据库中更合适。</p>
                        <p>水平拆分：以消息表为例好了，单表突破了千万行记录，查询效率较低，这时候就要将其分库分表。</p>
                        <p><img src='https://gitee.com/nick070809/pics/raw/master/skill/14.png' alt='' /></p>
                        <h3 id="主键id接入全局id发生器"><a href="javascript:void(0)" class="anchor">主键id接入全局id发生器</a></h3>
                        <p>DB拆分的第一件事情就是使用全局id发生器来生成各个表的主键id。为什么？</p>
                        <p> 很明显就是如果都使用表/库的自增主键，在以后合并数据时会出现问题。</p>
                        <p>这里有几种全局唯一id生成方法可以选择。</p>
                        <p>1）snowflake：（twitter非全局递增,基于该方法使用redis生产全局主键）</p>
                        <p>2）mysql新建一张表用来专门生成全局唯一id（利用auto_increment功能）（全局递增）；</p>
                        <p>3）依靠分表的个数，每次递增表个数，也能实现全局唯一。</p>
                        <p>4）uuid</p>
                        <p>5) 时间戳+ snowflake</p>
                        <p>6)时间戳+业务标识+ snowflake</p>
                        <p>6)库id+表id+ snowflake</p>
                        <h3 id="数据迁移"><a href="javascript:void(0)" class="anchor">数据迁移</a></h3>
                        <p>1、历史数据迁移(可能会漏数据，迁移前需要统计时间节点的条数)</p>
                        <p>2、添加索引</p>
                        <p>3、同步数据迁移(开启binlog)</p>
                        <h3 id="联表查询sql改造"><a href="javascript:void(0)" class="anchor">联表查询sql改造</a></h3>
                        <p>如果将B表拆分到另一个库里的话，这个sql怎么办？毕竟跨库联表查询是不支持的！因此，在切库之前，需要将系统中上百个联表查询的sql改造完毕。</p>
                        <p><img src='https://gitee.com/nick070809/pics/raw/master/skill/15.png' alt='' /></p>
                        <h4 id="1、业务避免"><a href="javascript:void(0)" class="anchor">1、业务避免</a></h4>
                        <p>业务上松耦合后技术才能松耦合，继而避免联表sql。但短期内不现实，需要时间沉淀；</p>
                        <h4 id="2、全局表"><a href="javascript:void(0)" class="anchor">2、全局表</a></h4>
                        <p>每个库里都冗余一份表，缺点：等于没有拆分，而且很多场景不现实，表结构变更麻烦；</p>
                        <h4 id="3、冗余表"><a href="javascript:void(0)" class="anchor">3、冗余表</a></h4>
                        <p>在mycat的设计中，一张关联关系表，如订单，用户，用户-订单；我们可以把 用户-订单 这张表分别在用户库和订单库中存一份，可能这张冗余表不只包含用户id,订单id,可能还包括用户名称，商品名称；这样的可能会使用较多的数据。</p>
                        <p>在用户库中就能知道买了什么商品，在订单库也能知道用户名称，从而减少rpc调度。</p>
                        <h4 id="4、内存拼接"><a href="javascript:void(0)" class="anchor">4、内存拼接</a></h4>
                        <p><img src='https://gitee.com/nick070809/pics/raw/master/skill/16.png' alt='' /></p>
                        <p>4.1、通过RPC调用来获取另一张表的数据，然后再内存拼接。</p>
                        <p>	1、适合job类的sql，或改造后RPC查询量较少的sql；</p>
                        <p>	2、不适合大数据量的实时查询sql。假设10000个ID，分页RPC查询，每次查100个，需要5ms，共需要500ms，rt太高。</p>
                        <p>4.2、本地缓存另一张表的数据</p>
                        <p><img src='https://gitee.com/nick070809/pics/raw/master/skill/17.png' alt='' /></p>
                        <p>适合数据变化不大、数据量查询大、接口性能稳定性要求高的sql。</p>
                        <p>改进，使用共用缓存，如redis,当数据发生改变时，清除redis上的key,下次查询时从库获取后放在redis上。</p>
                        <h3 id="切库方案设计与实现"><a href="javascript:void(0)" class="anchor">切库方案设计与实现</a></h3>
                        <h4 id="DB停写"><a href="javascript:void(0)" class="anchor">DB停写</a></h4>
                        <p><img src='https://gitee.com/nick070809/pics/raw/master/skill/18.png' alt='' /></p>
                        <p><strong>优点</strong>：快，成本低；</p>
                        <p><strong>缺点：</strong></p>
                        <p>1）如果要回滚得联系DBA执行线上停写操作，风险高，因为有可能在业务高峰期回滚；</p>
                        <p>2）只有一处地方校验，出问题的概率高，回滚的概率高</p>
                        <p>举个例子，如果面对的是比较复杂的业务迁移，那么很可能发生如下情况导致回滚：</p>
                        <p>sql联表查询改造不完全；</p>
                        <p>sql联表查询改错&amp;性能问题；</p>
                        <p>索引漏加导致性能问题；</p>
                        <p>字符集问题</p>
                        <p>此外，binlog逆向回流很可能发生字符集问题（utf8mb4到gbk），导致回流失败。这些binlog同步工具为了保证强最终一致性，一旦某条记录回流失败，就卡住不同步，继而导致新老表的数据不同步，继而无法回滚！</p>
                        <h4 id="双写方案"><a href="javascript:void(0)" class="anchor">双写方案</a></h4>
                        <p><img src='https://gitee.com/nick070809/pics/raw/master/skill/19.png' alt='' /></p>
                        <p>第2步“打开双写开关，先写老表A再写新表B”，这时候确保写B表时try catch住，异常要用很明确的标识打出来，方便排查问题。第2步双写持续短暂时间后（比如半分钟后），可以关闭binlog同步任务。</p>
                        <p><strong>优点：</strong></p>
                        <p>1）将复杂任务分解为一系列可测小任务，步步为赢；</p>
                        <p>2）线上不停服，回滚容易；</p>
                        <p>3）字符集问题影响小</p>
                        <p><strong>缺点：</strong></p>
                        <p>1）流程步骤多，周期长；</p>
                        <p>2）双写造成RT增加</p>
                        <h3 id="拆分后一致性怎么保证？"><a href="javascript:void(0)" class="anchor">拆分后一致性怎么保证？</a></h3>
                        <p>以前很多表都在一个数据库内，使用事务非常方便，现在拆分出去了，如何保证一致性？</p>
                        <p><strong>1）分布式事务</strong></p>
                        <p>	性能较差，几乎不考虑。</p>
                        <p>2）消息机制补偿</p>
                        <p>	使用用消息系统避免分布式事务 </p>
                        <p><strong>3）定时任务补偿</strong></p>
                        <p>	用得较多，实现最终一致，分为加数据补偿，删数据补偿两种。</p>
                        <p>&nbsp;</p>
                        <h2 id="如何用消息系统避免分布式事务？"><a href="javascript:void(0)" class="anchor">如何用消息系统避免分布式事务？</a></h2>
                        <p>参考：<a href='http://www.cnblogs.com/LBSer/p/4715395.html' target='_blank' >http://www.cnblogs.com/LBSer/p/4715395.html</a></p>
                        <p>	如从支付宝转账1万块钱到余额宝，支付宝扣除1万之后，如果系统挂掉怎么办，这时余额宝账户并没有增加1万，数据就会出现不一致状况了。</p>
                        <p>　　上述场景在各个类型的系统中都能找到相似影子，比如在电商系统中，当有用户下单后，除了在订单表插入一条记录外，对应商品表的这个商品数量必须减1吧，怎么保证？！在搜索广告系统中，当用户点击某广告后，除了在点击事件表中增加一条记录外，还得去商家账户表中找到这个商家并扣除广告费吧，怎么保证？！等等，相信大家或多或多少都能碰到相似情景。</p>
                        <p>　　这些问题本质上都可以抽象为：当一个表数据更新后，怎么保证另一个表的数据也必须要更新成功。</p>
                        <h3 id="本地事务"><a href="javascript:void(0)" class="anchor">本地事务</a></h3>
                        <p>　　还是以支付宝转账余额宝为例，假设有</p>
                        <p>　　支付宝账户表：A（id，userId，amount）　　</p>
                        <p>　　余额宝账户表：B（id，userId，amount）</p>
                        <p>　　用户的userId=1；</p>
                        <p>　　从支付宝转账1万块钱到余额宝的动作分为两步：</p>
                        <p>　　1）支付宝表扣除1万：update A set amount=amount-10000 where userId=1;</p>
                        <p>　　2）余额宝表增加1万：update B set amount=amount+10000 where userId=1;</p>
                        <p>　　如何确保支付宝余额宝收支平衡呢？有人说这个很简单嘛，可以用事务解决</p>
                        <pre><code>Begin transaction<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;update&nbsp;A&nbsp;set&nbsp;amount=amount-10000&nbsp;where&nbsp;userId=1;<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;update&nbsp;B&nbsp;set&nbsp;amount=amount+10000&nbsp;where&nbsp;userId=1;<br/>
End&nbsp;transaction<br/>
commit;<br/>
</code></pre>
                        <p>非常正确！如果你使用spring的话一个注解就能搞定上述事务功能。</p>
                        <pre><code>@Transactional(rollbackFor=Exception.class)<br/>
public&nbsp;void&nbsp;update()&nbsp;{this.s}<br/>
	updateATable();&nbsp;//更新A表<br/>
	updateBTable();&nbsp;//更新B表<br/>
}<br/>
</code></pre>
                        <p>　　如果系统规模较小，数据表都在一个数据库实例上，上述本地事务方式可以很好地运行，但是如果系统规模较大，比如支付宝账户表和余额宝账户表显然不会在同一个数据库实例上，他们往往分布在不同的物理节点上，这时本地事务已经失去用武之地。</p>
                        <p>　　既然本地事务失效，分布式事务自然就登上舞台。</p>
                        <h3 id="分布式事务—两阶段提交协议"><a href="javascript:void(0)" class="anchor">分布式事务—两阶段提交协议</a></h3>
                        <p>	两阶段提交协议（Two-phase Commit，2PC）经常被用来实现分布式事务。一般分为协调器C和若干事务执行者Si两种角色，这里的事务执行者就是具体的数据库，协调器可以和事务执行器在一台机器上。</p>
                        <p><img src='https://gitee.com/nick070809/pics/raw/master/skill/20.png' alt='' /></p>
                        <p>　1） 我们的应用程序（client）发起一个开始请求到TC；</p>
                        <p>　　2） TC先将&gt;prepare>消息写到本地日志，之后向所有的Si发起&gt;prepare>消息。以支付宝转账到余额宝为例，TC给A的prepare消息是通知支付宝数据库相应账目扣款1万，TC给B的prepare消息是通知余额宝数据库相应账目增加1w。为什么在执行任务前需要先写本地日志，主要是为了故障后恢复用，本地日志起到现实生活中凭证 的效果，如果没有本地日志（凭证），容易死无对证；</p>
                        <p>　　3） Si收到&gt;prepare>消息后，执行具体本机事务，但不会进行commit，如果成功返回&gt;yes>，不成功返回&gt;no>。同理，返回前都应把要返回的消息写到日志里，当作凭证。</p>
                        <p>　　4） TC收集所有执行器返回的消息，如果所有执行器都返回yes，那么给所有执行器发生送commit消息，执行器收到commit后执行本地事务的commit操作；如果有任一个执行器返回no，那么给所有执行器发送abort消息，执行器收到abort消息后执行事务abort操作。</p>
                        <p>　　注：TC或Si把发送或接收到的消息先写到日志里，主要是为了故障后恢复用。如某一Si从故障中恢复后，先检查本机的日志，如果已收到&gt;commit >，则提交，如果&gt;abort >则回滚。如果是&gt;yes>，则再向TC询问一下，确定下一步。如果什么都没有，则很可能在&gt;prepare>阶段Si就崩溃了，因此需要回滚。</p>
                        <p>　　现如今实现基于两阶段提交的分布式事务也没那么困难了，如果使用java，那么可以使用开源软件atomikos(<a href='http://www.atomikos.com/' target='_blank' >http://www.atomikos.com/</a>)来快速实现。</p>
                        <p>　　不过但凡使用过的上述两阶段提交的同学都可以发现性能实在是太差，根本不适合高并发的系统。为什么？</p>
                        <p>　　1）两阶段提交涉及多次节点间的网络通信，通信时间太长！</p>
                        <p>　　2）事务时间相对于变长了，锁定的资源的时间也变长了，造成资源等待时间也增加好多！</p>
                        <p>　　正是由于分布式事务存在很严重的性能问题，大部分高并发服务都在避免使用，往往通过其他途径来解决数据一致性问题。</p>
                        <h3 id="使用消息队列来避免分布式事务"><a href="javascript:void(0)" class="anchor">使用消息队列来避免分布式事务</a></h3>
                        <p>	如果仔细观察生活的话，生活的很多场景已经给了我们提示。</p>
                        <p>　　比如在北京很有名的姚记炒肝点了炒肝并付了钱后，他们并不会直接把你点的炒肝给你，往往是给你一张小票，然后让你拿着小票到出货区排队去取。为什么他们要将付钱和取货两个动作分开呢？原因很多，其中一个很重要的原因是为了使他们接待能力增强（并发量更高）。</p>
                        <p>　　还是回到我们的问题，只要这张小票在，你最终是能拿到炒肝的。同理转账服务也是如此，当支付宝账户扣除1万后，我们只要生成一个凭证（消息）即可，这个凭证（消息）上写着“让余额宝账户增加 1万”，只要这个凭证（消息）能可靠保存，我们最终是可以拿着这个凭证（消息）让余额宝账户增加1万的，即我们能依靠这个凭证（消息）完成最终一致性。</p>
                        <p>&nbsp;</p>
                        <h3 id="如何可靠保存凭证（消息）"><a href="javascript:void(0)" class="anchor">如何可靠保存凭证（消息）</a></h3>
                        <h4 id="业务与消息耦合"><a href="javascript:void(0)" class="anchor">业务与消息耦合</a></h4>
                        <p>支付宝在完成扣款的同时，同时记录消息数据，这个消息数据与业务数据保存在同一数据库实例里（消息记录表表名为message）；</p>
                        <pre><code>Begin transaction<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;update&nbsp;A&nbsp;set&nbsp;amount=amount-10000&nbsp;where&nbsp;userId=1;<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;insert&nbsp;into&nbsp;message(userId,&nbsp;amount,status)&nbsp;values(1,&nbsp;10000,&nbsp;1);<br/>
End&nbsp;transaction<br/>
commit;<br/>
</code></pre>
                        <p>	上述事务能保证只要支付宝账户里被扣了钱，消息一定能保存下来。</p>
                        <p>　　当上述事务提交成功后，我们通过实时消息服务将此消息通知余额宝，余额宝处理成功后发送回复成功消息，支付宝收到回复后删除该条消息数据。</p>
                        <h4 id="业务与消息解耦"><a href="javascript:void(0)" class="anchor">业务与消息解耦</a></h4>
                        <p>	上述保存消息的方式使得消息数据和业务数据紧耦合在一起，从架构上看不够优雅，而且容易诱发其他问题。为了解耦，可以采用以下方式。</p>
                        <p>　　1）支付宝在扣款事务提交之前，向实时消息服务请求发送消息，实时消息服务只记录消息数据，而不真正发送，只有消息发送成功后才会提交事务；</p>
                        <p>　　2）当支付宝扣款事务被提交成功后，向实时消息服务确认发送。只有在得到确认发送指令后，实时消息服务才真正发送该消息；</p>
                        <p>　　3）当支付宝扣款事务提交失败回滚后，向实时消息服务取消发送。在得到取消发送指令后，该消息将不会被发送；</p>
                        <p>　　4）对于那些未确认的消息或者取消的消息，需要有一个消息状态确认系统定时去支付宝系统查询这个消息的状态并进行更新。为什么需要这一步骤，举个例子：假设在第2步支付宝扣款事务被成功提交后，系统挂了，此时消息状态并未被更新为“确认发送”，从而导致消息不能被发送。</p>
                        <p>　　优点：消息数据独立存储，降低业务系统与消息系统间的耦合；</p>
                        <p>　　缺点：一次消息发送需要两次请求；业务处理服务需要实现消息状态回查接口。</p>
                        <p>解决的问题：比如一个事务中有更新操作和发送消息(kafka)，sql执行成功未提交，消息发送成功，此时机器挂了，则sql未提交，消息发出去了，则造成a扣款失败，b加款成功。如果是解耦方式，其实是2次commit过程：</p>
                        <p>1、先执行发送消息，执行成功</p>
                        <p>2、执行sql，sql执行成功</p>
                        <p>3、提交sql，提交成功</p>
                        <p>4、提交发送消息，发送成功；</p>
                        <p><strong>这是没有异常的情况，如果sql没有提交成功，直接取消发送消息。如果sql执行成功，而提交消息失败了，需要系统去扫描未发送的消息，来判断是否需要启动发送。</strong>这样的处理比耦合(kafka)更可靠。</p>
                        <p>&nbsp;</p>
                        <h3 id="如何解决消息重复投递的问题"><a href="javascript:void(0)" class="anchor">如何解决消息重复投递的问题</a></h3>
                        <p>	还有一个很严重的问题就是消息重复投递，以我们支付宝转账到余额宝为例，如果相同的消息被重复投递两次，那么我们余额宝账户将会增加2万而不是1万了。</p>
                        <p>　　为什么相同的消息会被重复投递？比如余额宝处理完消息msg后，发送了处理成功的消息给支付宝，正常情况下支付宝应该要删除消息msg，但如果支付宝这时候悲剧的挂了，重启后一看消息msg还在，就会继续发送消息msg。</p>
                        <p>　　解决方法很简单，就是做幂等性校验。每次来一个消息，在执行之前，先去消息应用状态表中查询一遍，如果找到说明是重复消息，丢弃即可，如果没找到才执行。</p>
                    </Col>
                    <Col span={1}>
                    </Col>
                    <Col span={4}>
                        <Anchor showInkInFixed="true">
                            <Link href="#系统的拆分改造实践" title="系统的拆分改造实践">
                                <Link href="#为什么要拆分？" title="为什么要拆分？"/>
                                <Link href="#多维度把握业务复杂度" title="多维度把握业务复杂度"/>
                                <Link href="#定义边界，原则：高内聚，低耦合，单一职责" title="定义边界，原则：高内聚，低耦合，单一职责"/>
                                <Link href="#确定拆分后的应用目标" title="确定拆分后的应用目标"/>
                                <Link href="#当前架构状态、代码情况、依赖状况，可能异常。" title="当前架构状态、代码情况、依赖状况，可能异常。"/>
                                <Link href="#给自己留个锦囊，“有备无患”。" title="给自己留个锦囊，“有备无患”。"/>
                            </Link>
                            <Link href="#DB拆分" title="DB拆分">
                                <Link href="#主键id接入全局id发生器" title="主键id接入全局id发生器"/>
                                <Link href="#数据迁移" title="数据迁移"/>
                                <Link href="#联表查询sql改造" title="联表查询sql改造">
                                    <Link href="#1、业务避免" title="1、业务避免"/>
                                    <Link href="#2、全局表" title="2、全局表"/>
                                    <Link href="#3、冗余表" title="3、冗余表"/>
                                    <Link href="#4、内存拼接" title="4、内存拼接"/>
                                </Link>
                                <Link href="#切库方案设计与实现" title="切库方案设计与实现">
                                <Link href="#DB停写" title="DB停写"/>
                                <Link href="#双写方案" title="双写方案"/>
                            </Link>
                            <Link href="#拆分后一致性怎么保证？" title="拆分后一致性怎么保证？"/>
                            </Link>
                            <Link href="#如何用消息系统避免分布式事务？" title="如何用消息系统避免分布式事务？">
                                <Link href="#本地事务" title="本地事务"/>
                                <Link href="#分布式事务—两阶段提交协议" title="分布式事务—两阶段提交协议"/>
                                <Link href="#使用消息队列来避免分布式事务" title="使用消息队列来避免分布式事务"/>
                                <Link href="#如何可靠保存凭证（消息）" title="如何可靠保存凭证（消息）">
                                <Link href="#业务与消息耦合" title="业务与消息耦合"/>
                                <Link href="#业务与消息解耦" title="业务与消息解耦"/>
                            </Link>
                            <Link href="#如何解决消息重复投递的问题" title="如何解决消息重复投递的问题"/>
                            </Link>

                        </Anchor>
                    </Col>
                </Row>


            </div>

        );
    }
}

export default ASK1;
