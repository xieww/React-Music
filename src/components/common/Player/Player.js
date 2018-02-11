import React, { Component } from "react";
import { CSSTransition } from "react-transition-group"
import ReactDOM from "react-dom";
import { NavBar,  Carousel, Toast } from 'antd-mobile';
import { Icon } from 'antd';
import Scroll from "../../../utils/scroll";
import  ProgressBar from "../ProgressBar/ProgressBar";
import  "./Player.less";
import "./commons.less";
import { Song } from "../../../model/song";
// const sizes = ['xxs', 'xs', 'sm', 'md', 'lg'];

// function getPlayTime(second){
// 	second = Math.floor(second);
// 	let minute = Math.floor(second / 60);
// 	second = second - minute * 60;
// 	return minute  + ":" + formatTime(second);
// }
// function formatTime(time){
// 	let timeStr = "00";
// 	if(time > 0 && time < 10){
// 		timeStr = "0" + time;
// 	}else if(time >= 10){
// 		timeStr = time;
// 	}
// 	return timeStr;
// };

const isMove = "navigator.userAgent.match(/Android/i) || navigator.userAgent.match(/webOS/i) || navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPad/i) || navigator.userAgent.match(/iPod/i) || navigator.userAgent.match(/BlackBerry/i) || navigator.userAgent.match(/Windows Phone/i";
class Player extends Component {
    constructor(props) {
        super(props);
        this.state = {
          show: false,
          currentShow: 'cd',
          playStatus: false,//播放状态
          fullScreen:false,//是否显示全屏播放页还是迷你播放页
          isNotFullScreen: false,

          currentTime: 0, //当前播放时间
          playProgress: 0, // 当前播放进度
          currentPlayMode: 0 // 当前播放模式
        };
        //当前播放歌曲和歌曲的位置
        this.currentSong = new Song( 0, "", "", "", 0, "", "", "", "", "");
        this.currentIndex = 0;

        //拖拽进度
		this.dragProgress = 0;
        this.isFirstPlay = true;
        //播放模式： circle-loops-顺序播放 singles-cicle-单曲循环 random-play-随机播放
		this.playModes = ["circle-loops", "singles-cicle", "random-play"];
    };

    /**
     * @author xieww
     * @description 切换播放模式
     */
    changePlayMode = () => {
        if (this.state.currentPlayMode === this.playModes.length - 1) {
			this.setState({currentPlayMode:0});
		} else {
			this.setState({currentPlayMode:this.state.currentPlayMode + 1});
		}
    };

    /**
     * @author xieww
     * @description 切换播放状态
     */
    SwitchPlayOrPause = (e) => {
        e.stopPropagation();
        e.nativeEvent.stopImmediatePropagation();
        if (this.state.playStatus === false) {
            //表示第一次播放
			if (this.first === undefined) {
				this.audioDOM.src = this.currentSong.url;
				this.first = true;
			}
			this.audioDOM.play();
            this.startImgRotate();
            this.setState({
                playStatus: true,
            });
        } else {
            this.audioDOM.pause();
			this.stopImgRotate();
            this.setState({
                playStatus: false,
            });
        }
    };

    /**
     * @author xieww
     * @description 上一曲
     */
    
    previousPiece = () => {
        //播放列表长度
        let songLen = this.props.playSongs.length;
        let cpmIndex = this.state.currentPlayMode;
        if (songLen > 0 && songLen !== 1) {
            let currentIndex = this.currentIndex;
            if (cpmIndex === 0) { // 循环播放
                if (currentIndex === 0) {
                    currentIndex = songLen - 1;
                } else {
                    currentIndex = currentIndex - 1;
                }
            } else if (cpmIndex === 1) { //单曲循环
                currentIndex = this.currentIndex;
            } else { //随机播放
                let index = parseInt(Math.random() * songLen, 10);
				currentIndex = index;
            }
            this.props.changeCurrentSong(this.props.playSongs[currentIndex]);
			//调用父组件修改当前歌曲位置
			this.props.changeCurrentIndex(currentIndex);
        }
    }

    /**
     * @author xieww
     * @description 下一曲
     */
    nextTrack = () => {
        //播放列表长度
        let songLen = this.props.playSongs.length;
        let cpmIndex = this.state.currentPlayMode;
        if (songLen > 0 && songLen !== 1) {
            let currentIndex = this.currentIndex;
            if (cpmIndex === 0) { //循环播放
                if (currentIndex === songLen - 1) {
                    currentIndex = 0
                } else {
                    currentIndex += 1;
                }
            } else if (cpmIndex === 1) { //单曲循环
                currentIndex = this.changePlayMode;
            } else {
                let index = parseInt(Math.random() * songLen, 10);
				currentIndex = index;
            }
            this.props.changeCurrentSong(this.props.playSongs[currentIndex]);
			//调用父组件修改当前歌曲位置
			this.props.changeCurrentIndex(currentIndex);
        }
    }

