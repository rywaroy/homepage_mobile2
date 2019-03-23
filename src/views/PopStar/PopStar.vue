<template>
  <div>
    <my-header title="消灭星星" :back="true"></my-header>
    <div class="m-content c-popstar__content">
      <h3 class="c-popstar__title">第{{level}}关</h3>
      <h4 class="c-popstar__target">目标得分：{{targetScore}}</h4>
      <h4 class="c-popstar__target">得分：{{score}}</h4>
      <div class="c-popstar__box">
        <canvas id="popstar" class="c-popstar__canvas"></canvas>
      </div>
    </div>
  </div>
</template>

<script>
import Header from '@/components/Header/Header.vue';

const screenWidth = window.innerWidth;
const screenHeight = window.innerHeight;
const wn = 10;
const hn = 10;
let unit = parseInt(screenWidth / wn, 10);
if (unit % 2 === 1) {
  unit--;
}

export default {
  data() {
    return {
      level: 1,
      score: 0,
      stars: [],
      ctx: null,
      canvas: null,
      disable: true,
    };
  },
  created() {
    this.init();
  },
  mounted() {
    this.canvas = document.getElementById('popstar');
    this.ctx = this.canvas.getContext('2d');
    this.canvas.width = wn * unit;
    this.canvas.height = 600;
    this.start();
    this.bind();
  },
  methods: {
    /**
     * 初始化
     */
    init() {
      this.stars = [];
      for (let i = 0; i < wn; i++) {
        const line = [];
        for (let j = 0; j < hn; j++) {
          line.push({
            color: this.randomColor(),
            left: false,
            right: false,
            top: false,
            bottom: false,
            active: false,
            x: i * unit,
            y: 0,
            tx: null,
            ty: 0,
          });
        }
        this.stars.push(line);
      }
    },
    /**
     * 绑定事件
     */
    bind() {
      this.canvas.addEventListener('touchstart', this.touchEvent);
    },
    touchEvent(e) {
      if (this.disable) {
        return;
      }
      this.disable = true;
      const x = e.targetTouches[0].clientX;
      const y = e.targetTouches[0].clientY;
      if (y < this.canvas.height - hn * unit) {
        return;
      }
      const yi = parseInt((screenHeight - y) / unit, 10);
      const xi = parseInt(x / unit, 10);
      if (this.stars[xi] && this.stars[xi][yi]) {
        this.findTarge(xi, yi);
      } else {
        this.disable = false;
      }
    },
    /**
     * 开始游戏
     */
    start() {
      for (let i = 0; i < this.stars.length; i++) {
        const line = this.stars[i];
        for (let j = 0; j < line.length; j++) {
          line[j].y = this.canvas.height - j * unit - unit - (j * 20);
          line[j].ty = this.canvas.height - j * unit - unit;
        }
      }
      this.move();
    },
    /**
     * 画图
     */
    draw() {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      for (let i = 0; i < this.stars.length; i++) {
        const line = this.stars[i];
        for (let j = 0; j < line.length; j++) {
          this.drawRoundRect(line[j].x, line[j].y, unit, unit, 4, line[j].color, line[j]);
        }
      }
    },
    /**
     * 画方块
     */
    drawRoundRect(x, y, width, height, radius, color, data) {
      const borderColor = '#fff';
      const activeBorderColor = '#000';
      this.ctx.beginPath();
      this.ctx.fillStyle = color;
      this.ctx.fillRect(x + 1, y + 1, width - 2, height - 2);

      this.ctx.lineWidth = 1;
      this.ctx.strokeStyle = data.top ? activeBorderColor : borderColor;
      this.ctx.arc(x + radius, y + radius, radius, Math.PI, Math.PI * 3 / 2);
      this.ctx.lineTo(width - radius + x, y);
      this.ctx.stroke();
      this.ctx.beginPath();
      this.ctx.strokeStyle = data.right ? activeBorderColor : borderColor;
      this.ctx.arc(width - radius + x, radius + y, radius, Math.PI * 3 / 2, Math.PI * 2);
      this.ctx.lineTo(width + x, height + y - radius);
      this.ctx.stroke();
      this.ctx.beginPath();
      this.ctx.strokeStyle = data.bottom ? activeBorderColor : borderColor;
      this.ctx.arc(width - radius + x, height - radius + y, radius, 0, Math.PI * 1 / 2);
      this.ctx.lineTo(radius + x, height + y);
      this.ctx.stroke();
      this.ctx.beginPath();
      this.ctx.strokeStyle = data.left ? activeBorderColor : borderColor;
      this.ctx.arc(radius + x, height - radius + y, radius, Math.PI * 1 / 2, Math.PI);
      this.ctx.lineTo(x, y + radius);
      this.ctx.stroke();
      this.ctx.closePath();
    },
    /**
     * 随机颜色
     */
    randomColor() {
      const colors = ['red', 'blue', 'green', 'yellow', 'purple'];
      const num = parseInt(Math.random() * 5, 10);
      return colors[num];
    },
    /**
     * 下移
     */
    move() {
      let id;
      const _this = this;
      function moving() {
        let all = 0;
        let done = 0;
        for (let i = 0; i < _this.stars.length; i++) {
          const line = _this.stars[i];
          for (let j = 0; j < line.length; j++) {
            all++;
            if (line[j].ty === 0) {
              done++;
              continue;
            }
            if (line[j].ty > line[j].y) {
              line[j].y += 2;
            }
            if (line[j].ty < line[j].y) {
              line[j].y -= 2;
            }
            if (line[j].ty === line[j].y) {
              line[j].ty = 0;
            }
          }
        }
        _this.draw();
        if (all === done) {
          cancelAnimationFrame(id);
          _this.merge();
        } else {
          id = requestAnimationFrame(moving);
        }
      }
      id = requestAnimationFrame(moving);
    },
    /**
     * 寻找点击目标
     */
    findTarge(i, j) {
      if (this.stars[i][j].active) {
        this.clearAllBox();
      } else {
        this.disable = false;
        this.clear();
        if (this.hasBrother(i, j)) {
          const color = this.stars[i][j].color;
          this.stars[i][j].active = true;
          this.findAll(i, j, color);
          this.draw();
        }
      }
    },
    /**
     * 寻找所以关联的目标
     */
    findAll(i, j, color) {
      const star = this.stars[i][j];

      for (let n = 0; n < 4; n++) {
        const next = {};
        // 上方
        if (n === 0) {
          next.star = this.stars[i] ? this.stars[i][j + 1] : null;
          next.i = i;
          next.j = j + 1;
          next.d = 'top';
        }

        // 右边
        if (n === 1) {
          next.star = this.stars[i + 1] ? this.stars[i + 1][j] : null;
          next.i = i + 1;
          next.j = j;
          next.d = 'right';
        }

        // 下边
        if (n === 2) {
          next.star = this.stars[i] ? this.stars[i][j - 1] : null;
          next.i = i;
          next.j = j - 1;
          next.d = 'bottom';
        }

        // 左边
        if (n === 3) {
          next.star = this.stars[i - 1] ? this.stars[i - 1][j] : null;
          next.i = i - 1;
          next.j = j;
          next.d = 'left';
        }

        if (next.star) {
          if (!next.star.active) {
            star.active = true;
            if (next.star.color === color) {
              this.findAll(next.i, next.j, color);
            } else {
              star[next.d] = true;
            }
          }
        } else {
          star[next.d] = true;
          star.active = true;
        }
      }
    },
    /**
     * 消除方块，清空所有标记方块
     */
    clearAllBox() {
      let num = 0;

      // 循环删除被标记的方块
      for (let i = this.stars.length - 1; i >= 0; i--) {
        const line = this.stars[i];
        for (let j = line.length - 1; j >= 0; j--) {
          if (line[j].active) {
            num++;
            line.splice(j, 1);
          }
        }
      }

      // 循环更新方块目标的位置
      for (let i = this.stars.length - 1; i >= 0; i--) {
        const line = this.stars[i];
        for (let j = line.length - 1; j >= 0; j--) {
          line[j].tx = i * unit;
          line[j].ty = this.canvas.height - j * unit - unit;
        }
      }
      this.move();
      this.score += num * num * 5;
    },
    /**
     * 验证目标方块周围是否有相同的方块
     */
    hasBrother(i, j) {
      const color = this.stars[i][j].color;
      let num = 0;
      if (this.stars[i] && this.stars[i][j + 1] && this.stars[i][j + 1].color === color) {
        num++;
      }
      if (this.stars[i] && this.stars[i][j - 1] && this.stars[i][j - 1].color === color) {
        num++;
      }
      if (this.stars[i + 1] && this.stars[i + 1][j] && this.stars[i + 1][j].color === color) {
        num++;
      }
      if (this.stars[i - 1] && this.stars[i - 1][j] && this.stars[i - 1][j].color === color) {
        num++;
      }
      if (num === 0) { // 判断目标方块四周是否有相同方块
        return false;
      }
      return true;
    },
    /**
     * 合并纵轴方块
     */
    merge() {
      const stack = []; // 记录空数组的栈
      for (let i = 0; i < this.stars.length; i++) {
        if (this.stars[i].length === 0) {
          stack.push(i);
        }
      }
      if (stack.length === 0) {
        this.disable = false;
        this.isOver();
        return;
      }

      // 标记目标横线移动坐标
      for (let k = 0; k < stack.length; k++) {
        const last = stack[k + 1] ? stack[k + 1] : this.stars.length;
        for (let i = stack[k] + 1; i < last; i++) {
          const line = this.stars[i];
          for (let j = 0; j < line.length; j++) {
            line[j].tx = line[j].x - unit * (k + 1);
          }
        }
      }

      // 清楚空纵向列表
      for (let i = this.stars.length - 1; i >= 0; i--) {
        if (this.stars[i].length === 0) {
          this.stars.splice(i, 1);
        }
      }

      // 横向移动
      let id;
      const _this = this;
      function moving() {
        let all = 0;
        let done = 0;
        for (let i = 0; i < _this.stars.length; i++) {
          const line = _this.stars[i];
          for (let j = 0; j < line.length; j++) {
            all++;
            if (line[j].tx === null) {
              done++;
              continue;
            }
            if (line[j].tx > line[j].x) {
              line[j].x += 2;
            }
            if (line[j].tx < line[j].x) {
              line[j].x -= 2;
            }
            if (line[j].tx === line[j].x) {
              line[j].tx = null;
            }
          }
        }
        _this.draw();
        if (all === done) {
          _this.disable = false;
          cancelAnimationFrame(id);
          _this.isOver();
        } else {
          id = requestAnimationFrame(moving);
        }
      }
      id = requestAnimationFrame(moving);
    },
    /**
     * 验证是否游戏结束
     */
    isOver() {
      let num = 0;
      for (let i = 0; i < this.stars.length; i++) {
        const line = this.stars[i];
        for (let j = 0; j < line.length; j++) {
          num++;
          if (this.hasBrother(i, j)) {
            return true;
          }
        }
      }
      if (num < 10) {
        this.score += (2000 - num * num * 20);
      }
      if (this.score >= this.targetScore) {
        this.level++;
        this.$toast(`第${this.level}关`);
        this.init();
        this.start();
      } else {
        this.$msg({
          message: `游戏结束，总得分：${this.score}分，是否重新开始?`,
          confirmButtonText: '重新开始',
          cancelButtonText: '离开',
          showCancelButton: true,
        }).then(action => {
          if (action === 'confirm') {
            this.level = 1;
            this.init();
            this.start();
          }
          if (action === 'cancel') {
            this.$router.go(-1);
          }
        });
      }
    },
    /**
     * 清空
     */
    clear() {
      for (let i = 0; i < this.stars.length; i++) {
        const line = this.stars[i];
        for (let j = 0; j < line.length; j++) {
          line[j].left = false;
          line[j].right = false;
          line[j].top = false;
          line[j].bottom = false;
          line[j].active = false;
        }
      }
    },
  },
  computed: {
    targetScore() {
      return 1000 + (this.level - 1) * 2000;
    },
  },
  components: {
    MyHeader: Header,
  },
  beforeDestroy() {
    this.canvas.removeEventListener('touchstart', this.touchEvent);
  },
};
</script>

<style>
@import './popstar.css';
</style>
