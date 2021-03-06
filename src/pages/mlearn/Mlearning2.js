import React, { Component } from 'react';

class Mlearning2 extends Component {
    render() {
        return (
            <div>
                <p>感知机算法(PLA)</p>
                <p>PLA(Perception Learning Algorithm)适用于二维及高维的线性可划分问题。问题的答案只有同意或者不同意。例如银行可以根据顾客的个人信息来判断是否给顾客发放信用卡。将顾客抽象为一个向量X，包括姓名、年龄、年收入、负债数等。同时设定各个属性所占的比例向量W，对于正相关的属性设置相对较高的比例如年收入，对于负相关的属性设置较低的比例如负债数。y表示是否想该用户发放了信用卡。通过求X和W的内积减去一个阀值，若为正则同意发放信用卡，否则不发放信用卡。我们假设存在着一个从X到Y的映射f，PLA算法就是用来模拟这个映射，使得求出的函数与f尽可能的相似，起码在已知的数据集上一致。</p>
                <p>threshold  阈</p>
                <p>PLA算法即用来求向量W，使得在已知的数据中机器做出的判断与现实完全相同。当X为二维向量时，相当于在平面上画出一条直线将所有的点分成两部分，一部分同意发送，另外的不同意。内积可以表示成：</p>
                <p><img src="https://gitee.com/nick070809/pics/raw/master/m2/20150305084131682.png"/></p>
                <p>进一步可化简成</p>
                <p><img src="https://gitee.com/nick070809/pics/raw/master/m2/20150305085229393.png"/></p>
                <p>其中x0=,x1=-threshold，y∈[-1,1]</p>
                <p>y=1表示在给定的数据中，给该用户发放了信用卡，-1表示未发放。</p>
                <p>&nbsp;</p>
                <p>PLA 算法就可以写得相当简洁，仅有如下4步：</p>
                <ul>
                    <li>Step 1: 随便找一条线，即任意找一个 n 维向量w0，赋初值令w = w0</li>
                    <li>Step 2: 如果这条线正好把训练数据正确切分，训练结束！！此时w代表的<em>h(x)</em> 就是我们学得的模型<em>g</em></li>
                    <li>Step 3: 如果有任意一个样本没有被切分正确，即存在任意(x’, y’)，使得sign( wT x’) ≠ y’，此时我们对w代表的线做一点点修正，令wt+1 = wt + y’x’ ;(为什么可以这样写，因为y’代表的是反方向)</li>
                    <li>Step 4: 跳转到Step 2</li>

                </ul>
                <p>把两种发生错误的情景用图片表示出来： </p>
                <p><img src="https://gitee.com/nick070809/pics/raw/master/m2/20160425142129139.png"/></p>
                <p>η称作学习率，对应到图中就是每次修正的时候旋转了多少，η越大，修正的时候旋转的角度越大；η越小，修正的时候旋转的角度越小 。</p>
            </div>
        );
    }
}

export default Mlearning2;