import React, {Component} from 'react';
import {Anchor, Row, Col} from 'antd';


const {Link} = Anchor;


class ASK5 extends Component {

    s = "{";
    render() {

        return (
            <div>
                <Row>
                    <Col span={19}>
                        <h3 id="next()时抛出ConcurrentModificationException"><a href="javascript:void(0)" class="anchor">next()时抛出ConcurrentModificationException</a></h3>
                        <p>这一段代码:</p>
                        <pre><code>    public static void test1() {this.s}<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;ArrayList&lt;Integer&gt;&nbsp;arrayList&nbsp;=&nbsp;new&nbsp;ArrayList&lt;&gt;();<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;for&nbsp;(int&nbsp;i&nbsp;=&nbsp;0;&nbsp;i&nbsp;&lt;&nbsp;20;&nbsp;i++)&nbsp;{this.s}<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;arrayList.add(Integer.valueOf(i));<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;//&nbsp;复现方法一<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Iterator&lt;Integer&gt;&nbsp;iterator&nbsp;=&nbsp;arrayList.iterator();<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;while&nbsp;(iterator.hasNext())&nbsp;{this.s}<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Integer&nbsp;integer&nbsp;=&nbsp;iterator.next();<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;if&nbsp;(integer.intValue()&nbsp;==&nbsp;5)&nbsp;{this.s}<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;arrayList.remove(integer);<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;}<br/>
</code></pre>
                        <p>方法一中使用Iterator遍历ArrayList， 抛出异常的是iterator.next()。看下ArrayList.next()方法实现源码:</p>
                        <pre><code>       public boolean hasNext() {this.s}<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;return&nbsp;cursor&nbsp;!=&nbsp;size;<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;@SuppressWarnings(&quot;unchecked&quot;)<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;public&nbsp;E&nbsp;next()&nbsp;{this.s}<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;checkForComodification();<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;int&nbsp;i&nbsp;=&nbsp;cursor;<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;if&nbsp;(i&nbsp;&gt;=&nbsp;size)<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;throw&nbsp;new&nbsp;NoSuchElementException();<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Object[]&nbsp;elementData&nbsp;=&nbsp;ArrayList.this.elementData;<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;if&nbsp;(i&nbsp;&gt;=&nbsp;elementData.length)<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;throw&nbsp;new&nbsp;ConcurrentModificationException();<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;cursor&nbsp;=&nbsp;i&nbsp;+&nbsp;1;<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;return&nbsp;(E)&nbsp;elementData[lastRet&nbsp;=&nbsp;i];<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;final&nbsp;void&nbsp;checkForComodification()&nbsp;{this.s}<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;if&nbsp;(modCount&nbsp;!=&nbsp;expectedModCount)<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;throw&nbsp;new&nbsp;ConcurrentModificationException();<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br/>
</code></pre>
                        <p>在next方法中首先调用了checkForComodification方法，该方法会判断modCount是否等于expectedModCount，不等于就会抛出java.util.ConcurrentModificationExcepiton异常。</p>
                        <p>我们接下来跟踪看一下modCount和expectedModCount的赋值和修改。</p>
                        <p>modCount是ArrayList的一个属性，继承自抽象类AbstractList，用于表示ArrayList对象被修改次数。</p>
                        <p>整个ArrayList中修改modCount的方法比较多，有add、remove、clear、ensureCapacityInternal等，凡是设计到ArrayList对象修改的都会自增modCount属性。</p>
                        <p>在创建ListIterator的时候会将modCount赋值给expectedModCount，在遍历ArrayList过程中，没有其他地方可以设置expectedModCount了，因此遍历过程中expectedModCount会一直保持初始值20（调用add方法添加了20个元素，修改了20次）。</p>
                        <p>遍历的时候是不会触发modCount自增的，但是遍历到integer.intValue() == 5的时候，执行了一次arrayList.remove(integer)，这行代码执行后modCount++变为了21，但此时的expectedModCount仍然为20。</p>
                        <p>在执行next方法时，遇到modCount != expectedModCount方法，导致抛出异常java.util.ConcurrentModificationException。</p>
                        <h3 id="for循环 时抛出ConcurrentModificationException"><a href="javascript:void(0)" class="anchor">for循环 时抛出ConcurrentModificationException</a></h3>
                        <pre><code>    public static void main(String... s) throws InterruptedException {this.s}<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;List&lt;User&gt;&nbsp;list1&nbsp;=&nbsp;new&nbsp;ArrayList&lt;User&gt;();<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;for&nbsp;(int&nbsp;x&nbsp;=0;x&lt;15;x++)&nbsp;{this.s}<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;User&nbsp;user2&nbsp;=&nbsp;new&nbsp;User(x+&quot;x&quot;,&nbsp;1l);<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;if&nbsp;(list1.isEmpty())&nbsp;{this.s}<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;list1.add(user2);<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}&nbsp;else&nbsp;{this.s}<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;for&nbsp;(User&nbsp;ecity&nbsp;:&nbsp;list1)&nbsp;{this.s}<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;if&nbsp;(user2.getName().equals(ecity.getName()))&nbsp;{this.s}<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;ecity.setCc(ecity.getCc()&nbsp;+&nbsp;1);<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}else&nbsp;{this.s}<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;list1.add(user2);<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;}<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;public&nbsp;class&nbsp;User&nbsp;{this.s}<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;private&nbsp;&nbsp;String&nbsp;name;<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;private&nbsp;Long&nbsp;id;<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;private&nbsp;Long&nbsp;cc&nbsp;=1l;<br/>
