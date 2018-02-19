
import React, { Component } from 'react';
import Markdown  from 'react-markdown';
import { Modal, Button ,Input, Icon} from 'antd';








class React1 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userName: '',
            visible: false
        };
    }



    showModal = () => {
        this.setState({
            visible: true,
        });
    }
    handleOk = (e) => {

        console.log(this.state.userName);
        this.setState({
            visible: false,
        });
    }
    handleCancel = (e) => {

        this.setState({
            visible: false,
        });
    }
    emitEmpty = () => {
        this.userNameInput.focus();
        this.setState({ userName: '' });
    }
    onChangeUserName = (e) => {
        this.setState({ userName: e.target.value });
    }

    render() {
        const { userName } = this.state;
        const suffix = userName ? <Icon type="close-circle" onClick={this.emitEmpty} /> : null;



       /* MFs.readFile(path.join(__dirname, 'ee', 'hello.txt'), 'utf8', (err, fixture) => {
            console.log('Discovered new dependency:', {fixture});
        });*/


            return (
                <div>
                    <Markdown source={"22"}/>
                    <Button type="primary" onClick={this.showModal}>Open</Button>
                    <Modal
                        title="Basic Modal"
                        visible={this.state.visible}
                        onOk={this.handleOk}
                        onCancel={this.handleCancel}
                    >
                        <p> <Input
                            placeholder="Enter your username"
                            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            suffix={suffix}
                            value={userName}
                            onChange={this.onChangeUserName}
                            ref={node => this.userNameInput = node}
                        /></p>

                    </Modal>
                </div>
            );
    }
}

export default React1;