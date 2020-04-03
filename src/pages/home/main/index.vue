<template>
    <div>
    	<router-view></router-view>
        <div class="nav">
            <ul :class="{home: true, active: indexStyle}"  @click="goPage('/index')">
                <li></li>
                <li>首页</li>
            </ul>
            <ul :class="{cart: true, active: cartStyle}" @click="goPage('/cart')">
                <li></li>
                <li>购物车</li>
            </ul>
            <ul :class="{my: true, active: userStyle}" @click="goPage('/my')">
                <li></li>
                <li>我的</li>
            </ul>
        </div>
    </div>
</template>
<script>
export default {
	data() {
		return {
			indexStyle: true,
			cartStyle: false,
			userStyle: false
		}
	},
	created() {
		this.changeClassNav(this.$route.name)
		document.title = this.$route.meta.title
	},
	methods: {
		goPage(url) {
			this.$router.replace(url)
		},
		changeClassNav(name) {
			switch(name) {
				case 'index':
					this.indexStyle = true
					this.cartStyle = false
					this.userStyle = false
					break
				case 'cart':
					this.indexStyle = false
					this.cartStyle = true
					this.userStyle = false
					break
				case 'my':
					this.indexStyle = false
					this.cartStyle = false
					this.userStyle = true
					break
				default:
					this.indexStyle = true
					this.cartStyle = false
					this.userStyle = false
					break
			}
		}
	},
	beforeRouteUpdate(to, from, next) {
		this.changeClassNav(to.name)
		next()
	},
	activated() {
		this.changeClassNav(this.$route.name)
		document.title = this.$route.meta.title
		console.log(this.$route.name)
	}
}
</script>
<style scoped>
.nav {
    width: 100%;
    height: 1.2rem;
    box-shadow: 0 0 10px #efefef;
    position: fixed;
    left: 0;
    bottom: 0;
    background-color: #FFF;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0px 0.75rem;
    box-sizing: border-box;
}

.nav ul {
    width: 0.8rem;
    height: 0.9rem;
}

.nav li:nth-child(1) {
    width: 0.6rem;
    height: 0.6rem;
    margin: 0 auto;
    background-position: 0 0;
    background-repeat: no-repeat;
    background-size: 0.6rem 0.6rem;
}

.nav .home li:nth-child(1) {
    background-image: url('../../../assets/images/home/main/home1.png')
}

.nav .cart li:nth-child(1) {
    background-image: url('../../../assets/images/home/main/cart1.png')
}

.nav .my li:nth-child(1) {
    background-image: url('../../../assets/images/home/main/my1.png')
}

.nav .home.active li:nth-child(1) {
    background-image: url('../../../assets/images/home/main/home2.png')
}

.nav .cart.active li:nth-child(1) {
    background-image: url('../../../assets/images/home/main/cart2.png')
}

.nav .my.active li:nth-child(1) {
    background-image: url('../../../assets/images/home/main/my2.png')
}

.nav li:nth-child(2) {
    width: 0.8rem;
    height: 0.6rem;
    font-size: 0.24rem;
    text-align: center;
    line-height: 0.28rem;
}

.nav > *.active li:nth-child(2) {
    color: #eb1625;
}
</style>