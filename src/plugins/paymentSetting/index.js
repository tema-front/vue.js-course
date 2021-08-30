export default {
    install(Vue) {
        if (this.installed) {
            return
        }
        this.installed = true;
        Vue.prototype.$paymentSettings = {
            EventBus: new Vue(),

            show() {
                this.EventBus.$emit("show")
            },

            hide() {
                this.EventBus.$emit("hide")
            }
        }
    }
}