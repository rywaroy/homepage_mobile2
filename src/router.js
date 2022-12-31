import Vue from 'vue';
import Router from 'vue-router';
// import Learn from '@/views/Learn/Learn.vue';
// import LearnInfo from '@/views/LearnInfo/LearnInfo.vue';
import Article from '@/views/Article/Article.vue';
import ArticleInfo from '@/views/ArticleInfo/ArticleInfo.vue';
import Album from '@/views/Album/Album.vue';
import AlbumGroup from '@/views/AlbumGroup/AlbumGroup.vue';
// import Think from '@/views/Think/Think.vue';
// import One from '@/views/One/One.vue';
// import OneInfo from '@/views/OneInfo/OneInfo.vue';
// import Huaban from '@/views/Huaban/Huaban.vue';
// import Zhihu from '@/views/Zhihu/Zhihu.vue';
// import ZhihuInfo from '@/views/ZhihuInfo/ZhihuInfo.vue';
// import Douban from '@/views/Douban/Douban.vue';
// import DoubanInfo from '@/views/DoubanInfo/DoubanInfo.vue';
import PopStar from '@/views/PopStar/PopStar.vue';
import KnifeHit from '@/views/KnifeHit/KnifeHit.vue';
import StupidBird from '@/views/StupidBird/StupidBird.vue';
import Game from '@/views/Game/Game.vue';
import Gobang from '@/views/Gobang/Gobang.vue';
import Jump from '@/views/Jump/Jump.vue';
import IGuess from '@/views/IGuess/IGuess.vue';
import Rotating from '@/views/Rotating/Rotating.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      redirect: '/article',
    },
    // {
    //   path: '/learn',
    //   name: 'learn',
    //   // component: () => import('@/views/Learn/Learn.vue'),
    //   component: Learn,
    //   meta: {
    //     level: 1,
    //     title: '学习笔记',
    //   },
    // },
    // {
    //   path: '/learn/:id',
    //   name: 'learnInfo',
    //   // component: () => import('@/views/LearnInfo/LearnInfo.vue'),
    //   component: LearnInfo,
    //   meta: {
    //     level: 10,
    //     title: '学习笔记详情',
    //   },
    // },
    {
      path: '/article',
      name: 'article',
      // component: () => import('@/views/Article/Article.vue'),
      component: Article,
      meta: {
        level: 1,
        title: '日志',
      },
    },
    {
      path: '/article/:id',
      name: 'articleInfo',
      // component: () => import('@/views/ArticleInfo/ArticleInfo.vue'),
      component: ArticleInfo,
      meta: {
        level: 10,
        title: '日志详情',
      },
    },
    {
      path: '/album',
      name: 'album',
      // component: () => import('@/views/Album/Album.vue'),
      component: Album,
      meta: {
        level: 1,
        title: '相册',
      },
    },
    {
      path: '/album/:id',
      name: 'albumGroup',
      // component: () => import('@/views/AlbumGroup/AlbumGroup.vue'),
      component: AlbumGroup,
      meta: {
        level: 10,
        title: '相册集',
      },
    },
    // {
    //   path: '/think',
    //   name: 'think',
    //   // component: () => import('@/views/Think/Think.vue'),
    //   component: Think,
    //   meta: {
    //     level: 1,
    //     title: '说说',
    //   },
    // },
    // {
    //   path: '/one',
    //   name: 'one',
    //   // component: () => import('@/views/One/One.vue'),
    //   component: One,
    //   meta: {
    //     level: 1,
    //     title: 'ONE · 一个',
    //   },
    // },
    // {
    //   path: '/one/:type/:id',
    //   name: 'oneInfo',
    //   // component: () => import('@/views/OneInfo/OneInfo.vue'),
    //   component: OneInfo,
    //   meta: {
    //     level: 10,
    //     title: 'ONE · 一个',
    //   },
    // },
    // {
    //   path: '/huaban',
    //   name: 'huaban',
    //   // component: () => import('@/views/Huaban/Huaban.vue'),
    //   component: Huaban,
    //   meta: {
    //     level: 1,
    //     title: '花瓣相册',
    //   },
    // },
    // {
    //   path: '/zhihu',
    //   name: 'zhihu',
    //   // component: () => import('@/views/Zhihu/Zhihu.vue'),
    //   component: Zhihu,
    //   meta: {
    //     level: 1,
    //     title: '知乎日报',
    //   },
    // },
    // {
    //   path: '/zhihu/:id',
    //   name: 'zhihuInfo',
    //   // component: () => import('@/views/ZhihuInfo/ZhihuInfo.vue'),
    //   component: ZhihuInfo,
    //   meta: {
    //     level: 10,
    //     title: '知乎日报详情',
    //   },
    // },
    // {
    //   path: '/douban',
    //   name: 'douban',
    //   // component: () => import('@/views/Douban/Douban.vue'),
    //   component: Douban,
    //   meta: {
    //     level: 1,
    //     title: '豆瓣电影',
    //   },
    // },
    // {
    //   path: '/douban/:id',
    //   name: 'doubanInfo',
    //   // component: () => import('@/views/DoubanInfo/DoubanInfo.vue'),
    //   component: DoubanInfo,
    //   meta: {
    //     level: 10,
    //     title: '豆瓣电影详情',
    //   },
    // },
    {
      path: '/game/popstar',
      name: 'popStar',
      component: PopStar,
      meta: {
        level: 30,
        title: '消灭方块',
      },
    },
    {
      path: '/game/knifehit',
      name: 'knifeHit',
      component: KnifeHit,
      meta: {
        level: 30,
        title: '爱的魔力转圈圈',
      },
    },
    {
      path: '/game/stupidbird',
      name: 'stupidBird',
      component: StupidBird,
      meta: {
        level: 30,
        title: 'stupidbird',
      },
    },
    {
      path: '/game',
      name: 'game',
      component: Game,
      meta: {
        level: 1,
        title: '小游戏',
      },
    },
    {
      path: '/game/gobang',
      name: 'gobang',
      component: Gobang,
      meta: {
        level: 30,
        title: '五子棋2.0',
      },
    },
    {
      path: '/game/jump',
      name: 'jump',
      component: Jump,
      meta: {
        level: 30,
        title: 'Jump Jump',
      },
    },
    {
      path: '/game/iguess',
      name: 'iguess',
      component: IGuess,
      meta: {
        level: 30,
        title: '猜物品',
      },
    },
    {
      path: '/game/rotating',
      name: 'rotating',
      component: Rotating,
      meta: {
        level: 30,
        title: '旋转拼图',
      },
    },
  ],
});
