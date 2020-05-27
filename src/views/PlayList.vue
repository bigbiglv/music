<template>
  <div class="playlist" :style="{backgroundImage:'url('+bgcUrl+')'}">
    <!-- 顶栏 -->
    <div class="playlist-nav">
      <div class="back" @click="goBack()">
        <img src="../../public/images/return.png" alt="" >
      </div>
      <div class="more">
        <img src="../../public/images/more.png" alt="" >
      </div>
    </div>
    <!-- 详情介绍 -->
    <div class="playlist-details" @click="show=true">
      <div class="details">
        <div class="details-content">
          <div class="left">
            <img :src="bgcUrl" alt="">
          </div>
          <div class="right">
            <p>{{title}}</p>
            <div class="user">
              <img :src="userImg" alt="">
              <span>{{user}}</span>
            </div>
            <p class="description">{{description}}</p>
          </div>
        </div>
      </div>
    </div>
    <!-- 遮罩层 -->
    <van-overlay :show="show" @click="show = false">
      <div class="wrapper" >
        <img :src="bgcUrl" alt="">
        <p>{{title}}</p>
        <van-divider :style="{ margin:'20px auto' ,width: '60%' }">·</van-divider>
        <div class="tag">
          <span>Tags：</span>
          <span class="tags" v-for="(item,index) in tag" :key="index">
            {{item}}
          </span>
          <div class="description">{{description}}</div>
        </div>
      </div>
    </van-overlay>
    <!-- 歌曲列表 -->
    <div class="songlist" >
      <song-list 
        v-for="(item,index) in songlist" 
        :key="index"
        :index='index'
        :name='item.name'
        :artist='item.ar[0].name'
        :album='item.al.name'
        @click.native="sendId(index)"
      ></song-list>
    </div>
  </div>
</template>

<script>
import SongList from "@/components/SongList.vue";
//引入遮罩层组件
import Vue from 'vue';
import { Overlay } from 'vant';
import { Divider } from 'vant';
Vue.use(Overlay);
Vue.use(Divider);
export default {
  name:'PlayList',
  data(){
    return{
      id: this.$route.query.id,
      bgcUrl: String,         //背景图片链接
      title: String,          //歌单标题
      description: String,    //歌单描述
      user: String,           //创建歌单用户
      userImg: String,        //用户头像
      songlist: [],           //歌曲列表
      trackId: [],            //获取歌曲列表的id
      show: false,            //是否显示遮罩层页面
      tag: [],
      sendList: []            //发送的数组
    }
  },
  methods:{
    //获取歌单详情
    getList(){
      var url=`http://localhost:3000/playlist/detail?id=${this.id}`;
      this.axios(url).then(result=>{
          this.bgcUrl=result.data.playlist.coverImgUrl;
          this.title=result.data.playlist.name;
          this.description=result.data.playlist.description;
          this.tag=result.data.playlist.tags;
          // 请求获取成功之后再次发送请求
          if(result.statusText=='OK'){
            //获取创建歌单用户
            let userUrl=`http://localhost:3000/user/detail?uid=${result.data.playlist.userId}`;
            this.axios(userUrl).then(result=>{
              this.user=result.data.profile.nickname;
              this.userImg=result.data.profile.avatarUrl;
            });
            for (let i = 0; i < result.data.playlist.trackIds.length; i++) {
              // 将遍历得到的id拼接成数组
              this.trackId.push(result.data.playlist.trackIds[i].id);
              // 获取到的列表不完整，使用trackIds的id值获取歌曲
              // 遍历trackIds数组得到歌曲id
              // 获取歌曲详情
            }
            let trackUrl=`http://localhost:3000/song/detail?ids=${this.trackId}`
            this.axios(trackUrl).then(result=>{
              this.songlist=result.data.songs;
              console.log(result)
            });
          }
            console.log(result)
      })
    },
    //发送id到 play组件
    sendId(index){
      // console.log(index);
      // 前面截取的部分
      // console.log(this.trackId.slice(0,index));
      //本身
      // console.log(this.trackId[index]);
      //  后面部分
      // console.log(this.trackId.slice(index,-1));
      //重新拼接
      this.sendList=[];
      this.sendList=this.sendList.concat(this.trackId[index],this.trackId.slice(index,-1),this.trackId.slice(0,index));
      //传值到 play
      this.$eventBus.emit("sendId",this.sendList);

      
    },
    goBack(){
      this.$router.go(-1)
    }
  },
  created(){
    this.getList();
  },
  components: {
    SongList
  }

}
</script>
<style lang="scss" scoped>
  .playlist{
    width: 100%;
    height: 900px;
    background-position: 0 0;
    background-size: 100% 200px;
    background-repeat: no-repeat;
    position: relative;
    //顶部导航栏
    .playlist-nav{
      width: 100%;
      height: 60px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      position: fixed;
      top: 0;
      left: 0;
      z-index: 1;
      .back,.more{
        border-radius: 2px;
        &:active{
          background-color: rgba(255,255,255,0.2);
          filter: grayscale(100%);
        }
        img{
          width: 40px;
          height: 40px;
        }
      }
    }
    .playlist-details{
      background-color: rgba(255,255,255,0.2);
      backdrop-filter: blur(100px);
      width: 100%;
      padding-bottom: 50px;
      &::before{
        content: '';
        display: table;
      }
      .details{
        width: 100%;
        .details-content{
          margin-top: 68px;
          display: flex;
          justify-content: space-around;
          color: #333;
          .left,.right{
            width: 50%;
            text-align: center;
            img{
              width: 125px;
              height: 125px;
            }
          }
          .right{
            padding-right: 20px;
          }
          .right{
            text-align: left;
            color: #fff;
            .description{
              width: 80%;
              font-size: 12px;
              display: -webkit-box;
              -webkit-box-orient: vertical;
              -webkit-line-clamp: 2;
              overflow: hidden;
              white-space: pre;
            }
            .user{
              display: flex;
              align-items: center;
              font-size: 14px;
              margin: 10px 0 10px 0;
              img{
                width: 30px;
                height: 30px;
                border-radius: 50%;
                margin-right: 10px;
              }
            }
          }
        }
      }
    }
    // 遮罩层
    .wrapper {
      height: 100%;
      margin-top: 80px;
      text-align: center;
      color: #fff;
      z-index: 20;
      img{
        width: 150px;
        height: 150px;
        margin-bottom: 30px;
      }
      .tag{
        width: 80%;
        text-align: left;
        margin: 0 auto;
        .tags{
          border-radius: 10px;
          background-color: #999;
          font-size: 14px;
          margin-right: 10px;
          padding: 2px 5px ;
        }
        .description{
          margin-top: 20px;
          font-size: 14px;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 20;
          overflow: hidden;
        }
      }
    }
  }
</style>