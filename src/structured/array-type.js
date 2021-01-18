const Description = require('./description')

const makeArrayType = (length, description) => {
	const item = Description.normalize(description)
	const item_size = item.size
	const size = item_size === null ? null : length * item_size

	const __read = (dst, dst_start, buffer, index) => {
		let offset = 0
		let write_index = dst_start
		for (let i = 0; i < length; i++) {
			const { value, count } = item.read(buffer, index + offset)
			dst[write_index++] = value
			offset += count
		}
		return offset
	}

	const read = (buffer, index) => {
		const value = new Array(length)
		const count = __read(value, 0, buffer, index)
		return { value, count }
	}

	const __write = (buffer, index, src, src_start, src_end) => {
		let offset = 0
		let read_index = src_start
		while (read_index < src_end) {
			offset += item.write(buffer, index + offset, src[read_index++])
		}
		return offset
	}

	const write = (b, i, v) => __write(b, i, v, 0, v.length)

	return { type: 'array', length, item, size, __read, read, __write, write }
}

module.exports = { makeArrayType }
