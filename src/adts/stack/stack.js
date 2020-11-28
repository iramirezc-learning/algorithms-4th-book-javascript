const { Iterator, Node } = require('../../abstracts')

/**
 * Stack
 * @classdesc Generic Stack implementation based on linked-lists.
 * @implements {Iterator}
 * @see p. 147, 149, 155
 */
class Stack {
  constructor () {
    this._n = 0
    this._first = null

    Object.seal(this)
  }

  /**
   * Returns if the Stack is empty
   */
  isEmpty () {
    return this._first === null
  }

  /**
   * Returns the Stacks' size
   */
  size () {
    return this._n
  }

  /**
   * Inserts an item to the Stack
   * @param {*} item The item to be stored
   */
  push (item) {
    const oldFirst = this._first

    this._first = new Node()
    this._first._item = item
    this._first._next = oldFirst
    this._n++
  }

  /**
   * Removes and returns the last inserted
   * item from the Stack.
   */
  pop () {
    if (this.isEmpty()) {
      throw new ReferenceError('stack is empty')
    }

    const removedItem = this._first._item

    this._first = this._first._next
    this._n--

    return removedItem
  }

  /**
   * Returns an Iterator to traverse the stack.
   * @returns {Iterator}
   */
  [Symbol.iterator] () {
    return new Iterator(this._first)
  }
}

module.exports = Stack
