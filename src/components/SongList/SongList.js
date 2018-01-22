import React, { Component } from "react";
import { Link,withRouter } from "react-router-dom";
import "./SongList.less";
import NavHeadBar from "../common/NavHeaderBar/NavHeadBar";
import { CSSTransition } from "react-transition-group";
import { getDiscList } from "../../Api/recommend";
import { CODE_SUCCESS } from "../../Api/config";
import Scroll from "../../utils/scroll";
import MyLoading from "../common/Loading/Loading";
// import { Toast} from 'antd-mobile';

class SongList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      headerLitle: "热门歌单",
      discList: [],
      refreshScroll: false,
      loadings: true,
    };
  }

  /**
   * @author xieww
   * @description
   */
  getDiscData() {
    getDiscList().then(res => {
      console.log(res);
      if (res) {
        if (res.code === CODE_SUCCESS) {
          console.log(res.data.list);
          this.setState(
            {
              discList: res.data.list,
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

  componentDidMount() {
    this.setState({
      show: true,
    });
    this.getDiscData();
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

    //热门歌单
    let discsList = "";
    let {match} = this.props;
    console.log('跳转歌单链接：',this.props.history);
    discsList = this.state.discList.map((item, index) => {
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
      <CSSTransition in={this.state.show} timeout={300} classNames="translate">
        <div className="song-list">
          <NavHeadBar title = {this.state.headerLitle}/>
          <Scroll refresh={this.state.refreshScroll}>
          <div className="hot-songs">
              <div className="hotlist" id="songs" style={this.state.isData === true ? {} : {display:"none"}}>
                <ul>{discsList}</ul>   
              </div>
          </div>
          </Scroll>
          <MyLoading isloading={this.state.loadings}/>
        </div>
      </CSSTransition>
    );
  }
}

export default withRouter(SongList);
