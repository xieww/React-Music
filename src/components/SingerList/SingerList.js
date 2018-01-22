import React, { Component } from "react";
import { Link,withRouter,Route } from "react-router-dom";
import "./SingerList.less";

class SingerList extends Component {
    constructor(props) {
      super(props);
      this.state = {
        // discList: []
        refreshScroll: false,
      };
    };

    render() {
        return(
            <div className="singerList">
                歌手页面
            </div>
        );
    }
}

export default SingerList;