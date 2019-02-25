<template>
  <div class='header-container'>
    <div class="container-fluid" id="header" :style="{transform: `translateX(${this.store.state.topRight})`,background:this.store.state.headerBackground,boxShadow:this.store.state.headerShadow,transition:'all .7s ease .2s'}">
      <div class="container">
      <div class="row justify-content-between align-items-center">
        <div class="col-auto logo">
          <router-link to="/">
            <img src="../../static/img/logo2.png" alt="" class="logoImg" :style="{display:this.store.state.logo2}">
            <img src="../../static/img/logo.png" alt="" class="logoImg2" :style="{display:this.store.state.logo,height:this.store.state.logoHeight}">
          </router-link>
        </div>
        <nav class="row col-auto justify-content-start d-none d-md-none d-sm-none d-lg-flex d-xl-flex" :style="{color:this.store.state.headerNav}">
          <ul class="col-auto m-0">
            <li  class="nav-title navBtn" v-for="(v,index) in navData" :key="index" v-on:mouseover="navMouseOver(index)" v-on:mouseout="navMouseOut(index)" ref="navBtn">
              <router-link :to="{path:`${v.id>2?v.link+'/'+v.id:''}`}" >
                {{v.navName}}<i v-if="v.id<=2" class="fa fa-angle-down"></i>
              </router-link>
              <th class="navSon">
                <tr v-for="vv in navSon[index]">
                  <router-link :to="{path:`${vv.link}/${vv.id}`}">{{vv.navName}}</router-link>
                </tr>
              </th>
            </li>
          </ul>
          <span class="head-search row no-gutters col-auto" v-on:mouseover="searchOver($event)" v-on:mouseout="searchOut($event)" v-on:click="searchBoxShow"><i class="fa fa-search align-self-center" aria-hidden="true"></i></span>
        </nav>
        <div  class="navBox-btn col-auto d-xl-none d-lg-none"><i class="fa fa-reorder" @click="navBox"></i></div>
      </div>
    </div>
      <div class="search-box col-12 animated">
          <div class="container " style="height: 100%;">
            <div class="search-box-wrapper row justify-content-between align-items-center">
              <input class="col-10" type="text" placeholder="STARTING TYPING..." v-on:keyup="Keyword($event)" @blur="searchBoxHide">
              <i class="fa fa-close col-auto" v-on:click="searchBoxHide"></i>
              <router-link :to="'/Search/'+keyword" class="searchBtn d-none"></router-link>
            </div>
          </div>
        </div>
      <div class="navShade animated" :style="{display:this.store.state.shadeBlock,transition:'all .7s ease .2s'}" @click="closeRightNav">
      </div>
      <div class="right-nav" :style="{right:this.store.state.topLeft}">
        <i class="fa fa-close" @click="closeRightNav"></i>
        <ul class="right-main-nav animated">
          <li v-for="(v,index) in navData" :key="index">
            <router-link :to="{path:`${v.id>2?v.link+'/'+v.id:''}`}" @click.native="rightNavBtn(index)">
              {{v.navName}}
            </router-link>
          </li>
        </ul>
        <div class="rightNavSon animated">
          <div class="rightNavBack" @click="rightNavBack($event)">Back</div>
          <th v-for="vv in navSon">
            <tr v-for="(vvv,index) in vv" :key="index">
              <router-link :to="{path:`${vvv.link}/${vvv.id}`}" @click.native="rightNavSonBtn">{{vvv.navName}}</router-link>
            </tr>
          </th>
        </div>
      </div>
  </div>
  </div>
</template>

