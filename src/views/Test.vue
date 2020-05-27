<template>
    <div class="test">
      <p>text：{{text}}</p>
      <p>isnext：{{isnext}}</p>
      <p>list：{{list}}</p>
      <button @click="setnext()">{{isnext}}</button>

    <div @click="show=true">显示</div>
    <van-overlay :show="show" @click="show = false">
  <div class="wrapper" @click.stop>
    <div class="block" />
    1111111111111111
  </div>
</van-overlay>
    <div class="song-list">
    <div class="index">
      index
    </div>
    <div class="detail">
      <p class="detail-name">
        name
      </p>
      <p class="detail-artist">
        artist
      </p>
    </div>
    <div class="more">
      img
    </div>
  </div>
    </div>
</template>

<script>
import Vue from 'vue';
import { Overlay } from 'vant';

Vue.use(Overlay);
export default {
  name:'Play',
  data(){
    return{
      list:['我是1','我是2','我是3','我是4'],
      text:'',
      isnext:false,
      num:0,
      show: false
    }
  },
  methods:{
   setText(){
     console.log(this.list.slice(this.num,this.num+1))
     this.text=this.list.slice(this.num,this.num+1);
   },
   setnext(){
     this.isnext=!this.isnext;
     this.setText();
   }
  },
  created(){
    this.setText();
  },
  watch:{
    isnext(){
      console.log('改变');
      if(this.isnext){
        this.num=this.num+1
        if(this.num>=this.list.length){
          this.num=0;
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  
    .test{
      width: 100%;
      height: 60px;
      border: 1px solid #333;
      box-sizing: border-box;
      .wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
  }

  .block {
    width: 120px;
    height: 120px;
    background-color: #fff;
  }
    }
    .song-list{
    width: 100%;
    height: 60px;
    margin-top: 10px;
    display: flex;
    justify-content: space-between;
    .index{
      width: 60px;
      height: 60px;
      text-align: center;
      line-height: 60px;
    }
    .detail{
      flex-grow: 7;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      .name{
        font-size: 14px;
      }
      .detail-artist{
        font-size: 10px;
        color: #999;
      }
    }
    .more{
      width: 60px;
      height: 60px;
      display: flex;
      justify-content: space-around;
      align-items: center;
    }
  }
</style>