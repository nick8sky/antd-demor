import React, { Component } from 'react';

class Git extends Component {
    render() {


        return (
            <div>
                <p>1、git pull 失败 ,提示：fatal: refusing to merge unrelated histories</p>
                <pre><code>git pull origin master --allow-unrelated-histories
                </code></pre>
                <p>2、.gitignore文件不起作用</p>
                <pre><code>git rm -r --cached .<br/>
                git add .<br/>
                git commit -m &#39;update .gitignore&#39;
                </code></pre>

            </div>
        );
    }
}

export default Git;