<template>
    <div :class="[`${prefix}menu-${options.theme}`]" v-show="options.display" v-if="menus.length">
        <ul>
            <li v-for="(m,i) in menus" :key=i v-if="m.display" :class="[m.active ? 'active':'']" :style="{animationDelay: `${i / 30}s`}" @click="onClick(m)">
                <img :src="m.img" alt="">
                <span>{{m.name}}</span>
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
                        name: "测试撒打飞机哈弗哈市发卡",
                        display: true,
                        to:"/",
                        active: true,
                        img:"https://www.thiswaifudoesnotexist.net/example-33143.jpg"
                    },{
                        name: "测试B",
                        display: true,
                        to:"/",
                        active: false,
                        img:"https://www.thiswaifudoesnotexist.net/example-33144.jpg"
                    },{
                        name: "测试C",
                        display: true,
                        to:"/",
                        active: false,
                        img:"https://www.thiswaifudoesnotexist.net/example-33145.jpg"
                    },{
                        name: "测试D",
                        display: true,
                        to:"/",
                        active: false,
                        img:"https://www.thiswaifudoesnotexist.net/example-33146.jpg"
                    },{
                        name: "测试B",
                        display: true,
                        to:"/",
                        active: false,
                        img:"https://www.thiswaifudoesnotexist.net/example-33144.jpg"
                    },{
                        name: "测试C",
                        display: true,
                        to:"/",
                        active: false,
                        img:"https://www.thiswaifudoesnotexist.net/example-33145.jpg"
                    },{
                        name: "测试D",
                        display: true,
                        to:"/",
                        active: false,
                        img:"https://www.thiswaifudoesnotexist.net/example-33146.jpg"
                    },{
                        name: "测试B",
                        display: true,
                        to:"/",
                        active: false,
                        img:"https://www.thiswaifudoesnotexist.net/example-33144.jpg"
                    },{
                        name: "测试C",
                        display: true,
                        to:"/",
                        active: false,
                        img:"https://www.thiswaifudoesnotexist.net/example-33145.jpg"
                    },{
                        name: "测试D",
                        display: true,
                        to:"/",
                        active: false,
                        img:"https://www.thiswaifudoesnotexist.net/example-33146.jpg"
                    },{
                        name: "测试B",
                        display: true,
                        to:"/",
                        active: false,
                        img:"https://www.thiswaifudoesnotexist.net/example-33144.jpg"
                    },{
                        name: "测试C",
                        display: true,
                        to:"/",
                        active: false,
                        img:"https://www.thiswaifudoesnotexist.net/example-33145.jpg"
                    },{
                        name: "测试D",
                        display: true,
                        to:"/",
                        active: false,
                        img:"https://www.thiswaifudoesnotexist.net/example-33146.jpg"
                    }]
                }
            },
            options:{
                type: Object,
                default: () => {
                    return {
                        theme:"default",
                        display: true,
                        defaultImg: ""
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
