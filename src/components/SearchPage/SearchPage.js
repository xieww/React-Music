import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { 
        SearchBar ,    
        Panel,
        PanelHeader,
        PanelBody,
        PanelFooter,
        MediaBox,
        MediaBoxHeader,
        MediaBoxBody,
        MediaBoxTitle,
        MediaBoxDescription,
        Cell,
        CellBody,
        CellFooter} from "react-weui";
//import styles
import "weui";
import "react-weui/build/packages/react-weui.css";
import './SearchPage.less'

const appMsgIcon = (<img src="https://y.gtimg.cn/music/photo_new/T002R68x68M000000y5gq7449K9I.jpg?max_age=2592000" />);
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
        <Panel style={{display: this.state.searchText ? null: 'none', marginTop: 0}}>
                    <PanelHeader>
                        Female Name Search
                    </PanelHeader>
                    <PanelBody>
                        {
                            this.state.results.length > 0 ?
                                this.state.results.map((item,i)=>{
                                    return (
                                        <MediaBox key={i} type="appmsg" href="javascript:void(0);">
                                            <MediaBoxHeader>{appMsgIcon}</MediaBoxHeader>
                                            <MediaBoxBody>
                                                <MediaBoxTitle>{item}</MediaBoxTitle>
                                                <MediaBoxDescription>
                                                    You may like this name.
                                                </MediaBoxDescription>
                                            </MediaBoxBody>
                                        </MediaBox>
                                    )
                                })
                                : <MediaBox>Can't find any！</MediaBox>
                        }
                    </PanelBody>
        </Panel>
      </div>
    );
  }
}

export default SearchPage;
