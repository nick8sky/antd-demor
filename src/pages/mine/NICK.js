import {Icon,Modal ,Input,message} from 'antd';
import React from 'react';

import Markdown  from 'react-markdown';

import CryptoJS  from 'crypto-js';







class LoadMoreList extends React.Component {
    constructor(props) {
        super(props);
        if(!window.erred){
            window.erred = 0 ;
        }else if(window.erred > 3 ){
            message.error('nick不欢迎你，请离开本网站');
            window.erred = window.erred +1 ;
        }else if(window.erred > 5 ){
            window.location.replace("http://news.baidu.com/")
        }

        //console.log(window.erred)
        this.state = {
            key:'',
            visible: window.erred <=3,
            pass1:false,
            key2:'',
            visible2: false,
            data:(window.erred <=3)?'':'nick不欢迎你，请离开本网站。',
        }

    }
    mytext = 'U2FsdGVkX1+dvnpgITESkkKOEty9tIhEjfoZGfNpmxkfbDk09YJ5bqjR6jXQUZgG\n' +
        'BZerzJ+wORQlFYyqV8Bg0fkYHFlA7VZAnkyDpaSk/lZF9bBOtaDuGXq9NwSDq9On\n' +
        'G26H3QFHyzi9MnJMIzLF3YR8ye9hgi8WA5SzqigOWcDS6y1429XHvDIGCsjpuhjQ\n' +
        'u4vApPaVlc8FZ0qOu91CumUhBLiUfuImV6EPmt33tOehQ8i0XUVunvh4zAdWJF+I\n' +
        'jHa53wo0i1p2lMdLNLrotnpuDXrgDCLrVoNCgM/a8OG7v8lNXI4L7Kfz0D3IkCRo\n' +
        'sm1gVTXQbpi5eZkyTtafmnw82HP7Doj3WQOcKxkfnmhkzpiMFe4kqWArGp83RyAk\n' +
        'AUifFbrhg88371uOw68Xq1nnJNxibqpPUYr4eGP8uf2PrgSDsKqbiQPHqX14e8YQ\n' +
        'lUN2YAFc0F9vRugJygJgcbCl5IKLfoAoSY+oSDkjAfjvUZDoIlHrksAblNe9JFQG\n' +
        'kiVb2OjzuiX+jRQ2rUBjEKRPeiSenYljHw218Nem5NsKZodWWRelfdIkGObt+w8X\n' +
        'i88f2uSAqJbJUxcD/342ITWvfnLxXAzylxA+bwkQ/0kvLpG3JXChL4+rGHft7HeA\n' +
        'rgtXoCjsWuhRjWUqS/SF821Yu+rjqAYannI6kAlVawY=';
   // ss ='[T](http://tool.chinaz.com/tools/textencrypt.aspx)';

    handleOk = (e) => {
        if(this.state.key && (this.state.key == 'lmf9000' )){
            this.setState({
                visible: false,
                pass1: true,
                data:this.mytext
            });
        }else{
            //console.log(window.erred)
            this.setState({
                visible: false,
                pass1: false,
                data:"Hello ,侵入者 "
            });
            if(window.erred){
                window.erred = window.erred +1 ;
                if(window.erred >999){
                    message.error('你已受限，请离开本网站');
                    this.setState({
                        data:"nick不欢迎你，请离开本网站 "
                    });
                }
            }else {
                window.erred = 1 ;
            }

        }
    }
    handleCancel = (e) => {
        this.setState({
            visible: false,
        });
    }
    emitEmpty = () => {
        this.keyInput.focus();
        this.setState({ key: '' });
    }
    onChangeUserName = (e) => {
        this.setState({ key: e.target.value });
        //console.log(e.target.value);
    }



    onChangeUserName2 = (e) => {
        this.setState({ key2: e.target.value });
        //console.log(e.target.value);
    }
    handleCancel2 = (e) => {
        this.setState({
            visible2: false,
        });
    }
    handleOk2 = (e) => {
        //console.log(this.mytext);
        //console.log(this.state.key2);

        let ssss =  this.mytext.trim().split('\n');
        let word ='';
        ssss.forEach(function(value){
            word+=value;
        });

        //console.log(word);
        window.erred = 0;
        let bytes  = CryptoJS.AES.decrypt(word,this.state.key2);
        let plaintext = bytes.toString(CryptoJS.enc.Utf8);
        this.setState({
            visible2: false,
            data:plaintext
        });
    }
    emitEmpty2 = () => {
        this.keyInput.focus();
        this.setState({ key2: '' });
    }
    ser= () =>{
        console.log(this.state.pass1);
        if(!this.state.pass1){
            return ;
            //message.error('非法输入');
        }
        if(this.state.visible2){
            return ;
        }

        this.setState({
            visible2: true,
        });
    }
      func= () =>{

          //let ciphertext = "U2FsdGVkX19NnHR4w3XOqXskKXP/13HssORfJLRMwPU=";
          //var ciphertext = CryptoJS.AES.encrypt('my message', 'secret key 123');
          //var ciphertext = CryptoJS.AES.encrypt(JSON.stringify(data), 'secret key 123');
          // Decrypt
         // console.log(this.mytext);
          //let bytes  = CryptoJS.AES.decrypt(this.mytext, 'n8');
          //let plaintext = bytes.toString(CryptoJS.enc.Utf8);
         // this.setState({
         //     visible: false,
        //      data:plaintext
        //  });
          //console.log(ciphertext.toString());
          //console.log(plaintext);
    }





    render() {
        var divStyle = {
                width: '350px',
                height: '520px',
                marginLeft: '90px'
        };


        const suffix = key ? <Icon type="close-circle" onClick={this.emitEmpty} /> : null;
        const suffix2 = key2 ? <Icon type="close-circle" onClick={this.emitEmpty2} /> : null;
        const {key,key2} = this.state;

        return (
            <div >
                <Modal
                    title="非法闯入，未经允许不许访问!"
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                >
                    <p>
                        <p><img src="https://gitee.com/nick070809/pics/raw/master/home/wx.png"  style={{height:"100%",width:"100%"}}/></p>
                        <Input
                            placeholder="非法闯入，未经允许不许访问!"
                            prefix={<Icon type="question-circle-o" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            suffix={suffix}
                            value={key}
                            type="password"

                            onChange={this.onChangeUserName}
                            ref={node => this.keyInput = node}
                        /></p>

                </Modal>

                <a href="javascript:void(0)" onClick={this.ser}> <span style={{fontSize: '20px'}}>T</span></a>
                <Markdown source={this.state.data}/>
                <Modal
                    title="非法闯入，未经允许不许访问!"
                    visible={this.state.visible2}
                    onOk={this.handleOk2}
                    onCancel={this.handleCancel2}
                >
                    <p>
                        <p><img src="https://gitee.com/nick070809/pics/raw/master/home/wx.png"  style={{height:"100%",width:"100%"}}/></p>
                        <Input
                            placeholder="请输入图中的微信号或验证码"
                            prefix={<Icon type="question-circle-o" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            suffix={suffix2}
                            value={key2}
                            type="password"

                            onChange={this.onChangeUserName2}
                            ref={node => this.keyInput = node}
                        /></p>

                </Modal>


            </div>
        );
    }
}




export default LoadMoreList;

