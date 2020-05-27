<template>
  <div class="search">
    <ul class="search-hots" v-if="isshow">
      <li class="search-hots-list touch" v-for="(item,index) in hotSearch" :key="index" @click="searchHot(index)">
        <p class="list-index">{{index+1}}</p>
        <p>{{item.first}}</p>
      </li>
    </ul>
    <ul class="search-content" v-if="!isshow">
      show search result
    </ul>
  </div>
</template>

<script>
import Vue from 'vue';
import { List } from 'vant';

Vue.use(List);
export default {
  name:"Search",
  data(){
    return{
      value:"",  //搜索内容
      hotSearch:[], //接收热搜数据
      searchMsg:[]  //接收搜索结果
    }
  },
  components:{
  },
  methods:{
    //获取NAvBar的serach的值data 并搜索
    onSearch(){
      this.$eventBus.on(
        "Msg", 
        function(data){ 
          this.value=data;
            var url="http://localhost:3000/search?keywords="+this.value;
            this.axios(url).then(result=>{
            this.searchMsg=result;
            console.log(this.searchMsg);
            this.isshow=false;
            console.log(this.isshow)
          })
        }
      );
    },
    //获取热搜数据
    getHot(){
      var url="http://localhost:3000/search/hot";
      this.axios(url).then(result=>{
        this.hotSearch=result.data.result.hots;
      });
    },
    //点击热搜搜索
    searchHot(index){
      this.value=this.hotSearch[index].first;
      var url="http://localhost:3000/search?keywords="+this.value;
      this.axios(url).then(result=>{
        this.searchMsg=result.data.result.song;
        console.log(this.searchMsg)
      })
    }
  },
  created(){
    this.onSearch()
    this.getHot()
  },
  watch:{
    
  },
  computed:{
    isshow(){
      if(this.searchMsg==0){
        return true
      }else{
        return false
      }
      
    }
  }
}
</script>

<style lang="scss" scoped>
  .search{
    padding-top: 60px;
    .search-hots{
      display: flex;
      flex-wrap: wrap;
      &::before{
        content: "热搜";
        font-weight: 600;
        margin-left: 10px;
      }
      .search-hots-list{
        display: flex;
        align-items: center;
        width: 100%;
        height: 50px;
        border-width: 0px 0px 1px 0px;
        border-color: rgba(0, 0, 0, 0.1);
        border-style: solid;
        &::before{
          content: "";
          width: 0;
        }
        .list-index{
          padding: 10px;
          width: 20px;
          text-align: center;
        }
      }
    }
  }
</style>>

