<template>
    <div class="page">
        <my-header :isLeft="true" :isRight="true" :right="'保存'" :title="'个人资料'" class="ucenter-header" @click="savaUserInfo"></my-header>
        <div class="profile-main">
            <ul class="avatar">
                <li>头像</li>
                <li><input type="file" @change="uploadImg"><img ref="img" :src="userInfo.head ? userInfo.head : ''" alt=""></li>
            </ul>
            <ul class="name">
                <li>昵称</li>
                <li><input type="text" value="会员11111" v-model="nickname"></li>
                <li></li>
            </ul>
            <ul class="sex">
                <li>性别</li>
                <li @click="toggleSelectBox(true)"><input type="text" value="男" v-model="sex" readonly="readonly"></li>
                <li></li>
            </ul>
        </div>
        <transition name="mask">
        	<div class="mask" v-if="isSelect" @click="toggleSelectBox(false)"></div>
        </transition>
        <transition name="select">
            <div class="select-box" v-if="isSelect">
                <div class="select-header">
                    <div class="text">请选择性别</div>
                    <div class="select-close" @click="toggleSelectBox(false)">x</div>
                </div>
                <div class="select-list">
                    <ul>
                        <li class="man" @click="setSex('男')">男</li>
                        <li class="women" @click="setSex('女')">女</li>
                        <li class="cancel" @click="toggleSelectBox(false)">取消</li>
                    </ul>
                </div>
            </div>
        </transition>
    </div>
</template>
<script>
import MyHeader from '../../../components/page_header/index'
import { mapState, mapActions } from 'vuex'
import Vue from 'vue'
import Toast from '../../../components/toast/'
Vue.use(Toast)
export default {
    data() {
        return {
            nickname: '',
            sex: '男',
            isSelect: false
        }
    },
    created() {
        this.nickname = this.userInfo.nickname
        this.sex = this.userInfo.gender === '1' ? '男' : '女'
    },
    methods: {
    	...mapActions({
    		uploadAvatar: 'user/uploadAvatar',
    		updateUserInfo: 'user/updateUserInfo',
    		getUserInfo: 'user/getUserInfo'
    	}),
        toggleSelectBox(flag) {
            console.log(flag)
            this.isSelect = flag
        },
        setSex(value) {
        	this.sex = value
        	this.toggleSelectBox(false)
        },
        uploadImg(e) {
        	console.log(e)
        	this.uploadAvatar({data: {headfile: e.path[0].files[0]}, success: () => {
        		this.$refs['img'].src = '//vueshop.glbuys.com/userfiles/head/' + this.avatarInfo.msbox
        	}})
        },
        savaUserInfo() {
        	let data = {}
        	data.head = this.avatarInfo.msbox ? this.avatarInfo.msbox : ''
        	data.gender = (this.sex === '男' ? 1 : 2)
        	data.nickname = this.nickname
        	data.uid = this.userInfo.uid
        	console.log(data)
        	this.updateUserInfo({data: data, success: () => {
        		this.getUserInfo({data: {uid: this.userInfo.uid}})
                this.$toast('修改成功')
        	}})
        }
    },
    components: {
        MyHeader
    },
    computed: {
        ...mapState({
            userInfo: state => state.user.userInfo,
            avatarInfo: state => state.user.avatarInfo
        })
    }
}
</script>
<style scoped>
.select-enter {
	transform: translateY(100%);
}

.select-enter-active {
	transition: transform 0.3s ease;
}

.select-enter-to {
	transform: translateY(0px);
}

.select-leave {
	transform: translateY(0px);
}

.select-leave-active {
	transition: transform 0.3s ease;
}

.select-leave-to {
	transform: translateY(100%);
}

.mask-enter {
	opacity: 0;
}

.mask-enter-active {
	transition: opacity 0.3s ease;
}

.mask-enter-to {
	opacity: 1;
}

.mask-leave {
	opacity: 1;
}

.mask-leave-active {
	transition: opacity 0.3s ease;
}

.mask-leave-to {
	opacity: 0;
}

.page {
    padding-top: 1.4rem;
    background-color: #FFF;
    height: 100%;
    width: 100%;
    box-sizing: border-box;
    position: fixed;
}

.profile-main {
    width: 100%;
}

.profile-main ul {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #efefef;
    padding: 0px 0.3rem;
    box-sizing: border-box;
    font-size: 0.28rem;
    width: 100%;
}

.profile-main ul {
    height: 0.8rem;
    position: relative;
}

.profile-main ul li:last-child {
    width: 0.4rem;
    height: 0.4rem;
    background: url(../../../assets/images/common/right_arrow.png) 0px 0px / 0.4rem 0.4rem no-repeat;
}

.profile-main ul li:nth-child(2) {
    position: absolute;
    right: 1rem;
    width: 40%;
    height: 100%;
}

.profile-main ul li:nth-child(2) input {
    width: 100%;
    height: 100%;
    text-align: right;
    font-size: 0.28rem;
}

.profile-main .avatar {
    height: 1.2rem;
}

.profile-main .avatar li:nth-child(2) {
    background: none;
}

.profile-main .avatar li:nth-child(2),
.avatar li:nth-child(2) input,
.profile-main .avatar img {
    width: 1rem;
    height: 1rem;
    position: absolute;
}

.avatar li:nth-child(2) img,
.avatar li:nth-child(2) input {
    right: 0rem;
}

.avatar li:nth-child(2) input {
    opacity: 0;
    z-index: 1;
}

.mask {
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0px;
    top: 0px;
    z-index: 1;
    background-color: rgba(0, 0, 0, .7);
}

.select-box {
    width: 100%;
    background-color: #FFF;
    position: absolute;
    left: 0px;
    bottom: 0px;
    z-index: 2;
    font-size: 0.28rem;
    border-radius: 0.3rem 0.3rem 0px 0px;
}

.select-box .select-header {
    height: 0.88rem;
    width: 100%;
    text-align: center;
    line-height: 0.88rem;
    position: relative;
}


.select-box .select-close {
    position: absolute;
    width: 0.4rem;
    height: 0.4rem;
    content: 'X';
    border-radius: 50%;
    border: 1px solid #ACADAF;
    color: #ACADAF;
    right: 0.3rem;
    top: 40%;
    line-height: 0.4rem;
    transform: translateY(-50%);
    box-sizing: border-box;
}

.select-list li {
    text-align: center;
    height: 1rem;
    line-height: 1rem;
    border-top: 1px solid #efefef;
}
</style>