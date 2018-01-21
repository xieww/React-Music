/**
 * 推荐页请求处理方法合集
 */
import jsonp from './getDataJsonp';
import {URL, commonParams, OPTION} from './config';
import axios from 'axios';

/**
 * @description 获取推荐页轮播图等信息
 */
export function getCarouseList() {
    const data = Object.assign({}, commonParams, {
        platform: 'h5',
        uin: 0,
        needNewCode: 1,
        _: new Date().getTime()
    });
    return jsonp(URL.carousel,data,OPTION);
}

/**
 * @author xieww
 * @description 获取歌单信息
 */
export function getDiscList() {
    const url = '/api/getDiscList'
  
    const data = Object.assign({}, commonParams, {
      platform: 'yqq',
      hostUin: 0,
      sin: 0,
      ein: 29,
      sortId: 5,
      needNewCode: 0,
      categoryId: 10000000,
      rnd: Math.random(),
      format: 'json'
    })
  
    return axios.get(url, {
      params: data
    }).then((res) => {
      return Promise.resolve(res.data)
    })
  }
/**
 * @author xieww
 * @description 获取歌单详情信息
 * @param {*} disstid 
 */
  export function getSongList(disstid) {
    const url = 'https://c.y.qq.com/qzone/fcg-bin/fcg_ucc_getcdinfo_byids_cp.fcg'
  
    const data = Object.assign({}, commonParams, {
      disstid,
      type: 1,
      json: 1,
      utf8: 1,
      onlysong: 0,
      platform: 'yqq',
      hostUin: 0,
      needNewCode: 0
    })
  
    return jsonp(url, data, OPTION)
  }

  /**
   * @author xieww
   * @description 获取最新专辑信息
   */
  export function getNewAlbum() {
    const data = Object.assign({}, commonParams, {
      g_tk: 1278911659,
      hostUin: 0,
      platform: "yqq",
      needNewCode: 0,
      data: `{"albumlib":
      {"method":"get_album_by_tags","param":
      {"area":1,"company":-1,"genre":-1,"type":-1,"year":-1,"sort":2,"get_tags":1,"sin":0,"num":50,"click_albumid":0},
      "module":"music.web_album_library"}}`
    });
    const option = {
      param: "callback",
      prefix: "callback"
    };
    return jsonp(URL.newalbum, data, option);
  }
  
  /**
   * @author xieww
   * @description 获取专辑详细信息
   * @param {*} albumMid 
   */
  export function getAlbumInfo(albumMid) {
    const data = Object.assign({}, commonParams, {
      albummid: albumMid,
      g_tk: 1278911659,
      hostUin: 0,
      platform: "yqq",
      needNewCode: 0
    });
    return jsonp(URL.albumInfo, data, OPTION);
  }