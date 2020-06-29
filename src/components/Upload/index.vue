<template>
  <div>
    <a-row :gutter="[15,15]">
      <a-col :span="12">
        <VueCropper
          style="height: 300px"
          ref="cropper"
          :img="option.img"
          :outputSize="option.outputSize"
          :outputType="option.outputType"
          :info="option.info"
          :canScale="option.canScale"
          :autoCrop="option.autoCrop"
          :autoCropWidth="option.autoCropWidth"
          :autoCropHeight="option.autoCropHeight"
          :fixed="option.fixed"
          :fixedNumber="option.fixedNumber"
          :full="option.full"
          :fixedBox="option.fixedBox"
          :canMove="option.canMove"
          :canMoveBox="option.canMoveBox"
          :original="option.original"
          :centerBox="option.centerBox"
          :high="option.high"
          :infoTrue="option.infoTrue"
          :maxImgSize="option.maxImgSize"
          :enlarge="option.enlarge"
          :mode="option.mode"
          @real-time="handlerRealTime"
        ></VueCropper>
      </a-col>
      <a-col :span="12">
        <div class="u-preview" v-if="preview" :style="{'width': preview.w + 'px', 'height': preview.h + 'px'}">
          <div :style="preview.div">
            <img :src="preview.url" :style="preview.img">
          </div>
        </div>
      </a-col>
      <a-col :span="24">
        <input type="file" style="display: none;" ref="fileElem" @change="handlerSelectFile">
        <a-button-group>
          <a-button @click="handlerOpenDir">
            <a-icon type="folder-open" />选择文件
          </a-button>
          <a-button @click="handlerClearFile">
            <a-icon type="delete" />删除文件
          </a-button>
          <a-button @click="handlerRotateLeft">
            <a-icon type="undo" />左旋90°
          </a-button>
          <a-button @click="handlerRotateRight">
            <a-icon type="redo" />右旋90°
          </a-button>
          <a-button v-if="preview" @click="handlerUpload">
            <a-icon type="cloud-upload" />上传
          </a-button>
        </a-button-group>
      </a-col>
    </a-row>
  </div>
</template>

<script>

// 文档: https://github.com/xyxiao001/vue-cropper
import { VueCropper } from 'vue-cropper'

export default {
  name: 'index',
  components: {
    VueCropper
  },
  data () {
    return {
      cropImage: null,
      preview: null,
      option: {
        img: null,
        outputSize: 1,
        outputType: 'jpeg',
        info: true,
        canScale: true,
        autoCrop: true,
        autoCropWidth: 300,
        autoCropHeight: 300,
        fixed: false,
        fixedNumber: [1, 1],
        full: false,
        fixedBox: false,
        canMove: false,
        canMoveBox: true,
        original: false,
        centerBox: false,
        high: true,
        infoTrue: false,
        maxImgSize: 2000,
        enlarge: 1,
        mode: 'contain'
      }
    }
  },
  methods: {
    handlerOpenDir () {
      this.$refs.fileElem.dispatchEvent(new MouseEvent('click'))
    },
    handlerSelectFile () {
      const file = this.$refs.fileElem.files[0]
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => {
        this.option.img = reader.result
      }
      reader.onerror = function (error) {
        console.log('Error: ', error)
      }
    },
    handlerClearFile () {
      this.option.img = null
    },
    handlerRotateLeft () {
      this.$refs.cropper.rotateLeft()
    },
    handlerRotateRight () {
      this.$refs.cropper.rotateRight()
    },
    handlerRealTime (data) {
      if (data.url.length === 0) {
        return
      }
      this.preview = data
    },
    handlerUpload () {
      const that = this
      this.$refs.cropper.getCropData((data) => {
        if (!data) {
          that.$message.warning('内容为空！')
          return
        }
        that.$request.fetchUpload({
          type: 'base64',
          file: data
        }).then(v => {
          if (v.code) {
            that.$message.warning('上传失败！')
            return
          }
          that.$message.success('上传成功！')
          that.$emit('success', v.data)
        })
      })
    }
  }
}
</script>
<style lang="scss" scoped>
  .u-preview{
    overflow: hidden;
    border: 5px solid #333333;
    box-sizing: border-box;
  }
</style>
