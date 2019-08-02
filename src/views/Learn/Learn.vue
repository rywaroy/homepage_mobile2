<template>
  <div>
    <my-header title="学习笔记"></my-header>
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
          <router-link tag="div" :to="{path:`/learn/${item.id}`}" v-for="(item,index) in list" :key="index" class="learn__item">
            <div class="learn__item-top">
              <div class="learn__item-left">
                <div class="learn__item-title">{{item.title}}</div>
                <div class="learn__item-time">{{item.updatedAt | time}}</div>
              </div>
              <div class="learn__item-right">
                <div class="learn__item-tag">{{item.tag}}</div>
              </div>
            </div>
            <div class="learn__item-intro">{{item.intro}}</div>
          </router-link>
        </div>
      </Scroll>
    </div>
  </div>
</template>

<script>
import Header from '@/components/Header/Header.vue';
import mixinList from '@/mixins/list';
import { apiGetLearn } from '@/api/api';

export default {
  mixins: [mixinList],
  mounted() {
    this.getList();
  },
  methods: {
    getList() {
      apiGetLearn({
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
@import './learn.css';
</style>
