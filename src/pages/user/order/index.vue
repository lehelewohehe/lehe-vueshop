<template>
    <div class="page">
        <my-header :isLeft="true" :title="title" class="ucenter-header"></my-header>
        <div class="mytag">
            <order-tags :list="list" @click="goPage"></order-tags>
        </div>
        <div class="order-main">
            <router-view></router-view>
        </div>
    </div>
</template>
<script>
import MyHeader from '../../../components/page_header/index'
import OrderTags from '../../../components/order_tags/index'
import { mapState, mapActions } from 'vuex'

export default {
    data() {
        return {
            title: '全部订单',
            list: [
                { name: '全部订单', active: true, status: 'all' },
                { name: '待支付', active: false, status: 'loadPay' },
                { name: '待收货', active: false, status: 'getter' },
                { name: '待评价', active: false, status: 'review' }
            ]
        }
    },
    created() {
        this.setListActive(this.$route.query.status)
    },
    components: {
        MyHeader,
        OrderTags
    },
    methods: {
        ...mapActions({
            isSafeLogin: 'user/isSafeLogin'
        }),
        stopTouchMoveEvent(e) {
            e.preventDefault()
        },
        goPage(status, index) {
            this.isSafeLogin({
                data: { uid: this.loginInfo.uid, 'auth_token': this.loginInfo.auth_token },
                success: () => {
                    for (let i = 0; i < this.list.length; i++) {
                        if (this.list[i].status) {
                            this.list[i].active = false
                        }
                    }
                    this.list[index].active = true
                    if (status.startsWith('/user/order/list')) {
                        this.$router.replace(status)
                    } else {
                        this.$router.push(status)
                    }
                },
                error: () => {
                    this.$router.push('/login')
                }
            })
        },
        setListActive(status) {
            for (let i = 0; i < this.list.length; i++) {
                if (this.list[i].status) {
                    this.list[i].active = false
                }
                if (this.list[i].status === status) {
                    this.list[i].active = true
                    document.title = this.list[i].name
                }
            }
        }
    },
    computed: {
        ...mapState({
            loginInfo: state => state.user.loginInfo,
        })
    },
    beforeRouteUpdate(to, from, next) {
        this.setListActive(to.query.status)
        next()
    }
}
</script>
<style scoped>
.ucenter-header {
    z-index: 1
}

.page {
    padding-top: 1.8rem;
    background-color: #FFF;
    height: 100%;
    width: 100%;
    box-sizing: border-box;
    position: fixed;
}

.mytag {
    width: 100%;
    height: 0.8rem;
    font-size: .28rem;
    position: absolute;
    left: 0px;
    top: 1rem;
    background-color: #FFF;
    z-index: 1;
}

.order-main {
    height: 100%;
    width: 100%;
}
</style>