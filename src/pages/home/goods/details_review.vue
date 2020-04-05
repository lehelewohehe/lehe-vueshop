<template>
    <div class="page">
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
        </div>
    </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'
export default {
    mounted() {
        this.$nextTick(() => {
            this.$parent.myScroll.refresh()
        })
    },
    created() {
        console.log(this.$parent)
        this.getGoodsComment({
            gid: this.$route.query.gid,
            page: 1,
            success: () => {
                this.$nextTick(() => {
                    this.$parent.myScroll.refresh()
                    this.$parent.myScroll.on('scrollEnd', () => {
                        let sub = -Math.abs(this.$parent.myScroll.scrollerHeight - this.$parent.myScroll.wrapperHeight)
                        console.log(sub, this.$parent.myScroll.y === sub, this.$parent.myScroll.y, (parseInt(this.pageInfo.page) < parseInt(this.pageInfo.pagenum)))
                        if (this.$parent.myScroll.y === sub && (parseInt(this.pageInfo.page) < parseInt(this.pageInfo.pagenum))) {
                            this.getGoodsComment({
                                gid: this.$route.query.gid,
                                page: parseInt(this.pageInfo.page) + 1,
                                success: () => {
                                    this.$nextTick(() => {
                                        this.$parent.myScroll.refresh()
                                    })
                                }
                            })
                        } else if ((parseInt(this.pageInfo.page) === parseInt(this.pageInfo.pagenum))) {
                            this.$parent.myScroll._events.scrollEnd = null
                        }
                    })
                })
            }
        })
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
.no-data {
    width: 100%;
    text-align: center;
    margin-top: 0.2rem;
    font-size: 0.32rem;
}

.goods-comment {
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
</style>