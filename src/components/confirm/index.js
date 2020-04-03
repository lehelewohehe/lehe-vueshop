import confirm from './confirm.vue'
export default {
    install(Vue) {
        let ConfirmObj = Vue.extend(confirm)
        Vue.prototype.$confirm = function(msg, btns) {
            let ConfirmInit = new ConfirmObj().$mount(document.createElement("div"))
            document.body.appendChild(ConfirmInit.$el)
            ConfirmInit.isShow = true

            if (btns && btns.length > 0) {
                ConfirmInit.btns = btns
                ConfirmInit.msg = msg
            }
        }
    }
}