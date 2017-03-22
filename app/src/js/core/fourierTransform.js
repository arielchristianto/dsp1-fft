const fourier = (function () {
    return {
        calculateDft: function (sequence) {
            let result = [];
            let N = sequence.length;

            for (let k=0; k<N; k++) {
                let res = math.complex(0, 0);

                for(let n = 0; n< N; n++) {
                    let real = math.cos(2*math.pi*k*n/N);
                    let imaginer = -1 * math.sin(2*math.pi*k*n/N);
                    let complex = math.complex(real, imaginer);

                    res = math.add(res, math.multiply(sequence[n], complex));
                }
                console.log(res);
                result.push(math.format(res, 2));
            }
        },

        calculateAmplitude: function (sequence) {

        },

        calculatePhase: function () {

        },

        calculateFft: function () {
            //todo: do this shit
        }
    }

})();

module.exports = fourier;
