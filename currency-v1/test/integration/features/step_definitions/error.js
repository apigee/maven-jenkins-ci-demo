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
