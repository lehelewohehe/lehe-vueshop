<template>
    <div class="swiper-container" ref="swiper-container">
        <div class="swiper-wrapper">
            <div class="swiper-slide" v-for="(item, index) in swipers" :key="item.image ? item.iamge : item">
                <img :src="item.image ? item.iamge : item" :alt="item.image ? item.iamge : item"></div>
        </div>
        <div class="swiper-pagination" ref="swiper-pagination"></div>
    </div>
</template>
<script>
import Swiper from '../../assets/js/lib/swiper.js'
export default {
    props: {
        swipers: {
            type: Array,
            default: () => []
        }
    },
    created() {
    },
    mounted() {
    },
    methods: {
        initSwipers() {
            this.$nextTick(() => {
                new Swiper(this.$refs['swiper-container'], {
                    autoplay: 3000,
                    pagination: this.$refs['swiper-pagination'],
                    autoplayDisableOnInteraction: false,
                    paginationClickable: true
                })
            })
        }
    },
    watch: {
        swipers() {
            this.initSwipers()
        }
    }
}
</script>
<style scoped>
@import '../../assets/css/common/swiper.css';
.swiper-container {
    width: 100%;
    height: 100%;
}

.swiper-container img {
    width: 100%;
    height: 100%;
}
</style>