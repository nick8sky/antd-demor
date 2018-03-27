import React, { Component } from 'react';
import Markdown from 'react-markdown';

class CTO6 extends Component {
    render() {
        return (
            <div>
                <Markdown source={"参考：http://odi.ch/prog/design/newbies.php\n" +
                "\n" +
                "**字符串拼接**\n" +
                "\n" +
                "```\n" +
                "String s = \"\";\n" +
                "for (Person p : persons) {\n" +
                "    s += \", \" + p.getName();\n" +
                "}\n" +
                "s = s.substring(2); //remove first comma\n" +
                "```\n" +
                "\n" +
                "string在java内存中不可变数据类型，上面的代码造成了大量的内存浪费。 \n" +
                "\n" +
                "正确示例：\n" +
                "\n" +
                "```\n" +
                "StringBuilder sb = new StringBuilder(persons.size() * 16); // 使用sb而不使用sbf,预估长度\n" +
                "for (Person p : persons) {\n" +
                "    if (sb.length() > 0) sb.append(\", \"); // 避免最后截取前两位“,”，造成的内存浪费\n" +
                "    sb.append(p.getName);\n" +
                "}\n" +
                "```\n" +
                "\n" +
                "**未使用StringBuffer特性**\n" +
                "\n" +
                "```\n" +
                "StringBuffer sb = new StringBuffer();\n" +
                "sb.append(\"Name: \");\n" +
                "sb.append(name + '\\n'); //这里相当于多构建了一个name + '\\n'字符串对象，应该把\"\\n\"拿出去\n" +
                "sb.append(\"!\");\n" +
                "...\n" +
                "String s = sb.toString();\n" +
                "```\n" +
                "\n" +
                "**测试字符串相等**\n" +
                "\n" +
                "```\n" +
                "if (name.equals(\"John\")) ...  //name可能为null\n" +
                "if (\"\".equals(name)) ...   //浪费一个内存\"\"\n" +
                "正确：\n" +
                "if(name != null && name.length()==0)...//或 name.isEmpty()\n" +
                "```\n" +
                "\n" +
                "**数字转字符串**\n" +
                "\n" +
                "```\n" +
                "\"\" + set.size()  //浪费一个内存\n" +
                "new Integer(set.size()).toString()  //浪费一个int内存\n" +
                "```\n" +
                "\n" +
                "正确示例：\n" +
                "\n" +
                "```\n" +
                "Integer.toString(set.size())\n" +
                "```\n" +
                "\n" +
                "**字符串转数字**\n" +
                "\n" +
                "```\n" +
                "int v = Integer.valueOf(str).intValue(); //浪费一个内存\n" +
                "int w = Long.valueOf(Double.valueOf(str).longValue()).intValue(); //浪费3个内存\n" +
                "```\n" +
                "\n" +
                "正确示例：\n" +
                "\n" +
                "```\n" +
                "int v = Integer.parseInt(str);\n" +
                "int w = (int) Double.parseDouble(str);\n" +
                "```\n" +
                "\n" +
                "**没有利用不可变对象**\n" +
                "\n" +
                "```\n" +
                "zero = new Integer(0);\n" +
                "return Boolean.valueOf(\"true\");\n" +
                "```\n" +
                "\n" +
                "整数和布尔值都是不变的。 因此，创建表示相同值的多个对象是没有意义的。 这些类具有用于常用实例的内置缓存。 在布尔的情况下，甚至只有两个可能的实例。 程序员可以利用这一点：\n" +
                "\n" +
                "```\n" +
                "zero = Integer.valueOf(0);\n" +
                "return Boolean.TRUE;\n" +
                "```\n" +
                "\n" +
                "**平台相关的文件名**\n" +
                "\n" +
                "```\n" +
                "File f = new File(path +'/'+ filename);\n" +
                "```\n" +
                "\n" +
                "正确示例：\n" +
                "\n" +
                "```\n" +
                "File f = new File(path + File.separatorChar + filename);\n" +
                "```\n" +
                "\n" +
                "**未定义流编码**\n" +
                "\n" +
                "```\n" +
                "Reader r = new FileReader(file);\n" +
                "```\n" +
                "\n" +
                "正确示例：\n" +
                "\n" +
                "```\n" +
                "Reader r = new InputStreamReader(new FileInputStream(file), \"ISO-8859-1\");\n" +
                "```\n" +
                "\n" +
                "**未缓存流**\n" +
                "\n" +
                "```\n" +
                "InputStream in = new FileInputStream(file);\n" +
                "int b;\n" +
                "while ((b = in.read()) != -1) {\n" +
                "   ...\n" +
                "}\n" +
                "```\n" +
                "\n" +
                "上面的代码逐字节读取一个文件。 对流的每个read（）调用都会导致本地（JNI）调用到文件系统的本地实现。 根据实施情况，这可能会导致操作系统的系统调用。 JNI调用非常昂贵，系统调用也很昂贵。 通过将流包装到BufferedInputStream中，可以显着减少本地调用的数量。 使用上面的代码从/ dev / zero读取1 MB的数据在我的笔记本上花费了大约1秒。 在下面的固定代码下降到60毫秒！ 这节省了94％。 这当然也适用于输出流。 这不仅适用于文件系统，而且适用于套接字。\n" +
                "\n" +
                "```\n" +
                "InputStream in = new BufferedInputStream(new FileInputStream(file));\n" +
                "```\n" +
                "\n" +
                "**未缓存流**\n" +
                "\n" +
                "```\n" +
                "Writer w = new OutputStreamWriter(os, \"UTF-8\");\n" +
                "while (...) {\n" +
                "  w.write(\"something\");\n" +
                "}\n" +
                "```\n" +
                "\n" +
                "如所演示的，OutputStreamWriter为每个对其write（）方法的调用使用内存。 这是非常不幸的，而不是人们期望的行为！ 如果你做了很多的写操作，你应该把它包装在一个BufferedWriter中，它似乎根本没有使用任何内存：\n" +
                "\n" +
                "```\n" +
                "Writer w = new BufferedWriter(new OutputStreamWriter(os, \"UTF-8\"));\n" +
                "```\n" +
                "\n" +
                "**Infinite heap 未限制堆大小**\n" +
                "\n" +
                "```\n" +
                "byte[] pdf = toPdf(file);\n" +
                "```\n" +
                "\n" +
                "在这里，一个方法从某个输入创建一个PDF文件，并以二进制PDF数据作为字节数组返回。 此代码假定生成的文件足够小以适应可用的堆内存。 如果这段代码不能100％确定，那么它很容易出现内存不足的情况。 特别是如果这个代码运行在服务器端通常意味着许多并行线程。 批量数据绝不能用字节数组处理。 **应该使用流并将数据缓存到磁盘或数据库。**\n" +
                "\n" +
                "```\n" +
                "File pdf = toPdf(file);\n" +
                "```\n" +
                "\n" +
                "类似的反模式是缓冲来自“不可信”（安全术语）源的流输入。 比如缓存到达网络套接字的数据。 如果应用程序不知道将要到达多少数据，则必须确保它始终关注数据的大小。 如果缓存的数据量超过了理智的限制，应该向调用者发出错误信息，而不是通过让应用程序进入内存不足状态来使应用程序靠墙。\n" +
                "\n" +
                "**Infinite time未限制响应时间**\n" +
                "\n" +
                "```\n" +
                "Socket socket = ...\n" +
                "socket.connect(remote);\n" +
                "InputStream in = socket.getInputStream();\n" +
                "int i = in.read();\n" +
                "```\n" +
                "\n" +
                "上面的代码有两个使用未指定超时的阻塞调用。想象一下，如果超时是无限的。这可能会导致应用程序永久挂起。一般来说，首先有无限的超时是非常愚蠢的想法。无限是非常漫长的。即使在太阳变成红色巨人（它爆炸）的时候，它仍然是无穷远的方式。一般的程序员死在72岁。根本没有现实世界的情况，我们想等那么久。无限超时只是一个荒谬的事情。使用一小时，一天，一周，一个月，一年，十年。但不是无限。要连接到远程机器，我个人发现有20秒的超时时间。**尽管connect（）方法需要一个超时参数，但read（）没有这样的事情**。但是，您可以在每次阻塞呼叫之前修改套接字的套接字超时。 \n" +
                "\n" +
                "```\n" +
                "Socket socket = ...\n" +
                "socket.connect(remote, 20000); // fail after 20s\n" +
                "InputStream in = socket.getInputStream();\n" +
                "socket.setSoTimeout(15000);\n" +
                "int i = in.read();\n" +
                "```\n" +
                "\n" +
                "不幸的是，文件系统API（FileInputStream，FileChannel，FileDescriptor，File）没有办法在文件操作上设置超时。这非常不幸。因为这些是Java应用程序中最常见的阻塞调用：写入stdout / stderr和从stdin读取文件操作，并且写入日志文件是很常见的。标准输入/输出流上的操作直接依赖于我们的Java VM之外的其他进程。如果他们决定永远阻止，那么将在我们的应用程序中读取/写入这些流。磁盘I / O是系统上所有进程竞争的有限资源。无法保证文件上的简单读取/写入很快。它可能会导致未指定的等待时间。今天，远程文件系统也无处不在。磁盘可能位于SAN / NAS上，或者文件系统可能通过网络安装（NFS，AFS，CIFS / Samba）。所以文件系统调用可能实际上是一个网络调用：太糟糕了，我们没有网络API的能力！所以如果操作系统决定写入的超时时间是60秒，你就会陷入困境。不能假定任何磁盘/文件操作都很快，甚至是远程瞬间。应用程序可以通过假定文件操作需要几秒钟来帮助用户。所以最好避免或异步完成（在后台）。解决这个问题的方法是：充分的缓冲和排队/异步处理。\n" +
                "\n" +
                "**认为new Date()很easy**\n" +
                "\n" +
                "```\n" +
                "fun (...) {\n" +
                "  long t = System.currentTimeMillis();\n" +
                "  long t = System.nanoTime();\n" +
                "  Date d = new Date();\n" +
                "  Calendar c = new GregorianCalendar();\n" +
                "  ...\n" +
                "}\n" +
                "```\n" +
                "\n" +
                "正确示例：\n" +
                "\n" +
                "```\n" +
                "fun (...) {\n" +
                "  Date d = new Date();\n" +
                "  ...\n" +
                "}\n" +
                "```\n" +
                "\n" +
                "**重复抛出异常**\n" +
                "\n" +
                "```\n" +
                "try {\n" +
                "  doStuff();\n" +
                "} catch(Exception e) {\n" +
                "  throw new RuntimeException(e);\n" +
                "}\n" +
                "```\n" +
                "\n" +
                "有的时候你捕获就是RuntimeException，而又重新构建了一个RuntimeException对象；\n" +
                "\n" +
                "正确示例：\n" +
                "\n" +
                "```\n" +
                "try {\n" +
                "  doStuff();\n" +
                "} catch(IOException e) {\n" +
                "  throw new RuntimeException(e.getMessage(), e);\n" +
                "} catch(RuntimeException e) {\n" +
                "  throw e;\n" +
                "} catch(Exception e) {\n" +
                "  throw new RuntimeException(e.getMessage(), e);\n" +
                "}\n" +
                "```\n" +
                "\n" +
                "**Silly exception messages 愚蠢定义异常信息**\n" +
                "\n" +
                "```\n" +
                "try {\n" +
                "} catch (ParseException e) {\n" +
                "  throw new RuntimeException(\"**** --> err happened !!!!11! <---\");\n" +
                "}\n" +
                "```\n" +
                "\n" +
                "这个异常是无用的。 它没有给调用者任何指示它为什么发生。 要么添加有用的信息，要么只是传递原始异常的消息。 不要将您的自定义“操作失败， 并且它将该字符串添加到常量池中，该常量池将在大型应用程序中充满无用的字符串。 字符串是已编译应用程序中的顶层空间消费者。\n" +
                "\n" +
                "```\n" +
                "try {\n" +
                "} catch (ParseException e) {\n" +
                "  throw new RuntimeException(e.getMessage(), e);\n" +
                "}\n" +
                "```\n" +
                "\n" +
                "**异常日志捕获**\n" +
                "\n" +
                "```\n" +
                "try {\n" +
                "    ...\n" +
                "} catch(Exception e) {\n" +
                "    log.error(e.getMessage(), e);\n" +
                "    throw e;\n" +
                "} \n" +
                "```\n" +
                "\n" +
                "如果是分布式架构，可以在本地打印一份日志，来分析错误原因；如果是一个系统内部是没有必要的。\n" +
                "\n" +
                "**不完整的异常处理**\n" +
                "\n" +
                "```\n" +
                "try {\n" +
                "    is = new FileInputStream(inFile);\n" +
                "    os = new FileOutputStream(outFile);\n" +
                "} finally {\n" +
                "    try {\n" +
                "        is.close();\n" +
                "        os.close();\n" +
                "    } catch(IOException e) {\n" +
                "        /* we can't do anything */\n" +
                "    }\n" +
                "}\n" +
                "```\n" +
                "\n" +
                "如果流未关闭，则底层操作系统无法释放本地资源。 这位程序员想要小心关闭两个流。 所以他把结尾放在最后一个条款中。 但是，如果is.close（）抛出一个IOException，那么os.close甚至不会被执行。 这两个close语句都必须包含在它们自己的try / catch子句中。 而且，如果创建输入流引发异常（因为找不到该文件），则os为null，os.close（）将引发NullPointerException。\n" +
                "\n" +
                "```\n" +
                "try {\n" +
                "    is = new FileInputStream(inFile);\n" +
                "    os = new FileOutputStream(outFile);\n" +
                "} finally {\n" +
                "    try { if (is != null) is.close(); } catch(IOException e) {/* we can't do anything */}\n" +
                "    try { if (os != null) os.close(); } catch(IOException e) {/* we can't do anything */}\n" +
                "}\n" +
                "```\n" +
                "\n" +
                "**transient陷阱**\n" +
                "\n" +
                "```\n" +
                "public class A implements Serializable {\n" +
                "    private String name;\n" +
                "    private transient Log log = LogFactory.getLog(getClass());\n" +
                "    \n" +
                "    public void f() {\n" +
                "        log.debug(\"enter f\");\n" +
                "        ...\n" +
                "    }\n" +
                "}\n" +
                "```\n" +
                "\n" +
                "日志对象不可序列化。 程序员知道这一点，并正确地将日志字段声明为暂时的，所以它不会被序列化。 然而这个变量的初始化发生在类的初始化中。 在反序列化初始化器和构造函数不执行！ 这会使反序列化的对象留下一个空的日志变量，随后会在f()中导致NullPointerException。 经验法则：从不使用类初始化与瞬态变量。 您可以通过使用静态变量或使用局部变量来解决这种情况：\n" +
                "\n" +
                "```\n" +
                "public class A implements Serializable {\n" +
                "    private String someState;\n" +
                "    private static final Log log = LogFactory.getLog(A.class);\n" +
                "    \n" +
                "    public void f() {\n" +
                "        log.debug(\"enter f\");\n" +
                "        ...\n" +
                "    }\n" +
                "}\n" +
                "\n" +
                "public class A implements Serializable {\n" +
                "    private String someState;\n" +
                "    \n" +
                "    public void f() {\n" +
                "        Log log = LogFactory.getLog(getClass());\n" +
                "        log.debug(\"enter f\");\n" +
                "        ...\n" +
                "    }\n" +
                "}\n" +
                "```\n" +
                "\n" +
                "**过度的初始化**\n" +
                "\n" +
                "```\n" +
                "public class B {\n" +
                "    private int count = 0;\n" +
                "    private String name = null;\n" +
                "    private boolean important = false;\n" +
                "}\n" +
                "```\n" +
                "\n" +
                " Java语言规范保证成员变量自动初始化为特定的值：0，null，false。 通过显式声明它们，会在构造函数之前执行类初始化程序。 这是不必要的矫枉过正，应该避免。\n" +
                "\n" +
                "**日志实例：是否为静态？**\n" +
                "\n" +
                "```\n" +
                "private static final Log log = LogFactory.getLog(MyClass.class);\n" +
                "```\n" +
                "\n" +
                "线程安全，不会出现多线程并发问题。\n" +
                "可用于静态和非静态代码。\n" +
                "**没有可序列化类的问题。**\n" +
                "初始化只需花费一次：getLog()可能并不像你想象的那么便宜。\n" +
                "无论如何，没有人会卸载Log类加载器。\n" +
                "\n" +
                "选择错误的类加载器\n" +
                "\n" +
                "```\n" +
                "Class clazz = Class.forName(name);\n" +
                "Class clazz = getClass().getClassLoader().loadClass(name);\n" +
                "```\n" +
                "\n" +
                "此代码使用加载当前类的类加载器。 getClass()可能会返回一些意想不到的东西，比如子类或动态代理。 有些东西不受你的控制。 当你动态加载一个额外的类时，这几乎是你想要的。 特别是在像应用程序服务器，Servlet引擎或Java Webstart这样的托管环境中，这当然是错误的。 这个代码根据运行环境的不同而表现得非常不同。环境使用上下文类加载器为应用程序提供一个类加载器，用于检索“自己的”类。\n" +
                "\n" +
                "```\n" +
                "ClassLoader cl = Thread.currentThread().getContextClassLoader();\n" +
                "if (cl == null) cl = MyClass.class.getClassLoader(); // fallback\n" +
                "Class clazz = cl.loadClass(name);\n" +
                "```\n" +
                "\n" +
                "使用反射不佳\n" +
                "\n" +
                "```\n" +
                "Class beanClass = cl.loadClass(AClass);\n" +
                "if (beanClass.newInstance() instanceof TestBean)\n" +
                "```\n" +
                "\n" +
                " 这种操作非常昂贵。 或者默认的构造函数可能不存在。 那么这个if语句会抛出一个异常。 执行此检查的正确方法是使用Class.isAssignableFrom（Class）方法。\n" +
                "\n" +
                "```\n" +
                "Class beanClass = ...\n" +
                "if (TestBean.class.isAssignableFrom(beanClass)) ...\n" +
                "```\n" +
                "\n"}/>

            </div>
        );
    }
}

export default CTO6;