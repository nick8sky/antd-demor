import React, { Component } from 'react';

class Mlearning3 extends Component {
    render() {
        return (
            <div>
                <p>线性回归 liner regression</p>
                <p>分类：分类问题是找到最好一个超平面将不同的样本分开。
                    回归： 回归问题是找到一个超平面尽量将所有的样本落在这个超平面上。
                </p>
                <p>在线性回归中，目标值和特征值之间存在线性相关的关系。</p>
                <p>线性回归的目标就是找到一个超平面使样本尽量集中在超平面周围(离超平面的距离尽量近)。</p>
            </div>
        );
    }
}

export default Mlearning3;