<script>
  import config from './config';
  let _this=this;
  let T=null;
  let T1=null;
  let T2=null;
  let navBoxBtn=true;
  import $ from 'jquery'
    export default {
      name: "Header",
      data() {
        return {
          navData: '',
          navId: [],
          navSon: [],
          fatherNav:'#fff',
          keyword:'',
        }
      },
      computed:{
        store(){
          return this.$store;
        }
      },
      methods: {
        //重置顶部导航样式
        headerStyle(){
          this.store.commit('changeHeader',{
            Hs:'',
            Hn:'',
            Hbg:'',
          });
          this.store.commit('changeHover',{
            nbh:false,
          });
        },
        searchOver(el){
          el.currentTarget.style.color=this.$parent.color?this.$parent.color:this.fatherNav;
        },
        searchOut(el){
          el.currentTarget.style.color=''
        },
        //父导航鼠标移入
        navMouseOver(index) {
          this.$nextTick(() => {
            clearTimeout(T);
            $(".navSon").css({opacity: "",display:''});
            $(".navBtn").css({color: ""});
            $(".navBtn").eq(index).css({color:this.store.state.topStyle?this.store.state.headerColor:this.fatherNav});
            this.$refs.navBtn[index].lastElementChild.style.display = "block";
            this.$refs.navBtn[index].lastElementChild.style.opacity = 1;
          })
        },
        //父导航鼠标移出
        navMouseOut(index) {
          let _this = this;
          clearTimeout(T);
          T = setTimeout(function () {
            _this.$nextTick(() => {
              $(".navBtn").eq(index).css({color:''});
            _this.$refs.navBtn[index].lastElementChild.style.display= "";
            _this.$refs.navBtn[index].lastElementChild.style.opacity = "";
            })
          }, 1000)
        },
        //获取父导航
        getNav(pid) {
          this.$axios.get(`${config.server}/api/getNavList`, {params: {pid: pid}}).then(res => {
              this.navData = res.data;
              for (var i = 0; i < res.data.length; i++) {
               this.getNavSelect(res.data[i].id)
            }
          });
        },
        //获取子导航
        getNavSelect(pid) {
          let header=this;
          $.ajax({
            url:`${config.server}/api/getNavLists`,
            type:'GET',
            async:false,    //或false,是否异步
            data:{
              pid:pid
            },
            success:function(res,e){
              header.navSon.push(res);
            }
          });
        },
        //顶部导航滚动固定
        scrollTop() {
          var stp = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
          if (stp > 0) {
            this.fatherNav='#27CCC0';
            this.store.commit('changeScroll',{
              HB:'#fff',
              HS:'1px 0 2px #333',
              Logo:'block',
              Logo2:'none',
              LH:'35px',
              HN:'#333',
            });
            $("#header").css({
              'position': 'fixed',
              'top': '0',
              'padding': '10px 0',
            });
            $(".navSon").css({top:'70px'});
          } else {
            this.fatherNav='#fff';
            setTimeout(()=> {
                this.store.commit('changeScroll',{
                  HB:this.store.state.topStyle?'#fff':'',
                  HS:this.store.state.topStyle?'1px 0 2px #333':'',
                  Logo:this.store.state.topStyle?'block':'none',
                  Logo2:this.store.state.topStyle?'none':'block',
                  LH:this.store.state.topStyle?'50px':'',
                  HN:this.store.state.topStyle?'#333':'#d1d1d1',
                });
                $("#header").css({
                  'position': '',
                  'top': '',
                  'padding': '',
                });
                $(".navSon").css({top: ''});
              }, 200);
          }
        },
        //显示搜索框
        searchBoxShow(){
          clearTimeout(T2);
          $(".search-box").removeClass('fadeOut');
          $(".search-box").addClass('fadeIn');
          $(".search-box").css({display: 'block'});
        },
        //隐藏搜索框
        searchBoxHide(){
          $(".search-box").removeClass('fadeIn');
          $(".search-box").addClass('fadeOut');
          T2=setTimeout(()=>{
            $(".search-box").css({display:''});
          },1000);
        },
        //记录关键词,搜索跳转
        Keyword(el){
          this.keyword=el.target.value;
          if(el.keyCode=='13'){
            document.querySelector('.searchBtn').click()
            this.searchBoxHide();
            el.target.value='';
          }
        },
        //显示侧边导航
        navBox(){
          if (navBoxBtn) {
            $('.navShade').removeClass('fadeOut');
            $('.navShade').addClass('fadeIn');
            this.store.commit('changeTopLeft',{
              right:'-300px'
            });
            this.store.commit('changeDisplay',{
              Dp:'block',
            });
            navBoxBtn=false;
          }else{
            $('.navShade').removeClass('fadeIn');
            $('.navShade').addClass('fadeOut');
            this.store.commit('changeTopLeft',{
              right:'0'
            });
            this.store.commit('changeDisplay',{
              Dp:'none'
            });
            navBoxBtn=true;
          }
        },
        //关闭侧边导航
        closeRightNav(){
          $('.navShade').removeClass('fadeIn');
          $('.navShade').addClass('fadeOut');
          this.store.commit('changeTopLeft',{
            right:'0'
          });
          setTimeout(()=>{
            this.store.commit('changeDisplay',{
              Dp:'none'
            });
          },1000);
          navBoxBtn=true;
        },
        navBox2(){
          let screenWidth=document.body.clientWidth;
          if (screenWidth > 960) {
            $('.navShade').removeClass('fadeIn');
            $('.navShade').addClass('fadeOut');
              this.store.commit('changeTopLeft',{
              right:'0'
            });
            setTimeout(()=>{
              this.store.commit('changeDisplay',{
                Dp:'none'
              });
            },1000);
            navBoxBtn=true;
          }
        },
        rightNavBtn(index){
          clearTimeout(T1)
          if (index <= 1) {
            $(".right-main-nav").removeClass('fadeInLeft');
            $(".right-main-nav").addClass('fadeOutLeft');
            $(".rightNavSon").removeClass('fadeOutRight');
            $(".rightNavSon").addClass('fadeInRight');
            $(".rightNavSon th").css({display:''});
            $(".rightNavSon th")[index].style.display='block';
            $(".rightNavSon").css({display:'block'})
          }else{
            $('.navShade').removeClass('fadeIn');
            $('.navShade').addClass('fadeOut');
            $(".rightNavSon th").css({display:''});
            $(".rightNavSon").css({display:''});
            $(".right-main-nav").css({display:''});
            this.store.commit('changeTopLeft',{
              right:'0'
            });
            setTimeout(()=>{
              this.store.commit('changeDisplay',{
                Dp:'none'
              });
            },1000);
            navBoxBtn=true;
          }
        },
        rightNavSonBtn(){
          $('.navShade').removeClass('fadeIn');
          $('.navShade').addClass('fadeOut');
          $(".rightNavSon th").css({display:''});
          $(".rightNavSon").css({display:''});
          $(".right-main-nav").removeClass('fadeOutLeft');
          $(".right-main-nav").addClass('fadeInLeft');
          this.store.commit('changeTopLeft',{
            right:'0'
          });
          setTimeout(()=>{
            this.store.commit('changeDisplay',{
                Dp:'none'
            });
          },1000);
          navBoxBtn=true;
        },
        rightNavBack(el){
          $(".rightNavSon").removeClass('fadeInRight');
          $(".rightNavSon").addClass('fadeOutRight');
          $(".right-main-nav").removeClass('fadeOutLeft');
          $(".right-main-nav").addClass('fadeInLeft');
          T1=setTimeout(()=>{
            el.target.parentElement.style.display='block';
            el.target.nextElementSibling.style.display='none';
          },1500)
        }
      },
      created() {
        this.getNav(0);
      },
      mounted() {
        //监听网页滚动
        window.addEventListener("scroll",this.scrollTop);
        window.addEventListener("resize",this.navBox2);
      }
    }
