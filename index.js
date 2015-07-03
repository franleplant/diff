import fs from 'fs';
import printDiff from './printDiff.js';

const DEBUG = false;
const options = {encoding: 'utf-8'};
//const I_INDEX = 0;
//const J_INDEX = 1;

/**
 * @typedef commonSecuenceElement
 * @type {object}
 *
 * @property {Array.<Number>} index - A pair of indeces corresponding to line numbers of files A and B respectively
 * @property {Number} len - the length of the Longest Commong Secuence
 * @property {Boolean} solution - Tell if the element is part of the solution
 */


/**
 * @param {String} file1 - path to file1
 * @param {String} file2 - path to file2
 */
function diff(file1, file2) {
    let A = fs.readFileSync(file1, options).split('\n');
    let B = fs.readFileSync(file2, options).split('\n');

    // Remove the last lines of each array beacuse they are junk
    A.pop();
    B.pop();
    // Add a first fake line just for making the indexes of the array
    // and the line numbers to match, this makes the work easier.
    A.unshift('')
    B.unshift('')

    let m = A.length;
    let n = B.length;

    /**
     * @type {Array.<commonSecuenceElement>}
     * @description this will hold all the iterated partial solutions
     */
    let P = [];

    /**
     * @type {commonSecuenceElement}
     */
    let ijEl;

    /**
     * @type {Array.<commonSecuenceElement>}
     * @description this will hold the solution
     */
    let lcs = [];
    
    let previousEl;

    // This calculates de LCS
    for (let i = 0; i < m; i++) {
        P[i] = [];
        for (let j = 0; j < n; j++) {
            ijEl = { index: [i,j] };

            if (DEBUG) {
                console.log('calc LCS', i,A[i], j, B[j])
            }

            if (i === 0 || j === 0) {
                ijEl.len = 0;
            } else if (A[i] === B[j]) {
               ijEl.len = 1 + P[i-1][j-1].len;
               ijEl.solution = true;

               lcs.push(ijEl);
            } else {
                previousEl = P[i-1][j].len >= P[i][j-1].len ? P[i-1][j] : P[i][j-1];
                ijEl.len = previousEl.len;
            }

            P[i][j] = ijEl;
        }
    }



    // Print the diff
    // Add a fake solution at the end to make the diff construction
    // more consice and shorter
    lcs.push({index: [m, n], solution: true})

    if (DEBUG) {
        console.log('solution', lcs);
    }

    printDiff(lcs, A, B, DEBUG);
}



diff('./file1.txt', './file2.txt');
