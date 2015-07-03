import chalk from 'chalk';

const TERMINATOR = '------';

/**
 * @param {Array.<commonSecuenceElement>} lcs - the Longest Common Secuence solution, it needs to have a fake solution
 *                                              pointing to the [A.length + 1, B.length + 1]
 * @param {Array.<String>} A - Lines of File A. The indeces must match the line numbers.
 * @param {Array.<String>} B - Lines of File B. The indeces must match the line numbers.
 * @param {Boolean} DEBUG - Print useful debug data
 */
export default function printDiff(lcs, A, B, DEBUG) {

    let lcsLen = lcs.length;
    let i, j, iCurrent, jCurrent, iPrev, jPrev, sol, prevSol;

    console.log('Happy Diff!');
    console.log(' ', TERMINATOR)
    // Iterate over the solutions
    for (let l = 0; l < lcsLen; l++) {

        // get the current Solution
        sol = lcs[l];
        // Get the previous solution. Start from 0,0 if this is the first solution
        prevSol = lcs[l - 1] || { index: [0, 0] };

        [iCurrent, jCurrent] = sol.index;
        [iPrev, jPrev] = prevSol.index;

        // Utility array for printing the diff
        let print = [];

        // Calculate deletions in this segment
        for (i = iPrev + 1; i < iCurrent; i++) {
            if (DEBUG) {
                console.log(chalk.red(i, `- ${A[i]}`));
                continue;
            }
            // Deletions
            print[i] = chalk.red(`- ${A[i]}`)
        }


        // Calculate additions or changes in this segment
        for (j = jPrev + 1; j < jCurrent; j++) {
            if (DEBUG) {
                console.log(chalk.green(j, `+ ${B[j]}`));
                continue;
            }

            if (!print[j]) {
                // Additions
                print[j] = chalk.green(`+ ${B[j]}`)
            } else {
                // The pourpose of this is to render changes
                let line = chalk.stripColor(print[j]);
                print[j] = chalk.yellow(line.replace('-', '*')  + ` | ${B[j]}`)
            }
        }

        // Print the current solution
        print.push(`  ${B[jCurrent] || TERMINATOR}`);

        if (DEBUG) {
            console.log(TERMINATOR);
            continue;
        }
        print.forEach(p => console.log(p));

    }
}
