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
                        <h2 id="mysql并发策略"><a href="javascript:void(0)" class="anchor">mysql并发策略</a></h2>
                        <p>|-表锁</p>
                        <p>	&nbsp;&nbsp;&nbsp;&nbsp;|-共享锁(读锁)</p>
                        <p>	&nbsp;&nbsp;&nbsp;&nbsp;|-排他锁(写锁)</p>
                        <p>|-行锁</p>
                        <p>	&nbsp;&nbsp;&nbsp;&nbsp;|-共享锁(读锁)</p>
                        <p>	&nbsp;&nbsp;&nbsp;&nbsp;|-排他锁(写锁)</p>
                        <p>	表锁通常发生在DML不走索引的语句中，比如这个DML update table set columnA=”A” where columnB=“B”. 如果columnB字段不存在索引（或者不是组合索引前缀），会锁住所有记录也就是锁表。如果语句的执行能够执行一个columnB字段的索引，那么会锁住满足where的行(行锁)。</p>
                        <p>	若一个用户正在执行写操作(for update)，会获取排他的“写锁”，<strong>这可能会锁定表(行)</strong>，<strong>阻塞其他用户的读(对InnoDB无效)、</strong>写操作。</p>
                        <p>	若一个用户正在执行读操作，会先获取共享锁“读锁”，这个锁运行其他读锁并发的对这个表进行读取，互不干扰。只要没有写锁的进入，读锁可以是并发读取统一资源的。</p>
                        <p>&nbsp;</p>
                        <p>所以在执行写操作时，即使是查询操作，也要先执行 for update，特别是账务相关的操作，其他线程若不先执行for update,很有可能造成数据不一致。</p>
                        <p>正解：</p>
                        <pre><code>    @Transactional<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;public&nbsp;&nbsp;void&nbsp;forUpdate1(){this.s}<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;userDAO.selectByUserIdForUpdate(5l);&nbsp;//必须先锁<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;try&nbsp;{this.s}<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Thread.sleep(2000l);<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}&nbsp;catch&nbsp;(InterruptedException&nbsp;e)&nbsp;{this.s}<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;e.printStackTrace();<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;userDAO.udpateById(&quot;25&quot;,&quot;25&quot;,5l);<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;System.out.println(&quot;forUpdate1&nbsp;query&nbsp;&quot;+userDAO.selectByUserId(5l));<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;}<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;@Transactional<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;public&nbsp;&nbsp;void&nbsp;forUpdate2(){this.s}<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;userDAO.selectByUserIdForUpdate(5l);&nbsp;//必须先获锁<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;try&nbsp;{this.s}<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Thread.sleep(2000l);<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}&nbsp;catch&nbsp;(InterruptedException&nbsp;e)&nbsp;{this.s}<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;e.printStackTrace();<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;System.out.println(&quot;forUpdate2&nbsp;query&nbsp;&quot;+userDAO.selectByUserId(5l));<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;userDAO.udpateById(&quot;24&quot;,&quot;24&quot;,5l);<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;System.out.println(&quot;forUpdate2&nbsp;query&nbsp;&quot;+userDAO.selectByUserId(5l));<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;}<br/>
</code></pre>
                        <h3 id="乐观锁需要注意什么"><a href="javascript:void(0)" class="anchor">乐观锁需要注意什么</a></h3>
                        <p>因为乐观锁认为其他人不会同时修改数据，并且其他人操作逻辑也是对的；从上面的例子中，不难发现，如果是高并发的情况下，很难保证其他人处理的逻辑是对的，因为其他人拿到的数据都不一定是正确的，这个时候，怎么保证数据的一致性？</p>
                        <p>答案就是：尽可能多的限制条件 &amp; 尽可能使用sql自操作，但也不能排除赋值操作。</p>
                        <pre><code>update order set version = version +1,amount = amount -25，updtor=&#39;nick&#39; where id=1 and version=25<br/>
</code></pre>
                        <p><strong>上面的语句通过version保证只会有一条sql执行成功；在分布式、并发场景下非常重要。</strong></p>
                        <p>&nbsp;</p>
                        <h1 id="MVCC"><a href="javascript:void(0)" class="anchor">MVCC</a></h1>
                        <p>MVCC(multiple-version-concurrency-control）是个行级锁的变种，它在普通读情况下避免了加锁操作，因此开销更低。
                            虽然实现不同，但通常都是实现非阻塞读，对于写操作只锁定必要的行。</p>
                        <h3 id="MVCC select无锁操作是如何实现的？"><a href="javascript:void(0)" class="anchor">MVCC select无锁操作是如何实现的？</a></h3>
                        <p>在mysql默认的Repeatable Read隔离级别下，具体看看MVCC操作：</p>
                        <h4 id="Select"><a href="javascript:void(0)" class="anchor">Select</a></h4>
                        <p>	a.InnoDB只select查找版本号早于当前版本号的数据行，这样保证了读取的数据要么是在这个事务开始之前就已经commit了的（早于当前版本号），要么是在这个事务自身中执行创建操作的数据（等于当前版本号）。</p>
                        <p>	b.查找行的更新版本号要么未定义，要么大于当前的版本号(为了保证事务可以读到老数据)，这样保证了事务读取到在当前事务开始之后未被更新的数据。
                            注意： 这里的select不能有for update、lock in share 语句。 </p>
                        <h4 id="Insert"><a href="javascript:void(0)" class="anchor">Insert</a></h4>
                        <p>InnoDB为这个事务中新插入的行，保存当前事务版本号的行作为行的行创建版本号。</p>
                        <h4 id="Delete"><a href="javascript:void(0)" class="anchor">Delete</a></h4>
                        <p>InnoDB为每一个删除的行保存当前事务版本号，作为行的删除标记。</p>
                        <h4 id="Update"><a href="javascript:void(0)" class="anchor">Update</a></h4>
                        <p>将存在两条数据，保持当前版本号作为更新后的数据的新增版本号，同时保存当前版本号作为老数据行的更新版本号。</p>
                        <pre><code>   long id =22l;<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;@Transactional<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;public&nbsp;&nbsp;void&nbsp;select2(){this.s}<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;System.out.println(&quot;start&nbsp;&quot;+new&nbsp;Date());<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;userDAO.insert(&quot;nick&quot;,&quot;hello&quot;);<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;try&nbsp;{this.s}<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Thread.sleep(7000L);<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;System.out.println(&quot;select2&nbsp;&quot;+new&nbsp;Date());<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}&nbsp;catch&nbsp;(InterruptedException&nbsp;e)&nbsp;{this.s}<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;e.printStackTrace();<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;User&nbsp;user&nbsp;=&nbsp;userDAO.selectByUserId(id);<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;System.out.println(user);<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;}<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;public&nbsp;&nbsp;void&nbsp;update2(){this.s}<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;try&nbsp;{this.s}<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;System.out.println(&quot;update2&nbsp;&quot;+new&nbsp;Date());<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;int&nbsp;done&nbsp;=&nbsp;userDAO.udpateById(&quot;skx&quot;,&quot;123456&quot;,id);<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;System.out.println(&quot;update2&nbsp;select&quot;+new&nbsp;Date());<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;User&nbsp;user&nbsp;=&nbsp;userDAO.selectByUserId(id);<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;System.out.println(user);<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}&nbsp;catch&nbsp;(Exception&nbsp;e)&nbsp;{this.s}<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;e.printStackTrace();<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;}<br/>
