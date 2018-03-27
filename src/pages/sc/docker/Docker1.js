import React, {Component} from 'react';
import {Anchor, Row, Col} from 'antd';


const {Link} = Anchor;


class Docker1 extends Component {

    s = "{";
    render() {

        return (
            <div>
                <Row>
                    <Col span={19}>
                        <h3 id="创建目录结构"><a href="javascript:void(0)" class="anchor">创建目录结构</a></h3>
                        <p><img src={require('../../../imgs/docker/d1.png')} alt='' /></p>
                        <h3 id="创建 pom.xml 文件"><a href="javascript:void(0)" class="anchor">创建 pom.xml 文件</a></h3>
                        <pre><code>&lt;plugin&gt;<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&lt;groupId&gt;com.spotify&lt;/groupId&gt;<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&lt;artifactId&gt;docker-maven-plugin&lt;/artifactId&gt;<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&lt;version&gt;0.4.11&lt;/version&gt;<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&lt;configuration&gt;<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;imageName&gt;mysql_mvcc/${this.s}project.artifactId}&lt;/imageName&gt;<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;dockerDirectory&gt;src/main/docker&lt;/dockerDirectory&gt;<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;resources&gt;<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;resource&gt;<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;targetPath&gt;/&lt;/targetPath&gt;<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;directory&gt;${this.s}project.build.directory}&lt;/directory&gt;<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;include&gt;${this.s}project.build.finalName}.jar&lt;/include&gt;<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/resource&gt;<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/resources&gt;<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&lt;/configuration&gt;<br/>
                            &lt;/plugin&gt;<br/>
</code></pre>
                        <p>Spotify 的 docker-maven-plugin 插件是用于构建 Maven 的 Docker Image
                            1）imageName指定了镜像的名字，本例为 mysql_mvcc/mysql_mvcc_springboot
                            2）dockerDirectory指定 Dockerfile 的位置
                            3）resources是指那些需要和 Dockerfile 放在一起，在构建镜像时使用的文件，一般应用 jar 包需要纳入。</p>
                        <h3 id="修改maven配置文件"><a href="javascript:void(0)" class="anchor">修改maven配置文件</a></h3>
                        <p>在/.m2/setting.xml文件中，添加：</p>
                        <pre><code>&lt;pluginGroups&gt;<br/>
                            &nbsp;	&lt;pluginGroup&gt;com.spotify&lt;/pluginGroup&gt;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<br/>
                            &lt;/pluginGroups&gt;<br/>
</code></pre>
                        <p>使用maven生产target目录</p>
                        <p><img src={require('../../../imgs/docker/d2.png')} alt='' /></p>
                        <p>可以试运行：</p>
                        <pre><code>java -jar target/mysql_mvcc_springboot-1.0-SNAPSHOT.jar<br/>
</code></pre>
                        <h3 id="将项目容器化"><a href="javascript:void(0)" class="anchor">将项目容器化</a></h3>
                        <p>创建文件 src/main/docker/Dockerfile</p>
                        <pre><code>FROM frolvlad/alpine-oraclejdk8:slim<br/>
VOLUME&nbsp;/tmp<br/>
ADD&nbsp;mvcc.jar&nbsp;app.jar<br/>
RUN&nbsp;sh&nbsp;-c&nbsp;&#39;touch&nbsp;/app.jar&#39;<br/>
ENV&nbsp;JAVA_OPTS=&quot;&quot;<br/>
ENTRYPOINT&nbsp;[&nbsp;&quot;sh&quot;,&nbsp;&quot;-c&quot;,&nbsp;&quot;java&nbsp;$JAVA_OPTS&nbsp;-Djava.security.egd=file:/dev/./urandom&nbsp;-jar&nbsp;/app.jar&quot;&nbsp;]<br/>
</code></pre>
                        <p>VOLUME 指定了临时文件目录为/tmp。其效果是在主机 /var/lib/docker 目录下创建了一个临时文件，并链接到容器的/tmp。改步骤是可选的，如果涉及到文件系统的应用就很有必要了。/tmp目录用来持久化到 Docker 数据文件夹，因为 Spring Boot 使用的内嵌 Tomcat 容器默认使用/tmp作为工作目录
                            项目的 jar 文件作为 “app.jar” 添加到容器的
                            ENTRYPOINT 执行项目 app.jar。为了缩短 Tomcat 启动时间，添加一个系统属性指向 “/dev/urandom” 作为 Entropy Source </p>
                        <h3 id="执行构建成为 docker image"><a href="javascript:void(0)" class="anchor">执行构建成为 docker image</a></h3>
                        <p><img src={require('../../../imgs/docker/d3.png')} alt='' /></p>
                        <h3 id="运行"><a href="javascript:void(0)" class="anchor">运行</a></h3>
                        <pre><code>docker run -p 8081:30004 -t mysql_mvcc/mysql_mvcc_springboot<br/>
