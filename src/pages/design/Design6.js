import React, {Component} from 'react';
import {Anchor, Row, Col} from 'antd';


const {Link} = Anchor;


class Design6 extends Component {

    s = "{";
    render() {

        return (
            <div>
                <Row>
                    <Col span={19}>
                        <p>设计模式：工厂模式</p>
                        <p>问：如何让反射更加优雅？</p>
                        <p>答：使用工厂模式。</p>
                        <h2 id="面向对象设计的七大原则"><a href="javascript:void(0)" class="anchor">面向对象设计的七大原则</a></h2>
                        <p>这里我稍微讲一下面向对象设计的七大原则，不必强记，重在理解。</p>
                        <ol>
                            <li><strong>单一职责原则（Single Responsibility Principle）：每一个类应该专注于做一件事情</strong>。</li>
                            <li>里氏替换原则（Liskov Substitution Principle）：超类存在的地方，子类是可以替换的。</li>
                            <li><strong>依赖倒置原则（Dependence Inversion Principle）：实现尽量依赖抽象，不依赖具体实现。</strong></li>
                            <li>接口隔离原则（Interface Segregation Principle）：应当为客户端提供尽可能小的单独的接口，而不是提供大的总的接口。</li>
                            <li>迪米特法则（Law Of Demeter）：又叫最少知识原则，一个软件实体应当尽可能少的与其他实体发生相互作用。</li>
                            <li><strong>开闭原则（Open Close Principle）：面向扩展开放，面向修改关闭。</strong></li>
                            <li>组合/聚合复用原则（Composite/Aggregate Reuse Principle CARP）：尽量使用组合/聚合达到复用，尽量少用继承。<strong>原则： 一个类中有另一个类的对象。</strong></li>
                        </ol>
                        <h2 id="ApplicationContext和BeanFactory的区别"><a href="javascript:void(0)" class="anchor">ApplicationContext和BeanFactory的区别</a></h2>
                        <p>虽然使用这两个对象都可以加载Spring的配置文件，并创建配置文件中的对象。但他俩还是有区别的，最主要的区别是：</p>
                        <ul>
                            <li>使用applicationContext操作时，可把Spring里面的配置文件中的对象都进行创建，除非使用了lazy。</li>
                            <li>使用BeanFactory对象操作时，在调用getBean方法的时候进行对象的创建。</li>
                            <li>事件传递：通过实现ApplicationContextAware接口</li>
                        </ul>
                        <h2 id="动态代理"><a href="javascript:void(0)" class="anchor">动态代理</a></h2>
                        <p>JDK动态代理和CGLIB动态代理：</p>
                        <p><strong>JDK的动态代理必须指定接口，这些接口都是已经被代理对象实现了的；而CGLIB代理则不需要指定接口。</strong></p>
                        <p>JDK动态代理必须实现InvocationHandler接口，然后通过Proxy.newProxyInstance(ClassLoader loader, Class&lt;?&gt;[] interfaces, InvocationHandler h)获得动态代理对象。 </p>
                        <p>$Proxy11.class</p>
                        <pre><code>public final class $Proxy11 extends Proxy implements UserService {this.s}<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;public&nbsp;final&nbsp;void&nbsp;add()&nbsp;throws&nbsp;&nbsp;{this.s}<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;try&nbsp;{this.s}<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;super.h.invoke(this,&nbsp;m3,&nbsp;(Object[])null);<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}&nbsp;catch&nbsp;(RuntimeException&nbsp;|&nbsp;Error&nbsp;var2)&nbsp;{this.s}<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;throw&nbsp;var2;<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}&nbsp;catch&nbsp;(Throwable&nbsp;var3)&nbsp;{this.s}<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;throw&nbsp;new&nbsp;UndeclaredThrowableException(var3);<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;}<br/>
