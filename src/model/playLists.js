/**
 * @description 创建歌单模型
 */
export class PlayList {
    constructor(id,name,createtime,listennum,imgurl,encrypt_uin,createrName,QQ) {
        this.id = id;
        this.name = name;
        this.createtime = createtime;
        this.listennum = listennum;
        this.imgurl = imgurl;
        this.encrypt_uin = encrypt_uin;
        this.createrName = createrName;
        this.createrQQ = QQ;
    }
}

/**
 * @description 通过歌单列表数据创建歌单列表对象函数
 * @param {*} data 
 */
export function getPlayList(data) {
    return new PlayList(
        data.dissid,
        data.dissname,
        data.createtime,
        data.listennum,
        data.imgurl,
        data.creater.encrypt_uin,
        data.creater.name,
        data.creater.qq
    )
}

// export function getPlayListDetail(data){
//     return new 
// }