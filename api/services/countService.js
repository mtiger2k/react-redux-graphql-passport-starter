var count = 0;
export const addCount = function() {
	return Promise.resolve({amount:++count});
}

export const getCount = function() {
	return Promise.resolve({amount: count});
}