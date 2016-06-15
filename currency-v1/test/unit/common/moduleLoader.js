exports.load = function (module, callback) {
	try{
		delete require.cache[require.resolve(module)];
		require(module);
		callback();
	} catch (E) {
		callback(E);
	}
};