</code></pre>
                        <p><a href='https://github.com/nick8sky/safekill/tree/master/src/main/java/org/kx/doe/proxy' target='_blank' >https://github.com/nick8sky/safekill/tree/master/src/main/java/org/kx/doe/proxy</a></p>
                        <h3 id="cglib动态代理"><a href="javascript:void(0)" class="anchor">cglib动态代理</a></h3>
                        <p>使用CGLib动态代理，被代理类不需要强制实现接口。</p>
                        <p>CGLib不能对声明为final的方法进行代理，因为CGLib原理是动态生成被代理类的子类。</p>
                        <pre><code>public class UserInterceptor implements MethodInterceptor {this.s}<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;@Override<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;public&nbsp;Object&nbsp;intercept(Object&nbsp;o,&nbsp;Method&nbsp;method,&nbsp;Object[]&nbsp;objects,&nbsp;MethodProxy&nbsp;methodProxy)&nbsp;throws&nbsp;Throwable&nbsp;{this.s}<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;System.out.println(&quot;UserInterceptor,&nbsp;调用开始&nbsp;method:&nbsp;&quot;&nbsp;+&nbsp;method&nbsp;+<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&quot;,&nbsp;methodProxy:&nbsp;&quot;&nbsp;+&nbsp;methodProxy);<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;methodProxy.invokeSuper(o,&nbsp;objects);<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;System.out.println(&quot;UserInterceptor,&nbsp;调用结束&quot;);<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;return&nbsp;null;<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;}<br/>
}<br/>
</code></pre>
                        <p>在JDK动态代理中方法的调用是通过反射来完成的。但是在CGLIB中，方法的调用并不是通过反射来完成的，而是直接对方法进行调用。</p>
                        <p>JDK动态代理
                            代理类与委托类实现同一接口，主要是通过代理类实现InvocationHandler并重写invoke方法来进行动态代理的，在invoke方法中将对方法进行增强处理
                            不需要硬编码接口，代码复用率高
                            只能够代理实现了接口的委托类
                            底层使用反射机制进行方法的调用</p>
                        <p>CGLIB动态代理
                            代理类将委托类作为自己的父类并为其中的非final委托方法创建两个方法，一个是与委托方法签名相同的方法，它在方法中会通过super调用委托方法；另一个是代理类独有的方法。在代理方法中，它会判断是否存在实现了MethodInterceptor接口的对象，若存在则将调用intercept方法对委托方法进行代理
                            可以在运行时对类或者是接口进行增强操作，且委托类无需实现接口
                            不能对final类以及final方法进行代理
                        </p>
                        <h2 id="Spring中的事件Event"><a href="javascript:void(0)" class="anchor">Spring中的事件Event</a></h2>
                        <p>参考：<a href='https://www.cnblogs.com/wangzhongqiu/p/6636208.html' target='_blank' >https://www.cnblogs.com/wangzhongqiu/p/6636208.html</a></p>
                        <pre><code>事件驱动模型也就是我们常说的观察者，或者发布-订阅模型；理解它的几个关键点： <br/>
1.&nbsp;首先是一种对象间的一对多的关系；最简单的如交通信号灯，信号灯是目标（一方），行人注视着信号灯（多方）；&nbsp;<br/>
2.&nbsp;当目标改变（发布），观察者（订阅者）就可以接收到改变；&nbsp;<br/>
3.&nbsp;观察者如何处理（如行人如何走，是快走/慢走/不走，目标不会管的），目标无需干涉；所以就松散耦合了它们之间的关系。<br/>
</code></pre>
                        <p>首先自定义一个事件(信号灯)，需要继承ApplicationEvent类。</p>
                        <pre><code>public class UserEvent extends ApplicationEvent {this.s}<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;private&nbsp;static&nbsp;final&nbsp;long&nbsp;serialVersionUID&nbsp;=&nbsp;1L;<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;private&nbsp;String&nbsp;message;<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;public&nbsp;UserEvent(Object&nbsp;source,&nbsp;String&nbsp;message)&nbsp;{this.s}<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;super(source);<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;this.message&nbsp;=&nbsp;message;<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;}<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;public&nbsp;String&nbsp;getMessage()&nbsp;{this.s}<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;return&nbsp;message;<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;}<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;public&nbsp;void&nbsp;setMessage(String&nbsp;message)&nbsp;{this.s}<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;this.message&nbsp;=&nbsp;message;<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;}<br/>
}<br/>
</code></pre>
                        <p>然后再创建一个监听类，相当于行人，需要实现ApplicationListener接口，并且重写onApplicationEvent方法。</p>
                        <pre><code>@Component<br/>
public&nbsp;class&nbsp;UserEventListener&nbsp;implements&nbsp;ApplicationListener&lt;UserEvent&gt;<br/>
                            {this.s}<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;@Override<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;public&nbsp;void&nbsp;onApplicationEvent(UserEvent&nbsp;applicationEvent)<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;{this.s}<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;System.out.println(new&nbsp;Date()&nbsp;+&quot;---------&quot;+applicationEvent.getClass());<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;}<br/>
}<br/>
</code></pre>
                        <p>触发事件(信号灯)</p>
                        <pre><code>@Slf4j<br/>
