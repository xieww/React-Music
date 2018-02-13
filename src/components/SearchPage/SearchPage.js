import React, { Component } from "react";
import ReactDOM from "react-dom";
import { SearchBar, Tag, PullToRefresh ,NoticeBar , Result, Toast, Modal} from 'antd-mobile';
import { Icon} from 'antd';
import "./SearchPage.less";
import Scroll from "../../utils/scroll";
import { getHotKey, search } from "../../Api/search";
import { CODE_SUCCESS } from "../../Api/config";
import { getSongVKey } from "../../Api/song";
import * as SongModel from "../../model/song";
import * as SingerModel from "../../model/singer";
import * as AlbumModel from "../../model/album";
import { getLyric } from "../../Api/song";
import SearchResultList from "../common/SearchResultList/SearchResultList";
import SearchHistory from "../common/SearchHistory/SearchHistory";

// const TYPE_SINGER = 'singer';
const perpage = 20;
// 0表示歌曲 2表示歌手 3表示专辑
let TYPE_SINGER = ['song','singer','album'];
const alert = Modal.alert;

class SearchPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      refreshScroll: true,
      isData: false,
      loadings: true,
      hotkeylist: [],
      keyword: '',
      searchResult: [],
      singer: {},
			album: {},
      hasMore: true,
      page: 1,
      height: document.documentElement.clientHeight,
      refreshing: false,
      down:true,
      isShow: false,
      noResult: true,
    };
  };

  /**
   * @author xieww
   * @description 获取热门搜索词
   */
  getHotkeyData() {
    getHotKey().then(res => {
      if (res) {
        if (res.code === CODE_SUCCESS) {
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
      searchResult: [],
      singer: [],
			album: [],
    });
    
    search(text,this.state.page,true,perpage).then((res) => {
      // console.log('搜索结果',res);
      if (res) {
        if (res.code === CODE_SUCCESS) {
          // let result = this.processResult(res.data);
          // let singer = [];
          // let album = [];
          // let songList = [];
          // if (result) {
          //   if (result[0].type && result[0].type === TYPE_SINGER[1]) {
          //     singer = result[0];
          //     songList = result.splice(1);
          //   }else if(result[0].type && result[0].type === TYPE_SINGER[2]){
          //     album = result[0];
          //     songList = result.splice(1);
          //   }else {
          //     songList = result;
          //   }
          // };
          this.getLyricData('001PEDwK3D53Qj');
          let tempTypes = res.data.zhida;
          let singer = {};
          let album = {};
          let temp = [];
          let songList = this.normalizeSongs(res.data.song.list);
          if (songList.length === 0) {
            this.setState({
              noResult: false,
            });
          }else {
            this.setState({
              noResult: true,
            });
          };

          // console.log('处理结果',songList);
          if (tempTypes && tempTypes.type === 2) {
            singer = SingerModel.createSingerBySearch(tempTypes);
            singer.songnum = tempTypes.songnum;
            singer.albumnum = tempTypes.albumnum;
            singer.type = TYPE_SINGER[1];
          }else if (tempTypes && tempTypes.type === 3) {
            album = AlbumModel.createAlbumBySearch(tempTypes);
            album.type = TYPE_SINGER[2];
          }else {
            temp.push({
              ...tempTypes, 
              ...{type: TYPE_SINGER[0]},
            })
          }
          this.setState({
                searchResult: songList,
                singer: singer,
                album: album
          }, () =>{
            this.refs.scroll.refresh();
          });
        }
      }
    })
  };

  /**
   * @author xieww 
   * @description 处理搜索结果
   * @param {*} data 
   */
  processResult(data) {
    let ret = [];
    
    //type为2时是歌手
    if (data.zhida && data.zhida.type === 2) {
      ret.push({
        ...data.zhida, 
        ...{type: TYPE_SINGER[1]},
        ...{img:`http://y.gtimg.cn/music/photo_new/T001R68x68M000${data.zhida.singermid}.jpg?max_age=2592000`}
      });
    }else if (data.zhida && data.zhida.type === 3) {     //type为3时是专辑
      ret.push({
        ...data.zhida, 
        ...{type: TYPE_SINGER[2]},
        ...{img: `http://y.gtimg.cn/music/photo_new/T002R68x68M000${data.zhida.albummid}.jpg?max_age=2592000`}
      });
    }else {    //type为0时是歌曲
      ret;
    }
    if (data.song) {
      ret = ret.concat(this.normalizeSongs(data.song.list))
    }
    return ret
  };

  /**
   * @author xieww
   * @param {*} list 
   */
  normalizeSongs = (list) => {
    let songs = [];
    list.forEach((item) => {
      if (item.songid && item.albummid) {
        let song = SongModel.createSong(item);
        //获取歌曲vkey
        if (item.songmid === "001qjdRZ4ZswWO") {
          let mid = "101qjdRZ4ZswWO"
          this.getSongUrl(song, mid);
        } else {
            this.getSongUrl(song, item.songmid);
        };   
        songs.push(song);
      }
    });
    return songs;
  };

  /**
   * @author xieww
   * @description 加载更多
   * @param {*} data 
   */
  loadMore = (data) =>{
    let tempList = data.song;
    if (!tempList.list.length || (tempList.curnum + tempList.curpage * perpage) > tempList.totalnum) {
      this.setState({
        hasMore: false,
      });
    }
  };

  searchMoreData = () =>{
    if (!this.state.hasMore) {
      return;
    }
    let tempPage = this.state.page;
    let pages = tempPage+=1;
    this.setState({
      page: pages,
    });
    
    search(this.state.keyword,pages,true,perpage).then((res) =>{
      if (res) {
        if (res.code === CODE_SUCCESS) {
          let moreSongList = this.normalizeSongs(res.data.song.list);
          let tempSong = this.state.searchResult.concat(moreSongList);
          this.setState({
            searchResult: tempSong,
            isShow: true
          }, () =>{
            this.refs.scroll.refresh();
          });

          this.closeTimer = setTimeout(() => {
            this.setState({ 
              isShow: false
            });
          }, 2000);
        }
      }
    })
  }

  /**
   * @author xieww
   * @description 获取歌曲地址
   * @param {*} song 
   * @param {*} mId 
   */
  getSongUrl(song, mId) {
    getSongVKey(mId).then((res) => {
      if (res) {
        if(res.code === CODE_SUCCESS) {
          if(res.data.items) {
            let item = res.data.items[0];
            song.url =  `http://dl.stream.qqmusic.qq.com/${item.filename}?vkey=${item.vkey}&guid=3655047200&fromtag=66`
          }
        }
      }
    });
  };
  
  /**
   * @author xieww
   * @description 获取输入框的值
   * @param {*} value 
   */
  onChange = (value) => {
      this.setState({
        keyword: value,
      });
      this.getSearchData(value);
  };

  clear = () => {
    this.setState({ 
      keyword: '' ,
      noResult: true
    });
  };

  /**
   * @author xieww
   * @description 清空搜索历史
   */
  clearSearchHistory = () => alert('清空', '确定清空搜索历史吗？', [
    { text: '取消', onPress: () => console.log() },
    { text: '确定', onPress: () => {
        if (this.props.searchHistory !==0) {
            this.props.clearSearch("1");
        };
        Toast.success('操作成功 !!!', 1);
    }},
]);

  /**
   * @author xieww
   * @description 根据搜索历史进行搜索
   * @param {*} value 
   */
  selectSearchHistory = (value) => {
      this.getSearchData(value);
      this.setState({
        keyword: value
      });
  };

  getLyricData(id) {
    getLyric(id).then((res) => {
      // console.log('-----歌词-------',res);
    })
  }
  componentDidMount() {
    this.getHotkeyData();
    // const hei = this.state.height - ReactDOM.findDOMNode(this.ptr).offsetTop;
    // console.log('高度',this.state.height,hei);
    // this.setState({
    //   height: hei,
    // });
    this.getLyricData('001PEDwK3D53Qj');
  };

  render() {
    // console.log("--------------",this.props);
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
          <NoticeBar  icon={<Icon type="check-circle-o" size="xxs" />} style={{display:this.state.isShow ? "flex" : "none"}}>
            已更新20条数据
          </NoticeBar>
          <div className="search-box">
            <SearchBar 
              placeholder="搜索歌曲、歌单、专辑" 
              ref={ref => this.autoFocusInst = ref} 
              className="search-bar"
              value= {this.state.keyword}
              onChange={this.onChange}
              onClear={this.clear}
              onSubmit={() => {
                this.getSearchData;
                this.props.saveSearch(this.state.keyword);
                }}
            />
          </div>
          <div className="search-m">
            <Scroll ref="scroll">
              <div>
                <div className="search-center" style={{display: this.state.keyword ? "none" : "block"}}>
                    <div className="hot_search">
                        <h3 className="hot_title">热门搜索</h3>
                        <div className="result_list">
                            {hotkeyItem}
                        </div>
                    </div>
                </div>
                <div className="search-history" style={{display: this.state.keyword ? "none" : "block"}}>
                    <h1 className="title">
                      <span className="text">搜索历史</span>
                      <Icon type="delete" className="delete-icon" onClick={this.clearSearchHistory}/>
                    </h1>
                    <SearchHistory
                      list={this.props.searchHistory}
                      deleteSearch={this.props.deleteSearch}
                      selectItem={this.selectSearchHistory}
                    />
                </div>
              </div>
            </Scroll>
          </div>
          <div className="results" style={{display: this.state.keyword ? "block" : "none"}}>
            <Scroll ref="scroll">
              <div>
                <PullToRefresh
                  ref={el => this.ptr = el}
                  style={{
                    height: 'auto',
                    overflow: 'auto',
                  }}
                  onRefresh={this.searchMoreData}
                  direction={this.state.down ? 'down' : 'up'}
                >
                  <SearchResultList 
                    list={this.state.searchResult}
                    singer={this.state.singer}
                    album={this.state.album}
                    setSongs={this.props.setSongs}
                    showMusicPlayer={this.props.showMusicPlayer}
                    changeCurrentSong={this.props.changeCurrentSong}
                    playSongs={this.props.playSongs}
                    currentSong={this.props.currentSong}
                    />
                </PullToRefresh>
              </div>
            </Scroll>
          </div>
      </div>
    );
  }
}

export default SearchPage;
