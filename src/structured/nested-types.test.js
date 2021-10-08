const { test } = require('@kmamal/testing')
const P = require('./primitive-types')
const { makeStructType } = require('./struct-type')
const { makeArrayType } = require('./array-type')

const buf = Buffer.alloc(16)
const randomOffset = () => Math.floor(Math.random() * 9)
const randomUInt = (bits) => () => Math.floor(Math.random() * 2 ** bits)

const N = 1000

test("bytes.structured.nested-type.struct", (t) => {
	const type = makeStructType([
		{ name: 'a', type: P.uint16 },
		{ name: 'b', type: P.uint16 },
		{ name: 'c', type: P.uint16 },
	])

	for (let i = 0; i < N; i++) {
		const offset = randomOffset()
		const x = {
			a: randomUInt(16)(),
			b: randomUInt(16)(),
			c: randomUInt(16)(),
		}
		const w = type.write(buf, offset, x)
		const r = type.read(buf, offset)
		t.equal(w, type.size)
		t.equal(r.count, type.size)
		t.equal(r.value, x)
	}
})

test("bytes.structured.nested-type.array", (t) => {
	const type = makeArrayType(3, { type: P.uint16 })

	for (let i = 0; i < N; i++) {
		const offset = randomOffset()
		const x = [
			randomUInt(16)(),
			randomUInt(16)(),
			randomUInt(16)(),
		]
		const w = type.write(buf, offset, x)
		const r = type.read(buf, offset)
		t.equal(w, type.size)
		t.equal(r.count, type.size)
		t.equal(r.value, x)
	}
})

test("bytes.structured.nested-type.struct-with-array", (t) => {
	const type = makeStructType([
		{ name: 'a', type: P.uint16 },
		{ name: 'b', type: makeArrayType(2, { type: P.uint16 }) },
		{ name: 'c', type: P.uint16 },
	])

	for (let i = 0; i < N; i++) {
		const offset = randomOffset()
		const x = {
			a: randomUInt(16)(),
			b: [
				randomUInt(16)(),
				randomUInt(16)(),
			],
			c: randomUInt(16)(),
		}
		const w = type.write(buf, offset, x)
		const r = type.read(buf, offset)
		t.equal(w, type.size)
		t.equal(r.count, type.size)
		t.equal(r.value, x)
	}
})

test("bytes.structured.nested-type.array-of-structs", (t) => {
	const type = makeArrayType(2, makeStructType([
		{ name: 'a', type: P.uint16 },
		{ name: 'b', type: P.uint16 },
	]))

	for (let i = 0; i < N; i++) {
		const offset = randomOffset()
		const x = [
			{ a: randomUInt(16)(), b: randomUInt(16)() },
			{ a: randomUInt(16)(), b: randomUInt(16)() },
		]
		const w = type.write(buf, offset, x)
		const r = type.read(buf, offset)
		t.equal(w, type.size)
		t.equal(r.count, type.size)
		t.equal(r.value, x)
	}
})
