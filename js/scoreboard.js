const scoreboard = {
    ctx: undefined,
    canvasW: undefined,
    canvasH: undefined,
    
    init(ctx, canvasW, canvasH) {
        this.canvas = canvas;
        this.canvasW = canvasW;
        this.canvasH = canvasH;
        this.ctx = ctx;        
    },

    draw() {
        this.ctx.font = '24px sans-serif';
        this.ctx.fillText('Score: ', this.canvasW - 160, this.canvasH - 12);
    },

    updateScore(score) {
        this.ctx.font = '24px sans-serif';
        this.ctx.fillText(`${score}`, this.canvasW - 85, this.canvasH - 12);
    }    
}