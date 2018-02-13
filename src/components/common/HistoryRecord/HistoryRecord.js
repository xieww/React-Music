import React, { Component } from "react";
import ReactDOM from "react-dom";
import { CSSTransition } from "react-transition-group"
import { Toast,Icon,SearchBar,SegmentedControl, PullToRefresh ,NoticeBar , Modal} from 'antd-mobile';
import SongItem from "../SongItem/SongItem";
import Scroll from "../../../utils/scroll";
import SearchHistory from "../SearchHistory/SearchHistory";
import "./HistoryRecord.less";
import { CODE_SUCCESS } from "../../../Api/config";
import { search } from "../../../Api/search";
import { getSongVKey } from "../../../Api/song";
import * as SongModel from "../../../model/song";
import * as AlbumModel from "../../../model/album";
import * as SingerModel from "../../../model/singer";
import SearchResultList from "../SearchResultList/SearchResultList";

const perpage = 20;
// 0表示歌曲 2表示歌手 3表示专辑
let TYPE_SINGER = ['song','singer','album'];
const alert = Modal.alert;

class HistoryRecord extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedIndexs: 0,
      show: false,
      isShowPage: false,
      keyword: "",
      searchResult: [],
      singer: {},
      album: {},
      hasMore: true,
      page: 1
    };
  }

  /**
   * @author xieww
   * @description 选择历史记录
   * @param {*} e
   */
  selectList = e => {
    // console.log(`selectedIndex:${e.nativeEvent.selectedSegmentIndex}`);
    this.setState({
      selectedIndexs: e.nativeEvent.selectedSegmentIndex
    });
  };

  /**
   * @author xieww
   * @param {*} value
   */
  onValueChange = value => {
    // console.log("===========", value);
  };

  /**
   * @author xieww
   * @description 关闭增加歌曲页面
   * @param {*} v
   */
  closeHistoryPage = () => {
    this.props.isShowAddPage(false);
    this.setState({
      isShowPage: false
    });
  };

  /**
   * @author xieww
   * @description 搜索
   * @param {*} text
   */
  getSearchData = text => {
    this.setState({
      keyword: text,
      searchResult: [],
      singer: [],
      album: []
    });
    search(text, this.state.page, false, perpage).then(res => {
      // console.log('搜索结果',res);
      if (res) {
        if (res.code === CODE_SUCCESS) {
          let tempTypes = res.data.zhida;
          let singer = {};
          let album = {};
          let temp = [];
          let songList = this.normalizeSongs(res.data.song.list);
          if (songList.length === 0) {
            this.setState({
              noResult: false
            });
          } else {
            this.setState({
              noResult: true
            });
          }
          // console.log('处理结果',songList);
          if (tempTypes && tempTypes.type === 2) {
            singer = SingerModel.createSingerBySearch(tempTypes);
            singer.songnum = tempTypes.songnum;
            singer.albumnum = tempTypes.albumnum;
            singer.type = TYPE_SINGER[1];
          } else if (tempTypes && tempTypes.type === 3) {
            album = AlbumModel.createAlbumBySearch(tempTypes);
            album.type = TYPE_SINGER[2];
          } else {
            temp.push({
              ...tempTypes,
              ...{ type: TYPE_SINGER[0] }
            });
          }
          this.setState(
            {
              searchResult: songList,
              singer: singer,
              album: album
            },
            () => {
              this.refs.scroll.refresh();
            }
          );
        }
      }
    });
  };

  /**
   * @author xieww
   * @param {*} list
   */
  normalizeSongs = list => {
    let songs = [];
    list.forEach(item => {
      if (item.songid && item.albummid) {
        let song = SongModel.createSong(item);
        //获取歌曲vkey
        if (item.songmid === "001qjdRZ4ZswWO") {
          let mid = "101qjdRZ4ZswWO";
          this.getSongUrl(song, mid);
        } else {
          this.getSongUrl(song, item.songmid);
        }
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
  //   loadMore = data => {
  //     let tempList = data.song;
  //     if (
  //       !tempList.list.length ||
  //       tempList.curnum + tempList.curpage * perpage > tempList.totalnum
  //     ) {
  //       this.setState({
  //         hasMore: false
  //       });
  //     }
  //   };

  /**
   * @author xieww
   * @description 加载更多
   * @param {*} data
   */
  searchMoreData = () => {
    if (!this.state.hasMore) {
      return;
    }
    let tempPage = this.state.page;
    let pages = (tempPage += 1);
    this.setState({
      page: pages
    });
    search(this.state.keyword, pages, false, perpage).then(res => {
      if (res) {
        if (res.code === CODE_SUCCESS) {
          let moreSongList = this.normalizeSongs(res.data.song.list);
          let tempSong = this.state.searchResult.concat(moreSongList);
          this.setState(
            {
              searchResult: tempSong
            },
            () => {
              this.refs.scroll.refresh();
            }
          );
        }
      }
    });
  };

  /**
   * @author xieww
   * @description 获取歌曲地址
   * @param {*} song
   * @param {*} mId
   */
  getSongUrl(song, mId) {
    getSongVKey(mId).then(res => {
      if (res) {
        if (res.code === CODE_SUCCESS) {
          if (res.data.items) {
            let item = res.data.items[0];
            song.url = `http://dl.stream.qqmusic.qq.com/${item.filename}?vkey=${
              item.vkey
            }&guid=3655047200&fromtag=66`;
          }
        }
      }
    });
  }

  /**
   * @author xieww
   * @description 获取输入框的值
   * @param {*} value
   */
  onChange = value => {
    this.setState({
      keyword: value
    });
    this.getSearchData(value);
  };

  clear = () => {
    this.setState({
      keyword: "",
      noResult: true
    });
  };

  /**
   * @author xieww
   * @description 根据搜索历史进行搜索
   * @param {*} value
   */
  selectSearchHistory = value => {
    this.getSearchData(value);
    this.setState({
      keyword: value
    });
  };

  componentDidMount() {
    this.setState({
      show: true
    });
    this.historyPageDOM = ReactDOM.findDOMNode(this.refs.historyPage);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      isShowPage: nextProps.isShow
    });
  }

  shouldComponentUpdate() {
    return true;
  }

  render() {
    // console.log("历史记录", this.props);

    let isShowHistoryPage =
      this.props.isShow === true ? "history-record" : "history-record hidden";
    let isShowPageStyle =
      this.state.isShowPage === true ? {} : { display: "none" };
    return <div className="history-record">
        <CSSTransition in={this.state.show} classNames="his" timeout={300} onEnter={() => {
            {
              /* this.historyPageDOM.style.display = "block";               */
            }
          }} onEntered={() => {
            {
              /* this.refs.scrollPlay.refresh(); */
            }
          }} onExited={() => {
            this.historyPageDOM.style.display = "none";
          }} name="historys">
          <div ref="historyPage" className="history-page" style={isShowPageStyle}>
            <div className="history-header">
              <div className="close">
                <Icon type={"left"} size={"lg"} className="icon-back" onClick={this.closeHistoryPage} />
              </div>
              <h1 className="title">添加歌曲到列表</h1>
            </div>
            <div className="search-box">
              <SearchBar placeholder="搜索歌曲、歌单、专辑" value={this.state.keyword} onChange={this.onChange} onClear={this.clear} onSubmit={() => {
                  this.getSearchData;
                  this.props.saveSearch(this.state.keyword);
                }} />
            </div>
            <div className="history-body" style={{display: this.state.keyword ? "none" : "block"}}>
              <SegmentedControl values={["最近播放", "搜索历史"]} tintColor={"#31c27c"} style={{ height: "30px", width: "250px", margin: "0 auto" }} onChange={this.selectList} onValueChange={this.onValueChange} />
              <div className="list-select">
                <div style={{ display: this.state.selectedIndexs === 0 ? "block" : "none" }} className="search-l">
                  <Scroll className="list-scroll" ref="scrollPlay" refresh={this.state.isShowPage}>
                    <div className="play-history">
                      <SongItem list={this.props.playHistory} setSongs={this.props.setSongs} showMusicPlayer={this.props.showMusicPlayer} changeCurrentSong={this.props.changeCurrentSong} playSongs={this.props.playSongs} currentSong={this.props.currentSong} />
                    </div>
                  </Scroll>
                </div>
                <Scroll className="scroll-view" style={{ display: this.state.selectedIndexs === 1 ? "block" : "none" }} ref="scrollSearch" refresh={this.state.isShowPage}>
                  <div className="search-history">
                    <SearchHistory list={this.props.searchHistory} deleteSearch={this.props.deleteSearch} selectItem={this.selectSearchHistory} />
                  </div>
                </Scroll>
              </div>
            </div>
            <div className="results" style={{ display: this.state.keyword ? "block" : "none" }}>
              <Scroll ref="scroll">
                <div>
                  <PullToRefresh ref={el => (this.ptr = el)} style={{ height: "auto", overflow: "auto" }} onRefresh={this.searchMoreData} direction={this.state.down ? "down" : "up"}>
                    <SearchResultList list={this.state.searchResult} singer={this.state.singer} album={this.state.album} setSongs={this.props.setSongs} showMusicPlayer={this.props.showMusicPlayer} changeCurrentSong={this.props.changeCurrentSong} playSongs={this.props.playSongs} currentSong={this.props.currentSong} />
                  </PullToRefresh>
                </div>
              </Scroll>
            </div>
          </div>
        </CSSTransition>
      </div>;
  }
}

export default HistoryRecord;