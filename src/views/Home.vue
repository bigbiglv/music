<template>
  <div class="home">
    
    <!-- <img alt="Vue logo" src="../assets/logo.png" /> -->
    <!-- <HelloWorld msg="Welcome to Your Vue.js App" /> -->
    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
      <van-swipe-item v-for="(item,index) in banners" :key="index" v-lazy="item">
        <van-image :src="item.imageUrl">
          <!-- 加载中提示 -->
          <template v-slot:loading>
            <!-- <van-loading type="spinner" size="20" /> -->
          </template>
          <!-- 加载失败提示 -->
          <template v-slot:error>加载失败</template>
        </van-image>
      </van-swipe-item>
    </van-swipe>
    <ReList></ReList>
  </div>
</template>
<script>
// @ is an alias to /src
import RecommendList from "@/components/RecommendList.vue";
import Vue from 'vue';
import { PullRefresh } from 'vant';

Vue.use(PullRefresh);
export default {
  name: "Home",
  data(){
    return{
      banners:[],
      arr:[{id:0,text:"我是1"},{id:2,text:"我是2"}]
    }
  },
  components: {
    ReList:RecommendList
  },
  methods:{
    //获取轮播图数据
    getBanner(){
      var url="http://localhost:3000/banner";
			this.axios(url).then(result=>{
        this.banners=result.data.banners.slice(0,5);  //页面简洁只显示前5个图片
			});
    }
  },
  created(){
    this.getBanner()
  }
};
</script>
<style lang="scss" scoped>
  .home{
    .my-swipe{
      // width: 100%;
      // height: 140px;
      border-radius: 5px;
      margin-bottom: 5px;
    }
  }
</style>
