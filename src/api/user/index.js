import {request} from '../../assets/js/utils/request.js'
import conf from '../../assets/js/conf/config.js'

// 会员登录
export function loginData(data) {
	return request(conf.baseURL + '/home/user/pwdlogin?token=' + conf.token, 'post', data)
}

// 安全退出
export function safeExitData(data) {
	return request(conf.baseURL + '/home/user/safeout?token=' + conf.token, 'post', data)
}

// 用户信息
export function getUserInfoData({uid}) {
	return request(conf.baseURL + `/user/myinfo/userinfo/uid/${uid}?token=` + conf.token)
}

// 安全验证
export function isSafeLoginData(data) {
	return request(conf.baseURL + '/home/user/safe?token=' + conf.token, 'post', data)
}

// 修改会员信息
export function updateUserInfoData(data) {
	return request(conf.baseURL + '/user/myinfo/updateuser?token=' + conf.token, 'post', data)
}

// 头像上传
export function uploadAvatarData(data) {
	return request(conf.baseURL + '/user/myinfo/formdatahead?token=' + conf.token, 'file', data)
}

// 修改密码
export function modPasswordData(data) {
	return request(conf.baseURL + '/home/user/modpwd?token=' + conf.token, 'post', data)
}

// 我的收藏
export function getMyFavoriteData({uid, page}) {
	return request(conf.baseURL + `/user/fav/index?uid=${uid}&token=${conf.token}&page=${page}`)
}

// 删除收藏
export function deleteMyFavoriteData({uid, fid}) {
	return request(conf.baseURL + `/user/fav/del?uid=${uid}&token=${conf.token}&fid=${fid}`)
}

// 添加收藏
export function addMyFavoriteData({uid, gid}) {
	return request(`${conf.baseURL}/goods/fav?uid=${uid}&gid=${gid}&token=${conf.token}`, 'get')
}

// 修改绑定手机号
export function updateCellPhoneData(data) {
	return request(`${conf.baseURL}/user/myinfo/updatecellphone?token=${conf.token}`, 'post', data)
}