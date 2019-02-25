<template>
    <div id="search" class="container-fluid" :style="{transform:`translateX(${this.store.state.topRight})`,transition:'all .7s ease .2s'}">
      <div class="container">
        <div class="search-title">
          <h1>Results For <span>'{{this.$route.params.keyword}}'</span></h1>
        </div>
        <div class="search-main row justify-content-between mb-5">
          <div class="search-lists col-lg-8 col-12">
            <ul>
              <li v-for=" (v,index) in results" :key="index" class="pl-3 pr-3">
                <div class="article-top">
                  <router-link :to="'/article/'+v.id+'/'+Pid(v.id)">{{v.title}}</router-link>
                </div>
                <div class="article-bottom row justify-content-md-between justify-content-center">
                  <div class="col-md-9 col-12 justify-content-between d-none d-sm-flex justify-content-md-start">
                    <span class="col-auto pl-md-0"><i class="fa fa-pencil" aria-hidden="true"></i> By {{v.author}}</span>
                    <span class="col-auto "><i class="fa fa-th-large"></i> <router-link :to="'/blogClassify/'+v.pid">{{AllClassify[v.pid-1]?AllClassify[v.pid-1].navName:""}}</router-link></span>
                    <span class="col-auto "><i class="fa fa-calendar"></i> {{crtTimeFtt(v.time)}}</span>
                    <span class="col-auto "><i class="fa fa-commenting-o"></i> {{CommentsNum(v.id)}} comments</span>
                  </div>
                  <div class="col-md-auto col-12 mt-3 mt-md-0">
                    <router-link :to="'/article/'+v.id+'/'+Pid(v.id)" class="rMore col-auto ">Read More</router-link>
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <div class="right col-lg-3 col-12 mt-5 mb-5 mt-lg-0 mb-lg-0">
            <div class="article-recent">
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
    import config from "./config"
    export default {
        name: "Search",
      data(){
          return {
            bg:'#fff',
            color:'#27CCC0',
            h3:'#333',
            navColor:'#888',
            shadow:'1px 0 2px #333',
            results:[],
            AllClassify:[],
            AllComments:[],
            AllBlog:[],
            RecentBlog:[],
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
          //获取搜索结果
          getSearchResult(keyword){
            this.$axios.get(`${config.server}/api/getSearch`,{params:{keyword:keyword}}).then((resp)=>{
              this.results=resp.data;
            })
          },
        //转换时间格式
        crtTimeFtt(val, row) {
          if (val != null) {
            var date = new Date(val);
            return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()+' '+date.getHours()+':'+date.getMinutes();
          }
        },
        //获取所有分栏
        getAllClassify(){
          this.$axios.get(`${config.server}/api/getAllClassify`).then((resp)=>{
            this.AllClassify=resp.data;
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
        //获取所有文章
        getAllBlog(){
          this.$axios.get(`${config.server}/api/getBlog`).then(resp=>{this.AllBlog=resp.data});
        },
        //近期评论所属文章所属分栏
        Pid(id){
          for (var i = 0; i < this.AllBlog.length; i++) {
            if (this.AllBlog[i].id == id) {
              return this.AllBlog[i].pid;
            }
          }
        },
        //获取近期文章
        getRecentBlog(){
          this.$axios.get(`${config.server}/api/getAllBlog`,{params:{type:9,sort:'desc'}}).then((resp)=>{
            this.RecentBlog=resp.data;
          })
        },
      },
      created(){
          this.getSearchResult(this.$route.params.keyword);
          this.getAllBlog();
          this.getAllClassify();
          this.getAllComments();
          this. getRecentBlog();
      },
      mounted(){
        this.headerStyle();
      },
      beforeRouteUpdate(to,from,next){
          this.getSearchResult(to.params.keyword);
          next();
      }
    }
</script>

<style scoped>
  @media screen and (max-width: 992px){
    #search{
      padding-top: 65px !important;
    }
  }
  @media screen and (max-width: 768px){
    .search-title h1{
      font-size: 18px !important;
    }
    .search-title h1 span{
      font-size: 16px!important;
    }
    .search-lists .article-top a{
      font-size: 18px !important;
    }
  }
  #search{
    padding-top: 110px;
    background: #f8f8f8;
  }
  .search-title h1{
    margin: 0 0 32px !important;
    height: 100px;
    line-height: 100px;
    border-bottom: 1px solid #d1d1d1;
    font-size: 32px;
    color: #333;
    font-weight: 600;
  }
  .search-title h1 span{
    color: #9b9b9b;
    font-weight: 300;
    font-size: 25px;
  }
  .search-lists ul li{
    background: #fff;
    box-shadow: 1px 1px 2px #a5a5a5;
    margin-bottom: 20px;
  }
  .search-lists .article-top a{
    display: inline-block;
    font-size: 24px;
    color: #27CCC0;
    font-weight: 500;
  }
  .article-top{
    padding: 20px 0;
    border-bottom: 1px solid #d1d1d1;
  }
  .article-bottom{
    padding: 15px 0;
    line-height: 24px;
  }
  .article-bottom span{
    display: inline-block;
    font-size: 14px;
  }
  .article-bottom a{
    transition: all .3s;
  }
  .article-bottom a:hover{
    color: #27CCC0;
  }
  .article-bottom .rMore{
    font-family: 'englishFont' !important;
    display: block;
    font-size: 12px;
    background: #333;
    color: #fff !important;
    border-radius: 2px;
    width: 100px;
    height: 24px;
    line-height: 24px;
    text-align: center;
    transition: all .3s;
  }
  .article-bottom .rMore:hover{
    color: #fff;
    background: #27CCC0;
  }
  .article-recent h2{
    color: #999;
    font-family: 'Open Sans';
    font-size: 12px;
    letter-spacing: 2px;
    text-transform: uppercase;
    margin-bottom: 10px;
  }
 .article-recent li{
    font-size: 12px;
    color: #27CCC0;
    padding:10px 0;
    border-bottom: 1px solid #e6e6e6;
  }
  .right a:hover{
    color: #555555 !important;
  }
</style>
