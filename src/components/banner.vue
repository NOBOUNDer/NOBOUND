<template>
  <div id="banner" class="container-fluid" :style="{textAlign:this.$parent. bannerTitleAlign}">
     <div class="container">
       <h1 class="mb-2">{{banner.keyword}}</h1>
       <p>{{banner.description}}</p>
     </div>
  </div>
</template>

<script>
  import config from './config'
    export default {
        name: "banner",
      data(){
        return {banner:[]}
      },
      methods:{
        getBanner(){
          this.$axios.get(`${config.server}/api/changeNavList`,{params:{nav_id:this.$route.params.id}}).then(resp=>{
            this.banner=resp.data[0];
          })
        }
      },
      created(){
          this.getBanner();
      }
    }
</script>

<style scoped>
  @media screen and (max-width: 992px) {
    h1{
      font-size: 32px !important;
    }
    p{
      font-size: 22px!important;
    }
  }
  @media screen and (max-width: 768px) {
    h1{
      font-size: 24px !important;
    }
    p{
      font-size: 15px!important;
    }
  }
  #banner{
    color: #fff;
  }
  h1{
    font-size: 36px;
    font-family: "Open Sans";
  }
  p{
    font-size: 24px;
    font-family: 微软雅黑;
    font-weight: 300;
  }
</style>
