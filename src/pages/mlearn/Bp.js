import React, { Component } from 'react';

class Bp extends Component {
    render() {
        return (
            <div>
                <h2>BP神经网络 back propagation</h2>
                <p>神经网络就是模拟人的大脑的神经单元的工作方式，但进行了很大的简化，神经网络由很多神经网络层构成，而每一层又由许多单元组成，第一层叫输入层，最后一层叫输出层，中间的各层叫隐藏层，<strong>在BP神经网络中，只有相邻的神经层的各个单元之间有联系，除了输出层外，每一层都有一个偏置结点</strong>：</p>
                {/*<p><img src={require('../../img/5e4d414cgw1evkbht8fa3j20ac08xdgn.jpg')} style={{height:"30%",width:"30%"}}/></p>*/}
                <p><img src="https://gitee.com/nick070809/pics/raw/master/m2/5e4d414cgw1evkbht8fa3j20ac08xdgn.jpg" style={{height:"30%",width:"30%"}}/></p>


                <p>虽然图中隐藏层只画了一层，但其层数并没有限制，传统的神经网络学习经验认为一层就足够好，而最近的深度学习不这么认为。<strong>偏置结点是为了描述训练数据中没有的特征，偏置结点对于下一层的每一个结点的权重的不同而生产不同的偏置，于是可以认为偏置是每一个结点（除输入层外）的属性。</strong></p>
                <p>&nbsp;</p>
                <p>在描述BP神经网络的训练之前，我们先来看看神经网络各层都有哪些属性：</p>
                <ol>
                    <li>每一个神经单元都有一定量的能量，我们定义其能量值为该结点j的输出值Oj；</li>
                    <li>相邻层之间结点的连接有一个权重Wij，其值在[-1,1]之间；</li>
                    <li>除输入层外，每一层的各个结点都有一个输入值，其值为上一层所有结点按权重传递过来的能量之和加上偏置；</li>
                    <li>除输入层外，每一层都有一个偏置值，其值在[0,1]之间；</li>
                    <li>除输入层外，每个结点的输出值等该结点的输入值作非线性变换；</li>
                    <li>我们认为输入层没有输入值，其输出值即为训练数据的属性，比如一条记录X=&lt;(1,2,3),类别1&gt;，那么输入层的三个结点的输出值分别为1,2,3. 因此输入层的结点个数一般等于训练数据的属性个数。</li>

                </ol>
                <p>训练一个BP神经网络，实际上就是调整网络的权重和偏置这两个参数，BP神经网络的训练过程分两部分：</p>
                <ol>
                    <li>前向传输，逐层波浪式的传递输出值；</li>
                    <li>逆向反馈，反向逐层调整权重和偏置；</li>

                </ol>
                <p>&nbsp;</p>
                <h3>前向传输（Feed-Forward前向反馈）</h3>
                <p>在训练网络之前，我们需要随机初始化权重和偏置，对每一个权重取[-1,1]的一个随机实数，每一个偏置取[0,1]的一个随机实数，之后就开始进行前向传输。</p>
                <p>神经网络的训练是由多趟迭代完成的，每一趟迭代都使用训练集的所有记录，而每一次训练网络只使用一条记录，抽象的描述如下：</p>
                <p>while 终止条件未满足：</p>
                <p>    for record:dataset:</p>
                <p>        trainModel(record)</p>
                <p>首先设置输入层的输出值，假设属性的个数为100，那我们就设置输入层的神经单元个数为100，输入层的结点Ni为记录第i维上的属性值xi。对输入层的操作就这么简单，之后的每层就要复杂一些了，除输入层外，其他各层的输入值是上一层输入值按权重累加的结果值加上偏置，每个结点的输出值等该结点的输入值作变换:</p>
                {/*<p><img src={require('../../img/5e4d414cgw1evkbhudbyzj20n00brdhy.jpg')} style={{height:"50%",width:"50%"}}/></p>*/}
                <p><img src="https://gitee.com/nick070809/pics/raw/master/m2/5e4d414cgw1evkbhudbyzj20n00brdhy.jpg" style={{height:"50%",width:"50%"}}/></p>

                <h3>激活函数</h3>
                <p>激活函数是反映下层输入对上层节点刺激脉冲强度的函数，一般取为(0,1)内连续取值Sigmoid函数：                        f(x)=1/(1+e-x)    <br/></p>
                <p>&nbsp;</p>
                <h3>逆向反馈（Back propagation）</h3>
                <p>逆向反馈从最后一层即输出层开始，我们训练神经网络作分类的目的是希望最后一层的输出能够描述数据记录的类别，比如对于一个二分类的问题，我们常常用两个神经单元作为输出层，如果输出层的第一个神经单元的输出值比第二个神经单元大，我们认为这个数据记录属于第一类，否则属于第二类。</p>
                <p>还记得我们第一次前向反馈时，整个网络的权重和偏置都是我们随机取，因此网络的输出肯定还不能描述记录的类别，因此需要调整网络的参数，即权重值和偏置值，而调整的依据就是网络的输出层的输出值与类别之间的差异，通过调整参数来缩小这个差异，这就是神经网络的优化目标。</p>
                <p>&nbsp;</p>
                <h3>训练终止条件</h3>
                <p>每一轮训练都使用数据集的所有记录，但什么时候停止，停止条件有下面两种：</p>
                <ol>
                    <li>设置最大迭代次数，比如使用数据集迭代100次后停止训练</li>
                    <li>计算训练集在网络上的预测准确率，达到一定门限值后停止训练</li>

                </ol>
                <p>&nbsp;</p>
                <h3><strong>训练BP神经网络的一些经验</strong></h3>
                <p>讲一下自己训练神经网络的一点经验：</p>
                <ol>
                    <li>学习速率不宜设置过大，一般小于0.1，开始我设置了0.85，准确率一直提不上去，很明显是陷入了局部最优解；</li>
                    <li>输入数据应该归一化，开始使用0-255的灰度值测试，效果不好，转成01二值后，效果提升显著；</li>
                    <li>尽量是数据记录随机分布，不要将数据集按记录排序，假设数据集有10个类别，我们把数据集按类别排序，一条一条记录地训练神经网络，训练到后面，模型将只记得最近训练的类别而忘记了之前训练的类别；</li>
                    <li>对于多分类问题，比如汉字识别问题，常用汉字就有7000多个，也就是说有7000个类别，如果我们将输出层设置为7000个结点，那计算量将非常大，并且参数过多而不容易收敛，这时候我们应该对类别进行编码，7000个汉字只需要13个二进制位即可表示，因此我们的输出成只需要设置13个结点即可。</li>

                </ol>
            </div>
        );
    }
}

export default Bp;