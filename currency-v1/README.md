## Maven command executed by Jenkins
```
mvn install -Ptest
```

## Environment variables
| Variable        | Description                                                    |
| APIGEE_ORG      | Name of the Apigee organisation to deploy the bundle to        |
| APIGEE_USERNAME | Apigee username of the user that will carry out the deployment |
| APIGEE_PASSWORD | Apigee password of the user that will carry out the deployment |
| API_DOMAIN_TEST | Scheme and domain of the Apigee northbound                     |
| API_DOMAIN_PROD | Scheme and domain of the Apigee northbound in prod environment |
