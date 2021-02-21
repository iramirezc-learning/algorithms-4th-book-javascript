const { StdIn, StdOut } = require('../libs')

/**
 * Average
 * @classdesc Sample StdIn client
 * @see p. 39
 * @see {@link https://algs4.cs.princeton.edu/code/edu/princeton/cs/algs4/Average.java.html}
 */
class Average {
  /**
   * Computes the average of the numbers
   * read from the StdIn.
   * @example <caption>Manual input from StdIn</caption>
   * ```sh
   * $ node average.client.js
   * > 1.23456
   * > 2.34567
   * > 3.45678
   * > 4.56789
   * $ <ctrl-d>
   * Average is 2.90123
   * ```
   * @example <caption>Streaming from a file</caption>
   * ```sh
   * $ node average.client.js < data.txt
   * Average is 152.17971
   * ```
   * @example <caption>Piping from another process</caption>
   * ```sh
   * $ node random-seq.client.js 1000 100 199.99 | node average.client.js
   * Average is 150.25505
   * ```
   */
  static main() {
    let sum = 0
    let count = 0

    StdIn.read()
      .on('line', (line) => {
        sum += parseFloat(line)
        count++
      })
      .on('close', () => {
        const avg = sum / count

        StdOut.printf('Average is %f\n', avg.toFixed(5))
      })
  }
}

// Execution
// ==============================
if (require.main === module) Average.main()
