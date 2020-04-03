<template>
    <div class="classify-content" ref="classify-content">
        <div class="content-container">
            <template v-if="categoryShow.length">
                <div class="content-item" v-for="(item, index) in categoryShow" :key="item.title +'goods' + index">
                <div class="content-header">{{ item.title }}</div>
                <div class="content-main">
                    <div class="main-item" v-for="(subItem, subIndex) in item.goods" :key="subItem.image +'goods' + subIndex" @click="$router.push('/goods/details/item?gid=' + subItem.gid)">
                        <div class="item-image"><img src="../../../assets/images/common/lazyImg.jpg" :data-echo="subItem.image"  alt=""></div>
                        <p>{{ subItem.title }}</p>
                    </div>
                </div>
            </div>
            </template>
            <div class="no-data" v-else>没有数据</div>
        </div>
    </div>
</template>
<script>
import IScroll from '../../../assets/js/lib/iscroll.js'
import { addEventListener, removeEventListener } from '../../../assets/js/utils/compatible.js'
import {mapState, mapActions} from 'vuex'
export default {
    data() {
        return {

        }
    },
    created() {
        this.getCategoryShow({cid: this.$route.query.cid, success: () => {
            this.$nextTick(() => {
                this.myScroll.refresh()
                this.$utils.lazyImg()
            })
        }})
    },
    mounted() {
        addEventListener(this.$refs['classify-content'], 'touchmove', this.stopTouchMoveEvent)
        this.myScroll = new IScroll(this.$refs['classify-content'], {
            click: true,
            scrollX: false,
            scrollY: true
        })
        this.myScroll.on('scrollEnd', () => {
            this.$utils.lazyImg()
        })
    },
    computed: {
        ...mapState({
            'categoryShow': state => state.goods.categoryShow
        })
    },
    methods: {
        ...mapActions({
            'getCategoryShow': 'goods/getCategoryShow'
        }),
        stopTouchMoveEvent(e) {
            e.preventDefault()
        }
    },
    beforeDestroy() {
        console.log(11111)
        this.myScroll.destroy()
        removeEventListener(this.$refs['classify-content'], 'touchmove', this.stopTouchMoveEvent)
    },
    beforeRouteUpdate(to, from, next) {
        this.getCategoryShow({cid: to.query.cid, success: () => {
            this.$nextTick(() => {
                this.myScroll.refresh()
                this.$utils.lazyImg()
            })
        }})
        next()
    }
}
</script>
<style scoped>
.classify-content {
    width: 100%;
    height: 100%;
}

.classify-content .content-container {
    width: 100%;
}

.content-container .content-header {
    height: 0.6rem;
    width: 100%;
    line-height: 0.6rem;
}

.content-container .content-main {
    width: 100%;
    background-color: #FFF;
    display: flex;
    justify-content: flex-start;
    padding-top: 0.2rem;
    flex-wrap: wrap;
}

.content-container .content-main .main-item {
    width: 33.3%;
    height: 2.5rem;
}

.content-main .main-item .item-image {
    width: 1.5rem;
    height: 1.5rem;
    margin: 0 auto;
}

.main-item .item-image img {
    width: 100%;
    height: 100%;
}

.content-main .main-item p {
    width: 90%;
    height: .8rem;
    font-size: .24rem;
    overflow: hidden;
    text-align: center;
    margin: 0 auto;
    white-space: nowrap;
    text-overflow: ellipsis;
    margin-top: .2rem;
}

.no-data {
    text-align:center;
    font-size: .32rem;
    margin-top: .3rem;
}
</style>