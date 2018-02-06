import React, { Component } from "react";
import { Link } from "react-router-dom";
import { SearchBar, Tag} from 'antd-mobile';
import "./SearchPage.less";
import Scroll from "../../utils/scroll";
import { getHotKey, search } from "../../Api/search";
import { CODE_SUCCESS } from "../../Api/config";

class SearchPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      refreshScroll: true,
      isData: false,
      loadings: true,
      hotkeylist: [],
      keyword: '',
    };
  };

  /**
   * @author xieww
   * @description 获取热门搜索词
   */
  getHotkeyData() {
    getHotKey().then(res => {
      if (res) {
        if (res.code ===CODE_SUCCESS) {
          this.setState({
            hotkeylist: res.data.hotkey.slice(0,10),
          })
        }
      }
    })
  };

  /**
   * @author xieww
   * @description 点击关键词搜索
   * @param {*} text 
   */
  tagSearch = (text) => {
    console.log('text',text);
    return () => {
      this.getSearchData(text);
    }
  };

  /**
   * @author xieww
   * @description 搜索
   * @param {*} text 
   */
  getSearchData = (text) => {
    this.setState({
      keyword: text,
    });
    search(text).then((res) => {
      console.log('搜索结果',res);
    })
  }

  componentDidMount() {
    this.getHotkeyData();
  };

  render() {
    let hotkeyItem = "";
    hotkeyItem = this.state.hotkeylist.map((item,index) =>{
      return (
        <div key={index} onClick={this.tagSearch(item.k)}>
          <Tag className="tags">{item.k}</Tag>
        </div>
      )
    });

    return (
      <div className="search_main">
        <Scroll refresh={this.state.refreshScroll} className="scroll-box">
          <div className="search-box">
            <SearchBar 
              placeholder="搜索歌曲、歌单、专辑" 
              ref={ref => this.autoFocusInst = ref} 
              className="search-bar"
              value= {this.state.keyword}
            />
          </div>
          <div className="search-center">
              <div className="hot_search">
                  <h3 className="hot_title">热门搜索</h3>
                  <div className="result_list">
                      {hotkeyItem}
                  </div>
              </div>
          </div>
        </Scroll> 
      </div>
    );
  }
}

export default SearchPage;
