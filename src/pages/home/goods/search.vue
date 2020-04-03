<template>
    <div class="page" ref="searchPage">
        <my-search v-if="isSearch" @hideSearch="hideSearch" :hotwords="hotwords" :isLocal="true">
        </my-search>
        <div class="wrap">
            <div class="page-header">
                <div class="back" @click="$router.go(-1)"></div>
                <div class="search-wrap" @click="isSearch=true">
                    <div class="search-icon"></div>
                    <div class="search-input">{{ $route.query.keyWord }}</div>
                </div>
                <div class="screen" @click="showScreen()">筛选</div>
            </div>
            <div class="sort-mode">
                <div class="price-about" @click="selectSortMode(undefined, 'all')">
                    <div :class="{'price-text': true, active: !sortRule.isHide}">综合</div>
                    <div :class="{'price-icon': true, active: !sortRule.isHide}"></div>
                </div>
                <div :class="{'sales-about': true, active: sortRule.items[3].active }" @click="selectSortMode(3, 'sales')">销量</div>
                <ul class="sort-list" v-if="!sortRule.isHide">
                    <li v-for="(item, index) in sortRule.items" :class="{'list-item': true, active: item.active}" v-if="index!=3" :key="index" @click="selectSortMode(index, item.type)">{{ item.title }}</li>
                </ul>
            </div>
        </div>
        <div class="goods-list">
            <template v-if="searchResult.length !== 0">
                <div class="goods-item" v-for="(item, index) in searchResult" :key="index" @click="$router.push('/goods/details/item?gid=' + item.gid)" >
                <div class="goods-image"><img :src="item.image" alt=""></div>
                <div class="goods-decription">
                    <div class="goods-title">{{ item.title }}</div>
                    <div class="goods-price">￥{{ item.price }}</div>
                    <div class="goods-sales">销售<span>{{ item.sales }}</span>件</div>
                </div>
                </div>
            </template>
            <div class="no-data" v-else>没有数据</div>
        </div>
        <div class="mask" @click="hideScreen()" v-if="isScreen"></div>
        <transition name="screen">
            <div class="screen-wrap" v-show="isScreen" ref="screen-wrap">
                <div class="screen-container">
                    <div class="screen-item">
                        <div class="screen-header" @click="isClassify = !isClassify">
                            <div class="screen-title">分类</div>
                            <div :class="{'screen-icon': true, active: isClassify}"></div>
                        </div>
                        <div class="screen-list" v-if="!isClassify">
                            <div :class="{'screen-list-item': true, bgActive: item.active}" v-for="(item, index) in categoryMenu" :key="index" @click="selectClassify(index, item.cid)">{{ item.title }}</div>
                        </div>
                    </div>
                    <div class="screen-item">
                        <div class="screen-header" @click="priceRange.isHide = !priceRange.isHide">
                            <div class="screen-title">价格区间</div>
                            <div class="price-section">
                                <div class="input-wrap">
                                    <input type="number" class="min-value" placeholder="最低价" v-model="min_value">
                                </div>
                                <div class="interval-line"></div>
                                <div class="input-wrap">
                                    <input type="number" class="max-value" placeholder="最高价" v-model="max_value">
                                </div>
                            </div>
                            <div :class="{'screen-icon': true, active: priceRange.isHide}"></div>
                        </div>
                        <div class="screen-list" v-if="!priceRange.isHide">
                            <div :class="{'screen-list-item': true, bgActive: item.active}" v-for="(item, index) in priceRange.items" :key="index" @click="selectPriceInterval(index)">{{item.price1}}-{{item.price2}}</div>
                        </div>
                    </div>
                    <div class="screen-item" v-for="(item, index) in searchParams" :key="index">
                        <div class="screen-header" @click="toggleSearchParamsIshide(index)">
                            <div class="screen-title">{{ item.title }}</div>
                            <div :class="{'screen-icon': true, active: searchParams[index].isHide}"></div>
                        </div>
                        <div class="screen-list" v-if="!searchParams[index].isHide">
                            <div :class="{'screen-list-item': true, bgActive: subItem.active}" v-for="(subItem, subIndex) in item.param" :key="subIndex" @click="multipleSelectSearchParams(index, subIndex, subItem.pid)">{{ subItem.title }}</div>
                        </div>
                    </div>
                </div>
                <div class="screen-button">
                    <div class="all-num">
                        共<span>{{ pageInfo.total }}</span>件
                    </div>
                    <div class="all-reset" @click="cancelAllScreen">全部重置</div>
                    <div class="all-ok bgActive" @click="getAfterScreenGoods">确定</div>
                </div>
            </div>
        </transition>
    </div>
