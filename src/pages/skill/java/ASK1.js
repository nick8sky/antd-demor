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

                        <h2 id="java/hashCode方法的作用"><a href="javascript:void(0)" class="anchor">java/hashCode方法的作用</a></h2>
                        <p>哈希表这个数据结构想必大多数人都不陌生，而且在很多地方都会利用到hash表来提高查找效率。在Java的Object类中有一个方法:</p>
                        <pre><code> public native int hashCode();<br/>
</code></pre>
                        <p>根据这个方法的声明可知，该方法返回一个int类型的数值，并且是本地方法，因此在Object类中并没有给出具体的实现。</p>
                        <hr />
                        <p>为何Object类需要这样一个方法？它有什么作用呢？今天我们就来具体探讨一下hashCode方法。</p>
                        <p>对于包含容器类型的程序设计语言来说，基本上都会涉及到hashCode。在Java中也一样，hashCode方法的主要作用是为了配合基于散列的集合一起正常运行，这样的散列集合包括HashSet、HashMap以及HashTable。</p>
                        <p>为什么这么说呢？考虑一种情况，当向集合中插入对象时，如何判别在集合中是否已经存在该对象了？（注意：集合中不允许重复的元素存在）</p>
                        <p>也许大多数人都会想到调用equals方法来逐个进行比较，这个方法确实可行。但是如果集合中已经存在一万条数据或者更多的数据，如果采用equals方法去逐一比较，效率必然是一个问题。此时hashCode方法的作用就体现出来了，当集合要添加新的对象时，先调用这个对象的hashCode方法，得到对应的hashcode值，实际上在HashMap的具体实现中会用一个table保存已经存进去的对象的hashcode值，如果table中没有该hashcode值，它就可以直接存进去，不用再进行任何比较了；如果存在该hashcode值， 就调用它的equals方法与新元素进行比较，相同的话就不存了，不相同就散列其它的地址，所以这里存在一个冲突解决的问题，这样一来实际调用equals方法的次数就大大降低了，说通俗一点：Java中的hashCode方法就是根据一定的规则将与对象相关的信息（比如对象的存储地址，对象的字段等）映射成一个数值，这个数值称作为散列值。下面这段代码是java.util.HashMap的中put方法的具体实现：</p>
                        <pre><code>public V put(K key, V value) {this.s}<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;if&nbsp;(key&nbsp;==&nbsp;null)<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;return&nbsp;putForNullKey(value);<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;int&nbsp;hash&nbsp;=&nbsp;hash(key.hashCode());<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;int&nbsp;i&nbsp;=&nbsp;indexFor(hash,&nbsp;table.length);<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;for&nbsp;(Entry&lt;K,V&gt;&nbsp;e&nbsp;=&nbsp;table[i];&nbsp;e&nbsp;!=&nbsp;null;&nbsp;e&nbsp;=&nbsp;e.next)&nbsp;{this.s}<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Object&nbsp;k;<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;if&nbsp;(e.hash&nbsp;==&nbsp;hash&nbsp;&amp;&amp;&nbsp;((k&nbsp;=&nbsp;e.key)&nbsp;==&nbsp;key&nbsp;||&nbsp;key.equals(k)))&nbsp;{this.s}<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;V&nbsp;oldValue&nbsp;=&nbsp;e.value;<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;e.value&nbsp;=&nbsp;value;<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;e.recordAccess(this);<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;return&nbsp;oldValue;<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br/>
                            &nbsp;<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;modCount++;<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;addEntry(hash,&nbsp;key,&nbsp;value,&nbsp;i);<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;return&nbsp;null;<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;}<br/>
