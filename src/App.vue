<template>
  <div id="app">
    <div :class="['main', {hide: isShowMenu}]">
      <transition :name="transitionName">
        <keep-alive exclude="learnInfo,articleInfo,albumGroup,oneInfo,zhihuInfo,doubanInfo,stupidBird,knifeHit,popStar,gobang">
          <router-view class="m-body"/>
        </keep-alive>
      </transition>
      <div class="app__mask" v-show="isShowMenu" @click="closeMenu()"></div>
    </div>
    <my-menu :class="{show: isShowMenu}"></my-menu>
  </div>
</template>

<script>
import Menu from '@/components/Menu/Menu.vue';
import { apiGetBase } from '@/api/api';

export default {
  data() {
    return {
      transitionName: '',
    };
  },
  mounted() {
    setTimeout(() => {
      document.getElementById('loading').classList.add('hide');
    }, 1000);
    setTimeout(() => {
      document.getElementById('loading').remove();
    }, 1500);
    apiGetBase();
  },
  methods: {
    closeMenu() { // 关闭菜单
      this.$store.commit('showMenu', false);
    },
  },
  computed: {
    isShowMenu() {
      return this.$store.state.isShowMenu;
    },
  },
  components: {
    MyMenu: Menu,
  },
  watch: {
    $route(to, from) {
      document.title = to.meta.title;
      if (!from.name || to.meta.level === from.meta.level) {
        this.transitionName = '';
      } else {
        this.transitionName = to.meta.level < from.meta.level ? 'slide-out' : 'slide-in';
      }
      if (this.isShowMenu) { // 判断菜单是否展开，展开则关闭
        this.closeMenu();
      }
    },
  },
};
</script>

<style>

</style>
