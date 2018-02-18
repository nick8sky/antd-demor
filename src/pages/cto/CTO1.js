import React, { Component } from 'react';

class CTO1 extends Component {
    render() {
        return (
            <div>
                <h2>[转]我承认，我是被我的CTO害死的</h2>
                <p>有位VC界的前辈说过，一个理想的创业公司，3个合伙人，应该是百度的技术，阿里的运营和腾讯的产品。</p>
                <p>相信创过业的人都清楚，技术在创业早期，重要性应该在50%甚至更高，只有随着业务的发展，比重才渐渐降低，运营和产品的比重反之。一个bug频发的demo，不仅会葬送用户，也会谋杀投资。</p>
                <p>多年前我受到创始人邀请，从微软亚洲回到杭州创业，和另外一名浙大毕业的周同学一起担任联席CTO。这位周同学之前在创新工场，所以团队也大多使用他从创新工场带出来的技术栈，CEO是市场营销出身，这些是前话。</p>
                <p>磨合一段时间后，我对其中一些不合理，效率低、可能存在风险的技术方案提出了质疑，周同学每次都以各种理由搪塞过去，非技术背景的CEO因公司已经在全面使用这套方案，也表示从长计议。直到某一天晚上，这些潜在危险集中爆发，服务器发生了大规模宕机，周同学引咎辞职后，团队的技术架构才逐渐走上正轨。</p>
                <p>2年前，我参与的一个电商创业项目被收购，小幅财务自由的同时，我开始转型小天使，开始寻找好的投资项目。天使投资最重要的就是了解行业，了解团队，<strong>我萌生了通过应聘技术岗位去了解各个互联网项目的大胆想法。</strong>一试不要紧，几乎80%的互联网项目的技术团队都存在问题，而CTO/技术负责人就是罪魁祸首。</p>
                <p>说几件我在这些年调查中遇到的奇葩事吧。</p>
                <p>1.杭州的一家图片社交APP公司，用户量百万多。</p>
                <p>我当时面试的岗位是技术总监，HR居然给我安排了一个4年多工作经验的Java工程师来面试，问了一些具体开发的细枝末节的知识点，我回答完后表示这些问题似乎和岗位不符，HR这才找来技术负责人面试。</p>
                <p>负责人是前百度的架构师，一开口就是很浓重的“学院风”，尽问一些互联网实战中基本用不到的技术问题，比如“RSAsha1的算法是怎么实现的？”，我回答了个大概，然后反问他，“你们不是创业公司吗？网上很多开源类库可以用啊，咱们公司做APP需要专门研究加密算法吗？”接着就是更多的奇怪的问题，比如某个偏门的Java API的参数是哪几个之类，让人无语凝噎。</p>
                <p>学院派带领的技术团队，一定会成为追求“小步快跑”的初创公司的绊脚石。</p>
                <p>2.杭州滨江的一家互联网住房租赁公司，通过数据的筛选提供优质房源信息。</p>
                <p>阿里系的两位LP都对这家公司很感兴趣，准备发TS前夕，我便自告奋勇「潜伏」考察。我降低了简历的一半工作年限，通过面试顺利进入公司成为一名开发工程师。</p>
                <p>在该公司的一个月中，我亲眼见着CTO把100多号人的技术团队搞得乌烟瘴气，拉帮结派。按照传统企业的思路搭建了一个庞大臃肿的架构，技术方案也极其不符合公司发展现状，导致业务开发效率低下。根据测算，现有业务其实只需30号技术人员就可以hold住。团队里有个副总监，偶尔会提出一些质疑意见，CTO则会直接当着其他成员的面用很难听的话训斥他，最后整个团队无一人敢发声，一切都是CTO说了算，Team成员都在背地里纷纷议论CTO水平低下且情商为负。</p>
                <p>CEO也完全不过问技术团的事情，虽然新业务上线的进度一再拖延，但也并未多说太多。100号技术人员和30号技术人员，这是多么大的资源浪费啊！后来我给出了详细的产品和技术分析报告，核心成员性格profiling(剖析)，两位LP最后放弃了。</p>
                <p>3.上海的一家金融征信公司，输出数据产品给企业用户，公司人数200。</p>
                <p>面试我的是技术负责人，也是CTO。面试时足足让我等了2个小时，技术负责人才睡眼惺忪地跑过来，先自承来自蚂蚁金服，然后开始和我扯阿里的架构，对阿里技术烂熟于心的我自然不在话下，问了几个问题见似乎难不倒我之后，他说了一句“我们还是说蚂蚁吧，蚂蚁比阿里的技术牛逼”，把我雷的外焦里嫩。</p>
                <p>聊了几个关于双11的支付订单并发以及分布式事务，冷不防一个问题“你知道你们蚂蚁金服有几个灾备机房吗？”，这真把我问住了。我表示不清楚后，他让我走了人。回去之后当然也音讯全无，HR电话都没给一个。</p>
                <p>以上是随便列举了3个典型的例子，北京，上海，杭州，存在问题的技术团队还有很多很多，他们中的大多都死在了A轮，部分也拿到过TAB和其他知名VC机构的资金。</p>
                <p>虽然笔者有10年互联网技术背景，担任过几个互联网项目的技术合伙人，也不能保证自己所讲内容符合各个团队实际情况，以下内容纯属个人观点，请看官自行分析或采用。</p>
                <p>创业公司的技术方案，一般90%都是由最早的技术合伙人/CTO来制定，由于他的技术背景，人生经历，之前任职的公司文化，在方案在选择上一定有自己的偏好。</p>
                <p>技术人员是一个特殊的群体，古时中国有“文人相轻”，如今互联网有中国特色的“程序员相轻”现象。这种现象在3~8年经验的技术人员中尤为突出，互相看对方不顺眼，我觉得你的技术方案垃圾，我认为你设计的架构不行。</p>
                <p>2017年除夕夜爆出程序员造反的某互联网公司，内部就是山头林立，金山系，百度系，腾讯系互相掐架，技术团队内耗极其严重。</p>
                <p>CEO一般都是营销/市场/产品出身，所以技术相关的一股脑全部推给CTO去负责，自己安心做产品或运营。</p>
                <p>这恰恰是非常危险的！</p>
                <p>你们的技术团队，可能从此就变成CTO的一言堂，他可以尽享“一人之下，X人之上”的快感，就算有大牛来你们公司面试，你也会因为轻信CTO的一句“这个人不行，原因是XXXX”而错失提升团队战斗力或结识技术人脉的机会。</p>
                <p>那么，如何判断你的CTO是有毒的？</p>
                <p>1、他总是很快地推荐自己的朋友/前同事入职，并催促你尽快同意，一段时间后，你发现公司50%的技术都是他的朋友/前同事；</p>
                <p>潜规则：裙带关系的形成，不仅能稳固自己的地位，也可以排挤不认可自己技术方案或不同流派风格的技术人员。</p>
                <p>解读：技术团队尽量做到百花齐放，但是又精神统一，一旦派系形成，你的项目离黄也就不远了。</p>
                <p>2、产品把新业务策划出来后，到了约定的交付时间，技术团队还没有把产品开发出来。同一个业务，时间的拖延经常达到3次或以上，问他“什么时候能上线？”他的回答一般就是“目前还不行，因为XXXX的技术问题，所以YYYY”，用你听不懂的技术语言来回答你。</p>
                <p>潜消息：CTO对团队的管理，技术方案风险的评估经验异常欠缺，无法正确地估算生产力和效率。</p>
                <p>解读：<strong>优秀的CTO不仅技术过硬，还要能在业务进度上和你保持同频，CTO不是一个纯技术岗位</strong>。</p>
                <p>3、遇到bug出现，导致公司出现财务或形象损失，他没有第一时间把责任归咎于自己，而是推给下面写这部分代码的程序员或产品经理，认为是他们的技术能力不过关或是产品逻辑设计缺陷。</p>
                <p>潜意识：推给产品或下面，CEO也不好随便骂我，毕竟我是合伙人，算起来也是公司的二把手或三把手，位高权重。</p>
                <p>解读：<strong>称职的CTO需要尽量把控到各个业务逻辑的代码，抽时间做关键代码的审查</strong>，推诿责任是说不过去的，潜意识里他认为自己是“高管”，应该由下面“做事”的人为结果负责。</p>
                <p>说了那么多，的建议是：CEO应该尽量逼自己去和各式各样的技术人员沟通，不能太过倚重一个技术人员，留好CTO职位backup的同时，也增加技术人脉，为开拓新业务或新项目做准备。多和基层技术人员沟通，及时发现技术团队的问题，如果CTO真的太过自负，问题颇多，当断则断，不要畏首畏尾。</p>
                <p>So，CEO们，是不是回家和你的CTO好好谈一谈？</p>
                <p>看看你的CTO，是银弹，还是毒瘤？</p>

            </div>
        );
    }
}

export default CTO1;