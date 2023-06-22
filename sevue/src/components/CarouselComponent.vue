<template>
   <el-carousel>
  <el-carousel-item v-for="(item, index) in items" :key="index">
    <div>
      <template v-if="item.path">
        <router-link :to="item.path">
          <img :src="item.image" alt="">
        </router-link>
      </template>
      <template v-else>
        <img :src="item.image" alt="">
      </template>
      <div class="carousel-item-text">
        <h3>{{ item.title }}</h3>
        <p></p>
      </div>
    </div>
  </el-carousel-item>
</el-carousel>
    <!--</el-carousel>-->
  </template>
  
  <script>
  export default {
    name: 'Carousel',
    props: {
      items: {
        type: Array,
        required: true
      },
      interval: {
        type: Number,
        default: 5000
      }
    },
    navigateTo(path) {
        alert("nav")
    if (path) {
      this.$router.push(path);
    }}
  }
  </script>


  
  
  <style scoped>
 
  .carousel-item-text {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.5);
    color: #fff;
    padding: 16px;
    box-sizing: border-box;
  }
  
  .carousel-item-text h3 {
    margin-top: 0;
    margin-bottom: 8px;
 
  }
  
  .carousel-item-text p {
    margin-top: 0;
    margin-bottom: 0;
  }
  </style>
  