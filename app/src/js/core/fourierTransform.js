import math from 'mathjs';

const fourier = (function () {
    let calculateSubFft = function (sequence) {

    };
    return {
        calculateDft: function (sequence) {
            let result = [];
            let N = sequence.length;

            for (let k = 0; k < N; k++) {
                let res = math.complex(0, 0);

                for (let n = 0; n < N; n++) {
                    let real = math.cos(2 * math.pi * k * n / N);
                    let imaginer = -1 * math.sin(2 * math.pi * k * n / N);
                    let complex = math.complex(real, imaginer);

                    res = math.add(res, math.multiply(sequence[n], complex));
                }
                console.log(res);
                result.push(math.format(res, 2));
            }
        },

        calculateFft: function (sequence) {
            if (length === 1) {
                return sequence;
            }

            let halfLength = length/2;

            let evenFft = [];
            let oddFft = [];
            evenFft.length = Math.round(halfLength);
            oddFft.length = Math.round(halfLength);

            for(let i=0; i<halfLength; i++) {
                evenFft[i] = sequence[i * 2];
                oddFft[i] = sequence[i * 2 + 1];
            }
            evenFft = calculateFft(evenFft);
            oddFft = calculateFft(oddFft);

            //merging
            for(let k = 0; k<halfLength; k++) {
                let wReal = Math.cos(2 * math.pi * k / length);
                let wImaginer = -1 * Math.sin(2 * math.pi * k / length);
                let W = math.complex(wReal, wImaginer);

                sequence[k] = math.format(math.add(
                    evenFft[k],
                    math.multiply(oddFft[k], W)
                ), 2);

                sequence[k+halfLength] = math.format(math.add(
                    evenFft[k],
                    math.multiply(math.multiply(oddFft[k], W), -1)
                ), 2);
            }

            return sequence;
        }
    }

})();

module.exports = fourier;