</template>
<script>
import IScroll from '../../../assets/js/lib/iscroll.js'
import { addEventListener, removeEventListener } from '../../../assets/js/utils/compatible.js'
import { mapState, mapActions, mapMutations } from 'vuex'
import MySearch from '../../../components/search'
export default {
    data() {
        return {
            isSearch: false,
            isScreen: false,
            min_value: '',
            max_value: '',
            isClassify: false,
            sortRule: {
                isHide: true,
                items: [
                    { title: '综合', type: 'all', active: true },
                    { title: '价格从低到高', type: 'up', active: false },
                    { title: '价格从高到低', type: 'down', active: false },
                    { title: '销量', type: 'sales', active: false }
                ]
            },
            priceRange: {
                isHide: false,
                items: [
                    { price1: 1, price2: 50, active: false },
                    { price1: 51, price2: 99, active: false },
                    { price1: 100, price2: 300, active: false },
                    { price1: 301, price2: 1000, active: false },
                    { price1: 1001, price2: 4000, active: false },
                    { price1: 4001, price2: 9999, active: false }
                ]
            }
        }
    },
    created() {
        this.cid = undefined
        this.kwords = this.$route.query.keyWord
        this.otype = 'all'
        this.param = []
        this.flag = true
        this.getSearchResult({
                data: {
                    kwords: this.kwords,
                    price1: this.min_value,
                    price2: this.max_value,
                    otype: this.otype,
                    param: JSON.stringify(this.param),
                    cid: this.cid
                }
            })
        this.getCategoryMenu()
        this.getSearchParams({ key: this.$route.query.keyWord })
        addEventListener(window, 'scroll', this.dropDownLoading)
    },
    mounted() {
        // 筛选相关的参数
        addEventListener(this.$refs['screen-wrap'], 'touchmove', this.stopTouchMoveEvent)
        this.myScroll = new IScroll(this.$refs['screen-wrap'], {
            click: true,
            scrollX: false,
            scrollY: true
        })
    },
    computed: {
        ...mapState({
            categoryMenu: state => state.goods.categoryMenu,
            searchParams: state => state.search.searchParams,
            hotwords: state => state.search.hotwords,
            searchResult: state => state.search.searchResult,
            pageInfo: state => state.search.pageInfo
        })
    },
    methods: {
        ...mapActions({
            'getCategoryMenu': 'goods/getCategoryMenu',
            'getSearchParams': 'search/getSearchParams',
            'getSearchResult': 'search/getSearchResult'
        }),
        ...mapMutations({
            'updateCategoryMenuSelect': 'goods/UPDATE_CATEGORYMENU_SELECT',
            'updateSearchParamsIshide': 'search/UPDATE_SEARCHPARAMS_ISHIDE',
            'updateSearchParamsMultipleSelect': 'search/UPDATE_SEARCHPARAMS_MULTIPLESELECT',
            'cancelAllScreenSelect': 'search/CANCEL_ALL_SEARCHPARAMS_SELECT'
        }),
        stopTouchMoveEvent(e) {
            e.preventDefault()
        },
        showScreen() {
            this.isScreen = true
            this.$nextTick(() => {
                this.myScroll.refresh()
            })
        },
        hideScreen() {
            this.isScreen = false
        },
        selectSortMode(index, type) {
            this.otype = type
            if (index === undefined) {
                this.sortRule.isHide = !this.sortRule.isHide
            } else if (index === 3) {
                this.sortRule.items.forEach((item, i) => {
                    if (index !== i) {
                        item.active = false
                    } else {
                        item.active = !item.active
                    }
                })
                this.sortRule.isHide = true
            } else {
                this.sortRule.items.forEach((item, i) => {
                    item.active = false
                    if (index === i) {
                        item.active = true
                    }
                })
                this.sortRule.isHide = !this.sortRule.isHide
            }
            if(index !== undefined) {
                this.getSearchResult({
                data: {
                    kwords: this.kwords,
                    price1: this.min_value,
                    price2: this.max_value,
                    otype: this.otype,
                    param: JSON.stringify(this.param),
                    cid: this.cid
                }
            })
            }
        },
        selectClassify(index, cid) {
            this.updateCategoryMenuSelect({ index })
            if(cid === this.cid) {
                this.cid = undefined
            } else {
                this.cid = cid
            }
        },
        selectPriceInterval(index) {
            for (let i = 0; i < this.priceRange.items.length; i++) {
                let item = this.priceRange.items[i]
                if (item.active) {
                    // console.log(index !== i)
                    if (index !== i) {
                        item.active = false
                        this.priceRange.items[index].active = true
                        this.min_value = this.priceRange.items[index].price1
                        this.max_value = this.priceRange.items[index].price2
                    } else {
                        item.active = false
                        this.min_value = ''
                        this.max_value = ''
                    }
                    return
                }
            }
            this.priceRange.items[index].active = true
            this.min_value = this.priceRange.items[index].price1
            this.max_value = this.priceRange.items[index].price2
        },
        multipleSelectSearchParams(index, subIndex, pid) {
            this.updateSearchParamsMultipleSelect({ index, subIndex })
            let flag = this.param.indexOf(pid)
            if (flag === -1) {
                this.param.push(pid)
            } else {
                this.param.splice(flag, 1)
            }
        },
        toggleSearchParamsIshide(index) {
            this.updateSearchParamsIshide({ index })
        },
        hideSearch(val) {
            this.isSearch = val
            console.log(2222)
        },
        cancelAllScreen() {
            for(let i = 0; i < this.categoryMenu.length; i++) {
                if(this.categoryMenu[i].cid === this.cid) {
                    this.selectClassify(i, this.cid)
                    break
                } 
            }
            this.priceRange.items.forEach((item, index) => {
                item.active = false
            })
            this.cancelAllScreenSelect()
            this.kwords = this.$route.query.keyWord
            this.otype = 'all'
            this.param = []
            this.page = 1
            this.min_value = ''
            this.max_value = ''
        },
        getAfterScreenGoods() {
            this.getSearchResult({
                data: {
                    kwords: this.kwords,
                    price1: this.min_value,
                    price2: this.max_value,
                    otype: this.otype,
                    param: JSON.stringify(this.param),
                    cid: this.cid
                }
            })
            this.hideScreen()
        },
        dropDownLoading(e) {
            let ev = e || window.event
            let scrollY = ev.path ? ev.path[1].scrollY : ev.view.pageYOffset
            if((scrollY + window.innerHeight)  === this.$refs.searchPage.clientHeight) {
                // console.log(scrollY)
                console.log('到底了', this.pageInfo.page + 1)
                if(this.flag && parseInt(this.pageInfo.page) + 1 <= parseInt(this.pageInfo.pagenum)) {
                    this.getSearchResult({
                        data: {
                            kwords: this.kwords,
                            price1: this.min_value,
                            price2: this.max_value,
                            otype: this.otype,
                            param: JSON.stringify(this.param),
                            cid: this.cid,
                            page: parseInt(this.pageInfo.page) + 1
                        }
                    })
                }
                
            }
        }
    },
    components: {
        MySearch
    },
    beforeRouteUpdate(to, from, next) {
        this.getSearchParams({ key: to.query.keyWord })
        next()
    },
    beforeDestroy() {
        console.log(11112)
        removeEventListener(window, 'scroll', this.dropDownLoading)
        removeEventListener(this.$refs['screen-wrap'], 'touchmove', this.stopTouchMoveEvent)
        this.myScroll.destroy()
    }
}
</script>
<style scoped>
.screen-enter {
    transform: translateX(6rem);
}

