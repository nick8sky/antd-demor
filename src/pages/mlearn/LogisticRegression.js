import React, { Component } from 'react';

class Mlearning5 extends Component {
    render() {
        return (
            <div>
                <h2>逻辑回归</h2>
                <p>下图中X为数据点肿瘤的大小，Y为观测结果是否是恶性肿瘤。通过构建线性回归模型，如hθ(x)所示，构建线性回归模型后，我们设定一个阈值0.5，预测hθ(x)≥0.5的这些点为恶性肿瘤，而hθ(x)&lt;0.5为良性肿瘤。</p>
                {/*<p><img src={require('../../img/20151014123518573.png')}  style={{height:"40%",width:"40%"}}/></p>*/}

                <p><img src="https://gitee.com/nick070809/pics/raw/master/m2/20151014123518573.png" style={{height:"40%",width:"40%"}}/></p>
                <p>但很多实际的情况下，我们需要学习的分类数据并没有这么精准，比如说上述例子中就存在一些不按套路出牌的数据点出现，如下图所示：</p>
                {/*<p><img src={require('../../img/20151014123606004.png')} style={{height:"50%",width:"40%"}}/></p>*/}

                <p><img src="https://gitee.com/nick070809/pics/raw/master/m2/20151014123606004.png" style={{height:"40%",width:"40%"}}/></p>
                <p>显然用线性回归+阈值的方式不能构成一个鲁棒性很好的分类器；如何利用线性回归并能提供一个鲁棒性很好的分类器呢？我们预测值进行分类：</p>
                <p>如果输出结果是在 (0,1) 的一个概率值，这个问题就很清楚了。我们在数学上找了一圈，还真就找着这样一个简单的函数了，就是很神奇的sigmoid函数(如下)：</p>
                <p><img src="https://gitee.com/nick070809/pics/raw/master/m2/WX20180217-170302@2x.png" style={{height:"20%",width:"20%"}}/></p>
                <p>&nbsp;</p>
                <p>即我们需要找到如：</p>
                <p><img src="https://gitee.com/nick070809/pics/raw/master/m2/WX20180217-170302@2x.png" style={{height:"30%",width:"30%"}}/></p>
                <p>或更复杂的函数，z=0时作为我们需要寻找的分界点而不是预先设定0.5了，b可以记为x0。(使用z为了区别 y= wx+b)</p>
                <p>&nbsp;</p>
                <h4>判定边界</h4>
                <p>判定边界，可以理解为是用以对不同类别的数据分割的边界，边界的两旁应该是不同类别的数据。</p>
               {/* <p><img src={require('../../img/20151014124124641.png')} style={{height:"40%",width:"40%"}}/></p>*/}

                <p><img src="https://gitee.com/nick070809/pics/raw/master/m2/20151014124124641.png" style={{height:"40%",width:"40%"}}/></p>
                <p>有时候是这个样子：</p>
                {/*<p><img src={require('../../img/20151014124156527.png')} style={{height:"40%",width:"40%"}}/></p>*/}

                <p><img src="https://gitee.com/nick070809/pics/raw/master/m2/20151014124156527.png" style={{height:"40%",width:"40%"}}/></p>
                <p>甚至可能是这个样子：</p>
                {/*<p><img src={require('../../img/20151014124241795.png')} style={{height:"40%",width:"40%"}}/></p>*/}

                <p><img src="https://gitee.com/nick070809/pics/raw/master/m2/20151014124241795.png" style={{height:"40%",width:"40%"}}/></p>
                <p>上述三幅图中的红绿样本点为不同类别的样本，而我们划出的线，不管是直线、圆或者是曲线，都能比较好地将图中的两类样本分割开来。这就是我们的判定边界，下面我们来看看，逻辑回归是如何根据样本点获得这些判定边界的。</p>
                <p>&nbsp;</p>
                <p>我们认为WX =0是一个决策边界，当它大于0或小于0时，逻辑回归模型分别预测不同的分类结果。</p>
                <p>如h(X)=g(w<sub>0</sub>+w<sub>1</sub>x<sub>1</sub>+w<sub>2</sub>x<sub>2</sub>)，其中w<sub>0</sub> =-3 ,w<sub>1</sub> =1  ,w<sub>2</sub> =1;则当−3+x<sub>1</sub>+x<sub>2</sub>≥0时,  则x<sub>1</sub>+x<sub>2</sub>=3是一个决策边界，这时x<sub>1</sub>,x<sub>2</sub>呈线性关系。</p>
                <p>当h(X)更复杂的时候，我们可以得到非线性的决策边界，例如：</p>
                <p>h(X) =g(w<sub>0</sub>b +w<sub>1</sub>x<sub>1</sub><sup>2</sup>+w<sub>2</sub>x<sub>2</sub><sup>2</sup> );其中w<sub>0</sub> = -4 ,w<sub>1</sub> =1  ,w<sub>2</sub> =1; 这时当x<sub>1</sub><sup>2</sup>+x<sub>2</sub><sup>2</sup>≥4，这时的决策边界是一个圆形;</p>
                <p><img src="https://gitee.com/nick070809/pics/raw/master/m2/WX20180217-170302@2x.png" style={{height:"30%",width:"30%"}}/></p>
                <p>所以我们发现，理论上说，只要我们的h()设计足够合理，准确的说是g(WX)中WX足够复杂，我们能在不同的情形下，拟合出不同的判定边界，从而把不同的样本点分隔开来。</p>
                <h4>代价(损失)函数</h4>
                <p>我们通过对判定边界的说明，知道会有合适的参数W使得WX=0成为很好的分类判定边界，那么问题就来了，我们如何判定我们的参数W是否合适，有多合适呢？更进一步，我们有没有办法去求得这样的合适参数W呢？</p>
                <p>	这就是我们要提到的代价函数与梯度下降了。</p>
                <p>	所谓的代价函数Cost Function，其实是一种衡量我们在这组参数下预估的结果和实际结果差距的函数，比如说线性回归的代价函数定义为一个方差函数。</p>
                <p>	有人会问，为什么要使用方差函数而不使用单个差值绝对值之和？因为我们要找的代价函数最好是可导的，方便在计算时能利用导数相关的特性。</p>
                <p>&nbsp;</p>
                <p>如何定义sigmoid模型的损失函数呢？</p>
                <p>Cost函数和J函数如下，它们是基于最大似然估计推导得到:</p>
                {/*<p><img src={require('../../img/20161113105729831.png')} /></p>*/}

                <p><img src="https://gitee.com/nick070809/pics/raw/master/m2/20161113105729831.png" style={{height:"40%",width:"40%"}}/></p>
                <p>记cost为l(loss)：</p>
                <p>有 l = w<sup>2</sup> +3; l&#39; = 2x;当w&lt;0时, l' 为负值，d为正值 ；w<sub>i+1</sub>= w<sub>i</sub> +ad就会往正的方向前进 。当w>0时，l'>0,d就为负值，所以w<sub>i+1</sub>就会往负的方向前进。</p>
                <h4>梯度下降法</h4>
                <p>对于监督学习，一般需要对模型函数定义损失函数，然后通过优化算法对损失函数进行优化，以便寻求最优W，在求解W的过程中，使用较多的是基于梯度下降法(Gradient Descent，GD)。</p>
                <p>在梯度下降法的求解过程中，只需要对损失函数进行一阶求导，这样做的计算成本会比较小；梯度下降法的几何含义是通过当前点的梯度方向寻找新的迭代点，并移至到迭代点继续寻找新的迭代点，直到找到最优迭代点。</p>
                <p>w<sub>i+1</sub> = w<sub>i</sub> +ad</p>
                <p>d为 损失函数关于w的偏导函数 乘以 -1 ；</p>
                {/*<p><img src={require('../../img/20151014125344499.png')} style={{height:"40%",width:"40%"}}/></p>*/}

                <p><img src="https://gitee.com/nick070809/pics/raw/master/m2/20151014125344499.png" style={{height:"40%",width:"40%"}}/></p>
                <h4>非凸优化问题</h4>
                <p>如果定义的损失函数不是一个凸优化函数可能会出现多个局部最优解，这就要求：</p>
                <p>1、在定义损失函数时最好能找到凸优化的函数替代</p>
                <p>2、定义较小的步长a,避免陷入局部最优</p>
                <p>3、即使是局部最优也能满足实际需求</p>
            </div>
        );
    }
}

export default Mlearning5;