<template>
  <div>
    <div id="Tibet" class="container-fluid presentation" :style="{transform:`translateX(${this.store.state.topRight})`,transition:'all .7s ease .2s'}">
      <div class="presentation-top p-0">
        <div class="tibet-top-title presentation-top-title row align-items-center">
          <banner/>
        </div>
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
    name: "Tibet",
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
  .tibet-top-title{
    background: url('../../static/img/lilys-diary-tibet.jpg') no-repeat top;
  }
</style>

