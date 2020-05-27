<template>
  <div class="song-list">
    <div class="index">
      {{index+1}}
    </div>
    <div class="detail">
      <p class="detail-name">
        {{name}}
      </p>
      <p class="detail-artist">
        {{artist}}
        -
        {{album}}
      </p>
    </div>
    <div class="more">
      <img src="../../public/images/more.png" alt="">
    </div>
  </div>
</template>

<script>
export default {
  props:{
    index:Number,
    name:String,
    artist:String,
    album:String
  },
  data(){
    return{

    }
  }
}
</script>

<style lang="scss" scoped>
  .song-list{
    width: 100%;
    height: 60px;
    margin-top: 5px;
    display: flex;
    justify-content: space-around;
    .index{
      width: 60px;
      height: 60px;
      text-align: center;
      line-height: 60px;
    }
    .detail{
      width: 70%;
      display: flex;
      justify-content: space-around;
      flex-direction: column;
      padding: 7px 0 7px 0;
      .name{
        font-size: 14px;
      }
      .detail-artist{
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 1;
        white-space: pre;
        overflow: hidden;
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
      img{
        width: 40px;
        height: 40px;
      }
    }
  }
</style>