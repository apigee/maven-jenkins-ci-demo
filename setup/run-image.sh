docker run -d -p 9001:8080 \
	-e APIGEE_ORG=. \
	-e APIGEE_USERNAME=. \
	-e APIGEE_PASSWORD=. \
	-e API_DOMAIN_TEST=. \
	-e API_DOMAIN_PROD=. \
	-e SCM_URL=. \
--name my-ci my/ci 
