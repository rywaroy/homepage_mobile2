<template>
  <div>
    <my-header title="五子棋2.0" :back="true"></my-header>
    <div class="gobang__tip">
      <span class="gobang__tip-link" @click="showTip = true">先看看->游戏说明</span>
    </div>
    <div class="gobang__sign">
      <span>落子模式：</span>
      <div :class="['gobang__small-btn', {active: sign === 1}]" @click="sign = 1">点击落子</div>
      <div :class="['gobang__small-btn', {active: sign === 2}]" @click="sign = 2">拖动落子</div>
    </div>
    <div class="gobang__sign">
      <span>下棋模式：</span>
      <div :class="['gobang__small-btn', {active: mode === 1}]" @click="changeMode(1)">标准模式</div>
      <div :class="['gobang__small-btn', {active: mode === 2}]" @click="changeMode(2)">换手模式</div>
    </div>
    <div class="m-content gobang__content">
      <canvas id="gobang" class="gobang__canvas"></canvas>
    </div>
    <div class="gobang__bot">
      <div class="gobang__bot-btn first" @click="startGamge(true)">先手开始</div>
      <div class="gobang__bot-btn last" @click="startGamge(false)">后手开始</div>
    </div>
    <div class="gobang__change" v-if="showChangeBox">
      <div class="gobang__change-box">
        <p class="gobang__change-text">你就说，你换不换</p>
        <div class="gobang__change-btns">
          <div class="gobang__change-btn" @click="changeChess()">换换换</div>
          <div class="gobang__change-btn" @click="showChangeBox = false">不换！</div>
        </div>
      </div>
    </div>
    <div class="gobang__tip-mask" v-if="showTip">
      <div class="gobang__tip-box">
        <div class="gobang__tip-title">游戏说明</div>
        <div class="gobang__tip-content">
          <p>五子棋2.0</p>
          <p></p>
          <p>1.大改逻辑，比16年版本提升50智商</p>
          <p></p>
          <p>2.新增一种落子模式：拖动落子</p>
          <p>点击屏幕会在棋盘中央生成绿色棋子，移动手指改变棋子位置，移开手指则在指定位置落子</p>
          <p></p>
          <p>3.新增一种玩法：换子模式</p>
          <p>为了防止必胜开局，后手（白子）可以在第4手选择与对方交互棋子来破坏对方的优势开局（其实没什么用，我就判断了2个必胜开局，其他的微优势开局我也不在乎~）</p>
        </div>
        <div class="gobang__tip-btn" @click="showTip = false">知道了</div>
      </div>
    </div>
  </div>
</template>

<script>
import Header from '@/components/Header/Header.vue';

const WHITE = '#F5F5F5';
const BLACK = '#000';

