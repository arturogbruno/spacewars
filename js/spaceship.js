class Spaceship {
    constructor(ctx, canvasW, canvasH) {
        this.ctx = ctx;
        this.canvasW = canvasW;
        this.canvasH = canvasH;
        this.spaceshipImg = new Image();
        this.spaceshipImg.src = '../img/spaceship.png';
        this.width = 40;
        this.height = 50;
        this.posX = canvasW / 2 - this.width / 2;
        this.posY = canvasH - this.height - 45;
        this.bullets = [];
        this.keys = [];
        this.lives = new Array(3);
        this.score = 0;
        this.setListeners();
    }



    setListeners() {
        document.addEventListener('keydown', e => this.keys[e.keyCode] = true);
        document.addEventListener('keyup', e => this.keys[e.keyCode] = false);
        document.addEventListener('keydown', e => {
            if(e.keyCode === 32) {
                this.shoot();
            }
        });
    }

    draw() {
        this.ctx.drawImage(this.spaceshipImg, this.posX, this.posY, this.width, this.height);
        this.lives.forEach(life => life.draw());
        this.bullets.forEach(bullet => bullet.draw('spaceship'));
        this.bullets.forEach(bullet => bullet.move('spaceship'));
        this.clearBullets();
    }

    move() {
        if(this.keys[37]) {
            if(this.posX - 4 <= 5) {
                this.posX = 5;
            } else {
                this.posX -= 4;
            }
        }
        if(this.keys[39]) {
            if(this.posX + 4 >= this.canvasW - this.width - 5) {
                this.posX = this.canvasW - this.width - 5;
            } else {
                this.posX += 4;
            }
        }
    }

    shoot() {
        this.bullets.push(new Bullet(this.ctx, this.posX, this.posY, this.width));
    }

    clearBullets() {
        this.bullets = this.bullets.filter(bullet => bullet.posY >= 0);
    }

    bulletReachAlien(aliens) {
        this.bullets.forEach(bullet => {
            aliens.forEach((aliensRow, idx) => aliensRow.forEach((alien, subidx) => {
                if(bullet.posX + bullet.width >= alien.posX &&
                    bullet.posY + bullet.height >= alien.posY &&
                    bullet.posX <= alien.posX + alien.width &&
                    bullet.posY <= alien.posY + alien.height) {
                        this.bullets.shift();
                        this.score += 50;
                        alien.image.framesIndexY++;
                        setTimeout(() => {
                            aliens[idx].splice(subidx, 1);
                            if(aliens[idx].length === 0) {
                                aliens.splice(idx, 1);
                            } 
                        }, 200);  
                }
            }));
        });
    }
}