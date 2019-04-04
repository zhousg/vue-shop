<template>
  <div class="container">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>订单管理</el-breadcrumb-item>
      <el-breadcrumb-item>订单列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card class="box-card" shadow="never">
      <el-row :gutter="10">
        <el-col :span="6">
          <el-input clearable placeholder="请输入搜索关键字" v-model="params.query">
            <el-button slot="append" @click="changeSearch" icon="el-icon-search"></el-button>
          </el-input>
        </el-col>
      </el-row>
      <el-table :data="ordersList" stripe style="width: 100%; margin-top: 10px">
        <el-table-column type="index"></el-table-column>
        <el-table-column label="订单编号" prop="order_number"></el-table-column>
        <el-table-column label="订单金额" width="150" prop="order_price"></el-table-column>
        <el-table-column label="是否付款" width="150">
          <template slot-scope="scope">
            {{scope.row.order_pay != '0'?'已付款':'未付款'}}
          </template>
        </el-table-column>
        <el-table-column label="是否发货" width="150" prop="is_send"></el-table-column>
        <el-table-column label="下单时间" width="150">
          <template slot-scope="scope">
            {{scope.row.create_time|formatTime}}
          </template>
        </el-table-column>
        <el-table-column label="操作" width="200">
          <template slot-scope="scope">
            <el-button-group>
              <el-button icon="el-icon-edit" @click="dialogFormVisible=true" round></el-button>
              <el-button icon="el-icon-location"  @click="searchKD" round></el-button>
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
    <el-dialog title="收货地址" :visible.sync="dialogFormVisible" width="500px">
      <el-form  label-width="80px">
        <el-form-item label="省市区">
          <el-cascader :options="city" style="width: 350px" expand-trigger="hover"></el-cascader>
        </el-form-item>
        <el-form-item label="详细地址">
          <el-input type="textarea" style="width: 350px"  autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="物流查询" :visible.sync="kdDialogFormVisible" width="500px">
      <div>
        <el-timeline>
          <el-timeline-item
            v-for="(activity, index) in activities"
            :key="index"
            :timestamp="activity.time">
            {{activity.context}}
          </el-timeline-item>
        </el-timeline>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="kdDialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="kdDialogFormVisible = false">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import mix from './Orders-Mixin'
export default {
  mixins: [mix]
}
</script>
<style scoped>
</style>
