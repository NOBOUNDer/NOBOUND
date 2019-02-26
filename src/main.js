// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuex from 'vuex'//1.引入
import axios from 'axios'//1.引入
import qs from 'qs';
import 'font-awesome/css/font-awesome.css'
import 'swiper/dist/css/swiper.min.css'
import '@/icons/index.js'
import $ from 'jquery'
import vueWaterfallEasy from 'vue-waterfall-easy'
import 'bootstrap/dist/css/bootstrap.min.css'
import  'bootstrap/dist/js/bootstrap.min'
import '../static/css/normalize.css'
import config from './components/config'

Vue.prototype.$qs = qs;

Vue.prototype.$axios=axios;//2.把axios（相当于ajax） 绑定给vue的原型

Vue.use(Vuex)//2.使用

  /*2.正常写*/
  //state包含公共的数据 {}
const store = new Vuex.Store({
  state: {
    topRight:'0',
    topLeft:'-300px',
    shadeBlock:'none',
    headerColor:'#27CCC0',
    headerNav:'#d1d1d1',
    headerShadow:'',
    headerBackground:'transparent',
    topStyle:false,
    logo:'none',
    logo2:'block',
    logoHeight:'50px',
    swiper:document.body.clientHeight,
    paginationTop:'',
    isShow:false,
  },
  getters:{
    //getters 是对公共数据进行计算使用的    （getters相当于组件中的computed）
  },
  mutations:{
    //是对公共数据进行更改的地方  里面设置的是方法 （mutations相当于组件中的methods）
    changeTopLeft(state,data){
      state.topRight=data.right;
    },
    changeDisplay(state,data){
      state.shadeBlock=data.Dp;
    },
  //判断是否改变顶部样式
    changeTopStyle(state,data){
      state.topStyle=data.TS;
      state.headerNav=data.HN;
    },
    //顶部导航滚动后顶部样式
    changeScroll(state,data){
      state.headerBackground=data.HB;
      state.headerShadow=data.HS;
      state.logo=data.Logo;
      state.logo2=data.Logo2;
      state.logoHeight=data.LH;
      state.headerNav=data.HN;
    },
    changePaginationTop(state,data){
      state.paginationTop=data.PT;
    },
    IsShow(state,data){
      state.isShow=data.IS;
    }
  },
  /*actions 是用来调用 mutations 里面的方法*/
  actions:{
    bbb(context,abc){
      //bbb 相当于方法名称
      //context相当于 store
      context.commit('aaa',abc);//相当于store.commit('aaa')
    }
  }
});

//定义一个请求拦截器
axios.interceptors.request.use(function(config){
  store.commit('IsShow',{
    IS:true,
  }) //在请求发出之前进行一些操作
  return config
})
//定义一个响应拦截器
axios.interceptors.response.use(function(config){
  store.commit('IsShow',{
    IS:false,
  })//在这里对返回的数据进行处理
  return config
})

router.beforeEach((to,from,next)=>{
  //全局守卫 在进入任何路由之前执行
    /* 路由发生变化修改页面title */
    if (to.meta.title) {
      document.title = to.meta.title
    }
  next();
});

router.beforeResolve((to,from,next)=>{
  //在beforeEach执行完并且，所有子路由内部的守卫执行完之后执行
  next();
});

router.afterEach((to,from,next)=>{
  //跳转之后滚动条回到顶部
  window.scrollTo(0,0);
});
/*全局过滤器*/
Vue.filter('Times',function (v) {
  /*v用来接收需要过滤的数据*/
  return v.replace(/\//g,"-");
});

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,//ES6简写，相当于router:router,
  store,//把配置加入vue实例对象
  components: { App,vueWaterfallEasy},//ES6简写，相当于components: { App:App }
  template: '<div><App/></div>'//需要与components的对象名称相同
})
