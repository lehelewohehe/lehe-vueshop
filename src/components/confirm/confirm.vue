<template>
    <transition name="fade">
        <div class="page" v-if="isShow">
            <div class="shelter">
            </div>
            <div class="dialog-box">
                <div class="box-text">{{ msg }}</div>
                <div class="choose">
                    <div class="box-ok" @click="handleBtn(0)">{{ btns[0].text }}</div>
                    <div class="box-cancel active" @click="handleBtn(1)">{{ btns[1].text }}</div>
                </div>
            </div>
        </div>
    </transition>
</template>
<script>
export default {
    data() {
        return {
            msg: '确认要删除吗?',
            btns: [{
                    text: '取消',
                    onPress: () => {}
                },
                {
                    text: '确定',
                    onPress: () => {}
                }
            ],
            isShow: false
        }
    },
    methods: {
        handleBtn(index) {
            console.log(index)
            if (this.btns[index]) {
                this.btns[index].onPress()
            }
            this.isShow = false
        }
    }
}
</script>
<style scoped>
.page {
    width: 100%;
    height: 100%;
    position: fixed;
    left: 0;
    top: 0;
    z-index: 10;
}

.page .shelter {
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, .7);
    position: absolute;
    left: 0;
    top: 0;
    z-index: 1;
}

.page .dialog-box {
    position: fixed;
    top: 45%;
    left: 50%;
    width: 6.4rem;
    overflow: hidden;
    font-size: 0.28rem;
    background-color: #fff;
    border-radius: 0.32rem;
    transform: translate3d(-50%, -50%, 0);
    backface-visibility: hidden;
    transition: .3s;
    transition-property: transform, opacity, -webkit-transform;
    z-index: 10;
}

.page .dialog-box .box-text {
    padding: 0.48rem;
    text-align: center;
}

.page .dialog-box .choose {
    display: flex;
    justify-content: space-between;
    height: 1rem;
    line-height: 1rem;
    font-size: 0.32rem;
}

.page .dialog-box .choose div {
    text-align: center;
    width: 50%;
    border: 1px solid #ebedf0;
}

.page .dialog-box .choose div.active {
    color: #1989fa;
}

.fade-enter {
	opacity: 0;
}

.fade-enter-active {
	transition: opacity 0.3s ease;
}

.fade-enter-to {
	opacity: 1;
}

.fade-leave {
	opacity: 1;
}

.fade-leave-active {
	transition: opacity 0.3s ease;
}

.fade-leave-to {
	opacity: 0;
}
</style>