</code></pre>
                        <p>逻辑上好像没有什么问题，但是：</p>
                        <pre><code>Exception in thread &quot;main&quot; java.util.ConcurrentModificationException<br/>
	at&nbsp;java.util.ArrayList$Itr.checkForComodification(ArrayList.java:907)<br/>
	at&nbsp;java.util.ArrayList$Itr.next(ArrayList.java:857)<br/>
	at&nbsp;org.kx.doe.care.ConcurrentExceptionTest.main(ConcurrentExceptionTest.java:18)<br/>
	for&nbsp;(User&nbsp;ecity&nbsp;:&nbsp;list1)&nbsp;{this.s}...<br/>
</code></pre>
                        <p>看到了这里还是调用了next方法，所以在for循环内要做add操作是不允许的。</p>
                        <p>&nbsp;</p>
                        <p>但是：</p>
                        <pre><code>public static void test7() {this.s}<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;List&lt;User&gt;&nbsp;list1&nbsp;=&nbsp;new&nbsp;ArrayList&lt;User&gt;();<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;for&nbsp;(int&nbsp;x&nbsp;=&nbsp;0;&nbsp;x&nbsp;&lt;&nbsp;15;&nbsp;x++)&nbsp;{this.s}<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;User&nbsp;user2&nbsp;=&nbsp;new&nbsp;User(x&nbsp;+&nbsp;&quot;x&quot;,&nbsp;1l);<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;if&nbsp;(list1.isEmpty())&nbsp;{this.s}<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;list1.add(user2);<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}&nbsp;else&nbsp;{this.s}<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;for&nbsp;(int&nbsp;xd=0;xd&lt;&nbsp;list1.size()&nbsp;;&nbsp;xd&nbsp;++)&nbsp;{this.s}<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;User&nbsp;ecity&nbsp;=&nbsp;&nbsp;list1.get(xd);<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;if&nbsp;(user2.getName().equals(ecity.getName()))&nbsp;{this.s}<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;ecity.setCc(ecity.getCc()&nbsp;+&nbsp;1);<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}&nbsp;else&nbsp;{this.s}<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;list1.add(user2);<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;}<br/>
}<br/>
</code></pre>

                        <p>这样是没有问题的，唯一的区别在于迭代使用的方式不同， for (User ecity : list1)这个方法会自动创建Iterator，所以在next调用的时候会抛出ConcurrentModificationException异常。</p>
                        <p>&nbsp;</p>
                        <h3 id="为什么倒排删除是可以的？"><a href="javascript:void(0)" class="anchor">为什么倒排删除是可以的？</a></h3>
                        <p>显然使用Iterator &lt;Integer> iterator = arrayList.iterator();或 for (User ecity : list1) 这两种方式进行操作都会抛出ConcurrentModificationException异常。通过下标进行操作是可以的，假如我们先正序删除会怎么样呢？</p>
                        <pre><code>    public static void test4() {this.s}<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;ArrayList&lt;Integer&gt;&nbsp;arrayList&nbsp;=&nbsp;new&nbsp;ArrayList&lt;&gt;();<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;for&nbsp;(int&nbsp;i&nbsp;=&nbsp;0;&nbsp;i&nbsp;&lt;&nbsp;20;&nbsp;i++)&nbsp;{this.s}<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;arrayList.add(Integer.valueOf(i));<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;for(int&nbsp;i&nbsp;=&nbsp;0;&nbsp;i&nbsp;&lt;&nbsp;20;&nbsp;i++){this.s}<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;if(i&nbsp;%2&nbsp;==&nbsp;0){this.s}<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;arrayList.remove(i);<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;for&nbsp;(int&nbsp;i&nbsp;=&nbsp;0;&nbsp;i&nbsp;&lt;&nbsp;arrayList.size();&nbsp;i++)&nbsp;{this.s}<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;System.out.println(arrayList.get(i));<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;}<br/>
