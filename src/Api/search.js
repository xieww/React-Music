/**
 * 搜索页请求处理方法合集
 */
import jsonp from './getDataJsonp';
import {URL, commonParams, OPTION} from './config';

export function getHotKey() {
	const data = Object.assign({}, commonParams, {
		g_tk: 5381,
		uin: 0,
		platform: "h5",
		needNewCode: 1,
		notice: 0,
		_: new Date().getTime()
	});

	return jsonp(URL.hotkey, data, OPTION);
}

export function search(query, page, zhida, perpage) {
	const data = Object.assign({}, commonParams, {
        g_tk: 1928093487,
        w: query,
        p: page,
        perpage,
        n: perpage,
        catZhida: zhida ? 1 : 0,
        zhidaqu: 1,
        t: 0,
        flag: 1,
        ie: 'utf-8',
        sem: 1,
        aggr: 0,
        remoteplace: 'txt.mqq.all',
        uin: 0,
        platform: "h5",
        needNewCode: 1,
        notice:0,
        _: new Date().getTime()
        });
        
	return jsonp(URL.search, data, OPTION);
}

// export function search(keyword) {
// 	const data = Object.assign({}, commonParams, {
// 		g_tk: 5381,
// 		uin: 0,
	
// 		platform: "h5",
// 		needNewCode: 1,
// 		notice: 0,
// 		zhidaqu: 1,
// 		catZhida: 1,
// 		t: 0,
// 		flag: 1,
// 		ie: "utf-8",
// 		sem: 1,
// 		aggr: 0,
// 		perpage: 20,
// 		n: 20,
// 		p: 1,
// 		w: keyword,
// 		remoteplace: "txt.mqq.all",
// 		_: new Date().getTime()
// 	});

// 	return jsonp(URL.search, data, OPTION);
// }