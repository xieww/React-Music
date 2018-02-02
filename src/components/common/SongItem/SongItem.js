import React, { Component } from "react";
import { List, Badge,Icon,  ActionSheet} from 'antd-mobile';
import { Button } from 'antd';
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
      };
    };

    dataList = [
        { url: 'OpHiXAcYzmPQHcdlLFrc', title: '发送给朋友' },
        { url: 'wvEzCMiDZjthhAOcwTOu', title: '新浪微博' },
        { url: 'cTTayShKtEIdQVEMuiWt', title: '生活圈' },
        { url: 'umnHwvEgSyQtXlZjNJTt', title: '微信好友' },
        { url: 'SxpunpETIwdxNjcJamwB', title: 'QQ' },
      ].map(obj => ({
        icon: <img src={`https://gw.alipayobjects.com/zos/rmsportal/${obj.url}.png`} alt={obj.title} style={{ width: 36 }} />,
        title: obj.title,
    }));

    // showShareActionSheetMulpitleLine = () => {
    //     // const data = [[...this.dataList, this.dataList[2]]];
    //     ActionSheet.showShareActionSheetWithOptions({
    //       options: this.dataList,
    //       message: 'I am description, description, description',
    //     },
    //     (buttonIndex) => {
    //       this.setState({ clicked2: buttonIndex > -1 ? this.dataList[buttonIndex].title : 'cancel'});
    //     });
    // }

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
	 * 选择歌曲
	 */
	selectSong(song) {
		return (e) => {
			this.props.setSongs([song]);
			this.props.changeCurrentSong(song);
			// this.startMusicIcoAnimation(e.nativeEvent);
		};
    };

    render() {
        // console.log('this.props2222',this.props);
        let songItems = "";
        songItems = this.props.list.map((item,index) => {

            let pItem = "";
            if (item.albumdesc != "") {
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