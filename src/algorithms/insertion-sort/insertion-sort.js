const { StdOut } = require('../../libs')
const { defaultComparator } = require('../../common')

/**
 * Insertion
 * @classdesc Insertion Sort Algorithm.
 * @see p. 245, 251
 * @see {@link https://algs4.cs.princeton.edu/code/edu/princeton/cs/algs4/Insertion.java.html}
 */
class Insertion {
  /**
   * Returns whether `a` is less than `b`
   * based on a comparing function.
   * @param {*} a Comparable object `a`
   * @param {*} b Comparable object `b`
   * @param {function} comparator A comparing function that
   * returns -1 when `a` is less than `b`,
   * returns 1 when `a` is greater than `b` or
   * returns 0 when `a` is equal to `b`.
   */
  static less (a, b, comparator = defaultComparator) {
    return comparator(a, b) < 0
  }

  /**
   * Interchanges the values located in indexes `i` and `j`
   * for the given `array`.
   * @param {[*]} array Array of values.
   * @param {number} i Index 1
   * @param {number} j Index 2
   */
  static exchange (array, i, j) {
    const temp = array[i]

    array[i] = array[j]
    array[j] = temp
  }

  /**
   * Returns `true` if the provided array is sorted,
   * `false` otherwise.
   * @param {[*]} array Array of values
   * @param {function} comparator A comparing function that
   * returns -1 when `a` is less than `b`,
   * returns 1 when `a` is greater than `b` or
   * returns 0 when `a` is equal to `b`.
   */
  static isSorted (array, comparator = defaultComparator) {
    for (let i = 1; i < array.length; i++) {
      if (this.less(array[i], array[i - 1], comparator)) {
        return false
      }
    }

    return true
  }

  /**
   * A function that prints to the StdOut
   * the contents of the `array` provided.
   * @param {[*]} array Array of values.
   */
  static show (array) {
    StdOut.println(array.join(' '))
  }

  /**
   * Sorts the `array` using the Insertion Sort algorithm.
   * @param {[*]} array Array of values.
   * @param {*} comparator A comparing function that
   * returns -1 when `a` is less than `b`,
   * returns 1 when `a` is greater than `b` or
   * returns 0 when `a` is equal to `b`.
   */
  static sort (array, comparator = defaultComparator) {
    const n = array.length

    for (let i = 1; i < n; i++) {
      for (let j = i; j > 0 && this.less(array[j], array[j - 1], comparator); j--) {
        this.exchange(array, j, j - 1)
      }
    }
  }
}

module.exports = Insertion
