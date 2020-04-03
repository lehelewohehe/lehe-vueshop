import {request} from '../../assets/js/utils/request.js'
import conf from '../../assets/js/conf/config.js'

// 热门搜索关键词
export function getHotwordsData() {
	return request(conf.baseURL + '/home/public/hotwords?token=' + conf.token, 'get')
}

// 获取搜索页面属性参数
export function getSearchParamsData(key) {
	console.log(conf.baseURL + '/home/goods/param?kwords=' +key + '&token=' + conf.token)
	return request(conf.baseURL + '/home/goods/param?kwords=' +key + '&token=' + conf.token, 'get')
}

// 产品搜索结果
export function getSearchResultData(data) {
	let str = ''
	if(data) {
		for(let key in data) {
			str += key + '=' +data[key] + '&'
		}
	}
	return request(conf.baseURL + '/home/goods/search?' + str + 'token=' + conf.token)
}