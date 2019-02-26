<template>
  <div>
    <my-header title="相册"></my-header>
    <div class="m-content scroll">
      <ul class="album__content">
        <router-link tag="li" :to="{path:`/album/${item.id}`}" class="album__item" v-for="(item,index) in list" :key="index">
          <div class="album__item-img bg-cover" :style="{backgroundImage:`url(${item.img})`}"></div>
          <div class="album__item-title">{{item.title}}</div>
        </router-link>
      </ul>
    </div>
  </div>
</template>

<script>
import Header from '@/components/Header/Header.vue';
import { apiGetAlbum } from '@/api/api';

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
      apiGetAlbum()
        .then(res => {
          this.list = res.data.data;
        });
    },
  },
  components: {
    MyHeader: Header,
  },
};
</script>

<style>
@import './album.css';
</style>
