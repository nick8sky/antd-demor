import React, {Component} from 'react';
import {Anchor, Row, Col} from 'antd';
const {Link} = Anchor;


class ASK10 extends Component {

    s = "{";
    render() {

        return (
            <div>
                <Row>
                    <Col span={19}>
                        <h2 id="Concurrent Mark Sweep (CMS) 垃圾收集器"><a href="javascript:void(0)" class="anchor">Concurrent Mark Sweep (CMS) 垃圾收集器</a></h2>
                        <p>CMS也是采用分代策略的，用于收集<strong>老年代</strong>的垃圾对象，并且分为好几个阶段来执行GC。在某些阶段，应用的线程会被挂起，也就是stop-the-world。而在另外的阶段里，垃圾回收线程可以与应用的线程一起工作。</p>
                        <p>CSM执行过程：</p>
                        <p><img src='http://dl.iteye.com/upload/attachment/612577/2b525609-ce63-3a42-bf19-b2fbcd42f26c.png' alt='' /></p>
                        <p><strong>初始标记</strong> ：在这个阶段，需要虚拟机停顿正在执行的任务，官方的叫法STW(Stop The Word)。该阶段进行可达性分析，标记GC ROOT能<strong>直接关联</strong>到的对象；间接关联的对象在下一阶段标记</p>
                        <p><strong>并发标记</strong> ：该阶段进行GC ROOT TRACING，在第一个阶段被暂停的线程重新开始运行。由前阶段标记过的对象出发，所有可到达的对象都在本阶段中标记。</p>
                        <p><strong>并发预清理</strong> ：并发预清理阶段仍然是并发的，在这个阶段做的工作还是标记。此阶段标记的有：新生代晋升的对象、新分配到老年代的对象。</p>
                        <p><strong>重新标记</strong> ：重标记(STW)  暂停所有用户线程，重新扫描堆中的对象，进行可达性分析,标记活着的对象。有了前面的基础，这个阶段的工作量被大大减轻，停顿时间因此也会减少。</p>
                        <p>注意这个阶段是多线程并发的。</p>
                        <p><strong>并发清理 </strong>：用户线程被重新激活，同时清理那些无效的对象。</p>
                        <p><strong>并发重置</strong> ：CMS清除内部状态，为下次回收做准备。 </p>
                        <p>&nbsp;</p>
                        <p>CMS默认的回收线程数是<strong>(CPU个数+3)/4。</strong>这个公式的意思是当CPU大于4个时,保证回收线程占用至少25%的CPU资源，这样用户线程占用75%的CPU，这是可以接受的。</p>
                        <p>但是，如果CPU资源很少，比如只有两个的时候怎么办？按照上面的公式，CMS会启动1个GC线程。相当于GC线程占用了50%的CPU资源，这就可能导致用户程序的执行速度忽然降低了50%，还是很明显的能感知的。</p>
                        <p>&nbsp;</p>
                        <p>CMS将老年代的空间分成大小为512bytes的块，card table中的每个元素对应着一个块。并发标记时，如果某个对象的引用发生了变化，就标记该对象所在的块为  <strong>dirty card</strong>。并发预清理阶段就会重新扫描该块，将该对象引用的对象标识为可达。</p>
                        <p><img src={require('../../imgs/skill/cms2.png' )}/></p>
                        <p><strong>current obj所在的块被标记为了dirty card。</strong></p>
                        <p> </p>
                        <h3 id="触发阈值"><a href="javascript:void(0)" class="anchor">触发阈值</a></h3>
                        <p>并发清理阶段用户线程还在运行，这段时间就可能产生新的垃圾，新的垃圾在此次GC无法清除，只能等到下次清理。这些垃圾有个专业名词：<strong>浮动垃圾</strong></p>
                        <p>由于垃圾回收阶段用户线程仍在执行，必需预留出内存空间给用户线程使用。因此不能像其他回收器那样，等到老年代满了再进行GC。</p>
                        <p>CMS 提供了CMSInitiatingOccupancyFraction参数来设置老年代空间使用百分比,达到百分比就进行垃圾回收。</p>
                        <p>这个参数默认是92%，参数选择需要看具体的应用场景。</p>
                        <p>设置的太小会导致频繁的CMS GC，产生大量的停顿；反过来想，设置的太高会发生什么？</p>
                        <p>假设现在设置为99%，还剩1%的空间可以使用。</p>
                        <p>在并发清理阶段，若用户线程需要使用的空间大于1%，就会产生Concurrent  Mode Failure错误，意思就是说并发模式失败。</p>
                        <p>这时，虚拟机就会启动备案：使用Serial Old收集器重新对老年代进行垃圾回收.如此一来，停顿时间变得更长。</p>
                        <p>所以CMSInitiatingOccupancyFraction的设置要具体问题具体分析。</p>
                        <p>&nbsp;</p>
                        <p>其实CMS有<strong>动态检查机制</strong>。</p>
                        <p>CMS会根据历史记录，预测老年代还需要多久填满及进行一次回收所需要的时间。</p>
                        <p>在老年代空间用完之前，CMS可以根据自己的预测自动执行垃圾回收。</p>
                        <p>这个特性可以使用参数UseCMSInitiatingOccupancyOnly来关闭。</p>
                        <p>&nbsp;</p>
                        <p>问：如果让你设计，如何预测什么时候开始自动执行？ </p>
                        <pre><code>1.first time  <br/>
2.second&nbsp;time&nbsp;-last&nbsp;time&nbsp;&nbsp;时间间隔&nbsp;5min<br/>
3.current&nbsp;time&nbsp;&nbsp;-last&nbsp;time&nbsp;&nbsp;&gt;=5min&nbsp;&nbsp;&amp;&amp;&nbsp;mem&nbsp;&gt;80%执行，若&nbsp;current&nbsp;time&nbsp;&nbsp;-last&nbsp;time&nbsp;&nbsp;&lt;5min&nbsp;&amp;&amp;&nbsp;mem&nbsp;&gt;92%&nbsp;,4min&nbsp;，若current&nbsp;time&nbsp;&nbsp;-last&nbsp;time&nbsp;&nbsp;&gt;5min&nbsp;&nbsp;&amp;&amp;&nbsp;mem&nbsp;&lt;&lt;&nbsp;80%&nbsp;6min<br/>
4.&nbsp;...<br/>
</code></pre>
                        <p>&nbsp;</p>
                        <h3 id="空间碎片的处理/并发模式失败"><a href="javascript:void(0)" class="anchor">空间碎片的处理/并发模式失败</a></h3>
                        <p>使用标记-清除算法可能造成大量的空间碎片。空间碎片过多，就会给大对象分配带来麻烦。</p>
                        <p>往往老年代还有很大剩余空间，但无法找到足够大的连续空间来分配当前对象,不得不触发一次Full GC。</p>
                        <p>CMS的解决方案是使用UseCMSCompactAtFullCollection参数(默认开启)，进行Full GC时开启内存碎片整理。</p>
                        <p>虚拟机还提供了另外一个参数CMSFullGCsBeforeCompaction，用于设置执行多少次不压缩的Full GC后，跟着来一次带压缩的（默认为0，每次进入Full GC时都进行碎片整理）。</p>
                        <p> </p>
                        <h3 id="后备收集器：SerialOld"><a href="javascript:void(0)" class="anchor">后备收集器：SerialOld</a></h3>
                        <p>并发GC，吞吐量下降，采用标记清除，碎片多，占用额外内存，不能在堆空间满时清理，触发GC：
                            清理时，应用程序还在运行此时如果预留的空间不够应用程序申请的空间的话，则会触发Concurrent Mode Fail，此时便会启用后备收集器：SerialOld进行GC，产生全局停顿</p>
                        <p><img src={require('../../imgs/skill/cms3.png' )}/></p>
                        <p>Serial Old收集器是JAVA虚拟机中垃圾收集器的一种,它是Serial收集器的老年代版本，它同样是一个单线程收集器，使用“标记-整理”算法。如果CMS收集器出现Concurrent Mode Failure，则Serial Old收集器将作为后备收集器。</p>
                        <p>&nbsp;</p>
                        <h2 id="CMS缺点"><a href="javascript:void(0)" class="anchor">CMS缺点</a></h2>
                        <p>1、CMS回收器采用的基础算法是Mark-Sweep。所有CMS不会整理、压缩堆空间。这样就会有一个问题：经过CMS收集的堆会产生空间碎片。 CMS不对堆空间整理压缩节约了垃圾回收的停顿时间，但也带来的堆空间的浪费。为了解决堆空间浪费问题，CMS回收器不再采用简单的指针指向一块可用堆空 间来为下次对象分配使用。而是把一些未分配的空间汇总成一个列表，当JVM分配对象空间的时候，会搜索这个列表找到足够大的空间来hold住这个对象。</p>
                        <p>2、需要更多的CPU资源。从上面的图可以看到，为了让应用程序不停顿，CMS线程和应用程序线程并发执行，这样就需要有更多的CPU，单纯靠线程切 换是不靠谱的。并且，重新标记阶段，为空保证STW快速完成，也要用到更多的甚至所有的CPU资源。当然，多核多CPU也是未来的趋势！</p>
                        <p>3、CMS的另一个缺点是它需要更大的堆空间。因为CMS标记阶段应用程序的线程还是在执行的，那么就会有堆空间继续分配的情况，为了保证在CMS回 收完堆之前还有空间分配给正在运行的应用程序，必须预留一部分空间。也就是说，CMS不会在老年代满的时候才开始收集。相反，它会尝试更早的开始收集，已 避免上面提到的情况：在回收完成之前，堆没有足够空间分配！默认当老年代使用92%的时候，CMS就开始行动了。 – XX:CMSInitiatingOccupancyFraction =n 来设置这个阀值。</p>
                        <p>总得来说，CMS回收器减少了回收的停顿时间，但是降低了堆空间的利用率。</p>
                        <p>&nbsp;</p>
                        <p>&nbsp;</p>
                        <p>问：CMS为什么采用标记-清除算法？</p>
                        <p>答：1、老年代只有一个区域。</p>
                        <p>2、减少stw时间</p>
                        <p>&nbsp;</p>
                        <p>问：如何确定老年代的对象是活着的？</p>
                        <p>答：通过GC ROOT TRACING可到达的对象就是活着的。</p>
                        <p><img src={require('../../imgs/skill/cms1.png' )}/></p>
                        <p>CMS虽然是老年代的gc，但仍要扫描新生代。</p>
                        <h2 id="垃圾收集算法"><a href="javascript:void(0)" class="anchor">垃圾收集算法</a></h2>
                        <h3 id="复制-整理"><a href="javascript:void(0)" class="anchor">复制-整理</a></h3>
                        <p>from -&gt;to</p>
                        <p><img src='https://img-blog.csdn.net/20170114203745073?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvd2VuNzI4MA==/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/Center' alt='' /></p>
                        <p>新生代分为eden空间、from空间和to空间3个部分，其中from和to空间可以看做用于复制的两块大小相同、可互换角色的内存空间块。</p>
                        <p><img src='https://img-blog.csdn.net/20170114212325980?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvd2VuNzI4MA==/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/Center' alt='' /></p>
                        <p>这种复制算法保证了内存空间的连续性，又避免了大量的空间浪费。</p>
                        <p>实现简单，内存效率高，不易产生碎片，但需要多一块内存。</p>
                        <h3 id="标记-清理"><a href="javascript:void(0)" class="anchor">标记-清理</a></h3>
                        <p>分为两个阶段，标注和清除。标记阶段标记出所有需要回收的对象，清除阶段回收被标记的对象所占用的空间。</p>
                        <p><img src={require('../../imgs/skill/cms4.jpg' )}/></p>
                        <p>该算法最大的问题是内存碎片化严重，后续可能发生大对象不能找到可利用空间的问题。</p>
                        <h3 id="标记-压缩(整理)"><a href="javascript:void(0)" class="anchor">标记-压缩(整理)</a></h3>
                        <p>标记阶段和Mark-Sweep算法相同，标记后不是清理对象，而是将存活对象移向内存的一端。然后清除端边界外的对象。</p>
                        <p><img src={require('../../imgs/skill/cms5.jpg' )}/></p>
                        <h3 id="分代收集算法"><a href="javascript:void(0)" class="anchor">分代收集算法</a></h3>
                        <p>分代收集法是目前大部分JVM所采用的方法，其核心思想是根据对象存活的不同生命周期将内存划分为不同的域，一般情况下将GC堆划分为老生代(Tenured/Old Generation)和新生代(Young Generation)。老生代的特点是每次垃圾回收时只有少量对象需要被回收，新生代的特点是每次垃圾回收时都有大量垃圾需要被回收，因此可以根据不同区域选择不同的算法。</p>
                        <p> 对于新生代都采取Copying算法，而老生代因为每次只回收少量对象，因而采用Mark-Compact算法。对永生代的回收主要包括废弃常量和无用的类。</p>
                        <p>但是在cms是采用标记-清理的方式，是为了减少stw时间。</p>
                        <p>&nbsp;</p>
                        <p>&nbsp;</p>
                        <h2 id="其他回收器"><a href="javascript:void(0)" class="anchor">其他回收器</a></h2>
                        <h3 id="Serial/Serial Old"><a href="javascript:void(0)" class="anchor">Serial/Serial Old</a></h3>
                        <p>单线程收集器，用它进行垃圾回收时，必须暂停所有用户线程。Serial是针对新生代的收集器，采用Copying算法；而Serial Old是针对老生代的收集器，采用Mark-Compact算法。优点是简单高效，缺点是需要暂停用户线程。</p>
                        <h3 id="ParNew"><a href="javascript:void(0)" class="anchor">ParNew</a></h3>
                        <p>Seral 的多线程版本，使用多个线程进行垃圾收集。</p>
                        <h3 id="Parallel Scavenge"><a href="javascript:void(0)" class="anchor">Parallel Scavenge</a></h3>
                        <p>新生代的并行收集器，回收期间不需要暂停其他线程，采用Copying算法。该收集器与前两个收集器不同，主要为了达到一个可控的吞吐量。</p>
                        <h3 id="Parallel Old"><a href="javascript:void(0)" class="anchor">Parallel Old</a></h3>
                        <p>Parallel Scavenge的老生代版本，采用Mark-Compact算法和多线程。</p>
                        <h3 id="CMS"><a href="javascript:void(0)" class="anchor">CMS</a></h3>
                        <p>Current Mark Sweep收集器是一种以最小回收时间停顿为目标的并发回收器，因而采用Mark-Sweep算法。</p>
                        <h3 id="G1"><a href="javascript:void(0)" class="anchor">G1</a></h3>
                        <p>G1(Garbage First)面向服务端的收集器，能充分利用CPU和多核环境。是一款并行与并发收集器，它能够建立可预测的停顿时间模型。</p>
                        <p>&nbsp;</p>
                        <h2 id="如何确定某个对象是垃圾"><a href="javascript:void(0)" class="anchor">如何确定某个对象是垃圾</a></h2>
                        <h3 id="引用计数法"><a href="javascript:void(0)" class="anchor">引用计数法</a></h3>
                        <p>缺点：相互引用而不会被标记</p>
                        <h3 id="可达性分析"><a href="javascript:void(0)" class="anchor">可达性分析</a></h3>
                        <p>通过一系列的“GC roots”对象作为起点搜索。如果在“GC roots”和一个对象之间没有可达路径，则称该对象是不可达的。要注意的是，不可达对象不等价于可回收对象，不可达对象变为可回收对象至少要经过两次标记过程。</p>
                        <a href='http://nick070809.gitee.io/#/ask4'>Java中什么样的对象才能作为gc root?</a>

                    </Col>
                    <Col span={1}>
                    </Col>
                    <Col span={4}>
                         <Anchor showInkInFixed="true">
                             <Link href="#Concurrent Mark Sweep (CMS) 垃圾收集器" title="Concurrent Mark Sweep (CMS) 垃圾收集器">
                             <Link href="#触发阈值" title="触发阈值"/>
                             <Link href="#空间碎片的处理/并发模式失败" title="空间碎片的处理/并发模式失败"/>
                             <Link href="#后备收集器：SerialOld" title="后备收集器：SerialOld"/>
                             </Link>
                             <Link href="#CMS缺点" title="CMS缺点"/>
                             <Link href="#垃圾收集算法" title="垃圾收集算法">
                             <Link href="#复制-整理" title="复制-整理"/>
                             <Link href="#标记-清理" title="标记-清理"/>
                             <Link href="#标记-压缩(整理)" title="标记-压缩(整理)"/>
                             <Link href="#分代收集算法" title="分代收集算法"/>
                             </Link>
                             <Link href="#其他回收器" title="其他回收器">
                             <Link href="#Serial/Serial Old" title="Serial/Serial Old"/>
                             <Link href="#ParNew" title="ParNew"/>
                             <Link href="#Parallel Scavenge" title="Parallel Scavenge"/>
                             <Link href="#Parallel Old" title="Parallel Old"/>
                             <Link href="#CMS" title="CMS"/>
                             <Link href="#G1" title="G1"/>
                             </Link>
                             <Link href="#如何确定某个对象是垃圾" title="如何确定某个对象是垃圾">
                             <Link href="#引用计数法" title="引用计数法"/>
                             <Link href="#可达性分析" title="可达性分析"/>
                            </Link>
                         </Anchor>
                    </Col>
                </Row>


            </div>

        );
    }
}

export default ASK10;
