window.onload = () => {
    const startScreenDomEl = document.querySelector('.start-screen');
    const endScreenDomEl = document.querySelector('.end-screen');
    document.addEventListener('keydown', (e) => {
        if(e.keyCode === 13) {
            const canvas = document.querySelector('#canvas');
            startScreenDomEl.style.display = 'none';
            endScreenDomEl.style.display = 'none';
            startGame(canvas);
        }
    });
}

function startGame(canvas) {
    canvas.style.display = 'block';
    game.init(canvas);
}
