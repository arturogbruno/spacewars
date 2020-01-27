class Alien {
    constructor(ctx, canvasW, canvasH, posX, posY) {
        this.ctx = ctx;
        this.canvasW = canvasW;
        this.canvasH = canvasH;
        this.posX = posX;
        this.posY = posY;
        this.width = 30;
        this.height = 25;
    }

    draw(alien) {
        alien.alienImg = new Image();
        alien.alienImg.src = '../img/green_alien.png';
        this.ctx.drawImage(alien.alienImg, alien.posX, alien.posY, alien.width, alien.height);
    }


}