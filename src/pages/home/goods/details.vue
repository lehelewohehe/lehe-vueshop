<template>
    <div>
        <div class="details-header">
            <div class="details-back" @click="$router.go(-1)"></div>
            <div class="tab-wrap">
                <div @click="toggleRouter('/goods/details/item?gid=' + $route.query.gid)" :class="{'tab-item': true, active: childArr[0]}">商品</div>
                <div @click="toggleRouter('/goods/details/content?gid=' + $route.query.gid)" :class="{'tab-content': true, active: childArr[1]}">详情</div>
                <div @click="toggleRouter('/goods/details/review?gid=' + $route.query.gid)" :class="{'tab-review': true, active: childArr[2]}">评价</div>
            </div>
            <div class="cart-icon"></div>
        </div>
        <div class="wrapper" ref="wrapper">
            <div class="page">
                <div class="details-main">
                    <router-view></router-view>
                </div>
            </div>s
        </div>
        <div class="details-footer">
            <div class="details-collection">
                <my-button class="collect" @click="joinInCollect">收藏</my-button>
            </div>
            <div class="details-addCart">
                <my-button class="cart" @click="changeBoxStatus(true)">加入购物车</my-button>
            </div>
        </div>
        <div class="box-mask" v-if="isBox" @click="changeBoxStatus(false)"></div>
        <transition name="box">
            <div class="goodsinfo-box" v-show="isBox">
                <div class="box-close" @click="changeBoxStatus(false)">
                    <div class="close-icon"></div>
                    <div class="close-line"></div>
                    <div class="close-Interface"></div>
                </div>
                <div class="box-container">
                    <div class="box-header">
                        <div class="box-image"><img src="http://vueshop.glbuys.com/uploadfiles/1524556409.jpg" alt=""></div>
                        <div class="box-info">
                            <div class="box-title">{{ goodsDetails.title }}</div>
                            <div class="box-sales">
                                <div class="box-price">¥{{ goodsDetails.price }}</div>
                                <div class="box-code">商品编码:{{ goodsDetails.gid }}</div>
                            </div>
                        </div>
                    </div>
                    <div class="box-wrapper" ref="box-wrapper">
                        <div>
                            <div class="box-color" v-for="(item, index) in goodsSpec" :key="index">
                                <div class="color-header">{{ item.title }}</div>
                                <div class="color-list">
                                    <div :class="{'color-item': true, active: boxParams[index] ? boxParams[index][subIndex] : false}" v-for="(subItem, subIndex) in item.values" :key="subIndex" @click="toggleSelectBoxParams(index, subIndex)">{{ subItem.value }}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="box-num">
                        <div class="num-text">购买数量</div>
                        <div class="num-btn">
                            <div class="num-sub" @click="subBuyNum">-</div>
                            <input type="number" class="num-input" v-model="goodsNum" @input="changeGoodsNum">
                            <div class="num-add" @click="addBuyNum">+</div>
                        </div>
                    </div>
                </div>
                <div class="btn-ok">
                    <my-button class="buy-ok" @click="addToCart">确定</my-button>
                </div>
                <!-- <div class="box-size">
                        <div class="size-header">尺码</div>
                        <div class="size-list">
                            <div class="size-item active">37</div>
                        </div>
                    </div> -->
            </div>
        </transition>
    </div>
