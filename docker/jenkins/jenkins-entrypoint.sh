#!/bin/bash

# we have to do this in an entrypoint becuase the jenkins image has defined $JENKINS_HOME as a volume
cp -R /usr/share/jenkins/jobs /var/jenkins_home/jobs

# call the original entry point
/bin/tini -- /usr/local/bin/jenkins.sh
