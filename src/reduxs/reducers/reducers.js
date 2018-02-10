import { combineReducers } from 'redux';
import * as ActionTypes from "../actions/actionTypes";
// import localStorage from "../util/storage";
import {loadSearch, loadPlay, loadFavorite,saveSearch, clearSearch, deleteSearch, savePlay, saveFavorite, deleteFavorite} from '../../utils/localCache';
/**
 * reducer就是一个纯函数，接收旧的state和action，返回新的state
 */

 //需要存储的初始状态数据
const initialState = {
	showStatus: false,  //显示状态
	// song: localStorage.getCurrentSong(),  //当前歌曲
    // songs: localStorage.getSongs()  //歌曲列表
    song: [],
	songs: [],
	searchHistory: loadSearch(),
	// searchHistory: [],
	playHistory: loadPlay(),
};

//拆分Reducer

//显示或隐藏播放状态
function showStatus(showStatus = initialState.showStatus, action) {
	switch (action.type) {
		case ActionTypes.SHOW_PLAYER:
			return action.showStatus;
		default:
			return showStatus;
	}
}

//修改当前歌曲
function song(song = initialState.song, action) {
	switch (action.type) {
		case ActionTypes.CHANGE_SONG:
			// localStorage.setCurrentSong(action.song);
			savePlay(action.song);
			return action.song;
		default:
			return song;
	}
}

//添加或移除歌曲
function songs(songs = initialState.songs, action) {
	switch (action.type) {
		case ActionTypes.SET_SONGS:
			return action.songs;
		case ActionTypes.REMOVE_SONG_FROM_LIST:
			let newSongs = songs.filter(song => song.id !== action.id);
			return newSongs;
		case ActionTypes.REMOVE_ALLSONG_FROM_LIST:
			let newSongss = songs.splice(0);
			return songs;
		default:
			return songs;
	}
}

function searchHistory(searchHistory = initialState.searchHistory, action) {
	switch (action.type) {
		case ActionTypes.SET_SEARCH_HISTORY:
			let newSaveHistory = saveSearch(action.history);
			// console.log('保存搜索',newSaveHistory);
			return newSaveHistory;
		case ActionTypes.DELETE_SEARCH_HISTORY:
			let newSearch = deleteSearch(action.history);
			console.log('删除搜索',newSearch);
			return newSearch;
		case ActionTypes.CLEAR_SEARCH_HISTORY:
			let newSearchs = clearSearch();
			console.log('清空搜索',newSearchs);
			return newSearchs;
		default:
			return searchHistory;
	}
}


//合并Reducer
const reducer = combineReducers({
	showStatus,
	song,
	songs,
	searchHistory
});

export default reducer