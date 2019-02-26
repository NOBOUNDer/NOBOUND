<template>
      <div id="blogClassify" class="container-fluid">
        <div class="container">
          <div class="blogClassify-top">
              <h2>Category</h2>
              <p class="mb-0">{{CurrentClassify.navName}}</p>
          </div>
          <div class="blogClassify-main row justify-content-between mt-5">
            <div class="blogClassify-left col-lg-9 col-12">
              <div class="blogClassify-content row justify-content-between" v-for="(vv,index) in BlogArticle" :key="index">
                <div class="publish-time col-2 d-none d-sm-block ">
                  <div class="publish-time-container">
                    <h3>{{crtTimeMonth(vv.time)}}月</h3>
                    <p class="mb-0">{{crtTimeDate(vv.time)}}</p>
                  </div>
                </div>
                <div class="article-content col-sm-10 col-12">
                  <div class="article-cover">
                    <router-link :to="'/article/'+vv.id+'/'+vv.pid"><img :src="vv.cover" alt=""></router-link>
                  </div>
                  <div class="article-title mt-3">
                    <router-link :to="'/article/'+vv.id+'/'+vv.pid">{{vv.title}}</router-link>
                  </div>
                  <p class="article-ifo">
                    <span>By <router-link to="/">{{vv.author}}</router-link> | </span>
                    <span><router-link to="/">{{CurrentClassify.navName}}</router-link> | </span>
                    <span><a href="">5 comments</a></span>
                  </p>
                  <div class="article-description">
                    <p>
                      {{vv.description}}
                    </p>
                  </div>
                  <div class="read-more">
                    <router-link :to="'/article/'+vv.id+'/'+vv.pid">Read More</router-link>
                  </div>
                  <div class="bottom-line"></div>
                </div>
              </div>
            </div>
            <div class="blogClassify-right col-lg-3 col-12">
              <div class="article-search row  no-gutters mb-5">
                <input  class="col-9" type="text" placeholder="Search..." v-on:keyup="Keyword($event)">
                <router-link :to="'/Search/'+keyword" class="searchBtn col-3">Search</router-link>
              </div>
              <div class="article-classified mb-5">
                <h2>分类目录</h2>
                <ul>
                  <li v-for="(v,index) in AllClassify" :key="index">
                    <router-link :to="'/blogClassify/'+v.id">{{v.navName}}</router-link>
                  </li>
                </ul>
              </div>
              <div class="article-recent mb-5">
                <h2>近期文章</h2>
                <ul>
                  <li v-for="(recentBlog,index) in RecentBlog" :key="index"><router-link :to="'/article/'+recentBlog.id+'/'+recentBlog.pid">{{recentBlog.title}}</router-link></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
</template>

<script>
    import Header from "./Header";
    import Footer from "./Footer";
    import config from './config'
    export default {
        name: "blogClassify",
      data(){
        return {
          AllClassify:[],
          RecentBlog:[],
          CurrentClassify:'',
          keyword:'',
          BlogArticle:[],
          bg:'#fff',
          color:'#27CCC0',
          h3:'#333',
          navColor:'#888',
          shadow:'1px 0 2px #333',
          logo:'block',
          logo2:'none',
          store:this.$store,
        }
      },
      components: {Footer, Header},
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
            //获取所有分栏
            getAllClassify(){
              this.$axios.get(`${config.server}/api/getAllClassify`).then((resp)=>{
                this.AllClassify=resp.data;
              })
            },
        //获取当前分栏
        getCurrentClassify(pid){
          this.$axios.get(`${config.server}/api/getClassify`,{params:{pid:pid}}).then((resp)=>{
            this.CurrentClassify=resp.data[0];
          })
        },
        //获取分栏下的所有文章
        getBlogArticleClassify(pid){
          this.$axios.get(`${config.server}/api/getBlogArticleClassify`,{params:{pid:pid}}).then((resp)=>{
            this.BlogArticle=resp.data;
          })
        },
        //获取近期文章
        getRecentBlog(){
          this.$axios.get(`${config.server}/api/getRecentBlog`,{params:{type:9}}).then((resp)=>{
            this.RecentBlog=resp.data;
          })
        },
        //转换时间格式(月份)
        crtTimeMonth(val, row) {
          if (val != null) {
            var date = new Date(val);
            var month=date.getMonth()+1;
            if (month < 10) {
              month='0'+month
            }
            return month;
          }
        },
        //记录关键词,搜索跳转
        Keyword(el){
          this.keyword=el.target.value;
          if(el.keyCode=='13'){
            document.querySelector('.searchBtn').click()
          }
        },
        //转换时间格式(日)
        crtTimeDate(val, row) {
          if (val != null) {
            var date = new Date(val);
            var day=date.getDate();
            if (day < 10) {
              day='0'+day;
            }
            return day;
          }
        },
      },
      created(){
          this.getAllClassify();
          this.getRecentBlog();
          this.getCurrentClassify(this.$route.params.id);
          this.getBlogArticleClassify(this.$route.params.id);
      },
      mounted(){
        this.headerStyle();
      },
      beforeRouteUpdate(to,from,next) {
        this.getCurrentClassify(to.params.id);
        this.getBlogArticleClassify(to.params.id);
        next();
      }
    }