</code></pre>
                        <p><strong>put方法是用来向HashMap中添加新的元素，从put方法的具体实现可知，会先调用hashCode方法得到该元素的hashCode值，然后查看table中是否存在该hashCode值，如果存在则调用equals方法重新确定是否存在该元素，如果存在，则更新value值，否则将新的元素添加到HashMap中。从这里可以看出，hashCode方法的存在是为了减少equals方法的调用次数，从而提高程序效率。</strong></p>
                        <hr />
                        <p>有些朋友误以为默认情况下，hashCode返回的就是对象的存储地址，事实上这种看法是不全面的，确实有些JVM在实现时是直接返回对象的存储地址，但是大多时候并不是这样，只能说可能存储地址有一定关联。HotSpot JVM中生成hash散列值的实现,位于hotspot/src/share/vm/runtime/synchronizer.cpp文件下。</p>
                        <p>&nbsp;</p>
                        <p>因此有人会说，可以直接根据hashcode值判断两个对象是否相等吗？肯定是不可以的，因为不同的对象可能会生成相同的hashcode值。虽然不能根据hashcode值判断两个对象是否相等，但是可以直接根据hashcode值判断两个对象不等，如果两个对象的hashcode值不等，则必定是两个不同的对象。如果要判断两个对象是否真正相等，必须通过equals方法。</p>
                        <p>　　也就是说对于两个对象，如果调用equals方法得到的结果为true，则两个对象的hashcode值必定相等；</p>
                        <p>　　如果equals方法得到的结果为false，则两个对象的hashcode值不一定不同；</p>
                        <p>　　如果两个对象的hashcode值不等，则equals方法得到的结果必定为false；</p>
                        <p>　　如果两个对象的hashcode值相等，则equals方法得到的结果未知;</p>
                        <p>&nbsp;</p>
                        <hr />
                        <h2 id="equals方法和hashCode方法"><a href="javascript:void(0)" class="anchor">equals方法和hashCode方法</a></h2>
                        <p>在有些情况下，程序设计者在设计一个类的时候为需要重写equals方法，比如String类，但是千万要注意，在重写equals方法的同时，必须重写hashCode方法。为什么这么说呢？</p>
                        <pre><code>class People{this.s}<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;private&nbsp;String&nbsp;name;<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;private&nbsp;int&nbsp;age;<br/>
                            &nbsp;<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;public&nbsp;People(String&nbsp;name,int&nbsp;age)&nbsp;{this.s}<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;this.name&nbsp;=&nbsp;name;<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;this.age&nbsp;=&nbsp;age;<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;}&nbsp;&nbsp;<br/>
                            &nbsp;<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;public&nbsp;void&nbsp;setAge(int&nbsp;age){this.s}<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;this.age&nbsp;=&nbsp;age;<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;}<br/>
                            &nbsp;<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;@Override<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;public&nbsp;boolean&nbsp;equals(Object&nbsp;obj)&nbsp;{this.s}<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;//&nbsp;TODO&nbsp;Auto-generated&nbsp;method&nbsp;stub<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;return&nbsp;this.name.equals(((People)obj).name)&nbsp;&amp;&amp;&nbsp;this.age==&nbsp;((People)obj).age;<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;}<br/>
}<br/>
                            &nbsp;<br/>
public&nbsp;class&nbsp;Main&nbsp;{this.s}<br/>
                            &nbsp;<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;public&nbsp;static&nbsp;void&nbsp;main(String[]&nbsp;args)&nbsp;{this.s}<br/>
                            &nbsp;<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;People&nbsp;p1&nbsp;=&nbsp;new&nbsp;People(&quot;Jack&quot;,&nbsp;12);<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;System.out.println(p1.hashCode());<br/>
                            &nbsp;<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;HashMap&lt;People,&nbsp;Integer&gt;&nbsp;hashMap&nbsp;=&nbsp;new&nbsp;HashMap&lt;People,&nbsp;Integer&gt;();<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;hashMap.put(p1,&nbsp;1);<br/>
                            &nbsp;<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;System.out.println(hashMap.get(new&nbsp;People(&quot;Jack&quot;,&nbsp;12)));<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;}<br/>
}<br/>
</code></pre>
                        <p>在这里我只重写了equals方法，也就说如果两个People对象，如果它的姓名和年龄相等，则认为是同一个人。</p>
                        <p>这段代码本来的意愿是想这段代码输出结果为“1”，但是事实上它输出的是“null”。为什么呢？原因就在于重写equals方法的同时忘记重写hashCode方法。</p>
                        <p>虽然通过重写equals方法使得逻辑上姓名和年龄相同的两个对象被判定为相等的对象（跟String类类似），但是要知道默认情况下，<strong>hashCode方法是将对象的存储地址进行映射</strong>。那么上述代码的输出结果为“null”就不足为奇了。原因很简单，p1指向的对象和</p>
                        <p>System.out.println(hashMap.get(new People(“Jack”, 12)));这句中的new People(“Jack”, 12)生成的是两个对象，它们的存储地址肯定不同。下面是HashMap的get方法的具体实现：</p>
                        <pre><code> public V get(Object key) {this.s}<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;if&nbsp;(key&nbsp;==&nbsp;null)<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;return&nbsp;getForNullKey();<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;int&nbsp;hash&nbsp;=&nbsp;hash(key.hashCode());<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;for&nbsp;(Entry&lt;K,V&gt;&nbsp;e&nbsp;=&nbsp;table[indexFor(hash,&nbsp;table.length)];<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;e&nbsp;!=&nbsp;null;<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;e&nbsp;=&nbsp;e.next)&nbsp;{this.s}<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Object&nbsp;k;<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;if&nbsp;(e.hash&nbsp;==&nbsp;hash&nbsp;&amp;&amp;&nbsp;((k&nbsp;=&nbsp;e.key)&nbsp;==&nbsp;key&nbsp;||&nbsp;key.equals(k)))<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;return&nbsp;e.value;<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;return&nbsp;null;<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;}<br/>
</code></pre>
                        <p>所以在hashmap进行get操作时，因为得到的hashcdoe值不同，所以导致在get方法中for循环不会执行，直接返回null。</p>
                        <p>因此如果想上述代码输出结果为“1”，很简单，只需要重写hashCode方法，让equals方法和hashCode方法始终在逻辑上保持一致性。</p>

                    </Col>
                    <Col span={1}>
                    </Col>
                    <Col span={4}>
                        <Anchor showInkInFixed="true">
                            <Link href="#java/hashCode方法的作用" title="java/hashCode方法的作用"/>
                            <Link href="#equals方法和hashCode方法" title="equals方法和hashCode方法"/>
                        </Anchor>
                    </Col>
                </Row>


            </div>

        );
    }
}

export default ASK1;