</code></pre>
                        <p>两个方法同时执行后，假设插入后的id为22；即id为有了第一个创建版本号 1；方法2会对版本号为1的数据进行修改，添加一个删除版本号2；对这条数据进行修改，创建版本号为2，删除版本号为空。</p>
                        <p>&nbsp;</p>
                        <h3 id="MVCC 保证了可重复读吗？"><a href="javascript:void(0)" class="anchor">MVCC 保证了可重复读吗？</a></h3>
                        <p>日志分析：</p>
                        <pre><code>start Mon Mar 19 10:49:44 CST 2018//进入线程1<br/>
                            2018-03-19&nbsp;10:49:45,019&nbsp;[DEBUG]--[123]&nbsp;org.kx.nick.UserDAO.insert&nbsp;159&nbsp;--&nbsp;==&gt;&nbsp;&nbsp;Preparing:&nbsp;INSERT&nbsp;INTO&nbsp;USER(USERNAME,&nbsp;PASSWORD)&nbsp;values(&nbsp;?,?)&nbsp;<br/>
                            2018-03-19&nbsp;10:49:45,046&nbsp;[DEBUG]--[123]&nbsp;org.kx.nick.UserDAO.insert&nbsp;159&nbsp;--&nbsp;==&gt;&nbsp;Parameters:&nbsp;nick(String),&nbsp;hello(String)<br/>
                            2018-03-19&nbsp;10:49:45,065&nbsp;[DEBUG]--[123]&nbsp;org.kx.nick.UserDAO.insert&nbsp;159&nbsp;--&nbsp;&lt;==&nbsp;&nbsp;&nbsp;&nbsp;Updates:&nbsp;1<br/>
                            update2&nbsp;Mon&nbsp;Mar&nbsp;19&nbsp;10:49:48&nbsp;CST&nbsp;2018//进入线程<br/>
                            2018-03-19&nbsp;10:49:48,207&nbsp;[DEBUG]--[123]&nbsp;org.kx.nick.UserDAO.udpateById&nbsp;159&nbsp;--&nbsp;==&gt;&nbsp;&nbsp;Preparing:&nbsp;UPDATE&nbsp;USER&nbsp;SET&nbsp;USERNAME&nbsp;=?,&nbsp;PASSWORD&nbsp;=&nbsp;?&nbsp;WHERE&nbsp;id&nbsp;=&nbsp;?&nbsp;<br/>
                            2018-03-19&nbsp;10:49:48,208&nbsp;[DEBUG]--[123]&nbsp;org.kx.nick.UserDAO.udpateById&nbsp;159&nbsp;--&nbsp;==&gt;&nbsp;Parameters:&nbsp;skx(String),&nbsp;123456(String),&nbsp;22(Long)<br/>
                            //线程1查询<br/>
                            select2&nbsp;Mon&nbsp;Mar&nbsp;19&nbsp;10:49:52&nbsp;CST&nbsp;2018<br/>
                            2018-03-19&nbsp;10:49:52,073&nbsp;[DEBUG]--[123]&nbsp;org.kx.nick.UserDAO.selectByUserId&nbsp;159&nbsp;--&nbsp;==&gt;&nbsp;&nbsp;Preparing:&nbsp;SELECT&nbsp;*&nbsp;FROM&nbsp;USER&nbsp;WHERE&nbsp;id&nbsp;=&nbsp;?&nbsp;<br/>
                            2018-03-19&nbsp;10:49:52,073&nbsp;[DEBUG]--[123]&nbsp;org.kx.nick.UserDAO.selectByUserId&nbsp;159&nbsp;--&nbsp;==&gt;&nbsp;Parameters:&nbsp;22(Long)<br/>
                            2018-03-19&nbsp;10:49:52,139&nbsp;[DEBUG]--[123]&nbsp;org.kx.nick.UserDAO.selectByUserId&nbsp;159&nbsp;--&nbsp;&lt;==&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Total:&nbsp;1<br/>
                            2018-03-19&nbsp;10:49:52,139&nbsp;[DEBUG]--[123]&nbsp;org.mybatis.spring.SqlSessionUtils&nbsp;186&nbsp;--&nbsp;<br/>
                            User{this.s}id=22,&nbsp;userName=&#39;nick&#39;,&nbsp;password=&#39;hello&#39;}<br/>
                            2018-03-19&nbsp;10:49:52,140&nbsp;[DEBUG]--[123]&nbsp;org.mybatis.spring.SqlSessionUtils&nbsp;284&nbsp;--&nbsp;Transaction&nbsp;synchronization&nbsp;committing&nbsp;SqlSession&nbsp;<br/>
                            //提交事务<br/>
                            //线程2提交update成功<br/>
                            2018-03-19&nbsp;10:49:52,156&nbsp;[DEBUG]--[123]&nbsp;org.kx.nick.UserDAO.udpateById&nbsp;159&nbsp;--&nbsp;&lt;==&nbsp;&nbsp;&nbsp;&nbsp;Updates:&nbsp;1<br/>
                            //线程2查询<br/>
                            2018-03-19&nbsp;10:49:52,170&nbsp;[DEBUG]--[123]&nbsp;org.kx.nick.UserDAO.selectByUserIdShare&nbsp;159&nbsp;--&nbsp;==&gt;&nbsp;&nbsp;Preparing:&nbsp;SELECT&nbsp;*&nbsp;FROM&nbsp;USER&nbsp;WHERE&nbsp;id&nbsp;=&nbsp;?&nbsp;lock&nbsp;in&nbsp;share&nbsp;mode&nbsp;<br/>
                            2018-03-19&nbsp;10:49:52,170&nbsp;[DEBUG]--[123]&nbsp;org.kx.nick.UserDAO.selectByUserIdShare&nbsp;159&nbsp;--&nbsp;==&gt;&nbsp;Parameters:&nbsp;22(Long)<br/>
                            2018-03-19&nbsp;10:49:52,182&nbsp;[DEBUG]--[123]&nbsp;org.kx.nick.UserDAO.selectByUserIdShare&nbsp;159&nbsp;--&nbsp;&lt;==&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Total:&nbsp;1<br/>
                            </code></pre>
                        <p>从上面的日志来看，线程1未提交事务，线程2阻塞中，线程1获取线程自身的数据。</p>
                        <p>又如：</p>
                        <pre><code>@Transactional<br/>
                            public&nbsp;&nbsp;void&nbsp;select2(){this.s}<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;System.out.println(&quot;start&nbsp;&quot;+new&nbsp;Date());<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;User&nbsp;user&nbsp;=&nbsp;userDAO.selectByUserId(id);<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;System.out.println(&quot;start&nbsp;1&quot;+user);<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;try&nbsp;{this.s}<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Thread.sleep(7000L);<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;System.out.println(&quot;select2&nbsp;&quot;+new&nbsp;Date());<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;}&nbsp;catch&nbsp;(InterruptedException&nbsp;e)&nbsp;{this.s}<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;e.printStackTrace();<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;}<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;user&nbsp;=&nbsp;userDAO.selectByUserId(id);<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;System.out.println(&quot;start&nbsp;2&quot;+user);<br/>
                            }<br/>
                            public&nbsp;&nbsp;void&nbsp;update2(){this.s}<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;try&nbsp;{this.s}<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;System.out.println(&quot;update2&nbsp;&quot;+new&nbsp;Date());<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;int&nbsp;done&nbsp;=&nbsp;userDAO.udpateById(&quot;bbnn&quot;,&quot;123456&quot;,id);<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;System.out.println(&quot;update2&nbsp;select&quot;+new&nbsp;Date());<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;User&nbsp;user&nbsp;=&nbsp;userDAO.selectByUserIdShare(id);<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;System.out.println(user);<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;}&nbsp;catch&nbsp;(Exception&nbsp;e)&nbsp;{this.s}<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;e.printStackTrace();<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;}<br/>
                            }<br/>
                            </code></pre>
                        <p>日志：</p>
                        <pre><code>start Mon Mar 19 11:22:32 CST 2018 //线程1<br/>
