<template>
  <div>
    <my-header title="豆瓣电影"></my-header>
    <div class="m-content ovh">
      <div class="bubble-box" :style="{'top':top + 'px'}">
        <Bubble :y="bubbleY"></Bubble>
      </div>
      <Scroll class="better-scroll"
        :data="list"
        :listenScroll="listenScroll"
        @scroll="scroll"
        :pulldown="pulldown"
        @pulldown="loadTop"
        :canScroll="canScroll"
        :pullup="pullup"
        @scrollToEnd="loadBottom">
        <div class="scroll-wrapper">
          <ul class="article__list">
            <router-link tag="li" :to="{path:`/douban/${item.id}`}" v-for="(item,index) in list" :key="index" class="douban__item">
              <img v-lazy="item.images.medium" width="100%">
              <div class="douban__item-title">{{item.title}}</div>
              <p class="douban__item-p">主演：<span v-for="(a,i) in item.casts" :key="i" class="douban__item-span">{{a.name}}</span></p>
              <p class="douban__item-p">导演：<span v-for="(d,i) in item.directors" :key="i" class="douban__item-span">{{d.name}}</span></p>
              <p class="douban__item-p">豆瓣评分：{{item.rating.average}}</p>
              <p class="douban__item-p">上映时间：{{item.mainland_pubdate}}</p>
              <p class="douban__item-p">类型：<span v-for="(g,i) in item.genres" :key="i" class="douban__item-span">{{g}}</span>
              </p>
            </router-link>
          </ul>
        </div>
      </Scroll>
    </div>
  </div>
</template>

<script>
import Header from '@/components/Header/Header.vue';
import mixinList from '@/mixins/list';
import { apiGetDouban } from '@/api/api';

export default {
  mixins: [mixinList],
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
      apiGetDouban({
        page: this.page,
        limit: this.limit,
        city: '杭州',
      }).then(res => {
        if (this.page === 1) {
          this.list = res.data.data.subjects;
        } else {
          this.list = this.list.concat(res.data.data.subjects);
        }
        this.total = res.data.data.total;
      });
    },
  },
  components: {
    MyHeader: Header,
  },
};
</script>

<style>
@import './douban.css';
</style>
