import React, { Component } from 'react';

import Markdown  from 'react-markdown';



class Kotlin1 extends Component {
    render() {

        return (
            <div>
                <a href="https://github.com/nick8sky/hello_koltin"> https://github.com/nick8sky/hello_koltin</a>
                <p>springboot & kotlin & mybatis 构建restful web应用</p>
                <Markdown source={"## Kotlin-01.入门介绍和基础语法(Basic Syntax)\n" +
                "\n" +
                "参考：http://blog.csdn.net/qq_32115439/article/details/73062916\n" +
                "\n" +
                "```\n" +
                "Kotlin是基于JVM的新编程语言,和Groovy、Scala、Clojure等语言类似,被称为JVM语言!\n" +
                "Kotlin特点:       \n" +
                "    Kotlin兼容Java,与Java 100%互相调用,并具备诸多Java尚不支持的新特性!\n" +
                "    比Java更安全,更简洁,更现代化,更强大！\n" +
                "    既面向对象又有函数式结构,支持高阶函数、操作符重载、字符串模板和lambda等！\n" +
                "    Kotlin比最成熟竞争者Scala简单易学,可轻松引入到现有java项目中!\n" +
                "    此外,还可编译成JavaScript代码, Kotlin也可与JavaScript互操作！\n" +
                "\n" +
                "Kotlin历史:   \n" +
                "    Kotlin由JetBrains公司在2010年开发,2011年开源:http://github.com/JetBrains/kotlin\n" +
                "    2016年发布1.0版,2017年4月发布1.1.2版！\n" +
                "    Kotlin语言的开发团队,目前大约40人,Andrey Breslav还是Kotlin语言的首席设计师!\n" +
                "    JetBrains公司对Kotlin愿景:\n" +
                "        用同一种语言,接多平台的不同应用的端对端开发,\n" +
                "        包括全栈Web应用、Android和iOS客户端、嵌入式/物联网等!\n" +
                "\n" +
                "    谷歌Android团队和JetBrains公司关系密切,Android Studio就是基于IntelliJ IDEA社区版开发!\n" +
                "    谷歌和JetBrains公司为Kotlin成立一个非盈利基金会,Kotlin语言的开发，还是JB为主导!        \n" +
                "    谷歌在I/O 2017大会宣布:将Kotlin语言作为Android开发的一级编程语言!\n" +
                "```\n" +
                "\n" +
                "### 1.Kotlin注释\n" +
                "\n" +
                "```\n" +
                "和Java一样，Kotlin支持行注释和块注释,\n" +
                "与Java不同的是，Kotlin块注释可嵌套\n" +
                "    // 这是行注释\n" +
                "    /* 这是块注释 */\n" +
                "```\n" +
                "\n" +
                "### 2.定义包名\n" +
                "\n" +
                "```\n" +
                "包名位于源码文件顶部,与java相同!\n" +
                "但源码文件可在任意目录,不需要匹配包名\n" +
                "package com.demo\n" +
                "import java.util.*\n" +
                "```\n" +
                "\n" +
                "### 3.定义函数\n" +
                "\n" +
                "#### ①.函数有两个Int参数,返回Int类型\n" +
                "\n" +
                "```\n" +
                "// 变量: 变量类型\n" +
                "fun sum(a: Int, b: Int): Int {\n" +
                "    return a + b\n" +
                "}\n" +
                "\n" +
                "// main函数,和java的main方法一样,作为程序入口\n" +
                "fun main(args: Array<String>) { \n" +
                "    // 调用sum函数\n" +
                "    println(sum(3, 5)) \n" +
                "}\n" +
                "```\n" +
                "\n" +
                "#### ②.函数表达式推断返回类型\n" +
                "\n" +
                "```\n" +
                "fun sum(a: Int, b: Int) = a + b \n" +
                "\n" +
                "fun main(args: Array<String>) {\n" +
                "    println(sum(3, 5))\n" +
                "}\n" +
                "```\n" +
                "\n" +
                "#### ③.函数返回类型Unit\n" +
                "\n" +
                "```\n" +
                "// Unit类似java的void, $表示取变量值\n" +
                "fun printSum(a: Int, b: Int): Unit {\n" +
                "    println(\"sum of $a and $b is ${a + b}\")\n" +
                "}\n" +
                "\n" +
                "fun main(args: Array<String>) {\n" +
                "    printSum(3, 5)\n" +
                "}\n" +
                "```\n" +
                "\n" +
                "#### ④.函数可省略返回类型Unit\n" +
                "\n" +
                "```\n" +
                "fun printSum(a: Int, b: Int) {\n" +
                "    println(\"sum of $a and $b is ${a + b}\")\n" +
                "}\n" +
                "```\n" +
                "\n" +
                "### 4.定义局部变量\n" +
                "\n" +
                "#### ①.只读变量val(只能赋值一次,之后不可变)\n" +
                "\n" +
                "```\n" +
                "fun main(args: Array<String>) {\n" +
                "    val a: Int = 1 //立即初始化\n" +
                "    val b = 2      //Int类型可被推断出来\n" +
                "    val c: Int     //没有初始化,必须写类型\n" +
                "    c = 3          //延迟初始化\n" +
                "    println(\"a = $a, b = $b, c = $c\")\n" +
                "}\n" +
                "```\n" +
                "\n" +
                "#### ②.可变变量var\n" +
                "\n" +
                "```\n" +
                "fun main(args: Array<String>) {\n" +
                "    var x = 5 //Int类型可被推断出来\n" +
                "    x += 1    //x变量可以改变\n" +
                "    println(\"x = $x\")\n" +
                "}\n" +
                "```\n" +
                "\n" +
                "### 5.字符串模板\n" +
                "\n" +
                "```\n" +
                "fun main(args: Array<String>) {\n" +
                "    var a = 1       \n" +
                "    val s1 = \"a is $a\" // 简单变量模板\n" +
                "    val s2 = \"replace: ${s1.replace(\"is\", \"was\")}\" // 表达式模板\n" +
                "    println(s1)\n" +
                "    println(s2)\n" +
                "}\n" +
                "```\n" +
                "\n" +
                "### 6.条件表达式\n" +
                "\n" +
                "#### ①.条件if\n" +
                "\n" +
                "```\n" +
                "fun maxOf(a: Int, b: Int) = if (a > b) a else b\n" +
                "fun main(args: Array<String>) {\n" +
                "    println(maxOf(3, 5))\n" +
                "}\n" +
                "```\n" +
                "\n" +
                "#### ②.条件when\n" +
                "\n" +
                "```\n" +
                "fun describe(obj: Any): String =\n" +
                "when (obj) {\n" +
                "    1          -> \"One\"\n" +
                "    \"Hello\"    -> \"Greeting\"\n" +
                "    is Long    -> \"Long\"\n" +
                "    !is String -> \"Not a string\"\n" +
                "    else       -> \"Unknown\"\n" +
                "}\n" +
                "\n" +
                "fun main(args: Array<String>) {\n" +
                "    println(describe(1))\n" +
                "    println(describe(\"Hello\"))\n" +
                "    println(describe(1000L))\n" +
                "    println(describe(2))\n" +
                "    println(describe(\"other\"))\n" +
                "}\n" +
                "```\n" +
                "\n" +
                "### 7.可能空值时,检查null\n" +
                "\n" +
                "```\n" +
                "当可能为null值时,引用变量必须添加?标记  \n" +
                "fun parseInt(str: String): Int? {\n" +
                "    return str.toIntOrNull()\n" +
                "}\n" +
                "```\n" +
                "\n" +
                "### 8.类型检查和自动转换\n" +
                "\n" +
                "```\n" +
                "is运算符可检查一个变量是否为某类型的实例\n" +
                "如果一个不可变的局部变量或属性是指定类型，则不需要显式转换：\n" +
                "fun getStringLength(obj: Any): Int? {\n" +
                "    if (obj is String) {\n" +
                "        // Any类型自动转换为String类型\n" +
                "        return obj.length\n" +
                "    }       \n" +
                "    return null\n" +
                "}\n" +
                "\n" +
                "上面代码，也可写成下面\n" +
                "fun getStringLength(obj: Any): Int? {\n" +
                "    if (obj !is String) return null\n" +
                "    return obj.length\n" +
                "}\n" +
                "```\n" +
                "\n" +
                "### 9.循环\n" +
                "\n" +
                "#### ①.循环for\n" +
                "\n" +
                "```\n" +
                "fun main(args: Array<String>) {\n" +
                "    val items = listOf(\"apple\", \"banana\", \"kiwi\")\n" +
                "    for (item in items) {\n" +
                "        // 直接变量每一项\n" +
                "        println(item)\n" +
                "    }\n" +
                "}\n" +
                "\n" +
                "上面代码，也可写成下面\n" +
                "fun main(args: Array<String>) {\n" +
                "    val items = listOf(\"apple\", \"banana\", \"kiwi\")\n" +
                "    for (index in items.indices) {\n" +
                "        // 遍历下标，输出相应项\n" +
                "        println(\"item at $index is ${items[index]}\")\n" +
                "    }\n" +
                "}\n" +
                "```\n" +
                "\n" +
                "#### ②.循环while\n" +
                "\n" +
                "```\n" +
                "fun main(args: Array<String>) {\n" +
                "    val items = listOf(\"apple\", \"banana\", \"kiwi\")\n" +
                "    var index = 0\n" +
                "    while (index < items.size) {\n" +
                "        println(\"item at $index is ${items[index]}\")\n" +
                "        index++\n" +
                "    }\n" +
                "}\n" +
                "```\n" +
                "\n" +
                "### 10.范围in运算符\n" +
                "\n" +
                "```\n" +
                "检查数字是否在指定范围内\n" +
                "fun main(args: Array<String>) {\n" +
                "    val x = 3\n" +
                "    val y = 5\n" +
                "    if (x in 1..y+1) {\n" +
                "        println(\"$x在指定范围内\")\n" +
                "    }\n" +
                "    if (0 !in 1..y+1) {\n" +
                "        println(\"0超出范围\")\n" +
                "    }\n" +
                "}\n" +
                "\n" +
                "用于迭代/循环\n" +
                "fun main(args: Array<String>) {\n" +
                "    for (x in 1..3) {\n" +
                "        print(x)\n" +
                "    }\n" +
                "    println(\"***\")\n" +
                "    for (x in 1..5 step 2) {\n" +
                "        println(x)\n" +
                "    }\n" +
                "    println(\"***\")\n" +
                "    for (x in 5 downTo 1 step 2) {\n" +
                "        println(x)\n" +
                "    }\n" +
                "}\n" +
                "\n" +
                "执行结果如下：\n" +
                "    1\n" +
                "    2\n" +
                "    3       \n" +
                "    ***\n" +
                "    1\n" +
                "    3\n" +
                "    5       \n" +
                "    ***     \n" +
                "    5\n" +
                "    3\n" +
                "    1\n" +
                "```\n" +
                "\n" +
                "### 11.集合\n" +
                "\n" +
                "```\n" +
                "迭代集合(循环遍历)\n" +
                "fun main(args: Array<String>) {\n" +
                "    val items = listOf(\"apple\", \"banana\", \"kiwi\")\n" +
                "    for (item in items) {\n" +
                "        println(item)\n" +
                "    }\n" +
                "}\n" +
                "\n" +
                "检查集合是否包含一个对象\n" +
                "fun main(args: Array<String>) {\n" +
                "    val items = setOf(\"apple\", \"banana\", \"kiwi\")\n" +
                "    when {\n" +
                "        \"orange\" in items -> println(\"juicy\")\n" +
                "        \"apple\" in items -> println(\"apple is fine too\")\n" +
                "    }\n" +
                "}\n" +
                "\n" +
                "集合函数lambda表达式(过滤,排序,循环遍历)\n" +
                "fun main(args: Array<String>) {\n" +
                "    val fruits = listOf(\"banana\", \"avocado\", \"apple\", \"kiwi\")\n" +
                "    fruits\n" +
                "    .filter { it.startsWith(\"a\") }\n" +
                "    .sortedBy { it }\n" +
                "    .map { it.toUpperCase() }\n" +
                "    .forEach { println(it) }\n" +
                "}\n" +
                "```\n" +
                "\n" +
                "\n" +
                "\n" +
                "习惯用法：一些在Kotlin中广泛使用的语法习惯\n" +
                "\n" +
                "1.创建 DTOs（POJOs/POCOs）\n" +
                "\n" +
                "```\n" +
                "data class Customer(val name: String, val email: String)\n" +
                "\n" +
                "data class自动生成以下方法:\n" +
                "    类的所有属性变量都有getters方法\n" +
                "    类的var变量还有setters方法\n" +
                "    equals()\n" +
                "    hashCode()\n" +
                "    toString()\n" +
                "    copy()\n" +
                "    类的所有属性变量都有component1()、 component2()\n" +
                "```\n" +
                "\n" +
                "2.函数的默认参数\n" +
                "\n" +
                "```\n" +
                "fun foo(a: Int = 0, b: String = \"\"){\n" +
                "    ...\n" +
                "}\n" +
                "```\n" +
                "\n" +
                "3.过滤 list\n" +
                "\n" +
                "```\n" +
                "val positives = list.filter { x -> x > 0 }\n" +
                "或更短:\n" +
                "val positives = list.filter { it > 0 }\n" +
                "```\n" +
                "\n" +
                "4.字符串内插变量\n" +
                "\n" +
                "```\n" +
                "println(\"Name $name\")\n" +
                "```\n" +
                "\n" +
                "5.类型判断\n" +
                "\n" +
                "```\n" +
                "when (x) {\n" +
                "    is Foo //-> ……\n" +
                "    is Bar //-> ……\n" +
                "    else   //-> ……\n" +
                "}\n" +
                "```\n" +
                "\n" +
                "6.遍历 map/pair型list\n" +
                "\n" +
                "```\n" +
                "for ((k, v) in map) {\n" +
                "    println(\"$k -> $v\")\n" +
                "}\n" +
                "k、v 可以改成任意名字\n" +
                "```\n" +
                "\n" +
                "7.使用区间\n" +
                "\n" +
                "```\n" +
                "for (i in 1..100) { …… }  // 闭区间：包含 100\n" +
                "for (i in 1 until 100) { …… } // 半开区间：不包含 100\n" +
                "for (x in 2..10 step 2) { …… } // 步长2: 2 4 6 8 10\n" +
                "for (x in 10 downTo 1) { …… } // 递减: 10 9..1\n" +
                "if (x in 1..10) { …… }\n" +
                "```\n" +
                "\n" +
                "8.只读\n" +
                "\n" +
                "```\n" +
                "只读 list    \n" +
                "val list = listOf(\"a\", \"b\", \"c\")\n" +
                "只读 map\n" +
                "val map = mapOf(\"a\" to 1, \"b\" to 2, \"c\" to 3)\n" +
                "```\n" +
                "\n" +
                "9.延迟属性(懒加载)\n" +
                "\n" +
                "```\n" +
                "访问时才加载\n" +
                "val p: String by lazy {\n" +
                "    // 计算该字符串\n" +
                "}\n" +
                "```\n" +
                "\n" +
                "10.扩展函数\n" +
                "\n" +
                "```\n" +
                "fun String.spaceToCamelCase() {\n" +
                "    // 不改变String类，增加了String的函数\n" +
                "}\n" +
                "\"Convert this to camelcase\".spaceToCamelCase()\n" +
                "```\n" +
                "\n" +
                "11.创建单例类\n" +
                "\n" +
                "```\n" +
                "object Resource {\n" +
                "    val name = \"Name\"\n" +
                "}\n" +
                "object本身就是对象,很明显object不能像class多次创建实例对象\n" +
                "```\n" +
                "\n" +
                "12.?和null\n" +
                "\n" +
                "```\n" +
                "If not null 缩写\n" +
                "    val files = File(\"Test\").listFiles()\n" +
                "    println(files?.size)\n" +
                "\n" +
                "if null 执行一个语句\n" +
                "    val data = ……\n" +
                "    val email = data[\"email\"] ?: throw IllegalStateException(\"Email is missing!\")\n" +
                "\n" +
                "if not null 执行一个语句\n" +
                "    val data = ……\n" +
                "    data?.let {\n" +
                "        …… // 假如data不为null, 代码会执行到此处\n" +
                "    }\n" +
                "\n" +
                "标记Boolean可空null\n" +
                "    val b: Boolean? = ……\n" +
                "    if (b == true) {\n" +
                "        ……\n" +
                "    } else {\n" +
                "        // b 是 false 或者 null\n" +
                "    }\n" +
                "```\n" +
                "\n" +
                "13.返回when/try/if表达式结果\n" +
                "\n" +
                "```\n" +
                "返回when结果   \n" +
                "    val result =  when (color) {\n" +
                "        \"Red\" -> 0\n" +
                "        \"Green\" -> 1\n" +
                "        \"Blue\" -> 2\n" +
                "        else -> throw IllegalArgumentException(\"Invalid color param value\")\n" +
                "    }\n" +
                "\n" +
                "返回try/catch结果\n" +
                "    val result = try {\n" +
                "        count()\n" +
                "    } catch (e: ArithmeticException) {\n" +
                "        throw IllegalStateException(e)\n" +
                "    }\n" +
                "\n" +
                "返回if结果\n" +
                "    val result = if (param == 1) {\n" +
                "        \"one\"\n" +
                "    } else if (param == 2) {\n" +
                "        \"two\"\n" +
                "    } else {\n" +
                "        \"three\"\n" +
                "    }\n" +
                "```\n" +
                "\n" +
                "14.单表达式函数\n" +
                "\n" +
                "```\n" +
                "fun theAnswer() = 42\n" +
                "等价于\n" +
                "fun theAnswer(): Int {\n" +
                "    return 42\n" +
                "}\n" +
                "\n" +
                "单表达式函数与其它习惯用法一起简化代码，例如和 when 表达式一起使用：\n" +
                "fun transform(color: String): Int = when (color) {\n" +
                "    \"Red\" -> 0\n" +
                "    \"Green\" -> 1\n" +
                "    \"Blue\" -> 2\n" +
                "    else -> throw IllegalArgumentException(\"Invalid color param value\")\n" +
                "}\n" +
                "```\n" +
                "\n" +
                "15.with语句对一个对象调用多个方法\n" +
                "\n" +
                "```\n" +
                "class Turtle {\n" +
                "    fun penDown()\n" +
                "    fun penUp()\n" +
                "    fun turn(degrees: Double)\n" +
                "    fun forward(pixels: Double)\n" +
                "}\n" +
                "\n" +
                "val myTurtle = Turtle()\n" +
                "with(myTurtle) { // 画一个 100 像素的正方形\n" +
                "    penDown()\n" +
                "    for(i in 1..4) {\n" +
                "        forward(100.0)\n" +
                "        turn(90.0)\n" +
                "    }\n" +
                "    penUp()\n" +
                "}\n" +
                "```\n" +
                "\n" +
                "16.泛型函数简化？\n" +
                "\n" +
                "```\n" +
                "对fromJson方法参数简化\n" +
                "inline fun <reified T: Any> Gson.fromJson(json): T = this.fromJson(json, T::class.java)\n" +
                "\n" +
                "```\n" +
                "\n" +
                "17.java流操作的写法简化\n" +
                "\n" +
                "```\n" +
                "val stream = Files.newInputStream(Paths.get(\"/some/file.txt\"))\n" +
                "stream.buffered().reader().use { reader ->\n" +
                "    println(reader.readText())\n" +
                "}\n" +
                "```\n" +
                "\n" +
                "\n" +
                "\n" +
                "编码规范/代码风格\n" +
                "\n" +
                "1.命名风格\n" +
                "\n" +
                "```\n" +
                "如果不确定，默认使用Java的编码规范，比如：\n" +
                "    使用驼峰法命名（并避免命名含有下划线）\n" +
                "    类型名以大写字母开头\n" +
                "    方法和属性以小写字母开头\n" +
                "    使用 4 个空格缩进\n" +
                "    公有函数应撰写函数文档，这样这些文档才会出现在 Kotlin Doc 中\n" +
                "```\n" +
                "\n" +
                "2.冒号\n" +
                "\n" +
                "```\n" +
                "类型和父类之间的冒号前要有一个空格，而实例和类型之间的冒号前不要有空格：\n" +
                "interface Foo<out T : Any> : Bar {\n" +
                "    fun foo(a: Int): T\n" +
                "}\n" +
                "```\n" +
                "\n" +
                "3.Lambda表达式\n" +
                "\n" +
                "```\n" +
                "在lambda表达式中, 大括号左右要加空格，箭头左右也要加空格\n" +
                "lambda表达应尽可能不要写在圆括号中\n" +
                "\n" +
                "list.filter { it > 10 }.map { element -> element * 2 }\n" +
                "在非嵌套lambda表达式中，最好使用约定俗成的默认参数 it 来替代显式参数\n" +
                "在嵌套的有参数的lambda表达式中，参数应该总是显式声明\n" +
                "```\n" +
                "\n" +
                "4.类头格式化\n" +
                "\n" +
                "```\n" +
                "有少数几个参数的类可以写成一行：\n" +
                "class Person(id: Int, name: String)\n" +
                "\n" +
                "具有较长类头的类应该格式化，以使每个主构造函数参数位于带有缩进的单独一行中。 \n" +
                "此外，右括号应该另起一行。\n" +
                "如果我们使用继承，那么超类构造函数调用或者实现接口列表应位于与括号相同的行上：\n" +
                "class Person(\n" +
                "    id: Int, \n" +
                "    name: String,\n" +
                "    surname: String\n" +
                ") : Human(id, name) {\n" +
                "    // ……\n" +
                "}\n" +
                "\n" +
                "对于多个接口，应首先放置父类构造函数调用，然后每个接口应位于不同的行中：\n" +
                "class Person(\n" +
                "    id: Int, \n" +
                "    name: String,\n" +
                "    surname: String\n" +
                ") : Human(id, name),\n" +
                "    KotlinMaker {\n" +
                "    // ……\n" +
                "}\n" +
                "```\n" +
                "\n" +
                "5.省略Unit\n" +
                "\n" +
                "```\n" +
                "如果函数返回 Unit 类型，该返回类型应该省略：\n" +
                "fun foo() { // 省略了 \": Unit\"\n" +
                "\n" +
                "}\n" +
                "```\n" +
                "\n" +
                "6.函数还是属性\n" +
                "\n" +
                "```\n" +
                "很多场合无参的函数可与只读属性互换。 尽管语义相近，也有一些取舍的风格约定。\n" +
                "底层算法优先使用属性而不是函数：\n" +
                "    不会抛异常\n" +
                "    O(1) 复杂度\n" +
                "    计算廉价（或缓存第一次运行）\n" +
                "    不同调用返回相同结果\n" +
                "```\n" +
                "\n" +
                "\n" +
                "\n" +
                "基本类型/数据类型\n" +
                "\n" +
                "1.介绍\n" +
                "\n" +
                "```\n" +
                "与java不同，Kotlin所有数据类型都是对象，因此可在任何变量上调用成员函数和属性(字段)！\n" +
                "```\n" +
                "\n" +
                "2.数字\n" +
                "\n" +
                "```\n" +
                "Kotlin 处理数字在某种程度上接近 Java，但是并不完全相同。\n" +
                "例如，对于数字没有隐式把范围变宽转换(如在 Java 中 int 可以隐式转换为long)，\n" +
                "另外有些情况的字面值略有不同。\n" +
                "\n" +
                "Kotlin 内置数字类型：\n" +
                "    类型    位数\n" +
                "    Double  64\n" +
                "    Float   32\n" +
                "    Long    64\n" +
                "    Int     32\n" +
                "    Short   16\n" +
                "    Byte    8\n" +
                "注意在 Kotlin 中字符Char不能转化为数字\n" +
                "```\n" +
                "\n" +
                "3.数值字面常量\n" +
                "\n" +
                "```\n" +
                "数值常量字面值表示:\n" +
                "    十进制:   123        \n" +
                "    十六进制: 0x0F\n" +
                "    二进制:   0b00001011\n" +
                "    注意: 不支持八进制(而java以0开头表示八进制 07)\n" +
                "\n" +
                "    Long 用大写 L 标记:    123L  \n" +
                "    Float 用 f 或 F 标记:  123.5f\n" +
                "    double：              123.5、123.5e10\n" +
                "\n" +
                "自 Kotlin 1.1 起，用下划线使数字更易读：   \n" +
                "    val oneMillion = 1_000_000\n" +
                "    val creditCardNumber = 1234_5678_9012_3456L\n" +
                "    val socialSecurityNumber = 999_99_9999L\n" +
                "    val hexBytes = 0xFF_EC_DE_5E\n" +
                "    val bytes = 0b11010010_01101001_10010100_10010010\n" +
                "\n" +
                "```\n" +
                "\n" +
                "4.数字自动装箱-表示方式\n" +
                "\n" +
                "```\n" +
                "Kotlin数字在虚拟机中是物理存储为JVM原生类型,但如果是可null引用(有问号?)或者泛型对象,\n" +
                "那么kotlin数字就会自动装箱(类似java包装类,如int自动装箱转为Integer)\n" +
                "\n" +
                "kotlin数字自动装箱的实例:\n" +
                "    val a: Int = 10000       \n" +
                "    val boxA: Int? = a //有问号? 会自动装箱\n" +
                "    val boxB: Int? = a //有问号? 会自动装箱\n" +
                "\n" +
                "kotlin三个等号===比较的是对象地址(引用),自动装箱会生成新对象,两个对象不同,输出false\n" +
                "但是数值在-128和127之间时,自动装箱会重用同一个对象(java缓存机制),输出true\n" +
                "    print(boxA === boxB) //输出false,如果数值在-128和127之间,输出true\n" +
                "\n" +
                "kotlin两个等号==比较的是对象数值,两个对象数值相同,输出true\n" +
                "    print(boxA == boxB) //输出true\n" +
                "```\n" +
                "\n" +
                "## 5.显式转换\n" +
                "\n" +
                "```\n" +
                "范围较小数字类型不能隐式转换为范围较大类型。\n" +
                "    val b: Byte = 1 // 正确, 字面值是静态检测的\n" +
                "    val i: Int = b // 错误: 隐式扩宽\n" +
                "    val i: Int = b.toInt() // 正确: 显式扩宽\n" +
                "\n" +
                "每个数字类型支持如下类型转换:\n" +
                "    toByte(): Byte\n" +
                "    toShort(): Short\n" +
                "    toInt(): Int\n" +
                "    toLong(): Long\n" +
                "    toFloat(): Float\n" +
                "    toDouble(): Double\n" +
                "    toChar(): Char\n" +
                "\n" +
                "缺少隐式扩宽转换是很少引人注意的，因为类型是从上下文推断出来的，而算术运算会有重载做适当扩宽转换，例如：\n" +
                "    val l = 1L + 3 // Long + Int => Long\n" +
                "```\n" +
                "\n" +
                "6.位运算\n" +
                "\n" +
                "```\n" +
                "Kotlin支持数字运算的标准集，运算被定义为相应的类成员（但编译器会将函数调用优化为相应的指令）\n" +
                "对于按位运算，没有特殊字符来表示，而只可用中缀方式调用函数，例如:\n" +
                "    val x = (1 shl 2) and 0x000FF000\n" +
                "以下是完整位运算列表（只用于 Int 和 Long）：\n" +
                "    shl(bits) – 有符号左移 (Java 的 <<)\n" +
                "    shr(bits) – 有符号右移 (Java 的 >>)\n" +
                "    ushr(bits) – 无符号右移 (Java 的 >>>)\n" +
                "    and(bits) – 位与\n" +
                "    or(bits) – 位或\n" +
                "    xor(bits) – 位异或\n" +
                "    inv() – 位非\n" +
                "```\n" +
                "\n" +
                "7.字符\n" +
                "\n" +
                "```\n" +
                "字符用 Char 类型表示，不能直接当作数字\n" +
                "    fun check(c: Char) {\n" +
                "        if (c == 1) { // 错误：类型不兼容\n" +
                "            // ……\n" +
                "        }\n" +
                "    }\n" +
                "字符字面值用单引号括起来: '1' \n" +
                "特殊字符可以用反斜杠转义: \\t、 \\b、\\n、\\r、\\'、\\\"、\\\\ 和 \\$。 \n" +
                "编码其他字符用 Unicode 转义序列语法：'\uFF00'。\n" +
                "\n" +
                "我们可以显式把字符转换为 Int 数字\n" +
                "fun decimalDigitValue(c: Char): Int {\n" +
                "    if (c !in '0'..'9')\n" +
                "        throw IllegalArgumentException(\"Out of range\")\n" +
                "    return c.toInt() - '0'.toInt() // 显式转换为数字\n" +
                "}\n" +
                "当需要可null引用时，像数字一样，字符也会被装箱。\n" +
                "装箱操作不会保留同一性(同一对象)。\n" +
                "```\n" +
                "\n" +
                "8.布尔\n" +
                "\n" +
                "```\n" +
                "布尔用 Boolean 类型表示，它有两个值：true 和 false。\n" +
                "若需要可空引用布尔会被装箱。\n" +
                "```\n" +
                "\n" +
                "9.数组\n" +
                "\n" +
                "```\n" +
                "数组在 Kotlin 中使用 Array 类来表示，它定义了 get 和 set 函数（按照运算符重载约定转变为 []）和 size 属性\n" +
                "\n" +
                "使用库函数 arrayOf() 来创建一个数组并传递元素值\n" +
                "    arrayOf(1, 2, 3) 创建了 array [1, 2, 3]\n" +
                "或  arrayOfNulls() 创建一个指定大小的null数组\n" +
                "\n" +
                "使用接受数组大小和一个函数参数的工厂函数，用作参数的函数能够返回每个元素初始值：\n" +
                "    // 创建一个 Array<String> 初始化为 [\"0\", \"1\", \"4\", \"9\", \"16\"]\n" +
                "    val asc = Array(5, { i -> (i * i).toString() })\n" +
                "\n" +
                "注意: 与 Java 不同的是，Kotlin 中数组是不型变的（invariant）。\n" +
                "这意味着 Kotlin 不让 Array<String> 赋值给 Array<Any>，以防止可能的运行时失败（但是可用 Array<out Any>）\n" +
                "\n" +
                "还有无装箱开销的类表示原生类型数组: ByteArray、 ShortArray、IntArray 等等，这些类和 Array 并没有继承关系，但是有同样方法属性，相应的工厂方法\n" +
                "    val x: IntArray = intArrayOf(1, 2, 3)\n" +
                "    x[0] = x[1] + x[2]\n" +
                "```\n" +
                "\n" +
                "10.字符串\n" +
                "\n" +
                "```\n" +
                "字符串用 String 类型表示，字符串是不可变的；\n" +
                "字符串元素可通过索引操作 s[i]\n" +
                "可用 for 循环迭代字符串:\n" +
                "    for (c in str) {\n" +
                "        println(c)\n" +
                "    }\n" +
                "```\n" +
                "\n" +
                "10.1.字符串字面值\n" +
                "\n" +
                "```\n" +
                "Kotlin 有两种类型的字符串字面值: \n" +
                "一是转义字符串 可以有转义字符，二是原始字符串 可以包含换行和任意文本\n" +
                "\n" +
                "转义字符串 很像 Java 字符串:\n" +
                "    val s = \"Hello, world!\\n\"\n" +
                "    转义采用传统的反斜杠方式\n" +
                "\n" +
                "原始字符串 使用三个引号 \"\"\" 括起来，\n" +
                "内部没有转义并且可以包含换行和任何其他字符:\n" +
                "    val text = \"\"\"\n" +
                "        for (c in \"foo\")\n" +
                "            print(c)\n" +
                "    \"\"\"\n" +
                "\n" +
                "你可以通过 trimMargin() 函数去除前导空格：\n" +
                "val text = \"\"\"\n" +
                "    |Tell me and I forget.\n" +
                "    |Teach me and I remember.\n" +
                "    |Involve me and I learn.\n" +
                "    |(Benjamin Franklin)\n" +
                "    \"\"\".trimMargin()\n" +
                "默认 | 用作边界前缀，可用其他字符作为参数传入 trimMargin(\">\")\n" +
                "```\n" +
                "\n" +
                "10.2.字符串模板\n" +
                "\n" +
                "```\n" +
                "字符串可以包含模板表达式 ，即一些小段代码，会求值并把结果合并到字符串中。 \n" +
                "模板表达式以美元符 $ 开头\n" +
                "\n" +
                "由一个简单变量构成:\n" +
                "    val i = 10\n" +
                "    val s = \"i = $i\" // 求值结果为 \"i = 10\"\n" +
                "\n" +
                "用花括号{任意表达式}:\n" +
                "    val s = \"abc\"\n" +
                "    val str = \"$s.length is ${s.length}\" // 求值结果为 \"abc.length is 3\"\n" +
                "\n" +
                "原始字符串和转义字符串内都支持模板。 \n" +
                "如果你需要在原生字符串中表示字面值 $ 字符(不支持反斜杠转义)：\n" +
                "    val price = \"\"\"\n" +
                "                ${'$'}9.99\n" +
                "```"}/>

            </div>
        );
    }
}

export default Kotlin1;