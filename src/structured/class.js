const { normalize } = require('./description')

const _makeConstructor = (description) => {
	const { type } = description
	if (type === 'struct') { return makeObjectConstructor(description) }
	if (type === 'array') { return makeArrayConstructor(description) }
	return null
}

const makeArrayConstructor = (description) => {
	const { length, item } = description

	const ItemClass = _makeConstructor(item)
	if (ItemClass) {
		return class {
			static SIZE = length * ItemClass.SIZE

			constructor (buffer, index) {
				this._buffer = buffer
				this._index = index

				let offset = 0
				for (let i = 0; i < length; i++) {
					this[i] = new ItemClass(this._buffer, offset)
					offset += ItemClass.SIZE
				}
			}

			setBuffer (buffer) {
				this._buffer = buffer
				for (let i = 0; i < length; i++) {
					this[i].setBuffer(buffer)
				}
			}

			setIndex (index) {
				this._index = index
				let offset = 0
				for (let i = 0; i < length; i++) {
					this[i].setIndex(index + offset)
					offset += ItemClass.SIZE
				}
			}
		}
	}

	const field = normalize(item)
	const { size } = field

	const properties = {}
	let offset = 0
	for (let i = 0; i < length; i++) {
		const _offset = offset
		offset += size

		properties[i] = {
			enumerable: true,
			get () {
				return field.read(this._buffer, this._index + _offset, size)
			},
			set (value) {
				field.write(this._buffer, this._index + _offset, value, size)
			},
		}
	}

	return class {
		static SIZE = offset

		constructor (buffer, index) {
			this._buffer = buffer
			this._index = index
			Object.defineProperties(this, properties)
		}

		setBuffer (buffer) { this._buffer = buffer }
		setIndex (index) { this._index = index }
	}
}

const makeObjectConstructor = (description) => {
	const properties = {}
	const nested = []

	let offset = 0
	for (const _field of description.fields) {
		const { name } = _field

		const NestedClass = _makeConstructor(_field)
		if (NestedClass) {
			nested.push({ name, NestedClass, offset })
			offset += NestedClass.SIZE
			continue
		}

		const field = normalize(_field)
		const { size } = field

		const _offset = offset
		offset += size

		properties[name] = {
			enumerable: true,
			get () {
				return field.read(this._buffer, this._index + _offset, size)
			},
			set (value) {
				field.write(this._buffer, this._index + _offset, value, size)
			},
		}
	}

	return class {
		static SIZE = offset

		constructor (buffer, index = 0) {
			this._buffer = buffer
			this._index = index
			for (const { name, NestedClass, offset: nested_offset } of nested) {
				this[name] = new NestedClass(buffer, nested_offset)
			}
			Object.defineProperties(this, properties)
		}

		setBuffer (buffer) {
			this._buffer = buffer
			for (const { name } of nested) {
				this[name].setBuffer(buffer)
			}
		}

		setIndex (index) {
			this._index = index
			for (const { name, offset: nested_offset } of nested) {
				this[name].setIndex(index + nested_offset)
			}
		}
	}
}

const makeConstructor = (description) => {
	if (description === null) {
		const error = new Error("variable size")
		error.description = description
		throw error
	}

	const Class = _makeConstructor(description)
	if (Class) { return Class }

	const error = new Error("bad description")
	error.description = description
	throw error
}

module.exports = { makeConstructor }
