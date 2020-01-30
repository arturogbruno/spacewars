const scoreboard = {
    ctx: undefined,
    canvasW: undefined,
    canvasH: undefined,
    
    init(ctx, canvasW, canvasH, level) {
        this.ctx = ctx;       
        this.canvas = canvas;
        this.canvasW = canvasW;
        this.canvasH = canvasH;
        this.level = level;
    },

    draw() {
        this.ctx.font = '18px sans-serif';
        this.ctx.fillText(`Level: ${this.level}`, this.canvasW - 190, this.canvasH - 15);
        this.ctx.fillText('Score: ', this.canvasW - 110, this.canvasH - 15);
    },

    updateScore(score) {
        this.ctx.font = '18px sans-serif';
        this.ctx.fillText(`${score}`, this.canvasW - 50, this.canvasH - 15);
    }    
}