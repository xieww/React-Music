import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "./RankingList.less";

class RankingList extends Component {
  render() {
    return (
      <Router>
        <div className="topic_list">
          <ul className="topic_ul">
            <li className="topic_li">
              <div className="topic_main">
                <Link className="topic_items" to="" query={{ id: 4 }}>
                  <img
                    alt=""
                    src="https://y.gtimg.cn/music/common/upload/iphone_order_channel/toplist_4_300_212606735.jpg?max_age=2592000"
                  />
                  <span className="listen_count">
                    <i className="icon_listen" />
                    1910.0万
                  </span>
                </Link>
                <div className="topic_listinfo">
                  <div className="info_item">
                    <h3 className="info_title">安利XS·巅峰榜·流行指数</h3>
                    <p>
                      1<span className="info_name">体面</span>- 于文文
                    </p>
                    <p>
                      2<span className="info_name">说散就散</span>- 袁娅维
                    </p>
                    <p>
                      3<span className="info_name">FAST</span>-
                      张杰/LOKEY低调组合
                    </p>
                  </div>
                  <i className="info_arrow" />
                </div>
              </div>
            </li>
            <li className="topic_li">
              <div className="topic_main">
                <Link className="topic_items" to="" query={{ id: 4 }}>
                  <img
                    alt=""
                    src="https://y.gtimg.cn/music/common/upload/iphone_order_channel/toplist_26_300_212606735.jpg?max_age=2592000"
                  />
                  <span className="listen_count">
                    <i className="icon_listen" />
                    1910.0万
                  </span>
                </Link>
                <div className="topic_listinfo">
                  <div className="info_item">
                    <h3 className="info_title">巅峰榜·热歌</h3>
                    <p>
                      1<span className="info_name">体面</span>- 于文文
                    </p>
                    <p>
                      2<span className="info_name">想你</span>- 吴亦凡/赵丽颖
                    </p>
                    <p>
                      3<span className="info_name">说散就散</span>- 袁娅维
                    </p>
                  </div>
                  <i className="info_arrow" />
                </div>
              </div>
            </li>
          </ul>
        </div>
      </Router>
    );
  }
}

export default RankingList;
