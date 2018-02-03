import {connect} from "react-redux"
import {showPlayer, changeSong, setSongs} from "../actions/actions"
import Album from "../../components/Album/AlbumDetail";

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

export default connect(null, mapDispatchToProps)(Album)
