/* jshint node:true */
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
