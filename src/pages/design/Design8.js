import React, {Component} from 'react';
import {Anchor, Row, Col} from 'antd';





class Design8 extends Component {


    render() {

        return (
            <div>
                <Row>
                    <Col span={19}>
                        <h2 id="NIO 和 IO 的对比"><a href="javascript:void(0)" class="anchor">NIO 和 IO 的对比</a></h2>
                        <p>IO 和 NIO 的区别主要体现在三个方面:</p>
                        <ul>
                            <li>IO 基于流(Stream oriented), 而 NIO 基于 Buffer (Buffer oriented)</li>
                            <li>IO 操作是阻塞的, 而 NIO 操作是非阻塞的</li>
                            <li>IO 没有 selector 概念, 而 NIO 有 selector 概念.</li>
                        </ul>
                        <h3 id="基于 Stream 与基于 Buffer"><a href="javascript:void(0)" class="anchor">基于 Stream 与基于 Buffer</a></h3>
                        <p>传统的 IO 是面向字节流或字符流的, 而在 NIO 中, 我们抛弃了传统的 IO 流, 而是引入了 Channel 和 Buffer 的概念. 在 NIO 中, 我只能从 Channel 中读取数据到 Buffer 中或将数据从 Buffer 中写入到 Channel.
                            那么什么是 <strong>基于流</strong> 呢? 在一般的 Java IO 操作中, 我们以流式的方式顺序地从一个 Stream 中读取一个或多个字节, 因此我们也就不能随意改变读取指针的位置.
                            而 基于 Buffer 就显得有点不同了. 我们首先需要从 Channel 中读取数据到 Buffer 中, 当 Buffer 中有数据后, 我们就可以对这些数据进行操作了. 不像 IO 那样是顺序操作, NIO 中我们可以随意地读取任意位置的数据。</p>
                        <h3 id="阻塞和非阻塞"><a href="javascript:void(0)" class="anchor">阻塞和非阻塞</a></h3>
                        <p>Java 提供的各种 Stream 操作都是阻塞的, 例如我们调用一个 read 方法读取一个文件的内容, 那么调用 read 的线程会被阻塞住, 直到 read 操作完成.
                            而 NIO 的非阻塞模式允许我们非阻塞地进行 IO 操作. 例如我们需要从网络中读取数据, 在 NIO 的非阻塞模式中, 当我们调用 read 方法时, 如果此时有数据, 则 read 读取并返回; 如果此时没有数据, 则 read 直接返回, 而不会阻塞当前线程。</p>
                        <h3 id="selector"><a href="javascript:void(0)" class="anchor">selector</a></h3>
                        <p>selector 是 NIO 中才有的概念, 它是 Java NIO 之所以可以非阻塞地进行 IO 操作的关键.
                            通过 Selector, 一个线程可以监听多个 Channel 的 IO 事件, 当我们向一个 Selector 中注册了 Channel 后, Selector 内部的机制就可以自动地为我们不断地查询(select) 这些注册的 Channel 是否有已就绪的 IO 事件(例如可读, 可写, 网络连接完成等). 通过这样的 Selector 机制, 我们就可以很简单地使用一个线程高效地管理多个 Channel 了。</p>
                        <h3 id="NIO Channel"><a href="javascript:void(0)" class="anchor">NIO Channel</a></h3>
                        <p>通常来说, 所有的 NIO 的 I/O 操作都是从 Channel 开始的. 一个 channel 类似于一个 stream.
                            java Stream 和 NIO Channel 对比</p>
                        <ul>
                            <li>我们可以在同一个 Channel 中执行读和写操作, 然而同一个 Stream 仅仅支持读或写.</li>
                            <li>Channel 可以异步地读写, 而 Stream 是阻塞的同步读写.</li>
                            <li>Channel 总是从 Buffer 中读取数据, 或将数据写入到 Buffer 中.</li>
                        </ul>
                        <h3 id="Channel 的类型"><a href="javascript:void(0)" class="anchor">Channel 的类型</a></h3>
                        <ul>
                            <li>FileChannel, 文件操作</li>
                            <li>DatagramChannel, UDP 操作</li>
                            <li>SocketChannel, TCP 操作</li>
                            <li>ServerSocketChannel, TCP 操作, 使用在服务器端.
                                这些通道涵盖了 UDP 和 TCP网络 IO以及文件 IO.</li>
                        </ul>
                        <p>基本的 Channel 使用例子：</p>
                        <pre><code>public static void main( String[] args ) throws Exception<br/>
                            {this.s}<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;RandomAccessFile&nbsp;aFile&nbsp;=&nbsp;new&nbsp;RandomAccessFile(&quot;/Users/xiongyongshun/settings.xml&quot;,&nbsp;&quot;rw&quot;);<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;FileChannel&nbsp;inChannel&nbsp;=&nbsp;aFile.getChannel();<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;ByteBuffer&nbsp;buf&nbsp;=&nbsp;ByteBuffer.allocate(48);<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;int&nbsp;bytesRead&nbsp;=&nbsp;inChannel.read(buf);<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;while&nbsp;(bytesRead&nbsp;!=&nbsp;-1)&nbsp;{this.s}<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;buf.flip();<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;while(buf.hasRemaining()){this.s}<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;System.out.print((char)&nbsp;buf.get());<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;buf.clear();<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;bytesRead&nbsp;=&nbsp;inChannel.read(buf);<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;}<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;aFile.close();<br/>
}<br/>
</code></pre>
                        <h3 id="FileChannel"><a href="javascript:void(0)" class="anchor">FileChannel</a></h3>
                        <p>FileChannel 是操作文件的Channel, 我们可以通过 FileChannel 从一个文件中读取数据, 也可以将数据写入到文件中.
                            <strong>注意</strong>, FileChannel 不能设置为非阻塞模式.</p>
                        <h4 id="写入数据"><a href="javascript:void(0)" class="anchor">写入数据</a></h4>
                        <pre><code>FileChannel inChannel = aFile.getChannel();<br/>
String&nbsp;newData&nbsp;=&nbsp;&quot;New&nbsp;String&nbsp;to&nbsp;write&nbsp;to&nbsp;file...&quot;&nbsp;+&nbsp;System.currentTimeMillis();<br/>
ByteBuffer&nbsp;buf&nbsp;=&nbsp;ByteBuffer.allocate(48);<br/>
buf.clear();<br/>
buf.put(newData.getBytes());<br/>
buf.flip();<br/>
while(buf.hasRemaining())&nbsp;{this.s}<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;inChannel.write(buf);<br/>
}<br/>
</code></pre>
                        <h4 id="关闭"><a href="javascript:void(0)" class="anchor">关闭</a></h4>
                        <p>当我们对 FileChannel 的操作完成后, 必须将其关闭；</p>
                        <h4 id="设置 position"><a href="javascript:void(0)" class="anchor">设置 position</a></h4>
                        <pre><code>FileChannel inChannel = aFile.getChannel();<br/>
