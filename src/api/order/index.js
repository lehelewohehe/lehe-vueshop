import {request} from '../../assets/js/utils/request.js'
import conf from '../../assets/js/conf/config.js'

// 获取所有订单
export function getOrderAllData({uid, status, page}) {
	return request(`${conf.baseURL}/user/myorder/index?uid=${uid}&status=${status}&token=${conf.token}&page=${page}`)
}

// 获取待评论的订单
export function getOrderReviewData({uid, page}) {
	return request(`${conf.baseURL}/user/myorder/reviewOrder?uid=${uid}&page=1&token=${conf.token}&page=${page}`)
}

// 订单详情
export function getOrderDetailsData({uid, ordernum}) {
	return request(`${conf.baseURL}/user/myorder/desc?uid=${uid}&ordernum=${ordernum}&token=${conf.token}`)
}

// 获取评论项目选项
export function getCommentItemData() {
	return request(`${conf.baseURL}/home/reviews/service?token=${conf.token}`)
}

// 提交评论
export function uploadCommentData(data) {
	return request(`${conf.baseURL}/home/reviews/add?token=${conf.token}`, 'post', data)
}

// 取消订单
export function cancelOrderData({uid, ordernum}) {
	return request(`${conf.baseURL}/user/myorder/clearorder?uid=${uid}&ordernum=${ordernum}&token=${conf.token}`)
}

// 确认收货
export function confirmGetterData({uid, ordernum}) {
	return request(`${conf.baseURL}/user/myorder/finalorder?uid=${uid}&ordernum=${ordernum}&token=${conf.token}`)
}