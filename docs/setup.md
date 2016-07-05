# Setup

## Fork this repo

In order to demonstrate CI, we will need to do commits/PRs to a repo and
also need to transition code from one branch to another to trigger builds. We
cannot use a shared repo during demos as we need to prevent jobs triggering on
another jenkins instance pointing to the same repo. We also shouldn't clutter
the commit history of this repo with test commits we will make during demos.

So please fork this repo either to your own GitLab account or clone the repo
locally and push it back to another remote repo.

## Docker

Make sure you have [Docker](https://www.docker.com/) installed and docker
machine is started before continuing next steps.

## Create Jenkins image

Project includes a [Dockerfile](docker/Dockerfile) that creates a Docker
image using Jenkins official Docker image as base. It also sets up required
Jenkins plugins and copies job configurations to the image.

```bash
cd docker
docker build -t apigee/ci .
```

A new docker image called `apigee/ci` will be created.

### Setup git ssh access

This project uses ssh public/private key pairs in order to authenticate
the jenkins user to git server. [Why?](faq.md#why-ssh-for-git-authentication)

At the end of the image creation process, Dockerfile generates and prints out a
new public key that you can setup as a [deploy
key](https://developer.github.com/guides/managing-deploy-keys/#deploy-keys) in
your git server. Please refer to documentation and setup a deploy key using this
public key.

Basically all you need to do is to go to the settings page of the target repo
and click `Deploy Keys` on the left-hand menu. Give it a meaningful name, copy
paste the contents of the public key as a new key and enable the "Allow write
access" option.

## Run image

Note: remove any previous currency-v1 deployments from the Apigee org in order
to demonstrate proxies created successfully with correct revision numbers.

All parameters required to run Jenkins and Maven are supplied using environment
variables. These variables are set directly to the docker container with the
docker run command.

There is a script provided to make this process easier which can be found
[here](setup/run-image.sh). Modify this script to provide values specific to
your setup and execute the script to run the image.

Please note that `setup/run-image.sh` script is in source control. Copy this
file to `setup/.run-image.sh` before making any changes to prevent sensitive
data committed to this repo. Root `.gitignore` file contains a directive to
ignore any changes to `setup/.run-image.sh`.

```bash
# while in docker folder
../setup/.run-image.sh
```

Script will output the docker container hash.

## Jenkins

### Find docker ip address

```bash
docker-machine ip default
```

### Start Jenkins

Fire up a browser and hit `http://<your-docker-ip>:9001` to access Jenkins.

Please note that as Jenkins jobs are setup to trigger every minute, Jenkins will
run all jobs configured upon start. However all jobs will fail as we don't yet
have feature and production branches configured.

Please follow [usage](usage.md) to see Jenkins in action.
