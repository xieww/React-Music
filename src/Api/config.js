/**
 * 定义请求的常量信息
 */
const URL = {
  /*推荐轮播*/
  carousel:
    "https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg",
  /*最新专辑*/
  //newalbum: "https://c.y.qq.com/v8/fcg-bin/album_library",
  newalbum: "https://u.y.qq.com/cgi-bin/musicu.fcg",
  /*专辑信息*/
  albumInfo: "https://c.y.qq.com/v8/fcg-bin/fcg_v8_album_info_cp.fcg",
  /*排行榜*/
  rankingList: "https://c.y.qq.com/v8/fcg-bin/fcg_myqq_toplist.fcg",
  /*排行榜详情*/
  rankingInfo: "https://c.y.qq.com/v8/fcg-bin/fcg_v8_toplist_cp.fcg",
  /*搜索*/
  search: "https://c.y.qq.com/soso/fcgi-bin/search_for_qq_cp",
  /*热搜*/
  hotkey: "https://c.y.qq.com/splcloud/fcgi-bin/gethotkey.fcg",
  /*歌手列表*/
  singerList: "https://c.y.qq.com/v8/fcg-bin/v8.fcg",
  /*歌手详情*/
  singerInfo: "https://c.y.qq.com/v8/fcg-bin/fcg_v8_singer_track_cp.fcg",
  /*歌曲vkey*/
  songVkey: "https://c.y.qq.com/base/fcgi-bin/fcg_music_express_mobile3.fcg",
  /*热门歌单详情*/
  hotsongList: "https://c.y.qq.com/qzone/fcg-bin/fcg_ucc_getcdinfo_byids_cp.fcg"
};

const commonParams = {
  format: "jsonp",
  inCharset: "utf-8",
  outCharset: "utf-8",
  notice: 0
};

const OPTION = {
  param: "jsonpCallback",
  prefix: "callback"
};

const CODE_SUCCESS = 0;

const singerType = [
  {
    key: "all_all",
    name: "全部"
  },
  {
    key: "cn_man",
    name: "华语男"
  },
  {
    key: "cn_woman",
    name: "华语女"
  },
  {
    key: "cn_team",
    name: "华语组合"
  },
  {
    key: "k_man",
    name: "韩国男"
  },
  {
    key: "k_woman",
    name: "韩国女"
  },
  {
    key: "k_team",
    name: "韩国组合"
  },
  {
    key: "j_man",
    name: "日本男"
  },
  {
    key: "j_woman",
    name: "日本女"
  },
  {
    key: "j_team",
    name: "日本组合"
  },
  {
    key: "eu_man",
    name: "欧美男"
  },
  {
    key: "eu_woman",
    name: "欧美女"
  },
  {
    key: "eu_team",
    name: "欧美组合"
  },
  {
    key: "other_other",
    name: "其它"
  }
];

const Indexs = [
  { key: "all", name: "热门" },
  { key: "A", name: "A" },
  { key: "B", name: "B" },
  { key: "C", name: "C" },
  { key: "D", name: "D" },
  { key: "E", name: "E" },
  { key: "F", name: "F" },
  { key: "G", name: "G" },
  { key: "H", name: "H" },
  { key: "I", name: "I" },
  { key: "J", name: "J" },
  { key: "K", name: "K" },
  { key: "L", name: "L" },
  { key: "M", name: "M" },
  { key: "N", name: "N" },
  { key: "O", name: "O" },
  { key: "P", name: "P" },
  { key: "Q", name: "Q" },
  { key: "R", name: "R" },
  { key: "S", name: "S" },
  { key: "T", name: "T" },
  { key: "U", name: "U" },
  { key: "V", name: "V" },
  { key: "W", name: "W" },
  { key: "X", name: "X" },
  { key: "Y", name: "Y" },
  { key: "Z", name: "Z" }
];

export { URL, commonParams, OPTION, CODE_SUCCESS, singerType, Indexs };