    /**
     * @author xieww
     * @description 判断当前播放歌曲是否在收藏历史中
     * @param {*} song 
     */
    isFavorite = (song) => {
        const index = this.props.favoriteHistory.findIndex((item) => {
          return item.id === song.id
        })
        return index > -1
    };

    /**
     * @author xieww
     * @description 设置收藏图标
     * @param {*} song 
     */
    getFavoriteIcon = (song) => {
        if (this.isFavorite(song)) {
            return "heart";
        } else {
            return "heart-o";
        }
    };

    /**
     * @author xieww
     * @description 设置是否收藏
     * @param {*} song 
     */
    setFavorite = (song) => {
        if (this.isFavorite(song)) {
            return (e) => {
                e.stopPropagation();
                e.nativeEvent.stopImmediatePropagation();
                this.props.deleteFavorite(song);
            }
        } else {
            return  (e) => {
                e.stopPropagation();
                e.nativeEvent.stopImmediatePropagation();
                this.props.saveFavorite(song);
            }
        }
    };

    switchFullScreen = () => {
        if (this.state.playStatus  === true) {
            this.setState({
                // fullScreen: false,
                isNotFullScreen:true
            });
        } else if (this.state.isNotFullScreen === true) {
            this.setState({
                fullScreen: true,
                isNotFullScreen: false
            });
        }else {
            this.setState({
                fullScreen: false,
                isNotFullScreen: false
            });
        }
    };

    /**
	 * 隐藏播放器
	 */
	hidePlayer = () => {
        this.props.showMusicPlayer(false);
        this.setState({
            isNotFullScreen: true,
        });
    };

    /**
	 * 显示播放器
	 */
	showPlayer = ()=> {
        this.props.showMusicPlayer(true);
        this.setState({
            fullScreen:true,
            isNotFullScreen:false,
        });
    };
    
    /**
     * @author xieww
     * @description 处理播放时间
     * @param {*} interval 
     */
    getPlayTime(interval) {
        interval = interval | 0
        const minute = interval / 60 | 0
        const second = this.format(interval % 60)
        return `${minute}:${second}`
    };

    format(num, n = 2) {
        let len = num.toString().length
        while (len < n) {
          num = '0' + num
          len++
        }
        return num
    };

    /**
	 * 开始拖拽
	 */
	handleDrag = (progress) => {
        // console.log('progress',progress);
		if (this.audioDOM.duration > 0) {
			this.audioDOM.pause();

			this.stopImgRotate();

			this.setState({
				playStatus: false
			});
			this.dragProgress = progress;
		}
	}
	/**
	 * 拖拽结束
	 */
	handleDragEnd = () => {
		if (this.audioDOM.duration > 0) {
			let currentTime = this.audioDOM.duration * this.dragProgress;
			this.setState({
				playProgress: this.dragProgress,
				currentTime: currentTime
			}, () => {
				this.audioDOM.currentTime = currentTime;
				this.audioDOM.play();

				this.startImgRotate();

				this.setState({
					playStatus: true
				});
				this.dragProgress = 0;
			});
		}
    };

    /**
	 * 开始旋转图片
	 */
	startImgRotate = () => {
		if (this.singerImgDOM.className.indexOf("rotate") === -1 ) {
            this.singerImgDOM.classList.add("rotate");
            this.singerImgMiniDOM.classList.add("rotate");
		} else {
			this.singerImgDOM.style["webkitAnimationPlayState"] = "running";
            this.singerImgDOM.style["animationPlayState"] = "running";

            this.singerImgMiniDOM.style["webkitAnimationPlayState"] = "running";
			this.singerImgMiniDOM.style["animationPlayState"] = "running";
		}
	}
	/**
	 * 停止旋转图片
	 */
	stopImgRotate = () => {
		this.singerImgDOM.style["WebkitAnimationPlayState"] = "paused";
        this.singerImgDOM.style["animationPlayState"] = "paused";
        
        this.singerImgMiniDOM.style["WebkitAnimationPlayState"] = "paused";
		this.singerImgMiniDOM.style["animationPlayState"] = "paused";
    };
    
    showPlayerList = (e) => {
        e.stopPropagation();
        e.nativeEvent.stopImmediatePropagation();
        let temp = this.state.currentPlayMode;
        let tempStatus = this.state.playStatus;
       
        this.props.showList(true,temp);
        this.props.fullplayStatus(tempStatus);
    };

