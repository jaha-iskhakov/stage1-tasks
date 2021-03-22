let lettersVisible = false;
const keys = document.querySelectorAll('.piano-key');
const piano = document.getElementById('piano');
const btnNotes = document.querySelector('#btn-notes');
const btnLetters = document.querySelector('#btn-letters');


function keyPressed(e) {
    if (e.repeat) return
    playSound(e.keyCode);
}

function playSound(key) {
    const audio= document.querySelector(`audio[data-key="${key}"]`);
    const pianoKey = document.querySelector(`.piano-key[data-key="${key}"]`);
    if (!audio) return;
    audio.currentTime = 0;
    audio.play();
    pianoKey.classList.add('piano-key-active');
}

function removeTransition(e) {
    if (e.propertyName !== 'transform') return;
    this.classList.remove('piano-key-active');
}

const startListening = (event) => {
    playSound(event.target.dataset.key);
    event.target.classList.add('ppiano-key-active');
}

const stopListening = (event) => {
    event.target.classList.remove('piano-key-active');
}

const startCorrespondOver = (event) => {
    playSound(event.target.dataset.key)
    event.target.classList.add('piano-key-active');
    keys.forEach((elem) => {
        elem.addEventListener('mouseover', startListening)
        elem.addEventListener('mouseout', stopListening)
    })
}

const stopCorrespondOver = () => {
    keys.forEach((elem) => {
        elem.classList.remove('piano-key-active');
        elem.removeEventListener('mouseover', startListening)
        elem.removeEventListener('mouseout', stopListening)
    })
}

function openfullscreen() {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen();
    } else {
        document.exitFullscreen();
    }
}

function showNotes() {
    if (!lettersVisible) return;
    keys.forEach((elem) => {
        elem.classList.remove('piano-key-letter');
    })

    btnNotes.classList.add('btn-active');
    btnLetters.classList.remove('btn-active');

    lettersVisible = false;
}

function showLetters() {
    if (lettersVisible) return;
    keys.forEach((elem) => {
        elem.classList.add('piano-key-letter');
    });

    btnNotes.classList.remove('btn-active');
    btnLetters.classList.add('btn-active');

    lettersVisible = true;
}


keys.forEach(key => key.addEventListener('transitionend', removeTransition));
document.querySelector('.fullscreen').addEventListener('click', openfullscreen);
window.addEventListener('keydown', keyPressed);
piano.addEventListener('mousedown', startCorrespondOver);
window.addEventListener('mouseup', stopCorrespondOver);
btnLetters.addEventListener('click', showLetters);
btnNotes.addEventListener('click', showNotes);

