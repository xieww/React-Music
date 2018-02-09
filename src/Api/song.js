import jsonp from './getDataJsonp';
import {URL, commonParams, OPTION} from './config';
import axios from 'axios'

/**
 * @author xieww
 * @description 获取歌词
 * @param {*} mid 
 */
// export function getLyric(mid) {
//   const url = '/api/lyric'

//   const data = Object.assign({}, commonParams, {
//     songmid: mid,
//     platform: 'yqq',
//     hostUin: 0,
//     needNewCode: 0,
//     categoryId: 10000000,
//     pcachetime: +new Date(),
//     format: 'json'
//   })

//   return axios.get(url, {
//     params: data
//   }).then((res) => {
//     return Promise.resolve(res.data)
//   })
// };

export function getLyric(mid) {
  const url = 'http://ustbhuangyi.com/music/api/lyric';
  const data = Object.assign({}, commonParams, {
		g_tk:1928093487,
		format:'json',
		songmid:mid,
		platform:'yqq',
		hostUin:0,
		needNewCode:0,
		categoryId:10000000,
		pcachetime:+new Date(),
  })

	return jsonp(url, data, OPTION);
};

// export function getLyric() {
//   const url = '/api/lyricData';
// //'https://c.y.qq.com/lyric/fcgi-bin/fcg_query_lyric.fcg?nobase64=1&musicid=212846371&callback=jsonp1&g_tk=5381&jsonpCallback=jsonp1&loginUin=0&hostUin=0&format=jsonp&inCharset=utf8&outCharset=utf-8&notice=0&platform=yqq&needNewCode=0'
//   const data = Object.assign({}, commonParams, {
// 		nobase64:1,
// 		musicid:212846371,
// 		g_tk:5381,
// 		loginUin:0,
// 		hostUin:0,
// 		notice:0,
// 		platform:'yqq',
// 		needNewCode:0,
// 		format: 'json',
// 		callback:'jsonp1',
// 		jsonpCallback:'jsonp1'
//   })

// 	  return axios.get(url, {
// 			params: data,
// 		}).then((res) => {
// 			console.log('res',res);
// 			return Promise.resolve(res.data)
// 		})
// };

/**
 * @author xieww
 * @description 
 * @param {*} songMid 
 */
export function getSongVKey(songMid) {
	const data = Object.assign({}, commonParams, {
		g_tk: 1278911659,
		hostUin: 0,
		platform: "yqq",
		needNewCode: 0,
		cid: 205361747,
		uin: 0,
		songmid: songMid,
		filename: `C400${songMid}.m4a`,
		guid: 3655047200
	});
	const option = {
		param: "callback",
		prefix: "callback"
	};
	return jsonp(URL.songVkey, data, option);
};
