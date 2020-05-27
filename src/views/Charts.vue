<template>
  <!-- 排行版页面 -->
  <div class="charts">
    <div class="charts-list" v-for="(item,index) in topName" :key="index" @click="goChartsList(item.id)">{{item.name}}</div>
  </div>
</template>
<script>
export default {
  name: "Charts",
  data(){
    return{
    }
  },
  components: {
  },
  methods:{
    //带idx跳转页面
    goChartsList(idx){
      this.$router.push({path:"/chartsList",query:{idx:idx}})
    }
  },
  computed:{
    topName(){
      return [{id:0,name:'云音乐新歌榜'},
              {id:1,name:'云音乐热歌榜'},
              {id:2,name:'网易原创歌曲榜'},
              {id:3,name:'云音乐飙升榜'},
              {id:4,name:'云音乐电音榜'},
              {id:14,name:'中国TOP排行榜(港台榜)'},
              {id:15,name:'中国TOP排行榜(内地榜)'},
              {id:16,name:'香港电台中文歌曲龙虎榜'},
              {id:17,name:'华语金曲榜'}
              ]
    }
  }
};
</script>
<style lang="scss" scoped>
  .charts{
    .charts-list{
      width: 100%;
      height: 80px;
      border: #333 solid 1px;
      border-radius: 3px;
      background-color: #f1f1f1;
      display: flex;
      align-items: center;
      font-weight: 600;
      font-size: 16px;
      margin-bottom: 5px;
    }
    .charts-list::before{
      width: 20px;
      content: '';
    }
  }
</style>
