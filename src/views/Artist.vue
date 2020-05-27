<template>
  <!-- <router-view></router-view> -->
  <!-- <van-list
    v-model="loading"
    :finished="finished"
    finished-text="没有更多了"
     @load="onLoad"
  > -->
  <div class="test">
	  <!-- 按钮 -->
    <div>
      <input type="radio" name="lll" value="0" checked class="button" id="all" @click="setType(A)"/>
        <label for="all">全部</label> 
		  <input type="radio" name="lll" value="1"  class="button" id="man" @click="setType('B')"/>
        <label for="man">男歌手</label>
		  <input type="radio" name="lll" value="2"  class="button" id="woman" @click="setType('C')"/>
        <label for="woman">女歌手</label>
		  <input type="radio" name="lll" value="3"  class="button" id="team" @click="setType('D')"/>
        <label for="team">乐队</label>
    </div>
    {{initial}}

		

		<div v-for="(item,index) in artistList" :key="index">
			<p>
				{{index+1}}	
				{{item.name}}
			</p>
			<img :src="item.img1v1Url"  width="50" height="50"  v-lazy="item.img1v1Url">
		</div>
		
		<!-- <van-index-bar>      <van-index-anchor index="A" />
      <van-cell title="文本" />
      <van-cell title="文本" />
      <van-cell title="文本" />
      
      <van-index-anchor index="B" />
      <van-cell title="文本" />
      <van-cell title="文本" />
      <van-cell title="文本" />

      <van-index-anchor index="C" />
      <van-cell title="文本" />
      <van-cell title="文本" />
      <van-cell title="文本" />

      <van-index-anchor index="D" />
      <van-cell title="文本" />
      <van-cell title="文本" />
      <van-cell title="文本" />

      <van-index-anchor index="E" />
      <van-cell title="文本" />
      <van-cell title="文本" />
      <van-cell title="文本" />

      <van-index-anchor index="F" />
      <van-cell title="文本" />
      <van-cell title="文本" />
      <van-cell title="文本" />

      <van-index-anchor index="G" />
      <van-cell title="文本" />
      <van-cell title="文本" />
      <van-cell title="文本" />

      <van-index-anchor index="H" />
      <van-cell title="文本" />
      <van-cell title="文本" />
      <van-cell title="文本" />

      <van-index-anchor index="I" />
      <van-cell title="文本" />
      <van-cell title="文本" />
      <van-cell title="文本" />

      <van-index-anchor index="J" />
      <van-cell title="文本" />
      <van-cell title="文本" />
      <van-cell title="文本" />

      <van-index-anchor index="K" />
      <van-cell title="文本" />
      <van-cell title="文本" />
      <van-cell title="文本" />

      <van-index-anchor index="L" />
      <van-cell title="文本" />
      <van-cell title="文本" />
      <van-cell title="文本" />

      <van-index-anchor index="M" />
      <van-cell title="文本" />
      <van-cell title="文本" />
      <van-cell title="文本" />

      <van-index-anchor index="N" />
      <van-cell title="文本" />
      <van-cell title="文本" />
      <van-cell title="文本" />

      <van-index-anchor index="O" />
      <van-cell title="文本" />
      <van-cell title="文本" />
      <van-cell title="文本" />

      <van-index-anchor index="P" />
      <van-cell title="文本" />
      <van-cell title="文本" />
      <van-cell title="文本" />

      <van-index-anchor index="Q" />
      <van-cell title="文本" />
      <van-cell title="文本" />
      <van-cell title="文本" />

      <van-index-anchor index="R" />
      <van-cell title="文本" />
      <van-cell title="文本" />
      <van-cell title="文本" />

      <van-index-anchor index="S" />
      <van-cell title="文本" />
      <van-cell title="文本" />
      <van-cell title="文本" />

      <van-index-anchor index="T" />
      <van-cell title="文本" />
      <van-cell title="文本" />
      <van-cell title="文本" />

      <van-index-anchor index="U" />
      <van-cell title="文本" />
      <van-cell title="文本" />
      <van-cell title="文本" />

      <van-index-anchor index="V" />
      <van-cell title="文本" />
      <van-cell title="文本" />
      <van-cell title="文本" />

      <van-index-anchor index="W" />
      <van-cell title="文本" />
      <van-cell title="文本" />
      <van-cell title="文本" />

      <van-index-anchor index="X" />
      <van-cell title="文本" />
      <van-cell title="文本" />
      <van-cell title="文本" />

      <van-index-anchor index="Y" />
      <van-cell title="文本" />
      <van-cell title="文本" />
      <van-cell title="文本" />

      <van-index-anchor index="Z" />
      <van-cell title="文本" />
      <van-cell title="文本" />
      <van-cell title="文本" />
    </van-index-bar> -->
	</div>
<!-- </van-list> -->
</template>
<script>
import Vue from 'vue';
import { List } from 'vant';

Vue.use(List);
export default {
	name: "Artist",
  data(){
    return{  
			artistList:[],  //存放歌手的数组
			limit:20,   		//显示的数据数量
      offset:0,   			//开始显示的地方
      initial:"A",    //index索引
      area:-1,        //语种分类
        //是否刷新错误
      loading: false,  //是否下拉刷新
      finished: false,
      type:"-1"
    }
	},
	methods:{
		getArtist(){
			var url=`http://localhost:3000/artist/list?limit=${this.limit}&offset=${this.offset}&initial=${this.initial}&area=${this.type}&type=${this.type}`;
			this.axios(url).then(result=>{
				if(result.status==200){
					// this.artistList.push(...result.data.artists);
					this.artistList=result.data.artists;
					console.log(result)
				}
			});
    },
    //触底刷新数据
    onLoad() {
      // 异步更新数据
      setTimeout(() => {
        this.offset+=10;
        // this.getArtist();
        var url=`http://localhost:3000/artist/list?limit=${this.limit}&offset=${this.offset}&initial=${this.initial}&area=${this.type}&type=${this.type}}`;
			this.axios(url).then(result=>{
				if(result.status==200){
					this.artistList.push(...result.data.artists);
					// this.artistList=result.data.artists;
					console.log(result)
				}
			});
        // 加载状态结束
        this.loading = false;
        // 数据全部加载完成
        if (this.artistList.length >= 600) {
          this.finished = true;
        }
      }, 1000);
    },
    setType(val){
      this.initial=val;
      console.log(val)
      this.getArtist();

    }
	},
	created(){
		this.getArtist();
	},
	watch:{
	},
	computed:{
	}
};
</script>

<style lang="scss" scoped>
  .artist{
    .button{
      padding: 15px 20px 15px 20px;
      display: inline-block;
      background-color: #fff;
      text-align: center;
      border: solid 1px #333 ;
      border-radius: 50px;
    }
    .button--active{
        background-color: pink;
    }
    
  }
</style>