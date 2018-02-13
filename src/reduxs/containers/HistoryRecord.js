import {connect} from "react-redux";
import {changeSong, removeSong, removeALLSong, showPlayer, setSongs, saveSearch, deleteSearch, clearSearch} from "../actions/actions";
import HistoryRecord from "../../components/common/HistoryRecord/HistoryRecord";
import {loadSearch, loadPlay} from '../../utils/localCache';

//映射Redux全局的state到组件的props上
const mapStateToProps = (state) => ({
	currentSong: state.song,
	playSongs: state.songs,
	playHistory: loadPlay(),
	searchHistory: state.searchHistory
});

//映射dispatch到props上
const mapDispatchToProps = (dispatch) => ({
	changeCurrentSong: (song) => {
		dispatch(changeSong(song));
	},
	removeSong: (id) => {
		dispatch(removeSong(id));
	},
	removeALLSong: (id) => {
		dispatch(removeALLSong(id));
	},
	showMusicPlayer: (status) => {
		dispatch(showPlayer(status));
	},
	setSongs: (songs) => {
		dispatch(setSongs(songs));
	},
	saveSearch: (history) => {
		dispatch(saveSearch(history));
	},
	deleteSearch: (history) => {
		dispatch(deleteSearch(history));
	},
	clearSearch: (history) => {
		dispatch(clearSearch(history));
	}
});

//将ui组件包装成容器组件
export default connect(mapStateToProps, mapDispatchToProps)(HistoryRecord)