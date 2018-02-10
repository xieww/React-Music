import React, { Component } from "react";
import { getMusicList } from "../../Api/rankinglist";
import { getSongVKey } from "../../Api/song";
import { CODE_SUCCESS } from "../../Api/config";
import Scroll from "../../utils/scroll";
import { withRouter,Route } from "react-router-dom";
import MyLoading from "../common/Loading/Loading";
import "./RankingListDetail.less";
import DetailListView from "../common/DetailListView/DetailListView";
import * as SongModel from "../../model/song";
import * as RankingModel from "../../model/rankingList";

class RankingListDetail extends Component {
    constructor(props) {
      super(props);
      this.state = {
        rankingList: [],
        refreshScroll: false,
        isData: false,
        loadings: true,
        headerTitle: "",
        songLists: [],
        bgImg: "",
        ranking: {},
        iconShow: true,
      };
    }

    /**
     * @author xieww
     * @description 获取排行榜详情
     * @param {*} id 
     */
    getMusicListDetail(id) {
        getMusicList(id).then((res) => {
            if (res) {
                if (res.code === CODE_SUCCESS) {
                    let songList = res.songlist;
                    // console.log('排行榜详情',res,songList);
                    let ranking = RankingModel.createRankingByDetail(res.topinfo);
                    ranking.info = res.topinfo.info;
                    ranking.date = res.update_time;
                    ranking.days = res.day_of_year;

                    let songs = [];
                    songList.forEach((item) => {
                        const musicData = item.data
                      if (musicData.songid && musicData.albummid) {
                        // songs.push(SongModel.createSong(musicData));
                        let song = SongModel.createSong(musicData);
                        //获取歌曲vkey
                        if (musicData.songmid === "001qjdRZ4ZswWO") {
                            let mid = "101qjdRZ4ZswWO";
                            this.getSongUrl(song, mid);
                        } else {
                            this.getSongUrl(song, musicData.songmid);
                        }                        
                        songs.push(song);
                      }
                    });
                    // console.log('--------------',songs);
                    this.setState({
						ranking: ranking,
                        songLists: songs,
                        // headerLitle: res.cdlist[0].dissname,
                        loadings: false,
                        isData: true,
                        // avatar:res.cdlist[0].logo
					}, () => {
						//刷新scroll
						this.setState({refreshScroll:true});
					});

                    // console.log('songs',songs,ranking);
                }
            }
        })
    };

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
    componentDidMount() {
        this.setState({
            show: true,
          });

        let id = this.props.match.params.id;
        this.getMusicListDetail(id);
    };

    render() {
        
        return (
            <div className="ranking-detail">
                <DetailListView 
                    list={this.state.songLists} 
                    isData={this.state.isData} 
                    iconShow= {this.state.iconShow}
                    loading={this.state.loadings}
                    rankings={this.state.ranking}
                    refresh={this.state.refreshScroll}
                    changeCurrentSong={this.props.changeCurrentSong}
                    currentSong={this.props.currentSong}
                    playSongs={this.props.playSongs}
                    setSongs={this.props.setSongs}
                    showMusicPlayer={this.props.showMusicPlayer}
                    />
            </div>
        )
    }
}

export default withRouter(RankingListDetail);