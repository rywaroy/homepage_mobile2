<template>
  <div>
    <my-header title="知乎日报" :back="true"></my-header>
    <div class="m-content scroll single__box">
      <div class="single__title">{{title}}</div>
      <img :src="image | getImgUrl" alt="" class="zhihu__info-img" width="100%">
      <div class="single__content" v-html="content"></div>
      <div class="comment__box">
        <div class="comment__box-title">评论</div>
        <commentItem v-for="(item,index) in comment" :key="index" :name="item.author" :time="item.time" :content="item.content" :avatar="item.avatar | getImgUrl"></commentItem>
      </div>
    </div>
  </div>
</template>

<script>
import Header from '@/components/Header/Header.vue';
import CommentItem from '@/components/CommentItem/CommentItem.vue';
import { apiGetZhihuInfo, apiGetZhihuComment } from '@/api/api';

export default {
  name: 'zhihuInfo',
  data() {
    return {
      content: '',
      image: '',
      title: '',
      comment: [],
    };
  },
  mounted() {
    this.getInfo();
    this.getComment();
  },
  methods: {
    getInfo() {
      apiGetZhihuInfo(this.$route.params.id)
        .then(res => {
          const body = res.data.data.body;
          const content = body.replace(/http\w{0,1}:\/\/pic/g, 'https://images.weserv.nl/?url=pic');
          this.content = content;
          this.image = res.data.data.image;
          this.title = res.data.data.title;
        });
    },
    getComment() {
      apiGetZhihuComment(this.$route.params.id)
        .then(res => {
          this.comment = res.data.data.comments;
        });
    },
  },
  components: {
    MyHeader: Header,
    CommentItem,
  },
};
</script>

<style>
@import './zhihuinfo.css';
</style>
