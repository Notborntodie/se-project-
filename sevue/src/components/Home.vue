<template>
  <el-container class="home_container">
    <el-header>
      
     <!-- <img class="logo" src="https://ss.pku.edu.cn/templates/sspku_index/images/logo-v4.png" alt="">-->
     <div class="pull-left logo">
            <a href="#">
              <img class="logo-img" src="https://ss.pku.edu.cn/templates/sspku_index/images/logo-v4.png">
            </a>
          </div>
      <div class="home_title">校友管理系统</div>
     
      <div class="home_userinfoContainer">
        <el-dropdown @command="handleCommand">
          <span class="el-dropdown-link home_userinfo">
            {{ currentUserName }}
            <i class="el-icon-arrow-down el-icon--right home_userinfo"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="sysMsg">系统消息</el-dropdown-item>
            <el-dropdown-item command="MyArticle">我的文章</el-dropdown-item>
            <el-dropdown-item command="MyHome">个人主页</el-dropdown-item>
            <el-dropdown-item command="logout" divided>退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </el-header>
    <el-container>
      <el-aside width="200px">
        <el-menu default-active="1"  class="el-menu-vertical-demo" style="background-color: #ECECEC" router default-openeds='["0"]'>
          <template v-for="(item,index) in menus" v-if="!item.hidden">
            <el-submenu  :index="index + ''" v-if="item.children && item.children.length > 1" :key="index" default-opened>
              <template slot="title">
                <i :class="item.iconCls"></i>
                <span>{{ item.name }}</span>
              </template>
              <el-menu-item v-for="child in item.children" v-if="!child.hidden" :index="child.path" :key="child.path">
                {{ child.name }}
              </el-menu-item>
            </el-submenu>
            <template v-else-if="item.children">
              <el-menu-item :index="item.children[0].path">
                <i :class="item.children[0].iconCls"></i>
                <span slot="title">{{ item.children[0].name }}</span>
              </el-menu-item>
            </template>
          </template>
        </el-menu>
      </el-aside>
      <el-container>
        <el-main>
          <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item v-text="this.$router.currentRoute.name"></el-breadcrumb-item>
          </el-breadcrumb>
          <keep-alive>
            <router-view v-if="this.$route.meta.keepAlive"></router-view>
          </keep-alive>
          <router-view v-if="!this.$route.meta.keepAlive"></router-view>
        </el-main>
      </el-container>
    </el-container>
  </el-container>
</template>

<script>
import { getRequest } from '../utils/api'

