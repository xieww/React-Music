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
	favoriteHistory: loadFavorite(),
};

//拆分Reducer

/**
 * @author xieww
 * @description 显示或隐藏播放状态
 * @param {*} showStatus 
 * @param {*} action 
 */
function showStatus(showStatus = initialState.showStatus, action) {
	switch (action.type) {
		case ActionTypes.SHOW_PLAYER:
			return action.showStatus;
		default:
			return showStatus;
	}
}

/**
 * @author xieww
 * @description 重置当前播放的歌曲
 * @param {*} song 
 * @param {*} action 
 */
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

/**
 * @author xieww
 * @description 对歌曲进行删除，添加操作
 * @param {*} songs 
 * @param {*} action 
 */
function songs(songs = initialState.songs, action) {
	switch (action.type) {
		case ActionTypes.SET_SONGS:
			return action.songs;
		case ActionTypes.REMOVE_SONG_FROM_LIST:
			let newSongs = songs.filter(song => song.id !== action.id);
			return newSongs;
		case ActionTypes.REMOVE_ALLSONG_FROM_LIST:
			songs.splice(0);
			return songs;
		default:
			return songs;
	}
}
/**
 * @author xieww
 * @description 对播放历史进行保存、删除、清空
 * @param {*} searchHistory 
 * @param {*} action 
 */
function searchHistory(searchHistory = initialState.searchHistory, action) {
	switch (action.type) {
		case ActionTypes.SET_SEARCH_HISTORY:
			let newSaveHistory = saveSearch(action.history);
			return newSaveHistory;
		case ActionTypes.DELETE_SEARCH_HISTORY:
			let newSearch = deleteSearch(action.history);
			return newSearch;
		case ActionTypes.CLEAR_SEARCH_HISTORY:
			let newSearchs = clearSearch();
			return newSearchs;
		default:
			return searchHistory;
	}
};


function favoriteHistory(favoriteHistory = initialState.favoriteHistory, action) {
	switch (action.type) {
		case ActionTypes.SET_FAVORITE_LIST:
			let newFavoriteHistory = saveFavorite(action.list);
			return newFavoriteHistory;
		case ActionTypes.DELETE_FAVORITE_LIST:
			let newFavorite = deleteFavorite(action.list);
			return newFavorite;
		default:
			return favoriteHistory;
	}
}


//合并Reducer
const reducer = combineReducers({
	showStatus,
	song,
	songs,
	searchHistory,
	favoriteHistory
});

export default reducer