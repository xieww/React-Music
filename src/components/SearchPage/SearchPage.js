import React, { Component } from "react";
import { Link } from "react-router-dom";
import { SearchBar} from 'antd-mobile';
import "./SearchPage.less";

const appMsgIcon = (
  <img src="https://y.gtimg.cn/music/photo_new/T002R68x68M000000y5gq7449K9I.jpg?max_age=2592000" />
);

class SearchPage extends Component {
  state = {
    searchText: "a",
    results: []
  };

  handleChange(text, e) {
    let keywords = [text];
    // let results = SampleData.filter(
    //   /./.test.bind(new RegExp(keywords.join("|"), "i"))
    // );

    // if (results.length > 3) results = results.slice(0, 3);
    this.setState({
      //   results,
      searchText: text
    });
  }

  render() {
    return (
      <div className="search_main">
        <SearchBar placeholder="搜索歌曲、歌单、专辑" ref={ref => this.autoFocusInst = ref} />

        <div className="hot_search">
          <h3 className="hot_title">热门搜索</h3>
          <div className="result_list">
            <Link className="tags" to="">
              梦想的声音第二季
            </Link>
            <Link className="itemlist" to="">
              DJ舞曲(华语)系列5 DJ
            </Link>
            <Link className="itemlist" to="">
              WHAT ARE WORDS
            </Link>
            <Link className="itemlist" to="">
              中国好声音 第六季
            </Link>
            <Link className="itemlist" to="">
              非酋 薛明媛/朱贺
            </Link>
            <Link className="itemlist" to="">
              一生所爱 卢冠廷
            </Link>
            <Link className="itemlist" to="">
              舍得{" "}
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default SearchPage;
