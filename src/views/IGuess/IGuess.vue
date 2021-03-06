<template>
  <div>
    <my-header title="猜物品" :back="true"></my-header>
    <div class="m-content scroll" id="scroll">
      <div class="guess__tip">
        <span class="guess__tip-link" @click="showTip = true">游戏说明</span>
      </div>
      <div class="guess__answer">
        <div class="guess__answer-item" v-for="item in answer" :key="item.id" @click="cancelAnswer(item)">{{item.content}}</div>
      </div>
      <p class="guess__list-tip">
        <span>点击选择</span>
        <span class="link" @click="edit()">{{showEdit ? '完成' : '自定义文字'}}</span>
      </p>
      <div class="guess__edit" v-if="showEdit">
        <div class="guess__edit-item" v-for="(item, index) in list" :key="item.gid">
          <input type="text" v-model.trim="item.title" @blur="inputBlur(index)" maxlength="3">
        </div>
      </div>
      <div class="guess__list" v-else>
        <div :class="['guess__list-item', item.select ? 'disable' : '']" v-for="item in list" :key="item.tid" @click="selectAnswer(item)">{{item.title}}</div>
      </div>
      <div class="guess__button-box">
        <div :class="['guess__button', tryList.length >= 6 ? 'disable' : '']" @click="verify()">提交回答</div>
      </div>
      <div class="guess__table">
        <table>
          <tr>
            <th>次数</th>
            <th>内容</th>
            <th>正确个数</th>
            <th>位置正确个数</th>
          </tr>
          <tr v-for="(item, index) in tryList" :key="index">
            <td>{{index + 1}}</td>
            <td>{{item.content}}</td>
            <td>{{item.rightNum}}</td>
            <td>{{item.positionNum}}</td>
          </tr>
        </table>
      </div>
      <div class="guess__button-box">
        <div class="guess__button" @click="submit()">提交答案</div>
      </div>
    </div>
    <div class="pop__tip-mask" v-if="showTip">
      <div class="pop__tip-box">
        <div class="pop__tip-title">游戏说明</div>
        <div class="pop__tip-content">
          <p>总共有6个物品，系统随机选择3个物品依次排序</p>
          <p>用户有6次机会去选择3个物品回答</p>
          <p>系统验证答案后会给出该3个物品中正确的物品个数以及正确的位置个数</p>
          <p>最后用户可以根据6次返回结果，推理出正确答案提交</p>
        </div>
        <div class="pop__tip-btn" @click="showTip = false">知道了</div>
      </div>
    </div>
  </div>
</template>

<script>
import Header from '@/components/Header/Header.vue';

export default {
  name: 'iGuess',
  data() {
    return {
      showTip: false,
      showEdit: false,
      answer: [{ id: 1, content: '', gid: null }, { id: 2, content: '', gid: null }, { id: 3, content: '', gid: null }],
      tryList: [],
      right: [],
      list: [
        {
          gid: 1,
          title: '苹果',
          defaultTitle: '苹果',
          select: false,
        },
        {
          gid: 2,
          title: '香蕉',
          defaultTitle: '香蕉',
          select: false,
        },
        {
          gid: 3,
          title: '牛奶',
          defaultTitle: '牛奶',
          select: false,
        },
        {
          gid: 4,
          title: '雪梨',
          defaultTitle: '雪梨',
          select: false,
        },
        {
          gid: 5,
          title: '橘子',
          defaultTitle: '橘子',
          select: false,
        },
        {
          gid: 6,
          title: '蛋糕',
          defaultTitle: '蛋糕',
          select: false,
        },
      ],
    };
  },
  mounted() {
    this.reset();
  },
  methods: {
    // 初始化
    init() {
      for (let i = 0; i < this.answer.length; i++) {
        this.answer[i].content = '';
        this.answer[i].gid = null;
      }
      for (let i = 0; i < this.list.length; i++) {
        this.list[i].select = false;
      }
    },
    // 重新开始
    reset() {
      this.init();
      this.right = this.shuffle();
      this.tryList = [];
    },
    // 洗牌
    shuffle() {
      const list = [1, 2, 3, 4, 5, 6];
      for (let i = 5; i >= 0; i--) {
        const randomIndex = Math.floor(Math.random() * (i + 1));
        const itemAtIndex = list[randomIndex];

        list[randomIndex] = list[i];
        list[i] = itemAtIndex;
      }
      return list.slice(0, 3);
    },
    // 选择答案
    selectAnswer(item) {
      const { gid, title, select } = item;
      if (select) {
        return;
      }
      let flag = false;
      for (let i = 0; i < this.answer.length; i++) {
        if (!this.answer[i].gid) {
          this.answer[i].gid = gid;
          this.answer[i].content = title;
          flag = true;
          break;
        }
      }
      if (flag) {
        item.select = true;
      }
    },
    // 取消答案
    cancelAnswer(item) {
      if (!item.gid) {
        return;
      }
      const gid = item.gid;
      item.gid = null;
      item.content = '';
      this.list.forEach(item => {
        if (gid === item.gid) {
          item.select = false;
        }
      });
    },
    // 验证回答
    verify() {
      if (this.tryList.length >= 6) {
        this.$toast('尝试次数已经用完');
        return;
      }
      const res = this.answer.every(item => item.gid);
      if (!res) {
        this.$toast('请将回答填写完整');
        return;
      }
      let rightNum = 0;
      let positionNum = 0;
      for (let i = 0; i < this.answer.length; i++) {
        if (this.answer[i].gid === this.right[i]) {
          positionNum++;
        }
        for (let j = 0; j < this.right.length; j++) {
          if (this.answer[i].gid === this.right[j]) {
            rightNum++;
            break;
          }
        }
      }
      this.tryList.push({
        rightNum,
        positionNum,
        content: this.answer.map(item => item.content).join(','),
      });
      this.init();
    },
    // 提交回答
    submit() {
      const res = this.answer.every(item => item.gid);
      if (!res) {
        this.$toast('请将回答填写完整');
        return;
      }
      const answer = this.answer.map(item => item.gid);
      let message = '';
      if (JSON.stringify(this.right) === JSON.stringify(answer)) {
        message = '厉害嗷，这你都推理出来了';
      } else {
        const rightText = [];
        for (let i = 0; i < this.right.length; i++) {
          for (let j = 0; j < this.list.length; j++) {
            if (this.right[i] === this.list[j].gid) {
              rightText.push(this.list[j].title);
            }
          }
        }
        message = `太菜了吧，正确答案是 ${rightText.join(',')}`;
      }
      this.$msg({
        title: '提示',
        message,
        confirmButtonText: '重新开始',
        closeOnClickModal: false,
      }).then(action => {
        if (action === 'confirm') {
          this.reset();
        }
      });
    },
    inputBlur(index) {
      if (!this.list[index].title) {
        this.list[index].title = this.list[index].defaultTitle;
      }
    },
    // 编辑文字
    edit() {
      if (this.showEdit) {
        this.showEdit = false;
        return;
      }
      if (this.tryList.length > 0) {
        this.$toast('请重新开始游戏后修改');
        return;
      }
      const res = this.answer.some(item => item.gid);
      if (res) {
        this.$toast('请重新开始游戏后修改');
        return;
      }
      this.showEdit = true;
    },
  },
  components: {
    MyHeader: Header,
  },
};
</script>

<style>
@import './iguess.css';
</style>
