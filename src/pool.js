
class Pool {
	constructor (header, data, page_size) {
		this._header = header
		this._data = data
		this._page_size = page_size
		this._count = Math.floor(data.length / page_size)

		this._pb = header.length
	}

	reset () {
		this._writeFirst(0)
		for (let i = 0; i < this._count - 1; i++) {
			this._writeNext(i, i + 1)
		}
		this._writeNext(this._count - 1, -1)
	}

	alloc () {
		const addr = this._readFirst()
		if (addr === -1) { throw new Error('out of memory') }

		const next = this._readNext(addr)
		this._writeFirst(next)

		const buffer = this._slice(addr, this._page_size)
		return { pointer: addr, buffer }
	}

	free (addr) {
		const next = this._readFirst()
		this._writeNext(addr, next)
		this._writeFirst(addr)
	}

	_slice (start, size) { return this._data.slice(start, start + size) }

	_readFirst () { return this._header.readUIntBE(0, this._pb) - 1 }
	_writeFirst (next) { this._header.writeUIntBE(next + 1, 0, this._pb) }

	_readNext (addr) { return this._data.readUIntBE(addr, this._pb) - 1 }
	_writeNext (addr, next) { this._data.writeUIntBE(next + 1, addr, this._pb) }
}

module.exports = { Pool }
