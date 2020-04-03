<template>
    <div class="page">
        <my-search 
        v-if="isSearch" 
        @hideSearch="hideSearch" 
        :hotwords="hotwords">   
        </my-search>
        <div class="page-header">
            <div class="back" @click="$router.go(-1)"></div>
            <div class="search" @click="isSearch = true">请输入宝贝名称</div>
        </div>
        <div class="classify-main">
            <div class="classify-wrap" ref="classify-wrap">
                <ul class="wrap-container" ref="wrap-container">
                    <li v-for="(item, index) in categoryMenu" :key="item.title + index" :class="{item: true, active: item.cid === currentCid}" @click="goItem(item.cid, index)" ref="active">{{ item.title }}</li>
                </ul>
            </div>
            <div class="classify-item">
                <router-view></router-view>
            </div>
        </div>
        <div class="serach-page">
        </div>
    </div>
</template>
<script>
import IScroll from '../../../assets/js/lib/iscroll.js'
import { addEventListener, removeEventListener } from '../../../assets/js/utils/compatible.js'
import { mapState, mapActions } from 'vuex'
import MySearch from '../../../components/search'
export default {
    data() {
        return {
            currentCid: 0,
            isSearch: false
        }
    },
    created() {
        this.currentHeight = 0
        this.getCategoryMenu({
            success: () => {
                this.$route.query.cid = this.$route.query.cid ? this.$route.query.cid : this.categoryMenu[0].cid
                this.$nextTick(() => {
                    this.categoryMenu.forEach((item, index) => {
                        console.log(this.$route.query.cid)
                        if (item.cid === this.$route.query.cid) {
                            this.goItem(this.$route.query.cid, index)
                            return
                        }
                    })
                    this.myScroll.refresh()
                })
            }
        })
    },
    computed: {
        ...mapState({
            categoryMenu: state => state.goods.categoryMenu,
            hotwords: state => state.search.hotwords
        })
    },
    mounted() {
        addEventListener(this.$refs['classify-wrap'], 'touchmove', this.stopTouchMoveEvent)
        this.myScroll = new IScroll(this.$refs['classify-wrap'], {
            click: true,
            scrollX: false,
            scrollY: true
        })
        this.myScroll.on('scrollEnd', () => {
            this.currentHeight = -this.myScroll.y
        })
    },
    methods: {
        ...mapActions({
            'getCategoryMenu': 'goods/getCategoryMenu'
        }),
        hideSearch(val) {
            this.isSearch = val
            console.log(2222)
        },
        stopTouchMoveEvent(e) {
            e.preventDefault()
        },
        goItem(cid, index) {
            // 获取当前分类需要滚动出去的距离
            let toHeight = this.$refs['active'][0].clientHeight * index
            // 计算整个分类父盒子的高的三分之一
            let wrapHeight = parseInt(this.$refs['classify-wrap'].clientHeight / 3)
            // 计算当前分类需要滚出去的距离和已经滚出去的距离的差
            let difHeight = Math.abs(toHeight - this.currentHeight)
            // 计算滚动出去的最大值
            let maxHeight = this.$refs['wrap-container'].clientHeight - this.$refs['classify-wrap'].clientHeight
            if (difHeight > wrapHeight) {
                if (toHeight > maxHeight) {
                    toHeight = maxHeight
                }
                this.myScroll.scrollTo(0, -toHeight, 500, IScroll.utils.ease.elastic)
                // 保存当前已经滚出去的距离
                this.currentHeight = toHeight
            }

            this.$router.replace('/goods/classify/item?cid=' + cid)
            this.currentCid = cid
        }
    },
    components: {
        MySearch
    },
    beforeDestroy() {
        console.log(11112)
        removeEventListener(this.$refs['classify-wrap'], 'touchmove', this.stopTouchMoveEvent)
        this.myScroll.destroy()
    }
}
</script>
<style scoped>
.page {
    width: 100%;
    height: 100vh;
    font-size: .28rem;
    overflow: hidden;
}

.page-header {
    height: 1rem;
    width: 100%;
    background-color: #FFF;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    border-bottom: 1px solid #efefef;
}

.page-header .back {
    width: 0.8rem;
    height: 0.8rem;
    background: url('../../../assets/images/home/goods/back.png') 0 0/0.8rem 0.8rem no-repeat;
}

.page-header .search {
    height: 0.73rem;
    width: 6.24rem;
    box-sizing: border-box;
    border: 1px solid #b2b2b2;
    border-radius: .1rem;
    color: #626262;
    line-height: .73rem;
    padding-left: .2rem;
}

.classify-main {
    width: 100%;
    height: 92.5vh;
    position: relative;
}

.classify-main .classify-wrap {
    position: absolute;
    left: 0px;
    top: 0px;
    width: 1.72rem;
    height: 100%;
    background-color: #FFF;
    overflow: hidden;
}

.classify-main .classify-wrap .item {
    width: 100%;
    height: .8rem;
    border-bottom: 1px solid #efefef;
    background-color: #fff;
    text-align: center;
    line-height: .8rem;
    overflow: hidden;
}

.classify-main .classify-wrap .item.active {
    color: red;
}

.classify-main .classify-item {
    height: 100%;
    padding-left: 1.95rem;
    padding-right: 0.2rem;
    width: 100%;
    box-sizing: border-box;
    overflow: hidden;
}
</style>