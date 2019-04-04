<template>
  <div class="container">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>商品列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card class="box-card" shadow="never">
      <el-alert type="warning" show-icon title="注意：第三级分类才可设置参数。"></el-alert>
      <el-form label-position="left" inline>
        <el-form-item label="选择商品分类：">
          <el-cascader :props="categoryProps" clearable
                       expand-trigger="hover" style="width: 300px"
                       :options="categoryList"
                       v-model="categorySelected"
                       @change="categoryChange">
          </el-cascader>
        </el-form-item>
      </el-form>
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="动态参数" name="many">
          <el-button :disabled="disabled" type="success"  @click="dialogFormVisible=true">添加动态参数</el-button>
          <el-table :data="manyAttrs">
            <el-table-column type="expand" width="100px">
              <template slot-scope="scope">
                <el-tag size="normal" @close="closeManyAttrsValue(scope.row,i)"  closable :key="i" v-for="(item,i) in scope.row.attr_vals">{{item}}</el-tag>
                <el-tag size="normal"
                        class="button-new-tag"
                        :disable-transitions="true"
                        @click="showAddAttrValue(scope.row)"
                        v-if="!scope.row.showInput">
                  +添加tag
                </el-tag>
                <el-input class="input-new-tag"
                          v-if="scope.row.showInput"
                          v-model="scope.row.valueInput"
                          ref="input" @blur="addManyAttrValue(scope.row)"
                          @keyup.enter.native="addManyAttrValue(scope.row)">
                </el-input>
              </template>
            </el-table-column>
            <el-table-column label="属性名称" prop="attr_name"></el-table-column>
            <el-table-column label="操作" width="200px">
              <template slot-scope="scope">
                <el-button-group>
                  <el-button icon="el-icon-edit" round></el-button>
                  <el-button icon="el-icon-delete" @click="delAttr(scope.row.attr_id)" round></el-button>
                </el-button-group>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="静态参数" name="only">
          <el-button :disabled="disabled" type="success" @click="dialogFormVisible=true">添加静态参数</el-button>
          <el-table :data="onlyAttrs">
            <el-table-column type="index" width="100px"></el-table-column>
            <el-table-column label="属性名称" prop="attr_name"></el-table-column>
            <el-table-column label="属性值">
              <template slot-scope="scope">
                <el-tag size="normal" style="width: 200px;margin-bottom: 0"
                        class="button-new-tag"
                        :disable-transitions="true"
                        @click="showAddAttrValue(scope.row)"
                        v-if="!scope.row.showInput">
                  {{scope.row.attr_vals}}
                </el-tag>
                <el-input class="input-new-tag" style="width: 200px;margin-bottom: 0;vertical-align: top "
                          v-if="scope.row.showInput"
                          v-model="scope.row.attr_vals"
                          ref="input" @blur="addOnlyAttrValue(scope.row)"
                          @keyup.enter.native="addOnlyAttrValue(scope.row)">
                </el-input>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="200px">
              <template slot-scope="scope">
                <el-button-group>
                  <el-button icon="el-icon-edit" round></el-button>
                  <el-button icon="el-icon-delete" @click="delAttr(scope.row.attr_id)" round></el-button>
                </el-button-group>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
      </el-tabs>
    </el-card>
    <el-dialog :title="activeName==='many'?'添加动态参数':'添加静态参数'"
               :visible.sync="dialogFormVisible" width="400px">
      <el-form :model="addForm" :rules="addRules" ref="addForm">
        <el-form-item label="活动名称" label-width="80px" prop="attr_vals">
          <el-input v-model="addForm.attr_name" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveAttr">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import mix from './Params-Mixin'
export default {
  mixins: [mix]
}
</script>
<style scoped>
  .el-tag{
    margin-bottom: 10px;
    margin-right: 10px;
  }
  .button-new-tag {
    height: 32px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
  }
  .input-new-tag {
    width: 90px;
    margin-bottom: 10px;
    margin-right: 10px;
    vertical-align: bottom;
  }
</style>
