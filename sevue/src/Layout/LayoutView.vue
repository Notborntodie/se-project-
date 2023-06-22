<template>
    <div>
  <div class="nav">
    <div class="header-inner">
      <div class="container">
        <div>
          <div class="pull-left logo">
            <a href="#">
              <img class="logo-img" src="https://ss.pku.edu.cn/templates/sspku_index/images/logo-v4.png">
            </a>
          </div>
         
          <div class="pull-right">
            <div class="form-search search-form pull-right">
              <div class="login-box">
                <!-- 在此处添加搜索框的内容 -->
              <!--
                <el-input
        placeholder="通过标题搜索该分类下的文章..."
        prefix-icon="el-icon-search"
        v-model="keywords" style="width: 200px" size="mini">
      </el-input>
      <el-button  icon="el-icon-search" size="mini" style="margin-left: 3px" @click="searchClick">搜索  </el-button>
    -->   
      <!--<el-button class="login" @click="$router.push('/login')">登录</el-button>-->
       
                <div class="home_userinfoContainer">
        <el-dropdown @command="handleCommand">
          <span class="el-dropdown-link home_userinfo">
            <span style="font-weight: bold; color: #FFFFFF;">
        {{ currentUserName }}
    </span>
           
            <i class="el-icon-arrow-down el-icon--right home_userinfo highlight"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="sysMsg">系统消息</el-dropdown-item>
            <el-dropdown-item command="MyArticle">我的文章</el-dropdown-item>
            <el-dropdown-item command="MyHome">个人主页</el-dropdown-item>
            <el-dropdown-item command="logout" divided>退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
                <div>
   
    
    </div>
             
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="header-nav">
      <div class="container">
        <div class="row-fluid">
          <ul id="jsddm" class="unstyled" > 
            <li><a class="top-link" href="/#/home/" id="tl-overview"  ><router-link to="/home">个人主页</router-link></a></li>
            <!--<li><a class="top-link" id="tl-overview" @click="goToHomePage">个人主页</a></li>-->

<!-- 数据库获取菜单 -->
<div  class="nav-text">
  <li v-for="(item) in this.nav.slice(0,5)"><a class="top-link" href="/overview/" id="tl-overview">{{item.cateName}}</a></li>
</div>
        
          <!-- <li><a class="top-link" href="/teacherteam/" id="tl-teacher">师资团队</a></li><li><a class="top-link" href="/research/" id="tl-research">研究合作</a></li><li><a class="top-link" href="/education/" id="tl-education">教育教学</a></li><li><a class="top-link" href="/admission/" id="tl-admission">招生信息</a></li><li><a class="top-link" href="/student/" id="tl-student">学生天地</a></li> -->
        </ul>
        </div>
      </div>
    </div>
    
  </div>


<div class="content">
<router-view>

</router-view>
</div>




    <div>
        <div id="footer" class="footer">
    <div class="container">
      <div class="row-fluid" style="margin-bottom:15px;">
      
        <div class="slogan-div pull-left">
          <blockquote class="slogan" style="float:left;">
            <h3>开拓&nbsp;&nbsp;求实&nbsp;&nbsp;创业&nbsp;&nbsp;严谨&nbsp;&nbsp;进取&nbsp;&nbsp;育人</h3>
          </blockquote>
          <!-- <div style="float:left; margin-left:30px;">
            <a href="https://ss.pku.edu.cn/images/images/99_others/qrcode2.jpg" title="点击查看大图"><img src="/images/images/99_others/qrcode1.jpg" style="width:80px;"></a>
          </div>
          <div style="float:left; margin-left:30px;">
            <a href="https://ss.pku.edu.cn/images/images/99_others/qrcode2.jpg" title="点击查看大图"><img src="/images/images/99_others/qrcode2.jpg" style="width:80px;"></a>
          </div> -->
        </div>
        <div class="footer-links pull-right" style="width: 350px;">
          <div>
            <ul class="pull-right">
              <li><i class="icon-user icon-white icon-pos-adjust-for-yahei"></i>&nbsp;&nbsp;关于我们</li>
              <li><a href="/overview/map.html">校园地图</a></li>
              <li><a href="/overview/contact.html">联系方式</a></li>
              <li style="clear:both;"></li>
            </ul>
            <br style="clear:both;">
          </div>
        </div>
      </div>
      <hr class="soften">
      <div class="row">
        <div class="span12 copyright">
          <p>Copyright © 北京大学软件与微电子学院 2013&nbsp;&nbsp;·&nbsp;&nbsp;北京市大兴工业开发区金苑路24号&nbsp;&nbsp;102600</p>
        </div>
      </div>
    </div>
  </div>
    </div>
</div>
</template>
<script>
import {getRequest} from '../utils/api'
  export default {
    components:{

},
data(){

    return {
      currentUserName: '',
    nav:[],
    keywords:""
}
},
mounted(){
    getRequest("/admin/category/all").then(resp=> {
        this.nav=resp.data
        // for(item of nav)
        // alert(item.name)
    }).catch(()=>this.$message.error("获取菜单数据失败"))

    var _this = this;
    getRequest("/currentUserName").then(function (msg) {
      _this.currentUserName = msg.data;
    }, function (msg) {
      _this.currentUserName = '游客';
    });
},
methods:{
  methods: {
  goToHomePage() {
    this.$router.push({path:'/#/home'});
  }


}
,

  handleCommand(command) {
      var _this = this;

      if (command == 'sysMsg') {
        this.$router.push('/sysMsg');
      }
      if (command == 'MyArticle') {
        this.$router.push('/articleList');
      }
      if (command == 'MyHome') {
        this.$router.push('/home');
      }
      if (command == 'logout') {
        this.$confirm('注销登录吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(function () {
          getRequest("/logout");
          _this.currentUserName = '游客';
          _this.$router.replace({ path: '/login' });
        }, function () {
          // 取消
        });
      }
    }
    ,
    searchClick(){
      // alert(this.keywords)
      // if(this.keywords.length<1) this.$message("请输入关键词")
      // else {
        // alert("1")
      this.$router.push(`/index/articleList/${this.keywords}`);}

    // }
}

  // 组件的其他选项
}

</script>

<style>


.highlight {
        font-weight: bold; /* 设置粗体 */
        color: red; /* 设置红色 */
}
.nav{
    position: relative;
    bottom: 50px;
}
.nav-text{
  display: flex;
  flex-wrap: nowrap;
}
.header-inner{
    position: relative;
    /* top: -100; */
   
    /* margin-top: 0; */
    /* padding-top: 100px; */
  -webkit-text-size-adjust: 100%;
    font: 10px 'Source Sans Pro',Arial,Helvetica,sans-serif;
    color: #585754;
    font-family: "Microsoft YaHei","Helvetica Neue", Helvetica, Arial, sans-serif,TrueType;
    font-size: 14px;
    border-top: 2px solid #92bae1;
    height: 90px;
    background: url('https://ss.pku.edu.cn/templates/sspku_index/images/bg1.png') left top repeat;
}
.content{
  margin-bottom: 100px;
    /* height: 1000px; */
}
.login-box{
  flex: right;
  position: absolute;
  top:40px;
  right: 30px;
}

.footer{
  /* margin-top: 200px; */
  /* padding-bottom: 150px; */
}

.home_title {
    color: #fff;
    font-size: 22px;
    position: relative;
    right: 40px;
    display: inline;
  }
</style>