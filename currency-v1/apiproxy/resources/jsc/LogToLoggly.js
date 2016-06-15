var logglyUrlScheme = context.getVariable('flow.apigee.originalRequest.header.X-Forwarded-Proto');
var logglyUrlDomain = context.getVariable('flow.apigee.originalRequest.header.Host');
var logglyBasePath = context.getVariable('proxy.basepath');
var logglyUrl = logglyUrlScheme + '://' + logglyUrlDomain + logglyBasePath + '/logs';
context.setVariable('debug.logglyUrl', logglyUrl);

var log = {
	org: context.getVariable('organization.name'),
	env: context.getVariable('environment.name'),
	api: context.getVariable('apiproxy.name'),
	request: {
		resource: context.getVariable('proxy.pathsuffix'),
		query: context.getVariable('flow.apigee.originalRequest.querystring'),
		verb: context.getVariable('flow.apigee.originalRequest.verb')
	},
	error: {
		status: context.getVariable('flow.apigee.error.status'),
		code: context.getVariable('flow.apigee.error.code'),
		message: context.getVariable('flow.apigee.error.message')
	}
};

var headers = {
	'Content-Type': 'application/json'
};

var logglyRequest = new Request(logglyUrl, 'POST', headers, JSON.stringify(log));
httpClient.send(logglyRequest);
