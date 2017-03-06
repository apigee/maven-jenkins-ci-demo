# Setup

Make sure you have [Docker](https://www.docker.com/) installed before continuing to the next steps.  You may also need [Docker
Machine](https://docs.docker.com/machine/) if you're running an older version of Docker.

## Fork this repo

In order to demonstrate CI, we will need to do commits/PRs to a repo and
also need to transition code from one branch to another to trigger builds. We
cannot use a shared repo during demos as we need to prevent jobs triggering on
another jenkins instance pointing to the same repo. We also shouldn't clutter
the commit history of this repo with test commits we will make during demos.

So fork this repo either to your own GitLab account or clone the repo locally
and push it back to another git server, e.g. GitHub.

### GitLab

1.  Browse to `https://gitlab.apigee.com/apigee-cs/accelerator-ci-maven`
2.  Click on the `Fork` button at the top-right of the page
3.  Choose the target user or group to fork this repo to, e.g. click on your
    user

### GitHub

1.  Create a new repository on GitHub. This repo can be public or private.
2.  Change git server url for origin to point to the new repo in GitHub

    ```bash
    git remote set-url origin <github-repo-ssh-url>
    ```

3.  Push code to the new repo in GitHub

    ```bash
    git push
    ```

Use your local fork for below steps.

## Configure Branches

We only need the `master` and a `prod` branch for this demonstration - the idea
is to have a branch per environment.

1.  Delete all other branches apart from `master` branch in your forked repo
2.  Setup a `prod` branch

    ```bash
    git checkout -b prod
    git push origin prod
    git checkout master
    ```

## Create Jenkins image

Project includes a [Dockerfile](docker/Dockerfile) that creates a Docker
image using Jenkins official Docker image as base. It also sets up required
Jenkins plugins and copies job configurations to the image.

```bash
cd docker
docker build -t apigee/ci .
```

A new docker image called `apigee/ci` will be created.

## Setup git ssh access

This project uses ssh public/private key pairs in order to authenticate
the jenkins user to git server. [Why?](faq.md#why-ssh-for-git-authentication)

At the end of the image creation process, Dockerfile generates and prints out a
new public key that you can setup to give jenkins push/pull access to your repo.

### GitLab

If you forked the project to your GitLab account, then go to your profile
settings and click `SSH Keys` on the left-hand menu. Give it a meaningful name
and copy/paste the contents of the public key as a new key.

See [GitLab SSH Keys
Documentation](http://docs.gitlab.com/ce/gitlab-basics/create-your-ssh-keys.html)

GitLab doesn't allow repository deploy keys to have write access, therefore we
can't use that functionality for this demo.

### GitHub

If you pushed the project files to your GitHub account, then go to your repo and
click `Deploy Keys` on the left-hand menu. Give it a meaningful name, copy/paste
the contents of the public key as a new key and enable "Allow write access"
option.

See [GitHub Deploy Keys
Documentation](https://developer.github.com/guides/managing-deploy-keys/#deploy-keys)

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

## Access Jenkins

As Jenkins is running inside the container you just started, you need the IP
address of the docker machine in order to access it from your browser. Execute
the following command to find out the IP address:

```bash
docker-machine ip default
```

Fire up a browser and hit `http://<your-docker-ip>:9001` to access Jenkins UI.

Please note that Jenkins will start all jobs upon start as it is configured to
trigger each job every minute [why not git web
hooks?](faq.md#why-not-git-web-hooks). Master and prod jobs should succeed but
feature job will fail as we don't have a feature branch yet.

Please follow [usage](usage.md) to see Jenkins in action.
