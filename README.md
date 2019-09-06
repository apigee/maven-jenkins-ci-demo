
# Continuous Integration for Apigee Proxies using Maven
The objective of this project is to implement a containerised framework that can
be used to demonstrate best practices around continuous integration for Apigee
projects.

[![Docs](./docs/codelabs/maven-jenkins-ci-demo/index.png)](https://apigee.github.io/maven-jenkins-ci-demo)
__[Read the User Guide](https://apigee.github.io/maven-jenkins-ci-demo)__

## User Guide Development
All documentation should be managed in the `docs` folder. Codelabs is used to generate the User Guide. Install them as below.

```
# Install claat
go get github.com/googlecodelabs/tools/claat
```

You can then use the following commands to generate and serve the docs locally. This creates an index.html file based on the markdown specified.

```
claat export -o docs/codelabs docs/docs.md
```

## Disclaimer
This is not an officially supported Google Product.
