import {List, Button, Spin, Icon, Rate, Tag} from 'antd';
import React from 'react';


const data = [


    {
        "title": "TCP/IP详解卷一.pdf",
        "description": "TCP/IP详解卷一  密码:8i5x",
        "url": "https://pan.baidu.com/s/1jJuRza2"
    },
    {
        "title": "TCP/IP详解卷二.pdf",
        "description": "TCP/IP详解卷二 密码:ezjq",
        "url": "https://pan.baidu.com/s/1bqio0vP"
    },
    {
        "title": "TCP/IP详解卷三.pdf",
        "description": "TCP/IP详解卷三 密码:z699",
        "url": "https://pan.baidu.com/s/1c3wz7g8"
    },

    {
        "title": "区块链_技术驱动金融.pdf",
        "description": "区块链 技术驱动金融 高清版",
        "url": "http://download.csdn.net/download/llianlianpay/10253004"
    },
    {
        "title": "人类简史.pdf",
        "description": "人类简史",
        "url": "https://pan.baidu.com/s/1ggLvL9D"
    },
    {
        "title": "线性代数及其应用.pdf",
        "description": "中文版 第三版",
        "url": "https://pan.baidu.com/s/1pM2O9hL"
    },
    {
        "title": "mysql技术内幕.pdf",
        "description": "mysql技术内幕 InnoDB引擎第二版 密码:zm6z",
        "url": "https://pan.baidu.com/s/1snsRuFV"
    }

];


class ResourceList extends React.Component {
    state = {
        loading: true,
        loadingMore: false,
        showLoadingMore: true,
        remaining: 0,
        total: 0,
        data: [],
    }

    pigeNum = 1;


    componentDidMount() {
        this.getData((results) => {
            this.setState({
                loading: false,
                data: results,
            });
        });
    }

    async getData(callback) {
        /*const {results} = await fetch(`https://randomuser.me/api/?results=5&inc=name,gender,email,nat&noinfo`).then(response => response.json())*/
        const pageSize = 10;
        let arr = [];
        let lastIndex = this.pigeNum * pageSize;

        if (this.pigeNum * pageSize >= data.length) {
            lastIndex = data.length;
        }
        this.remaining = data.length - lastIndex;
        this.setState({
            remaining: data.length - lastIndex,
            total: data.length,
        });

        for (let j = (this.pigeNum - 1) * pageSize; j < lastIndex; j += 1) {
            arr.push(data[j])
        }

        callback(arr)
        this.pigeNum = this.pigeNum + 1

    }


    onLoadMore = () => {
        this.setState({
            loadingMore: true,
        });
        this.getData((results) => {
            const data = this.state.data.concat(results);
            this.setState({
                data,
                loadingMore: false,
            }, () => {
                window.dispatchEvent(new Event('resize'));
            });
        });
    }


    render() {
        const IconText = ({type, text}) => (
            <span> <Icon type={type} style={{marginRight: 8}}/>
                {text}
            </span>
        );

        const {loading, loadingMore, showLoadingMore, data, remaining, total} = this.state;
        const loadMore = showLoadingMore ? (
            <div style={{textAlign: 'center', marginTop: 12, height: 32, lineHeight: '32px'}}>
                {loadingMore && <Spin/>}
                {!loadingMore &&
                <Button onClick={this.onLoadMore}> loading more, total {total} remaining {remaining}  </Button>}
            </div>
        ) : null;
        return (
            <List
                className="demo-loadmore-list"
                loading={loading}
                itemLayout="horizontal"
                loadMore={loadMore}
                dataSource={data}
                renderItem={item => (
                    <List.Item>
                        <List.Item.Meta
                            title={
                                <span>

                                 <a href={item.url}> <span style={{fontSize: '20px'}}>{item.title}</span></a>
                                </span>
                            }
                            description={item.description}
                        />
                    </List.Item>

                )}
            />
        );
    }
}

export default ResourceList;