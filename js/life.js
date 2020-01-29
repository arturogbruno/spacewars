class Life {
    constructor(ctx, canvasW, canvasH, posX) {
        this.ctx = ctx;
        this.canvasW = canvasW;
        this.canvasH = canvasH;
        this.width = 25;
        this.height = 30;
        this.posX = posX;
        this.posY = this.canvasH - 35;
    }

    draw() {
        let lifeImg = new Image();
        lifeImg.src = '../img/spaceship.png';
        this.ctx.drawImage(lifeImg, this.posX, this.posY, this.width, this.height);
    }
}