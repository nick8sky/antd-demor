import React, { Component } from 'react';

import Markdown  from 'react-markdown';

class JVM1 extends Component {
    render() {

        return (
            <div>
                <Markdown source={"1.新生代：Eden+From Survivor+To Survivor\n" +
                "\n" +
                "2.老年代：OldGen\n" +
                "\n" +
                "3.永久代 : PermGen\n" +
                "\n" +
                "4.Method area: JVM只有一个为所有的线程所共享的方法区。它存储类结构，例如运行时常量池，成员和方法数据以及方法、构造方法的代码。\n" +
                "\n" +
                "---\n" +
                "\n" +
                "**Java HeapSpace**\n" +
                "\n" +
                "这种是java堆内存不够，一个原因是内存真不够，另一个原因是程序中有死循环；\n" +
                "\n" +
                "```\n" +
                "-Xms3062m\n" +
                "-Xmx3062m\n" +
                "```\n" +
                "\n" +
                "**PermGenspace**\n" +
                "\n" +
                "PermGen space的全称是Permanent Generation space,是指内存的永久代内存。\n" +
                "\n" +
                "这一部分用于存放Class和Meta的信息,Class在被 Load的时候被放入PermGen space区域，它和和存放Instance的Heap区域不同,GC(Garbage Collection)不会在主程序运行期对PermGen space进行清理，所以如果你的APP会LOAD很多CLASS的话,就很可能出现PermGen space错误。\n" +
                "\n" +
                "```\n" +
                "-XX:MaxPermSize=128m\n" +
                "-XXermSize=128m\n" +
                "```\n" +
                "\n" +
                "**StackOverflowError**\n" +
                "\n" +
                "栈溢出错误的一种，即线程栈的溢出，要么是方法调用层次过多，要么是线程栈太小。\n" +
                "\n" +
                "解决：优化程序设计，减少方法调用层次；调整-Xss参数增加线程栈大小\n" +
                "\n" +
                "**unableCreateNativeThread**\n" +
                "\n" +
                "Stack空间不足以创建额外的线程，要么是创建的线程过多，要么是Stack空间确实小了。\n" +
                "\n" +
                "由于JVM没有提供参数设置总的stack空间大小，但可以设置单个线程栈的大小；而系统的用户空间一共是3G，Heap和Stack空间的总量有限，是此消彼长的。因此遇到这个错误，可以通过两个途径解决：\n" +
                "\n" +
                "1.通过-Xss启动参数减少单个线程栈大小，这样便能开更多线程\n" +
                "\n" +
                "2.通过-Xms-Xmx两参数减少Heap大小，将内存让给Stack\n" +
                "\n" +
                "默认线程栈空间大小 \n" +
                "\n" +
                "```\n" +
                "$ ulimit -s\n" +
                "8192  //8M\n" +
                "```\n" +
                "\n" +
                "临时改变栈空间大小\n" +
                "\n" +
                "```\n" +
                "ulimit -s 10240 //10M\n" +
                "```\n" +
                "\n" +
                "设置默认栈空间大小\n" +
                "\n" +
                "```\n" +
                "在/etc/rc.local 内 加入 ulimit -s 10240\n" +
                "```\n" +
                "\n" +
                "---\n" +
                "\n" +
                "**年轻代中的GC**\n" +
                "\n" +
                " HotSpot JVM把年轻代分为了三部分：1个Eden区和2个Survivor区（分别叫from和to）。默认比例为8：1一般情况下，新创建的对象都会被分配到Eden区(一些大对象特殊处理),这些对象经过第一次Minor GC后，如果仍然存活，将会被移到Survivor区。对象在Survivor区中每熬过一次Minor GC，年龄就会增加1岁，当它的年龄增加到一定程度时，就会被移动到老年代中。\n" +
                "\n" +
                "![Markdown](https://gitee.com/nick070809/pics/raw/master/m4/4f58dde36387d11b.jpg)\n" +
                "\n" +
                "```\n" +
                "-XX:Newratio:  设置Yong 和 Old的比例，比如值为2，则Old Generation是 Yong Generation的2倍，即Yong Generation占据内存的1/3\n" +
                "-XX:Newsize : 设置Yong Generation的初始值大小\n" +
                "-XX:Maxnewsize：设置Yong Generation的最大值大小\n" +
                "-XX:Surviorratio : 设置Eden和一个Suivior的比例，比如值为5，即Eden是To(S2)的比例是5，（From和To是一样大的），此时Eden占据Yong Generation的5/7\n" +
                "```\n" +
                "\n" +
                "一般情况下，不允许-XX:Newratio值小于1，即Old要比Yong大。\n" +
                "\n" +
                "\n" +
                "\n" +
                "**JVM 使用的GC算法是什么？**\n" +
                "\n" +
                "分代收集。\n" +
                "\n" +
                "即将内存分为几个区域，将不同生命周期的对象放在不同区域里；\n" +
                "\n" +
                "在GC收集的时候，频繁收集生命周期短的区域(Young area)；\n" +
                "\n" +
                "比较少的收集生命周期比较长的区域(Old area)；\n" +
                "\n" +
                "基本不收集的永久区(Perm area)。\n" +
                "\n" +
                "\n" +
                "\n" +
                "**GC 和 Full GC 有什么区别？**\n" +
                "\n" +
                "GC（或Minor GC）：收集 生命周期短的区域(Young area)。\n" +
                "\n" +
                "Full GC （或Major GC）：收集生命周期短的区域(Young area)和生命周期比较长的区域(Old area)对整个堆进行垃圾收集。\n" +
                "\n" +
                "他们的收集算法不同，所以使用的时间也不同。 GC 效率也会比较高，我们要尽量减少 Full GC 的次数。 当显示调用System.gc() 时，将进行full gc。\n" +
                "\n" +
                "\n" +
                "\n" +
                "**Minor GC后，Eden是空的吗？**\n" +
                "\n" +
                "是的，Minor GC会把Eden中的所有活的对象都移到Survivor区域中，如果Survivor区中放不下，那么剩下的活的对象就被移到Old generation 中。\n" +
                "\n" +
                "\n" +
                "\n" +
                "**设置**\n" +
                "\n" +
                "```\n" +
                "堆设置  \n" +
                "-Xms :初始堆大小  \n" +
                "-Xmx :最大堆大小  \n" +
                "-XX:NewSize=n :设置年轻代大小  \n" +
                "-XX:NewRatio=n: 设置年轻代和年老代的比值。如:为3，表示年轻代与年老代比值为1：3，年轻代占整个年轻代年老代和的1/4  \n" +
                "-XX:SurvivorRatio=n :年轻代中Eden区与两个Survivor区的比值。注意Survivor区有两个。如：3，表示Eden：Survivor=3：2，一个Survivor区占整个年轻代的1/5 \n" +
                "-XX:MaxPermSize=n :设置持久代大小  \n" +
                "收集器设置  \n" +
                "-XX:+UseSerialGC :设置串行收集器  \n" +
                "-XX:+UseParallelGC :设置并行收集器  \n" +
                "-XX:+UseParalledlOldGC :设置并行年老代收集器  \n" +
                "-XX:+UseConcMarkSweepGC :设置并发收集器  \n" +
                "垃圾回收统计信息  \n" +
                "-XX:+PrintHeapAtGC GC的heap详情 \n" +
                "-XX:+PrintGCDetails  GC详情 \n" +
                "-XX:+PrintGCTimeStamps  打印GC时间信息 \n" +
                "-XX:+PrintTenuringDistribution    打印年龄信息等\n" +
                "-XX:+HandlePromotionFailure   老年代分配担保（true  or false）\n" +
                "并行收集器设置  \n" +
                "-XX:ParallelGCThreads=n :设置并行收集器收集时使用的CPU数。并行收集线程数。  \n" +
                "-XX:MaxGCPauseMillis=n :设置并行收集最大暂停时间  \n" +
                "-XX:GCTimeRatio=n :设置垃圾回收时间占程序运行时间的百分比。公式为1/(1+n)  \n" +
                "并发收集器设置  \n" +
                "-XX:+CMSIncrementalMode :设置为增量模式。适用于单CPU情况。  \n" +
                "-XX:ParallelGCThreads=n :设置并发收集器年轻代收集方式为并行收集时，使用的CPU数。并行收集线程数。\n" +
                "```\n" +
                "\n" +
                " "}/>



            </div>
        );
    }
}

export default JVM1;