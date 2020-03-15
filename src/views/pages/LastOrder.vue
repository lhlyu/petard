<template>
    <div :class="[`${prefix}create-${options.theme}`]">
        <div id="lastOrder" class="">
            <MarkdownPro :autoSave="true" :bordered="false" width="1000px" height="600px"></MarkdownPro>
        </div>
    </div>
</template>

<script>
    import MarkdownPro from '@/components/Md/index.vue'
    export default {
        components:{
            MarkdownPro
        },
        data(){
            return {
                options:{
                    theme:"default",
                }
            }
        },

        methods: {

        }
    }
</script>


