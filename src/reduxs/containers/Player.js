import {connect} from "react-redux";
import {showPlayer, changeSong, saveFavorite, deleteFavorite} from "../actions/actions";
import Player from "../../components/common/Player/Player";
import {loadSearch, loadPlay, loadFavorite} from '../../utils/localCache';

//映射Redux全局的state到组件的props上
const mapStateToProps = (state) => ({
	showStatus: state.showStatus,
	currentSong: state.song,
	playSongs: state.songs,
	playHistory: loadPlay(),
	favoriteHistory: state.favoriteHistory,
});

//映射dispatch到props上
const mapDispatchToProps = (dispatch) => ({
	showMusicPlayer: (status) => {
		dispatch(showPlayer(status));
	},
	changeCurrentSong: (song) => {
		dispatch(changeSong(song));
	},
	saveFavorite: (list) => {
		dispatch(saveFavorite(list));
	},
	deleteFavorite: (list) => {
		dispatch(deleteFavorite(list));
	}
});

//将ui组件包装成容器组件
export default connect(mapStateToProps, mapDispatchToProps)(Player)