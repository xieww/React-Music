import React, { Component } from "react";

import { SearchBar } from "react-weui";
//import styles
import "weui";
import "react-weui/build/packages/react-weui.css";

class SearchPage extends Component {
  state = {
    searchText: "a",
    results: []
  };

  handleChange(text, e) {
    let keywords = [text];
    let results = SampleData.filter(
      /./.test.bind(new RegExp(keywords.join("|"), "i"))
    );

    if (results.length > 3) results = results.slice(0, 3);
    this.setState({
      results,
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
      </div>
    );
  }
}

export default SearchPage;
