import {connect} from "react-redux";
import {changeSong,showPlayer, setSongs} from "../actions/actions";
import UserCenter from "../../components/UserCenter/UserCenter";
import {loadPlay} from '../../utils/localCache';

//映射Redux全局的state到组件的props上
const mapStateToProps = (state) => ({
	currentSong: state.song,
	playSongs: state.songs,
	playHistory: loadPlay(),
    favoriteHistory: state.favoriteHistory,
});

//映射dispatch到props上
const mapDispatchToProps = (dispatch) => ({
	changeCurrentSong: (song) => {
		dispatch(changeSong(song));
	},
	showMusicPlayer: (status) => {
		dispatch(showPlayer(status));
	},
	setSongs: (songs) => {
		dispatch(setSongs(songs));
	},
});

//将ui组件包装成容器组件
export default connect(mapStateToProps, mapDispatchToProps)(UserCenter)