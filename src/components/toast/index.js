import Toast from './toast'
export default {
    install(Vue) {
        let toastObj = Vue.extend(Toast)
        Vue.prototype.$toast = function(message = '', duration = 2000) {
            if (Vue.prototype.$initToastComponet === null || Vue.prototype.$initToastComponet === undefined) {
                Vue.prototype.$initToastComponet = new toastObj().$mount(document.createElement("div"))
                document.body.appendChild(Vue.prototype.$initToastComponet.$el)
                Vue.prototype.$initToastComponet.message = message
                Vue.prototype.$initToastComponet.duration = duration
            }
        }
    }
}