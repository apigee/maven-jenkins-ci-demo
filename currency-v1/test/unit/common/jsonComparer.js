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
