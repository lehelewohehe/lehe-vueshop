<template>
    <div class="order-wrapper" ref="order-wrapper">
        <div class="order-list">
            <template v-if="!isReview">
                <div class="order-item" v-for="(item, index) in (orderAll.data ? orderAll.data : [])" :key="index" @click="goPage('/user/order/details?ordernum=' + item.ordernum)">
                    <div class="item-header">
                        <div class="order-code">订单编号：{{ item.ordernum }}</div>
                        <div class="order-status">{{ statuArr[item.status] }}</div>
                    </div>
                    <div class="item-center" v-for="(subItem, subIndex) in (item.goods ? item.goods : [])" :key="subIndex">
                        <div class="order-image"><img :src="subItem.image" alt=""></div>
                        <div class="order-text">
                            <div class="order-title">{{ subItem.title }}</div>
                            <div class="order-num">x {{ subItem.amount }}</div>
                        </div>
                    </div>
                    <div class="item-footer">
                        <div class="order-money">实付金额：¥{{ item.total }}</div>
                        <div class="order-btn">
                            <template v-if="item.status === '0'">
                                <div class="cancel-btn">
                                    <my-button class="cancel" @click="cancelOneOrder(item.ordernum)">取消订单</my-button>
                                </div>
                                <div class="cancel-btn">
                                    <my-button class="cancel" @click="confirmOneGetter(item.ordernum)">去付款</my-button>
                                </div>
                            </template>
                            <template v-else-if="item.status === '1'">
                                <div class="cancel-btn">
                                    <my-button class="cancel">已收货</my-button>
                                </div>
                            </template>
                            <template v-else-if="item.status === '2'">
                                <div class="cancel-btn">
                                    <my-button class="cancel">已收货</my-button>
                                </div>
                            </template>
                        </div>
                    </div>
                </div>
            </template>
            <template v-if="isReview">
                <div class="order-item" v-for="(item, index) in (orderReview.data ? orderReview.data : [])" :key="index" @click="goPage('/user/order/details?ordernum=' + item.ordernum)">
                    <div class="item-header">
                        <div class="order-code">订单编号：{{ item.ordernum }}</div>
                        <div class="order-status">{{ statuArr[item.status] }}</div>
                    </div>
                    <div v-for="(subItem, subIndex) in (item.goods ? item.goods : [])" :key="subIndex">
                        <div class="item-center">
                            <div class="order-image"><img :src="subItem.image" alt=""></div>
                            <div class="order-text">
                                <div class="order-title">{{ subItem.title }}</div>
                                <div class="order-num">x {{ subItem.amount }}</div>
                            </div>
                        </div>
                        <div class="item-footer">
                            <div class="order-money"></div>
                            <div class="order-btn">
                                <template v-if="subItem.isreview === '0'">
                                    <div class="cancel-btn">
                                        <my-button class="cancel" @click="goPage(`/user/order/add_review?ordernum=${item.ordernum}&gid=${subItem.gid}`)">评价</my-button>
                                    </div>
                                </template>
                                <template v-else-if="subItem.isreview === '1'">
                                    <div class="cancel-btn">
                                        <my-button class="cancel" @click="goPage(`/user/order/add_review?ordernum=${item.ordernum}&gid=${subItem.gid}`)">追加评价</my-button>
                                    </div>
                                </template>
                            </div>
                        </div>
                    </div>
                </div>
            </template>
        </div>
    </div>
