const player = (function() {
    "use strict";
    let audioContext = new (window.AudioContext || window.webkitAudioContext)();
    let oscilatorNode = audioContext.createOscillator();
    let analyser = audioContext.createAnalyser();

    let fileReader = new FileReader();

    let audioBuffer = null;
    let audioIsPlayed = false;


    oscilatorNode.type = "square";
    oscilatorNode.frequency.value = 440;

    analyser.connect(audioContext.destination);


    fileReader.onload = function(){
        audioContext.decodeAudioData(this.result).
            then(function (buffer) {
            audioBuffer = buffer;
        }, function () {
            console.log('failed decoding');
        }).then(function () {
            console.log('load successful!!');
        })
    };

    let createOscillator = function (frequency = 880, type = 'square') {
        oscilatorNode = audioContext.createOscillator();
        oscilatorNode.connect(analyser);
        oscilatorNode.frequency.value = frequency;
        oscilatorNode.type = type;
    };

    return {
        setFile: function(file) {
            console.log('loading');
            fileReader.readAsArrayBuffer(file);
        },

        play: function(){
            if (!audioIsPlayed) {
                audioIsPlayed = true;
                console.log('playing');

                createOscillator();

                oscilatorNode.start(0);
            } else {
                console.log('already Playing');
                return '0000000';
            }
        },

        stop: function () {
            if (audioIsPlayed) {
                audioIsPlayed = false;

                oscilatorNode.stop();
                console.log('stopped');
            } else {
                console.log('already stopped');
            }
        }
    }
})();

module.exports = player;