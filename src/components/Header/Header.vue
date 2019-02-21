<template>
  <div class="header">
    <div class="header__back">
      <div class="header__back-icon" v-if="back" @click="goBack()"></div>
    </div>
    <div class="header__title text-ovh">{{title}}</div>
    <div class="header__menu" @click="openMenu()"></div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: '',
    },
    back: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    openMenu() {
      this.$store.commit('showMenu', !this.isShowMenu);
    },
    goBack() {
      this.$router.go(-1);
    },
  },
  computed: {
    isShowMenu() {
      return this.$store.state.isShowMenu;
    },
  },
};
</script>

<style>
@import './header.css';
</style>
