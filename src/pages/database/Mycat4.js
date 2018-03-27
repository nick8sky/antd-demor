import React, { Component } from 'react';
import Markdown  from 'react-markdown';



class Mycat4 extends Component {
    render() {


        return (
            <div>
                <Markdown source={"## MyCat架构-前端通信篇\n" +
                "\n" +
                "参考：http://blog.csdn.net/zhxdick/article/details/50619499\n" +
                "\n" +
                "阅读本节之前，需要掌握 NIO(netty)知识。\n" +
                "\n" +
                "![Markdown](http://img.blog.csdn.net/20160216201657595)\n" +
                "\n" +
                "\n" +
                "\n" +
                "![Markdown](http://img.blog.csdn.net/20160217135550332)\n" +
                "\n" +
                "**1、通信架构**\n" +
                "\n" +
                "从上图中，可以发现前端与后端通信框架都为NIO/AIO\n" +
                "\n" +
                "\n" +
                "\n" +
                "**2、架构思想**\n" +
                "\n" +
                "仿造mysql客户端进行通信，封装分库分表功能。\n" +
                "\n" +
                "![Markdown](https://thumbnail0.baidupcs.com/thumbnail/51fe58460bdcca9fde661b31e88b5eac?fid=940423185-250528-900777535694191&time=1520089200&rt=sh&sign=FDTAER-DCb740ccc5511e5e8fedcff06b081203-9rWoz6KiQ2dla1szo9%2F5VYCPeQs%3D&expires=8h&chkv=0&chkbd=0&chkpc=&dp-logid=1437138150887655738&dp-callid=0&size=c710_u400&quality=100&vuk=-&ft=video)\n" +
                "\n" +
                "mysql客户端连接时mysql服务器抓包:\n" +
                "\n" +
                "![](http://img.blog.csdn.net/20160217110236916)\n" +
                "\n" +
                "![](http://img.blog.csdn.net/20160217110253370)\n" +
                "\n" +
                "从抓包内容上看到，前三次通信和tcp三次握手一致；mycat通过NIOAcceptor实现，NIOAcceptor主要完成绑定端口，注册OP_ACCEPT监听客户端连接事件，有客户连接，则放接受连接，将返回的channel封装成为FrontendConnection（AbstarctConnection的子类），从NIOReactorPool中拿出一个NIOReactor并将FrontendConnection交给它绑定。 \n" +
                "到此，NIOAcceptor就处理完一个客户端的连接请求。\n" +
                "\n" +
                "```\n" +
                "public NIOAcceptor(String name, String bindIp, int port,\n" +
                "                       FrontendConnectionFactory factory, NIOReactorPool reactorPool)\n" +
                "            throws IOException {\n" +
                "        super.setName(name);\n" +
                "        this.port = port;\n" +
                "        this.selector = Selector.open();//如果linux的select线程没有开启，则开启\n" +
                "        this.serverChannel = ServerSocketChannel.open(); //开启servere端channel\n" +
                "        this.serverChannel.configureBlocking(false);  //设置为异步\n" +
                "        //设置TCP属性 \n" +
                "        serverChannel.setOption(StandardSocketOptions.SO_REUSEADDR, true);\n" +
                "        serverChannel.setOption(StandardSocketOptions.SO_RCVBUF, 1024 * 16 * 2);\n" +
                "        // backlog=100\n" +
                "        serverChannel.bind(new InetSocketAddress(bindIp, port), 100); //将channel绑定到可访问的ip.端口上\n" +
                "        this.serverChannel.register(selector, SelectionKey.OP_ACCEPT); //channel注册到select上,监听事件OP_ACCEPT，\n" +
                "        //FrontendConnectionFactory,用来封装channel成为FrontendConnection\n" +
                "        this.factory = factory;\n" +
                "        //NIOReactor池\n" +
                "        this.reactorPool = reactorPool;\n" +
                "    }\n" +
                "```\n" +
                "\n" +
                " \n" +
                "在NIOAcceptor启动后：\n" +
                "\n" +
                "```\n" +
                "    @Override\n" +
                "    public void run() {\n" +
                "        final Selector tSelector = this.selector;\n" +
                "        for (; ; ) {  //没有使用while,根据编译器不同情况有所不同，例如写死循环while(true)有的编译器会傻傻的每次都把true做一下判断，所以一般用for（;;）写死循环比较好\n" +
                "            ++acceptCount;\n" +
                "            try {\n" +
                "                //轮询发现新连接请求\n" +
                "                tSelector.select(1000L); //BO\n" +
                "                Set<SelectionKey> keys = tSelector.selectedKeys();\n" +
                "                try {\n" +
                "                    for (SelectionKey key : keys) {\n" +
                "                        if (key.isValid() && key.isAcceptable()) {\n" +
                "                            //接受连接操作\n" +
                "                            accept();\n" +
                "                        } else {\n" +
                "                            key.cancel();\n" +
                "                        }\n" +
                "                    }\n" +
                "                } finally {\n" +
                "                    keys.clear();\n" +
                "                }\n" +
                "            } catch (Exception e) {\n" +
                "                LOGGER.warn(getName(), e);\n" +
                "            }\n" +
                "        }\n" +
                "    }\n" +
                "```\n" +
                "\n" +
                "NIOAcceptor这个线程不断轮询接受新的客户端连接请求，接受连接操作：\n" +
                "\n" +
                "```\n" +
                "    private void accept() {\n" +
                "        SocketChannel channel = null;\n" +
                "        try {\n" +
                "            //得到通信channel并设置为非阻塞\n" +
                "            channel = serverChannel.accept();\n" +
                "            channel.configureBlocking(false);\n" +
                "            //封装channel为FrontendConnection\n" +
                "            FrontendConnection c = factory.make(channel);\n" +
                "            c.setAccepted(true);\n" +
                "            c.setId(ID_GENERATOR.getId());\n" +
                "            //利用NIOProcessor管理前端链接，定期清除空闲连接，同时做写队列检查\n" +
                "            //processor 池化\n" +
                "            NIOProcessor processor = (NIOProcessor) MycatServer.getInstance()\n" +
                "                    .nextProcessor();\n" +
                "            c.setProcessor(processor);\n" +
                "            //和具体执行selector响应感兴趣事件的NIOReactor绑定\n" +
                "            //reactor 池化\n" +
                "            NIOReactor reactor = reactorPool.getNextReactor();\n" +
                "            reactor.postRegister(c);\n" +
                "\n" +
                "        } catch (Exception e) {\n" +
                "            LOGGER.warn(getName(), e);\n" +
                "            closeChannel(channel);\n" +
                "        }\n" +
                "    }\n" +
                "```\n" +
                "\n" +
                "上面的代码中，processor 和 reactor 都进行了池化，可以在代码中借鉴，避免开辟太多的对象或线程，浪费内存创建及回收。\n" +
                "\n" +
                "\n" +
                "\n" +
                "---\n" +
                "\n" +
                "### 握手包HandshakePacket\n" +
                "\n" +
                "上一节说到，NIOAcceptor的accept()最后将FrontendConnection交给了NIOReactor池其中的一个NIOReactor。调用的是 postRegister(AbstractConnection c)方法:\n" +
                "\n" +
                "```\n" +
                "final void postRegister(AbstractConnection c) {\n" +
                "\treactorR.registerQueue.offer(c);\n" +
                "\treactorR.selector.wakeup();\n" +
                "}\n" +
                "```\n" +
                "\n" +
                "**NIOReactor就当做是一个网络事件反应转发器**！！\n" +
                "\n" +
                "postRegister将刚才传入的FrontendConnection放入RW线程的注册队列。之后，唤醒RW线程的selector。 为什么放入RW线程的注册队列，而不是直接注册呢？如果是直接注册，那么就是NIOAcceptor这个线程负责注册，这里就会有锁竞争，因为NIOAcceptor这个线程和每个RW线程会去竞争selector的锁。这样NIOAcceptor就不能高效的处理连接。所以，更好的方式是将FrontendConnection放入RW线程的注册队列，之后让RW线程自己完成注册工作。 \n" +
                "\n" +
                "NIOReactor ：\n" +
                "\n" +
                "```\n" +
                "calss NIOReactor {\n" +
                "    RW reactorR = new RW(); //伪代码\n" +
                "\tfinal void postRegister(AbstractConnection c) {\n" +
                "\t\treactorR.registerQueue.offer(c);//使用内部对象属性直接调用方法\n" +
                "\t\treactorR.selector.wakeup();\n" +
                "    }\n" +
                "\tprivate final class RW implements Runnable {\n" +
                "\t\tprivate volatile Selector selector;  //nio.selector\n" +
                "\t\tprivate final ConcurrentLinkedQueue<AbstractConnection> registerQueue;\n" +
                "\t\t...\n" +
                "   }\n" +
                "}\n" +
                "```\n" +
                "\n" +
                "因为NIOAcceptor线程和RW线程都会操作NIOReactor.RW线程进行注册队列(见第二张图)，所以要用ConcurrentLinkedQueue (以Concurrent开头的集合类均为线程安全的)。\n" +
                "\n" +
                "代码中RW为Runnable的实现类，自然就有run方法和启动调用start了,也在NIOReactor中：\n" +
                "\n" +
                "```\n" +
                "\tfinal void startup() {\n" +
                "\t\tnew Thread(reactorR, name + \"-RW\").start();\n" +
                "\t}\n" +
                "```\n" +
                "\n" +
                "而reactor.startup();是在NIOReactorPool初始过程中，就被启动了。\n" +
                "\n" +
                "NIOReactorPool:\n" +
                "\n" +
                "```\n" +
                "\tpublic NIOReactorPool(String name, int poolSize) throws IOException {\n" +
                "\t\treactors = new NIOReactor[poolSize];\n" +
                "\t\tfor (int i = 0; i < poolSize; i++) {\n" +
                "\t\t\tNIOReactor reactor = new NIOReactor(name + \"-\" + i);\n" +
                "\t\t\treactors[i] = reactor;\n" +
                "\t\t\treactor.startup();\n" +
                "\t\t}\n" +
                "\t}\n" +
                "```\n" +
                "\n" +
                "\n" +
                "\n" +
                "回到 reactorR.registerQueue.offer(c);既然向队列中插入连接，必然要在run方法中取出连接，并处理。\n" +
                "\n" +
                "RW：\n" +
                "\n" +
                "```\n" +
                "private void register(Selector selector) {\n" +
                "\t...\n" +
                "    while ((c = registerQueue.poll()) != null) {\n" +
                "    \t//默认为NIOSocketWR\n" +
                "    \t((NIOSocketWR) c.getSocketWR()).register(selector); //NIOSocketWR注册\n" +
                "    \tc.register(); //AbstractConnection上注册\n" +
                "   \t\t...\n" +
                "    }\n" +
                "}\n" +
                "\n" +
                "@Override\n" +
                "public void run() {\n" +
                "    final Selector selector = this.selector;\n" +
                "    Set<SelectionKey> keys = null;\n" +
                "    for (;;) {\n" +
                "        ++reactCount;\n" +
                "        selector.select(500L);\n" +
                "        //从注册队列中取出AbstractConnection之后注册读事件\n" +
                "        //之后做一些列操作，请参考下面注释\n" +
                "        register(selector);\n" +
                "        keys = selector.selectedKeys();\n" +
                "        for (SelectionKey key : keys) {\n" +
                "            Object att = key.attachment();\n" +
                "            AbstractConnection con = (AbstractConnection) att;\n" +
                "            if (key.isValid() && key.isReadable()) {\n" +
                "                //异步读取数据并处理数据\n" +
                "                con.asynRead();\n" +
                "            }\n" +
                "            if (key.isValid() && key.isWritable()) {\n" +
                "                //异步写数据\n" +
                "                con.doNextWriteCheck();\n" +
                "            }\n" +
                "        ...\n" +
                "    }\n" +
                "}\n" +
                "```\n" +
                "\n" +
                "上面代码中注册了2次，一次是NIOSocketWR注册 ，一次是AbstractConnection上注册，先看FrontendConnection注册：\n" +
                "\n" +
                "```\n" +
                "@Override\n" +
                "public void register() throws IOException {\n" +
                "    ...\n" +
                "    // 发送握手数据包\n" +
                "    HandshakePacket hs = new HandshakePacket();\n" +
                "    hs.packetId = 0;\n" +
                "    hs.protocolVersion = Versions.PROTOCOL_VERSION;\n" +
                "    hs.serverVersion = Versions.SERVER_VERSION;\n" +
                "    hs.threadId = id;\n" +
                "    hs.seed = rand1;\n" +
                "    hs.serverCapabilities = getServerCapabilities();\n" +
                "    hs.serverCharsetIndex = (byte) (charsetIndex & 0xff);\n" +
                "    hs.serverStatus = 2;\n" +
                "    hs.restOfScrambleBuff = rand2;\n" +
                "    // 异步写\n" +
                "    hs.write(this);\n" +
                "    // 异步读取并处理，这个与RW线程中的asynRead()相同，之后客户端收到握手包返回AuthPacket（就是下一节）就是从这里开始看。\n" +
                "    this.asynRead();\n" +
                "}\n" +
                "```\n" +
                "\n" +
                "**这个方法就是生成HandshakePacket并发送出去，之后异步读取响应** \n" +
                "\n" +
                "MySql中的HandshakePacket结构：\n" +
                "\n" +
                "![](http://img.blog.csdn.net/20160217162258840)\n" +
                "\n" +
                "MySql中的packet类结构：\n" +
                "![](http://img.blog.csdn.net/20160217164653149)\n" +
                "\n" +
                "这里可以看出，每个包都实现了自己的包长度和信息方法，并且针对前段后端连接都有读写方法实现，所以，之后读写数据都会根据场景不同调用这些类中的方法。这些包就是整个MySql协议栈除逻辑外的内容实现。 \n" +
                "HandshakePacket.write(FrontendConnection c)方法将上面传入的数据封装成ByteBuffer，并传入给FrontendConnection c的write（ByteBuffer buffer），这个方法直接继承自AbstractConnection：\n" +
                "\n" +
                "HandshakePacket:\n" +
                "\n" +
                "```\n" +
                "public void write(FrontendConnection c) {\n" +
                "\tByteBuffer buffer = c.allocate();\n" +
                "\t...\n" +
                "\tc.write(buffer);\n" +
                "}\n" +
                "```\n" +
                "\n" +
                "AbstractConnection:\n" +
                "\n" +
                "不太懂 这段doNextWriteCheck ...\n" +
                "\n" +
                "```\n" +
                "public final void write(ByteBuffer buffer) {\n" +
                "    ...\n" +
                "    this.socketWR.doNextWriteCheck();\n" +
                "} \n" +
                "\n" +
                "public void doNextWriteCheck(){\n" +
                "    if (this.write0()  && !con.writeQueue.isEmpty())  this.write0();\n" +
                "}\n" +
                "\n" +
                "private boolean write0(){\n" +
                "\t////检查是否正在写,看CAS更新writing值是否成功\n" +
                "    if (!writing.compareAndSet(false, true)){\n" +
                "        return false;\n" +
                "    }\n" +
                "    ByteBuffer theBuffer = con.writeBuffer;\n" +
                "    //theBuffer 为空\n" +
                "    //theBuffer 满 ,回收\n" +
                "    if (theBuffer == null || !theBuffer.hasRemaining())\n" +
                "    {\n" +
                "        if (theBuffer != null){\n" +
                "            con.recycle(theBuffer);\n" +
                "            con.writeBuffer = null;\n" +
                "        }\n" +
                "        // poll again\n" +
                "        ByteBuffer buffer = con.writeQueue.poll();\n" +
                "        // more data\n" +
                "         ...\n" +
                "    } else {\n" +
                "        theBuffer.compact();\n" +
                "        asynWrite(theBuffer);\n" +
                "        return false;\n" +
                "    }\n" +
                "}\n" +
                "```\n" +
                "\n" +
                "\n" +
                "\n" +
                "---\n" +
                "\n" +
                "### 认证包AuthPacket\n" +
                "\n" +
                " 在上面代码中，FrontendConnection:\n" +
                "\n" +
                "```\n" +
                "   hs.write(this);\n" +
                "   this.asynRead();\n" +
                "```\n" +
                "\n" +
                "FrontendConnection.asynRead()方法直接调用this.socketWR.asynRead();如之前所述，一个Connection对应一个socketWR。在这里是一个FrontendConnection对应一个NIOSocketWR。NIOSocketWR是操作类，里面的方法实现异步读写。 \n" +
                "NIOSocketWR.asynRead():\n" +
                "\n" +
                "```\n" +
                "public void asynRead() throws IOException {\n" +
                "    ByteBuffer theBuffer = con.readBuffer;\n" +
                "    ...\n" +
                "    //从channel中读取数据，并且保存到对应AbstractConnection的readBuffer中，readBuffer处于write mode，返回读取了多少字节\n" +
                "    int got = channel.read(theBuffer);\n" +
                "    //调用处理读取到的数据的方法\n" +
                "    con.onReadData(got);\n" +
                "}\n" +
                "```\n" +
                "\n" +
                "AbstractConnection.onReadData(int got):\n" +
                "\n" +
                "```\n" +
                "protected volatile int readBufferOffset;\n" +
                "public void onReadData(int got) throws IOException {\n" +
                "    ByteBuffer buffer = this.readBuffer;\n" +
                "    lastReadTime = TimeUtil.currentTimeMillis();\n" +
                "    netInBytes += got;\n" +
                "    processor.addNetInBytes(got);\n" +
                "\n" +
                "    // 循环处理字节信息\n" +
                "    //readBuffer一直处于write mode，position记录最后的写入位置\n" +
                "    int offset = readBufferOffset, length = 0, position = buffer.position();\n" +
                "    for (; ; ) {\n" +
                "        //获取包头的包长度信息\n" +
                "        length = getPacketLength(buffer, offset);\n" +
                "        //如果postion小于包起始位置加上包长度，证明readBuffer不够大，需要扩容\n" +
                "        if (position >= offset + length) {\n" +
                "            buffer.position(offset);\n" +
                "            byte[] data = new byte[length];\n" +
                "            //读取一个完整的包\n" +
                "            buffer.get(data, 0, length);\n" +
                "            //处理包，每种AbstractConnection的处理函数不同\n" +
                "            handle(data);\n" +
                "\n" +
                "            //记录下读取到哪里了\n" +
                "            offset += length;\n" +
                "            //如果最后写入位置等于最后读取位置，则证明所有的处理完了，可以清空缓存和offset\n" +
                "            //否则，记录下最新的offset\n" +
                "            //由于readBufferOffset只会单线程（绑定的RW线程）修改，但是会有多个线程访问（定时线程池的清理任务），所以设为volatile，不用CAS\n" +
                "            if (position == offset) {\n" +
                "                if (readBufferOffset != 0) {\n" +
                "                    readBufferOffset = 0;\n" +
                "                }\n" +
                "                buffer.clear();\n" +
                "                break;\n" +
                "            } else {\n" +
                "                readBufferOffset = offset;\n" +
                "                buffer.position(position);\n" +
                "                continue;\n" +
                "            }\n" +
                "        } else {\n" +
                "            if (!buffer.hasRemaining()) {\n" +
                "                buffer = checkReadBuffer(buffer, offset, position);\n" +
                "            }\n" +
                "            break;\n" +
                "        }\n" +
                "    }\n" +
                "}\n" +
                "private ByteBuffer checkReadBuffer(ByteBuffer buffer, int offset,\n" +
                "    int position) {\n" +
                "    if (offset == 0) {\n" +
                "        if (buffer.capacity() >= maxPacketSize) {\n" +
                "            throw new IllegalArgumentException(\n" +
                "                \"Packet size over the limit.\");\n" +
                "        }\n" +
                "        int size = buffer.capacity() << 1;\n" +
                "        size = (size > maxPacketSize) ? maxPacketSize : size;\n" +
                "        ByteBuffer newBuffer = processor.getBufferPool().allocate(size);\n" +
                "        buffer.position(offset);\n" +
                "        newBuffer.put(buffer);\n" +
                "        readBuffer = newBuffer;\n" +
                "        recycle(buffer);\n" +
                "        return newBuffer;\n" +
                "    } else {\n" +
                "        buffer.position(offset);\n" +
                "        buffer.compact();\n" +
                "        readBufferOffset = 0;\n" +
                "        return buffer;\n" +
                "    }\n" +
                "}\n" +
                "```\n" +
                "\n" +
                "readBuffer一直处于写模式。MyCat通过position()，还有get(data, 0, length)来读取数据。readBufferOffset用来记录每次读取的offset，需要设置为volatile。由于readBufferOffset只会单线程（绑定的RW线程）修改，但是会有多个线程访问（定时线程池的清理空闲连接的任务），所以设为volatile，不用CAS。**这是一个经典的用volatile代替CAS实现多线程安全访问的场景。**\n" +
                "\n" +
                "\n" +
                "\n" +
                "上面代码中handle(data);  表示处理数据，读取完整包之后，交给handler处理。每种AbstractConnection的handler不同，FrontendConnection的handler为FrontendAuthenticator\n" +
                "\n" +
                "```\n" +
                "this.handler = new FrontendAuthenticator(this);\n" +
                "```\n" +
                "\n" +
                "我们思考下，FrontendConnection会接收什么请求呢？有两种，认证请求和SQL命令请求。只有认证成功后，才会接受SQL命令请求。FrontendAuthenticator只负责认证请求，在认证成功后，将对应AbstractConnection的handler设为处理SQL请求的FrontendCommandHandler即可。\n" +
                "\n" +
                "```\n" +
                "public void handle(byte[] data) {\n" +
                "    AuthPacket auth = new AuthPacket();\n" +
                "    auth.read(data);\n" +
                "    // check  ...\n" +
                "    switch (check.result) {\n" +
                "        ...\n" +
                "        default:\n" +
                "            //认证成功，设置好用户数据库和权限等，将handler设置为FrontendCommandHandler\n" +
                "            success(auth);\n" +
                "    }\n" +
                "}\n" +
                "```\n" +
                "\n" +
                "发送OkPacket的过程与HandshakePacket相同，这里不再赘述。\n" +
                "\n" +
                "```\n" +
                "source.write(source.writeToBuffer(AUTH_OK, buffer));\n" +
                "```\n" +
                "\n" +
                "---\n" +
                "\n" +
                "### 版本查询包\n" +
                "\n" +
                "MySql客户端在连接建立后，默认会发送查询版本信息的包，这其实就是一个SQL查询请求了。只不过这个请求不用路由到后台某个数据库。 \n" +
                "\n" +
                "连接成功建立后，连接绑定的RW线程会监听上面的读事件。在客户端发送查询版本信息的包之后，会触发RW线程去读取对应连接，过程与之前接收AuthPacket类似；\n" +
                "\n" +
                "之后的读取过程也是调用AbstractConnection的asynRead()方法，进行异步读取。过程就不再赘述，读取到的数据交由FrontendCommandHandler处理。 \n" +
                "\n" +
                "查询版本信息的包（是一种CommandPacket）内容：\n" +
                "\n" +
                "![](http://img.blog.csdn.net/20160218161313265)\n" +
                "\n" +
                "FrontendCommandHandler的处理方法：\n" +
                "\n" +
                "```\n" +
                "protected final FrontendConnection source;\n" +
                "@Override\n" +
                "public void handle(byte[] data)\n" +
                "{\n" +
                "\t...\n" +
                "    switch (data[4])\n" +
                "    {\n" +
                "        case MySQLPacket.COM_INIT_DB:\n" +
                "            commands.doInitDB();\n" +
                "            source.initDB(data);\n" +
                "            break;\n" +
                "        case MySQLPacket.COM_QUERY:\n" +
                "            commands.doQuery();\n" +
                "            source.query(data);\n" +
                "            break;\n" +
                "        case MySQLPacket.COM_PING:\n" +
                "            commands.doPing();\n" +
                "            source.ping();\n" +
                "            break;\n" +
                "        case MySQLPacket.COM_QUIT:\n" +
                "            commands.doQuit();\n" +
                "            source.close(\"quit cmd\");\n" +
                "            break;\n" +
                "        case MySQLPacket.COM_PROCESS_KILL:\n" +
                "            commands.doKill();\n" +
                "            source.kill(data);\n" +
                "            break;\n" +
                "        case MySQLPacket.COM_STMT_PREPARE:\n" +
                "            commands.doStmtPrepare();\n" +
                "            source.stmtPrepare(data);\n" +
                "            break;\n" +
                "        case MySQLPacket.COM_STMT_EXECUTE:\n" +
                "            commands.doStmtExecute();\n" +
                "            source.stmtExecute(data);\n" +
                "            break;\n" +
                "        case MySQLPacket.COM_STMT_CLOSE:\n" +
                "            commands.doStmtClose();\n" +
                "            source.stmtClose(data);\n" +
                "            break;\n" +
                "        case MySQLPacket.COM_HEARTBEAT:\n" +
                "            commands.doHeartbeat();\n" +
                "            source.heartbeat(data);\n" +
                "            break;\n" +
                "        default:\n" +
                "            commands.doOther();\n" +
                "            source.writeErrMessage(ErrorCode.ER_UNKNOWN_COM_ERROR,\n" +
                "                \"Unknown command\");\n" +
                "    }\n" +
                "}\n" +
                "```\n" +
                "\n" +
                "根据CommandPacket的第五字节判断command类型，不同类型有不同的处理。 \n" +
                "首先querycommand计数加1，之后调用对应FrontendConnection的query(byte[])方法,这里会调用commands.doQuery();\n" +
                "\n" +
                "\n" +
                "\n" +
                "FrontendConnection：\n" +
                "\n" +
                "```\n" +
                "protected FrontendQueryHandler queryHandler;\n" +
                "public void query(byte[] data) {\n" +
                "   // 取得语句\n" +
                "   ...   \n" +
                "   this.query( sql );\n" +
                "}\n" +
                "\n" +
                "public void query(String sql) {\n" +
                "    // remove last ';'\n" +
                "    if (sql.endsWith(\";\")) {\n" +
                "        sql = sql.substring(0, sql.length() - 1);\n" +
                "    }\n" +
                "    // 记录SQL\n" +
                "    this.setExecuteSql(sql);\n" +
                "    // DML 权限检查\n" +
                "    ...\n" +
                "    // 执行查询\n" +
                "    queryHandler.setReadOnly(privileges.isReadOnly(user));\n" +
                "    queryHandler.query(sql);\n" +
                "}\n" +
                "```\n" +
                "\n" +
                "执行查询，调用对应的FrontendQueryHandler： \n" +
                "\n" +
                "![](http://img.blog.csdn.net/20160220101833315)\n" +
                "\n" +
                "这里，是ServerQueryHandler。通过代码追踪在NIOAccepter.accept()中设定：\n" +
                "\n" +
                "```\n" +
                "FrontendConnection c = factory.make(channel); //FrontendConnectionFactory\n" +
                "```\n" +
                "\n" +
                "在queryHandler.query(sql);中也是通过sqlType来调用不同commandHandler来执行的。之后如何处理，就在之后的SQL解析器等章节进行分析。"}/>




            </div>
        );
    }
}

export default Mycat4;