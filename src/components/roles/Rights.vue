<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>权限列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card class="box-card" shadow="never">
      <el-table
        :data="rightsList" height="400"
        style="width: 100%;margin-top: 10px">
        <el-table-column type="index" width="100px"></el-table-column>
        <el-table-column label="权限名称" prop="authName" width="400px"></el-table-column>
        <el-table-column label="路径" prop="path" width="400px"></el-table-column>
        <el-table-column label="权限等级">
          <template slot-scope="scope">
            <el-tag v-if="+scope.row.level === 0">一级权限</el-tag>
            <el-tag v-if="+scope.row.level === 1" type="success">二级权限</el-tag>
            <el-tag v-if="+scope.row.level === 2" type="warning">三级权限</el-tag>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>
<script>
import mix from './Rights-Mixin'
export default {
  mixins: [mix]
}
</script>
<style scoped>
  .box-card {
    margin-top: 15px;
  }
</style>
