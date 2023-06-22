<template>
    <div class="container">
      <h1 class="page-title">用户信息</h1>
  
      <el-collapse v-model="activeNames">
  <el-collapse-item title="用户信息" name="1">
    <el-form ref="form" :model="user"  label-width="100px">
      <div class="info-container">
        <div class="info-row">
          <label>用户名:</label>
          <span>{{ user.username }}</span>
        </div>
        <div class="info-row">
          <label>邮箱:</label>
          <span>{{ user.email }}</span>
        </div>
        <div class="info-row">
          <label>头像:</label>
          <div class="avatar-container">
            <img class="avatar" :src="user.userface" alt="用户头像">
          </div>
        </div>
      </div>
    </el-form>
  </el-collapse-item>
</el-collapse>

          <!-- <el-form-item label="用户名" prop="username">
          <el-input v-model="user.username"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="user.email"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="user.email"></el-input>
        </el-form-item> -->
        <el-collapse v-model="activeNames"> 
        <el-collapse-item title="修改信息" name="2">
      <el-form ref="form" :model="user" :rules="rules" label-width="100px">
        <el-form-item label="昵称" prop="newnickname">
          <el-input v-model="user.newnickname"></el-input>
        </el-form-item>
        <el-form-item label="新密码" prop="newpassword">
          <el-input v-model="user.newpassword"></el-input>
        </el-form-item>
        <el-form-item label="新邮箱" prop="newemail">
          <el-input v-model="user.newemail"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="updateUserInfo">更新信息</el-button>
            <el-button @click="cancelUpdate">取消</el-button></el-form-item>
      </el-form>
      </el-collapse-item>
    </el-collapse>
    </div>
    </template>

<script>
  import { putRequest } from '../utils/api'
  import { getRequest } from '../utils/api'
  
  export default {
    data() {
      return {
        user: {
          username: '',
          newpassword: '',
          email: '',
          newnickname:'',
          newemail: '',
          userface: '' 
        },
        rules: {
        newnickname: [
          { required: false, message: "请输入用户名", trigger: "blur" },
        ],
       newemail: [{ required: false, message: "请输入旧密码", trigger: "blur" }],
        newpassword: [{ required: false, message: "请输入新密码", trigger: "blur" }],
      },
        id:''
      };
    },
    mounted() {
        this.currentUserId(); // 获取当前用户ID
    //   this.getUserInfo(this.id);
    },
methods: {
    currentUserId() {
      getRequest("/currentUserId")
        .then(resp => {
          this.id = resp.data;
          this.getUserInfo(this.id); // 获取用户信息
        })
        .catch(error => {
          console.error(error);
        });
    },
    getUserInfo(id) {
  var _this = this;
  getRequest("/admin/user/" + id)
    .then(resp => {
      if (resp.status == 200) {
        _this.user = resp.data;
      } else {
        _this.$message({ type: 'error', message: '数据加载失败!' });
      }
    })
    .catch(resp => {
      if (resp.response.status == 403) {
        var data = resp.response.data;
        _this.$message({ type: 'error', message: data });
      }
    });
},
updateUserInfo() {
        // const updatedInfo = {
        //   password: this.user.password,
        //   phone: this.user.phone,
        //   email: this.user.email,
        //   // userface: this.user.userface
        // };
  
        // 执行更新用户信息的请求操作
        // putRequest('/admin/user', updatedInfo)
        putRequest('/updateUserEmail',{email:this.user.newemail})
          .then(response => {
            if (response.status === 200) {
              this.$message.success('修改成功！');
            } else {
              this.$message.error('用户信息更新失败');
            }
          })
          .catch(error => {
            this.$message.error('用户信息更新失败');
            console.error(error);
          });
          putRequest('/updatePassword',{password:this.user.newpassword})
          .then(response => {
            if (response.status === 200) {
              this.$message.success('修改成功！');
            } else {
              this.$message.error('用户信息更新失败');
            }
          })
          .catch(error => {
            this.$message.error('用户信息更新失败');
            console.error(error);
          });
          putRequest('/updateNickname',{nickname:this.user.newnickname})
          .then(response => {
            if (response.status === 200) {
              this.$message.success('修改成功！');
            } else {
              this.$message.error('用户信息更新失败');
            }
          })
          .catch(error => {
            this.$message.error('用户信息更新失败');
            console.error(error);
          });
      },
      cancelUpdate() {
        // 取消更新操作，清空输入框
        this.user.newpassword = '';
        this.user.newemail = '';
      },
  }
}
  
  </script>



    <style>
.add-user {
  padding: 20px;
}

.container {
  padding: 20px;
}

.page-title {
  font-family: 'San Francisco', Arial, sans-serif;
  font-size: 24px;
  font-weight: bold;
  color: #6699CC;
  letter-spacing: -0.5px;
  text-align: center;
}

.info-container {
  display: flex;
  flex-direction: column;
  margin-right:500px;
}

.info-row {
  display: flex;
  align-items: center;
  margin-bottom:10px;
}

.info-row label {
  margin-right: 10px;
  font-weight: bold;
}

.avatar-container {
  margin-top: 10px;
}

.avatar {
  width: 100px;
  height: 100px;
}

</style>
  