</script>

<style scoped>
  @media screen and (max-width: 992px) {
    .logoImg{
      display: none !important;
    }
    .logoImg2{
      height: 35px !important;
      display: inline-block !important;
    }
    #header{
      background: #fff !important;
      padding: 15px 0 !important;
      position: fixed !important;
      top: 0 !important;
      left: 0 !important;
      box-shadow: 1px 0 2px #333 !important;
    }
  }
  #header{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    padding: 25px 0;
    z-index: 111;
    margin-left: 0;
    transition: all .5s ease .3s;
  }
.logoImg{
  height: 50px;
  display: inline-block;
  transition: all .7s ease .2s;
}
.logoImg2{
  transition: all .7s ease .2s;
}
  nav{
    color: #d1d1d1;
    font-family: "W Sans New Book";
  }
  .navSon{
    z-index: -1111;
    display: none;
    background: #333;
    color: #d1d1d1;
    transition: all .5s;
    opacity: 0;
    position: absolute;
    top: 85px;
    left: -14px;
  }
  nav li{
    margin-left: 25px;
    height: 60px;
    line-height: 60px;
    font-size: 13px;
    display: inline-block;
    cursor: pointer;
    position: relative;
  }
  .head-search{
    cursor: pointer;
    transition: all .3s;
    position: relative;
  }
  .head-search:before{
    display: block;
    width: 1px;
    height: 20px;
    background: #888;
    content: '';
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    left: 0;
     }
  .head-search i{
    font-size: 20px;
  }
  .fa-angle-down{
    margin-left: 10px;
  }
  .fa-reorder{
    color: #a9a9a9;
    font-size: 22px;
    cursor: pointer;
    z-index: 112;
    padding-top: 5px;
  }
  .navSon{
    z-index: -1111;
    display: none;
    background: #333;
    color: #d1d1d1;
    transition: all .5s;
    opacity: 0;
    position: absolute;
    top: 85px;
    left: -14px;
  }
  .navSon tr a{
    width: 200px;
    line-height: normal;
    display: block;
    font-size: 12px;
    padding: 15px;
    border-bottom: 1px solid #737373;
    transition: all .3s;
  }
  .navSon tr a:hover{
    background: #4b4b4b;
    color: #27CCC0 !important;
  }
  .navSon tr:last-of-type>a{
    border-bottom: none;
  }
  .right-main-nav{
    position: absolute;
    top: 36px;
    left: 36px;
  }
  .right-nav{
    width:300px;
    height:100vh;
    position:absolute;
    top:0;
    transition:all .7s ease .2s;
    background:#27CCC0;
    z-index:11111;
    overflow: hidden;
  }
  .right-nav li,.right-nav tr{
    display: block;
    margin-bottom: 15px;
  }
  .right-nav a{
    font-family: 'englishFont' !important;
    color: rgba(255, 255, 255, 0.7) !important;
    font-weight: 600;
    font-size: 16px;
  }
  .right-nav a:hover{
    color: #fff !important;
    transition: all .3s;
  }
  .rightNavSon{
    position: absolute;
    top: 36px;
    left: 36px;
  }
  .rightNavSon{
    display: none;
  }
  .rightNavSon th{
    display: none;
  }
  .right-nav .fa-close{
    display: block;
    position: absolute;
    right: 20px;
    top: 15px;
    color: #fff;
    font-size: 24px;
    transform-origin: center center;
    transition: all .3s;
    cursor: pointer;
  }
  .right-nav .fa-close:hover{
    transform: rotate(90deg);
  }
  .rightNavBack{
    font-family: 'englishFont' !important;
    font-weight: 600;
    display: inline-block;
    width: 48px;
    height: 24px;
    line-height: 24px;
    font-size: 14px;
    text-align: center;
    background: rgba(0, 0, 0, 0.13);
    color: rgba(255, 255, 255, 0.7) !important;
    cursor: pointer;
    transform: translateY(-17px);
  }
  .rightNavBack:hover{
    transition: all .3s;
    color: #fff !important;
    background: rgba(0, 0, 0, 0.23);
  }
  .navShade{
    width: 100vw;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.71);
    transition:opacity .7s ease .2s;
    z-index: 111;
  }
  .search-box{
    background: #fff;
    position: absolute;
    height: 100%;
    top: 0;
    left:50%;
    transform: translateX(-50%);
    display: none;
    transition: all .3s linear;
  }
  .search-box-wrapper{
    font-size: 42px;
    font-weight: 700;
    color: #888;
    height: 100%;
  }
  .search-box-wrapper .fa-close{
    font-size: 30px;
    cursor: pointer;
    transition: all .3s;
  }
  .search-box-wrapper .fa-close:hover{
    color: #27CCC0;
  }
</style>
