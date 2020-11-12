const { StdOut } = require('../../../../../src/libs')

/**
 * Exercise 1.1.5
 */
class Exercise {
  /**
   * Solution Exercise 1.1.5
   * @example <caption>Both numbers are between [0, 1]</caption>
   * ```shell
   * $ node ex-1.1.5.js 0.5 0.9
   * true
   * ```
   * @example <caption>A number is not between [0, 1]</caption>
   * ```shell
   * $ node ex-1.1.5.js 0.5 1.5
   * false
   * ```
   * @param {[]} args [x, y]
   */
  static solution (args) {
    const x = parseFloat(args[0])
    const y = parseFloat(args[1])
    const result = this.inRange(x) && this.inRange(y)

    StdOut.println(result)
  }

  /**
   * Determines if a number `n` is in range [0, 1]
   * @param {number} n The number to compare
   */
  static inRange (n) {
    return n > 0 && n < 1
  }
}

// Exports
// ==============================
module.exports = Exercise

// Bash Execution
// ==============================
if (require.main === module) Exercise.solution(process.argv.slice(2))
