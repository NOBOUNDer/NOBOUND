import Vue from 'vue'
import Router from 'vue-router'
import Vuex from "vuex";

Vue.use(Router);

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
  {path:'/about/:id?',component: resolve => require(['@/components/about'],resolve),meta:{title:'About 关于 | 无边的摄影术'}},
];

const router = new Router({
  routes,
})

export default  router;

