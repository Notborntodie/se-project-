<template>
<div class="section-block">
                    <div class="section-block-inner">
                      <a class="sec-title pull-left" href="/newscenter/">{{ category.cateName }}</a>
                      <br style="clear:both;">
                    </div>
                    <div class="title-hr">
                      <div class="title-hr-main"></div>
                    </div>

                    <!-- <div class="info-list"> -->
                      <!-- <ul v-for="(news) in category.list.slice(0,5)" id="info-list-ul" class="unstyled latestnews ss_news"> -->


                        <!-- <li @click="this.$router.push(`blogDetail?aid=${news.aid}`)"> -->
    <!-- <p class="time pull-left">{{ news.time }}</p> -->
    <!-- <p class="info-title">{{ news.title }}</p> -->

<!-- </li> -->
                      <!-- </ul> -->
                  <!-- </div> -->

                  <div>
    <ul>
    
        <li v-for="article in filteredArticles" :key="article.id">    
          <!--<template slot-scope="scope"><span style="color: #409eff;cursor: pointer" @click="itemClick(article)">{{ article.title}}</span>-->
           <!-- <div @click="itemClick(article)">{{ article.title }}</div>-->
           <div
          @mouseenter="mouseEnterHandler"
          @mouseleave="mouseLeaveHandler"
          @click="itemClick(article)"
          :class="{ 'highlight': article.highlighted }"
        >
          {{ article.title }}
        </div>

         
      </li>
    </ul>
  </div>
                  <div  class="info-list">
                      <ul  id="info-list-ul" class="unstyled latestnews ss_news"> </ul>
                  </div>
                  </div>
</template>
<script>

import { getRequest } from '../utils/api';
export default{
    props:["category"],
    
    mounted: function () {
    
    this.loadBlogs();

    
    },



    data(){
        return{
            articles :[],
            totalCount :-1,
            list:[{
        time: new Date(),
        title:"默认新闻"
    },

{
        time: new Date(),
        title:"默认新闻"
    },
    {
        time: new Date(),
        title:"默认新闻"
    },
    {
        time: new Date(),
        title:"默认新闻"
    },
    {
        time: new Date(),
        title:"默认新闻"
    },
    {
        time: new Date(),
        title:"默认新闻"
    }

]
}} 

,
methods: {

  mouseEnterHandler(event) {
      const title = event.target.innerText;
      const article = this.filteredArticles.find(article => article.title === title);
      if (article) {
        article.highlighted = true;
      }
    },
    mouseLeaveHandler(event) {
      const title = event.target.innerText;
      const article = this.filteredArticles.find(article => article.title === title);
      if (article) {
        article.highlighted = false;
      }
    },
  
  
  itemClick(row){
        // alert( this.login+'/blogDetail')
        if(this.unlogin){
        this.$router.push({path: '/index/blogDetail', query: {aid: row.id}})}
        else  this.$router.push({path: '/blogDetail', query: {aid: row.id}})
      },
      loadBlogs(){
        var page=1;
        var count=20;
        if (this.keywords==undefined) {this.keywords=""};
        var url = '';
        // alert("key"this.keywords)
        //if (this.state == -2) {
        url = "/admin/article/all" + "?page=" + page + "&count=" + count + "&keywords=" + this.keywords;
        //} else {
          //url = "/article/all?state=" + this.state + "&page=" + page + "&count=" + count + "&keywords=" + this.keywords;
        //}
      
        getRequest(url).then(resp=> {
        
          if (resp.status == 200) {
            this.articles = resp.data.articles;
            this.totalCount = resp.data.totalCount;
          } else {
            this.$message({type: 'error', message: '数据加载失败!'});
          }
        }, resp=> {
      
          if (resp.response.status == 403) {
            this.$message({type: 'error', message: resp.response.data});
          } else {
            this.$message({type: 'error', message: '数据加载失败!'});
          }
        }).catch(resp=> {
          this.$message({type: 'error', message: '数据加载失败!'});
        })
      },
    }

    , 
    computed: {
    filteredArticles() {
      const filtered = this.articles.filter(article => {
        return article.cateName === this.category.cateName;
      });
      return filtered;
    }
  }


}


</script>

<style>
.section-block{
    margin:auto;
    width: 40%;

}


</style>