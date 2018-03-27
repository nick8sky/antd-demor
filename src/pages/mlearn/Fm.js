import React, { Component } from 'react';

class Fm extends Component {
    render() {
        return (
            <div>
                <h2>因子分解机Factorization Machine</h2>
                <p>以一个广告分类的问题为例，根据用户画像、广告位以及一些其他的特征，来预测用户是否会点击广告（<strong>二分类问题</strong>）。数据如下： </p>
                <table>
                    <thead>
                    <tr><th>Clicked?</th><th>Country</th><th>Day</th><th>Ad_type</th></tr></thead>
                    <tbody><tr><td>1</td><td>USA</td><td>26/11/15</td><td>Movie</td></tr><tr><td>0</td><td>China</td><td>1/7/14</td><td>Game</td></tr><tr><td>1</td><td>China</td><td>19/2/15</td><td>Game</td></tr></tbody>
                </table>
                <p>  &quot;Clicked?&quot;是label，Country、Day、Ad_type是特征。由于三种特征都是categorical[明确的]类型的，需要经过独热编码（One-Hot Encoding）转换成数值型特征。</p>
                <p>将上面的离散特征数据进行one-hot编码以后（假设Country,Day,Ad_type类别只有图中几种），如下图所示:</p>
                <table>
                    <thead>
                    <tr><th>Clicked?</th><th>Country=USA</th><th>Country=China</th><th>Day=26/11/15</th><th>Day=1/7/14</th><th>Day=19/2/15</th><th>Ad_type=Movie</th><th>Ad_type=Game</th></tr></thead>
                    <tbody><tr><td>1</td><td>1</td><td>0</td><td>1</td><td>0</td><td>0</td><td>1</td><td>0</td></tr><tr><td>0</td><td>0</td><td>1</td><td>0</td><td>1</td><td>0</td><td>0</td><td>1</td></tr><tr><td>1</td><td>0</td><td>1</td><td>0</td><td>0</td><td>1</td><td>0</td><td>1</td></tr></tbody>
                </table>
                <p>	显然可以看出，特征从最初的3个变成了现在的7个。而实际工程当中，由于有的Categorical特征维度会非常大（比如地区等），如果采用One-Hot编码，那么互联网公司的动辄上亿个特征的数据集就是这么来的了。	</p>
                <p>	由上表可以看出，经过One-Hot编码之后，大部分样本数据特征是比较稀疏的。上面的样例中，每个样本有7维特征，但平均仅有3维特征具有非零值。实际上，这种情况并不是此例独有的，在真实应用场景中这种情况普遍存在。例如，CTR/CVR预测时，用户的性别、职业、教育水平、品类偏好，商品的品类 等，经过One-Hot编码转换后都会导致样本数据的稀疏性。特别是商品品类这种类型的特征，如商品的末级品类约有550个，采用One-Hot编码生成 550个数值特征，但每个样本的这550个特征，有且仅有一个是有效的（非零）。由此可见，数据稀疏性是实际问题中不可避免的挑战。
                    One-Hot编码的另一个特点就是导致特征空间大。例如，商品品类有550维特征，一个categorical特征转换为550维数值特征，特征空间剧增。
                    同时通过观察大量的样本数据可以发现，某些特征经过关联之后，与label之间的相关性就会提高。例如，“USA”与“Thanksgiving”、“China”与“Chinese New Year”这样的关联特征，对用户的点击有着正向的影响。换句话说，来自“China”的用户很可能会在“Chinese New Year”有大量的浏览、购买行为，而在“Thanksgiving”却不会有特别的消费行为。这种关联特征与label的正向相关性在实际问题中是普遍 存在的，如“化妆品”类商品与“女”性，“球类运动配件”的商品与“男”性，“电影票”的商品与“电影”品类偏好等。因此，引入两个特征的组合是非常有意义的。</p>
                <p>     一般的线性模型为：</p>
               {/* <p><img src={require('../../img/https://gitee.com/nick070809/pics/raw/master/m2/5e4d414cgw1evkbhudbyzj20n00brdhy.jpg')} style={{height:"20%",width:"20%"}}/></p>*/}
                <p><img src="https://gitee.com/nick070809/pics/raw/master/m2/5e4d414cgw1evkbhudbyzj20n00brdhy.jpg" style={{height:"20%",width:"20%"}}/></p>


                <p>对于度为2的因子分解机（FM）的模型为：</p>
                <p><img src="https://gitee.com/nick070809/pics/raw/master/m2/WX20180217-101256@2x.png" style={{height:"40%",width:"40%"}}/></p>
                <p>v∈R<sup>n*k</sup> ， &lt;v<sub>i</sub>,v<sub>j</sub>> 表示的是两个大小为 k 的向量之间的点积： </p>

                <p><img src="https://gitee.com/nick070809/pics/raw/master/m2/WX20180217-101402@2x.png" style={{height:"25%",width:"25%"}}/></p>
                <p>与线性模型相比，FM的模型就多了后面特征组合的部分，在基本线性回归模型的基础上引入交叉项；</p>
                {/*<p><img src={require('../../img/WX20180217-101907@2x.png')} style={{height:"80%",width:"80%"}}/></p>*/}
                <p><img src="https://gitee.com/nick070809/pics/raw/master/m2/WX20180217-101907@2x.png" style={{height:"80%",width:"80%"}}/></p>
                <p>损失函数：</p>
                {/*<p><img src={require('../../img/WX20180217-102105@2x.png')} style={{height:"50%",width:"50%"}}/></p>*/}
                <p><img src="https://gitee.com/nick070809/pics/raw/master/m2/WX20180217-102105@2x.png" style={{height:"80%",width:"80%"}}/></p>
               {/* <p><img src={require('../../img/WX20180217-102211@2x.png')} style={{height:"60%",width:"60%"}}/></p>*/}
                <p><img src="https://gitee.com/nick070809/pics/raw/master/m2/WX20180217-102211@2x.png" style={{height:"80%",width:"80%"}}/></p>
                <p>使用SGD比较常见。</p>
                <p>&nbsp;</p>
                <p>&nbsp;</p>
                <p>参看：<a href='http://blog.csdn.net/itplus/article/details/40536025' target='_blank' >http://blog.csdn.net/itplus/article/details/40536025</a></p>

            </div>
        );
    }
}

export default Fm;