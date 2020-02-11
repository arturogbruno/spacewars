const game = {
  canvas: undefined,
  ctx: undefined,
  canvasWidth: undefined,
  canvasHeight: undefined,
  spaceship: undefined,
  aliens: [],
  fps: 60,
  framesCounter: 0,
  sense: 1,
  level: 1,
  velX: 20,
  shootingVel: 40,

  init(canvas, level = 1) {
    this.canvas = canvas;
    this.ctx = this.canvas.getContext("2d");
    this.setCanvasDimensions();
    window.onresize = this.setCanvasDimensions;
    this.level = level;
    this.start();
  },

  setCanvasDimensions() {
    let w = window.innerWidth;
    let h = window.innerHeight;
    let canvasWidth = w * 0.85;
    let canvasHeight = h * 0.7;
    if (canvasWidth > 1100) {
      this.canvas.setAttribute("width", "1100px");
      this.canvasWidth = 1100;
    } else {
      this.canvas.setAttribute("width", `${canvasWidth}px`);
      this.canvasWidth = canvasWidth;
    }
    this.canvas.setAttribute("height", `${canvasHeight}px`);
    this.canvasHeight = canvasHeight;
  },

  drawSeparator() {
    this.ctx.beginPath();
    this.ctx.moveTo(0, this.canvasHeight - 40);
    this.ctx.lineTo(this.canvasWidth / 4, this.canvasHeight - 40);
    this.ctx.lineWidth = 3;
    let leftGrd = this.ctx.createLinearGradient(0, 0, this.canvasWidth / 4, 0);
    leftGrd.addColorStop(0, "rgba(255, 255, 255, 0.65)");
    leftGrd.addColorStop(1, "rgba(255, 255, 255, 0)");
    this.ctx.strokeStyle = leftGrd;
    this.ctx.stroke();
    this.ctx.closePath();

    this.ctx.beginPath();
    this.ctx.moveTo(this.canvasWidth, this.canvasHeight - 40);
    this.ctx.lineTo((this.canvasWidth / 4) * 3, this.canvasHeight - 40);
    this.ctx.lineWidth = 3;
    let rightGrd = this.ctx.createLinearGradient(
      this.canvasWidth,
      0,
      (this.canvasWidth / 4) * 3,
      0
    );
    rightGrd.addColorStop(0, "rgba(255, 255, 255, 0.65)");
    rightGrd.addColorStop(1, "rgba(255, 255, 255, 0)");
    this.ctx.strokeStyle = rightGrd;
    this.ctx.stroke();
    this.ctx.closePath();
  },

  start() {
    this.reset();
    this.generateAliens();
    this.intervalID = setInterval(() => {
      if (this.framesCounter > 5000) {
        this.framesCounter = 0;
      }
      this.framesCounter++;
      this.clear();
      this.drawAll();
      this.moveAll();
      this.bulletReachAlien();
      this.bulletReachSpaceship(this.spaceship);
      this.alienShoot();
      this.countAliens();
      this.accelerateAliens();
      this.hasLives();
    }, 1000 / this.fps);
  },

  reset() {
    this.background = new Background(this.ctx, this.canvasWidth, this.canvasHeight);
    this.spaceship = new Spaceship(this.ctx, this.canvasWidth, this.canvasHeight);
    this.aliens = [];
    let lifePosX = 10;
    for (let i = 0; i < this.spaceship.lives.length; i++) {
      this.spaceship.lives[i] = new Life(this.ctx, this.canvasWidth, this.canvasHeight, lifePosX);
      lifePosX += 40;
    }
    scoreboard.init(this.ctx, this.canvasWidth, this.canvasHeight, this.level);
    if (this.level === 1) {
      this.velX = 20;
    } else {
      this.velX = 15;
    }

    this.bgMusic = new Howl({
      src: ["./sounds/bg_music.mp3"],
      autoplay: false,
      loop: true,
      volume: 1
    });

    this.bgMusic.play();

    this.deadAlienSound = new Howl({
      src: ["./sounds/invaderkilled.wav"],
      autoplay: false,
      loop: false,
      volume: 1
    });

    this.explosionSound = new Howl({
      src: ["./sounds/explosion.wav"],
      autoplay: false,
      loop: false,
      volume: 1
    });

    this.gameOverSound = new Howl({
      src: ["./sounds/game_over.wav"],
      autoplay: false,
      loop: false,
      volume: 1
    });

    this.victorySound = new Howl({
      src: ["./sounds/victory.wav"],
      autoplay: false,
      loop: false,
      volume: 1
    });
  },

  generateAliens() {
    this.aliens = AlienFlock(2, this.ctx, this.canvasWidth, this.canvasHeight);
  },

  drawAll() {
    this.background.draw();
    this.drawSeparator();
    this.spaceship.draw(this.framesCounter);
    this.aliens.forEach(aliensRow =>
      aliensRow.forEach(alien => alien.draw(alien, this.framesCounter))
    );
    scoreboard.draw();
    scoreboard.updateScore(this.spaceship.score);
  },

  moveAll() {
    this.background.move();
    this.spaceship.move();
    this.moveAliensX();
  },

  moveAliensX() {
    if (this.framesCounter % this.velX === 0) {
      let allAliens = this.aliens.flat().sort((a, b) => a.posX - b.posX);
      let leftAlien = allAliens[0];
      let rigthAlien = allAliens[allAliens.length - 1];
      if (this.aliens.length != 0) {
        if (leftAlien.posX <= 10) {
          this.sense = 1;
          this.moveAliensY();
        }
        if (rigthAlien.posX >= this.canvasWidth - 50) {
          this.sense = -1;
          this.moveAliensY();
        }
        this.aliens.forEach(alienRow => alienRow.forEach(alien => (alien.posX += this.sense * 10)));
      }
    }
  },

  moveAliensY() {
    if (this.aliens[this.aliens.length - 1][0].posY > this.spaceship.posY - this.spaceship.height) {
      this.gameOver();
    } else {
      this.aliens.forEach(aliensRow => aliensRow.forEach(alien => (alien.posY += 50)));
    }
  },

  accelerateAliens(aliensAmount) {
    if (aliensAmount < 35 && this.velX >= 20) {
      this.velX -= 5;
    } else if (aliensAmount < 25 && this.velX >= 15) {
      this.velX -= 5;
    } else if (aliensAmount < 15 && this.velX >= 10) {
      this.velX -= 5;
    }
  },

  alienShoot() {
    this.level === 1 ? (this.shootingVel = 40) : (this.shootingVel = 20);
    if (this.framesCounter % this.shootingVel === 0) {
      let random1 = Math.floor(Math.random() * this.aliens.length);
      let random2 = Math.floor(Math.random() * this.aliens[random1].length);
      this.aliens[random1][random2].shoot();
    }
  },

  bulletReachAlien() {
    this.spaceship.bullets.forEach(bullet => {
      this.aliens.forEach((aliensRow, idx) =>
        aliensRow.forEach((alien, subidx) => {
          if (
            bullet.posX + bullet.width >= alien.posX &&
            bullet.posY + bullet.height >= alien.posY &&
            bullet.posX <= alien.posX + alien.width &&
            bullet.posY <= alien.posY + alien.height
          ) {
            this.spaceship.bullets.shift();
            this.spaceship.score += 50;
            this.deadAlienSound.play();
            alien.image.framesIndexY++;
            setTimeout(() => {
              this.aliens[idx].splice(subidx, 1);
              if (this.aliens[idx].length === 0) {
                this.aliens.splice(idx, 1);
              }
            }, 200);
          }
        })
      );
    });
  },

  bulletReachSpaceship() {
    this.aliens.forEach(aliensRow =>
      aliensRow.forEach(alien => {
        alien.bullets.forEach((bullet, idx) => {
          if (
            bullet.posX + bullet.width >= this.spaceship.posX &&
            bullet.posY + bullet.height >= this.spaceship.posY &&
            bullet.posX <= this.spaceship.posX + this.spaceship.width &&
            bullet.posY <= this.spaceship.posY + this.spaceship.height
          ) {
            this.explosionSound.play();
            alien.bullets.splice(idx, 1);
            this.spaceship.lives.pop();
          }
        });
      })
    );
  },

  clear() {
    this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
  },

  hasLives() {
    if (this.spaceship.lives.length === 0) {
      this.gameOver();
    }
  },

  countAliens() {
    let aliensAmount = 0;
    this.aliens.forEach(aliensRow => {
      aliensAmount += aliensRow.length;
    });
    if (aliensAmount > 0) {
      this.accelerateAliens(aliensAmount);
    } else {
      this.playerWin();
    }
  },

  playerWin() {
    this.bgMusic.stop();
    this.victorySound.play();
    clearInterval(this.intervalID);
    endScreen.showEndScreen(canvas, "win");
  },

  gameOver() {
    this.bgMusic.stop();
    this.gameOverSound.play();
    clearInterval(this.intervalID);
    endScreen.showEndScreen(canvas, "lose");
  }
};

function AlienFlock(type, ctx, canvasWidth, canvasHeight) {
  let rows, columns, initialPosX, posY, posXInc, posYInc;

  switch (type) {
    case 1:
      posXInc = 70;
      posYInc = 45;
      initialPosX = 60;
      rows = 4;
      columns = 10;
      posY = 70;
      break;

    case 2:
      posXInc = 50;
      posYInc = 35;
      initialPosX = 40;
      rows = 6;
      columns = 12;
      posY = 70;
      break;
  }

  let aliens = [];

  for (let i = 0; i < rows; i++) {
    posX = initialPosX;
    aliens[i] = new Array();
    for (let j = 0; j < columns; j++) {
      let newAlien = new AlienFactory(ctx, canvasWidth, canvasHeight, posX, posY);
      posX += posXInc;
      aliens[i][j] = newAlien;
    }
    posY += posYInc;
  }

  return aliens;
}