Exception&nbsp;in&nbsp;thread&nbsp;&quot;main&quot;&nbsp;java.lang.IndexOutOfBoundsException:&nbsp;Index:&nbsp;14,&nbsp;Size:&nbsp;13<br/>
	at&nbsp;java.util.ArrayList.rangeCheck(ArrayList.java:657)<br/>
	at&nbsp;java.util.ArrayList.remove(ArrayList.java:496)<br/>
	at&nbsp;org.kx.doe.care.ConcurrentExceptionTest.test4(ConcurrentExceptionTest.java:98)<br/>
	at&nbsp;org.kx.doe.care.ConcurrentExceptionTest.main(ConcurrentExceptionTest.java:13)&nbsp;&nbsp;&nbsp;&nbsp;<br/>
</code></pre>
                        <p>可以看出 超出数组长度了，因为你删除了元素，但是未改变迭代的下标，这样当迭代到最后一个的时候就会抛异常。</p>
                        <p>相当于在for循环过程中，list的长度真实减少了，而你还想访问下标为14的元素，故抛出超出list长度异常。</p>
                        <p>如果改为倒排删除呢？</p>

                        <pre><code>    public static void test3() {this.s}<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;ArrayList&lt;Integer&gt;&nbsp;arrayList&nbsp;=&nbsp;new&nbsp;ArrayList&lt;&gt;();<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;for&nbsp;(int&nbsp;i&nbsp;=&nbsp;0;&nbsp;i&nbsp;&lt;&nbsp;20;&nbsp;i++)&nbsp;{this.s}<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;arrayList.add(Integer.valueOf(i));<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;for(int&nbsp;i&nbsp;=19;i&gt;=0;i--){this.s}<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;if(i&nbsp;%2&nbsp;==&nbsp;0){this.s}<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;arrayList.remove(i);<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;System.out.println(arrayList.get(i));<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;}<br/>
19<br/>
19<br/>
17<br/>
17<br/>
15<br/>
15<br/>
13<br/>
13<br/>
11<br/>
11<br/>
9<br/>
9<br/>
7<br/>
7<br/>
5<br/>
5<br/>
3<br/>
3<br/>
1<br/>
1<br/>
</code></pre>
                        <p>上面的代码可以很好的运行，分析一下：</p>
                        <p>相当于在删除元素的同时，list长度减少1，而你的索引也减少1;假如i=18的下标元素被删除了，list的长度变为19，next(i)= 17，当执行sout(list.get(i)),此时i=18，正好list.get(19)和前一次打印的元素是同一个元素，都为19。</p>
                        <p>所以看到的奇数数字都打印了2次。</p>
                        <p>&nbsp;</p>
                        <h3 id="ConcurrentModificationException怎么解决"><a href="javascript:void(0)" class="anchor">ConcurrentModificationException怎么解决</a></h3>
                        <h4 id="单线程中的解决方案"><a href="javascript:void(0)" class="anchor">单线程中的解决方案</a></h4>
                        <pre><code>    public static void test8() {this.s}<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;ArrayList&lt;Integer&gt;&nbsp;arrayList&nbsp;=&nbsp;new&nbsp;ArrayList&lt;&gt;();<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;for&nbsp;(int&nbsp;i&nbsp;=&nbsp;0;&nbsp;i&nbsp;&lt;&nbsp;20;&nbsp;i++)&nbsp;{this.s}<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;arrayList.add(Integer.valueOf(i));<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;//&nbsp;复现方法一<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Iterator&lt;Integer&gt;&nbsp;iterator&nbsp;=&nbsp;arrayList.iterator();<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;while&nbsp;(iterator.hasNext())&nbsp;{this.s}<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Integer&nbsp;integer&nbsp;=&nbsp;iterator.next();<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;if&nbsp;(integer.intValue()&nbsp;==&nbsp;5)&nbsp;{this.s}<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;iterator.remove();<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;}<br/>
