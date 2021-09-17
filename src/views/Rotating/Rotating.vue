<template>
  <div>
    <my-header title="旋转拼图" :back="true"></my-header>
    <div class="m-content c-rotating__content">
      <div class="c-rotating__container">
        <div class="c-rotating__box">
          <div v-for="(row, index) in list" :key="index" class="c-rotating__box-line">
            <div v-for="(col, i) in row" :key="i" :style="{ backgroundColor: col}" class="c-rotating__block"></div>
          </div>
        </div>
        <div class="c-rotating__btns">
          <div v-for="(row, i) in btns" :key="i" class="c-rotating__btns-line">
            <div
              v-for="(col, j) in row"
              :key="j"
              class="c-rotating__btn"
              :style="{ left: `${j + 1.5}rem`, top: `${i + 1.5}rem`}"
              @click="change(i, j)">
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Header from '@/components/Header/Header.vue';
import colors from './colors';

export default {
  components: {
    MyHeader: Header,
  },
  data() {
    return {
      type: 4,
      list: [],
      colors,
    };
  },
  created() {
    this.create();
    this.disrupt();
  },
  methods: {
    create() {
      const list = [];
      for (let i = 0; i < this.type; i++) {
        list[i] = [];
        for (let j = 0; j < this.type; j++) {
          list[i].push(this.colors[i][j]);
        }
      }
      this.list = list;
      this.btns = [];
      for (let i = 0; i < this.type - 1; i++) {
        this.btns[i] = [];
        for (let j = 0; j < this.type - 1; j++) {
          this.btns[i].push('');
        }
      }
    },
    run(i, j) {
      const b1 = this.list[i][j];
      const b2 = this.list[i][j + 1];
      const b3 = this.list[i + 1][j + 1];
      const b4 = this.list[i + 1][j];
      const list = JSON.parse(JSON.stringify(this.list));
      list[i][j] = b4;
      list[i][j + 1] = b1;
      list[i + 1][j + 1] = b2;
      list[i + 1][j] = b3;
      this.list = list;
    },
    disrupt() {
      for (let k = 0; k < this.type * 5; k++) {
        const i = Math.floor(Math.random() * (this.type - 1));
        const j = Math.floor(Math.random() * (this.type - 1));
        this.run(i, j);
      }
    },
    change(i, j) {
      this.run(i, j);
    },
  },
};
</script>
<style>
@import './rotating.css';
</style>
