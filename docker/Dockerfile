FROM jenkins

# install jenkins plugins
COPY jenkins/plugins /usr/share/jenkins/plugins
COPY jenkins/install-plugins.sh /usr/share/jenkins/install-plugins.sh
RUN while read i ; do /usr/share/jenkins/install-plugins.sh $i ; done < /usr/share/jenkins/plugins

# copy jenkins jobs
ADD jenkins/jobs /usr/share/jenkins/jobs

USER root

# warm apt-get cache
RUN apt-get update

# install node.js
RUN apt-get install -y nodejs npm
RUN ln -s /usr/bin/nodejs /usr/bin/node

# configure maven in jenkins
COPY jenkins/hudson.tasks.Maven.xml /var/jenkins_home/


#override the entry point to use our script
ADD jenkins/jenkins-entrypoint.sh /usr/local/bin/jenkins-entrypoint.sh
RUN chmod +x /usr/local/bin/jenkins-entrypoint.sh

# install gosu - https://docs.docker.com/engine/userguide/eng-image/dockerfile_best-practices/#user
#RUN apt-get install -y \
#		bison \
#		build-essential \
#		curl \
#		flex \
#		libreadline-dev \
#		zlib1g-dev

#RUN curl -o /usr/local/bin/gosu -SL 'https://github.com/tianon/gosu/releases/download/1.0/gosu' \
#	&& chmod +x /usr/local/bin/gosu

#ENV SAVEPATH $PATH

#RUN echo $SAVEPATH

#ENV GOSU_VERSION 1.7
#RUN set -x \
#		&& apt-get update && apt-get install -y --no-install-recommends ca-certificates wget && rm -rf /var/lib/apt/lists/* \
#		&& wget -O /usr/local/bin/gosu "https://github.com/tianon/gosu/releases/download/$GOSU_VERSION/gosu-$(dpkg --print-architecture)" \
#		&& wget -O /usr/local/bin/gosu.asc "https://github.com/tianon/gosu/releases/download/$GOSU_VERSION/gosu-$(dpkg --print-architecture).asc" \
#		&& export GNUPGHOME="$(mktemp -d)" \
#		&& gpg --keyserver ha.pool.sks-keyservers.net --recv-keys B42F6819007F00F88E364FD4036A9C25BF357DD4 \
#		&& gpg --batch --verify /usr/local/bin/gosu.asc /usr/local/bin/gosu \
#		&& rm -r "$GNUPGHOME" /usr/local/bin/gosu.asc \
#		&& chmod +x /usr/local/bin/gosu \
#		&& gosu nobody true \
#		&& apt-get purge -y --auto-remove ca-certificates wget

#ENV PATH $PATH:$SAVEPATH

#RUN echo $PATH


USER jenkins
ENTRYPOINT ["/bin/tini", "--", "/usr/local/bin/jenkins-entrypoint.sh"]