inChannel.position(153);<br/>
//o.channels.FileChannel;发现位置偏移了<br/>
</code></pre>
                        <h4 id="文件大小"><a href="javascript:void(0)" class="anchor">文件大小</a></h4>
                        <p>我们可以通过 channel.size()获取关联到这个 Channel 中的文件的大小. <strong>注意</strong>, 这里返回的是文件的大小, 而不是 Channel 中剩余的元素个数.</p>
                        <h4 id="截断文件"><a href="javascript:void(0)" class="anchor">截断文件</a></h4>
                        <pre><code>channel.truncate(1024); <br/>
</code></pre>
                        <p>将文件的大小截断为1024字节。注意!文件内容被截断了。</p>
                        <h4 id="强制写入"><a href="javascript:void(0)" class="anchor">强制写入</a></h4>
                        <p>我们可以强制将缓存的未写入的数据写入到文件中:</p>
                        <pre><code>channel.force(true);<br/>
</code></pre>
                        <h3 id="ServerSocketChannel"><a href="javascript:void(0)" class="anchor">ServerSocketChannel</a></h3>
                        <p>ServerSocketChannel 是用在服务器为端的, 可以监听客户端的 TCP 连接, 例如:</p>
                        <p><a href='https://segmentfault.com/a/1190000006824107' target='_blank' >https://segmentfault.com/a/1190000006824107</a></p>
                        <p><a href='http://www.blogjava.net/DLevin/archive/2015/09/04/427031.html' target='_blank' >http://www.blogjava.net/DLevin/archive/2015/09/04/427031.html</a></p>
                        <p><a href='https://www.cnblogs.com/showing/p/6759653.html' target='_blank' >https://www.cnblogs.com/showing/p/6759653.html</a></p>
                        <p><a href='https://blog.csdn.net/zhxdick/article/category/6086991' target='_blank' >https://blog.csdn.net/zhxdick/article/category/6086991</a></p>
                        <p><a href='https://blog.csdn.net/liuj2511981/article/details/42460069' target='_blank' >https://blog.csdn.net/liuj2511981/article/details/42460069</a></p>
                        <p>&nbsp;</p>
                        <p><a href='http://www.blogjava.net/heavensay/archive/2012/11/07/389685.html' target='_blank' >http://www.blogjava.net/heavensay/archive/2012/11/07/389685.html</a></p>
                        <p><a href='http://www.iocoder.cn/categories/Sharding-JDBC/' target='_blank' >http://www.iocoder.cn/categories/Sharding-JDBC/</a></p>
                        <p>&nbsp;</p>
                        <h3 id="SocketChannel"><a href="javascript:void(0)" class="anchor">SocketChannel</a></h3>
                        <p>SocketChannel 是一个客户端用来进行 TCP 连接的 Channel.
                            创建一个 SocketChannel 的方法有两种:</p>
                        <ul>
                            <li>打开一个 SocketChannel, 然后将其连接到某个服务器中</li>
                            <li>当一个 ServerSocketChannel 接受到连接请求时, 会返回一个 SocketChannel 对象.</li>
                        </ul>
                        <h4 id="打开 SocketChannel"><a href="javascript:void(0)" class="anchor">打开 SocketChannel</a></h4>
                        <pre><code>SocketChannel socketChannel = SocketChannel.open();<br/>
