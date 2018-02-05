import {connect} from "react-redux"
import {showPlayer, changeSong, setSongs} from "../actions/actions"
import Disc from "../../components/DiscList/DiscListDetail";

//映射Redux全局的state到组件的props上
const mapStateToProps = (state) => ({
	currentSong: state.song,
	playSongs: state.songs
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
	}
});

export default connect(mapStateToProps, mapDispatchToProps)(Album)
