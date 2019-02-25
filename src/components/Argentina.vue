<template>
  <div>
    <div id="Argentina" class="container-fluid" :style="{transform:`translateX(${this.store.state.topRight})`,transition:'all .7s ease .2s'}">
      <div class="lilys-lists container">
        <ul class="row justify-content-start">
          <li v-for="(v,index) in ImgData" class="row col-12 col-md-6 col-lg-3 no-gutters mb-4">
            <div class="lilys-img-box col-12">
              <div class="shade position-absolute col-12 p-0">
                <span @click="ViewLarger(index)">View Larger</span>
              </div>
              <img :src="v.banner" v-on:click="ViewLarger(index)" class="col-12 p-0" alt="">
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
  import  config from "./config"
  export default {
    name: "Argentina",
    components: {Footer, Header, Banner, ViewLarger},
    data(){
      return {
        ImgData:[],
        swiperOpacity:'tests',
        swiperIndex:'test2',
        swiperSon:'test3',
        bannerTitleAlign:'left',
        bottom:(188+document.documentElement.clientHeight/2+10)+'px',
        store:this.$store,
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
      paginationTop(){
        this.store.commit('changePaginationTop',{
          PT:'-25px'
        })
      },
      /*获得图片文章信息*/
      getLilyIfo(){
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
      this.getLilyIfo();
    },
    mounted(){
      this.headerStyle();
      this.paginationTop();
    }
  }
</script>

<style scoped>
  @media screen and (min-width: 992px){
    .lilys-img-box .shade{
      z-index: 11;
      opacity: 0;
      height: 100%;
      background: rgba(39, 204, 192, 0.8);
      transition: all .3s;
    }
    .lilys-img-box .shade span{
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
    .lilys-img-box:hover>.shade{
      opacity: 1;
    }
    .lilys-img-box:hover>.shade>span{
      top: 50%;
    }
  }
  @media screen and (max-width: 992px){
    .shade{
      display: none !important;
    }
    #Argentina{
      padding-top: 65px !important;
    }
  }
  html, body {
    position: relative;
    height: 100%;
  }
  #Argentina{
    background: #f8f8f8;
    padding-top: 110px;
  }
  .lilys-lists span{
    font-family: 'englishFont' !important;
    font-size: 17px;
    font-weight: 500;
  }
  .lilys-lists{
    margin-top: 50px;
    padding-bottom: 50px;
  }
  .lilys-img-box{
    position: relative;
  }
  .lilys-img-box img{
    cursor: pointer;
  }
  .lilys-description{
    font-size: 13px;
    color: #4e4e4e;
    margin-top: 72px;
  }
</style>

