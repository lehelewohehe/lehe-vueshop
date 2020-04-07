<template>
    <div class="page">
        <my-header :isLeft="true" :title="'评价'" class="ucenter-header"></my-header>
        <div class="comment-main">
            <div class="comment-list">
                <div class="comment-item" v-for="(item, index) in commentItem" :key="index">
                    <div class="comment-name">{{ item.title }}</div>
                    <div class="comment-rate">
                        <van-rate v-model="item.value" @change="refresh" class="myrate" />
                    </div>
                </div>
            </div>
            <div class="comment-context">
                <textarea placeholder="来分享你的消费感受吧!" v-model="text"></textarea>
            </div>
        </div>
        <div class="comment-btn-wrapper">
            <my-button class="comment-btn" @click="submitComment">提交</my-button>
        </div>
    </div>
</template>
<script>
import MyHeader from '../../../components/page_header/index'
import { mapState, mapActions } from 'vuex'
import Vue from 'vue'
import button from '../../../components/button/index'
import Toast from '../../../components/toast/'
import { Rate } from 'vant'
Vue.use(button)
Vue.use(Rate)
Vue.use(Toast)
export default {
    data() {
        return {
            text: '',
            rsdata: ''
        }
    },
    created() {
        this.getCommentItem({
            success: () => {
                this.setValArr()
            }
        })
    },
    methods: {
        ...mapActions({
            getCommentItem: 'order/getCommentItem',
            uploadComment: 'order/uploadComment'
        }),
        setValArr() {
            this.commentItem.forEach((item, index) => {
                if (!item.value) {
                    item.value = 5
                }
                this.$set(this.commentItem, index, item)
            })
        },
        refresh() {
            this.setValArr()
        },
        submitComment() {
            let rsdata = []
            this.commentItem.forEach((item, index) => {
                let data = { gid: parseInt(this.$route.query.gid), myid: parseInt(this.loginInfo.uid), score: item.value, rsid: parseInt(item.rsid) }
                rsdata.push(data)
            })
            this.rsdata = JSON.stringify(rsdata)
            console.log(this.rsdata)
            this.uploadComment({
                data: { uid: this.loginInfo.uid, gid: this.$route.query.gid, ordernum: this.$route.query.ordernum, content: this.text, rsdata: this.rsdata },
                success: (data) => {
                    this.$router.go(-1)
                    this.$toast(data)
                },
                error: (data) => {
                    this.$toast(data)
                }
            })
            console.log(this.text)
        }
    },
    computed: {
        ...mapState({
            commentItem: state => state.order.commentItem,
            loginInfo: state => state.user.loginInfo
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

.comment-context {
    width: 100%;
    height: 4rem;
    text-align: center;
    overflow: hidden;
}

.comment-context textarea {
    width: 95%;
    height: 90%;
    font-size: .32rem;
    margin-top: .3rem;
    outline: none;
    border: 0 none;
    resize: none;
}

.comment-btn-wrapper {
    width: 90%;
    height: 0.8rem;
    margin: 0 auto;
    margin-top: 0.4rem;
    line-height: 0.8rem;
}

.comment-btn-wrapper .comment-btn {
    border-radius: 0.1rem;
}
</style>