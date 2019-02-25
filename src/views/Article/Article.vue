<template>
  <div>
    <my-header title="日志"></my-header>
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
            <router-link tag="li" :to="{path:`/article/${item.id}`}" v-for="(item,index) in list" :key="index" class="article__item">
              <div class="article__img bg-cover" :style="{backgroundImage: `url(${item.img})`}"></div>
              <div class="article__info">
                <h3 class="article__title">{{item.title}}</h3>
                <p class="article__intro">{{item.intro}}</p>
                <div class="article__bot">
                  <p class="article__time">{{item.time | time}}&nbsp;&nbsp; 「<span :style="{color: item.tag.color}">{{item.tag.title}}</span>」</p>
                  <div class="article__like">{{item.likes}}</div>
                </div>
              </div>
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
import { apiGetArticle } from '@/api/api';

export default {
  mixins: [mixinList],
  mounted() {
    this.getList();
  },
  methods: {
    getList() {
      apiGetArticle({
        page: this.page,
        limit: this.limit,
      }).then(res => {
        if (this.page === 1) {
          this.list = res.data.data.list;
        } else {
          this.list = this.list.concat(res.data.data.list);
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
@import './article.css';
</style>
