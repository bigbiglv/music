<template>
<transition name="tab-change">
	<van-tabbar route v-model="active">
  	<van-tabbar-item replace to="/" icon="home-o">home</van-tabbar-item>
  	<van-tabbar-item replace to="/charts" icon="search">排行版</van-tabbar-item>
  	<van-tabbar-item replace to="/artist" icon="search">标签</van-tabbar-item>
  	<van-tabbar-item replace to="/mine" icon="search">我</van-tabbar-item>
	</van-tabbar>
</transition>
</template>

<script>
export default {
	data(){
		return{
			active:""
		}
	},
  methods:{
  },
  created(){
  }
}
</script>

<style>
	.tab-change-enter-active, .tab-change-leave-active {
    transition: all 0.26s;
		transition-timing-function: linear;
	}
  .tab-change-enter,  .tab-change-leave-to{
    transform: translateY(40px);
  }
</style>
