/* jslint node: true */
'use strict';

var getTodaysDate = function() {
	return new Date().toISOString().substring(0, 10);
};

module.exports = function() {

	this.Given(/^I want (.*) as the base currency$/, function(baseCurrency, callback) {
		this.apickli.queryParameters.base = baseCurrency;
		callback();
	});

	this.Given(/^I want to see rates for (.*)$/, function(date, callback) {
		this.apickli.queryParameters.date = date;
		callback();
	});

	this.When(/^I request all exchange rates$/, function(callback) {
		this.apickli.get('/rates', callback);
	});

	this.Then(/^I should get (.*) as the base currency$/, function(baseCurrency, callback) {
		var assertion = this.apickli.assertPathInResponseBodyMatchesExpression('$.base', baseCurrency);
		if (!assertion.success) {
			callback(JSON.stringify(assertion));
			return;
		} else {
			callback();
		}
	});

	this.Then(/^api should respond with correct message structure$/, function(callback) {
		this.apickli.validateResponseWithSchema('rates.schema', function(assertion) {
			if (assertion.success) {
				callback();
			} else {
				callback(JSON.stringify(assertion));
			}
		});
	});

	this.Then(/^rates should be for (.*)$/, function(date, callback) {
		if (date === 'today') {
			date = getTodaysDate();
		}

		var assertion = this.apickli.assertPathInResponseBodyMatchesExpression('$.date', date);
		if (!assertion.success) {
			callback(JSON.stringify(assertion));
			return;
		} else {
			callback();
		}
	});

};
