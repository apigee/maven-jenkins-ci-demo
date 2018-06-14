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

var apickli = require('apickli');
var config = require('../../test-config.json');

console.log('currency api: [' + config.currencyApi.domain + ', ' + config.currencyApi.basepath + ']');

module.exports = function() {

    this.setDefaultTimeout(60 * 1000);

	// cleanup before every scenario
	this.Before(function(scenario, callback) {
		this.apickli = new apickli.Apickli('https',
										   config.currencyApi.domain + config.currencyApi.basepath,
										   './test/integration/features/fixtures/');
		callback();
	});
};
