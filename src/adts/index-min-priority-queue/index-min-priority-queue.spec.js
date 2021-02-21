const IndexMinPQ = require('./index-min-priority-queue')

const UNDEF = undefined

const insertKeysInPQ = (keys, pq) => {
  keys.forEach((k, i) => pq.insert(i, k))
}

const clonePQState = (pq) => {
  return {
    _n: pq._n,
    _pq: [...pq._pq],
    _qp: [...pq._qp],
    _keys: [...pq._keys]
  }
}

describe('Unit Tests: IndexMinPQ', () => {
  beforeEach(() => {
    this.maxN = 6
    this.pq = new IndexMinPQ(this.maxN)
    this.keys = ['S', 'O', 'R', 'T', 'M', 'E']
  })

  describe('IndexMinPQ instance', () => {
    it('should have a number prop "_n" equal to 0', () => {
      expect(this.pq._n).toBe(0)
    })

    it('should have an array prop "_pq" with length "maxN + 1"', () => {
      const expectedLength = this.maxN + 1

      expect(Array.isArray(this.pq._pq)).toBe(true)
      expect(this.pq._pq.length).toBe(expectedLength)
    })

    it('should have an array prop "_qp" with length "maxN + 1"', () => {
      const expectedLength = this.maxN + 1

      expect(Array.isArray(this.pq._qp)).toBe(true)
      expect(this.pq._qp.length).toBe(expectedLength)
    })

    it('should have an array prop "_keys" with length "maxN + 1"', () => {
      const expectedLength = this.maxN + 1

      expect(Array.isArray(this.pq._keys)).toBe(true)
      expect(this.pq._keys.length).toBe(expectedLength)
    })

    it('should not be extensible', () => {
      const expectedProps = ['_n', '_pq', '_qp', '_keys']

      this.pq.newProp = 'ignored'

      const actualProps = Object.getOwnPropertyNames(this.pq)
      expect(actualProps).toEqual(expectedProps)
      expect(this.pq.newProp).toBeUndefined()
    })
  })

  describe('IndexMinPQ#insert()', () => {
    it('should increment the size of the pq by 1', () => {
      const expectedN = this.pq._n + 1

      this.pq.insert(0, 'A')

      expect(this.pq._n).toBe(expectedN)
    })

    it('should insert a single key', () => {
      const expected = {
        _pq: [UNDEF, 0, UNDEF, UNDEF, UNDEF, UNDEF, UNDEF],
        _qp: [1, -1, -1, -1, -1, -1, -1],
        _keys: ['A', UNDEF, UNDEF, UNDEF, UNDEF, UNDEF, UNDEF]
      }

      this.pq.insert(0, 'A')

      expect(this.pq._pq).toEqual(expected._pq)
      expect(this.pq._qp).toEqual(expected._qp)
      expect(this.pq._keys).toEqual(expected._keys)
    })

    it('should insert multiple keys and reestablish the heap order', () => {
      const expected = {
        _pq: [UNDEF, 5, 1, 4, 3, 0, 2],
        _qp: [5, 2, 6, 4, 3, 1, -1],
        _keys: ['S', 'O', 'R', 'T', 'M', 'E', UNDEF]
      }

      insertKeysInPQ(this.keys, this.pq)

      expect(this.pq._pq).toEqual(expected._pq)
      expect(this.pq._qp).toEqual(expected._qp)
      expect(this.pq._keys).toEqual(expected._keys)
    })
  })

  describe('IndexMinPQ#changeKey()', () => {
    it('should change the key at index "i" and reestablish the heap order', () => {
      const expected = {
        _pq: [UNDEF, 0, 5, 4, 3, 1, 2],
        _qp: [1, 5, 6, 4, 3, 2, -1],
        _keys: ['A', 'O', 'R', 'T', 'M', 'E', UNDEF]
      }
      insertKeysInPQ(this.keys, this.pq)

      this.pq.changeKey(0, 'A')

      expect(this.pq._pq).toEqual(expected._pq)
      expect(this.pq._qp).toEqual(expected._qp)
      expect(this.pq._keys).toEqual(expected._keys)
    })
  })

  describe('IndexMinPQ#contains()', () => {
    it('should return false when pq is empty', () => {
      expect(this.pq.contains(0)).toBeFalse()
    })

    it('should return true when pq contains index "i"', () => {
      this.pq.insert(0, 'A')
      this.pq.insert(1, 'B')
      this.pq.insert(2, 'C')

      expect(this.pq.contains(2)).toBeTrue()
    })

    it('should return false when pq does NOT contain index "i"', () => {
      this.pq.insert(0, 'A')
      this.pq.insert(1, 'B')
      this.pq.insert(2, 'C')

      expect(this.pq.contains(3)).toBeFalse()
    })
  })

  describe('IndexMinPQ#delete()', () => {
    it('should not throw if the pq is empty', () => {
      expect(() => this.pq.delete(0)).not.toThrow()
    })

    it('should decrement the size of the pq by 1', () => {
      insertKeysInPQ(this.keys, this.pq)
      const expectedSize = this.pq.size() - 1

      this.pq.delete(0)

      expect(this.pq.size()).toBe(expectedSize)
    })

    it('should remove the key at index "i" and reestablish the heap order', () => {
      const expected = {
        _pq: [UNDEF, 5, 1, 4, 3, 2, UNDEF],
        _qp: [-1, 2, 5, 4, 3, 1, -1],
        _keys: [UNDEF, 'O', 'R', 'T', 'M', 'E', UNDEF]
      }
      insertKeysInPQ(this.keys, this.pq)

      this.pq.delete(0)

      expect(this.pq._pq).toEqual(expected._pq)
      expect(this.pq._qp).toEqual(expected._qp)
      expect(this.pq._keys).toEqual(expected._keys)
    })
  })

  describe('IndexMinPQ#minKey()', () => {
    it('should return the minimum key inserted in the pq', () => {
      const expectedKey = 'E'

      insertKeysInPQ(this.keys, this.pq)

      expect(this.pq.minKey()).toBe(expectedKey)
    })
  })

  describe('IndexMinPQ#minIndex()', () => {
    it('should throw if the pq is empty', () => {
      expect(() => this.pq.minIndex()).toThrowError('IndexMinPQ is empty.')
    })

    it('should return the index of the minimum key in the pq', () => {
      /***
       * TODO: bother explaining why?
       */
      const expectedMinIndex = 5

      insertKeysInPQ(this.keys, this.pq)

      expect(this.pq.minIndex()).toBe(expectedMinIndex)
    })
  })

  describe('IndexMinPQ#delMin()', () => {
    it('should decrement the size of the pq by 1', () => {
      insertKeysInPQ(this.keys, this.pq)
      const expectedSize = this.pq.size() - 1

      this.pq.delMin()

      expect(this.pq.size()).toBe(expectedSize)
    })

    it('should remove the the minimum key in the pq and reestablish the heap order', () => {
      const expected = {
        _pq: [UNDEF, 4, 1, 2, 3, 0, UNDEF],
        _qp: [5, 2, 3, 4, 1, -1, -1],
        _keys: ['S', 'O', 'R', 'T', 'M', UNDEF, UNDEF]
      }
      insertKeysInPQ(this.keys, this.pq)

      this.pq.delMin()

      expect(this.pq._pq).toEqual(expected._pq)
      expect(this.pq._qp).toEqual(expected._qp)
      expect(this.pq._keys).toEqual(expected._keys)
    })

    it('should return the index of the minimum key in the pq', () => {
      /***
       * TODO: bother explaining why?
       */
      const expectedMinIndex = 5

      insertKeysInPQ(this.keys, this.pq)

      expect(this.pq.delMin()).toBe(expectedMinIndex)
    })
  })

  describe('IndexMinPQ#isEmpty()', () => {
    it('should return true when the pq has no inserted keys yet', () => {
      expect(this.pq.isEmpty()).toBeTrue()
    })

    it('should return false when a single key is inserted', () => {
      this.pq.insert(0, 'A')

      expect(this.pq.isEmpty()).toBeFalse()
    })

    it('should return true when "n" keys are inserted and removed', () => {
      insertKeysInPQ(this.keys, this.pq)

      this.keys.forEach(() => this.pq.delMin())

      expect(this.pq.isEmpty()).toBeTrue()
    })
  })

  describe('IndexMinPQ#size()', () => {
    it('should return 0 when pq is empty', () => {
      expect(this.pq.size()).toBe(0)
    })

    it('should return 1 when a single key is inserted', () => {
      this.pq.insert(0, 'A')

      expect(this.pq.size()).toBe(1)
    })

    it('should return "n" when "n" keys are inserted', () => {
      insertKeysInPQ(this.keys, this.pq)

      expect(this.pq.size()).toBe(this.keys.length)
    })
  })

  describe('IndexMinPQ#keyOf()', () => {
    it('should return the associated key of index "i"', () => {
      insertKeysInPQ(this.keys, this.pq)

      this.keys.forEach((k, i) => {
        expect(this.pq.keyOf(i)).toBe(this.keys[i])
      })
    })
  })
})

