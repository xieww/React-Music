import React, { Component } from "react";
import { getTopList } from "../../Api/rankinglist";
import { CODE_SUCCESS } from "../../Api/config";
import Scroll from "../../utils/scroll";
import { withRouter,Route } from "react-router-dom";
import MyLoading from "../common/Loading/Loading";
import LazyLoad, { forceCheck } from "react-lazyload";
import * as RankingModel from "../../model/rankingList";
import "./RankingList.less";
import RankingListDetail from "./RankingListDetail";

class RankingList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rankingList: [],
      refreshScroll: false,
      isData: false,
      loadings: true,
    };
  }

  /**
   * @author xieww
   * @description 
   */
  getRankingList() {
    getTopList().then(res =>{
      if (res) {
        if (res.code === CODE_SUCCESS) {
          // console.log('排行榜信息',res);
          let topList = [];
					res.data.topList.forEach(item => {
						if (/MV/i.test(item.topTitle)) {
							return;
						}
						topList.push(RankingModel.createRankingByList(item));
					});
					this.setState({
            loadings: false,
            isData: true,
						rankingList: topList
					}, () => {
						//刷新scroll
						this.setState({refreshScroll:true});
					});
        }
      }
    })
  };

  /**
   * @author xieww
   * @description 跳转到歌单页面
   * @param {*} urlId
   */
  toSongListDetail(urlId) {
    return () => {
      this.props.history.push({
        pathname:urlId
      });
    };
  };

  componentDidMount() {
    this.getRankingList();
  }
  
  render() {

    let {match} = this.props;
    let rankFristList = '';
    // console.log('listenCount=',this.state.rankingList);
    rankFristList = this.state.rankingList.map((item,index) => {
      return (
        <li key={item.id} className="rank-li" onClick={this.toSongListDetail(`${match.url + '/' + item.id}`)}>
            <div className="rank-img-div">
              <LazyLoad height={100}>
                <img className="rank-imgs" src={item.img} alt={item.title}/>
              </LazyLoad>
              <span className="counts">
                <i className="icon-listen"></i>
                {item.listenCount}
              </span>
            </div>
            <ul className="song-ul">
                  {
                    item.songs.map((items,indexs) => {
                      return (
                        <li className="song-li" key={indexs}>
                          <span>{indexs + 1}&nbsp;</span>
                          <span>{items.name}-{items.singer}</span>
                        </li>
                      )
                    })
                  }
            </ul>
        </li>
      )
    })

    return (
      <div className="rank-list">
          <Scroll refresh={this.state.refreshScroll} onScroll={(e) => { forceCheck();}} className="rank-scroll">
              <ul className="rank-ul">
                {rankFristList}
              </ul>
              <Route path={`${match.url + '/:id'}`} component={RankingListDetail} />
          </Scroll>
          <MyLoading isloading={this.state.loadings}/>
      </div>
    );
  }
}

export default withRouter(RankingList);
