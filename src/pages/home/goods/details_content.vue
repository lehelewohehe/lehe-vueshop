<template>
	<div class="page" v-html="$parent.goodsDetails.bodys">
	</div>
</template>

<script>
export default {
	mounted() {
		let imgs = document.getElementsByTagName('img')
		for(let i = 0; i < imgs.length; i++) {
			imgs[i].onload = () => {
				this.$parent.myScroll.refresh()
			}
		}
	}
}	
</script>

<style scoped>
.page {
	width: 100%;
	min-height: 100%;
	background-color: #FFF;
}

.page img {
	width: 100% !important;
}
</style>