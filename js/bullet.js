class Bullet {
    constructor(ctx, shooterX, shooterY, shooterW) {
        this.ctx = ctx;
        this.posX = shooterX + shooterW / 2;
        this.posY = shooterY;
        this.radius = undefined;
        this.width = undefined,
        this.height = undefined,
        this.velY = undefined;
    }

    draw(shooter) {
        this.ctx.beginPath();
        if(shooter === 'spaceship') {
            this.ctx.fillStyle = "rgb(230, 0, 0)";
            this.radius = 4;
            this.width = this.radius * 2;
            this.height = this.radius * 2;
            this.ctx.arc(this.posX, this.posY, this.radius, 0, Math.PI * 2);
            this.ctx.fill();
            this.ctx.closePath();
        } else {
            this.width = 2;
            this.height = 20;
            this.ctx.fillRect(this.posX, this.posY + 25, this.width, this.height);
            this.ctx.fillStyle = "rgb(251, 226, 76)";
        }
        
    }

    move(shooter) {
        if(shooter === 'spaceship') {
            this.velY = 10;
            this.posY -= this.velY;
        } else {
            this.velY = 5;
            this.posY += this.velY;
        }  
    }
}