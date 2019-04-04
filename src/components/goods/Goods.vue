<template>
  <div class="container">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>商品列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card class="box-card" shadow="never">
      <el-row :gutter="10">
        <el-col :span="6">
          <el-input placeholder="请输入搜索关键字" v-model="params.query">
            <el-button slot="append" @click="changeSearch" icon="el-icon-search"></el-button>
          </el-input>
        </el-col>
        <el-col :span="18">
          <el-button type="primary" plain @click="toGoodsAdd">添加商品</el-button>
        </el-col>
      </el-row>
      <el-table :data="goodsList" stripe style="width: 100%; margin-top: 10px">
        <el-table-column type="index"></el-table-column>
        <el-table-column label="商品名称" prop="goods_name"></el-table-column>
        <el-table-column label="价格" width="100">
          <template slot-scope="scope">{{scope.row.goods_price.toFixed(2)}}</template>
        </el-table-column>
        <el-table-column label="重量" width="100" prop="goods_weight"></el-table-column>
        <el-table-column label="创建时间" width="200">
          <template slot-scope="scope">{{scope.row.upd_time|formatTime}}</template>
        </el-table-column>
        <el-table-column label="操作" width="150">
          <template slot-scope="scope">
            <el-button-group>
              <el-button icon="el-icon-edit" @click="toGoodsEdit(scope.row.goods_id)" round></el-button>
              <el-button icon="el-icon-delete" @click="delGoods(scope.row.goods_id)" round></el-button>
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
  </div>
</template>
<script>
import mix from './Goods-Mixin'
export default {
  mixins: [mix]
}
</script>
<style scoped>
  .box-card {
    margin-top: 15px;
  }
</style>
