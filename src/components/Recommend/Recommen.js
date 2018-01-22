import React, { Component } from "react";
import "./Recommend.less";
import { getCarouseList, getDiscList } from "../../Api/recommend";
import { CODE_SUCCESS } from "../../Api/config";
import Scroll from "../../utils/scroll";
import { Carousel} from "antd-mobile";
// import { Button } from 'antd';
import { Button, Icon } from 'antd';
import 'antd/lib/date-picker/style'; 
import { withRouter,Route } from "react-router-dom";
import SongList from '../SongList/SongList';

class Recommend extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sliderList: [],
      discList: [],
      AlbumsLIst: [],
      refreshScroll: false,
      mgHeight: 150,
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
          console.log(res.data.slider);
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
      console.log(res);
      if (res) {
        if (res.code === CODE_SUCCESS) {
          console.log(res.data.list);
          this.setState(
            {
              discList: res.data.list
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
    this.getCarouseData();
    this.getDiscData();
  }

  render() {
    let rowList = "";
    let {match} = this.props;
    console.log('跳转歌单链接：',this.props.history);
    rowList = this.state.discList.map((item, index) => {
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
    <div className="recom_tab">
      <Scroll refresh={this.state.refreshScroll}>
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
          <div className="hotlist">
            <h1 className="list-title">
              热门歌单推荐
              {/* <Button shape="circle" icon="right-circle-o" /> */}
              {/* <Button size="small" ghost> */}
              
              {/* </Button> */}
            </h1>
            <Icon type="right-circle-o" style={{float:"right",position:"relative",top:"-29px",right:"6px",fontSize:"16px" }}
            onClick={this.toMusicList(`${match.url + '/' + 12345}`)}/>
            <ul>{rowList}</ul>   
          </div> 
        </div>
        <Route path={`${match.url + '/:id'}`} component={SongList} />
      </Scroll>
    </div>
      )
  }
}

export default withRouter(Recommend);