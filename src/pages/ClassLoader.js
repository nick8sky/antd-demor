import React, { Component } from 'react';

class ClassLoader extends Component {
    render() {
        return (
            <div>
                <p><strong>双亲委派模型</strong></p>
                <p>在实现自己的ClassLoader之前，我们先了解一下系统是如何加载类的，那么就不得不介绍双亲委派模型的实现过程：</p>
                <p>即把自定义ClassLoader的父加载器设置为Extension ClassLoader，这样父加载器加载不到Person.class，就交由子加载器MyClassLoader来加载了。</p>


            </div>
        );
    }
}

export default ClassLoader;