import React, { Component } from "react";
import { Link,withRouter,Route } from "react-router-dom";
import LazyLoad, { forceCheck } from "react-lazyload";
import Scroll from "../../../utils/scroll";
import  "./ListView.less";
import SingerDetail from "../../SingerList/SingerDetail";
import Singer from "../../../reduxs/containers/singer";


class ListView extends Component {
    constructor(props) {
      super(props);
      this.state = {
        // singerList: [],
        refreshScroll: false,
        currentIndex: 0,
        scrollY: -1,
        diff: -1
      };
    };

   /**
   * @author xieww
   * @description 跳转到歌手详情页面
   * @param {*} urlId
   */
  toSingerDetail(urlId) {
    return () => {
      this.props.history.push({
        pathname:urlId
      });
    };
  };
    render() {
        let {match} = this.props;
        let singerItems = "";
        // console.log('跳转歌手链接：',this.props.history);
        singerItems = this.props.list.map((item,index) => {
            return (
                <li className="singer-li" key={index}>
                    <h2 className="list-group-title" ref="singer-group-title">{item.title}</h2>
                    <ul className="singer-item-ul">
                        {
                            item.items.map((singers,indexs) => {
                                return (
                                    <li className="singer-item-li" key={singers.id} 
                                        onClick={this.toSingerDetail(`${match.url + '/' + singers.mId}`)}>
                                        <LazyLoad height={50}>
                                            <img className="singer-avatar" src={singers.avatar} alt=""
                                            onError={(e) => { e.currentTarget.src = require("../../../images/music.png");}}/>
                                        </LazyLoad>
                                        <span className="singer-name">{singers.name}</span>
                                    </li>
                                )
                            })
                        }
                    </ul>
                </li>
            )
        });
        let rightIndexItem = "";
        rightIndexItem = this.props.list.map((item,index) => {
            return (
                <li className={index === this.state.currentIndex ? "selected" : ""} key={index}>
                    {item.title.substr(0, 1)}
                </li>
            )
        })
        return (
            <div className="singer-item">
                <Scroll refresh={this.state.refreshScroll} onScroll={() => {forceCheck();}} ref="singerScroll" className="singer-scroll">
                    <ul className="singer-ul">
                        {singerItems}
                    </ul>
                    <div className="list-right-index" >
                        <ul className="list-right-ul">
                            {rightIndexItem}
                        </ul>
                    </div>
                    {/* <div className="list-fixed" ref="fixed">
                        <div className="fixed-title">{}</div>
                    </div> */}
                   
                </Scroll>
                <Route path={`${match.url + '/:id'}`} component={Singer} />
            </div>
        )
    }
}

export default withRouter(ListView);