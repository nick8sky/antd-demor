import React, { Component } from 'react';
import { Progress ,Calendar} from 'antd';

class Home extends React.Component {
    state = {

        d: 0,

    }
    increase = () => {
        let  percent4 = this.state.d;
        if (percent4 < 100) {
            let d = percent4 + 15;
            if (d > 100) {
                d = 100;
            }
            this.setState({ d });
        }
    }
    componentDidMount() {
       /* const inter = (run) => {setInterval(run,500)};
        inter(this.increase);*/
    }
    render() {
        return (
            <div >
                {/*<Progress   percent={this.state.d} status="active"/>*/}
                <p>&nbsp;</p>
                    <div style={{ width: 500, border: '1px solid #d9d9d9', borderRadius: 4,marginLeft:"auto",marginRight:"auto" }}>
                    <Calendar fullscreen={false}   />
                </div>
                <p>&nbsp;</p>
            </div>
        );
    }
}



export default Home;