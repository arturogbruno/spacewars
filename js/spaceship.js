class Spaceship {
    constructor(ctx, canvasW, canvasH) {
        this.ctx = ctx;
        this.canvasW = canvasW;
        this.canvasH = canvasH;
        this.image = new Image();
        this.image.src = '../img/spaceship_sprite.png';
        this.image.frames = 2;
        this.image.framesIndex = 0;
        this.width = 40;
        this.height = 50;
        this.posX = canvasW / 2 - this.width / 2;
        this.posY = canvasH - this.height - 45;
        this.bullets = [];
        this.keys = [];
        this.lives = new Array(3);
        this.score = 0;
        this.shootSound = new Howl({
            src: ['../sounds/shoot.wav'],
            autoplay: false,
            loop: false,
            volume: 1,
        });
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

    draw(framesCounter) {
        this.ctx.drawImage(
            this.image, 
            this.image.framesIndex * Math.floor(this.image.width / this.image.frames), 
            0, 
            Math.floor(this.image.width / this.image.frames),
            this.image.height,
            this.posX, 
            this.posY, 
            this.width, 
            this.height
        );

        this.animate(framesCounter);

        this.lives.forEach(life => life.draw());
        this.bullets.forEach(bullet => bullet.draw('spaceship'));
        this.bullets.forEach(bullet => bullet.move('spaceship'));
        this.clearBullets();
    }

    animate(framesCounter) {
        if (framesCounter % 20 === 0) {
            this.image.framesIndex++;
        }
        if (this.image.framesIndex > this.image.frames - 1) {
            this.image.framesIndex = 0;
        }
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
        this.shootSound.play();
        this.bullets.push(new Bullet(this.ctx, this.posX, this.posY, this.width));
    }

    clearBullets() {
        this.bullets = this.bullets.filter(bullet => bullet.posY >= 0);
    }
}