var expect = require('chai').expect;
var sinon = require('sinon');

var contextGetVariableMethod,
	contextSetVariableMethod,
	httpClientSendMethod,
	requestConstr;

beforeEach(function() {
	GLOBAL.context = {
		getVariable: function(s) {},
		setVariable: function(a, b) {}
	};

	GLOBAL.httpClient = {
		send: function(s) {}
	};

	GLOBAL.Request = function(s) {};

	contextGetVariableMethod = sinon.stub(GLOBAL.context, 'getVariable');
	contextSetVariableMethod = sinon.spy(GLOBAL.context, 'setVariable');
	httpClientSendMethod = sinon.stub(httpClient, 'send');
	requestConstr = sinon.spy(GLOBAL, 'Request');

});

afterEach(function() {
	contextGetVariableMethod.restore();
	contextSetVariableMethod.restore();
	httpClientSendMethod.restore();
	requestConstr.restore();
});

exports.getMock = function() {
	return {
		contextGetVariableMethod: contextGetVariableMethod,
		contextSetVariableMethod: contextSetVariableMethod,
		httpClientSendMethod: httpClientSendMethod,
		requestConstr: requestConstr
	};
}
