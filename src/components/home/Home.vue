<template>
  <el-container class="home-container">
    <el-header class="el-header">
      <div class="left">
        <el-button type="info" @click="collapse=!collapse" icon="fa fa-bars" circle></el-button>
        <span>&nbsp;&nbsp;&nbsp;&nbsp;品优购后台管理系统</span>
      </div>
      <el-button type="danger" size="mini" round @click="logout">退出</el-button>
    </el-header>
    <el-container>
      <el-aside class="el-aside" :width="collapse?'180px':'65px'">
        <el-menu background-color="#333744"
                 text-color="#fff"
                 active-text-color="#ffd04b"
                 router
                 unique-opened
                 style="border: none;margin-top: 5px"
                 :collapse-transition="false"
                 :default-active="active"
                 :collapse="!collapse">
          <el-submenu :index="item.id+''" v-for="(item,i) in menu" :key="item.id">
            <template slot="title">
              <i :class="['fa',iconArr[i]]"></i>
              <span>{{item.authName}}</span>
            </template>
            <el-menu-item :index="'/'+subItem.path" v-for="subItem in item.children" :key="subItem.id">
              <i class="fa fa-th-large"></i>
              <span>{{subItem.authName}}</span>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main class="el-main">
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>
<script>
import mix from './Home-Mixin.js'

export default {
  mixins: [mix]
}
</script>
<style lang="less" scoped>
  .home-container {
    height: 100%;
    .el-header {
      user-select: none;
      background-color: #373d41;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 15px;
      .left {
        color: #ccc;
        font-size: 18px;
        display: flex;
        align-items: center;
      }
    }
    .el-aside {
      background-color: #333744;
      overflow: hidden;
      user-select: none;
    }
    .el-main {
      background-color: #eaedf1;
    }
  }

  .fa {
    margin-right: 6px;
  }
</style>
