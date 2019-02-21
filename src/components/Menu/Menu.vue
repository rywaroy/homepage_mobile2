<template>
  <menu class="menu">
    <div class="menu__box"></div>
    <div class="menu__user">
      <div class="menu__user-avatar"></div>
    </div>
    <div class="menu__list m-scroll">
      <ul>
        <li class="menu__list-item active">
          <i class="menu__list-icon learn"></i>
          <span class="menu__list-txt">学习笔记</span>
        </li>
        <li class="menu__list-item">
          <i class="menu__list-icon article"></i>
          <span class="menu__list-txt">日志</span>
        </li>
        <li class="menu__list-item">
          <i class="menu__list-icon album"></i>
          <span class="menu__list-txt">相册</span>
        </li>
        <li class="menu__list-item">
          <i class="menu__list-icon think"></i>
          <span class="menu__list-txt">说说</span>
        </li>
        <li class="menu__list-item">
          <i class="menu__list-icon one"></i>
          <span class="menu__list-txt">ONE · 一个</span>
        </li>
        <li class="menu__list-item">
          <i class="menu__list-icon huaban"></i>
          <span class="menu__list-txt">花瓣相册</span>
        </li>
        <li class="menu__list-item">
          <i class="menu__list-icon zhihu"></i>
          <span class="menu__list-txt">知乎日报</span>
        </li>
        <li class="menu__list-item">
          <i class="menu__list-icon douban"></i>
          <span class="menu__list-txt">豆瓣电影</span>
        </li>
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
