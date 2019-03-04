<template>
  <div>
    <div id="Argentina" class="container-fluid presentation" :style="{transform:`translateX(${this.store.state.topRight})`,transition:'all .7s ease .2s'}">
      <div class="presentation-lists container">
        <ul class="row justify-content-start">
          <li v-for="(v,index) in ImgData" class="row col-12 col-md-6 col-lg-3 no-gutters mb-4">
            <div class="presentation-img-box col-12">
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
  @import "../../static/css/picPresentation.css";
  @media screen and (max-width: 992px){
    #Argentina{
      padding-top: 65px !important;
    }
  }
  #Argentina{
    padding-top: 110px;
  }
</style>

