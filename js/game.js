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
        let leftGrd = this.ctx.createLinearGradient(0, 0, 200, 0);
        leftGrd.addColorStop(0, 'rgba(255, 255, 255, 0.65)');
        leftGrd.addColorStop(1, 'rgba(255, 255, 255, 0)');
        this.ctx.strokeStyle = leftGrd;
        this.ctx.stroke();
        this.ctx.closePath();

        this.ctx.beginPath();
        this.ctx.moveTo((this.canvasWidth / 4) * 3, this.canvasHeight - 40);
        this.ctx.lineTo(this.canvasWidth, this.canvasHeight - 40);
        this.ctx.lineWidth = 3;
        let rightGrd = this.ctx.createLinearGradient((this.canvasWidth / 4) * 3, 0, this.canvasWidth, 0);
        rightGrd.addColorStop(0, 'rgba(255, 255, 255, 0)');
        rightGrd.addColorStop(1, 'rgba(255, 255, 255, 0.65)');
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
            this.alienShoot();
            this.bulletReachAlien();
            console.log(this.aliens[0][0].bullets);
        }, 1000 / this.fps);
    },

    reset() {
        this.spaceship = new Spaceship(this.ctx, this.canvasWidth, this.canvasHeight);
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
        if(this.framesCounter % 200 === 0) {
            this.aliens[0][0].shoot();
        }
    },

    bulletReachAlien() {
        this.spaceship.bullets.forEach(bullet => {
            this.aliens.forEach((aliensRow, idx) => aliensRow.forEach((alien, subidx) => {
                if(bullet.posX + bullet.width >= alien.posX &&
                    bullet.posY + bullet.height >= alien.posY &&
                    bullet.posX <= alien.posX + alien.width &&
                    bullet.posY <= alien.posY + alien.height) {
                        this.spaceship.bullets.shift();
                        this.aliens[idx].splice(subidx, 1);
                        
                    }
            }));
        });
    },

    clear() {
        this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
    } 
}

