<template>
  <div class="comment">
    <div class="comment__top">
      <div class="comment__user">
        <div class="comment__avatar bg-cover" v-if="avatar" :style="{backgroundImage:`url(${avatar})`}"></div>
        <div class="comment__name">{{name}}</div>
      </div>
      <div class="comment__time">{{time | time}}</div>
    </div>
    <div class="comment__content">{{content}}</div>
  </div>
</template>
<style>
  @import './commentitem.css';
</style>
<script>
export default {
  props: {
    avatar: {
      type: String,
    },
    name: {
      type: String,
    },
    time: {
      type: [String, Number],
    },
    content: {
      type: String,
    },
  },
};
</script>
