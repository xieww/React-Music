import React, { Component } from "react";
import ReactDOM from "react-dom";
import { CSSTransition } from "react-transition-group"
import { Toast,Icon,SearchBar,SegmentedControl} from 'antd-mobile';
import SongItem from "../SongItem/SongItem";
import Scroll from "../../../utils/scroll";
import SearchHistory from "../SearchHistory/SearchHistory";
import "./HistoryRecord.less";

class HistoryRecord extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedIndexs:0,
        };
    };

    /**
     * @author xieww
     * @description 选择历史记录
     * @param {*} e 
     */
    selectList= (e) => {
        console.log(`selectedIndex:${e.nativeEvent.selectedSegmentIndex}`);
        this.setState({
            selectedIndexs: e.nativeEvent.selectedSegmentIndex,
        });
    };

    /**
     * @author xieww
     * @param {*} value 
     */
    onValueChange = (value) => {
        console.log('===========',value);
    };

    render() {
        console.log('历史记录',this.props);
        // let historyList = "";
        // if (this.state.selectedIndexs === 0 ) {
        //     return historyList= (<SongItem 
        //                     list={this.props.playHistory}
        //                     setSongs={this.props.setSongs}
        //                     showMusicPlayer={this.props.showMusicPlayer}
        //                     changeCurrentSong={this.props.changeCurrentSong}
        //                     playSongs={this.props.playSongs}
        //                     currentSong={this.props.currentSong}
        //                 />);
        // }else {
        //     return historyList = (<SearchHistory
        //                             list={this.props.searchHistory}
        //                         />);
        // };

        return (
            <div className="history-record">
                <div className="history-header">
                    <div className="close">
                        <Icon type={"left"} size={'lg'} className="icon-back"/>
                    </div>
                    <h1 className="title">添加歌曲到列表</h1>
                </div>
                <div className="search-box">
                    <SearchBar
                        placeholder="搜索歌曲、歌单、专辑"
                    />
                </div>
                <div className="history-body">
                    <SegmentedControl 
                        values={['最近播放', '搜索历史']} 
                        tintColor={'#31c27c'}
                        style={{ height: '30px', width: '250px',margin: '0 auto'}}
                        
                        onChange={this.selectList}
                        onValueChange={this.onValueChange}
                    />
                    <div className="list-select">
                        <div style={{display: this.state.selectedIndexs === 0 ? "block" : "none"}} className="search-l">
                            <Scroll className="list-scroll">
                                <div className="play-history" >
                                    <SongItem 
                                        list={this.props.playHistory}
                                        setSongs={this.props.setSongs}
                                        showMusicPlayer={this.props.showMusicPlayer}
                                        changeCurrentSong={this.props.changeCurrentSong}
                                        playSongs={this.props.playSongs}
                                        currentSong={this.props.currentSong}
                                    />
                                </div>
                            </Scroll>
                        </div>
                        <div style={{display: this.state.selectedIndexs === 1 ? "block" : "none"}} className="search-r">
                            <Scroll >
                                <div className="search-history" >
                                    <SearchHistory
                                        list={this.props.searchHistory}
                                    />
                                </div>
                            </Scroll>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default HistoryRecord;