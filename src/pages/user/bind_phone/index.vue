<template>
    <div class="page">
        <my-header :isLeft="true" :title="'绑定手机'" class="ucenter-header"></my-header>
        <div class="phone-main">
            <div class="phone-tip">
                <div class="tip-icon"></div>
                新手机号验证后，即可绑定成功！
            </div>
            <div class="phone-wrapper">
                <div class="cellphone-wrapper">
                    <input type="text" class="cellphone" placeholder="绑定手机号" @input="checkCellPhone" v-model="cellPhone">
                </div>
                <div class="code-wrapper">
                    <input type="text" class="code" placeholder="请输入短信验证码" v-model="vcode">
                    <div :class="{'code-btn': true, active: isActive}" @click="getCode" ref="codeBtn">获取验证码</div>
                </div>
            </div>
            <div class="phone-btn-wrapper">
                <my-button class="phone-btn" @click="checkCode">下一步</my-button>
            </div>
        </div>
    </div>
</template>
<script>
import MyHeader from '../../../components/page_header/index'
import Vue from 'vue'
import { mapState, mapActions } from 'vuex'
import button from '../../../components/button/index'
import Toast from '../../../components/toast/'
Vue.use(button)
Vue.use(Toast)
export default {
    data() {
        return {
            cellPhone: '',
            vcode: '',
            isActive: false,
            isSelect: true
        }
    },
    created() {
        //this.updateCellPhone({data: {uid: this.loginInfo.uid, cellphone: this.cellPhone, vcode: this.vcode}})
    },
    methods: {
        ...mapActions({
            updateCellPhone: 'user/updateCellPhone'
        }),
        checkCellPhone() {
            console.log('11111')
            if (this.cellPhone.length === 11 && this.isSelect) {
                this.isActive = true
            } else if (this.isSelect) {
                this.isActive = false
            }
        },
        checkCode() {
            if (!this.cellPhone.match(/^1([358][0-9]|4[579]|66|7[0135678]|9[89])[0-9]{8}$/)) {
                this.$toast('手机号格式不正确')
            } else if(this.vcode.match(/^\s*$/)) {
            	this.$toast('验证码为空')
            } else {
            	this.updateCellPhone({data: {uid: this.loginInfo.uid, cellphone: this.cellPhone, vcode: this.vcode}, success: (data) => {
            		this.$router.go(-1)
            		this.$toast(data)
            	}})
            }
        },
        getCode() {
        	if(this.isActive) {
        		this.isSelect = false
        		this.isActive = false
        		let i = 10
        		console.log(this.$refs['codeBtn'].innerHTML)
        		this.$refs['codeBtn'].innerHTML = '重新获取(' + i + ')'
        		this.timeID = setInterval(() => {
        			i -= 1
        			this.$refs['codeBtn'].innerHTML = '重新获取(' + i + ')'
        			if(i === 0) {
        				this.$refs['codeBtn'].innerHTML = '获取验证码'
        				this.isActive = true
        				this.isSelect = true
        				clearInterval(this.timeID)
        			}
        		}, 1000)
        	}
        }
    },
    computed: {
        ...mapState({
            loginInfo: state => state.user.loginInfo
        })
    },
    components: {
        MyHeader
    },
    destroyed() {
        clearInterval(this.timeID)
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

.phone-tip {
    width: 100%;
    height: 1rem;
    background-color: #f3f5c4;
    color: #ac7700;
    font-size: .28rem;
    display: flex;
    align-items: center;
    padding-left: 0.4rem;
}

.phone-wrapper {
    margin-top: 0.4rem;
    font-size: .28rem;
    color: #717376;
}

.phone-wrapper>div {
    width: 93%;
    height: .8rem;
    border: 1px solid #c5cbcf;
    border-radius: 4px;
    margin: 0 auto;
    overflow: hidden;
    margin-top: 0.2rem;
}

.phone-wrapper>div input {
    width: 100%;
    height: 100%;
    padding-left: 0.2rem;
    box-sizing: border-box;
    font-size: 0.28rem;
}

.phone-wrapper .code-wrapper input {
    width: 70%;
}

.phone-wrapper .code-btn {
    height: 100%;
    width: 30%;
    box-sizing: border-box;
    border-left: 1px solid #c5cbcf;
    display: inline-block;
    text-align: center;
    line-height: 0.8rem;
}

.phone-wrapper .code-btn.active {
    color: red;
}

.phone-tip .tip-icon {
    width: 0.48rem;
    height: 0.48rem;
    display: inline-block;
    background: url(../../../assets/images/user/mobile/tip.png) 0px 0px /0.48rem 0.48rem no-repeat;
    margin-right: 0.2rem;
}

.phone-btn-wrapper {
    width: 93%;
    height: .8rem;
    font-size: .28rem;
    color: #fff;
    text-align: center;
    line-height: .8rem;
    margin: 0 auto;
    border-radius: 4px;
    margin-top: .2rem;
}

.phone-btn-wrapper .phone-btn {
    border-radius: 0.1rem;
}
</style>