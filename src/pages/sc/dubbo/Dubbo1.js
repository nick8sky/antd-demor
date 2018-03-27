import React, { Component } from 'react';

import Markdown  from 'react-markdown';
class Dubbo1 extends Component {
    render() {
        return (
            <div>
                <Markdown source={"# Dubbo2.5.3集群容错和负载均衡\n" +
                "\n" +
                "(1)配置说明\n" +
                "\n" +
                "在集群负载均衡时，Dubbo提供了多种均衡策略，缺省为random随机调用。\n" +
                "\n" +
                "###### Random LoadBalance\n" +
                "\n" +
                "- 随机，按权重设置随机概率。\n" +
                "- 在一个截面上碰撞的概率高，但调用量越大分布越均匀，而且按概率使用权重后也比较均匀，有利于动态调整提供者权重。\n" +
                "\n" +
                "![Markdown](https://gitee.com/nick070809/pics/raw/master/m4/42692c3f6d9991ee.png)\n" +
                "\n" +
                "![Markdown](https://gitee.com/nick070809/pics/raw/master/m4/84c316b4edc0d4b3.png)\n" +
                "\n" +
                "![Markdown](https://gitee.com/nick070809/pics/raw/master/m4/62685157d95f72b8.png)\n" +
                "\n" +
                "\n" +
                "\n" +
                "###### RoundRobin LoadBalance\n" +
                "\n" +
                "- 轮循，按公约后的权重设置轮循比率。\n" +
                "- 存在慢的提供者累积请求问题，比如：第二台机器很慢，但没挂，当请求调到第二台时就卡在那，久而久之，所有请求都卡在调到第二台上。\n" +
                "- 即随机权重或者轮询权重，随机权重保证大楷安装设置的比例调用不同服务提供者，轮询权重则是严格按照比例调用服务提供者。\n" +
                "\n" +
                "###### LeastActive LoadBalance\n" +
                "\n" +
                "- 最少活跃调用数，相同活跃数的随机，活跃数指调用前后计数差。\n" +
                "- 使慢的提供者收到更少请求，因为越慢的提供者的调用前后计数差会越大。\n" +
                "\n" +
                "###### ConsistentHash LoadBalance\n" +
                "\n" +
                "- 一致性Hash，相同参数的请求总是发到同一提供者。\n" +
                "- 当某一台提供者挂时，原本发往该提供者的请求，基于虚拟节点，平摊到其它提供者，不会引起剧烈变动。\n" +
                "- 算法参见：[http://en.wikipedia.org/wiki/Consistent_hashing](http://dubbo.io/)。\n" +
                "- 缺省只对第一个参数Hash，如果要修改，请配置<dubbo:parameter key=\"hash.arguments\" value=\"0,1\" />\n" +
                "- 缺省用160份虚拟节点，如果要修改，请配置<dubbo:parameter key=\"hash.nodes\" value=\"320\" />"}/>


    </div>
        );
    }
}

export default Dubbo1;