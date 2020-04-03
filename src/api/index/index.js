import {request} from '../../assets/js/utils/request.js'
import conf from '../../assets/js/conf/config.js'

// 轮播图
export function getSwiperData() {
	console.log(conf.baseURL + '/home/index/slide?token=' + conf.token)
	return request(conf.baseURL + '/home/index/slide?token=' + conf.token, 'get')
}

// 快速导航
export function getNavData() {
	return request(conf.baseURL + '/home/index/nav?token=' + conf.token, 'get')
}

// 类别商品产品
export function getProductData() {
	return request(conf.baseURL + '/home/index/goodsLevel?token=' + conf.token, 'get')
}

// 推荐商品
export function getRecommendData() {
	return request(conf.baseURL + '/home/index/recom?token=' + conf.token, 'get')
}

