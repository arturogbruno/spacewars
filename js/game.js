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

    init() {
        this.canvas = document.querySelector('#canvas');
        this.ctx = this.canvas.getContext('2d');
        this.setCanvasDimensions();
        window.onresize = this.setCanvasDimensions;
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
            this.drawSeparator();
            this.drawAll();
            this.moveAll();
            this.spaceship.bulletReachAlien(this.aliens);
            this.bulletReachSpaceship(this.spaceship);
            this.alienShoot();
        }, 1000 / this.fps);
    },

    reset() {
        this.spaceship = new Spaceship(this.ctx, this.canvasWidth, this.canvasHeight);
        let lifePosX = 10;
        for(let i = 0; i < this.spaceship.lives.length; i++) {
            this.spaceship.lives[i] = new Life(this.ctx, this.canvasWidth, this.canvasHeight, lifePosX);
            lifePosX += 40;
        }
        scoreboard.init(this.ctx, this.canvasWidth, this.canvasHeight);
    }, 
    
    generateAliens() {
        let rows = 4;
        let columns = 10;
        posY = 20;
        for(let i = 0; i < rows; i++) {
            posX = 60;
            this.aliens[i] = new Array();
            for(let j = 0; j < columns; j++) {
                this.aliens[i][j] = new Alien(this.ctx, this.canvasWidth, this.canvasHeight, posX, posY);
                posX += 60;
            }
            posY += 45;
        }
    },
    
    drawAll() {
        this.spaceship.draw();
        this.aliens.forEach(aliensRow => aliensRow.forEach(alien => alien.draw(alien)));       
        scoreboard.draw();     
        scoreboard.updateScore(this.spaceship.score);
    },

    moveAll() {
        this.spaceship.move();
        this.moveAliensX();
    },

    moveAliensX() {
        if(this.framesCounter % 20 === 0) {
            let firstAlien = this.aliens[0][0];
            let lastAlien = this.aliens[0][this.aliens[0].length - 1];
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
    },

    moveAliensY() {
        this.aliens.forEach(aliensRow => aliensRow.forEach(alien => alien.posY += 30));
    },

    alienShoot() {
        if(this.framesCounter % 40 === 0) {
            let random1 = Math.floor(Math.random() * this.aliens.length);
            let random2 = Math.floor(Math.random() * this.aliens[0].length);
            this.aliens[random1][random2].shoot();
        }
    },

    bulletReachSpaceship() {
        this.aliens.forEach(aliensRow => aliensRow.forEach(alien => alien.bulletReachSpaceship(this.spaceship)));
    },

    clear() {
        this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
        if(this.spaceship.lives.length === 0) {
            setTimeout(this.gameOver, 1000);
        }
    },

    gameOver() {
        clearInterval(this.intervalID);
        console.log('GAME OVER');
    }
}

