<template>
    <div class="page">
        <my-header :isLeft="true" :title="'添加收货地址'" class="ucenter-header"></my-header>
        <div class="add-main">
            <ul>
                <li>收货人</li>
                <li><input type="text" placeholder="收货人姓名" v-model="name"></li>
            </ul>
            <ul>
                <li>联系方式</li>
                <li><input type="text" placeholder="联系人手机号" v-model="cellPhone"></li>
            </ul>
            <ul>
                <li>所在地区</li>
                <li><input type="text" placeholder="请选择所在地区" @click="toggleAreaList(true)" v-model="areaValue" readonly="readonly"></li>
            </ul>
            <ul>
                <li>详细地址</li>
                <li><input type="text" placeholder="街道详细地址" v-model="detailAddress"></li>
            </ul>
            <ul>
                <li>设置为默认地址</li>
                <li><input type="checkbox" v-model="isDefault" :checked="isDefault"></li>
            </ul>
        </div>
        <div class="save-btn-wrapper">
            <my-button class="save-btn" @click="saveAddAddress">保存</my-button>
        </div>
        <transition name="mask">
            <div class="mask" @click="toggleAreaList(false)" v-if="isArea"></div>
        </transition>
        <transition name="area">
            <van-area class="myarealist" v-if="isArea" :area-list="areaList" @cancel="toggleAreaList(false)" value="110101" @confirm="getAreaList" />
        </transition>
    </div>
</template>
<script>
import Vue from 'vue'
import { Area } from 'vant'
import areaList from '../../../assets/data/area'
import MyHeader from '../../../components/page_header/index'
import { mapState, mapActions } from 'vuex'
import button from '../../../components/button/index'
import Toast from '../../../components/toast/'
Vue.use(button)
Vue.use(Area)
Vue.use(Toast)

export default {
    data() {
        return {
            isArea: false,
            areaValue: '',
            name: '',
            detailAddress: '',
            cellPhone: '',
            isDefault: false,
            province: '',
            city: '',
            area: ''
        }
    },
    created() {
        this.areaList = areaList
    },
    methods: {
        ...mapActions({
            addAddressOne: 'address/addAddressOne'
        }),
        toggleAreaList(flag) {
            this.isArea = flag
        },
        getAreaList(list) {
            console.log(list)
            this.areaValue = ''
            list.forEach((item, index) => {
                this.areaValue += item.name + ' '
            })
            this.province = list[0].name
            this.city = list[1].name
            this.area = list[2].name

            this.toggleAreaList(false)
        },
        strMatchRegular(target, str, regular) {
            if (target.match(regular)) {
                this.$toast(str)
                return true
            }
            return false
        },
        saveAddAddress() {
            if (this.strMatchRegular(this.name, '名字为空', /^\s*$/)) {
                return
            }
            if (!this.cellPhone.match(/^1([358][0-9]|4[579]|66|7[0135678]|9[89])[0-9]{8}$/)) {
                this.$toast('手机号格式不正确')
                return
            }
            if (this.strMatchRegular(this.areaValue, '地址为空', /^\s*$/)) {
                return
            }
            if (this.strMatchRegular(this.detailAddress, '详细地址为空', /^\s*$/)) {
                return
            }
            this.addAddressOne({ data: {uid: this.loginInfo.uid, name: this.name, cellphone: this.cellPhone, province: this.province , city: this.city, area: this.area, address: this.detailAddress, isdefault: this.isDefault ? '1' : '0'}, success: () => {
            	this.$router.go(-1)
                this.$toast('添加成功')
            } })
        }
    },
    computed: {
    	...mapState({
    		loginInfo: state => state.user.loginInfo
    	})
    },
    components: {
        MyHeader
    }
}
</script>
<style scoped>
.area-enter {
    transform: translateY(100%);
}

.area-enter-active {
    transition: transform 0.3s ease;
}

.area-enter-to {
    transform: translateY(0px);
}

.area-leave {
    transform: translateY(0px);
}

.area-leave-active {
    transition: transform 0.3s ease;
}

.area-leave-to {
    transform: translateY(100%);
}

.mask-enter {
    opacity: 0;
}

.mask-enter-active {
    transition: opacity 0.3s ease;
}

.mask-enter-to {
    opacity: 1;
}

.mask-leave {
    opacity: 1;
}

.mask-leave-active {
    transition: opacity 0.3s ease;
}

.mask-leave-to {
    opacity: 0;
}

.page {
    padding-top: 1rem;
    padding-bottom: 1.3rem;
    background-color: #FFF;
    height: 100%;
    width: 100%;
    box-sizing: border-box;
    position: fixed;
}

.add-main {
    width: 100%;
}

.add-main ul {
    width: 100%;
    height: 1rem;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding: 0px 0.3rem;
    border-bottom: 1px solid #efefef;
    box-sizing: border-box;
    font-size: 0.32rem;
}

.add-main li {
    height: 100%;
    line-height: 1rem;
}

.add-main ul li:nth-child(2) {
    width: 60%;
}

.add-main ul:last-child li:nth-child(2) {
    display: flex;
    align-items: center;
}

.add-main ul input {
    margin-left: 0.3rem;
    font-size: 0.28rem;
    height: 100%;
    width: 100%;
}

.add-main ul input[type=checkbox] {
    width: 0.4rem;
    height: 0.4rem;
}

.save-btn-wrapper {
    width: 85%;
    height: .8rem;
    line-height: 0.8rem;
    border-radius: 4px;
    margin: 0 auto;
    display: block;
    border: 0 none;
    outline: none;
    font-size: .32rem;
    color: #fff;
    margin-top: .4rem;
    border-radius: 0.1rem;
}

.save-btn-wrapper .save-btn {
    background-color: #fcb40a;
    border-radius: 0.1rem;
}

.area {
    position: absolute;
    left: 0px;
    top: 0px;
    width: 100%;
    height: 100%;
}

.mask {
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, .7);
    position: absolute;
    left: 0px;
    top: 0px;
}

.myarealist {
    width: 100%;
    position: absolute;
    left: 0px;
    bottom: 0px;
}
</style>