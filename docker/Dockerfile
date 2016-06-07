FROM jenkins

# install jenkins plugins
COPY jenkins/plugins /usr/share/jenkins/plugins
COPY jenkins/install-plugins.sh /usr/share/jenkins/install-plugins.sh
RUN while read i ; \ 
		do /usr/share/jenkins/install-plugins.sh $i ; \
	done < /usr/share/jenkins/plugins

# copy jenkins jobs
ADD jenkins/jobs /usr/share/jenkins/jobs

# copy maven settings
COPY jenkins/hudson.tasks.Maven.xml /var/jenkins_home/

# override the entry point to use a custom script
ADD jenkins/jenkins-entrypoint.sh /usr/local/bin/jenkins-entrypoint.sh

USER root

# make custom entry point script executable
RUN chmod +x /usr/local/bin/jenkins-entrypoint.sh

# warm apt-get cache
RUN apt-get update

# install node.js
RUN apt-get install -y nodejs npm
RUN ln -s /usr/bin/nodejs /usr/bin/node

USER jenkins

ENTRYPOINT ["/bin/tini", "--", "/usr/local/bin/jenkins-entrypoint.sh"]
