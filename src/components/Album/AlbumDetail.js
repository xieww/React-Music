import React, { Component } from "react";
import { getAlbumInfo } from "../../Api/recommend";
import { getSongVKey } from "../../Api/song";
import { CODE_SUCCESS } from "../../Api/config";
import ReactDOM from "react-dom";
import * as SongModel from "../../model/song";
import { CSSTransition } from "react-transition-group";
import NavHeadBar from "../common/NavHeaderBar/NavHeadBar";
import MyLoading from "../common/Loading/Loading";
import SongItem from "../common/SongItem/SongItem"
import Scroll from "../../utils/scroll";
import { Button } from 'antd';
import * as AlbumModel from "../../model/album";
import "./AlbumDetail.less";

class AlbumDetail extends Component {
    constructor(props) {
      super(props);
      this.state = {
        show: false,
        headerLitle: "",
        discList: [],
        refreshScroll: false,
        loadings: true,
        songLists: [],
        avatar: "",
        album: {},
      };
    }

    /**
     * @author xieww
     * @description 获取专辑详情
     * @param {*} mId 
     */
    getAlbumDetail(mId) {
        getAlbumInfo(mId).then((res) => {
            if (res) {
                if (res.code === CODE_SUCCESS) {
                    // console.log('专辑详情',res);
                    let songList = res.data.list;
                    let album = AlbumModel.createAlbumByDetail(res.data);
                    album.desc = res.data.desc;
                    
                    let songs = []
                    songList.forEach(item => {
                      if (item.songid && item.albummid) {
                        let song = SongModel.createSong(item);
                        //获取歌曲vkey
                        this.getSongUrl(song, item.songmid);
                        songs.push(song);
                        // songs.push(SongModel.createSong(item));
                      }
                    });
                    // console.log('songs',songs);
                    this.setState({
                        songLists: songs,
                        headerLitle: res.data.name,
                        loadings: false,
                        isData: true,
                        album: album,
                    }, () => {
						//刷新scroll
						this.setState({refreshScroll:true});
					});
                }
            }
        })
    }

    /**@author xieww
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
	 * 播放全部
	 */
	playAll = () => {
		if (this.state.songLists.length > 0) {
            //添加播放歌曲列表
            // console.log('this.props',this.props);
			this.props.setSongs(this.state.songLists);
			this.props.changeCurrentSong(this.state.songLists[0]);
			this.props.showMusicPlayer(true);
		}
    };
    
    /**
	 * 监听scroll
	 */
	scroll = ({y}) => {

		let albumBgDOM = ReactDOM.findDOMNode(this.refs.albumBg);
		let albumFixedBgDOM = ReactDOM.findDOMNode(this.refs.albumFixedBg);
		let playButtonWrapperDOM = ReactDOM.findDOMNode(this.refs.playButtonWrapper);
		if (y < 0) {
			if (Math.abs(y) + 55 > albumBgDOM.offsetHeight) {
				albumFixedBgDOM.style.display = "block";
			} else {
				albumFixedBgDOM.style.display = "none";
			}
		} else {
			let transform = `scale(${1 + y * 0.004}, ${1 + y * 0.004})`;
			albumBgDOM.style["webkitTransform"] = transform;
			albumBgDOM.style["transform"] = transform;
			playButtonWrapperDOM.style.marginTop = `${y}px`;
		}
    };
    componentDidMount() {
        this.setState({
            show: true,
          });

        let albumBgDOM = ReactDOM.findDOMNode(this.refs.albumBg);
        let albumContainerDOM = ReactDOM.findDOMNode(this.refs.albumContainer);
        albumContainerDOM.style.top = albumBgDOM.offsetHeight + "px";
        
        // console.log('this.props.match.params.id:' + this.props.match.params.id);
        let mId = this.props.match.params.id;
        this.getAlbumDetail(mId);
    };

    render() {
        let album = this.state.album;
        // console.log('this.props',this.props);
        return (
            <CSSTransition in={this.state.show} timeout={300} classNames="translate">
                <div className="singer-detail">
                    <div>
                        <NavHeadBar title = {this.state.headerLitle} className="singer-title"/>
                        <div style={{position:"relative"}} className="singer-bg">
                            <div ref="albumBg" className="singer-img" style={{backgroundImage: `url(${album.img})`}}>
                                <div className="filter"></div>
                            </div>
                            <div ref="albumFixedBg" className="singer-img fixed" style={{backgroundImage: `url(${album.img})`}}>
                                <div className="filter"></div>
                            </div>
                            <div className="play-wrapper" ref="playButtonWrapper" style={this.state.isData === true ? {} : {display:"none"}}>
                                <div className="play" ref="playBtn" onClick={this.playAll}>
                                    <Button  icon="play-circle-o" ghost className="btn">全部播放</Button>
                                </div>
                            </div>
                        </div>
                        <div className="singer-container" ref="albumContainer">
                            <div className="singer-scroll">
                                <Scroll refresh={this.state.refreshScroll}
                                    onScroll={this.scroll} ref="list-songs" className="list-songs">
                                    <div className="song-scroll">
                                        <SongItem 
                                            list={this.state.songLists} 
                                            setSongs={this.props.setSongs}
                                            showMusicPlayer={this.props.showMusicPlayer}
                                            changeCurrentSong={this.props.changeCurrentSong}
                                            playSongs={this.props.playSongs}
                                            currentSong={this.props.currentSong}
                                            />
                                    </div>
                                </Scroll> 
                            </div>       
                        </div>
                    </div>
                    <MyLoading isloading={this.state.loadings}/>
                </div>
            </CSSTransition>
        );
    }
}

export default AlbumDetail;