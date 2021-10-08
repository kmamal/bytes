const { test } = require('@kmamal/testing')
const P = require('./primitive-types')

const buf = Buffer.alloc(16)
const randomOffset = () => Math.floor(Math.random() * 9)

const minUInt = () => 0
const maxUInt = (bits) => 2 ** bits - 1
const randomUInt = (bits) => {
	const min = minUInt(bits)
	const max = maxUInt(bits)
	const range = max - min
	return () => Math.floor(Math.random() * range) + min + 1
}

const minInt = (bits) => -(2 ** (bits - 1))
const maxInt = (bits) => 2 ** (bits - 1) - 1
const randomInt = (bits) => {
	const min = minInt(bits)
	const max = maxInt(bits)
	const range = max - min
	return () => Math.floor(Math.random() * range) + min + 1
}

for (const key of [
	'uint8',
	'uint16_be',
	'uint16_le',
	'uint32_be',
	'uint32_le',
]) {
	const type = P[key]
	const bits = type.size * 8
	const cases = [
		minUInt(bits),
		maxUInt(bits),
		...Array.from({ length: 1000 }, randomUInt(bits)),
	]

	test(`bytes.structured.primitive-types.${key}`, (t) => {
		for (const x of cases) {
			const offset = randomOffset()
			type.write(buf, offset, x)
			const r = type.read(buf, offset)
			t.equal(r.count, type.size)
			t.equal(r.value, x)
		}
	})
}

for (const key of [
	'int8',
	'int16_be',
	'int16_le',
	'int32_be',
	'int32_le',
]) {
	const type = P[key]
	const bits = type.size * 8
	const cases = [
		minInt(bits),
		maxInt(bits),
		...Array.from({ length: 1000 }, randomInt(bits)),
	]

	test(`bytes.structured.primitive-types.${key}`, (t) => {
		for (const x of cases) {
			const offset = randomOffset()
			type.write(buf, offset, x)
			const r = type.read(buf, offset)
			t.equal(r.count, type.size)
			t.equal(r.value, x)
		}
	})
}

for (const key of [
	'float_be',
	'float_le',
	'double_be',
	'double_le',
]) {
	const type = P[key]
	const cases = [ -Infinity, -1, -0, 0, 1, Infinity, NaN ]
	test(`bytes.structured.primitive-types.${key}`, (t) => {
		for (const x of cases) {
			const offset = randomOffset()
			type.write(buf, offset, x)
			const r = type.read(buf, offset)
			t.equal(r.count, type.size)
			t.equal(r.value, x)
		}
	})
}

for (const key of [
	'var_uint_be',
	'var_uint_le',
]) {
	const type = P[key]
	const cases = [
		minUInt(6),
		maxUInt(6),
		...Array.from({ length: 1000 }, randomUInt(6)),
	]
	test(`bytes.structured.primitive-types.${key}`, (t) => {
		for (const x of cases) {
			const offset = randomOffset()
			type.write(buf, offset, x)
			const r = type.read(buf, offset)
			t.equal(r.value, x)
		}
	})
}

for (const key of [
	'var_biguint_be',
	'var_biguint_le',
]) {
	const type = P[key]
	const cases = [
		BigInt(minUInt(8)),
		BigInt(maxUInt(8)),
		...Array.from({ length: 1000 }, () => BigInt(randomUInt(8)())),
	]
	test(`bytes.structured.primitive-types.${key}`, (t) => {
		for (const x of cases) {
			const offset = randomOffset()
			type.write(buf, offset, x)
			const r = type.read(buf, offset)
			t.equal(r.value, x)
		}
	})
}
