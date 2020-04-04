<template>
    <div class="page" ref="pageIndex">
        <div :class='{"page-header": true, scroll: isScroll}'>
            <div class="classify-icon" @click="$router.push('/goods/classify')"></div>
            <div class="search" @click="isSearch = true">
                <div class="search-icon"></div>
                <div class="search-text">请输入宝贝名称</div>
            </div>
            <div class="login-text">登录</div>
        </div>
        <div class="banner">
            <div class="swiper-container" ref="swiper-container">
                <div class="swiper-wrapper">
                    <div 
                    class="swiper-slide" 
                    v-for="(item, index) in swipers" 
                    :key="item.image">
                    <img :src="item.image" :alt="item.image"></div>
                </div>
                <div class="swiper-pagination" ref="swiper-pagination"></div>
            </div>
        </div>
        <div class="quick-nav">
            <ul class="quick-item" v-for="(item, index) in navs" :key="item.image">
                <li @click="$router.push('/goods/classify/item?cid=' + item.cid)"><img src="../../../assets/images/common/lazyImg.jpg" :data-echo="item.image" :alt="item.title"></li>
                <li>{{ item.title }}</li>
            </ul>
        </div>
        <div class="classify-list">
            <template v-for="(item, index) in products">
                <div class="classify-item" :key="item.title" v-if="index % 2 === 0">
                    <div :class="'classify-title classify-color-' + index">————{{ item.title }}————</div>
                    <div class="goods-row-0">
                        <div class="goods-col-0" @click="$router.push('/goods/details/item?gid=' + (item.items ? item.items[0].gid : ''))">
                            <div class="goods-title">{{ item.items ? item.items[0].title : '' }}</div>
                            <div class="goods-tip">
                                <div class="goods-text">精品打折</div>
                                <div :class="'goods-price bg-color-' + index">{{ item.items ? item.items[0].price : '' }}元</div>
                            </div>
                            <div class="goods-img"><img src="../../../assets/images/common/lazyImg.jpg" :data-echo="item.items ? item.items[0].image : ''" :alt="item.items ? item.items[0].title : ''"></div>
                        </div>
                        <div class="goods-col-1">
                            <div class="col-1-item" v-for="(subItem, subIndex) in item.items.slice(1, 3)" :key="subItem.image" @click="$router.push('/goods/details/item?gid=' + subItem.gid)">
                                <div class="goods-left">
                                    <div class="goods-title">{{ subItem.title }}</div>
                                    <div class="goods-desc">品质精挑</div>
                                </div>
                                <div class="goods-right">
                                    <img src="../../../assets/images/common/lazyImg.jpg" :data-echo="subItem.image" :alt="subItem.title">
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="goods-row-1">
                        <ul class="item" v-for="(subItem2, subIndex2) in item.items.slice(3, 7)" :key="subItem2.image" @click="$router.push('/goods/details/item?gid=' + subItem2.gid)">
                            <li class="goods-title">{{ subItem2.title }}</li>
                            <li class="goods-img"><img src="../../../assets/images/common/lazyImg.jpg" :data-echo="subItem2.image" alt=""></li>
                            <li class="new-price">￥{{ subItem2.price }}</li>
                            <li class="old-price">￥{{ subItem2.price * 2 }}</li>
                        </ul>
                    </div>
                </div>
                <div class="classify-item" v-else>
                <div :class="'classify-title classify-color-' + index">————{{ item.title }}————</div>
                <div class="goods-row-0">
                    <div class="goods-col-0  man" v-for="(subItem, subIndex) in item.items.slice(0, 2)" :key="subItem.imagae" @click="$router.push('/goods/details/item?gid=' + subItem.gid)">
                        <div class="goods-title">{{ subItem.title }}</div>
                        <div class="goods-tip">火爆开售</div>
                        <div class="goods-img"><img src="../../../assets/images/common/lazyImg.jpg" :data-echo="subItem.image" :alt="subItem.title"></div>
                    </div>
                </div>
                <div class="goods-row-1">
                    <ul class="item man" v-for="(subItem2, subIndex2) in item.items.slice(3, 7)" :key="subItem2.image" @click="$router.push('/goods/details/item?gid=' + subItem2.gid)">
                        <li class="goods-title">{{ subItem2.title }}</li>
                        <li class="goods-img"><img src="../../../assets/images/common/lazyImg.jpg" :data-echo="subItem2.image" alt=""></li>
                        <li class="new-price">￥{{ subItem2.price }}</li>
                        <li class="old-price">￥{{ subItem2.price * 2 }}</li>
                    </ul>
                </div>
            </div>
            </template>
        </div>
        <div class="recommend">
            <div class="recommend-header">
                <div class="line"></div>
                <div class="recommend-icon"></div>
                <div class="text">为您推荐</div>
                <div class="line"></div>
            </div>
            <div class="recommend-list">
                <div class="recommend-item" v-for="(item, index) in recommend" :key="item.image" @click="$router.push('/goods/details/item?gid=' + item.gid)">
                    <div class="item-img"><img src="../../../assets/images/common/lazyImg.jpg" :data-echo="item.image" :alt="item.title"></div>
                    <div class="item-desc">{{ item.title }}</div>
                    <div class="item-price">￥{{ item.price }}</div>
                </div>
            </div>
        </div>
        <my-search v-if="isSearch" @hideSearch="hideSearch" :hotwords="hotwords"></my-search>
    </div>
