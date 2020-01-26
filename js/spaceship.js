class Spaceship {
    constructor(ctx, canvasW, canvasH) {
        this.ctx = ctx;
        this.canvasW = canvasW;
        this.canvasH = canvasH;
        this.spaceshipImg = new Image();
        this.spaceshipImg.src = '../img/spaceship.png';
        this.width = 40;
        this.height = 50;
        this.posX = canvasW / 2 - 20;
        this.posY = canvasH - 65;
        this.bullets = [];
        this.setListeners();
    }

    setListeners() {
        document.addEventListener('keydown', e => {
            switch(e.keyCode) {
                case 37:
                    this.moveLeft();
                    break;
                case 39:
                    this.moveRight();
                    break;
                case 32:
                    this.shoot();
                    break;
            }
        });
    }

    draw() {
        this.ctx.drawImage(this.spaceshipImg, this.posX, this.posY, this.width, this.height);
        this.bullets.forEach(bullet => bullet.draw());
        this.bullets.forEach(bullet => bullet.move());
        this.clearBullets();
    }

    moveLeft() {
        if(this.posX - 10 <= 5) {
            this.posX = 5;
        } else {
            this.posX -= 10;
        }
        console.log("Moving left: " + this.posX);
    }

    moveRight() {
        if(this.posX + 10 >= this.canvasW - 45) {
            this.posX = this.canvasW - 45;
        } else {
            this.posX += 10;
        }
        console.log("Moving right:" + this.posX);
    }

    shoot() {
        this.bullets.push(new Bullet(this.ctx, this.posX, this.posY, this.width, this.height));
        console.log("Shooting");
        
    }

    clearBullets() {
        this.bullets = this.bullets.filter(bullet => bullet.posY >= 0);
      }
}

