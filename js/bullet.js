class Bullet {
    constructor(ctx, spaceshipX, spaceshipY, spaceshipW, spaceshipH) {
        this.ctx = ctx;
        this.posX = spaceshipX + spaceshipW / 2;
        this.posY = spaceshipY;
        this.radius = 5;
        this.velY = 12;
    }

    draw() {
        this.ctx.beginPath();
        this.ctx.fillStyle = "whitesmoke";
        this.ctx.arc(this.posX, this.posY, this.radius, 0, Math.PI * 2);
        this.ctx.fill();
        this.ctx.closePath();
    }

    move() {
        this.posY -= this.velY;
    }
}