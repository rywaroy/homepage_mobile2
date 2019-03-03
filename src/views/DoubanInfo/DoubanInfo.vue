<template>
  <div>
    <my-header :title="title" :back="true"></my-header>
    <div class="m-content scroll single__box" v-if="info">
      <div class="douban__infos">地区：<span class="douban__infos-text" v-for="(item,index) in info.countries" :key="index">{{item}}</span>
      </div>
      <div class="douban__infos">时长：<span class="douban__infos-text" v-for="(item,index) in info.durations" :key="index">{{item}}</span>
      </div>
      <div class="douban__infos">类型：<span class="douban__infos-text" v-for="(item,index) in info.genres" :key="index">{{item}}</span>
      </div>
      <div class="douban__infos">语言：<span class="douban__infos-text" v-for="(item,index) in info.languages" :key="index">{{item}}</span>
      </div>
      <div class="douban__infos">豆瓣评分：{{info.rating.average}}</div>
      <div class="douban__infos">上映时间：{{info.pubdate}}</div>
      <div class="single__subtitle">剧情简介：</div>
      <div class="single__content">{{info.summary}}</div>
      <div class="single__subtitle">导演：</div>
      <div class="douban__actors">
        <div class="movie-people" v-for="(item,index) in info.directors" :key="index">
          <img :src="item.avatars.medium | getImgUrl" width="100%" alt="">
          <div class="douban__people-name">{{item.name}}</div>
          <div class="douban__people-name">{{item.name_en}}</div>
        </div>
      </div>
      <div class="single__subtitle">演员：</div>
      <div class="douban__actors">
        <div class="douban__people" v-for="(item,index) in info.casts" :key="index">
          <img :src="item.avatars.medium | getImgUrl" width="100%" alt="">
          <div class="douban__people-name">{{item.name}}</div>
          <div class="douban__people-name">{{item.name_en}}</div>
        </div>
      </div>
      <div class="single__subtitle">剧照：</div>
      <div class="douban__actors">
        <div class="douban__people" v-for="(item,index) in info.photos" :key="index">
          <img :src="item.image | getImgUrl" width="100%" alt="">
        </div>
      </div>
      <div class="comment__box">
        <div class="comment__box-title">精彩评论</div>
        <commentItem v-for="(item,index) in info.popular_comments" :key="index" :avatar="item.author.avatar" :name="item.author.name" :time="item.created_at" :content="item.content"></commentItem>
      </div>
    </div>
  </div>
</template>

<script>
import Header from '@/components/Header/Header.vue';
import CommentItem from '@/components/CommentItem/CommentItem.vue';
import { apiGetDoubanInfo } from '@/api/api';

export default {
  name: 'doubanInfo',
  data() {
    return {
      info: null,
      title: '',
    };
  },
  mounted() {
    this.getInfo();
  },
  methods: {
    getInfo() {
      this.$loading.open();
      apiGetDoubanInfo(this.$route.params.id)
        .then(res => {
          this.title = res.data.data.title;
          this.info = res.data.data;
          this.$loading.close();
        }).catch(() => {
          this.$loading.close();
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
@import './doubaninfo.css';
</style>
