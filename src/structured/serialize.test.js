const { test } = require('@kmamal/testing')
const P = require('./primitive-types')
const { makeStructType } = require('./struct-type')
const { makeArrayType } = require('./array-type')
const S = require('./serialize')
const Util = require('util')

const options = {
	colors: false,
	breakLength: Infinity,
	depth: Infinity,
	maxArrayLength: Infinity,
	maxStringLength: Infinity,
	showHidden: false,
	sorted: true,
}

test("bytes.structured.serialize", (t) => {
	const type = makeStructType([
		{ name: 'a', type: P.uint16 },
		{
			name: 'b',
			type: makeArrayType(2, makeStructType([
				{ name: 'd', type: P.uint16 },
				{ name: 'e', type: P.uint16 },
			])),
		},
		{ name: 'c', type: P.uint16 },
	])

	const parsed = S.unserialize(S.serialize(type))

	t.equal(
		Util.inspect(parsed, options),
		Util.inspect(type, options),
	)
})
