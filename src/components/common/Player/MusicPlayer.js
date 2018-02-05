import React from "react"
import Player from "../../../reduxs/containers/Player";
import PlayerList from "../../../reduxs/containers/PlayerList";



class MusicPlayer extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			currentSongIndex: 0,
			show: false,  //控制播放列表显示和隐藏
			fullPlayerModes: 0, //播放模式
			fullplayerStatus: false, //全局播放状态
		}
	};

	/**
	 * @author xieww
	 * @description 当前播放歌曲在列表中的位置
	 *  * @param {*} index
	 */
	changeCurrentIndex = (index) => {
		this.setState({
			currentSongIndex: index
		});
	};

	/**
	 * @author xieww
	 * @description 是否显示播放列表
	 * @param {*} status
	 */
	showList = (status,mode) => {
		
		this.setState({
			show: status,
			fullPlayerModes: mode,
		});
	};

	/**
	 * @author xieww
	 * @description 播放模式
	 * @param {*} mode 
	 */
	fullPlayModes = (mode) => {
		this.setState({
			fullPlayerModes: mode
		});
	};
   
	/**
	 * @author xieww
	 * @description 全局播放状态
	 * @param {*} status 
	 */
	fullplayStatus = (fullStatus) => {
		this.setState({
			fullplayerStatus: fullStatus,
		});
	}
	render() {
		return (
			<div className="music-player">
				<Player currentIndex={this.state.currentSongIndex}
					showList={this.showList}
					changeCurrentIndex={this.changeCurrentIndex}
					fullPlayerModes={this.state.fullPlayerModes}
					fullplayStatus={this.fullplayStatus}
					fullplayerStatus={this.state.fullplayerStatus}
					/>
				<PlayerList currentIndex={this.state.currentSongIndex}
					showList={this.showList} 
					changeCurrentIndex={this.changeCurrentIndex}
					show={this.state.show}
					fullPlayerModes={this.state.fullPlayerModes}
					fullplayStatus={this.fullplayStatus}
					fullplayerStatus={this.state.fullplayerStatus}
					/>
			</div>
		);
	}
}

export default MusicPlayer;