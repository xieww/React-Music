import React, { Component } from "react";
import { Spin } from 'antd';
import 'antd/dist/antd.css'; 
import "./Loading.less";

/**
 * @author xieww
 * @description 封装Loading组件
 */
class MyLoading extends Component {
    constructor(props) {
      super(props);
      this.state = {
      };
    }
    render() {        
        return (
          <div className="loading-spin" style={this.props.isloading === true ? {display:"block"} : {display:"none"}}>
            <Spin delay={5000} size="large" tip="Loading..."/>
          </div>
          
        )
    }
}

export default MyLoading;