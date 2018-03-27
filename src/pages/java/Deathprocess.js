import React, { Component } from 'react';

import Markdown  from 'react-markdown';

class Deathprocess extends Component {
    render() {

        return (
            <div>
                <Markdown source={"僵尸进程的产生：\n" +
                "\n" +
                "当一个进程创建了一个子进程时，他们的运行时异步的。即父进程无法预知子进程会在什么时候结束，那么如果父进程很繁忙来不及wait 子进程时，那么当子进程结束时，会不会丢失子进程的结束时的状态信息呢？处于这种考虑unix提供了一种机制可以保证只要父进程想知道子进程结束时的信息，它就可以得到。\n" +
                "\n" +
                "这种机制是：在每个进程退出的时候，内核释放该进程所有的资源，包括打开的文件，占用的内存。但是仍然保留了一些信息（如进程号pid 退出状态 运行时间等）。这些保留的信息直到进程通过调用wait/waitpid时才会释放。这样就导致了一个问题，如果没有调用wait/waitpid的话，那么保留的信息就不会释放。比如进程号就会被一直占用了。但系统所能使用的进程号的有限的，如果产生大量的僵尸进程，将导致系统没有可用的进程号而导致系统不能创建进程，所以我们应该避免僵尸进程。\n" +
                "\n" +
                " \n" +
                "\n" +
                "这里有一个需要注意的地方。如果子进程先结束而父进程后结束，即子进程结束后，父进程还在继续运行但是并未调用wait/waitpid那子进程就会成为僵尸进程。如果子进程还在运行，父进程已经结束。那么并不会产生僵尸进程。应为每个进程结束时，系统都会扫描当前系统中运行的所有进程，看看有没有哪个进程时刚刚结束的这个进程的子进程，如果有，就有init来接管它，成为它的父进程。\n" +
                "\n" +
                " \n" +
                "\n" +
                "同样的在产生僵尸进程的那种情况下，即子进程结束了但父进程还在继续运行（并未调用wait/waitpid）这段期间，假如父进程异常终止了，那么该子进程就会自动被init接管。那么它就不再是僵尸进程了。应为intit会发现并释放它所占有的资源。（当然如果进程表越大，init发现它接管僵尸进程这个过程就会变得越慢，所以在init为发现他们之前，僵尸进程依旧消耗着系统的资源）。\n" +
                "\n" +
                "\n" +
                "\n" +
                "我们先来讨论 父进程先结束的情况， 比如这段代码。我们让子进程循环打印5次语句 父进程循环打印3次语句。并在父进程中调用wait（）等待子进程的结束：\n" +
                "\n" +
                "```\n" +
                "#include<stdio.h>  \n" +
                "#include<stdlib.h>  \n" +
                "#include<unistd.h>  \n" +
                "#include<sys/types.h>  \n" +
                "#include<sys/wait.h>  \n" +
                "int main()  \n" +
                "{  \n" +
                "       int count;  \n" +
                "       pid_t pid;  \n" +
                "       char *message;   \n" +
                "       printf(\"fork program starting\\n\");  \n" +
                "   \n" +
                "       pid=fork();  \n" +
                "       switch(pid)  \n" +
                "       {    \n" +
                "                case -1:perror(\"forkerror\");  \n" +
                "                        exit(EXIT_FAILURE);  \n" +
                "                        break;  \n" +
                "                case 0 :message=\"This is the children\";  \n" +
                "                        count=10;  \n" +
                "                        break;  \n" +
                "                default:message=\"This is the parent.\";  \n" +
                "                        count=3;  \n" +
                "                        break;  \n" +
                "        }    \n" +
                "       for(;count>0;count--)  \n" +
                "       {    \n" +
                "                printf(\"%s\\n\",message);  \n" +
                "                sleep(1);  \n" +
                "       }    \n" +
                "       if(pid)  \n" +
                "                wait((int *)0);  \n" +
                "       if(pid)  \n" +
                "                printf(\"Father programDone.\\n\");  \n" +
                "       else  \n" +
                "                printf(\"Child ProgramDnoe\\n\");  \n" +
                "       exit(0);  \n" +
                "      \n" +
                "}  \n" +
                "```\n" +
                "\n" +
                "我们让程序在后台运行，并用ps命令查看进程状态:\n" +
                "\n" +
                "![Markdown](https://gitee.com/nick070809/pics/raw/master/m4/4f797fbf9ae5a565.jpg)\n" +
                "\n" +
                "我们从输出中看到\n" +
                "\n" +
                "第一行显示了我们运行的进程pid是2734\n" +
                "\n" +
                "Ps 的输出中我们看到了他有一个2735的子进程，\n" +
                "\n" +
                "父进程循环三次后并不会结束，而是等待子进程结束后再结束。\n" +
                "\n" +
                "这里并未产生僵尸进程\n" +
                "\n" +
                " \n" +
                "\n" +
                " \n" +
                "\n" +
                "如果我们不等带子进程的结束\n" +
                "\n" +
                "将\n" +
                "\n" +
                "```注释掉\n" +
                "if(pid)  \n" +
                "wait((int *)0) \n" +
                "```\n" +
                "\n" +
                "将产生如下输出\n" +
                "\n" +
                "![Markdown](https://gitee.com/nick070809/pics/raw/master/m4/d1e380fb4473ebf1.jpg)\n" +
                "\n" +
                "从第一行我们看到我们运行的程序pid为2804\n" +
                "\n" +
                "Ps输出中的pid为2805 是创建的子进程。我们是在父进程结束后（未调用wait，所以父进程先结束）再用ps命令查看的。所以2805的父进程变成了1 （init 的pid），因为2804已经结束了，所以2805这个子进程被 init接管,同样这里并未产生僵尸进程\n" +
                "\n" +
                " \n" +
                "\n" +
                "现在我们来分析子进程后结束的情况,我们 给出下面这个程序:\n" +
                "\n" +
                "```\n" +
                "int main()  \n" +
                "{  \n" +
                "       int count;  \n" +
                "       char *message;  \n" +
                "       pid_t pid;  \n" +
                "   \n" +
                "       pid=fork();  \n" +
                "       switch(pid)  \n" +
                "       {    \n" +
                "                case -1:  \n" +
                "                        perror(\"forkerror\");  \n" +
                "                        exit(EXIT_FAILURE);  \n" +
                "                case 0:message=\"This is the child.\";  \n" +
                "                        count=5;  \n" +
                "                        break;  \n" +
                "                default:message=\"This is the parent.\";  \n" +
                "                        count=10;  \n" +
                "                       break;  \n" +
                "       }    \n" +
                "       for(;count>0;count--)  \n" +
                "       {    \n" +
                "                printf(\"%s\\n\",message);  \n" +
                "                sleep(2);  \n" +
                "       }    \n" +
                "   \n" +
                "       if(pid)  \n" +
                "                printf(\"Father programDone.\\n\");  \n" +
                "       else  \n" +
                "                printf(\"Child prigramDone\\n\");  \n" +
                "       exit(EXIT_SUCCESS);  \n" +
                "   \n" +
                "}  \n" +
                "```\n" +
                "\n" +
                "这里的代码改动很小，我们只是改变了父进程和子进程的 打印次数\n" +
                "\n" +
                "并且在父进程中我们不调用wait/waitpid来释放子进程的一些信息\n" +
                "\n" +
                "![Markdown](https://gitee.com/nick070809/pics/raw/master/m4/0c4bd73cc898980c.jpg)\n" +
                "\n" +
                "在子进程结束，但父进程还未结束时我们查看进程信息\n" +
                "\n" +
                "第一行我们看到 我们运行的程序pid 是2874，它的子进程我们可以从ps输出中看到为2875\n" +
                "\n" +
                " 我们注意到pid为2875的进程这时候成了僵尸进程。如果主线程运行的时间足够长，那么该僵尸进程就会一直存在着并占用着系统的一些资源。\n" +
                "\n" +
                "\n" +
                "\n" +
                "**我们已尽知道了僵尸进程的产生原因，那么如何避免僵尸进程呢**。\n" +
                "\n" +
                " \n" +
                "\n" +
                "如果父进程并不是很繁忙我们就可以通过直接调用wait/waitpid来等待子进程的结束。当然这会导致父进程被挂起。比如第一种情况中(父进程循环了三次，子进程循环了五次，子进程先结束，父进程调用wait等待子进程)父进程循环结束后并不会结束，而是被挂起等待子进程的结束。\n" +
                "\n" +
                " \n" +
                "\n" +
                "但是如果父进程很忙。我们不希望父进程一直被挂起直到子进程的结束\n" +
                "\n" +
                "那么我们可以使用信号函数sigaction为SIGCHLD设置wait处理函数。这样子进程结束后，父进程就会收到子进程结束的信号。并调用wait回收子进程的资源\n" +
                "\n" +
                "这里给出一个例程:\n" +
                "\n" +
                "```\n" +
                "void fun_act(int sig)  \n" +
                "{  \n" +
                "       wait((int *)0);  \n" +
                "}  \n" +
                "int main()  \n" +
                "{  \n" +
                "       int count;  \n" +
                "       char *message;  \n" +
                "       pid_t pid;  \n" +
                "   \n" +
                "       struct sigaction act;  \n" +
                "       act.sa_handler=fun_act;  \n" +
                "       sigemptyset(&act.sa_mask);  \n" +
                "       act.sa_flags=0;  \n" +
                "   \n" +
                "       pid=fork();  \n" +
                "       switch(pid)  \n" +
                "       {    \n" +
                "                case -1:  \n" +
                "                        perror(\"forkerror\");  \n" +
                "                        exit(EXIT_FAILURE);  \n" +
                "   \n" +
                "                case 0:message=\"This isthe child.\";  \n" +
                "                        count=5;  \n" +
                "                        break;  \n" +
                "                             \n" +
                "                default:message=\"This isth parent.\";  \n" +
                "                        count=10;  \n" +
                "                        break;  \n" +
                "       }  \n" +
                "if(pid)  \n" +
                "               if(sigaction(SIGCHLD,&act,0)==-1)  \n" +
                "                {  \n" +
                "                        perror(\"Settingsignal failed.\");  \n" +
                "                        exit(1);  \n" +
                "                }  \n" +
                "       for(;count>0;count--)  \n" +
                "       {  \n" +
                "               printf(\"%s\\n\",message);  \n" +
                "                sleep(1);  \n" +
                "       }  \n" +
                "       if(pid)  \n" +
                "                printf(\"Father programDone.\\n\");  \n" +
                "       else  \n" +
                "                printf(\"Child prigramDone\\n\");  \n" +
                "       exit(EXIT_SUCCESS);  \n" +
                "   \n" +
                "}  \n" +
                "```\n" +
                "\n" +
                "![Markdown](https://gitee.com/nick070809/pics/raw/master/m4/ac6d26ad90267673.jpg)\n" +
                "\n" +
                "我们在子进程结束前 用 ps 查看了一次结束后也查看了一次。\n" +
                "\n" +
                "从输出我们看到，pid为2949的子进程正常结束了，并未产生僵尸进程。说明子进程结束后，父进程收到了它结束的消息，并调用了wait回收了子进程的资源。从而避免了僵尸进程的产生。---\n" +
                "\n" +
                "僵尸线程的形成原因和僵尸进程类似：\n" +
                "\n" +
                "如果主线程忙等，那么已经结束的线程，资源得不到回收，也无法被重新调度，这时就成为僵尸线程了。主线程采用pthread**_**join等待的时候，也有可能产生僵尸线程。"}/>
                    
            </div>
        );
    }
}

export default Deathprocess;