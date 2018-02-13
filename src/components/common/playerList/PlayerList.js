import React, { Component } from "react";
import ReactDOM from "react-dom";
import { CSSTransition } from "react-transition-group"
import { Modal, List, Button, Toast} from 'antd-mobile';
import { Icon } from 'antd';
import { playModeNum } from "../../../Api/config";
import Scroll from "../../../utils/scroll";
import "../Player/commons.less";
import "./PlayerList.less";

const alert = Modal.alert;

class PlayerList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showList: false,
            isShow: false,
            currentPlayMode: 0,
        };
        this.playModes = ["circle-loops", "singles-cicle", "random-play"];
        this.changeIndex = {
			shouldChange: false,
			index: 0
		};
        
    };

    /**
     * @author xieww
     * @description 关闭播放列表
     */
    onClose = () => {
        let temp = this.state.currentPlayMode;
        this.props.showList(false,temp);
    };
    /**
     * @author xieww
     * @description 删除歌曲
     * @param {*} id 
     * @param {*} index 
     */
    removeSong(id,index) {
        return (e) => {
            e.stopPropagation();
            e.nativeEvent.stopImmediatePropagation();
            if (this.props.currentSong.id !== id) {
                this.props.removeSong(id);
                if (index < this.props.currentIndex) {
                    //调用父组件修改当前歌曲位置
					this.props.changeCurrentIndex(this.props.currentIndex - 1);
                }
            }
        }
    }

    /**
     * @author xieww
     * @description 清空播放列表
     */
    removeAllSongs = () => alert('清空', '确定清空播放列表吗???', [
        { text: '取消', onPress: () => console.log() },
        { text: '确定', onPress: () => {
            if (this.props.playSongs !==0) {
                this.props.removeALLSong('0');
                this.props.fullplayStatus(false);
                let temp = this.state.currentPlayMode;
                this.props.showList(false,temp);
            };
            Toast.success('操作成功 !!!', 1);
        }},
    ]);

    /**
     * @author xieww
     * @description 播放歌曲
     * @param {*} song 
     * @param {*} index 
     */
    playMusic(song,index) {
        return () => {
                this.props.changeCurrentSong(song);
                this.props.changeCurrentIndex(index);
                this.onClose();
        }
    };

    // componentWillReceiveProps(nextProps) {
    // };
    // shouldComponentUpdate(nextProps, nextState) {
    //     return true;
    // };
    // componentWillUpdate(nextProps, nextState) {

    // };
	componentDidUpdate(prevProps, prevState) {
        if (this.changeIndex.shouldChange === true) {
            this.props.changeCurrentIndex(this.changeIndex.index);
            this.changeIndex.shouldChange = false;
        }
    };
    
    componentDidMount() {

    };

    /**
     * @author xieww
     * @description 切换播放模式
     */
    changePlayMode = (e) => {
        // e.stopPropagation();
        // e.nativeEvent.stopImmediatePropagation();

        if (this.state.currentPlayMode === this.playModes.length - 1) {
			this.setState({currentPlayMode:0});
		} else {
			this.setState({currentPlayMode:this.state.currentPlayMode + 1});
		}
    };

    /**
     * @author xieww
     * @description 滚动到当前播放歌曲
	 */
	scrollToCurrentItem() {
		this.refs.scroll.bScroll.scrollToElement(
			ReactDOM.findDOMNode(this.refs[`item${this.props.currentIndex}`])
		);
	}

    /**
     * @author xieww
     * @description 打开增加歌曲页面
     * @param {*} value 
     */
    openPages = () =>{
        this.props.isShowAddPage(true);
    };
    /**
     * @author xieww
     * @description 添加歌曲列表是否显示
     * @param {*} value 
     */
    addPages = (value) => {
        this.setState({
            isShow: value,
        });
    };

    render() {
        // console.log('22222222222222222',this.props);
        let playModesText = this.state.currentPlayMode === playModeNum.sequence ? "顺序播放" : this.state.currentPlayMode === playModeNum.loop ? "单曲循环" : "随机播放";

        let titleText = playModesText + "(" +this.props.playSongs.length + "首)";
      
        let songPlayList = "";
        songPlayList = this.props.playSongs.map((item,index) => {
            let isCurrent = false;
            if (item.id === this.props.currentSong.id) {
                isCurrent = true;
                //设置当前播放歌曲位置，并提示父组件更新当前歌曲位置
                this.changeIndex = {
                    shouldChange: true,
                    index
                };
            }
            return (
                <List.Item key={index} className={isCurrent ? "am-list-item activeIndex" : "am-list-item"} onClick={this.playMusic(item,index)} ref={`item${index}`}>
                    <span className="song-name">{item.name}</span>-
                    <span className="song-singer">{item.singer}</span>
                    <span className="list-close">
                        <Icon type="close" className="close" onClick={this.removeSong(item.id ,index)}/>
                    </span>
                </List.Item>
            );
        });
        
        return (
            <div className="player-list">
                <CSSTransition in={this.props.show} classNames="fade" timeout={500}
                    onEnter={() => {
						this.setState({
                            showList:true,
                            currentPlayMode:this.props.fullPlayerModes
                            });
					}}
					onEntered={() => {
                        this.refs.scroll.refresh();
                        this.scrollToCurrentItem();
					}}
					onExited={() => {
						this.setState({
                            showList:false,
                        });
                        this.scrollToCurrentItem();
					}}>
                    <div className="player-list-body" >
                        <Modal
                            popup
                            visible={this.state.showList}
                            onClose={this.onClose}
                            animationType="slide-up"
                            transparent={true}
                            className="modal-list"
                            >
                            <List 
                                renderHeader={
                                    () => 
                                    <div className="player-list-title">
                                        <h1 className="title-top">
                                            <Icon type={this.playModes[this.state.currentPlayMode]} className="title-icon" onClick={this.changePlayMode}/>
                                            <span className="text">{titleText}</span>
                                            <Icon type="plus-square-o" className="add-music" onClick={this.openPages}/>
                                            <Icon type="delete" className="icon-clear" 
                                                onClick={this.removeAllSongs}/>
                                        </h1>
                                    </div>
                                } 
                                renderFooter={
                                    () => 
                                    <div className="player-list-footer">
                                        <Button   onClick={this.onClose} className="close-bt" >关闭</Button>
                                    </div>
                                }
                                className="popup-list">
                                <div className="am-list-body">
                                    <Scroll ref="scroll">
                                        <div>
                                            {songPlayList}
                                        </div>
                                    </Scroll>
                                </div>
                            </List>
                        </Modal>
                        {/* <HistoryRecord
                            playHistory={this.props.playHistory}
                            searchHistory={this.props.searchHistory}
                            setSongs={this.props.setSongs}
                            showMusicPlayer={this.props.showMusicPlayer}
                            changeCurrentSong={this.props.changeCurrentSong}
                            playSongs={this.props.playSongs}
                            currentSong={this.props.currentSong}
                            isShowAddPage={this.addPages}
                            isShow={this.state.isShow}
                        /> */}
                    </div>
                </CSSTransition>
            </div>
        );
    }
}

export default PlayerList;