export default {
  data() {
    return {
      defaultActive: '' , // 默认激活的菜单项索引值,
      currentUserName: ''
      ,
      isAdmin: false
      ,
      menus:[
      {
      path: '/home',
      // component: Home,
      name: '目录',
      // redirect: '/home/articleList',
      children: [
      
            {
              path: '/index',
              name: '首页',
              meta: {
                keepAlive: true
              }
            },

            {
              path:'/profile',
              name:'个人信息',
              meta:{
                keepAlive: true
              }
            }
            ,
            {
              path: '/articleList',
              name: '文章列表',
              meta: {
                keepAlive: true
              }
            },

            {
              path: '/postArticle',
              name: '发表文章',
              meta: {
                keepAlive: false
              }
            },
            {
              path: '/blogDetail',
              name: '博客详情',
              hidden: true,
              meta: {
                keepAlive: false
              }
            },
            {
              path: '/editBlog',
              name: '编辑博客',
              hidden: true,
              meta: {
                keepAlive: false
              }
            },
          ]}]
          
        
        }
      
    
  },

  async created() {
    this.setDefaultActive();
   
  /*
        getRequest("/isAdmin").then(resp=> {
          if (resp.status == 200) {
            this.isAdmin = resp.data;
            this.$message.success(String(this.isAdmin));
          }
        })
        */
        try {
    const resp = await getRequest("/isAdmin");
    if (resp.status === 200) {
      this.isAdmin = resp.data;
      //this.$message.success(String(this.isAdmin));
    }
  } catch (error) {
    console.error(error);
  }

        if(this.isAdmin){
          this.addChild('/articleMana', '文章管理', { keepAlive: true });
          this.addChild('/user', '用户管理', { iconCls: 'fa fa-user-o' });
          this.addChild('/cateMana', '栏目管理', { iconCls: 'fa fa-reorder' });
          this.addChild('/charts', '数据统计', { iconCls: 'fa fa-bar-chart' });

        }

/*


            {
              path: '/articleMana',
              name:"文章管理",
              meta:{
                keepAlive: true
              }

            }
            ,
            {
              path: '/user',
              name: '用户管理',
              meta: {
                iconCls: 'fa fa-user-o'
              }
            },
            {
              path: '/cateMana',
              name: '栏目管理',
              meta: {
                iconCls: 'fa fa-reorder'
              }
            },
            {
              path: '/charts',
              name: '数据统计',
              meta: {
                iconCls: 'fa fa-bar-chart'
              }
            }

    if (this.isAdmin) {
      this.menus=[
      {
      path: '/home',
      // component: Home,
      name: '首页',
      // redirect: '/home/articleList',
      children: [
      
            {
              path: '/index',
              name: '首页',
              meta: {
                keepAlive: true
              }
            },

            {
              path:'/profile',
              name:'个人信息',
              meta:{
                keepAlive: true
              }
            }
            ,
            {
              path: '/articleList',
              name: '文章列表',
              meta: {
                keepAlive: true
              }
            },

            {
              path: '/postArticle',
              name: '发表文章',
              meta: {
                keepAlive: false
              }
            },
            {
              path: '/blogDetail',
              name: '博客详情',
              hidden: true,
              meta: {
                keepAlive: false
              }
            },
            {
              path: '/editBlog',
              name: '编辑博客',
              hidden: true,
              meta: {
                keepAlive: false
              }
            },
            {
              path: '/articleMana',
              name:"文章管理",
              meta:{
                keepAlive: true
              }

            }
            ,
            {
              path: '/user',
              name: '用户管理',
              meta: {
                iconCls: 'fa fa-user-o'
              }
            },
            {
              path: '/cateMana',
              name: '栏目管理',
              meta: {
                iconCls: 'fa fa-reorder'
              }
            },
            {
              path: '/charts',
              name: '数据统计',
              meta: {
                iconCls: 'fa fa-bar-chart'
              }
            }]}]
    }
    */
  },
  mounted(){
    /*
    
        getRequest("/isAdmin").then(resp=> {
          if (resp.status == 200) {
            this.isAdmin = resp.data;
            this.$message.success(String( _this.isAdmin));
          }
        })
    if (this.isAdmin) {
     
      this.menus=[
      {
      path: '/home',
      // component: Home,
      name: '首页',
      // redirect: '/home/articleList',
      children: [
      
            {
              path: '/index',
              name: '首页',
              meta: {
                keepAlive: true
              }
            },

            {
              path:'/profile',
              name:'个人信息',
              meta:{
                keepAlive: true
              }
            }
            ,
            {
              path: '/articleList',
              name: '文章列表',
              meta: {
                keepAlive: true
              }
            },

            {
              path: '/postArticle',
              name: '发表文章',
              meta: {
                keepAlive: false
              }
            },
            {
              path: '/blogDetail',
              name: '博客详情',
              hidden: true,
              meta: {
                keepAlive: false
              }
            },
            {
              path: '/editBlog',
              name: '编辑博客',
              hidden: true,
              meta: {
                keepAlive: false
              }
            },
            {
              path: '/articleMana',
              name:"文章管理",
              meta:{
                keepAlive: true
              }

            }
            ,
            {
              path: '/user',
              name: '用户管理',
              meta: {
                iconCls: 'fa fa-user-o'
              }
            },
            {
              path: '/cateMana',
              name: '栏目管理',
              meta: {
                iconCls: 'fa fa-reorder'
              }
            },
            {
              path: '/charts',
              name: '数据统计',
              meta: {
                iconCls: 'fa fa-bar-chart'
              }
            }]}]
          
    }
    */
  
  },

  methods: {

    addChild(path, name, meta) {
  const child = {
    path: path,
    name: name,
    meta: meta
  };
  this.menus[0].children.push(child);
},

    setDefaultActive() {
      const firstChild = this.menus.find(item => item.children && item.children.length > 1);
      if (firstChild && firstChild.children && firstChild.children.length > 0) {
        this.defaultActive = `${this.menus.indexOf(firstChild)}`;
      }
    }
    ,
    handleCommand(command) {
      var _this = this;
      if (command == 'logout') {
        this.$confirm('注销登录吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(function () {
          getRequest("/logout");
          _this.currentUserName = '游客';
          _this.$router.replace({ path: '/#/home' });
        }, function () {
          // 取消
        });
      }
    }
  },

  mounted() {
    var _this = this;
    getRequest("/currentUserName").then(function (msg) {
      _this.currentUserName = msg.data;
    }, function (msg) {
      _this.currentUserName = '游客';
    });
  }
}
</script>

<style>
  .home_container {
    height: 100%;
    position: absolute;
    top: 0px;
    left: 0px;
    width: 100%;
  }

  .el-header {
    /* background-color: #20a0ff; */  background: url('https://ss.pku.edu.cn/templates/sspku_index/images/bg1.png') left top repeat;
    color: #333;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .el-aside {
    background-color: #ECECEC;
  }

  .el-main {
    background-color: #fff;
    color: #000;
    text-align: center;
  }

  .home_title {
    color: #fff;
    font-size: 22px;
    position: relative;
    right: 40px;
    display: inline;
  }

  .home_userinfo {
    color: #fff;
    cursor: pointer;
  }

  .home_userinfoContainer {
    display: inline;
    margin-right: 20px;
  }
  .logo{
    position: relative;
    right: 50px;
transform: scale(0.8);
  }
</style>
