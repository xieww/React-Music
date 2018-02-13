import {connect} from "react-redux"
import {showPlayer, changeSong, setSongs, saveSearch, deleteSearch, clearSearch} from "../actions/actions"
import Search from "../../components/SearchPage/SearchPage";

// import {loadSearch, loadPlay, loadFavorite} from '../../utils/localCache';

//映射Redux全局的state到组件的props上
const mapStateToProps = (state) => ({
	currentSong: state.song,
	playSongs: state.songs,
	// searchHistory: loadSearch(), //搜索历史
	searchHistory: state.searchHistory, //搜索历史
});

//映射dispatch到props上
const mapDispatchToProps = (dispatch) => ({
	showMusicPlayer: (status) => {
		dispatch(showPlayer(status));
	},
	changeCurrentSong: (song) => {
		dispatch(changeSong(song));
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

export default connect(mapStateToProps, mapDispatchToProps)(Search)
