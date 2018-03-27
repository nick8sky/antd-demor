import React, { Component } from 'react';
import Markdown  from 'react-markdown';



class Mycat5 extends Component {
    render() {


        return (
            <div>
                <Markdown source={"## MyCat架构-连接模块(一)\n" +
                "\n" +
                "参考：http://blog.csdn.net/zhxdick/article/details/50703938\n" +
                "\n" +
                "如之前所述，MyCat的连接分为前端和后端，下面是连接基本相关类图： \n" +
                "\n" +
                "![](http://img.blog.csdn.net/20160220112351145)\n" +
                "\n" +
                "ClosableConnection:\n" +
                "\n" +
                "```\n" +
                "public interface ClosableConnection {\n" +
                "    String getCharset(); //MySQL的通信都需要指定字符集\n" +
                "    void close(String reason); //关闭连接\n" +
                "    boolean isClosed(); //判断是否是正常关闭\n" +
                "    public void idleCheck(); //检查连接是否为空闲状态\n" +
                "    long getStartupTime();\n" +
                "    String getHost();\n" +
                "    int getPort();\n" +
                "    int getLocalPort();  \n" +
                "    long getNetInBytes();\n" +
                "    long getNetOutBytes();\n" +
                "}\n" +
                "```\n" +
                "\n" +
                "这里有两个port，一个是ServerSocket端口，一个是会话端口。 MyCat服务器建立ServerSocket时输入的端口为服务器在其上面监听客户的连接,当有客户连接时,在随机选择一个没用的端口与客户端通信;建立客户socket时输入的为服务端的监听端口,在本地选择一个未用端口与服务器通信,至于服务器怎么知道和客户端的哪个端口通信,和客户端怎么知道和服务端的哪个端口通信(因为这两个端口都是随机生成的),tcp是采用”三次握手”建立连接,而udp则是每次发送信息时将端口号放在ip报文的数据段里面。所以，连接里面需要提供获得监听端口和服务端口的方法。\n" +
                "\n" +
                "\n" +
                "\n" +
                "**NIOConnection**\n" +
                "\n" +
                "```\n" +
                "public interface NIOConnection extends ClosableConnection {\n" +
                "    void register() throws IOException;//建立三次连接，发送握手包，替换handle处理对象\n" +
                "    void handle(byte[] data);//处理数据\n" +
                "    void write(ByteBuffer buffer);// 写出一块缓冲数据\n" +
                "}\n" +
                "```\n" +
                "\n" +
                "所有NIO的通信需要在多路复用选择器上注册channel，这里有个对应的register()方法需要实现。然后，读取和写入数据都需要通过缓冲。缓冲区(Buffer)就是在内存中预留指定大小的存储空间用来对输入/输出(I/O)的数据作临时存储，这部分预留的内存空间就叫做缓冲区，使用缓冲区有这么两个好处： \n" +
                "\n" +
                "1. 减少实际的物理读写次数 \n" +
                "2. 缓冲区在创建时就被分配内存，这块内存区域一直被重用，可以减少动态分配和回收内存的次数 \n" +
                "  读取到的数据需要经过处理，这里对应的就是handle(byte[])方法。\n" +
                "\n" +
                "\n" +
                "\n" +
                "**AbstractConnection**\n" +
                "\n" +
                "AbstractConnection其实就是把Java的NetworkChannel进行封装，同时需要依赖其他几个类来完成他所需要的操作\n" +
                "\n" +
                "```\n" +
                "public abstract class AbstractConnection implements NIOConnection {\n" +
                "\t...\n" +
                "\tprotected final NetworkChannel channel;\n" +
                "\tprotected NIOProcessor processor;\n" +
                "\tprotected NIOHandler handler;\n" +
                "\tprivate final SocketWR socketWR;\n" +
                "```\n" +
                "\n" +
                "![](http://img.blog.csdn.net/20160220125616893)\n" +
                "\n" +
                "**其中，NIOProcessor是对AbstractConnection进行管理的方法类，NIOHandler是处理AbstractConnection读取的数据的处理方法类，NIOSocketWR是执行以上方法的线程类。**\n" +
                "\n" +
                "\n" +
                "\n" +
                "---\n" +
                "\n" +
                "**NIOProcessor**\n" +
                "\n" +
                "NIOProcessor的构建方法：\n" +
                "\n" +
                "```\n" +
                "public NIOProcessor(String name, BufferPool bufferPool,\n" +
                "    NameableExecutor executor) throws IOException {\n" +
                "    this.name = name;\n" +
                "    this.bufferPool = bufferPool;\n" +
                "    this.executor = executor;\n" +
                "    this.frontends = new ConcurrentHashMap<Long, FrontendConnection>();\n" +
                "    this.backends = new ConcurrentHashMap<Long, BackendConnection>();\n" +
                "    this.commands = new CommandCount();\n" +
                "}\n" +
                "```\n" +
                "\n" +
                "在MycatServer启动方法startup中构建。\n" +
                "\n" +
                "MyCatServer.java：\n" +
                "\n" +
                "```\n" +
                "...\n" +
                "bufferPool = new BufferPool(processBuferPool, processBufferChunk,\n" +
                "                socketBufferLocalPercent / processorCount);\n" +
                "        businessExecutor = ExecutorUtil.create(\"BusinessExecutor\",\n" +
                "                threadPoolSize);\n" +
                "...\n" +
                "for (int i = 0; i < processors.length; i++) {\n" +
                "            processors[i] = new NIOProcessor(\"Processor\" + i, bufferPool,\n" +
                "                    businessExecutor);\n" +
                "        }\n" +
                "...\n" +
                "```\n" +
                "\n" +
                "每个MyCat实例会初始化processors个NIOProcessor，每个NIOProcessor公用同一个bufferPool和businessExecutor。 \n" +
                "\n" +
                "bufferPool是缓冲池，BufferPool这个类负责缓冲统一管理 。\n" +
                "\n" +
                "businessExecutor如之前所述，是业务线程池。 \n" +
                "\n" +
                "NIOProcessor被池化，很简单，就是保存到数组中，通过MyCatServer的nextProcessor()方法轮询获取一个NIOProcessor，之后每个AbstractConnection通过setNIOProcessor方法，设置NIOProcessor。\n" +
                "\n" +
                "可以看出，**每个AbstractConnection依赖于一个NIOProcessor，每个NIOProcessor保存着多个AbstractConnection**。AbstractConnection分为FrontendConnection和BackendConnection被分别保存在NIOProcessor的frontends和backends这两个ConcurrentHashMap中。 用ConcurrentHashMap是因为NIOAcceptor和NIOConnector线程以及RW线程池都会访问这两个变量。 \n" +
                "\n" +
                "NIOProcessor其实主要负责连接资源的管理： MyCat会定时检查前端和后端空闲连接，并清理和回收资源；\n" +
                "\n" +
                "MyCatServer.java:\n" +
                "\n" +
                "```\n" +
                "// 处理器定时检查任务\n" +
                "private TimerTask processorCheck() {\n" +
                "    return new Runnable() {\n" +
                "        @Override\n" +
                "        public void run() {\n" +
                "            timerExecutor.execute(new Runnable() {\n" +
                "            @Override\n" +
                "                public void run() {\n" +
                "                    for (NIOProcessor p : processors) {\n" +
                "                        p.checkBackendCons();\n" +
                "                    }\n" +
                "                }\n" +
                "            });\n" +
                "            \n" +
                "            timerExecutor.execute(new Runnable() {\n" +
                "            @Override\n" +
                "                public void run() {\n" +
                "                    for (NIOProcessor p : processors) {\n" +
                "                        p.checkFrontCons();\n" +
                "                    }\n" +
                "                }\n" +
                "            });\n" +
                "        }\n" +
                "    };\n" +
                "}\n" +
                "heartbeatScheduler.scheduleAtFixedRate(processorCheck(), 0L, system.getProcessorCheckPeriod(),TimeUnit.MILLISECONDS);\n" +
                "```\n" +
                "\n" +
                "\n" +
                "\n" +
                "---\n" +
                "\n" +
                "**NIOHandler**\n" +
                "\n" +
                "NIOHandler实际上就是对于业务处理方法的封装，对于不同的连接有不同的处理方法，也就是不同的NIOHandler\n" +
                "\n" +
                "```\n" +
                "public interface NIOHandler {\n" +
                "    void handle(byte[] data);\n" +
                "}\n" +
                "```\n" +
                "\n" +
                "\n" +
                "\n" +
                "---\n" +
                "\n" +
                "**NIOSocketWR**\n" +
                "\n" +
                "实现对于AbstractConnection(实际就是对里面的channel)进行异步读写，将从channel中读取到的放到AbstractConnection的readBuffer中，将writeBuffer写入到channel中。\n" +
                "\n" +
                "可以这么说，AbstractConnection的方法只对它里面的buffer进行操作，**而buffer与channel之间的交互，是通过NIOSocketWR的方法完成的。** \n" +
                "\n" +
                "在NIOReactor.RW中：\n" +
                "\n" +
                "```\n" +
                "private void register(Selector selector) {\n" +
                "    while ((c = registerQueue.poll()) != null) {\n" +
                "        ((NIOSocketWR) c.getSocketWR()).register(selector);\n" +
                "        c.register();\n" +
                "    }\n" +
                "}\n" +
                "```\n" +
                "\n" +
                "\n" +
                "\n" +
                "---\n" +
                "\n" +
                "**FrontendConnection**\n" +
                "\n" +
                "FrontendConnection是对前端连接channel的封装，接受NetworkChannel作为参数构造。前端连接建立，需要先验证其权限，所以，handler首先设置为FrontendAuthenticator，等到验证成功，handler会被设置成FrontendCommandHandler。 \n" +
                "\n" +
                "构造方法：\n" +
                "\n" +
                "```\n" +
                "public FrontendConnection(NetworkChannel channel) throws IOException {\n" +
                "    super(channel);\n" +
                "    InetSocketAddress localAddr = (InetSocketAddress) channel.getLocalAddress();\n" +
                "    InetSocketAddress remoteAddr = null;\n" +
                "    if (channel instanceof SocketChannel) {\n" +
                "        remoteAddr = (InetSocketAddress) ((SocketChannel) channel).getRemoteAddress();\n" +
                "    } else if (channel instanceof AsynchronousSocketChannel) {\n" +
                "        remoteAddr = (InetSocketAddress) ((AsynchronousSocketChannel) channel).getRemoteAddress();\n" +
                "    }\n" +
                "}\n" +
                "```\n" +
                "\n" +
                "FrontendConnection相关的Handler：\n" +
                "\n" +
                "![](http://img.blog.csdn.net/20160225090607699)\n" +
                "\n" +
                "\n" +
                "\n" +
                "----\n" +
                "\n" +
                "**ServerConnection**\n" +
                "\n" +
                "前端连接包括ServerConnection(服务端连接)和ManagerConnection(管理端连接)。前端链接不会直接创建，而是通过工厂创建: \n" +
                "\n" +
                "```\n" +
                "@Override\n" +
                "protected FrontendConnection getConnection(NetworkChannel channel) throws IOException {\n" +
                "    SystemConfig sys = MycatServer.getInstance().getConfig().getSystem();\n" +
                "    ServerConnection c = new ServerConnection(channel);\n" +
                "    MycatServer.getInstance().getConfig().setSocketParams(c, true);\n" +
                "    c.setPrivileges(MycatPrivileges.instance());\n" +
                "    c.setQueryHandler(new ServerQueryHandler(c));\n" +
                "    c.setLoadDataInfileHandler(new ServerLoadDataInfileHandler(c));\n" +
                "    // c.setPrepareHandler(new ServerPrepareHandler(c));\n" +
                "    c.setTxIsolation(sys.getTxIsolation());\n" +
                "    c.setSession2(new NonBlockingSession(c));\n" +
                "    return c;\n" +
                "}\n" +
                "```\n" +
                "\n" +
                "可以看出，每个新的ServerConnection都会绑定一个新的ServerQueryHandler负责处理sql指令，一个ServerLoadDataInfileHandler负责处理文件载入命令，一个NonBlockingSession负责处理事务 ，FrontedPrivilege中验证用户是否有权限访问。\n" +
                "\n" +
                "![](https://thumbnail0.baidupcs.com/thumbnail/85ffc925cf15343c4aca57b60eab16a1?fid=940423185-250528-816894307112583&time=1520128800&rt=sh&sign=FDTAER-DCb740ccc5511e5e8fedcff06b081203-dwfSVxnjJseECk5ImsVE6LxNoAQ%3D&expires=8h&chkv=0&chkbd=0&chkpc=&dp-logid=1448465456042950374&dp-callid=0&size=c710_u400&quality=100&vuk=-&ft=video)\n" +
                "\n" +
                "\n" +
                "\n" +
                "---\n" +
                "\n" +
                "**Session**\n" +
                "\n" +
                "```\n" +
                "public interface Session {\n" +
                "    FrontendConnection getSource(); //取得源端连接\n" +
                "    int getTargetCount(); //取得当前目标端数量\n" +
                "    void execute(RouteResultset rrs, int type); //开启一个会话执行\n" +
                "    void commit(); //提交一个会话执行\n" +
                "    void rollback(); //回滚一个会话执行\n" +
                "    void cancel(FrontendConnection sponsor); //取消一个正在执行中的会话\n" +
                "    void terminate(); //终止会话，必须在关闭源端连接后执行该方法。\n" +
                "}\n" +
                "```\n" +
                "\n" +
                "\n" +
                "\n" +
                "NonBlockingSession\n" +
                "\n" +
                "```\n" +
                "public class NonBlockingSession implements Session {\n" +
                "    private final ServerConnection source;\n" +
                "    private final ConcurrentMap<RouteResultsetNode, BackendConnection> target;\n" +
                "    private volatile SingleNodeHandler singleNodeHandler;\n" +
                "    private volatile MultiNodeQueryHandler multiNodeHandler;\n" +
                "    private volatile RollbackNodeHandler rollbackHandler;\n" +
                "    private final MultiNodeCoordinator multiNodeCoordinator;\n" +
                "    private final CommitNodeHandler commitHandler;\n" +
                "    private volatile String xaTXID;\n" +
                "    private  volatile boolean canClose = true;\n" +
                "    private volatile MiddlerResultHandler  middlerResultHandler;\n" +
                "    private boolean prepared;\n" +
                "\n" +
                "    public NonBlockingSession(ServerConnection source) {\n" +
                "        this.source = source;\n" +
                "        this.target = new ConcurrentHashMap<RouteResultsetNode, BackendConnection>(2, 0.75f);\n" +
                "        multiNodeCoordinator = new MultiNodeCoordinator(this);\n" +
                "        commitHandler = new CommitNodeHandler(this);\n" +
                "    }\n" +
                "```\n" +
                "\n" +
                "谁会调用getSource()方法取得源端链接:\n" +
                "\n" +
                "![](http://img.blog.csdn.net/20160302174033731)\n" +
                "\n" +
                "可以发现，主要有各种查询的handler会去调用。因为处理无论返回什么结果，都需要返回给源端。 \n" +
                "\n" +
                "int getTargetCount();取得当前目标端数量。根据目标端的数量不同会用不同的handler处理转发SQL和合并结果。\n" +
                "\n" +
                "---\n" +
                "\n" +
                "### 后端连接\n" +
                "\n" +
                "对于后端连接，就是同MySQL连接。 从后端连接工厂开始MySQLConnectionFactory.java： \n" +
                "\n" +
                "```\n" +
                "public MySQLConnection make(MySQLDataSource pool, ResponseHandler handler,\n" +
                "    String schema) throws IOException {\n" +
                "    //DBHost配置\n" +
                "    DBHostConfig dsc = pool.getConfig();\n" +
                "    //根据是否为NIO返回SocketChannel或者AIO的AsynchronousSocketChannel\n" +
                "    NetworkChannel channel = openSocketChannel(MycatServer.getInstance().isAIO());\n" +
                "    //新建MySQLConnection\n" +
                "    MySQLConnection c = new MySQLConnection(channel, pool.isReadNode());\n" +
                "    //根据配置初始化MySQLConnection\n" +
                "    MycatServer.getInstance().getConfig().setSocketParams(c, false);\n" +
                "    c.setHost(dsc.getIp());\n" +
                "    c.setPort(dsc.getPort());\n" +
                "    c.setUser(dsc.getUser());\n" +
                "    c.setPassword(dsc.getPassword());\n" +
                "    c.setSchema(schema);\n" +
                "    //目前实际连接还未建立，handler为MySQL连接认证MySQLConnectionAuthenticator\n" +
                "    c.setHandler(new MySQLConnectionAuthenticator(c, handler));\n" +
                "    c.setPool(pool);\n" +
                "    c.setIdleTimeout(pool.getConfig().getIdleTimeout());\n" +
                "    //AIO和NIO连接方式建立实际的MySQL连接\n" +
                "    if (channel instanceof AsynchronousSocketChannel) {\n" +
                "        ((AsynchronousSocketChannel) channel).connect(\n" +
                "            new InetSocketAddress(dsc.getIp(), dsc.getPort()), c,\n" +
                "            (CompletionHandler) MycatServer.getInstance()\n" +
                "            .getConnector());\n" +
                "    } else {\n" +
                "        //通过NIOConnector建立连接\n" +
                "        //获取一个NIOConnector \n" +
                "        ((NIOConnector) MycatServer.getInstance().getConnector()).postConnect(c);\n" +
                "    }\n" +
                "    return c;\n" +
                "}\n" +
                "```\n" +
                "\n" +
                "通过NIOConnector建立实际连接的过程与前端连接的建立相似，也是先放在队列中，之后由NIOConnector去建立连接。\n" +
                "\n" +
                "**NIOConnector** ：\n" +
                "\n" +
                "```\n" +
                "public void postConnect(AbstractConnection c) {\n" +
                "    connectQueue.offer(c);\n" +
                "    selector.wakeup();\n" +
                "}\n" +
                "\n" +
                "private void connect(Selector selector) {\n" +
                "    AbstractConnection c = null;\n" +
                "    while ((c = connectQueue.poll()) != null) {\n" +
                "        SocketChannel channel = (SocketChannel) c.getChannel();\n" +
                "        channel.register(selector, SelectionKey.OP_CONNECT, c);\n" +
                "        channel.connect(new InetSocketAddress(c.host, c.port));\n" +
                "    }\n" +
                "}\n" +
                "\n" +
                "private void finishConnect(SelectionKey key, Object att) {\n" +
                "    BackendAIOConnection c = (BackendAIOConnection) att;\n" +
                "    try {\n" +
                "        if (finishConnect(c, (SocketChannel) c.channel)) { //做原生NIO连接是否完成的判断和操作\n" +
                "            clearSelectionKey(key);\n" +
                "            c.setId(ID_GENERATOR.getId());\n" +
                "            //绑定特定的NIOProcessor以作idle清理\n" +
                "            NIOProcessor processor = MycatServer.getInstance().nextProcessor();\n" +
                "            c.setProcessor(processor);\n" +
                "            //与特定NIOReactor绑定监听读写\n" +
                "            NIOReactor reactor = reactorPool.getNextReactor();\n" +
                "            reactor.postRegister(c);\n" +
                "        }\n" +
                "   ...\n" +
                "}\n" +
                "\n" +
                "@Override\n" +
                "public void run() {\n" +
                "    int invalidSelectCount = 0;\n" +
                "    for (;;) {\n" +
                "        final Selector tSelector = this.selector;\n" +
                "        try {\n" +
                "            long start = System.nanoTime();\n" +
                "            tSelector.select(1000L);\n" +
                "            long end = System.nanoTime();\n" +
                "            connect(tSelector);\n" +
                "            for (SelectionKey key : keys) {\n" +
                "                Object att = key.attachment();\n" +
                "                if (att != null && key.isValid() && key.isConnectable())\n" +
                "                {\n" +
                "                    finishConnect(key, att);\n" +
                "                } else\n" +
                "                {\n" +
                "                    key.cancel();\n" +
                "                }\n" +
                "            }\n" +
                "            ...\n" +
                "    }\n" +
                "}\n" +
                "```\n" +
                "\n" +
                "绑定到具体的NIOReactor之后，监听读事件。和之前讲的前端连接建立过程类似。这次是后端MySQL主动发握手包。这时，读事件就绪，NIOReactor中的RW线程会调用对应AbstractConnection（这里是MySQLConnection）的handler的处理方法处理。\n" +
                "\n" +
                "\n" +
                "\n" +
                "MySQLConnection中的handler参考工厂方法发现是MySQLConnectionAuthenticator。查看handle方法：\n" +
                "\n" +
                "```\n" +
                "/**\n" +
                " * MySQL 4.1版本之前是MySQL323加密,MySQL 4.1和之后的版本都是MySQLSHA1加密，在MySQL5.5的版本之后可以客户端插件式加密(这个MyCat实现)\n" +
                " * @see @http://dev.mysql.com/doc/internals/en/determining-authentication-method.html\n" +
                " */\n" +
                "@Override\n" +
                "public void handle(byte[] data) {\n" +
                "    try {\n" +
                "        switch (data[4]) {\n" +
                "        //如果是OkPacket，检查是否认证成功\n" +
                "        case OkPacket.FIELD_COUNT:\n" +
                "            HandshakePacket packet = source.getHandshake();\n" +
                "            if (packet == null) {\n" +
                "                //如果为null，证明链接第一次建立，处理\n" +
                "                processHandShakePacket(data);\n" +
                "                // 发送认证数据包\n" +
                "                source.authenticate();\n" +
                "                break;\n" +
                "            }\n" +
                "            // 如果packet不为null，处理认证结果\n" +
                "            //首先将连接设为已验证并将handler改为MySQLConnectionHandler\n" +
                "            source.setHandler(new MySQLConnectionHandler(source));\n" +
                "            source.setAuthenticated(true);\n" +
                "            //判断是否用了压缩协议\n" +
                "            boolean clientCompress = Capabilities.CLIENT_COMPRESS==(Capabilities.CLIENT_COMPRESS & packet.serverCapabilities);\n" +
                "            boolean usingCompress= MycatServer.getInstance().getConfig().getSystem().getUseCompression()==1 ;\n" +
                "            if(clientCompress&&usingCompress)\n" +
                "            {\n" +
                "                source.setSupportCompress(true);\n" +
                "            }\n" +
                "            //设置ResponseHandler\n" +
                "            if (listener != null) {\n" +
                "                listener.connectionAcquired(source);\n" +
                "            }\n" +
                "            break;\n" +
                "        //如果为ErrorPacket，则认证失败\n" +
                "        case ErrorPacket.FIELD_COUNT:\n" +
                "            ErrorPacket err = new ErrorPacket();\n" +
                "            err.read(data);\n" +
                "            String errMsg = new String(err.message);\n" +
                "            LOGGER.warn(\"can't connect to mysql server ,errmsg:\"+errMsg+\" \"+source);\n" +
                "            //source.close(errMsg);\n" +
                "            throw new ConnectionException(err.errno, errMsg);\n" +
                "        //如果是EOFPacket，则为MySQL 4.1版本，是MySQL323加密\n" +
                "        case EOFPacket.FIELD_COUNT:\n" +
                "            auth323(data[3]);\n" +
                "            break;\n" +
                "        default:\n" +
                "            packet = source.getHandshake();\n" +
                "            if (packet == null) {\n" +
                "                processHandShakePacket(data);\n" +
                "                // 发送认证数据包\n" +
                "                source.authenticate();\n" +
                "                break;\n" +
                "            }  \n" +
                "        }\n" +
                "\n" +
                "   ...\n" +
                "}\n" +
                "```\n" +
                "\n" +
                "在连接建立并认证后，MySQLConnectionHandler来处理这个连接的请求和相应。 \n" +
                "\n" +
                "MySQL服务端响应客户端查询请求的流程可以分为三个阶段： \n" +
                "​\t第一阶段\t\t客户端发送查询请求包COM_QUERY (command query packet)，如果有结果集返回，且结果集不为空，则返回FieldCount(列数量)包；如果结果集为空，则返回OKPacket；如果命令有错，则返回ERRPacket；如果是Load file data命令，则返回LOCAL_INFILE_Request。 \n" +
                "​\t第二阶段\t\t如果有结果集返回，则先返回列集合，所有列返回完了之后，会返回EOFPacket；如果过程中出现错误，则返回错误包(EOF是一个计算机术语，为End Of File的缩写，在操作系统中表示资料源无更多的资料可读取)。 \n" +
                "​\t第三阶段\t\t之后返回行记录，返回全部行记录之后，返回EOFPacket。如果有错误，回错误包。  \n" +
                "\n" +
                "---\n" +
                "\n" +
                "每个前端Client连接会创建Session，而Session会根据命令的不同而创建不同的Handler。每个Handler会从连接池中拿出所需要的连接并使用。在连接池大小不够时，RW线程会异步驱使新建所需的连接补充连接池，但是连接数最大不能超过配置的maxCon。同时，如之前所述，有定时线程检查并回收空闲后端连接。但池中最小不会小于minCon:\n" +
                "\n" +
                "![](https://thumbnail0.baidupcs.com/thumbnail/303410020d5e4538d2999f1459150be1?fid=940423185-250528-624957089261693&time=1520139600&rt=sh&sign=FDTAER-DCb740ccc5511e5e8fedcff06b081203-lol0u7nDpA4NeL3J%2Fu2oFkGHDBY%3D&expires=8h&chkv=0&chkbd=0&chkpc=&dp-logid=1450901532870378355&dp-callid=0&size=c710_u400&quality=100&vuk=-&ft=video)\n" +
                "\n" +
                "Session主要处理事务，多节点转发协调等，由不同的ResponseHandler实现； \n" +
                "\n" +
                "![](http://img.blog.csdn.net/20160428091450780)\n" +
                "\n" +
                "这些ResponseHandler我们之后会在对应的模块去细细分析。这里先跳过。 \n" +
                "查看SingleNodeHanlder的处理方法 :\n" +
                "\n" +
                "```\n" +
                "public void execute() throws Exception {\n" +
                "    //从这里开始计算处理时间\n" +
                "    startTime=System.currentTimeMillis();\n" +
                "    ServerConnection sc = session.getSource();\n" +
                "    this.isRunning = true;\n" +
                "    this.packetId = 0;\n" +
                "    final BackendConnection conn = session.getTarget(node);\n" +
                "    //之前是否获取过Connection并且Connection有效\n" +
                "    if (session.tryExistsCon(conn, node)) {\n" +
                "        _execute(conn);\n" +
                "    } else {\n" +
                "        // create new connection\n" +
                "        MycatConfig conf = MycatServer.getInstance().getConfig();\n" +
                "        //从config中获取DataNode\n" +
                "        PhysicalDBNode dn = conf.getDataNodes().get(node.getName());\n" +
                "        //获取对应的数据库连接\n" +
                "        dn.getConnection(dn.getDatabase(), sc.isAutocommit(), node, this,\n" +
                "                   node);\n" +
                "    }\n" +
                "}\n" +
                "```\n" +
                "\n" +
                "从PhysicalDBNode中获取合适的连接：\n" +
                "\n" +
                "```\n" +
                "public void getConnection(String schema,boolean autoCommit, RouteResultsetNode rrs,\n" +
                "        ResponseHandler handler, Object attachment) throws Exception {\n" +
                "    checkRequest(schema);\n" +
                "    //检查数据库连接池是否初始化成功，因为有reload命令\n" +
                "    if (dbPool.isInitSuccess()) {\n" +
                "        //根据是否能在读节点上运行获取连接，一般是判断是否为读请求，并且读请求不在事务中\n" +
                "        if (rrs.canRunnINReadDB(autoCommit)) {\n" +
                "            //根据负载均衡策略选择合适的后端连接\n" +
                "            dbPool.getRWBanlanceCon(schema,autoCommit, handler, attachment,\n" +
                "                    this.database);\n" +
                "        } else {\n" +
                "            //直接选择当前连接池中的的后端连接\n" +
                "            dbPool.getSource().getConnection(schema,autoCommit, handler, attachment);\n" +
                "        }\n" +
                "\t...\n" +
                "}\n" +
                "```\n" +
                "\n" +
                "PhysicalDBPool类中有负载均衡，切换writeHost，控制write方式等（分别对应balance，writeType等标签）的实现。首先我们看如果有负载均衡策略（配置了balance）的获取连接的方式：\n" +
                "\n" +
                "```\n" +
                "public void getRWBanlanceCon(String schema, boolean autocommit,\n" +
                "                             ResponseHandler handler, Object attachment, String database) throws Exception {\n" +
                "\n" +
                "    PhysicalDatasource theNode = null;\n" +
                "    ArrayList<PhysicalDatasource> okSources = null;\n" +
                "    switch (banlance) {\n" +
                "        //所有读写节点参与read请求的负载均衡，除了当前活跃的写节点，balance=1\n" +
                "        case BALANCE_ALL_BACK: {\n" +
                "            //返回所有写节点和符合条件的读节点，不包括当前的写节点\n" +
                "            okSources = getAllActiveRWSources(true, false, checkSlaveSynStatus());\n" +
                "            if (okSources.isEmpty()) {\n" +
                "                //如果结果即为空，返回当前写节点\n" +
                "                theNode = this.getSource();\n" +
                "            } else {\n" +
                "                //不为空，随机选一个\n" +
                "                theNode = randomSelect(okSources);\n" +
                "            }\n" +
                "            break;\n" +
                "        }\n" +
                "        //所有读写节点参与read请求的负载均衡，balance=2\n" +
                "        case BALANCE_ALL: {\n" +
                "            //返回所有写节点和符合条件的读节点\n" +
                "            okSources = getAllActiveRWSources(true, true, checkSlaveSynStatus());\n" +
                "            //随机选一个\n" +
                "            theNode = randomSelect(okSources);\n" +
                "            break;\n" +
                "        }\n" +
                "        case BALANCE_ALL_READ: {\n" +
                "            //返回所有符合条件的读节点\n" +
                "            okSources = getAllActiveRWSources(false, false, checkSlaveSynStatus());\n" +
                "            //随机取一个\n" +
                "            theNode = randomSelect(okSources);\n" +
                "            break;\n" +
                "        }\n" +
                "        //不做负载均衡，balance=0或其他不为以上的值\n" +
                "        case BALANCE_NONE:\n" +
                "        default:\n" +
                "            theNode = this.getSource();\n" +
                "    }\n" +
                "    theNode.getConnection(schema, autocommit, handler, attachment);\n" +
                "}\n" +
                "```\n" +

                "\n"}/>


            </div>
        );
    }
}

export default Mycat5;



