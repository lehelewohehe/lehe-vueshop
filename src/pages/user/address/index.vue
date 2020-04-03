<template>
    <div class="page">
        <my-header :isLeft="true" :title="'收获地址'" class="ucenter-header"></my-header>
        <div class="address-wrapper" ref="address-wrapper">
            <div class="address-list">
                <div class="address-item" v-for="(item, index) in addressAll" :key="index" @click="goPage(`/user/address/mod?aid=${item.aid}`)">
                    <div class="user-info"><span class="name">{{ item.name }}</span><span class="phone">{{ item.cellphone }}</span></div>
                    <div class="address-info"><span>{{ item.isdefault ? '[默认]' : '' }}</span>{{item.province + item.address + item.city}}</div>
                    <div class="right-arrow"></div>
                </div>
            </div>
        </div>
        <div class="address-btn-wrapper">
            <my-button class="address-btn" @click="goPage('/user/address/add')">+ 添加新地址</my-button>
        </div>
    </div>
</template>
<script>
import IScroll from '../../../assets/js/lib/iscroll.js'
import { addEventListener, removeEventListener } from '../../../assets/js/utils/compatible.js'
import MyHeader from '../../../components/page_header/index'
import Vue from 'vue'
import { mapState, mapActions } from 'vuex'
import button from '../../../components/button/index'
Vue.use(button)
export default {
    created() {
        this.getAddressAll({ data: { uid: this.loginInfo.uid } })
    },
    mounted() {
        addEventListener(this.$refs['address-wrapper'], 'touchmove', this.stopTouchMoveEvent)
        this.myScroll = new IScroll(this.$refs['address-wrapper'], {
            click: true,
            scrollX: false,
            scrollY: true
        })
    },
    methods: {
        ...mapActions({
            getAddressAll: 'address/getAddressAll',
            isSafeLogin: 'user/isSafeLogin'
        }),
        stopTouchMoveEvent(e) {
            e.preventDefault()
        },
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
        }
    },
    components: {
        MyHeader
    },
    computed: {
        ...mapState({
            addressAll: state => state.address.addressAll,
            loginInfo: state => state.user.loginInfo
        })
    }
}
</script>
<style scoped>
.page {
    padding-top: 1.2rem;
    padding-bottom: 1.3rem;
    background-color: #FFF;
    height: 100%;
    width: 100%;
    box-sizing: border-box;
    position: fixed;
}

.address-btn-wrapper {
    position: absolute;
    left: 50%;
    transform: translate(-50%);
    bottom: 0.4rem;
    width: 80%;
    height: 0.8rem;
    border-radius: 0.1rem;
    line-height: 0.8rem;
}

.address-btn-wrapper .address-btn {
    border-radius: 0.1rem;
}

.address-wrapper {
    width: 100%;
    height: 100%;
    font-size: .28rem;
    overflow: hidden;
    background-color: #FFF;
}

.address-wrapper .address-item {
    height: 1.2rem;
    padding: 0.1rem 0.5rem 0.1rem 0.2rem;
    box-sizing: border-box;
    border-bottom: 1px solid #efefef;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    position: relative;
}

.address-item .user-info .name {
    margin-right: 0.3rem;
}

.address-item .address-info {
    font-size: 0.24rem;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}

.address-item .address-info span {
    color: #fdb709;
}

.address-item .right-arrow {
    width: 0.3rem;
    height: 0.3rem;
    background: url(../../../assets/images/common/right_arrow.png) 0px 0px / 0.3rem 0.3rem no-repeat;
    position: absolute;
    transform: translateY(-50%);
    top: 50%;
    right: 0.2rem;
}
</style>