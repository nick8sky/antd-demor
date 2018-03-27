import React, { Component } from 'react';

import Markdown  from 'react-markdown';

class JVMShutdown extends Component {
    render() {

        return (
            <div>
                <Markdown source={"JDK在1.3之后提供了Java Runtime.addShutdownHook(Thread hook)方法，可以注册一个JVM关闭的钩子，这个钩子可以在以下几种**场景**被调用：\n" +
                "\n" +
                "```\n" +
                "1）程序正常退出 \n" +
                "2）使用System.exit() \n" +
                "3）终端使用Ctrl+C触发的中断 \n" +
                "4）系统关闭 \n" +
                "5）使用Kill pid命令干掉进程 \n" +
                "注：在使用kill -9 pid是不会JVM注册的钩子不会被调用。\n" +
                "```\n" +
                "\n" +
                "在JDK中方法的声明： \n" +
                "\n" +
                "```\n" +
                "public void addShutdownHook(Thread hook) \n" +
                "```\n" +
                "\n" +
                "**参数** \n" +
                "\n" +
                "```\n" +
                "hook – 一个初始化但尚未启动的线程对象，注册到JVM钩子的运行代码。\n" +
                "```\n" +
                "\n" +
                " **异常** \n" +
                "IllegalArgumentException – 如果指定的钩已被注册，或如果它可以判定钩已经运行或已被运行\n" +
                "\n" +
                "IllegalStateException – 如果虚拟机已经是在关闭的过程中 \n" +
                "\n" +
                "SecurityException – 如果存在安全管理器并且它拒绝的RuntimePermission（“shutdownHooks”）\n" +
                "\n" +
                "```\n" +
                "import java.util.Date;\n" +
                "import java.util.Timer;\n" +
                "import java.util.TimerTask;\n" +
                "import java.util.concurrent.atomic.AtomicInteger;\n" +
                "\n" +
                "/**\n" +
                " * create by sunkx on 2018/2/26\n" +
                " */\n" +
                "public class TestShutdown {\n" +
                "    //简单模拟干活的\n" +
                "    static Timer timer = new Timer(\"job-timer\");\n" +
                "\n" +
                "    //计数干活次数\n" +
                "    static AtomicInteger count = new AtomicInteger(0);\n" +
                "\n" +
                "    /**\n" +
                "     * hook线程\n" +
                "     */\n" +
                "    static class CleanWorkThread extends Thread{\n" +
                "        @Override\n" +
                "        public void run() {\n" +
                "            System.out.println(\"clean some work.\");\n" +
                "            System.out.println(new Date());\n" +
                "            timer.cancel();\n" +
                "            try {\n" +
                "                Thread.sleep(8 * 1000);//sleep 8s\n" +
                "            } catch (InterruptedException e) {\n" +
                "                e.printStackTrace();\n" +
                "            }\n" +
                "            System.out.println(new Date());\n" +
                "            System.out.println(\"clean completed .\");\n" +
                "        }\n" +
                "    }\n" +
                "    public static void main(String[] args) throws InterruptedException {\n" +
                "        //将hook线程添加到运行时环境中去\n" +
                "        Runtime.getRuntime().addShutdownHook(new CleanWorkThread());\n" +
                "        System.out.println(\"main class start ..... \");\n" +
                "        //简单模拟\n" +
                "        timer.schedule(new TimerTask() {\n" +
                "            @Override\n" +
                "            public void run() {\n" +
                "                count.getAndIncrement();\n" +
                "                System.out.println(\"doing job \" + count);\n" +
                "                // kill 3769\n" +
                "                /*if (count.get() == 10) {  //干了10次退出\n" +
                "                    System.exit(0);\n" +
                "                }*/\n" +
                "            }\n" +
                "        }, 0, 2 * 1000);\n" +
                "    }\n" +
                "}\n" +
                "main class start ..... \n" +
                "doing job 1\n" +
                "doing job 2\n" +
                "doing job 3\n" +
                "doing job 4\n" +
                "doing job 5\n" +
                "clean some work.\n" +
                "Mon Feb 26 22:01:25 CST 2018\n" +
                "Mon Feb 26 22:01:33 CST 2018\n" +
                "clean completed .\n" +
                "```\n" +
                "\n" +
                "  当发生了System.exit(int)时，希望在系统退出前，执行一点任务来做一些资源方面的回收操作，ShutdownHook可以达到这个目的，它利用hook思路来实现，有些时候也把它叫作“钩子“。\n" +
                "\n" +
                "  假如在系统中通过Runtime.getRuntime().exec()或new ProcessBuilde()启动了子进程(Process)，这个子进程一直在运行中，在当前进程退出时，子进程未必会退出，但此时业务上希望将它退出，就可以利用这一点。例如可以这样写：\n" +
                "\n" +
                "```\n" +
                "Runtime.getRuntime().addShutdownHook()\n" +
                "{\n" +
                "    new Thread()\n" +
                "    {\n" +
                "        public void run()\n" +
                "        {\n" +
                "            subProcesser.destroy();\n" +
                "        }\n" +
                "    }\n" +
                "}\n" +
                "```\n" +
                "\n" +
                " 这里需要注意的是，传入参数是通过new Thread()创建的线程对象，在Java进程调用exit()时，会调用该线程对象的start()方法将其运行起来，所以不要手工先启动了。另外，这种回调线程就不要设定为死循环程序，否则就无法退出了。\n" +
                "\n" +
                "- Runtime.getRuntime().removeShutdownHook用于删除一个钩子线程。\n" +
                "\n" +
                "\n" +
                "\n" +
                "\n" +
                "\n" +
                "----\n" +
                "\n" +
                "钩子的本质是一段用以处理系统消息程序，通过系统调用把它挂入系统。钩子种类很 多，每种钩子可以截获并处理相应的消息当特定发出在到达目窗口之前，每种钩子可以截获并处理相应的消息，每当特定消息发出，在到达目窗口之前，钩子程序先行截获该消息、得到对此消息的控制权。此时钩函数可以对截获的消息进加工处理，甚至可以强制结束消息的传递。 \n" +
                "\n" +
                "\n" +
                "\n" +
                "钩子线程里只处理善后，目标是尽可能快的退出且不保证有脏数据。**如果钩子线程里做过多事情，或者发生阻塞，那么可能出现kill失效，程序不能退出的情况，这是需要强制退出** \n" +
                "\n" +
                "\n" +
                "\n" +
                "## 1.进程的优雅退出\n" +
                "\n" +
                "### 1.1.Kill -9 PID带来的问题\n" +
                "\n" +
                "在Linux上通常会通过kill -9 pid的方式强制将某个进程杀掉，这种方式简单高效，因此很多程序的停止脚本经常会选择使用kill -9 pid的方式。\n" +
                "\n" +
                "无论是Linux的Kill -9 pid还是windows的taskkill /f /pid强制进程退出,都会带来一些副作用：对应用软件而言其效果等同于突然掉电，可能会导致如下一些问题：\n" +
                "\n" +
                "1. 缓存中的数据尚未持久化到磁盘中，导致数据丢失；\n" +
                "2. 正在进行文件的write操作，没有更新完成，突然退出，导致文件损坏；\n" +
                "3. 线程的消息队列中尚有接收到的请求消息还没来得及处理，导致请求消息丢失；\n" +
                "4. 数据库操作已经完成，例如账户余额更新，准备返回应答消息给客户端时，消息尚在通信线程的发送队列中排队等待发送，进程强制退出导致应答消息没有返回给客户端，客户端发起超时重试，会带来重复更新问题；\n" +
                "5. 其它问题等...\n" +
                "\n" +
                "### 1.2.JAVA优雅退出\n" +
                "\n" +
                "Java的优雅停机通常通过注册JDK的ShutdownHook来实现，当系统接收到退出指令后，首先标记系统处于退出状态，不再接收新的消息，然后将积压的消息处理完，最后调用资源回收接口将资源销毁，最后各线程退出执行。\n" +
                "\n" +
                "\n" +
                "\n" +
                "通常优雅退出需要有超时控制机制，例如30S，如果到达超时时间仍然没有完成退出前的资源回收等操作。\n" +
                "\n" +
                "###1.3. 信号\n" +
                "\n" +
                " 信号是在软件层次上对中断机制的一种模拟，在原理上，一个进程收到一个信号与处理器收到一个中断请求可以说是一样的。通俗来讲，信号就是进程间的一种异步通信机制。信号具有平台相关性，Linux平台支持的一些终止进程信号如下所示：\n" +
                "\n" +
                "| 信号名称    | 用途                      |\n" +
                "| ------- | ----------------------- |\n" +
                "| SIGKILL | 终止进程，强制杀死进程             |\n" +
                "| SIGTERM | 终止进程，软件终止信号             |\n" +
                "| SIGTSTP | 停止进程，终端来的停止信号           |\n" +
                "| SIGPROF | 终止进程，统计分布图用计时器到时        |\n" +
                "| SIGUSR1 | 终止进程，用户定义信号1            |\n" +
                "| SIGUSR2 | 终止进程，用户定义信号2            |\n" +
                "| SIGINT  | 终止进程，中断进程               |\n" +
                "| SIGQUIT | 建立CORE文件终止进程，并且生成core文件 |\n" +
                "\n" +
                "- 关闭钩子本质上是一个线程（也称为Hook线程），对于一个JVM中注册的多个关闭钩子它们将会并发执行，所以JVM并不保证它们的执行顺序；由于是并发执行的，那么很可能因为代码不当导致出现竞态条件或死锁等问题，为了避免该问题，强烈建议在一个钩子中执行一系列操作。\n" +
                "- Hook线程会延迟JVM的关闭时间，这就要求在编写钩子过程中必须要尽可能的减少Hook线程的执行时间，避免hook线程中出现耗时的计算、等待用户I/O等等操作。\n" +
                "- 关闭钩子执行过程中可能被强制打断,比如在操作系统关机时，操作系统会等待进程停止，等待超时，进程仍未停止，操作系统会强制的杀死该进程，在这类情况下，关闭钩子在执行过程中被强制中止。\n" +
                "- 在关闭钩子中，不能执行注册、移除钩子的操作，JVM将关闭钩子序列初始化完毕后，不允许再次添加或者移除已经存在的钩子，否则JVM抛出 IllegalStateException。\n" +
                "- 不能在钩子调用System.exit()，否则卡住JVM的关闭过程，但是可以调用Runtime.halt()。\n" +
                "- Hook线程中同样会抛出异常，对于未捕捉的异常，线程的默认异常处理器处理该异常，不会影响其他hook线程以及JVM正常退出。\n" +
                "\n" +
                "###1.4.Java程序优雅关闭的两种方法\n" +
                "\n" +
                "使用java编写大型系统时，往往需要在程序被kill时将内存中的一些临时数据和状态处理掉，这里称之为优雅关闭。介绍两种比较典型的方法：\n" +
                "\n" +
                "**1. 调用Runtime.getRuntime().addShutdownHook()方法，添加结束时运行的线程。**\n" +
                "\n" +
                "```\n" +
                "public void stopGracefully() {  \n" +
                "        Runtime.getRuntime().addShutdownHook(new Thread() {  \n" +
                "            @Override  \n" +
                "            public void run() {       \n" +
                "            }  \n" +
                "        });  \n" +
                "} \n" +
                "```\n" +
                "\n" +
                "**2. 实现SignalHandler**\n" +
                "\n" +
                "```\n" +
                "public class KillHandler implements SignalHandler {  \n" +
                "  \n" +
                "    public void registerSignal(String signalName) {  \n" +
                "        Signal signal = new Signal(signalName);  \n" +
                "        Signal.handle(signal, this);  \n" +
                "    }  \n" +
                "  \n" +
                "    @Override  \n" +
                "    public void handle(Signal signal) {   \n" +
                "        if (signal.getName().equals(\"TERM\")) {  \n" +
                "                //  \n" +
                "        } else if (signal.getName().equals(\"INT\") || signal.getName().equals(\"HUP\")) {  \n" +
                "                //  \n" +
                "        } else {  \n" +
                "                //  \n" +
                "        }  \n" +
                "    }  \n" +
                "} \n" +
                "```\n" +
                "\n" +
                "完整列子：\n" +
                "\n" +
                "```\n" +
                "import sun.misc.Signal;\n" +
                "import sun.misc.SignalHandler;\n" +
                "\n" +
                "@SuppressWarnings(\"restriction\")\n" +
                "public class SignalTest {\n" +
                "    public static void main(String[] args) throws InterruptedException {\n" +
                "        // 信号处理实例\n" +
                "        MySignalHandler mySignalHandler = new MySignalHandler();\n" +
                "\n" +
                "        // 注册对指定信号的处理\n" +
                "        Signal.handle(new Signal(\"TERM\") ,mySignalHandler);    // kill or kill -15\n" +
                "        Signal.handle(new Signal(\"INT\"), mySignalHandler);     // kill -2\n" +
                "        System.out.println(\"[Thread:\"+Thread.currentThread().getName() + \"] is sleep\" );\n" +
                "        while(true) Thread.sleep(1000);\n" +
                "    }\n" +
                "}\n" +
                "\n" +
                "@SuppressWarnings(\"restriction\")\n" +
                "class MySignalHandler implements SignalHandler {\n" +
                "    public void handle(Signal signal) {\n" +
                "        // 信号量名称\n" +
                "        String name = signal.getName();\n" +
                "        // 信号量数值\n" +
                "        int number = signal.getNumber();\n" +
                "        // 当前进程名\n" +
                "        String currentThreadName = Thread.currentThread().getName();\n" +
                "        System.out.println(\"[Thread:\"+currentThreadName + \"] receved signal: \" + name + \" == kill -\" + number);\n" +
                "        if(name.equals(\"TERM\")){\n" +
                "           // System.exit(0);  //kill命令是不会kill掉的\n" +
                "            System.out.println(name); \n" +
                "        }\n" +
                "    }\n" +
                "}\n" +
                "$ kill 3832\n" +
                "$ kill -2 3832\n" +
                "\n" +
                "[Thread:main] is sleep\n" +
                "[Thread:SIGTERM handler] receved signal: TERM == kill -15\n" +
                "TERM\n" +
                "[Thread:SIGINT handler] receved signal: INT == kill -2\n" +
                "```\n" +
                "\n" +
                "**3. 区别**\n" +
                "\n" +
                "​    两种方法的区别在于，第一种方法在进程被kill的时候main函数就已经结束了，仅会运行shutdownHook中run()方法的代码。\n" +
                "\n" +
                "​    而第二种方法中handle函数会在进程被kill时收到TERM信号，对main函数的运行不会有任何影响，我们需要自己在main函数中添加布尔类型的flag，当收到TERM信号时修改该flag，程序便会正常结束。"}/>

            </div>
        );
    }
}

export default JVMShutdown;