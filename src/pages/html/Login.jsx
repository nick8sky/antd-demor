import React, { PropTypes, Component } from 'react'
import './login.css'
import Dialog from './Dialog.jsx'
export default class Login extends Component{
    constructor(props) {
        super(props);
        this.state = {
            textInput: "",
        }
    }
    changeText(event){
        this.setState({textInput:event.target.value})

    }


    clickHandle(){
        alert(this.state.textInput);

    }
    render(){
        return (
            <Dialog width="400" height="200" isShow={this.props.isShow} onClose={this.props.onClose}>
                <div className="loginForm">

                    <div className="loginText">
                        <label style={{color:'#FF0000',fontSize:'10px'}}>{this.state.info}</label>
                        <input type="text" placeholder="手机号/邮箱" onChange={this.changeText.bind(this)} /><br/>
                        <span className="loginBtn" onClick={this.clickHandle.bind(this)}>登录</span>
                    </div>
                </div>
            </Dialog>
        )}

}
Login.defaultProps={
    isShow:true
}