</template>
<script type="text/javascript">
import { mapActions, mapState } from 'vuex'
import Swiper from '../../../assets/js/lib/swiper.js'
import {addEventListener, removeEventListener} from '../../../assets/js/utils/compatible.js'
import MySearch from '../../../components/search'
export default {
    data() {
        return {
            isScroll: false,
            isSearch: false
        }
    },
    created() {
        this.flag = true
        //注册窗口的滚动事件
        addEventListener(window, 'scroll', this.toggleScrollStyle)
        this.getNav({success: () => {
            this.$nextTick(() => {
                this.$utils.lazyImg()
            })
        }})
        this.getSwiper({
            success: () => {
                console.log('ssss')
                this.$nextTick(() => {
                    new Swiper(this.$refs['swiper-container'], {
                        autoplay: 3000,
                        pagination: this.$refs['swiper-pagination'],
                        autoplayDisableOnInteraction: false,
                        paginationClickable: true
                    })
                })
            }
        })
        this.getProduct({success: () => {
            this.$nextTick(function() {
                this.$utils.lazyImg()
            })
        }})
        this.getRecommend({success: () => {
            this.$nextTick(function() {
                this.$utils.lazyImg()
            })
        }})
        this.getHotwords()
    },
    mounted() {
        // addEventListener(this.$refs['pageIndex'], 'touchstart', this.stopTouchMoveEvent)
        // addEventListener(this.$refs['pageIndex'], 'touchmove', this.stopTouchMoveEvent)
        // addEventListener(this.$refs['pageIndex'], 'touchend', this.stopTouchMoveEvent)
    },
    computed: {
        ...mapState({
            navs: state => state.index.navs,
            swipers: state => state.index.swipers,
            products: state => state.index.products,
            recommend: state => state.index.recommend,
            hotwords: state => state.search.hotwords
        })
    },
    methods: {
        ...mapActions({
            getNav: 'index/getNav',
            getSwiper: 'index/getSwiper',
            getProduct: 'index/getProduct',
            getRecommend: 'index/getRecommend',
            getHotwords: 'search/getHotwords'
        }),
        toggleScrollStyle(e) {
            let ev = e || window.event
            let scrollY = ev.path ? ev.path[1].scrollY : ev.view.pageYOffset
            console.log(scrollY)
            if (scrollY >= 150) {
                if (this.flag) {
                    this.isScroll = true
                    this.flag = false
                }
            } else {
                if (!this.flag) {
                    this.isScroll = false
                    this.flag = true
                }
            }
        },
        hideSearch(val) {
            this.isSearch = val
            console.log(2222)
        },
        stopTouchMoveEvent(e) {
            e.preventDefault()
        }
    },
    components: {
        MySearch
    },
    deactivated() {
        console.log('111')
        removeEventListener(window, 'scroll', this.toggleScrollStyle)
    },
    destroyed() {
        console.log('111')
        removeEventListener(window, 'scroll', this.toggleScrollStyle)
    }
}
</script>
<style scoped>
@import '../../../assets/css/common/swiper.css';