@RestController<br/>
@RequestMapping(value&nbsp;=&nbsp;AuthAppAddress.PATH)<br/>
public&nbsp;class&nbsp;UserController&nbsp;extends&nbsp;BaseController&nbsp;{this.s}<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;@Autowired<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;ApplicationContext&nbsp;context;<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;@ApiOperation(&quot;user/message&quot;)<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;@RequestMapping(value&nbsp;=&nbsp;&quot;/user/{this.s}message}&quot;,&nbsp;method&nbsp;=&nbsp;RequestMethod.POST)<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;public&nbsp;RichResult&lt;String&gt;&nbsp;user(@PathVariable(name&nbsp;=&nbsp;&quot;message&quot;)&nbsp;String&nbsp;message&nbsp;)&nbsp;{this.s}<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;context.publishEvent(new&nbsp;UserEvent(this,&nbsp;message));<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;return&nbsp;new&nbsp;RichResult(message);<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;}<br/>
}<br/>
</code></pre>
                        <p>打印：</p>
                        <p>Mon Mar 26 16:36:59 CST 2018---------class com.fulin.auth.service.event.UserEvent</p>
                        <p>&nbsp;</p>
                        <p>Spring的ApplicationContext 提供了支持事件和代码中监听器的功能。</p>
                        <p>我们可以创建bean用来监听在ApplicationContext 中发布的事件。ApplicationEvent类和在ApplicationContext接口中处理的事件，如果一个bean实现了ApplicationListener接口，当一个ApplicationEvent 被发布以后，bean会自动被通知。</p>
                        <pre><code>public class AllApplicationEventListener implements ApplicationListener &lt; ApplicationEvent &gt;<br/>
                            {this.s}<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;@Override<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;public&nbsp;void&nbsp;onApplicationEvent(ApplicationEvent&nbsp;applicationEvent)<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;{this.s}<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;//process&nbsp;event<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;}<br/>
}<br/>
</code></pre>
                        <p>Spring 提供了以下5中标准的事件：</p>
                        <ol>
                            <li><strong>上下文更新事件（ContextRefreshedEvent）</strong>：该事件会在ApplicationContext被初始化或者更新时发布。也可以在调用ConfigurableApplicationContext 接口中的refresh()方法时被触发。</li>
                            <li><strong>上下文开始事件（ContextStartedEvent）</strong>：当容器调用ConfigurableApplicationContext的Start()方法开始/重新开始容器时触发该事件。</li>
                            <li><strong>上下文停止事件（ContextStoppedEvent）</strong>：当容器调用ConfigurableApplicationContext的Stop()方法停止容器时触发该事件。</li>
                            <li><strong>上下文关闭事件（ContextClosedEvent）</strong>：当ApplicationContext被关闭时触发该事件。容器被关闭时，其管理的所有单例Bean都被销毁。</li>
                            <li><strong>请求处理事件（RequestHandledEvent）</strong>：在Web应用中，当一个http请求（request）结束触发该事件。</li>
                        </ol>
                        <p>应用场景：很多时候我们想要在某个类加载完毕时干某件事情，但是使用了spring管理对象，我们这个类引用了其他类（可能是更复杂的关联），所以当我们去使用这个类做事情时发现包空指针错误，这是因为我们这个类有可能已经初始化完成，但是引用的其他类不一定初始化完成，所以发生了空指针错误，解决方案如下： </p>
                        <pre><code>@Component<br/>
public&nbsp;class&nbsp;AllApplicationEventListener&nbsp;implements&nbsp;ApplicationListener&lt;ContextRefreshedEvent&gt;<br/>
                            {this.s}<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;@Autowired<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;OperMapper&nbsp;operMapper;<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;@Override<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;public&nbsp;void&nbsp;onApplicationEvent(ContextRefreshedEvent&nbsp;applicationEvent)<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;{this.s}<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;operMapper.deleteById(1l);<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;}<br/>
}<br/>
</code></pre>
                        <p>比如mq消费端要其他bean都启动好之后，才能进行hander中的处理方法。</p>
                        <p>后续研究：
                            applicationontext和使用MVC之后的webApplicationontext会两次调用上面的方法，如何区分这个两种容器呢？ </p>
                        <p>但是这个时候，会存在一个问题，在web 项目中（spring mvc），系统会存在两个容器，一个是root application context ,另一个就是我们自己的 projectName-servlet context（作为root application context的子容器）。 </p>
                        <p>这种情况下，就会造成onApplicationEvent方法被执行两次。为了避免上面提到的问题，我们可以只在root application context初始化完成后调用逻辑代码，其他的容器的初始化完成，则不做任何处理，修改后代码 </p>
                        <p>如下： </p>
                        <pre><code>@Override<br/>
