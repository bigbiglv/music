<template>
  <div id="app">
    <!-- <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div> -->
    <NavBar v-if="navShow"></NavBar>
    <!-- 使用keep-alive缓存页面 -->
      <keep-alive>  
        <router-view class="app-views" v-if="$route.meta.keepAlive" /> 
      </keep-alive>
        <router-view  v-if="!$route.meta.keepAlive" />
    <simple-play></simple-Play>
    <!-- v-if判断组件是否需要加载 -->
    <TabBar v-if="tabShow" ></TabBar>
  </div>
</template>

<script>
import TabBar from "@/components/TabBar.vue";
import NavBar from "@/components/NavBar.vue";
import SimplePlay from "@/components/SimplePlay.vue";
export default {
  name: "Home",
  data(){
    return{
      tabShow: true, //判断是否加载底栏
      navShow: true,  //判断是否加载顶栏
      value:""
    }
  },
  components: {
    TabBar,
    NavBar,
    SimplePlay
  },
  methods:{
    goBack(){
      this.$router.go(-1);
    }
  },
  created(){
  },
  watch:{
    '$route' (){ 
      //监听路由路径判断是否加载TabbBar和 NavBar
      if(this.$route.path=="/" || this.$route.path=="/charts" || 
         this.$route.path=="/artist" ||this.$route.path=="/mine"){
          this.tabShow=true;
          this.navShow=true;
        }else if(this.$route.path=="/search"){
          this.tabShow=false;
          this.navShow=true;
        }
        else{
          this.tabShow=false;
          this.navShow=false;
        }
    }
  }
};
</script>

<style lang="scss">
*{
  margin: 0;
  padding: 0;
  .app-views{
    position: relative;
    width: 96%;
    left:2%;
    top: 65px;
    padding-bottom: 50px;
  }
}

// #app {
//   font-family: Avenir, Helvetica, Arial, sans-serif;
//   -webkit-font-smoothing: antialiased;
//   -moz-osx-font-smoothing: grayscale;
//   text-align: center;
//   color: #2c3e50;
// }

// #nav {
//   padding: 30px;

//   a {
//     font-weight: bold;
//     color: #2c3e50;

//     &.router-link-exact-active {
//       color: #42b983;
//     }
//   }
// }
</style>