    componentWillReceiveProps(nextProps) {
       
        if (nextProps.playSongs.length === 0) {
            //暂停
            this.audioDOM.pause();
            this.stopImgRotate();

            this.setState({
                playStatus: nextProps.pullplayerStatus,
                playProgress: 0,
                currentTime: 0,
            });
    }
    }

    componentWillUpdate(nextProps, nextState) {

    };

    componentDidUpdate(prevProps, prevState) {
		//兼容手机端canplay事件触发后第一次调用play()方法无法自动播放的问题
		if (this.isFirstPlay === true) {
			this.audioDOM.play();
            this.isFirstPlay = false;
		}
	};
    
    componentDidMount() {
        this.audioDOM = ReactDOM.findDOMNode(this.refs.audio);
        this.singerImgDOM = ReactDOM.findDOMNode(this.refs.singerImg);
        this.singerImgMiniDOM = ReactDOM.findDOMNode(this.refs.singerImgMini);
        this.playerDOM = ReactDOM.findDOMNode(this.refs.NormalPlayer);
        this.miniplayerDOM = ReactDOM.findDOMNode(this.refs.miniPlayer);
        this.playerBgDOM = ReactDOM.findDOMNode(this.refs.playerBg);
        
        this.audioDOM.addEventListener("canplay", () => {
            this.audioDOM.play();
            this.startImgRotate();

            this.setState({
                playStatus: true
            });
        }, false);
        
        this.audioDOM.addEventListener("timeupdate", () => {
            if (this.state.playStatus === true) {
                this.setState({
                    playProgress: this.audioDOM.currentTime / this.audioDOM.duration,
                    currentTime: this.audioDOM.currentTime
                });
            }
        }, false);

        this.audioDOM.addEventListener("ended", () => {
            if (this.props.playSongs.length > 1) {
                let currentIndex = this.currentIndex;
                if (this.state.currentPlayMode === 0) {  //列表播放
                    if(currentIndex === this.props.playSongs.length - 1){
                        currentIndex = 0;
                    }else{
                        currentIndex = currentIndex + 1;
                    }
                } else if (this.state.currentPlayMode === 1) {  //单曲循环
                    //继续播放当前歌曲
                    this.audioDOM.play();
                    return;
                } else {  //随机播放
                    let index = parseInt(Math.random() * this.props.playSongs.length, 10);
                    currentIndex = index;
                }
                this.props.changeCurrentSong(this.props.playSongs[currentIndex]);
                //调用父组件修改当前歌曲位置
                this.props.changeCurrentIndex(currentIndex);

                //this.audioDOM.src = currentSong.url;
                //重新加载歌曲
                //this.audioDOM.load();
            } else {
                if (this.state.currentPlayMode === 1) {  //单曲循环
                    //继续播放当前歌曲
                    this.audioDOM.play();
                } else {
                    //暂停
                    this.audioDOM.pause();
                    this.stopImgRotate();

                    this.setState({
                        playProgress: 0,
                        currentTime: 0,
                        playStatus: false
                    });
                }
            }
        }, false);

        this.audioDOM.addEventListener("error", () => {
            // alert("加载歌曲出错！")
            Toast.offline('抱歉，加载歌曲出错！', 1);
        }, false);
    }

