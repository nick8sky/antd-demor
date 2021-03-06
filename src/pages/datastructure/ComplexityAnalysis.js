import React, { Component } from 'react';





class ComplexityAnalysis extends Component {
    render() {
        return (
            <div>
                <h2>时间复杂度&amp;空间复杂度分析</h2>
                <p>我们一般讨论的是最坏时间复杂度，这样做的原因是：最坏情况下的时间复杂度是算法在任何输入实例上运行时间的上界，分析最坏的情况以估算算法指向时间的一个上界。</p>
                <p>&nbsp;</p>
                <p>时间复杂度一般有一下下七种，算法时间复杂度依次增加：</p>
                <p>O(1)常数型、O(log2 n)对数型、O(n)线性型、O(nlog2n)二维型、O(n^2)平方型、O(n^3)立方型、O(2^n)指数型.</p>
                <p>&nbsp;</p>
                <p>空间复杂度：</p>
                <p>  算法的空间复杂度并不是计算实际占用的空间，而是计算整个算法的辅助空间单元的个数，与问题的规模没有关系。算法的空间复杂度S(n)定义为该算法所耗费空间的数量级。</p>
                <p>  S(n)=O(f(n))  若算法执行时所需要的辅助空间相对于输入数据量n而言是一个常数，则称这个算法的辅助空间为O(1); </p>
                <p>  递归算法的空间复杂度：递归深度N*每次递归所要的辅助空间， 如果每次递归所需的辅助空间是常数，则递归的空间复杂度是 O(N).</p>
                <p>&nbsp;</p>
                <p>求二分法的时间复杂度和空间复杂度：</p>
                <p>栈内处理</p>
               {/* <p><img src={require('../../img/20160906202802828.jpg')} /></p>*/}
                <p><img src="https://thumbnail0.baidupcs.com/thumbnail/85c01773f5440801f726df357f4fed6f?fid=940423185-250528-1076150003852900&time=1520074800&rt=sh&sign=FDTAER-DCb740ccc5511e5e8fedcff06b081203-HZDbMwLAAvKzBciIbjzMU9pNcZ4%3D&expires=8h&chkv=0&chkbd=0&chkpc=&dp-logid=1433954520865757381&dp-callid=0&size=c710_u400&quality=100&vuk=-&ft=video" /></p>
                <p>时间复杂度是O(log2 N);</p>
                <p>由于辅助空间是常数级别的所以：</p>
                <p>空间复杂度是O(1);</p>
                <p>&nbsp;</p>
                <p>空间复杂度可以理解为，每次栈为了接受入参所开辟的空间个数。</p>
            </div>
        );
    }
}

export default ComplexityAnalysis;