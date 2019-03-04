<template>
  <div>
    <div id="lilys-diary" class="container-fluid presentation" :style="{transform:`translateX(${this.store.state.topRight})`,transition:'all .7s ease .2s'}">
    <div class="presentation-top p-0">
      <div class="lilys-top-title presentation-top-title row align-items-center">
        <banner/>
      </div>
    </div>
    <div class="lilys-description container">
      Lily，80后，从西安来到北京，从事法律行业。外表柔弱，内心强大，心思细腻，情感丰富。工作强度大，花光了所有的积蓄去南极。
    </div>
    <div class="presentation-lists container">
      <ul class="row justify-content-start">
        <li v-for="(v,index) in ImgData" class="row col-12 col-md-6 col-lg-4 no-gutters mb-4">
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
        name: "lilysDiary",
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
  .lilys-description{
    font-size: 13px;
    color: #4e4e4e;
    margin-top: 72px;
  }
  .lilys-top-title{
    background: url('../../static/img/lilys-diary.jpg') no-repeat top;
  }
</style>
