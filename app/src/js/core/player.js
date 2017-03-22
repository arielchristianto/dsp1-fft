const player = (function() {
    "use strict";
    let audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    let analyser = audioCtx.createAnalyser();

    let fileReader = new FileReader();

    let audioArrayBuffer = null;

    let audioIsPlayed = false;

    fileReader.onload = function(){
        audioArrayBuffer = this.result;
        console.log('load successful!!');
    };

    return {
        setFile: function(file) {
            fileReader.readAsArrayBuffer(file);
        },

        play: function(){
            if (!audioIsPlayed) {
                audioIsPlayed = true;
                console.log('playing');
            } else {
                console.log('already Playing');
            }
        },

        stop: function () {
            if (audioIsPlayed) {
                audioIsPlayed = false;
                console.log('stopped');
            } else {
                console.log('already stopped');
            }
        }
    }
})();

module.exports = player;