<template>
  <menu class="menu">
    <div class="menu__box"></div>
    <div class="menu__user">
      <div class="menu__user-avatar"></div>
    </div>
    <div class="menu__list m-scroll">
      <ul>
        <!-- <router-link tag="li" :to="{name: 'learn'}" class="menu__list-item">
          <i class="menu__list-icon learn"></i>
          <span class="menu__list-txt">学习笔记</span>
        </router-link> -->
        <router-link tag="li" :to="{name: 'article'}" class="menu__list-item">
          <i class="menu__list-icon article"></i>
          <span class="menu__list-txt">日志</span>
        </router-link>
        <router-link tag="li" :to="{name: 'album'}" class="menu__list-item">
          <i class="menu__list-icon album"></i>
          <span class="menu__list-txt">相册</span>
        </router-link>
        <!-- <router-link tag="li" :to="{name: 'think'}" class="menu__list-item">
          <i class="menu__list-icon think"></i>
          <span class="menu__list-txt">说说</span>
        </router-link> -->
        <router-link tag="li" :to="{name: 'game'}" class="menu__list-item">
          <i class="menu__list-icon game"></i>
          <span class="menu__list-txt">小游戏</span>
        </router-link>
        <!-- <router-link tag="li" :to="{name: 'one'}" class="menu__list-item">
          <i class="menu__list-icon one"></i>
          <span class="menu__list-txt">ONE · 一个</span>
        </router-link>
        <router-link tag="li" :to="{name: 'huaban'}" class="menu__list-item">
          <i class="menu__list-icon huaban"></i>
          <span class="menu__list-txt">花瓣相册</span>
        </router-link>
        <router-link tag="li" :to="{name: 'zhihu'}" class="menu__list-item">
          <i class="menu__list-icon zhihu"></i>
          <span class="menu__list-txt">知乎日报</span>
        </router-link>
        <router-link tag="li" :to="{name: 'douban'}" class="menu__list-item">
          <i class="menu__list-icon douban"></i>
          <span class="menu__list-txt">豆瓣电影</span>
        </router-link> -->
      </ul>
    </div>
  </menu>
</template>

<script>
export default {

};
</script>

<style>
@import './menu.css';
</style>
