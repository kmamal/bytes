const T = require('@xyz/bytes/structured/primitive-types')
const { makeStructType } = require('@xyz/bytes/structured/struct-type')
const { makeArrayType } = require('@xyz/bytes/structured/array-type')

const default_nested_types = {
	struct: (description, nested_types) => {
		const { fields } = description
		const _fields = fields.map((field) => _unserialize(field, nested_types))
		const result = {
			...description,
			...makeStructType(_fields),
		}
		return result
	},
	array: (description, nested_types) => {
		const { length, item } = description
		const _item = _unserialize(item, nested_types)
		return {
			...description,
			...makeArrayType(length, _item),
		}
	},
}

const serialize = (type) => JSON.stringify(type)

const _unserialize = (description, nested_types) => {
	const typename = description.type
	const nested_type = nested_types[typename]
	if (nested_type) {
		return nested_type(description, nested_types)
	}

	const type = T[typename]
	if (!type) {
		const error = new Error("unknown type")
		error.type = description
		throw error
	}
	description.type = type
	return description
}

const unserialize = (json, nested_types = default_nested_types) => {
	const description = JSON.parse(json)
	return _unserialize(description, nested_types)
}

module.exports = {
	serialize,
	unserialize,
}
