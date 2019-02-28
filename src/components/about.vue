<template>
    <div id="about" class="container-fluid">
      <div class="container">
        <p class="col-12 ">暂未开放，敬请期待</p>
      </div>
    </div>
</template>

<script>
    export default {
        name: "about",
      data(){
          return {
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
      },
      created(){
          this.headerStyle();
      }
    }
</script>

<style scoped>
  #about{
    height: 500px;
    padding-top: 110px;
    position: relative;
  }
  p{
    text-align: center;
    position: absolute;
    top:50%;
    left: 50%;
    transform: translateY(-50%) translateX(-50%);
    font-weight: bold;
    color: #333;
  }
</style>
