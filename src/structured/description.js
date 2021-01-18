
const getSize = (desc) => {
	const type_size = desc.type.size
	if (type_size === null) { return null }
	return type_size ?? desc.size
}

const normalize = (desc) => {
	const desc_size = getSize(desc)
	if (desc_size === undefined) {
		const error = new Error("missing size")
		error.desc = desc
		throw error
	}
	return { ...desc, ...desc.type }
}

module.exports = {
	getSize,
	normalize,
}
