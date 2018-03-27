import React, {Component} from 'react';
import {Anchor, Row, Col} from 'antd';


const {Link} = Anchor;


class ASK2 extends Component {

    s = "{";
    render() {

        return (
            <div>
                <Row>
                    <Col span={19}>

                        <h3 id="标准的http协议是无状态的，无连接的"><a href="javascript:void(0)" class="anchor">标准的http协议是无状态的，无连接的</a></h3>
                        <ol>
                            <li><p>标准的http协议指的是不包括cookies, session他们都不属于标准协议，虽然各种网络应用提供商，实现语言、web容器等，都默认支持它</p>
                            </li>
                            <li><p>无连接指的是什么</p>
                                <ol>
                                    <li>每一个访问都是无连接，服务器挨个处理访问队列里的访问，处理完一个就关闭连接，这事儿就完了，然后处理下一个新的访问</li>
                                    <li>无连接的含义是限制每次连接只处理一个请求。服务器处理完客户的请求，并收到客户的应答后，即断开连接</li>
                                </ol>
                            </li>
                        </ol>
                        <p>因为：</p>
                        <ol>
                            <li>协议对于事务处理没有记忆能力【事物处理】【记忆能力】</li>
                            <li>对同一个url请求没有上下文关系【上下文关系】</li>
                            <li>每次的请求都是独立的，它的执行情况和结果与前面的请求和之后的请求是无直接关系的，它不会受前面的请求应答情况直接影响，也不会直接影响后面的请求应答情况【无直接联系】【受直接影响】</li>
                            <li>服务器中没有保存客户端的状态，客户端必须每次带上自己的状态去请求服务器【状态】</li>
                        </ol>
                        <p>&nbsp;</p>
                        <p>根据这个方向做了一个模拟访问实验：假如没有cookie没有session，只有http的时候，那当一个注册用户访问这个购物网站的时候，会发生这些事情：</p>
                        <ol>
                            <li><p>前提情况：</p>
                                <ol>
                                    <li>服务器肯定为每个注册用户建立了数据表，记录用户的数据</li>
                                    <li>http是无连接的</li>
                                </ol>
                            </li>
                            <li><p>第一步需要登录</p>
                                <ol>
                                    <li>用户通过http把用户的用户名和密码发送给服务器，服务器把他们跟自己存有的用户资料对比，如果一致，则返回信息登录成功</li>
                                </ol>
                            </li>
                            <li><p>然后用户点击某一商品页</p>
                                <ol>
                                    <li><p>这个动作相当于输入一个商品页的网址</p>
                                    </li>
                                    <li><p>假如商品页比较机密不对外公开，需要是用户才能访问</p>
                                    </li>
                                    <li><p>而虽然http能传送用户名和密码，而且刚才也输入了，还验证成功了，但是因为服务器既不会记得你登录的状态，你的客户端也不会存储你刚才输入的用户名和密码</p>
                                    </li>
                                    <li><p>所以因为这一次访问因为无法确定你的身份，只能访问失败</p>
                                        <p>这时候如果要解决这个问题，而且没有cookie没有session，那就只能你在访问网址的同时继续带上你的用户名和密码</p>
                                    </li>
                                </ol>
                            </li>
                            <li><p>假设上一步的问题解决了，就是每次访问的时候都要求你的用户名和密码，然后现在的情况是：你已经选了几件商品在你的购物车中，你想再添加一件商品，于是你点击某个商品旁边的加号</p>
                                <ol>
                                    <li>这个动作也相当于输入一个网址，网址的内容是发送一个请求，往你的购物车中加入这个商品</li>
                                    <li>系统首先用你传来的用户名和密码验证你的身份，然后访问你的数据库，在其中的购物车属性下加一条数据，就是这个商品的数据</li>
                                    <li>操作结束后，返回操作成功，并结束访问</li>
                                </ol>
                            </li>
                            <li><p>ok，实验结束，看似没有cookie没有session也能凑合解决问题，其实两个操作都有很大的问题</p>
                                <ol>
                                    <li><p>你每访问一次需要权限的内容都需要在客户端输入用户名和密码，这一项的繁琐就不必赘述了</p>
                                    </li>
                                    <li><p>你的每一次操作都要与系统底层的数据库进行交互</p>
                                        <p>多次少量的访问存在非常大的性能浪费。非常容易就能想到肯定是一次大量的操作更加有效率，于是就想到了缓存区</p>
                                    </li>
                                    <li><p>你的非重要琐碎数据也被写进数据库中，跟你的主要数据放在一起</p>
                                        <p>一次次添加和删除购物车其实只是跟你这次浏览，或者叫这次会话有关，是临时的数据，跟用户的主要信息无关，它们没什么价值，纯粹的冗余数据（不排除现在有的公司觉得这种数据也有非常大的价值可以让它们巧妙的利用），用什么存放这些临时的数据，我们也很容易想到缓存区</p>
                                        <p>&nbsp;</p>
                                    </li>
                                </ol>
                            </li>
                        </ol>
                        <h3 id="有状态的http"><a href="javascript:void(0)" class="anchor">有状态的http</a></h3>
                        <p>由上所述，我们可以在http的基础上增加一些机制来解决上面出现的三个问题，于是，两种用于保持 HTTP 连接状态的技术就应运而生了，一个是 Cookie，而另一个则是 Session。</p>
                        <ol>
                            <li><p>在客户端增加一个记录本是非常有必要的，正好官方加入的cookie机制跟这个一样，它的用处也确实是上面讨论的那样，一般就是用来标识访问者的身份</p>
                            </li>
                            <li><p>在服务器增加一个缓存区能同时解决后两个问题</p>
                                <ol>
                                    <li>有了这个缓存区作为一个数据缓冲，就不用一次次地访问数据库，浪费大量计算机资源，而是在最后统一归入数据库</li>
                                    <li>有了这个缓存区，你就不用把临时的数据放到数据库中了，只需要在你们交流告一段落之后，再把数据整理，把有用的数据归入数据库</li>
                                </ol>
                            </li>
                            <li><p>这里就自然引申出了一个重要的概念：会话，它作为一个缓冲存储区被从数据库中分离出来，理由并不生硬，它有其独特的重要且不可替代的作用。这个东西恰好跟官方加入的session机制一样</p>
                                <ol>
                                    <li><p>另外说一个非常具有迷惑性的容易让人对session的主要作用产生偏离的理解：认为session存在的价值就是给访问者分配一个sessionID代替用户名和密码，</p>
                                    </li>
                                    <li><p>为什么非常具有迷惑性，因为session确实做了这件事，而且也起到了很大的作用，所以它是对的，但是只对一半，而且没有涉及问题的本质，这种情况是最危险的（看似很有说服力，把你说服了，所以你很难有动力继续找下去，但是真实情况跟它有偏差，但是偏差不大，所以又很难把你说服回来，只有隐隐的不对劲，这个时候你离真实最近，也离真实最远）</p>
                                    </li>
                                    <li><p>那就顺便说说它为什么是对的，也就是用session做的另一件有用的事：</p>
                                        <ol>
                                            <li><p>给每个session一个ID，一方面用来方便自己查询，另一方面把这个ID给用户，用户下一次访问的时候就可以不用用户名和密码，而是直接使用这个ID来表明自己的身份</p>
                                            </li>
                                            <li><p>首先，这个ID安全吗？这个ID比直接传用户名和密码安全吗？</p>
                                                <ol>
                                                    <li><p>你很容易会想到，本来用户名和密码的组合还特地设置地比较复杂，你这换一组数字就代替了，是不是太不安全了？</p>
                                                    </li>
                                                    <li><p>我们知道http协议本身是完全不加密的，如果使用用户名和密码，第一次访问是放在http头中，后边自动保存了密码就会放在cookie中，这些都完全没有加密，它的安全性基本为0，就是裸奔了，只要被窃取，那就丢失了</p>
                                                    </li>
                                                    <li><p>所以，就这个意义来讲，sessionID的安全性跟使用用户名和密码没什么区别。</p>
                                                    </li>
                                                    <li><p>但是其实，虽然http本身不能加密，但是有些软件什么的，能在应用层面手动给你加密，比如QQ就会使用户名密码加临时验证码联合哈希，sessionID加一个时间戳简单加密也是非常常用的方法</p>
                                                    </li>
                                                    <li><p>而且因为sessionID本身有有效期，即使丢了，也可能很快失效，造成的损失可能没那么大，而用户名跟密码丢了，那就大了</p>
                                                    </li>
                                                    <li><p>所以总结就是：</p>
                                                        <ol>
                                                            <li>不严格加密的sessionID和用户名和密码一样，都不太安全</li>
                                                            <li>但是相比较来说，sessionID要安全一些</li>
                                                            <li>而使用https是完全安全的</li>
                                                        </ol>
                                                    </li>
                                                </ol>
                                            </li>
                                            <li><p>然后，使用sessionID有哪些好处</p>
                                                <ol>
                                                    <li>方便直接根据ID查询用户对应的session</li>
                                                    <li>加密的时候计算量小</li>
                                                    <li>安全性不会降低，甚至还更高一些</li>
                                                </ol>
                                            </li>
                                        </ol>
                                    </li>
                                </ol>
                            </li>
                        </ol>
                        <p> </p>
                        <h3 id="cookie 和session 的区别详解"><a href="javascript:void(0)" class="anchor">cookie 和session 的区别详解</a></h3>
                        <p>Cookie可以保持登录信息到用户下次与服务器的会话，换句话说，下次访问同一网站时，用户会发现不必输入用户名和密码就已经登录了（当然，不排除用户手工删除Cookie）。而还有一些Cookie在用户退出会话的时候就被删除了，这样可以有效保护个人隐私。</p>
                        <p>Cookies 最典型的应用是判定注册用户是否已经登录网站，用户可能会得到提示，是否在下一次进入此网站时保留用户信息以便简化登录手续，这些都是 Cookies 的功用。另一个重要应用场合是“购物车”之类处理。用户可能会在一段时间内在同一家网站的不同页面中选择不同的商品，这些信息都会写入 Cookies，以便在最后付款时提取信息。</p>
                        <p><strong>与 Cookie 相对的一个解决方案是 Session，它是通过服务器来保持状态的。==&gt;cookie是客户端来保存状态的，seesoin是服务端保存状态的。</strong></p>
                        <p>当客户端访问服务器时，服务器根据需求设置 Session，将会话信息保存在服务器上，同时将标示 Session 的 SessionId 传递给客户端浏览器，<strong>浏览器将这个 SessionId 保存在内存中(而不是由浏览器生成，保存在cookie中)</strong>，我们称之为无过期时间的 Cookie。浏览器关闭后，这个 Cookie 就会被清掉，它不会存在于用户的 Cookie 临时文件。</p>
                        <p>以后浏览器每次请求都会额外加上这个参数值，服务器会根据这个 SessionId，就能取得客户端的数据信息。
                            如果客户端浏览器意外关闭，服务器保存的 Session 数据不是立即释放，此时数据还会存在，只要我们知道那个 SessionId，就可以继续通过请求获得此 Session 的信息，因为此时后台的 Session 还存在，当然我们可以设置一个 Session 超时时间，一旦超过规定时间没有客户端请求时，服务器就会清除对应 SessionId 的 Session 信息。</p>
                        <p>&nbsp;</p>
                        <h3 id="禁用cookie会怎么样？"><a href="javascript:void(0)" class="anchor">禁用cookie会怎么样？</a></h3>
                        <p>通常情况下，采用的就是Cookie来存储，每次发送请求时服务端会自动读取这个Cookie。所以当客户端禁用Cookie时，如果应用程序没有采取特殊的措施，那么session也就失效了。当然session仅仅是失效，而不是不可用。采用其他的存储方式例如localStorage或者URL。</p>
                        <p>&nbsp;</p>
                        <h4 id="解决方法"><a href="javascript:void(0)" class="anchor">解决方法</a></h4>
                        <p>使用url重定向方法，在每个要使用session的页面的链接中都加上sessionid，然后在每个页面中都去请求这一份session文件就可以解决问题</p>
                        <pre><code>&lt;a href=&quot;doBuy.php?id=sn001&amp;name=三国演义&amp;PHPSESSIONID=${this.s}window.baidu.sid}&quot;&gt;三国演义&lt;/a&gt;&lt;br/&gt;<br/>
</code></pre>
                        <p>window.baidu.sid是我保存的全局变量。</p>
                        <p>总结一下，就是Cookie是维持session的一个方式，但是维持session的方式有多种，并不仅仅局限于Cookie，Cookie存储的信息也并不仅仅局限于session，也可以存储其他信息。另外，浏览器的隐身模式/无痕模式并不是禁用Cookie，而是当浏览器关闭后会立即清除已保存的Cookie。</p>
                        <h3 id="localStorage、sessionStorage"><a href="javascript:void(0)" class="anchor">localStorage、sessionStorage</a></h3>
                        <p>对浏览器来说，使用 Web Storage 存储键值对比存储 Cookie 方式更直观，而且容量更大，它包含两种：localStorage 和 sessionStorage</p>
                        <pre><code>1. sessionStorage（临时存储） ：为每一个数据源维持一个存储区域，在浏览器打开期间存在，包括页面重新加载<br/>
2.&nbsp;localStorage（长期存储）&nbsp;：与&nbsp;sessionStorage&nbsp;一样，但是浏览器关闭后，数据依然会一直存在<br/>
</code></pre>
                        <h4 id=" 保存数据到本地"><a href="javascript:void(0)" class="anchor"> 保存数据到本地</a></h4>
                        <pre><code>const info = {this.s}<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;name:&nbsp;&#39;Lee&#39;,<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;age:&nbsp;20,<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;id:&nbsp;&#39;001&#39;<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;};<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;sessionStorage.setItem(&#39;key&#39;,&nbsp;JSON.stringify(info));<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;localStorage.setItem(&#39;key&#39;,&nbsp;JSON.stringify(info));<br/>
</code></pre>
                        <h4 id="从本地存储获取数据"><a href="javascript:void(0)" class="anchor">从本地存储获取数据</a></h4>
                        <pre><code>    var data1 = JSON.parse(sessionStorage.getItem(&#39;key&#39;));<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;var&nbsp;data2&nbsp;=&nbsp;JSON.parse(localStorage.getItem(&#39;key&#39;));<br/>
</code></pre>
                        <h4 id="本地存储中删除某个保存的数据"><a href="javascript:void(0)" class="anchor">本地存储中删除某个保存的数据</a></h4>
                        <pre><code>    sessionStorage.removeItem(&#39;key&#39;);<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;localStorage.removeItem(&#39;key&#39;);<br/>
</code></pre>
                        <h4 id="删除所有保存的数据"><a href="javascript:void(0)" class="anchor">删除所有保存的数据</a></h4>
                        <pre><code>    sessionStorage.clear();<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;localStorage.clear();<br/>
</code></pre>
                        <h4 id="监听本地存储的变化"><a href="javascript:void(0)" class="anchor">监听本地存储的变化</a></h4>
                        <p>Storage 发生变化（增加、更新、删除）时的 触发，同一个页面发生的改变不会触发，只会监听同一域名下其他页面改变 Storage</p>
                        <pre><code>  window.addEventListener(&#39;storage&#39;, function (e) {this.s}<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;console.log(&#39;key&#39;,&nbsp;e.key);<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;console.log(&#39;oldValue&#39;,&nbsp;e.oldValue);<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;console.log(&#39;newValue&#39;,&nbsp;e.newValue);<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;console.log(&#39;url&#39;,&nbsp;e.url);<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;})<br/>
</code></pre>
                        <h4 id="浏览器查看方法"><a href="javascript:void(0)" class="anchor">浏览器查看方法</a></h4>
                        <p>进入开发者工具</p>
                        <p>选择 Application</p>
                        <p>在左侧 Storage 下 查看 Local Storage 和 Session Storage</p>
                        <p><img src='https://gitee.com/nick070809/pics/raw/master/skill/02.png' alt='' /></p>
                    </Col>
                    <Col span={1}>
                    </Col>
                    <Col span={4}>
                         <Anchor showInkInFixed="true">
                                <Link href="#标准的http协议是无状态的，无连接的" title="标准的http协议是无状态的，无连接的"/>
                                <Link href="#有状态的http" title="有状态的http"/>
                                <Link href="#cookie 和session 的区别详解" title="cookie 和session 的区别详解"/>
                                <Link href="#禁用cookie会怎么样？" title="禁用cookie会怎么样？">
                                    <Link href="#解决方法" title="解决方法"/>
                                </Link>
                                <Link href="#localStorage、sessionStorage" title="localStorage、sessionStorage">
                                    <Link href="# 保存数据到本地" title=" 保存数据到本地"/>
                                    <Link href="#从本地存储获取数据" title="从本地存储获取数据"/>
                                    <Link href="#本地存储中删除某个保存的数据" title="本地存储中删除某个保存的数据"/>
                                    <Link href="#删除所有保存的数据" title="删除所有保存的数据"/>
                                    <Link href="#监听本地存储的变化" title="监听本地存储的变化"/>
                                    <Link href="#浏览器查看方法" title="浏览器查看方法"/>
                                </Link>

                        </Anchor>
                    </Col>
                </Row>


            </div>

        );
    }
}

export default ASK2;