.screen-enter-active {
    transition: transform 0.3s ease;
}

.screen-enter-to {
    transform: translateX(0rem);
}

.screen-leave {
    transform: translateX(0rem);
}

.screen-leave-active {
    transition: transform 0.3s ease;
}

.screen-leave-to {
    transform: translateX(6rem);
}

.page {
    width: 100%;
    background-color: #FFF;
    font-size: 0.32rem;
    padding: 1px 0px;
    min-height: 100vh;
}

.wrap {
    position: fixed;
    left: 0;
    top: 0;
    background-color: #FFF;
    width: 100%;
}

.page .page-header {
    height: 0.8rem;
    border-bottom: 1px solid #efefef;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
}

.page-header .back {
    width: 0.8rem;
    height: 0.8rem;
    background: url('../../../assets/images/home/goods/back.png') 0 0/0.8rem 0.8rem no-repeat;
}

.page-header .search-wrap {
    width: 5.6rem;
    height: 0.64rem;
    background-color: #eaeaea;
    border-radius: 0.1rem;
    display: flex;
    justify-content: flex-start;
    align-items: center;
}

.page-header .search-wrap .search-icon {
    width: 0.48rem;
    height: 0.5rem;
    background: url('../../../assets/images/common/search.png') 0 0/0.48rem 0.5rem no-repeat;
    margin: 0px 0.1rem;
}

.page-header .screen {
    margin-right: 0.1rem;
}

.sort-mode {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    height: 0.8rem;
    border-bottom: 1px solid #efefef;
    position: relative;
    width: 100%;
}

