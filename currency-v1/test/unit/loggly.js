var expect = require('chai').expect;
var sinon = require('sinon');

var moduleLoader = require('./common/moduleLoader.js');
var mockFactory = require('./common/mockFactory.js');
var json = require('./common/jsonComparer.js');

var js = '../../../apiproxy/resources/jsc/LogToLoggly.js';

describe('feature: loggly integration', function() {

	it('should push target error response data to loggly', function(done) {
		var mock = mockFactory.getMock();

		mock.contextGetVariableMethod.withArgs('organization.name').returns('demoorg');
		mock.contextGetVariableMethod.withArgs('apiproxy.name').returns('currency-v1');
		mock.contextGetVariableMethod.withArgs('environment.name').returns('test');
		mock.contextGetVariableMethod.withArgs('flow.apigee.error.message').returns('resource not found');
		mock.contextGetVariableMethod.withArgs('flow.apigee.error.status').returns('404');
		mock.contextGetVariableMethod.withArgs('flow.apigee.error.code').returns('404.01.001');
		mock.contextGetVariableMethod.withArgs('proxy.basepath').returns('/currency/v1');
		mock.contextGetVariableMethod.withArgs('proxy.pathsuffix').returns('/rates');
		mock.contextGetVariableMethod.withArgs('flow.apigee.originalRequest.header.X-Forwarded-Proto').returns('https');
		mock.contextGetVariableMethod.withArgs('flow.apigee.originalRequest.header.Host').returns('demo-org.apigee.net');
		mock.contextGetVariableMethod.withArgs('flow.apigee.originalRequest.querystring').returns('a=a&b=b');
		mock.contextGetVariableMethod.withArgs('flow.apigee.originalRequest.verb').returns('GET');

		moduleLoader.load(js, function(err) {
			expect(err).to.be.undefined;

			expect(mock.httpClientSendMethod.calledOnce).to.be.true;

			var logglyRequestArguments = mock.requestConstr.args[0];
			expect(logglyRequestArguments[0]).to.equal('https://demo-org.apigee.net/currency/v1/logs');
			expect(logglyRequestArguments[1]).to.equal('POST');
			expect(logglyRequestArguments[2]['Content-Type']).to.equal('application/json');

			var logObject = JSON.parse(mock.requestConstr.args[0][3]);

			json.compare(logObject, 'logObject.json', function(err) {
				if (err) { throw err; }
				done();
			});
		});
	});

});
