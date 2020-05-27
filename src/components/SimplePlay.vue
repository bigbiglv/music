<template>
<transition name="play-change">
  <div class="play" v-if="!isShow">
    <audio controls id="audio">
      <source :src="url" type="audio/ogg">
      您的浏览器不支持 audio 元素。
    </audio>
    <div class="btn" @click="status">
     {{text}}
    </div>
    <div class="btn" @click="nextSong">
      下一曲
    </div>
    <div class="btn" @click="playList=[]">
      消失
    </div>
    <p>{{id}}</p> 
  </div>
</transition>
</template>

<script>
export default {
  name:'SimplePlay',
  data(){
    return{
      text: '播放',
      audio: '',      //获取audio的dom元素
      id: Number,     //取得的单个音乐的id
      num: 0,         //用来确定截取的位置
      isShow: true,   //是否显示组件
      playList:[]     //保存全部音乐id的数组
      
    }
  },
  mounted(){
  },
  methods:{
    //获取音乐url
    // getUrl(){
    //   var url=`http://localhost:3000/song/url?id=${this.id}`;
    //   this.axios(url).then(result=>{
    //     // this.url=result.data.data[0].url;
    //     console.log(result)
    //     console.log(this.url)
    //   });

    // },
    //获得从其他组件传来的音乐id数组
    getplayList(){
      this.$eventBus.on('sendId',(data)=>{
        console.log(data);
        this.playList=data;
      });
    },
    //控制暂停播放
    status(){
      if(this.audio.paused){
        this.audio.play();
        this.text='暂停';
      }else{
        this.audio.pause();
        this.text='播放';
      }
    },
    //通过截取数组替换id切换下一曲
    nextSong(){
      this.num=this.num+1;
      if(this.num>=this.playList.length){
        this.num=0;
      }
      this.id=this.playList.slice(this.num,this.num+1);
      this.audio.load();
    }
  },
  created(){
    // this.getUrl();
    this.getplayList();
    this.$nextTick(()=>{
      //获取audio的dom
      this.audio=document.getElementById('audio');
    });

  },
  watch:{
    id(){
      //id改变就重新载入音频
      document.getElementById('audio').load();
    },
    playList(){
      console.log(this.audio);
      //传入playlist后
      //通过slice每次截取一个id出来
      this.id=this.playList.slice(this.num,this.num+1);
      //通过playList判断组件是否显示
      this.playList.length==0 ? this.isShow=true : this.isShow=false;
    }
  },
  computed:{
    url(){
      return `https://music.163.com/song/media/outer/url?id=${this.id}.mp3 `
    }
  }
}
</script>

<style lang="scss" scoped>
.play{
  width: 100%;
  height: 100px;
  border: 1px solid #333;
  background-color: #fff;
  box-sizing: border-box;
  position: fixed;
  bottom: 60px;
  .btn{
    display: inline;
    border: 1px solid #333;
    background-color: #fff;
  }
  
  .play-change-enter-active, .play-change-leave-active {
    transition: all 0.2s;
		transition-timing-function: linear;
	}
  .play-change-enter,  .play-change-leave-to{
		opacity: 1;
    transform: translateY(-40px);
  }
}
.play-show{
  display: none;
}
</style>