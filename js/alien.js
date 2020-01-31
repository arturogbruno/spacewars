class Alien {
    constructor(ctx, canvasW, canvasH, posX, posY) {
        this.ctx = ctx;
        this.canvasW = canvasW;
        this.canvasH = canvasH;
        this.posX = posX;
        this.posY = posY;
        this.width = 30;
        this.height = 25;
        this.image = new Image();
        this.imagesArr = ['./img/white_alien_sprite.png', './img/yellow_alien_sprite.png', './img/red_alien_sprite.png', './img/green_alien_sprite.png'];
        this.image.frames = 2;
        this.image.framesIndexX = 0;
        this.image.framesIndexY = 0;
        this.sense = 1;
        this.bullets = [];
    }

    getRandomImage() {
        let imageIndex = Math.floor(Math.random() * this.imagesArr.length);
        this.image.src = this.imagesArr[imageIndex];
    }

    draw(alien, framesCounter) {
        this.ctx.drawImage(
            this.image, 
            this.image.framesIndexX * Math.floor(this.image.width / this.image.frames), 
            this.image.framesIndexY * Math.floor(this.image.height / this.image.frames), 
            this.image.width / this.image.frames,
            this.image.height / this.image.frames,
            alien.posX, 
            alien.posY, 
            alien.width, 
            alien.height
        );

        this.animate(framesCounter);

        this.bullets.forEach(bullet => bullet.draw('alien'));
        this.bullets.forEach(bullet => bullet.move('alien'));

        this.clearBullets();
    }

    animate(framesCounter) {
        if (framesCounter % 30 === 0) {
            this.image.framesIndexX++;
        }
        if (this.image.framesIndexX >= this.image.frames) {
            this.image.framesIndexX = 0;
        }
    }

    shoot() {
        this.bullets.push(new Bullet(this.ctx, this.posX, this.posY, this.width));
    }

    clearBullets() {
        if(this.bullets.length > 5) {
            this.bullets.shift();
        }
    }
}