<template>
    <div class="page">
        <div class="goods-info">
            <div class="goods-banner">
                <my-banner :swipers="$parent.goodsDetails.images"></my-banner>
            </div>
            <div class="goods-description">
                <div class="goods-title">{{ $parent.goodsDetails.title }}</div>
                <div class="goods-price">¥{{ $parent.goodsDetails.price }}</div>
                <div class="goods-sales">
                    <div class="goods-money">快递：{{ $parent.goodsDetails.freight }}元</div>
                    <div class="goods-num">月销量{{ $parent.goodsDetails.sales }}件</div>
                </div>
            </div>
        </div>
        <div class="goods-comment">
            <div class="comment-header">商品评价（{{ pageInfo.total }}）</div>
            <div class="comment-list">
                <template v-if="goodsComment.length !== 0">
                    <div class="comment-item" v-for="(item, index) in goodsComment" :key="index">
                        <div class="comment-user">
                            <div class="comment-image"><img :src="item.head" alt=""></div>
                            <div class="comment-name">{{ item.nickname }}</div>
                        </div>
                        <div class="comment-content">{{ item.content }}</div>
                        <div class="comment-time">{{ item.times }}</div>
                    </div>
                </template>
                <div v-else class="no-data">暂无评论</div>
            </div>
            <div class="more-comment">
                <my-button class="more" @click="goReviewRouter('/goods/details/review?gid=' + $route.query.gid)">查看更多评论</my-button>
            </div>
        </div>
    </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'
import Vue from 'vue'
import button from '../../../components/button/index'
import banner from '../../../components/banner/index'
Vue.use(button)
Vue.use(banner)
export default {
    created() {
        this.getGoodsComment({ gid: this.$route.query.gid, page: 1 ,success: () => {
        	this.$nextTick(() => {
        		this.$parent.myScroll.refresh()
        	})
        }})
    },
    methods: {
        ...mapActions({
            getGoodsComment: 'review/getGoodsComment'
        }),
        goReviewRouter(url) {
            this.$parent.toggleRouter(url)
        }
    },
    computed: {
        ...mapState({
            goodsComment: state => state.review.goodsComment,
            pageInfo: state => state.review.pageInfo
        })
    }
}
</script>
<style scoped>
.page {
    background-color: #f5f5f9;
}

.goods-info {
    width: 100%;
    background-color: #FFF;
}

.goods-info .goods-banner {
    width: 100%;
    height: 7rem;
}

.goods-info .goods-banner img {
    width: 100%;
    height: 100%;
}

.goods-info .goods-description {
    height: 1.84rem;
    padding: 0.5rem 0.375rem;
}

.goods-info .goods-description .goods-title {
    font-size: 0.28rem;
}

.goods-info .goods-description .goods-price {
    font-size: 0.32rem;
    color: #f93036;
    margin-top: .2rem;
}

.goods-info .goods-description .goods-sales {
    font-size: 0.24rem;
    margin-top: .2rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #969696;
}

.goods-comment {
    margin-top: 0.5rem;
    background-color: #FFF;
    padding-top: 1px;
}

.goods-comment .comment-header {
    color: #7b7f82;
    font-size: .32rem;
    width: 90%;
    margin: 0 auto;
    margin-top: .2rem;
}

.comment-list {
    width: 90%;
    margin: 0 auto;
}

.comment-list .comment-item {
    width: 100%;
    margin-top: .4rem;
    font-size: 0.28rem;
    color: #000;
}

.no-data {
	width: 100%;
	text-align: center;
	margin-top: 0.2rem;
    font-size: 0.32rem;
}

.comment-list .comment-item .comment-user {
    height: 0.6rem;
    display: flex;
    justify-content: flex-start;
    align-items: center;
}

.comment-item .comment-user .comment-image {
    width: 0.6rem;
    height: 0.6rem;
    margin-right: 0.2rem;
}

.comment-item .comment-user .comment-image img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
}

.comment-item .comment-content {
    width: 100%;
    margin-top: 0.2rem;
}

.comment-item .comment-time {
    color: #7b7f82;
    margin-top: .2rem;
}

.more-comment {
    width: 2.44rem;
    height: .56rem;
    line-height: .56rem;
    font-size: .28rem;
    margin: 0 auto;
    margin-top: .5rem;
}

.more-comment .more {
    background-color: #FFF;
    color: #000;
    border: 1px solid #d50a17;
    border-radius: .1rem;
}
</style>