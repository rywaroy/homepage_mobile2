import axios from '@/common/axios';

// 获取学习笔记列表
export const apiGetLearn = params => (
  axios.get('/learn', {
    params,
  })
);
