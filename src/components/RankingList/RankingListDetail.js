import React, { Component } from "react";
import { getMusicList } from "../../Api/rankinglist";
import { CODE_SUCCESS } from "../../Api/config";
import Scroll from "../../utils/scroll";
import { withRouter,Route } from "react-router-dom";
import MyLoading from "../common/Loading/Loading";
import "./RankingListDetail.less";

class RankingListDetail extends Component {
    constructor(props) {
      super(props);
      this.state = {
        rankingList: [],
        refreshScroll: false,
        isData: false,
        loadings: true,
      };
    }

    render() {
        console.log('排行榜歌单详情');
        return (
            <div className="ranking-detail">
                排行榜详情页
            </div>
        )
    }
}

export default withRouter(RankingListDetail);