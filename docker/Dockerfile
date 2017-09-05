FROM jenkins/jenkins:2.62

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

# copy a new entry point script to start jenkins
ADD jenkins/jenkins-entrypoint.sh /usr/local/bin/jenkins-entrypoint.sh

# copy git ssh files
COPY ssh/config /var/jenkins_home/.ssh/config

USER root

# this will be directory where we keep ssh keys for git authentication
RUN mkdir /usr/share/jenkins/ssh
# generate public/private keys for git authentication
RUN ssh-keygen -t rsa -b 4096 -C "jenkins@apigee.com" -f /usr/share/jenkins/ssh/id_rsa -q -P ""
# you get "Host key verification failed" if you don't have known_hosts
# file in place or if file is empty
# add github to known_hosts
RUN ssh-keyscan -t ssh-rsa github.com >> /usr/share/jenkins/ssh/known_hosts
RUN ssh-keyscan -t ssh-rsa gitlab.apigee.com >> /usr/share/jenkins/ssh/known_hosts
# copy ssh key cat utility to image
COPY ssh/keycat.sh /usr/share/jenkins/ssh/keycat.sh
RUN chmod +x /usr/share/jenkins/ssh/keycat.sh
# let all files under ssh is owned by jenkins
RUN chown -R jenkins /usr/share/jenkins/ssh
# give permission for jenkins to update known_hosts with IP addresses of hosts
# http://askubuntu.com/a/621259
RUN chmod 600 /usr/share/jenkins/ssh/known_hosts
# private key needs to be read by jenkins user
RUN chmod 400 /usr/share/jenkins/ssh/id_rsa

# make custom entry point script executable
RUN chmod +x /usr/local/bin/jenkins-entrypoint.sh

# warm apt-get cache
RUN apt-get update

# install node.js
RUN curl -sL https://deb.nodesource.com/setup_8.x | bash -
RUN apt-get install -y nodejs

USER jenkins

ENTRYPOINT ["/bin/tini", "--", "/usr/local/bin/jenkins-entrypoint.sh"]

# cat git authentication ssh public key so we can copy/paste
RUN /usr/share/jenkins/ssh/keycat.sh
