import React, { Component } from 'react';
import Markdown  from 'react-markdown';



class Maven extends Component {
    render() {


        return (
            <div>
                <Markdown source={"1.错误： Fatal error compiling: java.lang.NoClassDefFoundError: com/sun/tools/javac/file/BaseFileObject: com.sun.tools.javac.file.BaseFileObject\n" +
                "\n" +
                "解决：The issue appeared because of Lombok library. Upgrading to the latest version resolved this issue\n" +
                "\n" +
                "```\n" +
                "<lombok.version>1.16.8</lombok.version>---><lombok.version>1.16.20</lombok.version>\n" +
                "```\n" +
                "\n" +
                "\n" +
                "\n" +
                "2.按照环境打包\n" +
                "\n" +
                "```\n" +
                "<profiles>\n" +
                "        <profile>\n" +
                "            <id>TEST</id>\n" +
                "            <properties>\n" +
                "                <env>test</env>\n" +
                "                <!-- springboot环境指定 -->\n" +
                "                <profileActive>test</profileActive>\n" +
                "            </properties>\n" +
                "            <build>\n" +
                "                <resources>\n" +
                "                    <!-- 指定环境差异配置的配置文件所在目录 -->\n" +
                "                    <resource>\n" +
                "                        <directory>${project.basedir}/src/main/resources/TEST</directory>\n" +
                "                    </resource>\n" +
                "                </resources>\n" +
                "            </build>\n" +
                "        </profile>\n" +
                "        ...\n" +
                "```\n" +
                "\n" +
                "mvn package -PTEST -Dmaven.test.skip=true\n" +
                "\n" +
                "这里的TEST与id对应。"}/>




            </div>
        );
    }
}

export default Maven;