<template>
  <div>
    <my-header title="小游戏"></my-header>
    <div class="m-content scroll">
      <ul class="game__list">
        <router-link tag="li" :to="{name: 'popStar'}" class="game__item popstar">消灭方块</router-link>
        <router-link tag="li" :to="{name: 'knifeHit'}" class="game__item knifehit">爱的魔力转圈圈</router-link>
        <router-link tag="li" :to="{name: 'stupidBird'}" class="game__item stupidbird">stupid bird</router-link>
        <router-link tag="li" :to="{name: 'gobang'}" class="game__item gobang">五子棋2.0</router-link>
        <router-link tag="li" :to="{name: 'jump'}" class="game__item jump">Jump Jump</router-link>
      </ul>
    </div>
  </div>
</template>

<script>
import Header from '@/components/Header/Header.vue';

export default {
  components: {
    MyHeader: Header,
  },
};
</script>

<style>
@import './game.css';
</style>
