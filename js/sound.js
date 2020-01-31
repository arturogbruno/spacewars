class Sound {
    constructor(src) {
        this.sound = document.createElement('audio');
        this.sound.src = src;
        this.sound.status = true;
        this.sound.setAttribute("preload", "auto");
        this.sound.setAttribute("controls", "none");
        this.sound.class = 'sound';
        this.sound.style.display = "none";
        let soundsExist = document.querySelectorAll('.sound');
            document.body.appendChild(this.sound);        
    }

    play() {
        this.sound.play();
    }
    
    pause() {
        this.sound.pause();
    }
}