<template>
  <div>
    <div id="my-life" class="container-fluid" :style="{transform:`translateX(${this.store.state.topRight})`,transition:'all .7s ease .2s'}">
      <div class="my-life-top p-0">
        <div class="my-life-top-title row align-items-center">
          <banner/>
        </div>
      </div>
      <div class="continue-upload container">
        <h2 class="col-12">Continue uploading...</h2>
        <p class="col-12">持续更新...</p>
      </div>
      <div class="my-life-lists container">
        <ul class="row justify-content-start">
          <li v-for="(v,index) in ImgData" class="row col-12 col-md-6 col-lg-3 no-gutters mb-4">
            <div class="my-life-img-box col-12">
              <div class="shade position-absolute col-12 p-0">
                  <span @click="ViewLarger(index)">View Larger</span>
              </div>
              <img :src="v.banner" v-on:click="ViewLarger(index)" class="col-12 p-0" alt="">
            </div>
            <span class="col-12 mt-2">{{v.title}}</span>
          </li>
        </ul>
      </div>
    </div>
    <ViewLarger/>
  </div>
</template>

<script>
  import Banner from "./banner";
  import ViewLarger from "./ViewLarger";
  import Header from "./Header";
  import Footer from "./Footer";
  import config from './config';
  export default {
        name: "my-life",
    components: {Footer, Header, ViewLarger, Banner},
    data(){
          return {
            ImgData:[],
            activeImg:'',
            swiperOpacity:'tests',
            swiperIndex:'test2',
            swiperSon:'test3',
            width:'637px',
            height:'426px',
            bannerTitleAlign:'right',
            bottom:(213+document.documentElement.clientHeight/2+10)+'px',
            store:this.$store,
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
        paginationTop(){
          this.store.commit('changePaginationTop',{
            PT:'-40px'
          })
        },
        /*获得图片文章信息*/
          getMyLifeIfo(){
            this.$axios.get(`${config.server}/api/getArticlePid`,{params:{pid:this.$route.params.id}}).then(resp=>{
              this.ImgData=resp.data;
            })
          },
        /*查看大图*/
          ViewLarger(id) {
            window.swiper.activeIndex=id;
            this.swiperOpacity="1";
            this.swiperIndex='1111';
            /*强制更新，这样activeImg数据才会更新*/
            this.$forceUpdate();
            setTimeout(()=>{
              this.swiperSon='1'
            },700)
          },
      },
      created(){
          this.getMyLifeIfo();
      },
    mounted(){
          this.headerStyle();
          this.paginationTop();
    }
    }
</script>

<style scoped>
  @media screen and (min-width: 1474px){
    .my-life-top-title{
      background-size: 100% auto !important;
    }
  }
  @media screen and (min-width: 940px) and (max-width: 992px){
    .my-life-top-title{
      background-size: 100% auto !important;
    }
  }
  @media screen and (min-width: 992px){
    .my-life-img-box .shade{
      z-index: 11;
      opacity: 0;
      height: 100%;
      background: rgba(39, 204, 192, 0.8);
      transition: all .3s;
    }
    .my-life-img-box .shade span{
      padding: 10px 15px;
      font-size: 12px;
      font-family: 'englishFont' !important;
      background: #252525;
      border-radius: 5px;
      color: #fff;
      position: absolute;
      top: 30%;
      left: 50%;
      transform: translateY(-50%) translateX(-50%);
      transition: all .3s;
      cursor: pointer;
    }
    .my-life-img-box:hover>.shade{
      opacity: 1;
    }
    .my-life-img-box:hover>.shade>span{
      top: 50%;
    }
  }
  @media screen and (min-width: 992px){
    .my-life-top-title{
      height: 350px;
    }
  }
  @media screen and (max-width: 992px){
    .my-life-top{
      height: 285px;
    }
    .my-life-top-title{
      height: 220px;
      top: 65px;
    }
    .shade{
      display: none !important;
    }
  }
  @media screen and (max-width: 690px){
    .my-life-top{
      height: 232px;
    }
    .my-life-top-title{
      height: 167px;
      top: 65px;
    }
  }
  @media screen and (max-width: 480px){
    .my-life-top{
      height: 205px;
    }
    .my-life-top-title{
      height: 140px;
      top: 65px;
    }
  }
  .my-life-top-title{
    position:relative;
    background: url('../../static/img/L1004205-1.jpg') no-repeat center;
    background-size:auto 100%;
  }
  html, body {
    position: relative;
    height: 100%;
  }
  #my-life{
    background: #f8f8f8;
  }
  .continue-upload{
    text-align: center;
    margin-top: 72px;
  }
  .continue-upload h2{
    font-family: 'englishFont' !important;
    margin-bottom: 5px;
  }
  .continue-upload p{
    font-family: 'chineseFont' !important;
    font-size: 23px;
    line-height: 28px;
    padding-bottom: 36px;
    border-bottom: 1px solid #ddd;
    color: #4e4e4e;
  }
  .my-life-lists span{
    font-family: 'englishFont' !important;
    font-size: 17px;
    font-weight: 500;
  }
  .my-life-lists{
    margin-top: 36px;
    padding-bottom: 50px;
  }
  .my-life-img-box{
    position: relative;
  }
  .my-life-img-box img{
    cursor: pointer;
  }
</style>
