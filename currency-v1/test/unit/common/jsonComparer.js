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

var chai = require('chai');
chai.should();
chai.use(require('chai-fuzzy'));
var fs = require('fs');

var fixturesDirectory = './test/unit/fixtures/';

exports.compare = function(expected, fixture, done) {
	fs.readFile(fixturesDirectory + fixture, 'utf8', function(err, data) {
		if (err) {
			done(err);
			return;
		}

		expected.should.be.jsonOf(JSON.parse(data));
		done();
	});
};
