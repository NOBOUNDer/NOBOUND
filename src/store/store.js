import Vuex from "vuex";
import Vue from 'vue';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    topRight:'0',
    topLeft:'-300px',
    shadeBlock:'none',
    headerColor:'#27CCC0',
    headerNav:'#d1d1d1',
    headerShadow:'',
    headerBackground:'',
    navBtnHover:false,
    logo:'block',
    logo2:'none',
    swiper:document.body.clientHeight,
  },
  getters:{
    //getters 是对公共数据进行计算使用的    （getters相当于组件中的computed）
  },
  mutations:{
    //是对公共数据进行更改的地方  里面设置的是方法 （mutations相当于组件中的methods）
    changeTopLeft(state,data){
      state.topRight=data.right;
    },
    changeDisplay(state,data){
      state.shadeBlock=data.Dp;
    },
    changeHover(state,data){
      state.navBtnHover=data.nbh;
      this.commit('changeLogo')
    },
    changeHeader(state,data){
      console.log('进来')
      state.headerShadow=data.Hs;
      state.headerNav=data.Hn;
      state.headerBackground=data.Hbg;
    },
    changeLogo(state,data){
      if (state.navBtnHover){
        state.logo='block';
        state.logo2='none';
      }else{
        state.logo='none',
          state.logo2='block'
      }
    }
  },
  /*actions 是用来调用 mutations 里面的方法*/
  actions:{
    bbb(context,abc){
      //bbb 相当于方法名称
      //context相当于 store
      context.commit('aaa',abc);//相当于store.commit('aaa')
    }
  }
});

export default store;
