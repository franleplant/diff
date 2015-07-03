import fs from 'fs';

const options = {encoding: 'utf-8'};

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


    console.log(lsc)

    lsc.forEach((sol, index) => {
        let [i, j] = sol.index;
        console.log(`A, sol # ${index}: "${A[i]}"`)

        let k
        try {
            k = lsc[index - 1].index[0]
        } catch(e) {
            k = 0;
        }

        for (; k < i-1; k++) {
            console.log('-', A[k])
        }

        try {
            k = lsc[index - 1].index[1]
        } catch(e) {
            k = 0;
        }
        console.log(`B, sol # ${index}: "${B[j]}"`)
        for (; k < j-1; k++) {
            console.log('+', B[k])
        }
        console.log('------')

    })
                             console.log('upper extreme')
        let [i, j] = lsc.pop().index;
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



diff('./file1.txt', './file2.txt');
