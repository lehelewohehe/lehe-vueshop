<template>
    <div class="page">
        <my-header :title="'会员登录'" :isRight="false"></my-header>
        <div class="login-wrapper">
            <div class="login-username">
                <input type="text" v-model="username" placeholder="手机号">
            </div>
            <div class="login-password">
                <input :type="isSwitch ? 'password' : 'text'" v-model="password" placeholder="密码">
                <div class="login-switch">
                    <my-switch class="my-switch" @click="switchPassword"></my-switch>
                </div>
            </div>
            <div class="login-btn-wrapper">
                <my-button class="login-btn" @click="doLogin">登录</my-button>
            </div>
            <div class="login-helper">
                <div class="forget-password"><span></span>忘记密码</div>
                <div class="quick-reg"><span></span>快速注册</div>
            </div>
        </div>
    </div>
</template>
<script>
import MyHeader from '../../../components/page_header/index'
import MySwitch from '../../../components/switch/index'
import Vue from 'vue'
import {mapState, mapActions} from 'vuex'
import button from '../../../components/button/index'
import Toast from '../../../components/toast/'
Vue.use(button)
Vue.use(Toast)
export default {
	data() {
		return {
			isSwitch: true,
			username: '',
			password: ''
		}
	},
	methods: {
        ...mapActions({
            login: 'user/login'
        }),
		switchPassword() {
			this.isSwitch = !this.isSwitch
		},
		doLogin() {
            if (this.password.match(/^\s*$/)) {
                this.$toast("请填写密码")
                return
            }
            if (this.username.match(/^\s*$/)) {
                this.$toast("请填写账号")
                return
            }
			this.login({data: {cellphone: this.username, password: this.password}, success: () => {
                this.$router.push('/my')
            }, error: () => {
                this.$toast('密码或者用户名错误')
            }})
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

.login-wrapper .login-username,
.login-wrapper .login-password {
    width: 90%;
    height: 0.84rem;
    margin: 0 auto;
    border: 1px solid #efefef;
    margin-bottom: 0.4rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.login-wrapper input {
    width: 92%;
    height: 82%;
    border: none;
    outline: none;
    font-size: .28rem;
    padding-left: .2rem;
}

.login-wrapper .login-password input {
	width: 75%;
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

.login-helper {
    display: flex;
    justify-content: space-between;
    margin: 0 auto;
    margin-top: .3rem;
    font-size: 0.24rem;
    width: 85%;
}

.login-helper span {
    width: 0.32rem;
    height: 0.32rem;
    background-position: 0px 0px;
    background-size: 0.32rem 0.32rem;
    background-image: url(../../../assets/images/home/index/forget.png);
    display: inline-block;
}

.login-helper .quick-reg span {
    background-image: url(../../../assets/images/home/index/reg.png)
}

.login-helper .quick-reg,
.login-helper .forget-password {
    display: flex;
    align-items: center;
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