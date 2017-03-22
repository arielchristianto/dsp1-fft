const formButton = document.getElementById('form--button');
const formInput = document.getElementById('form--input');
const formPlay = document.getElementById('form--play');
const formStop = document.getElementById('form--stop');

const resultText = document.getElementById('result--text');
const resultCnvas = document.getElementById('result--canvas');

const realtext = document.getElementById('real--text');
const realCanvas = document.getElementById('real--canvas');

const player = require('./core/player');

formButton.onclick = function() {
    "use strict";
    formInput.click();
};

formPlay.onclick = function() {
    "use strict";
    player.setFile(formInput.files[0]);

    player.play();
};

formStop.onclick = player.stop;