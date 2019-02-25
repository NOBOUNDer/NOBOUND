<template>
    <div id="Links">
      <div class="wechat">
        <i class="fa fa-weixin"></i>
        <img src="../../static/img/wechat.jpg" alt="">
      </div>
      <a href="https://github.com/NOBOUNDer" target="_blank" class="gitHub"><i class="fa fa-github-square"></i></a>
    </div>
</template>

<script>
    export default {
        name: "Links",
      methods:{
          scrollRight(){
            let tops=document.documentElement.scrollTop||document.body.scrollTop;
            if (tops > 200) {
              document.getElementById('Links').style.right = '30px';
            }else{
              document.getElementById('Links').style.right='';
            }
          }
      },
      mounted(){
        window.addEventListener("scroll",this.scrollRight)
      }
    }
</script>

<style scoped>
  @media screen and (max-width: 768px){
    #Links{
      display:none !important;
    }
  }
  #Links{
    cursor: pointer;
    position: fixed;
    right: -40px;
    bottom: 96px;
    z-index: 111111;
    transition: all .3s;
  }
  .wechat{
    position: relative;
  }
  .wechat img{
    position: absolute;
    display: none;
    width: 150px;
    left: -170px;
    top: 50%;
    transform: translateY(-50%);
    box-shadow: 2px 2px 2px #cdcdcd;
  }
  .wechat:hover>img{
    display: block;
  }
  .fa{
    display: block;
    font-size: 32px;
    text-align: center;
    color: rgba(39, 204, 192, 0.23);
    transition: all .3s;
  }
  .fa:hover{
    color: #27CCC0;
  }
  .wechat,.gitHub{
    margin-bottom: 30px;
  }
</style>