2018-03-19&nbsp;11:22:32,303&nbsp;[DEBUG]--[123]&nbsp;org.kx.nick.UserDAO.selectByUserId&nbsp;159&nbsp;--&nbsp;==&gt;&nbsp;&nbsp;Preparing:&nbsp;SELECT&nbsp;*&nbsp;FROM&nbsp;USER&nbsp;WHERE&nbsp;id&nbsp;=&nbsp;?&nbsp;<br/>
2018-03-19&nbsp;11:22:32,328&nbsp;[DEBUG]--[123]&nbsp;org.kx.nick.UserDAO.selectByUserId&nbsp;159&nbsp;--&nbsp;==&gt;&nbsp;Parameters:&nbsp;22(Long)<br/>
2018-03-19&nbsp;11:22:32,354&nbsp;[DEBUG]--[123]&nbsp;org.kx.nick.UserDAO.selectByUserId&nbsp;159&nbsp;--&nbsp;&lt;==&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Total:&nbsp;1<br/>
start&nbsp;1&nbsp;User{this.s}id=22,&nbsp;userName=&#39;skx&#39;,&nbsp;password=&#39;123456&#39;}<br/>
//线程2<br/>
update2&nbsp;Mon&nbsp;Mar&nbsp;19&nbsp;11:22:36&nbsp;CST&nbsp;2018<br/>
2018-03-19&nbsp;11:22:36,196&nbsp;[DEBUG]--[123]&nbsp;org.kx.nick.UserDAO.udpateById&nbsp;159&nbsp;--&nbsp;==&gt;&nbsp;&nbsp;Preparing:&nbsp;UPDATE&nbsp;USER&nbsp;SET&nbsp;USERNAME&nbsp;=?,&nbsp;PASSWORD&nbsp;=&nbsp;?&nbsp;WHERE&nbsp;id&nbsp;=&nbsp;?&nbsp;<br/>
2018-03-19&nbsp;11:22:36,197&nbsp;[DEBUG]--[123]&nbsp;org.kx.nick.UserDAO.udpateById&nbsp;159&nbsp;--&nbsp;==&gt;&nbsp;Parameters:&nbsp;bbnn(String),&nbsp;123456(String),&nbsp;22(Long)<br/>
2018-03-19&nbsp;11:22:36,217&nbsp;[DEBUG]--[123]&nbsp;org.kx.nick.UserDAO.udpateById&nbsp;159&nbsp;--&nbsp;&lt;==&nbsp;&nbsp;&nbsp;&nbsp;Updates:&nbsp;1&nbsp;&nbsp;//执行成功<br/>
                            &nbsp;<br/>
update2&nbsp;select&nbsp;Mon&nbsp;Mar&nbsp;19&nbsp;11:22:36&nbsp;CST&nbsp;2018<br/>
2018-03-19&nbsp;11:22:36,220&nbsp;[DEBUG]--[123]&nbsp;org.kx.nick.UserDAO.selectByUserIdShare&nbsp;159&nbsp;--&nbsp;==&gt;&nbsp;&nbsp;Preparing:&nbsp;SELECT&nbsp;*&nbsp;FROM&nbsp;USER&nbsp;WHERE&nbsp;id&nbsp;=&nbsp;?&nbsp;lock&nbsp;in&nbsp;share&nbsp;mode&nbsp;<br/>
2018-03-19&nbsp;11:22:36,220&nbsp;[DEBUG]--[123]&nbsp;org.kx.nick.UserDAO.selectByUserIdShare&nbsp;159&nbsp;--&nbsp;==&gt;&nbsp;Parameters:&nbsp;22(Long)<br/>
2018-03-19&nbsp;11:22:36,230&nbsp;[DEBUG]--[123]&nbsp;org.kx.nick.UserDAO.selectByUserIdShare&nbsp;159&nbsp;--&nbsp;&lt;==&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Total:&nbsp;1<br/>
User{this.s}id=22,&nbsp;userName=&#39;bbnn&#39;,&nbsp;password=&#39;123456&#39;}<br/>
//线程1<br/>
select2&nbsp;Mon&nbsp;Mar&nbsp;19&nbsp;11:22:39&nbsp;CST&nbsp;2018<br/>
2018-03-19&nbsp;11:22:39,360&nbsp;[DEBUG]--[123]&nbsp;org.mybatis.spring.SqlSessionUtils&nbsp;163&nbsp;--&nbsp;Fetched&nbsp;SqlSession&nbsp;[org.apache.ibatis.session.defaults.DefaultSqlSession@3866f8be]&nbsp;from&nbsp;current&nbsp;transaction<br/>
2018-03-19&nbsp;11:22:39,360&nbsp;[DEBUG]--[123]&nbsp;org.mybatis.spring.SqlSessionUtils&nbsp;186&nbsp;--&nbsp;Releasing&nbsp;transactional&nbsp;SqlSession&nbsp;[org.apache.ibatis.session.defaults.DefaultSqlSession@3866f8be]<br/>
start&nbsp;2&nbsp;&nbsp;User{this.s}id=22,&nbsp;userName=&#39;skx&#39;,&nbsp;password=&#39;123456&#39;}<br/>
</code></pre>
                        <p><strong>!!上面线程1没有打印sql。说明都没有去访问数据库。</strong></p>
                        <p>&nbsp;</p>
                        <h4 id="Repeatable-read"><a href="javascript:void(0)" class="anchor">Repeatable-read</a></h4>
                        <pre><code>    @Transactional<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;public&nbsp;&nbsp;void&nbsp;select2(){this.s}<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;System.out.println(&quot;start&nbsp;&quot;+new&nbsp;Date());<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;//userDAO.insert(&quot;nick&quot;,&quot;hello&quot;);<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;User&nbsp;user&nbsp;=&nbsp;userDAO.selectByUserId(id-1);<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;System.out.println(&quot;start&nbsp;1&nbsp;&quot;+user);<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;try&nbsp;{this.s}<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Thread.sleep(7000L);<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;System.out.println(&quot;select2&nbsp;&quot;+new&nbsp;Date());<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}&nbsp;catch&nbsp;(InterruptedException&nbsp;e)&nbsp;{this.s}<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;e.printStackTrace();<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;user&nbsp;=&nbsp;userDAO.selectByUserId(id);<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;System.out.println(&quot;start&nbsp;2&nbsp;&quot;+user);<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;}<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;public&nbsp;&nbsp;void&nbsp;update2(){this.s}<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;try&nbsp;{this.s}<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;System.out.println(&quot;update2&nbsp;&quot;+new&nbsp;Date());<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;int&nbsp;done&nbsp;=&nbsp;userDAO.udpateById(&quot;sknx&quot;,&quot;123456&quot;,id);<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;System.out.println(&quot;update2&nbsp;select&nbsp;&quot;+new&nbsp;Date());<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;User&nbsp;user&nbsp;=&nbsp;userDAO.selectByUserId(id);<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;System.out.println(&quot;start&nbsp;3&nbsp;&nbsp;&quot;+user);<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}&nbsp;catch&nbsp;(Exception&nbsp;e)&nbsp;{this.s}<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;e.printStackTrace();<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;}<br/>
