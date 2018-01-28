import React, { Component } from "react";
import "./Recommend.less";
import { getCarouseList, getDiscList, getNewAlbum } from "../../Api/recommend";
import { CODE_SUCCESS } from "../../Api/config";
import Scroll from "../../utils/scroll";
import { Carousel} from "antd-mobile";
import { Button, Icon } from 'antd';
import 'antd/dist/antd.css'; 
import { withRouter,Route } from "react-router-dom";
import DiscList from '../DiscList/DiscList';
import MyLoading from "../common/Loading/Loading";
import LazyLoad, { forceCheck } from "react-lazyload";
import * as AlbumModel from "../../model/album";
import AlbumList from "../Album/AlbumList";
import DiscListDetail from "../DiscList/DiscListDetail";
import AlbumDetail from "../Album/AlbumDetail";

class Recommend extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sliderList: [],
      discList: [],
      discListMore: [],
      AlbumsLIst: [],
      refreshScroll: false,
      mgHeight: 150,
      isData: false,
      loadings: true,
    };
  }

  /**
   * @author xieww
   * @description 获取推荐页轮播图等信息
   */
  getCarouseData() {
    getCarouseList().then(res => {
      if (res) {
        if (res.code === CODE_SUCCESS) {
          this.setState({
            sliderList: res.data.slider
          });
        }
      }
    });
  };
  /**
   * @author xieww
   * @description
   */
  getDiscData() {
    getDiscList().then(res => {
      // console.log(res);
      if (res) {
        if (res.code === CODE_SUCCESS) {
          // console.log(res.data.list);
          this.setState(
            {
              discListMore: res.data.list,
              discList: res.data.list.slice(0,6),
              isData: true,
              loadings: false,
            },
            () => {
              //刷新scroll
              this.setState({ refreshScroll: true });
            }
          );
        }
      }
    });
  };

  /**
   * @author xieww
   * @description 获取最新专辑信息
   */
  getNewAlbumData() {
    getNewAlbum().then(res => {
      if (res) {
        if (res.code === CODE_SUCCESS) {
          let albumList = res.albumlib.data.list;
          this.setState({
            loadings: false,
            isData: true,
            AlbumsLIst: albumList.slice(0,6),
          }, () => {
            //刷新scroll
            this.setState({refreshScroll:true});
          });
        }
      }
    })
  }
    
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
  componentDidMount() {
    //获取首页轮播图信息
    this.getCarouseData();
    //获取最新歌单信息
    this.getDiscData();
    //获取最新专辑信息
    this.getNewAlbumData();
  }

  render() {
    //热门歌单
    let discsList = "";
    let {match} = this.props;
    // console.log('跳转歌单链接：',this.props.history);
    discsList = this.state.discList.map((item, index) => {
      return (
        <li className="row-li" key={index} onClick={this.toMusicList(`${match.url +  '/disclist' +'/' + item.dissid}`)}>
          <div className="music-img">
                <LazyLoad height={100}>
                  <img src={item.imgurl} alt="" onError={(e) => { e.currentTarget.src = require("../../images/music.png");}}/>
                </LazyLoad>
          </div>
          <div className="text">
            <h2 className="title-name">{item.creator.name}</h2>
            <p className="music-info">{item.dissname}</p>
          </div>
        </li>
      );
    });

    //热门专辑
    let AlbumsItem = "";
    AlbumsItem = this.state.AlbumsLIst.map((item,index) => {
      let album = AlbumModel.createAlbumByList(item);
      return (
          <li className="row-li" key={album.mId} onClick={this.toMusicList(`${match.url + '/' + album.mId}`)}>
            <div className="music-img">
                <LazyLoad height={100}>
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
    <div className="recom_tab">
      <Scroll refresh={this.state.refreshScroll} 
        onScroll={(e) => {
					/*检查懒加载组件是否出现在视图中，如果出现就加载组件*/
					forceCheck();}}>
        <div>
          <div className="lunbo">
              <Carousel autoplay={true} infinite dotActiveStyle={{ background: "#31c27c" }}>
              {this.state.sliderList.map((item, index) => {
                return <a className="imgList" style={{ display: "inline-block", width: "100%", height: this.state.imgHeight }} href={item.linkUrl} key={index}>
                    <img className="imgs" alt="" src={item.picUrl} onLoad={() => {
                        window.dispatchEvent(new Event("resize"));
                        this.setState({ imgHeight: "auto" });
                      }} />
                  </a>;
              })}
              </Carousel>
          </div>
          <div className="hotlist" id="songs" style={this.state.isData === true ? {} : {display:"none"}}>
            <h1 className="list-title">
              热门歌单推荐
            </h1>
            <Icon type="right-circle-o" className="icon-more"
            onClick={this.toMusicList(`${match.url + '/disclist'}`)}/>
            <ul>{discsList}</ul>   
          </div>
          <div className="hotlist" id="albums" style={this.state.isData === true ? {} : {display:"none"}}>
            <h1 className="list-title">
              热门专辑推荐
            </h1>
            <Icon type="right-circle-o" className="icon-more"
            onClick={this.toMusicList(`${match.url + '/albumlist'}`)}/>
            <ul className="album-ul">{AlbumsItem}</ul>   
          </div>  
        </div>
        <Route path={`${match.url + '/disclist'}`} component={DiscList} />
        <Route path={`${match.url + '/disclist' + '/:id'}`} component={DiscListDetail} />
        <Route path={`${match.url + '/albumlist'}`} component={AlbumList} />
        <Route path={`${match.url + '/:id'}`} component={AlbumDetail} />
      </Scroll>
      <MyLoading isloading={this.state.loadings}/>
    </div>
      )
  }
}

export default withRouter(Recommend);