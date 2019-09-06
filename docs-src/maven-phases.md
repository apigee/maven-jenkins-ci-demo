# Maven structure and deployment phases

Here is a list of operations that are performed in each maven lifecycle phase:

## validate

*   jslint on apiproxy/resources/jsc
*   npm install
*   unit testing

## initialise

*   clean target folder

## process-resources

*   copy proxy and integration test folders to target folder
*   token replacements

## compile

*   copy common policies to /target/policies, tests to /target/test/

## package

*   configure bundle

## install

*   deploy bundle
*   integration test
*   clean target folder