</code></pre>
                        <p>日志：</p>
                        <pre><code>start Mon Mar 19 11:35:46 CST 2018  //线程1<br/>
                            &nbsp;2018-03-19&nbsp;11:35:46,782&nbsp;[DEBUG]--[123]&nbsp;org.kx.nick.UserDAO.selectByUserId&nbsp;159&nbsp;--&nbsp;==&gt;&nbsp;&nbsp;Preparing:&nbsp;SELECT&nbsp;*&nbsp;FROM&nbsp;USER&nbsp;WHERE&nbsp;id&nbsp;=&nbsp;?&nbsp;<br/>
2018-03-19&nbsp;11:35:46,815&nbsp;[DEBUG]--[123]&nbsp;org.kx.nick.UserDAO.selectByUserId&nbsp;159&nbsp;--&nbsp;==&gt;&nbsp;Parameters:&nbsp;21(Long)<br/>
2018-03-19&nbsp;11:35:47,056&nbsp;[DEBUG]--[123]&nbsp;org.kx.nick.UserDAO.selectByUserId&nbsp;159&nbsp;--&nbsp;&lt;==&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Total:&nbsp;1<br/>
start&nbsp;1&nbsp;User{this.s}id=21,&nbsp;userName=&#39;skx&#39;,&nbsp;password=&#39;123456&#39;}<br/>
//线程2<br/>
update2&nbsp;Mon&nbsp;Mar&nbsp;19&nbsp;11:35:50&nbsp;CST&nbsp;2018<br/>
2018-03-19&nbsp;11:35:50,312&nbsp;[DEBUG]--[123]&nbsp;org.kx.nick.UserDAO.udpateById&nbsp;159&nbsp;--&nbsp;==&gt;&nbsp;&nbsp;Preparing:&nbsp;UPDATE&nbsp;USER&nbsp;SET&nbsp;USERNAME&nbsp;=?,&nbsp;PASSWORD&nbsp;=&nbsp;?&nbsp;WHERE&nbsp;id&nbsp;=&nbsp;?&nbsp;<br/>
2018-03-19&nbsp;11:35:50,313&nbsp;[DEBUG]--[123]&nbsp;org.kx.nick.UserDAO.udpateById&nbsp;159&nbsp;--&nbsp;==&gt;&nbsp;Parameters:&nbsp;sknx(String),&nbsp;123456(String),&nbsp;22(Long)<br/>
2018-03-19&nbsp;11:35:50,351&nbsp;[DEBUG]--[123]&nbsp;org.kx.nick.UserDAO.udpateById&nbsp;159&nbsp;--&nbsp;&lt;==&nbsp;&nbsp;&nbsp;&nbsp;Updates:&nbsp;1<br/>
update2&nbsp;select&nbsp;Mon&nbsp;Mar&nbsp;19&nbsp;11:35:50&nbsp;CST&nbsp;2018<br/>
2018-03-19&nbsp;11:35:50,354&nbsp;[DEBUG]--[123]&nbsp;org.kx.nick.UserDAO.selectByUserIdShare&nbsp;159&nbsp;--&nbsp;==&gt;&nbsp;&nbsp;Preparing:&nbsp;SELECT&nbsp;*&nbsp;FROM&nbsp;USER&nbsp;WHERE&nbsp;id&nbsp;=&nbsp;?&nbsp;lock&nbsp;in&nbsp;share&nbsp;mode&nbsp;<br/>
2018-03-19&nbsp;11:35:50,354&nbsp;[DEBUG]--[123]&nbsp;org.kx.nick.UserDAO.selectByUserIdShare&nbsp;159&nbsp;--&nbsp;==&gt;&nbsp;Parameters:&nbsp;22(Long)<br/>
2018-03-19&nbsp;11:35:50,365&nbsp;[DEBUG]--[123]&nbsp;org.kx.nick.UserDAO.selectByUserIdShare&nbsp;159&nbsp;--&nbsp;&lt;==&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Total:&nbsp;1<br/>
start&nbsp;3&nbsp;&nbsp;User{this.s}id=22,&nbsp;userName=&#39;sknx&#39;,&nbsp;password=&#39;123456&#39;}<br/>
//查询到修改后的数据<br/>
//线程1<br/>
select2&nbsp;Mon&nbsp;Mar&nbsp;19&nbsp;11:35:54&nbsp;CST&nbsp;2018<br/>
2018-03-19&nbsp;11:35:54,062&nbsp;[DEBUG]--[123]&nbsp;org.kx.nick.UserDAO.selectByUserId&nbsp;159&nbsp;--&nbsp;==&gt;&nbsp;&nbsp;Preparing:&nbsp;SELECT&nbsp;*&nbsp;FROM&nbsp;USER&nbsp;WHERE&nbsp;id&nbsp;=&nbsp;?&nbsp;<br/>
2018-03-19&nbsp;11:35:54,064&nbsp;[DEBUG]--[123]&nbsp;org.kx.nick.UserDAO.selectByUserId&nbsp;159&nbsp;--&nbsp;==&gt;&nbsp;Parameters:&nbsp;22(Long)<br/>
2018-03-19&nbsp;11:35:54,074&nbsp;[DEBUG]--[123]&nbsp;org.kx.nick.UserDAO.selectByUserId&nbsp;159&nbsp;--&nbsp;&lt;==&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Total:&nbsp;1<br/>
start&nbsp;2&nbsp;User{this.s}id=22,&nbsp;userName=&#39;bvvv&#39;,&nbsp;password=&#39;123456&#39;}&nbsp;&nbsp;<br/>
//查询到修改前的数据<br/>
</code></pre>
                        <p>从日志上看到，事务1和事务2没有相互影响，基于数据库的repeatable-read。</p>
                        <p>&nbsp;</p>
                        <h4 id="commited-read"><a href="javascript:void(0)" class="anchor">commited-read</a></h4>
                        <pre><code>use temp ;<br/>
