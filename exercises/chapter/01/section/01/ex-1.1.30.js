const { StdOut } = require('../../../../../src/libs')
const { Euclidean } = require('../../../../../src/algorithms')

/**
 * Exercise 1.1.30
 */
class Exercise {
  /**
   * Solution Exercise 1.1.30
   * @example
   * ```shell
   * $ node ex-1.1.30.js 5
   *   •
   * • • • • •
   *   •   •
   *   • •   •
   *   •   •
   * ```
   * @param {[]} args [Matrix Size]
   */
  static solution(args) {
    const n = parseInt(args[0], 10)
    const m = this.createBooleanArray(n)

    StdOut.println(this.matrixToString(m))
  }

  /**
   * Returns a matrix of booleans
   * with `true` when `i` and `j`
   * are relatively prime.
   * @param {number} n Size of matrix.
   */
  static createBooleanArray(n) {
    const a = []

    for (let i = 0; i < n; i++) {
      a[i] = []

      for (let j = 0; j < n; j++) {
        // two numbers are relatively prime
        // when their Greatest Common Divisor is 1
        a[i][j] = Euclidean.gcd(i, j) === 1
      }
    }

    return a
  }

  /**
   * Parses `m` matrix
   * replacing `true` with a bullet
   * and `false` with a white space.
   * @param {[[]]} m Matrix of booleans.
   */
  static matrixToString(m) {
    return m
      .map((row) => {
        return row
          .map((col) => {
            return col ? '•' : ' '
          })
          .join(' ')
      })
      .join('\n')
  }
}

// Exports
// ==============================
module.exports = Exercise

// Bash Execution
// ==============================
if (require.main === module) Exercise.solution(process.argv.slice(2))
