<template>
    <div class="Home container-fluid" :style="{transform:`translateX(${this.store.state.topRight})`,transition:'all .7s ease .2s'}">
      <div class="row justify-content-center">
          <div class="banner">
            <img  class="col-12" src="../../static/img/EM580101.jpg" alt="">
          </div>
          <div class="container">
            <div class="row justify-content-center no-gutters">
              <div class="motto col-12">
                <h2>I’m a tourist of this world.</h2>
                <p>NOBOUND</p>
              </div>
              <div v-for="(v,index) in navData" class="column-box row col-12 no-gutters">
                <div class="column col-12">
                  <h2 >{{v.keyword}}</h2>
                  <p class="nav-title">{{v.description}}</p>
                </div>
                <div class="column-lists col-12">
                  <ul class="row justify-content-xl-start justify-content-lg-start justify-content-md-center">
                    <li v-for="vv in navSon[index]" class="row col-xl-4 col-lg-4 col-12 no-gutters pic-box">
                      <router-link  class="col-12" :to="vv.link+'/'+vv.id"><img :src="vv.navImg" alt=""></router-link>
                      <h4 class="col-12 " ><router-link :to="vv.link">{{vv.keyword}}</router-link></h4>
                      <span class="col-12 ">{{vv.description}}</span>
                    </li>
                  </ul>
                </div>
              </div>
              <div class="nobound col-12">
                <div class="nobound-title blog-title">
                  <h2>NOBOUND</h2>
                  <p class="nav-title">无边摄影</p>
                </div>
                <div class="column-lists col-12">
                  <ul class="row justify-content-xl-start justify-content-lg-start justify-content-md-center">
                    <li v-for="(bound,index) in Bound" class="row col-xl-4 col-lg-4 col-12 no-gutters pic-box">
                      <router-link  class="col-12" to="/nobound/3"><img :src="bound.banner" alt=""></router-link>
                      <h4 class="col-12 "><router-link to="/nobound/3" style="font-size: 16px;">{{bound.title}}</router-link></h4>
                    </li>
                  </ul>
                </div>
              </div>
              <div class="blog col-12">
                <div class="blog-title">
                  <h2>Blog (Chinese)</h2>
                  <p class="nav-title">中文博客</p>
                </div>
                <div class="blog-content">
                  <vue-waterfall-easy :imgsArr="BlogData" srcKey='cover' :gap=25 :mobileGap=20 :imgWidth=325 :maxCols="3">
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
              <div class="handpick-blog blog col-12">
                <div class="blog-title">
                  <h2>Featured Blogs</h2>
                  <p class="nav-title">精选博文</p>
                </div>
                <div class="handpick-blog-content" >
                  <vue-waterfall-easy :imgsArr="HandPickBlog" srcKey='cover' :gap=25 :mobileGap=20 :imgWidth=325 :maxCols="3">
                    <div class="img-info" slot-scope="props">
                      <div class="article-title">
                        <h2><router-link :to="'/article/'+props.value.id+'/'+props.value.pid">{{props.value.title}}</router-link></h2>
                        <p>
                          <span>By <a href="">{{props.value.author}}</a></span> |
                          <span><router-link :to="'/blogClassify/'+props.value.pid">{{ClassifyData[props.value.pid-1]?ClassifyData[props.value.pid-1].navName:''}}</router-link></span> |
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
            </div>
          </div>
        </div>
    </div>
</template>

