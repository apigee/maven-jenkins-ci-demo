/* jslint node: true */
'use strict';

var Promise = require('bluebird');

var assertSuccessfulApiResponse = function(apickli) {
	return new Promise(function(resolve, reject) {
		if (!apickli.scenarioVariables.isResponseSuccessful) {
			var assertion = apickli.assertResponseCode("200");
			if (!assertion.success) {
				return reject(assertion);
			}

			apickli.validateResponseWithSchema('rates.schema', function(assertion) {
				if (!assertion.success) {
					apickli.scenarioVariables.isResponseSuccessful = true;
					return reject(assertion);
				} else {
					return resolve();
				}
			});
		} else {
			return resolve();
		}
	});
};

module.exports = function() {

	this.When(/^I request all exchange rates with default values$/, function(callback) {
		this.apickli.get('/rates', callback);
	});

	this.When(/^I request all exchange rates with (.{3}) as the base currency$/, function(base, callback) {
		this.apickli.queryParameters.base = base;
		this.apickli.get('/rates', callback);
	});

	this.When(/^I request all exchange rates for (.*)$/, function(date, callback) {
		this.apickli.queryParameters.date = date;
		this.apickli.get('/rates', callback);
	});

	this.When(/^I request all exchange rates with (.{3}) as the base currency for (.*)$/, function(base, date, callback) {
		this.apickli.queryParameters.base = base;
		this.apickli.queryParameters.date = date;
		this.apickli.get('/rates', callback);
	});

	this.Then(/^I should see (.*) as the base currency$/, function(base, callback) {
		var self = this;
		assertSuccessfulApiResponse(this.apickli)
		.then(function() {
			var assertion = self.apickli.assertPathInResponseBodyMatchesExpression('$.base', base);
			if (assertion.success) {
				callback();
			} else {
				callback(JSON.stringify(assertion));
			}
		})
		.catch(function(assertion) {
			callback(JSON.stringify(assertion));
		});
	});

	this.Then(/^I should see the rates for the latest exchange day$/, function(callback) {
		var self = this;
		assertSuccessfulApiResponse(this.apickli)
		.then(function() {
			var response = JSON.parse(self.apickli.getResponseObject().body);
			var dateInResponse = new Date(response.date);

			var today = new Date();
			var toDate = new Date();
			var fromDate = new Date(today.setTime( today.getTime() - 4 * 86400000 ));

			if ((dateInResponse >= fromDate) && (dateInResponse <= toDate)) {
				callback();
			} else {
				callback('response date ' + dateInResponse + ' is not in acceptance range');
			}
		})
		.catch(function(assertion) {
			callback(JSON.stringify(assertion));
		});
	});

	this.Then(/^I should see the rates for (\d{4}-\d{2}-\d{2})$/, function(date, callback) {
		var self = this;
		assertSuccessfulApiResponse(this.apickli)
		.then(function() {
			var assertion = self.apickli.assertPathInResponseBodyMatchesExpression('$.date', date);
			if (assertion.success) {
				callback();
			} else {
				callback(JSON.stringify(assertion));
			}
		})
		.catch(function(assertion) {
			callback(JSON.stringify(assertion));
		});
	});

};