.page {
    width: 100%;
    min-height: 100%;
    margin-bottom: 1.3rem;
}

.page-header {
    width: 100%;
    height: 1rem;
    position: fixed;
    left: 0px;
    top: 0px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: linear-gradient(rgba(1, 1, 1, .2), hsla(0, 0%, 100%, 0));
    color: #FFF;
    padding: 0px 0.3rem;
    box-sizing: border-box;
    font-size: 0.32rem;
    z-index: 10;
}

.page-header .classify-icon {
    width: 0.6rem;
    height: 0.6rem;
    background: url('../../../assets/images/common/class.png') 0px 0px/0.6rem 0.6rem no-repeat;
}

.page-header .search {
    width: 5.26rem;
    height: 0.52rem;
    background: hsla(0, 0%, 100%, .6);
    border-radius: 0.1rem;
    line-height: 0.52rem;
    display: flex;
    justify-content: flex-start;
    align-items: center;
}

.page-header .search .search-icon {
    width: 0.5rem;
    height: 0.42rem;
    margin: 0px 0.2rem;
    background: url('../../../assets/images/common/search.png') 0px 0px/0.5rem 0.42rem no-repeat;
}

.page-header .login-text {
    width: auto;
    height: auto;
}

.page-header.scroll {
    background: linear-gradient(#eb1625, hsla(0, 0%, 100%, 0));
}

.banner {
    width: 100%;
    height: 3.65rem;
}

.banner img {
    width: 100%;
    height: 100%;
}

.quick-nav {
    width: 100%;
    height: 1.6rem;
    margin-top: 0.2rem;
    background-color: #FFF;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.quick-nav .quick-item {
    width: 21%;
    margin: 0 2%;
    height: 87.5%;
}

.quick-nav .quick-item li:nth-child(1) {
    width: 0.8rem;
    height: 0.8rem;
    margin: 0 auto;
}

.quick-nav .quick-item li:nth-child(2) {
    width: 100%;
    text-align: center;
    margin-top: 0.1rem;
    font-size: .28rem;
    color: #7b7f82;
}

.quick-nav .quick-item li:nth-child(1) img {
    width: 100%;
    height: 100%;
}

.classify-list {}

.classify-item {
    background-color: #FFF;
    font-size: 0.28rem;
    margin-top: 0.2rem;
}

.classify-item .classify-title {
    width: 100%;
    height: 0.64rem;
    text-align: center;
    line-height: 0.64rem;
    border-bottom: 1px solid #efefef;
    font-size: .32rem;
}

.classify-item .classify-title.classify-color-0 {
    color: #f73b61;
}

.classify-item .classify-title.classify-color-1 {
    color: #fe6719;
}

.classify-item .classify-title.classify-color-2 {
    color: #5fc600;
}

.classify-item .goods-row-0 {
    width: 100%;
    height: 3.5rem;
    border-bottom: 1px solid #efefef;
    display: flex;
    justify-content: space-between;
}

.classify-item .goods-row-0>div {
    width: 50%;
    height: 100%;
    border-right: 1px solid #efefef;
    box-sizing: border-box;
}

.goods-col-0 .goods-title,
.goods-col-0 .goods-tip {
    width: 100%;
    box-sizing: border-box;
    height: auto;
    padding-left: 0.2rem;
}

.goods-col-0 .goods-title,
.goods-col-1 .col-1-item .goods-title,
.goods-row-1 .goods-title {
    font-weight: 700;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
}

.goods-col-0 .goods-title {
    padding-top: 0.2rem;
}

.goods-col-0 .goods-tip {
    display: flex;
    justify-content: space-between;
}

.goods-col-0.man .goods-tip,
.goods-col-0.man .goods-title {
    padding-left: 0px;
}

.goods-col-0.man .goods-tip {
    justify-content: center;
    color: #7b7f82;
    padding-top: 0.1rem;
}

.goods-col-0 .goods-tip .goods-text {
    display: flex;
    justify-content: space-between;
    color: #cb385d;
}

.goods-col-0 .goods-tip .goods-price {
    color: #FFF;
    height: 0.4rem;
    width: auto;
    border-radius: 0.2rem;
    margin-right: 0.6rem;
}

.goods-col-0 .goods-tip .goods-price.bg-color-0 {
    background-color: #f73b61;
}

.goods-col-0 .goods-tip .goods-price.bg-color-1 {
    background-color: #fe6719;
}

.goods-col-0 .goods-tip .goods-price.bg-color-2 {
    background-color: #5fc600;
}

.goods-col-0 .goods-img {
    width: 3rem;
    height: 2rem;
    margin: 0.2rem auto 0rem;
}

.goods-col-0.man .goods-img {
    width: 1.8rem;
    height: 2rem;
    margin: 0.2rem auto 0rem;
}

.goods-col-0 .goods-img img {
    width: 100%;
    height: 100%;
}

.classify-item .goods-row-1 {
    width: 100%;
    height: 3.2rem;
}

.goods-col-1 .col-1-item {
    width: 100%;
    border-bottom: 1px solid #efefef;
    height: 50%;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0px 0.2rem;
}

.goods-col-1 .col-1-item .goods-left {
    width: 2rem;
    height: 1.2rem;
}

.goods-col-1 .col-1-item .goods-left .goods-desc {
    font-size: .26rem;
    color: #7b7f82;
}

.goods-col-1 .col-1-item .goods-right {
    width: 1.2rem;
    height: 1.2rem;
}

.goods-col-1 .col-1-item .goods-right img {
    width: 100%;
    height: 100%;
}

.goods-row-1 {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.goods-row-1 .item {
    width: 25%;
    height: 100%;
    border-right: 1px solid #efefef;
    box-sizing: border-box;
    text-align: center;
    padding-top: 0.2rem;
}

.goods-row-1 .item.man {
    width: 33.3%
}

.goods-row-1 .item .goods-img {
    width: 1.5rem;
    height: 1.5rem;
    margin: 0.2rem auto 0px;
}

.goods-row-1 .item .goods-img img {
    width: 100%;
    height: 100%;
}

.goods-row-1 .item .new-price {
    color: #d32a4e;
    margin-top: 0.2rem;
}

.goods-row-1 .item .old-price {
    text-decoration: line-through;
}

.recommend {
    width: 100%;
}

.recommend-header {
    width: 100%;
    height: 1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: .32rem;
}

.recommend-header .line {
    width: 35%;
    background-color: #d4d4d4;
    height: 1px;
}

.recommend-header .recommend-icon {
    width: 0.4rem;
    height: 0.4rem;
    background: url('../../../assets/images/home/index/recom.png') 0px 0px/0.4rem 0.4rem no-repeat;
}

.recommend-list {
    width: 100%;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
}

.recommend-item {
    width: 46%;
    margin: 0px 2% 0.2rem;
    font-size: .28rem;
    background-color: #FFF;
    padding-top: 0.2rem;
}

.recommend-item .item-img {
    width: 2.8rem;
    height: 2.8rem;
    margin: 0px auto 0.1rem;
}

.recommend-item .item-img img {
    width: 100%;
    height: 100%;
}

.recommend-item .item-desc {
    text-overflow: ellipsis;
    overflow: hidden;
    height: 0.8rem;
}

.recommend-item .item-price {
    color: #d32a4e;
}
</style>