</template>
<script>
import IScroll from '../../../assets/js/lib/iscroll.js'
import { addEventListener, removeEventListener } from '../../../assets/js/utils/compatible.js'
import { mapState, mapActions } from 'vuex'
import Vue from 'vue'
import button from '../../../components/button/index'
import Toast from '../../../components/toast/'
Vue.use(button)
Vue.use(Toast)
export default {
    data() {
        return {
            isBox: false,
            childArr: [true, false, false],
            boxParams: [],
            goodsNum: 1
        }
    },
    created() {
        this.changeRouterActive(this.$route.name)
        this.getGoodsDetails({
            gid: this.$route.query.gid,
            success: () => {
                this.$nextTick(() => { this.myScroll.refresh() })
            }
        })
        this.getGoodsSpec({
            gid: this.$route.query.gid,
            success: () => {
                // this.boxParams = JSON.parse(JSON.stringify(this.goodsSpec))
                this.goodsSpec.forEach((item, index) => {
                    this.boxParams[index] = []
                    item.values.forEach((subItem, subIndex) => {
                        this.boxParams[index][subIndex] = false
                    })
                })
                console.log(this.boxParams)
                this.$nextTick(() => { this.myScroll.refresh() })
            }
        })
    },
    mounted() {
        addEventListener(this.$refs['wrapper'], 'touchmove', this.stopTouchMoveEvent)
        addEventListener(this.$refs['box-wrapper'], 'touchmove', this.stopTouchMoveEvent)
        this.myScroll = new IScroll(this.$refs['wrapper'], {
            click: true,
            scrollX: false,
            scrollY: true
        })
        this.myBoxScroll = new IScroll(this.$refs['box-wrapper'], {
            click: true,
            scrollX: false,
            scrollY: true
        })
    },
    computed: {
        ...mapState({
            goodsDetails: state => state.goods.goodsDetails,
            goodsSpec: state => state.goods.goodsSpec,
            loginInfo: state => state.user.loginInfo
        })
    },
    methods: {
        ...mapActions({
            getGoodsDetails: 'goods/getGoodsDetails',
            getGoodsSpec: 'goods/getGoodsSpec',
            addMyFavorite: 'user/addMyFavorite',
            isSafeLogin: 'user/isSafeLogin'
        }),
        stopTouchMoveEvent(e) {
            e.preventDefault()
        },
        changeBoxStatus(flag) {
            this.isBox = flag
            if (this.isBox) {
                this.$nextTick(() => {
                    this.myBoxScroll.refresh()
                })
            }
        },
        toggleRouter(url) {
            this.$router.replace(url)
        },
        joinInCollect() {
            this.goPage()
        },
        goPage() {
            console.log('dasdasdasd')
            this.isSafeLogin({
                data: { uid: this.loginInfo.uid, 'auth_token': this.loginInfo.auth_token },
                success: () => {
                    this.addMyFavorite({
                        data: { uid: this.loginInfo.uid, gid: this.$route.query.gid },
                        success: (data) => {
                            this.$toast(data)
                        }
                    })
                },
                error: () => {
                    this.$router.push('/login')
                }
            })
        },
        addToCart() {
            for (let i = 0; i < this.boxParams.length; i++) {
                console.log(!this.boxParams[i].includes(true))
                if (!this.boxParams[i].includes(true)) {
                    this.$toast('请选择' + this.goodsSpec[i].title)
                    return
                }
            }
            if (this.goodsNum === 0) {
                this.$toast('购买商品数量不得小于0')
                return
            }
            this.changeBoxStatus(false)
            this.goodsNum = 0
            for (let i = 0; i < this.boxParams.length; i++) {
                this.boxParams[i].fill(false)
            }
            console.log(this.boxParams)
        },
        subBuyNum() {
            this.goodsNum -= 1
            if (this.goodsNum <= 0) {
                this.goodsNum = 1
            }
        },
        changeGoodsNum() {
            if (this.goodsNum === '') {
                this.goodsNum = 1
            }
            this.goodsNum = parseInt(this.goodsNum.toString().replace(/[^\d]/g, ''))
            if (this.goodsNum <= 0) {
                this.goodsNum = 1
            }
        },
        addBuyNum() {
            this.goodsNum += 1
        },
        toggleSelectBoxParams(index, subIndex) {
            for (let i = 0; i < this.boxParams[index].length; i++) {
                if (this.boxParams[index][i]) {
                    this.boxParams[index][i] = false
                    break
                }
            }
            console.log(this.boxParams)
            this.boxParams[index][subIndex] = true
            this.$set(this.boxParams, index, this.boxParams[index])
            this.$set(this.boxParams[index], subIndex, this.boxParams[index][subIndex])
        },
        changeRouterActive(name) {
            switch (name) {
                case 'goods-details-item':
                    this.childArr[0] = true
                    this.childArr[1] = false
                    this.childArr[2] = false
                    break
                case 'goods-details-content':
                    this.childArr[0] = false
                    this.childArr[1] = true
                    this.childArr[2] = false
                    break
                case 'goods-details-review':
                    this.childArr[0] = false
                    this.childArr[1] = false
                    this.childArr[2] = true
                    break
                default:
                    this.childArr[0] = true
                    this.childArr[1] = false
                    this.childArr[2] = false
                    break
            }
        }
    },
    beforeRouteUpdate(to, from, next) {
        document.title = to.meta.title
        this.changeRouterActive(to.name)
        next()
        this.$nextTick(() => {
            this.myScroll.refresh()
        })
        console.log(this)
    },
    beforeDestroy() {
        removeEventListener(this.$refs['wrapper'], 'touchmove', this.stopTouchMoveEvent)
        removeEventListener(this.$refs['box-wrapper'], 'touchmove', this.stopTouchMoveEvent)
        this.myScroll.destroy()
    }
}
</script>
<style scoped>
.box-enter {
    transform: translateY(115%);
}

.box-enter-active {
    transition: transform 0.3s ease;
}

.box-enter-to {
    transform: translateY(0%);
}

.box-leave {
    transform: translateY(0%);
}

.box-leave-active {
    transition: transform 0.3s ease;
}

.box-leave-to {
    transform: translateY(115%);
}

.wrapper {
    position: fixed;
    width: 100%;
    top: 1.2rem;
    bottom: 1.4rem;
    background: #FFF;
}

.page {
    width: 100%;
}

.details-main {
    width: 100%;
}

.details-header {
    width: 100%;
    height: 1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #FFF;
    position: fixed;
    left: 0px;
    top: 0px;
    z-index: 10;
}

