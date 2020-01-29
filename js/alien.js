class Alien {
    constructor(ctx, canvasW, canvasH, posX, posY) {
        this.ctx = ctx;
        this.canvasW = canvasW;
        this.canvasH = canvasH;
        this.posX = posX;
        this.posY = posY;
        this.width = 30;
        this.height = 25;
        this.sense = 1;
        this.bullets = [];
    }

    draw(alien) {
        alien.alienImg = new Image();
        alien.alienImg.src = '../img/green_alien.png';
        this.ctx.drawImage(alien.alienImg, alien.posX, alien.posY, alien.width, alien.height);

        this.bullets.forEach(bullet => bullet.draw('alien'));
        this.bullets.forEach(bullet => bullet.move('alien'));

        this.clearBullets();
    }

    shoot() {
        this.bullets.push(new Bullet(this.ctx, this.posX, this.posY, this.width));
        console.log("Shooting");
    }

    clearBullets() {
        if(this.bullets.length > 5) {
            this.bullets.shift();
        }
    }

    bulletReachSpaceship(spaceship) {
        this.bullets.forEach((bullet, idx) => {
            if(bullet.posX + bullet.width >= spaceship.posX &&
                bullet.posY + bullet.height >= spaceship.posY &&
                bullet.posX <= spaceship.posX + spaceship.width &&
                bullet.posY <= spaceship.posY + spaceship.height) {
                    console.log("Spaceship has been hit");
                    this.bullets.splice(idx, 1);
                    spaceship.lives.pop();
            }   
        });
    }
}