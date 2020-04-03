<template>
    <div class="page">
        <div class="page-header">
            <div class="close" @click="closeSearch"></div>
            <div class="serach-wrap">
                <input class="search-input" type="text" placeholder="请输入宝贝名称" v-model="keyWord">
                <div class="search-btn" @click="goSearchPage(keyWord)"></div>
            </div>
        </div>
        <div class="page-content">
            <div class="lately">
                <div class="lately-header">
                	<span>最近搜索</span>
                	<span class="cancel_icon" @click="deleteAllHotwordsHistory"></span>
                </div>
                <div class="lately-content">
                    <div 
                    class="lately-key" 
                    v-for="(item, index) in latelywords" 
                    :key="index"
                    @click="setKeyword(item.name)">{{ item.name }}</div>
                </div>
            </div>
            <div class="hot">
                <div class="hothot-header">热门搜索</div>
                <div class="hot-content">
                    <div 
                    class="hot-key" 
                    v-for="(item, index) in hotwords" 
                    :key="index"
                    @click="setKeyword(item.title)">{{ item.title }}</div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import {mapState, mapMutations} from 'vuex'
import vue from 'vue'
import confirm from '../confirm/index.js'
vue.use(confirm)
export default {
	data() {
		return {
			keyWord: ''
		}
	},
    props: {
        hotwords: {
            type: Array,
            default: []
        },
        isLocal: {
            type: Boolean,
            default: false
        }
    },
    computed: {
        ...mapState({
            latelywords: state => state.search.latelywords
        })
    },
	methods: {
        ...mapMutations({
            addLately: 'search/ADD_LATELYWORDS',
            delLately: 'search/DEL_LATELYWORDS'
        }),
		closeSearch() {
			// console.log("hide")
			this.$emit('hideSearch', false)
		},
		goSearchPage(keyWord) {
            if(!/^\s*$/.test(keyWord)) {
                this.addLately({name: keyWord})
            }
            if(this.isLocal) {
                this.$router.replace('/goods/search?keyWord=' + keyWord)
            } else {
                this.$router.push('/goods/search?keyWord=' + keyWord)
            }
            this.closeSearch()    
		},
        deleteAllHotwordsHistory() {
            this.$confirm('您确定删除吗?', [
                {text: '取消', onPress: () => {}},
                {text: '确定', 
                onPress: () => {
                    this.delLately({index: -1}) 
                }
                }])
        },
        setKeyword(keyWord) {
            this.keyWord = keyWord
            this.goSearchPage(keyWord)
        }
	}
}
</script>
<style scoped>
.page {
    position: fixed;
    width: 100%;
    height: 100%;
    background-color: #FFF;
    left: 0;
    top: 0;
    z-index: 10;
    color: #717376;
    font-size: 0.28rem;
}

.page-header {
    width: 100%;
    height: 1rem;
    border-bottom: 1px solid #efefef;
    display: flex;
    justify-content: flex-start;
    align-items: center;
}

.page-header .close {
    width: 0.5rem;
    height: 0.5rem;
    margin: 0 0.2rem;
    background: url(../../assets/images/common/search_x.png) 0 0 / 0.5rem 0.5rem no-repeat;
}

.page-header .serach-wrap {
    height: 0.64rem;
    width: 6rem;
    border: 1px solid #b2b2b2;
    border-radius: 0.1rem;
    display: flex;
    align-items: center;
}

.serach-wrap .search-input {
    border: none;
    height: 0.64rem;
    width: 4.8rem;
    border-right: 1px solid #b2b2b2;
    padding-left: 0.2rem;
    line-height: 0.64rem;
    outline: none;
    font-size: 0.32rem;
}

.serach-wrap .search-btn {
    width: 0.5rem;
    height: 0.5rem;
    background: url(../../assets/images/common/search_icon.png) 0 0 / 0.5rem 0.5rem no-repeat;
    margin-left: 0.2rem;
}

.page .page-content {
	width: 100%;
	padding: 0.2rem 0.4rem 0px;
	box-sizing: border-box;
}
.page-content .lately,
.page-content .hot {
	width: 100%;
}

.lately .lately-header,
.hot .hothot-header {
	width: 100%;
	height: 0.4rem;
	display: flex;
	justify-content: space-between;
	align-items: center;
	color: black;
}

.lately-header .cancel_icon {
	width: 0.4rem;
	height: 0.4rem;
	background: url(../../assets/images/common/bin.png) 0 0/0.4rem 0.4rem no-repeat;
}

.lately .lately-content,
.hot .hot-content {
	width: 100%;
	padding-top: 0.4rem;
	display: flex;
	justify-content: flex-start;
	box-sizing: border-box;
	flex-wrap: wrap;
}

.lately-content .lately-key,
.hot-content .hot-key {
	padding: 0.1rem;
	border-radius: 0.1rem;
	border: 1px solid #b2b2b2;
	margin: 0px 0.2rem 0.4rem;
}




</style>