<template>
  <div>
    <div id="blog" class="container-fluid" :style="{transform:`translateX(${this.store.state.topRight})`,transition:'all .7s ease .2s'}">
      <div class="blog-title container">
        <div class="row no-gutters" style="border-bottom: 1px solid #ddd">
          <h1 class="col-12">无边的摄影博客</h1>
          <p class="col-12">NOBOUND's Photography Blog</p>
        </div>
      </div>
      <div class="blog-content">
          <vue-waterfall-easy :imgsArr="BlogData" srcKey='cover' :gap=25 :imgWidth=305>
            <div class="img-info" slot-scope="props">
              <div class="article-title">
                <h2><router-link :to="'/article/'+props.value.id+'/'+props.value.pid">{{props.value.title}}</router-link></h2>
                <p>
                  <span>By <a href="">{{props.value.author}}</a></span> |
                  <span><router-link :to="'/blogClassify/'+props.value.pid">{{ClassifyData[props.value.pid-1].navName}}</router-link></span> |
                  <span>{{CommentsNum(props.value.id)}} comments</span>
                </p>
              </div>
              <div class="cover">
                <img :src="props.value.cover" alt="">
              </div>
              <div class="article-description">
                <p>
                  {{props.value.description}}
                </p>
                <router-link :to="'/article/'+props.value.id+'/'+props.value.pid" class="rMore">Read More</router-link>
              </div>
              <div class="article-time">
                <span>{{crtTimeFtt(props.value.time)}}</span>
              </div>
            </div>
          </vue-waterfall-easy>
      </div>
    </div>
    <div class="handpick-blog container-fluid">
      <div class="blog-title container">
        <div class="row" style="border-bottom: 1px solid #ddd">
          <h2 class="col-12">Featured Blogs</h2>
          <p class="nav-title col-12">精选博文</p>
        </div>
      </div>
      <div class="handpick-blog-content" >
        <vue-waterfall-easy :imgsArr="HandPickBlog" srcKey='cover' :gap=25 :imgWidth=305>
          <div class="img-info" slot-scope="prop">
            <div class="article-title">
              <h2><router-link :to="'/article/'+prop.value.id+'/'+prop.value.pid">{{prop.value.title}}</router-link></h2>
              <p>
                <span>By <a href="">{{prop.value.author}}</a></span> |
                <span><router-link :to="'/blogClassify/'+prop.value.pid">{{ClassifyData[prop.value.pid-1].navName}}</router-link></span> |
                <span>{{CommentsNum(prop.value.id)}} comments</span>
              </p>
            </div>
            <div class="cover">
              <img :src="prop.value.cover" alt="">
            </div>
            <div class="article-description">
              <p>
                {{prop.value.description}}
              </p>
              <router-link :to="'/article/'+prop.value.id+'/'+prop.value.pid" class="rMore">Read More</router-link>
            </div>
            <div class="article-time">
              <span>{{crtTimeFtt(prop.value.time)}}</span>
            </div>
          </div>
        </vue-waterfall-easy>
      </div>
    </div>
  </div>
</template>

