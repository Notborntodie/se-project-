<!--
<template>
  <div class="login-background">
    <div class="container">
      <div class="intro-container">
        <h1 class="intro-title">校友管理系统</h1>
        <p class="intro-text">几年软微生，一生燕园情!</p>
      </div>
      <el-form :rules="rules" class="login-container" label-position="left"
               label-width="0px" v-loading="loading" @keyup.native.enter="submitClick">
        <el-form-item prop="account">
          <el-input type="text" v-model="loginForm.username" auto-complete="off" placeholder="账号" ref="username" ></el-input>
        </el-form-item>
        <el-form-item prop="checkPass">
          <el-input type="password" v-model="loginForm.password" auto-complete="off" placeholder="密码" ref="password" ></el-input>
        </el-form-item>
        <el-checkbox class="login_remember" v-model="checked" label-position="left">记住密码</el-checkbox>
        <el-form-item>
          <el-button type="primary" @click.native.prevent="submitClick">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

-->

<template>
  <div class="login-background">
    <div class="main-container">
      <div class="intro-container">
        <h1 class="intro-title">校友管理系统</h1>
        <p class="intro-text">几年软微人，一生燕园情!</p>
      </div>
      <el-form :rules="rules" class="login-container" label-position="left"
               label-width="0px" v-loading="loading" @keyup.native.enter="submitClick">
        <el-form-item prop="account">
          <el-input type="text" v-model="loginForm.username" auto-complete="off" placeholder="账号" ref="username" ></el-input>
        </el-form-item>
        <el-form-item prop="checkPass">
          <el-input type="password" v-model="loginForm.password" auto-complete="off" placeholder="密码" ref="password" ></el-input>
        </el-form-item>
        <el-checkbox class="login_remember" v-model="checked" label-position="left">记住密码</el-checkbox>
        <el-form-item>
          <el-button type="primary" @click.native.prevent="submitClick">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>



<!--
<template>
  <div class="login-background">
    <el-form :rules="rules" class="login-container" label-position="left"
             label-width="0px" v-loading="loading" @keyup.native.enter="submitClick">
      <h3 class="login_title">校友管理系统登录</h3>
      <div class="form-items">
        <el-form-item prop="account">
          <el-input type="text" v-model="loginForm.username" auto-complete="off" placeholder="账号" ref="username" ></el-input>
        </el-form-item>
        <el-form-item prop="checkPass">
          <el-input type="password" v-model="loginForm.password" auto-complete="off" placeholder="密码" ref="password" ></el-input>
        </el-form-item>
      </div>
      <el-checkbox class="login_remember" v-model="checked" label-position="left">记住密码</el-checkbox>
      <el-form-item style="width: 100%">
        <el-button type="primary" @click.native.prevent="submitClick" style="width: 100%">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>


-->


<script>
  import {postRequest} from '../utils/api'
  import {putRequest} from '../utils/api'
  export default{
    data(){
      return {
        rules: {
          account: [{required: true, message: '请输入用户名', trigger: 'blur'}],
          checkPass: [{required: true, message: '请输入密码', trigger: 'blur'}]
        },
        checked: true,
        loginForm: {
          username: 'sang',
          password: '123'
        },
        loading: false
      }
    },
    methods: {
      submitClick: function () {
        var _this = this;
        this.loading = true;
        postRequest('/login', {
          username: this.loginForm.username,
          password: this.loginForm.password
        }).then(resp=> {
          _this.loading = false;
          if (resp.status == 200) {
            //成功
            var json = resp.data;
            if (json.status == 'success') {
              _this.$router.replace({path: '/home'});
            } else {
              _this.$alert('登录失败!', '失败!');
            }
          } else {
            //失败
            _this.$alert('登录失败!', '失败!');
          }
        }, resp=> {
          _this.loading = false;
          _this.$alert('找不到服务器⊙﹏⊙∥!', '失败!');
        });
      }
    }
  }
</script>


<!--

<style>
body, html {
  margin: 0;
  padding: 0;
  height: 100%;
  width: 100%;
}

.login-background {
  background: url('../assets/pku.jpg') no-repeat center center fixed;
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
}

.container {
  display: flex;
  justify-content: space-around;
  width: 70%;
  background: rgba(255,255,255,0.5);
  padding: 20px;
  border-radius: 15px;
}

.intro-container {
  width: 45%;
  font-family: 'Arial', sans-serif;
  color: #505458;
}

.intro-title {
  font-size: 2.5em;
  margin-bottom: 0.5em;
}

.intro-text {
  font-size: 1.2em;
}

.login-container {
  width: 45%;
}

.form-items {
  flex-direction: column;
}

el-button {
  background-color: #337ab7;
  color: white;
  border-radius: 5px;
  padding: 10px 15px;
  font-size: 1em;
  transition: background-color 0.3s;
}

el-button:hover {
  background-color: #286090;
}
</style>



-->