</code></pre>
                        <p>mysql_mvcc/mysql_mvcc_springboot和前面pom中配置的imageName一致。</p>
                        <p>查看：<a href="javascript:void(0)">http://localhost:8081/mvcc/vi</a></p>
                        <p> </p>
                        <h2 id="命令详解"><a href="javascript:void(0)" class="anchor">命令详解</a></h2>
                        <ul>
                            <li>容器生命周期管理 — docker [run|start|stop|restart|kill|rm|pause|unpause]</li>
                            <li>容器操作运维 — <code>docker [ps|inspect|top|attach|events|logs|wait|export|port]</code></li>
                            <li>容器rootfs命令 — <code>docker [commit|cp|diff]</code></li>
                            <li>镜像仓库 — <code>docker [login|pull|push|search]</code></li>
                            <li>本地镜像管理 — <code>docker [images|rmi|tag|build|history|save|import]</code></li>
                            <li>其他命令 — docker [info|version]</li>
                        </ul>
                        <h3 id="列出机器上的镜像（images）"><a href="javascript:void(0)" class="anchor">列出机器上的镜像（images）</a></h3>
                        <blockquote><p>docker images</p>
                        </blockquote>
                        <p><img src={require('../../../imgs/docker/d4.png')} alt='' /></p>
                        <p>其中我们可以根据REPOSITORY来判断这个镜像是来自哪个服务器，如果没有 / 则表示官方镜像，类似于username/repos_name表示Github的个人公共库，类似于regsistory.example.com:5000/repos_name则表示的是私服。
                            IMAGE ID列其实是缩写，要显示完整则带上--no-trunc选项</p>
                        <h3 id="在docker index中搜索image（search）"><a href="javascript:void(0)" class="anchor">在docker index中搜索image（search）</a></h3>
                        <blockquote><p>docker search seanlo</p>
                        </blockquote>
                        <p><img src={require('../../../imgs/docker/d5.png')} alt='' /></p>
                        <p>搜索的范围是官方镜像和所有个人公共镜像。NAME列的 / 后面是仓库的名字。如果不含有/则表示为docker提供的。</p>
                        <h3 id="从docker registry server 中下拉image或repository（pull）"><a href="javascript:void(0)" class="anchor">从docker registry server 中下拉image或repository（pull）</a></h3>
                        <blockquote><p>docker pull centos</p>
                        </blockquote>
                        <p>在docker v1.2版本以前，会下载官方镜像的centos仓库里的所有镜像，而从v.13开始官方文档里的说明变了：will pull the centos:latest image, its intermediate layers and any aliases of the same id，也就是只会下载tag为latest的镜像。
                            也可以明确指定具体的镜像：</p>
                        <pre><code>docker pull centos:centos6<br/>
</code></pre>
                        <p>也可以从某个人的公共仓库（包括自己是私人仓库）拉取:</p>
                        <pre><code>docker pull seanlook/centos:centos6<br/>
</code></pre>
                        <p>从其他私服获取镜像:</p>
                        <pre><code>docker pull dl.dockerpool.com:5000/mongo:latest<br/>
</code></pre>
                        <h3 id="推送一个image或repository到registry（push）"><a href="javascript:void(0)" class="anchor">推送一个image或repository到registry（push）</a></h3>
                        <p>与上面的pull对应，可以推送到Docker Hub的Public、Private以及私服，但不能推送到Top Level Repository。</p>
                        <pre><code>docker tag mysql_mvcc/mysql_mvcc_springboot nick070809/mysql_mvcc <br/>
docker&nbsp;login<br/>
docker&nbsp;push&nbsp;nick070809/mysql_mvcc<br/>
</code></pre>
                        <h3 id="从image启动一个container（run）"><a href="javascript:void(0)" class="anchor">从image启动一个container（run）</a></h3>
                        <p>&nbsp;</p>
                        <p>参考：<a href='http://blog.csdn.net/permike/article/details/51879578' target='_blank' >http://blog.csdn.net/permike/article/details/51879578</a></p>
                    </Col>
                    <Col span={1}>
                    </Col>
                    <Col span={4}>
                        <Anchor showInkInFixed="true">
                            <Link href="#创建目录结构" title="创建目录结构"/>
                            <Link href="#创建 pom.xml 文件" title="创建 pom.xml 文件"/>
                            <Link href="#修改maven配置文件" title="修改maven配置文件"/>
                            <Link href="#将项目容器化" title="将项目容器化"/>
                            <Link href="#执行构建成为 docker image" title="执行构建成为 docker image"/>
                            <Link href="#运行" title="运行"/>
                            <Link href="#命令详解" title="命令详解">
                                <Link href="#列出机器上的镜像（images）" title="列出机器上的镜像（images）"/>
                                <Link href="#在docker index中搜索image（search）" title="在docker index中搜索image（search）"/>
                                <Link href="#从docker registry server 中下拉image或repository（pull）" title="从docker registry server 中下拉image或repository（pull）"/>
                                <Link href="#推送一个image或repository到registry（push）" title="推送一个image或repository到registry（push）"/>
                                <Link href="#从image启动一个container（run）" title="从image启动一个container（run）"/>
                            </Link>
                        </Anchor>
                    </Col>
                </Row>


            </div>

        );
    }
}

export default Docker1;
