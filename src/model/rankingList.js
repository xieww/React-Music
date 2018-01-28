import * as SongModel from "./song";
/**
 * 排行榜类模型
 */
export class Ranking {
	constructor(id, title, img, songs, listenCount) {
		this.id = id;
		this.title = title;
		this.img = img;
		this.songs = songs;
		this.listenCount = listenCount;
	}
}

/*
 * 通过排行榜列表创建排行榜对象函数
 */
export function createRankingByList(data) {
	const songList = [];
	data.songList.forEach(item => {
		
		songList.push(new SongModel.Song(0, "", item.songname, "", 0, "", item.singername));
	});
	return new Ranking (
		data.id,
		data.topTitle,
		data.picUrl,
		songList,
		changeNumber(data.listenCount)
	);
}

/*
 * 通过排行榜详情创建排行榜对象函数
 */
export function createRankingByDetail(data) {
	return new Ranking (
		data.topID,
		data.ListName,
		data.pic_v12,
		[],
		''
	);
};

/**
 * @author xieww
 * @description 处理排行榜播放量方法
 * @param {*} counts 
 */
function changeNumber(counts) {
	
	let newCount = "";
	let str = counts.toString();
	let len = str.length;
	let intNumber = str.slice(0,len-4);
	
	if (len > 4) {
		let count = str.slice(-4).slice(0,1);
		let temp = parseInt(count);
		if (count == 0) {
			newCount = intNumber + '万';
		} else {
			newCount = intNumber + '.' + count + '万';
		}
	}
	return newCount;
}

// let num = 19100000;
// function toThousands(num) {
//     var num = (num || 0).toString(), result = '';
//     while (num.length > 4) {
// 		result = '.' + num.slice(-4) + result;
// 		console.log('num.slice(-4)=' + num.slice(-4));
//         num = num.slice(0, num.length - 4);
//     }
// 	if (num) { result = num + result; }
// 	console.log(result);
//     return result;
// }
// toThousands(num);