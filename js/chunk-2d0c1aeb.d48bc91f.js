(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d0c1aeb"],{"46a4":function(e,t,a){"use strict";a.r(t);var l=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{directives:[{name:"loading",rawName:"v-loading",value:e.loading,expression:"loading"}]},[a("el-row",[a("el-collapse-transition",[a("el-card",{directives:[{name:"show",rawName:"v-show",value:e.searchShow,expression:"searchShow"}],attrs:{shadow:"never"}},[a("el-form",{ref:"form",attrs:{inline:"",model:e.req,"label-position":"left","label-suffix":":",size:"mini"}},[a("el-form-item",{attrs:{label:"Key",prop:"key"}},[a("el-input",{attrs:{placeholder:"属性",clearable:"",maxlength:"50","show-word-limit":""},model:{value:e.req.key,callback:function(t){e.$set(e.req,"key",t)},expression:"req.key"}})],1),a("br"),a("el-form-item",[a("el-button",{attrs:{type:"primary",plain:""},on:{click:e.search}},[e._v("搜索")]),a("el-button",{attrs:{plain:""},on:{click:e.reset}},[e._v("重置")])],1)],1)],1)],1)],1),a("el-row",[a("el-card",{attrs:{shadow:"never"}},[a("el-table",{attrs:{resizable:"",data:e.items,fit:!1}},[e.columnShow.index?a("el-table-column",{attrs:{type:"index",label:"序号"}}):e._e(),e.columnShow.id?a("el-table-column",{attrs:{prop:"id",label:"主键"}}):e._e(),e.columnShow.key?a("el-table-column",{attrs:{prop:"key",label:"Key"}}):e._e(),e.columnShow.value?a("el-table-column",{attrs:{prop:"value",label:"Value"}}):e._e(),e.columnShow.state?a("el-table-column",{attrs:{prop:"state",align:"center",label:"状态"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-tag",{attrs:{type:e.dict.quanta.state.find((function(e){return e.key==t.row.state})).color}},[e._v(e._s(e.dict.quanta.state.find((function(e){return e.key==t.row.state})).value))])]}}],null,!1,3483215038)}):e._e(),a("el-table-column",{attrs:{align:"right"},scopedSlots:e._u([{key:"header",fn:function(t){return[a("el-tooltip",{attrs:{placement:"top",effect:"light"}},[a("div",{attrs:{slot:"content"},slot:"content"},[e._v(e._s(e.searchShow?"隐藏搜索":"展开搜索"))]),a("el-button",{attrs:{type:"text",icon:"el-icon-search"},on:{click:e.handlerSearchShow}})],1),a("el-tooltip",{attrs:{placement:"top",effect:"light",content:"新增"}},[a("el-button",{attrs:{type:"text",icon:"el-icon-plus"}})],1),a("el-tooltip",{attrs:{placement:"top",effect:"light",content:"刷新"}},[a("el-button",{staticStyle:{"margin-right":"10px"},attrs:{type:"text",icon:"el-icon-refresh"},on:{click:e.search}})],1),a("el-popover",{attrs:{width:60,placement:"bottom",title:"展示字段",trigger:"click"}},[a("div",[a("el-checkbox",{attrs:{indeterminate:e.indeterminate},on:{change:e.handleCheckAllChange},model:{value:e.columnShow.all,callback:function(t){e.$set(e.columnShow,"all",t)},expression:"columnShow.all"}},[e._v("全选")]),a("br"),a("el-checkbox",{attrs:{label:"序号"},model:{value:e.columnShow.index,callback:function(t){e.$set(e.columnShow,"index",t)},expression:"columnShow.index"}}),a("br"),a("el-checkbox",{attrs:{label:"主键"},model:{value:e.columnShow.id,callback:function(t){e.$set(e.columnShow,"id",t)},expression:"columnShow.id"}}),a("br"),a("el-checkbox",{attrs:{label:"Key"},model:{value:e.columnShow.key,callback:function(t){e.$set(e.columnShow,"key",t)},expression:"columnShow.key"}}),a("el-checkbox",{attrs:{label:"Value"},model:{value:e.columnShow.value,callback:function(t){e.$set(e.columnShow,"value",t)},expression:"columnShow.value"}}),a("el-checkbox",{attrs:{label:"状态"},model:{value:e.columnShow.state,callback:function(t){e.$set(e.columnShow,"state",t)},expression:"columnShow.state"}})],1),a("el-button",{attrs:{slot:"reference",type:"text",icon:"el-icon-s-operation"},slot:"reference"})],1)]}},{key:"default",fn:function(t){return[a("el-button",{attrs:{type:"primary",icon:"el-icon-edit",plain:"",size:"mini"},on:{click:function(a){return e.handlerEidt(t.row)}}},[e._v("编辑")]),a("el-button",{attrs:{type:"danger",icon:"el-icon-delete",plain:"",size:"mini"},on:{click:function(a){return e.handlerDel(t.row)}}},[e._v("删除")])]}}])})],1),a("br"),a("el-pagination",{attrs:{background:"","page-sizes":[5,10,15,20,25,30,50],layout:"total, sizes, prev, pager, next, jumper","current-page":e.page.pageNum,"page-size":e.page.pageSize,total:e.page.total},on:{"size-change":e.handleSizeChange,"current-change":e.handleCurrentChange}})],1)],1)],1)},n=[],o=a("2f62"),i={name:"index",watch:{columnShow:{deep:!0,immediate:!0,handler(){this.handlerCheckChange()}}},data(){return{loading:!1,searchShow:!0,indeterminate:!1,columnShow:{all:!0,index:!0,id:!0,key:!0,value:!0,state:!0},page:{pageNum:1,pageSize:5,total:0},req:{key:""},items:[]}},methods:{init(){this.search()},async search(){this.loading=!0;const e={...this.req,...this.page},t=await this.$request.fetchQuantas(e);if(t.code)return this.items=[],this.$message.warning(t.message),void(this.loading=!1);this.items=t.data.list,Object.assign(this.page,t.data.page),this.loading=!1},reset(){this.$refs.form.resetFields()},async del(e){const t=await this.$request.fetchDelQuanta(e);t.code?this.$message.warning(t.message):(this.$message.success(t.message),this.search())},handleSizeChange(e){this.page.pageSize=e,this.page.pageNum=1,this.search()},handleCurrentChange(e){this.page.pageNum=e,this.search()},handleCheckAllChange(e){for(const t in this.columnShow)this.columnShow[t]=e;this.handlerCheckChange()},handlerCheckChange(){let e=!0;for(const t in this.columnShow)"all"!==t&&(this.columnShow[t]||(e=!1));if(e)return this.columnShow.all=!0,void(this.indeterminate=!1);this.columnShow.all=!1,this.indeterminate=!0},handlerSearchShow(){this.searchShow=!this.searchShow},handlerEidt(e){},handlerDel(e){const t=this;this.$confirm("此操作将永久删除该记录？","提示",{confirmButtonText:"确定",cancelButtonText:"再想想~",type:"warning"}).then(()=>{t.del()})}},computed:{...Object(o["e"])(["dict"])}},s=i,c=a("2877"),r=Object(c["a"])(s,l,n,!1,null,null,null);t["default"]=r.exports}}]);
//# sourceMappingURL=chunk-2d0c1aeb.d48bc91f.js.map