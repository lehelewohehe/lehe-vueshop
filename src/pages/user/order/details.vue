<template>
    <div class="page">
        <my-header :isLeft="true" :title="'订单详情'" class="ucenter-header"></my-header>
        <div class="details-wrapper" ref="details-wrapper">
            <div class="details-main">
                <div class="order-code">订单编号：{{ orderDetails.ordernum }}</div>
                <div class="address-wrapper">
                    <div class="skew-wrapper">
                        <div class="skew"></div>
                        <div class="skew"></div>
                        <div class="skew"></div>
                        <div class="skew"></div>
                        <div class="skew"></div>
                        <div class="skew"></div>
                        <div class="skew"></div>
                        <div class="skew"></div>
                        <div class="skew"></div>
                        <div class="skew"></div>
                    </div>
                    <div class="address-info">
                        <div class="address-user">
                            <div class="user-name">{{ orderDetails.name }}</div>
                            <div class="user-phone">{{ orderDetails.cellphone }}</div>
                        </div>
                        <div class="address-position">{{ orderDetails.province + orderDetails.city + orderDetails.area + orderDetails.address }}</div>
                    </div>
                    <div class="skew-wrapper">
                        <div class="skew"></div>
                        <div class="skew"></div>
                        <div class="skew"></div>
                        <div class="skew"></div>
                        <div class="skew"></div>
                        <div class="skew"></div>
                        <div class="skew"></div>
                        <div class="skew"></div>
                        <div class="skew"></div>
                        <div class="skew"></div>
                    </div>
                </div>
                <div class="goods-wrapper">
                    <div class="goods-header">购买的宝贝</div>
                    <div class="goods-list">
                        <div class="goods-item" v-for="(subItem, subIndex) in orderDetails.goods" :key="subIndex">
                            <div class="goods-image"><img :src="subItem.image" alt=""></div>
                            <div class="goods-info">
                                <div class="goods-title">{{ subItem.title }}</div>
                                <div class="goods-attr">
                                    <span class="goods-amount">x {{ subItem.amount }}</span>
                                    <span v-for="(threeItem, threeIndex) in subItem.param" :key="threeIndex">{{threeItem.title}}: {{ threeItem.param[0].title }} </span>
                                </div>
                            </div>
                            <div class="goods-price">¥{{ subItem.price }}</div>
                        </div>
                    </div>
                </div>
                <div class="order-status">
                    <span>支付状态</span>
                    <span>{{ statuArr[orderDetails.status] }}</span>
                </div>
                <div class="goods-total">
                    <span>商品总额</span>
                    <span class="col">¥{{ orderDetails.total }}</span>
                </div>
                <div class="goods-freight">
                    <span>+运费</span>
                    <span class="col">¥{{ orderDetails.freight }}</span>
                </div>
                <div class="order-total">实际金额: <span class="col">¥{{ orderDetails.truetotal }}</span></div>
                <div class="order-time">下单时间：{{ orderDetails.ordertime }}</div>
            </div>
        </div>
    </div>
</template>
<script>
import IScroll from '../../../assets/js/lib/iscroll.js'
import { addEventListener, removeEventListener } from '../../../assets/js/utils/compatible.js'
import MyHeader from '../../../components/page_header/index'
import { mapState, mapActions } from 'vuex'
export default {
    data() {
        return {
            statuArr: {
                '0': '待付款',
                '1': '待收货',
                '2': '已收货'
            }
        }
    },
    created() {
        console.log('ooooo')
        this.getOrderDetails({ data: { uid: this.loginInfo.uid, ordernum: this.$route.query.ordernum }, success: () => {
            this.$nextTick(() => {
                this.myScroll.refresh()
            })
        } })
    },
    mounted() {
        addEventListener(this.$refs['details-wrapper'], 'touchmove', this.stopTouchMoveEvent)
        this.myScroll = new IScroll(this.$refs['details-wrapper'], {
            click: true,
            scrollX: false,
            scrollY: true
        })
    },
    methods: {
        ...mapActions({
            getOrderDetails: 'order/getOrderDetails'
        }),
        stopTouchMoveEvent(e) {
            e.preventDefault()
        }
    },
    computed: {
        ...mapState({
            loginInfo: state => state.user.loginInfo,
            orderDetails: state => state.order.orderDetails
        })
    },
    components: {
        MyHeader
    },
    beforeDestroy() {
        removeEventListener(this.$refs['details-wrapper'], 'touchmove', this.stopTouchMoveEvent)
        this.myScroll.destroy()
    }
}
</script>
<style scoped>
.ucenter-header {
    z-index: 1
}

.page {
    padding-top: 1rem;
    background-color: #FFF;
    height: 100%;
    width: 100%;
    box-sizing: border-box;
    position: fixed;
}

.details-wrapper {
    width: 100%;
    height: 100%;
    background-color: #FFF;
    font-size: .28rem;
}

.details-main .order-code {
    width: auto;
    height: auto;
    padding-left: 2%;
    padding-top: .2rem;
}

.details-main .address-wrapper {
    width: 100%;
    margin-top: .4rem;
}

.address-wrapper .skew-wrapper {
    width: 100%;
    height: .08rem;
    display: flex;
    justify-content: space-between;
}

.skew-wrapper .skew {
    width: 5%;
    height: 100%;
    transform: skew(-40deg, 0deg);
    -webkit-transform: skew(-40deg, 0deg);
    background-color: #a2dafb;
}

.address-wrapper .address-info {
    width: 100%;
    height: 2rem;
    background-color: #fffaf0;
    position: relative;
    z-index: 1;
}

.address-info .address-user {
    width: 95%;
    position: absolute;
    left: 0.2rem;
    top: 0.2rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.address-user div {
    background: url(../../../assets/images/common/cellphone.png) 0px 0px /0.4rem 0.4rem no-repeat;
    width: auto;
    height: 0.4rem;
    padding-left: 0.4rem;
}

.address-user .user-name {
    background-image: url(../../../assets/images/home/main/my2.png)
}

.address-info .address-position {
    position: absolute;
    left: 0.2rem;
    bottom: 0px;
    height: 0.8rem;
    width: 95%;
    overflow: hidden;
    color: #848689;
}

.goods-wrapper .goods-header {
    width: 100%;
    border-bottom: 1px solid #efefef;
    padding-left: 2%;
    box-sizing: border-box;
    height: 0.8rem;
    line-height: 0.8rem;
}

.goods-list .goods-item {
    height: 1.6rem;
    width: 100%;
    box-sizing: border-box;
    padding: 0px 0.1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #efefef;
}

.goods-item .goods-image {
    width: 1.2rem;
    height: 1.2rem;
}

.goods-item .goods-image img {
    width: 100%;
    height: 100%;
}

.goods-item .goods-info {
    width: 4.7rem;
    height: 80%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}

.goods-item .goods-info .goods-title {
    width: 100%;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
}

.goods-item .goods-info .goods-attr {
    width: 100%;
}

.goods-info .goods-attr span {
    margin-right: 0.2rem;
}

.order-status,
.goods-total,
.goods-freight {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0px 0.1rem;
    box-sizing: border-box;
    border-bottom: 1px solid #efefef;
}

.order-status {
    height: 0.8rem;
}

.goods-total,
.goods-freight {
    margin-top: 0.2rem;
}

.col {
    color: #f15353;
}

.order-total,
.order-time {
    margin-top: 0.2rem;
    text-align: right;
    width: 100%;
    padding: 0px 0.1rem;
    box-sizing: border-box;
}

.order-time {
    font-size: 0.24rem;
    color: #848689;
}
</style>