socketChannel.connect(new&nbsp;InetSocketAddress(&quot;http://example.com&quot;,&nbsp;80));<br/>
</code></pre>
                        <h4 id="关闭"><a href="javascript:void(0)" class="anchor">关闭</a></h4>
                        <pre><code>socketChannel.close();<br/>
</code></pre>
                        <h4 id="读取数据"><a href="javascript:void(0)" class="anchor">读取数据</a></h4>
                        <pre><code>ByteBuffer buf = ByteBuffer.allocate(48);<br/>
int&nbsp;bytesRead&nbsp;=&nbsp;socketChannel.read(buf);<br/>
</code></pre>
                        <h4 id="非阻塞模式"><a href="javascript:void(0)" class="anchor">非阻塞模式</a></h4>
                        <pre><code>socketChannel.configureBlocking(false);<br/>
</code></pre>
                        <p>&nbsp;</p>
                        <p>&nbsp;</p>
                        <p>&nbsp;</p>
                        <p>&nbsp;</p>
                        <p>&nbsp;</p>
                        <p>&nbsp;</p>
                        <p>&nbsp;</p>
                        <h2 id="无阻塞IO"><a href="javascript:void(0)" class="anchor">无阻塞IO</a></h2>
                        <p>无阻塞IO是使用单线程或者只使用少量的多线程，每个连接共用一个线程，当处于等待（没有事件）的时候线程资源可以释放出来处理别的请求，通过事件驱动模型当有accept/read/write等事件发生后通知（唤醒）主线程分配资源来处理相关事件。java.nio.channels.Selector就是在该模型中事件的观察者，可以将多个SocketChannel的事件注册到一个Selector上，当没有事件发生时Selector处于阻塞状态，当SocketChannel有accept/read/write等事件发生时唤醒Selector。</p>
                        <p><img src={require('../../imgs/design/d20.png' )}/></p>
                        <pre><code>public class SelectorServer {this.s}<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;Selector&nbsp;selector&nbsp;=null;<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;public&nbsp;&nbsp;void&nbsp;&nbsp;start()&nbsp;throws&nbsp;IOException&nbsp;{this.s}<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;selector&nbsp;=&nbsp;Selector.open();<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;ServerSocketChannel&nbsp;ssc&nbsp;=&nbsp;ServerSocketChannel.open();<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;ssc.configureBlocking(false);<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;ssc.socket().bind(new&nbsp;InetSocketAddress(8002));<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;ssc.register(selector,&nbsp;SelectionKey.OP_ACCEPT);<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;for&nbsp;(;;)&nbsp;{this.s}<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;//&nbsp;select()阻塞，等待有事件发生唤醒<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;int&nbsp;selected&nbsp;=&nbsp;selector.select();<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;System.out.println(selected);<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;if&nbsp;(selected&nbsp;&gt;&nbsp;0)&nbsp;{this.s}<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Iterator&lt;SelectionKey&gt;&nbsp;selectedKeys&nbsp;=&nbsp;selector.selectedKeys().iterator();<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;while&nbsp;(selectedKeys.hasNext())&nbsp;{this.s}<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;SelectionKey&nbsp;key&nbsp;=&nbsp;selectedKeys.next();<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;if&nbsp;((key.readyOps()&nbsp;&amp;&nbsp;SelectionKey.OP_ACCEPT)&nbsp;==&nbsp;SelectionKey.OP_ACCEPT)&nbsp;{this.s}<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;System.out.println(&quot;OP_ACCEPT&quot;);<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;//&nbsp;处理&nbsp;accept&nbsp;事件<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}&nbsp;else&nbsp;if&nbsp;((key.readyOps()&nbsp;&amp;&nbsp;SelectionKey.OP_READ)&nbsp;==&nbsp;SelectionKey.OP_READ)&nbsp;{this.s}<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;System.out.println(&quot;OP_READ&quot;);<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;//&nbsp;处理&nbsp;read&nbsp;事件<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}&nbsp;else&nbsp;if&nbsp;((key.readyOps()&nbsp;&amp;&nbsp;SelectionKey.OP_WRITE)&nbsp;==&nbsp;SelectionKey.OP_WRITE)&nbsp;{this.s}<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;System.out.println(&quot;OP_WRITE&quot;);<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;//&nbsp;处理&nbsp;write&nbsp;事件<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;selectedKeys.remove();<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;}<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;public&nbsp;static&nbsp;void&nbsp;main(String[]&nbsp;args)&nbsp;throws&nbsp;IOException&nbsp;{this.s}<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;new&nbsp;SelectorServer().start();<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;}<br/>
}<br/>
</code></pre>
                        <p>阻塞后唤醒可以通过注册在selector上的socket有事件发生 或者 selector.select(timeOut)超时 或者 selector.wakeup()主动唤醒；</p>
                        <p>流程图：</p>
                        <p><img src={require('../../imgs/design/d21.jpg' )}/></p>
                        <p>现在通过openjdk中的源码来解析上图中的每一个环节：</p>
                        <h3 id="Selector.open()"><a href="javascript:void(0)" class="anchor">Selector.open()</a></h3>
                        <pre><code>Selector.java  <br/>
-----&nbsp;&nbsp;<br/>
public&nbsp;static&nbsp;Selector&nbsp;open()&nbsp;throws&nbsp;IOException&nbsp;{this.s}&nbsp;&nbsp;&nbsp;&nbsp;<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;return&nbsp;SelectorProvider.provider().openSelector();&nbsp;&nbsp;&nbsp;&nbsp;<br/>
}&nbsp;&nbsp;<br/>
</code></pre>
                        <p>其中provider = sun.nio.ch.DefaultSelectorProvider.create();会根据操作系统来返回不同的实现类，windows平台就返回WindowsSelectorProvider；
                            这里主要以windows的实现来梳理整个流程，拿到provider后来看openSelector()中的实现</p>
                    </Col>
                    <Col span={1}>
                    </Col>
                    <Col span={4}>
                        <Anchor showInkInFixed="true">
                            <Link href="#NIO 和 IO 的对比" title="NIO 和 IO 的对比">
                            <Link href="#基于 Stream 与基于 Buffer" title="基于 Stream 与基于 Buffer"/>
                            <Link href="#阻塞和非阻塞" title="阻塞和非阻塞"/>
                            <Link href="#selector" title="selector"/>
                            <Link href="#NIO Channel" title="NIO Channel"/>
                            <Link href="#Channel 的类型" title="Channel 的类型"/>
                            <Link href="#FileChannel" title="FileChannel">
                            <Link href="#写入数据" title="写入数据"/>
                            <Link href="#关闭" title="关闭"/>
                            <Link href="#设置 position" title="设置 position"/>
                            <Link href="#文件大小" title="文件大小"/>
                            <Link href="#截断文件" title="截断文件"/>
                            <Link href="#强制写入" title="强制写入"/>
                            </Link>
                            <Link href="#ServerSocketChannel" title="ServerSocketChannel"/>
                            <Link href="#SocketChannel" title="SocketChannel">
                            <Link href="#打开 SocketChannel" title="打开 SocketChannel"/>
                            <Link href="#关闭" title="关闭"/>
                            <Link href="#读取数据" title="读取数据"/>
                            <Link href="#非阻塞模式" title="非阻塞模式"/>
                            </Link>
                            <Link href="#无阻塞IO" title="无阻塞IO"/>
                            <Link href="#Selector.open()" title="Selector.open()"/>
                            </Link>
                        </Anchor>
                    </Col>
                </Row>


            </div>

        );
    }
}

export default Design8;