<script>
    import Header from "./Header";
    import Footer from "./Footer";
    import vueWaterfallEasy from 'vue-waterfall-easy'
    import config from './config'
    export default {
        name: "Home",
      components: {Footer, Header,vueWaterfallEasy},
      data(){
        return {
          navData:[],
          navSon:[],
          BlogData:[],
          ClassifyData:[],
          HandPickBlog:[],
          AllComments:[],
          Bound:[],
          store:this.$store
        }
      },
      methods:{
        headerStyle(){
          this.store.commit('changeTopStyle',{
            TS:false,
          });
          this.store.commit('changeScroll',{
            HB:'',
            HS:'',
            Logo:'none',
            Logo2:'block',
            LH:'',
            HN:'#d1d1d1',
          });
        },
          //获取顶部导航(纪实，旅行，nobound)
          getTopNavs(){
            this.$axios.get(`${config.server}/api/getTopNavs?order=asc&type=2`).then(res=>{
              this.navData=res.data;
              for (var i = 0; i < res.data.length; i++) {
                this.getNavSelect(res.data[i].id)
              }
            });
          },
        //获取子导航
        getNavSelect(pid){
          this.$axios.get(`${config.server}/api/getNavLists`,{params:{pid:pid}}).then(res=>{this.navSon.push(res.data)})
        },
        //获取最新博客(可选获取条数)
        getBlog(){
          this.$axios.get(`${config.server}/api/getAllBlog`,{params:{type:'3',sort:'desc'}}).then((resp)=>{
            this.BlogData=resp.data;
          })
        },
        //获取所有分栏
        getClassify(){
          this.$axios.get(`${config.server}/api/getAllClassify`).then((resp)=>{
            this.ClassifyData=resp.data;
          })
        },
        //获取精选博文
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
        getNobound(){
          this.$axios.get(`${config.server}/api/getArticlePidNum`,{params:{pid:'3'}}).then((resp)=>{
            this.Bound=resp.data;
            console.log(resp.data);
          })
        },
        //转换时间格式
        crtTimeFtt(val, row) {
          if (val != null) {
            var date = new Date(val);
            return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()+' '+date.getHours()+':'+date.getMinutes();
          }
        },
      },
      created(){
          this.getTopNavs();
          this.getBlog();
          this.getClassify();
          this.getNobound();
          this.getHandpickBlog();
          this.getAllComments();
      },
      mounted(){
          this.headerStyle();
        window.addEventListener("resize",this.waterFall);
      }
    }
</script>

<style scoped>
  @media screen and (min-width: 992px){
    .pic-box{
      transition: all .3s;
    }
    .pic-box:hover{
      transform: translateY(-5px);
    }
  }
  @media screen and (max-width: 992px) {
    .Home{
      padding-top:55px !important;
    }
  }
  @media screen and (max-width: 1050px){
    .blog-content{
      height: 1400px !important;
    }
    .handpick-blog-content{
      height: 2500px !important;
    }
  }
  @media screen and (max-width: 700px){
    .blog-content{
      height: 2400px !important;
    }
    .handpick-blog-content{
      height: 4600px !important;
    }
  }
  .Home{
    transition: all .5s ease .3s;
  }
.banner{
  position: relative;
  max-height: 650px;
}
  .banner img{
    display: block;
    height: 100%;
    padding:0 ;
  }
  h2{
    text-align: center;
    font-family: 'englishFont' !important;
    margin-bottom: 5px;
  }
  .motto p{
    text-align: center;
    font-family: 'englishFont' !important;
    font-weight: 300;
    font-size: 20px;
  }
  .nav-title{
    text-align: center;
    font-family: 'chineseFont' !important;
    font-size: 20px;
  }
  .column-box,.motto{
    margin-top: 35px;
  }
  .column,.motto{
    padding-bottom: 36px;
    border-bottom: 1px solid #ddd;
  }
.column-lists li{
  margin-top: 50px;
  overflow: hidden;
}
.column-lists li>a:first-child{
  display: block;
}
.column-lists li img{
  width: 100%;
  display: block;
}
  h4 a{
    display: block;
    margin-top: 25px;
    font-size: 24px;
    font-family: sans-serif;
    font-weight: lighter;
  }
  .column-lists{
    color: #444;
  }
.column-lists span{
  font-size: 14px;
}
.column-box:last-of-type{
  margin-bottom: 50px;
}
.blog{
  margin-top: 36px;
}
.blog-content{
  height:1100px;
}
.handpick-blog-content{
  height: 1900px;
}
.blog-title{
  text-align: center;
  color: #444;
  border-bottom: 1px solid #ddd;
  padding-bottom: 36px;
  margin-bottom: 36px;
}
.blog-content ul{
  height: 1500px;
}
.img-info{
  padding: 20px;
}
.article-title h2 a{
  display: block;
  font-size: 22px !important;
  color: #27CCC0 !important;
  font-weight: 600;
  transition: all .3s;
  text-align: left;
}
.article-title h2 a:hover{
  color: #575757 !important;
}
.article-title p{
  margin: 5px 0 15px;
  font-size: 12px;
  color: #888;
}
.article-title p span{
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
  .nobound{
    margin-top: 36px;
  }
</style>
