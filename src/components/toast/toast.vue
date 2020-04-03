<template>
	<transition name="toast">
		<div class="toast" v-if="flag">{{ message }}</div>
	</transition>
</template>
	
<script>
import Vue from 'vue'
export default {
	data() {
		return {
			message: '',
			duration: 2000,
			flag: false
		}
	},
	created() {
		this.setDuration()
	},
	methods: {
		setDuration() {
			this.flag = true
			this.timeID = setTimeout(() => {
				this.flag = false
				Vue.prototype.$initToastComponet = null
			}, this.duration)
		}
	}
}
</script>

<style scoped>
.toast-enter {
    opacity: 0;
}

.toast-enter-active {
    transition: opacity 0.3s ease;
}

.toast-enter-to {
    opacity: 1;
}

.toast-leave {
    opacity: 1;
}

.toast-leave-active {
    transition: opacity 1s ease;
}

.toast-leave-to {
    opacity: 0;
}

.toast {
	padding: 0.2rem 0.4rem;
	border-radius: 0.1rem;
	font-size: 0.28rem;
	background-color: rgba(0, 0, 0, 0.5);
	position: fixed;
	left: 50%;
	top: 60%;
	color: #FFF;
	transform: translateX(-50%);
	z-index: 1000;
	text-align: center;
}
</style>