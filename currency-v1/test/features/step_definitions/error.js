/* jslint node: true */
'use strict';

module.exports = function () {

	this.Then(/^I should get a (\d{3}) error with "(.*)" message and code "(.*)"$/, function (statusCode, errorMessage, errorCode, callback) {
		var assertion = this.apickli.assertPathInResponseBodyMatchesExpression('$.message', errorMessage);
		if (!assertion.success) {
			callback(JSON.stringify(assertion));
			return;
		}

		assertion = this.apickli.assertPathInResponseBodyMatchesExpression('$.code', errorCode);
		if (!assertion.success) {
			callback(JSON.stringify(assertion));
			return;
		}

		assertion = this.apickli.assertResponseCode(statusCode);
		if (assertion.success) {
			callback();
		} else {
			callback(JSON.stringify(assertion));
		}

	});
};
