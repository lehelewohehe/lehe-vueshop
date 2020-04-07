<template>
	<div class="page">
		<my-header :isLeft="true" :title="'评价'" class="ucenter-header"></my-header>
		<div class="comment-main">
			<div class="comment-list">
				<div class="comment-item" v-for="(item, index) in commentItem" :key="index">
					<div class="comment-name">{{ item.title }}</div>
					<div class="comment-rate">
						<van-rate v-model="value"  class="myrate"/>
					</div>
				</div>
			</div>
			<div class="comment-context">
				
			</div>
		</div>
		<div class="comment-btn-wrapper">
			<my-button>提交</my-button>
		</div>

	</div>
</template>

<script>
import MyHeader from '../../../components/page_header/index'
import { mapState, mapActions } from 'vuex'
import Vue from 'vue'
import button from '../../../components/button/index'
import { Rate } from 'vant'
Vue.use(button)
Vue.use(Rate)
export default {
	data() {
		return {
			value: 5
		}
	},
	created() {
		this.getCommentItem()
	},
	methods: {
		...mapActions({
			getCommentItem: 'order/getCommentItem'
		})
	},
	computed: {
		...mapState({
			commentItem: state => state.order.commentItem
		})
	},
	components: {
		MyHeader
	}
}
</script>
<style scoped>
.ucenter-header {
    z-index: 1
}

.page {
    padding-top: 1rem;
    background-color: #FFF;
    height: 100%;
    width: 100%;
    box-sizing: border-box;
    position: fixed;
}

.comment-item {
	width: 100%;
	height: 1rem;
	border-bottom: 1px solid #efefef;
	display: flex;
	justify-content: flex-start;
	align-items: center;
}

.comment-item .comment-name {
	font-size: .32rem;
    margin-left: 3%;
    margin-right: 15%; 
}

.myrate {
	width: 3rem;
	justify-content: space-between;
}
</style>