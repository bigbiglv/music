<template>
<transition name="nav-change">
	<div class="nav" @click="isShow1">
		<transition name="title-change">
			<p class="nav-title" v-if="isSearch">{{title}}</p>
		</transition>
		<transition name="search-change">
			<van-search 
				placeholder="请输入搜索关键词" 
				background="#ececec" 
				style="flex-grow: 10;"
				shape="round"
				maxlength=30
				input-align="center"
				v-model="value" 
				v-if="this.$route.path=='/search' || this.$route.path=='/'"
				@click="goSearch" 
				@search="onSearch"
				/>
		</transition>
		<transition name="back-change">
			<div class="nav-cancle" v-if="!isSearch" @click="goBack"> 取消 </div>
		</transition>
  </div>
</transition>
</template>

<script>
export default {
	name:'Navbar',
	data(){
		return{
			value:"",       	//搜索框输入的数据
			title:"首页",    	//左上角标题
			isSearch: true    //是否显示搜索框
		}
	},
	methods:{
		//获取搜索框跳转到seach组件
		goSearch(){
			if(this.isSearch){
				this.$router.push({path:'/search'});
			}
		},
		goBack(){
			this.$router.go(-1);
		},
		isShow1(){
			console.log(this.value);
		},
		//按下键盘的回车就把输入的内容传值到bus再传到serach组件开始搜索
		onSearch(){
			console.log(this.value); 
			this.$eventBus.emit("Msg",this.value) 
		}
		

	},
	created(){
		this.isShow1();
	},
	watch:{
		'$route'(){
			this.title=this.$route.meta.pageMsg.page_title
			if(this.$route.path=="/search"){
				this.isSearch=false
			}else{
				this.isSearch=true
			}
		}
	}
}
</script>

<style lang="scss" scoped>
.nav {
	display: flex;
	width: 100%;
	height: 60px;
	font-size: 22px;
	background-color: #ececec;
	position: fixed;
	align-items: center;
	justify-content: space-around;
	z-index: 100;
	
	// 整个nav过渡
	.nav-change-enter-active, .nav-change-leave-active {
    transition: all 0.2s;
		transition-timing-function: linear;
	}
  .nav-change-enter,  .nav-change-leave-to{
    transform: translateY(40px);
  }
	//标题动画
	.title-change-enter-active, .title-change-leave-active {
    transition: all 0.2s;
		transition-timing-function: linear;
	}
  .title-change-enter,  .title-change-leave-to{
		opacity: .5;
    transform: translateX(-40px);
  }

	//搜索框动画
	.search-change-enter-active, .search-change-leave-active {
    transition: all 0.1s;
		transition-timing-function: linear;
	}
  .search-change-enter,  .search-change-leave-to{
		opacity: 0;
    transform: translateX(20px);
  }
		//取消按钮的动画
	.back-change-enter-active, .back-change-leave-active{
    transition: all 0.2s;
		transition-timing-function: linear;
  }
	.back-change-enter,  .back-change-leave-to{
		opacity: .5;
    transform: translateX(40px);
  }
	.nav-title{
		display: block;
		flex-grow: 1;
		padding-left: 10px;
		font-weight: 600;
	} 
	.nav-cancle{
		display: block;
		flex-grow: 1;
		padding-right: 10px;
		font-weight: 600;
		text-align: center;
	} 
}
</style>