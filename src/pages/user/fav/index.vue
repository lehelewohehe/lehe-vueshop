<template>
    <div class="page">
        <my-header :isLeft="true" :title="'我的收藏'" class="ucenter-header"></my-header>
        <div class="fav-main" ref="fav-wrapper">
            <div class="fav-list">
                <div class="fav-item" v-for="(item, index) in myFavorite.data" :key="index">
                    <div class="fav-image"><img :src="item.image" alt=""></div>
                    <div class="fav-title">{{ item.title }}</div>
                    <div class="fav-price">¥{{ item.price }}</div>
                    <div class="fav-btn-wrap">
                        <div class="buy-btn">
                            <my-button class="buy" @click="$router.push(`/goods/details/item?gid=${item.gid}`)">购买</my-button>
                        </div>
                        <div class="delete-btn">
                            <my-button class="delete" @click="deleteFavorite(item.fid)">删除</my-button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import MyHeader from '../../../components/page_header/index'
import IScroll from '../../../assets/js/lib/iscroll.js'
import { addEventListener, removeEventListener } from '../../../assets/js/utils/compatible.js'
import { mapState, mapActions } from 'vuex'
import Vue from 'vue'
import button from '../../../components/button/index'
import Toast from '../../../components/toast/'
import confirm from '../../../components/confirm/index'
Vue.use(button)
Vue.use(Toast)
Vue.use(confirm)
export default {
    components: {
        MyHeader
    },
    created() {
        this.getMyFavorite({
            data: { uid: this.loginInfo.uid, page: 1 },
            success: () => {
                this.$nextTick(() => {
                    this.myScroll.refresh()
                    if (!this.myFavorite.pageinfo) {
                        return
                    }
                    this.myScroll.on('scrollEnd', () => {
                        let sub = -Math.abs(this.myScroll.scrollerHeight - this.myScroll.wrapperHeight)
                        console.log(sub, this.myScroll.y === sub, this.myScroll.y, (parseInt(this.myFavorite.pageinfo.page) < parseInt(this.myFavorite.pageinfo.pagenum)))
                        if (this.myScroll.y === sub && (parseInt(this.myFavorite.pageinfo.page) < parseInt(this.myFavorite.pageinfo.pagenum))) {
                            this.getMyFavorite({
                                data: {
                                    uid: this.loginInfo.uid,
                                    page: parseInt(this.myFavorite.pageinfo.page) + 1
                                },
                                success: () => {
                                    this.$nextTick(() => {
                                        this.myScroll.refresh()
                                    })
                                }
                            })
                        } else if ((parseInt(this.myFavorite.pageinfo.page) === parseInt(this.myFavorite.pageinfo.pagenum))) {
                            this.myScroll._events.scrollEnd = null
                        }
                    })
                })
            }
        })
    },
    mounted() {
        addEventListener(this.$refs['fav-wrapper'], 'touchmove', this.stopTouchMoveEvent)
        this.myScroll = new IScroll(this.$refs['fav-wrapper'], {
            click: true,
            scrollX: false,
            scrollY: true
        })
    },
    methods: {
        ...mapActions({
            getMyFavorite: 'user/getMyFavorite',
            deleteMyFavorite: 'user/deleteMyFavorite'
        }),
        deleteFavorite(fid) {
            console.log(fid)
            setTimeout(() => {
                this.$confirm('是否删除吗?', [{
                        text: '取消',
                        onPress: () => {

                        }
                    },
                    {
                        text: '确定',
                        onPress: () => {
                            this.deleteMyFavorite({
                                data: { uid: this.loginInfo.uid, fid: fid },
                                success: () => {
                                    this.myScroll.refresh()
                                }
                            })
                        }
                    }
                ])
            }, 0)
        },
        stopTouchMoveEvent(e) {
            e.preventDefault()
        }
    },
    computed: {
        ...mapState({
            myFavorite: state => state.user.myFavorite,
            loginInfo: state => state.user.loginInfo
        })
    },
    beforeDestroy() {
        removeEventListener(this.$refs['fav-wrapper'], 'touchmove', this.stopTouchMoveEvent)
        this.myScroll.destroy()
    }
}
</script>
<style scoped>
.ucenter-header {
    z-index: 1
}

.page {
    padding-top: 1.4rem;
    background-color: #FFF;
    height: 100%;
    width: 100%;
    box-sizing: border-box;
    position: fixed;
}

.fav-main {
    width: 100%;
}

.fav-main {
    height: 100%;
    width: 100%;
}

.fav-list {
    width: 100%;
    display: flex;
    padding: 0px 2%;
    box-sizing: border-box;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    background-color: #FFF;
}

.fav-list .fav-item {
    width: 48%;
    height: 5.8rem;
    font-size: 0.28rem;
}

.fav-list .fav-item .fav-image {
    width: 100%;
    height: 3.36rem;
}

.fav-item .fav-image img {
    width: 100%;
    height: 100%;
}

.fav-item .fav-title {
    width: 100%;
    height: 0.8rem;
    margin-top: 0.2rem;
    overflow: hidden;
}

.fav-item .fav-price {
    width: 100%;
    margin-top: 0.2rem;
    color: #f93036;
}

.fav-item .fav-btn-wrap {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 0.2rem;
}

.fav-btn-wrap .buy,
.fav-btn-wrap .delete {
    width: 1.04rem;
    height: .52rem;
    border: 1px solid #f93036;
    font-size: .28rem;
    color: #f93036;
    border-radius: 4px;
    text-align: center;
    line-height: .52rem;
    background-color: #FFF;
}
</style>