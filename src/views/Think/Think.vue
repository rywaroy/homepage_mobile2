<template>
  <div>
    <my-header title="说说"></my-header>
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
          <ul class="think__list">
            <div class="think__item" v-for="(item, index) in list" :key="index">
              <div class="think__item-top">
                <div class="think__item-avatar bg-cover" :style="{backgroundImage: `url(${item.avatar})`}"></div>
                <div class="think__item-name">{{item.name}}</div>
              </div>
              <div class="think__item-content">{{item.content}}</div>
              <div class="think__item-photos" v-if="item.photos.length > 0">
                <div class="think__item-photo bg-cover" v-for="(photo, p) in item.photos" :key="p" :style="{backgroundImage: `url(${photo}?imageView2/1/w/210/h/210/q/75)`}"></div>
              </div>
              <div class="think__item-time">{{item.time | time}}</div>
            </div>
          </ul>
        </div>
      </Scroll>
    </div>
  </div>
</template>

<script>
import Header from '@/components/Header/Header.vue';
import mixinList from '@/mixins/list';
import { apiGetThink } from '@/api/api';

export default {
  mixins: [mixinList],
  mounted() {
    this.getList();
  },
  methods: {
    getList() {
      apiGetThink({
        page: this.page,
        limit: this.limit,
      }).then(res => {
        if (this.page === 1) {
          this.list = res.data.data.list;
        } else {
          this.list = this.list.concat(res.data.data.list);
        }
        this.total = res.data.data.count;
      });
    },
  },
  components: {
    MyHeader: Header,
  },
};
</script>

<style>
@import './think.css';
</style>
