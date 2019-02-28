<template>
  <div>
    <my-header title="知乎日报"></my-header>
    <div class="m-content scroll zhihu__content">
      <ul>
        <li class="zhihu__item" v-for="(item, index) in list" :key="index" @click="link(item.id)">
          <img :src="item.images[0] | getImgUrl" width="100%">
          <p class="zhihu__item-title">{{item.title}}</p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import Header from '@/components/Header/Header.vue';
import { apiGetZhihu } from '@/api/api';

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
      apiGetZhihu()
        .then(res => {
          this.list = res.data.data.stories;
        });
    },
    link(id) {
      this.$router.push({ path: `/zhihu/${id}` });
    },
  },
  components: {
    MyHeader: Header,
  },
};
</script>

<style>
@import './zhihu.css';
</style>
