import React, { Component } from "react";
import { Route,withRouter } from "react-router-dom";
import "./AlbumList.less";
import NavHeadBar from "../common/NavHeaderBar/NavHeadBar";
import { CSSTransition } from "react-transition-group";
import { getNewAlbum } from "../../Api/recommend";
import { CODE_SUCCESS } from "../../Api/config";
import Scroll from "../../utils/scroll";
import MyLoading from "../common/Loading/Loading";
import LazyLoad, { forceCheck } from "react-lazyload"
import * as AlbumModel from "../../model/album";
import AlbumDetail from "./AlbumDetail";

class SongList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      headerLitle: "热门专辑",
      AlbumsLIst: [],
      refreshScroll: false,
      loadings: true,
    };
  }

  /**
   * @author xieww
   * @description 获取最新专辑信息
   */
  getNewAlbumData() {
    getNewAlbum().then(res => {
      if (res.code === CODE_SUCCESS) {
        let albumList = res.albumlib.data.list;
        this.setState({
          loadings: false,
          isData: true,
          AlbumsLIst: albumList,
        }, () => {
          //刷新scroll
          this.setState({refreshScroll:true});
        });
      }
    })
  }

  componentDidMount() {
    this.setState({
      show: true,
    });
    this.getNewAlbumData();
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
  };

  render() {

    //热门专辑
    let AlbumsItem = "";
    let {match} = this.props;
    AlbumsItem = this.state.AlbumsLIst.map((item,index) => {
      let album = AlbumModel.createAlbumByList(item);
      return (
          <li className="row-li" key={album.mId} onClick={this.toMusicList(`${match.url + '/' + album.mId}`)}>
            <div className="music-img">
                <LazyLoad height={50}>
                  <img src={album.img} alt={album.name} onError={(e) => { e.currentTarget.src = require("../../images/music.png");}}/>
                </LazyLoad>
            </div>
            <div className="text">
              <h2 className="title-name">{album.name}</h2>
              <p className="music-info">{album.singer}</p>
            </div>
          </li>
      );
    })
    return (
      <CSSTransition in={this.state.show} timeout={300} classNames="translate">
        <div className="song-list">
          <NavHeadBar title = {this.state.headerLitle}/>
          <Scroll refresh={this.state.refreshScroll} 
            onScroll={(e) => {
            /*检查懒加载组件是否出现在视图中，如果出现就加载组件*/
            forceCheck();}}>
          <div className="hot-songs">
              <div className="hotlist" id="songs" style={this.state.isData === true ? {} : {display:"none"}}>
                <ul>{AlbumsItem}</ul>   
              </div>
          </div>
          <Route path={`${match.url  + '/:id'}`} component={AlbumDetail} />
          </Scroll>
          <MyLoading isloading={this.state.loadings}/>
        </div>
      </CSSTransition>
    );
  }
}

export default withRouter(SongList);
