<template>
    <div :class="[`${prefix}menu-${options.theme}`,`${prefix}menu-${options.position}`]" v-show="options.display" v-if="menus.length">
        <ul>
            <li v-for="(m,i) in menus" :key=i v-if="m.display" :class="[m.active ? 'active':'']" :style="{animationDelay: `${i / 30}s`}" @click="onClick(m)">
                <i :class="m.icon"></i>
            </li>
        </ul>
    </div>
</template>

<script>
    export default {
        props:{
            menus:{
                type: Array,
                default: () => {
                    return [{
                        name: "首页",
                        display: true,
                        to:"/",
                        active: true,
                        icon:"iconfont icon-shouye"
                    },{
                        name: "文章",
                        display: true,
                        to:"/",
                        active: false,
                        icon:"iconfont icon-List"
                    },{
                        name: "创作",
                        display: true,
                        to:"/",
                        active: false,
                        icon:"iconfont icon-chuangzuo"
                    },{
                        name: "设置",
                        display: true,
                        to:"/",
                        active: false,
                        icon:"iconfont icon-shezhi"
                    },{
                        name: "顶部",
                        display: true,
                        to:"/",
                        active: false,
                        icon:"iconfont icon-top"
                    }]
                }
            },
            options:{
                type: Object,
                default: () => {
                    return {
                        theme:"default",
                        display: true,
                        defaultImg: "",
                        position:"bottom"
                    }
                }
            }
        },
        data(){
          return {
          }
        },
        methods:{
            onClick(menu){
                this.$emit('onClick',menu)
            }
        }
    }
</script>
