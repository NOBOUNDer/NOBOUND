<template>
    <div id="loading" v-if="this.store.state.isShow" class="animated fadeOut">
      <img src="../../static/img/loading.gif" alt="">
    </div>
</template>

<script>
    export default {
        name: "loading",
      data(){
          return {
            store:this.$store,
          }
      }

    }
</script>

<style scoped>
 #loading{
   position: fixed;
   top: 0;
   left: 0;
   bottom:0;
   right: 0;
   z-index: 1111;
   background:#fff;
   opacity: .8;
 }
  img{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateX(-50%) translateY(-50%);
    opacity: .8;
  }
</style>
