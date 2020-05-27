<template>
<!-- 首页歌单推荐组件 -->
<div>
  <div class="listshow">
    <div class="nav">
      <p class="title">歌单推荐</p>
      <p>更多</p>
    </div>
    <div class="container">
      <div class="item" v-for="(item,index) in container" :key="index" @click="goPlayList(item.id)">
        <img :src=item.picUrl>
        <p>{{item.name}}</p></div>
    </div>
  </div>
</div>
</template>
<script>
export default {
  data(){
    return{
      container:[]
    }
  },
  methods:{
    // 获取歌单推荐数据
    getContainer(){
      //限制显示数量为4 limit=4
      var url='http://localhost:3000/personalized?limit=6';
      this.axios(url).then(result=>{
        console.log(result.data.result);
        this.container=result.data.result;
      })
    },
    goPlayList(id){
      this.$router.push({path:'/playlist',query:{'id':id}});
      console.log(id)
    }
  },
  created(){
    this.getContainer();
  },
  computed:{
  }
}
</script>
<style lang="scss" scoped>
  .listshow{
    // padding: 10px 0 10px 0;
    width: 100%;
    background-color: #f1f1f1;
    display: flex;
    flex-direction: column;
    border-radius: 3px;
    padding-bottom: 5px;
    box-shadow: #999 1px 1px 5px 0px;
    .nav{
      background-color: rgb(219, 219, 219);
      padding: 8px;
      display: flex;
      justify-content: space-between;
      p{
        font-size: 16px;
      }
    }
    .container{
      margin-top: 5px;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-around;

      .item:nth-child(-n+3){
        margin-bottom: 10px;
      }
      .item{
        width: 30%;
        padding-bottom: 5px;
        background-color: rgb(255,255,255);
        border: solid 1px #d1d1d1;
        box-sizing: border-box;
        border-radius: 2px;
        p{
          font-size: 14px;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
          overflow: hidden;
        }
        img{
          width: 100%;
        }
      }
    }
  }
</style>