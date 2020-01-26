const game = {
    canvas: undefined,
    ctx: undefined,
    canvasWidth: undefined,
    canvasHeight: undefined,

    init() {
        this.canvas = document.querySelector('#canvas');
        this.ctx = this.canvas.getContext('2d');
        this.setCanvasDimensions();
        window.onresize = this.setCanvasDimensions;
        this.start();
    },

    setCanvasDimensions() {
        let w = window.innerWidth;
        let h = window.innerHeight;
        let canvasWidth = w * 0.85;
        let canvasHeight = h * 0.75;
        if(canvasWidth > 1100) {
            this.canvas.setAttribute('width', '1100px');
            this.canvasWidth = 1100;
        }else {
            this.canvas.setAttribute('width', `${canvasWidth}px`);
            this.canvasWidth = canvasWidth;
        }
        this.canvas.setAttribute('height', `${canvasHeight}px`);
        this.canvasHeight = canvasHeight;
    },

    start() {
        this.reset();
        this.intervalID = setInterval(() => {
            this.clear();
            this.drawAll();
            // this.moveAll();
        }, 1000 / 60);
      },

    reset() {
        this.spaceship = new Spaceship(this.ctx, this.canvasWidth, this.canvasHeight);
      },

    drawAll() {
        this.spaceship.draw();
    },

    clear() {
        this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
    }

    // moveAll() {
    //     this.spaceship.setListeners();
    //   },
    
}

