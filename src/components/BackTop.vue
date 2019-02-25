<template>
    <div id="backTop" v-on:click="move">
      <i class="fa fa-angle-up"></i>
    </div>
</template>

<script>
  let T;
    export default {
        name: "BackTop",
      methods:{
        move() {
          let tops=document.documentElement.scrollTop||document.body.scrollTop;
          function top(){
            tops=parseInt(tops-document.documentElement.scrollTop/10);
            if (tops<=0){
              clearInterval(T);
            }
            document.documentElement.scrollTop=tops||document.body.scrollTop;
          }
          T=setInterval(top,30);
        },
        scrollTop(){
          let tops=document.documentElement.scrollTop||document.body.scrollTop;
          if (tops > 200) {
            document.getElementById('backTop').style.bottom='30px';
          }else{
            document.getElementById('backTop').style.bottom='';
          }
        }
      },
      mounted(){
        window.addEventListener("scroll",this.scrollTop)
      }
    }
</script>

<style scoped>
  @media screen and (max-width: 768px){
    #backTop{
      display:none !important;
    }
  }
#backTop{
  cursor: pointer;
  width: 32px;
  height: 32px;
  position: fixed;
  right: 30px;
  bottom: -32px;
  background: rgba(0, 0, 0, 0.23);
  border-radius: 3px;
  transition: all .3s;
  z-index: 111111;
}
#backTop:hover{
  background: #27CCC0;
}
  .fa-angle-up{
    color: #fff;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translateX(-50%) translateY(-50%);
  }
</style>