SELECT&nbsp;@@tx_isolation;<br/>
SET&nbsp;session&nbsp;TRANSACTION&nbsp;ISOLATION&nbsp;LEVEL&nbsp;Read&nbsp;committed&nbsp;;&nbsp;<br/>
(参数可以为：Read&nbsp;uncommitted，Read&nbsp;committed，Repeatable，Serializable）<br/>
</code></pre>
                        <p>上面的修改是局部的，使用如下：</p>
                        <pre><code>SET global TRANSACTION ISOLATION LEVEL Read committed ; <br/>
</code></pre>
                        <p>取消事务：</p>
                        <pre><code>//@Transactional<br/>
public&nbsp;&nbsp;void&nbsp;select2(){this.s}<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;System.out.println(&quot;start&nbsp;&quot;+new&nbsp;Date());<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;//userDAO.insert(&quot;nick&quot;,&quot;hello&quot;);<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;User&nbsp;user&nbsp;=&nbsp;userDAO.selectByUserId(id-1);<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;System.out.println(&quot;start&nbsp;1&nbsp;&quot;+user);<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;try&nbsp;{this.s}<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Thread.sleep(7000L);<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;System.out.println(&quot;select2&nbsp;&quot;+new&nbsp;Date());<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;}&nbsp;catch&nbsp;(InterruptedException&nbsp;e)&nbsp;{this.s}<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;e.printStackTrace();<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;}<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;user&nbsp;=&nbsp;userDAO.selectByUserId(id);<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;System.out.println(&quot;start&nbsp;2&nbsp;&quot;+user);<br/>
}<br/>
public&nbsp;&nbsp;void&nbsp;update2(){this.s}<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;try&nbsp;{this.s}<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;System.out.println(&quot;update2&nbsp;&quot;+new&nbsp;Date());<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;int&nbsp;done&nbsp;=&nbsp;userDAO.udpateById(&quot;sknx3&quot;,&quot;123456&quot;,id);<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;System.out.println(&quot;update2&nbsp;select&nbsp;&quot;+new&nbsp;Date());<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;User&nbsp;user&nbsp;=&nbsp;userDAO.selectByUserId(id);<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;System.out.println(&quot;start&nbsp;3&nbsp;&nbsp;&quot;+user);<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;}&nbsp;catch&nbsp;(Exception&nbsp;e)&nbsp;{this.s}<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;e.printStackTrace();<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;}<br/>
}<br/>
</code></pre>
                        <p>从日志发现：当线程2提交update之后，线程1就获取了新值，说明线程1的两个查询是2个事务，能查到最新值。加上注解 @Transactional</p>
                        <p> 代码：</p>
                        <pre><code>@Transactional<br/>
public&nbsp;&nbsp;void&nbsp;select2(){this.s}<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;System.out.println(&quot;start&nbsp;&quot;+new&nbsp;Date());<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;User&nbsp;user&nbsp;=&nbsp;userDAO.selectByUserId(id-1);<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;System.out.println(&quot;start&nbsp;1&nbsp;&quot;+user);<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;try&nbsp;{this.s}<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Thread.sleep(7000L);<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;System.out.println(&quot;select2&nbsp;&quot;+new&nbsp;Date());<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;}&nbsp;catch&nbsp;(InterruptedException&nbsp;e)&nbsp;{this.s}<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;e.printStackTrace();<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;}<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;user&nbsp;=&nbsp;userDAO.selectByUserId(id);<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;System.out.println(&quot;start&nbsp;2&nbsp;&quot;+user);<br/>
}<br/>
public&nbsp;&nbsp;void&nbsp;update2(){this.s}<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;try&nbsp;{this.s}<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;System.out.println(&quot;update2&nbsp;&quot;+new&nbsp;Date());<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;int&nbsp;done&nbsp;=&nbsp;userDAO.udpateById(&quot;sknx4&quot;,&quot;123456&quot;,id);<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;System.out.println(&quot;update2&nbsp;select&nbsp;&quot;+new&nbsp;Date());<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;User&nbsp;user&nbsp;=&nbsp;userDAO.selectByUserId(id);<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;System.out.println(&quot;start&nbsp;3&nbsp;&nbsp;&quot;+user);<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;}&nbsp;catch&nbsp;(Exception&nbsp;e)&nbsp;{this.s}<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;e.printStackTrace();<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;}<br/>
}<br/>
</code></pre>
                        <p>日志：</p>
                        <pre><code>start Mon Mar 19 11:58:37 CST 2018 //线程1<br/>
