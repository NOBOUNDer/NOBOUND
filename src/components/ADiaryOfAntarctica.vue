<template>
  <div>
    <div id="a-diary-of-antarctica" class="container-fluid" :style="{transform:`translateX(${this.store.state.topRight})`,transition:'all .7s ease .2s'}">
        <div class="p-0 antarctica-top">
          <div class="antarctica-top-title row align-items-center">
            <banner/>
          </div>
        </div>
        <div class="antarctica-lists container">
          <ul class="row justify-content-start">
            <li v-for="(v,index) in ImgData" class="row col-12 col-md-6 col-lg-4 no-gutters mb-4">
              <div class="antarctica-img-box col-12">
                <div class="shade position-absolute col-12 p-0">
                  <span v-on:click="ViewLarger(index)">View Larger</span>
                </div>
                <img :src="v.banner" v-on:click="ViewLarger(index)" class="col-12 p-0">
              </div>
            </li>
          </ul>
        </div>
      </div>
    <ViewLarger/>
  </div>
</template>

<script>
    import ViewLarger from "./ViewLarger";
    import Banner from "./banner";
    import Header from "./Header";
    import Footer from "./Footer";
    import config from './config'
    export default {
        name: "ADiaryOfAntarctica",
      components: {Footer, Header, Banner, ViewLarger},
      data(){
        return {
          ImgData:[],
          swiperOpacity:'tests',
          swiperIndex:'test2',
          swiperSon:'test3',
          width:'756px',
          height:'426px',
          bannerTitleAlign:'left',
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
            PT:'-20px'
          })
        },
        /*获得图片文章信息*/
        getAntarcticaIfo(){
          this.$axios.get(`${config.server}/api/getArticlePid`,{params:{pid:this.$route.params.id}}).then(resp=>{
            this.ImgData=resp.data;
          })
        },
        /*查看大图*/
        ViewLarger(id) {
          window.swiper.activeIndex=id;
          this.swiperOpacity="1";
          this.swiperIndex='1111';
          /*/!*强制更新，这样activeImg数据才会更新*!/
          this.$forceUpdate();*/
          setTimeout(()=>{
            this.swiperSon='1'
          },700)
        },
      },
      created(){
          this.getAntarcticaIfo();
      },
      mounted(){
          this.headerStyle();
          this.paginationTop();
      }
    }
</script>

<style scoped>
  @media screen and (min-width: 1474px){
    .antarctica-top-title{
      background-size: 100% auto !important;
    }
  }
  @media screen and (min-width: 940px) and (max-width: 992px){
    .antarctica-top-title{
      background-size: 100% auto !important;
    }
  }
  @media screen and (min-width: 992px){
    .antarctica-img-box .shade{
      z-index: 11;
      opacity: 0;
      height: 100%;
      background: rgba(39, 204, 192, 0.8);
      transition: all .3s;
    }
    .antarctica-img-box .shade span{
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
    .antarctica-img-box:hover>.shade{
      opacity: 1;
    }
    .antarctica-img-box:hover>.shade>span{
      top: 50%;
    }
  }
  @media screen and (min-width: 992px){
    .antarctica-top-title{
      height: 350px;
    }
  }
  @media screen and (max-width: 992px){
    .antarctica-top{
      height: 285px;
    }
    .antarctica-top-title{
      height: 220px;
      top: 65px;
    }
    .shade{
      display: none !important;
    }
  }
  @media screen and (max-width: 690px){
    .antarctica-top{
      height: 232px;
    }
    .antarctica-top-title{
      height: 167px;
      top: 65px;
    }
  }
  @media screen and (max-width: 480px){
    .antarctica-top{
      height: 205px;
    }
    .antarctica-top-title{
      height: 140px;
      top: 65px;
    }
  }
  html, body {
    position: relative;
    height: 100%;
  }
  #a-diary-of-antarctica{
    background: #f8f8f8;
  }
  .antarctica-lists span{
    font-family: 'englishFont' !important;
    font-size: 17px;
    font-weight: 500;
  }
  .antarctica-lists{
    margin-top: 50px;
    padding-bottom: 50px;
  }
  .antarctica-img-box{
    position: relative;
  }
  .antarctica-img-box img{
    cursor: pointer;
  }
  .antarctica-top-title{
    position:relative;
    background: url('../../static/img/antarctica.jpg') no-repeat center;
    background-size:auto 100%;
  }
</style>
