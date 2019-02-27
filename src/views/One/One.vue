<template>
  <div>
    <my-header title="ONE · 一个"></my-header>
    <div class="m-content scroll">
      <ul>
        <li class="one__item" v-for="(item,index) in list" :key="index" @click="link(item.category, item.item_id)">
          <div v-if="item.category !== '0'" style="padding:0 .4rem;">
            <div class="one__tag">- {{item.category | filterTag}} -</div>
            <div class="one__title">{{item.title}}</div>
            <div class="one__author">文/{{item.author.user_name}}</div>
            <img :src="item.img_url" alt="" width="100%" className="one__img"/>
            <div class="one__forward">{{item.forward}}</div>
          </div>
          <div v-else>
            <img :src="item.img_url" alt="" width="100%" className="one__img"/>
            <div class="one__author tac">{{item.title}} | {{item.pic_info}}</div>
            <div class="one__forward" style="padding:0 15px;">{{item.forward}}</div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import Header from '@/components/Header/Header.vue';
import { apiGetOne } from '@/api/api';

export default {
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
      apiGetOne()
        .then(res => {
          this.list = res.data.data.content_list;
        });
    },
    link(type, id) {
      if (type !== '0') {
        this.$router.push({ path: `/one/${type}/${id}` });
      }
    },
  },
  components: {
    MyHeader: Header,
  },
  filters: {
    filterTag(val) {
      switch (val) {
        case '1':
          return '阅读';
        case '2':
          return '连载';
        case '3':
          return '问答';
        case '4':
          return '音乐';
        case '5':
          return '影视';
        default:
          return null;
      }
    },
  },
};
</script>

<style>
@import './one.css';
</style>
