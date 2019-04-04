<template>
  <div class="login">
    <div class="login_box">
      <h3><img src="../assets/logo.png" alt=""></h3>
      <el-form ref="ruleForm" :model="ruleForm" :rules="rules">
        <el-form-item prop="username">
          <el-input placeholder="请输入用户名" prefix-icon="fa fa-envelope-o" v-model="ruleForm.username"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input type="password" placeholder="请输入密码" prefix-icon="fa fa-key" v-model="ruleForm.password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button>重置</el-button>
          <el-button type="primary" @click="submitForm">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import mix from './Login-Mixin'
export default {
  mixins: [mix]
}
</script>
<style lang="less" scoped>
  .login {
    width: 100%;
    height: 100%;
    position: relative;
    background: linear-gradient(30deg,aliceblue,#0c5460);
    .login_box {
      position: absolute;
      width: 100%;
      min-width: 320px;
      max-width: 375px;
      border: 1px solid #ccc;
      padding: 15px;
      border-radius: 4px;
      box-shadow: 0 2px 15px #eee;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -60%);
      background: linear-gradient(210deg,aliceblue,#d1ecf1);
      h3 {
        margin: 0;
        font-weight: normal;
        text-align: center;
        padding-bottom: 10px;
      }
      .input {
        padding-top: 10px;
      }
    }
  }
</style>