    render() {
        this.currentIndex = this.props.currentIndex;

        //从redux中获取当前播放歌曲
		if (this.props.currentSong && this.props.currentSong.url) {
			//当前歌曲发生变化
			if (this.currentSong.id !== this.props.currentSong.id) {
				this.currentSong = this.props.currentSong;
				if (this.audioDOM) {
					this.audioDOM.src = this.currentSong.url;
					//加载资源，ios需要调用此方法
					this.audioDOM.load();
				}
			}
		}
		let song = this.currentSong;

		let playBg = song.img ? song.img : require("../../../images/play_bg.jpg");


        song.playStatus = this.state.playStatus;
        
        let favoriteHistory = this.props.favoriteHistory;
        

        // console.log('this.props.currentSong',this.props.currentSong);
        // console.log('this.props.playSongs',this.props.playSongs);
        console.log('==========this.props============',this.props);
        //播放按钮样式
        let playButtonClass = this.state.playStatus === true ? "pause-circle-o" : "play-circle-o";
        let isFavoriteIcon = this.state.favorite === true ? "heart" : "heart-o";

        let isFullScreen = this.state.fullScreen === true ? {} : {display:'none'};
        let isNotFullScreen = this.state.isNotFullScreen === true ? {} : {display:'none'};
        let isRorate = this.state.playStatus === true ? "cd rotate" : "cd pause";
        return (
            <div className="player-page">
                <CSSTransition in={this.props.showStatus} timeout={300} classNames="player-rotate"
					onEnter={() => {
						this.playerDOM.style.display = "block"; 
                        this.miniplayerDOM.style.display = "none" 
                        this.setState({
                            currentPlayMode:this.props.fullPlayerModes
                        });                     
					}}
					onExited={() => {
						this.playerDOM.style.display = "none";
                        this.miniplayerDOM.style.display = "flex" 
					}} name="normal">
                    <div className="normal-player"  style={isFullScreen} ref="NormalPlayer">
                        <div className="player-bg">
                            <img ref="playerBg" height="100%" width="100%" src={playBg}/>
                        </div>
                        <div className="top">
                            <div className="back" onClick={this.hidePlayer}>
                                <Icon type={"down"} size={'lg'} className="icon-back"/>
                            </div>
                            <h1 className="title">{song.name}</h1>
                            <h2 className="subtitle">{song.singer}</h2>
                        </div>
                        <div className="middle">
                            <div className="middle-l" ref="middle-l">
                                <div className="cd-wrapper" ref="cdWrapper">
                                    <div className="cd" ref="singerImg" >
                                        <img  className="cd-image" src={playBg} alt={song.name} onLoad={
                                            (e) => {
                                                /*图片加载完成后设置背景，防止图片加载过慢导致没有背景*/
                                                this.playerBgDOM.style.backgroundImage = `url("${playBg}")`;
                                            }
                                        } />
                                    </div>
                                </div>
                                <div className="playing-lyric-wrapper">
                                    <div className="playing-lyric">
                                        {/* SP：奔跑怪物 */}
                                    </div>
                                </div>
                            </div>
                            <div className="middle-r">
                                <Scroll  ref="lyricList" >
                                    <div className="lyric-wrapper">
                                        <div>
                                            <p ref="lyricLine" className="text"> 
                                                我们之间 (《我站在桥上看风景》电视剧高甜宠爱插曲) - 冯提莫/孙子涵
                                            </p>
                                        </div>
                                    </div>
                                </Scroll>
                            </div>
                        </div>
                        <div className="bottom">
                            <div className="dot-wrapper">
                                {/* <span className="dot" style={this.state.currentShow === 'cd' ? {width:'20px',borderRadius:'5px',background:'#31c27c'}: {}}></span>
                                <span className="dot" style={this.state.currentShow === 'lyric' ? {width:'20px' +'px',borderRadius:'5px',background:'#31c27c'}: {}}></span> */}
                            </div>
                            <div className="progress-wrapper">
                                <span className="time time-l">{this.getPlayTime(this.state.currentTime)}</span>
                                <div className="progress-bar-wrapper">
                                    <ProgressBar 
                                        progress={this.state.playProgress}
                                        onDrag={this.handleDrag}
                                        onDragEnd={this.handleDragEnd}/>
                                </div>
                                <span className="time time-r">{this.getPlayTime(song.duration)}</span>
                            </div>
                            <div className="operators">
                                <div className="icon i-left" onClick={this.changePlayMode}>
                                    <Icon type={this.playModes[this.state.currentPlayMode]}/>
                                </div>
                                <div className="icon i-left c" onClick={this.previousPiece}>
                                    <Icon type="step-backward" />
                                </div>
                                <div className="icon i-center c co " onClick={this.SwitchPlayOrPause}>
                                    <Icon type={playButtonClass} />
                                </div>
                                <div className="icon i-right c" onClick={this.nextTrack}>
                                    <Icon type="step-forward" />
                                </div>
                                <div className="icon i-right" onClick={this.setFavorite(this.currentSong)}>
                                    {/* <Icon type="menu-fold" /> */}
                                    <Icon type={this.getFavoriteIcon(this.currentSong)} style={this.isFavorite(this.currentSong) === true ? {color:'#d93f30'} : {color:'#fff'}}/>
                                </div>
                            </div>
                        </div>
                    </div>
                </CSSTransition>

                <CSSTransition  timeout={300} classNames="player-rotate"
					onEnter={() => {
						this.playerDOM.style.display = "none";
					}}
					onExited={() => {
						this.playerDOM.style.display = "block";
					}} name="mini">
                    <div className="mini-player" style={isNotFullScreen} onClick={this.showPlayer} ref="miniPlayer">
                        <div className="mini-icon" ref="singerImgMini">
                            <img width="40" height="40" src={playBg}/>
                        </div>
                        <div className="text">
                            <h2 className="name">{song.name}</h2>
                            <p className="desc">{song.singer}</p>
                        </div>
                        <div className="control" onClick={this.SwitchPlayOrPause}>
                            <Icon type={playButtonClass} className="play-icon"/>
                        </div>
                        <div className="control" onClick={this.showPlayerList}>
                            <Icon type="list-menus" className="play-list"/>
                        </div>
                    </div>   
                </CSSTransition>

                <audio ref="audio" ></audio>
            </div>
        );
    }
}

export default Player;