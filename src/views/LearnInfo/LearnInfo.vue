<template>
  <div>
    <my-header :title="info.title" :back="true"></my-header>
    <div class="m-content scroll">
      <div class="learn-content text-break markdown-body" v-html="info.html"></div>
    </div>
  </div>
</template>

<script>
import Header from '@/components/Header/Header.vue';
import { apiGetLearnInfo } from '@/api/api';

export default {
  name: 'learnInfo',
  data() {
    return {
      info: {},
    };
  },
  mounted() {
    this.getInfo();
  },
  methods: {
    getInfo() {
      apiGetLearnInfo(this.$route.params.id)
        .then(res => {
          this.info = res.data.data;
        });
    },
  },
  components: {
    MyHeader: Header,
  },
};
</script>

<style>
@import './markdown.css';
@import './learninfo.css';
</style>
