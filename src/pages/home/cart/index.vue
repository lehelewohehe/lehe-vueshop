<template>
    <div class="page">
        <div class="cart-header">购物车</div>
        <div class="cart-main">
            <div class="cart-wrap" ref="cart-wrap">
                <div class="cart-list">
                    <div class="cart-item" v-for="(item, index) in cartGoods" :key="index">
                        <div :class="{'select-btn': true, active: item.checked}"></div>
                        <div class="image-wrap">
                            <ul>
                                <li><img :src="item.img" alt=""></li>
                                <li>删除</li>
                            </ul>
                        </div>
                        <div class="goods-wrap">
                            <div class="goods-info">
                                <div class="goods-title">{{ item.title }}</div>
                                <div class="goods-params">
                                    <div class="goods-color" v-for="(subItem, subIndex) in item.attrs" :key="subIndex">{{ subItem.title }}： {{ subItem.param[0].title }}</div>
                                    <!-- <div class="goods-size">尺码： 37</div> -->
                                </div>
                            </div>
                            <div class="goods-data">
                                <div class="goods-price">¥{{ item.price }}</div>
                                <div class="num-btn">
                                    <div class="num-sub">-</div>
                                    <input type="number" class="num-input" v-model="item.amount">
                                    <div class="num-add">+</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="cart-footer">
            <div class="select-all">
                <div class="select-all-btn active"></div><span>全选</span>
            </div>
            <div class="cacl">
                <div class="freight">运费: <span>￥10</span></div>
                <div class="total">合计: <span>￥123</span></div>
                <div class="calc-btn">去结算</div>
            </div>
        </div>
    </div>
</template>
<script type="text/javascript">
import IScroll from '../../../assets/js/lib/iscroll.js'
import { addEventListener, removeEventListener } from '../../../assets/js/utils/compatible.js'
import { mapState, mapActions, mapMutations } from 'vuex'

export default {
    created() {

    },
    mounted() {
        addEventListener(this.$refs['cart-wrap'], 'touchmove', this.stopTouchMoveEvent)
        this.myScroll = new IScroll(this.$refs['cart-wrap'], {
            click: true,
            scrollX: false,
            scrollY: true
        })
    },
    methods: {
    	stopTouchMoveEvent(e) {
            e.preventDefault()
        }
    },
    computed: {
        ...mapState({
            cartGoods: state => state.cart.cartGoods
        })
    }
}
</script>
<style scoped>
.page {
    position: fixed;
    left: 0px;
    top: 0px;
    bottom: 0px;
    right: 0px;
    padding: 1rem 0px 2.3rem;
}

.cart-header {
    background-color: #FFF;
    height: 1rem;
    width: 100%;
    line-height: 1rem;
    text-align: center;
    border-bottom: 1px solid #efefef;
    font-size: 0.32rem;
    position: absolute;
    left: 0px;
    top: 0px;
}

.cart-main {
    height: 100%;
}

.cart-main .cart-wrap {
    height: 100%;
    overflow: hidden;
}

.cart-item {
    width: 100%;
    height: 2.2rem;
    margin-top: 0.1rem;
    background-color: #FFF;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 0.24rem;
    padding: 0px 0.2rem;
    box-sizing: border-box;
}

.cart-item .select-btn {
    width: 0.44rem;
    height: 0.44rem;
    border-radius: 50%;
    border: 1px solid #efefef;
    margin-right: 0.3rem;
}

.cart-item .image-wrap {
    width: 1.2rem;
    height: 1.72rem;
    margin-right: 0.3rem;
}

.cart-item .image-wrap li:nth-child(1) {
    width: 1.2rem;
    height: 1.2rem;
}

.cart-item .image-wrap li:nth-child(2) {
    margin-top: 0.2rem;
    text-align: center;
    color: #b5b5b5;
}

.cart-item .image-wrap img {
    width: 100%;
    height: 100%;
}

.cart-item .goods-wrap {
    width: 4.8rem;
}

.cart-item .goods-wrap .goods-title {
    height: 0.72rem;
    width: 100%;
    overflow: hidden;
}

.cart-item .goods-wrap .goods-params,
.cart-item .goods-wrap .goods-data {
    margin-top: 0.1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.cart-item .goods-wrap .goods-params {
    justify-content: flex-start;
    flex-wrap: wrap;
}

.goods-wrap .goods-params div {
    margin-right: 0.14rem;
}

.goods-wrap .goods-data .goods-price {
    color: #cc0004;
    font-size: 0.28rem;
}


.goods-data,
.goods-data .num-btn {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.goods-data .num-btn {
    width: 2.04rem;
    height: .54rem;
    border: 1px solid #000;
    border-radius: .08rem;
    display: flex;
    align-items: center;
}

.goods-data .num-btn .num-input {
    width: 50%;
    height: 70%;
    text-align: center;
    border: none;
    border-left: 1px solid #000;
    border-right: 1px solid #000;
    outline: none;
    font-size: 0.24rem;
}

.goods-data .num-btn .num-add,
.goods-data .num-btn .num-sub {
    width: 20%;
    height: 100%;
    text-align: center;
    line-height: 0.64rem;
}

.cart-footer {
    width: 100%;
    height: 1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #FFF;
    font-size: 0.24rem;
    position: absolute;
    left: 0px;
    bottom: 1.2rem;
}
.cart-footer .select-all {
	display: flex;
    justify-content: space-between;
    align-items: center;
}

.cart-footer .select-all-btn {
    width: 0.44rem;
    height: 0.44rem;
    border-radius: 50%;
    border: 1px solid #efefef;
    margin-left: 0.2rem;
}

.cart-footer .select-all-btn.active,
.cart-item .select-btn.active {
    background-color: #cc0004;
}

.cart-footer .cacl {
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.cart-footer .cacl span {
    color: #cc0004;
}

.cart-footer .calc-btn {
    width: 1.88rem;
    height: 100%;
    text-align: center;
    line-height: 1rem;
    background-color: #cc0004;
    color: #FFF;
    font-size: 0.32rem;
}

.cart-footer span {
	margin: 0px 0.2rem;
}
</style>