describe('Explain me: IndexMinPQ', () => {
  beforeEach(() => {
    this.keys = ['S', 'O', 'R', 'T', 'M', 'E']
    this.pq = new IndexMinPQ(this.keys.length)
  })

  describe('insertion of keys', () => {
    it('should perform n exchanges and mutate the internal PQ state', () => {
      const pqStates = [clonePQState(this.pq)] // initial PQ state
      const originalInsert = this.pq.insert.bind(this.pq)
      spyOn(IndexMinPQ.prototype, '_exch').and.callThrough()
      spyOn(IndexMinPQ.prototype, 'insert').and.callFake((i, k) => {
        originalInsert(i, k)
        pqStates.push(clonePQState(this.pq))
      })
      const expectedExchanges = [
        [1, 2], // S <-> O
        [2, 5], // S <-> M
        [1, 2], // O <-> M
        [3, 6], // R <-> E
        [1, 3] //  O <-> E
      ]
      const expectedStates = [
        {
          _n: 0,
          _pq: [UNDEF, UNDEF, UNDEF, UNDEF, UNDEF, UNDEF, UNDEF],
          _qp: [-1, -1, -1, -1, -1, -1, -1],
          _keys: [UNDEF, UNDEF, UNDEF, UNDEF, UNDEF, UNDEF, UNDEF]
        },
        {
          _n: 1,
          _pq: [UNDEF, 0, UNDEF, UNDEF, UNDEF, UNDEF, UNDEF],
          _qp: [1, -1, -1, -1, -1, -1, -1],
          _keys: ['S', UNDEF, UNDEF, UNDEF, UNDEF, UNDEF, UNDEF]
        },
        {
          _n: 2,
          _pq: [UNDEF, 1, 0, UNDEF, UNDEF, UNDEF, UNDEF],
          _qp: [2, 1, -1, -1, -1, -1, -1],
          _keys: ['S', 'O', UNDEF, UNDEF, UNDEF, UNDEF, UNDEF]
        },
        {
          _n: 3,
          _pq: [UNDEF, 1, 0, 2, UNDEF, UNDEF, UNDEF],
          _qp: [2, 1, 3, -1, -1, -1, -1],
          _keys: ['S', 'O', 'R', UNDEF, UNDEF, UNDEF, UNDEF]
        },
        {
          _n: 4,
          _pq: [UNDEF, 1, 0, 2, 3, UNDEF, UNDEF],
          _qp: [2, 1, 3, 4, -1, -1, -1],
          _keys: ['S', 'O', 'R', 'T', UNDEF, UNDEF, UNDEF]
        },
        {
          _n: 5,
          _pq: [UNDEF, 4, 1, 2, 3, 0, UNDEF],
          _qp: [5, 2, 3, 4, 1, -1, -1],
          _keys: ['S', 'O', 'R', 'T', 'M', UNDEF, UNDEF]
        },
        {
          _n: 6,
          _pq: [UNDEF, 5, 1, 4, 3, 0, 2],
          _qp: [5, 2, 6, 4, 3, 1, -1],
          _keys: ['S', 'O', 'R', 'T', 'M', 'E', UNDEF]
        }
      ]

      insertKeysInPQ(this.keys, this.pq)

      expect(this.pq._exch.calls.allArgs()).toEqual(expectedExchanges)
      expect(pqStates).toEqual(expectedStates)
    })
  })

  describe('deletion of the min keys', () => {
    it('should perform n exchanges & mutate the internal PQ state', () => {
      insertKeysInPQ(this.keys, this.pq) // insert all keys first
      const pqStates = [clonePQState(this.pq)] // initial PQ state
      const originalDelMin = this.pq.delMin.bind(this.pq)
      spyOn(IndexMinPQ.prototype, '_exch').and.callThrough()
      spyOn(IndexMinPQ.prototype, 'delMin').and.callFake(() => {
        originalDelMin()
        pqStates.push(clonePQState(this.pq))
      })
      const expectedExchanges = [
        [1, 6], // E <-> R
        [1, 3], // R <-> M
        [1, 5], // M <-> S
        [1, 2], // S <-> O
        [1, 4], // O <-> T
        [1, 3], // T <-> R
        [1, 3], // R <-> T
        [1, 2], // T <-> S
        [1, 2], // S <-> T
        [1, 1] //  T // last key
      ]
      const expectedStates = [
        {
          _n: 6,
          _pq: [UNDEF, 5, 1, 4, 3, 0, 2],
          _qp: [5, 2, 6, 4, 3, 1, -1],
          _keys: ['S', 'O', 'R', 'T', 'M', 'E', UNDEF]
        },
        {
          _n: 5,
          _pq: [UNDEF, 4, 1, 2, 3, 0, UNDEF],
          _qp: [5, 2, 3, 4, 1, -1, -1],
          _keys: ['S', 'O', 'R', 'T', 'M', UNDEF, UNDEF]
        },
        {
          _n: 4,
          _pq: [UNDEF, 1, 0, 2, 3, UNDEF, UNDEF],
          _qp: [2, 1, 3, 4, -1, -1, -1],
          _keys: ['S', 'O', 'R', 'T', UNDEF, UNDEF, UNDEF]
        },
        {
          _n: 3,
          _pq: [UNDEF, 2, 0, 3, UNDEF, UNDEF, UNDEF],
          _qp: [2, -1, 1, 3, -1, -1, -1],
          _keys: ['S', UNDEF, 'R', 'T', UNDEF, UNDEF, UNDEF]
        },
        {
          _n: 2,
          _pq: [UNDEF, 0, 3, UNDEF, UNDEF, UNDEF, UNDEF],
          _qp: [1, -1, -1, 2, -1, -1, -1],
          _keys: ['S', UNDEF, UNDEF, 'T', UNDEF, UNDEF, UNDEF]
        },
        {
          _n: 1,
          _pq: [UNDEF, 3, UNDEF, UNDEF, UNDEF, UNDEF, UNDEF],
          _qp: [-1, -1, -1, 1, -1, -1, -1],
          _keys: [UNDEF, UNDEF, UNDEF, 'T', UNDEF, UNDEF, UNDEF]
        },
        {
          _n: 0,
          _pq: [UNDEF, UNDEF, UNDEF, UNDEF, UNDEF, UNDEF, UNDEF],
          _qp: [-1, -1, -1, -1, -1, -1, -1],
          _keys: [UNDEF, UNDEF, UNDEF, UNDEF, UNDEF, UNDEF, UNDEF]
        }
      ]

      while (!this.pq.isEmpty()) {
        this.pq.delMin()
      }

      expect(this.pq._exch.calls.allArgs()).toEqual(expectedExchanges)
      expect(pqStates).toEqual(expectedStates)
    })
  })
})
