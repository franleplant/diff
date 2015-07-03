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
    console.log(lsc)

    let lscLen = lsc.length;
    let i, j, iPrev, jPrev, k, sol, prevSol;

    for (let l = 0; l < lscLen; l++) {
        sol = lsc[l];

        [i, j] = sol.index;

        prevSol = lsc[l - 1];
        [iPrev, jPrev] = prevSol ? prevSol.index : [0,0];

        console.log(`A, sol # ${l}: "${A[i]}"`)


        for (; iPrev < i-1; iPrev++) {
            console.log('-', A[iPrev])
        }


        console.log(`B, sol # ${l}: "${B[j]}"`)
        for (; jPrev < j-1; jPrev++) {
            console.log('+', B[jPrev])
        }
        console.log('------')

        if (l !== lscLen - 1) {
            continue;
        }
        console.log('last solution, going up now')
        //let [i, j] = lsc[lscLen - 1].index;
        console.log(`A, sol # last: "${A[i]}"`)

        for (let k = i; k < m; k++) {
            console.log('-', A[k])
        }

        console.log(`B, sol # last: "${B[j]}"`)
        for (let k = j; k < n; k++) {
            console.log('+', B[k])
        }
        console.log('------')

    }
}



diff('./file1.txt', './file2.txt');
