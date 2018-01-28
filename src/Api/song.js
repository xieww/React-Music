import jsonp from './getDataJsonp';
import {URL, commonParams, OPTION} from './config';
import axios from 'axios'

/**
 * @author xieww
 * @description 获取歌词
 * @param {*} mid 
 */
export function getLyric(mid) {
  const url = '/api/lyric'

  const data = Object.assign({}, commonParams, {
    songmid: mid,
    platform: 'yqq',
    hostUin: 0,
    needNewCode: 0,
    categoryId: 10000000,
    pcachetime: +new Date(),
    format: 'json'
  })

  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
};

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
	return jsonp(URL.songVkey, data, OPTION);
};
