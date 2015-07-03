import fs from 'fs';

const options = {encoding: 'utf-8'};
const I_INDEX = 0;
const J_INDEX = 1;

// TODO: tidy up the output
function diff(file1, file2) {
    let A = fs.readFileSync(file1, options).split('\n');
    let B = fs.readFileSync(file2, options).split('\n');

    A.pop();
    B.pop();

    let m = A.length;
    let n = B.length;


    let P = [];
    let ijEl;

    // rename this to lCs
    let lsc = [];

    // This calculates de LCS
    /**
     * @typedef commonSecuenceElement
     * @type {object}
     *
     * @property {Array.<Number>} index - A pair of indeces corresponding to [i,j] where
     *                                      i is a `1` based index corresponding to a line
     *                                      number of the array A and j is a `1` based index
     *                                      correspongint to a line number of the array B.
     */
    for (let i = 0; i <= m; i++) {
        P[i] = [];
        for (let j = 0; j <= n; j++) {
            ijEl = {index: [i,j]};

            //console.log(A[i-1], B[j-1])
            if (i === 0 || j === 0) {
                ijEl.len = 0;
            } else if (A[i-1] === B[j-1]) {
               ijEl.len = 1 + P[i-1][j-1].len;
               ijEl.solution = true;

               lsc.push(ijEl);
            } else {
                let previousEl = P[i-1][j].len >= P[i][j-1].len ? P[i-1][j] : P[i][j-1];
                ijEl.len = previousEl.len;
            }

            P[i][j] = ijEl;
            //console.log(ijEl)
        }
    }



    // Print the diff
    // TODO: fix or explain this `+1`
    lsc.push({index: [m + 1, n + 1], solution: true})
    console.log(lsc)

    let lscLen = lsc.length;
    let i, j, iCurrent, jCurrent, iPrev, jPrev, k, sol, prevSol;

    for (let l = 0; l < lscLen; l++) {
        //console.log(`solution ${l}`)

        sol = lsc[l];
        prevSol = lsc[l - 1];

        [iCurrent, jCurrent] = sol.index;
        [iPrev, jPrev] = prevSol ? prevSol.index : [0,0];

        //console.log(`File A`)

        let print = [];
        // Stop before reaching the solution
        let iStop = iCurrent - 1;
        for (i = iPrev; i < iStop; i++) {
            print[i] = `- ${A[i]}`
        }


        //console.log(`File B`)
        let jStop = jCurrent - 1;
        for (j = jPrev; j < jStop; j++) {
            if (!print[j]) {
                print[j] = `+ ${B[j]}`
            } else {
                print[j] = print[j].replace('-', '*')  + ` | ${B[j]}`
            }
        }

        print[jCurrent] = `  ${B[jCurrent - 1]}`;
        //console.log(jCurrent, B[jCurrent - 1])

        print.forEach(p => console.log(p));

        //console.log('------')

    }
}



diff('./file1.txt', './file2.txt');
