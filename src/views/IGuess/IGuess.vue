<template>
  <div>
    <my-header title="猜物品"></my-header>
    <div class="m-content scroll" id="scroll">
      <div class="guess__tip">
        <span class="guess__tip-link">游戏说明</span>
      </div>
      <div class="guess__answar">
        <div class="guess__answar-item" v-for="item in answar" :key="item.id">{{item.content}}</div>
      </div>
      <p class="guess__list-tip">点击选择</p>
      <div class="guess__list">
        <div class="guess__list-item" v-for="item in list" :key="item.tid">{{item.title}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import Header from '@/components/Header/Header.vue';

export default {
  data() {
    return {
      answar: [{ id: 1, content: '', gid: null }, { id: 2, content: '', gid: null }, { id: 3, content: '', gid: null }],
      list: [
        {
          gid: 1,
          title: '苹果',
          select: false,
        },
        {
          gid: 2,
          title: '香蕉',
          select: false,
        },
        {
          gid: 3,
          title: '牛奶',
          select: false,
        },
        {
          gid: 4,
          title: '雪梨',
          select: false,
        },
        {
          gid: 5,
          title: '橘子',
          select: false,
        },
        {
          gid: 6,
          title: '蛋糕',
          select: false,
        },
      ],
    };
  },
  mounted() {
  },
  methods: {
  },
  components: {
    MyHeader: Header,
  },
};
</script>

<style>
@import './iguess.css';
</style>
