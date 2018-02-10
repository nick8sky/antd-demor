import React, { Component } from 'react';

class Tomcat extends Component {
    render() {
        return (
            <div>
                <img src='../img/1365990181_2529.png' alt='v2-201356' width="500" height="570" />
            <ul>
            <li>ClassLoader：Java提供的类加载器抽象类，用户自定义的类加载器需要继承实现；</li>
        <li>commonLoader：Tomcat最基本的类加载器，加载路径中的class可以被Tomcat容器本身以及各个Webapp访问；</li>
        <li>catalinaLoader：Tomcat容器私有的类加载器，加载路径中的class对于Webapp不可见；</li>
        <li>sharedLoader：各个Webapp共享的类加载器，加载路径中的class对于所有Webapp可见，但是对于Tomcat容器不可见；</li>
        <li>WebappClassLoader：各个Webapp私有的类加载器，加载路径中的class只对当前Webapp可见。</li>
    </ul>

        <p> 一直比较好奇，为什么tomcat需要实现自己的classloader，jvm提供的classloader有什么不符合需要？</p>
        <p>   事实上，tomcat之所以造了一堆自己的classloader，大致是出于下面三类目的：</p>
        <ol>
            <li>对于各个webapp中的class和lib，需要相互隔离，不能出现一个应用中加载的类库会影响另一个应用的情况；而对于许多应用，需要有共享的lib以便不浪费资源，举个例子，如果webapp1和webapp2都用到了log4j，可以将log4j提到tomcat/lib中，表示所有应用共享此类库，试想如果log4j很大，并且20个应用都分别加载，那实在是没有必要的。</li>
            <li>第二个原因则是与jvm一样的安全性问题。使用单独的classloader去装载tomcat自身的类库，以免其他恶意或无意的破坏；</li>
            <li>第三个原因是热部署的问题。相信大家一定为tomcat修改文件不用重启就自动重新装载类库而惊叹吧。</li>
        </ol>


    </div>
        );
    }
}

export default Tomcat;