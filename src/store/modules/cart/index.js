import * as type from '../mutation-types'

export default {
    namespaced: true,
    state: {
        cartGoods: localStorage['cartGoods'] ? JSON.parse(localStorage['cartGoods']) : []
    },
    getters: {

    },
    mutations: {
        [type.ADD_CARTGOODS](state, payload) {
            let flag = state.cartGoods.findIndex((item, index) => {
                let num = item.amount
                item.amount = payload.data.amount
                if (JSON.stringify(payload.data) === JSON.stringify(item)) {
                	item.amount = num
                    return true
                }
                item.amount = num
            })
            if (flag !== -1) {
                state.cartGoods[flag].amount = state.cartGoods[flag].amount + payload.data.amount
            } else {
                state.cartGoods.push(payload.data)
            }
            localStorage['cartGoods'] = JSON.stringify(state.cartGoods)
        }
    },
    actions: {

    }
}


// {
//     "gid": "714246965",
//     "title": "裙装裙装6",
//     "amount": 2,
//     "price": 200,
//     "img": "http://localhost:99/uploadfiles/1484284030.jpg",
//     "checked": true,
//     "freight": 10,
//     "attrs": [
//     {
//         "attrid": "1006",
//         "title": "颜色",
//         "param": [
//         {
//             "paramid": "1013",
//             "title": "白色"
//         }]
//     },
//     {
//         "attrid": "1007",
//         "title": "尺寸",
//         "param": [
//         {
//             "paramid": "1016",
//             "title": "72"
//         }]
//     }]
// }