</code></pre>
                        <p>上面的代码中使用，iterator.remove() 而不是使用arrayList.remove(integer);就可以实现删除的操作，因为iterator.remove()是调用iterator的remove而不是arrayList.remove；使用iterator.remove()中会重新进行</p>
                        <pre><code> ArrayList.this.remove(lastRet);<br/>
expectedModCount&nbsp;=&nbsp;ArrayList.this.modCount;<br/>
</code></pre>
                        <p>在iterator.remove()方法中，同样调用了ArrayList自身的remove方法，但是调用完之后并非就return了，而是expectedModCount = modCount重置了expectedModCount值，使二者的值继续保持相等。</p>
                        <p>使用for (User ecity : list1)是行不通的，因为没有拿到 iterator对象。</p>
                        <p>&nbsp;</p>
                        <h4 id="多线程的解决方案"><a href="javascript:void(0)" class="anchor">多线程的解决方案</a></h4>
                        <p>1、加同步锁</p>
                        <p>2、CopyOnWriteArrayList</p>
                        <p>&nbsp;</p>
                        <h3 id="CopyOnWriteArrayList是线程安全的吗？"><a href="javascript:void(0)" class="anchor">CopyOnWriteArrayList是线程安全的吗？</a></h3>
                        <p>前面提到使用CopyOnWriteArrayList来解决多线程链表的操作，但是看了CopyOnWriteArrayList源码后发现，还是存在问题的：</p>
                        <pre><code>public class CopyOnWriteArrayList&lt;E&gt;<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;implements&nbsp;List&lt;E&gt;,&nbsp;RandomAccess,&nbsp;Cloneable,&nbsp;java.io.Serializable&nbsp;{this.s}<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;private&nbsp;transient&nbsp;volatile&nbsp;Object[]&nbsp;array;<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;final&nbsp;Object[]&nbsp;getArray()&nbsp;{this.s}<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;return&nbsp;array;<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;}<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;final&nbsp;void&nbsp;setArray(Object[]&nbsp;a)&nbsp;{this.s}<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;array&nbsp;=&nbsp;a;<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;}<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;public&nbsp;CopyOnWriteArrayList()&nbsp;{this.s}<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;setArray(new&nbsp;Object[0]);<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;}<br/>
</code></pre>
                        <p>例：</p>
                        <pre><code>public static void test9() {this.s}<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;final&nbsp;List&lt;Integer&gt;&nbsp;list&nbsp;=&nbsp;new&nbsp;CopyOnWriteArrayList&lt;&gt;();<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;for&nbsp;(int&nbsp;i&nbsp;=&nbsp;0;&nbsp;i&nbsp;&lt;&nbsp;20;&nbsp;i++)&nbsp;{this.s}<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;list.add(Integer.valueOf(i));<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Thread&nbsp;thread1&nbsp;=&nbsp;new&nbsp;Thread(new&nbsp;Runnable()&nbsp;{this.s}<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;@Override<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;public&nbsp;void&nbsp;run()&nbsp;{this.s}<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;ListIterator&lt;Integer&gt;&nbsp;iterator&nbsp;=&nbsp;list.listIterator();<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;while&nbsp;(iterator.hasNext())&nbsp;{this.s}<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;System.out.println(&quot;thread1&nbsp;&quot;&nbsp;+&nbsp;iterator.next().intValue());<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;try&nbsp;{this.s}<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Thread.sleep(1000);<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}&nbsp;catch&nbsp;(InterruptedException&nbsp;e)&nbsp;{this.s}<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;e.printStackTrace();<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;});<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Thread&nbsp;thread2&nbsp;=&nbsp;new&nbsp;Thread(new&nbsp;Runnable()&nbsp;{this.s}<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;@Override<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;public&nbsp;void&nbsp;run()&nbsp;{this.s}<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;for&nbsp;(Integer&nbsp;integer&nbsp;:&nbsp;list)&nbsp;{this.s}<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;System.out.println(&quot;thread2&nbsp;&quot;&nbsp;+&nbsp;integer.intValue());<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;if&nbsp;(integer.intValue()&nbsp;==&nbsp;5)&nbsp;{this.s}<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;list.remove(integer);<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;for&nbsp;(Integer&nbsp;integer&nbsp;:&nbsp;list)&nbsp;{this.s}<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;System.out.println(&quot;thread2&nbsp;again&nbsp;&quot;&nbsp;+&nbsp;integer.intValue());<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;});<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;thread1.start();<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;thread2.start();<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;}<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;thread1&nbsp;0<br/>
