window.onload = () => {
    const startScreenDomEl = document.querySelector('.start-screen');
    const endScreenDomEl = document.querySelector('.end-screen');
    let introSound = new Howl({
        src: ['sounds/intro.wav'],
        autoplay: false,
        loop: true,
        volume: 1,
    });
    introSound.play();
    document.addEventListener('keydown', (e) => {
        if(e.keyCode === 13) {
            introSound.stop();
            const canvas = document.querySelector('#canvas');
            startScreenDomEl.style.display = 'none';
            endScreenDomEl.style.display = 'none';
            document.body.style.backgroundImage = 'url(./img/bg.jpg)'
            startGame(canvas);
        }
    });
}

function startGame(canvas) {
    canvas.style.display = 'block';
    game.init(canvas);
}