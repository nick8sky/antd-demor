## Object有哪些公用方法

**clone** 保护方法，实现对象的浅复制，只有实现了Cloneable接口才可以调用该方法，否则抛出CloneNotSupportedException异常。

```
public class MMM implements Cloneable {
    //由于clone方法为protected修饰，所以要自己实现clone方法。
    @Override
    protected Object clone() throws CloneNotSupportedException {
        return super.clone();
    }

    private String name = "123456";
}
```

**equals**在Object中与==是一样的，子类一般需要重写该方法。

**hashCode**该方法用于哈希查找，重写了equals方法一般都要重写hashCode方法。这个方法在一些具有哈希功能的Collection中用到。

**getClass** final方法，获得运行时类型

**wait**使当前线程等待该对象的锁，当前线程必须是该对象的拥有者，也就是具有该对象的锁。**wait()** 方法一直等待，直到获得锁或者被中断。**wait(long timeout)** 设定一个超时间隔，如果在规定时间内没有获得锁就返回。

**notify** 唤醒在该对象上等待的某个线程。

**notifyAll** 唤醒在该对象上等待的所有线程。

**toString** 转换成字符串，一般子类都有重写，否则打印句柄。



## 为什么重载hashCode方法？

一般的地方不需要重载hashCode，只有当类需要放在HashTable、HashMap、HashSet等等hash结构的集合时才会重载hashCode，那么为什么要重载hashCode呢？

如果你重写了equals，比如说是基于对象的内容实现的，而保留hashCode的实现不变，那么很可能某两个对象明明是“相等”，而hashCode却不一样。

这样，当你用其中的一个作为键保存到hashMap、hasoTable或hashSet中，再以“相等的”找另一个作为键值去查找他们的时候，则根本找不到。

**为什么equals()相等，hashCode就一定要相等，而hashCode相等，却不要求equals相等?**

1、因为是按照hashCode来访问小内存块，所以hashCode必须相等。2、HashMap获取一个对象是比较key的hashCode相等和equal为true。

之所以hashCode相等，却可以equal不等，就比如ObjectA和ObjectB他们都有属性name，那么hashCode都以name计算，所以hashCode一样，但是两个对象属于不同类型，所以equal为false。

**为什么需要hashCode?**

1、通过hashCode可以很快的查到小内存块。2、通过hashCode比较比equal方法快，当get时先比较hashCode，如果hashCode不同，直接返回false。



## ArrayList、LinkedList、Vector的区别？

**List的三个子类的特点**

**ArrayList:**

- 底层数据结构是数组，查询快，增删慢。
- 线程不安全，效率高。

**Vector:**

- 底层数据结构是数组，查询快，增删慢。
- 线程安全，效率低。
- Vector相对ArrayList查询慢(线程安全的)。
- Vector相对LinkedList增删慢(数组结构)。

**LinkedList**

- 底层数据结构是链表，查询慢，增删快。
- 线程不安全，效率高。

**Vector和ArrayList的区别**

- Vector是线程安全的,效率低。
- ArrayList是线程不安全的,效率高。
- 共同点:底层数据结构都是数组实现的,查询快,增删慢。

**ArrayList和LinkedList的区别**

- ArrayList底层是数组结果,查询和修改快。
- LinkedList底层是链表结构的,增和删比较快,查询和修改比较慢。
- ​

**共同点:都是线程不安全的**

**List有三个子类使用**

- 查询多用ArrayList。
- 增删多用LinkedList。
- 如果都多ArrayList。



## Map、Set、List、Queue、Stack的特点与用法？

**Map**

- Map是键值对，键Key是唯一不能重复的，一个键对应一个值，值可以重复。
- TreeMap可以保证顺序。
- HashMap不保证顺序，即为无序的。
- Map中可以将Key和Value单独抽取出来，其中KeySet()方法可以将所有的keys抽取正一个Set。而Values()方法可以将map中所有的values抽取成一个集合。

**Set**

- 不包含重复元素的集合，set中最多包含一个null元素。
- 只能用Lterator实现单项遍历，Set中没有同步方法。

**List**

- 有序的可重复集合。
- 可以在任意位置增加删除元素。
- 用Iterator实现单向遍历，也可用ListIterator实现双向遍历。

**Queue**

- Queue遵从先进先出原则。
- 使用时尽量避免add()和remove()方法,而是使用offer()来添加元素，使用poll()来移除元素，它的优点是可以通过返回值来判断是否成功。
- LinkedList实现了Queue接口。
- Queue通常不允许插入null元素。

**Stack**

- Stack遵从后进先出原则。
- Stack继承自Vector。
- 它通过五个操作对类Vector进行扩展，允许将向量视为堆栈，它提供了通常的push和pop操作，以及取堆栈顶点的peek()方法、测试堆栈是否为空的empty方法等。

**用法**

- 如果涉及堆栈，队列等操作，建议使用List。
- 对于快速插入和删除元素的，建议使用LinkedList。
- 如果需要快速随机访问元素的，建议使用ArrayList。

**更为精炼的总结**

**Collection 是对象集合， Collection 有两个子接口 List 和 Set**

**List** 可以通过下标 (1,2..) 来取得值，值可以重复。**Set** 只能通过游标来取值，并且值是不能重复的。

**ArrayList ， Vector ， LinkedList 是 List 的实现类**

- ArrayList 是线程不安全的， Vector 是线程安全的，这两个类底层都是由数组实现的。
- LinkedList 是线程不安全的，底层是由链表实现的。

**Map 是键值对集合**

- HashTable 和 HashMap 是 Map 的实现类。
- HashTable 是线程安全的，不能存储 null 值。
- HashMap 不是线程安全的，可以存储 null 值。

**Stack类**：继承自Vector，实现一个后进先出的栈。提供了几个基本方法，push、pop、peak、empty、search等。

**Queue接口**：提供了几个基本方法，offer、poll、peek等。已知实现类有LinkedList、PriorityQueue等。



## TreeMap、HashMap、LindedHashMap的区别？

**LinkedHashMap**可以保证HashMap集合有序，存入的顺序和取出的顺序一致。

**TreeMap**实现SortMap接口，能够把它保存的记录根据键排序,默认是按键值的升序排序，也可以指定排序的比较器，当用Iterator遍历TreeMap时，得到的记录是排过序的。

**HashMap**不保证顺序，即为无序的，具有很快的访问速度。**HashMap**最多只允许一条记录的键为Null;允许多条记录的值为 Null。**HashMap**不支持线程的同步。

我们在开发的过程中**使用HashMap比较多，在Map中在Map 中插入、删除和定位元素，HashMap 是最好的选择**。

但如果您要**按自然顺序或自定义顺序遍历键**，那么**TreeMap会更好**。

如果**需要输出的顺序和输入的相同**,那么**用LinkedHashMap 可以实现,它还可以按读取顺序来排列**。