<template>
    <div id="article" class="container-fluid" :style="{transform:`translateX(${this.store.state.topRight})`,transition:'all .7s ease .2s'}">
      <div class="container">
        <div class="article-top row justify-content-between mt-5">
          <div class="article-titleIfo col-lg-8 col-12 row">
            <h1 class="col-12">{{ArticleData.title}}</h1>
            <p class="col-12 justify-content-start">
              <span class="col-auto pl-0 border-left-0">by <a href="">{{ArticleData.author}}</a></span>
              <span class="col-auto ">{{crtTimeFtt(ArticleData.time)}}</span>
              <span class="col-auto "><a href=""> {{ClassifyData.navName}}</a></span>
            </p>
          </div>
          <div class="article-title-right row col-lg-4 col-12 mb-lg-0 mb-4 justify-content-lg-end align-items-center">
            <div class="col-auto pl-lg-0 ">
              <a   href="javascript:void (0)" @click="CommentsLocation"><i class="fa fa-comment-o" aria-hidden="true"></i> {{CommentsNum}} comments</a>
            </div>
           <div class="col-auto pl-lg-0">
             <a   href=""><i class="fa fa-heart-o" aria-hidden="true"></i> 7</a>
           </div>
            <div class="col-auto pl-lg-0 mt-sm-0 share">
              <a   href=""><i class="fa fa-share-alt-square"></i></a>
            </div>
          </div>
        </div>
        <div class="article-top-bottom col-12 px-0"></div>
        <div class="article-main mt-5 row justify-content-between">
          <div class="article-left col-lg-9 col-12 pr-lg-5">
            <div class="article-content col-12 px-0">
              <div class="ueditor" v-html="ArticleData.content"></div>
            </div>
            <div class="article-comments col-12 px-0" id="comments-location1">
              <div class="comments-content col-12 px-0">
                <h2>{{CommentsNum}} comments</h2>
                <ul>
                  <li v-for="(com,index) in CommentsData" :key="index" class="col-12 px-5 py-4">
                    <h3>{{com.author}}说道:</h3>
                    <span><a href="">{{crtTimeFtt(com.time)}}</a></span>
                    <p>
                      {{com.content}}
                    </p>
                    <span>[<a href="">回复</a>]</span>
                  </li>
                </ul>
              </div>
              <div class="comments-publish col-12 px-0" id="comments-location2">
                <h2>Leave a Reply</h2>
                <form action="">
                <textarea id="comment" name="comment" cols="45" rows="8" aria-required="true"></textarea>
                <div class="publisherIfo col-12">
                    <ul class="row justify-content-lg-between justify-content-center">
                      <li class="col-lg-4 col-12 mb-lg-0 mb-3 row px-0 justify-content-lg-end">
                        <h4 class="col-lg-11 col-12 px-0">Name <span>*</span></h4>
                        <div class="col-lg-11 col-12 px-0">
                          <input type="text" class="comment-author">
                        </div>
                      </li>
                      <li class="col-lg-4 col-12 mb-lg-0 mb-3 row px-0 justify-content-lg-center">
                        <h4 class="col-lg-11 col-12 px-0">Emial <span>*</span></h4>
                        <div class="col-lg-11 col-12 px-0">
                          <input type="text" class="comment-email">
                        </div>
                      </li>
                      <li class="col-lg-4 col-12 mb-lg-0 mb-3 row  px-0 justify-content-lg-start">
                        <h4 class="col-lg-11 col-12 px-0">Website</h4>
                        <div class="col-lg-11 col-12 px-0">
                          <input type="text" class="comment-website">
                        </div>
                      </li>
                    </ul>
                </div>
                </form>
                <button type="button" v-on:click="UploadData">Submit Comment</button>
              </div>
            </div>
          </div>
          <div class="article-right col-lg-3 col-12">
            <div class="article-search row no-gutters mb-5">
                <input  class="col-9" type="text" placeholder="Search..." v-on:keyup="Keyword($event)">
                <router-link :to="'/Search/'+keyword" class="searchBtn col-3">Search</router-link>
            </div>
            <div class="article-classified mb-5">
              <h2 >分类目录</h2>
              <ul >
                <li v-for="(v,index) in AllClassify" :key="index">
                  <router-link :to="'/blogClassify/'+v.id">{{v.navName}}</router-link>
                  <p class="mb-0">({{BlogNum(v.id)}})</p>
                </li>
              </ul>
            </div>
            <div class="article-recent mb-5">
              <h2 >近期文章</h2>
              <ul >
                <li v-for="(recentBlog,index) in RecentBlog" :key="index"><router-link :to="'/article/'+recentBlog.id+'/'+recentBlog.pid">{{recentBlog.title}}</router-link></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
    let _this=this;
    import config from './config'
    import store from '../store/store'
    export default {
        name: "Article",
      data(){
          return {
            ArticleData:[],
            ClassifyData:[],
            AllClassify:[],
            CommentsData:[],
            CommentsNum:'',
            RecentBlog:[],
            AllBlog:[],
            keyword:'',
            bg:'#fff',
            color:'#27CCC0',
            h3:'#333',
            navColor:'#888',
            shadow:'1px 0 2px #333',
          }
      },
      computed:{
        store(){
          return this.$store;
        }
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
          //获取所有分栏
          getAllClassify(){
            this.$axios.get(`${config.server}/api/getAllClassify`).then((resp)=>{
              this.AllClassify=resp.data;
            })
          },
          //获取所有文章
          getAllBlogPid(){
            this.$axios.get(`${config.server}/api/getBlogPid`).then(resp=>this.AllBlog=resp.data);
          },
          //获取所有分栏文章数量
          BlogNum(id){
            let num=0;
            for (let article in this.AllBlog) {
              if (this.AllBlog[article].pid == id) {
                num=num+1;
              }
            }
            return num;
          },
          //获取文章父栏目
          getClassify(pid){
            this.$axios.get(`${config.server}/api/getClassify`,{params:{pid:pid}}).then((resp)=>{
              this.ClassifyData=resp.data[0]
            })
          },
          //获取当前文章
          getArticle(id){
            this.$axios.get(`${config.server}/api/getBlogArticle`,{params:{id:id}}).then((resp)=>{
              this.ArticleData=resp.data[0];
            })
          },
        //转换时间格式
        crtTimeFtt(val, row) {
          if (val != null) {
            var date = new Date(val);
            return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()+' '+date.getHours()+':'+date.getMinutes();
          }
        },
        //记录关键词,搜索跳转
        Keyword(el){
          this.keyword=el.target.value;
          if(el.keyCode=='13'){
            document.querySelector('.searchBtn').click()
          }
        },
        //上传评论信息
        UploadData(){
          let postData = this.$qs.stringify({
            pid:this.$route.params.id,
            title:this.ArticleData.title,
            content:$('#comment').val(),
            author:$(".comment-author").val(),
            email:$(".comment-email").val(),
            website:$(".comment-website").val(),
          });
          this.$axios.post(`${config.server}/api/uploadComments`, postData, {
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
          }).then(response=>{
            this.getComments(this.$route.params.id)
            $("form")[0].reset();
            document.querySelector('#comments-location2').scrollIntoView(true);
            document.documentElement.scrollTop=document.documentElement.scrollTop-130;
          }).catch(e=>alert('失败'))
        },
        //获取评论信息
        getComments(id){
            this.$axios.get(`${config.server}/api/getComments`,{params:{pid:id}}).then((resp)=>{this.CommentsData=resp.data,this.CommentsNum=resp.data.length})
        },
        //跳转到评论
        CommentsLocation(){
          document.querySelector('#comments-location1').scrollIntoView(true);
          document.documentElement.scrollTop=document.documentElement.scrollTop-110;
        },
        //获取近期文章
        getRecentBlog(){
          this.$axios.get(`${config.server}/api/getRecentBlog`,{params:{type:9}}).then((resp)=>{
            this.RecentBlog=resp.data;
          })
        },
      },
      created(){
        let id=this.$route.params.id;
        let pid=this.$route.params.pid;
        this.getAllBlogPid();
        this.getArticle(id);
        this.getClassify(pid);
        this.getAllClassify();
        this.getComments(id);
        this.getRecentBlog();
      },
      mounted(){
        this.headerStyle();
      },
      beforeRouteUpdate(to,from,next) {
        this.getArticle(to.params.id);
        this.getClassify(to.params.pid);
        this.getComments(to.params.id);
        next();
      }
    }
