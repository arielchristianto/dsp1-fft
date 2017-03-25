const fourier = require('./fourierTransform');

const player = (function() {
    "use strict";
    let audioContext = new (window.AudioContext || window.webkitAudioContext)();
    let gainNode = audioContext.createGain();
    let oscillatorNode = audioContext.createOscillator();
    let bufferSource = audioContext.createBufferSource();
    let analyser = audioContext.createAnalyser();
    let fileReader = new FileReader();
    let sourceNode;

    let audioBuffer = null;
    let audioIsPlayed = false;
    let bufferLength = null;
    let dataArray = null;

    let frequencyCanvas = null;
    let frequencyCanvasContext = null;

    analyser.fftSize = 2048;
    oscillatorNode.type = "sine";
    oscillatorNode.frequency.value = 440;

    gainNode.gain.value = 1;

    gainNode.connect(analyser);
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


    let createOscillator = function (frequency = 880, type = 'sine') {
        oscillatorNode = audioContext.createOscillator();
        oscillatorNode.connect(gainNode);
        oscillatorNode.frequency.value = frequency;
        oscillatorNode.type = type;
    };

    let playAudio = function () {
        if (!audioIsPlayed) {
            sourceNode = audioContext.createBufferSource();
            sourceNode.connect(analyser);

            audioIsPlayed = true;
            console.log('playing');

            sourceNode.buffer = audioBuffer;

            audioIsPlayed = true;
            console.log('playing');


            sourceNode.start();
            // createOscillator();
            //
            // oscillatorNode.start(0);
        } else {
            console.log('already Playing');
            return '0000000';
        }
    };

    let drawVisual;
    let CANVAS_WIDTH, CANVAS_HEIGHT;
    let drawTimeDomain = function () {
        bufferLength = analyser.fftSize;
        drawVisual = requestAnimationFrame(drawTimeDomain);
        dataArray = new Float32Array(bufferLength);

        analyser.getFloatTimeDomainData(dataArray);

        dataArray = fourier.calculateFft(dataArray);


        frequencyCanvasContext.fillStyle = 'rgb(255,255,255)';
        frequencyCanvasContext.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

        frequencyCanvasContext.lineWidth = 0.5;
        frequencyCanvasContext.strokeStyle = 'rgb(0,0,0)';

        frequencyCanvasContext.beginPath();

        let sliceWidth = CANVAS_WIDTH * 1.0 / bufferLength;
        let x =0;

        for (let i=0; i< bufferLength; i++) {

            let y = dataArray[i] * CANVAS_HEIGHT/2 + (CANVAS_HEIGHT/2);

            (i === 0) ?
                frequencyCanvasContext.moveTo(x, y) :
                frequencyCanvasContext.lineTo(x, y);

            x+=sliceWidth;
        }

        frequencyCanvasContext.moveTo(CANVAS_WIDTH, CANVAS_HEIGHT / 2);
        frequencyCanvasContext.stroke();
    };

    let drawFrequencyDomain = function () {
        bufferLength = analyser.fftSize = 2048;
        let arrayFftLength = bufferLength/2;
        drawVisual = requestAnimationFrame(drawFrequencyDomain);
        dataArray = new Float32Array(bufferLength);

        analyser.getFloatTimeDomainData(dataArray);

        let arrayFftResult = fourier.calculateFft(Array.from(dataArray));

        frequencyCanvasContext.fillStyle = 'rgb(255,255,255)';
        frequencyCanvasContext.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

        frequencyCanvasContext.lineWidth = 0.5;
        frequencyCanvasContext.strokeStyle = 'rgb(0,0,0)';

        frequencyCanvasContext.beginPath();

        let sliceWidth = CANVAS_WIDTH * 1.0 / arrayFftLength;
        let x =0;

        for (let i=0; i< arrayFftLength; i++) {
            let y = CANVAS_HEIGHT - (fourier.getAmplitude(arrayFftResult[i])/500) * CANVAS_HEIGHT;

            (i === 0) ?
                frequencyCanvasContext.moveTo(x, y) :
                frequencyCanvasContext.lineTo(x, y);

            x+=sliceWidth;
        }

        frequencyCanvasContext.moveTo(CANVAS_WIDTH, CANVAS_HEIGHT);
        frequencyCanvasContext.stroke();
    };


    return {
        setCanvas: function (canvas) {
            frequencyCanvas = canvas;
            frequencyCanvasContext = canvas.getContext('2d');
            CANVAS_HEIGHT = frequencyCanvas.height;
            CANVAS_WIDTH = frequencyCanvas.width;
            frequencyCanvasContext.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        },
        setFile: function(file) {
            console.log('loading');
            fileReader.readAsArrayBuffer(file);
        },

        play: function(){
            playAudio();
            drawFrequencyDomain();
        },

        stop: function () {
            if (audioIsPlayed) {
                audioIsPlayed = false;
                window.cancelAnimationFrame(drawVisual);
                // oscillatorNode.stop();
                sourceNode.stop();
                console.log('stopped');
            } else {
                console.log('already stopped');
            }
        }
    }
})();

module.exports = player;