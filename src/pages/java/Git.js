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
                <p>3、同一台电脑设置多个公钥与不同GITHUB帐号交互:</p>
                <p>参考：<a href='https://jingyan.baidu.com/article/219f4bf7f6f8e1de442d3829.html' target='_blank' >https://jingyan.baidu.com/article/219f4bf7f6f8e1de442d3829.html</a></p>
                <p>制造第一把公钥：</p>
                <pre><code>ssh-keygen -t rsa -C &quot;skx@lianpay.com&quot;<br/>
                    # 设置名称为id_rsa0<br/>

                    制造第二把公钥：<br/>

                    ssh-keygen -t rsa -C &quot;nick070809@163.com&quot;<br/>

                                        # 设置名称为id_rsa2<br/>

                    制造第三把公钥：<br/>

                    ssh-keygen -t rsa -C &quot;273034773@qq.com&quot;<br/>

                                        # 设置名称为id_rsa2

                    </code></pre>
                                    <p>在.ssh目录下编辑config文件：</p>
                                    <pre><code>Host nick070809<br/>
                            HostName github.com<br/>
                            User git<br/>
                            IdentityFile /Users/sunkaixiang/.ssh/id_rsa3<br/>
                    Host nick<br/>
                            HostName github.com<br/>
                            User git
                            IdentityFile /Users/sunkaixiang/.ssh/id_rsa2<br/>
                    Host gitlab<br/>
                            HostName 47.*.157.*<br/>
                            User git<br/>
                            IdentityFile /Users/sunkaixiang/.ssh/id_rsa
                    </code></pre>
                                    <p>对于nick帐号下的仓库克隆：</p>
                                    <pre><code>git clone nick:273034773/react.git<br/>

                    (原地址是：git@github.com:273034773/react，替换后应该是：nick:273034773/react.git)

                    </code></pre>
                                    <p>对于nick帐号下的仓库本地目录下获取：</p>
                                    <pre><code>git remote add origin nick:nick070809/vue.git
                    </code></pre>

                <p>4、error: failed to push some refs to &#39;gitlab:xxx.git&#39;<br/>
                    hint: Updates were rejected because the tip of your current branch is behind</p>
                <pre><code>git push -u origin master -f</code></pre>
                <p>5、remote: GitLab: You are not allowed to force push code to a protected branch on this project.</p>
                <p>gitlab默认给master分支加了保护，不允许强制覆盖。于是去gitlab下点击project-&gt;setting-&gt;protected branch，把master的保护去掉就可以了。修改完之后，建议把master的保护再加回来，毕竟强推不是件好事。</p>
                <p><img src='https://gitee.com/nick070809/pics/raw/master/m4/00698ea73037e87e.png' alt='Markdown' /></p>
                <p><img src='https://gitee.com/nick070809/pics/raw/master/m4/0f1d51e5feededa7.png' alt='Markdown' /></p>
                <p>6、分支的新建</p>
                <pre><code>$ git checkout -b iss53   //分支取名为 iss53</code></pre>
                <p>这相当于执行下面这两条命令：</p>
                <pre><code>$ git branch iss53    //创建分支<br/>
$ git checkout iss53  //切换分支<br/>
$ git push origin iss53 //提交分支<br/>
$ git checkout master //切回主干<br/>
$ git merge iss53   //合并分支,合并分支之前一定要先checkout master<br/>
$ git branch -d hotfix //删除分支
</code></pre>
                <p>请注意，合并时出现了“Fast forward”的提示。由于当前 master 分支所在的提交对象是要并入的 iss53 分支的直接上游，Git 只需把 master 分支指针直接右移。换句话说，如果顺着一个分支走下去可以到达另一个分支的话，那么 Git 在合并两者时，只会简单地把指针右移，因为这种单线的历史分支不存在任何需要解决的分歧，所以这种合并过程可以称为快进（Fast forward）。</p>
                <p>&nbsp;</p>
                <p><img src='https://gitee.com/nick070809/pics/raw/master/m4/b5e21db60eee88c4.png' alt='Markdown' /></p>
                <p>合并之后，master 分支和 hotfix 分支指向同一位置。</p>
                <p>值得注意的是之前 hotfix 分支的修改内容尚未包含到 iss53 中来。如果需要纳入此次修补，可以用 git merge master 把 master 分支合并到 iss53；或者等 iss53 完成之后，再将 iss53 分支中的更新并入 master。</p>
                <p>&nbsp;</p>
                <p>7、分支合并</p>
                <p>再次合并其他分支：</p>
                <pre><code> $git merge dev1<br/>
Auto-merging XX-merchant-manage-server/src/main/java/XX/XX/Application.java<br/>
CONFLICT (content): Merge conflict in XX-merchant-manage-server/src/main/java/XX/XX/Application.java<br/>
Automatic merge failed; fix conflicts and then commit the result.
</code></pre>
                <p>在不同的分支中都修改了同一个文件的同一部分，Git 就无法干净地把两者合到一起（译注：逻辑上说，这种问题只能由人来裁决。）</p>
                <p>Git 作了合并，但没有提交，它会停下来等你解决冲突。要看看哪些文件在合并时发生冲突，可以用 git status</p>
                <pre><code>$ git status<br/>
On branch master<br/>
You have unmerged paths.<br/>
Unmerged paths:<br/>
 both modified:   XX-merchant-manage-server/src/main/java/tech/fullink/Application.java
</code></pre>
                <p>任何包含未解决冲突的文件都会以未合并（unmerged）的状态列出。Git 会在有冲突的文件里加入标准的冲突解决标记，可以通过它们来手工定位并解决这些冲突。可以看到此文件包含类似下面这样的部分：</p>
                <pre><code>&lt;&lt;&lt;&lt;&lt;&lt;&lt; HEAD<br/>
    //dev 2<br/>
    //frv 33<br/>
=======<br/>
    //dev 1<br/>
    //deee<br/>
                    &gt;&gt;&gt;&gt;&gt;&gt;&gt; dev1
</code></pre>
                <p>可以看到 ======= 隔开的上半部分，是 HEAD（即 master 分支，在运行 merge 命令时所切换到的分支）中的内容，下半部分是在 iss53 分支中的内容。解决冲突的办法无非是二者选其一或者由你亲自整合到一起。</p>
                <p>删除了 &lt;&lt;&lt;&lt;&lt;&lt;&lt;，======= 和 &gt;&gt;&gt;&gt;&gt;&gt;&gt; 这些行。在解决了所有文件里的所有冲突后，运行 git add 将把它们标记为已解决状态（译注：实际上就是来一次快照保存到暂存区域。）。因为一旦暂存，就表示冲突已经解决。</p>
                <p>参考：<a href='http://blog.csdn.net/zzh920625/article/details/59118408' target='_blank' >http://blog.csdn.net/zzh920625/article/details/59118408</a></p>

                <p>8、直接提交到分支.</p>
                <p>    error: src refspec xxx does not match any.</p>
                <p>    error: failed to push some refs to &#39;git@&#39;</p>
                <p>解决方案<br/>
                    git push origin HEAD:branch</p>




            </div>
        );
    }
}

export default Git;