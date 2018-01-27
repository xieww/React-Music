import {getLyric} from '../Api/song';
import {CODE_SUCCESS} from '../Api/config';
import {Base64} from 'js-base64';

/**
 *  歌曲类模型
 */
export class Song {

	constructor(id, mId, name, img, duration, url, singer, album, isonly, albumdesc) {
		this.id = id;
		this.mId = mId;
		this.name = name;
		this.img = img;
		this.duration = duration;
		this.url = url;
		this.singer = singer;
		this.album = album;
		this.isonly = isonly;
		this.albumdesc = albumdesc;
	}

	getLyric() {
		if (this.lyric) {
		return Promise.resolve(this.lyric)
		}

		return new Promise((resolve, reject) => {
		getLyric(this.mid).then((res) => {
			if (res.retcode === CODE_SUCCESS) {
			this.lyric = Base64.decode(res.lyric)
			resolve(this.lyric)
			} else {
			reject('no lyric')
			}
		})
		})
	}
}

/**
 *  创建歌曲对象函数
 */
export function createSong(data) {
	return new Song(
		data.songid,
		data.songmid,
		data.songname,
		`http://y.gtimg.cn/music/photo_new/T002R300x300M000${data.albummid}.jpg?max_age=2592000`,
		data.interval,
		`http://ws.stream.qqmusic.qq.com/${data.songid}.m4a?fromtag=46`,
		filterSinger(data.singer),
		data.albumname,
		data.isonly,
		data.albumdesc,
	);
}

function filterSinger(singers) {
	let singerArray = singers.map(singer => {
		return singer.name;
	});
	return singerArray.join("/");
}