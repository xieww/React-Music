import React, { Component } from 'react';
import { Icon} from 'antd';
import { Toast,SearchBar,SegmentedControl, PullToRefresh ,NoticeBar , Modal} from 'antd-mobile';
import { withRouter } from "react-router-dom"
import Scroll from "../../utils/scroll";
import SongItem from "../common/SongItem/SongItem";
import { getSongVKey } from "../../Api/song";
import { CODE_SUCCESS } from "../../Api/config";
import { CSSTransition } from "react-transition-group";

import "./UserCenter.less";

class UserCenter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedIndexs: 0,
      show: false,
    };
  }

  componentDidMount() {
    this.setState({
      show: true,
    });
  }
  /**@author xieww
   * @description 获取歌曲地址
   * @param {*} song
   * @param {*} mId
   */
  getSongUrl(song, mId) {
    getSongVKey(mId).then(res => {
      if (res) {
        if (res.code === CODE_SUCCESS) {
          if (res.data.items) {
            let item = res.data.items[0];
            song.url = `http://dl.stream.qqmusic.qq.com/${item.filename}?vkey=${item.vkey}&guid=3655047200&fromtag=66`;
          }
        }
      }
    });
  }

  /**
   * @author xiew
   * @description 处理歌曲信息
   * @param {*} list
   */
  processSongs = list => {
    let TempSong = [];
    list.forEach(item => {
      if (item.id && item.mId) {
        this.getSongUrl(item, item.mId);
        TempSong.push(item);
      }
    });
    return TempSong;
  };
  /**
   * @author xieww
   * @description 选择历史记录
   * @param {*} e
   */
  selectList = e => {
    console.log("索引" + e.nativeEvent.selectedSegmentIndex);
    this.setState({
      selectedIndexs: e.nativeEvent.selectedSegmentIndex
    });
  };

  /**
   * @author xieww
   * @param {*} value
   */
  onValueChange = value => {
    // console.log("===========", value);
  };

  /**
   * @author xieww
   * @description 随机播放全部
   * @param {*}
   */
  randomPlay = () => {
    let favoriteSongs = this.processSongs(this.props.favoriteHistory);
    let listenSongs = this.processSongs(this.props.playHistory);
    let list =
      this.state.selectedIndexs === 0
        ? favoriteSongs
        : listenSongs;
    if (list.length === 0) {
      return;
    }
    this.props.setSongs(list);
    this.props.changeCurrentSong(list[0]);
    this.props.showMusicPlayer(true);
  };

  render() {
    // console.log("===========", this.props, this.props.favoriteHistory,this.props.playHistory);
    return (
      <CSSTransition in={this.state.show} timeout={300} classNames="translate">
        <div className="user-center">
          <div className="back" onClick={() => this.props.history.goBack()}>
            <Icon type="left" />
          </div>
          <div className="switch-wrapper">
            <SegmentedControl
              values={["我喜欢的", "最近听到"]}
              tintColor={"#31c27c"}
              style={{ height: "30px", width: "250px", margin: "0 auto" }}
              onChange={this.selectList}
              onValueChange={this.onValueChange}
              selectedIndex={this.state.selectedIndexs}
            />
          </div>
          <div className="play-btn" onClick={this.randomPlay}>
            <Icon type="play-circle-o" className="icon-play" />
            <span className="text">随机播放全部</span>
          </div>
          <div className="list-wrapper" ref="listwrapper">
            <div
              className="user-l"
              style={{
                display: this.state.selectedIndexs === 0 ? "block" : "none"
              }}
            >
              <Scroll className="scroll-favo" ref="scrollFavorite">
                <div className="favorite-list">
                  <SongItem
                    list={this.props.favoriteHistory}
                    setSongs={this.props.setSongs}
                    showMusicPlayer={this.props.showMusicPlayer}
                    changeCurrentSong={this.props.changeCurrentSong}
                    playSongs={this.props.playSongs}
                    currentSong={this.props.currentSong}
                  />
                </div>
              </Scroll>
            </div>
            <Scroll
              className="scroll-view"
              ref="scrollPlay"
              style={{
                display: this.state.selectedIndexs === 1 ? "block" : "none"
              }}
            >
              <div className="play-list">
                <SongItem
                  list={this.props.playHistory}
                  setSongs={this.props.setSongs}
                  showMusicPlayer={this.props.showMusicPlayer}
                  changeCurrentSong={this.props.changeCurrentSong}
                  playSongs={this.props.playSongs}
                  currentSong={this.props.currentSong}
                />
              </div>
            </Scroll>
          </div>
          {/* 用户中心 */}
        </div>
      </CSSTransition>
    );
  }
}

export default withRouter(UserCenter);