thread2&nbsp;0<br/>
thread2&nbsp;1<br/>
thread2&nbsp;2<br/>
thread2&nbsp;3<br/>
thread2&nbsp;4<br/>
thread2&nbsp;5<br/>
thread2&nbsp;6<br/>
thread2&nbsp;7<br/>
thread2&nbsp;8<br/>
thread2&nbsp;9<br/>
thread2&nbsp;10<br/>
thread2&nbsp;11<br/>
thread2&nbsp;12<br/>
thread2&nbsp;13<br/>
thread2&nbsp;14<br/>
thread2&nbsp;15<br/>
thread2&nbsp;16<br/>
thread2&nbsp;17<br/>
thread2&nbsp;18<br/>
thread2&nbsp;19<br/>
thread2&nbsp;again&nbsp;0<br/>
thread2&nbsp;again&nbsp;1<br/>
thread2&nbsp;again&nbsp;2<br/>
thread2&nbsp;again&nbsp;3<br/>
thread2&nbsp;again&nbsp;4<br/>
thread2&nbsp;again&nbsp;6<br/>
thread2&nbsp;again&nbsp;7<br/>
thread2&nbsp;again&nbsp;8<br/>
thread2&nbsp;again&nbsp;9<br/>
thread2&nbsp;again&nbsp;10<br/>
thread2&nbsp;again&nbsp;11<br/>
thread2&nbsp;again&nbsp;12<br/>
thread2&nbsp;again&nbsp;13<br/>
thread2&nbsp;again&nbsp;14<br/>
thread2&nbsp;again&nbsp;15<br/>
thread2&nbsp;again&nbsp;16<br/>
thread2&nbsp;again&nbsp;17<br/>
thread2&nbsp;again&nbsp;18<br/>
thread2&nbsp;again&nbsp;19<br/>
thread1&nbsp;1<br/>
thread1&nbsp;2<br/>
thread1&nbsp;3<br/>
thread1&nbsp;4<br/>
thread1&nbsp;5<br/>
thread1&nbsp;6<br/>
thread1&nbsp;7<br/>
thread1&nbsp;8<br/>
thread1&nbsp;9<br/>
thread1&nbsp;10<br/>
thread1&nbsp;11<br/>
thread1&nbsp;12<br/>
thread1&nbsp;13<br/>
thread1&nbsp;14<br/>
thread1&nbsp;15<br/>
thread1&nbsp;16<br/>
thread1&nbsp;17<br/>
thread1&nbsp;18<br/>
thread1&nbsp;19<br/>
</code></pre>
                        <p>我们先分析thread2的输出结果，第一次遍历将4 5 6都输出，情理之中；第一次遍历后删除掉了一个元素，第二次遍历输出4 6，符合我们的预期。</p>
                        <p>再来看下thread1的输出结果，有意思的事情来了，thread1 仍然输出了4 5 6，什么鬼？thread1和thread2都是遍历list，list在thread1遍历第二个元素的时候就已经删除了一个元素了，为啥还能输出5？</p>
                        <p>CopyOnWriteArrayList本质上是对array数组的一个封装，一旦CopyOnWriteArrayList对象发生任何的修改都会new一个新的Object[]数组newElement，在newElement数组上执行修改操作，修改完成后将newElement赋值给array数组（array=newElement）。</p>
                        <p>因为array是volatile的，因此它的修改对所有线程都可见。</p>
                        <p>&nbsp;</p>
                        <p>了解了CopyOnWriteArrayList的实现思路之后，我们再来分析上面代码test6为什么会出现那样的输出结果。先来看下thread2中用到的遍历方式的源码：</p>
                        <pre><code>public ListIterator&lt;E&gt; listIterator() {this.s}<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;return&nbsp;new&nbsp;COWIterator&lt;E&gt;(getArray(),&nbsp;0);<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;}<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;static&nbsp;final&nbsp;class&nbsp;COWIterator&lt;E&gt;&nbsp;implements&nbsp;ListIterator&lt;E&gt;&nbsp;{this.s}<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;	private&nbsp;final&nbsp;Object[]&nbsp;snapshot;<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;private&nbsp;int&nbsp;cursor;<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;private&nbsp;COWIterator(Object[]&nbsp;elements,&nbsp;int&nbsp;initialCursor)&nbsp;{this.s}<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;cursor&nbsp;=&nbsp;initialCursor;<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;//&nbsp;初始化为当前数组<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;snapshot&nbsp;=&nbsp;elements;<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br/>
