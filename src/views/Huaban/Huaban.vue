<template>
  <div>
    <my-header title="花瓣相册"></my-header>
    <div class="m-content scroll" id="scroll">
      <ul v-if="list.length > 0">
        <li class="huaban__item" v-for="item in list" :key="item.img">
          <img v-lazy="item.img" width="100%">
        </li>
      </ul>
    </div>
    <div class="huaban__refresh" @click="getList()"></div>
  </div>
</template>

<script>
import Header from '@/components/Header/Header.vue';
import { apiGetHuaban } from '@/api/api';

export default {
  data() {
    return {
      list: [],
    };
  },
  mounted() {
    this.getList();
  },
  methods: {
    getList() {
      this.$loading.open();
      apiGetHuaban()
        .then(res => {
          this.$loading.close();
          this.list = res.data.data;
          const scroll = document.getElementById('scroll');
          scroll.scrollTop = 0;
        }).catch(() => {
          this.$loading.close();
        });
    },
  },
  components: {
    MyHeader: Header,
  },
};
</script>

<style>
@import './huaban.css';
</style>
