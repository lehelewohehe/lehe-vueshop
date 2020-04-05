<template>
	<div class="page-ordertags">
		<div :class="{'tags-item': true, active: item.active}" v-for="(item, index) in list" @click="handleClick(item.status, index)">{{item.name}}</div>
	</div>
</template>

<script>
export default {
	props: {
		list: {
			type: Array,
			default: []
		}
	},
	methods: {
		handleClick(status, index) {
			this.$emit('click', status, index)
		}
	}

}	
</script>

<style scoped>
.page-ordertags {
	display: flex;
	justify-content: space-between;
	align-items: center;
	width: 100%;
	height: 100%;
	border-bottom: 1px solid #dcdcdc;
}

.page-ordertags div {
	width: 25%;
	height: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
}

.page-ordertags div.active {
	border-bottom: 1px solid red;
}
</style>