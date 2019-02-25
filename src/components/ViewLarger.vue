<template>
  <div class="swiper" :style="{opacity:this.$parent.swiperOpacity,zIndex:this.$parent.swiperIndex}">
    <div class="swiper-container" >
      <div class="swiper-wrapper" :style="{opacity:this.$parent.swiperSon}">
        <div class="swiper-slide" v-for="(vv,index) in ImgData" :key="index">
          <img :src="vv.banner" alt="">
        </div>
        <!-- Add Pagination -->
        <div class="pagination" :style="{top:this.store.state.paginationTop}">
          <div class="close-swiper">
            <i class="fa fa-close" @click="close()" ></i>
          </div>
          <div class="swiper-pagination swiper-pagination-white" :style="{opacity:this.$parent.swiperSon}"></div>
        </div>
      </div>
    </div>
    <!-- Add Arrows -->
    <div class="swiper-button-next swiper-button-white" :style="{opacity:this.$parent.swiperSon}"></div>
    <div class="swiper-button-prev swiper-button-white" :style="{opacity:this.$parent.swiperSon}"></div>
  </div>
</template>

<script>
  import Swiper from 'swiper';
  import config from './config'
    export default {
        name: "ViewLarger",
      data(){
        return {
          ImgData:[],
          store:this.$store,
        }
      },
      methods:{
        /*获得图片文章信息*/
        getMyLifeIfo(){
          this.$axios.get(`${config.server}/api/getArticlePid`,{params:{pid:this.$route.params.id}}).then(resp=>{
            this.ImgData=resp.data;
            window.swiper = new Swiper('.swiper-container', {
              effect:'fade',
              initialSlide:0,
              observer:true,//修改swiper自己或子元素时，自动初始化swiper
              observeParents:true,//修改swiper的父元素时，自动初始化swiper
              pagination: {
                el: '.swiper-pagination',
                type:'fraction',
              },
              navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
              },
            });
          })
        },
        /*关闭查看大图*/
        close(){
          $(".swiper").css({opacity: '',zIndex: ''});
          this.$parent.swiperOpacity='';
          this.$parent.swiperIndex='';
          this.$parent.swiperSon='0';
        },
      },
      created(){
        this.getMyLifeIfo();
      },
    }
</script>

<style scoped>
  @media screen and (min-width: 1200px) {
    .swiper-container{
      width: 1000px !important;
      height: 610px !important;
    }
    .swiper-button-next{
      right: 27px !important;
    }
  }
  @media screen and (max-width: 1200px) {
    .swiper-container{
      width: 800px !important;
      height: 500px !important;
    }
  }
  @media screen and (max-width: 992px) {
    .swiper-container{
      width: 650px !important;
      height: 420px !important;
    }
  }
  @media screen and (max-width: 768px) {
    .swiper-container{
      width: 500px !important;
      height: 340px !important;
    }
  }
  @media screen and (max-width: 576px) {
    .swiper-container{
      width: 400px !important;
      height: 270px !important;
    }
  }
  @media screen and (max-width: 480px) {
    .swiper-container{
      width: 300px !important;
      height: 220px !important;
    }
  }
  html, body {
    position: relative;
    height: 100%;
  }
 .swiper{
   position: fixed;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.85);
   top: 0;
   left: 0;
   z-index: -2;
   opacity: 0;
  }
  .swiper-container {
    overflow: unset !important;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateX(-50%) translateY(-50%);
  }
  .swiper-wrapper,.swiper-pagination,.swiper-button-next,.swiper-button-prev{
    opacity: 0;
    transition: all .7s;
  }
  .swiper-wrapper{
    width: 100% !important;
    top: 50%;
    left:50%;
    transform: translateX(-50%) translateY(-50%);
  }
  .swiper-slide {
    width: 100% !important;
    position: relative;
    background-position: center;
    background-size: cover;
    overflow: hidden;
  }
  .swiper-slide img{
    width: 100% !important;
    display: block;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateX(-50%) translateY(-50%);
  }
  .swiper-pagination{
    width: unset;
    height: 19px;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    left: 0;
    color: #fff !important;
    font-size: 13px !important;
    font-family: 'englishFont' !important;
  }
  .close-swiper{
    position: absolute;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
    color: #fff;
    font-size: 21px;
  }
  .fa-close{
    transition: all .3s;
    transform-origin: center center;
    cursor: pointer;
  }
  .fa-close:hover{
    transform: rotate(90deg);
  }
  .pagination{
    width:100%;
    height:30px;
    z-index:111;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
  }
  .pagination:after{
    display: block;
    content: '';
    clear: right;
  }
  .swiper-button-next{
    right: 27px;
  }
</style>
