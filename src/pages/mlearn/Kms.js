import React, { Component } from 'react';

class Kms extends Component {
    render() {
        return (
            <div>
                <h2>k-平均算法 </h2>
                <p>k-means与kNN虽然都是以k打头，但却是两类算法——kNN为监督学习中的分类算法，而k-means则是非监督学习中的聚类算法；二者相同之处：均利用近邻信息来标注类别。</p>
                <p>聚类是数据挖掘中一种非常重要的学习流派，指将未标注的样本数据中相似的分为同一类。假设有m个样本[X<sub>1</sub>,X<sub>2</sub>,X<sub>3</sub>,…X<sub>n</sub>];每个样本Xi都有n个特征[x<sub>1</sub>,x<sub>2</sub>,x<sub>3</sub>,…x<sub>n</sub>];首先任意创建k个聚类中心，然后遍历每个样本与聚类中心的距离，确定样本所属聚类，然后调整聚类中心的位置，直到聚类中心不再改变。</p>
                <p>在机器学习中使用到的距离函数：</p>
                <p>闵可夫斯基距离(MinKowski distance)</p>
                <p>曼哈顿距离(Manhattan distance)</p>
                <p>欧式距离(Euclidean distance) </p>
                <p>对于欧式空间的样本数据，以平方误差和（sum of the squared error, SSE)作为聚类的目标函数，同时也可以衡量不同聚类结果好坏的指标：</p>
                <p><img src="https://gitee.com/nick070809/pics/raw/master/m2/WX20180217-170302@2x.png" style={{height:"20%",width:"20%"}}/></p>
                <p>下图中给出了一个通过4次迭代聚类3个中心的例子：</p>
                {/*<p><img src={require('../../img/399159-20160131182028552-1529699913.png')} style={{height:"75%",width:"75%"}}/></p>*/}
                <p><img src="https://gitee.com/nick070809/pics/raw/master/m2/399159-20160131182028552-1529699913.png" style={{height:"75%",width:"75%"}}/></p>


                <p>k-means存在缺点：</p>
                <p>1、k-means容易受到初始质心的影响；比如在上图中，因选择初始质心不恰当而造成次优的聚类结果（SSE较大）：</p>
                <p>2、同时，k的个数也会直接影响聚类结果，最优聚类的k值应与样本数据本身的结构信息相吻合，而这种结构信息是很难去掌握，因此选取最优k值是非常困难的。</p>
                <p>&nbsp;</p>
                <h3>k-means++算法</h3>
                <p>为了解决上述存在缺点，在基本k-means的基础上发展 ，选择一种策略：初始的聚类中心之间的相互距离要尽可能的远，这就是k-means++算法。</p>
                <p>k-means++算法选择初始聚类中心的基本原则是：初始的聚类中心之间的相互距离要尽可能的远。它选择初始聚类中心的步骤是：</p>
                <p>（1）随机选择一个样本作为第一个聚类中心；</p>
                <p>（2）计算其余样本点与已选聚类中心的距离d,选择最大的max[D]的样本最为新的聚类中心。</p>
                <p>（3）重复过程（2）直到找到k个聚类中心。</p>
                <p>（4）调整聚类中心的位置，直到聚类中心不再改变。</p>
                <p>&nbsp;</p>
                <p>k-means与k-means++唯一不同的是在初始化聚类中心的过程。</p>
            </div>
        );
    }
}

export default Kms;