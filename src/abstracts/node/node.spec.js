const Node = require('./node')

describe('Unit Tests: Node', () => {
  describe('Node instance', () => {
    beforeEach(() => {
      this.node = new Node()
    })

    it('should have a prop `_item` equal to null', () => {
      expect(this.node._item).toBeNull()
    })

    it('should have a prop `_key` equal to null', () => {
      expect(this.node._key).toBeNull()
    })

    it('should have a prop `_val` equal to null', () => {
      expect(this.node._val).toBeNull()
    })

    it('should have a prop `_next` equal to null', () => {
      expect(this.node._next).toBeNull()
    })

    it('should not be extensible', () => {
      const expectedProps = ['_item', '_key', '_val', '_next']

      this.node.newProp = null

      const actualProps = Object.getOwnPropertyNames(this.node)
      expect(actualProps).toEqual(expectedProps)
      expect(this.node.newProp).toBeUndefined()
    })

    it('should be initialized with the given props', () => {
      const k = 'A'
      const v = 0
      const next = new Node()

      this.node = new Node(k, v, next)

      expect(this.node._key).toBe(k)
      expect(this.node._val).toBe(v)
      expect(this.node._next).toBe(next)
    })
  })
})