.sort-mode .price-about {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.sort-mode .price-about,
.sort-mode .sales-about {
    margin-left: 0.4rem;
}

.sort-mode .price-icon {
    width: 0.35rem;
    height: 0.35rem;
    margin-left: 0.1rem;
    background: url('../../../assets/images/home/goods/down.png') 0 0/0.35rem 0.35rem no-repeat;
}

.sort-mode .price-icon.active {
    background: url('../../../assets/images/home/goods/up.png') 0 0/0.35rem 0.35rem no-repeat;
}

.sort-mode .price-icon.active,
.sort-mode .sort-list .list-item.active {
    color: #fda208;
}

.sort-mode .sort-list {
    width: 100%;
    position: absolute;
    left: 0px;
    top: 0.8rem;
    background-color: #FFF;
}

.sort-mode .sort-list .list-item {
    width: 100%;
    height: 0.8rem;
    border-bottom: 1px solid #efefef;
    line-height: 0.8rem;
    padding-left: 0.4rem;
    box-sizing: border-box;
}

.goods-list {
    margin-top: 2rem;
}

.goods-list .no-data {
    text-align: center;
}

.goods-list .goods-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 2rem;
    margin-bottom: 0.4rem;
    width: 100%;
}

.goods-list .goods-item .goods-image {
    width: 2rem;
    height: 2rem;
}

.goods-list .goods-item .goods-image img {
    width: 100%;
    height: 100%;
}

.goods-list .goods-item .goods-decription {
    width: 5rem;
    height: 100%;
    padding-right: 0.2rem;
    box-sizing: border-box;
    border-bottom: 1px solid #ccc;
}

.goods-item .goods-decription .goods-title {
    width: 95%;
    height: .8rem;
    font-size: .28rem;
    overflow: hidden;
}

.goods-item .goods-decription .goods-price,
.goods-item .goods-decription .goods-sales {
    margin-top: 0.1rem;
}

.goods-item .goods-decription .goods-sales {
    font-size: 0.24rem;
    color: #969696;
}

.goods-item .goods-decription .goods-price {
    color: #f93036;
}

.goods-item .goods-decription .goods-sales span {
    color: #fda208;
}

.page .mask {
    width: 100%;
    height: 100%;
    position: fixed;
    z-index: 99;
    left: 0;
    top: 0;
    background-color: rgba(0, 0, 0, .3);
}

.screen-wrap {
    position: fixed;
    width: 6rem;
    height: 100%;
    background-color: #FFF;
    top: 0;
    right: 0;
    z-index: 100;
}

.screen-wrap .screen-container {
    padding-bottom: 1rem;
}

.screen-item {
    border-bottom: 1px solid #efefef;
}

.screen-item .screen-header {
    height: 0.8rem;
    width: 100%;
    padding: 0px 0.2rem;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.screen-header .screen-icon {
    width: 0.4rem;
    height: 0.4rem;
    background: url('../../../assets/images/home/goods/down.png') 0 0/0.4rem 0.4rem no-repeat;
}

.screen-header .screen-icon.active {
    width: 0.4rem;
    height: 0.4rem;
    background: url('../../../assets/images/home/goods/up.png') 0 0/0.4rem 0.4rem no-repeat;
}

.price-section {
    display: flex;
    justify-content: flex-start;
    align-items: center;
}

.price-section .interval-line {
    width: .5rem;
    border: 1px solid #efefef;
}

.price-section .input-wrap {
    width: 1rem;
    height: .4rem;
    border: 1px solid #efefef;
    line-height: 0.4rem;
}

.price-section .input-wrap input {
    outline: none;
    border: none;
    width: 100%;
    height: 100%;
    font-size: 0.24rem;
}

.screen-list {
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
}

.screen-list .screen-list-item {
    width: 30%;
    margin: 0rem 1% 0.2rem 2%;
    height: .64rem;
    background-color: #efefef;
    text-align: center;
    line-height: .64rem;
    overflow: hidden;
    font-size: .28rem;
    border-radius: .1rem;

}

.screen-wrap .screen-button {
    width: 100%;
    height: 1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    line-height: 1rem;
    position: absolute;
    left: 0px;
    bottom: 0px;
    font-size: .28rem;
    background-color: #FFF;
}

.screen-wrap .screen-button div {
    width: 33%;
    height: 100%;
    text-align: center;
}

.screen-wrap .screen-button .all-reset {
    background-color: #efefef;
}

.screen-wrap .screen-button .all-num span {
    color: #fda208;
}

.active {
    color: #fda208;
}

.bgActive {
    color: #FFF;
    background-color: #fda208 !important;
}
</style>