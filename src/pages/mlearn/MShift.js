import React, { Component } from 'react';

class MShift extends Component {
    render() {
        return (
            <div>
                <h2>均值漂移算法 </h2>
                <p>在mean shift中，聚类中心是通过给定的样本均值来确定的，通过不断更新聚类中心，知道聚类中心不再改变为止。</p>
                <p>在d维空间中，任选一个点，然后以这个点为圆心，h为半径做一个高维球，因为有d维，d可能大于2，所以是高维球。落在这个球内的所有点和圆心都会产生一个向量，向量是以圆心为起点落在球内的点位终点。然后把这些向量都相加。相加的结果就是Meanshift向量。</p>
                <p>如图所以。其中黄色箭头就是Mh（meanshift向量）：</p>
               {/* <p><img src={require('../../img/2012051215035738.jpg')} style={{height:"60%",width:"60%"}}/></p>*/}

                <p><img src="https://gitee.com/nick070809/pics/raw/master/m2/2012051215035738.png" style={{height:"60%",width:"60%"}}/></p>
                <p>再以meanshift向量的终点为圆心，再做一个高维的球。如下图所以，重复以上步骤，就可得到一个meanshift向量。如此重复下去，meanshift算法可以收敛到概率密度最大得地方。也就是最稠密的地方。</p>
                <p>最终的结果如下：</p>
               {/* <p><img src={require('../../img/2012051215323845.jpg')} style={{height:"60%",width:"60%"}}/></p>*/}
                <p><img src="https://gitee.com/nick070809/pics/raw/master/m2/2012051215323845.png" style={{height:"60%",width:"60%"}}/></p>
                <h3>核函数</h3>
                {/*<p><img src={require('../../img/WechatIMG7.jpg')} style={{height:"60%",width:"60%"}}/></p>
                <p><img src={require('../../img/WechatIMG8.jpg')} style={{height:"60%",width:"60%"}}/></p>*/}
                <p><img src="https://gitee.com/nick070809/pics/raw/master/m2/WechatIMG7.jpg" style={{height:"60%",width:"60%"}}/></p>
                <p><img src="https://gitee.com/nick070809/pics/raw/master/m2/WechatIMG8.jpg" style={{height:"60%",width:"60%"}}/></p>
                <p>参考：<a href='http://blog.csdn.net/google19890102/article/details/51030884' target='_blank' >http://blog.csdn.net/google19890102/article/details/51030884</a></p>
                <p>&lt;待深入...&gt;</p>
            </div>
        );
    }
}

export default MShift;