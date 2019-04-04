<template>
  <div class="container">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>角色列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card class="box-card" shadow="never">
      <el-button type="primary" plain @click="addDialogFormVisible=true">添加角色</el-button>
      <el-table
        :data="rolesList"
        style="width: 100%;margin-top: 10px">
        <el-table-column type="expand" width="100px">
          <template slot-scope="scope">
            <span style="color: #ccc" v-if="!scope.row.child.length">暂未分配任何权限</span>
            <el-row v-for="(item,i) in scope.row.child" :key="item.id"
                    :style="{borderTop:i==0?'1px solid #eee':'',borderBottom:'1px solid #eee'}">
              <el-col :span="4">
                <el-tag closable type="primary" @close="delRights(scope.row,item.id)">{{item.authName}}</el-tag>
                <i class="el-icon-caret-right"></i>
              </el-col>
              <el-col :span="20">
                <el-row v-for="(subItem,si) in item.child" :key="subItem.id"
                        :style="{borderTop:si!=0?'1px solid #eee':''}">
                  <el-col :span="8">
                    <el-tag closable type="success" @close="delRights(scope.row,subItem.id)">{{subItem.authName}}</el-tag>
                    <i class="el-icon-caret-right"></i>
                  </el-col>
                  <el-col :span="16">
                    <el-tag closable type="warning" @close="delRights(scope.row,lastItem.id)" v-for="lastItem in subItem.child" :key="lastItem.id">
                      {{lastItem.authName}}
                    </el-tag>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
          </template>
        </el-table-column>
        <el-table-column type="index" width="100px"></el-table-column>
        <el-table-column label="角色名称" prop="roleName" width="300px"></el-table-column>
        <el-table-column label="角色描述" prop="roleDesc" width="300px"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button-group>
              <el-button icon="el-icon-edit" @click="showEditDialog(scope.row.id)" round></el-button>
              <el-button icon="el-icon-delete" @click="delRole(scope.row.id)" round></el-button>
              <el-tooltip class="item" effect="dark" content="分配权限" placement="right">
                <el-button icon="el-icon-setting" @click="showRightsDialog(scope.row)" round></el-button>
              </el-tooltip>
            </el-button-group>
          </template>
        </el-table-column>
      </el-table>
      <!--添加-->
      <el-dialog title="添加角色" @closed="addAfterClosed" :visible.sync="addDialogFormVisible" width="400px">
        <el-form ref="addForm" :model="addForm" :rules="addRules" label-width="80px">
          <el-form-item label="角色名称" prop="roleName">
            <el-input v-model="addForm.roleName" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="角色描述" prop="roleDesc">
            <el-input v-model="addForm.roleDesc" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="addDialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="addRole">确 定</el-button>
        </div>
      </el-dialog>
      <!--编辑-->
      <el-dialog title="编辑角色" @closed="editAfterClosed" :visible.sync="editDialogFormVisible" width="400px">
        <el-form ref="editForm" :model="editForm" :rules="editRules" label-width="80px">
          <el-form-item label="角色名称" prop="roleName">
            <el-input v-model="editForm.roleName" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="角色描述" prop="roleDesc">
            <el-input v-model="editForm.roleDesc" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="editDialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="editRole">确 定</el-button>
        </div>
      </el-dialog>
      <!--分配权限-->
      <el-dialog title="分配权限" @closed="rightsAfterClosed" :visible.sync="rightsDialogFormVisible" width="400px">
        <el-tree ref="tree"
          :data="rightsData"
          show-checkbox default-expand-all
          node-key="id"
          :default-checked-keys="rightsChecked"
          :props="{label:'authName'}">
        </el-tree>
        <div slot="footer" class="dialog-footer">
          <el-button @click="rightsDialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="editRights()">确 定</el-button>
        </div>
      </el-dialog>
    </el-card>
  </div>
</template>
<script>
import mix from './Roles-Mixin'
export default {
  mixins: [mix]
}
</script>
<style scoped>
  .box-card {
    margin-top: 15px;
  }

  .el-row {
    display: flex;
    align-items: center;
  }

  .el-tag{
    margin: 10px 5px;
  }
</style>