2018-03-19&nbsp;11:58:37,158&nbsp;[DEBUG]--[123]&nbsp;org.kx.nick.UserDAO.selectByUserId&nbsp;159&nbsp;--&nbsp;==&gt;&nbsp;&nbsp;Preparing:&nbsp;SELECT&nbsp;*&nbsp;FROM&nbsp;USER&nbsp;WHERE&nbsp;id&nbsp;=&nbsp;?&nbsp;<br/>
2018-03-19&nbsp;11:58:37,184&nbsp;[DEBUG]--[123]&nbsp;org.kx.nick.UserDAO.selectByUserId&nbsp;159&nbsp;--&nbsp;==&gt;&nbsp;Parameters:&nbsp;21(Long)<br/>
2018-03-19&nbsp;11:58:37,205&nbsp;[DEBUG]--[123]&nbsp;org.kx.nick.UserDAO.selectByUserId&nbsp;159&nbsp;--&nbsp;&lt;==&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Total:&nbsp;1<br/>
start&nbsp;1&nbsp;User{this.s}id=21,&nbsp;userName=&#39;skx&#39;,&nbsp;password=&#39;123456&#39;}<br/>
//线程2<br/>
update2&nbsp;Mon&nbsp;Mar&nbsp;19&nbsp;11:58:41&nbsp;CST&nbsp;2018<br/>
2018-03-19&nbsp;11:58:41,119&nbsp;[DEBUG]--[123]&nbsp;org.kx.nick.UserDAO.udpateById&nbsp;159&nbsp;--&nbsp;==&gt;&nbsp;&nbsp;Preparing:&nbsp;UPDATE&nbsp;USER&nbsp;SET&nbsp;USERNAME&nbsp;=?,&nbsp;PASSWORD&nbsp;=&nbsp;?&nbsp;WHERE&nbsp;id&nbsp;=&nbsp;?&nbsp;<br/>
2018-03-19&nbsp;11:58:41,120&nbsp;[DEBUG]--[123]&nbsp;org.kx.nick.UserDAO.udpateById&nbsp;159&nbsp;--&nbsp;==&gt;&nbsp;Parameters:&nbsp;sknx4(String),&nbsp;123456(String),&nbsp;22(Long)<br/>
2018-03-19&nbsp;11:58:41,146&nbsp;[DEBUG]--[123]&nbsp;org.kx.nick.UserDAO.udpateById&nbsp;159&nbsp;--&nbsp;&lt;==&nbsp;&nbsp;&nbsp;&nbsp;Updates:&nbsp;1<br/>
update2&nbsp;select&nbsp;Mon&nbsp;Mar&nbsp;19&nbsp;11:58:41&nbsp;CST&nbsp;2018<br/>
2018-03-19&nbsp;11:58:41,149&nbsp;[DEBUG]--[123]&nbsp;org.kx.nick.UserDAO.selectByUserId&nbsp;159&nbsp;--&nbsp;==&gt;&nbsp;&nbsp;Preparing:&nbsp;SELECT&nbsp;*&nbsp;FROM&nbsp;USER&nbsp;WHERE&nbsp;id&nbsp;=&nbsp;?&nbsp;<br/>
2018-03-19&nbsp;11:58:41,149&nbsp;[DEBUG]--[123]&nbsp;org.kx.nick.UserDAO.selectByUserId&nbsp;159&nbsp;--&nbsp;==&gt;&nbsp;Parameters:&nbsp;22(Long)<br/>
2018-03-19&nbsp;11:58:41,162&nbsp;[DEBUG]--[123]&nbsp;org.kx.nick.UserDAO.selectByUserId&nbsp;159&nbsp;--&nbsp;&lt;==&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Total:&nbsp;1<br/>
start&nbsp;3&nbsp;&nbsp;User{this.s}id=22,&nbsp;userName=&#39;sknx4&#39;,&nbsp;password=&#39;123456&#39;}<br/>
//线程1<br/>
select2&nbsp;Mon&nbsp;Mar&nbsp;19&nbsp;11:58:44&nbsp;CST&nbsp;2018<br/>
2018-03-19&nbsp;11:58:44,207&nbsp;[DEBUG]--[123]&nbsp;org.kx.nick.UserDAO.selectByUserId&nbsp;159&nbsp;--&nbsp;==&gt;&nbsp;&nbsp;Preparing:&nbsp;SELECT&nbsp;*&nbsp;FROM&nbsp;USER&nbsp;WHERE&nbsp;id&nbsp;=&nbsp;?&nbsp;<br/>
2018-03-19&nbsp;11:58:44,208&nbsp;[DEBUG]--[123]&nbsp;org.kx.nick.UserDAO.selectByUserId&nbsp;159&nbsp;--&nbsp;==&gt;&nbsp;Parameters:&nbsp;22(Long)<br/>
2018-03-19&nbsp;11:58:44,220&nbsp;[DEBUG]--[123]&nbsp;org.kx.nick.UserDAO.selectByUserId&nbsp;159&nbsp;--&nbsp;&lt;==&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Total:&nbsp;1<br/>
start&nbsp;2&nbsp;User{this.s}id=22,&nbsp;userName=&#39;sknx4&#39;,&nbsp;password=&#39;123456&#39;}<br/>
</code></pre>
                        <p>==&gt;发现返回的数据为线程2修改后的数据，就为 commited-read.</p>
                        <h1 id="mysql死锁问题分析 "><a href="javascript:void(0)" class="anchor">mysql死锁问题分析 </a></h1>
                        <p>参考：<a href='http://www.cnblogs.com/LBSer/p/5183300.html' target='_blank' >http://www.cnblogs.com/LBSer/p/5183300.html</a></p>
                        <p>	线上某服务时不时报出如下异常（大约一天二十多次）：“Deadlock found when trying to get lock;”。</p>
                        <p>      Oh, My God! 是死锁问题。尽管报错不多，对性能目前看来也无太大影响，但还是需要解决，保不齐哪天成为性能瓶颈。
                            为了更系统的分析问题，本文将从死锁检测、索引隔离级别与锁的关系、死锁成因、问题定位这五个方面来展开讨论。</p>
                        <p><img src='https://gitee.com/nick070809/pics/raw/master/skill/21.png' alt='' /></p>
                        <h3 id="死锁是怎么被发现的？"><a href="javascript:void(0)" class="anchor">死锁是怎么被发现的？</a></h3>
                        <p>左图那两辆车造成死锁了吗？不是！右图四辆车造成死锁了吗？是！</p>
                        <p><img src='https://gitee.com/nick070809/pics/raw/master/skill/22.png' alt='' /></p>
                        <p>我们mysql用的存储引擎是innodb，从日志来看，<strong>innodb主动探知到死锁，并回滚了某一苦苦等待的事务。问题来了，innodb是怎么探知死锁的？</strong></p>
                        <p>     直观方法是在两个事务相互等待时，当一个等待时间超过设置的某一阀值时，对其中一个事务进行回滚，另一个事务就能继续执行。这种方法简单有效，<strong>在innodb中，参数innodb_lock_wait_timeout用来设置超时时间。</strong></p>
                        <p>     仅用上述方法来检测死锁太过被动，<strong>innodb还提供了wait-for graph算法来主动进行死锁检测，每当加锁请求无法立即满足需要并进入等待时，wait-for graph算法都会被触发。</strong></p>
                        <p>&nbsp;</p>
                        <h3 id="wait-for graph原理"><a href="javascript:void(0)" class="anchor">wait-for graph原理</a></h3>
                        <p>我们怎么知道上图中四辆车是死锁的？他们相互等待对方的资源，而且形成环路！我们将每辆车看为一个节点，当节点1需要等待节点2的资源时，就生成一条有向边指向节点2，最后形成一个有向图。我们只要检测这个有向图是否出现环路即可，出现环路就是死锁！这就是wait-for graph算法。</p>
                        <p><img src='https://gitee.com/nick070809/pics/raw/master/skill/23.png' alt='' /></p>
                        <p>innodb将各个事务看为一个个节点，资源就是各个事务占用的锁，当事务1需要等待事务2的锁时，就生成一条有向边从1指向2，最后行成一个有向图。</p>
                        <h2 id="innodb隔离级别、索引与锁 "><a href="javascript:void(0)" class="anchor">innodb隔离级别、索引与锁 </a></h2>
                        <p>死锁检测是死锁发生时innodb给我们的救命稻草，我们需要它，但我们更需要的是避免死锁发生的能力，如何尽可能避免？这需要了解innodb中的锁。</p>
                        <h3 id="锁与索引的关系"><a href="javascript:void(0)" class="anchor">锁与索引的关系</a></h3>
                        <p>       假设我们有一张消息表（msg），里面有3个字段。假设id是主键，token是非唯一索引，message没有索引。</p>
                        <p>-| id: bigint| token: varchar(30)| message: varchar(4096)|-</p>
                        <p>innodb对于主键使用了聚簇索引，这是一种数据存储方式，表数据是和主键一起存储，主键索引的叶结点存储行数据。对于普通索引，其叶子节点存储的是主键值。</p>
                        <p><img src='https://gitee.com/nick070809/pics/raw/master/skill/24.png' alt='' /></p>
                        <p>下面分析下索引和锁的关系</p>
                        <p>1）delete from msg where id=2；</p>
                        <p>     由于id是主键，因此直接锁住整行记录即可。</p>
                        <p><img src='https://gitee.com/nick070809/pics/raw/master/skill/25.png' alt='' /></p>
                        <p>2）delete from msg where token=’ cvs’;</p>
                        <p>    由于token是二级索引，因此首先锁住二级索引（两行），接着会锁住相应主键所对应的记录；</p>
                        <p><img src='https://gitee.com/nick070809/pics/raw/master/skill/26.png' alt='' /></p>
                        <p>3）delete from msg where message=订单号是多少’；</p>
                        <p>     message没有索引，所以走的是全表扫描过滤。这时表上的各个记录都将添加上X锁。</p>
                        <p><img src='https://gitee.com/nick070809/pics/raw/master/skill/27.png' alt='' /></p>
                        <p>所以，在删除的时候尽量不要使用第三种方式，应该先查出结果，在执行删除主键方式的方式。</p>
                        <h3 id="锁与隔离级别的关系"><a href="javascript:void(0)" class="anchor">锁与隔离级别的关系</a></h3>
                        <p>	大学数据库原理都学过，为了保证并发操作数据的正确性，数据库都会有事务隔离级别的概念：1）未提交读（Read uncommitted）；2）已提交读（Read committed（RC））；3）可重复读（Repeatable read（RR））；4）可串行化（Serializable）。我们较常使用的是RC和RR。</p>
                        <p>	提交读(RC)：只能读取到已经提交的数据。</p>
                        <p>	可重复读(RR)：在同一个事务内的查询都是事务开始时刻一致的，InnoDB默认级别。</p>
                        <p>	RC隔离级别下的锁，它可以防止不同事务版本的数据修改提交时造成数据冲突的情况，但当别的事务插入数据时可能会出现问题。</p>
                        <p>	RC级别下尽管加了行锁，但还是避免不了不可重复读(修改数据)和幻读(插入数据)。</p>
                        <p>	<strong>innodb的RR隔离级别可以避免不可重复读，怎么实现？当然需要借助于锁了</strong>！</p>
                        <p><img src='https://gitee.com/nick070809/pics/raw/master/skill/28.png' alt='' /></p>
                        <h3 id="gap锁(间隙锁)"><a href="javascript:void(0)" class="anchor">gap锁(间隙锁)</a></h3>
                        <p>为了解决幻读问题，innodb引入了gap锁。</p>
                        <p>      在事务A执行：update msg set message=‘订单’ where token=‘asd’;</p>
                        <p>      innodb首先会和RC级别一样，给索引上的记录添加上X锁，此外，还在非唯一索引’asd’与相邻两个索引的区间加上锁。</p>
                        <p>       这样，当事务B在执行insert into msg values (null,‘asd&#39;,’hello’); commit;时，会首先检查这个区间是否被锁上，如果被锁上，则不能立即执行，需要等待该gap锁被释放。这样就能避免幻读问题</p>
                        <p><img src='https://gitee.com/nick070809/pics/raw/master/skill/29.png' alt='' /></p>
                        <p>有待确认。</p>
                        <h2 id="死锁成因"><a href="javascript:void(0)" class="anchor">死锁成因</a></h2>
                        <p>了解了innodb锁的基本原理后，下面分析下死锁的成因。如前面所说，死锁一般是事务相互等待对方资源，最后形成环路造成的。下面简单讲下造成相互等待最后形成环路的例子。</p>
                        <h3 id="不同表相同记录行锁冲突"><a href="javascript:void(0)" class="anchor">不同表相同记录行锁冲突</a></h3>
                        <p> 这种情况很好理解，事务A和事务B操作两张表，但出现循环等待锁情况。</p>
                        <p><img src='https://gitee.com/nick070809/pics/raw/master/skill/30.png' alt='' /></p>
                        <h3 id="相同表记录行锁冲突"><a href="javascript:void(0)" class="anchor">相同表记录行锁冲突</a></h3>
                        <p>这种情况比较常见，之前遇到两个job在执行数据批量更新时，jobA处理的的id列表为[1,2,3,4]，而job处理的id列表为[8,9,10,4,2]，这样就造成了死锁。</p>
                        <p><img src='https://gitee.com/nick070809/pics/raw/master/skill/31.png' alt='' /></p>
                        <h3 id="不同索引锁冲突"><a href="javascript:void(0)" class="anchor">不同索引锁冲突</a></h3>
                        <p>     这种情况比较隐晦，事务A在执行时，除了在二级索引加锁外，还会在聚簇索引上加锁，在聚簇索引上加锁的顺序是[1,4,2,3,5]，而事务B执行时，只在聚簇索引上加锁，加锁顺序是[1,2,3,4,5]，这样就造成了死锁的可能性。</p>
                        <p><img src='https://gitee.com/nick070809/pics/raw/master/skill/32.png' alt='' /></p>
                        <h3 id="gap锁冲突"><a href="javascript:void(0)" class="anchor">gap锁冲突</a></h3>
                        <p> innodb在RR级别下，如下的情况也会产生死锁，比较隐晦。 </p>
                        <p><img src='https://gitee.com/nick070809/pics/raw/master/skill/33.png' alt='' /></p>
                        <p>&nbsp;</p>
                        <h2 id="如何尽可能避免死锁"><a href="javascript:void(0)" class="anchor">如何尽可能避免死锁</a></h2>
                        <p>1）以固定的顺序访问表和行。比如对第2节两个job批量更新的情形，简单方法是对id列表先排序，后执行，这样就避免了交叉等待锁的情形；又比如对于3.1节的情形，将两个事务的sql顺序调整为一致，也能避免死锁。</p>
                        <p>2）大事务拆小。大事务更倾向于死锁，如果业务允许，将大事务拆小。</p>
                        <p>3）在同一个事务中，尽可能做到一次锁定所需要的所有资源，减少死锁概率。</p>
                        <p>4）降低隔离级别。如果业务允许，将隔离级别调低也是较好的选择，比如将隔离级别从RR调整为RC，可以避免掉很多因为gap锁造成的死锁。</p>
                        <p>5）为表添加合理的索引。可以看到如果不走索引将会为表的每一行记录添加上锁，死锁的概率大大增大。</p>
                        <h2 id="如何定位死锁成因"><a href="javascript:void(0)" class="anchor">如何定位死锁成因</a></h2>
                        <p>1）通过应用业务日志定位到问题代码，找到相应的事务对应的sql；</p>
                        <p>      因为死锁被检测到后会回滚，这些信息都会以异常反应在应用的业务日志中，通过这些日志我们可以定位到相应的代码，并把事务的sql给梳理出来。</p>
                        <p>2）确定数据库隔离级别。</p>
                        <p>     执行select @@global.tx_isolation，可以确定数据库的隔离级别，我们数据库的隔离级别是RC，这样可以很大概率排除gap锁造成死锁的嫌疑;</p>
                        <p>3）找DBA执行下show InnoDB STATUS看看最近死锁的日志。</p>
                        <p>     这个步骤非常关键。通过DBA的帮忙，我们可以有更为详细的死锁信息。通过此详细日志一看就能发现，与之前事务相冲突的事务结构如下：</p>
                        <pre><code>start tran<br/>
                        1&nbsp;updateSessionUser<br/>
                        2&nbsp;deleteHeartCheckDOByToken<br/>
                        ...<br/>
                        commit<br/>
                        </code></pre>
                        <h1 id="MySQL的默认事务隔离级别"><a href="javascript:void(0)" class="anchor">MySQL的默认事务隔离级别</a></h1>
                        <p>大多数的数据库系统的默认事务隔离级别都是：Read committed</p>
                        <p>而MySQL的默认事务隔离级别是：Repeatable Read</p>
                        <p>SELECT @@tx_isolation;</p>
                        <p>使用命令：SET session TRANSACTION ISOLATION LEVEL Serializable;（参数可以为：Read uncommitted，Read committed，Repeatable，Serializable）</p>
                        <p>将MySQL中的事务隔离级别改变成：Serializable，范围是当前session，即一个cmd窗口的范围。</p>
                        <p>这里修改事务权限的语句是：set [ global | session ] transaction isolation level Read uncommitted | Read committed | Repeatable | Serializable;</p>
                        <p>如果选择global，意思是此语句将应用于之后的所有session，而当前已经存在的session不受影响。</p>
                        <p>如果选择session，意思是此语句将应用于当前session内之后的所有事务。</p>
                        <p>如果什么都不写，意思是此语句将应用于当前session内的下一个还未开始的事务。</p>
                        <h3 id="mysql自动事务提交"><a href="javascript:void(0)" class="anchor">mysql自动事务提交</a></h3>
                        <p>show variables like &#39;%autocommit%&#39; </p>
                        <p>设置mysql数据库也是手动提交事务。方法有两种：①临时生效（只对当前客户端有效），②永久生效</p>
                        <p><strong>①*</strong>*临时生效（只对当前客户端有效）**</p>
                        <p>set @@autocommit=0 （0为关闭状态，1为开启状态） </p>
                        <p><strong>此方式只对本次客户端有效，关闭后自动恢复自动提交事务状态。</strong></p>
                        <p><strong>②永久生效（通过修改配置文件参数设置）</strong></p>
                        <p>一、在Linux系统中：</p>
                        <p>    通过修改配置文件my.cnf文件，通过vim编辑my.cnf文件，在<strong>[mysqld]（服务器选项下）</strong>添加:</p>
                        <p>    <strong>autocommit=0</strong></p>
                        <p>    保存，然后重启mysql服务即可生效。</p>
                    </Col>
                    <Col span={1}>
                    </Col>
                    <Col span={4}>
                         <Anchor showInkInFixed="true">
                             <Link href="#mysql并发策略" title="mysql并发策略">
                                 <Link href="#乐观锁需要注意什么" title="乐观锁需要注意什么"/>
                                 <Link href="#MVCC" title="MVCC">
                                     <Link href="#MVCC select无锁操作是如何实现的？" title="MVCC select无锁操作是如何实现的？"/>
                                     <Link href="#Select" title="Select"/>
                                     <Link href="#Insert" title="Insert"/>
                                     <Link href="#Delete" title="Delete"/>
                                     <Link href="#Update" title="Update"/>
                                 </Link>
                                 <Link href="#MVCC 保证了可重复读吗？" title="MVCC 保证了可重复读吗？">
                                     <Link href="#Repeatable-read" title="Repeatable-read"/>
                                     <Link href="#commited-read" title="commited-read"/>
                                 </Link>
                             </Link>

                             <Link href="#mysql死锁问题分析 " title="mysql死锁问题分析 ">
                                <Link href="#死锁是怎么被发现的？" title="死锁是怎么被发现的？"/>
                                <Link href="#wait-for graph原理" title="wait-for graph原理"/>
                             </Link>

                             <Link href="#innodb隔离级别、索引与锁 " title="innodb隔离级别、索引与锁 ">
                                 <Link href="#锁与索引的关系" title="锁与索引的关系"/>
                                 <Link href="#锁与隔离级别的关系" title="锁与隔离级别的关系"/>
                                 <Link href="#gap锁(间隙锁)" title="gap锁(间隙锁)"/>
                             </Link>

                             <Link href="#死锁成因" title="死锁成因">
                                 <Link href="#不同表相同记录行锁冲突" title="不同表相同记录行锁冲突"/>
                                 <Link href="#相同表记录行锁冲突" title="相同表记录行锁冲突"/>
                                 <Link href="#不同索引锁冲突" title="不同索引锁冲突"/>
                                 <Link href="#gap锁冲突" title="gap锁冲突"/>
                             </Link>
                             <Link href="#如何尽可能避免死锁" title="如何尽可能避免死锁"/>
                             <Link href="#如何定位死锁成因" title="如何定位死锁成因"/>
                             <Link href="#MySQL的默认事务隔离级别" title="MySQL的默认事务隔离级别"/>
                             <Link href="#mysql自动事务提交" title="mysql自动事务提交"/>
                         </Anchor>
                    </Col>
                </Row>


            </div>

        );
    }
}

export default ASK10;
