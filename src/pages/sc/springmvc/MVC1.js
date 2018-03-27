import React, {Component} from 'react';
import {Anchor, Row, Col} from 'antd';


const {Link} = Anchor;


class MVC1 extends Component {

    s = "{";
    render() {

        return (
            <div>
                <Row>
                    <Col span={19}>
                        <h2 id="SpringMVC"><a href="javascript:void(0)" class="anchor">SpringMVC</a></h2>
                    <p>在Web应用程序设计中，MVC模式已经被广泛使用。SpringMVC以DispatcherServlet为核心，负责协调和组织不同组件以完成请求处理并返回响应的工作，实现了MVC模式。想要实现自己的SpringMVC框架，需要从以下几点入手：</p>
                    <p>       一、了解SpringMVC运行流程及九大组件</p>
                    <p>       二、梳理自己的SpringMVC的设计思路</p>
                    <p>       三、实现自己的SpringMVC框架</p>
                    <h3 id="SpringMVC的运行流程"><a href="javascript:void(0)" class="anchor">SpringMVC的运行流程</a></h3>
                    <p><img src={require('../../../imgs/springmvc/s1.png' )}/></p>
                    <p>        ⑴ 用户发送请求至前端控制器DispatcherServlet</p>
                    <p>       ⑵ DispatcherServlet收到请求调用HandlerMapping处理器映射器。</p>
                    <p>       ⑶ 处理器映射器根据请求url找到具体的处理器，生成处理器对象及处理器拦截器(如果有则生成)一并返回给DispatcherServlet。</p>
                    <p>       ⑷ DispatcherServlet通过HandlerAdapter处理器适配器调用处理器</p>
                    <p>       ⑸ 执行处理器(Controller，也叫后端控制器)。</p>
                    <p>       ⑹ Controller执行完成返回ModelAndView</p>
                    <p>       ⑺ HandlerAdapter将controller执行结果ModelAndView返回给DispatcherServlet</p>
                    <p>       ⑻ DispatcherServlet将ModelAndView传给ViewReslover视图解析器</p>
                    <p>       ⑼ ViewReslover解析后返回具体View</p>
                    <p>       ⑽ DispatcherServlet对View进行渲染视图（即将模型数据填充至视图中）。</p>
                    <p>       ⑾ DispatcherServlet响应用户。</p>
                    <p>       从上面可以看出，DispatcherServlet有接收请求，响应结果，转发等作用。有了DispatcherServlet之后，可以减少组件之间的耦合度。</p>
                    <h3 id="SpringMVC的设计思路"><a href="javascript:void(0)" class="anchor">SpringMVC的设计思路</a></h3>
                    <p><img src={require('../../../imgs/springmvc/s2.png' )}/></p>
                    <p>从图中可以看出，SpringMVC本质上是一个Servlet,这个 Servlet 继承自 HttpServlet。FrameworkServlet负责初始化SpringMVC的容器，并将Spring容器设置为父容器。因为本文只是实现SpringMVC，对于Spring容器不做过多讲解。</p>
                    <p>为了读取web.xml中的配置，我们用到ServletConfig这个类，它代表当前Servlet在web.xml中的配置信息。通过web.xml中加载我们自己写的MyDispatcherServlet和读取配置文件。</p>
                    <h3 id="实现自己的SpringMVC框架"><a href="javascript:void(0)" class="anchor">实现自己的SpringMVC框架</a></h3>
                    <p><a href='https://github.com/nick8sky/mvc' target='_blank' >https://github.com/nick8sky/mvc</a></p>
                    <p>工程文件及目录：</p>
                    <p><img src={require('../../../imgs/springmvc/s3.png' )}/></p>
                    <p>DispatcherServlet这个类，去继承HttpServlet，重写init方法、doGet、doPost方法，以及构建url-&gt;bean-&gt;method的映射。</p>
                    <pre><code>import org.kx.web.annotation.Dispather;<br/>
import&nbsp;org.kx.web.annotation.RequestMapping;<br/>
import&nbsp;javax.servlet.ServletConfig;<br/>
import&nbsp;javax.servlet.ServletException;<br/>
import&nbsp;javax.servlet.http.HttpServlet;<br/>
import&nbsp;javax.servlet.http.HttpServletRequest;<br/>
import&nbsp;javax.servlet.http.HttpServletResponse;<br/>
import&nbsp;java.io.File;<br/>
import&nbsp;java.io.IOException;<br/>
import&nbsp;java.lang.reflect.Method;<br/>
import&nbsp;java.net.URL;<br/>
import&nbsp;java.util.*;<br/>
                            /**<br/>
                            &nbsp;*&nbsp;create&nbsp;by&nbsp;sunkx&nbsp;on&nbsp;2018/3/25<br/>
                            &nbsp;*/<br/>
public&nbsp;class&nbsp;DispatcherServlet&nbsp;extends&nbsp;HttpServlet{this.s}<br/>
                        &nbsp;&nbsp;&nbsp;&nbsp;private&nbsp;List&lt;String&gt;&nbsp;classNames&nbsp;=&nbsp;new&nbsp;ArrayList&lt;&gt;();<br/>
                        &nbsp;&nbsp;&nbsp;&nbsp;private&nbsp;Map&lt;String,&nbsp;Object&gt;&nbsp;beans&nbsp;=&nbsp;new&nbsp;HashMap&lt;&gt;();<br/>
                        &nbsp;&nbsp;&nbsp;&nbsp;private&nbsp;Map&lt;String,&nbsp;Method&gt;&nbsp;urlMethodMapping&nbsp;=&nbsp;new&nbsp;&nbsp;HashMap&lt;&gt;();<br/>
                        &nbsp;&nbsp;&nbsp;&nbsp;private&nbsp;Map&lt;String,&nbsp;Object&gt;&nbsp;urlBeanMapping&nbsp;&nbsp;=new&nbsp;HashMap&lt;&gt;();<br/>
                        &nbsp;&nbsp;&nbsp;&nbsp;@Override<br/>
                        &nbsp;&nbsp;&nbsp;&nbsp;public&nbsp;void&nbsp;init(ServletConfig&nbsp;config)&nbsp;throws&nbsp;ServletException&nbsp;{this.s}<br/>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;//2.扫描controller&nbsp;下的class<br/>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;doScanner(&quot;org.kx.web.controller&quot;);<br/>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;//3.拿到扫描到的类,通过反射机制,实例化,并且放到ioc容器中(k-v&nbsp;&nbsp;beanName-bean)&nbsp;beanName默认是首字母小写<br/>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;makeInstance();<br/>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;//4.初始化HandlerMapping(将url和method对应上)<br/>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;initHandlerMapping();<br/>
                        &nbsp;&nbsp;&nbsp;&nbsp;}<br/>
                        &nbsp;&nbsp;&nbsp;&nbsp;private&nbsp;void&nbsp;doScanner(String&nbsp;packageName)&nbsp;{this.s}<br/>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;//把所有的.替换成/<br/>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;URL&nbsp;url&nbsp;&nbsp;=this.getClass().getClassLoader().getResource(&quot;/&quot;+packageName.replaceAll(&quot;\\.&quot;,&nbsp;&quot;/&quot;));<br/>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;File&nbsp;dir&nbsp;=&nbsp;new&nbsp;File(url.getFile());<br/>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;for&nbsp;(File&nbsp;file&nbsp;:&nbsp;dir.listFiles())&nbsp;{this.s}<br/>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;if(file.isDirectory()){this.s}<br/>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;//递归读取包<br/>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;doScanner(packageName+&quot;.&quot;+file.getName());<br/>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}else{this.s}<br/>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;String&nbsp;className&nbsp;=packageName&nbsp;+&quot;.&quot;&nbsp;+file.getName().replace(&quot;.class&quot;,&nbsp;&quot;&quot;);<br/>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;classNames.add(className);<br/>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br/>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br/>
                        &nbsp;&nbsp;&nbsp;&nbsp;}<br/>
                        &nbsp;&nbsp;&nbsp;&nbsp;private&nbsp;void&nbsp;makeInstance()&nbsp;{this.s}<br/>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;if&nbsp;(classNames.isEmpty())&nbsp;{this.s}<br/>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;return;<br/>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br/>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;for&nbsp;(String&nbsp;className&nbsp;:&nbsp;classNames)&nbsp;{this.s}<br/>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;try&nbsp;{this.s}<br/>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;//把类搞出来,反射来实例化(只有加@MyController需要实例化)<br/>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Class&lt;?&gt;&nbsp;clazz&nbsp;=Class.forName(className);<br/>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;if(clazz.isAnnotationPresent(Dispather.class)){this.s}<br/>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;System.out.println(&quot;------&quot;);<br/>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;beans.put(toLowerFirstWord(clazz.getSimpleName()),clazz.newInstance());<br/>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}else{this.s}<br/>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;System.out.println(&quot;=======&quot;);<br/>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;continue;<br/>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br/>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}&nbsp;catch&nbsp;(Exception&nbsp;e)&nbsp;{this.s}<br/>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;e.printStackTrace();<br/>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;continue;<br/>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br/>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br/>
                        &nbsp;&nbsp;&nbsp;&nbsp;}<br/>
                        &nbsp;&nbsp;&nbsp;&nbsp;private&nbsp;void&nbsp;initHandlerMapping(){this.s}<br/>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;if(beans.isEmpty()){this.s}<br/>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;return;<br/>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br/>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;try&nbsp;{this.s}<br/>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;for&nbsp;(Map.Entry&lt;String,&nbsp;Object&gt;&nbsp;entry:&nbsp;beans.entrySet())&nbsp;{this.s}<br/>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Class&lt;?&nbsp;extends&nbsp;Object&gt;&nbsp;clazz&nbsp;=&nbsp;entry.getValue().getClass();<br/>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;if(!clazz.isAnnotationPresent(Dispather.class)){this.s}<br/>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;continue;<br/>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br/>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;//拼url时,是controller头的url拼上方法上的url<br/>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;String&nbsp;baseUrl&nbsp;=&quot;&quot;;<br/>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;if(clazz.isAnnotationPresent(RequestMapping.class)){this.s}<br/>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;RequestMapping&nbsp;annotation&nbsp;=&nbsp;clazz.getAnnotation(RequestMapping.class);<br/>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;baseUrl=annotation.value();<br/>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;if(!baseUrl.startsWith(&quot;/&quot;)){this.s}<br/>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;baseUrl&nbsp;=&nbsp;&quot;/&quot;+baseUrl;<br/>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br/>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br/>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Method[]&nbsp;methods&nbsp;=&nbsp;clazz.getMethods();<br/>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;for&nbsp;(Method&nbsp;method&nbsp;:&nbsp;methods)&nbsp;{this.s}<br/>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;if(!method.isAnnotationPresent(RequestMapping.class)){this.s}<br/>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;continue;<br/>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br/>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;RequestMapping&nbsp;annotation&nbsp;=&nbsp;method.getAnnotation(RequestMapping.class);<br/>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;String&nbsp;url&nbsp;=&nbsp;annotation.value();<br/>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;url&nbsp;=(baseUrl+&quot;/&quot;+url).replaceAll(&quot;/+&quot;,&nbsp;&quot;/&quot;);<br/>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;urlMethodMapping.put(url,method);<br/>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;urlBeanMapping.put(url,entry.getValue());<br/>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br/>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br/>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}&nbsp;catch&nbsp;(Exception&nbsp;e)&nbsp;{this.s}<br/>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;e.printStackTrace();<br/>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br/>
                        &nbsp;&nbsp;&nbsp;&nbsp;}<br/>
                        &nbsp;&nbsp;&nbsp;&nbsp;/**<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;*&nbsp;把字符串的首字母小写<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;*/<br/>
                        &nbsp;&nbsp;&nbsp;&nbsp;private&nbsp;String&nbsp;toLowerFirstWord(String&nbsp;name){this.s}<br/>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;char[]&nbsp;charArray&nbsp;=&nbsp;name.toCharArray();<br/>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;charArray[0]&nbsp;+=&nbsp;32;<br/>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;return&nbsp;String.valueOf(charArray);<br/>
                        &nbsp;&nbsp;&nbsp;&nbsp;}<br/>
                        &nbsp;&nbsp;&nbsp;&nbsp;@Override<br/>
                        &nbsp;&nbsp;&nbsp;&nbsp;protected&nbsp;void&nbsp;doGet(HttpServletRequest&nbsp;req,&nbsp;HttpServletResponse&nbsp;resp)&nbsp;throws&nbsp;ServletException,&nbsp;IOException&nbsp;{this.s}<br/>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;this.doDispatch(req,resp);<br/>
                        &nbsp;&nbsp;&nbsp;&nbsp;}<br/>
                        &nbsp;&nbsp;&nbsp;&nbsp;@Override<br/>
                        &nbsp;&nbsp;&nbsp;&nbsp;protected&nbsp;void&nbsp;doPost(HttpServletRequest&nbsp;req,&nbsp;HttpServletResponse&nbsp;resp)&nbsp;throws&nbsp;ServletException,&nbsp;IOException&nbsp;{this.s}<br/>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;doDispatch(req,resp);<br/>
                        &nbsp;&nbsp;&nbsp;&nbsp;}<br/>
                        &nbsp;&nbsp;&nbsp;&nbsp;private&nbsp;void&nbsp;doDispatch(HttpServletRequest&nbsp;req,&nbsp;HttpServletResponse&nbsp;resp)&nbsp;{this.s}<br/>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;try&nbsp;{this.s}<br/>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;if&nbsp;(urlMethodMapping.isEmpty())&nbsp;{this.s}<br/>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;return;<br/>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br/>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;String&nbsp;url&nbsp;=&nbsp;req.getRequestURI();<br/>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;String&nbsp;contextPath&nbsp;=&nbsp;req.getContextPath();<br/>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;url&nbsp;=&nbsp;url.replace(contextPath,&nbsp;&quot;&quot;).replaceAll(&quot;/+&quot;,&nbsp;&quot;/&quot;);<br/>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;if&nbsp;(!this.urlMethodMapping.containsKey(url))&nbsp;{this.s}<br/>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;resp.getWriter().write(&quot;404&nbsp;NOT&nbsp;FOUND!&quot;);<br/>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;return;<br/>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br/>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Method&nbsp;method&nbsp;=&nbsp;this.urlMethodMapping.get(url);<br/>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;//获取方法的参数列表<br/>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Class&lt;?&gt;[]&nbsp;parameterTypes&nbsp;=&nbsp;method.getParameterTypes();<br/>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;//获取请求的参数<br/>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Map&lt;String,&nbsp;String[]&gt;&nbsp;parameterMap&nbsp;=&nbsp;req.getParameterMap();<br/>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;//保存参数值<br/>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Object[]&nbsp;paramValues&nbsp;=&nbsp;new&nbsp;Object[parameterTypes.length];<br/>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;//方法的参数列表<br/>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;for&nbsp;(int&nbsp;i&nbsp;=&nbsp;0;&nbsp;i&nbsp;&lt;&nbsp;parameterTypes.length;&nbsp;i++)&nbsp;{this.s}<br/>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;//根据参数名称，做某些处理<br/>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;String&nbsp;requestParam&nbsp;=&nbsp;parameterTypes[i].getSimpleName();<br/>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;if&nbsp;(requestParam.equals(&quot;HttpServletRequest&quot;))&nbsp;{this.s}<br/>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;//参数类型已明确，这边强转类型&nbsp;&nbsp;&nbsp;，将HttpServletRequest作为参数<br/>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;paramValues[i]&nbsp;=&nbsp;req;<br/>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;continue;<br/>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br/>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;if&nbsp;(requestParam.equals(&quot;HttpServletResponse&quot;))&nbsp;{this.s}<br/>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;//HttpServletResponse作为参数<br/>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;paramValues[i]&nbsp;=&nbsp;resp;<br/>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;continue;<br/>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br/>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;if&nbsp;(requestParam.equals(&quot;String&quot;))&nbsp;{this.s}<br/>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;for&nbsp;(Map.Entry&lt;String,&nbsp;String[]&gt;&nbsp;param&nbsp;:&nbsp;parameterMap.entrySet())&nbsp;{this.s}<br/>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;String&nbsp;value&nbsp;=&nbsp;Arrays.toString(param.getValue()).replaceAll(&quot;\\[|\\]&quot;,&nbsp;&quot;&quot;).replaceAll(&quot;,\\s&quot;,&nbsp;&quot;,&quot;);<br/>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;paramValues[i]&nbsp;=&nbsp;value;<br/>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br/>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br/>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br/>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;//利用反射机制来调用<br/>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;try&nbsp;{this.s}<br/>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;method.invoke(this.urlBeanMapping.get(url),&nbsp;paramValues);//第一个参数是method所对应的实例&nbsp;在ioc容器中<br/>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}&nbsp;catch&nbsp;(Exception&nbsp;e)&nbsp;{this.s}<br/>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;e.printStackTrace();<br/>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br/>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}&nbsp;catch&nbsp;(Exception&nbsp;e)&nbsp;{this.s}<br/>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;e.printStackTrace();<br/>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br/>
                        &nbsp;&nbsp;&nbsp;&nbsp;}<br/>
}<br/>
</code></pre>
                    <p>使用tomcat启动：</p>
                    <p><img src={require('../../../imgs/springmvc/s4.png' )}/></p>
                    <p>&nbsp;</p>

                    </Col>
                    <Col span={1}>
                    </Col>
                    <Col span={4}>
                        <Anchor showInkInFixed="true">
                            <Link href="#SpringMVC" title="SpringMVC">
                            <Link href="#SpringMVC的运行流程" title="SpringMVC的运行流程"/>
                            <Link href="#SpringMVC的设计思路" title="SpringMVC的设计思路"/>
                            <Link href="#实现自己的SpringMVC框架" title="实现自己的SpringMVC框架"/>
                            </Link>
                        </Anchor>
                    </Col>
                </Row>


            </div>

        );
    }
}

export default MVC1;
