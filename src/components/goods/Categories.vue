<template>
  <div class="container">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/goods' }">商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>商品分类</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card class="box-card" shadow="never">
      <el-button type="primary" plain @click="showAddDialog">添加分类</el-button>
      <el-table
        :data="categoriesList" :indent="40"
        style="width: 100%;margin-top: 10px;"
        row-key="id">
        <el-table-column prop="cat_name" label="分类名称" >
        </el-table-column>
        <el-table-column label="是否有效" width="180">
          <template slot-scope="scope">
            <el-icon v-if="!scope.row.cat_deleted" class="el-icon-success" :style="{color:'green'}"></el-icon>
            <el-icon v-else class="el-icon-error" :style="{color:'red'}"></el-icon>
          </template>
        </el-table-column>
        <el-table-column label="等级" width="180">
          <template slot-scope="scope">
            <el-tag v-if="+scope.row.cat_level === 0">一级分类</el-tag>
            <el-tag v-if="+scope.row.cat_level === 1" type="success">二级分类</el-tag>
            <el-tag v-if="+scope.row.cat_level === 2" type="warning">三级分类</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="180">
          <template slot-scope="scope">
            <el-button-group>
              <el-button icon="el-icon-edit" round></el-button>
              <el-button icon="el-icon-delete" @click="delCategory(scope.row.cat_id)" round></el-button>
            </el-button-group>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination style="text-align: right; margin-top: 20px"
                     background @current-change="changePager"
                     :current-page="params.pagenum" :page-size="params.pagesize"
                     layout="prev, pager, next"
                     :total="total">
      </el-pagination>
    </el-card>
    <el-dialog title="添加分类" @close="addDialogClose" :visible.sync="addDialogFormVisible" width="400px">
      <el-form ref="addForm" :model="addForm" :rules="addRules" label-width="80px">
        <el-form-item label="分类名称" prop="cat_name">
          <el-input v-model="addForm.cat_name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="父级分类">
          <el-cascader :props="categoryProps" :style="{width:'280px'}"
                       expand-trigger="hover" clearable
                       :options="categoryList"
                       v-model="categorySelected"
                       @change="categoryChange">
          </el-cascader>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addDialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addCategory">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import mix from './Categories-Mixin'
export default {
  mixins: [mix]
}
</script>
<style scoped>
</style>
