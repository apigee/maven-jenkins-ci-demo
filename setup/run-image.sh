#
# Copyright 2018 Google LLC
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#     https://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.
#
: '
Variable definitions:

    APIGEE_ORG:
        Name of the Apigee org you want your proxy to be deployed in. Used by
        maven during proxy deployment.
    APIGEE_USERNAME
        Username of the user to be used for proxy deployment. Used by maven
        during proxy deployment.
    APIGEE_PASSWORD
        Password of the user to be used for proxy deployment. Used by maven
        during proxy deployment.
    API_DOMAIN_TEST
        Apigee proxy domain name with port (excluding scheme) for test
        environment. Used by proxy integration testing.
        Example: oseymen-test.apigee.net
    API_DOMAIN_PROD
        Apigee proxy domain name with port (excluding scheme) for prod
        environment. Used by proxy integration testing.
        Example: oseymen-prod.apigee.net
    SCM_URL
        Git remote URL to the repo. Used by Jenkins to clone and fetch proxy
        source code.
        Example: git@github.com:seymen/currency-v1.git
'

docker run -d -p 9001:8080 \
	-e APIGEE_ORG=. \
	-e APIGEE_USERNAME=. \
	-e APIGEE_PASSWORD=. \
	-e API_DOMAIN_TEST=. \
	-e API_DOMAIN_PROD=. \
	-e SCM_URL=. \
--name my-ci apigee/ci
