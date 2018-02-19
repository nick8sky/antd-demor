import React, { Component } from 'react';

class HTTPS extends Component {
    render() {
        return (
            <div>
                <h2>HTTPS 原理详解</h2>
                <p>HTTPS（全称：HyperText Transfer Protocol over Secure Socket Layer），其实 HTTPS 并不是一个新鲜协议，Google 很早就开始启用了，初衷是为了保证数据安全。 近两年，Google、Baidu、Facebook 等这样的互联网巨头，不谋而合地开始大力推行 HTTPS， 国内外的大型互联网公司很多也都已经启用了全站 HTTPS，这也是未来互联网发展的趋势。</p>
                <p>打个比方：如果原来的 HTTP 是塑料水管，容易被戳破；那么如今设计的 HTTPS 就像是在原有的塑料水管之外，再包一层金属水管。一来，原有的塑料水管照样运行；二来，用金属加固了之后，不容易被戳破。</p>
                <p>&nbsp;</p>
                <p>小和尚问老和尚：ssl为什么会让http安全？</p>
                <p>老和尚答道：譬如你我都有一个同样的密码，我发信给你时用这个密码加密，你收到我发的信，用这个密码解密，就能知道我信的内容，其他的闲杂人等，就算偷偷拿到了信，由于不知道这个密码，也只能望信兴叹，这个密码就叫做对称密码。ssl使用对称密码对http内容进行加解密，所以让http安全了，常用的加解密算法主要有3DES和AES等。</p>
                <p>小和尚摸摸脑袋问老和尚：师傅，如果我们两人选择“和尚”作为密码，再创造一个和尚算法，我们俩之间的通信不就高枕无忧了？</p>
                <p>老和尚当头给了小和尚一戒尺：那我要给山下的小花写情书，还得用“和尚”这个密码不成？想了想又给了小和尚一戒尺：虽然我们是和尚，不是码农，也不能自己造轮子，当初一堆牛人码农造出了Wifi的安全算法WEP，后来发现是一绣花枕头，在安全界传为笑谈；况且小花只知道3DES和AES，哪知道和尚算法？</p>
                <p>小和尚问到：那师傅何解？</p>
                <p>老和尚：我和小花只要知道每封信的密码，就可以读到对方加密的信件，关键是我们互相之间怎么知道这个对称密码。你说，我要是将密码写封信给她，信被别人偷了，那大家不都知道我们的密码了，也就能够读懂我们情书了。不过还是有解的，这里我用到了江湖中秘传的非对称密码。我现在手头有两个密码，一个叫“公钥”，一个叫“私钥”，公钥发布到了江湖上，好多人都知道，私钥嘛，江湖上只有我一个人知道；公钥小花是知道的，她每次给我写信，都要我的公钥加密她的对称密码，<strong>小花把她的对称密码通过公钥加密后写到信里面的密码页里连同用对称加密的密文给我 这样我用我的私钥可以解出这个对称密码，再用这个对称密码来解密她的信件。</strong></p>
                <p>&nbsp;</p>
                <p>老和尚顿了顿：可惜她用的对称密码老是“和尚为什么写情书”这一类，所以我每次解开密码纸时总是怅然若失，其实我钟意的对称密码是诸如“风花”“雪月”什么的，最头痛的是，我还不得不用“和尚为什么写情书”这个密码来加密我给小花回的情书，人世间最痛苦的事莫过于如此。可我哪里知道，其实有人比我更痛苦。山下的张屠夫，暗恋小花很多年，看着我们鸿雁传书，心中很不是滋味，<strong>张屠夫主动帮小花给我们送信。在他给小花送信时，谎称我公钥刚刚更新了，给了小花他自己的公钥，小花信以为真，之后的信件对称密码都用张屠夫的这个公钥加密了，张屠夫拿到回信后，用他自己的私钥解开了小花的对称密码，然后用这个对称密码，不仅能够看到了小花信件的所有内容，还能使用这个密码伪造小花给我写信，同时还能用他的私钥加密给小花的信件。</strong>渐渐我发现信件变味了，尽管心生疑惑，但是没有确切的证据，一次我写信问小花第一次使用的对称密码，回信中“和尚为什么写情书”赫然在列，于是我的疑惑稍稍减轻。直到有一次去拜会嵩山少林寺老方丈才顿悟，原来由于我的公钥没有火印(签名)，任何人都可以伪造一份公钥宣称是我的，这样这个人即能读到别人写给我的信，也能伪造别人给我写信，同样也能读到我的回信，也能伪造我给别人的回信。</p>
                <p>小和尚问：那然后呢？</p>
                <p>老和尚：从嵩山少林寺回山上寺庙时，我将有火印(签名)的公钥亲自给小花送去，可是之后再也没有收到小花的来信。<strong>小花在每次给我写信时，都会在密码纸上贴上一朵小牡丹(加上签名)，牡丹上写上用她自己的私钥加密过的给我的留言</strong>(这样就是两组秘钥对)，这样我收到自称是小花的信后，我会先抽出密码纸，取下小牡丹，使用小花的公钥解密这段留言，如果解不出来，我会直接将整封信连同密码纸一起扔掉，因为这封信一定不是小花写的。 张屠夫拿到信后，不知道小牡丹上说的啥留言，一怒之下将信件全部烧毁了。 </p>
                <p>&nbsp;</p>
                <p>为什么不直接使用两组秘钥对呢？</p>
                <p>下面有分析：因为服务端暴露出来的公钥是公开的，如果被人拦截，就能获取服务端返回的信息。</p>
                <p>所以：https = http + 2组非对称秘钥 + 1组对称秘钥</p>
                <p><strong>SSL协议通信过程</strong></p>
                <p>(1) 浏览器发送一个连接请求给服务器;服务器将自己的证书(包含服务器公钥S_PuKey)、对称加密算法种类及其他相关信息返回客户端;</p>
                <p>(2) 客户端浏览器检查服务器传送到CA证书是否由信赖的CA中心签发。若是，执行4步;否则，给客户一个警告信息：询问是否继续访问。</p>
                <p>(3) 客户端浏览器比较证书里的信息，如证书有效期、服务器域名和公钥S_PK，与服务器传回的信息是否一致，如果一致，则浏览器完成对服务器的身份认证。</p>
                <p>(4) 服务器要求客户端发送客户端证书(<strong>包含客户端公钥C_PuKey</strong>)、支持的对称加密方案及其他相关信息。收到后，服务器进行相同的身份认证，若没有通过验证，则拒绝连接;</p>
                <p>(5) 服务器根据客户端浏览器发送到密码种类，选择一种加密方案，用客户端公钥C_PuKey加密后通知到浏览器;</p>
                <p>(6) 客户端通过私钥C_PrKey解密后，得知服务器选择的加密方案，并选择一个通话密钥key，接着用服务器公钥S_PuKey加密后发送给服务器;</p>
                <p>(7) 服务器接收到的浏览器传送到消息，用私钥S_PrKey解密，获得通话密钥key。</p>
                <p>(8) 接下来的数据传输都使用该对称密钥key进行加密。</p>
                <p>上面所述的是双向认证 SSL 协议的具体通讯过程，服务器和用户双方必须都有证书。由此可见，SSL协议是通过非对称密钥机制保证双方身份认证，并完成建立连接，在实际数据通信时通过对称密钥机制保障数据安全性。</p>
                <p>&nbsp;</p>
                <p>为鼓励全球网站的 HTTPS 实现，一些互联网公司都提出了自己的要求：</p>
                <p>1）Google 已调整搜索引擎算法，让采用 HTTPS 的网站在搜索中排名更靠前；</p>
                <p>2）从 2017 年开始，Chrome 浏览器已把采用 HTTP 协议的网站标记为不安全网站；</p>
                <p>3）苹果要求 2017 年App Store 中的所有应用都必须使用 HTTPS 加密连接；</p>
                <p>4）当前国内炒的很火热的微信小程序也要求必须使用 HTTPS 协议；</p>
                <p>5）新一代的 HTTP/2 协议的支持需以 HTTPS 为基础。</p>
                <p><img src={require('../../img/423544678.JPG')}  /></p>
                <p>如上图所示 HTTPS 相比 HTTP 多了一层 SSL/TLS</p>
                <p>SSL（Secure Socket Layer，安全套接字层）：1994年为 Netscape 所研发，SSL 协议位于 TCP/IP 协议与各种应用层协议之间，为数据通讯提供安全支持。</p>
                <p>TLS（Transport Layer Security，传输层安全）：其前身是 SSL，它最初的几个版本（SSL 1.0、SSL 2.0、SSL 3.0）由Netscape 开发(（顺便插一句，网景公司不光发明了 SSL，还发明了很多 Web 的基础设施——比如“CSS 样式表”和“JS 脚本”）)，1999年从 3.1 开始被 IETF 标准化并改名，发展至今已经有 TLS 1.0、TLS 1.1、TLS 1.2 三个版本。SSL3.0和TLS1.0由于存在安全漏洞，已经很少被使用到。TLS 1.3 改动会比较大，目前还在草案阶段，目前使用最广泛的是TLS 1.1、TLS 1.2。</p>
                <p><strong>HTTP 向 HTTPS 演化的过程</strong></p>
                <p>第一步：为了防止上述现象的发生，人们想到一个办法：对传输的信息加密（即使黑客截获，也无法破解）</p>
                <p><img src={require('../../img/453wetgfdgfhdd.JPG')} /></p>
                <p>如上图所示，此种方式属于对称加密，双方拥有相同的密钥，信息得到安全传输，但此种方式的缺点是：</p>
                <p>（1）不同的客户端、服务器数量庞大，所以双方都需要维护大量的密钥，维护成本很高</p>
                <p>（2）因每个客户端、服务器的安全级别不同，密钥极易泄露</p>
                <p>第二步：既然使用对称加密时，密钥维护这么繁琐，那我们就用非对称加密试试</p>
                <p><img src={require('../../img/453wetgfdgfhdd.JPG')}  /></p>
                <p>如上图所示，客户端用公钥对请求内容加密，服务器使用私钥对内容解密，反之亦然，但上述过程也存在缺点：</p>
                <p>（1）公钥是公开的（也就是黑客也会有公钥），所以第 ④ 步私钥加密的信息，如果被黑客截获，其可以使用公钥进行解密，获取其中的内容</p>
                <p>第三步：非对称加密既然也有缺陷，那我们就将对称加密，非对称加密两者结合起来，发挥两者的各自的优势 。</p>
                <p>&nbsp;</p>
                <p><strong>SSL/TLS是什么？</strong></p>
                <p>SSL 是“Secure Sockets Layer”的缩写，中文叫做“安全套接层”。</p>
                <p>为啥要发明 SSL 这个协议捏？因为原先互联网上使用的 HTTP 协议是明文的，存在很多缺点——比如传输内容会被偷窥（嗅探）和篡改。发明 SSL 协议，就是为了解决这些问题。
                    到了1999年，SSL 因为应用广泛，已经成为互联网上的事实标准。IETF 就在那年把 SSL 标准化。标准化之后的名称改为 TLS（是“Transport Layer Security”的缩写），中文叫做“传输层安全协议”。</p>
                <p>如今咱们用的 HTTP 协议，版本号是 1.1（也就是 HTTP 1.1）。这个 1.1 版本是1995年底开始起草的（技术文档是 RFC2068），并在1999年正式发布（技术文档是 RFC2616）。
                    在 1.1 之前，还有曾经出现过两个版本“0.9 和 1.0”，其中的 HTTP 0.9 没有被广泛使用，而 HTTP 1.0 被广泛使用过。
                    另外，据说下一版本 HTTP 2.0 正在酝酿发布中 。</p>
                <p>&nbsp;</p>
                <p><strong>HTTP 协议如何使用 TCP 连接？</strong></p>
                <p>HTTP 对 TCP 连接的使用，分为两种方式：俗称“短连接”和“长连接”（“长连接”又称“持久连接”，英文叫做“Keep-Alive”或“Persistent Connection”）
                    假设有一个网页，里面包含好多图片，还包含好多【外部的】CSS 文件和 JS 文件。在“短连接”的模式下，浏览器会先发起一个 TCP 连接，拿到该网页的 HTML 源代码（拿到 HTML 之后，这个 TCP 连接就关闭了）。然后，浏览器开始解析这个网页的源码，知道这个页面包含很多外部资源（图片、CSS、JS）。然后针对【每一个】外部资源，再分别发起一个个 TCP 连接，把这些文件获取到本地（同样的，每抓取一个外部资源后，相应的 TCP 就断开）
                    相反，如果是“长连接”的方式，浏览器也会先发起一个 TCP 连接去抓取页面。但是抓取页面之后，该 TCP 连接并不会立即关闭，而是暂时先保持着（所谓的“Keep-Alive”）。然后浏览器解析 HTML 源码之后，发现有很多外部资源，就用刚才那个 TCP 连接去抓取此页面的外部资源。</p>
                <p>在 HTTP 1.0 版本，【默认】使用的是“短连接”（那时候是 Web 诞生初期，网页相对简单，“短连接”的问题不大）；
                    到了1995年底开始制定 HTTP 1.1 草案的时候，网页已经开始变得复杂（网页内的图片、脚本越来越多了）。这时候再用短连接的方式，效率太低下了（因为建立 TCP 连接是有“时间成本”和“CPU 成本”滴）。所以，在 HTTP 1.1 中，【默认】采用的是“Keep-Alive”的方式。</p>
                <p><strong>可扩展性</strong></p>
                <p>如果 SSL 这个协议在“可扩展性”方面的设计足够牛逼，那么它除了能跟 HTTP 搭配，还能够跟其它的应用层协议搭配。岂不美哉？
                    现在看来，当初设计 SSL 的人确实比较牛。如今的 SSL/TLS 可以跟很多常用的应用层协议（比如：FTP、SMTP、POP、Telnet）搭配，来强化这些应用层协议的安全性。</p>
                <p>接着刚才打的比方：如果把 SSL/TLS 视作一根用来加固的金属管，它不仅可以用来加固输水的管道，还可以用来加固输煤气的管道。</p>
                <p>&nbsp;</p>
                <p><strong>HTTPS的优点：</strong></p>
                <p><strong>安全性方面</strong></p>
                <p>在目前的技术背景下，HTTPS是现行架构下最安全的解决方案，主要有以下几个好处：</p>
                <blockquote><p>1、使用HTTPS协议可认证用户和服务器，确保数据发送到正确的客户机和服务器;</p>
                    <p>2、HTTPS协议是由SSL+HTTP协议构建的可进行加密传输、身份认证的网络协议，要比http协议安全，可防止数据在传输过程中不被窃取、改变，确保数据的完整性。</p>
                    <p>3、HTTPS是现行架构下最安全的解决方案，虽然不是绝对安全，但它大幅增加了中间人攻击的成本。</p>
                </blockquote>
                <p><strong>HTTPS的缺点：</strong></p>
                <p><strong>技术方面</strong></p>
                <blockquote><p>1、相同网络环境下，HTTPS协议会使页面的加载时间延长近50%，增加10%到20%的耗电。此外，HTTPS协议还会影响缓存，增加数据开销和功耗。</p>
                    <p>2、HTTPS协议的安全是有范围的，在黑客攻击、拒绝服务攻击、服务器劫持等方面几乎起不到什么作用。</p>
                    <p>3、最关键的，SSL 证书的信用链体系并不安全。特别是在某些国家可以控制 CA 根证书的情况下，中间人攻击一样可行。</p>
                </blockquote>
                <p><strong>成本方面</strong></p>
                <blockquote><p>1、SSL的专业证书需要购买，功能越强大的证书费用越高。个人网站、小网站可以选择入门级免费证书。</p>
                    <p>2、SSL 证书通常需要绑定 固定IP，为服务器增加固定IP会增加一定费用;</p>
                    <p>3、HTTPS 连接服务器端资源占用高较高多，相同负载下会增加带宽和服务器投入成本;</p>
                </blockquote>
                <p> </p>
                <p>加密算法一般分为两种，一种是非对称加密(也叫公钥加密)，另外一种是对称加密(也叫密钥加密)。</p>
                <p>非对称加密 是加密和解密使用的不是同一个密钥。如下图：</p>
                <p><img src={require('../../img/201702241048377320.jpg')} /></p>
                <p>对称加密  是加密和解密都使用的是同一个密钥。如下图：</p>
                <p><img src={require('../../img/201702241048377910.jpg')}  /></p>

            </div>
        );
    }
}

export default HTTPS;