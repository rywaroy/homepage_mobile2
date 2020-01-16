<template>
  <div>
    <my-header title="Jump Jump" :back="true" id="header"></my-header>
    <div class="m-content scroll" id="content">
      <canvas id="jump" class="jump-canvas"></canvas>
    </div>
  </div>
</template>
<script>
import Header from '@/components/Header/Header.vue';

const screenWidth = window.innerWidth;

export default {
  name: 'jump',
  data() {
    return {
      screenWidth: window.innerWidth,
      screenHeight: 0,
      id: null,
      canvas: null,
      ctx: null,
      customs: [
        {
          jumpHeight: 0, // 跳跃高度
          speed: 0, // 速度
          ac: 0.24, // 加速度
          columns: {
            w: 20 + Math.random() * 20,
            h: 30 + Math.random() * 15,
            x: screenWidth + 800 * Math.random(),
          }, // 柱子
          sy: 0,
          step: 0, // 步子
        },
      ], // 关卡
      score: 0, // 得分
      total: 4, // 多少分过关
      custom: 1, // 关卡数
      customTotal: 5, // 总关卡数
    };
  },
  mounted() {
    this.headerHeight = document.getElementById('header').clientHeight;
    this.screenHeight = document.getElementById('content').clientHeight;
    this.init();
  },
  methods: {
    init() {
      this.canvas = document.getElementById('jump');
      this.ctx = this.canvas.getContext('2d');
      this.canvas.width = this.screenWidth;
      this.canvas.height = this.screenHeight;
      this.run();
      this.bind();
    },
    run() {
      this.id = requestAnimationFrame(this.draw.bind(this));
    },
    randomColumn() { // 随机生成柱子
      return {
        w: 20 + Math.random() * 10,
        h: 30 + Math.random() * 15,
      };
    },
    draw() {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.drawNumber();
      for (let i = 0; i < this.customs.length; i++) {
        this.drawGame(this.customs[i]);
      }
      if (this.gameOver) {
        cancelAnimationFrame(this.id);
        this.$msg({
          message: '失败',
          confirmButtonText: '重新开始',
          cancelButtonText: '离开',
          showCancelButton: true,
          closeOnClickModal: false,
        }).then(action => {
          if (action === 'confirm') {
            this.resetCustom();
            this.$nextTick(() => {
              this.run();
            });
          }
          if (action === 'cancel') {
            this.$router.go(-1);
          }
        });
      } else {
        if (this.veri()) {
          cancelAnimationFrame(this.id);
        } else {
          this.id = requestAnimationFrame(this.draw.bind(this));
        }
      }
    },
    drawGame(customs) {
      customs.ey = customs.sy + this.screenHeight / this.customs.length;
      customs.speed -= customs.ac;
      customs.jumpHeight += customs.speed;
      if (customs.jumpHeight < 0) {
        customs.jumpHeight = 0;
      }
      this.drawLine(customs.ey);
      this.drawMan(customs.jumpHeight, customs.ey, customs.step);
      this.drawColumn(customs.columns, customs.ey);
      this.collision(customs.jumpHeight, customs.columns);
      if (customs.jumpHeight < 10) {
        customs.step++;
      }

      if (customs.step === 20) {
        customs.step = 0;
      }
    },
    drawLine(ey) {
      this.ctx.beginPath();
      this.ctx.moveTo(0, ey);
      this.ctx.lineTo(this.screenWidth, ey);
      this.ctx.stroke();
    },
    drawMan(h, ey, step) {
      const height = ey - h;
      this.ctx.beginPath();
      this.ctx.arc(30, height - 40, 10, 2 * Math.PI, false);
      this.ctx.stroke();
      this.ctx.beginPath();
      this.ctx.moveTo(30, height - 30);
      this.ctx.lineTo(30, height - 15);
      this.ctx.stroke();
      this.ctx.beginPath();
      this.ctx.moveTo(30, height - 30);
      this.ctx.lineTo(20, h > 10 ? height - 20 : height - 15);
      this.ctx.stroke();
      this.ctx.beginPath();
      this.ctx.moveTo(30, height - 30);
      this.ctx.lineTo(40, h > 10 ? height - 20 : height - 15);
      this.ctx.stroke();
      this.ctx.beginPath();
      this.ctx.moveTo(30, height - 15);
      this.ctx.lineTo(20 + step, height);
      this.ctx.stroke();
      this.ctx.beginPath();
      this.ctx.moveTo(30, height - 15);
      this.ctx.lineTo(40 - step, height);
      this.ctx.stroke();
    },
    drawColumn(columns, ey) {
      this.ctx.strokeRect(columns.x, ey - columns.h, columns.w, columns.h);
      // 判断柱子是否移出屏幕外，则更新柱子
      if (columns.x < -columns.w) {
        columns.w = 20 + Math.random() * 20;
        columns.h = 30 + Math.random() * 15;
        columns.x = this.screenWidth + 800 * Math.random();
        this.score++;
      }
      columns.x -= 4;
    },
    drawNumber() {
      this.ctx.beginPath();
      this.ctx.strokeStyle = '#000';
      this.ctx.font = '18px STheiti, SimHei';
      this.ctx.fillText(`得分：${this.score}/${this.total}`, 20, 20);
      this.ctx.fillText(`关卡：${this.custom}/${this.customTotal}`, this.screenWidth - 100, 20);
    },
    collision(height, columns) {
      if ((columns.x <= 40 && columns.x >= -(columns.w - 20)) && (height < columns.h)) {
        this.gameOver = true;
      }
    },
    veri() { // 验证是否通关
      if (this.score >= this.total) {
        cancelAnimationFrame(this.id);
        if (this.custom === this.customTotal) {
          this.$msg({
            message: '通关',
            confirmButtonText: '重新开始',
            cancelButtonText: '离开',
            showCancelButton: true,
            closeOnClickModal: false,
          }).then(action => {
            if (action === 'confirm') {
              this.reset();
              this.run();
            }
            if (action === 'cancel') {
              this.$router.go(-1);
            }
          });
          return true;
        }
        this.custom++;
        this.customs = [];
        this.score = 0;
        this.total = 3 + this.custom * 2;
        for (let i = 0; i < this.custom; i++) {
          this.customs.push({
            jumpHeight: 0, // 跳跃高度
            speed: 0, // 速度
            ac: 0.24, // 加速度
            columns: {
              w: 20 + Math.random() * 20,
              h: 30 + Math.random() * 15,
              x: this.screenWidth + 800 * Math.random(),
            }, // 柱子
            sy: i * this.screenHeight / this.custom,
            step: 0, // 步子
          });
        }
        this.$msg({
          message: '下一关',
          closeOnClickModal: false,
        }).then(action => {
          if (action === 'confirm') {
            this.run();
          }
        });
        return true;
      }
      return false;
    },
    reset() {
      this.gameOver = false;
      this.customs = [
        {
          jumpHeight: 0, // 跳跃高度
          speed: 0, // 速度
          ac: 0.24, // 加速度
          columns: {
            w: 20 + Math.random() * 20,
            h: 30 + Math.random() * 15,
            x: screenWidth + 800 * Math.random(),
          }, // 柱子
          sy: 0,
          step: 0, // 步子
        },
      ]; // 关卡
      this.score = 0; // 得分
      this.total = 3; // 多少分过关
      this.custom = 1; // 关卡数
    },
    resetCustom() {
      this.gameOver = false;
      const customs = JSON.parse(JSON.stringify(this.customs));
      for (let i = 0; i < customs.length; i++) {
        customs[i].jumpHeight = 0;
        customs[i].speed = 0;
        customs[i].columns = {
          w: 20 + Math.random() * 20,
          h: 30 + Math.random() * 15,
          x: screenWidth + 800 * Math.random(),
        };
        customs.step = 0;
      }
      this.customs = customs;
      this.score = 0; // 得分
    },
    bind() {
      this.canvas.addEventListener('touchstart', this.touchEvent);
    },
    touchEvent(e) {
      const y = e.targetTouches[0].pageY - this.headerHeight;
      const len = this.customs.length;
      const height = this.screenHeight / len;
      const index = Math.floor(y / height);
      if (this.customs[index].jumpHeight < 10) {
        this.customs[index].speed = 6.4;
      }
    },
  },
  components: {
    MyHeader: Header,
  },
  beforeDestroy() {
    this.canvas.removeEventListener('touchstart', this.touchEvent);
    cancelAnimationFrame(this.id);
  },
};
</script>
<style>
.jump-canvas {
    width: 100%;
    height: 100%;
}
</style>
