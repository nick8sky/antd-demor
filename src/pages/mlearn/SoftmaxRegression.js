import React, { Component } from 'react';

class Mlearning6 extends Component {
    render() {
        return (
            <div>
                <h2>多分类回归</h2>
                <p>Softmax回归是有监督的，不过后面也会介绍它与深度学习/无监督学习方法的结合。</p>
                <p>假设函数h(x)形式如下：</p>
                <p><img src={require('../../img/a1b0d7b40fe624cd8a24354792223a9d.png')} style={{height:"40%",width:"40%"}}/></p>
                <p>其中 Θ是模型的参数(逻辑回归中w)。请注意 <img src={require('../../img/aab84964dbe1a2f77c9c91327ea0d6d6.png')}    />这一项对概率分布进行归一化，使得所有概率之和为 1 。</p>
                <p><img src={require('../../img/ab4ba0d1df4b93696eec7d8bef86e9cd.png')} style={{height:"10%",width:"10%"}}/></p>
                <p>代价函数为：<img src={require('../../img/7634eb3b08dc003aa4591a95824d4fbd.png')}     /></p>
                <p>值得注意的是，logistic回归代价函数是softmax代价函数的特殊情况。因此，logistic回归代价函数可以改为：</p>
                <p><img src={require('../../img/5491271f19161f8ea6a6b2a82c83fc3a.png')} style={{height:"40%",width:"40%"}}/></p>
                <p>&nbsp;</p>


            </div>
        );
    }
}

export default Mlearning6;