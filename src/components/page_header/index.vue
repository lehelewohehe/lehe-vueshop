<template>
	<div class="page-header">
		<div class="left" v-if="isLeft" @click="$router.go(-1)"></div>
		<div class="title">{{ title }}</div>
		<div class="right" v-if="isRight" @click="handlerClick()">{{ right }}</div>
	</div>
</template>

<script>
export default {
	methods: {
		handlerClick() {
			this.$emit('click')
		}
	},
	props: {
		isLeft: {
			type: Boolean,
			default: true
		},
		isRight: {
			type: Boolean,
			default: true
		},
		title: {
			type: String,
			default: ''
		},
		right: {
			type: String,
			default: ''
		}
	}
}	
</script>

<style scoped>
.page-header {
	height: 1rem;
	background-color: #FFF;
	position: absolute;
	left: 0px;
	top: 0px;
	width: 100%;
	border-bottom: 1px solid #efefef;
}

.page-header .left,
.page-header .right,
.page-header .title {
	position: absolute;
	top: 50%;
	transform: translateY(-50%);
	font-size: 0.32rem;
}

.page-header .left {
	width: 0.8rem;
	height: 0.8rem;
	background: url('../../assets/images/home/goods/back.png') 0 0/0.8rem 0.8rem no-repeat;
	left: 0.2rem;
}

.page-header .right {
	right: 0.1rem; 
}

.page-header .title {
	left: 50%;
	transform: translateX(-50%) translateY(-50%);
}
</style>