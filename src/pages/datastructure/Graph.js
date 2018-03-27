import React, { Component } from 'react';




class Graph extends Component {
    render() {


        return (
            <div>
                <h2>图 Graph</h2>
                <p>线性表和树两类数据结构，线性表中的元素是“一对一”的关系，树中的元素是“一对多”的关系，本章所述的图结构中的元素则是“多对多”的关系。图是一种复杂的非线性结构，在图结构中，每个元素都可以有零个或多个前驱，也可以有零个或多个后继，也就是说，元素之间的关系是任意的。</p>
                <p>定义：图（Graph）是由顶点的有穷非空集合和顶点之间边的集合组成，通常表示为：G(V,E)，其中，G表示一个图，V是图G中顶点的集合，E是图G中边的集合。</p>
                <h4>图的分类</h4>
                <p>图是按照无方向和有方向分为无向图和有向图：</p>
                {/*<p><img src={require('../../img/261416422507490.png')} /></p>*/}
                <p><img src="https://thumbnail0.baidupcs.com/thumbnail/acd24bcc1aed1811366706567e78857a?fid=940423185-250528-657478048020961&time=1520074800&rt=sh&sign=FDTAER-DCb740ccc5511e5e8fedcff06b081203-bA5VypnUtxClv%2FmiXJmygHvORkY%3D&expires=8h&chkv=0&chkbd=0&chkpc=&dp-logid=1434012128852014579&dp-callid=0&size=c710_u400&quality=100&vuk=-&ft=video"/></p>

                <p>如果任意两个顶点之间都存在边叫完全图，有向的图叫有向完全图。无向图用()表示，有向图用&lt;&gt;表示。</p>
                <p>边带权值的图叫网：</p>
                <p><img src="https://thumbnail0.baidupcs.com/thumbnail/a0d039bf9230fe70bad7cebfc6b05125?fid=940423185-250528-255897178162146&time=1520074800&rt=sh&sign=FDTAER-DCb740ccc5511e5e8fedcff06b081203-hVIZIWJ9jtW2YRY7Il%2FXHa4Y9Ac%3D&expires=8h&chkv=0&chkbd=0&chkpc=&dp-logid=1434039445343481855&dp-callid=0&size=c710_u400&quality=100&vuk=-&ft=video" /></p>
                <p>度:顶点边的数目;有向图还有入度和出度，入度：方向指向顶点的边；出度：方向背向顶点的边。</p>
                <p>路径长度：一个顶点到另一个顶点的边或弧的个数</p>
                <p><img src="https://thumbnail0.baidupcs.com/thumbnail/eb8184bc30d26be884f4e0212e74a473?fid=940423185-250528-260860532633911&time=1520074800&rt=sh&sign=FDTAER-DCb740ccc5511e5e8fedcff06b081203-eUPk2hCci9kBHbKxvxV4AOvCcG0%3D&expires=8h&chkv=0&chkbd=0&chkpc=&dp-logid=1434055111949672882&dp-callid=0&size=c710_u400&quality=100&vuk=-&ft=video" /></p>
                <p>左图中(粗线的边)，从B到D的路径度为2，在右图中是3; 图中A的入度是2，出度是1；B的入度为0，出度是2。</p>
                <p>连通：在无向图G中，任意两个顶点可以相通就是连通图</p>
                {/*<p><img src={require('../../img/261416538907214.png')} /></p>*/}
                <p><img src="https://thumbnail0.baidupcs.com/thumbnail/7cef59578ee839541ba1161de86632b3?fid=940423185-250528-201293369438806&time=1520074800&rt=sh&sign=FDTAER-DCb740ccc5511e5e8fedcff06b081203-3Arf2FZaVUNfffuBGb2wopOgiKM%3D&expires=8h&chkv=0&chkbd=0&chkpc=&dp-logid=1434066511357710606&dp-callid=0&size=c710_u400&quality=100&vuk=-&ft=video"/></p>

                <p>左图不是连通图，AE之间没有连通。</p>
                <h4>图的存储结构</h4>
                <p>图的结构比价复杂，任意两个顶点之间都可能存在关系，不能用简单的顺序存储结构来表示。如果运用多重链表，即一个数据域多个指针域组成的结点表示图中一个结点，则造成大量存储单元浪费。</p>
                <h5>1、邻接矩阵</h5>
                <p>邻接矩阵用两个数组保存数据。一个一维数组存储图中顶点信息，一个二维数组存储图中边或弧的信息;</p>
                <p>无向图的二维数组:</p>
                {/*<p><img src={require('../../img/261416556561787.png')} /></p>*/}
                <p><img src="https://thumbnail0.baidupcs.com/thumbnail/573a8b4aeeb304a98be1faabd2ebcdd0?fid=940423185-250528-412645892902006&time=1520074800&rt=sh&sign=FDTAER-DCb740ccc5511e5e8fedcff06b081203-LdU%2FTFTdFDcCLiFMYWo0n1MSThg%3D&expires=8h&chkv=0&chkbd=0&chkpc=&dp-logid=1434080324486324349&dp-callid=0&size=c710_u400&quality=100&vuk=-&ft=video" /></p>
                <p>有向图的邻接矩阵：有向图中讲究入度和出度</p>
                {/*<p><img src={require('../../img/261417023593435.png')} /></p>*/}
                <p><img src="https://thumbnail0.baidupcs.com/thumbnail/fb14ff59a7bcdff5b068ce6dea38ad9b?fid=940423185-250528-349561502374011&time=1520074800&rt=sh&sign=FDTAER-DCb740ccc5511e5e8fedcff06b081203-x2BzaLEJdU0%2Fp%2FPgteg4zhQwnvY%3D&expires=8h&chkv=0&chkbd=0&chkpc=&dp-logid=1434089041414123930&dp-callid=0&size=c710_u400&quality=100&vuk=-&ft=video" /></p>
                <p>这里的∞表示不是很准确，在有些图中，出度为6用-6表示，入度为9用+9表示，没有关系的用0.</p>
                <h5>2、邻接表</h5>
                <h5>3、十字链表</h5>
                <h5>4、邻接多重表</h5>
                <p>邻接矩阵应该是对图的存储和计算提供了最优方式，并且可以方便提升到多维矩阵，其他几种存储方式不做细讲。</p>



            </div>
        );
    }
}

export default Graph;