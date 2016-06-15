/* jslint node: true */
'use strict';

module.exports = function() {
	this.When(/^I request a non-existing API resource$/, function(callback) {
		this.apickli.get('/blah', callback);
	});
};
