<template>
    <div class="login-background">
      <div class="main-container">
        <div class="intro-container">
          
          <h1 class="intro-title">校友管理系统</h1>
          <p class="intro-text">几年软微人，一生燕园情!</p>
        </div>
      <div class="register">
        <h1>注册账号</h1>
        <el-form ref="form" :model="user" :rules="rules" label-width="100px">
          <el-form-item label="用户名" prop="username">
            <el-input v-model="user.username"></el-input>
          </el-form-item>
          <el-form-item label="密码：" prop="password">
            <el-input v-model="user.password"></el-input>
          </el-form-item>
          <el-form-item label="昵称" prop="nickname">
            <el-input v-model="user.nickname"></el-input>
          </el-form-item> 
          <!-- <el-form-item label="是否激活" prop="enabled">
            <el-input v-model="user.enabled"></el-input>
          </el-form-item> 
          <el-form-item label="角色" prop="roles">
            <el-input v-model="user.roles"></el-input>
          </el-form-item>  -->
          
          <el-form-item label="邮箱号" prop="email">
            <el-input v-model="user.email"></el-input>
          </el-form-item>
          <!-- <el-form-item label="上传头像" prop="userface">
            <el-input v-model="user.userface"></el-input> 
           </el-form-item>
           <el-form-item label="注册时间" prop="regTime">
            <el-input v-model="user.regTime"></el-input> 
           </el-form-item> -->
          <!-- <el-form-item label="验证码：" prop="VerificationCode">
            <el-input v-model="user.VerificationCode"></el-input>
          </el-form-item> -->
          
          <el-form-item>
            <el-button type="primary"  @click.native.prevent="submitClick">注册</el-button>
            <el-button  @click.native.prevent="submitClick">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
    
    </template>
    
    <script>
   import { postRequest} from '../utils/api'
  
  
    export default {
  
      data() {
        return {
          user: {
            username: "",
            password: "",
            nickname:"",
            // enabled: "",
            // roles:"",
            email:"",
            // userface:"",
            // regTime:""
          },
          rules: {
            username: [{ required: true, message: "请输入用户名", trigger: "blur" },],
            nickname: [{ required: true, message: "请输入昵称", trigger: "blur" }],
            // gender: [{ required: true, message: "请选择性别", trigger: "change" }],
            // phone: [{ required: true, message: "请输入手机号", trigger: "blur" }],
            // idCard: [{ required: true, message: "请输入身份证号", trigger: "blur" }],
            email: [{ required: true, message: "请输入邮箱", trigger: "blur" }],
            // VerificationCode: [{ required: true, message: "请输入验证码", trigger: "blur" }],
            password: [{ required: true, message: "请输入密码", trigger: "blur" }],
          },
          loading: false
        };
      },
      methods: {
        submitClick() {
        this.$refs.form.validate((valid) => {
          if (valid) {
            this.loading = true;
            const user = {
              username: this.user.username,
              password: this.user.password,
              nickname: this.user.nickname,
              // enabled: this.user.enabled,
              // roles: this.user.roles,
              email: this.user.email,
              // userface: this.user.userface,
              // regTime: this.user.regTime
            };
  
            postRequest('/reg', {username:this.user.username,
              password:this.user.password,
              nickname:this.user.nickname,
              email:this.user.email})
              .then(resp=> {
            this.loading = false;
            if (resp.status == 200) {
              //成功
              var json = resp.data;
              if (json.status == 'success') {
                this.$router.replace({path: '/'});
              } else {
                this.$alert('注册失败!', '失败1!');
              }
            } else {
              //失败
              this.$alert('登录失败!', '失败2!');
            }
          }, resp=> {
            this.loading = false;
            this.$alert('找不到服务器⊙﹏⊙∥!', '失败!');
          });
        }
      })
    },
      
      resetForm() {
        this.$refs.form.resetFields();
      }
    },
  };
  </script>
    
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