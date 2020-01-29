window.onload = () => {
    document.addEventListener('keydown', (e) => {
        if(e.keyCode === 13) {
            const canvas = document.querySelector('#canvas');
            startGame(canvas);
        }
    });
}

function startGame(canvas) {
    game.init(canvas);
}
