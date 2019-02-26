<template>
  <div>
    <my-header title="相册" :back="true"></my-header>
    <div class="m-content scroll">
      <ul>
        <li class="group__item" v-for="(item,index) in list" :key="index">
          <img v-lazy="item.url + '?imageView2/2/w/400/q/75'" width="100%">
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import Header from '@/components/Header/Header.vue';
import { apiGetAblumGroup } from '@/api/api';

export default {
  name: 'albumGroup',
  data() {
    return {
      list: [],
    };
  },
  mounted() {
    this.getInfo();
  },
  methods: {
    getInfo() {
      apiGetAblumGroup(this.$route.params.id)
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
  .group__item {
    padding: 0 15px;
    margin-bottom: 10px;
  }

  .group__item img {
    display: block;
  }
</style>
