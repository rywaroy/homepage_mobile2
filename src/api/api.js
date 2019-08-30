import axios from '@/common/axios';

// 获取学习笔记列表
export const apiGetLearn = params => (
  axios.get('/learn', {
    params,
  })
);

// 获取学习笔记详情
export const apiGetLearnInfo = id => (
  axios.get(`/learn/${id}`)
);

// 获取日志列表
export const apiGetArticle = params => (
  axios.get('/article', {
    params,
  })
);

// 获取日志详情
export const apiGetArticleInfo = id => (
  axios.get(`/article/${id}`)
);

// 获取日志评论
export const apiGetAricleComment = id => (
  axios.get(`/article/${id}/comment`)
);

// 评论日志
export const apiPostComment = params => (
  axios.post(`/article/${params.id}/comment`, params)
);

// 日志点赞
export const apiPostArticleLike = id => (
  axios.post(`/article/${id}/like`)
);

// 获取相册列表
export const apiGetAlbum = () => (
  axios.get('/album')
);

// 获取相册集
export const apiGetAblumGroup = id => (
  axios.get(`/album/${id}/group`)
);

// 获取说说
export const apiGetThink = params => (
  axios.get('/think', {
    params,
  })
);

// 获取one
export const apiGetOne = () => (
  axios.get('/one/list')
);

// 获取one详情
export const apiGetOneInfo = (type, id) => (
  axios.get(`/one/info?id=${id}&type=${type}`)
);

// 获取花瓣相册
export const apiGetHuaban = () => (
  axios.get('https://api.isoyu.com/index.php/api/Picture/hua_ban')
);

// 获取知乎日报
export const apiGetZhihu = () => (
  axios.get('https://api.isoyu.com/index.php/api/Zhihu/zhihu_daily')
);

// 获取知乎日报详情
export const apiGetZhihuInfo = id => (
  axios.get(`https://api.isoyu.com/index.php/api/Zhihu/news?id=${id}`)
);

// 获取知乎日报评论
export const apiGetZhihuComment = id => (
  axios.get(`https://api.isoyu.com/index.php/api/Zhihu/new_comment?id=${id}`)
);

// 获取豆瓣电影
export const apiGetDouban = params => (
  axios.get('/douban/list', {
    params,
  })
);

// 获取豆瓣电影详情
export const apiGetDoubanInfo = id => (
  axios.get(`/douban/info?id=${id}`)
);

// 获取基本信息
export const apiGetBase = () => (
  axios.get('/base/content')
);
