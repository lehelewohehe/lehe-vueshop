import {request} from '../../assets/js/utils/request.js'
import conf from '../../assets/js/conf/config.js'

// 地址列表
export function getAddressAllData({uid}) {
	return request(`${conf.baseURL}/user/address/index?uid=${uid}&token=${conf.token}`)
}