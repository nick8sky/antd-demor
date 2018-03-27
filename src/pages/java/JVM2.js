import React, { Component } from 'react';

import Markdown  from 'react-markdown';

class JVM2 extends Component {
    render() {

        return (
            <div>
                <Markdown source={"### Java GC日志分析及永久代的移除 \n\n" +
                "```\n" +
                "private static final int _1MB = 1024*1024;\n" +
                "    private static List  list= new ArrayList<DataObject>();\n" +
                "    public static void main(String ...s ) throws InterruptedException {\n" +
                "        byte[] allocation1, allocation2, allocation3, allocation4;\n" +
                "        allocation1 = new byte[2 * _1MB];\n" +
                "        allocation2 = new byte[2 * _1MB];\n" +
                "        allocation3 = new byte[2 * _1MB];\n" +
                "        allocation4 = new byte[4 * _1MB];\n" +
                "        List  list2= new ArrayList<DataObject>();\n" +
                "        long time = 0l;\n" +
                "        while (true){\n" +
                "            allocation1 = new byte[2 * _1MB];\n" +
                "            allocation2 = new byte[2 * _1MB];\n" +
                "            allocation3 = new byte[2 * _1MB];\n" +
                "            allocation4 = new byte[4 * _1MB]; //新生代增加\n" +
                "            if(time %10 ==0){\n" +
                "                list =new ArrayList<DataObject>(); //永久代回收?\n" +
                "                list2 =new ArrayList<DataObject>(); //老年代回收\n" +
                "            }\n" +
                "            list.add(new DataObject(time)) ; //永久代增加\n" +
                "            list2.add(new DataObject(time)) ; //老年代增加\n" +
                "            Thread.sleep(500l);\n" +
                "            if(time +1  > Long.MAX_VALUE ) time = 0l ;\n" +
                "            time ++ ;\n" +
                "            System.out.println(time);\n" +
                "            if(time %50 ==0){\n" +
                "                System.gc();\n" +
                "            }\n" +
                "        } \n" +
                "    }\n" +
                "```\n" +
                "\n" +
                "启动后，在另一个控制台执行：\n" +
                "\n" +
                "```\n" +
                "$ jps\n" +
                "1722 Hello\n" +
                "1723 Jps\n" +
                "jinfo -flag +PrintGCDetails 1722\n" +
                "jinfo -flag +PrintGC 1722\n" +
                "```\n" +
                "\n" +
                "查看日志\n" +
                "\n" +
                "```\n" +
                "[GC (Allocation Failure) [PSYoungGen: 70950K->10336K(72192K)] 75439K->14856K(247296K), 0.0027352 secs] [Times: user=0.01 sys=0.00, real=0.00 secs] \n" +
                "48\n" +
                "49\n" +
                "50\n" +
                "[GC (System.gc()) [PSYoungGen: 42239K->10368K(73216K)] 46760K->14888K(248320K), 0.0027003 secs] [Times: user=0.01 sys=0.01, real=0.01 secs] \n" +
                "[Full GC (System.gc()) [PSYoungGen: 10368K->0K(73216K)] [ParOldGen: 4520K->10579K(175104K)] 14888K->10579K(248320K), [Metaspace: 2672K->2672K(1056768K)], 0.0064707 secs] [Times: user=0.02 sys=0.01, real=0.00 secs] \n" +
                "\n" +
                "```\n" +
                "\n" +
                "142826K->10751K(274944K) 分别代表回收前、回收后以及总内存大小\n" +
                "\n" +
                "第一行yong gc: [PSYoungGen: 70950K->10336K(72192K)] 75439K->14856K(247296K)\n" +
                "\n" +
                "70950-10336 = 75439-14856 = 60 614|60 583 \n" +
                "\n" +
                "![Markdown](https://thumbnail0.baidupcs.com/thumbnail/abb1c8928dd0cd8da7f0a2b7f3c705dc?fid=940423185-250528-670454778740898&time=1520074800&rt=sh&sign=FDTAER-DCb740ccc5511e5e8fedcff06b081203-n3KqPoEQf2Pllq%2BXjRfgkHQ71Ss%3D&expires=8h&chkv=0&chkbd=0&chkpc=&dp-logid=1433476561903523345&dp-callid=0&size=c710_u400&quality=100&vuk=-&ft=video)\n" +
                "\n" +
                "第三行Full GC (System.gc()) [PSYoungGen: 10304K->0K(62976K)][ParOldGen: 14830K->10584K(175104K)] 25134K->10584K(238080K), [Metaspace: 2677K->2677K(1056768K)]\n" +
                "\n" +
                "![Markdown](https://thumbnail0.baidupcs.com/thumbnail/8a5b80cc79edf17e8771cd1bfa8f11e6?fid=940423185-250528-110617636388647&time=1520074800&rt=sh&sign=FDTAER-DCb740ccc5511e5e8fedcff06b081203-uouCOv8wgtEtrIauQ499cvaNNxM%3D&expires=8h&chkv=0&chkbd=0&chkpc=&dp-logid=1433484798646704190&dp-callid=0&size=c710_u400&quality=100&vuk=-&ft=video)\n" +
                "\n" +
                "停止程序：\n" +
                "\n" +
                "```\n" +
                "Heap\n" +
                " PSYoungGen      total 68608K, used 58183K [0x000000076ab00000, 0x000000076fb00000, 0x00000007c0000000)\n" +
                "  eden space 57344K, 83% used [0x000000076ab00000,0x000000076d9c1e80,0x000000076e300000)\n" +
                "  from space 11264K, 91% used [0x000000076f000000,0x000000076fa10040,0x000000076fb00000)\n" +
                "  to   space 12288K, 0% used [0x000000076e300000,0x000000076e300000,0x000000076ef00000)\n" +
                " ParOldGen       total 175104K, used 10603K [0x00000006c0000000, 0x00000006cab00000, 0x000000076ab00000)\n" +
                "  object space 175104K, 6% used [0x00000006c0000000,0x00000006c0a5ae68,0x00000006cab00000)\n" +
                " Metaspace       used 2683K, capacity 4490K, committed 4864K, reserved 1056768K\n" +
                "  class space    used 289K, capacity 386K, committed 512K, reserved 1048576K\n" +
                "```\n" +
                "\n" +
                "---\n" +
                "\n" +
                "栈内存溢出：程序所要求的栈深度过大。 \n" +
                "\n" +
                "堆内存溢出： 分清内存泄露还是 内存容量不足。泄露则看对象如何被 GC Root 引用，不足则通过调大-Xms，-Xmx参数。 \n" +
                "\n" +
                "永久代溢出：Class对象未被释放，Class对象占用信息过多，有过多的Class对象。 \n" +
                "\n" +
                "直接内存溢出：系统哪些地方会使用直接内存。"+
                "\n" +
                "\n" +
                "\n" +
                "---\n" +
                "\n" +
                "类的元数据, 字符串池, 类的静态变量 将会从永久代移除。\n" +
                "\n" +
                "**什么是元数据?**\n" +
                "\n" +
                "什么是元数据？\n" +
                "\n" +
                "​       **元数据（Meta Date），就是描述数据的信息。**\n" +
                "​       这些定义都很是抽象，我们可以把元数据简单的理解成，**最小的数据单位**。元数据可以为数据说明其元素或属性（[数据]名称、[数据]大小、[数据]类型、[数据]长度、 [数据]位于何处、[数据]拥有者）。\n" +
                "\n" +
                "​       举几个简单的例子：\n" +
                "​       使用过数码相机的同学都应该知道，每张数码照片都会存在一个EXIF信息。它就是一种用来描述数码图片的元数据。根据EXIF标准，这些元数据包括：Image Description(图像描述、来源. 指生成图像的工具 )、Artist(作者)、Make( 生产者)、Model (型号)、….、等等。\n" +
                "​       生活中我们填写的《个人信息登记表》，包括姓名、性别、民族、政治面貌、一寸照片、学历、职称等等这些就是锁定kent.zhu这个人的元数据。\n" +
                "\n" +
                " \n" +
                "\n" +
                "元数据之于信息架构的意义\n" +
                "\n" +
                "​      元数据是一种很有效的方法，用以确保网站上各种形式的内容都能被查找到。比如我们常常为搜索很久之前看到的一张美女图片犯愁，而如果一个图片网站如果信息架构足够好，我们就能凭借我们回忆到的元数据（关于武藤兰的？2000年拍摄的？）清晰的找到。\n" +
                "​       前面提到，**元数据实际上是为产品的可查找性（Findability）服务的**。而用户在查找信息的时候不会按照机器思维去找（不会输入该照片的ID），而是直接输入关于信息的描述性信息如：“小狗 圣诞卡”。也就意味着在创建关于描述性元数据的时候要尽量的提取关于这个对象所讲述的特性，这些才是人们能记住的和习惯搜索的细节。\n" +
                "\n" +
                "​        最常见的例子就是我们见到的Tag。Tag就是一种用户自创的元数据，其特点是无层次结构、自定义。\n" +
                "\n" +
                "\n" +
                "\n" +
                "元数据的特点\n" +
                "\n" +
                "​\t①元数据是关于数据的结构化的数据，它不一定是数字形式的，可来自不同的[资源](http://wiki.mbalib.com/wiki/%E8%B5%84%E6%BA%90)。\n" +
                "\n" +
                "　　②元数据是与对象相关的数据，此数据使其潜在的用户不必先具备对这些对象的存在和特征的完整认识。\n" +
                "\n" +
                "　　③元数据是对信息包裹(Information Package)的编码的描述。\n" +
                "\n" +
                "　　④元数据包含用于描述信息对象的内容和位置的数据元素集，促进了网络环境中信息对象的发现和检索。\n" +
                "\n" +
                "　　⑤元数据不仅对信息对象进行描述，还能够描述资源的使用环境、[管理](http://wiki.mbalib.com/wiki/%E7%AE%A1%E7%90%86)、[加工](http://wiki.mbalib.com/wiki/%E5%8A%A0%E5%B7%A5)、保存和使用等方面的情况。\n" +
                "\n" +
                "　　⑥在信息对象或[系统](http://wiki.mbalib.com/wiki/%E7%B3%BB%E7%BB%9F)的生命周期中自然增加元数据。\n" +
                "\n" +
                "　　⑦元数据常规定义中的“数据”是表示事务性质的符号，是进行各种[统计](http://wiki.mbalib.com/wiki/%E7%BB%9F%E8%AE%A1)、计算、科学研究、[技术设计](http://wiki.mbalib.com/wiki/%E6%8A%80%E6%9C%AF%E8%AE%BE%E8%AE%A1)所依据的数值，或是说数字化、公式化、代码化、图表化的信息。\n" +
                "\n" +
                " \n" +
                "\n" +
                "　　元数据是指用来描述数据的数据，更通俗一点，就是描述代码间关系，或者代码与其他资源(例如数据库表)之间内在联系的数据。在一些技术框架，如struts、EJB、hibernate就不知不觉用到了元数据。对struts来说，元数据指的是struts-config.xml;对EJB来说，就是ejb-jar.xml和厂商自定义的xml文件；对hibernate来说就是hbm文件。以上阐述的几种元数据都是基于xml文件的或者其他形式的单独配置文件。对于java来说元数据存在于java代码中，元数据标签的存在并不影响程序代码的编译和执行。\n" +
                "\n" +
                "​\t \n" +
                "\n" +
                "​\t元数据甚至使我们可以不用修改核心语言，就能够在 Java 语言中添加新功能，使核心语言成为一种开放式语言。在纯面向对象的语言中实现AOP就是使用元数据进行语言扩展的一个很好的例子。\n" +
                "\n" +
                "\n" +
                "\n" +
                "JDK5.0出来后，java语言中就有了四种类型（TYPE），即类(class)、枚举(enum)、接口(interface)和注解(@interface)，它们是处在同一级别的。java就是通过注解来表示元数据的。\n" +
                "\n" +
                "```\n" +
                "public @interface MyAnnotation {\n" +
                "    // 定义公共的final静态属性\n" +
                "    int age = 25;\n" +
                "    // 定义公共的抽象方法\n" +
                "    String name();\n" +
                "}\n" +
                "```\n" +
                "\n" +
                "反编译字节码文件得到：\n" +
                "\n" +
                "![Markdown](https://gitee.com/nick070809/pics/raw/master/m4/43912f9536b4d92b.png)\n" +
                "\n" +
                "由上我们可以得到，java的注解本质上是一个接口，而且是继承了接口Annotation的接口。既然是接口，那么\n" +
                "\n" +
                "     ```\n" +
                "a.注解可以有成员 \n" +
                "\t注解和接口相似，它只能定义final静态属性和公共抽象方法。\n" +
                "b.注解可以有方法 \n" +
                "\t1.方法前默认会加上public abstract且只能由这两个修饰符修饰。属性前默认加上public static final 且只能由这些修饰符修饰。由于是final，定义时必须初始化。\n" +
                "\t2.在声明方法时可以定义方法的默认返回值,如:  String color() default \"blue\"; \n" +
                " \t3.方法的返回值可以有哪些类型:8种基本类型，String、Class、枚举、注解及这些类型的数组。\n" +
                "    4.java.lang.annotation.Annotation 本身是接口，而不是注解，当使用关键字@interface 定义一个注解时，该注解隐含的继承了java.lang.annotation.Annotation接口；如果我们定义一个接口，并且让该接口继承自Annotation，那么我们定义的接口依然是接口而不是注解。综上，定义注解只能依靠@interface实现。\n" +
                "     ```\n" +
                "\n" +
                "---\n" +
                "\n" +
                "字符串池(String Pool）\n" +
                "\n" +
                "​\t在工作中，String类是我们使用频率非常高的一种对象类型。JVM为了提升性能和减少内存开销，避免字符串的重复创建，其维护了一块特殊的内存空间，这就是今天要讨论的核心，即字符串池（String Pool）。字符串池由String类私有的维护。\n" +
                "\n" +
                "​      我们知道，在Java中有两种创建字符串对象的方式：1）采用字面值的方式赋值  2）采用new关键字新建一个字符串对象。这两种方式在性能和内存占用方面存在着差别。\n" +
                "\n" +
                "​      方式一：采用字面值的方式赋值，例如：\n" +
                "\n" +
                "```\n" +
                "        String a =\"aa\";\n" +
                "        String b =\"aa\";\n" +
                "        System.out.println(a == b);\n" +
                "```\n" +
                "\n" +
                "采用字面值的方式创建一个字符串时，JVM首先会去字符串池中查找是否存在\"aaa\"这个对象，如果不存在，则在字符串池中创建\"aaa\"这个对象，然后将池中\"aaa\"这个对象的引用地址返回给字符串常量a，这样a会指向池中\"aaa\"这个字符串对象；如果存在，则不创建任何对象，直接将池中\"aaa\"这个对象的地址返回，赋给字符串常量。\n" +
                "\n" +
                "​      在本例中，执行：a == b ，会得到结果：true\n" +
                "\n" +
                "   这是因为，创建字符串对象b时，字符串池中已经存在\"aaa\"这个对象，直接把对象\"aaa\"的引用地址返回给b，这样b指向了池中\"aaa\"这个对象，也就是说a和b指向了同一个对象，因此语句System.out.println(a == b)输出：true。\n" +
                "\n" +
                " \n" +
                "\n" +
                "​     方式二：采用new关键字新建一个字符串对象，例如：\n" +
                "\n" +
                "```\n" +
                "        String a = new String(\"aa\");\n" +
                "        String b = new String(\"aa\");\n" +
                "        System.out.println(a == b);   //false\n" +
                "        System.out.println(a .equals( b));  //true\n" +
                "```\n" +
                "\n" +
                "​\t采用new关键字新建一个字符串对象时，JVM首先在字符串池中查找有没有\"aaa\"这个字符串对象，如果有，**则不在池中再去创建\"aaa\"这个对象了，直接在堆中创建一个\"aaa\"字符串对象**，然后将堆中的这个\"aaa\"对象的地址返回赋给引用a，这样，a就指向了堆中创建的这个\"aaa\"字符串对象；**如果没有，则首先在字符串池中创建一个\"aaa\"字符串对象，然后再在堆中创建一个\"aaa\"字符串对象**，然后将堆中这个\"aaa\"字符串对象的地址返回赋给a引用，这样，a指向了堆中创建的这个\"aaa\"字符串对象。\n" +
                "\n" +
                "\n" +
                "\n" +
                "​\t因为，采用new关键字创建对象时，每次new出来的都是一个新的对象，也即是说引用a和b指向的是两个不同的对象，因此语句System.out.println(a == b)输出：false。\n" +
                "\n" +
                "​\t字符串池的实现有一个前提条件：String对象是不可变的。因为这样可以保证多个引用可以同事指向字符串池中的同一个对象。如果字符串是可变的，那么一个引用操作改变了对象的值，对其他引用会有影响，这样显然是不合理的。\n" +
                "\n" +
                "\n" +
                "\n" +
                "**字符串池的优缺点**：字符串池的优点就是避免了相同内容的字符串的创建，节省了内存，省去了创建相同字符串的时间，同时提升了性能；另一方面，字符串池的缺点就是牺牲了JVM在常量池中遍历对象所需要的时间，不过其时间成本相比而言比较低。\n" +
                "\n" +
                "**intern方法使用**：一个初始为空的字符串池，它由类String独自维护。当调用 intern方法时，如果池已经包含一个等于此String对象的字符串（用equals(oject)方法确定），则返回池中的字符串。否则，将此String对象添加到池中，并返回此String对象的引用。 对于任意两个字符串s和t，当且仅当s.equals(t)为true时，s.instern() == t.instern才为true。**所有字面值字符串和字符串赋值常量表达式都使用 intern方法进行操作。**\n" +
                "\n" +
                "​     **GC回收：字符串池中维护了共享的字符串对象，这些字符串不会被垃圾收集器回收**。\n" +
                "\n" +
                "---\n" +
                "\n" +
                "类的静态变量\n" +
                "\n" +
                "```\n" +
                "private static List  list= new ArrayList<DataObject>();\n" +
                "```\n" +
                "\n" +
                "\n" +
                "\n" +
                "jdk7是永久代\n" +
                "\n" +
                "jdk8后是Metaspace\n" +
                "\n" +
                " \n" +
                "\n" +
                "在过去（当自定义类加载器使用不普遍的时候），类几乎是“静态的”并且很少被卸载和回收，因此类也可以被看成“永久的”。另外由于类作为JVM实现的一部分，它们不由程序来创建，因为它们也被认为是“非堆”的内存。\n" +
                "\n" +
                "在JDK8之前的HotSpot虚拟机中，类的这些“永久的”数据存放在一个叫做永久代的区域。永久代一段连续的内存空间，我们在JVM启动之前可以通过设置-XX:MaxPermSize的值来控制永久代的大小，32位机器默认的永久代的大小为64M，64位的机器则为85M。永久代的垃圾回收和老年代的垃圾回收是绑定的，一旦其中一个区域被占满，这两个区都要进行垃圾回收。但是有一个明显的问题，由于我们可以通过‑XX:MaxPermSize 设置永久代的大小，一旦类的元数据超过了设定的大小，程序就会耗尽永久代内存，并出现内存溢出错误(OOM)。\n" +
                "\n" +
                "在JDK7之前最容易导致老年代溢出的两个问题：字符串池和静态变量。\n" +
                "\n" +
                "\n" +
                "\n" +
                "辞永久代，迎元空间\n" +
                "\n" +
                "随着Java8的到来，我们再也见不到永久代了。但是这并不意味着类的元数据信息也消失了。这些数据被移到了一个与堆不相连的本地内存区域，这个区域就是我们要提到的元空间。\n" +
                "\n" +
                "这项改动是很有必要的，因为对永久代进行调优是很困难的。永久代中的元数据可能会随着每一次Full GC发生而进行移动。并且为永久代设置空间大小也是很难确定的，因为这其中有很多影响因素，比如类的总数，常量池的大小和方法数量等。\n" +
                "\n" +
                "同时，HotSpot虚拟机的每种类型的垃圾回收器都需要特殊处理永久代中的元数据。将元数据从永久代剥离出来，不仅实现了对元空间的无缝管理，还可以简化Full GC以及对以后的并发隔离类元数据等方面进行优化。\n" +
                "\n" +
                "![Markdown](https://gitee.com/nick070809/pics/raw/master/m4/a8385607a125198b.jpg)\n" +
                "\n" +
                "**移除永久代的影响**\n" +
                "\n" +
                "**由于类的元数据分配在本地内存中，元空间的最大可分配空间就是系统可用内存空间**。因此，我们就不会遇到永久代存在时的内存溢出错误，也不会出现泄漏的数据移到交换区这样的事情。最终用户可以为元空间设置一个可用空间最大值，如果不进行设置，JVM会自动根据类的元数据大小动态增加元空间的容量。\n" +
                "\n" +
                "**注意**：永久代的移除并不代表自定义的类加载器泄露问题就解决了。因此，你还必须监控你的内存消耗情况，因为一旦发生泄漏，会占用你的大量本地内存，并且还可能导致交换区交换更加糟糕。\n" +
                "\n" +
                "\n" +
                "\n" +
                "在Windows下称为虚拟内存(virtual memory),在Linux下称为交换空间(swap space),用于当系统需要更多的内存资源而物理内存已经满了的情况下，将物理内存中不活跃的页转移到磁盘上的交换空间中。\n" +
                "\n" +
                "​\t随着JDK8的到来，JVM不再有PermGen。但类的元数据信息（metadata）还在，只不过不再是存储在连续的堆空间上，而是移动到叫做“Metaspace”的本地内存（Native memory）中。\n" +
                "\n" +
                "​       类的元数据信息转移到Metaspace的原因是PermGen很难调整。PermGen中类的元数据信息在每次FullGC的时候可能会被收集，但成绩很难令人满意。而且应该为PermGen分配多大的空间很难确定，因为PermSize的大小依赖于很多因素，比如JVM加载的class的总数，常量池的大小，方法的大小等。\n" +
                "\n" +
                "​      此外，在HotSpot中的每个垃圾收集器需要专门的代码来处理存储在PermGen中的类的元数据信息。从PermGen分离类的元数据信息到Metaspace,由于Metaspace的分配具有和Java Heap相同的地址空间，因此Metaspace和Java Heap可以无缝的管理，而且简化了FullGC的过程，以至将来可以并行的对元数据信息进行垃圾收集，而没有GC暂停。\n" +
                "\n" +
                "**移动到Metaspace和它的内存分配**\n" +
                "\n" +
                "**Metaspace利用内存管理技术来管理Metaspace。**这使得以前由不同的垃圾收集器来处理永久代数据的工作，现在仅仅由Metaspace VM在Metaspace中通过C++来进行管理。Metaspace背后的一个思想是，类和它的元数据的生命周期是和它的类加载器的生命周期一致的。也就是说，只要类的类加载器是存活的，在Metaspace中的类元数据也是存活的，不能被释放。\n" +
                "\n" +
                "之前我们不严格的使用这个术语“Metaspace”。更正式的，每个类加载器存储区叫做“a metaspace”。这些metaspaces一起总体称为”the Metaspace”。仅仅当类加载器不在存活，被垃圾收集器声明死亡后，该类加载器对应的metaspace空间才可以回收。Metaspace空间没有迁移和压缩。但是元数据会被扫描是否存在Java引用。\n" +
                "\n" +
                "Metaspace VM使用一个块分配器(chunking allocator)来管理Metaspace空间的内存分配。块的大小依赖于类加载器的类型。其中有一个全局的可使用的块列表（a global free list of chunks）。当类加载器需要一个块的时候，类加载器从全局块列表中取出一个块，添加到它自己维护的块列表中。当类加载器死亡，它的块将会被释放，归还给全局的块列表。块（chunk）会进一步被划分成blocks,每个block存储一个元数据单元(a unit of metadata)。Chunk中Blocks的分配线性的（pointer bump）。这些chunks被分配在内存映射空间(memory mapped(mmapped) spaces)之外。在一个全局的虚拟内存映射空间（global virtual mmapped spaces）的链表，当任何虚拟空间变为空时，就将该虚拟空间归还回操作系统。\n" +
                "\n" +
                "\n" +
                "\n" +
                "Metaspace VM管理Metaspace空间的增长。但有时你会想通过在命令行显示的设置参数-XX:MaxMetaspaceSize来限制Metaspace空间的增长。默认情况下，-XX:MaxMetaspaceSize并没有限制，因此，在技术上，Metaspace的尺寸可以增长到交换空间，而你的本地内存分配将会失败。\n" +
                "\n" +
                "对于64位的服务器端JVM，-XX：MetaspaceSize的默认大小是21M。这是初始的限制值(the initial high watermark)。一旦达到这个限制值，FullGC将会被触发进行类卸载(当这些类的类加载器不再存活时)，然后这个high watermark被重置。新的high watermark的值依赖于空余Metaspace的容量。如果没有足够的空间被释放，high watermark的值将会上升；如果释放了大量的空间，那么high watermark的值将会下降。如果初始的watermark设置的太低，这个过程将会进行多次。你可以通过垃圾收集日志来显示的查看这个垃圾收集的过程。所以，一般建议在命令行设置一个较大的值给XX:MetaspaceSize来避免初始时的垃圾收集。\n" +
                "\n" +
                "每次垃圾收集之后，Metaspace VM会自动的调整high watermark，推迟下一次对Metaspace的垃圾收集。\n" +
                "\n" +
                "这两个参数，-XX：MinMetaspaceFreeRatio和-XX：MaxMetaspaceFreeRatio,类似于GC的FreeRatio参数，可以放在命令行。\n" +
                "\n" +
                "\n" +
                "\n" +
                "**字符串内部池，已经在JDK7中从永久代中移除**，JDK1.7中，存储在永久代的部分数据就已经转移到了Java Heap或者是 Native Heap。但永久代仍存在于JDK1.7中，并没完全移除，譬如符号引用(Symbols)转移到了native heap；字面量(interned strings)转移到了java heap；**类的静态变量(class statics)转移到了java heap**。\n" +
                "\n" +
                "\n" +
                "\n" +
                "通过一段程序来比较 JDK 1.6 与 JDK 1.7及 JDK 1.8 的区别，以字符串常量为例：\n" +
                "\n" +
                "```\n" +
                "public class StringOomMock {  \n" +
                "    static String  base = \"string\";  \n" +
                "    public static void main(String[] args) {  \n" +
                "        List<String> list = new ArrayList<String>();  \n" +
                "        for (int i=0;i< Integer.MAX_VALUE;i++){  \n" +
                "            String str = base + base;  \n" +
                "            base = str;  \n" +
                "            list.add(str.intern());  \n" +
                "        }  \n" +
                "    }  \n" +
                "} \n" +
                "```\n" +
                "\n" +
                "这段程序以2的指数级不断的生成新的字符串，这样可以比较快速的消耗内存。我们通过 JDK 1.6、JDK 1.7 和 JDK 1.8 分别运行：\n" +
                "\n" +
                "**JDK 1.6 的运行结果：**\n" +
                "\n" +
                "![Markdown](https://gitee.com/nick070809/pics/raw/master/m4/fc83ad6127063ae4.jpg)\n" +
                "\n" +
                "**JDK 1.7的运行结果：**\n" +
                "\n" +
                "![Markdown](https://gitee.com/nick070809/pics/raw/master/m4/5348a0ce66aece9e.jpg)\n" +
                "\n" +
                "**JDK 1.8的运行结果：**\n" +
                "\n" +
                "![Markdown](https://gitee.com/nick070809/pics/raw/master/m4/2d46ae726130a0e4.jpg)\n" +
                "\n" +
                "​      从上述结果可以看出，JDK 1.6下，会出现“PermGen Space”的内存溢出，而在 JDK 1.7和 JDK 1.8 中，会出现堆内存溢出，并且 JDK 1.8中 PermSize 和 MaxPermGen 已经无效。因此，可以大致验证 JDK 1.7 和 1.8 将字符串常量由永久代转移到堆中，并且 JDK 1.8 中已经不存在永久代的结论。现在我们看看元空间到底是一个什么东西？\n" +
                "\n" +
                "　　元空间的本质和永久代类似，都是对JVM规范中方法区的实现。不过元空间与永久代之间最大的区别在于：元空间并不在虚拟机中，而是使用本地内存。因此，默认情况下，元空间的大小仅受本地内存限制，但可以通过以下参数来指定元空间的大小：\n" +
                "\n" +
                "　　-XX:MetaspaceSize，初始空间大小，达到该值就会触发垃圾收集进行类型卸载，同时GC会对该值进行调整：如果释放了大量的空间，就适当降低该值；如果释放了很少的空间，那么在不超过MaxMetaspaceSize时，适当提高该值。\n" +
                "　　-XX:MaxMetaspaceSize，最大空间，默认是没有限制的。\n" +
                "\n" +
                "　　除了上面两个指定大小的选项以外，还有两个与 GC 相关的属性：\n" +
                "　　-XX:MinMetaspaceFreeRatio，在GC之后，最小的Metaspace剩余空间容量的百分比，减少为分配空间所导致的垃圾收集\n" +
                "　　-XX:MaxMetaspaceFreeRatio，在GC之后，最大的Metaspace剩余空间容量的百分比，减少为释放空间所导致的垃圾收集\n" +
                "\n" +
                "现在我们在 JDK 8下重新运行一下代码段 4，不过这次不再指定 PermSize 和 MaxPermSize。而是指定 MetaSpaceSize 和 MaxMetaSpaceSize的大小。输出结果如下\n" +
                "\n" +
                "![Markdown](https://gitee.com/nick070809/pics/raw/master/m4/547e099c3833c80b.jpg)\n" +
                "\n" +
                "从输出结果，我们可以看出，这次不再出现永久代溢出，而是出现了元空间的溢出。\n" +
                "\n" +
                "**四、总结**\n" +
                "\n" +
                "通过上面分析，大家应该大致了解了 JVM 的内存划分，也清楚了 JDK 8 中永久代向元空间的转换。不过大家应该都有一个疑问，就是为什么要做这个转换？所以，最后给大家总结以下几点原因：\n" +
                "\n" +
                "　　1、字符串存在永久代中，容易出现性能问题和内存溢出。\n" +
                "\n" +
                "　　2、类及方法的信息等比较难确定其大小，因此对于永久代的大小指定比较困难，太小容易出现永久代溢出，太大则容易导致老年代溢出。\n" +
                "\n" +
                "　　3、永久代会为 GC 带来不必要的复杂度，并且回收效率偏低。\n" +
                "\n" +
                "　　4、Oracle 可能会将HotSpot 与 JRockit 合二为一。\n" +
                "\n" +
                "\n" +
                "\n" +
                "参考：https://www.cnblogs.com/ityouknow/archive/2017/09/19/7550068.html\n" +
                "\n" +
                "http://blog.csdn.net/zhushuai1221/article/details/52122880\n" +
                "\n"}/>



            </div>
        );
    }
}

export default JVM2;