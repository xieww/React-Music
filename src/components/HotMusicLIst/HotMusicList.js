import React, { Component } from "react";
import { Link,withRouter,Route } from "react-router-dom";
import "./HotMusicList.less";
import Scroll from "../../utils/scroll";
import SongList from '../SongList/SongList';

// import history from '../../router';
class HotMusicList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // discList: []
      refreshScroll: false,
    };
  };

  
  /**
   * @author xieww
   * @description 跳转到歌单页面
   * @param {*} urlId
   */
  toMusicList(urlId) {
    return () => {
      this.props.history.push({
        pathname:urlId
      });
    };
    
  }
  render() {
    let rowList = "";
    let {match} = this.props;
    console.log('跳转歌单链接：',this.props.history);
    rowList = this.props.list.map((item, index) => {
      return (
        <li className="row-li" key={index} onClick={this.toMusicList(`${match.url + '/' + item.dissid}`)}>
          <div className="music-img">
            <img src={item.imgurl} alt="" />
          </div>
          <div className="text">
            <h2 className="title-name">{item.creator.name}</h2>
            <p className="music-info">{item.dissname}</p>
          </div>
        </li>
      );
    });
    return (
      <section className="hotlist">
        <h1 className="list-title">热门歌单推荐</h1>
        <ul>{rowList}</ul>
        <Route path={`${match.url + '/:id'}`} component={SongList} />
      </section>
    );
  }
}

export default withRouter(HotMusicList);
