import originJsonp from "jsonp";

/**
 * @description 在jsonp原有基础上再次封装jsonp
 * @author xieww
 * @param {*} url 
 * @param {*} data 
 * @param {*} option 
 */
let getDataJsonp = (url, data, option) => {
	return new Promise((resolve, reject) => {
		originJsonp(dealUrl(url, data), option, (err, data) => {
			if (!err) {
				resolve(data);
			} else {
				reject(err);
			}
		});
	});
};

/**@description 处理url
 * @author xieww
 * @param {*} url 
 * @param {*} data 
 */
function dealUrl(url,data) {
    let params = '';
    for (const key in data) {
        let value = data[key] !== undefined ? data[key] : '';
        params += `&${key}=${encodeURIComponent(value)}`;
    }
    params = params ? params.substring(1) : '';
    return url += (url.indexOf('?') < 0 ? '?' : '&') + params;
    
};

export default getDataJsonp;