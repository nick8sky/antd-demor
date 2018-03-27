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
    mytext = 'U2FsdGVkX1/JlTQahl1/3TyAn/Ls0iid+B1elU+aev2uO6De3FtNX6dlgwhitF0f\n' +
        'Vr+jSkU9gRfnhF37X5qZnx0eDa+dUDGS+btri9Ow3xYYJ59JcR/PZfy22JfCB74O\n' +
        'Pegz/E9xlgluqj4w3SDQhwIn08DAqfp0jbJzRrhSRP6sIJp2jXWmZqwxLfMF0GxF\n' +
        'DLhM5qfaBlhfV7T6la9JEi6fYeVc2eule7KPYgiJ1ZIyKTX+Y3lk8rLnFODeSlB1\n' +
        'iKQzukGzXt5LfYUe0FvN6TRuYrXfSo8v5BUFTVTlH2QKTwv0l22vDhxUsDDtWIVs\n' +
        'mJEZMdj/ocGpccAotEHS0FYHT47EHXWVO46LQPEfXMQU+1vxLqp4g4c0uhepNYZC\n' +
        'Sab0H9uCZvMoC9x30JWezFg2nyDk/+rhTDNQ+rVKVZDtzsChLFcxztX1u+p60yIx\n' +
        '3kddNXI+hnLwByEx1KyGGRCefM0+/LSObXcPpH7N7KEI3rTDIb8RWVmOe+f1gLeG\n' +
        '88c5smz2wUIi2QVWUpoxnq6SYUH5Oa/D84T7IdXZMn3Urln7elub/SdYjOB7ijSs\n' +
        'Y5H55xv8ojojshtI31tg9oKwp/d4cX3od9BNtkKGuGz3GVv5Zrad1vQnT4WqcZzK\n' +
        'hTulT/f2UMuxRk92jvKLo/cSs/9T8X3awAm3TUqTOXlBNlEaYqJO+rJGfQ+zXf34\n' +
        '7pEM1slzWxcTzXjNApZkjujRrGkMBlYdt9yHLFYGeyGR+A7XxLpDYzJWMnCZh9s1\n' +
        'ez0+LWQ2ynKNL1gqz/1Imsrn9B5ixqMyr1tBnVynzKv6AyYFnuZz1Oggz8v/8lHf\n' +
        'DerpJ1c1fYBEBHjUfDRH0eDYV7kkMzh4kqLWzLqd3WIrimubmABc6pqfUpUhG7hj\n' +
        'RpK0Zr6yrHwbNky+Jbrl4yW8u78QZqKm25bA7bA5y9KYDrw3hzpAjF/3fUKnrjBG\n' +
        'eOVYBcy8JISWl4AdqL+OUckBUZPqC3z9vLKYCQRS1zSlxQqPK2Yw0BSuxGNL9JMx\n' +
        'Hx/fZ81wyljtcepuT18Em1stSnu6OOPMU3ahAuu44IOXqzcT1c47mQUYwz0v7taI\n' +
        '2drs4pnlmKkSrXr0V5/xgg==';
   // ss ='[T](http://tool.chinaz.com/tools/textencrypt.aspx)';

    handleOk = (e) => {
        if(this.state.key && (this.state.key == 'nick2018' )){
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

