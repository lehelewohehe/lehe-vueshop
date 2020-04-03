import {request} from '../../assets/js/utils/request.js'
import conf from '../../assets/js/conf/config.js'

// 左侧分类
export function getCategoryMenuData() {
	return request(conf.baseURL + '/home/category/menu?token=' + conf.token, 'get')
}

// 右侧商品
export function getCategoryShowData(cid) {
	// console.log(conf.baseURL + '/home/category/show?cid=' + cid +'&token=' + conf.token)
	return request(conf.baseURL + '/home/category/show?cid=' + cid +'&token=' + conf.token, 'get')
}


// 商品详情
export function getGoodsDetailsData(gid) {
	return request(conf.baseURL + '/home/goods/info?gid=' + gid + '&type=details&token=' + conf.token)
}

// 商品规格
export function getGoodsSpecData(gid) {
	return request(conf.baseURL + '/home/goods/info?gid=' + gid + '&type=spec&token=' + conf.token)
}
