class Background {
    constructor(ctx, canvasW, canvasH) {
        this.ctx = ctx;
        this.width = canvasW;
        this.height = canvasH;

        this.image = new Image();
        this.image.src = './img/bg.jpg';

        this.posX = 0;
        this.posY = 0;

        this.velY = 1;
    }
  
    draw() {
        this.ctx.drawImage(this.image, this.posX, this.posY, this.width, this.height);
        this.ctx.drawImage(this.image, this.posX, this.posY - this.height, this.width, this.height);
    }
  
    move() {
        if (this.posY >= this.height) {
            this.posY = 0;
        }
        this.posY += this.velY;
    }
  }