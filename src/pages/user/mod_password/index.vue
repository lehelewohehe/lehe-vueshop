<template>
    <div class="page">
        <my-header :isLeft="true" :title="'修改密码'" class="ucenter-header"></my-header>
        <div class="login-wrapper">
            <div class="login-password">
                <input :type="isSwitch ? 'password' : 'text'" v-model="password" placeholder="密码不能小于六位">
                <div class="login-switch">
                    <my-switch class="my-switch" @click="switchPassword"></my-switch>
                </div>
            </div>
            <div class="login-btn-wrapper">
                <my-button class="login-btn" @click="doModify">确认修改</my-button>
            </div>
        </div>
    </div>
</template>
<script>
import MyHeader from '../../../components/page_header/index'
import { mapState, mapActions } from 'vuex'
import MySwitch from '../../../components/switch/index'
import Vue from 'vue'
import button from '../../../components/button/index'
import Toast from '../../../components/toast/'
Vue.use(button)
Vue.use(Toast)
export default {
    data() {
        return {
            isSwitch: true,
            password: ''
        }
    },
    methods: {
        ...mapActions({
            modPassword: 'user/modPassword',
            loginInfo: 'user/loginInfo'
        }),
        switchPassword() {
            this.isSwitch = !this.isSwitch
        },
        doModify() {
            if (this.password.match(/^\s*$/) || this.password.length < 6) {
                this.$toast("密码不能小于六位")
                return
            }
            this.modPassword({ data: { uid: this.loginInfo.uid, pwd: this.password }, success: () => {
            	this.$toast('修改成功')
            } })
        }
    },
    components: {
        MyHeader,
        MySwitch
    }
}
</script>
<style scoped>
.page {
    padding-top: 1.4rem;
    background-color: #FFF;
    height: 100%;
    width: 100%;
    box-sizing: border-box;
    position: fixed;
}

.login-wrapper .login-password {
    width: 90%;
    height: 0.84rem;
    margin: 0 auto;
    border: 1px solid #efefef;
    margin-bottom: 0.4rem;
    display: flex;
    justify-content: center;
    align-items: center;
}

.login-wrapper .login-password input {
    width: 80%;
    height: 82%;
    border: none;
    outline: none;
    font-size: .28rem;
    padding-left: .2rem;
}

.login-btn-wrapper {
    width: 85%;
    height: .8rem;
    margin: 0 auto;
    font-size: .36rem;
    color: #fff;
    line-height: .8rem;
    text-align: center;
    margin-top: .4rem;
}

.login-btn-wrapper .login-btn {
    border-radius: 0.1rem;
}

.login-switch {
    width: 1.2rem;
    height: 0.6rem;
    border-raduis: 0.3rem;
}

.login-switch .my-switch {
    border-radius: 0.3rem;
}
</style>