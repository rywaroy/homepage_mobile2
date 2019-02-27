<template>
  <div>
    <my-header :title="`ONE · ${typeName}`" :back="true"></my-header>
    <div class="m-content scroll single__box">
      <div class="single__title">{{title}}</div>
      <div class="single__author">{{author}}</div>
        <div class="single__content" v-html="content"></div>
    </div>
  </div>
</template>

<script>
import Header from '@/components/Header/Header.vue';
import { apiGetOneInfo } from '@/api/api';

export default {
  name: 'oneInfo',
  data() {
    return {
      title: '',
      typeName: '',
      content: null,
      author: '',
    };
  },
  mounted() {
    this.getInfo();
  },
  methods: {
    getInfo() {
      let type;
      switch (this.$route.params.type) {
        case '1':
          type = 'essay';
          this.typeName = '阅读';
          break;
        case '2':
          type = 'serialcontent';
          this.typeName = '连载';
          break;
        case '3':
          type = 'question';
          this.typeName = '问答';
          break;
        case '4':
          type = 'music';
          this.typeName = '音乐';
          break;
        case '5':
          type = 'movie';
          this.typeName = '影视';
          break;
        default:
          type = 'essay';
          this.typeName = '阅读';
      }
      apiGetOneInfo(type, this.$route.params.id)
        .then(res => {
          let content;
          const data =res.data.data;
          data.html_content.replace(/<div class="one-content-box">[\s\S]*?<\/div>/, data => {
            content = data;
          });
          this.title = data.title;
          this.content = content;
          this.author = data.author_list[0].user_name;
        });
    },
  },
  components: {
    MyHeader: Header,
  },
};
</script>

<style>

</style>
