import React, { Component } from 'react';
import { Link } from 'react-router-dom';


class Title extends Component {




    render() {
        return (
            <div>
                <div  style={{float:'right'}}><span> <Link to="/list">日志列表</Link> </span>      <span> <Link to="/resources">资源列表</Link> </span>      <span><Link to="/about">关于我</Link></span></div>
            </div>
        );
    }
}

export default Title;