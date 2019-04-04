<template>
  <div class="container">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card class="box-card" shadow="never">
      <el-row :gutter="10">
        <el-col :span="6">
          <el-input placeholder="请输入搜索关键字" v-model="params.query">
            <el-button slot="append" @click="changeSearch" icon="el-icon-search"></el-button>
          </el-input>
        </el-col>
        <el-col :span="18">
          <el-button type="primary" plain @click="addDialogFormVisible=true">添加用户</el-button>
        </el-col>
      </el-row>
      <el-table :data="userList" stripe style="width: 100%; margin-top: 10px">
        <el-table-column label="姓名" width="200" prop="username"></el-table-column>
        <el-table-column label="邮箱" width="200" prop="email"></el-table-column>
        <el-table-column label="电话" width="200" prop="mobile"></el-table-column>
        <el-table-column label="角色" width="200" prop="role_name"></el-table-column>
        <el-table-column label="状态" width="100">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.mg_state" @change="changeState(scope.row.id,scope.row.mg_state)"
              active-color="#13ce66"
              inactive-color="#ccc">
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button-group>
              <el-button icon="el-icon-edit" @click="showEditDialog(scope.row.id)" round></el-button>
              <el-button icon="el-icon-delete" @click="openDelConfirm(scope.row.id)" round></el-button>
              <el-tooltip class="item" effect="dark" content="分配角色" placement="top">
              <el-button icon="el-icon-setting" @click="showRoleDialog(scope.row)" round></el-button>
              </el-tooltip>
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
    <el-dialog title="添加用户" @closed="addAfterClosed" :visible.sync="addDialogFormVisible" width="400px">
      <el-form ref="addForm" :model="addForm" :rules="addRules" label-width="80px">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="addForm.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="addForm.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="addForm.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="mobile">
          <el-input v-model="addForm.mobile" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addDialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addUser">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="编辑用户" @closed="editAfterClosed" :visible.sync="editDialogFormVisible" width="400px">
      <el-form ref="editForm" :model="editForm" :rules="editRules" label-width="80px">
        <el-form-item label="用户名" prop="username">
          <el-input :disabled="true" v-model="editForm.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="editForm.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="mobile">
          <el-input v-model="editForm.mobile" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editDialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="editUser">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="分配角色" :visible.sync="roleDialogFormVisible" width="400px">
      <p>当前用户：{{userInfo.username}}</p>
      <p>当前角色：{{userInfo.role_name}}</p>
      <p>分配角色：
        <el-select v-model="roleId" placeholder="请选择">
          <el-option
            v-for="item in roleList"
            :key="item.id"
            :label="item.roleName"
            :value="item.id">
          </el-option>
        </el-select>
      </p>
      <div slot="footer" class="dialog-footer">
        <el-button @click="roleDialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="roleUser(userInfo.id)">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import mix from './Users-Mixin'
export default {
  mixins: [mix]
}
</script>

<style scoped>
  .box-card {
    margin-top: 15px;
  }
</style>
