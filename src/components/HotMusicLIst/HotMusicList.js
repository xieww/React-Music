import React, { Component } from "react";
import { Link } from "react-router-dom";
import { ListView } from "antd-mobile";
import "./HotMusicList.less";

class HotMusicList extends Component {
  constructor(props) {
    super(props);
    this.state = {
        // discList: []
    };
  }
  render() {
    let rowList = "";

    rowList = this.props.list.map((item, index) => {
        return (
            <li className="row-li">
                <div className="music-img">
                    <img src={item.imgurl} alt=""/>
                </div>
            </li>
        );
    });
    return (
        <section className="hotlist">
            <h1 className="list-title">热门歌单推荐</h1>
            <ul>
                {rowList}
            </ul>
        </section>
    )
  }
}

export default HotMusicList;