.details-header .details-back,
.details-header .cart-icon {
    width: 0.8rem;
    height: 0.8rem;
    background: url('../../../assets/images/home/goods/back.png') 0 0/0.8rem 0.8rem no-repeat;
}

.details-header .cart-icon {
    background: url('../../../assets/images/home/goods/cart.png') 0 0/0.8rem 0.8rem no-repeat;
    margin-right: 0.2rem;
}

.details-header .tab-wrap {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 5.25rem;
    height: 100%;
    font-size: .36rem;
}

.details-header .tab-wrap div {
    margin: 0rem 0.48rem;
    height: 98%;
    line-height: 1rem;
}

.details-header .tab-wrap div.active {
    border-bottom: 2px solid #fda208;
}

.details-main {
    width: 100%;
}

.details-footer {
    position: fixed;
    left: 0px;
    bottom: 0px;
    width: 100%;
    height: 1.2rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.details-footer div {
    width: 50%;
    height: 1.2rem;
    line-height: 1.2rem;
}

.details-footer .cart,
.details-footer .collect {
    font-size: 0.36rem;
}

.details-footer .collect {
    background-color: #fda208;
}

.box-mask {
    position: fixed;
    left: 0px;
    bottom: 0px;
    right: 0px;
    top: 0px;
    background-color: rgba(0, 0, 0, .3);
    z-index: 11;
}

.goodsinfo-box {
    background-color: #FFF;
    width: 100%;
    position: fixed;
    left: 0;
    bottom: 0;
    z-index: 100;
    height: 50%;
    padding-bottom: 1rem;
}

.box-wrapper {
    width: 100%;
    background-color: #FFF;
    overflow: hidden;
    height: 100%;
}

.box-container {
    padding-left: 0.2rem;
    padding-bottom: 1rem;
    padding-top: 1.24rem;
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    position: relative;
}

.box-header {
    height: 1.24rem;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: .24rem;
    border-bottom: 1px solid #efefef;
    position: absolute;
    top: 0px;
    left: 0px;
    padding-left: 0.2rem;
    box-sizing: border-box;
}

.box-header .box-image {
    width: 0.8rem;
    height: 0.8rem;
}

.box-header .box-image img {
    width: 100%;
    height: 100%;
}

.box-header .box-info {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 90%;
    width: 80%;
    margin-left: 0.3rem;
    margin-right: 0.2rem;
}

.box-header .box-info .box-title {
    width: 100%;
    height: .7rem;
    overflow: hidden;
}

.box-header .box-info .box-sales {
    display: flex;
    justify-content: space-between;
}

.box-info .box-sales .box-price {
    color: #f93036;
}

.box-info .box-sales .box-code {
    color: #888;
}

.box-color,
.box-size,
.box-num,
.box-size .size-list,
.box-color .color-list {
    margin-top: 0.2rem;
    font-size: .32rem;
}

.box-color .color-header {
    width: 100%;
}

.box-color .color-list,
.box-size .size-list {
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
}

.color-list .color-item,
.size-list .size-item {
    background: #efefef;
    padding: .1rem .2rem;
    border-radius: .1rem;
    margin-right: .17rem;
    display: table;
    margin-bottom: .17rem;
}

.color-list .color-item.active,
.size-list .size-item.active {
    color: #fff;
    background-color: #fda208;
}

.box-num,
.box-num .num-btn {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.box-num {
    position: absolute;
    left: 0px;
    bottom: 0px;
    width: 100%;
    padding-left: 0.2rem;
    box-sizing: border-box;
}

.box-num .num-btn {
    width: 2.04rem;
    height: .64rem;
    border: 1px solid #000;
    margin-right: .2rem;
    border-radius: .08rem;
    display: flex;
    align-items: center;
}

.box-num .num-btn .num-input {
    width: 50%;
    height: 70%;
    text-align: center;
    border: none;
    border-left: 1px solid #000;
    border-right: 1px solid #000;
    outline: none;
    font-size: 0.32rem;
}

.box-num .num-btn .num-add,
.box-num .num-btn .num-sub {
    width: 20%;
    height: 100%;
    text-align: center;
    line-height: 0.64rem;
}

.goodsinfo-box .btn-ok {
    height: 0.8rem;
    position: absolute;
    width: 100%;
    left: 0px;
    bottom: 0px;
}

.btn-ok .buy-ok {
    font-size: 0.32rem;
}

.goodsinfo-box .box-close {
    width: 0.6rem;
    height: 1.2rem;
    position: absolute;
    right: -0.07rem;
    top: -1rem;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.goodsinfo-box .box-close .close-icon {
    width: 0.4rem;
    height: 0.4rem;
    background: url('../../../assets/images/home/goods/x.png') 0 0/ 0.4rem 0.4rem no-repeat;
    border-radius: 50%;
}

.goodsinfo-box .box-close .close-line {
    width: 0;
    height: 0.72rem;
    border-left: 1px solid #FFF;
}

.goodsinfo-box .box-close .close-Interface {
    width: 0.12rem;
    height: 0.12rem;
    background-color: #000;
    border-radius: 50%;
}
</style>