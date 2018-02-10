import React, { Component } from 'react';

class Oracle extends Component {
    render() {
        return (
            <div>
                <h4>接口默认实现</h4>

                <h4>函数式接口</h4>
                <p>函数式接口是只有一个抽象方法的接口，其余都被默认实现或仅有一个抽象方法。</p>

                <h4>lambda表达式</h4>
                <p>lambda表达式结合函数式接口一起使用的，如果定义的接口只有一个抽象方法则可以使用lambda表达式。</p>


            </div>
        );
    }
}

export default Oracle;