import React, { Component } from 'react';
import {Icon} from 'antd';
import { withRouter,Route, NavLink } from "react-router-dom";
import UserCenter from "../UserCenter/UserCenter";
import './Topbar.less';
import "../../images/commons.less";

class TopBars extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
      let {match} = this.props;
    return (
      <header className="headerBar" onClick={e => e.stopPropagation()}>
        {/* <i className="music_logo">IMusic音乐</i> */}
        {/* <a className="link_download">下载APP</a> */}
        <div className="icon-logo" />
        <h1 className="text">IMusic</h1>
        {/* <div className="user" onClick={this.toUserCenter(`${match.url + 'userCenter'}`)}>
          <Icon type="user-xie" className="icon-user" />
        </div> */}
        <NavLink to={'/usercenter'} className="user">
          <Icon type="user-xie" className="icon-user" />
        </NavLink>
      </header>
    );
  }
}

export default withRouter(TopBars);