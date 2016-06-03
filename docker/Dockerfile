FROM jenkins

COPY jenkins/plugins /usr/share/jenkins/plugins
COPY jenkins/install-plugins.sh /usr/share/jenkins/install-plugins.sh
RUN while read i ; do /usr/share/jenkins/install-plugins.sh $i ; done < /usr/share/jenkins/plugins

USER root

# warm apt-get cache
RUN apt-get update

# install node.js
RUN apt-get install -y nodejs npm
RUN ln -s /usr/bin/nodejs /usr/bin/node

# install sudo
RUN apt-get install -y sudo

# install maven into jenkins
COPY jenkins/hudson.tasks.Maven.xml /var/jenkins_home/

USER jenkins
