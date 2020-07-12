<template>
  <div>
    <el-row :gutter="15">
      <el-col :span="12">
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
      </el-col>
      <el-col :span="12">
        <div class="u-preview" v-if="preview" :style="{'width': preview.w + 'px', 'height': preview.h + 'px'}">
          <div :style="preview.div">
            <img :src="preview.url" :style="preview.img">
          </div>
        </div>
      </el-col>
    </el-row>
    <br>
    <el-row>
      <el-col :span="24">
        <input type="file" style="display: none;" ref="fileElem" @change="handlerSelectFile">
        <el-button-group>
          <el-button icon="el-icon-folder-opened" size="mini" @click="handlerOpenDir">
            选择文件
          </el-button>
          <el-button icon="el-icon-delete" size="mini" @click="handlerClearFile">
            删除文件
          </el-button>
          <el-button icon="el-icon-aim" size="mini" @click="handlerAuto">
            自动
          </el-button>
          <el-button icon="el-icon-refresh-left" size="mini" @click="handlerRotateLeft">
            左旋90°
          </el-button>
          <el-button icon="el-icon-refresh-right" size="mini" @click="handlerRotateRight">
            右旋90°
          </el-button>
          <el-button v-if="preview" icon="el-icon-upload" size="mini" @click="handlerUpload">
            上传
          </el-button>
        </el-button-group>
      </el-col>
    </el-row>
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
      this.preview = null
      this.$refs.fileElem.value = ''
      this.$refs.cropper.refresh()
    },
    handlerAuto () {
      const { x1, x2, y1, y2 } = this.$refs.cropper.getImgAxis()
      this.option.autoCropWidth = x2 - x1
      this.option.autoCropHeight = y2 - y1
      this.$refs.cropper.stopCrop()
      this.$refs.cropper.startCrop()
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
