<template>
  <div v-loading="loading">
    <el-row>
      <el-card shadow="never">
        <el-table resizable v-if="columns && columns.length" :data="datas" style="width: 100%">
          <el-table-column
            v-for="(c,i) in columns" :key="i"
            :type="c.type"
            :align="c.align ? c.align : 'left'"
            :prop="c.key"
            :label="c.label"
            :width="c.width">
            <template slot-scope="scope" v-if="c.key">
              <slot :name="c.key" :row="scope.row" v-if="c.key">
                {{c.key && scope.row[c.key]}}
              </slot>
            </template>
          </el-table-column>
          <el-table-column align="right">
            <template slot="header" slot-scope="scope">
              <el-button type="text" icon="el-icon-refresh" trigger="click" @click="handlerRefresh" style="margin-right: 10px"></el-button>
              <el-popover
                placement="top-start"
                title="展示字段"
                width="200"
                trigger="hover"
                content="这是一段内容,这是一段内容,这是一段内容,这是一段内容。">
                <el-button type="text" icon="el-icon-s-operation" slot="reference"></el-button>
              </el-popover>
            </template>
            <template slot-scope="scope">
              <slot name="action" :row="scope.row">
              </slot>
            </template>
          </el-table-column>
        </el-table>
        <br>
        <el-pagination
          background
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :page-sizes="[5,10,15,20,25,30,50]"
          layout="total, sizes, prev, pager, next, jumper"
          :current-page="page.pageNum"
          :page-size="page.pageSize"
          :total="page.total">
        </el-pagination>
      </el-card>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'index',
  props: {
    columns: {
      type: Array,
      default: () => {
        return []
      }
    },
    datas: {
      type: Array,
      default: () => {
        return []
      }
    },
    page: {
      type: Object,
      default: () => {
        return {
          pageNum: 1,
          pageSize: 5,
          total: 0
        }
      }
    }
  },
  data () {
    return {
      loading: false
    }
  },
  methods: {
    handleSizeChange (pageNum) {
      this.$emit('changePage', {
        pageNum: pageNum,
        pageSize: this.page.pageSize
      })
    },
    handleCurrentChange (pageNum) {
      this.$emit('changePage', {
        pageNum: pageNum,
        pageSize: this.page.pageSize
      })
    },
    handlerRefresh () {
      this.$emit('refresh', {
        pageNum: this.page.pageNum,
        pageSize: this.page.pageSize
      })
    }
  }
}
</script>
