const Description = require('./description')

const makeStructType = (descriptions) => {
	let size = 0

	const fields = descriptions.map((description) => {
		const field = Description.normalize(description)

		if (size !== null) {
			const field_size = field.size
			if (field_size === null) {
				size = null
			} else {
				size += field_size
			}
		}

		return field
	})

	const __read = (dst, buffer, index) => {
		let offset = 0
		for (const field of fields) {
			const { value, count } = field.read(buffer, index + offset)
			dst[field.name] = value
			offset += count
		}
		return offset
	}

	const read = (b, i) => {
		const value = {}
		const count = __read(value, b, i)
		return { value, count }
	}

	const write = (buffer, index, src) => {
		let offset = 0
		for (const field of fields) {
			offset += field.write(buffer, index + offset, src[field.name])
		}
		return offset
	}

	return { type: 'struct', fields, size, __read, read, write }
}

module.exports = { makeStructType }