</template>
<script>
import IScroll from '../../../assets/js/lib/iscroll.js'
import { addEventListener, removeEventListener } from '../../../assets/js/utils/compatible.js'
import Vue from 'vue'
import { mapState, mapActions } from 'vuex'
import button from '../../../components/button/index'
import Toast from '../../../components/toast/'
import confirm from '../../../components/confirm/index'
Vue.use(button)
Vue.use(Toast)
Vue.use(confirm)
export default {
    data() {
        return {
            list: {
                all: 'all',
                loadPay: '0',
                getter: '1',
                review: '2'
            },
            isReview: false,
            statuArr: {
                '0': '待付款',
                '1': '待收货',
                '2': '已收货'
            }

        }
    },
    created() {
        console.log(this.$route.query.status)
        this.getOrderData(this.$route.query.status)
    },
    mounted() {
        addEventListener(this.$refs['order-wrapper'], 'touchmove', this.stopTouchMoveEvent)
        this.myScroll = new IScroll(this.$refs['order-wrapper'], {
            click: true,
            scrollX: false,
            scrollY: true
        })
    },
    methods: {
        ...mapActions({
            getOrderAll: 'order/getOrderAll',
            getOrderReview: 'order/getOrderReview',
            cancelOrder: 'order/cancelOrder',
            confirmGetter: 'order/confirmGetter'
        }),
        stopTouchMoveEvent(e) {
            e.preventDefault()
        },
        getIndex(key) {
            switch (key) {
                case 'all':
                    return 0
                    break
                case 'loadPay':
                    return 1
                    break
                case 'getter':
                    return 2
                    break
                case 'review':
                    return 3
                    break
                default:
                    return 0
            }
        },
        cancelOneOrder(ordernum) {
            setTimeout(() => {
                this.$confirm('是否删除吗?', [{
                        text: '取消',
                        onPress: () => {

                        }
                    },
                    {
                        text: '确定',
                        onPress: () => {
                            this.cancelOrder({
                                data: { uid: this.loginInfo.uid, ordernum: ordernum },
                                success: (data) => {
                                    this.$router.go(0)
                                    this.$toast(data)
                                }
                            })
                        }
                    }
                ])
            }, 0)

        },
        confirmOneGetter(ordernum) {
            setTimeout(() => {
                this.$confirm('是否删除吗?', [{
                        text: '取消',
                        onPress: () => {

                        }
                    },
                    {
                        text: '确定',
                        onPress: () => {
                            this.confirmGetter({
                                data: { uid: this.loginInfo.uid, ordernum: ordernum },
                                success: (data) => {
                                    this.$router.go(0)
                                    this.$toast(data)
                                }
                            })
                        }
                    }
                ])
            }, 0)
        },
        goPage(url) {
            this.$parent.goPage(url, this.getIndex(this.$route.query.status))
        },
        dropDownRefresh(obj, status, fuc) {
            if (!obj.pageinfo) {
                return
            }
            this.myScroll.on('scrollEnd', () => {
                console.log(status)
                let sub = -Math.abs(this.myScroll.scrollerHeight - this.myScroll.wrapperHeight)
                console.log(sub, this.myScroll.y === sub, this.myScroll.y, (parseInt(obj.pageinfo.page) < parseInt(obj.pageinfo.pagenum)))
                if (this.myScroll.y === sub && (parseInt(obj.pageinfo.page) < parseInt(obj.pageinfo.pagenum))) {
                    fuc({
                        data: {
                            uid: this.loginInfo.uid,
                            status: this.list[status],
                            page: parseInt(obj.pageinfo.page) + 1
                        },
                        success: () => {
                            this.$nextTick(() => {
                                this.myScroll.refresh()
                            })
                        }
                    })
                } else if ((parseInt(obj.pageinfo.page) === parseInt(obj.pageinfo.pagenum))) {
                    this.myScroll._events.scrollEnd = null
                }
            })
        },
        getOrderData(status) {
            if (status !== 'review') {
                this.isReview = false
                this.getOrderAll({
                    data: { uid: this.loginInfo.uid, page: 1, status: this.list[status] },
                    success: () => {
                        this.$nextTick(() => {
                            this.myScroll.refresh()
                            this.dropDownRefresh(this.orderAll, status, this.getOrderAll)
                        })
                    }
                })
            } else {
                this.isReview = true
                this.getOrderReview({
                    data: { uid: this.loginInfo.uid, page: 1 },
                    success: () => {
                        this.$nextTick(() => {
                            this.myScroll.refresh()
                            this.dropDownRefresh(this.orderReview, status, this.getOrderReview)
                        })
                    }
                })
            }
        }
    },
    computed: {
        ...mapState({
            loginInfo: state => state.user.loginInfo,
            orderAll: state => state.order.orderAll,
            orderReview: state => state.order.orderReview
        })
    },
    beforeDestroy() {
        removeEventListener(this.$refs['order-wrapper'], 'touchmove', this.stopTouchMoveEvent)
        this.myScroll.destroy()
    },
    beforeRouteUpdate(to, from, next) {
        this.myScroll._events.scrollEnd = null
        this.getOrderData(to.query.status)
        next()
    }
}
</script>
<style scpoed>
.order-wrapper {
    width: 100%;
    height: 100%;
}

.order-wrapper .order-item {
    width: 100%;
    padding: 0.1rem 0.1rem 0px;
    box-sizing: border-box;
    font-size: 0.28rem;
    border-bottom: 1px solid #f17f1f;
}

.order-wrapper .order-item .item-footer,
.order-wrapper .order-item .item-center,
.order-wrapper .order-item .item-header {
    width: 100%;
    border-bottom: 1px solid #efefef;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.order-wrapper .order-item .item-header {
    height: 0.8rem;
}

.order-wrapper .order-item .item-center {
    height: 1.6rem;
}

.order-item .item-center .order-image {
    width: 1.2rem;
    height: 1.2rem;
}

.item-center .order-image img {
    width: 1.2rem;
    height: 1.2rem;
}

.order-item .item-center .order-text {
    width: 5.8rem;
}

.item-center .order-text .order-title {
    width: 90%;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
}

.item-center .order-text .order-num {
    text-align: right;
    width: 100%;
}

.order-wrapper .order-item .item-footer {
    height: 0.8rem;
}

.item-footer .order-btn {
    display: flex;
    flex-wrap: nowrap;
}

.item-footer .order-btn>div {
    font-size: .24rem;
    width: 1.24rem;
    height: .52rem;
    line-height: .52rem;
    text-align: center;
    margin-left: .2rem;
}

.order-btn>div .cancel {
    background-color: #FFF;
    color: #f15353;
    font-size: 0.28rem;
    border: 1px solid #f15353;
    border-radius: 4px;
}
</style>