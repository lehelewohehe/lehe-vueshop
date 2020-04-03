<template>
	<div class="page">
		<my-header :isLeft="true" :title="'添加收货地址'" class="ucenter-header"></my-header>
		<div class="add-main">
			<ul>
				<li>收货人</li>
				<li><input type="text" placeholder="收货人姓名"></li>
			</ul>
			<ul>
				<li>联系方式</li>
				<li><input type="text" placeholder="联系人手机号"></li>
			</ul>
			<ul>
				<li>所在地区</li>
				<li><input type="text" placeholder="请选择所在地区"></li>
			</ul>
			<ul>
				<li>详细地址</li>
				<li><input type="text" placeholder="街道详细地址"></li>
			</ul>
			<ul>
				<li>设置为默认地址</li>
				<li><input type="checkbox" placeholder="街道详细地址"></li>
			</ul>
		</div>
		<div class="save-btn-wrapper">
			<my-button class="save-btn">保存</my-button>
		</div>
	</div>
</template>

<script>
import Vue from 'vue'
import MyHeader from '../../../components/page_header/index'
import { mapState, mapActions } from 'vuex'
import button from '../../../components/button/index'
Vue.use(button)
export default {
	components: {
        MyHeader
    }
}	
</script>

<style scoped>
.page {
    padding-top: 1rem;
    padding-bottom: 1.3rem;
    background-color: #FFF;
    height: 100%;
    width: 100%;
    box-sizing: border-box;
    position: fixed;
}

.add-main {
	width: 100%;
}

.add-main ul {
	width: 100%;
	height: 1rem;
	display: flex;
	justify-content: flex-start;
	align-items: center;
	padding: 0px 0.3rem;
	border-bottom: 1px solid #efefef;
	box-sizing: border-box;
	font-size: 0.32rem;
}

.add-main li {
	height: 100%;
	line-height: 1rem;
}

.add-main ul li:nth-child(2) {
	width: 60%;
}

.add-main ul:last-child li:nth-child(2) {
	display: flex;
	align-items: center;
}

.add-main ul input {
	margin-left: 0.3rem;
	font-size: 0.28rem;
	height: 100%;
	width: 100%;
}

.add-main ul input[type=checkbox] {
	width: 0.4rem;
	height: 0.4rem;
}

.save-btn-wrapper {
	width: 85%;
    height: .8rem;
    line-height: 0.8rem;
    border-radius: 4px;
    margin: 0 auto;
    display: block;
    border: 0 none;
    outline: none;
    font-size: .32rem;
    color: #fff;
    margin-top: .4rem;
    border-radius: 0.1rem;
}

.save-btn-wrapper .save-btn {
	background-color: #fcb40a;
    border-radius: 0.1rem;
}
</style>