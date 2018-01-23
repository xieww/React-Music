import React, { Component } from "react";
import { NavBar, Icon } from "antd-mobile";
import { withRouter } from "react-router-dom";
import "./NavHeadBar.less";

class NavHeadBar extends Component {
    constructor(props) {
        super(props);
        this.state = {};
      }
    render() {
        console.log('this.props.history',this.props);
        return(
        <NavBar
          mode="light"
          icon={<Icon type="left" />}
          onLeftClick={() => this.props.history.goBack()}
          className="header-nav"
        >
          <span className="title-header">
            {this.props.title}
          </span>
        </NavBar>
        )
    }
}
export default withRouter(NavHeadBar);