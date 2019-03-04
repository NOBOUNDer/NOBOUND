<template>
    <div id="footer" class="container-fluid" :style="{transform: `translateX(${this.store.state.topRight})`,transition:'all .7s ease .2s'}">
      <div class="container col-10 pt-5">
        <ul class="row">
          <li class="col-xl-3 col-lg-3 col-md-6 col-12 mb-xl-0 mb-lg-0 mb-3">
            <h4>分类目录</h4>
            <dl>
            <dt v-for="(v,index) in store.state.ClassifyData" :key="index">
              <router-link :to="'/blogClassify/'+v.id">{{v.navName}}</router-link>
            </dt>
            </dl>
          </li>
          <li class="col-xl-3 col-lg-3 col-md-6 col-12 mb-xl-0 mb-lg-0 mb-3">
            <h4>标签</h4>
            <dl>
            <dt><a href="">IPHONE摄影</a></dt>
            <dt><a href="">Leica</a></dt>
            <dt><a href="">LEON IMAGE</a></dt>
            <dt><a href="">Vikki Lee</a></dt>
            <dt><a href="">北京</a></dt>
            <dt><a href="">反思</a></dt>
            <dt><a href="">人像摄影</a></dt>
            <dt><a href="">人文摄影</a></dt>
            <dt><a href="">动物摄影作品</a></dt>
            <dt><a href="">奥林巴斯</a></dt>
              <dt><a href="">IPHONE摄影</a></dt>
              <dt><a href="">Leica</a></dt>
              <dt><a href="">LEON IMAGE</a></dt>
              <dt><a href="">Vikki Lee</a></dt>
              <dt><a href="">北京</a></dt>
              <dt><a href="">反思</a></dt>
              <dt><a href="">人像摄影</a></dt>
              <dt><a href="">人文摄影</a></dt>
              <dt><a href="">动物摄影作品</a></dt>
              <dt><a href="">奥林巴斯</a></dt>
              <dt><a href="">IPHONE摄影</a></dt>
              <dt><a href="">Leica</a></dt>
              <dt><a href="">LEON IMAGE</a></dt>
              <dt><a href="">Vikki Lee</a></dt>
              <dt><a href="">北京</a></dt>
              <dt><a href="">反思</a></dt>
              <dt><a href="">人像摄影</a></dt>
              <dt><a href="">人文摄影</a></dt>
              <dt><a href="">动物摄影作品</a></dt>
              <dt><a href="">奥林巴斯</a></dt>
              <dt><a href="">IPHONE摄影</a></dt>
              <dt><a href="">Leica</a></dt>
              <dt><a href="">LEON IMAGE</a></dt>
              <dt><a href="">Vikki Lee</a></dt>
              <dt><a href="">北京</a></dt>
              <dt><a href="">反思</a></dt>
              <dt><a href="">人像摄影</a></dt>
              <dt><a href="">人文摄影</a></dt>
              <dt><a href="">动物摄影作品</a></dt>
              <dt><a href="">奥林巴斯</a></dt>
            </dl>
          </li>
          <li class="col-xl-3 col-lg-3 col-md-6 col-12 mb-xl-0 mb-lg-0 mb-3">
            <h4>近期文章</h4>
            <dl>
            <dt v-for="(recent,index) in RecentBlog" :key="index"><router-link :to="'/article/'+recent.id+'/'+recent.pid">{{recent.title}}</router-link></dt>
            </dl>
          </li>
          <li class="col-xl-3 col-lg-3 col-md-6 col-12 mb-xl-0 mb-lg-0 mb-3">
            <h4>近期评论</h4>
            <dl>
            <dt v-for="(comments,index) in RecentComments" :key="index"><span>{{comments.author}}</span>发表在《<router-link :to="'/article/'+comments.pid+'/'+Pid(comments.pid)">{{comments.title}}</router-link>》</dt>
            </dl>
          </li>
        </ul>
      </div>
      <div class="copyright row">
        <div class="container">
          <div class="row align-items-center">
            <p class="col-auto">© 2019 无边的摄影术.</p>
            <div class="wechat col-auto">
              <i class="fa fa-weixin"></i>
              <img src="../../static/img/wechat.jpg" alt="">
            </div>
            <a href="https://github.com/NOBOUNDer" target="_blank" class="col-auto gitHub"><i class="fa fa-github-square "></i></a>
          </div>
        </div>
      </div>
      </div>
</template>

<script>
  import config from './config'
    export default {
        name: "Footer",
      data(){
         return {
           RecentComments:[],
           RecentBlog:[],
           store:this.$store
         }
      },
      methods:{
        //获取近期文章
        getRecentBlog(){
          this.$axios.get(`${config.server}/api/getRecentBlog`,{params:{type:7}}).then((resp)=>{
            this.RecentBlog=resp.data;
          })
        },
        //获取近期评论
        getRecentComments(){
          this.$axios.get(`${config.server}/api/getRecentComments`).then((resp)=>{this.RecentComments=resp.data});
        },
        //近期评论所属文章所属分栏
        Pid(id){
          for (var i = 0; i < this.store.state.AllBlog.length; i++) {
            if (this.store.state.AllBlog[i].id == id) {
              return this.store.state.AllBlog[i].pid;
            }
          }
        }
      },
      created(){
          this.getRecentBlog();
          this.getRecentComments();
      }
    }
</script>

<style scoped>
  #footer{
    background: #252525;
    color: #ccc;
    margin: 0;
    transition: all .5s ease .3s;
  }
  h4{
    color: #777;
    font-size: 12px;
    margin-bottom: 20px;
  }
  ul li a{
    transition: all .3s;
  }
  ul li a:hover{
    color: #27CCC0 !important;
  }
  ul li:nth-of-type(1) a,ul li:nth-of-type(3) a{
    display: block;
    border-bottom: 1px solid #444;
    padding: 10px 0;
    font-size: 13px;
  }
  ul li:nth-of-type(1) dt:first-of-type a,ul li:nth-of-type(3) dt:first-of-type a{
    padding-top: 0;
  }
  ul li:nth-of-type(1) dt:last-of-type a,ul li:nth-of-type(3) dt:last-of-type a{
    border-bottom: none;
  }
  ul li:nth-of-type(2) dt a{
    display: block;
    padding: 10px;
    background: #1B1B1B;
    color: #A0A0A0;
    border-radius: 3px;
    font-size: 13px;
  }
  ul li:nth-of-type(2) dt a:hover{
    background: #27CCC0;
    color: #fff !important;
  }
  ul li:nth-of-type(2) dt{
    display: inline-block;
    margin-bottom: 5px;
  }
  ul li:nth-of-type(4) dt{
    background: rgba(0, 0, 0, 0.16);
    padding: 20px;
    margin-bottom: 18px;
    font-size: 13px;
    line-height: 23px;
  }
  .copyright{
    background: #1c1c1c;
    color: #777;
    font-size: 12px;
    line-height: 25px;
    padding: 20px 0;
  }
  .copyright p{
    margin-bottom: 0;
  }
  .fa{
    display: block;
    transition: all .3s;
  }
  .fa-weixin{
    font-size: 20px;
    transition: all .3s;
    cursor: pointer;
  }
  .fa:hover{
    color: #27CCC0;
    transform: scale(1.2,1.2);
  }
  .gitHub{
    font-size: 22px;
  }
  .wechat{
    position: relative;
  }
  .wechat img{
    width: 150px;
    position: absolute;
    left: 50%;
    top: -170px;
    transform: translateX(-50%);
    display: none;
  }
  .wechat:hover>img{
    display: block;
  }
</style>
