<template>
  <div>
    <my-header title="旋转拼图" :back="true"></my-header>
    <div class="m-content c-rotating__content">
      <div :class="`c-rotating__container type${type}`">
        <div class="c-rotating__box">
          <div v-for="(row, index) in list" :key="index" class="c-rotating__box-line">
            <div
              v-for="(col, i) in row"
              :key="i"
              :style="{ backgroundColor: col.color }"
              :class="['c-rotating__block', col.animation ? col.animation : '']"></div>
          </div>
        </div>
        <div class="c-rotating__btns">
          <div v-for="(row, i) in btns" :key="i" class="c-rotating__btns-line">
            <div
              v-for="(col, j) in row"
              :key="j"
              class="c-rotating__btn"
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
      type: 6,
      list: [],
      colors,
      isAnimation: false,
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
          list[i].push({
            color: this.colors[i][j],
            animation: false,
          });
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
      b1.animation = false;
      b2.animation = false;
      b3.animation = false;
      b4.animation = false;
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
      if (this.isAnimation) {
        return;
      }
      this.isAnimation = true;
      this.animation(i, j);
      setTimeout(() => {
        this.run(i, j);
        if (this.veri()) {
          this.$msg({
            message: '牛啊',
            confirmButtonText: '重新开始',
            cancelButtonText: '离开',
            showCancelButton: true,
          }).then(action => {
            if (action === 'confirm') {
              this.create();
              this.disrupt();
            }
            if (action === 'cancel') {
              this.$router.go(-1);
            }
          });
        }
        this.isAnimation = false;
      }, 300);
    },
    animation(i, j) {
      this.list[i][j].animation = 'r1';
      this.list[i][j + 1].animation = 'r2';
      this.list[i + 1][j + 1].animation = 'r3';
      this.list[i + 1][j].animation = 'r4';
    },
    veri() {
      for (let i = 0; i < this.list.length; i += 2) {
        for (let j = 0; j < this.list[i].length; j += 2) {
          const color = this.list[i][j].color;
          if (color !== this.list[i][j + 1].color
            || color !== this.list[i + 1][j].color
            || color !== this.list[i + 1][j + 1].color
          ) {
            return false;
          }
        }
      }
      return true;
    },
  },
};
</script>
<style>
@import './rotating.css';
</style>
