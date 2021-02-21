const { StdIn, StdOut } = require('../../libs')
const WeightedQuickUnionUF = require('./union-find-weighted')

/**
 * WeightedQuickUnionUFClient
 * @classdesc Union-Find Test client.
 * @see p. 221, 228
 */
class WeightedQuickUnionUFClient {
  /**
   * Solves dynamic connectivity problem on StdIn.
   * @example <caption>Tiny UF</caption>
   * ```sh
   * $ node union-find-weighted.client.js < algs4-data/tinyUF.txt
   * 4 3
   * 3 8
   * 6 5
   * 9 4
   * 2 1
   * 5 0
   * 7 2
   * 6 1
   * 2 components
   * ```
   * @example <caption>Medium UF</caption>
   * ```sh
   * $ node union-find-weighted.client.js < algs4-data/mediumUF.txt
   * 528 503
   * 548 523
   * 389 414
   * 446 421
   * 552 553
   * ...
   * 3 components
   * ```
   * @example <caption>Large UF</caption>
   * ```sh
   * $ node union-find-weighted.client.js < algs4-data/largeUF.txt
   * 786321 134521
   * 696834 98245
   * 135991 549478
   * 44723 265931
   * 698410 385074
   * ...
   * 6 components
   * ```
   */
  static main() {
    let n
    let uf

    StdIn.read()
      .on('line', (line) => {
        if (!n) {
          // read firs line
          n = StdIn.readInt(line)
          uf = new WeightedQuickUnionUF(n)
        } else {
          const [p, q] = line.split(' ').map((n) => parseInt(n, 10))

          if (uf.connected(p, q)) {
            // do nothing
          } else {
            uf.union(p, q)
            StdOut.println(`${p} ${q}`)
          }
        }
      })
      .on('close', () => {
        StdOut.println(`${uf.count()} components`)
      })
  }
}

// Execution
// ==============================
if (require.main === module) WeightedQuickUnionUFClient.main()
