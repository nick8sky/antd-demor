import React, { Component } from 'react';

import Markdown  from 'react-markdown';



class Kotlin2 extends Component {
    render() {

        return (
            <div>

                <Markdown source={"##Kotlin-02.如何使用(package & import)\n" +
                "\n" +
                "http://blog.csdn.net/qq_32115439/article/details/73257943\n" +
                "\n" +
                "1.包\n" +
                "\n" +
                "```\n" +
                "源文件通常以包声明开头:\n" +
                "package com.demo\n" +
                "fun myFun() { ... }\n" +
                "class MyCalss { ... }\n" +
                "\n" +
                "源码文件所有内容(无论是类还是函数)都在包内,\n" +
                "所以上例中 myFun() 全名是 com.demo.myFun,\n" +
                "MyCalss 全名是 com.demo.MyClass\n" +
                "\n" +
                "如果没指定包，则该文件内容属于默认“default”包\n" +
                "```\n" +
                "\n" +
                "2.默认导入\n" +
                "\n" +
                "```\n" +
                "一些包会被默认导入到每个Kotlin源码文件中：\n" +
                "    kotlin.*\n" +
                "    kotlin.annotation.*\n" +
                "    kotlin.collections.*\n" +
                "    kotlin.comparisons.* (自 Kotlin 1.1 起)\n" +
                "    kotlin.io.*\n" +
                "    kotlin.ranges.*\n" +
                "    kotlin.sequences.*\n" +
                "    kotlin.text.*\n" +
                "\n" +
                "根据平台还会导入额外包：\n" +
                "    JVM:\n" +
                "        java.lang.*\n" +
                "        kotlin.jvm.*\n" +
                "\n" +
                "    JS:\n" +
                "        kotlin.js.*\n" +
                "```\n" +
                "\n" +
                "3.导入\n" +
                "\n" +
                "```\n" +
                "除了默认导入外，每个文件可自定义导入   \n" +
                "    import foo.Bar\n" +
                "    import foo.*\n" +
                "\n" +
                "如出现名字冲突，可用 as 重命名消歧义：\n" +
                "    import foo.Bar // Bar 可访问\n" +
                "    import bar.Bar as bBar // bBar 重命名“bar.Bar”\n" +
                "\n" +
                "import 不限于导入类, 也可导入：\n" +
                "    顶层函数和属性\n" +
                "    在对象声明中声明的函数和属性\n" +
                "    枚举常量\n" +
                "\n" +
                "与 Java 不同的是，Kotlin 没有 import static 语法，全部都用 import 导入\n" +
                "```\n" +
                "\n" +
                "4.顶层声明的可见性\n" +
                "\n" +
                "```\n" +
                "如果顶层声明是 private，它是该文件的私有成员！\n" +
                "```\n" +
                "\n" +
                "\n" +
                "\n" +
                "6.返回和跳转\n" +
                "\n" +
                "```\n" +
                "Kotlin 和java一样，有三种结构化跳转表达式:\n" +
                "    return   从包围它的函数或匿名函数返回\n" +
                "    break    终止循环\n" +
                "    continue 跳出本次循环，继续下一次循环\n" +
                "\n" +
                "和Java不同的是，这些表达式都可作为更大表达式的一部分:\n" +
                "        val s = person.name ?: return\n" +
                "```\n" +
                "\n" +
                "\n" +
                "\n" +
                "7.break和continue @标签\n" +
                "\n" +
                "```\n" +
                "和Java不同的是，在 Kotlin 中任何表达式都可以用 标签@ 来标记:\n" +
                "    loop@ for (i in 1..100) {\n" +
                "        for (j in 1..100) {\n" +
                "            if (……) break@loop // 终止loop标记的循环\n" +
                "            if (……) continue@loop // 跳出loop标记的循环，继续下一次loop标记的循环\n" +
                "        }\n" +
                "    }\n" +
                "```\n" +
                "\n" +
                "\n" +
                "\n" +
                "8.return @标签\n" +
                "\n" +
                "```\n" +
                "Kotlin 有局部函数，因此Kotlin函数可被嵌套\n" +
                "1.从外层函数返回：\n" +
                "    fun foo() {\n" +
                "        ints.forEach {\n" +
                "            if (it == 0) return // 默认从foo(){}返回\n" +
                "            print(it)\n" +
                "        }\n" +
                "    }\n" +
                "\n" +
                "2.用显式标签从lambda表达式中返回:\n" +
                "    fun foo() {\n" +
                "        ints.forEach lit@ {\n" +
                "            if (it == 0) return@lit // 标记从forEach{}返回\n" +
                "            print(it)\n" +
                "        }\n" +
                "    }\n" +
                "\n" +
                "3.用隐式标签(与接收lambda的函数同名)从lambda表达式中返回:\n" +
                "    fun foo() {\n" +
                "        ints.forEach {\n" +
                "            if (it == 0) return@forEach // 隐式标签forEach，从forEach{}返回\n" +
                "            print(it)\n" +
                "        }\n" +
                "    }\n" +
                "\n" +
                "4.用匿名函数替代lambda表达式:\n" +
                "    fun foo() {\n" +
                "        ints.forEach(fun(value: Int) {\n" +
                "            if (value == 0) return // 从该匿名函数fun返回\n" +
                "            print(value)\n" +
                "        })\n" +
                "    }\n" +
                "\n" +
                "当return返回值时:\n" +
                "    return@a 1 // 从@a标记的函数返回1，不是返回标记的表达式(@a 1)”。\n" +
                "```\n" +
                "\n" +
                "\n" +
                "\n" +
                "类与继承\n" +
                "\n" +
                "1.定义类\n" +
                "\n" +
                "```\n" +
                "和java一样，Kotlin 中使用关键字 class 声明/定义类\n" +
                "    class MyClass(param: type) {\n" +
                "    }\n" +
                "类声明由类名、类头(主构造函数参数)和类体构成, 类头和类体都是可选的    \n" +
                "如果没有类体，可以省略花括号:\n" +
                "    class MyClass\n" +
                "```\n" +
                "\n" +
                "2.构造函数\n" +
                "\n" +
                "1.主构造函数\n" +
                "\n" +
                "```\n" +
                "在 Kotlin 中的一个类可以有一个主构造函数、多个次构造函数！\n" +
                "主构造函数是类头的一部分，由类名(可选参数)构成\n" +
                "    class Person constructor(name: String) {\n" +
                "    }\n" +
                "\n" +
                "1.省略 constructor 关键字\n" +
                "    如果主构造函数没有注解或者可见性修饰符(public/private等)，可以省略 constructor 关键字\n" +
                "    class Person(name: String) {\n" +
                "    }\n" +
                "    如果构造函数有注解或可见性修饰符，必需要 constructor 关键字:\n" +
                "    class Person public @Inject constructor(name: String) {\n" +
                "    }\n" +
                "\n" +
                "2.主构造函数的初始化代码可放到 init 初始化块中：\n" +
                "    class Person(name: String) {\n" +
                "        init {\n" +
                "            // 主构造函数参数可以在初始化块中使用\n" +
                "            logger.info(\"value: ${name}\")\n" +
                "        }\n" +
                "        // 主构造函数参数也可以在属性初始化器中使用\n" +
                "        val key = name.toUpperCase()\n" +
                "    }\n" +
                "\n" +
                "3.在主构造函数中声明类属性(类成员变量/字段)以及初始化属性：\n" +
                "    class Person(val firstName: String, val lastName: String, var age: Int) {\n" +
                "    }\n" +
                "    与普通变量一样，主构造函数中声明的类属性可以是可变(var)或只读(val)\n" +
                "```\n" +
                "\n" +
                "2.次构造函数\n" +
                "\n" +
                "```\n" +
                "在类体中也可以声明前缀有 constructor 的次构造函数:\n" +
                "    class Person {\n" +
                "        constructor(parent: Person) {\n" +
                "            parent.children.add(this)\n" +
                "        }\n" +
                "    }\n" +
                "\n" +
                "1.如果类有一个主构造函数，每个次构造函数需要委托给主构造函数，可以直接委托或者通过别的次构造函数间接委托\n" +
                "委托到同一个类的另一个构造函数用 this 关键字即可:\n" +
                "    class Person(val name: String) {\n" +
                "        constructor(name: String, parent: Person) : this(name) {\n" +
                "            parent.children.add(this)\n" +
                "        }\n" +
                "    }\n" +
                "\n" +
                "2.如果非抽象类没有声明任何构造函数, 会自动生成无参数的主构造函数, 可见性是public\n" +
                "如果不想构造函数是public，需添加 private constructor：\n" +
                "    class DontCreateMe private constructor () {\n" +
                "    }\n" +
                "\n" +
                "```\n" +
                "\n" +
                "3.创建类的实例对象\n" +
                "\n" +
                "```\n" +
                "和java不同，Kotlin没有new关键字, 创建一个类的实例对象：\n" +
                "    val person = Person(\"lioil\")    \n" +
                "\n" +
                "```\n" +
                "\n" +
                "\n" +
                "\n" +
                "3.继承\n" +
                "\n" +
                "1.定义\n" +
                "\n" +
                "```\n" +
                "和java类似，在 Kotlin 中所有类都有一个共同的超类(基类/父类) Any\n" +
                "    class Example // 从 Any 隐式继承\n" +
                "    Any 不是 java.lang.Object, Any除了equals()、hashCode()和toString()外没有其它任何成员!\n" +
                "\n" +
                "1.声明一个显式超类(基类/父类):\n" +
                "open表示允许其它类继承, 和Java中final相反, 默认情况下，Kotlin所有类都是final\n" +
                "    open class Base(p: Int)\n" +
                "    class Derived(p: Int) : Base(p)\n" +
                "\n" +
                "2.初始化超类(基类/父类)的构造函数\n" +
                "如果类具有主构造函数，则用主构造函数的参数(并且必须)初始化基类构造函数\n" +
                "如果类没有主构造函数，则每个次构造函数必须使用super关键字初始化基类型，或委托给另一构造函数\n" +
                "    class MyView : View {\n" +
                "        constructor(ctx: Context) : super(ctx)\n" +
                "        constructor(ctx: Context, attrs: AttributeSet) : super(ctx, attrs)\n" +
                "    }\n" +
                "```\n" +
                "\n" +
                "2.覆盖父类方法\n" +
                "\n" +
                "```\n" +
                "与Java不同，Kotlin需显式标注可覆盖的成员(open)和覆盖后的成员(override)\n" +
                "    open class Base {\n" +
                "        open fun v() {} // 如果没标注open, 则子类不允许定义相同名函数\n" +
                "        fun nv() {}\n" +
                "    }\n" +
                "\n" +
                "    class Derived() : Base() {\n" +
                "        // 如果没标注override, 则编译器将会报错            \n" +
                "        override fun v() {}  \n" +
                "    }\n" +
                "\n" +
                "标记 override 相当于open，可在子类中覆盖, 如果要禁止再次覆盖，要final 关键字：\n" +
                "    open class AnotherDerived() : Base() {\n" +
                "        final override fun v() {}\n" +
                "    }\n" +
                "```\n" +
                "\n" +
                "3.覆盖父类属性\n" +
                "\n" +
                "```\n" +
                "覆盖属性与覆盖方法类似,\n" +
                "在父类的属性必须以 override 开头，并且父子类必须具有兼容的类型\n" +
                "每个声明的属性可由具有初始化器的属性或者具有getter方法的属性覆盖\n" +
                "    open class Foo {\n" +
                "        open val x: Int get { …… }\n" +
                "    }\n" +
                "\n" +
                "    class Bar1 : Foo() {\n" +
                "        override val x: Int = ……\n" +
                "    }\n" +
                "\n" +
                "可用var属性覆盖val属性，但反之则不行,\n" +
                "因为val属性本质是只声明一个getter方法,而将其覆盖为var,只是在子类中添加一个setter方法\n" +
                "\n" +
                "可在主构造函数中使用 override 关键字覆盖父类的属性:\n" +
                "    interface Foo {\n" +
                "        val count: Int\n" +
                "    }\n" +
                "\n" +
                "    class Bar1(override var count: Int) : Foo\n" +
                "\n" +
                "```\n" +
                "\n" +
                "4.覆盖规则\n" +
                "\n" +
                "```\n" +
                "在 Kotlin 中，实现继承由下述规则规定：\n" +
                "如果类从直接超类继承相同成员的多个实现,它必须覆盖这个成员并提供其自己的实现:\n" +
                "    open class A {\n" +
                "        open fun f() { print(\"A\") }\n" +
                "    }\n" +
                "\n" +
                "    interface B {\n" +
                "        fun f() { print(\"B\") } // 接口默认是open\n" +
                "    }\n" +
                "\n" +
                "    class C() : A(), B {       \n" +
                "        override fun f() {\n" +
                "            super<A>.f() // 调用 A.f()\n" +
                "            super<B>.f() // 调用 B.f()\n" +
                "        }\n" +
                "    }\n" +
                "```\n" +
                "\n" +
                "接口(interface)\n" +
                "\n" +
                "1.定义接口\n" +
                "\n" +
                "```\n" +
                "Kotlin接口非常类似于Java 8，既可包含方法声明,也包含方法实现！\n" +
                "可以有属性,但只能声明为抽象或提供访问器实现!\n" +
                "与Java一样,使用关键字interface定义接口:\n" +
                "    interface MyInterface {\n" +
                "        fun bar() // 方法声明，抽象方法\n" +
                "        fun foo() {\n" +
                "            // 方法实现，非抽象方法\n" +
                "        }\n" +
                "    }\n" +
                "```\n" +
                "\n" +
                "2.实现接口\n" +
                "\n" +
                "```\n" +
                "类或者对象可以实现一个或多个接口:\n" +
                "    class Child : MyInterface {\n" +
                "        override fun bar() {\n" +
                "            // 方法体\n" +
                "        }\n" +
                "    }\n" +
                "\n" +
                "```\n" +
                "\n" +
                "3.接口属性\n" +
                "\n" +
                "```\n" +
                "在接口中的属性既可以是抽象的,也可以有访问器的实现,\n" +
                "但不能有幕后字段(backing field),因此访问器不能引用它们。\n" +
                "    interface MyInterface {\n" +
                "        val prop: Int // 抽象abstract,不能初始化\n" +
                "\n" +
                "        val property: String\n" +
                "            get() = \"foo\" // 有访问器的实现，非抽象\n" +
                "\n" +
                "        fun foo() {\n" +
                "            print(prop)\n" +
                "        }\n" +
                "    }\n" +
                "\n" +
                "    class Child : MyInterface {\n" +
                "        override val prop: Int = 29\n" +
                "    }\n" +
                "\n" +
                "```\n" +
                "\n" +
                "4.多接口覆盖冲突\n" +
                "\n" +
                "```\n" +
                "实现多个接口时,可能会遇到[覆盖多个接口中同名方法]的问题:\n" +
                "    interface A {\n" +
                "        fun foo() { print(\"A\") }\n" +
                "        fun bar()\n" +
                "    }\n" +
                "\n" +
                "    interface B {\n" +
                "        fun foo() { print(\"B\") }\n" +
                "        fun bar() { print(\"bar\") }\n" +
                "    }        \n" +
                "\n" +
                "    class C : A, B {\n" +
                "        override fun foo() {\n" +
                "            // 多覆盖\n" +
                "            super<A>.foo()\n" +
                "            super<B>.foo()\n" +
                "        }\n" +
                "\n" +
                "        override fun bar() {\n" +
                "            // 单覆盖\n" +
                "            super<B>.bar()\n" +
                "        }\n" +
                "    }\n" +
                "```"}/>

            </div>
        );
    }
}

export default Kotlin2;