public&nbsp;void&nbsp;onApplicationEvent(ContextRefreshedEvent&nbsp;applicationEvent)<br/>
                            {this.s}<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;if(applicationEvent.getApplicationContext().getParent()&nbsp;==&nbsp;null){this.s}<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;//root&nbsp;application&nbsp;context&nbsp;没有parent，他就是老大.<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;//需要执行的逻辑代码，当spring容器初始化完成后就会执行该方法。<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;System.out.println(&quot;====&gt;&quot;+applicationEvent.getApplicationContext().getDisplayName()&nbsp;);<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;operMapper.deleteById(1l);<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;System.out.println(new&nbsp;Date()&nbsp;+&quot;----ContextRefreshedEvent-----&quot;+applicationEvent.getClass());<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;System.out.println(&quot;spring容易初始化完毕================================================&quot;);<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;}else&nbsp;{this.s}<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;System.out.println(&quot;====&gt;&quot;+applicationEvent.getApplicationContext().getParent().getClass().getSimpleName()&nbsp;);<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;System.out.println(&quot;====&gt;&quot;+applicationEvent.getApplicationContext().getParent().getDisplayName()&nbsp;);<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;System.out.println(&quot;====&gt;&quot;+applicationEvent.getApplicationContext().getDisplayName()&nbsp;);<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;}<br/>
}<br/>
</code></pre>
                        <p>====&gt;AnnotationConfigApplicationContext
                            ====&gt;org.springframework.context.annotation.AnnotationConfigApplicationContext@3a6df776
                            ====&gt;org.springframework.boot.context.embedded.AnnotationConfigEmbeddedWebApplicationContext@33e196a</p>
                        <h2 id="BeanFactory 和FactoryBean的区别"><a href="javascript:void(0)" class="anchor">BeanFactory 和FactoryBean的区别</a></h2>
                        <h3 id="BeanFactory"><a href="javascript:void(0)" class="anchor">BeanFactory</a></h3>
                        <p>    BeanFactory定义了 IOC 容器的最基本形式，并提供了 IOC 容器应遵守的的最基本的接口，也就是Spring IOC 所遵守的最底层和最基本的编程规范。在  Spring 代码中， BeanFactory 只是个接口，并不是 IOC容器的具体实现，但是 Spring 容器给出了很多种实现，如 DefaultListableBeanFactory 、 XmlBeanFactory 、ApplicationContext 等，都是附加了某种功能的实现。</p>
                        <h3 id="FactoryBean"><a href="javascript:void(0)" class="anchor">FactoryBean</a></h3>
                        <p>    一般情况下，Spring 通过反射机制利用bean的 class 属性指定实现类实例化 Bean ，在某些情况下，实例化 Bean 过程比较复杂，如果按照传统的方式，则需要在 &lt;bean> 中提供大量的配置信息。配置方式的灵活性是受限的，这时采用编码的方式可能会得到一个简单的方案。 Spring 为此提供了一个org.springframework.bean.factory.FactoryBean 的工厂类接口，用户可以通过实现该接口定制实例化 Bean 的逻辑。</p>
                        <p>FactoryBean接口对于 Spring 框架来说占用重要的地位， Spring 自身就提供了 70 多个 FactoryBean 的实现。它们隐藏了实例化一些复杂 Bean 的细节，给上层应用带来了便利。从 Spring 3.0 开始， FactoryBean 开始支持泛型，即接口声明改为 FactoryBean&lt;T> 的形式。</p>
                        <p>BeanFactory是个 Factory ，也就是 IOC 容器或对象工厂， FactoryBean 是个 Bean 。在 Spring 中，所有的 Bean 都是由 BeanFactory( 也就是 IOC 容器 ) 来进行管理的。但对 FactoryBean 而言，这个 Bean 不是简单的 Bean ，而是一个能生产或者修饰对象生成的工厂 Bean, 它的实现与设计模式中的工厂模式和修饰器模式类似。</p>
                        <p>&nbsp;</p>
                        <p>问：Spring框架中的单例Beans是线程安全的么？</p>
                        <p>答：本身单例也不是安全的，所以spring单例也不是线程安全的。</p>
                    </Col>
                    <Col span={1}>
                    </Col>
                    <Col span={4}>
                        <Anchor showInkInFixed="true">
                            <Link href="#面向对象设计的七大原则" title="面向对象设计的七大原则"/>
                            <Link href="#ApplicationContext和BeanFactory的区别" title="ApplicationContext和BeanFactory的区别"/>
                            <Link href="#动态代理" title="动态代理"/>
                            <Link href="#cglib动态代理" title="cglib动态代理"/>
                            <Link href="#Spring中的事件Event" title="Spring中的事件Event"/>
                            <Link href="#BeanFactory 和FactoryBean的区别" title="BeanFactory 和FactoryBean的区别">
                            <Link href="#BeanFactory" title="BeanFactory"/>
                            <Link href="#FactoryBean" title="FactoryBean"/>
                            </Link>
                        </Anchor>
                    </Col>
                </Row>


            </div>

        );
    }
}

export default Design6;
