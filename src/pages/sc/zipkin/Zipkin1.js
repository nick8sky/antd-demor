import React, {Component} from 'react';
import {Anchor, Row, Col} from 'antd';


const {Link} = Anchor;


class ASK1 extends Component {

    s = "{";
    render() {

        return (
            <div>
                <Row>
                    <Col span={19}>

                        <p>zipkin为分布式链路调用监控系统，聚合各业务系统调用延迟数据，达到链路调用监控跟踪。</p>
                        <p>参考：<a href='http://blog.csdn.net/liaokailin/article/details/52077620' target='_blank' >http://blog.csdn.net/liaokailin/article/details/52077620</a></p>
                        <h2 id="architecture"><a href="javascript:void(0)" class="anchor">architecture</a></h2>
                        <p><img src='https://raw.githubusercontent.com/liaokailin/pic-repo/master/slow-service.png' alt='' /></p>
                        <p>如图，在复杂的调用链路中假设存在一条调用链路响应缓慢，如何定位其中延迟高的服务呢？</p>
                        <ul>
                            <li>日志： 通过分析调用链路上的每个服务日志得到结果</li>
                            <li>zipkin：使用zipkin的web UI可以一眼看出延迟高的服务</li>
                        </ul>
                        <p><img src='http://zipkin.io/public/img/architecture-1.png' alt='' /></p>
                        <p>如图所示，各业务系统在彼此调用时，将特定的跟踪消息传递至zipkin,zipkin在收集到跟踪信息后将其聚合处理、存储、展示等，用户可通过web UI方便
                            获得网络延迟、调用链路、系统依赖等等。</p>
                        <p>&nbsp;</p>
                        <p>zipkin主要涉及四个组件 collector /storage/ search/ web UI</p>
                        <ul>
                            <li><code>Collector</code>接收各service传输的数据</li>
                            <li><code>Cassandra</code>作为<code>Storage</code>的一种，也可以是mysql等，默认存储在内存中，配置<code>cassandra</code>可以参考<a href='https://github.com/openzipkin/zipkin-dependencies'>这里</a></li>
                            <li><code>Query</code>负责查询<code>Storage</code>中存储的数据,提供简单的<code>JSON API</code>获取数据，主要提供给<code>web UI</code>使用</li>
                            <li>Web 提供简单的web界面</li>
                        </ul>
                        <h2 id="install"><a href="javascript:void(0)" class="anchor">install</a></h2>
                        <p>执行如下命令下载jar包</p>
                        <pre><code>wget -O zipkin.jar &#39;https://search.maven.org/remote_content?g=io.zipkin.java&amp;a=zipkin-server&amp;v=LATEST&amp;c=exec&#39;<br/>
</code></pre>
                        <p>其为一个spring boot 工程，直接运行jar</p>
                        <pre><code>nohup java -jar zipkin.jar &amp; <br/>
</code></pre>
                        <p>访问 <a href='http://localhost:9411' target='_blank' >http://localhost:9411</a></p>
                        <p><img src='https://raw.githubusercontent.com/liaokailin/pic-repo/master/zipkin-web-ui.png' alt='' /></p>
                        <h2 id="terminology术语"><a href="javascript:void(0)" class="anchor">terminology术语</a></h2>
                        <p>使用zipkin涉及几个概念</p>
                        <ul>
                            <li><p><code>Span</code>:基本工作单元，一次链路调用(可以是RPC，DB等没有特定的限制)创建一个<code>span</code>，通过一个64位ID标识它，
                                <code>span</code>通过还有其他的数据，例如描述信息，时间戳，key-value对的(Annotation)tag信息，<code>parent-id</code>等,其中<code>parent-id</code>
                                可以表示<code>span</code>调用链路来源，通俗的理解<code>span</code>就是一次请求信息</p>
                            </li>
                            <li><p><code>Trace</code>:类似于树结构的<code>Span</code>集合，表示一条调用链路，存在唯一标识</p>
                            </li>
                            <li><p>Annotation: 注解,用来记录请求特定事件相关信息(例如时间)，通常包含四个注解信息</p>
                            </li>
                            <li><p>BinaryAnnotation:提供一些额外信息，一般已key-value对出现</p>
                                <p>概念说完，来看下完整的调用链路 </p>
                            </li>
                        </ul>
                        <p><img src='https://raw.githubusercontent.com/spring-cloud/spring-cloud-sleuth/master/docs/src/main/asciidoc/images/trace-id.png' alt='' /></p>
                        <p>上图表示一请求链路，一条链路通过Trace Id唯一标识，Span标识发起的请求信息，各span通过parent id 关联起来，如图 </p>
                        <p><img src='https://raw.githubusercontent.com/spring-cloud/spring-cloud-sleuth/master/docs/src/main/asciidoc/images/parents.png' alt='' /></p>
                        <p>整个链路的依赖关系如下: </p>
                        <p><img src='https://raw.githubusercontent.com/spring-cloud/spring-cloud-sleuth/master/docs/src/main/asciidoc/images/dependencies.png' alt='' /></p>
                        <p>完成链路调用的记录后，如何来计算调用的延迟呢，这就需要利用Annotation信息</p>
                        <p><img src='https://raw.githubusercontent.com/liaokailin/pic-repo/master/zipkin-annotation.png' alt='' /></p>
                        <pre><code>cs - Client Start,表示客户端发起请求<br/>
sr&nbsp;-&nbsp;Server&nbsp;Receive,表示服务端收到请求<br/>
ss&nbsp;-&nbsp;Server&nbsp;Send,表示服务端完成处理，并将结果发送给客户端<br/>
cr&nbsp;-&nbsp;Client&nbsp;Received,表示客户端获取到服务端返回信息<br/>
sr-cs&nbsp;得到请求发出延迟<br/>
ss-sr&nbsp;得到服务端处理延迟<br/>
cr-cs&nbsp;得到真个链路完成延迟<br/>
</code></pre>
                        <p>&nbsp;</p>
                        <h2 id="brave"><a href="javascript:void(0)" class="anchor">brave</a></h2>
                        <p>作为各调用链路，只需要负责将指定格式的数据发送给zipkin即可，利用brave可快捷完成操作。</p>
                        <p>首先导入jar包pom.xml</p>
                        <pre><code>parent&gt;<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;groupId&gt;org.springframework.boot&lt;/groupId&gt;<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;artifactId&gt;spring-boot-starter-parent&lt;/artifactId&gt;<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;version&gt;1.3.6.RELEASE&lt;/version&gt;<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&lt;/parent&gt;<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&lt;!--&nbsp;https://mvnrepository.com/artifact/io.zipkin.brave/brave-core&nbsp;--&gt;<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&lt;dependencies&gt;<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;dependency&gt;<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;groupId&gt;org.springframework.boot&lt;/groupId&gt;<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;artifactId&gt;spring-boot-starter-web&lt;/artifactId&gt;<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/dependency&gt;<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;dependency&gt;<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;groupId&gt;org.springframework.boot&lt;/groupId&gt;<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;artifactId&gt;spring-boot-starter-aop&lt;/artifactId&gt;<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/dependency&gt;<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;dependency&gt;<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;groupId&gt;org.springframework.boot&lt;/groupId&gt;<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;artifactId&gt;spring-boot-starter-actuator&lt;/artifactId&gt;<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/dependency&gt;<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;dependency&gt;<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;groupId&gt;io.zipkin.brave&lt;/groupId&gt;<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;artifactId&gt;brave-core&lt;/artifactId&gt;<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;version&gt;3.9.0&lt;/version&gt;<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/dependency&gt;<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;!--&nbsp;https://mvnrepository.com/artifact/io.zipkin.brave/brave-http&nbsp;--&gt;<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;dependency&gt;<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;groupId&gt;io.zipkin.brave&lt;/groupId&gt;<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;artifactId&gt;brave-http&lt;/artifactId&gt;<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;version&gt;3.9.0&lt;/version&gt;<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/dependency&gt;<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;dependency&gt;<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;groupId&gt;io.zipkin.brave&lt;/groupId&gt;<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;artifactId&gt;brave-spancollector-http&lt;/artifactId&gt;<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;version&gt;3.9.0&lt;/version&gt;<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/dependency&gt;<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;dependency&gt;<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;groupId&gt;io.zipkin.brave&lt;/groupId&gt;<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;artifactId&gt;brave-web-servlet-filter&lt;/artifactId&gt;<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;version&gt;3.9.0&lt;/version&gt;<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/dependency&gt;<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;dependency&gt;<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;groupId&gt;io.zipkin.brave&lt;/groupId&gt;<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;artifactId&gt;brave-okhttp&lt;/artifactId&gt;<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;version&gt;3.9.0&lt;/version&gt;<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/dependency&gt;<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;!--&nbsp;https://mvnrepository.com/artifact/org.slf4j/slf4j-api&nbsp;--&gt;<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;dependency&gt;<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;groupId&gt;org.slf4j&lt;/groupId&gt;<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;artifactId&gt;slf4j-api&lt;/artifactId&gt;<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;version&gt;1.7.13&lt;/version&gt;<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/dependency&gt;<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;dependency&gt;<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;groupId&gt;org.apache.httpcomponents&lt;/groupId&gt;<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;artifactId&gt;httpclient&lt;/artifactId&gt;<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;version&gt;4.5.1&lt;/version&gt;<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/dependency&gt;<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&lt;/dependencies&gt;<br/>
</code></pre>
                        <p>&nbsp;</p>
                        <p>建立controller对外提供服务</p>
                        <p>HomeController.java</p>
                        <pre><code>@RestController<br/>
@RequestMapping(&quot;/&quot;)<br/>
public&nbsp;class&nbsp;HomeController&nbsp;{this.s}<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;@Autowired<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;private&nbsp;OkHttpClient&nbsp;client;<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;private&nbsp;&nbsp;Random&nbsp;random&nbsp;=&nbsp;new&nbsp;Random();<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;@RequestMapping(&quot;start&quot;)<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;public&nbsp;String&nbsp;start()&nbsp;throws&nbsp;InterruptedException,&nbsp;IOException&nbsp;{this.s}<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;int&nbsp;sleep=&nbsp;random.nextInt(100);<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;TimeUnit.MILLISECONDS.sleep(sleep);<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Request&nbsp;request&nbsp;=&nbsp;new&nbsp;Request.Builder().url(&quot;http://localhost:9090/foo&quot;).get().build();<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Response&nbsp;response&nbsp;=&nbsp;client.newCall(request).execute();<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;return&nbsp;&quot;&nbsp;[service1&nbsp;sleep&nbsp;&quot;&nbsp;+&nbsp;sleep+&quot;&nbsp;ms]&quot;&nbsp;+&nbsp;response.body().toString();<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;}<br/>
</code></pre>
                        <p>HomeController中利用OkHttpClient调用发起http请求。在每次发起请求时则需要通过brave记录Span信息，并异步传递给zipkin
                            作为被调用方(服务端)也同样需要完成以上操作.</p>
                        <p>ZipkinConfig.java</p>
                        <pre><code>@Configuration<br/>
public&nbsp;class&nbsp;ZipkinConfig&nbsp;{this.s}<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;@Autowired<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;private&nbsp;ZipkinProperties&nbsp;properties;<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;@Bean<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;public&nbsp;SpanCollector&nbsp;spanCollector()&nbsp;{this.s}<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;HttpSpanCollector.Config&nbsp;config&nbsp;=&nbsp;HttpSpanCollector.Config.builder().connectTimeout(properties.getConnectTimeout()).readTimeout(properties.getReadTimeout())<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;.compressionEnabled(properties.isCompressionEnabled()).flushInterval(properties.getFlushInterval()).build();<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;return&nbsp;HttpSpanCollector.create(properties.getUrl(),&nbsp;config,&nbsp;new&nbsp;EmptySpanCollectorMetricsHandler());<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;}<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;@Bean<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;public&nbsp;Brave&nbsp;brave(SpanCollector&nbsp;spanCollector){this.s}<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Brave.Builder&nbsp;builder&nbsp;=&nbsp;new&nbsp;Brave.Builder(properties.getServiceName());&nbsp;&nbsp;//指定state<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;builder.spanCollector(spanCollector);<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;builder.traceSampler(Sampler.ALWAYS_SAMPLE);<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Brave&nbsp;brave&nbsp;=&nbsp;builder.build();<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;return&nbsp;brave;<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;}<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;@Bean<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;public&nbsp;BraveServletFilter&nbsp;braveServletFilter(Brave&nbsp;brave){this.s}<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;BraveServletFilter&nbsp;filter&nbsp;=&nbsp;new&nbsp;BraveServletFilter(brave.serverRequestInterceptor(),brave.serverResponseInterceptor(),new&nbsp;DefaultSpanNameProvider());<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;return&nbsp;filter;<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;}<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;@Bean<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;public&nbsp;OkHttpClient&nbsp;okHttpClient(Brave&nbsp;brave){this.s}<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;OkHttpClient&nbsp;client&nbsp;=&nbsp;new&nbsp;OkHttpClient.Builder()<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;.addInterceptor(new&nbsp;BraveOkHttpRequestResponseInterceptor(brave.clientRequestInterceptor(),&nbsp;brave.clientResponseInterceptor(),&nbsp;new&nbsp;DefaultSpanNameProvider()))<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;.build();<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;return&nbsp;client;<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;}<br/>
}<br/>
</code></pre>
                        <ul>
                            <li>SpanCollector 配置收集器</li>
                            <li><code>Brave</code> 各工具类的封装,其中<code>builder.traceSampler(Sampler.ALWAYS_SAMPLE)</code>设置采样比率，0-1之间的百分比</li>
                            <li>BraveServletFilter 作为拦截器，需要serverRequestInterceptor,serverResponseInterceptor 分别完成sr和ss操作</li>
                            <li><code>OkHttpClient</code> 添加拦截器，需要<code>clientRequestInterceptor</code>,<code>clientResponseInterceptor</code> 分别完成<code>cs</code>和<code>cr</code>操作,该功能由
                                brave中的<code>brave-okhttp</code>模块提供，同样的道理如果需要记录数据库的延迟只要在数据库操作前后完成<code>cs</code>和<code>cr</code>即可，当然brave提供其封装。</li>
                        </ul>
                        <p>以上还缺少一个配置信息ZipkinProperties.java</p>
                        <p>则可以在配置文件application.properties中配置相关信息</p>
                        <pre><code>com.zipkin.serviceName=service1<br/>
com.zipkin.url=http://110.173.14.57:9411<br/>
com.zipkin.connectTimeout=6000<br/>
com.zipkin.readTimeout=6000<br/>
com.zipkin.flushInterval=1<br/>
com.zipkin.compressionEnabled=true<br/>
server.port=8080<br/>
</code></pre>
                        <h2 id="zipkin如何实现链路追踪的呢？"><a href="javascript:void(0)" class="anchor">zipkin如何实现链路追踪的呢？</a></h2>
                        <p>2010年谷歌发表了其内部使用的分布式跟踪系统Dapper的论文（<a href='http://static.googleusercontent.com/media/research.google.com/zh-CN//archive/papers/dapper-2010-1.pdf' target='_blank' >http://static.googleusercontent.com/media/research.google.com/zh-CN//archive/papers/dapper-2010-1.pdf</a>，译文地址：<a href='http://bigbully.github.io/Dapper-translation/' target='_blank' >http://bigbully.github.io/Dapper-translation/</a>），讲述了Dapper在谷歌内部两年的演变和设计、运维经验，Twitter也根据该论文开发了自己的分布式跟踪系统Zipkin，并将其开源，但不知为啥没有贡献给Apache。其实还有很多的分布式跟踪系统，比如Apache的HTrace，阿里的鹰眼Tracing、京东的Hydra、新浪的Watchman等。</p>
                        <p>      大型互联网公司为什么需要分布式跟踪系统？为了支撑日益增长的庞大业务量，我们会把服务进行整合、拆分，使我们的服务不仅能通过集群部署抵挡流量的冲击，又能根据业务在其上进行灵活的扩展。一次请求少则经过三四次服务调用完成，多则跨越几十个甚至是上百个服务节点。如何动态展示服务的链路？如何分析服务链路的瓶颈并对其进行调优？如何快速进行服务链路的故障发现？这就是服务跟踪系统存在的目的和意义。</p>
                        <p>     即使作为分布式系统的开发者，也很难清楚的说出某个服务的调用链路，况且服务调用链路还是动态变化的，这时候只能咬咬牙翻代码了。接下来，我们看看Zipkin是如何做到这一点的。在这之前，我们先来简单讨论一下分布式跟踪系统的设计要点，<strong>第一点：对应用透明、低侵入</strong>。为什么说这一点最重要？因为分布式系统面对的客户是开发者，如果他们的系统需要花费较大的改造才能接入你的分布式跟踪系统，除非你是他的老板，否则他会直接和你说：No！！没人用是最惨的结果。那么怎么才能做到对业务系统最低的侵入性呢？Dapper给出的建议是在公共库和中间件上做文章。没错，分布式系统之间的通讯靠的都是RPC、MQ等中间件系统，即使是内部使用的线程池或者数据库连接池，大多也是使用经过公司包装公共库，这就给服务跟踪带来了机会，我只要对中间件和公共库进行改造，就几乎可以做到全方位跟踪，当然，这也是有难度的；<strong>第二点：低开销、高稳定</strong>。大多数应用不愿意接入监控系统的原因是怕影响线上服务器的性能，特别是那些对性能特别敏感的应用，所以，分布式跟踪系统一定要轻量级，不能有太复杂的逻辑和外部依赖，甚至需要做到根据服务的流量来动态调整采集密度。<strong>第三点：可扩展</strong>。随着接入的分布式系统的增多，压力也将不断增长，分布式跟踪系统是否能动态的扩展来支撑不断接入的业务系统，这也是设计时需要考虑的。可以看出，这三点并没有什么特别，对于服务降级系统、分布式跟踪系统和业务监控系统等，这三点都是必须的。</p>
                        <p>&nbsp;</p>
                        <p>Zipkin的设计，一般的分布式跟踪系统数据流主要分为三个步骤：采集、发送和落盘分析，我们来看Zipkin官网给出的设计图：</p>
                        <p><img src='http://img.blog.csdn.net/20161014000053465?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQv/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/Center' alt='' /></p>
                        <p>其中的S表示的是发送跟踪数据的客户端SDK还是Scribe的客户端(因为Twitter内部采用的就是Scribe来采集跟踪数据)？效果都一样，总而言之我们看到的就是各个应用、中间件甚至是数据库将跟踪数据发送到Zipkin服务器。</p>
                        <p>总体设计没什么特别，我们看下内部的数据模型是怎么设计的。一般的调用链都可以展现成一颗树，比如下面的简单调用：</p>
                        <p><img src='http://img.blog.csdn.net/20161014000321045?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQv/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/Center' alt='' /></p>
                        <p>	上图描述的服务调用场景应该是很常见也很简单的调用场景了，一个请求通过Gateway服务路由到下游的Service1，然后Service1先调用服务Service2，拿到结果后再调用服务Service3，最后组合Service2和Service3服务的结果，通过Gateway返回给用户。我们用①②③④⑤⑥表示了RPC的顺序，那么，什么是span？span直译过来是&quot;跨度&quot;，在谷歌的Dapper论文中表示跟踪树中树节点引用的数据结构体，span是跟踪系统中的基本数据单元，Dapper的论文中，并没有具体介绍span中的全部细节，但在Zipkin中，每个span中一般包含如下字段：</p>
                        <p><strong>traceId：全局跟踪ID</strong>，用它来标记一次完整服务调用，所以和一次服务调用相关的span中的traceId都是相同的，Zipkin将具有相同traceId的span组装成跟踪树来直观的将调用链路图展现在我们面前。这里直接给出Zipkin官网中的一张Zipkin界面的图：</p>
                        <p><img src='http://img.blog.csdn.net/20161014000342161?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQv/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/Center' alt='' /></p>
                        <p>id：span的id，理论上来说，span的id只要做到一个traceId下唯一就可以，比如说阿里的鹰眼系统巧妙用span的id来体现调用层次关系（例如0，0.1，0.2，0.1.1等），但Zipkin中的span的id则没有什么实际含义。</p>
                        <p>parentId：父span的id，调用有层级关系，所以span作为调用节点的存储结构，也有层级关系。</p>
                        <p>name：span的名称，主要用于在界面上展示，一般是接口方法名，name的作用是让人知道它是哪里采集的span，不然某个span耗时高我都不知道是哪个服务节点耗时高。</p>
                        <p>timestamp：span创建时的时间戳，用来记录采集的时刻。</p>
                        <p>duration：持续时间，即span的创建到span完成最终的采集所经历的时间，除去span自己逻辑处理的时间，该时间段可以理解成对于该跟踪埋点来说服务调用的总耗时。</p>
                        <p>annotations：基本标注列表，一个标注可以理解成span生命周期中重要时刻的数据快照，比如一个标注中一般包含发生时刻（timestamp）、事件类型（value）、端点（endpoint）等信息，这里给出一个标注的json结构：</p>
                        <pre><code>{this.s}<br/>
                            &nbsp;&nbsp;&quot;timestamp&quot;:1476197069680000,<br/>
                            &nbsp;&nbsp;&quot;value&quot;:&nbsp;&quot;cs&quot;,<br/>
                            &nbsp;&nbsp;&quot;endpoint&quot;:&nbsp;{this.s}<br/>
                            &nbsp;&nbsp;	&quot;serviceName&quot;:&nbsp;&quot;service1&quot;,<br/>
                            &nbsp;&nbsp;	&quot;ipv4&quot;:&nbsp;&quot;xxx.xxx.xxx.111&quot;<br/>
                            &nbsp;&nbsp;}<br/>
}<br/>
</code></pre>
                        <p>那么，有哪些事件类型呢？答案是四种：cs（客户端/消费者发起请求）、cr（客户端/消费者接收到应答）、sr（服务端/生产者接收到请求）和ss（服务端/生产者发送应答）。可以看出，这四种事件类型的统计都应该是Zipkin提供客户端来做的，因为这些事件和业务无关，这也是为什么跟踪数据的采集适合放到中间件或者公共库来做的原因。</p>
                        <p>binaryAnnotations：业务标注列表，如果某些跟踪埋点需要带上部分业务数据（比如url地址、返回码和异常信息等），可以将需要的数据以键值对的形式放入到这个字段中。</p>
                        <p>&nbsp;</p>
                        <p>说到这里，大家对span的印象可能还是有点模糊不清，于是我们继续拿图2的服务调用来举例，如果我们将图2的应用接入Zipkin，将会是下图的效果：</p>
                        <p><img src='http://img.blog.csdn.net/20161014000409686?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQv/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/Center' alt='' /></p>
                        <p>      这里我们看到，Gateway、Service1、Service2和Service3都在往Zipkin发送跟踪数据，你一定会感觉奇怪，Gateway作为服务调用的起点，难道不是由Service1、Service2和Service3把各自的跟踪数据传回Gateway然后再由Gateway统计并整理好一并发往Zipkin服务端吗？认真想想就知道这种设计的弊端，如果一次完整的服务请求调用链路特长，比如设计上百个服务节点的通讯，那么将各服务节点的span信息传回给顶级span和将跟踪数据汇总并发送到Zipkin将带来巨大的网络开销，这是不值当的，还不如将跟踪数据组装的任务直接交给Zipkin来做，这样Zipkin的客户端SDK不需要有过于复杂的逻辑，也节省了大量的网络带宽资源，可扩展性大大提高。</p>
                        <p>       需要注意的是，并不是每个span上都会完整的发生cs、cr、sr和ss这四种事件，比如图4中Gateway上的span只会有cs和cr，因为Gateway没有上游应用，Service2和Service3上的span有sr和ss，但不会有cs和cr，因为对于此次服务调用来说，Service2和Service3并不依赖下游任何应用服务。但对于Service1来说就复杂得多，它将产生三个Span，接收和应答Gateway是一个span，调用和接收Service2是一个span，调用和接收Service3是第三个span，注意，一个span只能用于记录两个应用之间的服务调用，所以不能将这三个span信息合成一个。由cs、cr、sr和ss事件的时间，可以得出很多时间数据，例如：</p>
                        <p>请求总耗时 =Gateway.cr - Gateway.cs</p>
                        <p>①的网络耗时 = Service1.sr - Gateway.cs</p>
                        <p>Service1的调用Service2的耗时 = Service1.cr - Service1.cs （图4中Service1节点上的第二个span中的cr和cs）</p>
                        <p>Service1的调用Service3的耗时 = Service1.cr - Service1.cs （图4中Service1节点上的第三个span中的cr和cs）</p>
                        <p>④的网络耗时 = Service3.sr - Service1.cs （图4中Service1节点上的第三个span中的cs）</p>
                        <p>可以这样说，如果采集到这些span，几乎所有阶段的耗时都可以计算出来。</p>
                        <p><img src='http://dl2.iteye.com/upload/attachment/0122/3847/53fee587-e86c-305f-834d-1ad3b8d5094f.png' alt='' /></p>
                        <p>上图的①和⑥是一次完整的RPC调用，它发生在服务器0和服务器1之间，显而易见的是，用于描述该RPC调用的Span的spanId是1000，所以，这是同一个Span的，只是它的数据来源于两台不同的服务器（应用）：服务器0和服务器1。<strong>往低层说，该Span由两条跟踪日志表示，一条在服务器0上被采集，另一条在服务器1上被采集，他们的Span的traceId、spanId和parentSpanId都是一样的！</strong>而且该Span将成为跟踪树中的顶节点，因为他们的parentSpanId为null。对于步骤①来说，服务器1上的sr减去服务器0上的cs的时间就是约等于网络耗时（这里忽略不同服务器时钟的差异），同理，对于其他步骤，sr-cs和cr-ss得到的都是网络耗时。我们接着看请求步骤②和④，从跟踪树的层次来说他们属于①下的子调用，所以它们的parentSpanId就是①的1000。步骤②和④都会分别产生一个spanId（上面的1001和1002），所以如上图，看似一次简单的RPC过程，其实共产生了6条Span日志，它们将在Zipkin服务端组装成3个Span。</p>
                        <p>&nbsp;</p>
                        <p> <img src='http://dl2.iteye.com/upload/attachment/0122/3855/d0248c55-19b0-38f8-a958-b24626bf8476.png' alt='' /></p>
                        <p>RPC调用时只需要传递traceId和childSpanId，而不是像Zipkin的设计那样，需要传递traceId、spanId还有parentSpanId。</p>
                        <p>可以看到明显的变化，不再有parentSpanId，而使用了childSpanId，这样RPC之间传递的就是traceId和childSpanId，这也直接解决了图5中所遇到的问题。虽然图5和图6的设计违背了一次RPC调用由一个spanId的数据来进行维护的设计理念，但确实在跟踪树的界面展示上更容易让人接受和理解（树节点和服务器节点对应），而且还减少了RCP间的数据传送，何乐而不为？</p>
                        <p>参考：<a href='http://manzhizhen.iteye.com/' target='_blank' >http://manzhizhen.iteye.com/</a></p>
                        <p>&nbsp;</p>
                        <h3 id="怎么传输traceId和childSpanId的？"><a href="javascript:void(0)" class="anchor">怎么传输traceId和childSpanId的？</a></h3>
                        <p>猜想：因为rpc有的走http有的tcp,所以切入点应该在tcp上面，估计在tcp的包体里面含有这类信息，sr获取这类信息后，向zipkin发出请求，并绑定到当前线程。</p>

                    </Col>
                    <Col span={1}>
                    </Col>
                    <Col span={4}>
                        <Anchor showInkInFixed="true">
                              <Link href="#architecture" title="architecture"/>
                                 <Link href="#install" title="install"/>
                                 <Link href="#terminology术语" title="terminology术语"/>
                               <Link href="#brave" title="brave"/>
                                <Link href="#zipkin如何实现链路追踪的呢？" title="zipkin如何实现链路追踪的呢？">
                              <Link href="#怎么传输traceId和childSpanId的？" title="怎么传输traceId和childSpanId的？"/>
                                </Link>
                        </Anchor>
                    </Col>
                </Row>


            </div>

        );
    }
}

export default ASK1;
