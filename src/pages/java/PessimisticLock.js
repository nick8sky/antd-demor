import React, { Component } from 'react';

import { Input } from 'antd';




class PessimisticLock extends Component {
    render() {


        return (
            <div>
                <h1>乐观锁和悲观锁的区别</h1>
                <p>悲观锁(Pessimistic Lock), 顾名思义，就是很悲观，每次去拿数据的时候都认为别人会修改，所以每次在拿数据的时候都会上锁，这样别人想拿这个数据就会block直到它拿到锁。传统的关系型数据库里边就用到了很多这种锁机制，比如行锁，表锁等，读锁，写锁等，都是在做操作之前先上锁。</p>
                <p>乐观锁(Optimistic Lock), 顾名思义，就是很乐观，每次去拿数据的时候都认为别人不会修改，所以不会上锁，但是在更新的时候会判断一下在此期间别人有没有去更新这个数据，可以使用版本号等机制。乐观锁适用于多读的应用类型，这样可以提高吞吐量，像数据库如果提供类似于write_condition机制的其实都是提供的乐观锁。</p>
                <p>&nbsp;</p>
                <p>问:更改账户余额是否需要悲观锁？</p>

            </div>
        );
    }
}

export default PessimisticLock;