import {request} from '../../assets/js/utils/request.js'
import conf from '../../assets/js/conf/config.js'


// 商品评论
export function getGoodsCommentData({gid, page}) {
	return request(conf.baseURL + `/home/reviews/index?gid=${gid}&page=${page}&token=` + conf.token)
}