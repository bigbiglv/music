import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);
const routes = [
  {
    path: "/",
    name: "Home",
    meta:{
      keepAlive: true,
      pageMsg:{
        page_title: "首页" //NavBar标题
      }
    },
    component: Home
  },
  {
    path: "/charts",
    name: "Charts",
    meta:{
      keepAlive: true,
      pageMsg:{
        page_title: "排行版"
      }
    },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Charts.vue")
  },
  {
    path:"/artist", 
    name:"Artist", 
    meta:{
      keepAlive: true,
      pageMsg:{
        page_title:"歌手 "  
      }
    },
    // component: () => import("../view/Test.vue")
    // component:Test
    component: resolve => require(['../views/Artist.vue'], resolve)
  },
  {
    path:"/search", 
    name:"Search", 
    meta:{
      keepAlive: false,
      pageMsg:{
        page_title:null  
      }
    },
    component: resolve => require(['../views/Search.vue'], resolve)
  },
  {
    path:"/mine", 
    name:"Mine", 
    meta:{
      keepAlive: true,
      pageMsg:{
        page_title:"我的音乐"    
      }
    },
    component: resolve => require(['../views/Mine.vue'], resolve)
  },
  {
    path:"/test", 
    name:"Test", 
    meta:{
      keepAlive: false,
      pageMsg:{
        page_title:"test"    
      }
    },
    component: resolve => require(['../views/Test.vue'], resolve)
  },
  {
    path:"/login", 
    name:"Login", 
    meta:{
      keepAlive: false,
      pageMsg:{
        page_title:"test"    
      }
    },
    component: resolve => require(['../views/Login.vue'], resolve)
  },
  {
    path:"/chartslist", 
    name:"ChartsList", 
    meta:{
      keepAlive: false,
      pageMsg:{
        page_title: null    
      }
    },
    component: resolve => require(['../views/ChartsList.vue'], resolve)
  },
  {
    path:"/playlist", 
    name:"PlayList", 
    meta:{
      keepAlive: false,
      pageMsg:{
        page_title: null    
      }
    },
    component: resolve => require(['../views/PlayList.vue'], resolve)
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;