...&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<br/>
</code></pre>
                        <p>上面看到snapshot 这个对象不是线程可见的。</p>
                        <p>再看下thread1中用到的遍历方式的源码：</p>
                        <pre><code> public void forEach(Consumer&lt;? super E&gt; action) {this.s}<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Object[]&nbsp;elements&nbsp;=&nbsp;getArray();<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;int&nbsp;len&nbsp;=&nbsp;elements.length;<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;for&nbsp;(int&nbsp;i&nbsp;=&nbsp;0;&nbsp;i&nbsp;&lt;&nbsp;len;&nbsp;++i)&nbsp;{this.s}<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;@SuppressWarnings(&quot;unchecked&quot;)&nbsp;E&nbsp;e&nbsp;=&nbsp;(E)&nbsp;elements[i];<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;action.accept(e);<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br/>
</code></pre>
                        <p>这两种遍历方式有个共同的特点：<strong>都在初始化的时候将当前数组保存下来了，之后的遍历都将会遍历这个数组，而不管array如何变化。</strong></p>
                        <p>有了这个时间节点表就很清楚了，thread1和thread2 start的时候都会将A数组初始化给自己的临时变量，之后遍历的也都是这个A数组，而不管CopyOnWriteArrayList中的array发生了什么变化。因此也就解释了thread1在thread2 remove掉一个元素之后为什么还会输出5了。在thread2中，第二次遍历初始化数组变成了当前的array，也就是修改后的B，因此不会有Integer.valueOf(5)这个元素了。</p>
                        <p>&nbsp;</p>
                        <p>此外CopyOnWriteArrayList中的ListIterator实现是不支持remove、add和set操作的，一旦调用就会抛出UnsupportedOperationException异常。</p>
                        <p>&nbsp;</p>
                        <p>所以需要多线程修改list时，都是不安全的，不管是使用同步块还是CopyOnWriteArrayList。这里说的不安全，即包括数据一致问题，也包括数据下标超出问题。</p>
                        <p>&nbsp;</p>


                    </Col>
                    <Col span={1}>
                    </Col>
                    <Col span={4}>
                         <Anchor showInkInFixed="true">
                                 <Link href="#next()时抛出ConcurrentModificationException" title="next()时抛出ConcurrentModificationException"/>
                                 <Link href="#for循环 时抛出ConcurrentModificationException" title="for循环 时抛出ConcurrentModificationException"/>
                                 <Link href="#为什么倒排删除是可以的？" title="为什么倒排删除是可以的？"/>
                                 <Link href="#ConcurrentModificationException怎么解决" title="ConcurrentModificationException怎么解决">
                                 <Link href="#单线程中的解决方案" title="单线程中的解决方案"/>
                                 <Link href="#多线程的解决方案" title="多线程的解决方案"/>
                                 </Link>
                                 <Link href="#CopyOnWriteArrayList是线程安全的吗？" title="CopyOnWriteArrayList是线程安全的吗？"/>
                        </Anchor>
                    </Col>
                </Row>


            </div>

        );
    }
}

export default ASK5;
