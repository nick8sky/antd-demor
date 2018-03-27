import React, {Component} from 'react';
import {Anchor, Row, Col} from 'antd';

const {Link} = Anchor;


class Command1 extends Component {
    render() {


        return (
            <div>
                <Row>
                    <Col span={19}>
                        <h2>Linux命令(文件查看和sed命令)</h2>
                        <h2 id='文件内容查看'><a href="javascript:void(0)"  class="anchor">文件内容查看</a></h2>
                        <p> <h3 id='tail命令'><a href="javascript:void(0)"  class="anchor">tail命令</a></h3></p>
                        <p>tail命令用于输入文件中的尾部内容。tail命令默认在屏幕上显示指定文件的末尾10行。</p>
                        <p>注意：如果表示字节或行数的N值之前有一个”+”号，则从文件开头的第N项开始显示，而不是显示文件的最后N项。</p>
                        <p>如：</p>
                        <pre><code>tail +20 file （显示文件file的内容，从第20行至文件末尾）<br/>
                            tail -10f file （显示文件file的最新追加10个字符）<br/>
                            tail -n 10 file （显示文件file的尾部10行内容）
                            </code></pre>
                        <p>&nbsp;</p>
                        <p> <h3 id='head命令'><a href="javascript:void(0)"  class="anchor">head命令</a></h3></p>
                        <p>head命令用于显示文件的开头的内容。在默认情况下，head命令显示文件的头10行内容。</p>
                        <p>如：</p>
                        <pre><code>head 200 nohup.out</code></pre>
                        <p>&nbsp;</p>
                        <p> <h3 id='more命令'><a href="javascript:void(0)"  class="anchor">more命令</a></h3></p>
                        <p>more命令是一个基于vi编辑器文本过滤器，它以全屏幕的方式按页显示文本文件的内容，支持vi中的关键字定位操作。more名单中内置了若干快捷键，常用的有H（获得帮助信息），Enter（<strong>向下</strong>翻滚一行），空格（<strong>向下</strong>滚动一屏），Q（退出命令）。
                        </p>
                        <p>如：</p>
                        <pre><code>more -200 nohup.out</code></pre>
                        <p>在屏幕的底部出现一个提示信息，给出至今己显示的该文件的百分比：--More--（XX%）</p>
                        <ul>
                            <li>按Space键：显示文本的下一屏内容。</li>
                            <li>按Enter键：只显示文本的下一行内容。</li>
                            <li>按H键：显示帮助屏，该屏上有相关的帮助信息。</li>
                            <li>按B键：显示上一屏内容。</li>
                            <li>按Q键：退出more命令。</li>

                        </ul>
                        <p>&nbsp;</p>
                        <p> <h3 id='less命令'><a href="javascript:void(0)"  class="anchor">less命令</a></h3></p>
                        <p>参考：<a href='https://www.cnblogs.com/ctaixw/p/5860221.html'
                                 target='_blank'>https://www.cnblogs.com/ctaixw/p/5860221.html</a></p>
                        <p>less命令的作用与more十分相似，都可以用来浏览文字档案的内容，不同的是less命令允许用户向前或向后浏览文件，而more命令只能向前浏览。用less命令显示文件时，用PageUp键向上翻页，用PageDown键向下翻页。要退出less程序，应按Q键。</p>

                        <p>less可以用G（大写字母G）直接到最后，跟vi 一样,q退出</p>
                        <p>&nbsp;</p>
                        <p> <h3 id='cat命令'><a href="javascript:void(0)"  class="anchor">cat命令</a></h3></p>
                        <p>cat命令连接文件并打印到标准输出设备上，cat经常用来显示文件的内容</p>
                        <p>注意：当文件较大时，文本在屏幕上迅速闪过（滚屏），用户往往看不清所显示的内容。因此，一般用more等命令分屏显示。 </p>
                        <p>&nbsp;</p>
                        <h3 id='文件编辑'><a href="javascript:void(0)"  class="anchor">文件编辑</a></h3>
                        <p> <h3 id='vi命令'><a href="javascript:void(0)"  class="anchor">vi命令</a></h3></p>
                        <p>vi命令是UNIX操作系统和类UNIX操作系统中最通用的全屏幕纯文本编辑器。Linux中的vi编辑器叫vim，它是vi的增强版（vi
                            Improved），与vi编辑器完全兼容，而且实现了很多增强功能。</p>
                        <pre><code>Ctrl+u：向文件首翻半屏；<br/>
                            Ctrl+d：向文件尾翻半屏；<br/>
                            Ctrl+f：向文件尾翻一屏；<br/>
                            Ctrl+b：向文件首翻一屏；<br/>
                            :行号：光标跳转到指定行的行首(使用shift + : 出现冒号)<br/>
                            :$：光标跳转到最后一行的行首；<br/>
                            D：删除当前光标到行尾的全部字符(D是大写)；<br/>
                            dd：删除光标行正行内容；<br/>
                            ndd：删除当前行及其后n-1行；<br/>
                            /字符串：文本查找操作，用于从当前光标所在位置开始向文件尾部查找指定字符串的内容，查找的字符串会被加亮显示；<br/>
                            ？name：文本查找操作，用于从当前光标所在位置开始向文件头部查找指定字符串的内容，查找的字符串会被加亮显示；<br/>
                            a：在当前字符后添加文本；<br/>
                            A：在行末添加文本；<br/>
                            i：在当前字符前插入文本；<br/>
                            I：在行首插入文本；<br/>
                            <br/>
                            o：在当前行后面插入一空行；<br/>
                            O：在当前行前面插入一空行；<br/>
                            :wq：在命令模式下，执行存盘退出操作；<br/>
                            :w：在命令模式下，执行存盘操作；<br/>
                            :w！：在命令模式下，执行强制存盘操作；<br/>
                            :q：在命令模式下，执行退出vi操作；<br/>
                            :q！：在命令模式下，执行强制退出vi操作；
                            </code></pre>
                        <p>/字符串：文本查找操作，用于从当前光标所在位置开始<strong>向文件尾部</strong></p>
                        <p>？name：文本查找操作，用于从当前光标所在位置开始<strong>向文件头部</strong></p>
                        <p>&nbsp;</p>
                        <hr/>
                        <h2 id='sed命令'><a href="javascript:void(0)"  class="anchor">sed命令</a></h2>
                        <p>sed是一种流编辑器，它是文本处理中非常中的工具，能够完美的<strong>配合正则表达式使用</strong>，功能不同凡响。处理时，把当前处理的行存储在临时缓冲区中，称为“模式空间”（pattern
                            space），接着用sed命令处理缓冲区中的内容，处理完成后，把缓冲区的内容送往屏幕。接着处理下一行，这样不断重复，直到文件末尾。文件内容并没有
                            改变，除非你使用重定向存储输出。Sed主要用来自动编辑一个或多个文件；简化对文件的反复操作；编写转换程序等。</p>
                        <p><strong>sed命令的选项(option)：</strong></p>
                        <p>-n ：只打印模式匹配的行</p>
                        <p>-e ：直接在命令行模式上进行sed动作编辑，此为默认选项</p>
                        <p>-f ：将sed的动作写在一个文件内，用–f filename 执行filename内的sed动作</p>
                        <p>-r ：支持扩展表达式</p>
                        <p>-i ：直接修改文件内容</p>
                        <p> <h3 id='sed的编辑命令'><a href="javascript:void(0)"  class="anchor">sed的编辑命令(sed command)</a></h3></p>
                        <figure>
                            <table>
                                <thead>
                                <tr>
                                    <th>Command</th>
                                    <th>注释</th>
                                    <th>样例</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr>
                                    <td>=</td>
                                    <td>显示文件行号</td>
                                    <td> sed &#39;=&#39; 1.txt</td>
                                </tr>
                                <tr>
                                    <td>a\</td>
                                    <td>在定位行号后附加新文本信息(但没有保存)</td>
                                    <td> sed  &#39;1a\www&#39; 1.txt</td>
                                </tr>
                                <tr>
                                    <td>i\</td>
                                    <td>在定位行号后插入新文本信息(但没有保存)</td>
                                    <td> sed  &#39;1i\www&#39; 1.txt</td>
                                </tr>
                                <tr>
                                    <td>d</td>
                                    <td>删除定位行(但没有保存)</td>
                                    <td> sed  &#39;1d&#39; 1.txt</td>
                                </tr>
                                <tr>
                                    <td>c\</td>
                                    <td>用新文本替换定位文本但没有保存)</td>
                                    <td> sed  &#39;c\www&#39; 1.txt</td>
                                </tr>
                                <tr>
                                    <td>w filename</td>
                                    <td>写文本到一个文件，类似输出重定向 &gt;(生成新文件)</td>
                                    <td> sed &#39;w x.tt&#39; 1.txt</td>
                                </tr>
                                <tr>
                                    <td>r filename</td>
                                    <td>从另一个文件中读文本，类似输入重定向 &lt; (但没有保存)</td>
                                    <td> sed &#39;r x.tt&#39; 1.txt</td>
                                </tr>
                                <tr>
                                    <td>s</td>
                                    <td>替换(但没有保存)</td>
                                    <td> sed  &#39;s/a/A/g&#39;  1.txt</td>
                                </tr>
                                <tr>
                                    <td>q</td>
                                    <td>第一个模式匹配完成后退出或立即退出</td>
                                    <td>?</td>
                                </tr>
                                <tr>
                                    <td>l</td>
                                    <td>显示与八进制ACSII代码等价的控制符</td>
                                    <td>?</td>
                                </tr>
                                <tr>
                                    <td>{}</td>
                                    <td>在定位行执行的命令组，用分号隔开</td>
                                    <td>?</td>
                                </tr>
                                <tr>
                                    <td>n</td>
                                    <td>从另一个文件中读文本下一行，并从下一条命令而不是第一条命令开始对其的处理</td>
                                    <td>?</td>
                                </tr>
                                <tr>
                                    <td>N</td>
                                    <td>在数据流中添加下一行以创建用于处理的多行组</td>
                                    <td>?</td>
                                </tr>
                                <tr>
                                    <td>g</td>
                                    <td>将模式2粘贴到/pattern n/</td>
                                    <td>?</td>
                                </tr>
                                <tr>
                                    <td>y</td>
                                    <td>传送字符，替换单个字符</td>
                                    <td>?</td>
                                </tr>
                                <tr>
                                    <td>p</td>
                                    <td>打印匹配行（和-n选项一起合用）</td>
                                    <td> sed &#39;1p&#39; 1.txt 多打印第二行 sed -n &#39;2p&#39;  1.txt 只打印第二行 sed
                                        -n &#39;1,2p&#39;  1.txt 只打印第一、二行
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                        </figure>
                        <p><strong>sed在文件中查询文本的方式：</strong></p>
                        <figure>
                            <table>
                                <thead>
                                <tr>
                                    <th>x</th>
                                    <th>x为行号</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr>
                                    <td>x,y</td>
                                    <td>表示行号从x到y</td>
                                </tr>
                                <tr>
                                    <td>/pattern</td>
                                    <td>查询包含模式的行</td>
                                </tr>
                                <tr>
                                    <td>x,y!{}</td>
                                    <td>!和{}都是命令</td>
                                </tr>
                                <tr>
                                    <td>/pattern/,x</td>
                                    <td>匹配行之后到x行</td>
                                </tr>
                                <tr>
                                    <td>x,/pattern/</td>
                                    <td>从x行到第一次匹配行</td>
                                </tr>
                                </tbody>
                            </table>
                        </figure>
                        <p>接着上面的命令：</p>
                        <pre><code> sed  -n &#39;/abc/p&#39;  1.txt    只打印匹配abc的行<br/>
                         sed -n &#39;/fee/,3p&#39; 1.txt    匹配行到第3行，注意p前没有/<br/>
                         sed -n &#39;1,/fee/p&#39; 1.txt    第一行到匹配行<br/>
                         sed -n &#39;1,4!&#123=;p}&#39; 1.txt   一到4行之间非操作<br/>
                        </code></pre>
                        <p>文件1.txt:</p>
                        <pre><code>abcdef<br/>
                            feegafgert<br/>
                            11<br/>
                            22<br/>
                            efd<br/>
                            <br/>
                            4e5re<br/>
                            13ere
                            </code></pre>
                        <h3 id='使用正则表达式'><strong><a href="javascript:void(0)"  class="anchor">使用正则表达式</a></strong></h3>

                        <figure>
                            <table>
                                <thead>
                                <tr>
                                    <th>^</th>
                                    <th>锚点行首的符合条件的内容，用法格式&quot;^pattern&quot;</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr>
                                    <td>$</td>
                                    <td>锚点行首的符合条件的内容，用法格式&quot;pattern$&quot;</td>
                                </tr>
                                <tr>
                                    <td>^$</td>
                                    <td>空白行</td>
                                </tr>
                                <tr>
                                    <td>.</td>
                                    <td>匹配任意单个字符</td>
                                </tr>
                                <tr>
                                    <td>*</td>
                                    <td>匹配紧挨在前面的字符任意次(0,1,多次)</td>
                                </tr>
                                <tr>
                                    <td>.*</td>
                                    <td>匹配任意长度的任意字符</td>
                                </tr>
                                <tr>
                                    <td>\？</td>
                                    <td>匹配紧挨在前面的字符0次或1次</td>
                                </tr>
                                <tr>
                                    <td>&#123m,n}</td>
                                    <td>匹配其前面的字符至少m次，至多n次</td>
                                </tr>
                                <tr>
                                    <td>&#123m,}</td>
                                    <td>匹配其前面的字符至少m次</td>
                                </tr>
                                <tr>
                                    <td>&#123m}</td>
                                    <td>精确匹配前面的m次&#1230,n}:0到n次</td>
                                </tr>
                                <tr>
                                    <td>&lt;</td>
                                    <td>锚点词首----相当于 \b，用法格式：&lt;pattern</td>
                                </tr>
                                <tr>
                                    <td>&gt;</td>
                                    <td>锚点词尾，用法格式:&gt;pattern</td>
                                </tr>
                                <tr>
                                    <td>&lt;pattern&gt;</td>
                                    <td>单词锚点</td>
                                </tr>
                                <tr>
                                    <td></td>
                                    <td>分组，用法格式：pattern，引用\1,\2</td>
                                </tr>
                                <tr>
                                    <td>[]</td>
                                    <td>匹配指定范围内的任意单个字符</td>
                                </tr>
                                <tr>
                                    <td>[^]</td>
                                    <td>匹配指定范围外的任意单个字符</td>
                                </tr>
                                <tr>
                                    <td>[:digit:]</td>
                                    <td>所有数字, 相当于0-9， [0-9]---&gt; [[:digit:]]</td>
                                </tr>
                                <tr>
                                    <td>[:lower:]</td>
                                    <td>所有的小写字母</td>
                                </tr>
                                <tr>
                                    <td>[:upper:]</td>
                                    <td>所有的大写字母</td>
                                </tr>
                                <tr>
                                    <td>[:alpha:]</td>
                                    <td>所有的字母</td>
                                </tr>
                                <tr>
                                    <td>[:alnum:]</td>
                                    <td>相当于0-9a-zA-Z</td>
                                </tr>
                                <tr>
                                    <td>[:space:]</td>
                                    <td>空白字符</td>
                                </tr>
                                <tr>
                                    <td>[:punct:]</td>
                                    <td>所有标点符号</td>
                                </tr>
                                </tbody>
                            </table>
                        </figure>
                        <p>例如：</p>
                        <pre><code>sed &#39;3 q&#39; 1.txt  //打印前三行<br/>
                            sed -n&#39;/a*f/p&#39; 1.txt  //打印匹配a有0个或者多个，后接一个f字符的行(不是以收尾) <br/>
                            sed -n &#39;/^a.*f$/p&#39; 1.txt  //a开头f结尾的行<br/>
                            sed -n &#39;/.*a./p&#39; 1.txt  //含有a的行<br/>
                            sed -n &#39;/e\&#1231,\}/p&#39; 1.txt   //e重复1次以上<br/>
                            sed -n &#39;/e*/p&#39; 1.txt  //e任意次数(0或n)<br/>
                            sed -n &#39;/e\&#1231,2\}/p&#39; 1.txt   //e重复1次到2次的行<br/>

                            sed -n &#39;/^a.*f$/!p&#39; 1.txt  //不以a开头f结尾的行<br/>
                            sed -n &#39;/e\&#1231,2\}/!p&#39; 1.txt // ! e重复1次到2次的行<br/>
                            sed -n &#39;/^#/!&#123/&#8743&#36/!p}&#39; 1.txt  //排除非#的空行<br/>
                            sed -e &#39;/^#/d&#39; -e &#39;/^$/d&#39; 1.txt  //删除#和空行，d是删除操作，配合 -e使用
                            </code></pre>
                        <p><strong><h3 id='对文件内容的添加'><a href="javascript:void(0)"  class="anchor">对文件内容的添加</a></h3></strong>
                        </p>
                        <p><strong>不加参数 -i是不会对文件修改的</strong></p>
                        <p>文件的行首添加一行 :</p>
                        <pre><code>$ sed -i &#39;1 i\sed command start&#39; 1.txt    <br/>
                        $ cat 1.txt <br/>
                            sed command start  //直接加到文件中了<br/>
                            abcdef
                        </code></pre>
                        <p>文件的行尾追加一行 :</p>
                        <pre><code>sed -i &#39;$a \sed command end&#39; 1.txt  <br/></code></pre>
                        <p>在匹配字符串的行首加内容：</p>
                        <pre><code>$ sed &#39;/command/s/^/hello /&#39; 1.txt <br/>
                            hello sed command start</code></pre>
                        <p>在匹配字符串的行尾加内容：</p>
                        <pre><code>sed &#39;/command/s/$/ hello /&#39; 1.txt<br/>
                            sed command start hello
                            </code></pre>
                        <p>在匹配字符串前加内容：</p>
                        <pre><code>sed &#39;s/command/ss &amp;/&#39; 1.txt     //注意这里s前没有/<br/>
                            sed ss command start
                            </code></pre>
                        <p>在匹配字符串前加内容：</p>
                        <pre><code>sed &#39;s/command/&amp; ss/&#39; 1.txt     //注意这里s前没有/<br/>
                            sed command ss start
                            </code></pre>
                        <p>在匹配字符的行前插入一行内容：</p>
                        <pre><code>$ sed &#39;/abc/i hello/&#39; 1.txt
                                sed command start
                                </code></pre>
                        <p>在匹配字符的行后插入一行内容：</p>
                        <pre><code>$ sed &#39;/abc/a hello/&#39; 1.txt <br/>
                            sed command start<br/>
                            abcdef<br/>
                            hello/
                            </code></pre>
                        <p>插入多行需要使用\n转义：</p>
                        <pre><code>]$ sed &#39;/abc/a hello\nddd\ndcdd&#39; 1.txt <br/>
                                sed command start<br/>
                                abcdef<br/>
                                hello<br/>
                                ddd<br/>
                                dcdd
                                </code></pre>
                        <p>在每行前加内容：</p>
                        <pre><code>$ sed &#39;s/^/hello /&#39; 1.txt <br/>
                            hello sed command start<br/>
                            hello abcdef<br/>
                            hello feegafgert
                            </code></pre>
                        <p>在每行尾加内容：</p>
                        <pre><code>sed &#39;s/$/ hello /&#39; 1.txt</code></pre>
                        <p>在指定行加内容：</p>
                        <pre><code>$ sed &#39;1s/^/nick /&#39; 1.txt <br/>
                            nick sed command start
                            </code></pre>
                        <p>在指定范围行加内容：</p>
                        <pre><code>$ sed &#39;1,4s/^/nick /&#39; 1.txt <br/>
                            nick sed command start<br/>
                            nick abcdef<br/>
                            nick feegafgert<br/>
                            nick 11
                            </code></pre>
                        <p>替换部分字符串</p>
                        <pre><code>$ sed &#39;/command/s@start@end@&#39; 1.txt <br/>
                                sed command end //后面的start -&gt; end
                                </code></pre>
                        <p>默认替换第一个：</p>
                        <pre><code>$ sed -i &#39;/command/s/$/ start/&#39; 1.txt
                            $ sed &#39;/command/s@start@end@&#39; 1.txt <br/>
                            sed command end start
                            </code></pre>


                    </Col>
                    <Col span={1}>
                    </Col>
                    <Col span={4}>
                        <Anchor showInkInFixed="true">
                            <Link href="#文件内容查看" title="文件内容查看">
                                <Link href="#tail命令" title="tail命令"/>
                                <Link href="#head命令" title="head命令"/>
                                <Link href="#more命令" title="more命令"/>
                                <Link href="#less命令" title="less命令"/>
                                <Link href="#cat命令" title="cat命令"/>
                            </Link>
                            <Link href="#文件编辑" title="文件编辑">
                                <Link href="#vi命令" title="vi命令"/>
                                <Link href="#sed命令" title="sed命令">
                                    <Link href="#sed的编辑命令" title="sed的编辑命令"/>
                                    <Link href="#使用正则表达式" title="使用正则表达式"/>
                                    <Link href="#对文件内容的添加" title="对文件内容的添加"/>
                                </Link>
                            </Link>
                        </Anchor>
                    </Col>
                </Row>


            </div>

        );
    }
}

export default Command1;
