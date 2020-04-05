import {request} from '../../assets/js/utils/request.js'
import conf from '../../assets/js/conf/config.js'

// 获取所有订单
export function getOrderAllData({uid, status, page}) {
	return request(`${conf.baseURL}/user/myorder/index?uid=${uid}&status=${status}&token=${conf.token}&page=${page}`)
}

// 
export function getOrderReviewData({uid, page}) {
	return request(`${conf.baseURL}/user/myorder/reviewOrder?uid=${uid}&page=1&token=${conf.token}&page=${page}`)
}