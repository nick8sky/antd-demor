import React, { Component } from 'react';

import Markdown  from 'react-markdown';



class Kotlin3 extends Component {
    render() {

        return (
            <div>

                <Markdown source={"## Kotlin-3.协程和线程(Coroutine & Thread)\n" +
                "\n" +
                "参考：http://blog.csdn.net/qq_32115439/article/details/74018755\n" +
                "\n" +
                "1.协程概念和作用(Coroutines)\n" +
                "\n" +
                "```\n" +
                "一些耗时操作(网络IO、文件IO、CPU/GPU密集型任务)会阻塞线程直到操作完成,Kotlin的协程提供一种避免阻塞且更廉价可控的操作: 协程挂起(coroutine suspension),协程将复杂异步操作放入底层库中,程序逻辑可顺序表达,以此简化异步编程,该底层库将用户代码包装为回调/订阅事件,在不同线程(甚至不同机器)调度执行!\n" +
                "\n" +
                "Kotlin的协程还能实现其它语言的异步机制(asynchronous mechanisms),例如源于C#和ECMAScript(js)的async/await机制,源于Go的channel/select机制,源于C#和Python的generators/yield机制。\n" +
                "```\n" +
                "\n" +
                "2.线程阻塞和协程挂起的区别(Blocking VS Suspending)\n" +
                "\n" +
                "```\n" +
                "协程是通过编译技术实现(不需要虚拟机VM/操作系统OS的支持),通过插入相关代码来生效！\n" +
                "与之相反,线程/进程是需要虚拟机VM/操作系统OS的支持,通过调度CPU执行生效!\n" +
                "\n" +
                "线程阻塞的代价昂贵,\n" +
                "尤其在高负载时的可用线程很少,阻塞线程会导致一些重要任务缺少可用线程而被延迟!\n" +
                "\n" +
                "协程挂起几乎无代价,无需上下文切换或涉及OS,\n" +
                "最重要的是,协程挂起可由用户控制:可决定挂起时发生什么,并根据需求优化/记录日志/拦截!\n" +
                "\n" +
                "另一个不同之处是,协程不能在随机指令中挂起,只能在挂起点挂起(调用标记函数)!\n" +
                "```\n" +
                "\n" +
                "3.挂起函数(Suspending functions)\n" +
                "\n" +
                "```\n" +
                "当调用[suspend修饰的函数]时会发生协程挂起:\n" +
                "    suspend fun doSomething(foo: Foo): Bar {           \n" +
                "    }        \n" +
                "该函数称为挂起函数,调用它们可能挂起协程(如果调用结果已经可用,协程库可决定不挂起)\n" +
                "挂起函数能像普通函数获取参数和返回值,但只能在协程/挂起函数中被调用!\n" +
                "\n" +
                "1.启动协程,至少要有一个挂起函数,通常是匿名的(即挂起lambda表达式),\n" +
                "一个简化的async函数(源自kotlinx.coroutines库)：\n" +
                "    //async函数是一个普通函数(不是挂起函数)\n" +
                "    //block参数有suspend修饰,是一个匿名的挂起函数(即挂起lambda表达式)\n" +
                "    fun <T> async(block: suspend () -> T)\n" +
                "\n" +
                "    async {\n" +
                "        //doSomething在挂起函数(挂起lambda)中被调用\n" +
                "        doSomething(foo)\n" +
                "        ...\n" +
                "    }\n" +
                "\n" +
                "    async {\n" +
                "        ...\n" +
                "        //await()是挂起函数,该函数挂起一个协程,直到执行完成返回结果\n" +
                "        val result = computation.await()\n" +
                "        ...\n" +
                "    }       \n" +
                "更多关于kotlinx.coroutines库(诸如async/await函数等)详细说明在github:\n" +
                "https://github.com/Kotlin/kotlinx.coroutines/blob/master/coroutines-guide.md\n" +
                "\n" +
                "2.挂起函数不能在普通函数中被调用:\n" +
                "    fun main(args: Array<String>) {\n" +
                "        doSomething() //错误: 挂起函数不能在非协程中被调用\n" +
                "    }\n" +
                "\n" +
                "3.挂起函数可以是虚拟的,当覆盖它们时,必须指定suspend修饰符:\n" +
                "    interface Base {\n" +
                "        suspend fun foo()\n" +
                "    }\n" +
                "\n" +
                "    class Derived: Base {\n" +
                "        override suspend fun foo() {                \n" +
                "        }\n" +
                "    }\n" +
                "```\n" +
                "\n" +
                "4.协程内部机制原理(inner workings)\n" +
                "\n" +
                "```\n" +
                "协程是通过编译技术实现(不需要虚拟机VM/操作系统OS的支持),通过插入相关代码来生效！\n" +
                "与之相反,线程/进程是需要虚拟机VM/操作系统OS的支持,通过调度CPU执行生效!\n" +
                "\n" +
                "基本上,每个挂起函数都转换为状态机,对应于挂起调用;\n" +
                "在挂起协程前,下一状态和相关局部变量等被存储在编译器生成的类字段中;\n" +
                "在恢复协程时,状态机从下一状态进行并恢复局部变量！\n" +
                "\n" +
                "一个挂起的协程可作为保存挂起状态和局部变量的对象,对象类型是Continuation,\n" +
                "在底层,挂起函数有一个Continuation类型的额外参数\n" +
                "\n" +
                "关于协程工作原理的更多细节可查看:\n" +
                "https://github.com/Kotlin/kotlin-coroutines/blob/master/kotlin-coroutines-informal.md\n" +
                "```\n" +
                "\n"}/>

            </div>
        );
    }
}

export default Kotlin3;