<script>
  import vueWaterfallEasy from 'vue-waterfall-easy'
  import Header from "./Header";
  import Footer from "./Footer";
  import config from"./config"
    export default {
        name: "blog",
      data(){
        return {
          BlogData:[],
          ClassifyData:[],
          HandPickBlog:[],
          AllComments:[],
          bg:'#fff',
          color:'#27CCC0',
          logo:'block',
          logo2:'none',
          navColor:'#888',
          shadow:'1px 0 2px #333',
          store:this.$store,
        }
      },
      components:{
        Footer,
        Header,
        vueWaterfallEasy
      },
      methods:{
        headerStyle(){
          this.store.commit('changeTopStyle',{
            TS:true,
          });
          this.store.commit('changeScroll',{
            HB:'#fff',
            HS:'1px 0 2px #333',
            Logo:'block',
            Logo2:'none',
            LH:'50px',
            HN:'#333',
          });
        },
          //获取博客文章
        getBlog(){
          this.$axios.get(`${config.server}/api/getAllBlog`,{params:{type:'8',sort:'asc'}}).then((resp)=>{
            this.BlogData=resp.data;
          })
        },
        //获取分栏
        getClassify(){
          this.$axios.get(`${config.server}/api/getAllClassify`).then((resp)=>{
            this.ClassifyData=resp.data;
          })
        },
        //获取推荐博文
        getHandpickBlog(){
          this.$axios.get(`${config.server}/api/getBlogArticleClassifyType`,{params:{type:'6',pid:'1'}}).then((resp)=>{
            this.HandPickBlog=resp.data;
          })
        },
        //获取所有评论
        getAllComments(){
          this.$axios.get(`${config.server}/api/getAllComments`).then((resp)=>{this.AllComments=resp.data});
        },
        //获取评论条数
        CommentsNum(id){
          var num=0;
          for (var i=0;i<this.AllComments.length;i++) {
            if (this.AllComments[i].pid == id) {
              num=num+1
            }
          }
          return num;
        },
        //转换时间格式
        crtTimeFtt(val, row) {
          if (val != null) {
            var date = new Date(val);
            return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()+' '+date.getHours()+':'+date.getMinutes();
          }
        }
      },
      created(){
          this.getBlog();
          this.getClassify();
          this.getHandpickBlog();
          this.getAllComments()
      },
      mounted(){
          this.headerStyle();
      }
    }
</script>

<style scoped>
  @media screen and (max-width: 1650px){
    .handpick-blog-content{
      height: 1700px !important;
    }
  }
  @media screen and (max-width: 1320px){
    .blog-content{
      height: 2300px !important;
    }
    .handpick-blog-content{
      height: 1900px !important;
    }
  }
  @media screen and (max-width: 990px){
    .blog-content{
      height: 3200px !important;
    }
    .handpick-blog-content{
      height: 2500px !important;
    }
  }
  @media screen and (max-width: 660px){
    .blog-content{
      height: 5900px !important;
    }
    .handpick-blog-content{
      height: 4600px !important;
    }
  }
  @media screen and (max-width: 992px) {
    #blog{
      padding-top:97px !important;
    }
  }
  #blog{
    background:#f8f8f8;
    padding-top: 152px;
  }
  .blog-title{
    text-align: center;
    color: #444;
    margin-bottom: 36px;
  }
  .blog-title h1{
    font-size: 24px;
    font-weight: 600;
    margin-bottom: 16px;
  }
  .blog-title p{
    font-size: 22px;
    font-family: "Open Sans Light";
    font-weight: 300;
    margin-bottom: 40px;
  }
  .blog-content{
    height: 1700px;
  }
  .handpick-blog-content{
    height: 1400px;
  }
  .img-info{
    padding: 20px;
  }
  .article-title h2 a{
    font-size: 22px !important;
    color: #27CCC0 !important;
    font-weight: 700;
    transition: all .3s;
  }
  .article-title h2 a:hover{
    color: #575757 !important;
  }
  .article-title p{
    font-size: 12px;
    margin: 5px 0 15px;
    color: #888;
  }
  .article-title p span{
    font-size: 12px;
    display: inline-block;
    padding: 0 5px;
  }
  .article-title p span:first-of-type{
    padding-left: 0;
  }
  .cover{
    margin-bottom: 36px;
  }
  .cover img {
    display: block;
    width: 100%;
  }
  .article-description p{
    font-size: 12px;
    color: #888;
    letter-spacing: 1px;
    line-height: 20px;
  }
  .article-description{
    padding-bottom: 20px;
    margin-bottom: 20px;
    border-bottom: 1px solid #ddd;
  }
  .rMore{
    font-size: 13px;
    font-family: 'englishFont' !important;
    display: inline-block;
    margin-top: 25px;
    color: #fff !important;
    background: #333;
    padding: 8px 11px;
    border-radius: 2px;
    transition: all .3s linear;
  }
  .rMore:hover{
    background: #27CCC0;
  }
  .article-time span{
    font-family: 'englishFont' !important;
    font-size: 14px;
    letter-spacing: 1px;
  }
  .handpick-blog{
    background: #f8f8f8;
  }
</style>
