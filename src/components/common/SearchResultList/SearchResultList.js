import React, { Component } from "react";
import { Route,withRouter } from "react-router-dom";
import Singer from "../../../reduxs/containers/singer";
import Album from "../../../reduxs/containers/Album";
import "./SearchResultList.less";
import { Toast } from 'antd-mobile';

class SearchResultList extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    };

    shouldComponentUpdate(nextProps, nextState){
        if (this.props !== nextProps) {
            return true;
        }
    };

    /**
     * @author xieww
     * @description 处理点击歌曲
     * @param {*} id 
     * @param {*} type 
     */
    jumpPage = (value,type) => {
        return () => {
            if (type === "singer") {
                //跳转到歌手详情
                this.props.history.push({
                    pathname: `/singer/${value}`
                });
            }else if (type === "album") {
                //跳转到专辑详情
                this.props.history.push({
                    pathname: `/recommend/albumlist/${value}`
                });
            }else {
                if (this.props.currentSong.id !== undefined) {
                    if (this.props.currentSong.id === value.id) {
                        return;
                    } else {
                        let tempPlaySongs = this.props.playSongs;
                        let tempSongList = tempPlaySongs.concat(value);
                        this.props.setSongs(tempSongList);
                        this.props.changeCurrentSong(value);
                        this.props.showMusicPlayer(true);
                        Toast.success('歌曲已添加到播放队列',1);
                    }
                } else {
                        this.props.setSongs([value]);
                        this.props.changeCurrentSong(value);
                        this.props.showMusicPlayer(true);
                }

                // this.props.setSongs([value]);
                // this.props.changeCurrentSong(value);
                // this.props.showMusicPlayer(true);
            }
        }
    }
    render() {

        console.log('this.props',this.props);
        let {match} = this.props;
        console.log('match.url',match.url );
        let singer = this.props.singer;
        let album = this.props.album;

        let resultList = "";
        resultList = this.props.list.map((item,index) => {
            return (
            <li key={index} onClick={this.jumpPage(item,"song")}>
                <i className="icon"/>
                <h6 className="name">{item.name}</h6>
                <p className="info">{item.singer}</p>
            </li> 
            );
        });
        return (
            <div className="search-result">
                {/* 歌曲列表 */}
                    <ul>
                        {/* 歌手列表 */}
                        <li className="sing-result" style={{display:singer.type ? "block" : "none"}} onClick={this.jumpPage(singer.mId,singer.type)}> 
                            <span className="avatar singer">
                                <img className="singer-img" src={singer.avatar} alt={singer.singername}/>
                            </span>
                            <h6 className="name">{singer.singername}</h6>
                            <p className="info">
                                <span>单曲:{singer.songnum}</span>
                                <span>专辑:{singer.albumnum}</span>
                            </p>
                        </li>
                        {/* 专辑列表 */}
                        <li className="album-result" style={{display:album.type ? "block" : "none"}} onClick={this.jumpPage(album.mId,album.type)}>
                            <span className="avatar album">
                                <img className="album-img" src={album.img} alt={album.singername}/>
                            </span>
                            <h6 className="name">{album.name}</h6>
                            <p className="info">{album.singer}</p>
                        </li>
                        {resultList}
                    </ul>
                    <Route path={`${'/singer/:id'}`} component={Singer} />
                    <Route path={`${'/recommend/albumlist/:id'}`} component={Album} />
            </div>
        );
    }
}

export default withRouter(SearchResultList);