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
        this.ctx = this.canvas.getContext('2d');
        this.setCanvasDimensions();
        window.onresize = this.setCanvasDimensions;
        this.level = level;
        this.start();
    },

    setCanvasDimensions() {
        let w = window.innerWidth;
        let h = window.innerHeight;
        let canvasWidth = w * 0.85;
        let canvasHeight = h * 0.75;
        if(canvasWidth > 1100) {
            this.canvas.setAttribute('width', '1100px');
            this.canvasWidth = 1100;
        }else {
            this.canvas.setAttribute('width', `${canvasWidth}px`);
            this.canvasWidth = canvasWidth;
        }
        this.canvas.setAttribute('height', `${canvasHeight}px`);
        this.canvasHeight = canvasHeight;
    },

    drawSeparator() {
        this.ctx.beginPath();
        this.ctx.moveTo(0, this.canvasHeight - 40);
        this.ctx.lineTo(this.canvasWidth / 4, this.canvasHeight - 40);
        this.ctx.lineWidth = 3;
        let leftGrd = this.ctx.createLinearGradient(0, 0, this.canvasWidth / 4, 0);
        leftGrd.addColorStop(0, 'rgba(255, 255, 255, 0.65)');
        leftGrd.addColorStop(1, 'rgba(255, 255, 255, 0)');
        this.ctx.strokeStyle = leftGrd;
        this.ctx.stroke();
        this.ctx.closePath();

        this.ctx.beginPath();
        this.ctx.moveTo(this.canvasWidth, this.canvasHeight - 40);
        this.ctx.lineTo((this.canvasWidth / 4) * 3, this.canvasHeight - 40);
        this.ctx.lineWidth = 3;
        let rightGrd = this.ctx.createLinearGradient(this.canvasWidth, 0, (this.canvasWidth / 4) * 3, 0);
        rightGrd.addColorStop(0, 'rgba(255, 255, 255, 0.65)');
        rightGrd.addColorStop(1, 'rgba(255, 255, 255, 0)');
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
            this.spaceship.bulletReachAlien(this.aliens);
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
        for(let i = 0; i < this.spaceship.lives.length; i++) {
            this.spaceship.lives[i] = new Life(this.ctx, this.canvasWidth, this.canvasHeight, lifePosX);
            lifePosX += 40;
        }
        scoreboard.init(this.ctx, this.canvasWidth, this.canvasHeight, this.level);
        if(this.level === 1) {
            this.velX = 20;
        } else {
            this.velX = 15;
        }
    }, 
    
    generateAliens() {
        let rows = 4;
        let columns = 10;
        posY = 70;
        for(let i = 0; i < rows; i++) {
            posX = 60;
            this.aliens[i] = new Array();
            for(let j = 0; j < columns; j++) {
                let newAlien = new Alien(this.ctx, this.canvasWidth, this.canvasHeight, posX, posY);
                posX += 70;
                newAlien.getRandomImage();
                this.aliens[i][j] = newAlien;
            }
            posY += 45;
        }
    },
    
    drawAll() {
        this.background.draw();
        this.drawSeparator();
        this.spaceship.draw();
        this.aliens.forEach(aliensRow => aliensRow.forEach(alien => alien.draw(alien, this.framesCounter)));       
        scoreboard.draw();     
        scoreboard.updateScore(this.spaceship.score);
    },

    moveAll() {
        this.background.move();
        this.spaceship.move();
        this.moveAliensX();
    },

    moveAliensX() {
        if(this.framesCounter % this.velX === 0) {
            let maxLengthRow = this.aliens[0];
            this.aliens.forEach(aliensRow => {
                if(aliensRow.length > maxLengthRow.length) {
                    maxLengthRow = aliensRow;
                }
            });
            if(this.aliens.length != 0) {
                let firstAlien = maxLengthRow[0];
                let lastAlien = maxLengthRow[maxLengthRow.length - 1];
                if(firstAlien.posX <= 10) {
                    this.sense = 1;
                    this.moveAliensY();
                }
                if(lastAlien.posX >= this.canvasWidth - 50) {
                    this.sense = -1;
                    this.moveAliensY();
                }
                this.aliens.forEach(alienRow => alienRow.forEach(alien => alien.posX += this.sense * 10));
            }
        }
    },

    moveAliensY() {
        if(this.aliens[this.aliens.length - 1][0].posY > this.spaceship.posY - this.spaceship.height) {
            this.gameOver();
        } else {
            this.aliens.forEach(aliensRow => aliensRow.forEach(alien => alien.posY += 50));
        }
    },

    accelerateAliens(aliensAmount) {
        if(aliensAmount < 35 && this.velX >= 20) {
            this.velX -= 5;
        } else if(aliensAmount < 25 && this.velX >= 15) {
            this.velX -= 5;
        } else if(aliensAmount < 15 && this.velX >= 10) {
            this.velX -= 5;
        }
    },

    alienShoot() {
        this.level === 1 ? this.shootingVel = 40 : this.shootingVel = 20;
        if(this.framesCounter % this.shootingVel === 0) {
            let random1 = Math.floor(Math.random() * this.aliens.length);
            let random2 = Math.floor(Math.random() * this.aliens[random1].length);
            this.aliens[random1][random2].shoot();
        }
    },

    bulletReachSpaceship() {
        this.aliens.forEach(aliensRow => aliensRow.forEach(alien => alien.bulletReachSpaceship(this.spaceship)));
    },

    clear() {
        this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
    },

    hasLives() {
        if(this.spaceship.lives.length === 0) {
            this.gameOver();
        }
    },

    countAliens() {
        let aliensAmount = 0;
        this.aliens.forEach(aliensRow => {
            aliensAmount += aliensRow.length;
        });
        if(aliensAmount > 0) {
            this.accelerateAliens(aliensAmount);
        } else {
            this.playerWin();
        }
    },

    playerWin() {
        clearInterval(this.intervalID);
        endScreen.showEndScreen(canvas, 'win');
    },

    gameOver() {
            clearInterval(this.intervalID);
            endScreen.showEndScreen(canvas, 'lose');
    }
}