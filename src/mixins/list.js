import Scroll from '@/components/Scroll/Scroll.vue';
import Bubble from '@/components/Bubble/Bubble.vue';

export default {
  data() {
    return {
      listenScroll: true,
      posY: 0,
      bubbleY: 0,
      pullup: true,
      pulldown: true,
      page: 1,
      limit: 10,
      total: 0,
      list: [],
    };
  },
  methods: {
    scroll(pos) {
      this.posY = pos.y;
      this.bubbleY = pos.y - 30;
    },
    loadTop() { // 下拉刷新
      this.page = 1;
      this.getList();
    },
    loadBottom() { // 上拉加载
      this.page++;
      this.getList();
    },
  },
  computed: {
    top() {
      return this.posY - 30;
    },
    canScroll() {
      return !(this.page >= Math.ceil(this.total / this.limit));
    },
  },
  components: {
    Scroll,
    Bubble,
  },
};
