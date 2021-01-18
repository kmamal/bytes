const { test } = require('@xyz/testing')
const P = require('./primitive-types')
const { makeStructType } = require('./struct-type')
const { makeArrayType } = require('./array-type')
const { makeConstructor } = require('./class')

const buf = Buffer.alloc(16)
const randomOffset = () => Math.floor(Math.random() * 9)
const randomUInt = (bits) => () => Math.floor(Math.random() * 2 ** bits)

const N = 1000

test("bytes.structured.class.struct", (t) => {
	const Class = makeConstructor(makeStructType([
		{ name: 'a', type: P.uint16 },
		{ name: 'b', type: P.uint16 },
		{ name: 'c', type: P.uint16 },
	]))
	const x = new Class(buf, 0)
	const y = new Class(buf, 0)

	for (let i = 0; i < N; i++) {
		const index = randomOffset()
		x.setIndex(index)
		x.a = randomUInt(16)()
		x.b = randomUInt(16)()
		x.c = randomUInt(16)()
		y.setIndex(index)
		t.equal(y, x)
	}
})

test("bytes.structured.class.array", (t) => {
	const Class = makeConstructor(makeArrayType(3, { type: P.uint16 }))
	const x = new Class(buf, 0)
	const y = new Class(buf, 0)

	for (let i = 0; i < N; i++) {
		const index = randomOffset()
		x.setIndex(index)
		x[0] = randomUInt(16)()
		x[1] = randomUInt(16)()
		x[2] = randomUInt(16)()
		y.setIndex(index)
		t.equal(y, x)
	}
})

test("bytes.structured.class.struct-with-array", (t) => {
	const Class = makeConstructor(makeStructType([
		{ name: 'a', type: P.uint16 },
		{ name: 'b', type: makeArrayType(2, { type: P.uint16 }) },
		{ name: 'c', type: P.uint16 },
	]))
	const x = new Class(buf, 0)
	const y = new Class(buf, 0)

	for (let i = 0; i < N; i++) {
		const index = randomOffset()
		x.setIndex(index)
		x.a = randomUInt(16)()
		x.b[0] = randomUInt(16)()
		x.b[1] = randomUInt(16)()
		x.c = randomUInt(16)()
		y.setIndex(index)
		t.equal(y, x)
	}
})

test("bytes.structured.class.array-of-structs", (t) => {
	const Class = makeConstructor(makeArrayType(2, makeStructType([
		{ name: 'a', type: P.uint16 },
		{ name: 'b', type: P.uint16 },
	])))
	const x = new Class(buf, 0)
	const y = new Class(buf, 0)

	for (let i = 0; i < N; i++) {
		const index = randomOffset()
		x.setIndex(index)
		x[0].a = randomUInt(16)()
		x[0].b = randomUInt(16)()
		x[1].a = randomUInt(16)()
		x[1].b = randomUInt(16)()
		y.setIndex(index)
		t.equal(y, x)
	}
})
