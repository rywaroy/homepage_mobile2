import Vue from 'vue';
import Vuex from 'vuex';
import blog from './modules/blog';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isShowMenu: false,
  },
  mutations: {
    showMenu(state, boolean = true) {
      state.isShowMenu = boolean;
    },
  },
  actions: {

  },
  modules: {
    blog,
  },
});
