import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { SearchBar } from "react-weui";
//import styles
import "weui";
import "react-weui/build/packages/react-weui.css";
import './SearchPage.less'

class SearchPage extends Component {
  state = {
    searchText: "",
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
        <SearchBar
          onChange={this.handleChange.bind(this)}
          defaultValue={this.state.searchText}
          placeholder="搜索歌曲、歌单、专辑"
        />
        <Router>
            <div className="hot_search">
                <h3 className="hot_title">热门搜索</h3>
                <div className="result_list">
                    <Link className="tags" to="" query={{ id: 4 }}>梦想的声音第二季</Link>
                    <Link className="itemlist" to="" query={{ id: 4 }}>DJ舞曲(华语)系列5 DJ</Link>
                    <Link className="itemlist" to="" query={{ id: 4 }}>WHAT ARE WORDS</Link>
                    <Link className="itemlist" to="" query={{ id: 4 }}>中国好声音 第六季</Link>
                    <Link className="itemlist" to="" query={{ id: 4 }}>非酋 薛明媛/朱贺</Link>
                    <Link className="itemlist" to="" query={{ id: 4 }}>一生所爱 卢冠廷</Link>
                    <Link className="itemlist" to="" query={{ id: 4 }}>舍得 </Link>
                </div>
            </div>
        </Router>
      </div>
    );
  }
}

export default SearchPage;
