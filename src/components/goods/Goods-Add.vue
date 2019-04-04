<template>
  <div class="container">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/goods' }">商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>添加商品</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card class="box-card" shadow="never">
      <el-alert title="请按照步骤录入商品信息" type="info" center show-icon></el-alert>
      <el-steps :active="step" finish-status="success" align-center>
        <el-step title="基本信息" style="font-size: 12px"></el-step>
        <el-step title="商品参数"></el-step>
        <el-step title="商品属性"></el-step>
        <el-step title="商品图片"></el-step>
        <el-step title="商品内容"></el-step>
        <el-step title="完成"></el-step>
      </el-steps>
      <el-tabs :tab-position="'left'" :before-leave="beforeLeave" @tab-click="tabClick">
        <el-tab-pane label="基本信息">
          <el-form ref="addForm" :rules="addRules" :model="addFrom" label-position="right" label-width="200px">
            <el-form-item label="商品名称" prop="goods_name">
              <el-input style="width: 600px" v-model="addFrom.goods_name"></el-input>
            </el-form-item>
            <el-form-item label="所属分类" prop="goods_cat">
              <el-cascader :props="categoryProps"
                           expand-trigger="hover"
                           :options="categoryList"
                           v-model="categorySelected"
                           @change="categoryChange">
              </el-cascader>
            </el-form-item>
            <el-form-item label="商品价格" prop="goods_price">
              <el-input style="width: 215px" v-model="addFrom.goods_price"></el-input>
            </el-form-item>
            <el-form-item label="商品数量" prop="goods_number">
              <el-input style="width: 215px" v-model="addFrom.goods_number"></el-input>
            </el-form-item>
            <el-form-item label="商品重量" prop="goods_weight">
              <el-input style="width: 215px" v-model="addFrom.goods_weight"></el-input>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="商品参数">
          <div class="attr" v-for="item in manyAttrs" :key="item.attr_id">
            <p>{{item.attr_name}}</p>
            <el-checkbox :value="true" :label="item" :key="i" v-for="(item,i) in item.attr_vals" border></el-checkbox>
          </div>
        </el-tab-pane>
        <el-tab-pane label="商品属性">
          <div style="margin-bottom: 10px" :key="item.attr_id" v-for="item in onlyAttrs">
            <span
              style="width: 150px;font-size: 12px;display: inline-block;text-align: right">{{item.attr_name}} ：</span>
            <el-input style="width: 215px" v-model="item.attr_vals"></el-input>
          </div>
        </el-tab-pane>
        <el-tab-pane label="商品图片">
          <el-upload
            name="file"
            :headers="uploadHeaders"
            :action="uploadAction"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :on-success="handleSuccess"
            list-type="picture">
            <el-button size="small" type="success">点击上传</el-button>
          </el-upload>
        </el-tab-pane>
        <el-tab-pane label="商品内容">
          <quill-editor v-model="addFrom.goods_introduce" ref="editor"></quill-editor>
          <br>
          <el-button type="primary" @click="save">提交商品</el-button>
        </el-tab-pane>
      </el-tabs>
    </el-card>
    <div class="previewBox" v-show="uploadPreviewVisible" @click="uploadPreviewVisible=false" title="点击取消预览">
      <div class="img" :style="{backgroundImage:'url('+uploadPreviewSrc+')'}"></div>
    </div>
  </div>
</template>
<script>
import mix from './Goods-Add-Mixin'
export default {
  mixins: [mix]
}
</script>
<style lang="less" scoped>
  .box-card {
    margin-top: 15px;
  }

  .el-form-item {
    padding: 10px 0;
  }

  .el-checkbox {
    margin-bottom: 10px;
    margin-left: 10px;
  }

  .attr {
    font-size: 14px;
    padding: 0 10px;
    p {
      margin: 5px 10px;
    }
  }

  .previewBox {
    position: fixed;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    z-index: 10000;
    background: rgba(0,0,0,0.6);
    .img {
      position: absolute;
      width: 600px;
      height: 600px;
      top: 50%;
      left:  50%;
      border: 5px solid #ccc;
      transform: translate(-50%,-50%);
      background: #fff;
      background-repeat:no-repeat;
      background-position: center;
      background-size:contain;
    }
  }
</style>
