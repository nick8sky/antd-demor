import React, {Component} from 'react';
import {Anchor, Row, Col} from 'antd';

const {Link} = Anchor;


class Command2 extends Component {
    render() {


        return (
            <div>
                <Row>
                    <Col span={19}>
                        <h2 id="文件压缩与解压"><a href="javascript:void(0)"  class="anchor">文件压缩与解压</a></h2>
                        <p>参考：<a href='http://man.linuxde.net/sub/%E6%96%87%E4%BB%B6%E5%8E%8B%E7%BC%A9%E4%B8%8E%E8%A7%A3%E5%8E%8B' target='_blank' >http://man.linuxde.net/sub/%E6%96%87%E4%BB%B6%E5%8E%8B%E7%BC%A9%E4%B8%8E%E8%A7%A3%E5%8E%8B</a></p>
                        <h3 id="zip命令"><a href="javascript:void(0)"  class="anchor">zip命令</a></h3>
                        <p>将/home/Blinux/html/这个目录下所有文件和文件夹打包为当前目录下的html.zip：</p>
                        <pre><code>zip -q -r html.zip /home/Blinux/html  //-q：不显示指令执行过程；</code></pre>
                        <p>上面的命令操作是将绝对地址的文件及文件夹进行压缩，以下给出压缩相对路径目录，比如目前在Bliux这个目录下，执行以下操作可以达到以上同样的效果：</p>
                        <pre><code>zip -q -r html.zip html</code></pre>
                        <p>比如现在我的html目录下，我操作的zip压缩命令是：</p>
                        <pre><code>zip -q -r html.zip *</code></pre>
                        <h3 id="unzip命令"><a href="javascript:void(0)"  class="anchor">unzip命令</a></h3>
                        <p>unzip命令用于解压缩由zip命令压缩的“.zip”压缩包。</p>
                        <p>将压缩文件text.zip在当前目录下解压缩。</p>
                        <pre><code>unzip test.zip</code></pre>
                        <p>&nbsp;</p>
                        <h3 id="tar 命令"><a href="javascript:void(0)"  class="anchor">tar 命令</a></h3>
                        <p><strong>将文件全部打包成tar包</strong>：</p>
                        <pre><code>tar -cvf log.tar *    仅打包，不压缩！ <br/>
                            tar -zcvf log.tar.gz *   打包后，以 gzip 压缩  <br/>
                            tar -jcvf log.tar.bz2 *  打包后，以 bzip2 压缩
                            </code></pre>
                        <p>在选项f之后为文件档名，习惯上都用 .tar 来作为辨识。 如果加z选项，则以.tar.gz或.tgz来代表gzip压缩过的tar包；如果加j选项，则以.tar.bz2来作为tar包名。</p>
                        <p><strong>将tar包解压缩</strong>：</p>
                        <pre><code>tar -zxvf /opt/soft/test/log.tar.gz</code></pre>
                        <p> </p>
                        <h3 id="jar命令"><a href="javascript:void(0)"  class="anchor">jar 命令</a></h3>
                        <p>解包：jar -xvf project.jar</p>
                        <p>&nbsp;</p>
                        <h2 id="文件传输"><a href="javascript:void(0)"  class="anchor">文件传输</a></h2>
                        <h3 id="scp命令"><a href="javascript:void(0)"  class="anchor">scp命令</a></h3>
                        <p>scp命令用于在Linux下进行远程拷贝文件的命令，和它类似的命令有cp，不过cp只是在本机进行拷贝不能跨服务器，而且scp传输是加密的。</p>
                        <pre><code>本地到远程 <br/>
                            scp -r hadoop   reducer2@sk2:/home/reducer2 <br/>
                             <br/>
                            远程到本地 <br/>
                            scp -r reducer2@sk2:/home/reducer2   hadoop
                            </code></pre>
                        <p>&nbsp;</p>
                        <h2 id="文件过滤分割与合并"><a href="javascript:void(0)"  class="anchor">文件过滤分割与合并</a></h2>
                        <h3 id="split命令"><a href="javascript:void(0)"  class="anchor">split命令</a></h3>
                        <p>split命令可以将一个大文件分割成很多个小文件，有时需要将文件分割成更小的片段，比如为提高可读性，生成日志等。</p>
                        <pre><code>split  -b  5k jquery.js <br/>
                        split [-a sufflen] [-b byte_count] [-l line_count] [-p pattern] <br/>
                                     [file [prefix]]
                        </code></pre>
                        <h3 id="grep命令"><a href="javascript:void(0)"  class="anchor">grep命令</a></h3>
                        <p>grep（global search regular expression(RE) and print out the line，全面搜索正则表达式并把行打印出来）是一种强大的文本搜索工具，它能使用正则表达式搜索文本，并把匹配的行打印出来。</p>
                        <p>在文件中搜索一个单词，命令会返回一个包含“match_pattern”的文本行：</p>
                        <pre><code>grep match_pattern file_name <br/>
                            grep &quot;match_pattern&quot; file_name
                            </code></pre>
                        <p>在多个文件中查找：</p>
                        <pre><code>grep &quot;match_pattern&quot; file_1 file_2 file_3 ...</code></pre>
                        <p>标记匹配颜色 <strong>--color=auto</strong> 选项：</p>
                        <pre><code>grep &quot;admin&quot; nohup.out --color=auto</code></pre>
                        <p>统计文件或者文本中包含匹配字符串的行数 <strong>-c</strong> 选项：</p>
                        <pre><code>$ grep -c &quot;admin&quot; nohup.out  <br/>
                            983
                            </code></pre>
                        <p>输出包含匹配字符串的行数 <strong>-n </strong>选项：</p>
                        <pre><code>$ grep -n &quot;admin&quot; nohup.out <br/>
                            405249:2015-03-08 16:28:40,212
                            </code></pre>
                        <p>搜索多个文件并查找匹配文本在哪些文件中：</p>
                        <pre><code>$ grep -l &quot;admin&quot; nohup.out  start.sh  <br/>
                            nohup.out <br/>
                            start.sh
                            </code></pre>
                        <p>grep递归搜索文件</p>
                        <pre><code>$ grep &quot;admin&quot; . -r -n  //.表示当前目录,小心目录过大</code></pre>
                        <p>只输出匹配的部分:</p>
                        <pre><code>grep &quot;start&quot; -o nohup.out  //没什么实际意义</code></pre>
                        <p><strong>多个匹配样式,使用 -e</strong></p>
                        <pre><code>grep -e &quot;startup&quot; -e &quot;error&quot; nohup.out</code></pre>
                        <p>查看配模式的上下几行：</p>
                        <pre><code>grep -10  &quot;startup&quot; nohup.out //打印匹配行的前后5行</code></pre>
                        <p><strong>查看最后几行中的匹配样式：</strong></p>
                        <pre><code>tail -200f|grep &quot;startup&quot; nohup.out</code></pre>
                        <p><strong>多层过滤：</strong></p>
                        <pre><code>$tail -200f|grep &quot;startup&quot; nohup.out |grep &quot;Mar 08&quot; <br/>
                            $ grep &quot;startup&quot; nohup.out |grep &quot;Mar 08&quot;</code></pre>
                        <h2 id="文件权限属性设置"><a href="javascript:void(0)"  class="anchor">文件权限属性设置</a></h2>
                        <h3 id="chmod命令"><a href="javascript:void(0)"  class="anchor">chmod命令</a></h3>
                        <p>chmod命令用来变更文件或目录的权限。在UNIX系统家族里，文件或目录权限的控制分别以读取、写入、执行3种一般权限来区分:</p>
                        <pre><code>u User，即文件或目录的拥有者； <br/>
                            g Group，即文件或目录的所属群组； <br/>
                            o Other，除了文件或目录拥有者或所属群组之外，其他用户皆属于这个范围； <br/>
                            a All，即全部的用户，包含拥有者，所属群组以及其他用户； <br/>
                             <br/>
                            r 读取权限，数字代号为“4”; <br/>
                            w 写入权限，数字代号为“2”； <br/>
                            x 执行或切换权限，数字代号为“1”； <br/>
                            z不具任何权限，数字代号为“0”； <br/>
                            s 特殊功能说明：变更文件或目录的权限。
                            </code></pre>
                        <p><img src='https://gitee.com/nick070809/pics/raw/master/m9/1.png' alt='' /></p>

                        <h3 id="chown命令"><a href="javascript:void(0)"  class="anchor">chown命令</a></h3>
                        <p>chown命令改变某个文件或目录的所有者和所属的组，该命令可以向某个用户授权，使该用户变成指定文件的所有者或者改变文件所属的组。</p>
                        <pre><code>chown -R liu /usr/meng</code></pre>
                        <p>&nbsp;</p>
                        <h3 id="file命令"><a href="javascript:void(0)"  class="anchor">file命令</a></h3>
                        <p>file命令用来探测给定文件的类型。file命令对文件的检查分为文件系统、魔法幻数检查和语言检查3个过程。</p>
                        <pre><code>-b：列出辨识结果时，不显示文件名称； <br/>
                            -c：详细显示指令执行过程，便于排错或分析程序执行的情形； <br/>
                            -f&lt;名称文件&gt;：指定名称文件，其内容有一个或多个文件名称时，让file依序辨识这些文件，格式为每列一个文件名称； <br/>
                            -L：直接显示符号连接所指向的文件类别； <br/>
                            -m&lt;魔法数字文件&gt;：指定魔法数字文件； <br/>
                            -v：显示版本信息； <br/>
                            -z：尝试去解读压缩文件的内容。
                            </code></pre>
                        <p>显示文件类型</p>
                        <pre><code>[root@localhost ~]# file install.log <br/>
                                install.log: UTF-8 Unicode text <br/>
                                 <br/>
                                [root@localhost ~]# file -b install.log      &lt;== 不显示文件名称 <br/>
                                UTF-8 Unicode text <br/>
                                 <br/>
                                [root@localhost ~]# file -i install.log      &lt;== 显示MIME类别。 <br/>
                                install.log: text/plain; charset=utf-8 <br/>
                                 <br/>
                                [root@localhost ~]# file -b -i install.log <br/>
                                text/plain; charset=utf-8 <br/>

                                </code></pre>
                        <p>显示符号链接的文件类型</p>
                        <pre><code>[root@localhost ~]# ls -l /var/mail <br/>
                            lrwxrwxrwx 1 root root 10 08-13 00:11 /var/mail -&gt; spool/mail <br/>
                             <br/>
                            [root@localhost ~]# file /var/mail <br/>
                            /var/mail: symbolic link to `spool/mail&#39; <br/>
                             <br/>
                             [root@localhost ~]# file -L /var/mail <br/>
                            /var/mail: directory <br/>
                             <br/>
                            [root@localhost ~]# file /var/spool/mail <br/>
                            /var/spool/mail: directory <br/>
                             <br/>
                            [root@localhost ~]# file -L /var/spool/mail <br/>
                            /var/spool/mail: directory
                            </code></pre>
                        <h2 id="目录基本操作"><a href="javascript:void(0)"  class="anchor">目录基本操作</a></h2>
                        <h3 id="mkdir命令"><a href="javascript:void(0)"  class="anchor">mkdir命令</a></h3>
                        <p><strong>mkdir命令</strong>用来创建目录。该命令创建由<a href='http://man.linuxde.net/dirname'>dirname</a>命名的目录。如果在目录名的前面没有加任何路径名，则在当前目录下创建由dirname指定的目录；</p>
                        <pre><code>-Z：设置安全上下文，当使用SELinux时有效； <br/>
                        -m&lt;目标属性&gt;或--mode&lt;目标属性&gt;建立目录的同时设置目录的权限； <br/>
                        -p或--parents 若所要建立目录的上层目录目前尚未建立，则会一并建立上层目录； <br/>
                        --version 显示版本信息。
                        </code></pre>
                        <p>实例</p>
                        <pre><code>mkdir -m 700 /usr/meng/test <br/>
                            mkdir -p-m 750 bin/os_1
                            </code></pre>
                        <p>指定要创建的目录列表，多个目录之间用空格隔开。</p>
                        <h3 id="rm命令"><a href="javascript:void(0)"  class="anchor">rm命令</a></h3>
                        <p>rm<strong>命令</strong>可以删除一个目录中的一个或多个文件或目录，也可以将某个目录及其下属的所有文件及其子目录均删除掉。对于链接文件，只是删除整个链接文件，而原有文件保持不变。</p>
                        <pre><code>-d：直接把欲删除的目录的硬连接数据删除成0，删除该目录； <br/>
                            -f：强制删除文件或目录； <br/>
                            -i：删除已有文件或目录之前先询问用户； <br/>
                            -r或-R：递归处理，将指定目录下的所有文件与子目录一并处理；
                            </code></pre>
                        <p>交互式删除当前目录下的文件<a href='http://man.linuxde.net/test'>test</a>和example</p>
                        <pre><code>rm -i test example <br/>
                            Remove test ?n（不删除文件test) <br/>
                            Remove example ?y（删除文件example)
                            </code></pre>
                        <h3 id="pwd命令"><a href="javascript:void(0)"  class="anchor">pwd命令</a></h3>
                        <p><strong>pwd命令</strong>以绝对路径的方式显示用户当前工作目录</p>
                        <p>ls -a ;ls-ll</p>
                        <p>查看最后一次编辑的文件</p>
                        <pre><code>[root@localhost /]# ls -t</code></pre>
                        <p>按修改时间列出文件和文件夹详细信息</p>
                        <pre><code>[root@localhost /]# ls -ltr</code></pre>
                        <p>按时间列出文件和文件夹详细信息:</p>
                        <pre><code>[root@localhost /]# ls -lt</code></pre>
                        <p>按照字符排序</p>
                        <pre><code># ls -F</code></pre>
                        <p>&nbsp;</p>
                        <h3 id="mv命令"><a href="javascript:void(0)"  class="anchor">mv命令</a></h3>
                        <p>mv命令用来对文件或目录重新命名，或者将文件从一个目录移到另一个目录中。source表示源文件或目录，target表示目标文件或目录。如果将一个文件移到一个已经存在的目标文件中，则目标文件的内容将被覆盖。</p>
                        <pre><code>-b：当文件存在时，覆盖前，为其创建一个备份； //backup <br/>
                        -f：若目标文件或目录与现有的文件或目录重复，则直接覆盖现有的文件或目录； <br/>
                        -i：交互式操作，覆盖前先行询问用户，如果源文件与目标文件或目标目录中的文件同名，则询问用户是否覆盖目标文件。用户输入”y”，表示将覆盖目标文件；输入”n”，表示取消对源文件的移动。这样可以避免误将文件覆盖。
                        </code></pre>
                        <p>目录的mv：</p>
                        <pre><code>mv /usr/men/ *  test</code></pre>
                            <p>&nbsp;</p>
                        <h3 id="cp命令"><a href="javascript:void(0)"  class="anchor">cp命令</a></h3>
                            <p><strong>cp命令</strong>用来将一个或多个源文件或者目录复制到指定的目的文件或目录。</p> <br/>
                            <pre><code>-f：强行复制文件或目录，不论目标文件或目录是否已存在； <br/>
                            -i：覆盖既有文件之前先询问用户； <br/>
                            -R/r：递归处理，将指定目录下的所有文件与子目录一并处理； <br/>
                            </code></pre> <br/>
                            <p>实例：</p> <br/>
                            <pre><code>cp -r /usr/men /usr/zh
                            </code></pre>
                            <p>&nbsp;</p>
                            <h3 id="文件压缩与解压">cd命令</h3>
                            <p>cd命令用来切换工作目录至dirname。 其中dirName表示法可为绝对路径或相对路径。</p>

                    </Col>
                    <Col span={1}>
                    </Col>
                    <Col span={4}>
                        <Anchor showInkInFixed="true">
                            <Link href="#文件压缩与解压" title="文件压缩与解压">
                                <Link href="#zip命令" title="zip命令"/>
                                <Link href="#unzip命令" title="unzip命令"/>
                                <Link href="#tar 命令" title="tar 命令"/>
                                <Link href="#jar命令" title="jar命令"/>
                            </Link>
                            <Link href="#文件传输" title="文件传输">
                                <Link href="#scp命令" title="scp命令"/>
                            </Link>

                            <Link href="#文件过滤分割与合并" title="文件过滤分割与合并">
                                <Link href="#split命令" title="split命令"/>
                                <Link href="#grep命令" title="grep命令"/>
                            </Link>
                            <Link href="#文件权限属性设置" title="文件权限属性设置">
                                <Link href="#chmod命令" title="chmod命令"/>
                                <Link href="#chown命令" title="chown命令"/>
                                <Link href="#file命令" title="file命令"/>
                            </Link>
                            <Link href="#目录基本操作" title="目录基本操作">
                                <Link href="#mkdir命令" title="mkdir命令"/>
                                <Link href="#rm命令" title="rm命令"/>
                                <Link href="#pwd命令" title="pwd命令"/>
                                <Link href="#mv命令" title="mv命令"/>
                                <Link href="#cp命令" title="cp命令"/>

                            </Link>


                        </Anchor>
                    </Col>
                </Row>


            </div>

        );
    }
}

export default Command2;
