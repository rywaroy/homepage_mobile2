import Vue from 'vue';
import Vuex from 'vuex';

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
});
