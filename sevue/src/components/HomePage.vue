<template>
    <div>
        <!-- 首页 -->
        <!-- <p>首页</p> -->
    
  <div>
    <Carousel style="height: 50%;" :items="items" :interval="interval" />
  </div>

  <div class="block" >
<SelectionBlock v-for="(category,index ) in categories" :category=category :key="index"></SelectionBlock> 
<!-- <SelectionBlock></SelectionBlock> -->
<!-- <SelectionBlock></SelectionBlock> -->


  </div>





    </div>
</template>

<script>
import Carousel  from '@/components/CarouselComponent.vue';
import SelectionBlock from '@/components/SelectionBlock.vue';
import {getRequest} from '../utils/api'
export default {
    components:{
        Carousel,
        SelectionBlock
        
    },
    mounted(){
        getRequest("/admin/category/all").then(resp=> {
        this.categories=resp.data
        
        // for(item of nav)
        // alert(item.name)
    }).catch(()=>{
        this.$message.error("获取菜单数据失败")
    })
    },
    data() {
    return {
        categories:[],
      items: [
        {
          image: 'https://www.ss.pku.edu.cn/images/images/01_overview/overview-bj.jpg',
          title: '欢迎来到软微校友网',
          description: ''
        },
        {
          image: 'https://www.ss.pku.edu.cn/images/images/98_ads/2023052501.jpg',
          title: '北京大学软件与微电子学院校友会第二届会员代表大会举行',
          description: '',
          path:"/index/blogDetail?aid=124"
        },
        // {
        //   image: '',
        //   title: ',
        //   description: '描述三'
        // }
      ],
      interval: 3000
    }
  }

}
</script>
<style>
.block{
    display: flex;
    /* border: solid 1px; */
    justify-content: center;
    flex-wrap: wrap;
}
</style>