</script>

<style scoped>
  @media screen and (max-width: 992px){
    #blogClassify{
      padding-top: 65px !important;
    }
  }
  a{
    transition: all .5s;
  }
  a:hover{
    color: #27CCC0;
  }
  h2{
    font-size: 23px;
    line-height: 20px;
    color: #888;
    font-family: 'Open Sans';
    font-weight: 300;
    margin-bottom: 15px;
  }
  .blogClassify-top{
    padding: 42px 0 30px;
    border-bottom: 1px solid #d5d5d5;
  }
  .blogClassify-top p{
    color: #444;
    font-size: 30px;
    font-family: "Open Sans";
    font-weight: 600;
  }
  #blogClassify{
    padding-top: 110px;
    background: #f8f8f8;
  }
  h1{
    font-size:28px;
    color: #444;
    font-weight: bold;
    margin-bottom: 10px;
  }
  .blogClassify-content{
    margin-bottom: 72px;
  }
  .article-search input{
    padding: 10px!important;
    width: 80%;
    font-family: 'Open Sans';
    font-weight: 400;
    font-size: 12px;
    line-height: 22px;
    color: #555;
    background-color: #efefef;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.09) inset;
  }

  .article-classified h2,.article-recent h2{
    color: #999;
    font-family: 'Open Sans';
    font-size: 12px;
    letter-spacing: 2px;
    text-transform: uppercase;
    margin-bottom: 10px;
  }
  .article-classified li, .article-recent li{
    font-size: 12px;
    color: #27CCC0;
    padding:10px 0;
    border-bottom: 1px solid #e6e6e6;
  }
  .blogClassify-right a:hover{
    color: #555555 !important;
  }
  .article-search a{
    line-height: 42px;
    text-align: center;
    background: #333;
    color: #fff !important;
    cursor: pointer;
    transition: all 0.2s linear 0s;
    font-size: 12px;
    border-radius: 2px;
  }
  .article-search a:hover{
    background: #27CCC0;
    color: #fff !important;
  }
  .publish-time-container{
    padding-bottom: 10px;
    border-right: 1px solid #d1d1d1;
    border-bottom: 1px solid #d1d1d1;
    text-align: center;
    margin-top: 7px;
    color: #555;
  }
  .publish-time-container h3{
    font-size: 17px;
    font-weight: 600;
  }
  .publish-time-container p{
    font-size: 30px;
    font-weight: 600;
  }
  .bottom-line{
    padding-top: 42px;
    border-bottom: 1px solid #d1d1d1;
  }
  .article-cover img{
    display: block;
    width: 100%;
  }
  .article-title a{
    font-size: 27px;
    color: #27CCC0;
    font-weight: bold;
  }
  .article-ifo{
    font-size: 13px;
    color: #888;
    margin: 5px 0 15px;
  }
  .article-description{
    font-size: 12px;
    line-height: 25px;
    color: #555555;
  }
  .read-more a{
    font-size: 13px;
    font-family: 'englishFont' !important;
    display: inline-block;
    margin-top: 25px;
    color: #fff !important;
    background: #333;
    padding: 5px 7px;
    border-radius: 2px;
    transition: all .3s linear;
  }
  .read-more a:hover{
    background: #27CCC0 !important;
    color: #fff !important;
  }
</style>
