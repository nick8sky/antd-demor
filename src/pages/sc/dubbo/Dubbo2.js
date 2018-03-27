import React, { Component } from 'react';

import Markdown  from 'react-markdown';
class Dubbo1 extends Component {
    render() {
        return (
            <div>
                <Markdown source={"# Dubbo2.5.3集群容错\n" +
                "\n" +
                "集群容错模式：\n" +
                "\n" +
                "###### Failover Cluster\n" +
                "\n" +
                "- 失败自动切换，当出现失败，重试其它服务器。(缺省)\n" +
                "- 通常用于读操作，但重试会带来更长延迟。\n" +
                "- 可通过retries=\"2\"来设置重试次数(不含第一次)。\n" +
                "\n" +
                "###### Failfast Cluster\n" +
                "\n" +
                "- 快速失败，只发起一次调用，失败立即报错。\n" +
                "- 通常用于非幂等性的写操作，比如新增记录。\n" +
                "\n" +
                "###### Failsafe Cluster\n" +
                "\n" +
                "- 失败安全，出现异常时，直接忽略。\n" +
                "- 通常用于写入审计日志等操作。\n" +
                "\n" +
                "###### Failback Cluster\n" +
                "\n" +
                "- 失败自动恢复，后台记录失败请求，定时重发。\n" +
                "- 通常用于消息通知操作。\n" +
                "\n" +
                "###### Forking Cluster\n" +
                "\n" +
                "- 并行调用多个服务器，只要一个成功即返回。\n" +
                "- 通常用于实时性要求较高的读操作，但需要浪费更多服务资源。\n" +
                "- 可通过forks=\"2\"来设置最大并行数。\n" +
                "\n" +
                "###### Broadcast Cluster\n" +
                "\n" +
                "- 广播调用所有提供者，逐个调用，任意一台报错则报错。(2.1.0开始支持)\n" +
                "- 通常用于通知所有提供者更新缓存或日志等本地资源信息。\n" +
                "\n" +
                "```\n" +
                "<dubbo:reference cluster=\"failsafe\" />\n" +
                "```\n" +
                "\n"}/>


    </div>
        );
    }
}

export default Dubbo1;