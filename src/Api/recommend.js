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
    const url = '/api/getDiscDetail'
    const data = Object.assign({}, commonParams, {
      disstid,
      type: 1,
      json: 1,
      utf8: 1,
      onlysong: 0,
      platform: 'yqq',
      hostUin: 0,
      needNewCode: 0,
      format: 'json'
    })
  
    return axios.get(url, {
      params: data
    }).then((res) => {
      return Promise.resolve(res.data)
    })
  }
 
  // export function getSongList(disstid) {
  //   const url = 'http://ustbhuangyi.com/music/api/getCdInfo';
  //   const data = Object.assign({}, commonParams, {
  //     g_tk: 1928093487,
  //     disstid,
  //     type: 1,
  //     json: 1,
  //     utf8: 1,
  //     onlysong: 0,
  //     platform: 'yqq',
  //     hostUin: 0,
  //     needNewCode: 0
  //   })
  
  //   return jsonp(url, data, OPTION)
  // }

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


   // 热门歌单详情 http://ustbhuangyi.com/music/api/getCdInfo?g_tk=1928093487&inCharset=utf-8&outCharset=utf-8&notice=0&format=jsonp&disstid=3245155185&type=1&json=1&utf8=1&onlysong=0&platform=yqq&hostUin=0&needNewCode=0
  //  g_tk:1928093487
  //  inCharset:utf-8
  //  outCharset:utf-8
  //  notice:0
  //  format:jsonp
  //  disstid:3245155185
  //  type:1
  //  json:1
  //  utf8:1
  //  onlysong:0
  //  platform:yqq
  //  hostUin:0
  //  needNewCode:0  


//https://u.y.qq.com/cgi-bin/musicu.fcg?callback=recom3477297233556247&g_tk=1278911659&jsonpCallback=recom3477297233556247&loginUin=0&hostUin=0&format=jsonp&inCharset=utf8&outCharset=utf-8%C2%ACice=0&platform=yqq&needNewCode=0&data={%22comm%22:{%22ct%22:24},%22category%22:{%22method%22:%22get_hot_category%22,%22param%22:{%22qq%22:%22%22},%22module%22:%22music.web_category_svr%22},%22recomPlaylist%22:{%22method%22:%22get_hot_recommend%22,%22param%22:{%22async%22:1,%22cmd%22:2},%22module%22:%22playlist.HotRecommendServer%22},%22playlist%22:{%22method%22:%22get_playlist_by_category%22,%22param%22:{%22id%22:8,%22curPage%22:1,%22size%22:40,%22order%22:5,%22titleid%22:8},%22module%22:%22playlist.PlayListPlazaServer%22},%22new_song%22:{%22module%22:%22QQMusic.MusichallServer%22,%22method%22:%22GetNewSong%22,%22param%22:{%22type%22:0}},%22new_album%22:{%22module%22:%22QQMusic.MusichallServer%22,%22method%22:%22GetNewAlbum%22,%22param%22:{%22type%22:0,%22category%22:%22-1%22,%22genre%22:0,%22year%22:1,%22company%22:-1,%22sort%22:1,%22start%22:0,%22end%22:39}},%22toplist%22:{%22module%22:%22music.web_toplist_svr%22,%22method%22:%22get_toplist_index%22,%22param%22:{}},%22focus%22:{%22module%22:%22QQMusic.MusichallServer%22,%22method%22:%22GetFocus%22,%22param%22:{}}}
 //热门歌单列表 http://ustbhuangyi.com/music/api/getDiscList?g_tk=1928093487&inCharset=utf-8&outCharset=utf-8&notice=0&format=json&platform=yqq&hostUin=0&sin=0&ein=29&sortId=5&needNewCode=0&categoryId=10000000&rnd=0.746839738691716
// g_tk:1928093487
// inCharset:utf-8
// outCharset:utf-8
// notice:0
// format:json
// platform:yqq
// hostUin:0
// sin:0
// ein:29
// sortId:5
// needNewCode:0
// categoryId:10000000
// rnd:0.746839738691716