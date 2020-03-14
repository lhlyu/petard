const mixin = {
    data() {
        return {
            prefix:"p-",
            isloading: false
        }
    },
    mounted() {
        this.init()
    },
    methods: {
        init() {

        },
        scrollTop(cb){
            window.scrollTo({ top: 0, behavior: 'smooth' })
            setTimeout(cb, 500)
        }
    }
}
export default mixin;