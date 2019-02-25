<template>
  <div>
    <my-header :title="info.title" :back="true"></my-header>
    <div class="m-content scroll arti__content">
      <!-- <h2 class="arti__title">{{info.title}}</h2> -->
      <article class="arti__article text-break" v-html="info.content"></article>
      <div class="arti__write">
        <div :class="['arti__write-text',showCommentWrite ? 'active' : '']" @click="showCommentWrite = !showCommentWrite">添加评论</div>
      </div>
      <div class="arti__write-content" v-show="showCommentWrite">
        <input type="text" class="arti__input" placeholder="昵称，非必填" v-model="name">
        <textarea class="arti__textarea" placeholder="评论内容" v-model="content"></textarea>
        <div class="arti__btn" @click="send()">提交</div>
      </div>
      <div class="comment__box" v-if="comment.length > 0">
        <div class="comment__box-title">评论</div>
        <commentItem v-for="(item,index) in comment" :key="index" :name="item.name" :time="item.time" :content="item.content"></commentItem>
      </div>
    </div>
    <div class="arti__likes" @click="like()">
      <div :class="['arti__likes-icon', {active: isLike}]"></div>
      <div class="arti__likes-num">{{info.likes}}</div>
    </div>
  </div>
</template>

<script>
import Header from '@/components/Header/Header.vue';
import CommentItem from '@/components/CommentItem/CommentItem.vue';
import { apiGetArticleInfo, apiGetAricleComment, apiPostComment, apiPostArticleLike } from '@/api/api';

export default {
  name: 'articleInfo',
  data() {
    return {
      info: {},
      comment: [],
      showCommentWrite: false,
      name: '',
      content: '',
      isLike: false,
    };
  },
  mounted() {
    this.getInfo();
    this.getComment();
  },
  methods: {
    getInfo() {
      apiGetArticleInfo(this.$route.params.id)
        .then(res => {
          this.info = res.data.data;
        });
    },
    getComment() {
      apiGetAricleComment(this.$route.params.id)
        .then(res => {
          this.comment = res.data.data;
        });
    },
    send() {
      if (!this.content) {
        this.$toast('请输入评论内容');
        return;
      }
      apiPostComment({
        name: this.name,
        content: this.content,
        id: this.$route.params.id,
      }).then(() => {
        this.$toast('评论成功');
        this.name = '';
        this.content = '';
        this.showCommentWrite = false;
        this.getComment();
      });
    },
    like() { // 点赞
      if (this.isLike) {
        this.$toast('点完赞还想取消？');
        return;
      }
      apiPostArticleLike(this.$route.params.id)
        .then(() => {
          this.info.likes++;
          this.isLike = true;
          const likesArray = localStorage.BLOGLIKES ? JSON.parse(localStorage.BLOGLIKES) : [];
          likesArray.push(this.$route.params.id);
          localStorage.setItem('BLOGLIKES', JSON.stringify(likesArray));
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
@import './articleinfo.css';
</style>
