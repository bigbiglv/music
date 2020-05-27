<template>
  <div class="chartslist">
    <div class="nav">
      <div class="nav-left" @click="goBack()">
        &lt; 
        返回
      </div>
      <transition name="title-change">
        <div class="nav-title">{{title}}</div>
      </transition>
      <div class="nav-right"></div>
    </div>
    <van-list
      v-model="loading"
      :finished="finished"
      inished-text="没有更多了"
      @load="onLoad"
    >
    <div class="list" v-for="(item,index) in list" :key="index" @click="play(item.id)">
      <span>{{index+1}}</span> 
      <span>{{item.name}}</span> 
      <span>--{{item.ar[0].name}}</span>
    </div>
  </van-list>
  </div>
</template>

<script>
import Vue from 'vue';
import { List } from 'vant';
Vue.use(List);
export default {
  name:'ChartsList',
  data(){
    return{
      title:'',
      list: [],  //分段显示list
      list2:[],  //接收所有数据list
      loading: false,
      finished: false,
      t:60,
      idx:this.$route.query.idx, //接收上一个页面的idx
      mid:''

    }
  },
  methods:{
    getList(){
        var url="http://localhost:3000/top/list?idx="+this.idx;
        this.axios(url).then(result=>{
          this.list2=result.data.playlist.tracks;
          this.list=this.list2.slice(0,60);
          this.title=result.data.playlist.name;
          console.log(result)
        })
    },
    onLoad() {
      // 延时1s加载展示
      setTimeout(() => {
        this.list.push(...this.list2.slice(this.t,this.t+30));
        this.t+=30;
        // 加载状态结束
        this.loading = false;

        // 数据全部加载完成
        if (this.list.length >= 100) {
          this.finished = true;
        }
      }, 1000);
    },
    goBack(){
      this.$router.go(-1);
    },
    //点击将音乐id发送到bus,传给play组件播放
    play(id){
      this.$eventBus.emit("musicId",id);
    }

  },
  created(){
    this.getList()
  }
}
</script>

<style lang="scss" scoped>
  .chartslist{
    .nav{
      width: 100%;
      height: 65px;
      z-index: 10;
      line-height: 65px;
      background-color: #ececec;
      text-align: center;
      position: fixed;
      top: 0;
      
      .nav-left,.nav-right{
        position: absolute;
        bottom: 0;
      }
      .nav-left{
        left: 20px;
      }
      .nav-right{
        right: 20px;
      }
      .title-change-enter-active, .title-change-leave-active {
        transition: all 0.5s;
		    transition-timing-function: linear;
	    }
      .title-change-enter,  .title-change-leave-to{
		    opacity: .5;
        transform: translateY(-40px);
      }
      .title{
        width: 60%;
        margin: auto;
      }
      .nav &::after{
        height: 65px;
        width: 100%; 
        content: ''; 
      }
      
    }
    .van-list::before{
      width: 100%;
      height: 65px;
      content: '';
      display: block;
    }
    .list{
      width: 100%;
      height: 60px;
      line-height: 60px;
      border-bottom: solid 1px #999;
      &:nth-child(-n+3) span:first-child{
        color: red;
      }
      span:first-child{
        display: inline-block;
        width: 50px;
        text-align: center;
        font-weight: 600;
      }
    }
  }
</style>