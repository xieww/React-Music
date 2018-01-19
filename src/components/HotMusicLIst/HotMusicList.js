import React, { Component } from "react";
import { Link } from "react-router-dom";
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
            <li className="row-li" key={index}>
                <div className="music-img">
                    <img src={item.imgurl} alt=""/>
                </div>
                <div className="text">
                    <h2 className="title-name">
                        {item.creator.name}
                    </h2>
                    <p className="music-info">
                        {item.dissname}
                    </p>
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
