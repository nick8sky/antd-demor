import React, { PropTypes, Component } from 'react'
import ClassNames from 'classnames'
import './index.css'
export default class Dialog extends React.Component{
    constructor(props) {
        super(props);
    }
    onCloseHandler(){
        this.props.onClose();
    }
    renderTitle(){
        const {title,titlePosition}=this.props;
        if(title){
            if(titlePosition){
                switch (titlePosition){
                    case 'left':
                        return <div className={ClassNames('titleText','left')}>{title}</div>;
                    case 'right':
                        return <div className={ClassNames('titleText','right')}>{title}</div>;
                    case 'center':
                        return <div className={ClassNames('titleText','center')}>{title}</div>;
                    default:
                        return null;
                }
            }
        }
    }
    renderContent(){
        const{content} = this.props
    }
    render(){
        const {width,height} = this.props;
        let marginTop = -height/2;
        let marginLeft = -width/2;
        return (this.props.isShow &&
            <div className="dialog">
                <div className={ClassNames({"dialog-content":true})} style={{width:width+'px',height:height+'px',marginTop:marginTop+'px',marginLeft:marginLeft+'px'}}>
                    <div className="dialog-close" onClick={this.onCloseHandler.bind(this)}><img src={require('./cancel.png')} /></div>
                    {this.renderTitle()}
                    {this.props.children}
                </div>
            </div>
        )
    }

}
Dialog.defaultProps = {
    width:550,
    height:500
};