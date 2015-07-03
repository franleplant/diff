import fs from 'fs';

const DEBUG = false;
const options = {encoding: 'utf-8'};
const I_INDEX = 0;
const J_INDEX = 1;

/**
 * @typedef commonSecuenceElement
 * @type {object}
 *
 * @property {Array.<Number>} index - A pair of indeces corresponding to line numbers of files A and B respectively
 * @property {Number} len - the length of the Longest Commong Secuence
 * @property {Boolean} solution - Tell if the element is part of the solution
 */

// TODO: tidy up the output
function diff(file1, file2) {
    let A = fs.readFileSync(file1, options).split('\n');
    let B = fs.readFileSync(file2, options).split('\n');

    A.pop();
    B.pop();
    // TODO: document
    A.unshift('')
    B.unshift('')

    let m = A.length;
    let n = B.length;
    console.log(m, A)


    let P = [];
    let ijEl;

    // rename this to lCs

    /**
     * @type {Array.<commonSecuenceElement>}
     */
    let lcs = [];

    // This calculates de LCS
    for (let i = 0; i < m; i++) {
        P[i] = [];
        for (let j = 0; j < n; j++) {
            ijEl = {index: [i,j]};

            console.log(i,A[i], j, B[j])
            if (i === 0 || j === 0) {
                ijEl.len = 0;
            } else if (A[i] === B[j]) {
               ijEl.len = 1 + P[i-1][j-1].len;
               ijEl.solution = true;

               lcs.push(ijEl);
            } else {
                let previousEl = P[i-1][j].len >= P[i][j-1].len ? P[i-1][j] : P[i][j-1];
                ijEl.len = previousEl.len;
            }

            P[i][j] = ijEl;
            //console.log(ijEl)
        }
    }



    // Print the diff
    lcs.push({index: [m, n], solution: true})
    console.log(lcs)

    let lcsLen = lcs.length;
    let i, j, iCurrent, jCurrent, iPrev, jPrev, k, sol, prevSol;

    for (let l = 0; l < lcsLen; l++) {
        //console.log(`solution ${l}`)

        sol = lcs[l];
        prevSol = lcs[l - 1];

        [iCurrent, jCurrent] = sol.index;
        [iPrev, jPrev] = prevSol ? prevSol.index : [0,0];

        //console.log(`File A`)

        let print = [];
        // Stop before reaching the solution
        let iStop = iCurrent;
        for (i = iPrev + 1; i < iStop; i++) {
            if (DEBUG) {
                console.log(`- ${A[i]}`);
                continue;
            }
            print[i] = `- ${A[i]}`
        }


        //console.log(`File B`)
        let jStop = jCurrent;
        for (j = jPrev + 1; j < jStop; j++) {
            if (DEBUG) {
                console.log(`+ ${B[j]}`);
                continue;
            }
            if (!print[j]) {
                print[j] = `+ ${B[j]}`
            } else {
                print[j] = print[j].replace('-', '*')  + ` | ${B[j]}`
            }
        }

        // Print the solution
        print[jCurrent] = `  ${B[jCurrent] || '-----'}`;

        if (DEBUG) {
            console.log('------');
            continue;
        }
        print.forEach(p => console.log(p));

    }
}



diff('./file1.txt', './file2.txt');
