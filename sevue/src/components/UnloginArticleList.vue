<template>
  <div>
    <el-container class="article_list">
      <el-main class="main">
        <el-tabs v-model="activeName" @tab-click="handleClick" type="card">
          <!-- <el-tab-pane label="全部文章" name="all"> -->
            <blog_table :unlogin="true" ref="blogTableRef" state="1"  :showEdit="false" :showDelete="false" :showRestore="false" :activeName="activeName"></blog_table>
          <!-- </el-tab-pane> -->
        </el-tabs>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import BlogTable from '@/components/BlogTable'
import BlogCfg from '@/components/BlogCfg'
import { getRequest } from '../utils/api'

export default {
  beforeRouteUpdate(to, from, next) {
    if (to.params.keywords !== from.params.keywords) {
      this.keywords = to.params.keywords
      this.fetchData()
    }
    next()
  },
  created() {
  this.is = this.$route.params.keywords;
  // alert("key="+this.keywords);
},
  mounted() {
    // alert(this.keywords)
    var _this = this;
    getRequest("/isAdmin").then(resp => {
      if (resp.status == 200) {
        _this.isAdmin = resp.data;
      }
    })
  },
  data() {
    return {
      activeName: 'all', // Set the default active tab
      isAdmin: false,
      keywords:""
    };
  },
  methods: {
    handleClick(tab, event) {
      // console.log(tab, event);
    }
  },
  components: {
    'blog_table': BlogTable,
    'blog_cfg': BlogCfg
  },
   watch: {
    keywords(newKeywords) {
      // alert("change")

      this.$refs.blogTableRef.keywords=this.keywords
      this.$refs.blogTableRef.searchClick()}
    }
  }
;
</script>

<style>
.article_list > .header {
  background-color: #ececec;
  margin-top: 10px;
  padding-left: 5px;
  display: flex;
  justify-content: flex-start;
}

.article_list > .main {
  /*justify-content: flex-start;*/
  display: flex;
  flex-direction: column;
  padding-left: 0px;
  background-color: #fff;
  padding-top: 0px;
  margin-top: 8px;
}
</style>
