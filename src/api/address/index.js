import {request} from '../../assets/js/utils/request.js'
import conf from '../../assets/js/conf/config.js'

// 获取所有地址列表
export function getAddressAllData({uid}) {
	return request(`${conf.baseURL}/user/address/index?uid=${uid}&token=${conf.token}`)
}

// 获取一条地址列表
export function getAddressOneData({uid, aid}) {
	return request(`${conf.baseURL}/user/address/info?uid=${uid}&aid=${aid}token=${conf.token}`)
}

// 添加地址列表
export function addAddressOneData(data) {
	return request(`${conf.baseURL}/user/address/add?token=${conf.token}`, 'post', data)
}

// 修改地址
export function modAddressOneData(data) {
	return request(`${conf.baseURL}/user/address/mod?token=${conf.token}`, 'post', data)
}

// 修改地址
export function delAddressOneData({uid, aid}) {
	return request(`${conf.baseURL}/user/address/del?uid=${uid}&aid=${aid}&token=${conf.token}`)
}