const endScreen = {
    showEndScreen(canvas, result) {
        canvas.style.display = 'none';

        let mainDomEl = document.querySelector('.main');
        mainDomEl.style.display = 'flex';

        const resultImg = document.createElement('img');
        result === 'lose' ? resultImg.src = '../img/game_over.png' : resultImg.src = '../img/you_win.png';
        resultImg.height = 200;
        mainDomEl.appendChild(resultImg);

        const btnRestart = document.createElement('button');
        result === 'lose' ? btnRestart.innerHTML = 'Retry' : btnRestart.innerHTML = 'Restart';
        btnRestart.classList = 'btn';
        mainDomEl.appendChild(btnRestart);

        btnRestart.addEventListener('click', function() {
            mainDomEl.style.display = 'none';
            [...mainDomEl.children].forEach(child => mainDomEl.removeChild(child));
            canvas.style.display = 'block';
            game.init(canvas);
        });
    }
}