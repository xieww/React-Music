import React, { Component } from "react";
import { Badge,Icon,Toast} from 'antd-mobile';
import "./SongItem.less";

// const isIPhone = new RegExp('\\biPhone\\b|\\biPod\\b', 'i').test(window.navigator.userAgent);
// let wrapProps;
// if (isIPhone) {
//   wrapProps = {
//     onTouchStart: e => e.preventDefault(),
//   };
// };

class SongItem extends Component {
    constructor(props) {
      super(props);
      this.state = {
        clicked2: 'none',
        isFirstPlay: true,
      };
    };

    /**
     * @author xieww
     * @description 渲染排行榜图标
     * @param {*} index 
     */
    getRankCls(index) {
        if (index <= 2) {
          return `icon icon${index}`
        } else {
          return 'text'
        }
    };

    getRankText(index) {
        if (index > 2) {
          return index + 1
        }
    };

    /**
     * @author xieww
     * @description 选择歌曲，如果歌曲已经存在则不添加
     * @param {*} song 
     */
    selectSong(song){
        // console.log('=======this.props=======',this.props);
        return () => {
            if (this.props.currentSong.id !== undefined) {
                let arrID = this.processData();
                //判断当前播放列表是否有将要添加的歌曲，如果歌曲已经存在测不添加
                if (arrID.includes(song.id)) {
                    Toast.offline('抱歉，添加失败，歌曲已经存在', 1);
                    return;
                } else {
                    let tempPlaySongs = this.props.playSongs;
                    let tempSongList = tempPlaySongs.concat(song);
                    this.props.setSongs(tempSongList);
                    this.props.changeCurrentSong(song);
                    this.props.showMusicPlayer(true);
                    Toast.success('歌曲已添加到播放队列',1);
                }
            } else {
                    this.props.setSongs([song]);
                    this.props.changeCurrentSong(song);
                    this.props.showMusicPlayer(true);
            }
        }
    };

    /**
     * @author xieww
     * @description 处理播放列表
     */
    processData = () => {
        let playSong = this.props.playSongs;
        let len = playSong.length;
        let tempArr = [];
        for (let i = 0; i < len; i++) {
            tempArr.push(playSong[i].id);
        }
        return tempArr;
    };

    render() {
        // console.log('this.props2222',this.props);
        let songItems = "";
        songItems = this.props.list.map((item,index) => {

            let pItem = "";
            if (item.albumdesc !== "") {
                pItem = <p className="song-info">{item.singer}·{item.album}·{item.albumdesc}</p>;
            } else {
                pItem = <p className="song-info">{item.singer}·{item.album}</p>;
            }
            return (
                <li className="item-li" key={index} onClick={this.selectSong(item)}>
                    <div className="rank"  style={this.props.iconShow === true ? {display:"block"} : {display:"none"}}>
                        <span className={index <= 2 ? `icon icon${index}` : 'text'}>
                            {this.getRankText(index)}
                        </span>
                    </div>
                    <div className="content">
                        <h2 className="songname">
                            {item.name}
                            <Badge text={item.isonly === 1 ? "独家" : ""} 
                                style={{
                                marginLeft: 5,
                                padding: '0 1px',
                                fontSize: 8,
                                backgroundColor: '#2A4F56',
                                borderRadius: 2,
                                color: '#31c27c',
                                border: '1px solid #31c27c',
                                width: 21,
                                height: 14,
                                lineHeight: 1.5
                                }}
                            />
                            {/* <span className="tags">{item.isonly === 1 ? "独家" : ""}</span> */}
                        </h2>
                        {pItem}
                    </div>
                    <div className="right">
                        <Icon key="1" type="ellipsis" />
                    </div>
                </li>
            );
        })

        return (
                <ul className="song-item">
                    {songItems}
                </ul>
        );
    }
}

export default SongItem;