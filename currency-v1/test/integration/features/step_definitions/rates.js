/*
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
*/
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
		this.apickli.get('/latest', callback);
	});

	this.When(/^I request all exchange rates with (.{3}) as the base currency$/, function(base, callback) {
		this.apickli.queryParameters.base = base;
		this.apickli.get('/latest', callback);
	});

	this.When(/^I request all exchange rates for (.*)$/, function(date, callback) {
		this.apickli.get('/'+date, callback);
	});

	this.When(/^I request all exchange rates with (.{3}) as the base currency for (.*)$/, function(base, date, callback) {
		this.apickli.queryParameters.base = base;
		this.apickli.get('/'+date, callback);
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
