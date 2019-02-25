import Vue from 'vue'
import Router from 'vue-router'
import Vuex from "vuex";

Vue.use(Router);


/*Vue.use(Vuex);

const mA={
  state:{name:'小路'},
  getters:{
    uName1:function (state) {
      return state.name+"good";
    }
  }
};

const mB={
  state:{name:'小涩'},
  getters:{
    uName2:function (state) {
      return state.name+"very good";
    }
  }
};

export default new Vuex.Store({
  modules:{a:mA,b:mB}
});*/

const routes=[
  {path:'/',component: resolve => require(['@/components/Home'],resolve),meta:{title:'无边的摄影术 | Photographs by NOBOUND'}},
  {path:'/my-life/:id?',component: resolve => require(['@/components/myLife'],resolve),meta:{title:'My Life 我的生活 | 无边的摄影术'}},
  {path:'/a-diary-of-antarctica/:id?',component: resolve => require(['@/components/ADiaryOfAntarctica'],resolve),meta:{title:'A Diary of Antarctica 南极日记 | 无边的摄影术'}},
  {path:'/lilys-diary/:id?',component: resolve => require(['@/components/lilysDiary'],resolve),meta:{title:'Lily\'s Diary 莉莉日记 | 无边的摄影术'}},
  {path:'/article/:id/:pid?',component: resolve => require(['@/components/Article'],resolve),meta:{title:'My Life 我的生活 | 无边的摄影术'}},
  {path:'/blog/:id?',component: resolve => require(['@/components/blog'],resolve),meta:{title:'无边的摄影博客 | 无边的摄影术'}},
  {path:'/blogClassify/:id?',component: resolve => require(['@/components/blogClassify'],resolve),meta:{title:' 摄影分类 | 无边的摄影术'}},
  {path:'/Search/:keyword?',component: resolve => require(['@/components/Search'],resolve),meta:{title:'Search | 无边的摄影术'}},
  {path:'/nobound/:id?',component: resolve => require(['@/components/nobound'],resolve),meta:{title:'NOBOUND | 无边的摄影术'}},
  {path:'/tibet/:id?',component: resolve => require(['@/components/Tibet'],resolve),meta:{title:'Tibet 西藏 | 无边的摄影术'}},
  {path:'/argentina/:id?',component: resolve => require(['@/components/Argentina'],resolve),meta:{title:'Argentina 阿根廷 | 无边的摄影术'}},
  {path:'/hk/:id?',component: resolve => require(['@/components/hk'],resolve),meta:{title:'Hong Kong 香港 | 无边的摄影术'}},
];

const router = new Router({
  routes,
})

export default  router;


/*export default new Router({
  linkExactActiveClass:"a",//全局 设置精准匹配的class名称
  linkActiveClass:"b",//全局 设置普通匹配的class名称
  routes: [

    {path:'/',component: resolve => require(['@/components/home'],resolve)},
    {path:'/my-life/:id?',component:myLife},
    {path:'/a-diary-of-antarctica/:id?',component:ADiaryOfAntarctica},
    {path:'/lilys-diary/:id?',component:lilysDiary},
    {path:'/article/:id/:pid?',component:Article},
    {path:'/blog/:id?',component:blog},
    {path:'/blogClassify/:id?',component:blogClassify},
    {path:'/Search/:keyword?',component:Search},
    /!*demo*!/
    /!*!//在这个数组中定义接收路由地址
    {path:'/', component:home},
    {path:'/M/:m?/:mm?', name:'aaa', component:M},
    {path:'/N/:n?/:nn?',component:N,beforeEnter:(to,from,next)=>{
      console.log("进入了N");
      next();
      }},
    {path:'/O', components:{v1:O,v2:P}},
    //注意：/P 地址中P组件是放到App.vue中的router-view里面
    {path:'/P',component:P,children:[
      //a1表示匹配的地址为 /P/a1 地址中B组件是放到A.vue中的router-view里面
        {path:'a1',component:Q}
      ]}*!/
  ]
})*/
