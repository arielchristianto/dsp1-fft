const player = (function() {
    "use strict";
    let audioContext = new (window.AudioContext || window.webkitAudioContext)();
    let sourceNode = audioContext.createBufferSource();
    let analyser = audioContext.createAnalyser();

    let fileReader = new FileReader();

    let audioBuffer = null;
    let audioIsPlayed = false;

    sourceNode.connect(audioContext.destination);


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

    return {
        setFile: function(file) {
            console.log('loading');
            fileReader.readAsArrayBuffer(file);
        },

        play: function(){
            if (!audioIsPlayed) {
                audioIsPlayed = true;
                console.log('playing');

                sourceNode.buffer = audioBuffer;
                sourceNode.start(0);
            } else {
                console.log('already Playing');
                return '0000000';
            }
        },

        stop: function () {
            if (audioIsPlayed) {
                audioIsPlayed = false;

                sourceNode.stop();
                console.log('stopped');
            } else {
                console.log('already stopped');
            }
        }
    }
})();

module.exports = player;