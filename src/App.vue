<template>
  <div id="app">
    <Header/>
      <transition enter-active-class="animated bounceInRight" leave-active-class="animated fadeOut" mode="out-in">
        <router-view></router-view>
      </transition>
      <BackTop/>
    <Footer/>
  </div>
</template>

<script>
import axios from 'axios'
import Header from "./components/Header";
import Footer from "./components/Footer";
import BackTop from "./components/BackTop";
export default {
  name: 'App',
  components: {BackTop, Footer, Header},
  /*provide是提供数据给子组件或孙子组件   这个过程称为依赖注入*/
  provide(){
    return {
      appDate1:'HELLO WORLD'
    }
  },
  data() {
    return {}
  },
  methods: {
    mApp(a) {
      console.log(a);
    },
    /*axios POST请求*/
    abc() {
      let postData = this.$qs.stringify({
        id: 34
      });
      axios.post("http://127.0.0.1/api/getArticle", postData, {
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
      }).then(response=>console.log(response)).catch(e=>alert('失败'))
    },
    /*axios GET请求*/
    abc1() {
      axios.get("http://127.0.0.1/api/getAllArticle", {params: {order: 'desc'}}).then
      (response=>console.log(response)).catch(e=>alert("失败"));
    },
  },
  mounted() {

  },
}
</script>

<style type="text/css">
  @import "../static/css/reset.css";
  @import "../static/css/animate.css";
  @font-face {
    font-family: englishFont;
    src: url("../static/font/WSansNew-Book.woff.ttf");
  }
  @font-face {
    font-family: chineseFont;
    src: url("../static/font/SourceHanSerifCN-ExtraLight_0.otf");
  }


  /*重定义bootstrap容器宽度*/
  @media screen and (max-width: 992px) and (min-width: 690px){
    .container{
      max-width: 600px;
    }
  }
  @media screen and (max-width: 690px) and (min-width: 480px){
    .container{
      max-width: 445px;
    }
  }
  @media screen and (max-width: 480px) {
    .container{
      max-width: 325px;
    }
    .img-box{
      width: 100% !important;
      padding-left: 0 !important;
      padding-right: 0 !important;
      position: unset !important;
    }
    h2{
      font-size: 22px !important;
    }
  }
  body{
    background: #f8f8f8 !important;
  }
  a{
    transition: all .3s linear !important;
    color: inherit !important;
    text-decoration: none !important;
  }
  #header a,.right-nav a,.column,.motto,.blog-title{
    font-family: "W Sans New Book" !important;
  }
  h2{
    line-height: 36px !important;
    color: #444 !important;
  }

  /*富文本 内容图片*/
  .ueditor img{
    width: 100% !important;
  }

  /*瀑布流 vue-waterfall-easy*/
  .vue-waterfall-easy-scroll{
    overflow: visible !important;
  }
  .vue-waterfall-easy-scroll::-webkit-scrollbar{
    display: none !important;
  }
  .img-inner-box{
    border-radius: 0 !important;
  }
  .img-wraper{
    display: none !important;
    padding: 20px;
  }
  .img-info{
    position: relative;
    background: #fff !important;
  }
  .img-info:after{
    display: block;
    content: '';
    width: 100%;
    height: 1px;
    background: #ddd;
    position: absolute;
    left: 0;
    bottom: 2px;
  }
</style>
