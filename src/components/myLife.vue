<template>
  <div>
    <div id="my-life" class="container-fluid presentation" :style="{transform:`translateX(${this.store.state.topRight})`,transition:'all .7s ease .2s'}">
      <div class="presentation-top p-0">
        <div class="my-life-top-title presentation-top-title row align-items-center">
          <banner/>
        </div>
      </div>
      <div class="continue-upload container">
        <h2 class="col-12">Continue uploading...</h2>
        <p class="col-12">持续更新...</p>
      </div>
      <div class="presentation-lists container">
        <ul class="row justify-content-start">
          <li v-for="(v,index) in ImgData" class="row col-12 col-md-6 col-lg-3 no-gutters mb-4">
            <div class="presentation-img-box col-12">
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
            swiperOpacity:'tests',
            swiperIndex:'test2',
            swiperSon:'test3',
            bannerTitleAlign:'right',
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
  @import "../../static/css/picPresentation.css";
  .my-life-top-title{
    background: url('../../static/img/L1004205-1.jpg') no-repeat center;
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
    font-family: 微软雅黑;
    font-size: 23px;
    line-height: 28px;
    padding-bottom: 36px;
    border-bottom: 1px solid #ddd;
    color: #4e4e4e;
  }
</style>
