<template>
    <div :class="{'switch-wrapper': true, active: isActive}" @click="handleClick">
        <div class="switch">
        </div>
    </div>
</template>
<script>
export default {
	data() {
		return {
			isActive: false
		}
	},
    methods: {
        handleClick() {
        	this.isActive = !this.isActive
            this.$emit('click')
        }
    }
}
</script>
<style scoped>
.switch-wrapper {
    width: 100%;
    height: 100%;
    background-color: rgb(235, 22, 37, 0);
    border: 1px solid rgba(0, 0, 0, .1);
    position: relative;
    display: flex;
    align-items: center;
    transition: all 0.3s ease;
}

.switch-wrapper.active {
    background-color: rgb(235, 22, 37, 1);
}

.switch-wrapper .switch {
    position: absolute;
    left: 0px;
    top: 0px;
    padding: 25%;
    background-color: #fff;
    box-shadow: 0 3px 1px 0 rgba(0,0,0,.05), 0 2px 2px 0 rgba(0,0,0,.1), 0 3px 3px 0 rgba(0,0,0,.05);
    transform: translateX(0);
    transition: all 0.3s ease;
    border-radius: 50%;
}

.switch-wrapper.active .switch {
	transform: translateX(100%);
}
</style>