<style>

  html, body {
    margin: 0;
    padding: 0;
    height: 100%;
    width: 100%;
  }

 

  .login-background {
    background: url('../assets/pku.jpg') no-repeat center center fixed;
    background-size: cover;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  

  .main-container {
    display: flex;
    width: 700px;
    border-radius: 15px;
    background-clip: padding-box;
    padding: 35px 35px 15px 35px;
    background: rgba(255,255,255,0.5);
    box-shadow: 0 0 25px #cac6c6;
  }

  .intro-container {
    width: 50%;
    text-align: left;
    padding-right: 20px;
    border-right: 1px solid #cac6c6;
  }

  .intro-title {
    font-size: 32px;
    color: #505458;
    margin-bottom: 20px;
  }

  .intro-text {
    font-size: 24px;
    color: #505458;
  }

  .login-container {
    width: 50%;
    padding-left: 20px;
  }

  .form-items {
    display: flex;
    justify-content: flex-end;
  }

  .login_remember {
    text-align: left;
    margin-top: 15px;
  }

  el-button {
    background-color: #505458;
    color: white;
  }
</style>


-->
<!--

<style>
  .login-background {
    background: url('../assets/pku.jpg') no-repeat center center fixed;
    background-size: cover;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .login-container {
    border-radius: 15px;
    background-clip: padding-box;
    width: 350px;
    padding: 35px 35px 15px 35px;
    background: rgba(255,255,255,0.5);
    box-shadow: 0 0 25px #cac6c6;
  }

  .login_title {
    text-align: left;
    color: #505458;
    margin-bottom: 20px;
  }

  .form-items {
    display: flex;
    justify-content: flex-end;
  }

  .login_remember {
    text-align: left;
    margin-top: 15px;
  }

  el-button {
    background-color: #505458;
    color: white;
  }
</style>


-->

<!--
<template>
  <el-form :rules="rules" class="login-container" label-position="left"
           label-width="0px" v-loading="loading" @keyup.native.enter="submitClick">
    <h3 class="login_title">校友管理系统登录</h3>
    <el-form-item prop="account">
      <el-input type="text" v-model="loginForm.username" auto-complete="off" placeholder="账号" ref="username" ></el-input>
    </el-form-item>
    <el-form-item prop="checkPass">
      <el-input type="password" v-model="loginForm.password" auto-complete="off" placeholder="密码" ref="password" ></el-input>
    </el-form-item>
    <el-checkbox class="login_remember" v-model="checked" label-position="left">记住密码</el-checkbox>
    <el-form-item style="width: 100%">
      <el-button type="primary" @click.native.prevent="submitClick" style="width: 100%">登录</el-button>
    </el-form-item>
  </el-form>
</template>
<script>
  import {postRequest} from '../utils/api'
  import {putRequest} from '../utils/api'
  export default{
    data(){
      return {
        rules: {
          account: [{required: true, message: '请输入用户名', trigger: 'blur'}],
          checkPass: [{required: true, message: '请输入密码', trigger: 'blur'}]
        },
        checked: true,
        loginForm: {
          username: 'sang',
          password: '123'
        },
        loading: false
      }
    },
    methods: {
      submitClick: function () {
        var _this = this;
        this.loading = true;
        postRequest('/login', {
          username: this.loginForm.username,
          password: this.loginForm.password
        }).then(resp=> {
          _this.loading = false;
          if (resp.status == 200) {
            //成功
            var json = resp.data;
            if (json.status == 'success') {
              _this.$router.replace({path: '/home'});
            } else {
              _this.$alert('登录失败!', '失败!');
            }
          } else {
            //失败
            _this.$alert('登录失败!', '失败!');
          }
        }, resp=> {
          _this.loading = false;
          _this.$alert('找不到服务器⊙﹏⊙∥!', '失败!');
        });
      }
    }
  }
</script>
<style>
  .login-container {
    border-radius: 15px;
    background-clip: padding-box;
    margin: 180px auto;
    width: 350px;
    padding: 35px 35px 15px 35px;
    background: #fff;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;
  }

  .login_title {
    margin: 0px auto 40px auto;
    text-align: center;
    color: #505458;
  }

  .login_remember {
    margin: 0px 0px 35px 0px;
    text-align: left;
  }
</style>


-->


<!--
<template>
  <el-form :rules="rules" class="login-container" label-position="left"
           label-width="0px" v-loading="loading">
    <h3 class="login_title">系统登录</h3>
    <el-form-item prop="account">
      <el-input type="text" v-model="loginForm.username" auto-complete="off" placeholder="账号"></el-input>
    </el-form-item>
    <el-form-item prop="checkPass">
      <el-input type="password" v-model="loginForm.password" auto-complete="off" placeholder="密码"></el-input>
    </el-form-item>
    <el-checkbox class="login_remember" v-model="checked" label-position="left">记住密码</el-checkbox>
    <el-form-item style="width: 100%">
      <el-button type="primary" @click.native.prevent="submitClick" style="width: 100%">登录</el-button>
    </el-form-item>
  </el-form>
</template>
<script>
  import {postRequest} from '../utils/api'
  import {putRequest} from '../utils/api'
  export default{
    data(){
      return {
        rules: {
          account: [{required: true, message: '请输入用户名', trigger: 'blur'}],
          checkPass: [{required: true, message: '请输入密码', trigger: 'blur'}]
        },
        checked: true,
        loginForm: {
          username: 'sang',
          password: '123'
        },
        loading: false
      }
    },
    methods: {
      submitClick: function () {
        var _this = this;
        this.loading = true;
        postRequest('/login', {
          username: this.loginForm.username,
          password: this.loginForm.password
        }).then(resp=> {
          _this.loading = false;
          if (resp.status == 200) {
            //成功
            var json = resp.data;
            if (json.status == 'success') {
              _this.$router.replace({path: '/home'});
            } else {
              _this.$alert('登录失败!', '失败!');
            }
          } else {
            //失败
            _this.$alert('登录失败!', '失败!');
          }
        }, resp=> {
          _this.loading = false;
          _this.$alert('找不到服务器⊙﹏⊙∥!', '失败!');
        });
      }
    }
  }
</script>





/
<style>
  .login-container {
    border-radius: 15px;
    background-clip: padding-box;
    margin: 180px auto;
    width: 350px;
    padding: 35px 35px 15px 35px;
    background: #fff;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;
  }

  .login_title {
    margin: 0px auto 40px auto;
    text-align: center;
    color: #505458;
  }

  .login_remember {
    margin: 0px 0px 35px 0px;
    text-align: left;
  }
</style>
-->