import React, { Component } from 'react';

import Markdown  from 'react-markdown';

class JVMX extends Component {
    render() {

        return (
            <div>
                <Markdown source={"### 什么是协程（coroutine）\n" +
                "\n" +
                "这东西其实有很多名词，比如有的人喜欢称为纤程（Fiber），或者绿色线程（GreenThread）。其实最直观的解释可以定义为线程的线程。有点拗口，但本质上就是这样。\n" +
                "\n" +
                "我们先回忆一下线程的定义，操作系统产生一个进程，进程再产生若干个线程并行的处理逻辑，线程的切换由操作系统负责调度。传统语言C++ Java等线程其实与操作系统线程是1:1的关系，每个线程都有自己的Stack，Java在64位系统默认Stack大小是1024KB，所以指望一个进程开启上万个线程是不现实的。但是实际上我们也不会这么干，因为起这么多线程并不能充分的利用CPU，大部分线程处于等待状态，CPU也没有这么核让线程使用。所以一般线程数目都是CPU的核数。\n" +
                "\n" +
                "传统的J2EE系统都是基于每个请求占用一个线程去完成完整的业务逻辑（包括事务）。所以系统的吞吐能力取决于每个线程的操作耗时。如果遇到很耗时的I/O行为，则整个系统的吞吐立刻下降，比如JDBC是同步阻塞的，这也是为什么很多人都说数据库是瓶颈的原因。这里的耗时其实是让CPU一直在等待I/O返回，说白了线程根本没有利用CPU去做运算，而是处于空转状态。暴殄天物啊。另外过多的线程，也会带来更多的ContextSwitch开销。\n" +
                "\n" +
                "Java的JDK里有封装很好的ThreadPool，可以用来管理大量的线程生命周期，但是本质上还是不能很好的解决线程数量的问题，以及线程空转占用CPU资源的问题。\n" +
                "\n" +
                "先阶段行业里的比较流行的解决方案之一就是单线程加上异步回调。其代表派是node.js以及Java里的Vert.x。他们的核心思想是一样的，**遇到需要进行I/O操作的地方，就直接让出CPU资源，然后注册一个回调函数，其他逻辑则继续往下走，I/O结束后带着结果向事件队列里插入执行结果，然后由事件调度器调度回调函数，传入结果。**这时候执行的地方可能就不是你原来的代码区块了，具体表现在代码层面上，你会发现你的局部变量全部丢失，毕竟相关的栈已经被覆盖了，所以为了保存之前的栈上数据，你要么选择带着一起放入回调函数里，要么就不停的嵌套，从而引起反人类的Callback hell。\n" +
                "\n" +
                "因此相关的Promise，CompletableFuture等技术都是为解决相关的问题而产生的。但是本质上还是不能解决业务逻辑的割裂。\n" +
                "\n" +
                "说了这么多，终于可以提一下协程了，**协程的本质上其实还是和上面的方法一样，只不过他的核心点在于调度那块由他来负责解决，遇到阻塞操作，立刻yield掉，并且记录当前栈上的数据，阻塞完后立刻再找一个线程恢复栈并把阻塞的结果放到这个线程上去跑，这样看上去好像跟写同步代码没有任何差别，这整个流程可以称为coroutine，负责调度的线程称为Fiber。** 而这一切都是发生的用户态上，没有发生在内核态上，也就是说没有ContextSwitch上的开销。\n" +
                "\n" +
                " \n" +
                "\n" +
                "下面我们尝试用Quasar建立一百万个Fiber，看看内存占用多少，我先尝试了创建百万个`Thread`。\n" +
                "\n" +
                "```\n" +
                "for (int i = 0; i < 1_000_000; i++) {\n" +
                "  new Thread(() -> {\n" +
                "    try {\n" +
                "      Thread.sleep(10000);\n" +
                "    } catch (InterruptedException e) {\n" +
                "      e.printStackTrace();\n" +
                "    }\n" +
                "  }).start();\n" +
                "}\n" +
                "```\n" +
                "\n" +
                "很不幸，直接报Exception in thread \"main\" java.lang.OutOfMemoryError: unable to create new native thread，这是情理之中的。下面是通过Quasar建立百万个Fiber:\n" +
                "\n" +
                "```\n" +
                "public static void main(String[] args) throws ExecutionException, InterruptedException, SuspendExecution {\n" +
                "  int FiberNumber = 1_000_000;\n" +
                "  CountDownLatch latch = new CountDownLatch(1);\n" +
                "  AtomicInteger counter = new AtomicInteger(0);\n" +
                "\n" +
                "  for (int i = 0; i < FiberNumber; i++) {\n" +
                "    new Fiber(() -> {\n" +
                "      counter.incrementAndGet();\n" +
                "      if (counter.get() == FiberNumber) {\n" +
                "        System.out.println(\"done\");\n" +
                "      }\n" +
                "      Strand.sleep(1000000);\n" +
                "    }).start();\n" +
                "  }\n" +
                "  latch.await();\n" +
                "}\n" +
                "```\n" +
                "\n" +
                "最终控制台是可以输出done的，说明程序已经创建了百万个Fiber，设置Sleep是为了让Fiber一直运行，从而方便计算内存占用。官方宣称一个空闲的Fiber大约占用400Byte，那这里应该是占用400MB堆内存，但是这里通过jmap -heap pid显示大约占用了1000MB，也就是说一个Fiber占用1KB。\n" +
                "\n" +
                "\n" +
                "\n" +
                "### Quasar是怎么实现Fiber的\n" +
                "\n" +
                "其实Quasar实现的coroutine的方式与Golang很像，只不过一个是框架级别实现，一个是语言内置机制而已。\n" +
                "\n" +
                "如果你熟悉了Golang的调度机制，那理解Quasar的调度机制就会简单很多，因为两者是差不多的。\n" +
                "\n" +
                "Quasar里的Fiber其实是一个continuation，他可以被Quasar定义的scheduler调度，一个continuation记录着运行实例的状态，而且会被随时中断，并且也会随后在他被中断的地方恢复。Quasar其实是通过修改bytecode来达到这个目的，所以运行Quasar程序的时候，你需要先通过java-agent在运行时修改你的代码，当然也可以在编译期间这么干。golang的内置了自己的调度器，Quasar则默认使用ForkJoinPool这个JDK7以后才有的，具有work-stealing功能的线程池来当调度器。work-stealing非常重要，因为你不清楚哪个Fiber会先执行完，而work-stealing可以动态的从其他的等等队列偷一个context过来，这样可以最大化使用CPU资源。\n" +
                "\n" +
                "那这里你会问了，Quasar怎么知道修改哪些字节码呢，其实也很简单，Quasar会通过java-agent在运行时扫描哪些方法是可以中断的，同时会在方法被调用前和调度后的方法内插入一些continuation逻辑，如果你在方法上定义了@Suspendable注解，那Quasar会对调用该注解的方法做类似下面的事情。\n" +
                "\n" +
                "这里假设你在方法f上定义了@Suspendable，同时去调用了有同样注解的方法g，那么所有调用f的方法会插入一些字节码，这些字节码的逻辑就是记录当前Fiber栈上的状态，以便在未来可以动态的恢复。(Fiber类似线程也有自己的栈)。在suspendable方法链内Fiber的父类会调用Fiber.park，这样会抛出SuspendExecution异常，从而来停止线程的运行，好让Quasar的调度器执行调度。这里的SuspendExecution会被Fiber自己捕获，业务层面上不应该捕获到。如果Fiber被唤醒了(调度器层面会去调用Fiber.unpark)，那么f会在被中断的地方重新被调用(这里Fiber会知道自己在哪里被中断)，同时会把g的调用结果(g会return结果)插入到f的恢复点，这样看上去就好像g的return是f的local variables了，从而避免了callback嵌套。\n" +
                "\n" +
                "上面啰嗦了一大堆，其实简单点讲就是，想办法让运行中的线程栈停下来，好让Quasar的调度器介入。JVM线程中断的条件只有两个，一个是抛异常，另外一个就是return。这里Quasar就是通过抛异常的方式来达到的，所以你会看到我上面的代码会抛出SuspendExecution。但是如果你真捕获到这个异常，那就说明有问题了，所以一般会这么写。\n" +
                "\n" +
                "```\n" +
                "@Suspendable\n" +
                "public int f() {\n" +
                "  try {\n" +
                "    // do some stuff\n" +
                "    return g() * 2;\n" +
                "  } catch(SuspendExecution s) {\n" +
                "    //这里不应该捕获到异常.\n" +
                "    throw new AssertionError(s);\n" +
                "  }\n" +
                "```\n" +
                "\n" +
                "但是随着异步无阻塞这股风气起来，以及相关的coroutine语言Golang大力推广，人们越来越知道如何更好的榨干CPU性能(让CPU避免不必要的等待，减少上下文切换)，阻塞的行为基本发生在I/O上，如果能有一个库能把所有的I/O行为都包装成异步阻塞的话，那么Quasar就会有用武之地，JVM上公认的是异步网络通信库是Netty，通过Netty基本解决了网络I/O问题，另外还有一个是文件I/O，而这个JDK7提供的NIO2就可以满足，通过AsynchronousFileChannel即可。剩下的就是如何将他们封装成更友好的API了。目前能达到生产级别的这种异步工具库，JVM上只有Vert.x3，封装了Netty4，封装了AsynchronousFileChannel，而且Vert.x官方也出了一个相对应的封装了Quasar的库vertx-sync。\n" +
                "\n" +
                "Quasar目前是由一家商业公司Parallel Universe控制着，且有自己的一套体系，包括Quasar-actor，Quasar-galaxy等各个模块，但是Quasar-core是开源的，此外Quasar自己也通过Fiber封装了很多的第三方库，目前全都在comsat这个项目里。随便找一个项目看看，你会发现其实通过Quasar的Fiber去封装第三方的同步库还是很简单的。\n" +
                "\n" +
                "```\n" +
                " <dependency>\n" +
                "      <groupId>co.paralleluniverse</groupId>\n" +
                "      <artifactId>quasar-core</artifactId>\n" +
                "      <version>0.7.9</version>\n" +
                " </dependency>\n" +
                "```\n" +
                "\n" +
                "```\n" +
                "import co.paralleluniverse.fibers.Fiber;\n" +
                "import co.paralleluniverse.fibers.SuspendExecution;\n" +
                "import co.paralleluniverse.strands.channels.Channel;\n" +
                "import co.paralleluniverse.strands.channels.Channels;\n" +
                "import java.util.concurrent.ExecutionException;\n" +
                "  \n" +
                "public class QuasarTest {\n" +
                "    private static void printer(Channel<Integer> in) throws SuspendExecution,  InterruptedException {\n" +
                "        Integer v;\n" +
                "        while ((v = in.receive()) != null) {\n" +
                "            System.out.println(v);\n" +
                "        }\n" +
                "    }\n" +
                "    public static void main(String[] args) throws ExecutionException, InterruptedException, SuspendExecution {\n" +
                "        //定义两个Channel\n" +
                "        Channel<Integer> naturals = Channels.newChannel(-1);\n" +
                "        Channel<Integer> squares = Channels.newChannel(-1);\n" +
                "\n" +
                "        //运行两个Fiber实现.\n" +
                "        new Fiber(() -> {\n" +
                "            for (int i = 0; i < 10_000_000; i++)\n" +
                "                naturals.send(i);\n" +
                "            naturals.close();\n" +
                "        }).start();\n" +
                "\n" +
                "        new Fiber(() -> {\n" +
                "            Integer v;\n" +
                "            while ((v = naturals.receive()) != null)\n" +
                "                squares.send(v * v);\n" +
                "            squares.close();\n" +
                "        }).start();\n" +
                "        printer(squares);\n" +
                "    }\n" +
                "}\n" +
                "```\n" +
                "\n" +
                "## 为什么需要协程\n" +
                "\n" +
                "### 简单引入\n" +
                "\n" +
                "就实际使用理解来讲，协程允许我们写同步代码的逻辑，却做着异步的事，避免了回调嵌套，使得代码逻辑清晰。\n" +
                "\n" +
                "```\n" +
                "   co(function*(next){\n" +
                "     let [err,data]=yield fs.readFile(\"./test.txt\",next);//异步读文件\n" +
                "     [err]=yield fs.appendFile(\"./test2.txt\",data,next);//异步写文件\n" +
                "   })()\n" +
                "```\n" +
                "\n" +
                "> **异步** 指令执行之后，结果并不立即显现的操作称为异步操作。及其指令执行完成并不代表操作完成。\n" +
                "\n" +
                "协程是追求极限性能和优美的代码结构的产物。\n" +
                "\n" +
                "\n" +
                "\n" +
                "起初人们喜欢同步编程，然后发现有一堆线程因为I/O卡在那里,并发上不去，资源严重浪费。\n" +
                "\n" +
                "然后出了异步（select,epoll,kqueue,etc）,将I/O操作交给内核线程,自己注册一个回调函数处理最终结果。\n" +
                "\n" +
                "然而项目大了之后代码结构变得不清晰,下面是个小例子。\n" +
                "\n" +
                "```\n" +
                "  async_func1(\"hello world\",func(){\n" +
                "     async_func2(\"what's up?\",func(){\n" +
                "       async_func2(\"oh ,friend!\",func(){ \n" +
                "         //do something\n" +
                "       })\n" +
                "     })\n" +
                "  })\n" +
                "```\n" +
                "\n" +
                "于是发明了协程，写同步的代码，享受着异步带来的性能优势。\n" +
                "\n" +
                "### libco 一个C++协程库实现\n" +
                "\n" +
                "libco 是腾讯开源的一个C++协程库，作为微信后台的基础库，经受住了实际的检验。项目地址：<https://github.com/Tencent/libco>\n" +
                "\n" +
                "libco源代码文件一共11个，其中一个是汇编代码，其余是C++，阅读起来相对较容易。\n" +
                "\n" +
                "在C++里面实现协程要解决的问题有如下几个：\n" +
                "\n" +
                "- 何时挂起协程？何时唤醒协程？\n" +
                "- 如何挂起、唤醒协程，如何保护协程运行时的上下文？\n" +
                "- 如何封装异步操作？\n" +
                "\n" +
                "**何时挂起，唤醒协程？**\n" +
                "\n" +
                "如开始介绍时所说，协程是为了使用异步的优势，异步操作是为了避免IO操作阻塞线程。那么协程挂起的时刻应该是当前协程发起异步操作的时候，而唤醒应该在其他协程退出，并且他的异步操作完成时。\n" +
                "\n" +
                "**如何挂起、唤醒协程，如何保护协程运行时的上下文？**\n" +
                "\n" +
                "协程发起异步操作的时刻是该挂起协程的时刻，为了保证唤醒时能正常运行，需要正确保存并恢复其运行时的上下文。\n" +
                "\n" +
                "所以这里的操作步骤为：\n" +
                "\n" +
                "- 保存当前协程的上下文（运行栈，返回地址，寄存器状态）\n" +
                "- 设置将要唤醒的协程的入口指令地址到IP寄存器\n" +
                "- 恢复将要唤醒的协程的上下文\n" +
                "\n"}/>



            </div>
        );
    }
}

export default JVMX;