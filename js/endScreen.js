const endScreen = {
    showEndScreen(canvas, result) {
        canvas.style.display = 'none';

        let endScreenDomEl = document.querySelector('.end-screen');
        endScreenDomEl.style.display = 'flex';

        const resultImg = document.createElement('img');
        result === 'lose' ? resultImg.src = '../img/game_over.gif' : resultImg.src = '../img/you_win.gif';
        resultImg.height = 200;
        endScreenDomEl.appendChild(resultImg);

        const message = document.createElement('h1');
        result === 'lose' ? message.innerHTML = 'Game Over' : message.innerHTML = 'You win!';
        endScreenDomEl.appendChild(message);

        const btnRestart = document.createElement('button');
        result === 'lose' ? btnRestart.innerHTML = 'Retry' : btnRestart.innerHTML = 'Next level';
        btnRestart.classList = 'btn';
        endScreenDomEl.appendChild(btnRestart);

        btnRestart.addEventListener('click', function() {
            endScreenDomEl.style.display = 'none';
            [...endScreenDomEl.children].forEach(child => endScreenDomEl.removeChild(child));
            canvas.style.display = 'block';
            result === 'lose' ? game.init(canvas, 1) : game.init(canvas, 2);
        });
    }
}