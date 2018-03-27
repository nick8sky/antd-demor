import React, { Component } from 'react';
import Markdown from 'react-markdown';

class CTO7 extends Component {
    render() {
        return (
            <div>
                <Markdown source={"参考：http://odi.ch/prog/design/newbies.php\n" +
                "\n" +
                "**同步过度**\n" +
                "\n" +
                "```\n" +
                "Collection l = new Vector();\n" +
                "for (...) {\n" +
                "   l.add(object);\n" +
                "}\n" +
                "```\n" +
                "\n" +
                "局部变量没有必要选择同步集合框架\n" +
                "\n" +
                "```\n" +
                "Collection l = new ArrayList();\n" +
                "for (...) {\n" +
                "   l.add(object);\n" +
                "}\n" +
                "```\n" +
                "\n" +
                "**HashMap size 陷阱**\n" +
                "\n" +
                "```\n" +
                "Map map = new HashMap(collection.size());\n" +
                "```\n" +
                "\n" +
                "这个开发人员有很好的意图，并希望确保HashMap不需要调整大小。 因此，他将初始大小设置为他要投入的元素数量。 不幸的是，HashMap的实现并不像这样。 它将其内部阈值设置为threshold =（int）（capacity * loadFactor）。 因此，在75％的收藏插入地图后，它将调整大小。 上面的代码总是会调整大小。\n" +
                "\n" +
                "```\n" +
                "Map map = new HashMap(1 + (int) (collection.size() / 0.75));\n" +
                "```\n" +
                "\n" +
                "**不知道溢出**\n" +
                "\n" +
                "```\n" +
                "public int getFileSize(File f) {\n" +
                "  long l = f.length();\n" +
                "  return (int) l;\n" +
                "}\n" +
                "```\n" +
                "\n" +
                "正确示例：\n" +
                "\n" +
                "```\n" +
                "public int getFileSize(File f) {\n" +
                "  long l = f.length();\n" +
                "  if (l > Integer.MAX_VALUE) throw new IllegalStateException(\"int overflow\");\n" +
                "  return (int) l;\n" +
                "}\n" +
                "```\n" +
                "\n" +
                "```\n" +
                "int a = l.size();\n" +
                "a = a + 100;\n" +
                "if (a > Integer.MAX_VALUE)\n" +
                "    throw new ArithmeticException(\"int overflow\");\n" +
                "```\n" +
                "\n" +
                "**BigDecimal并不是一个好的货币计算单位**\n" +
                "\n" +
                "可能你已经知道float,doulbe在进行算术计算时，会发生精度问题，转而用BigDecimal,但是BigDecimal是一个比较大的对象,可能是long的3~6倍大，在进行计算时虽然能保证精度问题，但消耗的内存却是long的3~6；所以将float/double转换为long是一个不错的选择。\n" +
                "\n" +
                "**滥用finalize（）**\n" +
                "\n" +
                "```\n" +
                "public class FileBackedCache {\n" +
                "   private File backingStore;\n" +
                "   \n" +
                "   protected void finalize() throws IOException {\n" +
                "      if (backingStore != null) {\n" +
                "        backingStore.close();\n" +
                "        backingStore = null;\n" +
                "      }\n" +
                "   }\n" +
                "}\n" +
                "```\n" +
                "\n" +
                "该类使用finalize方法释放文件句柄。该方法由垃圾收集器调用。如果您用完文件句柄，则希望稍后调用此方法。但是当GC即将耗尽时GC可能只会调用该方法，这是一种非常不同的情况。在GC运行之前，close方法可能需要几毫秒到几天的时间，而file还没有完成关闭。\n" +
                "\n" +
                "\n" +
                "\n" +
                "**双重锁定快速死锁**\n" +
                "\n" +
                "```\n" +
                "class Message {\n" +
                "  private long id;\n" +
                "  ...\n" +
                "  public synchronized int compareTo(Message that) {\n" +
                "    synchronized (that) {\n" +
                "      return Long.compare(id, that.id);\n" +
                "    }\n" +
                "  }\n" +
                "}\n" +
                "```\n" +
                "\n" +
                "正确示例：\n" +
                "\n" +
                "```\n" +
                "public int compareTo(Message that) {\n" +
                "  long a;\n" +
                "  long b;\n" +
                "  synchronized (this) {\n" +
                "    a = this.id;\n" +
                "  }\n" +
                "  synchronized (that) {\n" +
                "    b = that.id;\n" +
                "  }\n" +
                "  return Long.compare(a, b);\n" +
                "}\n" +
                "```"}/>

            </div>
        );
    }
}

export default CTO7;