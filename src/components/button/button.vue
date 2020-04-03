<template>
	<span class="btn" @click="handleClick()"><slot></slot></span>
</template>

<script>
export default {
	name: 'my-button',
	props: {
		type: {
			type: String,
			default: 'button'
		}
	},
	methods: {
		handleClick() {
			this.$emit('click')
		}
	}
}
</script>

<style scoped>
.btn {
	display: block;
	width: 100%;
	height: 100%;
	background-color: red;
	color: #FFF;
	text-align: center;
	font-size: 0.32rem;
}
</style>