export default {
  name: 'gobang',
  data() {
    return {
      canvas: null,
      ctx: null,
      unit: 24, // 单位像素
      cx: null, // canvas 位置
      cy: null, // canvas 位置
      board: [], // 棋盘列表
      isFirst: false, // 是否先手
      playStack: [], // 玩家下棋栈
      pcStack: [], // 电脑下棋栈
      step: 0, // 步数
      wins: [], // 所有赢法
      playerWins: [], // 玩家赢法
      pcWins: [], // 电脑赢法
      isOver: true, // 游戏是否结束
      isPlay: true, // 是否是玩家回合
      count: 0, // 赢法总数
      sign: 1, // 1：点击模式 2：移动模式
      mx: null, // 移动模式起始x坐标
      my: null, // 移动模式起始y坐标
      midx: null, // 棋盘中心点x
      midy: null, // 棋盘中心点y
      targetChessX: null, // 移动模式目标棋子X索引
      targetChessY: null, // 移动模式目标棋子Y索引
      mode: 1, // 模式 1：标准模式 2：换手模式
      showChangeBox: false, // 确认换手弹窗
      showTip: false, // 是否显示提示弹窗
    };
  },
  mounted() {
    this.canvas = document.getElementById('gobang');
    this.ctx = this.canvas.getContext('2d');
    this.canvas.width = this.unit * 15;
    this.canvas.height = this.unit * 15;
    setTimeout(() => {
      this.cx = this.canvas.getBoundingClientRect().left;
      this.cy = this.canvas.getBoundingClientRect().top;
    }, 800);
    this.midx = this.canvas.width / 2 + this.cx;
    this.midy = this.canvas.height / 2 + this.cy;
    this.bind();
    this.drawBoard();
  },
  methods: {
    init(firstDown = true) {
      this.isOver = false;
      this.step = 0;
      this.count = 0;
      this.pcStack = [];
      this.playStack = [];
      this.getWins();
      for (let i = 0; i < 15; i++) {
        this.board[i] = [];
        for (let j = 0; j < 15; j++) {
          this.board[i][j] = {
            x: this.unit / 2 + i * this.unit,
            y: this.unit / 2 + j * this.unit,
            piece: false,
            active: false,
          };
        }
      }
      if (!this.isFirst && firstDown) {
        this.board[7][7].piece = BLACK;
        this.pcPlaying(7, 7);
      } else {
        this.draw();
      }
    },
    getWins() { // 获取所有赢法
      const wins = [];
      const winMap = {};
      for (let i = 0; i < 15; i++) {
        wins[i] = [];
        for (let j = 0; j < 15; j++) {
          wins[i][j] = [];
        }
      }

      // 横线赢法
      for (let i = 0; i < 15; i++) {
        for (let j = 0; j < 11; j++) {
          const steps = [];
          for (let k = 0; k < 5; k++) {
            wins[j + k][i][this.count] = true;
            steps.push(`${j + k},${i}`);
          }
          winMap[this.count] = {
            steps,
            position: 1, // 1: 水平方向
          };
          this.count++;
        }
      }

      // 竖线赢法
      for (let i = 0; i < 15; i++) {
        for (let j = 0; j < 11; j++) {
          const steps = [];
          for (let k = 0; k < 5; k++) {
            wins[i][j + k][this.count] = true;
            steps.push(`${i},${j + k}`);
          }
          winMap[this.count] = {
            steps,
            position: 2, // 2: 垂直方向
          };
          this.count++;
        }
      }

      // 正斜线赢法
      for (let i = 0; i < 11; i++) {
        for (let j = 0; j < 11; j++) {
          const steps = [];
          for (let k = 0; k < 5; k++) {
            wins[i + k][j + k][this.count] = true;
            steps.push(`${i + k},${j + k}`);
          }
          winMap[this.count] = {
            steps,
            position: 3, // 3: 正斜线方向
          };
          this.count++;
        }
      }

      // 反斜线赢法
      for (let i = 0; i < 11; i++) {
        for (let j = 14; j > 3; j--) {
          const steps = [];
          for (let k = 0; k < 5; k++) {
            wins[i + k][j - k][this.count] = true;
            steps.push(`${i + k},${j - k}`);
          }
          winMap[this.count] = {
            steps,
            position: 4, // 4: 反斜线方向
          };
          this.count++;
        }
      }
      this.wins = wins;

      for (let i = 0; i < this.count; i++) {
        this.playerWins[i] = {
          number: 0,
          steps: winMap[i].steps,
          position: winMap[i].position,
        };
        this.pcWins[i] = {
          number: 0,
          steps: winMap[i].steps,
          position: winMap[i].position,
        };
      }
    },
    draw() { // 画图
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.drawBoard();
      this.drawPieces();
    },
    drawBoard() { // 画棋盘
      this.ctx.fillStyle = 'rgb(249, 214, 91)';
      this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
      for (let i = 0; i < 15; i++) {
        this.ctx.beginPath();
        this.ctx.moveTo(i * this.unit + this.unit / 2, this.unit / 2);
        this.ctx.lineTo(i * this.unit + this.unit / 2, this.unit * 14.5);
        this.ctx.stroke();
        this.ctx.moveTo(this.unit / 2, i * this.unit + this.unit / 2);
        this.ctx.lineTo(this.unit * 14.5, i * this.unit + this.unit / 2);
        this.ctx.stroke();
      }
    },
    drawPieces() { // 画棋子
      for (let i = 0; i < 15; i++) {
        for (let j = 0; j < 15; j++) {
          if (this.board[i][j].piece) {
            this.drawPiece(this.board[i][j]);
          }
        }
      }
    },
    drawPiece(data) {
      this.ctx.beginPath();
      this.ctx.fillStyle = data.piece;
      this.ctx.arc(data.x, data.y, this.unit / 2, 0, 2 * Math.PI, false);
      this.ctx.fill();
      if (data.active) {
        this.ctx.beginPath();
        this.ctx.fillStyle = 'red';
        this.ctx.arc(data.x, data.y, this.unit / 6, 0, 2 * Math.PI, false);
        this.ctx.fill();
      }
      this.ctx.closePath();
    },
    bind() { // 绑定事件
      this.canvas.addEventListener('touchstart', e => { // 棋盘点击事件绑定
        this.boardChessDownEvent(e);
      });
      document.querySelector('.gobang__content').addEventListener('touchstart', e => {
        this.boardMoveTouchStartEvent(e);
      });
      document.querySelector('.gobang__content').addEventListener('touchend', () => {
        this.boardMoveTouchEndEvent();
      });
    },
    boardMoveTouchStartEvent(e) {
      if (this.isOver) {
        return;
      }
      if (!this.isPlay) {
        return;
      }
      if (this.sign !== 2) {
        return;
      }
      this.mx = e.touches[0].clientX;
      this.my = e.touches[0].clientY;
      document.querySelector('.gobang__content').addEventListener('touchmove', this.boardTouchMoveEvent);
    },
    boardMoveTouchEndEvent() {
      if (this.targetChessX === null && this.targetChessX === null) {
        return;
      }
      if (!this.board[this.targetChessX][this.targetChessY].piece) {
        this.boardChessDownEvent(null, this.targetChessX, this.targetChessY);
        this.targetChessX = null;
        this.targetChessY = null;
      } else {
        this.draw(); // 清空
      }
      document.querySelector('.gobang__content').removeEventListener('touchmove', this.boardTouchMoveEvent);
    },
    boardChessDownEvent(e, xi, yi, auto = false) { // 落子事件
      if (this.isOver) {
        return;
      }
      if (this.sign !== 1 && e) {
        return;
      }
      if (e) {
        const x = e.touches[0].clientX;
        const y = e.touches[0].clientY;
        xi = this.getBoardLocation(x, y).xi;
        yi = this.getBoardLocation(x, y).yi;
      }
      if (!this.board[xi][yi].piece) {
        this.board[xi][yi].piece = this.isFirst ? BLACK : WHITE;
        this.playStack.push(`${xi},${yi}`); // 入栈
        this.step++;
        this.draw();
        for (let k = 0; k < this.count; k++) {
          if (this.wins[xi][yi][k]) { // 查找是否有这种赢法
            this.playerWins[k].number++; // 该赢法加1子
            this.pcWins[k].number = 10; // 玩家占了1子，电脑在该赢法上不可能获胜
            if (this.playerWins[k].number === 5) {
              this.$msg({
                title: '提示',
                message: '恭喜，你赢了！',
                closeOnClickModal: false,
              });
              this.isOver = true;
            }
          }
        }
        if (!this.isOver && !auto) {
          this.isPlay = false; // 交换
          this.pcPlaying();
        }
      }
    },
    boardTouchMoveEvent(e) { // 移动事件
      const x = this.midx - (this.mx - e.touches[0].clientX);
      const y = this.midy - (this.my - e.touches[0].clientY);
      const { xi, yi } = this.getBoardLocation(x, y);
      if (xi < 0 || xi > 14) { // 出界
        return;
      }
      if (yi < 0 || yi > 14) { // 出界
        return;
      }
      if (xi !== this.targetChessX || yi !== this.targetChessY) {
        this.targetChessX = xi;
        this.targetChessY = yi;
        this.draw();
        this.drawTargeChess(xi, yi);
      }
    },
    pcPlaying(i, j) { // 电脑回合
      this.step++;
      const playScore = [];
      const pcScore = [];
      let max = 0;
      let u = 0;
      let v = 0;
      let num = 0;
      let pm = 0;
      if (j === undefined && j === undefined) {
        for (let i = 0; i < 15; i++) {
          playScore[i] = [];
          pcScore[i] = [];
          for (let j = 0; j < 15; j++) {
            playScore[i][j] = 0;
            pcScore[i][j] = 0;
          }
        }
        for (let i = 0; i < 15; i++) {
          for (let j = 0; j < 15; j++) {
            // 遍历搜索棋盘上每个空位，查询每个空位的赢法
            if (!this.board[i][j].piece) {
              num++;
              for (let k = 0; k < this.count; k++) {
                if (this.wins[i][j][k]) {
                  // 判断每种玩家赢法上有多少子来判断权重
                  if (this.playerWins[k].number === 1) {
                    playScore[i][j] += 100;
                  }
                  if (this.playerWins[k].number === 2) {
                    if (this.checkWins(this.playerWins[k], false)) {
                      playScore[i][j] += 200;
                    } else {
                      playScore[i][j] += 1000;
                    }
                  }
                  if (this.playerWins[k].number === 3) {
                    if (this.checkWins(this.playerWins[k], false)) { // 检测3个子中是否已经被其他子侵占
                      playScore[i][j] += 400;
                    } else {
                      playScore[i][j] += 1000000;
                    }
                  }
                  if (this.playerWins[k].number === 4) {
                    playScore[i][j] += 100000000;
                  }
                  // 判断每种电脑赢法上有多少子来判断权重（进攻优于防守）
                  if (this.pcWins[k].number === 1) {
                    if (this.checkWins(this.pcWins[k], true)) {
                      pcScore[i][j] += 100;
                    } else {
                      if (this.pcWins[k].position === 3 || this.pcWins[k].position === 4) { // 斜线权重大于直线
                        pcScore[i][j] += 260;
                      } else {
                        pcScore[i][j] += 220;
                      }
                    }
                  }
                  if (this.pcWins[k].number === 2) {
                    if (this.checkWins(this.pcWins[k], true)) {
                      pcScore[i][j] += 220;
                    } else {
                      pcScore[i][j] += 10000;
                    }
                  }
                  if (this.pcWins[k].number === 3) {
                    if (this.checkWins(this.pcWins[k], true)) {
                      pcScore[i][j] += 100000;
                    } else {
                      pcScore[i][j] += 10000000;
                    }
                  }
                  if (this.pcWins[k].number === 4) {
                    pcScore[i][j] += 1000000000;
                  }
                }
              }
              if (playScore[i][j] > pm) {
                pm = playScore[i][j];
              }
              if (playScore[i][j] + pcScore[i][j] > max) {
                max = playScore[i][j] + pcScore[i][j];
                u = i;
                v = j;
              }
            }
          }
        }
        if (num === 0) {
          this.$msg({
            title: '提示',
            message: '死棋，请重新开始',
            closeOnClickModal: false,
          });
          return;
        }
      } else {
        u = i;
        v = j;
      }
      if (this.mode === 2 && this.step === 4) { // 还手回合
        if (pm > 3100) {
          this.$toast('电脑觉得你很有潜力，决定跟你换子，请你继续落子');
          this.changeChess();
          return;
        }
        this.$toast('电脑觉得你很菜，懒得跟你换子');
      }
      for (let i = 0; i < 15; i++) {
        for (let j = 0; j < 15; j++) {
          this.board[i][j].active = false;
        }
      }
      // 最终遍历出权重最高的 u,v 点
      this.board[u][v].active = true; // 最新一步
      this.pcBoardChessDownEvent(u, v);
      if (!this.isOver) {
        this.isPlay = true;
      }
      if (this.step === 3 && this.mode === 2) {
        this.showChangeBox = true;
      }
    },
    pcBoardChessDownEvent(u, v) { // 电脑落子事件
      this.board[u][v].piece = this.isFirst ? WHITE : BLACK;
      this.draw();
      this.pcStack.push(`${u},${v}`);
      for (let k = 0; k < this.count; k++) {
        if (this.wins[u][v][k]) {
          this.pcWins[k].number++;
          this.playerWins[k].number = 10; // 这个位置对方不可能赢了
          if (this.pcWins[k].number === 5) {
            this.$msg({
              title: '提示',
              message: '电脑赢了',
              closeOnClickModal: false,
            });
            this.isOver = true;
          }
        }
      }
    },
    checkWins(win, me) { // 检查某个赢法是否被堵死
      const first = win.steps[0]; // 第一子
      const firstX = Number(first.split(',')[0]);
      const firstY = Number(first.split(',')[1]);
      const isFirstSeize = this.board[firstX][firstY].piece ? true : false;
      const last = win.steps[4]; // 最后一子
      const lastX = Number(last.split(',')[0]);
      const lastY = Number(last.split(',')[1]);
      const isLastSeize = this.board[lastX][lastY].piece ? true : false;
      let piece;
      if (this.isFirst) {
        if (me) {
          piece = BLACK;
        } else {
          piece = WHITE;
        }
      } else {
        if (me) {
          piece = WHITE;
        } else {
          piece = BLACK;
        }
      }
      // const piece = this.isFirst ? (me ? BLACK : WHITE) : (me ? WHITE : BLACK);
      if (win.position === 1) { // 横线
        if (firstX - 1 < 0) { // 出界
          return false;
        }
        if (lastX + 1 > 14) { // 出界
          return false;
        }
        if (((this.board[firstX - 1][firstY].piece === piece) && isFirstSeize) || ((this.board[lastX + 1][lastY].piece === piece) && isLastSeize)) {
          return true;
        }
      }
      if (win.position === 2) { // 竖线
        if (firstY - 1 < 0) { // 出界
          return false;
        }
        if (lastY + 1 > 14) { // 出界
          return false;
        }
        if (((this.board[firstX][firstY - 1].piece === piece) && isFirstSeize) || ((this.board[lastX][lastY + 1].piece === piece) && isLastSeize)) {
          return true;
        }
      }
      if (win.position === 3) { // 正斜线
        if ((firstX - 1 < 0) || (firstY - 1 < 0)) { // 出界
          return false;
        }
        if ((lastX + 1 > 14) || (lastY + 1 > 14)) { // 出界
          return false;
        }
        if (((this.board[firstX - 1][firstY - 1].piece === piece) && isFirstSeize) || ((this.board[lastX + 1][lastY + 1].piece === piece) && isLastSeize)) {
          return true;
        }
      }
      if (win.position === 4) { // 返斜线
        if ((firstX - 1 < 0) || (firstY + 1 > 14)) { // 出界
          return false;
        }
        if ((lastX + 1 > 14) || (lastY - 1 < 0)) { // 出界
          return false;
        }
        if (((this.board[firstX - 1][firstY + 1].piece === piece) && isFirstSeize) || ((this.board[lastX + 1][lastY - 1].piece === piece) && isLastSeize)) {
          return true;
        }
      }
      return false;
    },
    startGamge(isFirst) { // 开始游戏
      if (this.isOver) {
        this.isFirst = isFirst;
        this.init();
        this.$toast('游戏开始！');
      } else { // 若正在游戏中，则提示
        this.$msg({
          message: '正在游戏中，是否重新开始?',
          confirmButtonText: '重新开始',
          cancelButtonText: '离开',
          showCancelButton: true,
          closeOnClickModal: false,
        }).then(action => {
          if (action === 'confirm') {
            this.isFirst = isFirst;
            this.init();
          }
        });
      }
    },
    getBoardLocation(x, y) { // 根据坐标获取在棋盘上的位置
      return {
        xi: Math.round((x - this.cx - this.unit / 2) / this.unit),
        yi: Math.round((y - this.cy - this.unit / 2) / this.unit),
      };
    },
    drawTargeChess(x, y) {
      this.ctx.beginPath();
      this.ctx.fillStyle = '#85ef47';
      this.ctx.arc(this.board[x][y].x, this.board[x][y].y, this.unit / 2, 0, 2 * Math.PI, false);
      this.ctx.fill();
    },
    changeMode(mode) { // 切换模式
      if (!this.isOver) {
        this.$msg({
          message: '正在游戏中，是否重新开始?',
          confirmButtonText: '重新开始',
          cancelButtonText: '离开',
          showCancelButton: true,
          closeOnClickModal: false,
        }).then(action => {
          if (action === 'confirm') {
            this.mode = mode;
            this.init();
          }
        });
      } else {
        this.mode = mode;
      }
    },
    changeChess() { // 换手
      const first = this.isFirst; // true:  false: 玩家换手
      this.isFirst = !this.isFirst;
      const pcStack = JSON.parse(JSON.stringify(this.pcStack));
      const playStack = JSON.parse(JSON.stringify(this.playStack));
      this.init(false); // 清空
      if (first) { // 电脑换手
        const step1 = playStack.shift();
        this.pcBoardChessDownEvent(step1.split(',')[0], step1.split(',')[1]);
        this.step++;
        const step2 = pcStack.shift();
        this.boardChessDownEvent(null, step2.split(',')[0], step2.split(',')[1], true);
        const step3 = playStack.shift();
        this.pcBoardChessDownEvent(step3.split(',')[0], step3.split(',')[1]);
        this.step++;
        this.isPlay = true;
      } else {
        const step1 = pcStack.shift();
        this.boardChessDownEvent(null, step1.split(',')[0], step1.split(',')[1], true);
        const step2 = playStack.shift();
        this.pcBoardChessDownEvent(step2.split(',')[0], step2.split(',')[1]);
        this.step++;
        const step3 = pcStack.shift();
        this.boardChessDownEvent(null, step3.split(',')[0], step3.split(',')[1], true);
        this.isPlay = false;
        this.pcPlaying();
        this.showChangeBox = false;
      }
    },
  },
  components: {
    MyHeader: Header,
  },
  destroyed() {
    this.canvas.removeEventListener('touchstart', e => { // 解除棋盘点击事件绑定
      this.boardChessDownEvent(e);
    });
    document.querySelector('.gobang__content').removeEventListener('touchstart', e => {
      this.boardMoveTouchStartEvent(e);
    });
    document.querySelector('.gobang__content').removeEventListener('touchend', () => {
      this.boardMoveTouchEndEvent();
    });
  },
};
</script>

<style>
@import './gobang.css';
</style>
