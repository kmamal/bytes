const V = require('../var-int')

const int_be = {
	type: 'int_be',
	primitive: true,
	read (b, i) {
		const s = this.size
		return { value: b.readIntBE(i, s), count: s }
	},
	write (b, i, v) { return b.writeIntBE(v, i, this.size) - i },
}
const int_le = {
	type: 'int_le',
	primitive: true,
	read (b, i) {
		const s = this.size
		return { value: b.readIntLE(i, s), count: s }
	},
	write (b, i, v) { return b.writeIntLE(v, i, this.size) - i },
}

const uint_be = {
	type: 'uint_be',
	primitive: true,
	read (b, i) {
		const s = this.size
		return { value: b.readUIntBE(i, s), count: s }
	},
	write (b, i, v) { return b.writeUIntBE(v, i, this.size) - i },
}
const uint_le = {
	type: 'uint_le',
	primitive: true,
	read (b, i) {
		const s = this.size
		return { value: b.readUIntLE(i, s), count: s }
	},
	write (b, i, v) { return b.writeUIntLE(v, i, this.size) - i },
}


const int8 = {
	type: 'int8',
	primitive: true,
	size: 1,
	read (b, i) { return { value: b.readInt8(i), count: this.size } },
	write (b, i, v) { return b.writeInt8(v, i) - i },
}
const uint8 = {
	type: 'uint8',
	primitive: true,
	size: 1,
	read (b, i) { return { value: b.readUInt8(i), count: this.size } },
	write (b, i, v) { return b.writeUInt8(v, i) - i },
}

const int16_be = {
	type: 'int16_be',
	primitive: true,
	size: 2,
	read (b, i) { return { value: b.readInt16BE(i), count: this.size } },
	write (b, i, v) { return b.writeInt16BE(v, i) - i },
}
const int16_le = {
	type: 'int16_le',
	primitive: true,
	size: 2,
	read (b, i) { return { value: b.readInt16LE(i), count: this.size } },
	write (b, i, v) { return b.writeInt16LE(v, i) - i },
}

const uint16_be = {
	type: 'uint16_be',
	primitive: true,
	size: 2,
	read (b, i) { return { value: b.readUInt16BE(i), count: this.size } },
	write (b, i, v) { return b.writeUInt16BE(v, i) - i },
}
const uint16_le = {
	type: 'uint16_le',
	primitive: true,
	size: 2,
	read (b, i) { return { value: b.readUInt16LE(i), count: this.size } },
	write (b, i, v) { return b.writeUInt16LE(v, i) - i },
}

const int32_be = {
	type: 'int32_be',
	primitive: true,
	size: 4,
	read (b, i) { return { value: b.readInt32BE(i), count: this.size } },
	write (b, i, v) { return b.writeInt32BE(v, i) - i },
}
const int32_le = {
	type: 'int32_le',
	primitive: true,
	size: 4,
	read (b, i) { return { value: b.readInt32LE(i), count: this.size } },
	write (b, i, v) { return b.writeInt32LE(v, i) - i },
}

const uint32_be = {
	type: 'uint32_be',
	primitive: true,
	size: 4,
	read (b, i) { return { value: b.readUInt32BE(i), count: this.size } },
	write (b, i, v) { return b.writeUInt32BE(v, i) - i },
}
const uint32_le = {
	type: 'uint32_le',
	primitive: true,
	size: 4,
	read (b, i) { return { value: b.readUInt32LE(i), count: this.size } },
	write (b, i, v) { return b.writeUInt32LE(v, i) - i },
}

const int64_be = {
	type: 'int64_be',
	primitive: true,
	size: 8,
	read (b, i) { return { value: b.readBigInt64BE(i), count: this.size } },
	write (b, i, v) { return b.writeBigInt64BE(v, i) - i },
}
const int64_le = {
	type: 'int64_le',
	primitive: true,
	size: 8,
	read (b, i) { return { value: b.readBigInt64LE(i), count: this.size } },
	write (b, i, v) { return b.writeBigInt64LE(v, i) - i },
}

const uint64_be = {
	type: 'uint64_be',
	primitive: true,
	size: 8,
	read (b, i) { return { value: b.readBigUInt64BE(i), count: this.size } },
	write (b, i, v) { return b.writeBigUInt64BE(v, i) - i },
}
const uint64_le = {
	type: 'uint64_le',
	primitive: true,
	size: 8,
	read (b, i) { return { value: b.readBigUInt64LE(i), count: this.size } },
	write (b, i, v) { return b.writeBigUInt64LE(v, i) - i },
}


const float_be = {
	type: 'float_be',
	primitive: true,
	size: 4,
	read (b, i) { return { value: b.readFloatBE(i), count: this.size } },
	write (b, i, v) { return b.writeFloatBE(v, i) - i },
}
const float_le = {
	type: 'float_le',
	primitive: true,
	size: 4,
	read (b, i) { return { value: b.readFloatLE(i), count: this.size } },
	write (b, i, v) { return b.writeFloatLE(v, i) - i },
}

const double_be = {
	type: 'double_be',
	primitive: true,
	size: 8,
	read (b, i) { return { value: b.readDoubleBE(i), count: this.size } },
	write (b, i, v) { return b.writeDoubleBE(v, i) - i },
}
const double_le = {
	type: 'double_le',
	primitive: true,
	size: 8,
	read (b, i) { return { value: b.readDoubleLE(i), count: this.size } },
	write (b, i, v) { return b.writeDoubleLE(v, i) - i },
}


const var_uint_be = {
	type: 'var_uint_be',
	primitive: true,
	size: null,
	read (b, i) { return V.readUIntVarBE(b, i) },
	write (b, i, v) { return V.writeUIntVarBE(b, i, v) },
}
const var_uint_le = {
	type: 'var_uint_le',
	primitive: true,
	size: null,
	read (b, i) { return V.readUIntVarLE(b, i) },
	write (b, i, v) { return V.writeUIntVarLE(b, i, v) },
}

const var_biguint_be = {
	type: 'var_biguint_be',
	primitive: true,
	size: null,
	read (b, i) { return V.readBigUIntVarBE(b, i) },
	write (b, i, v) { return V.writeBigUIntVarBE(b, i, v) },
}
const var_biguint_le = {
	type: 'var_biguint_le',
	primitive: true,
	size: null,
	read (b, i) { return V.readBigUIntVarLE(b, i) },
	write (b, i, v) { return V.writeBigUIntVarLE(b, i, v) },
}

module.exports = {
	int8,
	uint8,
	int_be,
	int_le,
	uint_be,
	uint_le,
	int16_be,
	int16_le,
	uint16_be,
	uint16_le,
	int32_be,
	int32_le,
	uint32_be,
	uint32_le,
	int64_be,
	int64_le,
	uint64_be,
	uint64_le,
	float_be,
	float_le,
	double_be,
	double_le,
	var_uint_be,
	var_uint_le,
	var_biguint_be,
	var_biguint_le,
	int: int_be,

	// Aliases

	uint: uint_be,
	int16: int16_be,
	uint16: uint16_be,
	int32: int32_be,
	uint32: uint32_be,
	int64: int64_be,
	uint64: uint64_be,
	float: float_be,
	double: double_be,
	var_uint: var_uint_be,
	var_biguint: var_biguint_be,
}
