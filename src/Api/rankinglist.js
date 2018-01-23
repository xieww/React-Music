/**
 * 排行榜请求处理方法合集
 */
import jsonp from './getDataJsonp';
import {URL, commonParams, OPTION} from './config';

export function getTopList() {
 
  const data = Object.assign({}, commonParams, {
    uin: 0,
    needNewCode: 1,
    platform: 'h5'
  })

  return jsonp(URL.rankingList, data, OPTION)
}

export function getMusicList(topid) {

  const data = Object.assign({}, commonParams, {
    topid,
    needNewCode: 1,
    uin: 0,
    tpl: 3,
    page: 'detail',
    type: 'top',
    platform: 'h5'
  })

  return jsonp(URL.rankingInfo, data, OPTION)
}
