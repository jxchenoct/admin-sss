<template>
  <div class="login">
    <el-form ref="form" :model="form" class="container" :rules="rules">
      <el-form-item>
        <div class="avatar">
          <img src="@/assets/avatar.jpg" alt="">
        </div>
      </el-form-item>
      <el-form-item prop="username">
        <el-input v-model="form.username" placeholder="账户">
          <i slot="prefix" class="myicon myicon-user"></i>
        </el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input v-model="form.password" type="password" placeholder="密码">
          <i slot="prefix" class="myicon myicon-key"></i>
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" class="login-btn" @click="submitForm('form')">登陆</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { checkLogin } from '@/api/index'
export default {
  data() {
    var validateUser = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入用户明'))
      } else if (value.trim().length == 0) {
        callback(new Error('输入的不能为空格'))
      } else {
        callback()
      }
    }
    var validatePassword = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value.trim().length == 0) {
        callback(new Error('输入的不能为空格'))
      } else {
        callback()
      }
    }
    return {
      form: {
        username: '',
        password: ''
      },
      rules: {
        username: [{ validator: validateUser, trigger: 'blur' }],
        password: [{ validator: validatePassword, trigger: 'blur' }]
      }
    }
  },
  methods: {
    submitForm(formName) {
      //判断是否通过验证
      this.$refs[formName].validate(valid => {
        if (valid) {
          //通过验证就发送请求
          checkLogin(this.form).then(res => {
            //登陆不成功
            if (res.meta.status != 200) {
              this.$message({
                showClose: true,
                message: res.meta.msg,
                type: 'error'
              })
              //登陆成功
            } else {
              //跳转到home页面
              //将token保存到localstorange里面
              localStorage.setItem("myToken",res.data.token)
              this.$router.push({name:'Home'})
            }
          })
        } else {
          return false
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.login {
  position: fixed;
  width: 100%;
  height: 100%;
  background-color: #2f4050;

  .container {
    position: absolute;
    left: 0;
    right: 0;
    width: 400px;
    padding: 0px 40px 15px 40px;
    margin: 200px auto;
    background: white;
    .avatar {
      position: relative;
      left: 50%;
      width: 120px;
      height: 120px;
      margin-left: -60px;
      margin-top: -60px;
      box-sizing: border-box;
      border-radius: 50%;
      border: 10px solid #fff;
      box-shadow: 0 1px 5px #ccc;
      overflow: hidden;
    }
    .login-btn {
      width: 100%;
    }
  }
}
</style>