import React, { Component } from "react";
import { NavLink } from "react-router-dom"
import "./TabMenu.less";

const tabs = [{ title: "推荐",to:"/recommend" }, { title: "歌手", to:"/singer"}, { title: "排行榜", to:"/rankinglist"},{ title: "搜索" ,to:"/search"}];

class TobMenu extends Component {
  render() {
    return (
      <div className="music-tab">
        {
          tabs.map((item,index) => {
            return (
                <div className="tab-item" key={index}>
                  <NavLink to={item.to} className="nav-link">
                    <span>{item.title}</span>
                  </NavLink>
                </div>
            )
          })
        }
      </div>
    );
  }
}

export default TobMenu;
