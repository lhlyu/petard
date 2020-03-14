<template>
    <div :class="[`${prefix}create-${options.theme}`]">
        <div id="lastOrder" class="">

        </div>
    </div>
</template>

<script>

    export default {
        data(){
            return {
                options:{
                    theme:"default",
                }
            }
        },
        computed: {
            compiledMarkdown: function() {
                return marked(this.input, { sanitize: true });
            }
        },
        methods: {
            update: _.debounce(function(e) {
                this.input = e.target.value;
            }, 300)
        }
    }
</script>

<style scoped>

</style>

<!--

markdown editor:

https://vuejs.org/v2/examples/

https://github.com/pandao/editor.md

https://github.com/benweet/stackedit/

https://github.com/miaolz123/vue-markdown



-->