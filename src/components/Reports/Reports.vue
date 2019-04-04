<template>
  <div class="container">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>数据统计</el-breadcrumb-item>
      <el-breadcrumb-item>数据报表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card class="box-card" shadow="never">
      <div ref="lineChart" class="lineChart"></div>
    </el-card>
  </div>
</template>
<script>
import echarts from 'echarts'

export default {
  name: 'Reports',
  data () {
    return {
      options: {
        title: {
          text: '用户来源'
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            label: {
              backgroundColor: '#E9EEF3'
            }
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [
          {
            boundaryGap: false
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ]
      }
    }
  },
  async mounted () {
    const myEcharts = echarts.init(this.$refs.lineChart)
    const {data: {data, meta}} = await this.$http.get('reports/type/1')
    if (meta.status !== 200) return this.$message.error(meta.msg || '获取数据失败')
    this.options = Object.assign(this.options, data)
    myEcharts.setOption(this.options)
  }
}
</script>
<style scoped>
  .lineChart {
    width: 700px;
    height: 450px;
  }
</style>