</script>

<style scoped>
  @media screen and (max-width: 992px){
    #article{
      padding-top: 65px !important;
    }
  }
  @media screen and (max-width: 480px){
    .comments-publish h2{
      font-size: 15px !important;
    }
    .share{
      margin-top: 15px;
    }
  }
  a{
    transition: all .5s;
  }
  a:hover{
    color: #27CCC0 !important;
  }
#article{
  padding-top: 110px;
  background: #f8f8f8;
}
.article-top-bottom{
  background: #d5d5d5;
  height: 1px;
}
.article-title-right a{
  display: block;
  text-align: center;
  font-size: 14px;
  padding: 12px 15px;
  border: 2px solid #cdcdcd;
  border-radius: 24px;
}
  .article-title-right a:hover{
    border-color:#27CCC0 ;
  }
.article-titleIfo p span{
  font-size: 13px;
  color: #a3a3a3;
  line-height: 17px;
  border-left: 1px solid #cdcdcd;
}
  h1{
    font-size:25px;
    color: #444;
    font-weight: bold;
    margin-bottom: 10px;
  }
  .article-content p{
    width: 100% !important;
  }
  .article-content{
    margin-bottom: 72px;
  }
  .comments-content{
    margin-bottom: 50px;
  }
  .comments-content li{
    margin-bottom: 20px;
    background: #fff;
    box-shadow: 2px 2px 3px #dbdbdb;
  }
  .article-comments  h2{
    font-family: 'englishFont' !important;
    font-weight: 600;
    text-transform: none;
    letter-spacing: -0.5px;
    line-height: 34px;
    font-size: 22px;
    margin-bottom: 20px;
  }
  .comments-content li h3{
    font-size: 13px;
    font-weight: 600;
  }
  .comments-content li span a{
    font-size: 12px;
    color: #afafaf;
  }
  .comments-content li p{
    font-size: 14px;
    margin: 10px 0;
    line-height: 20px;
    color: #4b4b4b;
  }
  .comments-content li span:last-of-type>a{
    color: #27CCC0;
  }
  .comments-content li span:last-of-type>a:hover{
    color: #4b4b4b !important;
  }
  .comments-publish textarea{
    max-width: 100%;
    width: 100%;
    padding: 10px!important;
    border-bottom: 1px solid #fff;
    font-family: 'Open Sans';
    font-weight: 400;
    font-size: 12px;
    line-height: 22px;
    color: #555;
    background: #efefef;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.09) inset;
    transition: all 0.2s linear;
    margin-bottom: 32px !important;
  }
  .publisherIfo{
    margin-bottom: 24px;
  }
  .publisherIfo h4{
    font-size: 15px;
    font-family: 'englishFont' !important;
  }
  .publisherIfo h4 span{
    color: #27CCC0;
  }
  .publisherIfo li input{
    padding: 10px!important;
    width: 100%;
    border-bottom: 1px solid #fff;
    font-family: 'Open Sans';
    font-weight: 400;
    font-size: 12px;
    line-height: 22px;
    color: #555;
    background-color: #efefef;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.09) inset;
    transition: all 0.2s linear;
  }
  .comments-publish button{
    line-height: 22px;
    padding: 5px 6px;
    background: #333;
    color: #fff;
    cursor: pointer;
    transition: all 0.2s linear 0s;
    font-size: 12px;
    border-radius: 2px;
    margin-bottom: 32px;
  }
  .comments-publish button:hover{
    background: #27CCC0;
    color: #fff;
  }
  .article-search input{
    padding: 10px!important;
    font-family: 'Open Sans';
    font-weight: 400;
    font-size: 12px;
    line-height: 22px;
    color: #555;
    background-color: #efefef;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.09) inset;
  }
  .article-right a:hover{
    color: #555555 !important;
  }
  .article-search a {
    text-align: center;
    line-height: 42px;
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
  .article-classified li p{
    margin-top: 5px;
    color: #333;
    font-size: 13px;
  }
</style>
