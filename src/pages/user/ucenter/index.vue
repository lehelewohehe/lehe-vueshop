<template>
    <div class="page">
        <my-header :isLeft="false" :isRight="false" :title="'个人中心'" class="ucenter-header"></my-header>
        <div class="ucenter-main" ref="ucenter-main">
            <div class="ucenter-wrap">
                <div class="ucenter-card">
                    <div class="user-head"><img :src="userInfo.head ? userInfo.head : ''" alt=""></div>
                    <div class="user-nickname">昵称: {{ userInfo.nickname ? userInfo.nickname : '' }}</div>
                    <div class="user-intergal">我的积分: {{ userInfo.points ? userInfo.points : 0 }}</div>
                </div>
                <div class="order-tags">
                    <div class="order-header">
                        <span>全部订单</span>
                        <div class="watch-allorder" @click="goPage('/user/order/list?status=all')">查看全部订单></div>
                    </div>
                    <div class="order-main">
                        <div class="load-pay" @click="goPage('/user/order/list?status=loadPay')">
                            <ul>
                                <li></li>
                                <li>待支付</li>
                            </ul>
                        </div>
                        <div class="load-getter" @click="goPage('/user/order/list?status=getter')">
                            <ul>
                                <li></li>
                                <li>待收货</li>
                            </ul>
                        </div>
                        <div class="load-comment" @click="goPage('/user/order/list?status=review')">
                            <ul>
                                <li></li>
                                <li>待评价</li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div class="ucenter-option">
                    <ul>
                        <li class="personal-info" @click="goPage('/user/profile')"><span>个人资料</span><span></span></li>
                        <li class="address" @click="goPage('/user/address')"><span>收获地址</span><span></span></li>
                        <li class="bind-phone" @click="goPage('/user/bind_phone')"><span>绑定手机</span><span></span></li>
                        <li class="mod-password" @click="goPage('/user/mod_password')"><span>修改密码</span><span></span></li>
                        <li class="personal-collect" @click="goPage('/user/fav')"><span>个人收藏</span><span></span></li>
                    </ul>
                </div>
                <div class="ucenter-exit">
                    <my-button class="exit" @click="toggleLoginOrExit">{{ isLogin ? '安全退出' : '登入/注册' }}</my-button>
                </div>
            </div>
        </div>
    </div>
</template>
<script type="text/javascript">
import IScroll from '../../../assets/js/lib/iscroll.js'
import { addEventListener, removeEventListener } from '../../../assets/js/utils/compatible.js'
import MyHeader from '../../../components/page_header/index'
import Vue from 'vue'
import button from '../../../components/button/index'
import confirm from '../../../components/confirm/index'
import { mapState, mapActions } from 'vuex'
Vue.use(button)
Vue.use(confirm)

export default {
    created() {

    },
    mounted() {
        addEventListener(this.$refs['ucenter-main'], 'touchmove', this.stopTouchMoveEvent)
        this.myScroll = new IScroll(this.$refs['ucenter-main'], {
            click: true,
            scrollX: false,
            scrollY: true
        })
    },
    components: {
        MyHeader
    },
    methods: {
        ...mapActions({
            safeExit: 'user/safeExit',
            isSafeLogin: 'user/isSafeLogin'
        }),
        goPage(url) {
            this.isSafeLogin({
                data: { uid: this.loginInfo.uid, 'auth_token': this.loginInfo.auth_token },
                success: () => {
                    this.$router.push(url)
                },
                error: () => {
                    this.$router.push('/login')
                }
            })
        },
        stopTouchMoveEvent(e) {
            e.preventDefault()
        },
        toggleLoginOrExit() {
            if (this.isLogin) {
                this.$confirm('确定退出吗?', [{
                        text: '取消',
                        onPress: () => {

                        }
                    },
                    {
                        text: '确定',
                        onPress: () => {
                            this.safeExit({
                                data: { uid: this.loginInfo.uid },
                                success: () => {
                                    this.$router.push('/login')
                                }
                            })
                        }
                    }
                ])

            } else {
                this.$router.push('/login')
            }
        }
    },
    computed: {
        ...mapState({
            isLogin: state => state.user.isLogin,
            loginInfo: state => state.user.loginInfo,
            userInfo: state => state.user.userInfo
        })
    },
    beforeDestroy() {
        removeEventListener(this.$refs['ucenter-main'], 'touchmove', this.stopTouchMoveEvent)
        this.myScroll.destroy()
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
    padding: 1rem 0px 1.2rem;
}

.ucenter-header {
    z-index: 10;
}

.ucenter-main {
    width: 100%;
    height: 100%;
}

.ucenter-wrap {
    width: 100%;
    padding-bottom: 1px;
}

.ucenter-wrap .ucenter-card {
    width: 100%;
    height: 2.8rem;
    background-image: url(../../../assets/images/user/my/mybg.png);
    background-size: 100%;
    background-repeat: no-repeat;
    position: relative;
}

.ucenter-card .user-head {
    width: 1.2rem;
    height: 1.2rem;
    position: absolute;
    z-index: 1;
    left: 5%;
    bottom: 15%;
    border-radius: 50%;
}

.ucenter-card .user-head img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
}

.ucenter-card .user-nickname,
.ucenter-card .user-intergal {
    width: auto;
    height: auto;
    white-space: nowrap;
    position: absolute;
    z-index: 1;
    left: 27%;
    font-size: .24rem;
    color: #fff;
}

.ucenter-card .user-nickname {
    bottom: 35%;
}

.ucenter-card .user-intergal {
    bottom: 20%;
}

.order-tags {
    width: 100%;
    font-size: .24rem;
}

.order-tags .order-header {
    width: 100%;
    height: 0.8rem;
    margin-bottom: 1px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0px 0.1rem;
    box-sizing: border-box;
    background-color: #fff;
}

.order-tags .order-main {
    height: 1.4rem;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0px 0.75rem;
    box-sizing: border-box;
    background-color: #fff;
}

.order-main div {
    width: 1rem;
    text-align: center;
}

.order-main div ul li:nth-child(1) {
    width: 0.5rem;
    height: 0.5rem;
    background-repeat: no-repeat;
    background-position: 0px 0px;
    background-size: 0.5rem 0.5rem;
    margin: 0 auto;
}

.order-main .load-pay ul li:nth-child(1) {
    background-image: url(../../../assets/images/user/my/pay.png)
}

.order-main .load-getter ul li:nth-child(1) {
    background-image: url(../../../assets/images/user/my/shouhuo.png)
}

.order-main .load-comment ul li:nth-child(1) {
    background-image: url(../../../assets/images/user/my/comment.png)
}

.ucenter-option {
    margin-top: 0.3rem;
    background-color: #FFF;
    width: 100%;
    font-size: 0.32rem;
}

.ucenter-option li {
    width: 100%;
    height: 0.8rem;
    border-bottom: 1px solid #efefef;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-left: 0.75rem;
    padding-right: 0.2rem;
    box-sizing: border-box;
}

.ucenter-option li span:last-child {
    width: 0.4rem;
    height: 0.4rem;
    background: url(../../../assets/images/common/right_arrow.png) 0px 0px / 0.4rem 0.4rem no-repeat;
}

.ucenter-exit {
    width: 70%;
    height: .8rem;
    margin: 0 auto;
    font-size: .32rem;
    color: #fff;
    text-align: center;
    line-height: .8rem;
    margin-top: .4rem;
    margin-bottom: 0.2rem;
}

.ucenter-exit .exit {
    border-radius: 0.1rem;
}
</style>