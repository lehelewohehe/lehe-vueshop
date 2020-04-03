import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [{
        path: '/',
        name: 'home',
        component: () => import('../pages/home/main'),
        meta: { keepAlive: false },
        redirect: '/index',
        children: [{
                path: 'index',
                name: 'index',
                meta: { keepAlive: true, title: '首页' },
                component: () => import('../pages/home/index')
            },
            {
                path: 'cart',
                name: 'cart',
                meta: { keepAlive: false, title: '购物车' },
                component: () => import('../pages/home/cart')
            },
            {
                path: 'my',
                name: 'my',
                meta: { keepAlive: false, title: '我的' },
                component: () => import('../pages/user/ucenter')
            }
        ]
    },
    {
        path: '/login',
        name: 'login',
        component: () => import('../pages/home/login'),
        meta: { keepAlive: false, title: '登录' }
    },
    {
        path: '/goods/classify',
        name: 'goods-classify',
        meta: { keepAlive: false, title: '商品分类' },
        component: () => import('../pages/home/goods/classify'),
        redirect: '/goods/classify/item',
        children: [{
            path: 'item',
            name: 'goods-classify-item',
            meta: { keepAlive: false, title: '商品分类' },
            component: () => import('../pages/home/goods/classify_item')
        }]
    },
    {
        path: '/goods/search',
        name: 'goods-search',
        meta: { keepAlive: false, title: '搜索' },
        component: () => import('../pages/home/goods/search'),
    },
    {
        path: '/goods/details',
        name: 'goods-details',
        meta: { keepAlive: false, title: '商品页面' },
        redirect: '/goods/details/item',
        component: () => import('../pages/home/goods/details'),
        children: [{
                path: 'item',
                name: 'goods-details-item',
                meta: { keepAlive: false, title: '商品页面' },
                component: () => import('../pages/home/goods/details_item.vue')
            },
            {
                path: 'content',
                name: 'goods-details-content',
                meta: { keepAlive: false, title: '商品页面' },
                component: () => import('../pages/home/goods/details_content.vue')
            },
            {
                path: 'review',
                name: 'goods-details-review',
                meta: { keepAlive: false, title: '商品页面' },
                component: () => import('../pages/home/goods/details_review.vue')
            }
        ]
    },
    {
        path: '/user/profile',
        name: 'user-profile',
        meta: { keepAlive: false, title: '商品页面', auth: true },
        component: () => import('../pages/user/profile')
    },
    {
        path: '/user/fav',
        name: 'user-fav',
        meta: { keepAlive: false, title: '我的收藏', auth: true },
        component: () => import('../pages/user/fav')
    },
    {
        path: '/user/mod_password',
        name: 'user-mod_password',
        meta: { keepAlive: false, title: '修改密码', auth: true },
        component: () => import('../pages/user/mod_password')
    },
    {
        path: '/user/bind_phone',
        name: 'user-bind_phone',
        meta: { keepAlive: false, title: '绑定手机', auth: true },
        component: () => import('../pages/user/bind_phone')
    },
    {
        path: '/user/address',
        name: 'user-address',
        meta: { keepAlive: false, title: '收获地址', auth: true },
        component: () => import('../pages/user/address')
    },
    {
        path: '/user/address/add',
        name: 'user-address-add',
        meta: { keepAlive: false, title: '添加地址', auth: true },
        component: () => import('../pages/user/address/add')
    },
    {
        path: '/user/address/mod',
        name: 'user-address-mod',
        meta: { keepAlive: false, title: '修改地址', auth: true },
        component: () => import('../pages/user/address/mod')
    }
]



const router = new VueRouter({
    mode: "hash", //1、hash哈希：有#号。2、history历史：没有#号
    base: process.env.BASE_URL, //自动获取根目录路径
    scrollBehavior: (to, from, position) => {
        if (position) {
            return position
        } else {
            return { x: 0, y: 0 }
        }
    },
    routes
})

router.beforeEach((to, from, next) => {
    document.title = to.meta.title
    if (to.meta.auth) {
        if (Boolean(localStorage['isLogin'])) {
            next()
        } else {
            next('/login')
        }
    } else {
        next()
    }
})

export default router